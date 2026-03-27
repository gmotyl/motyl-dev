import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getPatternStats } from '@/lib/pattern-stats'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const daysParam = request.nextUrl.searchParams.get('days')
  const days = daysParam ? parseInt(daysParam, 10) : 56

  if (isNaN(days) || days < 1 || days > 365) {
    return NextResponse.json({ error: 'days must be 1-365' }, { status: 400 })
  }

  try {
    const stats = await getPatternStats(days)
    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Failed to fetch pattern stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
