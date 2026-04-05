'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useVisitedArticles } from '@/hooks/use-visited-articles'
import { HashtagInput } from '@/components/hashtag-input'
import { type ContentItemMetadata } from '@/lib/articles'
import AdUnit from '@/components/ad-unit'
import { getOgImage } from '@/lib/og'
import Image from 'next/image'
import { CategoryIcon, CategoryIconMini } from '@/components/category-icon'
import { getContentCategory } from '@/lib/og'
import { formatDate } from '@/lib/utils'

const BATCH_SIZE = 30

interface ContentListingProps {
  title: string
  description?: string
  allItems: ContentItemMetadata[]
  allHashtags: string[]
  hashtagCounts: Record<string, number>
  totalItems: number
  contentType: 'article' | 'news' | 'all'
  basePath: string
}

export function ContentListing({
  title,
  description,
  allItems,
  allHashtags,
  hashtagCounts: serverHashtagCounts,
  totalItems: serverTotalItems,
  contentType,
  basePath,
}: ContentListingProps) {
  const { markAsVisited, isVisited, visitedArticles, isLoading: visitedLoading } = useVisitedArticles()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [removingSlugs, setRemovingSlugs] = useState<Set<string>>(new Set())
  const [clientReady, setClientReady] = useState(false)

  // Filter state from URL
  const selectedHashtags = useMemo(() => {
    const h = searchParams.get('hashtags')
    return new Set(h ? h.split(',') : [])
  }, [searchParams])

  const filterMode = useMemo(() => {
    return (searchParams.get('mode') as 'AND' | 'OR' | 'EXCLUDE') || 'AND'
  }, [searchParams])

  const showUnseenOnly = useMemo(() => {
    return searchParams.get('unseen') === 'true'
  }, [searchParams])

  // Client-side filtering — all logic runs in browser
  const filteredItems = useMemo(() => {
    let result = allItems

    // Hashtag filter
    if (selectedHashtags.size > 0) {
      const tags = Array.from(selectedHashtags)
      if (filterMode === 'AND') {
        result = result.filter((item) => tags.every((t) => item.hashtags.includes(t)))
      } else if (filterMode === 'OR') {
        result = result.filter((item) => tags.some((t) => item.hashtags.includes(t)))
      } else {
        result = result.filter((item) => !tags.some((t) => item.hashtags.includes(t)))
      }
    }

    // Unseen filter — only when client has visited data
    if (showUnseenOnly && clientReady) {
      result = result.filter((item) => !visitedArticles.has(item.slug))
    }

    return result
  }, [allItems, selectedHashtags, filterMode, showUnseenOnly, clientReady, visitedArticles])

  // Recompute hashtag counts from filtered items
  const hashtagCounts = useMemo(() => {
    if (selectedHashtags.size === 0 && !showUnseenOnly) return serverHashtagCounts
    const counts: Record<string, number> = {}
    filteredItems.forEach((item) => {
      item.hashtags.forEach((tag: string) => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return counts
  }, [filteredItems, selectedHashtags, showUnseenOnly, serverHashtagCounts])

  const totalItems = filteredItems.length

  // Items visible via infinite scroll
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount)
  }, [filteredItems, visibleCount])

  const hasMore = visibleCount < filteredItems.length

  // When visited data loads and unseen=true, animate removal
  useEffect(() => {
    if (visitedLoading || clientReady) return

    if (showUnseenOnly) {
      // Mark visited items for animated removal
      const toRemove = new Set<string>()
      allItems.forEach((item) => {
        if (visitedArticles.has(item.slug)) {
          toRemove.add(item.slug)
        }
      })

      if (toRemove.size > 0) {
        setRemovingSlugs(toRemove)
        // After animation completes, apply actual filter
        const timer = setTimeout(() => {
          setClientReady(true)
          setRemovingSlugs(new Set())
        }, 400)
        return () => clearTimeout(timer)
      }
    }

    setClientReady(true)
  }, [visitedLoading, showUnseenOnly, allItems, visitedArticles, clientReady])

  // Also mark ready immediately if unseen is off
  useEffect(() => {
    if (!visitedLoading && !showUnseenOnly && !clientReady) {
      setClientReady(true)
    }
  }, [visitedLoading, showUnseenOnly, clientReady])

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) => prev + BATCH_SIZE)
        }
      },
      { rootMargin: '400px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore])

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE)
  }, [selectedHashtags, filterMode, showUnseenOnly])

  // URL updates
  const updateURL = useCallback(
    (updates: { hashtags?: Set<string>; mode?: string; unseen?: boolean }) => {
      const params = new URLSearchParams(searchParams)

      const hashtags = updates.hashtags ?? selectedHashtags
      const mode = updates.mode ?? filterMode
      const unseen = updates.unseen ?? showUnseenOnly

      if (hashtags.size > 0) {
        params.set('hashtags', Array.from(hashtags).join(','))
      } else {
        params.delete('hashtags')
      }
      if (mode !== 'AND') {
        params.set('mode', mode)
      } else {
        params.delete('mode')
      }
      if (unseen) {
        params.set('unseen', 'true')
      } else {
        params.delete('unseen')
      }

      const qs = params.toString()
      router.replace(`${pathname}${qs ? '?' + qs : ''}`, { scroll: false })
    },
    [searchParams, selectedHashtags, filterMode, showUnseenOnly, router, pathname]
  )

  const handleHashtagToggle = (hashtag: string) => {
    const next = new Set(selectedHashtags)
    if (next.has(hashtag)) next.delete(hashtag)
    else next.add(hashtag)
    updateURL({ hashtags: next })
  }

  const handleFilterModeChange = (mode: 'AND' | 'OR' | 'EXCLUDE') => {
    updateURL({ mode })
  }

  const handleToggleUnseen = () => {
    updateURL({ unseen: !showUnseenOnly })
  }

  const handleClearFilters = () => {
    updateURL({ hashtags: new Set(), unseen: false, mode: 'AND' })
  }

  // Hashtag UI state
  const [showHashtagGrid, setShowHashtagGrid] = useState(false)
  const [showAllHashtags, setShowAllHashtags] = useState(false)
  const [showZeroCountHashtags, setShowZeroCountHashtags] = useState(false)

  const sortedHashtags = useMemo(() => {
    return [...allHashtags].sort((a, b) => {
      const countA = hashtagCounts[a] || 0
      const countB = hashtagCounts[b] || 0
      return countB !== countA ? countB - countA : a.localeCompare(b)
    })
  }, [allHashtags, hashtagCounts])

  const { visibleHashtags, hiddenHashtagsWithCounts, hiddenHashtagsWithoutCounts } = useMemo(() => {
    const selected = new Set(selectedHashtags)
    const withCounts = sortedHashtags.filter(
      (h) => (hashtagCounts[h] || 0) > 0 || selected.has(h)
    )
    const withoutCounts = sortedHashtags.filter(
      (h) => (hashtagCounts[h] || 0) === 0 && !selected.has(h)
    )

    if (showAllHashtags) {
      return {
        visibleHashtags: showZeroCountHashtags ? sortedHashtags : withCounts,
        hiddenHashtagsWithCounts: [],
        hiddenHashtagsWithoutCounts: showZeroCountHashtags ? [] : withoutCounts,
      }
    }

    const VISIBLE_COUNT = 16
    const visible: string[] = []
    const hidden: string[] = []

    withCounts.forEach((h) => {
      if (selected.has(h) || visible.length < VISIBLE_COUNT) visible.push(h)
      else hidden.push(h)
    })

    return { visibleHashtags: visible, hiddenHashtagsWithCounts: hidden, hiddenHashtagsWithoutCounts: withoutCounts }
  }, [sortedHashtags, hashtagCounts, selectedHashtags, showAllHashtags, showZeroCountHashtags])

  // Determine which items to render (pre-filter view during animation)
  const renderItems = clientReady ? visibleItems : allItems.slice(0, visibleCount)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Progress bar — thin line at top during visited state loading */}
      {(visitedLoading || (!clientReady && showUnseenOnly)) && (
        <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-muted overflow-hidden">
          <div className="h-full bg-primary animate-progress-bar" />
        </div>
      )}

      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && <p className="text-muted-foreground mb-8">{description}</p>}

        {allHashtags.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <HashtagInput
                selectedHashtags={Array.from(selectedHashtags)}
                onHashtagAdd={handleHashtagToggle}
                onHashtagRemove={handleHashtagToggle}
                placeholder="Search hashtags..."
                allowNewHashtags={false}
                showSelectedBadges={false}
              />
              <Button
                onClick={handleToggleUnseen}
                variant={showUnseenOnly ? 'default' : 'outline'}
                size="sm"
                className="font-semibold"
              >
                {showUnseenOnly ? '✓ ' : ''}NEW
              </Button>
              <Button
                onClick={() => setShowHashtagGrid(!showHashtagGrid)}
                variant={showHashtagGrid ? 'secondary' : 'outline'}
                size="sm"
              >
                Filter
              </Button>

              {selectedHashtags.size > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 border rounded-md overflow-hidden">
                    {(['AND', 'OR', 'EXCLUDE'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => handleFilterModeChange(m)}
                        className={`px-2 py-1 text-xs font-medium transition-colors ${
                          filterMode === m
                            ? m === 'EXCLUDE'
                              ? 'bg-destructive text-destructive-foreground'
                              : 'bg-primary text-primary-foreground'
                            : 'bg-background hover:bg-muted'
                        }`}
                      >
                        {m === 'AND' ? 'HAS' : m === 'OR' ? 'ANY' : 'EXCLUDE'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(selectedHashtags.size > 0 || showUnseenOnly) && (
                <Button onClick={handleClearFilters} variant="destructive" size="sm">
                  Clear
                </Button>
              )}
            </div>

            {selectedHashtags.size > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {Array.from(selectedHashtags).map((hashtag) => (
                  <button
                    key={hashtag}
                    onClick={() => handleHashtagToggle(hashtag)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                  >
                    #{hashtag}
                    <span className="text-primary-foreground/60">×</span>
                  </button>
                ))}
              </div>
            )}

            {showHashtagGrid && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50">
                <Button
                  variant={selectedHashtags.size === 0 && !showUnseenOnly ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleClearFilters}
                >
                  All ({serverTotalItems})
                </Button>

                {visibleHashtags.map((hashtag) => {
                  const count = hashtagCounts[hashtag] || 0
                  const isSelected = selectedHashtags.has(hashtag)
                  return (
                    <Button
                      key={hashtag}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleHashtagToggle(hashtag)}
                      className={count === 0 && !isSelected ? 'text-muted-foreground line-through' : ''}
                    >
                      #{hashtag}
                      {count > 0 && ` (${count})`}
                    </Button>
                  )
                })}

                {!showAllHashtags &&
                  (hiddenHashtagsWithCounts.length > 0 || hiddenHashtagsWithoutCounts.length > 0) && (
                    <Button variant="ghost" size="sm" onClick={() => setShowAllHashtags(true)} className="text-muted-foreground hover:text-foreground">
                      more...
                    </Button>
                  )}

                {showAllHashtags && !showZeroCountHashtags && hiddenHashtagsWithoutCounts.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setShowZeroCountHashtags(true)} className="text-muted-foreground hover:text-foreground">
                    more...
                  </Button>
                )}

                {showAllHashtags && (showZeroCountHashtags || hiddenHashtagsWithoutCounts.length === 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setShowAllHashtags(false); setShowZeroCountHashtags(false) }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    less...
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {renderItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {totalItems} items{hasMore && ` · showing ${visibleItems.length}`}
            </div>

            <div className="my-6">
              <AdUnit pId="5937972178718571" adSlot="9373832601" adFormat="fluid" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {renderItems.map((item) => {
                const hashtags = item.hashtags ?? []
                const category = contentType === 'news' ? getContentCategory(hashtags) : null
                const visited = isVisited(item.slug)
                const isRemoving = removingSlugs.has(item.slug)
                const isNews = contentType === 'news'

                return isNews ? (
                  <Link
                    key={item.slug}
                    href={`${basePath}/${item.slug}`}
                    prefetch={false}
                    onClick={() => markAsVisited(item.slug)}
                    className={`rounded-lg border transition-all duration-300 hover:shadow-md flex flex-row md:flex-col overflow-hidden ${
                      visited ? 'visited-article' : 'unvisited-article'
                    } ${category ? `category-${category}` : ''} ${
                      isRemoving ? 'opacity-0 scale-95 max-h-0 !p-0 !m-0 !border-0 !gap-0 overflow-hidden' : 'opacity-100 scale-100'
                    }`}
                    style={isRemoving ? { transition: 'all 350ms ease-out' } : undefined}
                  >
                    <div className="flex-shrink-0 w-16 flex items-center justify-center p-2 md:hidden">
                      <CategoryIconMini hashtags={hashtags} className="w-12 h-12" />
                    </div>
                    <div className="relative w-full overflow-hidden rounded-t-lg hidden md:block" style={{ aspectRatio: '16/7' }}>
                      <CategoryIcon hashtags={hashtags} className="w-full h-full" />
                    </div>
                    <div className="p-4 md:p-6 flex flex-col flex-grow min-w-0">
                      <h2 className="article-title text-base md:text-xl font-bold mb-1 md:mb-2">{item.title}</h2>
                      <p className="article-excerpt flex-grow line-clamp-2 md:line-clamp-3">{item.excerpt}</p>
                      <p className="text-xs text-muted-foreground mt-auto">
                        {formatDate(item.publishedAt)}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    key={item.slug}
                    href={`${basePath}/${item.slug}`}
                    prefetch={false}
                    onClick={() => markAsVisited(item.slug)}
                    className={`rounded-lg border backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 flex flex-col overflow-hidden ${
                      visited ? 'visited-article' : 'unvisited-article'
                    } ${
                      isRemoving ? 'opacity-0 scale-95 max-h-0 !p-0 !m-0 !border-0 !gap-0 overflow-hidden' : 'opacity-100 scale-100'
                    }`}
                    style={isRemoving ? { transition: 'all 350ms ease-out' } : undefined}
                  >
                    <div className="relative w-full overflow-hidden rounded-t-lg" style={{ aspectRatio: '16/7' }}>
                      <Image
                        src={getOgImage(item as { image?: string; hashtags: string[] })}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="article-title text-xl font-bold mb-2">{item.title}</h2>
                      <p className="article-excerpt flex-grow line-clamp-3">{item.excerpt}</p>
                      <p className="text-xs text-muted-foreground mt-auto">
                        {formatDate(item.publishedAt)}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Infinite scroll sentinel */}
            {hasMore && (
              <div ref={sentinelRef} className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
