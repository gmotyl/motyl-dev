# Cache aggressively at every layer; rely on Git-driven deploys for invalidation

> **Superseded in part by [ADR 0008](./0008-cloudflare-html-cache-with-publish-purge.md):** the Cloudflare layer (point 1) never worked as described — Cloudflare does not cache HTML without a Cache Rule — and implicit invalidation-by-deploy does not apply to Cloudflare. Layers 2–4 stand.

Four cache layers, configured for a publication where content changes only on deploy:

1. **Cloudflare edge** (DNS-proxied in front of Vercel): respects `CDN-Cache-Control` from `vercel.json`. List pages (`/news`, `/articles`) cached 1h; detail pages (`/news/:slug*`, `/articles/:slug*`) cached 30d. `stale-while-revalidate=60` lets readers see the previous version while a refresh runs in the background.
2. **Vercel Edge Network** (same `CDN-Cache-Control` directive applies).
3. **Browser** (`Cache-Control max-age`): list pages 5 min; detail pages 30 min. Shorter than the CDN values so a returning reader still benefits from edge freshness.
4. **App-level**: a build-time JSON cache (`data/content-cache.json` from `scripts/build-content-cache.ts`) is imported as a module so reads are zero-RT; `lib/articles.ts` and `lib/newsletter-issues.ts` wrap loads in React's `cache()` so the same request reuses the parse.

Client-side, the polish from the network-optimisation incident is locked in: `prefetch={false}` on article `<Link>` components (one prefetch per visible card was generating ~70 requests per page), a 5-second TTL dedup on `useVisitedArticles` GETs, 500ms batching on view POSTs, and NextAuth's `SessionProvider refetchInterval={0}` to kill session polling. The service worker (`/sw.js`) is the one cache deliberately disabled (`max-age=0, must-revalidate`) — PWA installs must update on every visit.

Invalidation is implicit: a Vercel deploy is a new edge cache key, so publishing flows through a Git push and the 30-day TTL never matters in practice. The **Maintainer** never reaches for a manual purge.

## Considered Options

- **Per-request rendering with no edge cache** — rejected: forces every read through a Vercel function, blowing the request budget and slowing first paint.
- **Cloudflare Page Rules to override the headers** — rejected: keeps cache policy in source (`vercel.json`) where it's diff-reviewable rather than in a dashboard.
- **Short TTLs (minutes) on detail pages** — rejected: detail pages are immutable per deploy; long TTLs are correct.

## Consequences

- A hotfix to an already-published News Article must go through a deploy; in-place markdown edits without a deploy will not be seen for up to 30 days at the edge.
- The interplay between layers means a "fix" at one layer (e.g. shortening `s-maxage`) can mask the real issue (a stale browser cache); always reason about all four layers together.
- The service-worker bypass is necessary — without it, a deployed update to the PWA shell could be stuck on a client for weeks.
