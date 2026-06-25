import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/header'

// Mock next-auth/react with a controllable function
const mockUseSession = vi.fn(() => ({ data: null, status: 'unauthenticated' }))
vi.mock('next-auth/react', () => ({
  useSession: () => mockUseSession(),
  signOut: vi.fn(),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/articles',
}))

// Mock window.matchMedia for use-mobile hook
beforeEach(() => {
  mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated' })
  vi.stubGlobal('BeforeInstallPromptEvent', undefined)

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

describe('Header component on content pages', () => {
  it('renders the header element', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Header />)

    // Both desktop and mobile menus render the same links; use getAllByRole since
    // jsdom does not implement the inert attribute (which hides the mobile copies).
    expect(screen.getAllByRole('link', { name: 'About' })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Blog' })[0]).toBeInTheDocument()
    // News is superAdminOnly — must be absent for unauthenticated users
    expect(screen.queryByRole('link', { name: 'News' })).toBeNull()
  })

  it('renders correct hrefs for navigation links', () => {
    render(<Header />)

    const aboutLink = screen.getAllByRole('link', { name: 'About' })[0]
    const blogLink = screen.getAllByRole('link', { name: 'Blog' })[0]

    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(blogLink).toHaveAttribute('href', '/articles')
    // News link is not rendered for unauthenticated users
  })

  it('shows "motyl.dev" text in header', () => {
    render(<Header />)
    expect(screen.getByText('motyl.dev')).toBeInTheDocument()
  })

  it('shows the News link with correct href for SuperAdmins', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          isSuperAdmin: true,
          name: 'Admin',
          email: 'admin@example.com',
          image: null,
        },
      },
      status: 'authenticated',
    })
    render(<Header />)
    const newsLink = screen.getAllByRole('link', { name: 'News' })[0]
    expect(newsLink).toHaveAttribute('href', '/news?unseen=true')
  })
})

describe('Header on articles page', () => {
  it('provides navigation back to home via logo link', () => {
    render(<Header />)
    const logoLink = screen.getByRole('link', { name: /motyl\.dev/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })
})

describe('Header on news page', () => {
  beforeEach(() => {
    vi.doMock('next/navigation', () => ({
      usePathname: () => '/news',
    }))
  })

  it('renders header with navigation', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
