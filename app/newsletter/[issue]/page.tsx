import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AdSlot } from '@/components/ad-slot'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ReactMarkdown from 'react-markdown'
import { getAllNewsletters } from '@/lib/newsletter-issues'
import { vtName, vtImageName } from '@/lib/utils'

export async function generateStaticParams() {
  const all = await getAllNewsletters()
  return all.map((n) => ({ issue: String(n.issueNumber) }))
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ issue: string }>
}) {
  const { issue: issueStr } = await paramsPromise
  const issueNumber = parseInt(issueStr, 10)
  const allNewsletters = await getAllNewsletters()
  const newsletter = allNewsletters.find((n) => n.issueNumber === issueNumber)

  if (!newsletter) {
    return { title: 'Newsletter Not Found' }
  }

  return {
    title: `motyl.dev Weekly #${newsletter.issueNumber} - ${newsletter.weekLabel}`,
    description: `Weekly curated digest: ${newsletter.weekLabel}`,
    openGraph: {
      type: 'article',
      title: `motyl.dev Weekly #${newsletter.issueNumber}`,
      description: `Weekly curated digest: ${newsletter.weekLabel}`,
      publishedTime: newsletter.publishedAt,
      authors: ['Grzegorz Motyl'],
      images: [{ url: newsletter.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `motyl.dev Weekly #${newsletter.issueNumber}`,
      description: `Weekly curated digest: ${newsletter.weekLabel}`,
      images: [newsletter.image],
    },
  }
}

export default async function NewsletterIssuePage({
  params: paramsPromise,
}: {
  params: Promise<{ issue: string }>
}) {
  const { issue: issueStr } = await paramsPromise
  const issueNumber = parseInt(issueStr, 10)
  if (isNaN(issueNumber) || issueNumber < 1) notFound()

  const allNewsletters = await getAllNewsletters()
  const newsletter = allNewsletters.find((n) => n.issueNumber === issueNumber)

  if (!newsletter) notFound()

  // Find prev/next for navigation
  const idx = allNewsletters.findIndex((n) => n.issueNumber === issueNumber)
  const newer = idx > 0 ? allNewsletters[idx - 1] : null
  const older = idx < allNewsletters.length - 1 ? allNewsletters[idx + 1] : null

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/newsletter" className="hover:text-primary transition-colors">
              Newsletter
            </Link>
            <span className="mx-2">/</span>
            <span>#{newsletter.issueNumber}</span>
          </nav>

          {/* Content with hero image after title */}
          <article className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children, ...props }) => {
                  const content = String(children)
                  // Only the first h1 (primary title) gets viewTransitionName
                  // Subsequent h1s in newsletter content render normally
                  const isPrimary = content.includes('motyl.dev Weekly') || content.includes('Weekly #')
                  return (
                    <>
                      <h1
                        {...props}
                        style={isPrimary ? { viewTransitionName: vtName(`newsletter-${newsletter.issueNumber}`) } : undefined}
                      >
                        {children}
                      </h1>
                      {isPrimary && (
                        <div className="not-prose mb-8 rounded-lg overflow-hidden" style={{ viewTransitionName: vtImageName(`newsletter-${newsletter.issueNumber}`) }}>
                          <Image
                            src={newsletter.image}
                            alt={`motyl.dev Weekly #${newsletter.issueNumber}`}
                            width={768}
                            height={400}
                            className="w-full h-auto object-cover"
                            priority
                          />
                        </div>
                      )}
                    </>
                  )
                },
              }}
            >
              {newsletter.content}
            </ReactMarkdown>
            <AdSlot format="horizontal" />
          </article>

          {/* Navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-border/40 pt-6" aria-label="Issue navigation">
            {older ? (
              <Link
                href={`/newsletter/${older.issueNumber}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                &larr; #{older.issueNumber}: {older.weekLabel}
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link
                href={`/newsletter/${newer.issueNumber}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                #{newer.issueNumber}: {newer.weekLabel} &rarr;
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  )
}
