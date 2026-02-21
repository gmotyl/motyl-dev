import { NextRequest, NextResponse } from 'next/server'
import { getContentPageData } from '@/lib/articles'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1', 10)
  const contentType = searchParams.get('contentType') as 'article' | 'news' | 'all' || 'all'
  const requireHashtags = searchParams.get('requireHashtags')?.split(',').filter(Boolean) || undefined
  const excludeHashtags = searchParams.get('excludeHashtags')?.split(',').filter(Boolean) || undefined
  const showUnseen = searchParams.get('unseen') === 'true'
  const hashtags = searchParams.get('hashtags')?.split(',').filter(Boolean) || []
  const mode = searchParams.get('mode') as 'AND' | 'OR' | 'EXCLUDE' || 'AND'
  const includeContent = searchParams.get('includeContent') === 'true'

  // Get visited articles from cookie header
  const headersList = await headers()
  const visitedArticlesHeader = headersList.get('x-visited-articles')
  let visitedSlugs = new Set<string>()
  try {
    visitedSlugs = new Set<string>(JSON.parse(visitedArticlesHeader || '[]'))
  } catch (e) {
    console.error('Failed to parse visited articles header:', e)
  }

  const pageData = await getContentPageData({
    page,
    filters: {
      hashtags,
      mode,
      showUnseen,
      requireHashtags,
      excludeHashtags,
    },
    visitedSlugs,
    contentType,
    includeContent,
  })

  return NextResponse.json({
    items: pageData.items,
    totalItems: pageData.totalItems,
    totalPages: pageData.totalPages,
    currentPage: pageData.currentPage,
  })
}
