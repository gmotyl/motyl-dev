import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ParagraphPlayFromHere } from './paragraph-play-from-here'

// jsdom applies no stylesheet, so the `@media (hover: …)` split that makes the
// gutter button and the body-tap mutually exclusive in a browser is inert here:
// both paths are reachable and are tested as separate code paths.
describe('ParagraphPlayFromHere', () => {
  afterEach(() => {
    vi.restoreAllMocks()
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
    for (const button of gutterButtons) {
      expect(button).toHaveAccessibleName('Play from here')
    }
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
