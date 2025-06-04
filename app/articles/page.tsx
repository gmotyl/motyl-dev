"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllArticles, getAllHashtags } from "@/lib/articles"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ArticlesPage() {
  const articles = getAllArticles()
  const allHashtags = getAllHashtags()
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null)

  const filteredArticles = useMemo(() => {
    if (!selectedHashtag) return articles
    return articles.filter((article) => article.hashtags.includes(selectedHashtag))
  }, [articles, selectedHashtag])

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
                All ({articles.length})
              </Button>
              {allHashtags.map((hashtag) => {
                const count = articles.filter((article) => article.hashtags.includes(hashtag)).length
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
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {selectedHashtag ? `No articles found with hashtag #${selectedHashtag}.` : "No articles published yet."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
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
                      <Badge key={hashtag} variant="secondary" className="text-xs">
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
