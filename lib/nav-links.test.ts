import { describe, it, expect } from 'vitest'
import { getVisibleNavLinks } from './nav-links'

describe('getVisibleNavLinks', () => {
  it('hides the News link for non-SuperAdmins', () => {
    const links = getVisibleNavLinks(false)
    expect(links.some(l => l.label === 'News')).toBe(false)
    expect(links.some(l => l.href === '/newsletter')).toBe(true)
  })

  it('shows the News link for SuperAdmins', () => {
    const links = getVisibleNavLinks(true)
    expect(links.some(l => l.label === 'News')).toBe(true)
  })

  it('hides the Trending link for non-SuperAdmins', () => {
    const links = getVisibleNavLinks(false)
    expect(links.some(l => l.href === '/trending')).toBe(false)
  })

  it('shows the Trending link for SuperAdmins', () => {
    const links = getVisibleNavLinks(true)
    expect(links.some(l => l.label === 'Trending' && l.href === '/trending')).toBe(true)
  })
})
