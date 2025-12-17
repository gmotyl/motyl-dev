'use server'

import { getContentPageData, type PageFilters } from '@/lib/articles'
import { headers } from 'next/headers'

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
    contentType,
  })

  return pageData
}
