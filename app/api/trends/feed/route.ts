import { NextResponse } from 'next/server'
import { getHomepageFeed } from '@/lib/trends'
import { getAllContentMetadata } from '@/lib/articles'
import { ItemType } from '@/lib/types'

export async function GET() {
  try {
    const [feed, articles] = await Promise.all([
      getHomepageFeed(),
      getAllContentMetadata(),
    ])

    // Exclude news from the public homepage feed; news is SuperAdmin-gated.
    const latestArticles = articles.filter((a) => a.itemType !== ItemType.News).slice(0, 5)

    return NextResponse.json(
      {
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
