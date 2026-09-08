import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'

const mockPathname = vi.fn(() => '/')
vi.mock('next/navigation', () => ({ usePathname: () => mockPathname() }))

import { BottomNav } from './bottom-nav'

// NOTE ON SCOPE: these assert the *markup*, not a hydration mismatch. React's
// hydration check compares `domElement.getAttribute("style")` byte-for-byte
// against its own serialization of the style prop, and jsdom — like Chrome and
// Firefox — hands back that attribute verbatim, so the mismatch cannot be
// provoked here. What is testable, and what actually regressed, is that the
// safe-area padding is a class rather than an inline style: with no style
// attribute in the server HTML there is nothing for React to diff.
describe('BottomNav — safe-area padding stays out of the inline style', () => {
  it('carries the safe-area padding as a utility class with a 0px fallback', () => {
    render(<BottomNav />)

    expect(screen.getByRole('navigation')).toHaveClass(
      'pb-[env(safe-area-inset-bottom,0px)]'
    )
  })

  it('emits no inline style attribute on the nav in the server HTML', () => {
    const html = renderToStaticMarkup(<BottomNav />)

    const navTag = html.slice(0, html.indexOf('>') + 1)
    expect(navTag).toContain('<nav')
    expect(navTag).not.toContain('style=')
    expect(html).not.toContain('padding-bottom')
  })

  it('still positions the sliding indicator from the active pathname', () => {
    mockPathname.mockReturnValue('/articles')
    const { container } = render(<BottomNav />)

    // Third of four tabs -> 50% + 12.5% = 62.5% of the bar, minus half its width.
    expect(container.querySelector('nav > div')).toHaveStyle({
      left: 'calc(62.5% - 16px)',
    })
  })
})
