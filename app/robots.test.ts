import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

import robots from './robots'

describe('robots', () => {
  it('disallows /data/* alongside /api/*', () => {
    const result = robots()
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules
    const disallow = Array.isArray(rule?.disallow) ? rule.disallow : [rule?.disallow]

    expect(disallow).toContain('/api/*')
    expect(disallow).toContain('/data/*')
  })

  it('keeps the sitemap URL', () => {
    const result = robots()

    expect(result.sitemap).toBe('https://motyl.dev/sitemap.xml')
  })
})

describe('vercel.json', () => {
  it('sets X-Robots-Tag noindex on /data/:path*', () => {
    const vercelJsonPath = path.join(process.cwd(), 'vercel.json')
    const raw = fs.readFileSync(vercelJsonPath, 'utf8')
    const parsed = JSON.parse(raw) as {
      headers: Array<{ source: string; headers: Array<{ key: string; value: string }> }>
    }

    const entry = parsed.headers.find((h) => h.source === '/data/:path*')

    expect(entry).toBeDefined()
    expect(entry?.headers).toContainEqual({ key: 'X-Robots-Tag', value: 'noindex' })
  })
})
