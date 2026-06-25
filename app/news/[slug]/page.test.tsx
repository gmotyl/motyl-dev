import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/require-super-admin', () => ({
  requireSuperAdmin: vi.fn(async () => undefined),
}))

vi.mock('@/lib/articles', () => ({
  getContentItemBySlug: vi.fn(async () => null),
  getAllContentMetadata: vi.fn(async () => []),
}))

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => { throw new Error('NOT_FOUND') }),
}))

vi.mock('@/components/content-page', () => ({
  default: vi.fn(() => null),
}))

import NewsItemPage from './page'
import { requireSuperAdmin } from '@/lib/require-super-admin'
import { getContentItemBySlug } from '@/lib/articles'

describe('NewsItemPage — SuperAdmin guard', () => {
  beforeEach(() => vi.clearAllMocks())

  it('calls requireSuperAdmin with /news/<slug> before fetching content', async () => {
    // Guard throws (simulates redirect for non-superadmin)
    vi.mocked(requireSuperAdmin).mockRejectedValue(new Error('REDIRECT'))

    await expect(
      NewsItemPage({ params: Promise.resolve({ slug: 'test-slug' }) })
    ).rejects.toThrow('REDIRECT')

    expect(requireSuperAdmin).toHaveBeenCalledWith('/news/test-slug')
    // Content must NOT have been fetched
    expect(getContentItemBySlug).not.toHaveBeenCalled()
  })

  it('requireSuperAdmin is called before getContentItemBySlug', async () => {
    const callOrder: string[] = []
    vi.mocked(requireSuperAdmin).mockImplementation(async () => { callOrder.push('guard') })
    vi.mocked(getContentItemBySlug).mockImplementation(async () => { callOrder.push('content'); return null })

    // notFound throws, which is expected
    await expect(
      NewsItemPage({ params: Promise.resolve({ slug: 'my-slug' }) })
    ).rejects.toThrow('NOT_FOUND')

    expect(callOrder).toEqual(['guard', 'content'])
  })
})
