import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ParagraphPlayFromHere } from './paragraph-play-from-here'

// jsdom ships no window.matchMedia, which is the component's "unknown pointer"
// case: the body-tap path stays live, so it is the default test configuration.
// The hover configuration — where the gutter button must be the only click target
// — is stubbed explicitly.
describe('ParagraphPlayFromHere', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  const renderParagraph = (onPlayFromLine: (line: number) => void) =>
    render(
      <ParagraphPlayFromHere line={7} onPlayFromLine={onPlayFromLine}>
        <p>
          Body text with a <a href="/x">link</a> and a <button type="button">inner button</button>.
        </p>
      </ParagraphPlayFromHere>,
    )

  it('renders a gutter play button per paragraph when onPlayFromLine is supplied', () => {
    const { container } = render(
      <>
        <ParagraphPlayFromHere line={1} onPlayFromLine={vi.fn()}>
          <p>One.</p>
        </ParagraphPlayFromHere>
        <ParagraphPlayFromHere line={3} onPlayFromLine={vi.fn()}>
          <p>Two.</p>
        </ParagraphPlayFromHere>
      </>,
    )

    const gutterButtons = container.querySelectorAll('button[data-line]')
    expect(gutterButtons).toHaveLength(2)
    expect(Array.from(gutterButtons, (button) => button.getAttribute('data-line'))).toEqual(['1', '3'])
    expect(Array.from(gutterButtons, (button) => button.getAttribute('aria-label'))).toEqual([
      'Play from line 1',
      'Play from line 3',
    ])
  })

  it('calls onPlayFromLine with the paragraph start line when the gutter button is pressed', () => {
    const onPlayFromLine = vi.fn()
    const { container } = renderParagraph(onPlayFromLine)

    fireEvent.click(container.querySelector('button[data-line]')!)

    expect(onPlayFromLine).toHaveBeenCalledTimes(1)
    expect(onPlayFromLine).toHaveBeenCalledWith(7)
  })

  it('calls onPlayFromLine when the paragraph body is tapped', () => {
    const onPlayFromLine = vi.fn()
    renderParagraph(onPlayFromLine)

    fireEvent.click(screen.getByText(/Body text/))

    expect(onPlayFromLine).toHaveBeenCalledTimes(1)
    expect(onPlayFromLine).toHaveBeenCalledWith(7)
  })

  // The governing rule: when the pointer supports hover the gutter button is the
  // ONLY click target, so clicking the paragraph text must do nothing.
  it('does not call onPlayFromLine when the paragraph body is clicked on a hover-capable pointer', () => {
    const onPlayFromLine = vi.fn()
    const matchMedia = vi.fn(() => ({ matches: true }) as unknown as MediaQueryList)
    vi.stubGlobal('matchMedia', matchMedia)
    renderParagraph(onPlayFromLine)

    fireEvent.click(screen.getByText(/Body text/))

    expect(matchMedia).toHaveBeenCalledWith('(hover: hover)')
    expect(onPlayFromLine).not.toHaveBeenCalled()
  })

  // WCAG 2.1.1: paragraph granularity is pointer-only unless the gutter button is
  // focusable. The h2 SectionPlayFromHere is not an equivalent alternative — it
  // starts the whole section, not the clicked paragraph.
  it('the gutter button is reachable in the tab order', async () => {
    const { container } = renderParagraph(vi.fn())
    const button = container.querySelector('button[data-line]')!

    expect(button).not.toHaveAttribute('tabindex', '-1')

    await userEvent.tab()
    expect(button).toHaveFocus()
  })

  it('activates from the keyboard', async () => {
    const onPlayFromLine = vi.fn()
    const { container } = renderParagraph(onPlayFromLine)
    const button = container.querySelector<HTMLButtonElement>('button[data-line]')!

    button.focus()
    await userEvent.keyboard('{Enter}')

    expect(onPlayFromLine).toHaveBeenCalledTimes(1)
    expect(onPlayFromLine).toHaveBeenCalledWith(7)
  })

  it('names each paragraph button distinctly', () => {
    const { container } = render(
      <>
        <ParagraphPlayFromHere line={2} onPlayFromLine={vi.fn()}>
          <p>One.</p>
        </ParagraphPlayFromHere>
        <ParagraphPlayFromHere line={9} onPlayFromLine={vi.fn()}>
          <p>Two.</p>
        </ParagraphPlayFromHere>
      </>,
    )

    const names = Array.from(container.querySelectorAll('button[data-line]'), (button) =>
      button.getAttribute('aria-label'),
    )
    expect(new Set(names).size).toBe(2)
    expect(names).toEqual(['Play from line 2', 'Play from line 9'])
  })

  // `display: none` removes an element from the tab order entirely, so the gutter
  // button must never be `hidden` on a hover-less pointer — it stays laid out and
  // merely transparent + pointer-inert there, which keeps the body tap the only
  // pointer target while leaving a keyboard path.
  it('is not display:none on a pointer without hover', () => {
    const { container } = renderParagraph(vi.fn())
    const button = container.querySelector('button[data-line]')!

    expect(button).not.toHaveClass('hidden')
    expect(button).toHaveClass('flex')
    expect(button).toHaveClass('[@media(hover:none)]:pointer-events-none')
    expect(button).toHaveClass('focus-visible:opacity-100')
  })

  it('does not call onPlayFromLine on a non-primary button click', () => {
    const onPlayFromLine = vi.fn()
    renderParagraph(onPlayFromLine)

    fireEvent.click(screen.getByText(/Body text/), { button: 2 })

    expect(onPlayFromLine).not.toHaveBeenCalled()
  })

  it('does not call onPlayFromLine while text is selected', () => {
    const onPlayFromLine = vi.fn()
    renderParagraph(onPlayFromLine)
    vi.spyOn(window, 'getSelection').mockReturnValue({ isCollapsed: false } as unknown as Selection)

    fireEvent.click(screen.getByText(/Body text/))

    expect(onPlayFromLine).not.toHaveBeenCalled()
  })

  it('does not call onPlayFromLine for a click originating in a link or button', () => {
    const onPlayFromLine = vi.fn()
    renderParagraph(onPlayFromLine)

    fireEvent.click(screen.getByRole('link', { name: 'link' }))
    fireEvent.click(screen.getByRole('button', { name: 'inner button' }))

    expect(onPlayFromLine).not.toHaveBeenCalled()
  })
})
