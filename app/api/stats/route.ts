import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getPatternStats } from '@/lib/pattern-stats'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const weeksParam = request.nextUrl.searchParams.get('weeks')
  const weeks = weeksParam ? parseInt(weeksParam, 10) : 8

  if (isNaN(weeks) || weeks < 1 || weeks > 52) {
    return NextResponse.json({ error: 'weeks must be 1-52' }, { status: 400 })
  }

  try {
    const stats = await getPatternStats(weeks)
    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Failed to fetch pattern stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
