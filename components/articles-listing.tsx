'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useHashtagFilter } from '@/app/articles/useHashtagFilter'
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
import { type ArticleMetadata } from '@/lib/articles'

interface FilterConfig {
  excludeHashtags?: string[]
  requireHashtags?: string[]
  defaultFilters?: {
    showUnseen?: boolean
  }
}

interface ArticlesListingProps {
  title: string
  description?: string
  filterConfig?: FilterConfig
  initialArticles: ArticleMetadata[]
  totalPages: number
  currentPage: number
  allHashtags: string[]
  hashtagCounts: Record<string, number>
  totalArticles: number
}

export function ArticlesListing({
  title,
  description,
  filterConfig = {},
  initialArticles,
  totalPages,
  currentPage,
  allHashtags,
  hashtagCounts,
  totalArticles,
}: ArticlesListingProps) {
  const { markAsVisited, isVisited } = useVisitedArticles()
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    selectedHashtags,
    filterMode,
    showUnseenOnly,
    handleHashtagToggle,
    handleClearFilters,
    handleFilterModeChange,
    handleToggleUnseen
  } = useHashtagFilter()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  // State for hashtag visibility
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

  // Calculate visible hashtags based on collapse state
  const { visibleHashtags, hiddenHashtagsWithCounts, hiddenHashtagsWithoutCounts } = useMemo(() => {
    const selectedHashtagsArray = Array.from(selectedHashtags)
    const selectedHashtagsSet = new Set(selectedHashtagsArray)

    const hashtagsWithCounts = sortedHashtags.filter(hashtag =>
      (hashtagCounts[hashtag] || 0) > 0 || selectedHashtagsSet.has(hashtag)
    )
    const hashtagsWithoutCounts = sortedHashtags.filter(hashtag =>
      (hashtagCounts[hashtag] || 0) === 0 && !selectedHashtagsSet.has(hashtag)
    )

    if (showAllHashtags) {
      const hiddenZeroCounts = showZeroCountHashtags ? [] : hashtagsWithoutCounts
      return {
        visibleHashtags: showZeroCountHashtags ? sortedHashtags : hashtagsWithCounts,
        hiddenHashtagsWithCounts: [],
        hiddenHashtagsWithoutCounts: hiddenZeroCounts
      }
    }

    const VISIBLE_COUNT = 16
    const visible: string[] = []
    const hidden: string[] = []

    hashtagsWithCounts.forEach(hashtag => {
      if (selectedHashtagsSet.has(hashtag) || visible.length < VISIBLE_COUNT) {
        visible.push(hashtag)
      } else {
        hidden.push(hashtag)
      }
    })

    return {
      visibleHashtags: visible,
      hiddenHashtagsWithCounts: hidden,
      hiddenHashtagsWithoutCounts: hashtagsWithoutCounts
    }
  }, [sortedHashtags, hashtagCounts, selectedHashtags, showAllHashtags, showZeroCountHashtags])

  // Generate page numbers for pagination
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

  const articlesToDisplay = useMemo(() => {
    if (!showUnseenOnly) {
      return initialArticles;
    }
    return initialArticles.filter(article => !isVisited(article.slug));
  }, [initialArticles, showUnseenOnly, isVisited]);

  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + articlesToDisplay.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && (
          <p className="text-muted-foreground mb-8">{description}</p>
        )}

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
                variant={selectedHashtags.size === 0 ? 'default' : 'outline'}
                size="sm"
                onClick={handleClearFilters}
              >
                All ({totalArticles})
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
                    className={count === 0 ? 'text-muted-foreground' : ''}
                  >
                    #{hashtag}
                    {count > 1 && ` (${count})`}
                  </Button>
                )
              })}

              {!showAllHashtags && (hiddenHashtagsWithCounts.length > 0 || hiddenHashtagsWithoutCounts.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllHashtags(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  more...
                </Button>
              )}

              {showAllHashtags && !showZeroCountHashtags && hiddenHashtagsWithoutCounts.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowZeroCountHashtags(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  more...
                </Button>
              )}

              {showAllHashtags && (showZeroCountHashtags || hiddenHashtagsWithoutCounts.length === 0) && (
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

        {articlesToDisplay.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {startIndex + 1}-{endIndex} of {totalArticles} articles
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articlesToDisplay.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  onClick={() => markAsVisited(article.slug)}
                  className={`rounded-lg border backdrop-blur-sm p-6 transition-all hover:shadow-md hover:border-primary/50 flex flex-col ${
                    isVisited(article.slug) ? 'visited-article' : 'unvisited-article'
                  }`}
                >
                  <h2 className="article-title text-xl font-bold mb-2">{article.title}</h2>
                  <p className="article-excerpt flex-grow line-clamp-3">{article.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-auto">
                    {new Date(article.publishedAt).toLocaleDateString('pl-PL', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
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
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
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
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
