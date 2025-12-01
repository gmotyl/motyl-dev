'use server'

import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'

export interface ExternalLink {
  url: string
  title: string
  order: number
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  content: string
  hashtags: string[]
  externalLinks?: ExternalLink[]
}

// Build-time hashtag index
interface HashtagIndex {
  [hashtag: string]: string[] // Maps hashtag -> array of article slugs
}

const articlesDirectory = path.join(process.cwd(), 'articles')
const newsDirectory = path.join(process.cwd(), 'news')
let hashtagIndexCache: HashtagIndex | null = null

// Parse hashtags from metadata (supports both array and #hashtag format)
function parseHashtags(hashtagData: any): string[] {
  if (!hashtagData) return []

  if (Array.isArray(hashtagData)) {
    // Handle array format: ["react", "nextjs"] or ["#react", "#nextjs"]
    return hashtagData.map((tag) => tag.toString().replace(/^#/, ''))
  }

  if (typeof hashtagData === 'string') {
    // Handle string format: "#react #nextjs #tutorial"
    return hashtagData
      .split(/\s+/)
      .filter((tag) => tag.startsWith('#'))
      .map((tag) => tag.substring(1))
      .filter((tag) => tag.length > 0)
  }

  return []
}

// Extract external links from markdown content (internal helper)
function extractExternalLinks(content: string): ExternalLink[] {
  // Regex to match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g
  const links: ExternalLink[] = []
  let match
  let order = 0

  while ((match = linkRegex.exec(content)) !== null) {
    const [, title, url] = match
    // Exclude motyl.dev and newsletter-ai links (internal projects)
    if (!url.includes('motyl.dev') && !url.includes('newsletter-ai')) {
      links.push({
        title: title.trim(),
        url: url.trim(),
        order: order++,
      })
    }
  }

  return links
}

// Generate hashtag index at build time
async function buildHashtagIndex(): Promise<HashtagIndex> {
  if (hashtagIndexCache) return hashtagIndexCache

  const articles = await getAllArticles()
  const index: HashtagIndex = {}

  articles.forEach((article) => {
    const hashtags = article.hashtags || []
    hashtags.forEach((hashtag) => {
      if (!index[hashtag]) {
        index[hashtag] = []
      }
      index[hashtag].push(article.slug)
    })
  })

  hashtagIndexCache = index
  return index
}

// Helper to read articles from a single directory
async function readArticlesFromDirectory(directory: string): Promise<Article[]> {
  try {
    const fileNames = await fs.readdir(directory)
    const articles = await Promise.all(
      fileNames
        .filter((name) => name.endsWith('.md'))
        .map(async (name) => {
          const slug = name.replace(/\.md$/, '')
          const fullPath = path.join(directory, name)
          const fileContents = await fs.readFile(fullPath, 'utf8')
          const { data, content } = matter(fileContents)

          return {
            slug,
            title: data.title,
            excerpt: data.excerpt,
            publishedAt: data.publishedAt,
            content,
            hashtags: parseHashtags(data.hashtags),
          }
        })
    )
    return articles
  } catch (error) {
    return []
  }
}

// Helper to get all year subdirectories from news folder
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

export async function getAllArticles(): Promise<Article[]> {
  // Read from articles directory
  const articlesPromise = readArticlesFromDirectory(articlesDirectory)

  // Read from all news year subdirectories
  const newsYearDirs = await getNewsYearDirectories()
  const newsPromises = newsYearDirs.map((dir) => readArticlesFromDirectory(dir))

  const [articles, ...newsArticles] = await Promise.all([articlesPromise, ...newsPromises])

  const allArticles = [...articles, ...newsArticles.flat()]

  return allArticles.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return dateB - dateA
  })
}

// Helper to find and read an article from any directory
async function findArticleInDirectory(slug: string, directory: string): Promise<Article | null> {
  try {
    const fullPath = path.join(directory, `${slug}.md`)
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt,
      content,
      hashtags: parseHashtags(data.hashtags),
      externalLinks: extractExternalLinks(content),
    }
  } catch (error) {
    return null
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
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

  // Get full article data for the matching slugs
  const articles = await Promise.all(slugs.map((slug) => getArticleBySlug(slug)))
  return articles.filter(Boolean) as Article[]
}

// Pre-build the index during module initialization
buildHashtagIndex()
