/**
 * api/spotify.js
 * Vercel Serverless Function — GET /api/spotify
 *
 * Returns what Pawan is playing on Spotify right now plus his last few plays.
 * Read-only: visitors play tracks in their own browser via the Spotify embed,
 * this function never controls Pawan's playback.
 *
 * Flow:
 *  1. Swap the long-lived refresh token for a short-lived access token (cached while warm)
 *  2. Fetch the currently playing track and recent history in parallel
 *  3. Return { isPlaying, progressMs, tracks[] } — live track first, then up to 9 unique recent plays
 *
 * Env: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 * Get the refresh token once with:  node scripts/spotify-token.js
 */

import 'dotenv/config';

const TOKEN_URL   = 'https://accounts.spotify.com/api/token';
const NOW_URL     = 'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track';
const RECENT_URL  = 'https://api.spotify.com/v1/me/player/recently-played?limit=25';
const MAX_TRACKS  = 10;

let cachedToken = null;   // { value, expiresAt }

async function getAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
  });
  if (!res.ok) throw new Error(`Spotify token error ${res.status}`);

  const data = await res.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
  return cachedToken.value;
}

/** Only expose what the card needs — never raw API responses. */
function toTrack(item) {
  return {
    id:         item.id,
    title:      item.name,
    artist:     item.artists.map(a => a.name).join(', '),
    album:      item.album.name,
    albumArt:   item.album.images?.[1]?.url || item.album.images?.[0]?.url || null,
    url:        item.external_urls?.spotify || null,
    durationMs: item.duration_ms,
  };
}

export default async function handler(req, res) {
  // ── Method guard ──────────────────────────────────────────────────────────
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  // ── Not configured yet → let the card show its idle state ────────────────
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return res.status(503).json({ success: false, message: 'Spotify is not configured.' });
  }

  try {
    const token = await getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    // 1. Currently playing (204 = nothing playing) + recent history, in parallel
    const [now, recent] = await Promise.all([fetch(NOW_URL, { headers }), fetch(RECENT_URL, { headers })]);
    if (now.status !== 200 && now.status !== 204) throw new Error(`Spotify now-playing error ${now.status}`);
    if (!recent.ok) throw new Error(`Spotify recently-played error ${recent.status}`);

    const current = now.status === 200 ? await now.json() : null;
    const history = (await recent.json()).items || [];

    // 2. Build the playlist: live track first, then unique recent plays
    const tracks = [];
    const seen = new Set();
    let isPlaying = false, progressMs = 0;
    if (current?.item && current.currently_playing_type === 'track') {
      isPlaying = Boolean(current.is_playing);
      progressMs = current.progress_ms ?? 0;
      tracks.push({ ...toTrack(current.item), live: true });
      seen.add(current.item.id);
    }
    for (const h of history) {
      if (tracks.length >= MAX_TRACKS) break;
      if (!h.track?.id || seen.has(h.track.id)) continue;
      seen.add(h.track.id);
      tracks.push({ ...toTrack(h.track), playedAt: h.played_at });
    }

    res.setHeader('Cache-Control', isPlaying ? 's-maxage=20, stale-while-revalidate=40' : 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({ success: true, isPlaying, progressMs, tracks });
  } catch (err) {
    console.error('[spotify]', err.message);
    return res.status(502).json({ success: false, message: 'Could not reach Spotify.' });
  }
}
