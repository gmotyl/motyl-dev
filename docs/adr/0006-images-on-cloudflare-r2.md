# Issue Covers and other image assets live in a Cloudflare R2 bucket (`motyl-dev-img`), exposed at `https://img.motyl.dev`

`/publish-image` optimises a source file to WebP, uploads it to R2 via `wrangler`, and the resulting URL is pinned in the Newsletter Issue / News Article frontmatter. R2 was picked over Vercel Blob, AWS S3, and hosting from the Next.js `public/` directory for three reasons: egress is free at R2 (the same files are re-served from Newsletter Issue emails, social repurpose posts, and OG image fetches by crawlers — egress would dominate cost on S3); the asset URLs are stable across Vercel deploys (a `public/` asset's URL is tied to the deployment); and a dedicated CDN host (`img.motyl.dev`) decouples image loads from the app's request budget.

## Considered Options

- **Vercel Blob** — rejected: vendor-lock with the host, less attractive pricing at the egress shape we have.
- **AWS S3 + CloudFront** — rejected on egress cost and operational surface for a one-bucket use case.
- **`public/` in the repo** — rejected: bloats the deployment bundle and ties asset lifetime to a deploy.

## Consequences

- Image URLs in markdown are vendor-coupled to `img.motyl.dev`; a Cloudflare account change requires URL rewrites or a DNS migration.
- Publishing an image requires `wrangler` and `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN` in `.env`.
