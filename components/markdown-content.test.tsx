import { fireEvent, render, screen } from '@testing-library/react'
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

  const linkContent =
    '## Why It Matters\n\nSee [the source](https://example.com/x) here.\n\n## Later On\n\nOther [second link](https://example.com/y).'

  it('highlights a link inside the current section and leaves other sections’ links plain', () => {
    render(
      <MarkdownContent
        content={linkContent}
        reader={{
          onPlayFromHere: vi.fn(),
          currentSectionId: 'why-it-matters',
        }}
      />,
    )

    const current = screen.getByRole('link', { name: 'the source' })
    expect(current).toHaveClass('ring-2')
    expect(current).toHaveClass('bg-yellow-400/10')

    const other = screen.getByRole('link', { name: 'second link' })
    expect(other).not.toHaveClass('ring-2')
    expect(other).not.toHaveClass('bg-yellow-400/10')
  })

  it('does not highlight any link when no section is active', () => {
    render(
      <MarkdownContent
        content={linkContent}
        reader={{ onPlayFromHere: vi.fn(), currentSectionId: null }}
      />,
    )

    for (const name of ['the source', 'second link']) {
      expect(screen.getByRole('link', { name })).not.toHaveClass('ring-2')
    }
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

// Paragraph-granular "Play from here": the gutter button reports the paragraph's
// markdown start line, which the reader maps to the speech unit covering it.
describe('MarkdownContent paragraph play-from-here', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ text: () => Promise.resolve('') })))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  // Paragraphs start on markdown lines 1 and 3.
  const paragraphContent = 'First paragraph.\n\nSecond paragraph.'

  it('renders a gutter play button per paragraph when onPlayFromLine is supplied', () => {
    const { container } = render(
      <MarkdownContent
        content={paragraphContent}
        reader={{ onPlayFromHere: vi.fn(), onPlayFromLine: vi.fn() }}
      />,
    )

    const gutterButtons = container.querySelectorAll('button[data-line]')
    expect(Array.from(gutterButtons, (button) => button.getAttribute('data-line'))).toEqual(['1', '3'])
  })

  it('calls onPlayFromLine with the paragraph start line when the gutter button is pressed', () => {
    const onPlayFromLine = vi.fn()
    const { container } = render(
      <MarkdownContent
        content={paragraphContent}
        reader={{ onPlayFromHere: vi.fn(), onPlayFromLine }}
      />,
    )

    fireEvent.click(container.querySelectorAll('button[data-line]')[1])

    expect(onPlayFromLine).toHaveBeenCalledTimes(1)
    expect(onPlayFromLine).toHaveBeenCalledWith(3)
  })

  // @tailwindcss/typography resets the body's edge margins with child combinators
  // (`.prose > :first-child`/`> :last-child`). The paragraph wrapper is now that
  // child, so it has to forward the reset to the <p> or every article body gains a
  // trailing 1.25em.
  it('keeps the prose first/last-child margin reset reaching the wrapped paragraph', () => {
    const { container } = render(
      <MarkdownContent
        content={paragraphContent}
        reader={{ onPlayFromHere: vi.fn(), onPlayFromLine: vi.fn() }}
      />,
    )

    const wrappers = container.querySelectorAll('.prose > div')
    expect(wrappers).toHaveLength(2)
    for (const wrapper of wrappers) {
      expect(wrapper.querySelector(':scope > p')).not.toBeNull()
      expect(wrapper).toHaveClass('[&:first-child>p]:mt-0')
      expect(wrapper).toHaveClass('[&:last-child>p]:mb-0')
    }
  })

  it('renders paragraphs unchanged when onPlayFromLine is absent', () => {
    const withoutReader = render(<MarkdownContent content={paragraphContent} />).container.innerHTML
    const withReader = render(
      <MarkdownContent content={paragraphContent} reader={{ onPlayFromHere: vi.fn() }} />,
    ).container.innerHTML

    expect(withReader).toBe(withoutReader)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('still plays a section from its h2 button when paragraph play is wired', () => {
    const onPlayFromHere = vi.fn()
    const { container } = render(
      <MarkdownContent
        content={'## First section\n\nFirst text.'}
        reader={{ onPlayFromHere, getSectionIndex: () => 0, onPlayFromLine: vi.fn() }}
      />,
    )

    // The section button is the labelled one; paragraph gutter buttons carry data-line.
    fireEvent.click(container.querySelector('button:not([data-line])')!)

    expect(onPlayFromHere).toHaveBeenCalledTimes(1)
    expect(onPlayFromHere).toHaveBeenCalledWith(0)
  })
})
