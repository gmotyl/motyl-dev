import { NextResponse } from 'next/server'
import { getAllArticles, getAllHashtags, getHashtagCounts } from '@/lib/articles'

// Force static generation at build time - no ISR revalidation
// This endpoint returns all articles, filtering is done client-side
export const dynamic = 'force-static'

export async function GET() {
  try {
    const articles = await getAllArticles()
    const hashtags = await getAllHashtags()
    const hashtagCounts = await getHashtagCounts()
    return NextResponse.json({ articles, hashtags, hashtagCounts })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
