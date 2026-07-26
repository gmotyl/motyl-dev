import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/components/header', () => ({ default: () => <div data-testid="header" /> }))
vi.mock('@/components/footer', () => ({ default: () => <div data-testid="footer" /> }))

import DigestLayout from './layout'

describe('DigestLayout', () => {
  it('wraps children in the shared chrome', () => {
    render(<DigestLayout><p>page body</p></DigestLayout>)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByText('page body')).toBeInTheDocument()
  })
})
