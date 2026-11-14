import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/components/header', () => ({ default: () => null }))
vi.mock('@/components/footer', () => ({ default: () => null }))

import UnsubscribePage from './page'

describe('/unsubscribe page', () => {
  it('unsubscribe page has no email form', () => {
    const { container } = render(<UnsubscribePage />)

    expect(container.querySelector('input[type="email"]')).toBeNull()
    expect(container.querySelector('form')).toBeNull()
    expect(screen.getByRole('heading', { name: 'Unsubscribe' })).toBeInTheDocument()
    expect(container.textContent).toMatch(/Unsubscribe link at the bottom of (every|any) issue/i)
    expect(container.textContent).toMatch(/immediately/i)
  })
})
