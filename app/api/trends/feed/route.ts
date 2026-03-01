import { NextResponse } from 'next/server'
import { getHomepageFeed } from '@/lib/trends'
import { getAllContentMetadata } from '@/lib/articles'

export async function GET() {
  try {
    const [feed, articles] = await Promise.all([
      getHomepageFeed(),
      getAllContentMetadata(),
    ])

    const latestArticles = articles.slice(0, 5)

    return NextResponse.json(
      {
        currentWeek: feed.currentWeek,
        trendings: feed.trendings,
        articles: latestArticles,
        lastWeekSummary: feed.lastWeekSummary,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to fetch feed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}
