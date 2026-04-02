#!/usr/bin/env node
/**
 * auth-linkedin.mjs
 * One-time OAuth 2.0 flow to get LinkedIn access token.
 * Usage: npm run auth:linkedin
 * Saves LINKEDIN_ACCESS_TOKEN and LINKEDIN_PERSON_URN to .env
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = resolve(__dirname, '../.env');

function loadEnv() {
  try {
    const raw = readFileSync(ENV_PATH, 'utf8');
    const result = {};
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      result[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
    return result;
  } catch {
    return {};
  }
}

function updateEnv(updates) {
  let raw = '';
  try {
    raw = readFileSync(ENV_PATH, 'utf8');
  } catch {
    // will create new
  }

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(raw)) {
      raw = raw.replace(regex, `${key}=${value}`);
    } else {
      raw += `\n${key}=${value}`;
    }
  }

  writeFileSync(ENV_PATH, raw);
}

const env = loadEnv();
const CLIENT_ID = env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/callback';
const PORT = 3000;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET in .env');
  process.exit(1);
}

const scope = 'profile w_member_social';
const state = Math.random().toString(36).slice(2);

const authUrl =
  `https://www.linkedin.com/oauth/v2/authorization` +
  `?response_type=code` +
  `&client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(scope)}` +
  `&state=${state}`;

console.log('\nOtwórz ten URL w przeglądarce:\n');
console.log(authUrl);
console.log('\nCzekam na callback na http://localhost:3000/callback ...\n');

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== '/callback') {
    res.end('Not found');
    return;
  }

  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(400);
    res.end(`Błąd autoryzacji: ${error}`);
    console.error('Błąd:', error, url.searchParams.get('error_description'));
    server.close();
    return;
  }

  if (returnedState !== state) {
    res.writeHead(400);
    res.end('Nieprawidłowy state — możliwy atak CSRF');
    server.close();
    return;
  }

  // Exchange code for token
  const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    res.writeHead(500);
    res.end(`Token error: ${err}`);
    console.error('Token error:', err);
    server.close();
    return;
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  // Extract person URN from JWT token (works without profile scope)
  let personUrn = '';
  try {
    const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64url').toString());
    const sub = payload.sub || payload.id || '';
    if (sub) {
      personUrn = sub.startsWith('urn:li:') ? sub : `urn:li:person:${sub}`;
      console.log(`Zalogowano (URN z tokena): ${personUrn}`);
    }
  } catch {
    // token not JWT — ignore
  }

  // Fallback: try /v2/me (may fail without profile scope)
  if (!personUrn) {
    const profileRes = await fetch('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (profileRes.ok) {
      const profile = await profileRes.json();
      personUrn = profile.id ? `urn:li:person:${profile.id}` : '';
      if (personUrn) console.log(`Zalogowano jako: ${profile.id}`);
    } else {
      console.warn('Nie udało się pobrać profilu — ustaw LINKEDIN_PERSON_URN ręcznie w .env');
    }
  }

  updateEnv({
    LINKEDIN_ACCESS_TOKEN: accessToken,
    LINKEDIN_PERSON_URN: personUrn,
  });

  console.log('\nZapisano do .env:');
  console.log(`  LINKEDIN_ACCESS_TOKEN=${accessToken.slice(0, 20)}...`);
  console.log(`  LINKEDIN_PERSON_URN=${personUrn}`);
  console.log('\nGotowe! Możesz teraz używać /publish-social --platform linkedin');

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html><body style="font-family:sans-serif;padding:2rem;max-width:500px;margin:auto">
      <h2>LinkedIn autoryzowany!</h2>
      <p>Access token zapisany do <code>.env</code>.</p>
      <p>Możesz zamknąć tę kartę.</p>
    </body></html>
  `);

  server.close();
});

server.listen(PORT, () => {
  // server ready
});
