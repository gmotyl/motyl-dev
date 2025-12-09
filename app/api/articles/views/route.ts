import { NextRequest, NextResponse } from 'next/server'
import { getUserViewedArticles, clearViewHistory } from '@/lib/article-views'

// GET - Get all viewed article slugs for the current user
export async function GET() {
  try {
    const viewedSlugs = await getUserViewedArticles()

    return NextResponse.json({
      success: true,
      data: viewedSlugs,
    })
  } catch (error) {
    // Return empty array for unauthorized users (not logged in)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({
        success: true,
        data: [],
      })
    }

    console.error('Error fetching viewed articles:', error)
    return NextResponse.json({ error: 'Failed to fetch viewed articles' }, { status: 500 })
  }
}

// DELETE - Clear all view history for the current user
export async function DELETE() {
  try {
    const count = await clearViewHistory()

    return NextResponse.json({
      success: true,
      message: `Cleared ${count} viewed articles`,
      count,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized - please log in' }, { status: 401 })
    }

    console.error('Error clearing view history:', error)
    return NextResponse.json({ error: 'Failed to clear view history' }, { status: 500 })
  }
}
