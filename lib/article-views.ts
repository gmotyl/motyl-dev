'use server'

import { prisma } from './prisma'
import { auth } from './auth'

export interface ArticleView {
  id: string
  articleSlug: string
  userId: string
  viewedAt: Date
}

// Check if we're in dev mode without database
const isDevWithoutDb = process.env.DEV_AUTH_BYPASS === 'true'

// Mark an article as viewed for the current user
export async function markArticleAsViewed(slug: string): Promise<ArticleView> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  // In dev mode without DB, return a mock response
  if (isDevWithoutDb) {
    return {
      id: 'dev-view-' + Date.now(),
      articleSlug: slug,
      userId: session.user.id,
      viewedAt: new Date(),
    }
  }

  try {
    // Use upsert to handle duplicates gracefully
    const articleView = await prisma.articleView.upsert({
      where: {
        userId_articleSlug: {
          userId: session.user.id,
          articleSlug: slug,
        },
      },
      update: {
        viewedAt: new Date(), // Update timestamp if already exists
      },
      create: {
        userId: session.user.id,
        articleSlug: slug,
      },
    })

    return articleView
  } catch (error) {
    console.error('Database error in markArticleAsViewed:', error)
    // Return mock on DB error in dev
    return {
      id: 'dev-view-' + Date.now(),
      articleSlug: slug,
      userId: session.user.id,
      viewedAt: new Date(),
    }
  }
}

// Get all viewed article slugs for the current user
export async function getUserViewedArticles(): Promise<string[]> {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  // In dev mode without DB, return empty array (use localStorage instead)
  if (isDevWithoutDb) {
    return []
  }

  try {
    const views = await prisma.articleView.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        articleSlug: true,
      },
      orderBy: {
        viewedAt: 'desc',
      },
    })

    return views.map((v) => v.articleSlug)
  } catch (error) {
    console.error('Database error in getUserViewedArticles:', error)
    return []
  }
}

// Check if a specific article has been viewed
export async function isArticleViewed(slug: string): Promise<boolean> {
  const session = await auth()
  if (!session?.user?.id) {
    return false
  }

  if (isDevWithoutDb) {
    return false
  }

  try {
    const view = await prisma.articleView.findUnique({
      where: {
        userId_articleSlug: {
          userId: session.user.id,
          articleSlug: slug,
        },
      },
    })

    return !!view
  } catch (error) {
    console.error('Database error in isArticleViewed:', error)
    return false
  }
}

// Clear all view history for the current user
export async function clearViewHistory(): Promise<number> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  if (isDevWithoutDb) {
    return 0
  }

  try {
    const result = await prisma.articleView.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    return result.count
  } catch (error) {
    console.error('Database error in clearViewHistory:', error)
    return 0
  }
}

// Get count of viewed articles
export async function getViewedCount(): Promise<number> {
  const session = await auth()
  if (!session?.user?.id) {
    return 0
  }

  if (isDevWithoutDb) {
    return 0
  }

  try {
    return await prisma.articleView.count({
      where: {
        userId: session.user.id,
      },
    })
  } catch (error) {
    console.error('Database error in getViewedCount:', error)
    return 0
  }
}

// Sync article slugs from localStorage to database (migration helper)
export async function syncLocalStorageToDatabase(slugs: string[]): Promise<number> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  if (!slugs || slugs.length === 0) {
    return 0
  }

  if (isDevWithoutDb) {
    return 0
  }

  try {
    // Filter out any slugs that already exist for this user
    const existingSlugs = await getUserViewedArticles()
    const existingSet = new Set(existingSlugs)
    const newSlugs = slugs.filter((slug) => !existingSet.has(slug))

    if (newSlugs.length === 0) {
      return 0
    }

    // Bulk create article views
    const viewsData = newSlugs.map((slug) => ({
      userId: session.user.id,
      articleSlug: slug,
      viewedAt: new Date(),
    }))

    const result = await prisma.articleView.createMany({
      data: viewsData,
      skipDuplicates: true, // Skip any duplicates that might occur from race conditions
    })

    return result.count
  } catch (error) {
    console.error('Database error in syncLocalStorageToDatabase:', error)
    return 0
  }
}
