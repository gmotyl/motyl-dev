'use client'

import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useState } from 'react'

interface HashtagsListProps {
  hashtags: string[]
  maxVisible?: number
  linkToArticles?: boolean
  linkToBookmarks?: boolean
  className?: string
}

/**
 * HashtagsList - Generic hashtag display component with overflow indicator
 *
 * Shows first N hashtags and "..." button if there are more.
 * Clicking "..." expands to show all hashtags.
 * Can link hashtags to articles or bookmarks filter pages.
 *
 * Usage:
 * <HashtagsList
 *   hashtags={['react', 'nextjs', 'typescript']}
 *   maxVisible={3}
 *   linkToArticles={true}
 * />
 */
export function HashtagsList({
  hashtags,
  maxVisible = 3,
  linkToArticles = false,
  linkToBookmarks = false,
  className = ''
}: HashtagsListProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!hashtags || hashtags.length === 0) {
    return null
  }

  const visibleHashtags = isExpanded ? hashtags : hashtags.slice(0, maxVisible)
  const hasMore = hashtags.length > maxVisible

  const getLink = (hashtag: string) => {
    if (linkToArticles) {
      return `/articles?hashtags=${hashtag}&mode=AND`
    }
    if (linkToBookmarks) {
      return `/bookmarks?hashtags=${hashtag}&mode=AND`
    }
    return undefined
  }

  return (
    <div className={`flex flex-wrap gap-2 items-center ${className}`} data-hashtags-container>
      {visibleHashtags.map((hashtag) => {
        const badgeContent = (
          <Badge
            variant="secondary"
            className="text-gray-900 font-medium bg-purple-200 hover:bg-purple-300 cursor-pointer transition-colors"
            data-hashtag={hashtag}
          >
            #{hashtag}
          </Badge>
        )

        const link = getLink(hashtag)
        if (link) {
          return (
            <Link
              href={link}
              key={hashtag}
            >
              {badgeContent}
            </Link>
          )
        }

        return <span key={hashtag}>{badgeContent}</span>
      })}

      {hasMore && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-secondary"
          aria-label="Show all hashtags"
        >
          ...
        </button>
      )}
    </div>
  )
}
