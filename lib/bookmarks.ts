'use server'

import { prisma } from './prisma'
import { auth } from './auth'

export interface Bookmark {
  id: string
  url: string
  title: string
  hashtags: string[]
  notes: string | null
  bookmarkedAt: Date
  userId: string
}

export interface CreateBookmarkInput {
  url: string
  title: string
  hashtags: string[]
  notes?: string
}

// Get all bookmarks for the current user
export async function getUserBookmarks(): Promise<Bookmark[]> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      bookmarkedAt: 'desc',
    },
  })

  return bookmarks
}

// Add a bookmark
export async function addBookmark(input: CreateBookmarkInput): Promise<Bookmark> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  // Check if bookmark already exists
  const existing = await prisma.bookmark.findFirst({
    where: {
      userId: session.user.id,
      url: input.url,
    },
  })

  if (existing) {
    throw new Error('Bookmark already exists')
  }

  const bookmark = await prisma.bookmark.create({
    data: {
      userId: session.user.id,
      url: input.url,
      title: input.title,
      hashtags: input.hashtags,
      notes: input.notes || null,
    },
  })

  return bookmark
}

// Remove a bookmark
export async function removeBookmark(bookmarkId: string): Promise<void> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const bookmark = await prisma.bookmark.findUnique({
    where: { id: bookmarkId },
  })

  if (!bookmark || bookmark.userId !== session.user.id) {
    throw new Error('Bookmark not found or unauthorized')
  }

  await prisma.bookmark.delete({
    where: { id: bookmarkId },
  })
}

// Update bookmark hashtags and notes
export async function updateBookmark(
  bookmarkId: string,
  updates: { hashtags?: string[]; notes?: string }
): Promise<Bookmark> {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const bookmark = await prisma.bookmark.findUnique({
    where: { id: bookmarkId },
  })

  if (!bookmark || bookmark.userId !== session.user.id) {
    throw new Error('Bookmark not found or unauthorized')
  }

  const updated = await prisma.bookmark.update({
    where: { id: bookmarkId },
    data: updates,
  })

  return updated
}

// Check if a URL is bookmarked
export async function isBookmarked(url: string): Promise<boolean> {
  const session = await auth()
  if (!session?.user?.id) {
    return false
  }

  const bookmark = await prisma.bookmark.findFirst({
    where: {
      userId: session.user.id,
      url,
    },
  })

  return !!bookmark
}

// Get bookmark count
export async function getBookmarkCount(): Promise<number> {
  const session = await auth()
  if (!session?.user?.id) {
    return 0
  }

  return await prisma.bookmark.count({
    where: {
      userId: session.user.id,
    },
  })
}

// Export bookmarks as markdown
export async function exportToMarkdown(): Promise<string> {
  const bookmarks = await getUserBookmarks()
  if (bookmarks.length === 0) {
    return '# My Curated Links from motyl.dev\n\n*No bookmarks yet!*'
  }

  // Group by hashtags
  const byHashtag: Record<string, Bookmark[]> = {}

  bookmarks.forEach((bookmark) => {
    if (bookmark.hashtags.length === 0) {
      if (!byHashtag['Uncategorized']) byHashtag['Uncategorized'] = []
      byHashtag['Uncategorized'].push(bookmark)
    } else {
      bookmark.hashtags.forEach((tag) => {
        if (!byHashtag[tag]) byHashtag[tag] = []
        byHashtag[tag].push(bookmark)
      })
    }
  })

  const date = new Date().toISOString().split('T')[0]
  let md = `# My Curated Links from motyl.dev\n\n*Last updated: ${date}*\n\n`

  Object.keys(byHashtag)
    .sort()
    .forEach((hashtag) => {
      md += `## #${hashtag}\n\n`
      byHashtag[hashtag].forEach((bookmark) => {
        md += `- [${bookmark.title}](${bookmark.url})\n`
        if (bookmark.notes) md += `  - ${bookmark.notes}\n`
        md += `\n`
      })
    })

  md += `---\n\n*Curated with [motyl.dev](https://motyl.dev)*\n`
  return md
}
