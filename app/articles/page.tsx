'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useHashtagFilter } from './useHashtagFilter'

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

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const hashtagsFromUrl = searchParams.get('hashtags')
  const modeFromUrl = searchParams.get('mode') as 'AND' | 'OR' | 'EXCLUDE' | null
  const unseenFromUrl = searchParams.get('unseen') === 'true'

  // Parse hashtags from URL
  const initialHashtags = useMemo(() => {
    if (!hashtagsFromUrl) return new Set<string>()
    return new Set(hashtagsFromUrl.split(',').filter(Boolean))
  }, [hashtagsFromUrl])

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
    handleHashtagToggle,
    handleClearFilters,
    handleFilterModeChange,
    handleToggleUnseen,
  } = useHashtagFilter({
    articles,
    initialHashtags,
    initialMode: modeFromUrl || 'AND',
    initialShowUnseen: unseenFromUrl,
    visitedSlugs: visitedArticles,
  })

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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
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
        )}
      </main>
      <Footer />
    </div>
  )
}
