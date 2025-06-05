'use server'

import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'

export interface Article {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  content: string
  hashtags: string[]
}

// Build-time hashtag index
interface HashtagIndex {
  [hashtag: string]: string[] // Maps hashtag -> array of article slugs
}

const articlesDirectory = path.join(process.cwd(), 'articles')
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

export async function getAllArticles(): Promise<Article[]> {
  const fileNames = await fs.readdir(articlesDirectory)
  const articles = await Promise.all(
    fileNames
      .filter((name) => name.endsWith('.md'))
      .map(async (name) => {
        const slug = name.replace(/\.md$/, '')
        const fullPath = path.join(articlesDirectory, name)
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

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
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
  } catch (error) {
    return null
  }
}

export async function getAllHashtags(): Promise<string[]> {
  const index = await buildHashtagIndex()
  return Object.keys(index).sort()
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
