import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { getAllNewsletterMeta } from '@/lib/newsletter-issues'
import { getHomepageFeed } from '@/lib/trends'
import NewsletterForm from '@/components/newsletter-form'
import { NewsletterTabs } from '@/components/newsletter-tabs'
import { NewsletterHero } from '@/components/newsletter-hero'
import { NewsletterIssueCard } from '@/components/newsletter-issue-card'

const title = 'Newsletter Archive - Motyl.dev'
const description = 'Weekly curated digest of frontend & AI trends by Grzegorz Motyl.'

export async function generateMetadata() {
  const allMeta = await getAllNewsletterMeta()
  const latestImage = allMeta.length > 0 ? allMeta[0].image : 'https://img.motyl.dev/greg-stanczyk.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: latestImage, width: 1200, height: 630 }],
    },
  }
}

const ITEMS_PER_PAGE = 10

interface NewsletterArchiveProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function NewsletterArchive({ searchParams }: NewsletterArchiveProps) {
  const params = await searchParams
  const page = Math.max(1, parseInt((params.page as string) || '1', 10))
  const [allMeta, feed] = await Promise.all([
    getAllNewsletterMeta(),
    getHomepageFeed().catch(() => ({ trendings: [], lastWeekSummary: null })),
  ])

  const totalPages = Math.max(1, Math.ceil(allMeta.length / ITEMS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const items = allMeta.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  // On page 1 the newest issue leads as a full-width hero; the rest fill the grid.
  const featured = currentPage === 1 ? items[0] : undefined
  const gridItems = featured ? items.slice(1) : items

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-10">
          <section className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Weekly digest
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Newsletter</h1>
              <p className="text-muted-foreground max-w-xl">
                Reads worth your time — curated by personal gut feeling and community upvotes.
              </p>
            </div>
            <span className="font-mono text-sm text-muted-foreground whitespace-nowrap">
              {allMeta.length} issues · every Sunday
            </span>
          </section>

          {/* Latest issue — full-width feature (page 1 only) */}
          {featured && <NewsletterHero issue={featured} />}

          <NewsletterTabs
            archiveContent={
              <div className="space-y-8 pt-2">
                {gridItems.length === 0 ? (
                  !featured && <p className="text-muted-foreground">No newsletters published yet.</p>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {gridItems.map((issue) => (
                      <NewsletterIssueCard key={issue.issueNumber} issue={issue} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="flex items-center justify-center gap-4 mt-8" aria-label="Pagination">
                    {currentPage > 1 ? (
                      <Link
                        href={`/newsletter?page=${currentPage - 1}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        &larr; Newer
                      </Link>
                    ) : (
                      <span className="text-sm text-muted-foreground">&larr; Newer</span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages ? (
                      <Link
                        href={`/newsletter?page=${currentPage + 1}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Older &rarr;
                      </Link>
                    ) : (
                      <span className="text-sm text-muted-foreground">Older &rarr;</span>
                    )}
                  </nav>
                )}
              </div>
            }
            trendingItems={feed.trendings}
          />

          {/* Subscribe */}
          <section className="rounded-2xl border border-primary/20 p-8 text-center bg-[radial-gradient(600px_200px_at_50%_0%,rgba(139,92,246,0.14),transparent_70%)]">
            <h2 className="text-2xl font-bold tracking-tight">📬 Get it in your inbox</h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-2 mb-5">
              No spam, unsubscribe anytime.
            </p>
            <div className="max-w-sm mx-auto">
              <NewsletterForm />
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
