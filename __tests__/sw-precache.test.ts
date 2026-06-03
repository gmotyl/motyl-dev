import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// Every PRECACHE_ASSETS entry must resolve to something the server can
// actually serve. A single 404 makes cache.addAll() reject, which fails the
// SW install — and a failed install means devices keep running the previous
// service worker forever (no update path). This is exactly what happened
// when /manifest.json moved to app/manifest.ts (/manifest.webmanifest).

const ROOT = join(__dirname, '..')
const swSource = readFileSync(join(ROOT, 'public', 'sw.js'), 'utf8')

function parsePrecacheAssets(src: string): string[] {
  const match = src.match(/const PRECACHE_ASSETS = \[([\s\S]*?)\]/)
  if (!match) throw new Error('PRECACHE_ASSETS not found in public/sw.js')
  return [...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1])
}

// Metadata routes served by the app router (file → URL)
const METADATA_ROUTES: Record<string, string> = {
  '/manifest.webmanifest': 'app/manifest.ts',
}

function isServable(asset: string): boolean {
  if (METADATA_ROUTES[asset]) return existsSync(join(ROOT, METADATA_ROUTES[asset]))
  // Static file under public/
  if (existsSync(join(ROOT, 'public', asset))) return true
  // App router page: '/' → app/page.tsx, '/articles' → app/articles/page.tsx
  const routeDir = asset === '/' ? 'app' : join('app', asset)
  return existsSync(join(ROOT, routeDir, 'page.tsx'))
}

describe('public/sw.js precache list', () => {
  const assets = parsePrecacheAssets(swSource)

  it('contains at least the offline fallback', () => {
    expect(assets).toContain('/offline')
  })

  it.each(assets)('precache asset %s is servable', (asset) => {
    expect(isServable(asset), `${asset} resolves to no public/ file, app route, or metadata route — cache.addAll() will reject and the SW install will fail`).toBe(true)
  })
})
