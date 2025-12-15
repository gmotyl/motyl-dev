

'use server'

import { cache } from 'react'
import path from 'node:path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import yaml from 'js-yaml'

import type { ExternalLink } from '@/lib/types'

// Full Article type including content
export interface Article {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  content: string
  hashtags: string[]
  externalLinks?: ExternalLink[]
}

// Lightweight Article Metadata type
export type ArticleMetadata = Omit<Article, 'content' | 'externalLinks'>

// Build-time hashtag index
interface HashtagIndex {
  [hashtag: string]: string[] // Maps hashtag -> array of article slugs
}

const articlesDirectory = path.join(process.cwd(), 'articles')
const newsDirectory = path.join(process.cwd(), 'news')
let hashtagIndexCache: HashtagIndex | null = null
let allArticleMetadataCache: ArticleMetadata[] | null = null

const matterOptions = {
  engines: {
    yaml: (s: string, opts: yaml.LoadOptions) => yaml.load(s, opts),
  },
}

function toISODate(date: Date) {
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
  const linkRegex = /\!\?\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g
  const links: ExternalLink[] = []
  const matches = content.matchAll(linkRegex)

  for (const match of matches) {
    const [, title, url] = match
    if (title && url && !url.includes('motyl.dev') && !url.includes('newsletter-ai')) {
      links.push({
        title: title.trim(),
        url: url.trim(),
        order: links.length,
      })
    }
  }

  return links
}

// Parses only the frontmatter for metadata
export async function parseArticleMetadataFile(
  fullPath: string,
  slug: string
): Promise<ArticleMetadata> {
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data } = matter(fileContents, matterOptions)
  const stats = await fs.stat(fullPath)
  const fallbackDate = stats.mtime || new Date()

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    publishedAt: normalizePublishedAt(data.publishedAt, fallbackDate),
    hashtags: parseHashtags(data.hashtags),
  }
}

// Parses the full article including content
export async function parseArticleFile(fullPath: string, slug: string): Promise<Article> {
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents, matterOptions)
  const stats = await fs.stat(fullPath)
  const fallbackDate = stats.mtime || new Date()

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    publishedAt: normalizePublishedAt(data.publishedAt, fallbackDate),
    content,
    hashtags: parseHashtags(data.hashtags),
    externalLinks: extractExternalLinks(content),
  }
}

async function readArticleMetadataFromDirectory(directory: string): Promise<ArticleMetadata[]> {
  try {
    const fileNames = await fs.readdir(directory)
    const articles = await Promise.all(
      fileNames
        .filter((name) => name.endsWith('.md'))
        .map(async (name) => {
          const slug = name.replace(/\.md$/, '')
          const fullPath = path.join(directory, name)
          return parseArticleMetadataFile(fullPath, slug)
        })
    )
    return articles
  } catch (error) {
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
    return []
  }
}

// Returns metadata for all articles, sorted by date
export async function getAllArticleMetadata(): Promise<ArticleMetadata[]> {
  if (allArticleMetadataCache) return allArticleMetadataCache

  const articlesPromise = readArticleMetadataFromDirectory(articlesDirectory)
  const newsYearDirs = await getNewsYearDirectories()
  const newsPromises = newsYearDirs.map((dir) => readArticleMetadataFromDirectory(dir))

  const [articles, ...newsArticles] = await Promise.all([articlesPromise, ...newsPromises])
  const allMetadata = [...articles, ...newsArticles.flat()]

  allArticleMetadataCache = allMetadata.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime()
    const dateB = new Date(b.publishedAt).getTime()
    return dateB - dateA
  })

  return allArticleMetadataCache
}

async function findArticleInDirectory(slug: string, directory: string): Promise<Article | null> {
  try {
    const fullPath = path.join(directory, `${slug}.md`)
    await fs.access(fullPath)
    return await parseArticleFile(fullPath, slug)
  } catch (error) {
    return null
  }
}

export const getArticleBySlug = cache(
  async (slug: string): Promise<Article | null> => {
    // Try articles directory first
    let article = await findArticleInDirectory(slug, articlesDirectory)
    if (article) return article

    // Try news year subdirectories
    const newsYearDirs = await getNewsYearDirectories()
    for (const dir of newsYearDirs) {
      article = await findArticleInDirectory(slug, dir)
      if (article) return article
    }

    return null
  }
)



async function readArticlesFromDirectory(directory: string): Promise<Article[]> {

  try {

    const fileNames = await fs.readdir(directory)

    const articles = await Promise.all(

      fileNames

        .filter((name) => name.endsWith('.md'))

        .map(async (name) => {

          const slug = name.replace(/\.md$/, '')

          const fullPath = path.join(directory, name)

          return parseArticleFile(fullPath, slug)

        })

    )

    return articles

  } catch (error) {

    return []

  }

}



export async function getAllArticlesWithContent(): Promise<Article[]> {

  const articlesPromise = readArticlesFromDirectory(articlesDirectory)

  const newsYearDirs = await getNewsYearDirectories()

  const newsPromises = newsYearDirs.map((dir) => readArticlesFromDirectory(dir))



  const [articles, ...newsArticles] = await Promise.all([

    articlesPromise,

    ...newsPromises,

  ])

  const allArticles = [...articles, ...newsArticles.flat()]



  return allArticles.sort((a, b) => {

    const dateA = new Date(a.publishedAt).getTime()

    const dateB = new Date(b.publishedAt).getTime()

    return dateB - dateA

  })

}



export const getAllArticles = getAllArticleMetadata



async function buildHashtagIndex(): Promise<HashtagIndex> {

  if (hashtagIndexCache) return hashtagIndexCache



  const articles = await getAllArticleMetadata() // Use metadata to build index

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



// Pre-build the index during module initialization

buildHashtagIndex()


