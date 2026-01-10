/**
 * Build script to generate content cache at build time.
 * This ensures all serverless instances have consistent article data.
 *
 * Run with: tsx scripts/build-content-cache.ts
 */

import path from 'node:path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import yaml from 'js-yaml'

// --- Types (duplicated from lib/types.ts to avoid import issues) ---

const ItemType = {
  Article: 'article',
  News: 'news',
} as const

type ItemTypeValue = (typeof ItemType)[keyof typeof ItemType]

interface ExternalLink {
  url: string
  title: string
  order: number
}

interface ContentItem {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  hashtags: string[]
  itemType: ItemTypeValue
  content: string
  externalLinks: ExternalLink[]
}

interface ContentCache {
  generatedAt: string
  totalItems: number
  items: ContentItem[]
}

// --- Constants ---

const ROOT_DIR = process.cwd()
const articlesDirectory = path.join(ROOT_DIR, 'articles')
const newsDirectory = path.join(ROOT_DIR, 'news')
const outputPath = path.join(ROOT_DIR, 'data', 'content-cache.json')

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

function parseHashtags(hashtagData: unknown): string[] {
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

// Check for newsletter CTA in content
const CTA_PATTERN = /#newsletter-cta(?:\(\s*'(?:\\'|[^'])*'\s*,\s*'(?:\\'|[^'])*'\s*\))?/g

function hasNewsletterCTA(content: string): boolean {
  CTA_PATTERN.lastIndex = 0
  return CTA_PATTERN.test(content)
}

// --- Parsing Functions ---

async function parseArticleFile(
  fullPath: string,
  slugFromFile: string,
  itemType: ItemTypeValue
): Promise<ContentItem> {
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents, matterOptions)
  const stats = await fs.stat(fullPath)
  const fallbackDate = stats.mtime || new Date()

  // Parse frontmatter hashtags and add newsletter-cta if found inline
  const hashtags = parseHashtags(data.hashtags)
  if (hasNewsletterCTA(content) && !hashtags.includes('newsletter-cta')) {
    hashtags.push('newsletter-cta')
  }

  return {
    slug: data.slug || slugFromFile,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    publishedAt: normalizePublishedAt(data.publishedAt, fallbackDate),
    content,
    hashtags,
    externalLinks: extractExternalLinks(content),
    itemType,
  }
}

async function readArticlesFromDirectory(
  directory: string,
  itemType: ItemTypeValue
): Promise<ContentItem[]> {
  try {
    const fileNames = await fs.readdir(directory)
    const articles = await Promise.all(
      fileNames
        .filter((name) => name.endsWith('.md'))
        .map((name) => {
          const slugFromFile = name.replace(/\.md$/, '')
          const fullPath = path.join(directory, name)
          return parseArticleFile(fullPath, slugFromFile, itemType)
        })
    )
    return articles
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

// --- Main Build Function ---

async function buildContentCache(): Promise<void> {
  console.log('Building content cache...')

  // Read articles
  const articles = await readArticlesFromDirectory(articlesDirectory, ItemType.Article)
  console.log(`  Found ${articles.length} articles`)

  // Read news from year directories
  const newsYearDirs = await getNewsYearDirectories()
  const newsPromises = newsYearDirs.map((dir) => readArticlesFromDirectory(dir, ItemType.News))
  const newsArticlesByYear = await Promise.all(newsPromises)
  const news = newsArticlesByYear.flat()
  console.log(`  Found ${news.length} news items across ${newsYearDirs.length} year directories`)

  // Combine and sort
  const allContent = [...articles, ...news]
  allContent.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  // Create cache object
  const cache: ContentCache = {
    generatedAt: new Date().toISOString(),
    totalItems: allContent.length,
    items: allContent,
  }

  // Ensure data directory exists
  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  // Write cache file
  await fs.writeFile(outputPath, JSON.stringify(cache, null, 2), 'utf8')

  console.log(`\nContent cache built successfully!`)
  console.log(`  Total items: ${cache.totalItems}`)
  console.log(`  Output: ${outputPath}`)
  console.log(`  Generated at: ${cache.generatedAt}`)
}

// Run the build
buildContentCache().catch((error) => {
  console.error('Failed to build content cache:', error)
  process.exit(1)
})
