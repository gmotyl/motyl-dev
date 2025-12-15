import { NextRequest, NextResponse } from 'next/server'
import { markArticleAsViewed } from '@/lib/article-views'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json({ error: 'Article slug is required' }, { status: 400 })
    }

    const articleView = await markArticleAsViewed(slug)

    return NextResponse.json({
      success: true,
      data: articleView,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized - please log in' }, { status: 401 })
    }

    console.error('Error marking article as viewed:', error)
    return NextResponse.json({ error: 'Failed to mark article as viewed' }, { status: 500 })
  }
}
