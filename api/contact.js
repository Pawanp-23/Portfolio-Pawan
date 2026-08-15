/**
 * api/contact.js
 * Vercel Serverless Function — POST /api/contact
 *
 * Flow:
 *  1. Validate inputs
 *  2. Connect to MongoDB
 *  3. Check IP-based rate limit (max 3 submissions per hour)
 *  4. Save submission document
 *  5. Send owner notification email (non-blocking)
 *  6. Send visitor auto-reply email (non-blocking)
 *  7. Return 200 JSON success
 */

import 'dotenv/config';
import { connectDB } from '../server/db.js';
import Submission from '../server/models/Submission.js';
import { validateContact } from '../server/validators.js';
import { sendNewSubmissionEmail, sendAutoReply } from '../server/mailer.js';

// Max submissions per IP within the window
const RATE_LIMIT_MAX  = 10;
const RATE_LIMIT_MS   = 60 * 60 * 1000; // 1 hour

/**
 * Get the real client IP, accounting for Vercel / reverse-proxy headers.
 */
function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

export default async function handler(req, res) {
  // ── Method guard ──────────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method not allowed.' });
  }

  // ── CORS headers (tightened in production) ────────────────────────────────
  const origin = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const ip        = getClientIp(req);
  const userAgent = req.headers['user-agent'] || '';

  try {
    // ── 1. Validate ─────────────────────────────────────────────────────────
    const { valid, errors, data } = validateContact(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, errors });
    }

    // ── 2. Database connection ───────────────────────────────────────────────
    await connectDB();

    // ── 3. Rate limiting (IP-based via DB) ──────────────────────────────────
    const since = new Date(Date.now() - RATE_LIMIT_MS);
    const recentCount = await Submission.countDocuments({
      ip,
      createdAt: { $gte: since },
    });

    if (recentCount >= RATE_LIMIT_MAX) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait an hour before trying again.',
      });
    }

    // ── 4. Save submission ───────────────────────────────────────────────────
    const submission = await Submission.create({
      ...data,
      ip,
      userAgent,
    });

    // ── 5 & 6. Send emails (non-blocking — don't let email failure kill the UX) ──
    const emailPromises = [
      sendNewSubmissionEmail(submission).then(async () => {
        submission.notified = true;
        await submission.save();
      }),
      sendAutoReply(submission).then(async () => {
        submission.autoReplySent = true;
        await submission.save();
      }),
    ];

    // Fire-and-forget — don't await so we respond fast
    Promise.allSettled(emailPromises).then((results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`Email ${i} failed:`, r.reason?.message);
        }
      });
    });

    // ── 7. Respond ───────────────────────────────────────────────────────────
    return res.status(200).json({
      success: true,
      message: "Message received! I'll be in touch soon.",
    });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on our end. Please try again later.',
    });
  }
}
