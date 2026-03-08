'use client'

import { useState, useEffect, useRef } from 'react'
import { ThumbsUp } from 'lucide-react'
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
  initialVoteCount: number
  onVote?: () => void
}

export function VoteButton({
  linkUrl,
  title,
  description = '',
  category = 'general',
  sourceDomain,
  initialVoteCount,
  onVote,
}: VoteButtonProps) {
  const [voted, setVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(initialVoteCount)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [popover, setPopover] = useState<string | null>(null)
  const popoverTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (popoverTimeout.current) clearTimeout(popoverTimeout.current)
    }
  }, [])

  const showPopover = (message: string) => {
    setPopover(message)
    if (popoverTimeout.current) clearTimeout(popoverTimeout.current)
    popoverTimeout.current = setTimeout(() => setPopover(null), 3000)
  }

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
        body: JSON.stringify({ linkUrl, title, description, category, sourceDomain }),
      })

      if (!res.ok) {
        setVoteCount(prev => prev - 1)
        if (!isSuperAdmin) setVoted(false)
        return
      }

      const data = await res.json()
      if (data.isSuperAdmin) setIsSuperAdmin(true)

      const contributions = incrementContributions()

      // Build impact message
      if (data.isNew) {
        showPopover(`🎯 Added to trending! You've contributed ${contributions} time${contributions !== 1 ? 's' : ''}`)
      } else if (data.newRank <= 3) {
        showPopover(`🔥 Now #${data.newRank}! ${contributions} contributions from this browser`)
      } else {
        showPopover(`👍 Vote counted! #${data.newRank} this week (${contributions} total)`)
      }

      onVote?.()
    } catch {
      setVoteCount(prev => prev - 1)
      if (!isSuperAdmin) setVoted(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
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

      {popover && (
        <div
          role="status"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg border border-primary/20 bg-background/95 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-primary shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {popover}
        </div>
      )}
    </div>
  )
}
