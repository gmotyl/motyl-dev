'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useHashtagFilter } from './useHashtagFilter'
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

interface Article {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  content: string
  hashtags: string[]
}

const ARTICLES_PER_PAGE = 20

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const hashtagsFromUrl = searchParams.get('hashtags')
  const modeFromUrl = searchParams.get('mode') as 'AND' | 'OR' | 'EXCLUDE' | null
  const unseenFromUrl = searchParams.get('unseen') === 'true'
  const pageFromUrl = searchParams.get('page')

  // Parse hashtags from URL
  const initialHashtags = useMemo(() => {
    if (!hashtagsFromUrl) return new Set<string>()
    return new Set(hashtagsFromUrl.split(',').filter(Boolean))
  }, [hashtagsFromUrl])

  // Parse page from URL (default to 1)
  const initialPage = useMemo(() => {
    const page = parseInt(pageFromUrl || '1', 10)
    return page > 0 ? page : 1
  }, [pageFromUrl])

  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { markAsVisited, isVisited, visitedArticles } = useVisitedArticles()

  // State for hashtag visibility
  const [showAllHashtags, setShowAllHashtags] = useState(false)
  const [showZeroCountHashtags, setShowZeroCountHashtags] = useState(false)

  // Fetch all articles once
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/articles')
        const data = await response.json()
        setArticles(data.articles)
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Use the hashtag filter hook
  const {
    selectedHashtags,
    filterMode,
    showUnseenOnly,
    filteredArticles,
    allHashtags,
    sortedHashtags,
    dynamicHashtagCounts,
    currentPage,
    handleHashtagToggle,
    handleClearFilters,
    handleFilterModeChange,
    handleToggleUnseen,
    handlePageChange,
  } = useHashtagFilter({
    articles,
    initialHashtags,
    initialMode: modeFromUrl || 'AND',
    initialShowUnseen: unseenFromUrl,
    visitedSlugs: visitedArticles,
    initialPage,
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const endIndex = startIndex + ARTICLES_PER_PAGE
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  // Calculate visible hashtags based on collapse state
  const { visibleHashtags, hiddenHashtagsWithCounts, hiddenHashtagsWithoutCounts } = useMemo(() => {
    // Always include selected hashtags
    const selectedHashtagsArray = Array.from(selectedHashtags)
    const selectedHashtagsSet = new Set(selectedHashtagsArray)

    // Separate hashtags with and without counts, but keep selected ones separate
    const hashtagsWithCounts = sortedHashtags.filter(hashtag =>
      (dynamicHashtagCounts[hashtag] || 0) > 0 || selectedHashtagsSet.has(hashtag)
    )
    const hashtagsWithoutCounts = sortedHashtags.filter(hashtag =>
      (dynamicHashtagCounts[hashtag] || 0) === 0 && !selectedHashtagsSet.has(hashtag)
    )

    if (showAllHashtags) {
      // When expanded, show all hashtags with counts (including selected with zero counts)
      // Show zero-count hashtags only if toggle is on
      const hiddenZeroCounts = showZeroCountHashtags ? [] : hashtagsWithoutCounts

      return {
        visibleHashtags: showZeroCountHashtags ? sortedHashtags : hashtagsWithCounts,
        hiddenHashtagsWithCounts: [],
        hiddenHashtagsWithoutCounts: hiddenZeroCounts
      }
    }

    // Calculate two rows worth of hashtags (approximately)
    // We'll estimate based on average button width: ~100px per button, ~8 buttons per row on desktop
    const VISIBLE_COUNT = 16 // Approximately 2 rows

    // Build visible list: selected + top hashtags (with counts) up to VISIBLE_COUNT
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
  }, [sortedHashtags, dynamicHashtagCounts, selectedHashtags, showAllHashtags, showZeroCountHashtags])

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-8">All Articles</h1>

        {/* Hashtag Filter */}
        {allHashtags.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <h2 className="text-lg font-semibold">Filter by hashtags:</h2>

              <div className="flex items-center gap-4 flex-wrap">
                {/* UNSEEN Filter */}
                <Button
                  onClick={handleToggleUnseen}
                  variant={showUnseenOnly ? 'default' : 'outline'}
                  size="sm"
                  className="font-semibold"
                >
                  {showUnseenOnly ? '✓ ' : ''}UNSEEN
                </Button>

                {/* Mode Selector */}
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

                {/* Clear Filters */}
                {(selectedHashtags.size > 0 || showUnseenOnly) && (
                  <Button onClick={handleClearFilters} variant="destructive" size="sm">
                    Clear filters
                  </Button>
                )}
              </div>
            </div>

            {/* Hashtag Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedHashtags.size === 0 ? 'default' : 'outline'}
                size="sm"
                onClick={handleClearFilters}
              >
                All ({filteredArticles.length})
              </Button>

              {/* Visible hashtags */}
              {visibleHashtags.map((hashtag) => {
                const count = dynamicHashtagCounts[hashtag] || 0
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

              {/* Show more/less button - only one visible at a time */}
              {/* Show first "more..." when collapsed */}
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

              {/* Show second "more..." when expanded but zero-count hashtags still hidden */}
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

              {/* Show "less..." only when fully expanded OR when expanded without zero-count option */}
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

        {/* Articles Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {selectedHashtags.size > 0
                ? `No articles found matching the selected hashtags.`
                : 'No articles published yet.'}
            </p>
          </div>
        ) : (
          <>
            {/* Articles count and pagination info */}
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article) => (
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

          {/* Pagination */}
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
