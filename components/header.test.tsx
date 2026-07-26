import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'

const mockUseSession = vi.fn()
vi.mock('next-auth/react', () => ({ useSession: () => mockUseSession() }))
vi.mock('next/navigation', () => ({ usePathname: () => '/' }))
vi.mock('@/components/user-menu', () => ({ UserMenu: () => null }))
vi.mock('@/components/sign-in-button', () => ({ SignInButton: () => null }))
vi.mock('@/components/dev-sign-in-button', () => ({ DevSignInButton: () => null }))
vi.mock('@/components/install-prompt', () => ({ InstallPrompt: () => null }))

import Header from './header'

describe('Header — Trending link is SuperAdmin-only and present on both surfaces', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders Trending in the desktop nav and in the mobile menu for SuperAdmins', () => {
    mockUseSession.mockReturnValue({ data: { user: { isSuperAdmin: true } }, status: 'authenticated' })
    render(<Header />)

    const desktop = screen.getByRole('navigation', { name: 'Main navigation' })
    const mobile = screen.getByRole('navigation', { name: 'Mobile navigation' })

    expect(within(desktop).getByRole('link', { name: 'Trending' })).toHaveAttribute('href', '/trending')
    expect(within(mobile).getByRole('link', { name: 'Trending' })).toHaveAttribute('href', '/trending')
  })

  it('renders no Trending link for non-SuperAdmins', () => {
    mockUseSession.mockReturnValue({ data: { user: { isSuperAdmin: false } }, status: 'authenticated' })
    render(<Header />)

    expect(screen.queryByRole('link', { name: 'Trending' })).not.toBeInTheDocument()
  })
})
