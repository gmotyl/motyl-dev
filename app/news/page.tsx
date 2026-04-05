import { ContentListing } from '@/components/content-listing'
import { getAllFilteredContent, getAllHashtags } from '@/lib/articles'
import Header from '@/components/header'

export const revalidate = 300 // ISR: 5 min

export const metadata = {
  title: 'News - Motyl.dev',
  description: 'Listen while you commute. Vote what matters. Articles generated for TTS, trending topics shaped by your votes — directly influencing what sources we dig into.',
}

export default async function NewsPage() {
  const [contentData, allHashtags] = await Promise.all([
    getAllFilteredContent({ contentType: 'news', requireHashtags: ['generated'] }),
    getAllHashtags(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ContentListing
        allItems={contentData.items}
        allHashtags={allHashtags}
        hashtagCounts={contentData.hashtagCounts}
        totalItems={contentData.totalItems}
        title="News"
        description="Listen while you commute. Vote what matters. Articles generated for TTS, trending topics shaped by your votes — directly influencing what sources we dig into."
        contentType="news"
        basePath="/news"
      />
    </div>
  )
}
