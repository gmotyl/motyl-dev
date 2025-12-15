import { NextResponse } from 'next/server'
import { getAllHashtags } from '@/lib/articles'

export async function GET() {
  try {
    const hashtags = await getAllHashtags()
    return NextResponse.json(hashtags)
  } catch (error) {
    console.error('Error fetching hashtags:', error)
    return NextResponse.json({ error: 'Failed to fetch hashtags' }, { status: 500 })
  }
}
