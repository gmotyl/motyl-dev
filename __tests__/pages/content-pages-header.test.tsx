import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/header'

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/articles',
}))

// Mock window.matchMedia for use-mobile hook
beforeEach(() => {
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

    // Check for navigation links in the desktop nav (use exact text to avoid regex collisions)
    expect(screen.getByRole('link', { name: 'About Me' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Newsletter' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'News' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Articles' })).toBeInTheDocument()
  })

  it('renders correct hrefs for navigation links', () => {
    render(<Header />)

    const aboutLink = screen.getByRole('link', { name: 'About Me' })
    const newsletterLink = screen.getByRole('link', { name: 'Newsletter' })
    const newsLink = screen.getByRole('link', { name: 'News' })
    const articlesLink = screen.getByRole('link', { name: 'Articles' })

    expect(aboutLink).toHaveAttribute('href', '/#about')
    expect(newsletterLink).toHaveAttribute('href', '/#newsletter')
    expect(newsLink).toHaveAttribute('href', '/news?unseen=true')
    expect(articlesLink).toHaveAttribute('href', '/articles')
  })

  it('shows "motyl.dev" text in header', () => {
    render(<Header />)
    expect(screen.getByText('motyl.dev')).toBeInTheDocument()
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
