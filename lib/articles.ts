'use server'

import { cache } from 'react'
import { type ExternalLink, type Content, ItemType } from './types.ts'

// --- Type Definitions ---

export type ContentItem = Content
export type ContentItemMetadata = Omit<Content, 'content' | 'externalLinks'>
export type SectionType = 'tldr' | 'summary' | 'keyTakeaways' | 'tradeoffs'

interface HashtagIndex {
  [hashtag: string]: string[]
}

interface ContentCache {
  generatedAt: string
  totalItems: number
  items: ContentItem[]
}

// --- Cache Loading ---

// Load the pre-built content cache (generated at build time by scripts/build-content-cache.ts)
// This is imported as a module, so it's consistent across all serverless instances
async function loadContentCache(): Promise<ContentItem[]> {
  try {
    // Dynamic import to load the JSON cache
    const cacheModule = await import('../data/content-cache.json', {
      with: { type: 'json' }
    })
    const cache = cacheModule.default as ContentCache
    return cache.items
  } catch (error) {
    console.error('Failed to load content cache:', error)
    console.error('Make sure to run "pnpm prebuild" or "pnpm build" first')
    throw new Error('Failed to load content cache. Run "pnpm prebuild" to generate it.')
  }
}

// Request-scoped cache using React's cache() function
const getCachedContent = cache(async (): Promise<ContentItem[]> => {
  return loadContentCache()
})

const getCachedContentMap = cache(async (): Promise<Map<string, ContentItem>> => {
  const items = await getCachedContent()
  return new Map(items.map((item) => [item.slug, item]))
})

// --- Public API ---

export async function getAllContentMetadata(): Promise<ContentItemMetadata[]> {
  const items = await getCachedContent()
  return items.map(({ content, externalLinks, ...metadata }) => metadata)
}

export const getContentItemBySlug = cache(async (slug: string): Promise<ContentItem | null> => {
  const map = await getCachedContentMap()
  return map.get(slug) || null
})

export async function getAllContent(): Promise<ContentItem[]> {
  return getCachedContent()
}

export const getAllArticles = getAllContentMetadata

// --- Hashtag Functions ---

const getCachedHashtagIndex = cache(async (): Promise<HashtagIndex> => {
  const articles = await getAllContentMetadata()
  const index: HashtagIndex = {}

  articles.forEach((article) => {
    article.hashtags.forEach((hashtag: string) => {
      if (!index[hashtag]) {
        index[hashtag] = []
      }
      index[hashtag].push(article.slug)
    })
  })

  return index
})

export async function getAllHashtags(): Promise<string[]> {
  const index = await getCachedHashtagIndex()
  return Object.keys(index).sort()
}

export async function getHashtagCounts(): Promise<Record<string, number>> {
  const index = await getCachedHashtagIndex()
  const counts: Record<string, number> = {}
  Object.entries(index).forEach(([hashtag, slugs]) => {
    counts[hashtag] = slugs.length
  })
  return counts
}

export async function getArticlesByHashtag(hashtag: string): Promise<ContentItem[]> {
  const index = await getCachedHashtagIndex()
  const slugs = index[hashtag] || []
  if (slugs.length === 0) return []

  const articles = await Promise.all(slugs.map((slug) => getContentItemBySlug(slug)))
  return articles.filter(Boolean) as ContentItem[]
}

// --- Pagination and Filtering Logic ---

export interface PageFilters {
  hashtags?: string[]
  mode?: 'AND' | 'OR' | 'EXCLUDE'
  showUnseen?: boolean
  requireHashtags?: string[]
  excludeHashtags?: string[]
}

export interface PaginatedContent {
  items: (ContentItemMetadata | ContentItem)[]
  currentPage: number
  totalPages: number
  totalItems: number
  hashtagCounts: Record<string, number>
}

function getHashtagCountsFromArticles(articles: ContentItemMetadata[]): Record<string, number> {
  const counts: Record<string, number> = {}
  articles.forEach((article) => {
    article.hashtags.forEach((hashtag: string) => {
      counts[hashtag] = (counts[hashtag] || 0) + 1
    })
  })
  return counts
}

export async function applyBaseFilters(
  articles: ContentItemMetadata[],
  {
    excludeHashtags = [],
    requireHashtags = [],
  }: { excludeHashtags?: string[]; requireHashtags?: string[] }
) {
  let result = articles

  if (requireHashtags.length > 0) {
    result = result.filter((article) =>
      requireHashtags.every((tag) => article.hashtags.includes(tag))
    )
  }

  if (excludeHashtags.length > 0) {
    result = result.filter(
      (article) => !excludeHashtags.some((tag) => article.hashtags.includes(tag))
    )
  }
  return result
}

export async function getContentPageData({
  page = 1,
  limit = 20,
  filters = {},
  visitedSlugs = new Set(),
  contentType = 'all',
  includeContent = false,
}: {
  page?: number
  limit?: number
  filters?: PageFilters
  visitedSlugs?: Set<string>
  contentType?: ItemType | 'all'
  includeContent?: boolean
}): Promise<PaginatedContent> {
  const allArticles = await getAllContentMetadata()

  let content = allArticles
  if (contentType !== 'all') {
    content = allArticles.filter((item) => item.itemType === contentType)
  }

  let filtered = await applyBaseFilters(content, {
    requireHashtags: filters.requireHashtags,
    excludeHashtags: filters.excludeHashtags,
  })

  if (filters.showUnseen) {
    filtered = filtered.filter((article) => !visitedSlugs.has(article.slug))
  }

  if (filters.hashtags && filters.hashtags.length > 0) {
    const mode = filters.mode || 'AND'
    const filterTags = filters.hashtags

    if (mode === 'AND') {
      filtered = filtered.filter((article) =>
        filterTags.every((tag) => article.hashtags.includes(tag))
      )
    } else if (mode === 'OR') {
      filtered = filtered.filter((article) =>
        filterTags.some((tag) => article.hashtags.includes(tag))
      )
    } else {
      // EXCLUDE
      filtered = filtered.filter(
        (article) => !filterTags.some((tag) => article.hashtags.includes(tag))
      )
    }
  }

  const hashtagCounts = getHashtagCountsFromArticles(filtered)
  const totalItems = filtered.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const paginatedSlice = filtered.slice(startIndex, startIndex + limit)

  let paginatedArticles: (ContentItemMetadata | ContentItem)[]
  if (includeContent) {
    const contentMap = await getCachedContentMap()
    paginatedArticles = paginatedSlice.map(meta => {
      const full = contentMap.get(meta.slug)
      return full || meta
    })
  } else {
    paginatedArticles = paginatedSlice
  }

  return {
    items: paginatedArticles,
    currentPage: page,
    totalPages,
    totalItems,
    hashtagCounts,
  }
}
