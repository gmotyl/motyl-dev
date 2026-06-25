import { NextResponse } from 'next/server'
import { getContentItemBySlug, getAllContentMetadata } from '@/lib/articles'
import { ItemType } from '@/lib/types'

// Force static generation at build time - no ISR revalidation
export const dynamic = 'force-static'
export const dynamicParams = false // Return 404 for unknown slugs

// Generate static params for non-news articles only. News is SuperAdmin-gated
// and must not be pre-rendered as public static JSON. With dynamicParams=false,
// any news slug returns 404 at runtime for all visitors.
export async function generateStaticParams() {
  const articles = await getAllContentMetadata()
  return articles
    .filter((article) => article.itemType !== ItemType.News)
    .map((article) => ({
      slug: article.slug,
    }))
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const article = await getContentItemBySlug(slug)

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}
