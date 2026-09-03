# Caching strategy

Living reference for how motyl.dev caches HTML. ADRs record *why* the decisions were made ([0007](./adr/0007-multi-layer-caching-strategy.md), [0008](./adr/0008-cloudflare-html-cache-with-publish-purge.md)); this file records *what is true right now* and *what to do when adding a route*.

**The rule in one line:** a route is either **public and cached hard** (30 days at the edge) or **private and never cached** (`no-store`). There is no middle tier.

## Layers

Request path: **browser → Cloudflare (DNS-proxied) → Vercel Edge → Next.js render**.

| Layer | Controlled by | Notes |
|---|---|---|
| Browser | `Cache-Control` in `vercel.json` | Short (5–30 min) so a returning reader still hits fresh edge content. |
| Cloudflare | A **Cache Rule in the Cloudflare dashboard** + `CDN-Cache-Control` from origin | HTML is *not* cacheable at Cloudflare without a Cache Rule, whatever the headers say. This bit is not in the repo — see below. |
| Vercel Edge | `CDN-Cache-Control` in `vercel.json` | Same directive Cloudflare reads. |
| Next.js render | Route segment config (`revalidate`, `dynamic`) in each `page.tsx` | Governs whether Vercel renders per request or serves a prerendered page. |
| App-level | `data/content-cache.json` (built by `scripts/build-content-cache.ts`), React `cache()` in `lib/content/articles.ts` / `lib/newsletter/issues.ts` | Build-time content cache; zero round-trips at request time. |

`/sw.js` is the deliberate exception: `public, max-age=0, must-revalidate` set in `next.config.ts`, so a PWA install can never get stuck on an old shell.

## The Cloudflare Cache Rule (not in this repo)

One rule, `public-html-allowlist`, in the Cloudflare dashboard for the motyl.dev zone:

- **Matches:** `/`, `/articles*`, `/newsletter*`, `/about`, `/privacy`, `/sitemap.xml`, RSS.
- **Action:** eligible for cache, Edge TTL = *respect origin* (uses the `CDN-Cache-Control` we send).
- **Everything else is untouched** → Cloudflare does not cache HTML by default → `cf-cache-status: DYNAMIC`.

Allowlist, not blocklist: a route nobody thought about fails **safe** (uncached). This is why private routes need no Cloudflare work at all — they simply are not on the list.

A second rule, `cache news`, existed briefly and was deleted on 2026-07-19: it made `/news*` cache-eligible, which contradicted the SuperAdmin gate. It never leaked (origin sent `no-store`, and the rule respected origin), but it shadowed the allowlist and was fragile.

Bot Fight Mode is on; AI crawlers are deliberately allowed — with HTML cached at the edge their traffic is close to free.

## Route matrix

Public, edge-cached 30 days (`CDN-Cache-Control: max-age=2592000, stale-while-revalidate=60`):

| Route | Browser `max-age` | Render |
|---|---|---|
| `/` | 300 | ISR 300 |
| `/articles` | 300 | ISR 300 |
| `/articles/:slug*` | 1800 | `force-static`, `dynamicParams: false` |
| `/newsletter` | 300 | dynamic (reads `searchParams` for pagination) |
| `/newsletter/:issue*` | 1800 | SSG via `generateStaticParams` |
| `/about`, `/privacy`, `/sitemap.xml` | 300 | static |

Private, never cached (`Cache-Control: private, no-store` + `CDN-Cache-Control: no-store`, absent from the Cloudflare allowlist, gated in `middleware.ts`):

| Route | Guard |
|---|---|
| `/news`, `/news/:slug*` | `requireSuperAdmin` + middleware session check |
| `/read-all-news` | middleware session check |
| `/trending` | `requireSuperAdmin` + middleware; `dynamic = 'force-dynamic'` |

`/bookmarks` is session-gated in middleware (redirects to `/` when logged out) but has no `vercel.json` entry and is not on the allowlist — uncached by default.

## Invalidation

Cloudflare knows nothing about Vercel deploys, so invalidation is explicit: `.github/workflows/purge-cloudflare.yml`.

- **Trigger:** push to `main` touching `articles/**` or `content/trends/**` — i.e. a new Blog Article or Newsletter Issue.
- **Sequence:** poll the GitHub Deployments API until the Vercel *production* deployment for that SHA reports `success`, then `purge_everything` on the zone. A failed or timed-out deploy exits without purging, so the edge never refills from the old build.
- **Not triggered by:** daily News pushes (News is private and uncached) and code-only deploys — those intentionally leave the cache warm.
- Purge-everything over purge-by-URL: publishes are rare, a refill costs a few hundred requests, and a URL list rots silently.

Secrets required: `CLOUDFLARE_ZONE_ID`, purge-scoped `CLOUDFLARE_API_TOKEN`.

## Adding a route — checklist

**Public page:**
1. Add a `vercel.json` entry: `Cache-Control: public, max-age=300…` (lists) or `1800` (detail), `CDN-Cache-Control: max-age=2592000, stale-while-revalidate=60`.
2. Add the path to the `public-html-allowlist` Cache Rule in the Cloudflare dashboard — otherwise it is simply never cached.
3. If publishing it should invalidate the site, make sure its content directory is in the workflow's `paths` filter.

**Private / auth-gated page:**
1. `vercel.json` entry with `private, no-store` + `CDN-Cache-Control: no-store`.
2. Add to `config.matcher` **and** `needsSession` in `middleware.ts`.
3. Server-side guard in the page itself (`requireSuperAdmin`) — middleware only checks that a session cookie exists, not who owns it.
4. **Do not** add it to the Cloudflare allowlist. No dashboard work at all.
5. `metadata.robots = { index: false, follow: false }`.

Never render user- or session-specific data into a page on the public list. That was the `/newsletter` Trending bug: the SuperAdmin gate was client-side while the data was server-rendered into publicly cached HTML.

## Gotchas

- **Headers alone do not cache HTML at Cloudflare.** Without a Cache Rule you get `cf-cache-status: DYNAMIC` no matter how generous `CDN-Cache-Control` is. This invalidated the original assumption in ADR 0007.
- **Route groups do not change the URL.** `app/(digest)/trending/page.tsx` still serves `/trending`, so the allowlist and `vercel.json` sources keep matching. Moving a page between groups is cache-neutral.
- **Route segment config in a layout cascades to every child.** Never put `dynamic` / `revalidate` in `app/(digest)/layout.tsx` — it would drag `/newsletter` out of its 30-day edge cache. Keep it on the individual page.
- **`revalidate` on an auth-gated page is dead config.** `app/news/page.tsx` declares `revalidate = 300`, but calling `auth()` makes the route dynamic; the build output shows `ƒ /news`. Harmless, but do not read it as "the page is cached for 5 minutes".
- **Two independent layers protect private routes:** absence from the allowlist, and `no-store` from origin. Either one alone is sufficient; keep both.
- **Editing a published markdown file without a deploy changes nothing** for up to 30 days at the edge. Publishing is a Git push.
- **When something looks stale, reason about all layers at once.** Shortening one TTL usually just masks a hit at a different layer.

## Verifying

```bash
# Public: expect 200, cache-eligible, HIT on the second call
curl -sI https://motyl.dev/newsletter | grep -i 'cache-control\|cf-cache-status'

# Private: expect 307 to sign-in, private/no-store, cf-cache-status: DYNAMIC
curl -sI https://motyl.dev/trending | grep -i 'location\|cache-control\|cf-cache-status'
```

Run both after any change to `vercel.json`, `middleware.ts`, or the Cloudflare rule. The Cloudflare half of this system lives outside version control, so `curl` is the only real proof.
