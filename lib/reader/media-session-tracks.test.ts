import { describe, it, expect } from 'vitest'
import {
  RESTART_THRESHOLD_SECONDS,
  resolveArticleTitle,
  resolveNextTrackIndex,
  resolvePreviousTrackIndex,
} from '@/lib/reader/media-session-tracks'

const queue = (slugs: readonly string[]) => slugs.map((sourceSlug) => ({ sourceSlug }))

// Multi-slug fixtures are kept deliberately: a track is a section regardless of
// how many articles the queue spans, so these are what fail if a file-level jump
// is ever re-introduced.
// a(0) a(1) | b(0) b(1) b(2) | c(0)
const MULTI = queue(['a', 'a', 'b', 'b', 'b', 'c'])
const SINGLE = queue(['a', 'a', 'a'])
// a(0) | b(0) b(1) — ends on a MULTI-section article
const ENDS_MULTI_SECTION = queue(['a', 'b', 'b'])

// The production shape `splitReviewedSections` emits: ONLY each article's first
// section carries `sourceTitle`, every later one carries `undefined`. That is
// precisely why the article title has to be resolved by scanning back rather
// than read off the current item.
//   a(0,'Article A') a(1) | b(0,'Digest B') b(1) b(2) | c(0) — 'c' is untitled
const TITLED = [
  { sourceSlug: 'a', sourceTitle: 'Article A' },
  { sourceSlug: 'a' },
  { sourceSlug: 'b', sourceTitle: 'Digest B' },
  { sourceSlug: 'b' },
  { sourceSlug: 'b' },
  { sourceSlug: 'c' },
]

describe('RESTART_THRESHOLD_SECONDS', () => {
  it('is the conventional 3 seconds', () => {
    expect(RESTART_THRESHOLD_SECONDS).toBe(3)
  })
})

describe('resolveNextTrackIndex', () => {
  it('next steps one section even when the queue spans several articles', () => {
    // index 2 is the first of article 'b': the two unheard sections that follow
    // must be played, not skipped along with the rest of the file.
    expect(resolveNextTrackIndex(MULTI, 2)).toBe(3)
    expect(resolveNextTrackIndex(MULTI, 3)).toBe(4)
    // crossing an article boundary is just the same +1
    expect(resolveNextTrackIndex(MULTI, 1)).toBe(2)
    expect(resolveNextTrackIndex(SINGLE, 0)).toBe(1)
    // the last article of the queue is no special case either
    expect(resolveNextTrackIndex(ENDS_MULTI_SECTION, 1)).toBe(2)
  })

  it('next returns null on the last section of the queue', () => {
    expect(resolveNextTrackIndex(MULTI, 5)).toBe(null)
    expect(resolveNextTrackIndex(SINGLE, 2)).toBe(null)
    expect(resolveNextTrackIndex(ENDS_MULTI_SECTION, 2)).toBe(null)
  })
})

describe('resolvePreviousTrackIndex', () => {
  it('previous restarts the current section strictly past 3 seconds elapsed', () => {
    expect(resolvePreviousTrackIndex(MULTI, 2, 3.1)).toBe(2)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 3.1)).toBe(2)
    expect(resolvePreviousTrackIndex(MULTI, 2, RESTART_THRESHOLD_SECONDS + 1)).toBe(2)
    expect(resolvePreviousTrackIndex(SINGLE, 2, RESTART_THRESHOLD_SECONDS + 1)).toBe(2)
  })

  it("previous restarts a section that is not its article's first, rather than rewinding to the article", () => {
    // indexes 3 and 4 sit deep inside article 'b'; elapsed is now knowable for
    // them, so each restarts itself instead of jumping back to the file's start.
    expect(resolvePreviousTrackIndex(MULTI, 4, 10)).toBe(4)
    expect(resolvePreviousTrackIndex(MULTI, 3, 10)).toBe(3)
    expect(resolvePreviousTrackIndex(MULTI, 1, 10)).toBe(1)
  })

  it('previous steps back one section at or below 3 seconds elapsed', () => {
    // exactly at the boundary — 3 is not "past" the threshold
    expect(resolvePreviousTrackIndex(MULTI, 2, 3)).toBe(1)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 3)).toBe(1)
    // just below
    expect(resolvePreviousTrackIndex(MULTI, 2, 2.9)).toBe(1)
    expect(resolvePreviousTrackIndex(SINGLE, 2, 2.9)).toBe(1)
    // an article boundary is crossed like any other step back
    expect(resolvePreviousTrackIndex(MULTI, 5, 0)).toBe(4)
    expect(resolvePreviousTrackIndex(ENDS_MULTI_SECTION, 1, 0)).toBe(0)
  })

  it('previous clamps to index 0 on the first section', () => {
    expect(resolvePreviousTrackIndex(MULTI, 0, 0)).toBe(0)
    expect(resolvePreviousTrackIndex(SINGLE, 0, 0)).toBe(0)
    expect(resolvePreviousTrackIndex(MULTI, 0, 99)).toBe(0)
  })
})

describe('defensive inputs', () => {
  it('resolves defensively for an empty queue or out-of-range index', () => {
    expect(resolveNextTrackIndex([], 0)).toBe(null)
    expect(resolveNextTrackIndex(MULTI, -1)).toBe(null)
    expect(resolveNextTrackIndex(MULTI, 9)).toBe(null)

    expect(resolvePreviousTrackIndex([], 0, 0)).toBe(0)
    expect(resolvePreviousTrackIndex(MULTI, -1, 0)).toBe(0)
    expect(resolvePreviousTrackIndex(MULTI, 9, 0)).toBe(0)
    expect(resolvePreviousTrackIndex([], 0, 99)).toBe(0)
  })

  it('rejects a fractional index instead of indexing between sections', () => {
    expect(resolveNextTrackIndex(MULTI, 1.5)).toBe(null)
    expect(resolvePreviousTrackIndex(MULTI, 1.5, 0)).toBe(0)
  })
})

describe('resolveArticleTitle', () => {
  it('names the article on its own first section', () => {
    expect(resolveArticleTitle(TITLED, 0)).toBe('Article A')
    expect(resolveArticleTitle(TITLED, 2)).toBe('Digest B')
  })

  it('keeps naming the article on every later section of it', () => {
    // The defect this function exists for: sections 1..n carry no `sourceTitle`
    // of their own, so reading the current item alone blanks the artist line
    // for the MAJORITY of a digest's sections.
    expect(resolveArticleTitle(TITLED, 1)).toBe('Article A')
    expect(resolveArticleTitle(TITLED, 3)).toBe('Digest B')
    expect(resolveArticleTitle(TITLED, 4)).toBe('Digest B')
  })

  it('stops at the article boundary instead of leaking the previous title', () => {
    // Index 5 opens article 'c', which carries no title. Scanning one step too
    // far would answer 'Digest B' — the article the driver already left.
    expect(resolveArticleTitle(TITLED, 5)).toBe('')
  })

  it('answers empty when no section of the article carries a title', () => {
    expect(resolveArticleTitle(queue(['a', 'a']), 1)).toBe('')
    expect(resolveArticleTitle(queue(['a', 'a']), 0)).toBe('')
  })

  it('resolves defensively for an empty queue or an index it does not have', () => {
    // Same guard as the two index resolvers: `''` is the OS's "no artist line",
    // so a nonsense index cannot put stale words on a head unit.
    expect(resolveArticleTitle([], 0)).toBe('')
    expect(resolveArticleTitle(TITLED, -1)).toBe('')
    expect(resolveArticleTitle(TITLED, 9)).toBe('')
    expect(resolveArticleTitle(TITLED, 1.5)).toBe('')
  })
})
