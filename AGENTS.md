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

- `lib/articles.ts` — Article CRUD, hashtag filtering, sorting
- `app/page.tsx` — Landing page (hero, about, newsletter, testimonials)
- `app/articles/page.tsx` — Article listing with hashtag filters
- `components/ui/` — Radix UI primitives styled with Tailwind

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

Edit `app/page.tsx`:
- Hero: lines 45-109
- About: lines 111-163
- Newsletter: lines 165-256
- Testimonials: lines 303-378

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
