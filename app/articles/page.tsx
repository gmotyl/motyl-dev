import { ContentListing } from '@/components/content-listing'
import { getAllFilteredContent, getAllHashtags } from '@/lib/articles'
import Header from '@/components/header'

export const revalidate = 300 // ISR: 5 min

export const metadata = {
  title: 'Blog - Motyl.dev',
  description: 'Original insights on web architecture and the future of AI-driven development',
}

export default async function ArticlesPage() {
  const [contentData, allHashtags] = await Promise.all([
    getAllFilteredContent({ contentType: 'article', excludeHashtags: ['generated'] }),
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
        title="Blog"
        description="Original insights on web architecture and the future of AI-driven development"
        contentType="article"
        basePath="/articles"
      />
    </div>
  )
}
