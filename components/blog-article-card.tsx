import Link from 'next/link'
import Image from 'next/image'
import { getContentUrl } from '@/lib/urls'
import { getOgImage } from '@/lib/og'
import { formatDate, vtName, vtImageName } from '@/lib/utils'
import type { ContentItemMetadata } from '@/lib/articles'

interface BlogArticleCardProps {
  article: ContentItemMetadata
}

/**
 * Blog article card — image-left editorial layout with amber accent and excerpt.
 * Deliberately distinct from the violet, image-top newsletter issue cards so
 * curated issues and long-form articles never read as the same thing.
 */
export function BlogArticleCard({ article }: BlogArticleCardProps) {
  return (
    <Link
      href={getContentUrl(article)}
      className="group grid grid-cols-1 overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500 sm:grid-cols-[280px_1fr]"
    >
      <div
        className="relative aspect-[16/9] overflow-hidden sm:aspect-auto sm:min-h-[170px]"
        style={{ viewTransitionName: vtImageName(article.slug) }}
      >
        <Image
          src={getOgImage(article as { image?: string; hashtags: string[] })}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 280px"
        />
      </div>
      <div className="flex flex-col justify-center p-5 sm:p-6">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-amber-500">
          Article · {formatDate(article.publishedAt)}
        </div>
        <h3
          className="mt-2 text-lg font-bold leading-snug tracking-tight text-balance"
          style={{ viewTransitionName: vtName(article.slug) }}
        >
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}
