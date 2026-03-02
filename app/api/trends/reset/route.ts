import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { resetWeeklyVotes } from '@/lib/trends'

export async function POST() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!session.user.isSuperAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const result = await resetWeeklyVotes()
    return NextResponse.json({ success: true, archived: result }, { status: 200 })
  } catch (error) {
    console.error('Failed to reset weekly votes:', error)
    return NextResponse.json({ error: 'Failed to reset weekly votes' }, { status: 500 })
  }
}
