import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { getAllNewsletterMeta } from '@/lib/newsletter-issues'
import NewsletterForm from '@/components/newsletter-form'

const title = 'Newsletter Archive - Motyl.dev'
const description = 'Weekly curated digest of frontend & AI trends by Grzegorz Motyl.'

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: 'https://img.motyl.dev/greg-stanczyk.jpg', width: 1200, height: 630 }],
  },
}

const ITEMS_PER_PAGE = 10

interface NewsletterArchiveProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function NewsletterArchive({ searchParams }: NewsletterArchiveProps) {
  const params = await searchParams
  const page = Math.max(1, parseInt((params.page as string) || '1', 10))
  const allMeta = await getAllNewsletterMeta()

  const totalPages = Math.max(1, Math.ceil(allMeta.length / ITEMS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const items = allMeta.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-8">
          <section className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Newsletter Archive</h1>
            <p className="text-muted-foreground">
              Weekly reads worth your time — curated by personal gut feeling and community upvotes.
            </p>
          </section>

          {items.length === 0 ? (
            <p className="text-muted-foreground">No newsletters published yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((issue) => (
                <Link
                  key={issue.issueNumber}
                  href={`/newsletter/${issue.issueNumber}`}
                  className="flex items-center gap-4 rounded-lg border border-muted bg-background/50 p-3 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-20 h-14 rounded overflow-hidden">
                    <Image
                      src={issue.image}
                      alt={`Weekly #${issue.issueNumber}`}
                      width={80}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold">
                      motyl.dev Weekly #{issue.issueNumber}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {issue.weekLabel}
                    </p>
                  </div>
                  <time className="text-xs text-muted-foreground whitespace-nowrap" dateTime={issue.publishedAt}>
                    {new Date(issue.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-4" aria-label="Pagination">
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

          {/* Subscribe CTA */}
          <section className="rounded-lg border border-primary/20 bg-primary/5 p-6 space-y-4 text-center">
            <h2 className="text-xl font-bold">Get it in your inbox</h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
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
