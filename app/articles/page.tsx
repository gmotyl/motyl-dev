'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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
  const hashtagFromUrl = searchParams.get('hashtag')
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(hashtagFromUrl)
  const [articles, setArticles] = useState<Article[]>([])
  const [allHashtags, setAllHashtags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch articles and hashtags
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const url = selectedHashtag ? `/api/articles?hashtag=${selectedHashtag}` : '/api/articles'
        const response = await fetch(url)
        const data = await response.json()

        if (selectedHashtag) {
          setArticles(data.articles)
        } else {
          setArticles(data.articles)
          setAllHashtags(data.hashtags)
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedHashtag])

  // Update selected hashtag when URL changes
  useEffect(() => {
    setSelectedHashtag(hashtagFromUrl)
  }, [hashtagFromUrl])

  const handleHashtagClick = (hashtag: string) => {
    setSelectedHashtag(hashtag)
    // Update URL without page reload
    const url = new URL(window.location.href)
    url.searchParams.set('hashtag', hashtag)
    window.history.pushState({}, '', url.toString())
  }

  const handleShowAll = () => {
    setSelectedHashtag(null)
    // Remove hashtag from URL
    const url = new URL(window.location.href)
    url.searchParams.delete('hashtag')
    window.history.pushState({}, '', url.toString())
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-8">All Articles</h1>

        {/* Hashtag Filter */}
        {allHashtags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Filter by hashtag:</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedHashtag === null ? 'default' : 'outline'}
                size="sm"
                onClick={handleShowAll}
              >
                All ({articles.length})
              </Button>
              {allHashtags.map((hashtag) => (
                <Button
                  key={hashtag}
                  variant={selectedHashtag === hashtag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleHashtagClick(hashtag)}
                >
                  #{hashtag}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {selectedHashtag
                ? `No articles found with hashtag #${selectedHashtag}.`
                : 'No articles published yet.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="rounded-lg border bg-background/50 backdrop-blur-sm p-6 transition-all hover:border-primary/50 hover:shadow-md flex flex-col"
              >
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text-muted-foreground flex-grow line-clamp-3">{article.excerpt}</p>

                {/* Hashtags */}
                {article.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3 mb-2">
                    {article.hashtags.map((hashtag) => (
                      <button
                        key={hashtag}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleHashtagClick(hashtag)
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
