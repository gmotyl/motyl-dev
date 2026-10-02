'use client'

import { ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLinkVote } from '@/lib/votes/use-link-vote'

interface VoteButtonProps {
  linkUrl: string
  title: string
  description?: string
  category?: import('@/lib/content/og').ContentCategory
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
  // Vote state is shared per linkUrl with every other vote surface on the page.
  const { count: voteCount, voted, pending: isLoading, superAdmin: isSuperAdmin, vote } =
    useLinkVote(linkUrl, initialVoteCount)

  const handleVote = async () => {
    const serverCount = await vote({ linkUrl, title, description, category, sourceDomain, patternName })
    if (serverCount !== null) onVote?.(serverCount)
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
