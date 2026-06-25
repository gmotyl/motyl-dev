import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/auth', () => ({ auth: vi.fn() }))
vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => { throw new Error('REDIRECT:' + url) }),
}))

import { requireSuperAdmin } from './require-super-admin'
import { auth } from '@/lib/auth'

const mockAuth = vi.mocked(auth)

describe('requireSuperAdmin', () => {
  beforeEach(() => vi.clearAllMocks())

  it('redirects logged-out users to sign-in with callbackUrl', async () => {
    mockAuth.mockResolvedValue(null as never)
    await expect(requireSuperAdmin('/news')).rejects.toThrow(
      'REDIRECT:/api/auth/signin?callbackUrl=%2Fnews'
    )
  })

  it('redirects logged-in non-admins to home', async () => {
    mockAuth.mockResolvedValue({ user: { isSuperAdmin: false } } as never)
    await expect(requireSuperAdmin('/news')).rejects.toThrow('REDIRECT:/')
  })

  it('returns for SuperAdmin', async () => {
    mockAuth.mockResolvedValue({ user: { isSuperAdmin: true } } as never)
    await expect(requireSuperAdmin('/news')).resolves.toBeUndefined()
  })
})
