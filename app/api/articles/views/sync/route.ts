import { NextRequest, NextResponse } from 'next/server'
import { syncLocalStorageToDatabase } from '@/lib/article-views'

// POST - Sync article slugs from localStorage to database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slugs } = body

    if (!slugs || !Array.isArray(slugs)) {
      return NextResponse.json(
        { error: 'Invalid request body - slugs array is required' },
        { status: 400 }
      )
    }

    // Filter out any non-string values
    const validSlugs = slugs.filter((slug) => typeof slug === 'string')

    if (validSlugs.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No valid slugs to sync',
        count: 0,
      })
    }

    const count = await syncLocalStorageToDatabase(validSlugs)

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${count} article views`,
      count,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized - please log in' },
        { status: 401 }
      )
    }

    console.error('Error syncing article views:', error)
    return NextResponse.json(
      { error: 'Failed to sync article views' },
      { status: 500 }
    )
  }
}
