import { describe, it, expect, vi } from 'vitest'

// NextAuth is mocked so importing the config module does not boot a real auth
// runtime; we only want the configuration object it was handed.
vi.mock('next-auth', () => ({
  default: vi.fn(() => ({
    handlers: {},
    signIn: vi.fn(),
    signOut: vi.fn(),
    auth: vi.fn(),
  })),
}))
vi.mock('@auth/prisma-adapter', () => ({ PrismaAdapter: vi.fn(() => ({})) }))
vi.mock('@/lib/db/prisma', () => ({ prisma: {} }))

import NextAuth from 'next-auth'
import '@/lib/auth/auth'

type ProviderConfig = {
  id?: string
  issuer?: string
  options?: { issuer?: string }
}

function githubProvider(): Record<string, unknown> {
  const config = vi.mocked(NextAuth).mock.calls[0][0] as {
    providers: ProviderConfig[]
  }
  const github = config.providers.find((provider) => provider.id === 'github')
  if (!github) throw new Error('GitHub provider is not configured')

  // @auth/core keeps caller-supplied options aside and merges them over the
  // provider defaults, so the effective config is the two layers combined.
  return { ...github, ...github.options }
}

describe('GitHub provider', () => {
  it('declares the issuer GitHub returns in the callback iss parameter', () => {
    // GitHub sends iss (RFC 9207) on the OAuth callback. oauth4webapi compares
    // it against the provider issuer and rejects the sign-in when they differ,
    // which surfaces to the user as "There is a problem with the server
    // configuration". Without this, the fallback issuer is https://authjs.dev.
    expect(githubProvider().issuer).toBe('https://github.com/login/oauth')
  })
})
