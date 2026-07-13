# Cache HTML at Cloudflare via allowlist Cache Rule; purge explicitly on publish

ADR 0007 assumed Cloudflare honored `CDN-Cache-Control` and that deploys implicitly invalidated the edge. Production disproved both: Cloudflare returned `cf-cache-status: DYNAMIC` for `/`, `/articles` and `/news` (HTML is never cache-eligible without a Cache Rule), and Cloudflare knows nothing about Vercel deploys. Meanwhile bot traffic (~500K edge requests/month) passed straight through to Vercel, blowing the Edge CPU and Fluid CPU budgets on the free tier.

Decision:

1. **Allowlist Cache Rule** — a Cloudflare Cache Rule makes HTML cache-eligible only for the public surface: `/`, `/articles*`, `/newsletter*`, `/about`, `/privacy`, `/sitemap.xml`, RSS. Allowlist over blocklist so a forgotten private route fails safe (uncached). TTL policy stays in `vercel.json` (`CDN-Cache-Control`, per ADR 0007's reviewability rationale); the rule uses "respect origin". If Cloudflare in practice ignores `CDN-Cache-Control` on the free plan, the fallback is an explicit 30-day Edge TTL in the rule — a recorded deviation, verified by `curl` after rollout.
2. **Long TTLs on lists too** — `/`, `/articles`, `/newsletter` move from 1h to 30d at the edge. Trending Link vote counts shown on the homepage may be stale for anonymous visitors; acceptable because Votes are now the Maintainer's internal curation signal (news is SuperAdmin-only), not a public feature.
3. **Explicit purge on publish** — a GitHub Action fires on `push` (paths-filtered to `articles/**` and `content/trends/**`, i.e. a new Blog Article or Newsletter Issue) and then polls the GitHub Deployments API, waiting until the Vercel Production deployment for that pushed SHA reports success before purging the whole Cloudflare zone. If the deployment fails or the poll times out, the job exits without purging. Daily News Article pushes don't match the paths filter and never trigger the job — News is SuperAdmin-only and uncached. Purge-everything over purge-by-URL: publishes are rare, refill is a few hundred requests, and URL enumeration rots silently.
4. **`/news*` is `private, no-store`** — the previous `public, s-maxage=2592000` headers on auth-gated news routes were a latent leak; harmless only while no cache honored HTML. Corrected as part of this change.
5. **Bot Fight Mode on; AI crawlers allowed** — verified search crawlers pass, bad-bot signatures are challenged. AI crawlers stay allowed: with HTML cached at Cloudflare their hits cost nothing, and blocking would remove articles from AI-search corpora.

## Considered Options

- **Serve news content at runtime (DB/GitHub) to avoid deploys** — deferred: doesn't address the actual overage (runtime compute from bot traffic), and requires refactoring the build-time content cache.
- **Purge-by-URL** — rejected: requires enumerating every affected page (lists, sitemap, RSS) and rots silently.
- **Purge immediately at push time, without waiting for the deploy** — rejected: purging before the new deployment is live refills Cloudflare from the *old* deployment while Vercel is still building; polling the Deployments API until the Production deployment of that SHA succeeds closes that gap. (The paths-filtered `on: push` trigger itself is what we use — only the purge-before-deploy-is-live behavior was rejected.)
- **Blocking AI crawlers** — rejected: no cost benefit once HTML is edge-cached, and loses AI-search visibility.

## Consequences

- Publishing a Blog Article or Newsletter Issue is what invalidates the public site; anything else (News pushes, code-only deploys) leaves the Cloudflare cache warm — intentionally.
- The middleware matcher shrinks to auth-gated routes only (`/news/:path*`, `/bookmarks/:path*`, `/read-all-news/:path*`, `/api/content`); `/articles/*` no longer runs middleware. Visited-article indicators on public pages are client-side (`useVisitedArticles` / localStorage), which was already the live mechanism.
- Requires `CLOUDFLARE_ZONE_ID` and a purge-scoped `CLOUDFLARE_API_TOKEN` as GitHub Actions secrets.

Supersedes the Cloudflare layer and the implicit-invalidation claim of [ADR 0007](./0007-multi-layer-caching-strategy.md); its Vercel, browser and app-level layers stand unchanged.
