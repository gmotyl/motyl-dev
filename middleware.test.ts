import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from './middleware'

function reqFor(path: string, withToken: 'none' | 'authjs' | 'secure' = 'none') {
  const req = new NextRequest(`http://localhost${path}`)
  if (withToken === 'authjs') req.cookies.set('authjs.session-token', 'x')
  if (withToken === 'secure') req.cookies.set('__Secure-authjs.session-token', 'x')
  return req
}

describe('middleware — logged-out news gating', () => {
  it('redirects logged-out users away from /news', () => {
    const res = middleware(reqFor('/news'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/api/auth/signin')
    expect(res.headers.get('location')).toContain('callbackUrl=%2Fnews')
  })

  it('redirects logged-out users away from /read-all-news', () => {
    const res = middleware(reqFor('/read-all-news'))
    expect(res.headers.get('location')).toContain('/api/auth/signin')
    expect(res.headers.get('location')).toContain('callbackUrl=%2Fread-all-news')
  })

  it('lets logged-in users through to /news (authjs.session-token)', () => {
    const res = middleware(reqFor('/news', 'authjs'))
    expect(res.headers.get('location')).toBeNull()
  })

  it('lets logged-in users through to /news (__Secure-authjs.session-token)', () => {
    const res = middleware(reqFor('/news', 'secure'))
    expect(res.headers.get('location')).toBeNull()
  })
})

describe('middleware — matcher scope (ADR 0008)', () => {
  it('does not include public article routes', async () => {
    const { config } = await import('./middleware')
    expect(config.matcher).not.toContain('/articles/:path*')
    expect(config.matcher).toEqual([
      '/news/:path*',
      '/bookmarks/:path*',
      '/read-all-news/:path*',
      '/api/content',
    ])
  })
})
