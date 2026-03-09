import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { VoteButton } from '@/components/vote-button'
import { CategoryIconMini } from '@/components/category-icon'

interface TrendingCardProps {
  title: string
  description?: string
  linkUrl: string
  voteCount: number
  category: import('@/lib/og').ContentCategory
  sourceDomain?: string
}

export function TrendingCard({
  title,
  description,
  linkUrl,
  voteCount,
  category,
  sourceDomain,
}: TrendingCardProps) {
  return (
    <div
      className={`group rounded-lg border transition-all duration-200 hover:shadow-md flex flex-row overflow-hidden category-${category} unvisited-article`}
    >
      {/* Left column: icon + vote */}
      <div className="flex-shrink-0 w-16 md:w-24 flex flex-col items-center gap-4 py-3 px-2">
        <CategoryIconMini category={category} className="w-10 h-10" />
        <VoteButton
          linkUrl={linkUrl}
          title={title}
          description={description}
          category={category}
          sourceDomain={sourceDomain}
          initialVoteCount={voteCount}
        />
      </div>

      {/* Right column: content */}
      <div className="p-3 pl-2 flex flex-col flex-grow min-w-0 justify-center">
        <Link
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-start gap-1 font-semibold text-white/90 hover:text-white transition-colors"
        >
          <span className="line-clamp-2">{title}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </Link>
        {description && <p className="mt-1 text-sm text-white/60 line-clamp-2">{description}</p>}
      </div>
    </div>
  )
}
