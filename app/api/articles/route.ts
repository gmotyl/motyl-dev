import { NextResponse } from 'next/server'
import { getAllArticles, getAllHashtags, getArticlesByHashtag } from '@/lib/articles'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const hashtag = searchParams.get('hashtag')

  try {
    if (hashtag) {
      const articles = await getArticlesByHashtag(hashtag)
      return NextResponse.json({ articles })
    } else {
      const articles = await getAllArticles()
      const hashtags = await getAllHashtags()
      return NextResponse.json({ articles, hashtags })
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
