'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useVisitedArticles } from '@/hooks/use-visited-articles'
import { HashtagInput } from '@/components/hashtag-input'
import AdUnit from '@/components/ad-unit'
import { getOgImage } from '@/lib/og'
import Image from 'next/image'
import { CategoryIcon, CategoryIconMini } from '@/components/category-icon'
import { getContentCategory } from '@/lib/og'
import { formatDate } from '@/lib/utils'
import type { TrimmedItem, ContentManifest } from '@/lib/content-batches'

const RENDER_BATCH = 30

interface ContentListingProps {
  title: string
  description?: string
  initialBatch: TrimmedItem[]
  manifest: ContentManifest
  allHashtags: string[]
  contentType: 'article' | 'news' | 'all'
  basePath: string
}

export function ContentListing({
  title,
  description,
  initialBatch,
  manifest,
  allHashtags,
  contentType,
  basePath,
}: ContentListingProps) {
  const { markAsVisited, isVisited, visitedArticles, isLoading: visitedLoading } = useVisitedArticles()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Data loading state
  const [loadedItems, setLoadedItems] = useState<TrimmedItem[]>(initialBatch)
  const [nextBatchIndex, setNextBatchIndex] = useState(1)
  const [allBatchesLoaded, setAllBatchesLoaded] = useState(false)
  const [isFetchingBatch, setIsFetchingBatch] = useState(false)
  const [tagData, setTagData] = useState<TrimmedItem[] | null>(null)
  const [isFetchingTag, setIsFetchingTag] = useState(false)

  // Render state
  const [visibleCount, setVisibleCount] = useState(RENDER_BATCH)
  const [removingSlugs, setRemovingSlugs] = useState<Set<string>>(new Set())
  const [clientReady, setClientReady] = useState(false)

  const contentKey = contentType === 'all' ? 'news' : contentType
  const manifestSection = manifest[contentKey as 'news' | 'articles']
  const totalBatches = manifestSection?.batches ?? 1
  const serverTotalItems = manifestSection?.total ?? initialBatch.length

  // Hashtag counts from manifest
  const manifestTagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const [tag, data] of Object.entries(manifest.tags)) {
      const count = contentKey === 'news' ? data.news : data.articles
      if (count > 0) counts[tag] = count
    }
    return counts
  }, [manifest.tags, contentKey])

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

  // Determine data source: tag data (if single hashtag) or loaded batches
  const isUsingTagData = selectedHashtags.size === 1 && filterMode === 'AND' && tagData !== null
  const baseItems = isUsingTagData ? tagData! : loadedItems

  // Client-side filtering on loaded data
  const filteredItems = useMemo(() => {
    let result = baseItems

    // Multi-hashtag filter (single-tag uses precompiled data)
    if (selectedHashtags.size > 0 && !isUsingTagData) {
      const tags = Array.from(selectedHashtags)
      if (filterMode === 'AND') {
        result = result.filter((item) => tags.every((t) => item.hashtags.includes(t)))
      } else if (filterMode === 'OR') {
        result = result.filter((item) => tags.some((t) => item.hashtags.includes(t)))
      } else {
        result = result.filter((item) => !tags.some((t) => item.hashtags.includes(t)))
      }
    }

    // Unseen filter
    if (showUnseenOnly && clientReady) {
      result = result.filter((item) => !visitedArticles.has(item.slug))
    }

    return result
  }, [baseItems, selectedHashtags, filterMode, showUnseenOnly, clientReady, visitedArticles, isUsingTagData])

  // Hashtag counts: use manifest counts when no filter active, recompute from loaded data otherwise
  const hashtagCounts = useMemo(() => {
    if (selectedHashtags.size === 0 && !showUnseenOnly) return manifestTagCounts
    const counts: Record<string, number> = {}
    filteredItems.forEach((item) => {
      item.hashtags.forEach((tag: string) => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return counts
  }, [filteredItems, selectedHashtags, showUnseenOnly, manifestTagCounts])

  const totalItems = isUsingTagData
    ? filteredItems.length
    : selectedHashtags.size === 0 && !showUnseenOnly
      ? serverTotalItems
      : filteredItems.length

  // Items visible via infinite scroll
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount)
  }, [filteredItems, visibleCount])

  const hasMore = isUsingTagData
    ? visibleCount < filteredItems.length
    : visibleCount < filteredItems.length || !allBatchesLoaded

  // Fetch next batch of items
  const fetchNextBatch = useCallback(async () => {
    if (isFetchingBatch || allBatchesLoaded || isUsingTagData) return
    if (nextBatchIndex >= totalBatches) {
      setAllBatchesLoaded(true)
      return
    }

    setIsFetchingBatch(true)
    try {
      const res = await fetch(`/data/batches/${contentKey}-${nextBatchIndex}.json`)
      if (res.ok) {
        const batch: TrimmedItem[] = await res.json()
        setLoadedItems((prev) => [...prev, ...batch])
        setNextBatchIndex((prev) => prev + 1)
        if (nextBatchIndex + 1 >= totalBatches) {
          setAllBatchesLoaded(true)
        }
      }
    } catch (e) {
      console.error('Failed to fetch batch:', e)
    } finally {
      setIsFetchingBatch(false)
    }
  }, [isFetchingBatch, allBatchesLoaded, isUsingTagData, nextBatchIndex, totalBatches, contentKey])

  // Fetch precompiled tag data on single-tag selection
  useEffect(() => {
    if (selectedHashtags.size !== 1 || filterMode !== 'AND') {
      setTagData(null)
      return
    }

    const tag = Array.from(selectedHashtags)[0]
    const safeName = tag.replace(/[^a-z0-9-]/gi, '_').toLowerCase()
    const tagCount = manifest.tags[tag]?.[contentKey as 'news' | 'articles'] ?? 0

    if (tagCount < 2) {
      setTagData(null)
      return
    }

    setIsFetchingTag(true)
    fetch(`/data/tags/${contentKey}-${safeName}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setTagData(data)
        else setTagData(null)
      })
      .catch(() => setTagData(null))
      .finally(() => setIsFetchingTag(false))
  }, [selectedHashtags, filterMode, contentKey, manifest.tags])

  // When visited data loads and unseen=true, animate removal
  useEffect(() => {
    if (visitedLoading || clientReady) return

    if (showUnseenOnly) {
      const toRemove = new Set<string>()
      baseItems.forEach((item) => {
        if (visitedArticles.has(item.slug)) toRemove.add(item.slug)
      })

      if (toRemove.size > 0) {
        setRemovingSlugs(toRemove)
        const timer = setTimeout(() => {
          setClientReady(true)
          setRemovingSlugs(new Set())
        }, 400)
        return () => clearTimeout(timer)
      }
    }

    setClientReady(true)
  }, [visitedLoading, showUnseenOnly, baseItems, visitedArticles, clientReady])

  useEffect(() => {
    if (!visitedLoading && !showUnseenOnly && !clientReady) {
      setClientReady(true)
    }
  }, [visitedLoading, showUnseenOnly, clientReady])

  // IntersectionObserver — load more rendered items or fetch next batch
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return

        if (visibleCount < filteredItems.length) {
          // More items available in memory — just reveal them
          setVisibleCount((prev) => prev + RENDER_BATCH)
        } else if (!allBatchesLoaded && !isUsingTagData) {
          // Need more data — fetch next batch
          fetchNextBatch()
        }
      },
      { rootMargin: '400px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [visibleCount, filteredItems.length, allBatchesLoaded, isUsingTagData, fetchNextBatch])

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(RENDER_BATCH)
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

  // Loading state
  const isLoading = isFetchingTag || (visitedLoading && showUnseenOnly)

  // Items to render (pre-filter during animation)
  const renderItems = clientReady ? visibleItems : baseItems.slice(0, visibleCount)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Progress bar */}
      {isLoading && (
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

        {renderItems.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {totalItems} items{hasMore && ` · showing ${visibleItems.length}`}
              {isFetchingBatch && ' · loading…'}
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
                    onClick={() => setTimeout(() => markAsVisited(item.slug), 500)}
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
                      <h2 className="article-title text-base md:text-xl font-bold mb-1 md:mb-2" style={{ viewTransitionName: `title-${item.slug}` }}>{item.title}</h2>
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
                    onClick={() => setTimeout(() => markAsVisited(item.slug), 500)}
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
                      <h2 className="article-title text-xl font-bold mb-2" style={{ viewTransitionName: `title-${item.slug}` }}>{item.title}</h2>
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
