import { NextResponse } from 'next/server'
import { getAllArticles, getAllHashtags, getArticlesByHashtag, getHashtagCounts } from '@/lib/articles'

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
      const hashtagCounts = await getHashtagCounts()
      return NextResponse.json({ articles, hashtags, hashtagCounts })
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}
