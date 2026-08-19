import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MarkdownContent } from './markdown-content'

// Guards the performance contract: MarkdownContent must be wrapped in React.memo
// so that ~60fps progress ticks on the host reader component (which re-render the
// article subtree) no longer re-render the markdown + SectionPlayFromHere buttons.
// A non-memoized MarkdownContent re-renders on every parent tick, causing the
// "Play from here" hover flicker and dropped clicks during playback.
describe('MarkdownContent memoization', () => {
  it('is wrapped in React.memo', () => {
    expect((MarkdownContent as unknown as { $$typeof?: symbol }).$$typeof).toBe(
      Symbol.for('react.memo'),
    )
  })
})

describe('MarkdownContent current-section highlight', () => {
  beforeEach(() => {
    // The component fetches TRANSLATE_PROMPT.md on mount; keep it quiet.
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ text: () => Promise.resolve('') })))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  const content = '## First section\n\nFirst text.\n\n## Second section\n\nSecond text.'
  const getSectionIndex = (heading: string) =>
    heading === 'First section' ? 0 : heading === 'Second section' ? 1 : null

  it('highlights the current section heading in yellow and leaves others plain', () => {
    render(
      <MarkdownContent
        content={content}
        reader={{
          onPlayFromHere: vi.fn(),
          getSectionIndex,
          currentSectionIndex: 0,
        }}
      />,
    )

    // The important text color + background must override the prose heading rule.
    const current = screen.getByRole('heading', { level: 2, name: 'First section' })
    expect(current).toHaveClass('!text-yellow-400')
    expect(current).toHaveClass('bg-yellow-400/10')

    const other = screen.getByRole('heading', { level: 2, name: 'Second section' })
    expect(other).not.toHaveClass('!text-yellow-400')
    expect(other).not.toHaveClass('bg-yellow-400/10')
  })

  it('does not highlight any heading when no section is active', () => {
    render(
      <MarkdownContent
        content={content}
        reader={{
          onPlayFromHere: vi.fn(),
          getSectionIndex,
          currentSectionIndex: null,
        }}
      />,
    )

    for (const name of ['First section', 'Second section']) {
      const heading = screen.getByRole('heading', { level: 2, name })
      expect(heading).not.toHaveClass('!text-yellow-400')
      expect(heading).not.toHaveClass('bg-yellow-400/10')
    }
  })

  // rehype-slug assigns ids from heading text: "Why It Matters" -> "why-it-matters".
  // This mirrors the working scroll, which matches by element id.
  const idContent = '## Why It Matters\n\nMatters text.\n\n## Later On\n\nLater text.'

  it('highlights the heading whose rehype-slug id matches currentSectionId', () => {
    render(
      <MarkdownContent
        content={idContent}
        reader={{
          onPlayFromHere: vi.fn(),
          currentSectionId: 'why-it-matters',
        }}
      />,
    )

    const current = screen.getByRole('heading', { level: 2, name: 'Why It Matters' })
    expect(current).toHaveClass('!text-yellow-400')
    expect(current).toHaveClass('bg-yellow-400/10')

    const other = screen.getByRole('heading', { level: 2, name: 'Later On' })
    expect(other).not.toHaveClass('!text-yellow-400')
    expect(other).not.toHaveClass('bg-yellow-400/10')
  })

  it('does not highlight when neither id nor index matches', () => {
    render(
      <MarkdownContent
        content={idContent}
        reader={{
          onPlayFromHere: vi.fn(),
          getSectionIndex: () => null,
          currentSectionId: 'no-such-id',
          currentSectionIndex: 99,
        }}
      />,
    )

    for (const name of ['Why It Matters', 'Later On']) {
      const heading = screen.getByRole('heading', { level: 2, name })
      expect(heading).not.toHaveClass('!text-yellow-400')
      expect(heading).not.toHaveClass('bg-yellow-400/10')
    }
  })
})
