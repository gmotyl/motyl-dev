'use client'

import { useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VoteButtonProps {
  linkUrl: string
  title: string
  description?: string
  category?: 'frontend' | 'ai' | 'tools' | 'other'
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
        return
      }

      setVoted(true)
      onVote?.()
    } catch {
      // Rollback on error
      setVoteCount(prev => prev - 1)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={voted || isLoading}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
        'border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        voted
          ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 cursor-default'
          : 'border-primary/20 text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary',
        isLoading && 'opacity-70 cursor-wait'
      )}
      aria-label={`Upvote — ${voteCount} vote${voteCount !== 1 ? 's' : ''}`}
    >
      <ThumbsUp className={cn('h-3.5 w-3.5 transition-all', voted && 'fill-current')} />
      <span>{voteCount}</span>
    </button>
  )
}
