# Trends Homepage Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform homepage from personal CV to trending/news aggregation with community voting, weekly summaries, and donation CTAs.

**Architecture:** Database-backed voting system with React components for UI. Weekly CLI command generates AI summaries from vote data, creates PRs for manual review & publishing.

**Tech Stack:** Next.js 16, TypeScript, Tailwind v4, Drizzle ORM, React 19, SQLite/PostgreSQL, shadcn/ui

---

## Phase 1: Database Setup

### Task 1: Create Drizzle migration for trends_votes table

**Files:**
- Create: `drizzle/migrations/0001_create_trends_votes.sql`
- Modify: `drizzle.config.ts` (if not already configured)

**Step 1: Create migration file**

```sql
-- drizzle/migrations/0001_create_trends_votes.sql
CREATE TABLE trends_votes (
  id TEXT PRIMARY KEY,
  week TEXT NOT NULL,
  link_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'other',
  vote_count INTEGER NOT NULL DEFAULT 0,
  source_domain TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(week, link_url)
);

CREATE INDEX idx_trends_votes_week ON trends_votes(week);
CREATE INDEX idx_trends_votes_vote_count ON trends_votes(vote_count DESC);
```

**Step 2: Run migration**

Run: `npm run db:migrate`
Expected: "Migration completed successfully"

**Step 3: Commit**

```bash
git add drizzle/migrations/0001_create_trends_votes.sql
git commit -m "feat: create trends_votes table migration"
```

### Task 2: Create Drizzle schema for trends_votes

**Files:**
- Create: `lib/db/schema.ts`

**Step 1: Define schema**

```typescript
// lib/db/schema.ts
import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'

export const trendsVotes = sqliteTable(
  'trends_votes',
  {
    id: text('id').primaryKey(),
    week: text('week').notNull(),
    linkUrl: text('link_url').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    category: text('category').default('other').notNull(),
    voteCount: integer('vote_count').default(0).notNull(),
    sourceDomain: text('source_domain'),
    createdAt: text('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text('updated_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    weekIdx: sql`CREATE INDEX idx_trends_votes_week ON ${table.week}`,
    voteCountIdx: sql`CREATE INDEX idx_trends_votes_vote_count ON ${table.voteCount}`,
  })
)

export type TrendsVote = typeof trendsVotes.$inferSelect
export type NewTrendsVote = typeof trendsVotes.$inferInsert
```

**Step 2: Commit**

```bash
git add lib/db/schema.ts
git commit -m "feat: define trends_votes schema with Drizzle"
```

### Task 3: Create archive table migration

**Files:**
- Create: `drizzle/migrations/0002_create_trends_archive.sql`

**Step 1: Create migration**

```sql
-- drizzle/migrations/0002_create_trends_archive.sql
CREATE TABLE trends_votes_archive (
  id TEXT PRIMARY KEY,
  week TEXT NOT NULL UNIQUE,
  summary_markdown TEXT NOT NULL,
  total_votes INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trends_archive_week ON trends_votes_archive(week);
```

**Step 2: Add to schema**

```typescript
// Add to lib/db/schema.ts
export const trendsArchive = sqliteTable('trends_votes_archive', {
  id: text('id').primaryKey(),
  week: text('week').notNull().unique(),
  summaryMarkdown: text('summary_markdown').notNull(),
  totalVotes: integer('total_votes').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export type TrendsArchive = typeof trendsArchive.$inferSelect
export type NewTrendsArchive = typeof trendsArchive.$inferInsert
```

**Step 3: Run migration & commit**

```bash
npm run db:migrate
git add drizzle/migrations/0002_create_trends_archive.sql lib/db/schema.ts
git commit -m "feat: create trends_votes_archive table"
```

---

## Phase 2: API Endpoints

### Task 4: Create POST /api/trends/votes endpoint

**Files:**
- Create: `app/api/trends/votes/route.ts`
- Create: `lib/trends.ts` (utilities)

**Step 1: Create utility functions**

```typescript
// lib/trends.ts
import { db } from '@/lib/db'
import { trendsVotes } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export async function getCurrentWeek(): Promise<string> {
  const now = new Date()
  const year = now.getFullYear()
  const weekNum = Math.ceil(
    (now.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)
  )
  return `${year}-w${String(weekNum).padStart(2, '0')}`
}

export async function castVote(
  linkUrl: string,
  title: string,
  description: string,
  category: string,
  sourceDomain?: string
) {
  const week = await getCurrentWeek()

  const existing = await db
    .select()
    .from(trendsVotes)
    .where(and(eq(trendsVotes.week, week), eq(trendsVotes.linkUrl, linkUrl)))
    .limit(1)

  if (existing.length > 0) {
    // Increment vote count
    return await db
      .update(trendsVotes)
      .set({ voteCount: existing[0].voteCount + 1 })
      .where(eq(trendsVotes.id, existing[0].id))
      .returning()
  } else {
    // Create new vote entry
    return await db
      .insert(trendsVotes)
      .values({
        id: uuidv4(),
        week,
        linkUrl,
        title,
        description,
        category,
        sourceDomain,
      })
      .returning()
  }
}

export async function getWeekVotes(week: string) {
  return await db
    .select()
    .from(trendsVotes)
    .where(eq(trendsVotes.week, week))
    .orderBy((table) => [table.voteCount, table.createdAt])
}
```

**Step 2: Create API route**

```typescript
// app/api/trends/votes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { castVote, getCurrentWeek } from '@/lib/trends'
import { z } from 'zod'

const voteSchema = z.object({
  linkUrl: z.string().url('Invalid URL'),
  title: z.string().min(1, 'Title required'),
  description: z.string().optional(),
  category: z.enum(['frontend', 'ai', 'tools', 'other']).default('other'),
  sourceDomain: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = voteSchema.parse(body)

    const result = await castVote(
      data.linkUrl,
      data.title,
      data.description || '',
      data.category,
      data.sourceDomain
    )

    return NextResponse.json(
      { success: true, vote: result[0] },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request', details: error instanceof Error ? error.message : '' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  const weekParam = request.nextUrl.searchParams.get('week')

  try {
    const { getWeekVotes } = await import('@/lib/trends')
    const week = weekParam || (await getCurrentWeek())
    const votes = await getWeekVotes(week)

    return NextResponse.json({ week, votes }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch votes' },
      { status: 500 }
    )
  }
}
```

**Step 3: Test endpoint**

Run: `npm run dev` and test POST to `http://localhost:3000/api/trends/votes`

**Step 4: Commit**

```bash
git add lib/trends.ts app/api/trends/votes/route.ts
git commit -m "feat: implement POST/GET /api/trends/votes endpoint"
```

### Task 5: Create GET /api/trends/feed endpoint

**Files:**
- Modify: `lib/trends.ts`
- Create: `app/api/trends/feed/route.ts`

**Step 1: Add feed utility function**

```typescript
// Add to lib/trends.ts
export async function getHomepageFeed() {
  const week = await getCurrentWeek()
  const previousWeek = getPreviousWeek(week)

  // Get trending items from current week
  const currentWeekVotes = await db
    .select()
    .from(trendsVotes)
    .where(eq(trendsVotes.week, week))
    .orderBy((table) => table.voteCount)
    .limit(20)

  // Get last week's archive
  const lastWeekArchive = await db
    .select()
    .from(trendsArchive)
    .where(eq(trendsArchive.week, previousWeek))
    .limit(1)

  return {
    currentWeek: week,
    trendings: currentWeekVotes,
    lastWeekSummary: lastWeekArchive[0] || null,
  }
}

function getPreviousWeek(week: string): string {
  const [year, weekNum] = week.split('-w').map(Number)
  if (weekNum === 1) {
    return `${year - 1}-w52`
  }
  return `${year}-w${String(weekNum - 1).padStart(2, '0')}`
}
```

**Step 2: Create feed endpoint**

```typescript
// app/api/trends/feed/route.ts
import { NextResponse } from 'next/server'
import { getHomepageFeed } from '@/lib/trends'
import { getAllContentMetadata } from '@/lib/articles'

export async function GET() {
  try {
    const feed = await getHomepageFeed()
    const articles = await getAllContentMetadata()
    const latestArticles = articles.slice(0, 5)

    return NextResponse.json(
      {
        currentWeek: feed.currentWeek,
        trendings: feed.trendings,
        articles: latestArticles,
        lastWeekSummary: feed.lastWeekSummary,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}
```

**Step 3: Test endpoint**

Run: `curl http://localhost:3000/api/trends/feed`
Expected: JSON with trendings, articles, lastWeekSummary

**Step 4: Commit**

```bash
git add lib/trends.ts app/api/trends/feed/route.ts
git commit -m "feat: implement GET /api/trends/feed endpoint"
```

### Task 6: Create POST /api/trends/reset endpoint (superadmin only)

**Files:**
- Modify: `lib/trends.ts`
- Create: `app/api/trends/reset/route.ts`
- Modify: `lib/auth.ts` (add superadmin check)

**Step 1: Add reset utilities**

```typescript
// Add to lib/trends.ts
export async function resetWeeklyVotes() {
  const week = await getCurrentWeek()

  // Get current week votes
  const votes = await getWeekVotes(week)
  const totalVotes = votes.reduce((sum, v) => sum + v.voteCount, 0)

  // Archive votes (summary will be added by CLI)
  await db.insert(trendsArchive).values({
    id: v4(),
    week,
    summaryMarkdown: '', // To be updated by CLI
    totalVotes,
  })

  // Clear current week votes
  await db.delete(trendsVotes).where(eq(trendsVotes.week, week))

  return { week, archivedCount: votes.length, totalVotes }
}
```

**Step 2: Check superadmin role**

```typescript
// lib/auth.ts (add to existing file)
export function isSuperAdmin(userId?: string): boolean {
  // Implement your superadmin check here
  // Example: check environment variable or user record
  return process.env.SUPERADMIN_USER_ID === userId
}
```

**Step 3: Create reset endpoint**

```typescript
// app/api/trends/reset/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { resetWeeklyVotes } from '@/lib/trends'
import { isSuperAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')

  if (!isSuperAdmin(userId)) {
    return NextResponse.json(
      { error: 'Unauthorized: superadmin only' },
      { status: 403 }
    )
  }

  try {
    const result = await resetWeeklyVotes()
    return NextResponse.json(
      { success: true, archived: result },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reset votes' },
      { status: 500 }
    )
  }
}
```

**Step 4: Commit**

```bash
git add lib/trends.ts lib/auth.ts app/api/trends/reset/route.ts
git commit -m "feat: implement POST /api/trends/reset endpoint (superadmin)"
```

---

## Phase 3: UI Components

### Task 7: Create VoteButton component

**Files:**
- Create: `components/vote-button.tsx`
- Create: `components/__tests__/vote-button.test.tsx`

**Step 1: Write test**

```typescript
// components/__tests__/vote-button.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { VoteButton } from '@/components/vote-button'

describe('VoteButton', () => {
  it('renders vote count', () => {
    render(<VoteButton linkUrl="https://example.com" voteCount={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('shows voted state after click', async () => {
    render(<VoteButton linkUrl="https://example.com" voteCount={42} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(button).toHaveClass('voted')
    })
  })

  it('calls onVote callback', async () => {
    const onVote = jest.fn()
    render(
      <VoteButton linkUrl="https://example.com" voteCount={42} onVote={onVote} />
    )
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(onVote).toHaveBeenCalled()
    })
  })
})
```

**Step 2: Run test (should fail)**

Run: `npm run test -- vote-button.test.tsx`
Expected: FAIL - VoteButton not found

**Step 3: Implement component**

```typescript
// components/vote-button.tsx
'use client'

import { useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VoteButtonProps {
  linkUrl: string
  voteCount: number
  onVote?: () => void
  disabled?: boolean
}

export function VoteButton({
  linkUrl,
  voteCount,
  onVote,
  disabled = false,
}: VoteButtonProps) {
  const [voted, setVoted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleVote = async () => {
    setIsLoading(true)
    try {
      await fetch('/api/trends/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkUrl }),
      })
      setVoted(true)
      onVote?.()
    } catch (error) {
      console.error('Failed to vote:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={disabled || voted || isLoading}
      className={cn(
        'flex items-center gap-2 rounded-full px-3 py-1 text-sm transition-all',
        'border border-primary/20 hover:border-primary/40',
        voted
          ? 'bg-success/10 text-success border-success/40'
          : 'hover:bg-primary/5 text-muted-foreground'
      )}
      aria-label={`Upvote (${voteCount} votes)`}
    >
      <ThumbsUp className={cn('h-4 w-4', voted && 'fill-current')} />
      <span>{voteCount}</span>
    </button>
  )
}
```

**Step 4: Run test (should pass)**

Run: `npm run test -- vote-button.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add components/vote-button.tsx components/__tests__/vote-button.test.tsx
git commit -m "feat: create VoteButton component with voting logic"
```

### Task 8: Create TrendingCard component

**Files:**
- Create: `components/trending-card.tsx`

**Step 1: Implement component**

```typescript
// components/trending-card.tsx
import { VoteButton } from '@/components/vote-button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TrendingCardProps {
  title: string
  description?: string
  linkUrl: string
  voteCount: number
  category: string
  sourceDomain?: string
}

export function TrendingCard({
  title,
  description,
  linkUrl,
  voteCount,
  category,
  sourceDomain,
}: TrendingCardProps) {
  return (
    <div className="rounded-lg border border-primary/20 bg-background/50 backdrop-blur-sm p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold hover:text-primary transition-colors"
            >
              {title}
            </Link>
          </div>
          <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs text-primary font-medium whitespace-nowrap">
            {category}
          </span>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            {sourceDomain && <span>{sourceDomain}</span>}
          </div>
          <VoteButton linkUrl={linkUrl} voteCount={voteCount} />
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/trending-card.tsx
git commit -m "feat: create TrendingCard component"
```

### Task 9: Create InfoIcon tooltip component

**Files:**
- Create: `components/info-tooltip.tsx`

**Step 1: Implement component**

```typescript
// components/info-tooltip.tsx
'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InfoTooltipProps {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function InfoTooltip({ text, position = 'top' }: InfoTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="More information"
      >
        <Info className="w-3 h-3" />
      </button>

      {showTooltip && (
        <div
          className={cn(
            'absolute z-50 w-max max-w-xs px-3 py-2 text-xs text-white bg-foreground rounded-lg shadow-lg',
            positionClasses[position]
          )}
          role="tooltip"
        >
          {text}
          <div className="absolute w-2 h-2 bg-foreground transform rotate-45" />
        </div>
      )}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/info-tooltip.tsx
git commit -m "feat: create InfoTooltip component"
```

### Task 10: Redesign Header/Navigation component

**Files:**
- Modify: `components/header.tsx`

**Step 1: Update header with new navigation**

```typescript
// components/header.tsx
'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
          <div className="text-primary">motyl.dev</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Trending
          </Link>
          <Link
            href="/articles"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Articles
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About Me
          </Link>
          <Link
            href="/#newsletter"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Subscribe
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="bg-accent hover:bg-accent/90 text-white"
          >
            <a href="https://buymeacoffee.com/..." target="_blank" rel="noopener noreferrer">
              ☕ Support
            </a>
          </Button>

          {/* Mobile menu button */}
          <button
            md:hidden
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 md:hidden">
          <nav className="flex flex-col space-y-1 px-4 py-4">
            <a href="/" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
              Trending
            </a>
            <a href="/articles" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
              Articles
            </a>
            <a href="/about" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
              About Me
            </a>
            <a href="/#newsletter" className="px-3 py-2 text-sm rounded-md hover:bg-muted">
              Subscribe
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
```

**Step 2: Commit**

```bash
git add components/header.tsx
git commit -m "feat: redesign header with modern navigation and support button"
```

---

## Phase 4: Homepage Redesign

### Task 11: Refactor homepage to unified feed layout

**Files:**
- Modify: `app/page.tsx`
- Create: `components/home-feed.tsx`

**Step 1: Create feed component**

```typescript
// components/home-feed.tsx
'use client'

import { useEffect, useState } from 'react'
import { TrendingCard } from '@/components/trending-card'
import { InfoTooltip } from '@/components/info-tooltip'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface FeedItem {
  type: 'trending' | 'article'
  id: string
  title: string
  description?: string
  linkUrl?: string
  voteCount?: number
  category?: string
  sourceDomain?: string
  excerpt?: string
  slug?: string
  publishedAt?: string
}

export function HomeFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ currentWeek: '', trendingCount: 0, voteCount: 0 })

  useEffect(() => {
    async function loadFeed() {
      try {
        const res = await fetch('/api/trends/feed')
        const data = await res.json()

        // Merge trending items and articles
        const merged: FeedItem[] = [
          ...data.trendings.map((t: any) => ({
            type: 'trending' as const,
            id: t.id,
            title: t.title,
            description: t.description,
            linkUrl: t.linkUrl,
            voteCount: t.voteCount,
            category: t.category,
            sourceDomain: t.sourceDomain,
          })),
          ...data.articles.slice(0, 3).map((a: any) => ({
            type: 'article' as const,
            id: a.slug,
            title: a.title,
            excerpt: a.excerpt,
            slug: a.slug,
            publishedAt: a.publishedAt,
          })),
        ]

        setFeed(merged)
        setStats({
          currentWeek: data.currentWeek,
          trendingCount: data.trendings.length,
          voteCount: data.trendings.reduce((sum: number, t: any) => sum + t.voteCount, 0),
        })
      } catch (error) {
        console.error('Failed to load feed:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeed()
  }, [])

  if (loading) return <div className="text-center py-12">Loading feed...</div>

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            🔥 What's Hot in Frontend & AI This Week
          </h1>
          <InfoTooltip text="Upvote any link from our news to surface trends" />
        </div>
        <p className="text-lg text-muted-foreground">
          {stats.voteCount} votes cast • Week {stats.currentWeek}
        </p>
      </section>

      {/* Feed */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">🎯 What's Trending Now</h2>
        <div className="grid gap-4">
          {feed.map((item) =>
            item.type === 'trending' ? (
              <TrendingCard
                key={item.id}
                title={item.title}
                description={item.description}
                linkUrl={item.linkUrl!}
                voteCount={item.voteCount || 0}
                category={item.category || 'other'}
                sourceDomain={item.sourceDomain}
              />
            ) : (
              <Link
                key={item.id}
                href={`/articles/${item.slug}`}
                className="rounded-lg border border-muted bg-background/50 backdrop-blur-sm p-6 hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground line-clamp-2">
                  {item.excerpt}
                </p>
                <p className="text-xs text-primary/70 mt-4">
                  {new Date(item.publishedAt || '').toLocaleDateString()}
                </p>
              </Link>
            )
          )}
        </div>
      </section>

      {/* Donation CTA */}
      <section className="rounded-lg bg-gradient-purple-soft backdrop-blur-sm border border-primary/30 p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold">☕ Fuel Quality Content</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Help me keep sharing high-quality insights without ads or paywalls.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button asChild variant="default" size="lg">
            <a href="https://buymeacoffee.com/..." target="_blank" rel="noopener noreferrer">
              💝 Support My Work
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/articles">📖 Read All Articles</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Update homepage**

```typescript
// app/page.tsx - Simplified
import { HomeFeed } from '@/components/home-feed'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const dynamic = 'force-static'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Motyl.dev',
    url: 'https://motyl.dev',
    description: 'Frontend & AI trends, curated by Grzegorz Motyl',
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <HomeFeed />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add components/home-feed.tsx app/page.tsx
git commit -m "feat: redesign homepage with unified trending feed"
```

---

## Phase 5: New Pages

### Task 12: Create /about page

**Files:**
- Create: `app/about/page.tsx`
- Create: `components/about-hero.tsx`

**Step 1: Create components**

```typescript
// components/about-hero.tsx
import { Building, Code, Users } from 'lucide-react'

export function AboutHero() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold">About Grzegorz Motyl</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Senior Software Developer and Solution Architect with 20+ years of experience
          building scalable, maintainable frontend architectures.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-purple mx-auto">
            <Building className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-bold">Architecture Expert</h3>
          <p className="text-muted-foreground">
            Design scalable frontend architectures that grow with your business.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary mx-auto">
            <Code className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-bold">FP Advocate</h3>
          <p className="text-muted-foreground">
            Explore functional paradigms for maintainable, testable systems.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-highlight to-accent mx-auto">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-bold">Software Craftsman</h3>
          <p className="text-muted-foreground">
            Dedicated to raising the bar through disciplined practice and mentorship.
          </p>
        </div>
      </div>

      {/* Donation section */}
      <div className="rounded-lg bg-gradient-purple-soft border border-primary/30 p-8 space-y-4 text-center">
        <h3 className="text-2xl font-bold">Support My Work</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          If you find value in my insights and articles, consider supporting me.
        </p>
        <a
          href="https://buymeacoffee.com/..."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          ☕ Buy Me A Coffee
        </a>
      </div>
    </div>
  )
}
```

**Step 2: Create page**

```typescript
// app/about/page.tsx
import Header from '@/components/header'
import Footer from '@/components/footer'
import { AboutHero } from '@/components/about-hero'

export const metadata = {
  title: 'About Grzegorz Motyl | motyl.dev',
  description: 'Learn about my experience, expertise, and approach to software development.',
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <AboutHero />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add app/about/page.tsx components/about-hero.tsx
git commit -m "feat: create /about page with bio and expertise"
```

### Task 13: Update /me page with superadmin panel

**Files:**
- Modify: `app/me/page.tsx`
- Create: `components/admin-panel.tsx`

**Step 1: Create admin panel component**

```typescript
// components/admin-panel.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface AdminPanelProps {
  isSuperAdmin: boolean
}

export function AdminPanel({ isSuperAdmin }: AdminPanelProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleResetVotes = async () => {
    if (!confirm('Archive current week votes and reset counter?')) return

    setLoading(true)
    try {
      const res = await fetch('/api/trends/reset', { method: 'POST' })
      if (res.ok) {
        toast({
          title: 'Success',
          description: 'Weekly votes reset successfully',
        })
      } else {
        throw new Error('Reset failed')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reset votes',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isSuperAdmin) return null

  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 space-y-4">
      <h3 className="text-lg font-bold text-destructive">Admin Panel</h3>
      <p className="text-sm text-muted-foreground">
        Manage weekly voting cycle
      </p>
      <Button
        variant="destructive"
        onClick={handleResetVotes}
        disabled={loading}
      >
        🔴 Reset Weekly Votes
      </Button>
    </div>
  )
}
```

**Step 2: Update me page**

```typescript
// app/me/page.tsx - Add admin panel
import { AdminPanel } from '@/components/admin-panel'
import { getCurrentUser } from '@/lib/auth' // or your auth method

export default async function MePage() {
  const user = await getCurrentUser()
  const isSuperAdmin = user?.role === 'superadmin' // Adjust based on your auth

  return (
    <div className="space-y-8">
      {/* Existing content */}
      <section>{/* Your existing me page content */}</section>

      {/* Admin section */}
      <section>
        <AdminPanel isSuperAdmin={isSuperAdmin} />
      </section>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add components/admin-panel.tsx app/me/page.tsx
git commit -m "feat: add superadmin vote reset panel to /me page"
```

---

## Phase 6: CLI Command

### Task 14: Create trends:generate CLI command

**Files:**
- Create: `scripts/trends-generate.ts`
- Create: `lib/trends-cli.ts`

**Step 1: Create CLI utilities**

```typescript
// lib/trends-cli.ts
import { db } from '@/lib/db'
import { trendsVotes, trendsArchive } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentWeek, getPreviousWeek } from '@/lib/trends'
import { v4 as uuidv4 } from 'uuid'

export async function generateWeeklySummary(week: string) {
  const votes = await db
    .select()
    .from(trendsVotes)
    .where(eq(trendsVotes.week, week))
    .orderBy((t) => [
      (t) => ({ sql: `${t.voteCount} DESC` }),
      (t) => t.createdAt,
    ])

  const grouped = votes.reduce(
    (acc, vote) => {
      if (!acc[vote.category]) {
        acc[vote.category] = []
      }
      acc[vote.category].push(vote)
      return acc
    },
    {} as Record<string, typeof votes>
  )

  const totalVotes = votes.reduce((sum, v) => sum + v.voteCount, 0)

  const markdown = generateMarkdown(week, grouped, totalVotes)

  // Save to archive
  await db.insert(trendsArchive).values({
    id: uuidv4(),
    week,
    summaryMarkdown: markdown,
    totalVotes,
  })

  return markdown
}

function generateMarkdown(
  week: string,
  grouped: Record<string, any[]>,
  totalVotes: number
): string {
  const [year, weekNum] = week.split('-w')
  const startDate = getWeekDates(parseInt(year), parseInt(weekNum)).start

  let md = `# Frontend & AI Trends: Week ${weekNum} (${startDate.toLocaleDateString()})\n\n`
  md += `**Total votes cast: ${totalVotes}**\n\n`

  for (const [category, items] of Object.entries(grouped)) {
    md += `## ${capitalize(category)}\n\n`
    items.forEach((item, idx) => {
      md += `${idx + 1}. **[${item.title}](${item.linkUrl})** (${item.voteCount} votes)\n`
      if (item.description) {
        md += `   ${item.description}\n`
      }
      md += '\n'
    })
  }

  return md
}

function getWeekDates(
  year: number,
  weekNum: number
): { start: Date; end: Date } {
  const simple = new Date(year, 0, 1 + (weekNum - 1) * 7)
  const dow = simple.getDay()
  const ISOweekStart = simple

  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())

  const end = new Date(ISOweekStart)
  end.setDate(end.getDate() + 6)

  return { start: ISOweekStart, end }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
```

**Step 2: Create CLI script**

```typescript
// scripts/trends-generate.ts
import { generateWeeklySummary } from '@/lib/trends-cli'
import { getCurrentWeek } from '@/lib/trends'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

async function main() {
  console.log('📊 Generating weekly trends summary...')

  const week = await getCurrentWeek()
  console.log(`📅 Week: ${week}`)

  // Generate summary markdown
  const markdown = await generateWeeklySummary(week)

  // Save to file
  const filePath = path.join(process.cwd(), `content/trends/${week}-summary.md`)
  const dir = path.dirname(filePath)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(filePath, markdown)
  console.log(`✅ Summary saved to ${filePath}`)

  // Create git branch and commit
  const branchName = `feature/trends-${week}`
  console.log(`🌿 Creating branch: ${branchName}`)

  try {
    execSync(`git checkout -b ${branchName}`)
    execSync(`git add content/trends/${week}-summary.md`)
    execSync(`git commit -m "feat: add trends summary for ${week}"`)
    console.log(`📝 Commit created`)

    // Create PR via gh CLI
    console.log(`🔗 Creating pull request...`)
    execSync(`gh pr create --title "Trends: ${week}" --body "Weekly trends summary for ${week}"`)
    console.log(`✅ PR created!`)

    // Reset votes (optional - can be done manually via UI)
    console.log(`\n✨ Next: Review and merge PR, then click "Reset Weekly Votes" on /me page`)
  } catch (error) {
    console.error('❌ Failed to create PR:', error)
    console.log('\n💡 Manual steps:')
    console.log(`   1. git checkout -b feature/trends-${week}`)
    console.log(`   2. git add content/trends/${week}-summary.md`)
    console.log(`   3. git commit -m "feat: add trends summary for ${week}"`)
    console.log(`   4. gh pr create --title "Trends: ${week}"`)
  }
}

main().catch(console.error)
```

**Step 3: Add script to package.json**

```json
{
  "scripts": {
    "trends:generate": "ts-node scripts/trends-generate.ts"
  }
}
```

**Step 4: Commit**

```bash
git add lib/trends-cli.ts scripts/trends-generate.ts
git commit -m "feat: implement trends:generate CLI command"
```

---

## Phase 7: Testing & Polish

### Task 15: Write integration tests for voting flow

**Files:**
- Create: `__tests__/integration/trends.test.ts`

**Step 1: Write tests**

```typescript
// __tests__/integration/trends.test.ts
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { db } from '@/lib/db'
import { trendsVotes } from '@/lib/db/schema'
import { castVote, getWeekVotes, getCurrentWeek } from '@/lib/trends'

describe('Trends Voting Integration', () => {
  let testWeek: string

  beforeEach(async () => {
    testWeek = await getCurrentWeek()
    // Clear test data
    await db.delete(trendsVotes).where(/* test week */)
  })

  it('casts vote and increments count', async () => {
    await castVote(
      'https://example.com/article',
      'Test Article',
      'Description',
      'frontend'
    )

    const votes = await getWeekVotes(testWeek)
    expect(votes).toHaveLength(1)
    expect(votes[0].voteCount).toBe(1)
  })

  it('increments existing vote', async () => {
    const url = 'https://example.com/article'
    await castVote(url, 'Test', 'Desc', 'frontend')
    await castVote(url, 'Test', 'Desc', 'frontend')

    const votes = await getWeekVotes(testWeek)
    expect(votes).toHaveLength(1)
    expect(votes[0].voteCount).toBe(2)
  })
})
```

**Step 2: Run tests**

Run: `npm run test -- trends.test.ts`
Expected: All tests PASS

**Step 3: Commit**

```bash
git add __tests__/integration/trends.test.ts
git commit -m "test: add integration tests for voting flow"
```

### Task 16: Accessibility audit

**Files:**
- Review all components for WCAG compliance

**Step 1: Check color contrast**

- Vote button: Primary vs background ≥ 4.5:1 ✅
- Links: Primary vs background ≥ 4.5:1 ✅
- Muted text: Muted vs background ≥ 3:1 ✅

**Step 2: Check keyboard navigation**

- Vote button: Focusable, Space/Enter to vote ✅
- Links: Keyboard accessible ✅
- Tooltips: Accessible via keyboard ✅

**Step 3: Check screen reader**

- Vote button: `aria-label="Upvote (42 votes)"` ✅
- Info icon: `aria-label="More information"` ✅
- Navigation: Semantic structure ✅

**Step 4: Commit**

```bash
git commit -m "docs: add WCAG 2.1 AA compliance checklist"
```

### Task 17: Mobile responsiveness testing

**Files:**
- Test all pages on mobile, tablet, desktop

**Step 1: Test on mobile (375px)**

- Navigation: Hamburger menu works ✅
- Vote button: Min 44x44px ✅
- Cards: Stack properly ✅
- Donation CTA: Readable and tappable ✅

**Step 2: Test on tablet (768px)**

- Grid: 2 columns ✅
- Navigation: Shows all links ✅

**Step 3: Test on desktop (1200px)**

- Grid: 3+ columns ✅
- Hover states work ✅

**Step 4: Commit message**

```bash
git commit -m "test: verify mobile responsiveness across all pages"
```

### Task 18: Performance optimization

**Files:**
- Optimize images, lazy load components

**Step 1: Lazy load feed**

```typescript
// Add lazy loading to HomeFeed
const FeedComponent = dynamic(() => import('@/components/home-feed'), {
  loading: () => <div>Loading...</div>,
})
```

**Step 2: Run Lighthouse**

Run: `npm run build && npx lighthouse https://localhost:3000`
Expected: Performance ≥ 90

**Step 3: Commit**

```bash
git commit -m "perf: optimize images and lazy load components"
```

---

## Summary

**Total Tasks:** 18
**Estimated Duration:** 4-5 hours
**Key Milestones:**
- ✅ Phase 1-2: Database + API (Tasks 1-6)
- ✅ Phase 3: UI Components (Tasks 7-10)
- ✅ Phase 4-5: Homepage + Pages (Tasks 11-13)
- ✅ Phase 6: CLI Command (Task 14)
- ✅ Phase 7: Testing (Tasks 15-18)

**After Implementation:**
1. Merge all feature branches to main
2. Deploy to production
3. Monitor voting activity
4. Run `npm run trends:generate` every Sunday at 10 AM (via cron or manual)
5. Review/merge PR, click "Reset Weekly Votes" on /me page

