/**
 * api/guestbook.js
 * Vercel Serverless Function — GET/POST /api/guestbook
 *
 * GET  → latest 60 pixel signatures (public fields only)
 * POST → { name, pixels } ; shown instantly, 1 per IP per 24h
 */

import 'dotenv/config';
import { connectDB } from '../server/db.js';
import Signature from '../server/models/Signature.js';

const LIMIT_MS = 24 * 60 * 60 * 1000;

function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const items = await Signature.find({}, { name: 1, pixels: 1, createdAt: 1, _id: 0 }).sort({ createdAt: -1 }).limit(60).lean();
      res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=60');
      return res.status(200).json({ success: true, items });
    }

    if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed.' });

    const name   = String(req.body?.name ?? '').replace(/<[^>]*>/g, '').trim().slice(0, 20);
    const pixels = String(req.body?.pixels ?? '');
    if (name.length < 2)              return res.status(400).json({ success: false, message: 'Add a name (2–20 characters).' });
    if (!/^[0-5]{256}$/.test(pixels)) return res.status(400).json({ success: false, message: 'Invalid drawing.' });
    if (!/[1-5]/.test(pixels))        return res.status(400).json({ success: false, message: 'Draw something first!' });

    const ip = getClientIp(req);
    if (await Signature.exists({ ip, createdAt: { $gte: new Date(Date.now() - LIMIT_MS) } })) {
      return res.status(429).json({ success: false, message: 'One signature per day — come back tomorrow.' });
    }

    const s = await Signature.create({ name, pixels, ip });
    return res.status(201).json({ success: true, item: { name: s.name, pixels: s.pixels, createdAt: s.createdAt } });
  } catch (err) {
    console.error('[guestbook]', err.message);
    return res.status(500).json({ success: false, message: 'Guestbook is unavailable right now.' });
  }
}
