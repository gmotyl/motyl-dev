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
// a(0) | b(0) b(1) — ends on a MULTI-section article
const ENDS_MULTI_SECTION = queue(['a', 'b', 'b'])

describe('RESTART_THRESHOLD_SECONDS', () => {
  it('is the conventional 3 seconds', () => {
    expect(RESTART_THRESHOLD_SECONDS).toBe(3)
  })
})

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

  it('next ends the queue from inside the last article rather than jumping to its own last section', () => {
    // index 1 is the FIRST section of the final, multi-section article 'b':
    // there are later sections, but no later article, so next must end the queue.
    expect(resolveNextTrackIndex(ENDS_MULTI_SECTION, 1, 'article')).toBe(null)
    expect(resolveNextTrackIndex(ENDS_MULTI_SECTION, 2, 'article')).toBe(null)
    // same shape inside MULTI's 'b' article, which is NOT last — that one advances.
    expect(resolveNextTrackIndex(MULTI, 2, 'article')).toBe(5)
  })
})

describe('resolvePreviousTrackIndex', () => {
  it("previous restarts the current article when the section is not the article's first", () => {
    expect(resolvePreviousTrackIndex(MULTI, 4, 'article', 0)).toBe(2)
    expect(resolvePreviousTrackIndex(MULTI, 3, 'article', 0)).toBe(2)
    // index 1 is the second section of article 'a', so this restarts 'a' at 0
    // (it is NOT a clamp — the restart path happens to land on 0).
    expect(resolvePreviousTrackIndex(MULTI, 1, 'article', 0)).toBe(0)
  })

  it('previous restarts the current track strictly past 3 seconds elapsed', () => {
    expect(resolvePreviousTrackIndex(MULTI, 2, 'article', 3.1)).toBe(2)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 'section', 3.1)).toBe(2)
    expect(resolvePreviousTrackIndex(MULTI, 2, 'article', RESTART_THRESHOLD_SECONDS + 1)).toBe(2)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 'section', RESTART_THRESHOLD_SECONDS + 1)).toBe(2)
  })

  it('previous moves to the previous track at or below 3 seconds elapsed', () => {
    // exactly at the boundary — 3 is not "past" the threshold
    expect(resolvePreviousTrackIndex(MULTI, 2, 'article', 3)).toBe(0)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 'section', 3)).toBe(1)
    // just below
    expect(resolvePreviousTrackIndex(MULTI, 2, 'article', 2.9)).toBe(0)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 'section', 2.9)).toBe(1)
    expect(resolvePreviousTrackIndex(MULTI, 5, 'article', 0)).toBe(2)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 'section', 1)).toBe(1)
  })

  it('previous clamps to index 0 on the first track', () => {
    expect(resolvePreviousTrackIndex(MULTI, 0, 'article', 0)).toBe(0)
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

  it('rejects a fractional index instead of indexing between sections', () => {
    expect(resolveNextTrackIndex(MULTI, 1.5, 'article')).toBe(null)
    expect(resolveNextTrackIndex(MULTI, 1.5, 'section')).toBe(null)
    expect(resolvePreviousTrackIndex(MULTI, 1.5, 'article', 0)).toBe(0)
  })
})
