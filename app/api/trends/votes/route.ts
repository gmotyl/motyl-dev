import { NextRequest, NextResponse } from 'next/server'
import { castVote, getCurrentWeek, getWeekVotes } from '@/lib/trends'
import { z } from 'zod'

const voteSchema = z.object({
  linkUrl: z.string().url('Invalid URL'),
  title: z.string().min(1, 'Title required'),
  description: z.string().optional().default(''),
  category: z.enum(['frontend', 'ai', 'tools', 'other']).default('other'),
  sourceDomain: z.string().optional(),
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
    return NextResponse.json(
      { error: 'Invalid request', details: error instanceof Error ? error.message : '' },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  const weekParam = request.nextUrl.searchParams.get('week')

  try {
    const week = weekParam || (await getCurrentWeek())
    const votes = await getWeekVotes(week)

    return NextResponse.json({ week, votes }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch votes' },
      { status: 500 }
    )
  }
}
