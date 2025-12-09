import { Suspense } from 'react'
import { ArticlesListing } from '@/components/articles-listing'
import Header from '@/components/header'
import Footer from '@/components/footer'

// Force static generation at build time - no ISR revalidation
export const dynamic = 'force-static'

export const metadata = {
  title: 'Articles - Motyl.dev',
  description: 'Original articles about web development, architecture, and software craftsmanship',
}

function ArticlesContent() {
  return (
    <ArticlesListing
      title="Articles"
      description="Original articles about web development, architecture, and software craftsmanship"
      filterConfig={{
        excludeHashtags: ['generated'],
      }}
    />
  )
}

export default function ArticlesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 container py-10">
            <h1 className="text-3xl font-bold mb-2">Articles</h1>
            <p className="text-muted-foreground mb-8">Loading...</p>
          </main>
          <Footer />
        </div>
      }
    >
      <ArticlesContent />
    </Suspense>
  )
}
