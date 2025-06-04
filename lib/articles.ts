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

const articlesDirectory = path.join(process.cwd(), "articles")

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
  const articles = getAllArticles()
  const allHashtags = articles.flatMap((article) => article.hashtags)
  return [...new Set(allHashtags)].sort()
}
