'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ContentItemMetadata } from '@/lib/articles'

interface ReadAllNewsPageProps {
  initialItems: ContentItemMetadata[]
  totalItems: number
}

export default function ReadAllNewsPage({ initialItems, totalItems }: ReadAllNewsPageProps) {
  const { data: session } = useSession()
  const [items, setItems] = useState<ContentItemMetadata[]>(initialItems)
  const [visitedSlugs, setVisitedSlugs] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialItems.length < totalItems)
  const [page, setPage] = useState(1)
  
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Load visited articles from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('visitedArticles')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setVisitedSlugs(new Set(parsed))
        }
      } catch (e) {
        console.error('Failed to parse visited articles', e)
      }
    }
  }, [])

  // Intersection observer for loading more
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMore()
        }
      },
      { rootMargin: '100px' }
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading, page])

  // Fetch more items
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
      })
      
      const res = await fetch(`/api/content?${params}`)
      const data = await res.json()
      
      if (data.items && data.items.length > 0) {
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

  // Mark article as visited when coffee button is in viewport
  const handleArticleView = useCallback((slug: string) => {
    if (visitedSlugs.has(slug)) return
    
    const newVisited = new Set(visitedSlugs)
    newVisited.add(slug)
    setVisitedSlugs(newVisited)
    
    // Save to localStorage
    localStorage.setItem('visitedArticles', JSON.stringify([...newVisited]))
    
    // Save to cookie
    document.cookie = `visitedArticles=${JSON.stringify([...newVisited])};path=/;max-age=31536000;samesite=lax`
    
    // Sync to database if logged in
    if (session?.user) {
      fetch(`/api/articles/${slug}/view`, { method: 'POST' }).catch(console.error)
    }
  }, [visitedSlugs, session])

  // Filter out already visited items from display
  const unvisitedItems = items.filter(item => !visitedSlugs.has(item.slug))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Read all news</h1>
        <p className="text-muted-foreground mb-8">
          Browse through unvisited news articles. Articles are marked as read when you reach the end.
        </p>
        
        {unvisitedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              🎉 All caught up! You've read all news articles.
            </p>
            <Button asChild className="mt-4">
              <Link href="/news">Browse all news</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground mb-4">
              {unvisitedItems.length} articles left to read
            </div>
            
            <div className="space-y-8">
              {unvisitedItems.map((item) => (
                <ArticleCard 
                  key={item.slug} 
                  item={item} 
                  onView={() => handleArticleView(item.slug)}
                />
              ))}
            </div>
            
            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {loading ? (
                  <div className="text-muted-foreground">Loading more...</div>
                ) : (
                  <div className="h-10" /> // Spacer for intersection observer
                )}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

// Article card component with viewport detection for coffee button
function ArticleCard({ item, onView }: { item: ContentItemMetadata; onView: () => void }) {
  const coffeeButtonRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)
  
  useEffect(() => {
    if (hasTriggeredRef.current) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true
            onView()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    
    if (coffeeButtonRef.current) {
      observer.observe(coffeeButtonRef.current)
    }
    
    return () => observer.disconnect()
  }, [onView])

  return (
    <article className="rounded-lg border p-6 hover:border-primary/50 transition-colors">
      <Link href={`/news/${item.slug}`} prefetch={false}>
        <h2 className="text-xl font-bold mb-2 hover:text-primary">{item.title}</h2>
        <p className="text-muted-foreground line-clamp-3 mb-3">{item.excerpt}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(item.publishedAt).toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
      </Link>
      
      {/* Hidden coffee button marker for intersection observer */}
      <div ref={coffeeButtonRef} data-slug={item.slug} className="h-px w-px opacity-0" />
    </article>
  )
}
