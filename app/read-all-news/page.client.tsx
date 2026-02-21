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
        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
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
