import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ReaderControlBar } from './reader-control-bar'

describe('ReaderControlBar', () => {
  it('renders forwarded reader controls with a Play control', async () => {
    const onPlayPause = vi.fn()
    const onNext = vi.fn()
    const onMarkRead = vi.fn()

    render(
      <ReaderControlBar
        isPlaying={false}
        isBuffering={false}
        markReadDisabled={false}
        canPlay
        canNext
        onPlayPause={onPlayPause}
        onNext={onNext}
        onMarkRead={onMarkRead}
      />
    )

    const playPause = screen.getByRole('button', { name: 'Play' })
    expect(playPause).toHaveAttribute('data-reader-action', 'play-pause')

    await userEvent.click(playPause)
    expect(onPlayPause).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(onNext).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByRole('button', { name: 'Mark read' }))
    expect(onMarkRead).toHaveBeenCalledTimes(1)
  })

  it('wrapper is the floating panel (data-reader-floating, fixed bottom on mobile, floating pill on desktop)', () => {
    const { container } = render(
      <ReaderControlBar isPlaying={false} onPlayPause={vi.fn()} onNext={vi.fn()} />
    )

    const wrapper = container.querySelector('[data-reader-floating]')
    expect(wrapper).not.toBeNull()
    expect(wrapper).toHaveClass('fixed', 'bottom-16', 'sm:bottom-6', 'sm:right-4')
  })
})
