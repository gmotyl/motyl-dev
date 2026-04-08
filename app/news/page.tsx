import { ContentListing } from '@/components/content-listing'
import { getAllHashtags } from '@/lib/articles'
import Header from '@/components/header'
import { readBatch, readManifest } from '@/lib/content-batches'

export const revalidate = 300 // ISR: 5 min

export const metadata = {
  title: 'News - Motyl.dev',
  description: 'AI-curated frontend and AI news summaries — filtered and reviewed by Grzegorz Motyl.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function NewsPage() {
  const [initialBatch, manifest, allHashtags] = await Promise.all([
    readBatch('news', 0),
    readManifest(),
    getAllHashtags(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ContentListing
        initialBatch={initialBatch}
        manifest={manifest}
        allHashtags={allHashtags}
        title="News"
        description="Listen while you commute. Vote what matters. Articles generated for TTS, trending topics shaped by your votes — directly influencing what sources we dig into."
        contentType="news"
        basePath="/news"
      />
    </div>
  )
}
