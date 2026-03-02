import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { VoteButton } from '@/components/vote-button'

interface TrendingCardProps {
  title: string
  description?: string
  linkUrl: string
  voteCount: number
  category: 'frontend' | 'ai' | 'tools' | 'other'
  sourceDomain?: string
  rank?: number
}

export function TrendingCard({
  title,
  description,
  linkUrl,
  voteCount,
  category,
  sourceDomain,
  rank,
}: TrendingCardProps) {
  return (
    <div className="group rounded-lg border border-primary/20 bg-background/50 backdrop-blur-sm p-4 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all duration-200">
      <div className="flex items-start gap-3">
        {rank != null && (
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {rank}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              {category}
            </span>
            {sourceDomain && (
              <span className="text-xs text-muted-foreground">{sourceDomain}</span>
            )}
          </div>
          <Link
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-start gap-1 font-semibold hover:text-primary transition-colors"
          >
            <span className="line-clamp-2">{title}</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </Link>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
          )}
        </div>
        <div className="shrink-0">
          <VoteButton
            linkUrl={linkUrl}
            title={title}
            description={description}
            category={category}
            sourceDomain={sourceDomain}
            initialVoteCount={voteCount}
          />
        </div>
      </div>
    </div>
  )
}
