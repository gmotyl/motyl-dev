import path from "path"
import fs from "fs"
import matter from "gray-matter"

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

const articlesDirectory = path.join(process.cwd(), "articles")
let hashtagIndexCache: HashtagIndex | null = null

// Generate hashtag index at build time
function buildHashtagIndex(): HashtagIndex {
  if (hashtagIndexCache) return hashtagIndexCache

  const articles = getAllArticles()
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

export function getAllArticles(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory)
  const articles = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const slug = name.replace(/\.mdx$/, "")
      const fullPath = path.join(articlesDirectory, name)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        publishedAt: data.publishedAt,
        content,
        hashtags: data.hashtags || [],
      }
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return articles
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt,
      content,
      hashtags: data.hashtags || [],
    }
  } catch (error) {
    return null
  }
}

export function getAllHashtags(): string[] {
  const index = buildHashtagIndex()
  return Object.keys(index).sort()
}

export function getArticlesByHashtag(hashtag: string): Article[] {
  const index = buildHashtagIndex()
  const slugs = index[hashtag] || []

  if (slugs.length === 0) return []

  // Get full article data for the matching slugs
  return slugs.map((slug) => getArticleBySlug(slug)).filter(Boolean) as Article[]
}

// Pre-build the index during module initialization
buildHashtagIndex()
