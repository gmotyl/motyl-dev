'use client'

import { ThumbsUp } from 'lucide-react'
import type { ContentCategory } from '@/lib/content/og'
import type { SectionLink } from '@/lib/reader/section-link'
import { cn } from '@/lib/utils'
import { useLinkVote } from '@/lib/votes/use-link-vote'

export interface ReaderVoteStripProps {
  heading: string
  link: SectionLink | null
  category?: ContentCategory
  patternName?: string
}

/**
 * Full-width vote strip for the floating reader bar: votes for the first
 * external link of the Section being read, naming it by the Section heading.
 * Without a link it renders an inert dashed placeholder of the same height.
 */
export function ReaderVoteStrip({ heading, link, category, patternName }: ReaderVoteStripProps) {
  if (!link) {
    return (
      <div
        data-reader-vote-strip=""
        className="flex w-full min-h-[52px] items-center justify-center rounded-md border border-dashed border-muted-foreground/30 px-3.5 text-sm text-muted-foreground"
      >
        This section has no link to vote for
      </div>
    )
  }

  return <LinkVoteStrip heading={heading} link={link} category={category} patternName={patternName} />
}

interface LinkVoteStripProps extends Omit<ReaderVoteStripProps, 'link'> {
  link: SectionLink
}

/** Mounts only with a link, so `useLinkVote` is always called unconditionally. */
function LinkVoteStrip({ heading, link, category, patternName }: LinkVoteStripProps) {
  // Shared per-link state: a vote here also shows on the inline VoteButton.
  const { count, voted, pending, superAdmin, vote } = useLinkVote(link.url)
  const locked = !superAdmin && voted

  const handleVote = () => {
    // Same payload the inline VoteButton sends, so trends see no difference.
    void vote({ linkUrl: link.url, title: link.title, category, sourceDomain: link.url, patternName })
  }

  return (
    <button
      type="button"
      data-reader-vote-strip=""
      onClick={handleVote}
      disabled={locked || pending}
      aria-pressed={voted}
      aria-label={`Upvote ${heading} — ${count} vote${count !== 1 ? 's' : ''}`}
      className={cn(
        'flex w-full min-h-[52px] items-center justify-between gap-3 rounded-md px-3.5 text-left',
        'border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        voted
          ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
          : 'border-primary/20 text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary',
        pending ? 'cursor-wait' : locked ? 'cursor-default' : 'cursor-pointer',
        pending && 'opacity-70'
      )}
    >
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{heading}</span>
      <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium">
        <ThumbsUp aria-hidden="true" className={cn('h-5 w-5 transition-all', voted && 'fill-current')} />
        <span>{count}</span>
      </span>
    </button>
  )
}
