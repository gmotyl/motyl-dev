import { NextRequest, NextResponse } from 'next/server'
import { castVote, getCurrentWeek, getWeekVotes } from '@/lib/trends'
import { z } from 'zod'

const voteSchema = z.object({
  linkUrl: z.string().url('Invalid URL'),
  title: z.string().min(1, 'Title required'),
  description: z.string().optional().default(''),
  category: z.enum(['frontend', 'ai', 'tools', 'other']).default('other'),
  sourceDomain: z.string().url().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = voteSchema.parse(body)

    const result = await castVote(
      data.linkUrl,
      data.title,
      data.description,
      data.category,
      data.sourceDomain
    )

    return NextResponse.json(
      { success: true, vote: result },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    // Database/server errors should return 500
    console.error('Failed to cast vote:', error)
    return NextResponse.json(
      { error: 'Failed to cast vote' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const weekParam = request.nextUrl.searchParams.get('week')

  try {
    const week = weekParam || (await getCurrentWeek())

    // Validate week format (e.g., "2026-w10") - weeks must be 01-53
    if (!/^\d{4}-w(0[1-9]|[1-4]\d|5[0-3])$/.test(week)) {
      return NextResponse.json(
        { error: 'Invalid week format. Use format: YYYY-wWW (weeks 01-53)' },
        { status: 400 }
      )
    }

    const votes = await getWeekVotes(week)
    return NextResponse.json({ week, votes }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch votes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch votes' },
      { status: 500 }
    )
  }
}
