import { getContentPageData, ContentItem } from '@/lib/articles'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getUserViewedArticles } from '@/lib/article-views'
import ReadAllNewsPageClient from './page.client'

export const metadata = {
  title: 'Read All News - Motyl.dev',
  description: 'Browse through all unvisited news articles',
}

export default async function ReadAllNewsPage() {
  const session = await auth()
  let visitedSlugs: Set<string>

  if (session?.user?.id) {
    const dbSlugs = await getUserViewedArticles()
    visitedSlugs = new Set(dbSlugs)
  } else {
    const headersList = await headers()
    const visitedArticlesHeader = headersList.get('x-visited-articles')
    try {
      visitedSlugs = new Set<string>(JSON.parse(visitedArticlesHeader || '[]'))
    } catch (e) {
      console.error('Failed to parse visited articles header:', e)
      visitedSlugs = new Set<string>()
    }
  }

  const pageData = await getContentPageData({
    page: 1,
    limit: 5,
    filters: {
      showUnseen: true,
      requireHashtags: ['generated'],
    },
    visitedSlugs,
    contentType: 'news',
    includeContent: true,
  })

  return (
    <ReadAllNewsPageClient
      initialItems={pageData.items as ContentItem[]}
      totalItems={pageData.totalItems}
    />
  )
}
