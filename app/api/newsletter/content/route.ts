import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { extractArticleContent } from '@/lib/newsletter'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!session.user.isSuperAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const slugs = request.nextUrl.searchParams.get('slugs')
    if (!slugs) {
      return NextResponse.json({ error: 'slugs parameter required' }, { status: 400 })
    }

    const slugList = slugs.split(',').filter(Boolean)
    if (slugList.length === 0) {
      return NextResponse.json({ error: 'At least one slug required' }, { status: 400 })
    }

    const extracts = await extractArticleContent(slugList)

    return NextResponse.json({ success: true, extracts })
  } catch (error) {
    console.error('Newsletter content extraction error:', error)
    return NextResponse.json({ error: 'Failed to extract content' }, { status: 500 })
  }
}
