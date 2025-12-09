import { NextResponse } from 'next/server'
import { getArticleBySlug, getAllArticles } from '@/lib/articles'

// Force static generation at build time - no ISR revalidation
export const dynamic = 'force-static'
export const dynamicParams = false // Return 404 for unknown slugs

// Generate static params for all articles at build time
export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const article = await getArticleBySlug(slug)

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}
