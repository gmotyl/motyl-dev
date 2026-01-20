import { ContentListing } from '@/components/content-listing'
import { getContentPageData, PageFilters, getAllHashtags } from '@/lib/articles'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getUserViewedArticles } from '@/lib/article-views'
import Header from '@/components/header'

export const metadata = {
  title: 'News - Motyl.dev',
  description: 'Latest tech news and insights curated from newsletters',
}

interface NewsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const page = parseInt((params.page as string) || '1', 10)
  const hashtags = params.hashtags ? (params.hashtags as string).split(',') : []
  const mode = params.mode as 'AND' | 'OR' | 'EXCLUDE' | undefined
  const showUnseen = params.unseen === 'true'

  // Get visited articles from cookie (for anonymous users) OR database (for logged-in users)
  const session = await auth()
  let visitedSlugs: Set<string>

  if (session?.user?.id) {
    // Logged in - fetch from database
    const dbSlugs = await getUserViewedArticles()
    visitedSlugs = new Set(dbSlugs)
  } else {
    // Anonymous - read from cookie via middleware header
    const headersList = await headers()
    const visitedArticlesHeader = headersList.get('x-visited-articles')
    visitedSlugs = new Set<string>(JSON.parse(visitedArticlesHeader || '[]'))
  }
  const filters: PageFilters = {
    hashtags,
    mode,
    requireHashtags: ['generated'],
    showUnseen,
  }

  const [pageData, allHashtags] = await Promise.all([
    getContentPageData({ page, filters, visitedSlugs, contentType: 'news' }),
    getAllHashtags(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ContentListing
        initialItems={pageData.items}
        totalPages={pageData.totalPages}
        currentPage={pageData.currentPage}
        totalItems={pageData.totalItems}
        allHashtags={allHashtags}
        hashtagCounts={pageData.hashtagCounts}
        title="News"
        description="Latest tech news and insights curated from newsletters"
        contentType="news"
        basePath="/news"
        requireHashtags={['generated']}
      />
    </div>
  )
}
