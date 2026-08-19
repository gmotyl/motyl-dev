import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ArticleWrapper } from './article-wrapper'
import { ItemType } from '@/lib/types'

// Collects the `reader` prop MarkdownContent receives on each *actual* render.
// The mock is wrapped in React.memo so it faithfully mirrors the real (memoized)
// component: it only re-renders when a prop identity changes. That lets a render
// count prove the parent keeps the `reader` prop referentially stable across
// progress ticks — the load-bearing half of the fix that lives in ArticleWrapper.
const h = vi.hoisted(() => ({ readerProps: [] as unknown[] }))

vi.mock('@/components/markdown-content', async () => {
  const { memo } = await import('react')
  return {
    MarkdownContent: memo((props: { content: string; reader?: unknown }) => {
      h.readerProps.push(props.reader)
      return <div data-testid="markdown-content">{props.content}</div>
    }),
  }
})

// Controllable reader return so a test can emit a progress-only tick: a brand-new
// state object each render (as the real rAF-driven hook does) while keeping
// playFromHere referentially stable.
let readerReturn: ReturnType<typeof makeReader>

function makeReader(overrides: Partial<{
  isPlaying: boolean
  progress: number
  currentTime: number
  currentIndex: number
  playFromHere: (index: number) => void
}> = {}) {
  return {
    isPlaying: false,
    isBuffering: false,
    progress: 0,
    currentTime: 0,
    currentIndex: 0,
    currentItem: undefined,
    canNext: true,
    play: vi.fn(),
    pause: vi.fn(),
    next: vi.fn(),
    playFromHere: stablePlayFromHere,
    ...overrides,
  }
}

const stablePlayFromHere = vi.fn()

vi.mock('@/hooks/use-continuous-reader', () => ({
  useContinuousReader: () => readerReturn,
}))

vi.mock('@/hooks/use-section-visibility', () => ({
  useSectionVisibility: () => ({
    hiddenSections: new Set(),
    toggleSection: vi.fn(),
    isHydrated: true,
  }),
}))

vi.mock('@/components/article-section-toggle', () => ({
  ArticleSectionToggle: () => <div data-testid="section-toggle" />,
}))
vi.mock('@/components/share-ai-button', () => ({
  ShareAIButton: () => <div data-testid="share-ai" />,
}))
vi.mock('@/components/tts-player', () => ({
  TTSPlayer: () => <div data-testid="compact-player" />,
}))
vi.mock('@/components/continuous-reader-controls', () => ({
  ContinuousReaderControls: () => (
    <div role="group" aria-label="Continuous reader controls" />
  ),
}))
vi.mock('@/components/markdown-with-cta', () => ({
  MarkdownWithCTA: () => <div data-testid="blog-markdown" />,
}))

const article = {
  slug: 'news-one',
  title: 'News One',
  content:
    '# News One\n\n## First section\n\nFirst text.\n\n## Second section\n\nSecond text.',
  itemType: ItemType.News,
  hashtags: ['#en'],
}

describe('ArticleWrapper markdown re-render churn', () => {
  beforeEach(() => {
    h.readerProps.length = 0
    stablePlayFromHere.mockReset()
  })

  it('does not re-render MarkdownContent on a progress-only tick', () => {
    // Baseline: already playing the same section. The active-section highlight is
    // section-stable, so from here only genuine section changes may re-render.
    readerReturn = makeReader({ isPlaying: true, progress: 0.42, currentTime: 3.1 })
    const { rerender } = render(
      <ArticleWrapper article={article} translatePrompt="prompt" />,
    )

    const rendersAfterMount = h.readerProps.length
    expect(rendersAfterMount).toBeGreaterThan(0)
    const readerAtMount = h.readerProps[rendersAfterMount - 1]

    // Progress tick: new reader state object (progress/currentTime change) but
    // playFromHere identity AND currentIndex preserved — exactly what the rAF
    // loop produces during playback of one section.
    readerReturn = makeReader({ isPlaying: true, progress: 0.77, currentTime: 6.2 })
    rerender(<ArticleWrapper article={article} translatePrompt="prompt" />)

    // A second progress tick, to be thorough.
    readerReturn = makeReader({ isPlaying: true, progress: 0.9, currentTime: 8.0 })
    rerender(<ArticleWrapper article={article} translatePrompt="prompt" />)

    expect(h.readerProps.length).toBe(rendersAfterMount)
    // And the reader options object identity is stable across those ticks.
    expect(h.readerProps[h.readerProps.length - 1]).toBe(readerAtMount)
  })

  it('re-renders MarkdownContent when the active section advances', () => {
    readerReturn = makeReader({ isPlaying: true, progress: 0.5, currentIndex: 0 })
    const { rerender } = render(
      <ArticleWrapper article={article} translatePrompt="prompt" />,
    )
    const rendersAfterMount = h.readerProps.length

    // Section advance: currentIndex changes -> activeSectionIndex changes -> the
    // memoized markdownReader identity changes -> MarkdownContent re-renders so
    // the yellow current-section highlight moves.
    readerReturn = makeReader({ isPlaying: true, progress: 0.1, currentIndex: 1 })
    rerender(<ArticleWrapper article={article} translatePrompt="prompt" />)

    expect(h.readerProps.length).toBe(rendersAfterMount + 1)
  })

  it('does re-render MarkdownContent when playFromHere identity changes', () => {
    readerReturn = makeReader()
    const { rerender } = render(
      <ArticleWrapper article={article} translatePrompt="prompt" />,
    )
    const rendersAfterMount = h.readerProps.length

    // A genuine dependency change (new playFromHere) must flow through.
    const newPlayFromHere = vi.fn()
    readerReturn = makeReader({ playFromHere: newPlayFromHere })
    rerender(<ArticleWrapper article={article} translatePrompt="prompt" />)

    expect(h.readerProps.length).toBe(rendersAfterMount + 1)
  })
})
