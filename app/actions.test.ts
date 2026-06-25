import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(async () => null),
}))

vi.mock('@/lib/articles', () => ({
  getContentPageData: vi.fn(async () => ({
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    hashtagCounts: {},
  })),
}))

vi.mock('next/headers', () => ({
  headers: vi.fn(async () => new Map()),
}))

import { getFilteredContent } from './actions'
import { auth } from '@/lib/auth'
import { getContentPageData } from '@/lib/articles'

describe('getFilteredContent — SuperAdmin gating', () => {
  beforeEach(() => vi.clearAllMocks())

  it('non-admin + contentType:all → getContentPageData called with contentType:article', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { isSuperAdmin: false } } as never)
    await getFilteredContent({ contentType: 'all' })
    expect(getContentPageData).toHaveBeenCalledWith(
      expect.objectContaining({ contentType: 'article' })
    )
  })

  it('unauthenticated + contentType:all → getContentPageData called with contentType:article', async () => {
    vi.mocked(auth).mockResolvedValue(null as never)
    await getFilteredContent({ contentType: 'all' })
    expect(getContentPageData).toHaveBeenCalledWith(
      expect.objectContaining({ contentType: 'article' })
    )
  })

  it('SuperAdmin + contentType:all → getContentPageData called with contentType:all', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { isSuperAdmin: true } } as never)
    await getFilteredContent({ contentType: 'all' })
    expect(getContentPageData).toHaveBeenCalledWith(
      expect.objectContaining({ contentType: 'all' })
    )
  })

  it('non-admin + contentType:article → getContentPageData called with contentType:article unchanged', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { isSuperAdmin: false } } as never)
    await getFilteredContent({ contentType: 'article' })
    expect(getContentPageData).toHaveBeenCalledWith(
      expect.objectContaining({ contentType: 'article' })
    )
  })

  it('non-admin + contentType:news → throws Forbidden, getContentPageData not called', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { isSuperAdmin: false } } as never)
    await expect(getFilteredContent({ contentType: 'news' })).rejects.toThrow('Forbidden')
    expect(getContentPageData).not.toHaveBeenCalled()
  })

  it('unauthenticated + contentType:news → throws Forbidden', async () => {
    vi.mocked(auth).mockResolvedValue(null as never)
    await expect(getFilteredContent({ contentType: 'news' })).rejects.toThrow('Forbidden')
    expect(getContentPageData).not.toHaveBeenCalled()
  })

  it('SuperAdmin + contentType:news → resolves, getContentPageData called', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { isSuperAdmin: true } } as never)
    await expect(getFilteredContent({ contentType: 'news' })).resolves.toBeDefined()
    expect(getContentPageData).toHaveBeenCalledWith(
      expect.objectContaining({ contentType: 'news' })
    )
  })
})
