'use server'

import { prisma } from './prisma'
import { auth } from './auth'

export interface ArticleView {
  id: string
  articleSlug: string
  userId: string
  viewedAt: Date
}

// Mark an article as viewed for the current user
export async function markArticleAsViewed(slug: string): Promise<ArticleView> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

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
}

// Get all viewed article slugs for the current user
export async function getUserViewedArticles(): Promise<string[]> {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

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
}

// Check if a specific article has been viewed
export async function isArticleViewed(slug: string): Promise<boolean> {
  const session = await auth()
  if (!session?.user?.id) {
    return false
  }

  const view = await prisma.articleView.findUnique({
    where: {
      userId_articleSlug: {
        userId: session.user.id,
        articleSlug: slug,
      },
    },
  })

  return !!view
}

// Clear all view history for the current user
export async function clearViewHistory(): Promise<number> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const result = await prisma.articleView.deleteMany({
    where: {
      userId: session.user.id,
    },
  })

  return result.count
}

// Get count of viewed articles
export async function getViewedCount(): Promise<number> {
  const session = await auth()
  if (!session?.user?.id) {
    return 0
  }

  return await prisma.articleView.count({
    where: {
      userId: session.user.id,
    },
  })
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
}
