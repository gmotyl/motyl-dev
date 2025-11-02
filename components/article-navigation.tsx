'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useVisitedArticles } from '@/hooks/use-visited-articles'

interface Article {
  slug: string
  title: string
  publishedAt: string
}

interface ArticleNavigationProps {
  currentSlug: string
  allArticles: Article[]
}

export function ArticleNavigation({ currentSlug, allArticles }: ArticleNavigationProps) {
  const { visitedArticles, markAsVisited } = useVisitedArticles()

  useEffect(() => {
    // Mark current article as visited when page loads
    markAsVisited(currentSlug)
  }, [currentSlug, markAsVisited])

  // Find current article index
  const currentIndex = allArticles.findIndex((article) => article.slug === currentSlug)

  // Find previous article (chronologically older)
  const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null

  // Find next article - prioritize unseen articles
  let nextArticle = null

  nextArticle = allArticles.find((article) => !visitedArticles.has(article.slug))

  // If no unseen articles found going forward, just use the next article in the list
  if (!nextArticle && currentIndex > 0) {
    nextArticle = allArticles[currentIndex - 1]
  }

  return (
    <div className="flex justify-between items-center gap-4 pt-8 mt-8 border-t border-gray-700">
      <div className="flex-1 min-w-0 max-w-[45%]">
        {prevArticle && (
          <Link
            href={`/articles/${prevArticle.slug}`}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-900/20 hover:bg-purple-900/40  transition-colors w-full"
          >
            <ChevronLeft className="h-4 w-4 flex-shrink-0" />
            <div className="text-left min-w-0 overflow-hidden">
              <div className="text-xs text-muted-foreground whitespace-nowrap">Previous</div>
              <div className="text-sm font-medium truncate">{prevArticle.title}</div>
            </div>
          </Link>
        )}
      </div>

      <div className="flex-1 min-w-0 max-w-[45%] flex justify-end">
        {nextArticle && (
          <Link
            href={`/articles/${nextArticle.slug}`}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-900/20 hover:bg-purple-900/40 transition-colors w-full justify-end"
            onClick={() => markAsVisited(nextArticle.slug)}
          >
            <div className="text-right min-w-0 overflow-hidden">
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                Next {!visitedArticles.has(nextArticle.slug) && '(Unseen)'}
              </div>
              <div className="text-sm font-medium truncate">{nextArticle.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          </Link>
        )}
      </div>
    </div>
  )
}
