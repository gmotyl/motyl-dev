'use server'

import { cache } from 'react'
import path from 'node:path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import yaml from 'js-yaml'

import { type ExternalLink, type Content, ItemType } from './types.ts'

// --- Type Definitions ---

export type ContentItem = Content
export type ContentItemMetadata = Omit<Content, 'content' | 'externalLinks'>

interface HashtagIndex {
  [hashtag: string]: string[]
}

// --- Caches ---

let allContentCache: ContentItem[] | null = null
let slugToContentItemMapCache: Map<string, ContentItem> | null = null
let hashtagIndexCache: HashtagIndex | null = null

// --- Constants ---

const articlesDirectory = path.join(process.cwd(), 'articles')
const newsDirectory = path.join(process.cwd(), 'news')
const matterOptions = {
  engines: {
    yaml: (s: string) => yaml.load(s) as object,
  },
}

// --- Utility Functions ---

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function normalizePublishedAt(rawDate: unknown, fallbackDate: Date): string {
  if (rawDate instanceof Date) {
    const normalized = new Date(rawDate)
    if (!Number.isNaN(normalized.getTime())) return toISODate(normalized)
  }
  if (typeof rawDate === 'string' || typeof rawDate === 'number') {
    const normalized = new Date(rawDate)
    if (!Number.isNaN(normalized.getTime())) return toISODate(normalized)
  }
  return toISODate(fallbackDate)
}

function parseHashtags(hashtagData: any): string[] {
  if (!hashtagData) return []
  if (Array.isArray(hashtagData)) {
    return hashtagData.map((tag) => tag.toString().replace(/^#/, ''))
  }
  if (typeof hashtagData === 'string') {
    return hashtagData
      .split(/\s+/)
      .filter((tag) => tag.startsWith('#'))
      .map((tag) => tag.substring(1))
      .filter((tag) => tag.length > 0)
  }
  return []
}

function extractExternalLinks(content: string): ExternalLink[] {
  const linkRegex = /(?<!\!)\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
  const links: ExternalLink[] = []
  const matches = content.matchAll(linkRegex)
  let order = 0
  for (const match of matches) {
    const [, title, url] = match
    if (title && url && !url.includes('motyl.dev') && !url.includes('newsletter-ai')) {
      links.push({ title: title.trim(), url: url.trim(), order: order++ })
    }
  }
  return links
}

// --- Core Parsing and Caching Logic ---

export async function parseArticleFile(
  fullPath: string,
  slugFromFile: string
): Promise<ContentItem> {
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents, matterOptions)
  const stats = await fs.stat(fullPath)
  const fallbackDate = stats.mtime || new Date()
  const itemType = fullPath.includes(articlesDirectory) ? ItemType.Article : ItemType.News

  return {
    slug: data.slug || slugFromFile, // Prioritize frontmatter slug
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    publishedAt: normalizePublishedAt(data.publishedAt, fallbackDate),
    content,
    hashtags: parseHashtags(data.hashtags),
    externalLinks: extractExternalLinks(content),
    itemType,
  }
}

async function readArticlesFromDirectory(directory: string): Promise<ContentItem[]> {
  try {
    const fileNames = await fs.readdir(directory)
    return await Promise.all(
      fileNames
        .filter((name) => name.endsWith('.md'))
        .map((name) => {
          const slugFromFile = name.replace(/\.md$/, '')
          const fullPath = path.join(directory, name)
          return parseArticleFile(fullPath, slugFromFile)
        })
    )
  } catch (error) {
    console.error(`Error reading articles from ${directory}:`, error)
    return []
  }
}

async function getNewsYearDirectories(): Promise<string[]> {
  try {
    const entries = await fs.readdir(newsDirectory, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name))
      .map((entry) => path.join(newsDirectory, entry.name))
  } catch (error) {
    console.error('Error finding news year directories:', error)
    return []
  }
}

async function buildArticleCache(): Promise<Map<string, ContentItem>> {
  if (slugToContentItemMapCache) return slugToContentItemMapCache

  const articlesPromise = readArticlesFromDirectory(articlesDirectory)
  const newsYearDirs = await getNewsYearDirectories()
  const newsPromises = newsYearDirs.map((dir) => readArticlesFromDirectory(dir))

  const [articles, ...newsArticlesByYear] = await Promise.all([articlesPromise, ...newsPromises])
  const allContent = [...articles, ...newsArticlesByYear.flat()]

  allContent.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  allContentCache = allContent
  slugToContentItemMapCache = new Map(allContent.map((article) => [article.slug, article]))

  return slugToContentItemMapCache
}

// --- Public API ---

export async function getAllContentMetadata(): Promise<ContentItemMetadata[]> {
  await buildArticleCache()
  if (!allContentCache) return []

  return allContentCache.map(({ content, externalLinks, ...metadata }) => metadata)
}

export const getContentItemBySlug = cache(async (slug: string): Promise<ContentItem | null> => {
  const map = await buildArticleCache()
  return map.get(slug) || null
})

export async function getAllContent(): Promise<ContentItem[]> {
  await buildArticleCache()
  return allContentCache || []
}

export const getAllArticles = getAllContentMetadata

async function buildHashtagIndex(): Promise<HashtagIndex> {
  if (hashtagIndexCache) return hashtagIndexCache

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

  hashtagIndexCache = index
  return index
}

export async function getAllHashtags(): Promise<string[]> {
  const index = await buildHashtagIndex()
  return Object.keys(index).sort()
}

export async function getHashtagCounts(): Promise<Record<string, number>> {
  const index = await buildHashtagIndex()
  const counts: Record<string, number> = {}
  Object.entries(index).forEach(([hashtag, slugs]) => {
    counts[hashtag] = slugs.length
  })
  return counts
}

export async function getArticlesByHashtag(hashtag: string): Promise<ContentItem[]> {
  const index = await buildHashtagIndex()
  const slugs = index[hashtag] || []
  if (slugs.length === 0) return []

  const articles = await Promise.all(slugs.map((slug) => getContentItemBySlug(slug)))
  return articles.filter(Boolean) as ContentItem[]
}

// --- New Pagination and Filtering Logic ---

export interface PageFilters {
  hashtags?: string[]
  mode?: 'AND' | 'OR' | 'EXCLUDE'
  showUnseen?: boolean
  requireHashtags?: string[]
  excludeHashtags?: string[]
}

export interface PaginatedContent {
  items: ContentItemMetadata[]
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
}: {
  page?: number
  limit?: number
  filters?: PageFilters
  visitedSlugs?: Set<string>
  contentType?: ItemType | 'all'
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
  const paginatedArticles = filtered.slice(startIndex, startIndex + limit)

  return {
    items: paginatedArticles,
    currentPage: page,
    totalPages,
    totalItems,
    hashtagCounts,
  }
}
