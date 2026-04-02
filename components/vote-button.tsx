'use client'

import { useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const CONTRIBUTIONS_KEY = 'motyl:contributions'

function getContributions(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(CONTRIBUTIONS_KEY) || '0', 10)
}

function incrementContributions(): number {
  const count = getContributions() + 1
  localStorage.setItem(CONTRIBUTIONS_KEY, String(count))
  return count
}

interface VoteButtonProps {
  linkUrl: string
  title: string
  description?: string
  category?: import('@/lib/og').ContentCategory
  /**
   * @param sourceDomain - Full URL of the source (e.g. "https://example.com"). Must be a valid URL.
   */
  sourceDomain?: string
  patternName?: string
  initialVoteCount: number
  onVote?: (newCount: number) => void
}

export function VoteButton({
  linkUrl,
  title,
  description = '',
  category = 'general',
  sourceDomain,
  patternName,
  initialVoteCount,
  onVote,
}: VoteButtonProps) {
  const [voted, setVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(initialVoteCount)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  const handleVote = async () => {
    if ((!isSuperAdmin && voted) || isLoading) return

    // Optimistic update
    setVoteCount(prev => prev + 1)
    if (!isSuperAdmin) setVoted(true)
    setIsLoading(true)

    try {
      const res = await fetch('/api/trends/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkUrl, title, description, category, sourceDomain, patternName }),
      })

      if (!res.ok) {
        setVoteCount(prev => prev - 1)
        if (!isSuperAdmin) setVoted(false)
        return
      }

      const data = await res.json()
      if (data.isSuperAdmin) setIsSuperAdmin(true)

      const serverCount = data.vote?.voteCount ?? (voteCount + 1)
      setVoteCount(serverCount)

      const contributions = incrementContributions()

      // Build impact message
      if (data.isNew) {
        toast.success('🎯 Added to trending!', {
          description: `You've contributed ${contributions} time${contributions !== 1 ? 's' : ''}`,
        })
      } else if (data.newRank <= 3) {
        toast.success(`🔥 Now #${data.newRank}!`, {
          description: `${contributions} contribution${contributions !== 1 ? 's' : ''} from this browser`,
        })
      } else {
        toast.success('👍 Vote counted!', {
          description: `#${data.newRank} this week · ${contributions} total`,
        })
      }

      onVote?.(serverCount)
    } catch {
      setVoteCount(prev => prev - 1)
      if (!isSuperAdmin) setVoted(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleVote}
      disabled={(!isSuperAdmin && voted) || isLoading}
      aria-pressed={voted}
      aria-label={`Upvote — ${voteCount} vote${voteCount !== 1 ? 's' : ''}`}
      className={cn(
        'flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 rounded-full px-2 md:px-3 py-1 text-sm font-medium',
        'min-h-[44px] min-w-[44px]',
        'border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        voted
          ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
          : 'border-primary/20 text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary',
        isLoading ? 'cursor-wait' : (!isSuperAdmin && voted) ? 'cursor-default' : 'cursor-pointer',
        isLoading && 'opacity-70'
      )}
    >
      <ThumbsUp className={cn('h-5 w-5 transition-all', voted && 'fill-current')} />
      <span className="text-sm">{voteCount}</span>
    </button>
  )
}
