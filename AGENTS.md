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

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **motyl-dev** (1784 symbols, 2783 relationships, 57 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/motyl-dev/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/motyl-dev/context` | Codebase overview, check index freshness |
| `gitnexus://repo/motyl-dev/clusters` | All functional areas |
| `gitnexus://repo/motyl-dev/processes` | All execution flows |
| `gitnexus://repo/motyl-dev/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## CLI

- Re-index: `npx gitnexus analyze`
- Check freshness: `npx gitnexus status`
- Generate docs: `npx gitnexus wiki`

<!-- gitnexus:end -->
