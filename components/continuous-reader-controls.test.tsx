import { render, screen } from '@testing-library/react'
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
})
