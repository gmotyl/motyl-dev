import Link from 'next/link'
import Image from 'next/image'
import { vtName, vtImageName } from '@/lib/utils'
import type { NewsletterMeta } from '@/lib/newsletter-issues'

interface NewsletterIssueCardProps {
  issue: NewsletterMeta
}

/**
 * Newsletter issue card — image-top, violet accent, mono issue number.
 * Used on the homepage ("Recent issues") and the /newsletter archive grid.
 */
export function NewsletterIssueCard({ issue }: NewsletterIssueCardProps) {
  return (
    <Link
      href={`/newsletter/${issue.issueNumber}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary"
      style={{ viewTransitionName: vtName(`newsletter-${issue.issueNumber}`) }}
    >
      <div
        className="relative aspect-[16/9] overflow-hidden"
        style={{ viewTransitionName: vtImageName(`newsletter-${issue.issueNumber}`) }}
      >
        <Image
          src={issue.image}
          alt={`motyl.dev Weekly #${issue.issueNumber}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="h-[3px] bg-primary" />
      <div className="p-4">
        <div className="font-mono text-sm font-bold text-primary">№{issue.issueNumber}</div>
        <h3 className="mt-1 font-semibold tracking-tight">Weekly #{issue.issueNumber}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{issue.weekLabel}</p>
      </div>
    </Link>
  )
}
