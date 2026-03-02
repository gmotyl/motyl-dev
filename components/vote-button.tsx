'use client'

import { useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VoteButtonProps {
  linkUrl: string
  title: string
  description?: string
  category?: 'frontend' | 'ai' | 'tools' | 'other'
  /**
   * @param sourceDomain - Full URL of the source (e.g. "https://example.com"). Must be a valid URL.
   */
  sourceDomain?: string
  initialVoteCount: number
  onVote?: () => void
}

export function VoteButton({
  linkUrl,
  title,
  description = '',
  category = 'other',
  sourceDomain,
  initialVoteCount,
  onVote,
}: VoteButtonProps) {
  const [voted, setVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(initialVoteCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleVote = async () => {
    if (voted || isLoading) return

    // Optimistic update
    setVoteCount(prev => prev + 1)
    setVoted(true)
    setIsLoading(true)

    try {
      const res = await fetch('/api/trends/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkUrl, title, description, category, sourceDomain }),
      })

      if (!res.ok) {
        // Rollback on failure
        setVoteCount(prev => prev - 1)
        setVoted(false)
        return
      }

      onVote?.()
    } catch {
      // Rollback on error
      setVoteCount(prev => prev - 1)
      setVoted(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleVote}
      disabled={voted || isLoading}
      aria-pressed={voted}
      aria-label={`Upvote — ${voteCount} vote${voteCount !== 1 ? 's' : ''}`}
      className={cn(
        'flex items-center justify-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
        'min-h-[44px] min-w-[44px]',
        'border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        voted
          ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
          : 'border-primary/20 text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary',
        isLoading ? 'cursor-wait' : voted ? 'cursor-default' : 'cursor-pointer',
        isLoading && 'opacity-70'
      )}
    >
      <ThumbsUp className={cn('h-4 w-4 transition-all', voted && 'fill-current')} />
      <span className="text-sm">{voteCount}</span>
    </button>
  )
}
