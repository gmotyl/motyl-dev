#!/usr/bin/env node
/**
 * publish-social.mjs
 * Direct API publishing to Bluesky, Twitter/X, LinkedIn
 * Usage: node scripts/publish-social.mjs --platform bluesky --text "post content" [--link https://...]
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHmac } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const envPath = resolve(__dirname, '../.env');
    const raw = readFileSync(envPath, 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env not found, rely on environment
  }
}

// ─── Bluesky (AT Protocol) ───────────────────────────────────────────────────

async function publishBluesky(text, link) {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const appPassword = process.env.BLUESKY_APP_PASSWORD;

  if (!identifier || !appPassword) {
    throw new Error('Missing BLUESKY_IDENTIFIER or BLUESKY_APP_PASSWORD in .env');
  }

  // 1. Auth
  const sessionRes = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password: appPassword }),
  });
  if (!sessionRes.ok) {
    const err = await sessionRes.text();
    throw new Error(`Bluesky auth failed: ${err}`);
  }
  const { accessJwt, did } = await sessionRes.json();

  // 2. Build post record with facets for links
  const record = buildBlueskyRecord(text, link);

  // 3. Create post
  const postRes = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessJwt}`,
    },
    body: JSON.stringify({
      repo: did,
      collection: 'app.bsky.feed.post',
      record,
    }),
  });
  if (!postRes.ok) {
    const err = await postRes.text();
    throw new Error(`Bluesky post failed: ${err}`);
  }
  const { uri } = await postRes.json();
  // Convert AT URI to bsky.app URL
  const [, , repo, , rkey] = uri.split('/');
  return `https://bsky.app/profile/${repo}/post/${rkey}`;
}

function buildBlueskyRecord(text, link) {
  const now = new Date().toISOString();
  const record = {
    $type: 'app.bsky.feed.post',
    text,
    createdAt: now,
    langs: ['pl'],
  };

  if (link) {
    // Find link in text or append it
    const linkStart = text.indexOf(link);
    if (linkStart !== -1) {
      const encoder = new TextEncoder();
      record.facets = [
        {
          index: {
            byteStart: encoder.encode(text.slice(0, linkStart)).length,
            byteEnd: encoder.encode(text.slice(0, linkStart + link.length)).length,
          },
          features: [{ $type: 'app.bsky.richtext.facet#link', uri: link }],
        },
      ];
    } else {
      // Append link as card/external embed
      record.embed = {
        $type: 'app.bsky.embed.external',
        external: {
          uri: link,
          title: '',
          description: '',
        },
      };
    }
  }

  return record;
}

// ─── Twitter / X (v2 OAuth 1.0a) ─────────────────────────────────────────────

async function publishTwitter(text) {
  const apiKey = process.env.TWITTER_API_KEY;
  const apiSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_SECRET;

  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    throw new Error('Missing TWITTER_API_KEY/SECRET or TWITTER_ACCESS_TOKEN/SECRET in .env');
  }

  const url = 'https://api.twitter.com/2/tweets';
  const authHeader = buildOAuth1Header('POST', url, {}, apiKey, apiSecret, accessToken, accessSecret);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Twitter post failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  const tweetId = data?.data?.id;
  const handle = process.env.TWITTER_HANDLE || 'user';
  return tweetId ? `https://x.com/${handle}/status/${tweetId}` : 'Published (ID unavailable)';
}

function buildOAuth1Header(method, url, params, consumerKey, consumerSecret, token, tokenSecret) {
  const oauthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: Math.random().toString(36).slice(2) + Date.now().toString(36),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: token,
    oauth_version: '1.0',
  };

  const allParams = { ...params, ...oauthParams };
  const sortedParams = Object.keys(allParams)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(allParams[k])}`)
    .join('&');

  const baseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(sortedParams),
  ].join('&');

  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
  const signature = hmacSha1(signingKey, baseString);
  oauthParams.oauth_signature = signature;

  const headerParts = Object.keys(oauthParams)
    .filter((k) => k.startsWith('oauth_'))
    .sort()
    .map((k) => `${encodeURIComponent(k)}="${encodeURIComponent(oauthParams[k])}"`)
    .join(', ');

  return `OAuth ${headerParts}`;
}

function hmacSha1(key, data) {
  return createHmac('sha1', key).update(data).digest('base64');
}

// ─── LinkedIn (v2) ────────────────────────────────────────────────────────────

async function publishLinkedIn(text, link) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN;

  if (!accessToken || !personUrn) {
    throw new Error('Missing LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_URN in .env');
  }

  const body = {
    author: personUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text },
        shareMediaCategory: link ? 'ARTICLE' : 'NONE',
        ...(link && {
          media: [
            {
              status: 'READY',
              originalUrl: link,
            },
          ],
        }),
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LinkedIn post failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  const postId = data?.id?.split(':').pop();
  return postId
    ? `https://www.linkedin.com/feed/update/${data.id}/`
    : 'Published (URL unavailable)';
}

// ─── CLI entry point ──────────────────────────────────────────────────────────

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const get = (flag) => {
    const idx = args.indexOf(flag);
    return idx !== -1 ? args[idx + 1] : null;
  };

  const platform = get('--platform');
  const textArg = get('--text');
  const link = get('--link') || null;

  if (!platform || !textArg) {
    console.error('Usage: node scripts/publish-social.mjs --platform <bluesky|twitter|linkedin> --text "..." [--link https://...]');
    process.exit(1);
  }

  // Text can be a file path starting with @
  const text = textArg.startsWith('@')
    ? readFileSync(textArg.slice(1), 'utf8').trim()
    : textArg;

  try {
    let url;
    switch (platform.toLowerCase()) {
      case 'bluesky':
        url = await publishBluesky(text, link);
        break;
      case 'twitter':
      case 'x':
        url = await publishTwitter(text);
        break;
      case 'linkedin':
        url = await publishLinkedIn(text, link);
        break;
      default:
        throw new Error(`Unknown platform: ${platform}. Use: bluesky, twitter, linkedin`);
    }
    console.log(`✓ Published to ${platform}: ${url}`);
  } catch (err) {
    console.error(`✗ Error: ${err.message}`);
    process.exit(1);
  }
}

main();
