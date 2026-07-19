import Header from '@/components/header'
import Footer from '@/components/footer'
import NewsletterForm from '@/components/newsletter-form'
import Link from 'next/link'
import { getAllContentMetadata } from '@/lib/articles'
import { ItemType } from '@/lib/types'
import { getAllNewsletterMeta } from '@/lib/newsletter-issues'
import { NewsletterHero } from '@/components/newsletter-hero'
import { NewsletterIssueCard } from '@/components/newsletter-issue-card'
import { BlogArticleCard } from '@/components/blog-article-card'

export const revalidate = 300 // ISR: revalidate every 5 min; vote counts update optimistically client-side

export default async function Home() {
  const [articles, newsletters] = await Promise.all([
    getAllContentMetadata(),
    getAllNewsletterMeta(),
  ])
  const latestArticles = articles.filter((a) => a.itemType === ItemType.Article).slice(0, 3)
  const latestIssue = newsletters[0]
  const recentIssues = newsletters.slice(1, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Motyl.dev',
    url: 'https://motyl.dev',
    description: 'AI for FE newsletter — frontend & AI trends curated weekly by Grzegorz Motyl.',
  }

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-14">
          {/* Hero */}
          <section className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              motyl.dev — AI for FE newsletter
            </h1>
            <p className="text-muted-foreground">
              Frontend &amp; AI trends, curated weekly by Grzegorz Motyl.
            </p>
          </section>

          {/* Latest issue — full-width feature */}
          {latestIssue && <NewsletterHero issue={latestIssue} />}

          {/* Recent issues */}
          {recentIssues.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl font-bold tracking-tight">Recent issues</h2>
                  <span className="font-mono text-sm text-muted-foreground">
                    {newsletters.length} published
                  </span>
                </div>
                <Link href="/newsletter" className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap">
                  All issues →
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Weekly curated digest — the best frontend &amp; AI reads, by gut feeling and community upvotes.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {recentIssues.map((issue) => (
                  <NewsletterIssueCard key={issue.issueNumber} issue={issue} />
                ))}
              </div>
            </section>
          )}

          {/* From the blog */}
          {latestArticles.length > 0 && (
            <section className="space-y-4 border-t border-border pt-12">
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl font-bold tracking-tight">From the blog</h2>
                  <span className="font-mono text-sm text-muted-foreground">long-form</span>
                </div>
                <Link href="/articles" className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap">
                  All articles →
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Deep dives on building with AI agents, dev tooling, and frontend — written, not curated.
              </p>
              <div className="flex flex-col gap-5">
                {latestArticles.map((article) => (
                  <BlogArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* Subscribe */}
          <section
            id="newsletter"
            className="rounded-2xl border border-primary/20 p-8 text-center bg-[radial-gradient(600px_200px_at_50%_0%,rgba(139,92,246,0.14),transparent_70%)]"
          >
            <h2 className="text-2xl font-bold tracking-tight">📬 Get motyl.dev Weekly</h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm mt-2 mb-5">
              Frontend &amp; AI, curated every week. No spam, unsubscribe anytime.
            </p>
            <div className="max-w-sm mx-auto">
              <NewsletterForm />
            </div>
          </section>

          {/* Support CTA */}
          <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">☕ Fuel Quality Content</h2>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm mt-2 mb-5">
              Help me keep sharing high-quality insights.
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
