import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SectionPlayFromHere } from './section-play-from-here'

describe('SectionPlayFromHere', () => {
  it('renders a 56px Play from here control for a reviewed heading', () => {
    render(
      <SectionPlayFromHere
        sectionIndex={2}
        onPlayFromHere={vi.fn()}
      />
    )

    const button = screen.getByRole('button', { name: 'Play from here' })
    expect(button).toHaveClass('w-full', 'min-h-[56px]')
  })

  it('starts the selected queue item from the direct control', async () => {
    const user = userEvent.setup()
    const onPlayFromHere = vi.fn()

    render(
      <SectionPlayFromHere
        sectionIndex={2}
        onPlayFromHere={onPlayFromHere}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Play from here' }))

    expect(onPlayFromHere).toHaveBeenCalledWith(2)
  })
})
