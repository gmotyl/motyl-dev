import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ReadAllNewsPage from './page.client'
import { ItemType } from '@/lib/types'

// Sibling of components/article-wrapper.memo.test.tsx, for the *other* reader
// host. Read-all-news is the more expensive one: up to MAX_DOM_ARTICLES (12)
// articles' worth of react-markdown share one reader, so an unstable
// `markdownReader` memo in FullArticle re-renders every article on every ~60fps
// progress tick (~278ms main-thread block).
//
// FullArticle is module-private, so the page is rendered as the real tree does
// it — through ReadAllNewsPage — and stability is observed at the MarkdownContent
// boundary. The mock is wrapped in React.memo so it faithfully mirrors the real
// (memoized) component: it only re-renders when a prop identity changes, which
// lets a render count prove the parent keeps `reader` referentially stable.
// `content` carries the owning slug so a render can be attributed to an article.
const h = vi.hoisted(() => ({
  renders: [] as { content: string; reader?: unknown }[],
}))

vi.mock('@/components/markdown-content', async () => {
  const { memo } = await import('react')
  return {
    MarkdownContent: memo((props: { content: string; reader?: unknown }) => {
      h.renders.push({ content: props.content, reader: props.reader })
      return <div data-testid="markdown-content">{props.content}</div>
    }),
  }
})

// Controllable reader return so a test can emit a progress-only tick: a brand-new
// state object each render (as the real rAF-driven hook does) while keeping
// playFromHere/playFromLine referentially stable.
//
// NOTE: deliberately *not* the mocking style of page.client.test.tsx, which
// builds a fresh vi.fn() per callback on every render and exposes no `progress`.
// Reusing that here would measure the mock instead of the component: every tick
// would hand FullArticle new callback identities, so the memo could never hold
// and the test would be a tautology in the other direction.
let readerReturn: ReturnType<typeof makeReader>

function makeReader(overrides: Partial<{
  isPlaying: boolean
  progress: number
  currentTime: number
  currentIndex: number
  playFromHere: (index: number) => void
  playFromLine: (sourceSlug: string, line: number) => void
}> = {}) {
  return {
    isPlaying: false,
    isBuffering: false,
    progress: 0,
    currentTime: 0,
    currentIndex: 0,
    currentItem: undefined,
    currentSlug: null,
    canNext: true,
    play: vi.fn(),
    pause: vi.fn(),
    next: vi.fn(),
    playFromHere: stablePlayFromHere,
    playFromLine: stablePlayFromLine,
    ...overrides,
  }
}

const stablePlayFromHere = vi.fn()
const stablePlayFromLine = vi.fn()

vi.mock('@/hooks/use-continuous-reader', () => ({
  useContinuousReader: () => readerReturn,
}))

// Stable Set identity, like the real hook's useState value. A fresh Set per
// render would recompute the page's `speechSections` memo every tick and the
// churn would be the mock's, not the component's.
const stableHiddenSections = new Set<never>()
vi.mock('@/hooks/use-section-visibility', () => ({
  useSectionVisibility: () => ({
    hiddenSections: stableHiddenSections,
    toggleSection: vi.fn(),
    isHydrated: true,
  }),
}))

vi.mock('next-auth/react', () => ({ useSession: () => ({ data: null }) }))
vi.mock('@/components/header', () => ({ default: () => <div data-testid="header" /> }))
vi.mock('@/components/footer', () => ({ default: () => <div data-testid="footer" /> }))
vi.mock('@/components/mark-read-dialog', () => ({ MarkReadDialog: () => null }))
vi.mock('@/components/article-section-toggle', () => ({
  SectionVisibilityDialog: () => null,
}))

class NoopIntersectionObserver {
  observe() {}
  disconnect() {}
}

// Two articles, two sections each. The slug appears in the body text so a
// MarkdownContent render can be attributed to its owning article.
const newsItems = [1, 2].map((n) => ({
  slug: `news-${n}`,
  title: `News ${n}`,
  content: `## Section ${n}A\n\nText for news-${n}.\n\n## Section ${n}B\n\nMore for news-${n}.`,
  excerpt: '',
  publishedAt: '2026-08-17T00:00:00.000Z',
  hashtags: [],
  itemType: ItemType.News,
}))

const page = () => <ReadAllNewsPage initialItems={newsItems} totalItems={newsItems.length} />

const rendersFor = (slug: string) => h.renders.filter((entry) => entry.content.includes(slug))

describe('ReadAllNewsPage markdown re-render churn', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', NoopIntersectionObserver)
    h.renders.length = 0
    stablePlayFromHere.mockReset()
    stablePlayFromLine.mockReset()
  })

  it('does not re-render MarkdownContent on a progress-only tick', () => {
    // Baseline: already playing news-1's first section. The active-section
    // highlight is section-stable, so from here only genuine section changes may
    // re-render either article.
    readerReturn = makeReader({ isPlaying: true, progress: 42, currentTime: 3.1, currentIndex: 0 })
    const { rerender } = render(page())

    const rendersAfterMount = h.renders.length
    expect(rendersAfterMount).toBeGreaterThan(0)
    const readersAtMount = newsItems.map((item) => {
      const own = rendersFor(item.slug)
      return own[own.length - 1].reader
    })

    // Progress tick: new reader state object (progress/currentTime change) but
    // playFromHere/playFromLine identities AND currentIndex preserved — exactly
    // what the rAF loop produces during playback of one section.
    readerReturn = makeReader({ isPlaying: true, progress: 77, currentTime: 6.2, currentIndex: 0 })
    rerender(page())

    // A second progress tick, to be thorough.
    readerReturn = makeReader({ isPlaying: true, progress: 90, currentTime: 8.0, currentIndex: 0 })
    rerender(page())

    expect(h.renders.length).toBe(rendersAfterMount)
    // And each article's reader options object identity is stable across the ticks.
    newsItems.forEach((item, index) => {
      const own = rendersFor(item.slug)
      expect(own[own.length - 1].reader).toBe(readersAtMount[index])
    })
  })

  it('re-renders only the owning article when the active section advances', () => {
    readerReturn = makeReader({ isPlaying: true, progress: 50, currentIndex: 0 })
    const { rerender } = render(page())
    const ownerRendersAfterMount = rendersFor('news-1').length
    const otherRendersAfterMount = rendersFor('news-2').length

    // Section advance within news-1: currentSectionId changes -> that article's
    // memoized markdownReader identity changes -> its MarkdownContent re-renders
    // so the current-section highlight moves. news-2's currentSectionId stays
    // null, so it must NOT re-render (the reason the memo is keyed on
    // currentSectionId rather than the global activeSectionIndex).
    readerReturn = makeReader({ isPlaying: true, progress: 10, currentIndex: 1 })
    rerender(page())

    expect(rendersFor('news-1').length).toBe(ownerRendersAfterMount + 1)
    expect(rendersFor('news-2').length).toBe(otherRendersAfterMount)
  })

  it('re-renders both articles when the active section crosses an article boundary', () => {
    readerReturn = makeReader({ isPlaying: true, progress: 50, currentIndex: 1 })
    const { rerender } = render(page())
    const ownerRendersAfterMount = rendersFor('news-1').length
    const nextRendersAfterMount = rendersFor('news-2').length

    // news-1 loses the highlight, news-2 gains it.
    readerReturn = makeReader({ isPlaying: true, progress: 10, currentIndex: 2 })
    rerender(page())

    expect(rendersFor('news-1').length).toBe(ownerRendersAfterMount + 1)
    expect(rendersFor('news-2').length).toBe(nextRendersAfterMount + 1)
  })

  it('does re-render MarkdownContent when playFromHere identity changes', () => {
    readerReturn = makeReader()
    const { rerender } = render(page())
    const rendersAfterMount = h.renders.length

    // A genuine dependency change (new playFromHere) must flow through to every
    // article — proving the progress-tick guard above is not vacuous for this dep.
    readerReturn = makeReader({ playFromHere: vi.fn() })
    rerender(page())

    expect(h.renders.length).toBe(rendersAfterMount + newsItems.length)
  })

  it('does re-render MarkdownContent when playFromLine identity changes', () => {
    readerReturn = makeReader()
    const { rerender } = render(page())
    const rendersAfterMount = h.renders.length

    readerReturn = makeReader({ playFromLine: vi.fn() })
    rerender(page())

    expect(h.renders.length).toBe(rendersAfterMount + newsItems.length)
  })
})
