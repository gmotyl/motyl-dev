import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ContinuousReaderControls } from './continuous-reader-controls'

describe('ContinuousReaderControls', () => {
  it('renders the three reader actions on desktop and mobile', () => {
    render(
      <ContinuousReaderControls
        isPlaying={false}
        onPlayPause={vi.fn()}
        onNext={vi.fn()}
        onMarkRead={vi.fn()}
      />
    )

    const controls = screen.getByRole('group', { name: 'Continuous reader controls' })
    expect(controls).toHaveClass('flex')

    expect(screen.getAllByRole('button').map((button) => button.textContent?.trim())).toEqual([
      'Mark read',
      'Play',
      'Next',
    ])
  })

  it('disables Mark read for a normal News Article', () => {
    render(
      <ContinuousReaderControls
        isPlaying={false}
        markReadDisabled
        onPlayPause={vi.fn()}
        onNext={vi.fn()}
      />
    )

    expect(screen.getByRole('button', { name: 'Mark read' })).toBeDisabled()
  })

  it('disables Play/Pause when canPlay is false', () => {
    render(
      <ContinuousReaderControls
        isPlaying={false}
        canPlay={false}
        onPlayPause={vi.fn()}
        onNext={vi.fn()}
        onMarkRead={vi.fn()}
      />
    )

    const playPause = document.querySelector('[data-reader-action="play-pause"]')
    expect(playPause).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Mark read' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()
  })

  it('keeps Play/Pause enabled by default when canPlay is omitted', () => {
    render(
      <ContinuousReaderControls
        isPlaying={false}
        onPlayPause={vi.fn()}
        onNext={vi.fn()}
        onMarkRead={vi.fn()}
      />
    )

    const playPause = document.querySelector('[data-reader-action="play-pause"]')
    expect(playPause).toBeEnabled()
  })

  it('renders an active Mark read action for Read All News', async () => {
    const user = userEvent.setup()
    const onMarkRead = vi.fn()

    render(
      <ContinuousReaderControls
        isPlaying={false}
        onPlayPause={vi.fn()}
        onNext={vi.fn()}
        onMarkRead={onMarkRead}
      />
    )

    const markRead = screen.getByRole('button', { name: 'Mark read' })
    expect(markRead).toBeEnabled()

    await user.click(markRead)
    expect(onMarkRead).toHaveBeenCalledOnce()
  })

  describe('engine fallback marker', () => {
    const REASON = 'reading with Edge: SPOCK did not answer'
    const playPause = () => document.querySelector('[data-reader-action="play-pause"]') as HTMLElement

    it('shows the Edge marker and reason while in engine fallback', () => {
      const { rerender } = render(
        <ContinuousReaderControls isPlaying engineFallback onPlayPause={vi.fn()} onNext={vi.fn()} />
      )

      const pause = screen.getByRole('button', { name: `Pause, ${REASON}` })
      expect(pause).toBe(playPause())
      expect(pause).toHaveAttribute('title', `Pause, ${REASON}`)
      const marker = within(pause).getByText('Edge')
      expect(marker).toHaveAttribute('data-reader-engine-marker')
      expect(marker.className).toMatch(/amber/)
      // Under the label: the label and the marker share a column wrapper.
      expect(marker.parentElement).toHaveClass('flex-col')
      expect(marker.previousSibling?.textContent).toBe('Pause')

      rerender(
        <ContinuousReaderControls
          isPlaying={false}
          engineFallback
          onPlayPause={vi.fn()}
          onNext={vi.fn()}
        />
      )
      const play = screen.getByRole('button', { name: `Play, ${REASON}` })
      expect(play).toHaveAttribute('title', `Play, ${REASON}`)
      expect(within(play).getByText('Edge')).toBeInTheDocument()
    })

    it('renders no marker and the plain name otherwise', () => {
      const { rerender } = render(
        <ContinuousReaderControls
          isPlaying
          engineFallback={false}
          onPlayPause={vi.fn()}
          onNext={vi.fn()}
        />
      )
      expect(screen.getByRole('button', { name: 'Pause' })).toBe(playPause())
      expect(playPause()).not.toHaveAttribute('title')
      expect(document.querySelector('[data-reader-engine-marker]')).toBeNull()
      expect(screen.queryByText('Edge')).toBeNull()

      // Omitted behaves like false.
      rerender(<ContinuousReaderControls isPlaying={false} onPlayPause={vi.fn()} onNext={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Play' })).toBe(playPause())
      expect(document.querySelector('[data-reader-engine-marker]')).toBeNull()
    })

    it('controls stay Mark read, Play/Pause and Next', () => {
      render(
        <ContinuousReaderControls
          isPlaying
          engineFallback
          onPlayPause={vi.fn()}
          onNext={vi.fn()}
          onMarkRead={vi.fn()}
        />
      )

      const group = screen.getByRole('group', { name: 'Continuous reader controls' })
      const buttons = within(group).getAllByRole('button')
      expect(buttons.map((b) => b.getAttribute('data-reader-action'))).toEqual([
        'mark-read',
        'play-pause',
        'next',
      ])
      expect(buttons.map((b) => b.getAttribute('aria-label'))).toEqual([
        'Mark read',
        `Pause, ${REASON}`,
        'Next',
      ])
    })
  })
})
