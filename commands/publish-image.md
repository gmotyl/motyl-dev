---
description: Optimize image, upload to Cloudflare R2, insert URL into article frontmatter
allowed-tools: ["Read", "Edit", "Bash", "Glob"]
argument-hint: <path-to-image> [article-slug]
---

Optimize an image with sharp, upload to Cloudflare R2, and automatically insert the CDN URL into the target article's frontmatter.

**Arguments:**

- Required: path to image file (any format supported by sharp: jpg, png, webp, avif, etc.)
- Optional: article slug — if omitted, auto-detects the most recently modified `.md` in `articles/`

**Prerequisites:**
- `wrangler` CLI must be installed (`pnpm add -D wrangler` or `npm i -g wrangler`)
- Cloudflare credentials in `.env`: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `R2_BUCKET_NAME`, `CDN_BASE_URL`

---

## Step 1: Resolve the target article

If a slug argument was provided:
- Look for `articles/[slug].md` — confirm it exists

If no slug provided:
- Run: `ls -t articles/*.md | head -5` to list 5 most recently modified files
- Show the list to the user: "Detected article: **[filename]** — correct? (Y/n or enter another slug)"
- Wait for confirmation before proceeding

## Step 2: Validate image path

- Check that the image file exists at the provided path
- Read file size and report it
- Determine base name (without extension) — this will be used as the R2 object key

## Step 3: Optimize image

Run the optimize script — it converts to `.webp` and targets ≤100 KB:

```bash
pnpm image:optimize <path-to-image>
```

The output file will be `<same-directory>/<name>.webp`.

Report: original size → optimized size.

## Step 4: Load Cloudflare config

Read `.env` (or `.env.local`) for:
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `R2_BUCKET_NAME` (e.g. `motyl-assets`)
- `CDN_BASE_URL` (e.g. `https://cdn.motyl.dev`)

If any are missing, stop and tell the user exactly which variables are needed.

## Step 5: Upload to Cloudflare R2

Derive the object key from the article slug:
```
blog/[article-slug].[ext]
```

Upload using wrangler:
```bash
CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_API_TOKEN=... \
  npx wrangler r2 object put [R2_BUCKET_NAME]/blog/[article-slug].webp \
  --file <optimized-webp-path> \
  --content-type image/webp
```

On success, construct the CDN URL:
```
[CDN_BASE_URL]/blog/[article-slug].webp
```

## Step 6: Update article frontmatter

Read the target article `.md` file. Find or add the `image:` field in frontmatter:

- If `image:` already exists — update its value
- If it doesn't exist — add it after the `excerpt:` line

Example frontmatter result:
```yaml
---
title: "..."
excerpt: "..."
image: "https://cdn.motyl.dev/blog/my-article-slug.webp"
publishedAt: "..."
---
```

Use the Edit tool to make this change precisely.

## Step 7: Report

Print a summary:
```
✓ Optimized: [original] → [optimized size] KB
✓ Uploaded:  [CDN URL]
✓ Updated:   articles/[slug].md (image field)
```
