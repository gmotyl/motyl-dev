import { TrendingCard } from '@/components/trending-card'
import { InfoTooltip } from '@/components/info-tooltip'
import Header from '@/components/header'
import Footer from '@/components/footer'
import NewsletterForm from '@/components/newsletter-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getAllContentMetadata } from '@/lib/articles'
import { getHomepageFeed } from '@/lib/trends'
import { getContentUrl } from '@/lib/urls'

export const dynamic = 'force-dynamic' // votes change frequently

export default async function Home() {
  const [feed, articles] = await Promise.all([
    getHomepageFeed(),
    getAllContentMetadata(),
  ])
  const latestArticles = articles.slice(0, 3)
  const totalVotes = feed.trendings.reduce((sum, t) => sum + t.voteCount, 0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Motyl.dev',
    url: 'https://motyl.dev',
    description: 'Frontend & AI trends, curated weekly by Grzegorz Motyl. Vote on what matters.',
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-12">

          {/* Hero */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                🔥 What&apos;s Hot in Frontend &amp; AI
              </h1>
              <InfoTooltip text="Upvote any link from our news section to surface trends. Top links form the weekly summary." />
            </div>
            <p className="text-muted-foreground">
              Week {feed.currentWeek} &middot; {totalVotes} votes cast
            </p>
          </section>

          {/* Trending items */}
          {feed.trendings.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">🎯 Trending Now</h2>
              <div className="space-y-3">
                {feed.trendings.map((item, index) => (
                  <TrendingCard
                    key={item.id}
                    title={item.title}
                    description={item.description ?? undefined}
                    linkUrl={item.linkUrl}
                    voteCount={item.voteCount}
                    category={item.category as 'frontend' | 'ai' | 'tools' | 'other'}
                    sourceDomain={item.sourceDomain ?? undefined}
                    rank={index + 1}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section className="rounded-lg border border-dashed border-primary/30 p-8 text-center text-muted-foreground">
              <p>No trending items yet this week. Be the first to vote on a news article!</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/news">Browse News</Link>
              </Button>
            </section>
          )}

          {/* Latest Articles */}
          {latestArticles.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">📖 From The Blog</h2>
              <div className="space-y-3">
                {latestArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={getContentUrl(article)}
                    className="block rounded-lg border border-muted bg-background/50 p-4 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                  >
                    <h3 className="font-semibold hover:text-primary transition-colors">{article.title}</h3>
                    {article.excerpt && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    )}
                    <p className="mt-2 text-xs text-primary/60">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="text-right">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/articles">View all articles →</Link>
                </Button>
              </div>
            </section>
          )}

          {/* Last week summary */}
          {feed.lastWeekSummary && (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">📚 From Last Week</h2>
              <div className="rounded-lg border border-border bg-muted/30 p-4 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{feed.lastWeekSummary.summaryMarkdown}</p>
              </div>
            </section>
          )}

          {/* Newsletter + Donation CTA */}
          <section id="newsletter" className="rounded-lg border border-primary/20 bg-primary/5 p-6 md:p-8 space-y-4 text-center">
            <h2 className="text-2xl font-bold">☕ Fuel Quality Content</h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
              Help me keep sharing high-quality insights without ads or paywalls. Subscribe for weekly summaries.
            </p>
            <div className="max-w-sm mx-auto">
              <NewsletterForm />
            </div>
            <div className="pt-2">
              <a
                href="https://www.buymeacoffee.com/motyl.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-white px-5 py-2 text-sm font-medium transition-colors"
              >
                ☕ Buy Me a Coffee
              </a>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
