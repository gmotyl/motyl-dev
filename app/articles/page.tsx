'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useHashtagFilter } from './useHashtagFilter'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// Hook to track visited articles
function useVisitedArticles() {
  const [visitedArticles, setVisitedArticles] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Load visited articles from localStorage
    const stored = localStorage.getItem('visitedArticles')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setVisitedArticles(new Set(parsed))
      } catch (error) {
        console.error('Failed to parse visited articles:', error)
      }
    }
  }, [])

  const markAsVisited = (slug: string) => {
    setVisitedArticles((prev) => {
      const updated = new Set(prev)
      updated.add(slug)
      // Save to localStorage
      localStorage.setItem('visitedArticles', JSON.stringify([...updated]))
      return updated
    })
  }

  const isVisited = (slug: string) => visitedArticles.has(slug)

  return { markAsVisited, isVisited, visitedArticles }
}

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
              {sortedHashtags.map((hashtag) => {
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

                {/* Hashtags */}
                {article.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3 mb-2">
                    {article.hashtags.map((hashtag) => (
                      <button
                        key={hashtag}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleHashtagToggle(hashtag)
                        }}
                        className="inline-block"
                      >
                        <Badge
                          variant="secondary"
                          className="text-xs text-gray-900 font-medium bg-purple-200 hover:bg-purple-300 cursor-pointer transition-colors"
                        >
                          #{hashtag}
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-auto">
                  {new Date(article.publishedAt).toLocaleDateString()}
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
