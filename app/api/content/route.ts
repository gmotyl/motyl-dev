import { NextRequest, NextResponse } from 'next/server'
import { getContentPageData } from '@/lib/articles'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { getUserViewedArticles } from '@/lib/article-views'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const contentType = searchParams.get('contentType') as 'article' | 'news' | 'all' || 'all'
  const requireHashtags = searchParams.get('requireHashtags')?.split(',').filter(Boolean) || undefined
  const excludeHashtags = searchParams.get('excludeHashtags')?.split(',').filter(Boolean) || undefined
  const showUnseen = searchParams.get('unseen') === 'true'
  const excludeSlugs = searchParams.get('excludeSlugs')?.split(',').filter(Boolean) || []
  const hashtags = searchParams.get('hashtags')?.split(',').filter(Boolean) || []
  const mode = searchParams.get('mode') as 'AND' | 'OR' | 'EXCLUDE' || 'AND'
  const includeContent = searchParams.get('includeContent') === 'true'

  // Fetch session once; used for news rejection, 'all'→'article' downgrade, and
  // unseen filtering. Avoids duplicate auth() calls.
  const session = await auth()
  const isSuperAdmin = !!session?.user?.isSuperAdmin

  if (contentType === 'news' && !isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Non-SuperAdmins requesting 'all' would receive news mixed in; downgrade to
  // articles-only so pagination counts remain accurate and news never leaks.
  const effectiveContentType = !isSuperAdmin && contentType === 'all' ? 'article' : contentType

  let visitedSlugs = new Set<string>()

  if (showUnseen) {
    // Use DB for logged-in users so unseen filtering is consistent across devices
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
      }
    }
  }

  // Caller can ask the server to skip specific slugs even if they aren't yet
  // marked as visited. Used by infinite scrollers to keep pagination stable
  // when the visited set is mutating mid-session.
  for (const slug of excludeSlugs) visitedSlugs.add(slug)

  const pageData = await getContentPageData({
    page,
    limit,
    filters: {
      hashtags,
      mode,
      showUnseen,
      requireHashtags,
      excludeHashtags,
    },
    visitedSlugs,
    contentType: effectiveContentType,
    includeContent,
  })

  return NextResponse.json({
    items: pageData.items,
    totalItems: pageData.totalItems,
    totalPages: pageData.totalPages,
    currentPage: pageData.currentPage,
  })
}
