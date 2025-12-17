import { ContentListing } from '@/components/content-listing'
import { getContentPageData, PageFilters, getAllHashtags } from '@/lib/articles'
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
  const showUnseen = params.unseen === 'true'

  // Get visited articles from request headers (set in middleware)
  const headersList = await headers()
  const visitedArticlesHeader = headersList.get('x-visited-articles')
  const visitedSlugs = new Set<string>(JSON.parse(visitedArticlesHeader || '[]'))
  const filters: PageFilters = {
    hashtags,
    mode,
    showUnseen,
    excludeHashtags: ['generated'],
  }

  const [pageData, allHashtags] = await Promise.all([
    getContentPageData({ page, filters, visitedSlugs, contentType: 'article' }),
    getAllHashtags(),
  ])

  return (
    <ContentListing
      initialItems={pageData.items}
      totalPages={pageData.totalPages}
      currentPage={pageData.currentPage}
      totalItems={pageData.totalItems}
      allHashtags={allHashtags}
      hashtagCounts={pageData.hashtagCounts}
      title="Articles"
      description="Original articles about web development, architecture, and software craftsmanship"
      contentType='article'
      basePath='/articles'
      excludeHashtags={['generated']}
    />
  )
}
