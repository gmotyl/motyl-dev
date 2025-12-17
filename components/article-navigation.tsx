'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Article {
  slug: string
  title: string
  itemType?: 'article' | 'news'
}

interface ArticleNavigationProps {
  prevArticle: Article | null
  nextArticle: Article | null
}

export function ArticleNavigation({ prevArticle, nextArticle }: ArticleNavigationProps) {
  const getLinkHref = (article: Article) => {
    const type = article.itemType || 'article'
    const basePath = type === 'article' ? 'articles' : type // Convert 'article' to 'articles' for routing
    return `/${basePath}/${article.slug}`
  }

  return (
    <div className="flex justify-between items-center gap-4 pt-8 mt-8 border-t border-gray-700">
      <div className="flex-1 min-w-0 max-w-[45%]">
        {prevArticle && (
          <Link
            href={getLinkHref(prevArticle)}
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
            href={getLinkHref(nextArticle)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-900/20 hover:bg-purple-900/40 transition-colors w-full justify-end"
          >
            <div className="text-right min-w-0 overflow-hidden">
              <div className="text-xs text-muted-foreground whitespace-nowrap">Next</div>
              <div className="text-sm font-medium truncate">{nextArticle.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          </Link>
        )}
      </div>
    </div>
  )
}
