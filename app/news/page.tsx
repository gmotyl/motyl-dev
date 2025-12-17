import { ArticlesListing } from '@/components/articles-listing'
import { getArticlePageData, PageFilters, getAllHashtags, getHashtagCounts } from '@/lib/articles'
import { headers } from 'next/headers'

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

  // Get visited articles from request headers (set in middleware)
  const headersList = await headers()
  const visitedArticlesHeader = headersList.get('x-visited-articles')
  const visitedSlugs = new Set<string>(JSON.parse(visitedArticlesHeader || '[]'))
  const filters: PageFilters = {
    hashtags,
    mode,
    requireHashtags: ['generated'],
    showUnseen,
  }

  const [pageData, allHashtags, hashtagCounts] = await Promise.all([
    getArticlePageData({ page, filters, visitedSlugs }),
    getAllHashtags(),
    getHashtagCounts(),
  ])

  return (
    <ArticlesListing
      initialArticles={pageData.articles}
      totalPages={pageData.totalPages}
      currentPage={pageData.currentPage}
      totalArticles={pageData.totalArticles}
      allHashtags={allHashtags}
      hashtagCounts={hashtagCounts}
      title="News"
      description="Latest tech news and insights curated from newsletters"
      filterConfig={{
        requireHashtags: ['generated'],
        defaultFilters: { showUnseen: true },
      }}
    />
  )
}
