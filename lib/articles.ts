

'use server'

import { cache } from 'react'
import path from 'node:path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import yaml from 'js-yaml'

import type { ExternalLink } from '@/lib/types'

// --- Type Definitions ---

export interface Article {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  content: string
  hashtags: string[]
  externalLinks?: ExternalLink[]
}

export type ArticleMetadata = Omit<Article, 'content' | 'externalLinks'>

interface HashtagIndex {
  [hashtag: string]: string[]
}

// --- Caches ---

let allArticlesCache: Article[] | null = null
let slugToArticleMapCache: Map<string, Article> | null = null
let hashtagIndexCache: HashtagIndex | null = null

// --- Constants ---

const articlesDirectory = path.join(process.cwd(), 'articles')
const newsDirectory = path.join(process.cwd(), 'news')
const matterOptions = {
  engines: {
    yaml: (s: string, opts: yaml.LoadOptions) => yaml.load(s, opts),
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
  const linkRegex = /\!\[\?\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
  const links: ExternalLink[] = []
  const matches = content.matchAll(linkRegex)
  for (const match of matches) {
    const [, title, url] = match
    if (title && url && !url.includes('motyl.dev') && !url.includes('newsletter-ai')) {
      links.push({ title: title.trim(), url: url.trim(), order: links.length })
    }
  }
  return links
}

// --- Core Parsing and Caching Logic ---

export async function parseArticleFile(fullPath: string, slugFromFile: string): Promise<Article> {
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents, matterOptions)
  const stats = await fs.stat(fullPath)
  const fallbackDate = stats.mtime || new Date()

  return {
    slug: data.slug || slugFromFile, // Prioritize frontmatter slug
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    publishedAt: normalizePublishedAt(data.publishedAt, fallbackDate),
    content,
    hashtags: parseHashtags(data.hashtags),
    externalLinks: extractExternalLinks(content),
  }
}

async function readArticlesFromDirectory(directory: string): Promise<Article[]> {
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

async function buildArticleCache(): Promise<Map<string, Article>> {
  if (slugToArticleMapCache) return slugToArticleMapCache

  const articlesPromise = readArticlesFromDirectory(articlesDirectory)
  const newsYearDirs = await getNewsYearDirectories()
  const newsPromises = newsYearDirs.map((dir) => readArticlesFromDirectory(dir))

  const [articles, ...newsArticlesByYear] = await Promise.all([articlesPromise, ...newsPromises])
  const allArticles = [...articles, ...newsArticlesByYear.flat()]

  allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  allArticlesCache = allArticles
  slugToArticleMapCache = new Map(allArticles.map((article) => [article.slug, article]))

  return slugToArticleMapCache
}

// --- Public API ---

export async function getAllArticleMetadata(): Promise<ArticleMetadata[]> {
  await buildArticleCache()
  // The type assertion is safe because buildArticleCache ensures allArticlesCache is populated.
  return allArticlesCache as Article[]
}

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const map = await buildArticleCache()
  return map.get(slug) || null
})

export async function getAllArticlesWithContent(): Promise<Article[]> {
  await buildArticleCache()
  return allArticlesCache || []
}

export const getAllArticles = getAllArticleMetadata

async function buildHashtagIndex(): Promise<HashtagIndex> {
  if (hashtagIndexCache) return hashtagIndexCache

  const articles = await getAllArticleMetadata()
  const index: HashtagIndex = {}

  articles.forEach((article) => {
    article.hashtags.forEach((hashtag) => {
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

export async function getArticlesByHashtag(hashtag: string): Promise<Article[]> {
  const index = await buildHashtagIndex()
  const slugs = index[hashtag] || []
  if (slugs.length === 0) return []

  const articles = await Promise.all(slugs.map((slug) => getArticleBySlug(slug)))
  return articles.filter(Boolean) as Article[]
}




