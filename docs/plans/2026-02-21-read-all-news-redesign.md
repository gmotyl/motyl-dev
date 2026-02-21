# Read All News — Full Content Infinite Scroll Redesign

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign `/read-all-news` to show full article content inline with infinite scroll, replacing auto-visit-marking with a conscious user-controlled "mark as read" dialog.

**Architecture:** Server component fetches initial page of unvisited news with full content. Client component renders articles inline using existing `MarkdownContent`, tracks scroll position via IntersectionObserver, and shows a floating button + dialog for marking articles as read. Navigation away is intercepted to prompt the user.

**Tech Stack:** Next.js 16, React, Tailwind CSS, shadcn/ui (Dialog, Checkbox, Button), IntersectionObserver API

---

### Task 1: Add `includeContent` param to `/api/content`

The API currently strips `content` via `getAllContentMetadata()`. We need an option to return full content for the read-all-news page.

**Files:**
- Modify: `lib/articles.ts:161-223` (add `includeContent` option to `getContentPageData`)
- Modify: `app/api/content/route.ts` (pass through `includeContent` query param)

**Step 1: Modify `getContentPageData` to optionally include content**

In `lib/articles.ts`, add `includeContent` to the function params and conditionally return full items:

```typescript
// In the function signature, add:
  includeContent?: boolean

// Replace the final pagination line (currently line 214):
//   const paginatedArticles = filtered.slice(startIndex, startIndex + limit)
// With:
  const paginatedSlice = filtered.slice(startIndex, startIndex + limit)

  let paginatedArticles: (ContentItemMetadata | ContentItem)[]
  if (includeContent) {
    const contentMap = await getCachedContentMap()
    paginatedArticles = paginatedSlice.map(meta => {
      const full = contentMap.get(meta.slug)
      return full || meta
    })
  } else {
    paginatedArticles = paginatedSlice
  }
```

Also update the `PaginatedContent` interface items type to `(ContentItemMetadata | ContentItem)[]`.

**Step 2: Update the API route**

In `app/api/content/route.ts`, add:

```typescript
const includeContent = searchParams.get('includeContent') === 'true'
```

Pass it to `getContentPageData({ ..., includeContent })`.

**Step 3: Verify manually**

Run: `curl 'http://localhost:3000/api/content?page=1&contentType=news&requireHashtags=generated&includeContent=true' | jq '.items[0] | keys'`

Expected: should include `"content"` key in the response.

**Step 4: Commit**

```
feat: add includeContent param to content API for full article fetching
```

---

### Task 2: Rewrite server component to pass full content

**Files:**
- Modify: `app/read-all-news/page.tsx`

**Step 1: Update server component to fetch with content**

Replace the current `getContentPageData` call to include `includeContent: true` and pass full `ContentItem[]` to the client:

```typescript
import { getContentPageData, ContentItem } from '@/lib/articles'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getUserViewedArticles } from '@/lib/article-views'
import ReadAllNewsPageClient from './page.client'

export const metadata = {
  title: 'Read All News - Motyl.dev',
  description: 'Browse through all unvisited news articles',
}

export default async function ReadAllNewsPage() {
  const session = await auth()
  let visitedSlugs: Set<string>

  if (session?.user?.id) {
    const dbSlugs = await getUserViewedArticles()
    visitedSlugs = new Set(dbSlugs)
  } else {
    const headersList = await headers()
    const visitedArticlesHeader = headersList.get('x-visited-articles')
    try {
      visitedSlugs = new Set<string>(JSON.parse(visitedArticlesHeader || '[]'))
    } catch (e) {
      console.error('Failed to parse visited articles header:', e)
      visitedSlugs = new Set<string>()
    }
  }

  const pageData = await getContentPageData({
    page: 1,
    limit: 5,
    filters: {
      showUnseen: true,
      requireHashtags: ['generated'],
    },
    visitedSlugs,
    contentType: 'news',
    includeContent: true,
  })

  return (
    <ReadAllNewsPageClient
      initialItems={pageData.items as ContentItem[]}
      totalItems={pageData.totalItems}
    />
  )
}
```

Note: `limit: 5` because full content articles are heavy — load fewer per page.

**Step 2: Commit**

```
feat: server component fetches full content for read-all-news
```

---

### Task 3: Rewrite client component — full content rendering + infinite scroll

This is the main task. Completely rewrite `page.client.tsx`.

**Files:**
- Rewrite: `app/read-all-news/page.client.tsx`

**Step 1: Write the new client component**

Key changes from current:
- Accept `ContentItem[]` (with content) instead of `ContentItemMetadata[]`
- Render full markdown per article using `MarkdownContent` (via `MarkdownWithCTA`)
- Apply section filtering (default hidden sections like on `/news/[slug]`)
- Track "scrolled past" via IntersectionObserver on article bottom boundary
- No auto-marking — just track in state
- Infinite scroll loads more via API with `includeContent=true`

```typescript
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { MarkdownWithCTA } from '@/components/markdown-with-cta'
import { filterHiddenSections, type SectionType } from '@/lib/section-filter'
import { ItemType } from '@/lib/types'
import { ContentItem } from '@/lib/articles'
import { MarkReadDialog } from '@/components/mark-read-dialog'
import { BookCheck } from 'lucide-react'

const DEFAULT_HIDDEN_SECTIONS = new Set<SectionType>(['summary', 'keyTakeaways', 'tradeoffs'])

interface ReadAllNewsPageProps {
  initialItems: ContentItem[]
  totalItems: number
}

export default function ReadAllNewsPage({ initialItems, totalItems }: ReadAllNewsPageProps) {
  const { data: session } = useSession()
  const [items, setItems] = useState<ContentItem[]>(initialItems)
  const [scrolledPastSlugs, setScrolledPastSlugs] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialItems.length < totalItems)
  const [page, setPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingNavUrl, setPendingNavUrl] = useState<string | null>(null)

  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMore()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading, page])

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    const nextPage = page + 1

    try {
      const params = new URLSearchParams({
        page: nextPage.toString(),
        unseen: 'true',
        contentType: 'news',
        requireHashtags: 'generated',
        includeContent: 'true',
      })

      const res = await fetch(`/api/content?${params}`)
      const data = await res.json()

      if (data.items?.length > 0) {
        setItems(prev => [...prev, ...data.items])
        setPage(nextPage)
        setHasMore(data.currentPage < data.totalPages)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to fetch more items:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page])

  // Track scrolled-past articles
  const handleScrolledPast = useCallback((slug: string) => {
    setScrolledPastSlugs(prev => {
      if (prev.has(slug)) return prev
      const next = new Set(prev)
      next.add(slug)
      return next
    })
  }, [])

  // Mark selected articles as visited
  const handleMarkRead = useCallback((slugs: string[]) => {
    // Update localStorage
    const stored = localStorage.getItem('visitedArticles')
    const existing: string[] = stored ? JSON.parse(stored) : []
    const merged = [...new Set([...existing, ...slugs])]
    localStorage.setItem('visitedArticles', JSON.stringify(merged))
    document.cookie = `visitedArticles=${JSON.stringify(merged)};path=/;max-age=31536000;samesite=lax`

    // Sync to DB if logged in
    if (session?.user) {
      for (const slug of slugs) {
        fetch(`/api/articles/${slug}/view`, { method: 'POST' }).catch(console.error)
      }
    }

    // Remove marked articles from the list
    setItems(prev => prev.filter(item => !slugs.includes(item.slug)))
    setScrolledPastSlugs(new Set())

    // Navigate if there was a pending URL
    if (pendingNavUrl) {
      window.location.href = pendingNavUrl
    }
  }, [session, pendingNavUrl])

  const handleDialogCancel = useCallback(() => {
    setDialogOpen(false)
    if (pendingNavUrl) {
      window.location.href = pendingNavUrl
    }
    setPendingNavUrl(null)
  }, [pendingNavUrl])

  const handleDialogConfirm = useCallback((selectedSlugs: string[]) => {
    setDialogOpen(false)
    if (selectedSlugs.length > 0) {
      handleMarkRead(selectedSlugs)
    } else if (pendingNavUrl) {
      window.location.href = pendingNavUrl
    }
    setPendingNavUrl(null)
  }, [handleMarkRead, pendingNavUrl])

  // Intercept navigation clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (scrolledPastSlugs.size === 0) return

      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href === window.location.pathname) return

      // Only intercept internal navigation links
      const isInternal = href.startsWith('/') || href.startsWith(window.location.origin)
      if (!isInternal) return

      e.preventDefault()
      e.stopPropagation()
      setPendingNavUrl(href)
      setDialogOpen(true)
    }

    // Capture phase to intercept before Next.js router
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [scrolledPastSlugs])

  const scrolledPastItems = items.filter(item => scrolledPastSlugs.has(item.slug))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Read all news</h1>
        <p className="text-muted-foreground mb-8">
          Scroll through unvisited articles. Mark them as read when you're done.
        </p>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              All caught up! No unvisited news articles.
            </p>
            <Button asChild className="mt-4">
              <Link href="/news">Browse all news</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground mb-6">
              {items.length} articles to read
            </div>

            <div className="space-y-0">
              {items.map((item, index) => (
                <FullArticle
                  key={item.slug}
                  item={item}
                  onScrolledPast={handleScrolledPast}
                  isLast={index === items.length - 1}
                />
              ))}
            </div>

            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {loading ? (
                  <div className="text-muted-foreground">Loading more...</div>
                ) : (
                  <div className="h-10" />
                )}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />

      {/* Floating mark-read button */}
      {scrolledPastSlugs.size > 0 && (
        <button
          onClick={() => { setPendingNavUrl(null); setDialogOpen(true) }}
          className="fixed bottom-20 sm:bottom-6 right-4 z-40 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <BookCheck className="h-5 w-5" />
          <span className="font-medium">Mark read ({scrolledPastSlugs.size})</span>
        </button>
      )}

      {/* Mark-read dialog */}
      <MarkReadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        items={scrolledPastItems}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
      />
    </div>
  )
}

// Full article component with scroll-past detection
function FullArticle({
  item,
  onScrolledPast,
  isLast,
}: {
  item: ContentItem
  onScrolledPast: (slug: string) => void
  isLast: boolean
}) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)

  // Apply default section filtering (same as single article view)
  const filteredContent = filterHiddenSections(item.content, DEFAULT_HIDDEN_SECTIONS)

  useEffect(() => {
    if (hasTriggeredRef.current || !bottomRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true
          onScrolledPast(item.slug)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [item.slug, onScrolledPast])

  return (
    <article className="py-8">
      {/* Article header */}
      <div className="mb-4">
        <Link href={`/news/${item.slug}`} prefetch={false}>
          <h2 className="text-2xl font-bold hover:text-primary transition-colors">{item.title}</h2>
        </Link>
        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
          <time>
            {new Date(item.publishedAt).toLocaleDateString('pl-PL', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </time>
          {item.hashtags?.slice(0, 5).map((tag: string) => (
            <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Full article content */}
      <MarkdownWithCTA
        content={filteredContent}
        itemType={ItemType.News}
        articleSlug={item.slug}
      />

      {/* Bottom boundary marker for scroll tracking */}
      <div ref={bottomRef} className="h-px" />

      {/* Divider between articles */}
      {!isLast && (
        <div className="mt-8 border-t border-border/60" />
      )}
    </article>
  )
}
```

**Step 2: Verify the page loads**

Run: `pnpm dev`, navigate to `http://localhost:3000/read-all-news`
Expected: Full article content rendered inline, articles separated by dividers.

**Step 3: Commit**

```
feat: rewrite read-all-news with full inline content and scroll tracking
```

---

### Task 4: Create the MarkReadDialog component

**Files:**
- Create: `components/mark-read-dialog.tsx`

**Step 1: Build the dialog**

```typescript
'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface MarkReadItem {
  slug: string
  title: string
}

interface MarkReadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: MarkReadItem[]
  onConfirm: (selectedSlugs: string[]) => void
  onCancel: () => void
}

export function MarkReadDialog({
  open,
  onOpenChange,
  items,
  onConfirm,
  onCancel,
}: MarkReadDialogProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Pre-check all items when dialog opens
  useEffect(() => {
    if (open) {
      setSelected(new Set(items.map(item => item.slug)))
    }
  }, [open, items])

  const toggleItem = (slug: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }

  const toggleAll = () => {
    if (selected.size === items.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(items.map(item => item.slug)))
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onCancel()
      onOpenChange(isOpen)
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark articles as read</DialogTitle>
          <DialogDescription>
            Select which articles you've actually read. Uncheck any you skipped.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto py-2">
          {items.length > 1 && (
            <div className="flex items-center gap-3 pb-2 border-b border-border/40">
              <Checkbox
                id="select-all"
                checked={selected.size === items.length}
                onCheckedChange={toggleAll}
              />
              <label
                htmlFor="select-all"
                className="text-sm font-medium cursor-pointer"
              >
                {selected.size === items.length ? 'Uncheck all' : 'Check all'}
              </label>
            </div>
          )}

          {items.map((item) => (
            <div key={item.slug} className="flex items-start gap-3">
              <Checkbox
                id={item.slug}
                checked={selected.has(item.slug)}
                onCheckedChange={() => toggleItem(item.slug)}
                className="mt-0.5"
              />
              <label
                htmlFor={item.slug}
                className="text-sm leading-snug cursor-pointer"
              >
                {item.title}
              </label>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onCancel}>
            Skip
          </Button>
          <Button onClick={() => onConfirm([...selected])}>
            Mark {selected.size} as read
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

**Step 2: Verify dialog works**

Navigate to `/read-all-news`, scroll past a few articles, click the floating button.
Expected: Dialog opens with pre-checked articles, can toggle checkboxes.

**Step 3: Commit**

```
feat: add MarkReadDialog component for conscious article visit tracking
```

---

### Task 5: Test full flow end-to-end

**Step 1: Test infinite scroll**

1. Open `/read-all-news`
2. Scroll down — articles should load more as you approach the bottom
3. Each article shows full markdown content (not just excerpt)

**Step 2: Test floating button**

1. Scroll past 2-3 articles
2. Floating "Mark read (N)" button should appear at bottom-right
3. Count should increase as you scroll past more articles

**Step 3: Test dialog via button**

1. Click floating button
2. Dialog opens with checkboxes for scrolled-past articles
3. All pre-checked
4. Uncheck one, click "Mark N as read"
5. Checked articles disappear from the page
6. Unchecked article remains visible

**Step 4: Test navigation interception**

1. Scroll past 2 articles
2. Click "News" in the header
3. Dialog should appear instead of navigating
4. Click "Skip" — should navigate to /news without marking anything
5. Go back, scroll past articles again
6. Click "News" again, confirm in dialog — should mark and then navigate

**Step 5: Commit if any fixes were needed**

```
fix: address issues found during e2e testing of read-all-news
```
