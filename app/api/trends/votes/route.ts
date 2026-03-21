import { NextRequest, NextResponse } from 'next/server'
import { castVote, getWeekVotes, deleteTrendingItem, updateTrendingCategory } from '@/lib/trends'
import { CONTENT_CATEGORIES } from '@/lib/og'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const voteSchema = z.object({
  linkUrl: z.string().url('Invalid URL'),
  title: z.string().min(1, 'Title required'),
  description: z.string().optional().default(''),
  category: z.enum(CONTENT_CATEGORIES).default('general'),
  sourceDomain: z.string().url().optional(),
})

const deleteSchema = z.object({
  linkUrl: z.string().url('Invalid URL'),
})

const patchSchema = z.object({
  linkUrl: z.string().url(),
  category: z.enum(CONTENT_CATEGORIES),
})

/** Verify superadmin session + CSRF custom header */
async function requireSuperAdmin(request: NextRequest) {
  // Custom header prevents cross-origin requests (browsers require CORS preflight for custom headers)
  if (request.headers.get('x-requested-with') !== 'motyl-admin') {
    return { error: NextResponse.json({ error: 'Missing CSRF header' }, { status: 403 }) }
  }
  const session = await auth()
  if (!session?.user?.id) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  if (!session.user.isSuperAdmin) {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }
  return { session }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = voteSchema.parse(body)

    const { vote, isNew, newRank } = await castVote(
      data.linkUrl,
      data.title,
      data.description,
      data.category,
      data.sourceDomain
    )

    const session = await auth()
    const isSuperAdmin = session?.user?.isSuperAdmin ?? false

    return NextResponse.json(
      { success: true, vote, isNew, newRank, isSuperAdmin },
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

export async function DELETE(request: NextRequest) {
  try {
    const { error } = await requireSuperAdmin(request)
    if (error) return error

    const body = await request.json()
    const data = deleteSchema.parse(body)

    await deleteTrendingItem(data.linkUrl)
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Failed to delete trending item:', error)
    return NextResponse.json({ error: 'Failed to delete trending item' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { error } = await requireSuperAdmin(request)
    if (error) return error

    const body = await request.json()
    const data = patchSchema.parse(body)

    const updated = await updateTrendingCategory(data.linkUrl, data.category)
    return NextResponse.json({ success: true, vote: updated })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Failed to update category:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const weekParam = request.nextUrl.searchParams.get('week')

  try {
    const week = weekParam || 'current'

    // Validate week format: "current" or "YYYY-wWW" (weeks 01-53)
    if (week !== 'current' && !/^\d{4}-w(0[1-9]|[1-4]\d|5[0-3])$/.test(week)) {
      return NextResponse.json(
        { error: 'Invalid week format. Use "current" or format: YYYY-wWW (weeks 01-53)' },
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
