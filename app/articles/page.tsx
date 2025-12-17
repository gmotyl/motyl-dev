import { ArticlesListing } from '@/components/articles-listing'
import { getArticlePageData, PageFilters, getAllHashtags, getHashtagCounts } from '@/lib/articles'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Articles - Motyl.dev',
  description: 'Original articles about web development, architecture, and software craftsmanship',
}

interface ArticlesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams
  const page = parseInt((params.page as string) || '1', 10)
  const hashtags = params.hashtags ? (params.hashtags as string).split(',') : []
  const mode = params.mode as 'AND' | 'OR' | 'EXCLUDE' | undefined

  // Get visited articles from request headers (set in middleware)
  const headersList = await headers()
  const visitedArticlesHeader = headersList.get('x-visited-articles')
  const visitedSlugs = new Set<string>(JSON.parse(visitedArticlesHeader || '[]'))
  const filters: PageFilters = {
    hashtags,
    mode,
    excludeHashtags: ['generated'],
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
      title="Articles"
      description="Original articles about web development, architecture, and software craftsmanship"
      filterConfig={{
        excludeHashtags: ['generated'],
      }}
    />
  )
}
