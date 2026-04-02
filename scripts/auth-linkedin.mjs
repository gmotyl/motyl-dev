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

const scope = 'openid profile w_member_social';
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
  console.log('\n[DEBUG] Token response keys:', Object.keys(tokenData));
  console.log('[DEBUG] token_type:', tokenData.token_type);
  console.log('[DEBUG] scope:', tokenData.scope);
  console.log('[DEBUG] expires_in:', tokenData.expires_in);
  console.log('[DEBUG] has id_token:', !!tokenData.id_token);
  const accessToken = tokenData.access_token;

  let personUrn = '';

  // Try id_token from OpenID Connect (JWT, contains sub)
  if (tokenData.id_token) {
    try {
      const parts = tokenData.id_token.split('.');
      console.log('[DEBUG] id_token parts count:', parts.length);
      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
      console.log('[DEBUG] id_token payload:', JSON.stringify(payload));
      const sub = payload.sub || '';
      if (sub) {
        personUrn = sub.startsWith('urn:li:') ? sub : `urn:li:person:${sub}`;
        console.log(`Zalogowano (URN z id_token): ${personUrn}`);
      }
    } catch (e) {
      console.warn('[DEBUG] id_token parse error:', e.message);
    }
  }

  // Fallback: /v2/userinfo (OpenID Connect endpoint)
  if (!personUrn) {
    console.log('[DEBUG] Trying /v2/userinfo...');
    const userinfoRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('[DEBUG] /v2/userinfo status:', userinfoRes.status);
    if (userinfoRes.ok) {
      const userinfo = await userinfoRes.json();
      console.log('[DEBUG] /v2/userinfo response:', JSON.stringify(userinfo));
      const sub = userinfo.sub || '';
      if (sub) {
        personUrn = sub.startsWith('urn:li:') ? sub : `urn:li:person:${sub}`;
        console.log(`Zalogowano jako: ${sub}`);
      }
    } else {
      const err = await userinfoRes.text();
      console.warn('[DEBUG] /v2/userinfo error:', err);
    }
  }

  // Fallback: /v2/me
  if (!personUrn) {
    console.log('[DEBUG] Trying /v2/me...');
    const profileRes = await fetch('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('[DEBUG] /v2/me status:', profileRes.status);
    if (profileRes.ok) {
      const profile = await profileRes.json();
      console.log('[DEBUG] /v2/me response:', JSON.stringify(profile));
      personUrn = profile.id ? `urn:li:person:${profile.id}` : '';
      if (personUrn) console.log(`Zalogowano jako: ${profile.id}`);
    } else {
      const err = await profileRes.text();
      console.warn('[DEBUG] /v2/me error:', err);
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
