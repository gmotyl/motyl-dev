// This is a mock database for demonstration purposes
// In a real application, you would use a real database like Prisma with PostgreSQL

// Use localStorage for persistence in the browser environment
const getStoredArticles = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("articles")
    return stored ? JSON.parse(stored) : []
  }
  return []
}

const saveArticles = (articles) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("articles", JSON.stringify(articles))
  }
}

type Article = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  createdAt: string
  updatedAt: string
}

type User = {
  id: string
  username: string
  password: string // In a real app, this would be hashed
}

// Mock data
let articles: Article[] = getStoredArticles()
const users: User[] = [
  {
    id: "1",
    username: "admin",
    password: "admin123", // In a real app, this would be hashed
  },
]

// Mock database functions
export const db = {
  article: {
    create: async (data: { title: string; content: string; excerpt: string; slug: string }) => {
      const newArticle: Article = {
        id: Math.random().toString(36).substring(2, 9),
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      articles.push(newArticle)
      saveArticles(articles)
      return newArticle
    },
    findMany: async ({ take }: { take?: number } = {}) => {
      articles = getStoredArticles()
      if (take) {
        return articles.slice(0, take)
      }
      return articles
    },
    findUnique: async ({ where }: { where: { slug?: string; id?: string } }) => {
      articles = getStoredArticles()
      if (where.slug) {
        return articles.find((article) => article.slug === where.slug) || null
      }
      if (where.id) {
        return articles.find((article) => article.id === where.id) || null
      }
      return null
    },
    delete: async ({ where }: { where: { id: string } }) => {
      articles = getStoredArticles()
      const index = articles.findIndex((article) => article.id === where.id)
      if (index !== -1) {
        const deleted = articles[index]
        articles.splice(index, 1)
        saveArticles(articles)
        return deleted
      }
      return null
    },
    update: async ({ where, data }: { where: { id: string }; data: Partial<Article> }) => {
      articles = getStoredArticles()
      const index = articles.findIndex((article) => article.id === where.id)
      if (index !== -1) {
        articles[index] = {
          ...articles[index],
          ...data,
          updatedAt: new Date().toISOString(),
        }
        saveArticles(articles)
        return articles[index]
      }
      return null
    },
  },
  user: {
    findUnique: async ({ where }: { where: { username: string } }) => {
      return users.find((user) => user.username === where.username) || null
    },
  },
}

// Helper function to generate a slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
