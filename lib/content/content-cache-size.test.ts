import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// Regression guard for the content-cache-split change: prebuild must keep
// data/content-cache.json metadata-only (news bodies live in public/data/items/*.json
// instead). See projects/motyl/plans/openspec/changes/2026-09-10-content-cache-split/.
//
// The cache is gitignored and only exists after `pnpm prebuild`, so a clean checkout
// has nothing to assert against — the two real checks skip in that case, and the third
// test documents/exercises that skip mechanism instead of faking a pass.

const CACHE_PATH = path.join(process.cwd(), 'data', 'content-cache.json')
const MAX_CACHE_BYTES = 1.5 * 1024 * 1024

const cacheExists = fs.existsSync(CACHE_PATH)

describe('content cache size regression guard', () => {
  const runIfCacheBuilt = cacheExists ? it : it.skip
  const runIfCacheMissing = cacheExists ? it.skip : it

  runIfCacheBuilt('content cache stays under 1.5 MB', () => {
    const { size } = fs.statSync(CACHE_PATH)
    const actualMB = (size / (1024 * 1024)).toFixed(2)

    expect(
      size,
      `data/content-cache.json is ${actualMB} MB, over the 1.5 MB budget set by the ` +
        'content-cache-split change (2026-09-10-content-cache-split). News bodies must be ' +
        'emitted as public/data/items/<slug>.json assets, not inlined in the module cache.'
    ).toBeLessThan(MAX_CACHE_BYTES)
  })

  runIfCacheBuilt('no news item in the cache carries a content field', () => {
    const cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
    const newsItemsWithContent = cache.items.filter(
      (item: { itemType: string; content?: unknown }) =>
        item.itemType === 'news' && Object.prototype.hasOwnProperty.call(item, 'content')
    )

    expect(
      newsItemsWithContent.map((item: { slug: string }) => item.slug),
      'news items must not carry an inline content field — bodies belong in ' +
        'public/data/items/<slug>.json per the content-cache-split change'
    ).toEqual([])
  })

  // Runs (instead of skipping) exactly when the cache is absent, demonstrating that a
  // clean checkout skips the two real assertions above rather than failing or faking them.
  runIfCacheMissing('skips when the cache has not been built', () => {
    expect(
      cacheExists,
      'data/content-cache.json is absent — run `pnpm prebuild` to generate it; ' +
        'the size and content-field checks above are skipped, not failed, until then'
    ).toBe(false)
  })
})
