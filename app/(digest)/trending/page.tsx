import { requireSuperAdmin } from '@/lib/require-super-admin'
import { getHomepageFeed } from '@/lib/trends'
import { TrendingList } from '@/components/trending-list'

// Live vote counts — must never be cached at the edge or statically rendered.
// This route is deliberately outside the Cloudflare public-html-allowlist.
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Trending - Motyl.dev',
  description: 'Live vote counts for the current newsletter cycle.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function TrendingPage() {
  await requireSuperAdmin('/trending')

  const feed = await getHomepageFeed().catch(() => ({ trendings: [], lastWeekSummary: null }))

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Current cycle
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Trending</h1>
        <p className="text-muted-foreground max-w-xl">
          Links accumulating votes toward the next issue.
        </p>
      </section>

      <div className="space-y-3">
        {feed.trendings.length > 0 ? (
          <TrendingList items={feed.trendings} />
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No trending items yet this week. Vote on news articles to surface trends!
          </p>
        )}
      </div>
    </div>
  )
}
