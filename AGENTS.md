# AI Agent Instructions

This is the central reference for all AI assistants working on the motyl.dev project.

---

## Self-Improvement Rule

When you discover:
- A correction that should be documented
- A new pattern worth preserving
- Missing guidelines that caused confusion

**→ Suggest updating this file (AGENTS.md)** to prevent future mistakes and help other agents.

---

## Project Overview

**motyl.dev** is a personal tech blog and newsletter platform by Grzegorz Motyl. The platform delivers:
- **Curated newsletters** — Best-of-best from tech newsletters
- **Audio-friendly content** — Optimized for text-to-speech readers
- **Personal articles** — Insights on architecture, development, and growth

**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI
**Deployment**: Vercel
**Package Manager**: pnpm

---

## Architecture Patterns

### Directory Structure

```
/motyl-dev
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page
│   ├── articles/            # Curated articles (hand-picked content)
│   ├── news/                # Generated news (AI-processed newsletters)
│   └── api/                 # API routes
├── articles/                 # Markdown: curated, personal insights
├── news/                     # Markdown: AI-generated from newsletters
├── components/
│   └── ui/                  # Radix UI + Tailwind components
└── lib/
    └── articles.ts          # Article CRUD and filtering
```

### Content Types

| Directory | Purpose | Source |
|-----------|---------|--------|
| `/articles` | Hand-curated content, personal insights | Manual |
| `/news` | AI-processed newsletter content | Automated pipeline |

### Key Files

- `lib/content/articles.ts` — Article CRUD, hashtag filtering, sorting
- `app/page.tsx` — Landing page (hero, latest issue, recent issues, from the blog, subscribe, support CTA)
- `app/articles/page.tsx` — Article listing with hashtag filters
- `components/ui/` — Radix UI primitives styled with Tailwind
- `docs/caching.md` — **read before touching `vercel.json`, `middleware.ts`, route segment config, or adding any route.** Public routes are edge-cached 30 days; private routes are `no-store` and stay off the Cloudflare allowlist. Half the config lives in the Cloudflare dashboard, not in this repo.

### `lib/` layout

`lib/` is grouped by domain — put a new module in the folder that owns its concern rather than at the root.

| Folder | Owns |
|--------|------|
| `lib/db/` | Prisma client singleton |
| `lib/auth/` | NextAuth session + super-admin guard |
| `lib/content/` | **Content** model, article/news loading, sections, slugs, URLs, OG images |
| `lib/newsletter/` | **Newsletter Issue** parsing, send queue, email markdown |
| `lib/trends/` | **Trending Link** feed, votes, **News Source** pattern stats |
| `lib/tts/` | Speech synthesis — chunking, pronunciation, voices, client |
| `lib/reader/` | Reader/player behaviour — scroll targets, media-session tracks |
| `lib/engagement/` | Bookmarks, article view counts |
| `lib/shell/` | App-shell concerns — nav links, PWA helpers, cookie consent |

Conventions:

- `lib/utils.ts` stays at the root — shadcn's `components.json` pins `"utils": "@/lib/utils"`.
- Filenames don't repeat their folder (`lib/tts/speech.ts`, not `lib/tts/tts-speech.ts`).
- Import across `lib/` folders via the `@/lib/...` alias, never a `../` relative path.
- Tests stay co-located next to the module they cover.
- No barrel `index.ts` files — import the module directly.

---

## Code Conventions

### General Rules

- **TypeScript** for all code
- **Tailwind CSS** for styling (no CSS-in-JS)
- **Conventional commits**: `feat:`, `fix:`, `chore:`, `docs:`
- **pnpm** as package manager (never npm or yarn)

### Article Frontmatter Format

```yaml
---
title: 'Article Title'
excerpt: 'Brief summary for previews'
publishedAt: '2025-01-24'
slug: 'article-slug'
hashtags: '#react #nextjs #typescript'
---
```

---

## Testing Protocol

The project follows **Test-Driven Development (TDD)** for bug fixes:

1. **Write a failing test** that demonstrates the bug
2. **Verify the test fails** without the fix
3. **Apply the fix**
4. **Verify the test passes**

### Commands

```bash
pnpm test --run     # Run all tests once
pnpm test           # Watch mode
pnpm build          # Verify production build
pnpm dev            # Development server
```

---

## Verification Checklist

After making changes:

- [ ] Run `pnpm test --run` — all tests pass
- [ ] Run `pnpm build` — production build succeeds
- [ ] Check for TypeScript errors
- [ ] Follow conventional commit format

---

## Design System

### Brand Colors

- Primary: `#8B5CF6` (Deep Purple)
- Accent: `#A855F7` (Bright Purple)
- Highlight: `#D946EF` (Electric Purple)

### UI Patterns

- Glassmorphism: `backdrop-blur-sm` + `bg-background/50`
- Border glow effects on hover
- Dark theme by default

---

## Common Tasks

### Adding an Article

1. Create `articles/your-slug.md`
2. Add frontmatter (title, excerpt, publishedAt, slug, hashtags)
3. Write content in Markdown
4. Article appears automatically on `/articles`

### Modifying Landing Page

Edit `app/page.tsx` (dark editorial layout, `max-w-6xl`). Sections top-to-bottom:
- Hero (title + tagline): `{/* Hero */}` ~line 40
- Latest issue feature: `<NewsletterHero>` ~line 50
- Recent issues (violet, image-top): `{/* Recent issues */}` ~line 53 — uses `NewsletterIssueCard`
- From the blog (amber, image-left): `{/* From the blog */}` ~line 78 — uses `BlogArticleCard`
- Subscribe: `{/* Subscribe */}` ~line 101
- Support CTA: `{/* Support CTA */}` ~line 115

Reusable cards live in `components/`: `newsletter-hero.tsx`, `newsletter-issue-card.tsx`, `blog-article-card.tsx` (shared with `/newsletter`). Newsletter issues = violet accent; blog articles = amber — keep them visually distinct.

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/articles` | GET | List all articles |
| `/api/articles/[slug]` | GET | Get single article |
| `/api/subscribe` | POST | Newsletter subscription |

---

## Environment Variables

```bash
RESEND_API_KEY=     # Email notifications (optional)
```

---

## Remember

- Read files before modifying them
- Follow existing patterns in the codebase
- Keep changes focused and minimal
- Suggest AGENTS.md updates when you learn something new

