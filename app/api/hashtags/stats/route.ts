import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const statsPath = path.join(process.cwd(), 'data', 'hashtag-stats.json')
    const statsContent = await fs.readFile(statsPath, 'utf8')
    const stats = JSON.parse(statsContent)

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching hashtag stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hashtag stats' },
      { status: 500 }
    )
  }
}
