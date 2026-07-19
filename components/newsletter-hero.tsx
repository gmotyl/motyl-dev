import Link from 'next/link'
import Image from 'next/image'
import { vtName, vtImageName } from '@/lib/utils'
import type { NewsletterMeta } from '@/lib/newsletter-issues'

interface NewsletterHeroProps {
  issue: NewsletterMeta
  eyebrow?: string
}

/**
 * Full-width featured issue hero — large art with gradient scrim and mono issue number.
 * Used for the latest issue on the homepage and /newsletter archive.
 */
export function NewsletterHero({ issue, eyebrow = 'Latest issue' }: NewsletterHeroProps) {
  return (
    <Link
      href={`/newsletter/${issue.issueNumber}`}
      className="group relative block aspect-[16/9] overflow-hidden rounded-2xl border border-border sm:aspect-[16/7]"
      style={{ viewTransitionName: vtName(`newsletter-${issue.issueNumber}`) }}
    >
      <div className="absolute inset-0" style={{ viewTransitionName: vtImageName(`newsletter-${issue.issueNumber}`) }}>
        <Image
          src={issue.image}
          alt={`motyl.dev Weekly #${issue.issueNumber}`}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1152px) 100vw, 1152px"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/5" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </span>
        <div className="mt-2 font-mono text-4xl font-bold leading-none tracking-tight text-foreground sm:text-6xl">
          <span className="text-primary">№</span>
          {issue.issueNumber}
        </div>
        <h2 className="mt-3 max-w-[22ch] text-xl font-bold tracking-tight text-balance sm:text-3xl">
          motyl.dev Weekly #{issue.issueNumber}
        </h2>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          {issue.weekLabel} · curated by Greg
        </p>
      </div>
    </Link>
  )
}
