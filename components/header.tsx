'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Menu, X, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { UserMenu } from '@/components/user-menu'
import { SignInButton } from '@/components/sign-in-button'
import { DevSignInButton } from '@/components/dev-sign-in-button'
import { InstallPrompt } from '@/components/install-prompt'
import { cn } from '@/lib/utils'

const SUPPORT_URL = 'https://www.buymeacoffee.com/motyl.dev'

const NAV_LINKS = [
  { label: 'Trending', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'about', href: '/about' },
  { label: 'Newsletter', href: '/#newsletter' },
  { label: 'News', href: '/news?unseen=true' },
] as const

export default function Header() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    const path = href.split('#')[0] || '/'
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            motyl.dev
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="ml-8 hidden lg:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive(href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Support CTA */}
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{
              background: 'linear-gradient(135deg, #BD5FFF 0%, #9d3dff 100%)',
              boxShadow: '0 2px 10px rgba(189, 95, 255, 0.35)',
            }}
            aria-label="Support on Buy Me a Coffee"
          >
            <Coffee className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Support</span>
          </a>

          {/* Auth — desktop only */}
          <div className="hidden lg:flex items-center gap-2">
            <InstallPrompt />
            {status === 'loading' ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            ) : session ? (
              <UserMenu user={session.user} />
            ) : (
              <>
                <DevSignInButton />
                <SignInButton />
              </>
            )}
          </div>

          {/* Hamburger — shown below lg */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu — slide down */}
      {mounted && (
        <div
          id="mobile-menu"
          {...(!mobileOpen ? { inert: true } : {})}
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border/40',
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav
            className="flex flex-col gap-1 px-4 py-3"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isActive(href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {label}
              </Link>
            ))}
            {session && (
              <Link
                href="/bookmarks"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                My Bookmarks
              </Link>
            )}

            {/* Support CTA in mobile */}
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              style={{
                background: 'linear-gradient(135deg, #BD5FFF 0%, #9d3dff 100%)',
              }}
              aria-label="Support on Buy Me a Coffee"
            >
              <Coffee className="h-3.5 w-3.5" aria-hidden="true" />
              <span>☕ Support</span>
            </a>

            {/* Auth in mobile */}
            <div className="mt-2 pt-3 border-t border-border/40 flex flex-col gap-2">
              <InstallPrompt />
              {status === 'loading' ? (
                <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
              ) : session ? (
                <div className="flex items-center gap-3">
                  <UserMenu user={session.user} />
                  <span className="text-sm">{session.user.name}</span>
                </div>
              ) : (
                <>
                  <DevSignInButton />
                  <SignInButton />
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
