/**
 * scripts/spotify-token.js
 * One-time helper: log in to Spotify and print a refresh token for api/spotify.js.
 *
 * 1. Create an app at https://developer.spotify.com/dashboard
 *    - Redirect URI:  http://127.0.0.1:8888/callback
 *    - API:           Web API
 * 2. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your .env
 * 3. Run:  node scripts/spotify-token.js   and open the printed link
 * 4. Copy the printed SPOTIFY_REFRESH_TOKEN into .env and into Vercel → Settings → Environment Variables
 */

import 'dotenv/config';
import http from 'http';
import crypto from 'crypto';

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error('\n✖  Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env first.\n');
  process.exit(1);
}

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = 'user-read-currently-playing user-read-recently-played';
const state = crypto.randomBytes(12).toString('hex');

const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
  response_type: 'code', client_id: id, scope: SCOPES, redirect_uri: REDIRECT_URI, state,
});

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== '/callback') { res.writeHead(404).end(); return; }

  const done = (msg) => { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }).end(msg); server.close(); };
  if (url.searchParams.get('state') !== state) return done('State mismatch — run the script again.');
  if (url.searchParams.get('error')) return done(`Spotify said: ${url.searchParams.get('error')}`);

  try {
    const r = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'authorization_code', code: url.searchParams.get('code'), redirect_uri: REDIRECT_URI }),
    });
    const data = await r.json();
    if (!data.refresh_token) throw new Error(JSON.stringify(data));

    console.log('\n✦  Success! Add this line to .env and to Vercel environment variables:\n');
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    done('Done — go back to the terminal. You can close this tab.');
  } catch (err) {
    console.error('\n✖  Token exchange failed:', err.message, '\n');
    done('Token exchange failed — check the terminal.');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n✦  Open this link, log in to Spotify and click Agree:\n');
  console.log(authUrl + '\n');
});
