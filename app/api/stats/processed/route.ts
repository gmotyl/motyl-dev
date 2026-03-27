import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { recordProcessingStats } from '@/lib/pattern-stats'

const statsSchema = z.object({
  entries: z.array(
    z.object({
      patternName: z.string().min(1),
      processed: z.number().int().min(0),
      extracted: z.number().int().min(0),
    })
  ).min(1),
})

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  const expectedKey = process.env.MOTYL_STATS_API_KEY
  if (
    !apiKey ||
    !expectedKey ||
    apiKey.length !== expectedKey.length ||
    !timingSafeEqual(Buffer.from(apiKey), Buffer.from(expectedKey))
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const data = statsSchema.parse(body)

    const results = await recordProcessingStats(data.entries)
    return NextResponse.json({ success: true, updated: results.length }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Failed to record processing stats:', error)
    return NextResponse.json({ error: 'Failed to record stats' }, { status: 500 })
  }
}
