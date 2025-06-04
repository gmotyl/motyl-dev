"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllArticles, getAllHashtags, getArticlesByHashtag } from "@/lib/articles"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ArticlesPage() {
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null)
  const [articles, setArticles] = useState(getAllArticles())
  const allHashtags = getAllHashtags()

  // Use the pre-built hashtag index for efficient filtering
  useEffect(() => {
    if (selectedHashtag) {
      setArticles(getArticlesByHashtag(selectedHashtag))
    } else {
      setArticles(getAllArticles())
    }
  }, [selectedHashtag])

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
                variant={selectedHashtag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedHashtag(null)}
              >
                All ({getAllArticles().length})
              </Button>
              {allHashtags.map((hashtag) => {
                const count = getArticlesByHashtag(hashtag).length
                return (
                  <Button
                    key={hashtag}
                    variant={selectedHashtag === hashtag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedHashtag(hashtag)}
                  >
                    #{hashtag} ({count})
                  </Button>
                )
              })}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {selectedHashtag ? `No articles found with hashtag #${selectedHashtag}.` : "No articles published yet."}
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
                      <Badge
                        key={hashtag}
                        variant="secondary"
                        className="text-xs text-gray-900 font-medium bg-gray-200 hover:bg-gray-300"
                      >
                        #{hashtag}
                      </Badge>
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
