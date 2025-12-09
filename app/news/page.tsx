import { Suspense } from 'react'
import { ArticlesListing } from '@/components/articles-listing'
import Header from '@/components/header'
import Footer from '@/components/footer'

// Force static generation at build time - no ISR revalidation
export const dynamic = 'force-static'

export const metadata = {
  title: 'News - Motyl.dev',
  description: 'Latest tech news and insights curated from newsletters',
}

function NewsContent() {
  return (
    <ArticlesListing
      title="News"
      description="Latest tech news and insights curated from newsletters"
      filterConfig={{
        requireHashtags: ['generated'],
        defaultFilters: { showUnseen: true },
      }}
    />
  )
}

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 container py-10">
            <h1 className="text-3xl font-bold mb-2">News</h1>
            <p className="text-muted-foreground mb-8">Loading...</p>
          </main>
          <Footer />
        </div>
      }
    >
      <NewsContent />
    </Suspense>
  )
}
