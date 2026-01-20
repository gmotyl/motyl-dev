import { ContentListing } from '@/components/content-listing'
import { getContentPageData, PageFilters, getAllHashtags } from '@/lib/articles'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getUserViewedArticles } from '@/lib/article-views'
import Header from '@/components/header'

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
    showUnseen,
    excludeHashtags: ['generated'],
  }

  const [pageData, allHashtags] = await Promise.all([
    getContentPageData({ page, filters, visitedSlugs, contentType: 'article' }),
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
        title="Articles"
        description="Original articles about web development, architecture, and software craftsmanship"
        contentType="article"
        basePath="/articles"
        excludeHashtags={['generated']}
      />
    </div>
  )
}
