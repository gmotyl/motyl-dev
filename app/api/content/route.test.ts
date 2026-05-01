import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/articles', () => ({
  getContentPageData: vi.fn(async () => ({
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    hashtagCounts: {},
  })),
}))

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(async () => null),
}))

vi.mock('@/lib/article-views', () => ({
  getUserViewedArticles: vi.fn(async () => []),
}))

vi.mock('next/headers', () => ({
  headers: vi.fn(async () => new Map()),
}))

import { GET } from './route'
import { getContentPageData } from '@/lib/articles'

describe('GET /api/content — limit query param', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('passes limit from query params to getContentPageData', async () => {
    const req = new NextRequest('http://localhost/api/content?page=2&limit=5')
    await GET(req)

    expect(getContentPageData).toHaveBeenCalledWith(
      expect.objectContaining({ page: 2, limit: 5 })
    )
  })

  it('defaults limit to 20 when missing', async () => {
    const req = new NextRequest('http://localhost/api/content?page=1')
    await GET(req)

    expect(getContentPageData).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 20 })
    )
  })
})
