import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

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

describe('GET /api/content — news is SuperAdmin-only', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 403 for news when not authenticated', async () => {
    vi.mocked(auth).mockResolvedValue(null as never)
    const req = new NextRequest('http://localhost/api/content?contentType=news')
    const res = await GET(req)
    expect(res.status).toBe(403)
    expect(getContentPageData).not.toHaveBeenCalled()
  })

  it('returns 403 for news when logged-in but not SuperAdmin', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { isSuperAdmin: false } } as never)
    const req = new NextRequest('http://localhost/api/content?contentType=news')
    const res = await GET(req)
    expect(res.status).toBe(403)
  })

  it('returns 200 for news when SuperAdmin', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { isSuperAdmin: true } } as never)
    const req = new NextRequest('http://localhost/api/content?contentType=news')
    const res = await GET(req)
    expect(res.status).toBe(200)
    expect(getContentPageData).toHaveBeenCalled()
  })

  it('stays public for articles when not authenticated', async () => {
    vi.mocked(auth).mockResolvedValue(null as never)
    const req = new NextRequest('http://localhost/api/content?contentType=article')
    const res = await GET(req)
    expect(res.status).toBe(200)
  })
})
