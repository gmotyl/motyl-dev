import { TrendingList } from '@/components/trending-list'
import { InfoTooltip } from '@/components/info-tooltip'
import Header from '@/components/header'
import Footer from '@/components/footer'
import NewsletterForm from '@/components/newsletter-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getAllContentMetadata } from '@/lib/articles'
import { ItemType } from '@/lib/types'
import { getHomepageFeed } from '@/lib/trends'
import { getContentUrl } from '@/lib/urls'
import { getOgImage } from '@/lib/og'
import { getAllNewsletterMeta } from '@/lib/newsletter-issues'
import { auth } from '@/lib/auth'
import Image from 'next/image'

export const dynamic = 'force-dynamic' // votes change frequently

const emptyFeed = { trendings: [], lastWeekSummary: null }

export default async function Home() {
  const [feed, articles, newsletters, session] = await Promise.all([
    getHomepageFeed().catch(() => emptyFeed),
    getAllContentMetadata(),
    getAllNewsletterMeta(),
    auth().catch(() => null),
  ])
  const isSuperAdmin = session?.user?.isSuperAdmin ?? false
  const latestArticles = articles.filter(a => a.itemType === ItemType.Article).slice(0, 3)
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

          {/* Latest newsletter banner */}
          {newsletters.length > 0 && (
            <Link
              href={`/newsletter/${newsletters[0].issueNumber}`}
              className="flex items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 p-3 hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
            >
              <div className="flex-shrink-0 w-20 h-14 rounded overflow-hidden">
                <Image
                  src={newsletters[0].image}
                  alt={`Weekly #${newsletters[0].issueNumber}`}
                  width={80}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">Latest Issue</span>
                <p className="font-semibold truncate">
                  motyl.dev Weekly #{newsletters[0].issueNumber}: {newsletters[0].weekLabel}
                </p>
              </div>
              <span className="text-primary text-sm whitespace-nowrap">&rarr;</span>
            </Link>
          )}

          {/* Newsletter */}
          <section id="newsletter" className="rounded-lg border border-primary/20 bg-primary/5 p-6 md:p-8 space-y-4 text-center">
            <h2 className="text-2xl font-bold">📬 Weekly Newsletter</h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
              Get the best frontend & AI links delivered to your inbox every week. No spam, unsubscribe anytime.
            </p>
            <div className="max-w-sm mx-auto">
              <NewsletterForm />
            </div>
          </section>

          {/* Hero */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                🔥 What&apos;s Hot in FE &amp; AI
              </h1>
              <InfoTooltip text="Upvote any link from our news section to surface trends. Top links form the weekly summary." />
            </div>
            <p className="text-muted-foreground">
              Trending to next weekly issue &middot; {totalVotes} votes cast
            </p>
          </section>

          {/* Trending items */}
          {feed.trendings.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">🎯 Trending Now</h2>
              <TrendingList items={feed.trendings} isSuperAdmin={isSuperAdmin} />
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
                    className="flex gap-4 rounded-lg border border-muted bg-background/50 p-4 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-40 h-24 rounded overflow-hidden">
                      <Image
                        src={getOgImage(article as { image?: string; hashtags: string[] })}
                        alt={article.title}
                        width={160}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold hover:text-primary transition-colors">{article.title}</h3>
                      {article.excerpt && (
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      )}
                      <p className="mt-2 text-xs text-primary/60">
                        {new Date(article.publishedAt).toLocaleDateString('pl-PL', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
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

          {/* Newsletter archive (last 5) */}
          {newsletters.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Past Issues</h2>
              <div className="space-y-2">
                {newsletters.slice(0, 5).map((issue) => (
                  <Link
                    key={issue.issueNumber}
                    href={`/newsletter/${issue.issueNumber}`}
                    className="flex items-center gap-4 rounded-lg border border-muted bg-background/50 p-3 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-16 h-11 rounded overflow-hidden">
                      <Image
                        src={issue.image}
                        alt={`Weekly #${issue.issueNumber}`}
                        width={64}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="flex-1 font-medium">
                      Weekly #{issue.issueNumber}
                    </span>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {issue.weekLabel}
                    </span>
                  </Link>
                ))}
              </div>
              {newsletters.length > 5 && (
                <div className="text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/newsletter">View all issues &rarr;</Link>
                  </Button>
                </div>
              )}
            </section>
          )}

          {/* Support CTA */}
          <section className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 md:p-8 space-y-4 text-center">
            <h2 className="text-2xl font-bold">☕ Fuel Quality Content</h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm">
              Help me keep sharing high-quality insights without ads or paywalls.
            </p>
            <div>
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
