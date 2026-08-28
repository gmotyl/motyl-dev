import { describe, it, expect } from 'vitest'
import {
  RESTART_THRESHOLD_SECONDS,
  resolveNextTrackIndex,
  resolvePreviousTrackIndex,
  resolveTrackGranularity,
} from './media-session-tracks'

const queue = (slugs: readonly string[]) => slugs.map((sourceSlug) => ({ sourceSlug }))

// a(0) a(1) | b(0) b(1) b(2) | c(0)
const MULTI = queue(['a', 'a', 'b', 'b', 'b', 'c'])
const SINGLE = queue(['a', 'a', 'a'])

describe('resolveTrackGranularity', () => {
  it('treats a single-slug queue as section granularity', () => {
    expect(resolveTrackGranularity(SINGLE)).toBe('section')
  })

  it('treats a multi-slug queue as article granularity', () => {
    expect(resolveTrackGranularity(MULTI)).toBe('article')
  })

  it('treats an empty queue as section granularity', () => {
    expect(resolveTrackGranularity([])).toBe('section')
  })
})

describe('resolveNextTrackIndex', () => {
  it('next skips the rest of the current article at article granularity', () => {
    expect(resolveNextTrackIndex(MULTI, 2, 'article')).toBe(5)
    expect(resolveNextTrackIndex(MULTI, 3, 'article')).toBe(5)
    expect(resolveNextTrackIndex(MULTI, 0, 'article')).toBe(2)
  })

  it('next steps one section at section granularity', () => {
    expect(resolveNextTrackIndex(SINGLE, 0, 'section')).toBe(1)
    expect(resolveNextTrackIndex(SINGLE, 1, 'section')).toBe(2)
  })

  it('next returns null on the last track', () => {
    expect(resolveNextTrackIndex(MULTI, 5, 'article')).toBe(null)
    expect(resolveNextTrackIndex(SINGLE, 2, 'section')).toBe(null)
  })
})

describe('resolvePreviousTrackIndex', () => {
  it("previous restarts the current article when the section is not the article's first", () => {
    expect(resolvePreviousTrackIndex(MULTI, 4, 'article', 0)).toBe(2)
    expect(resolvePreviousTrackIndex(MULTI, 3, 'article', 0)).toBe(2)
  })

  it('previous restarts the current track past the 3s threshold', () => {
    expect(resolvePreviousTrackIndex(MULTI, 2, 'article', RESTART_THRESHOLD_SECONDS + 1)).toBe(2)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 'section', RESTART_THRESHOLD_SECONDS + 1)).toBe(2)
  })

  it('previous moves to the previous track within the 3s threshold', () => {
    expect(resolvePreviousTrackIndex(MULTI, 2, 'article', RESTART_THRESHOLD_SECONDS)).toBe(0)
    expect(resolvePreviousTrackIndex(MULTI, 5, 'article', 0)).toBe(2)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 'section', 1)).toBe(1)
  })

  it('previous clamps to index 0 on the first track', () => {
    expect(resolvePreviousTrackIndex(MULTI, 0, 'article', 0)).toBe(0)
    expect(resolvePreviousTrackIndex(MULTI, 1, 'article', 0)).toBe(0)
    expect(resolvePreviousTrackIndex(SINGLE, 0, 'section', 0)).toBe(0)
  })
})

describe('defensive inputs', () => {
  it('resolves defensively for an empty queue or out-of-range index', () => {
    expect(resolveNextTrackIndex([], 0, 'article')).toBe(null)
    expect(resolveNextTrackIndex(MULTI, -1, 'article')).toBe(null)
    expect(resolveNextTrackIndex(MULTI, 9, 'article')).toBe(null)
    expect(resolveNextTrackIndex([], 0, 'section')).toBe(null)

    expect(resolvePreviousTrackIndex([], 0, 'article', 0)).toBe(0)
    expect(resolvePreviousTrackIndex(MULTI, -1, 'article', 0)).toBe(0)
    expect(resolvePreviousTrackIndex(MULTI, 9, 'article', 0)).toBe(0)
    expect(resolvePreviousTrackIndex([], 0, 'section', 99)).toBe(0)
  })
})
