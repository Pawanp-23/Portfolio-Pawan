/**
 * server.js
 * Local development Express server.
 * In production, Vercel handles routing via vercel.json + api/ serverless functions.
 */

import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import contactHandler from './api/contact.js';
import spotifyHandler from './api/spotify.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app  = express();
const PORT = process.env.PORT || 3000;

// ── Security middleware ───────────────────────────────────────────────────────
app.use(
  helmet({
    // Allow Google Fonts and inline styles used by the portfolio
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc:   ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc:    ["'self'", 'https://fonts.gstatic.com'],
        scriptSrc:  ["'self'", "'unsafe-inline'", 'https://unpkg.com', 'https://open.spotify.com'],
        frameSrc:   ['https://open.spotify.com'],
        imgSrc:     ["'self'", 'data:', 'blob:', 'https://i.scdn.co'],
        connectSrc: ["'self'", 'https://github-contributions-api.jogruber.de'],
      },
    },
  })
);

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.ALLOWED_ORIGIN || false
        : '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: false }));

// ── Global rate limiter (broad protection) ────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, slow down.' },
});
app.use(globalLimiter);

// ── API route ─────────────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  // Adapt Express req/res to the Vercel-style handler
  await contactHandler(req, res);
});

app.get('/api/spotify', async (req, res) => {
  await spotifyHandler(req, res);
});

// ── Static frontend ───────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback — all non-API routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✦  Portfolio dev server running`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   API:     http://localhost:${PORT}/api/contact\n`);
});
