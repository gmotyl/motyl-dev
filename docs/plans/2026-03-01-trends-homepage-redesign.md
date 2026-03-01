# Homepage Redesign: Trends & News Focus (2026-03-01)

**Project:** motyl-dev
**Status:** Design Approved
**Focus:** Transform homepage from personal CV to trending/news aggregation with community voting

## Overview

Redesign the motyl.dev homepage to shift focus from "about me" to "what's trending in frontend & AI." Implement a weekly voting system where visitors upvote trending links, which feed into AI-generated weekly summaries published via PR.

## Key Changes

### 1. Homepage Restructure (`/`)

**Remove:**
- Testimonials section
- About me section (moved to `/about`)

**Add:**
- Hero with "🔥 What's Hot in Frontend & AI This Week"
- Unified feed mixing:
  - Trending items (voteable, sorted by votes)
  - Latest personal articles (non-voteable)
  - Vote counts and engagement metrics
  - Info icon explaining voting system

**Sections:**
1. Hero/Header with trending stats
2. Unified Feed (trending + articles mixed)
3. "From Last Week" archive section
4. Donation CTA ("☕ Fuel Quality Content" or similar)

### 2. New Pages

#### `/about` (New)
- "About Me" content moved from homepage
- Bio, expertise cards, mission statement
- Donation section (secondary)

#### `/me` (Existing)
- Add superadmin panel:
  - 🔴 Button: "Reset Weekly Votes"
  - Archives current week votes
  - Clears vote counter
  - Resets for new week

### 3. Navigation (Desktop)
- Modern, engaging header
- Sticky position with glassmorphic effect (backdrop blur, semi-transparent)
- Links: "Trending" | "Articles" | "About Me" | "Subscribe"
- Prominent "☕ Support" button (right side, accent color)
- Theme toggle
- Smooth hover animations, focus rings

### 4. Voting System

**Database Schema:**
```sql
trends_votes:
- id (UUID)
- week (VARCHAR, e.g., '2026-w10')
- link_url (TEXT, unique per week)
- title (TEXT)
- description (TEXT)
- category (VARCHAR: 'frontend', 'ai', 'tools', etc.)
- vote_count (INT, default 0)
- source_domain (VARCHAR)
- created_at, updated_at

trends_votes_archive:
- id (UUID)
- week (VARCHAR)
- summary_markdown (TEXT)
- total_votes (INT)
- created_at
```

**Weekly Cycle:**
- **Mon-Sat:** Visitors vote on trending links
- **Sunday:**
  - Run `pnpm trends:generate`
  - CLI reads votes, generates markdown summary
  - Creates PR with summary
  - Archives current week votes
  - Resets vote counter to 0
  - Previous week summary → "From Last Week" section

### 5. Voting UI Components

**Vote Button:**
- Upvote icon + count next to each link
- Hover state: scale animation + color change
- Voted state: filled icon + success animation (pulse)
- Accessibility: ARIA labels, keyboard accessible
- Mobile: min 44x44px touch target

**Info Icon:**
- Tooltip on hover: "Upvote any link from our news to surface trends"
- Explains voting system to new visitors

**Vote Count Display:**
- Clear, readable (e.g., "89 votes")
- Updates in real-time without page reload

### 6. API Endpoints

```
GET /api/trends/votes?week=2026-w10
  → Returns all votes for a week (JSON for CLI)

POST /api/trends/votes
  → Cast a vote
  → Body: { linkUrl, title, description, category, sourceDomain }
  → Optional: { email } (for newsletter signup)

GET /api/trends/feed
  → Returns homepage feed data (trending + articles)

POST /api/trends/reset (superadmin only)
  → Archives current week, resets counter
```

### 7. CLI Command: `pnpm trends:generate`

**Flow:**
1. Fetch current week votes from `/api/trends/votes?week=2026-w10`
2. Generate markdown summary (grouped by category, sorted by votes)
3. Create new file: `content/trends/2026-w10-summary.md`
4. Create git branch: `feature/trends-2026-w10`
5. Commit summary
6. Create PR
7. Archive votes to `trends_votes_archive`
8. Reset vote counter via `POST /api/trends/reset`

**Output Example:**
```markdown
# Frontend & AI Trends: Week 10 (Mar 1-7, 2026)

## Frontend
- **[Item 1]** (89 votes) - Description
- **[Item 2]** (67 votes) - Description

## AI
- **[Item 1]** (156 votes) - Description

## Tools
- **[Item 1]** (45 votes) - Description
```

### 8. Design System (Tailwind v4 CSS-First)

**Color Tokens (OKLCH):**
- Primary (purple): `oklch(45% 0.2 260)` — trending/engagement
- Accent (orange): `oklch(65% 0.15 28)` — CTAs, donations
- Success (green): `oklch(65% 0.15 142)` — vote confirmation
- Muted: Secondary content styling

**Components:**
- Vote button (CVA variants: primary, voted, disabled)
- Trending card (title, description, vote button, source)
- Article card (title, excerpt, no vote button)
- Info icon + tooltip
- Donation CTA (prominent, accent color)

**Animations:**
- Vote pulse (0.3s scale animation on successful vote)
- Hover states (smooth transitions)
- Focus rings (WCAG AA compliant)

### 9. Accessibility & Performance

**WCAG 2.1 AA:**
- Color contrast ratios ≥ 4.5:1
- Focus rings on all interactive elements
- ARIA labels on vote buttons, info icons
- Semantic HTML structure
- Keyboard navigation throughout

**Performance:**
- Lazy load voting endpoint
- Optimized images
- CSS animations (GPU-accelerated)
- Server-side render trending feed
- Cache vote counts

### 10. Donation Integration

**Labels (Catchy):**
- "☕ Fuel Quality Content"
- "💝 Support The Mission"
- "🚀 Help Me Keep Going"
- "❤️ Support My Work"

**Placement:**
- Homepage: End of feed or floating button
- About page: Larger, more prominent section
- Me page: Secondary placement

**Copy:** "Your support helps me keep sharing quality insights without ads or paywalls."

## Implementation Phases

### Phase 1: Database & API
- Create `trends_votes` table
- Implement vote endpoints
- Implement feed endpoint

### Phase 2: UI Components
- Vote button component (CVA variants)
- Trending card component
- Info icon + tooltip
- Refactor navigation

### Phase 3: Homepage Redesign
- Remove testimonials section
- Restructure layout (unified feed)
- Add voting UI
- Add donation CTA

### Phase 4: New Pages
- Create `/about` page (move About Me content)
- Update `/me` page (add superadmin panel)

### Phase 5: CLI Command
- Implement `trends:generate` command
- Test vote archiving + reset

### Phase 6: Testing & Polish
- Accessibility audit (WCAG AA)
- Mobile responsiveness testing
- Vote system E2E testing
- Performance optimization

## Success Criteria

✅ Homepage shifted to trends focus
✅ Voting system functional (DB + API + UI)
✅ Weekly cycle works (generate summary → PR → reset)
✅ Responsive design (mobile + tablet + desktop)
✅ WCAG 2.1 AA compliant
✅ Donation CTAs visible on homepage + about page
✅ Admin panel on `/me` page for superadmin vote reset

## Files to Create/Modify

**New Files:**
- `app/about/page.tsx` — About page
- `components/vote-button.tsx` — Vote button component
- `components/trending-card.tsx` — Trending item card
- `lib/trends.ts` — Trends API utilities
- `scripts/trends-generate.ts` — CLI command
- `docs/plans/2026-03-01-trends-homepage-redesign.md` — This doc

**Modified Files:**
- `app/page.tsx` — Homepage redesign
- `app/me/page.tsx` — Add superadmin panel
- `components/header.tsx` — Navigation redesign
- `components/footer.tsx` — Update links if needed
- Database migrations — Create `trends_votes` table
- `app/api/trends/...` — New API routes

## Notes

- Voting data stored in DB (allows historical analysis)
- Weekly reset is superadmin-only action
- CLI command can run automatically (cron job) or manually
- Markdown summary is editable before PR merge (manual curation)
- "From Last Week" is auto-updated on vote reset

