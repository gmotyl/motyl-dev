import { Suspense } from 'react'
import { ContentListing } from '@/components/content-listing'
import { getAllHashtags } from '@/lib/articles'
import Header from '@/components/header'
import { readBatch, readManifest } from '@/lib/content-batches'

export const revalidate = 300 // ISR: 5 min

export const metadata = {
  title: 'Blog - Motyl.dev',
  description: 'Original insights on web architecture and the future of AI-driven development',
}

export default async function ArticlesPage() {
  const [initialBatch, manifest, allHashtags] = await Promise.all([
    readBatch('articles', 0),
    readManifest(),
    getAllHashtags(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense>
        <ContentListing
          initialBatch={initialBatch}
          manifest={manifest}
          allHashtags={allHashtags}
          title="Blog"
          description="Original insights on web architecture and the future of AI-driven development"
          contentType="article"
          basePath="/articles"
        />
      </Suspense>
    </div>
  )
}
