'use server'

import { getContentPageData, type PageFilters } from '@/lib/articles'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

interface FilterState {
  page?: number
  hashtags?: string[]
  mode?: 'AND' | 'OR' | 'EXCLUDE'
  showUnseen?: boolean
  contentType: 'article' | 'news' | 'all'
  requireHashtags?: string[]
  excludeHashtags?: string[]
}

export async function getFilteredContent(filterState: FilterState) {
  const {
    page = 1,
    hashtags = [],
    mode,
    showUnseen = false,
    contentType,
    requireHashtags,
    excludeHashtags,
  } = filterState

  // Fetch session once; used for both news rejection and 'all'→'article' downgrade.
  const session = await auth()
  const isSuperAdmin = !!session?.user?.isSuperAdmin

  // News is SuperAdmin-only; reject any non-SuperAdmin request for news content.
  if (contentType === 'news' && !isSuperAdmin) {
    throw new Error('Forbidden')
  }

  // Non-SuperAdmins requesting 'all' would receive news mixed in; downgrade to
  // articles-only so pagination counts remain accurate and news never leaks.
  const effectiveContentType = !isSuperAdmin && contentType === 'all' ? 'article' : contentType

  const headersList = await headers()
  const visitedArticlesHeader = headersList.get('x-visited-articles')
  const visitedSlugs = new Set<string>(JSON.parse(visitedArticlesHeader || '[]'))

  const filters: PageFilters = {
    hashtags,
    mode,
    showUnseen,
    requireHashtags,
    excludeHashtags,
  }

  const pageData = await getContentPageData({
    page,
    filters,
    visitedSlugs,
    contentType: effectiveContentType,
  })

  return pageData
}
