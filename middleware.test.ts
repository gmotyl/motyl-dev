import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from './middleware'

function reqFor(path: string, withToken = false) {
  const req = new NextRequest(`http://localhost${path}`)
  if (withToken) req.cookies.set('authjs.session-token', 'x')
  return req
}

describe('middleware — logged-out news gating', () => {
  it('redirects logged-out users away from /news', () => {
    const res = middleware(reqFor('/news'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/api/auth/signin')
  })

  it('redirects logged-out users away from /read-all-news', () => {
    const res = middleware(reqFor('/read-all-news'))
    expect(res.headers.get('location')).toContain('/api/auth/signin')
  })

  it('lets logged-in users through to /news', () => {
    const res = middleware(reqFor('/news', true))
    expect(res.headers.get('location')).toBeNull()
  })
})
