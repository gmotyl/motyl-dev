'use client'

import { useState, useMemo, useTransition, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useVisitedArticles } from '@/hooks/use-visited-articles'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { type ContentItemMetadata } from '@/lib/articles'
import AdUnit from '@/components/ad-unit'
import { getFilteredContent } from '@/app/actions'

interface ContentListingProps {
  title: string
  description?: string
  initialItems: ContentItemMetadata[]
  totalPages: number
  currentPage: number
  allHashtags: string[]
  hashtagCounts: Record<string, number>
  totalItems: number
  contentType: 'article' | 'news' | 'all'
  basePath: string
  requireHashtags?: string[]
  excludeHashtags?: string[]
}

export function ContentListing({
  title,
  description,
  initialItems,
  totalPages: initialTotalPages,
  currentPage: initialCurrentPage,
  allHashtags,
  hashtagCounts: initialHashtagCounts,
  totalItems: initialTotalItems,
  contentType,
  basePath,
  requireHashtags,
  excludeHashtags,
}: ContentListingProps) {
  const { markAsVisited, isVisited } = useVisitedArticles()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Component state, initialized from props
  const [items, setItems] = useState(initialItems)
  const [currentPage, setCurrentPage] = useState(initialCurrentPage)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [totalItems, setTotalItems] = useState(initialTotalItems)
  const [hashtagCounts, setHashtagCounts] = useState(initialHashtagCounts)

  // Filter state derived from URL search parameters
  const selectedHashtags = useMemo(() => {
    const hashtags = searchParams.get('hashtags')
    return new Set(hashtags ? hashtags.split(',') : [])
  }, [searchParams])

  const filterMode = useMemo(() => {
    return (searchParams.get('mode') as 'AND' | 'OR' | 'EXCLUDE') || 'AND'
  }, [searchParams])

  const showUnseenOnly = useMemo(() => {
    return searchParams.get('unseen') === 'true'
  }, [searchParams])

  // Central function to run filters and update state
  const runFilter = useCallback(
    (newFilterState: {
      page?: number
      hashtags?: Set<string>
      mode?: 'AND' | 'OR' | 'EXCLUDE'
      showUnseen?: boolean
    }) => {
      const params = new URLSearchParams(searchParams)

      const finalState = {
        page: newFilterState.page ?? currentPage,
        hashtags: Array.from(newFilterState.hashtags ?? selectedHashtags),
        mode: newFilterState.mode ?? filterMode,
        showUnseen: newFilterState.showUnseen ?? showUnseenOnly,
        contentType: contentType,
        requireHashtags: requireHashtags,
        excludeHashtags: excludeHashtags,
      }

      // Update URL
      params.set('page', finalState.page.toString())
      if (finalState.hashtags.length > 0) {
        params.set('hashtags', finalState.hashtags.join(','))
      } else {
        params.delete('hashtags')
      }
      params.set('mode', finalState.mode)
      if (finalState.showUnseen) {
        params.set('unseen', 'true')
      } else {
        params.delete('unseen')
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })

      // Call server action
      startTransition(async () => {
        const result = await getFilteredContent(finalState)
        setItems(result.items)
        setCurrentPage(result.currentPage)
        setTotalPages(result.totalPages)
        setTotalItems(result.totalItems)
        setHashtagCounts(result.hashtagCounts)
      })
    },
    [
      searchParams,
      currentPage,
      selectedHashtags,
      filterMode,
      showUnseenOnly,
      router,
      pathname,
      contentType,
      requireHashtags,
      excludeHashtags,
    ]
  )

  // Handlers for UI interactions
  const handlePageChange = (page: number) => {
    runFilter({ page })
  }

  const handleHashtagToggle = (hashtag: string) => {
    const newHashtags = new Set(selectedHashtags)
    if (newHashtags.has(hashtag)) {
      newHashtags.delete(hashtag)
    } else {
      newHashtags.add(hashtag)
    }
    runFilter({ hashtags: newHashtags, page: 1 })
  }

  const handleFilterModeChange = (mode: 'AND' | 'OR' | 'EXCLUDE') => {
    runFilter({ mode, page: 1 })
  }

  const handleToggleUnseen = () => {
    runFilter({ showUnseen: !showUnseenOnly, page: 1 })
  }

  const handleClearFilters = () => {
    runFilter({ hashtags: new Set(), showUnseen: false, page: 1, mode: 'AND' })
  }

  // When initial props change (e.g., direct navigation), sync state
  useEffect(() => {
    setItems(initialItems)
    setCurrentPage(initialCurrentPage)
    setTotalPages(initialTotalPages)
    setTotalItems(initialTotalItems)
    setHashtagCounts(initialHashtagCounts)
  }, [initialItems, initialCurrentPage, initialTotalPages, initialTotalItems, initialHashtagCounts])

  // State for hashtag visibility UI
  const [showAllHashtags, setShowAllHashtags] = useState(false)
  const [showZeroCountHashtags, setShowZeroCountHashtags] = useState(false)

  const sortedHashtags = useMemo(() => {
    return [...allHashtags].sort((a, b) => {
      const countA = hashtagCounts[a] || 0
      const countB = hashtagCounts[b] || 0
      if (countB !== countA) {
        return countB - countA
      }
      return a.localeCompare(b)
    })
  }, [allHashtags, hashtagCounts])

  const { visibleHashtags, hiddenHashtagsWithCounts, hiddenHashtagsWithoutCounts } = useMemo(() => {
    const selectedHashtagsArray = Array.from(selectedHashtags)
    const selectedHashtagsSet = new Set(selectedHashtagsArray)

    const hashtagsWithCounts = sortedHashtags.filter(
      (hashtag) => (hashtagCounts[hashtag] || 0) > 0 || selectedHashtagsSet.has(hashtag)
    )
    const hashtagsWithoutCounts = sortedHashtags.filter(
      (hashtag) => (hashtagCounts[hashtag] || 0) === 0 && !selectedHashtagsSet.has(hashtag)
    )

    if (showAllHashtags) {
      const hiddenZeroCounts = showZeroCountHashtags ? [] : hashtagsWithoutCounts
      return {
        visibleHashtags: showZeroCountHashtags ? sortedHashtags : hashtagsWithCounts,
        hiddenHashtagsWithCounts: [],
        hiddenHashtagsWithoutCounts: hiddenZeroCounts,
      }
    }

    const VISIBLE_COUNT = 16
    const visible: string[] = []
    const hidden: string[] = []

    hashtagsWithCounts.forEach((hashtag) => {
      if (selectedHashtagsSet.has(hashtag) || visible.length < VISIBLE_COUNT) {
        visible.push(hashtag)
      } else {
        hidden.push(hashtag)
      }
    })

    return {
      visibleHashtags: visible,
      hiddenHashtagsWithCounts: hidden,
      hiddenHashtagsWithoutCounts: hashtagsWithoutCounts,
    }
  }, [sortedHashtags, hashtagCounts, selectedHashtags, showAllHashtags, showZeroCountHashtags])

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) {
        pages.push('ellipsis')
      }
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }
      pages.push(totalPages)
    }
    return pages
  }

  const startIndex = (currentPage - 1) * 20
  const endIndex = startIndex + items.length

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && <p className="text-muted-foreground mb-8">{description}</p>}

        {allHashtags.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <h2 className="text-lg font-semibold">Filter by hashtags:</h2>

              <div className="flex items-center gap-4 flex-wrap">
                <Button
                  onClick={handleToggleUnseen}
                  variant={showUnseenOnly ? 'default' : 'outline'}
                  size="sm"
                  className="font-semibold"
                >
                  {showUnseenOnly ? '✓ ' : ''}UNSEEN
                </Button>

                {selectedHashtags.size > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Match:</span>
                    <div className="flex gap-1 border rounded-md overflow-hidden">
                      <button
                        onClick={() => handleFilterModeChange('AND')}
                        className={`px-3 py-1 text-sm font-medium transition-colors ${
                          filterMode === 'AND'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background hover:bg-muted'
                        }`}
                      >
                        HAS
                      </button>
                      <button
                        onClick={() => handleFilterModeChange('OR')}
                        className={`px-3 py-1 text-sm font-medium transition-colors ${
                          filterMode === 'OR'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background hover:bg-muted'
                        }`}
                      >
                        ANY
                      </button>
                      <button
                        onClick={() => handleFilterModeChange('EXCLUDE')}
                        className={`px-3 py-1 text-sm font-medium transition-colors ${
                          filterMode === 'EXCLUDE'
                            ? 'bg-destructive text-destructive-foreground'
                            : 'bg-background hover:bg-muted'
                        }`}
                      >
                        EXCLUDE
                      </button>
                    </div>
                  </div>
                )}

                {(selectedHashtags.size > 0 || showUnseenOnly) && (
                  <Button onClick={handleClearFilters} variant="destructive" size="sm">
                    Clear filters
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedHashtags.size === 0 && !showUnseenOnly ? 'default' : 'outline'}
                size="sm"
                onClick={handleClearFilters}
              >
                All ({totalItems})
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
                    className={
                      count === 0 && !isSelected ? 'text-muted-foreground line-through' : ''
                    }
                  >
                    #{hashtag}
                    {count > 0 && ` (${count})`}
                  </Button>
                )
              })}

              {!showAllHashtags &&
                (hiddenHashtagsWithCounts.length > 0 || hiddenHashtagsWithoutCounts.length > 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllHashtags(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    more...
                  </Button>
                )}

              {showAllHashtags &&
                !showZeroCountHashtags &&
                hiddenHashtagsWithoutCounts.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowZeroCountHashtags(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    more...
                  </Button>
                )}

              {showAllHashtags &&
                (showZeroCountHashtags || hiddenHashtagsWithoutCounts.length === 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAllHashtags(false)
                      setShowZeroCountHashtags(false)
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    less...
                  </Button>
                )}
            </div>
          </div>
        )}
        <div className={`transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {startIndex + 1}-{endIndex} of {totalItems} items
              </div>

              <div className="my-6">
                <AdUnit
                  pId="5937972178718571"
                  adSlot="9373832601"
                  adFormat="fluid"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`${basePath}/${item.slug}`}
                    prefetch={false}
                    onClick={() => markAsVisited(item.slug)}
                    className={`rounded-lg border backdrop-blur-sm p-6 transition-all hover:shadow-md hover:border-primary/50 flex flex-col ${
                      isVisited(item.slug) ? 'visited-article' : 'unvisited-article'
                    }`}
                  >
                    <h2 className="article-title text-xl font-bold mb-2">{item.title}</h2>
                    <p className="article-excerpt flex-grow line-clamp-3">{item.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-auto">
                      {new Date(item.publishedAt).toLocaleDateString('pl-PL', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </p>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            if (currentPage > 1) handlePageChange(currentPage - 1)
                          }}
                          className={
                            currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>
                      {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                          {page === 'ellipsis' ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(page as number)
                              }}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            if (currentPage < totalPages) handlePageChange(currentPage + 1)
                          }}
                          className={
                            currentPage === totalPages
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
