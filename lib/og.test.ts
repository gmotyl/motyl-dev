import { describe, it, expect } from 'vitest'
import { getContentCategory, getOgImage } from './og'

describe('getContentCategory', () => {
  it('returns "ai" for AI-related hashtags', () => {
    expect(getContentCategory(['ai', 'tools'])).toBe('ai')
    expect(getContentCategory(['LLM'])).toBe('ai')
    expect(getContentCategory(['Claude'])).toBe('ai')
    expect(getContentCategory(['mcp'])).toBe('ai')
  })

  it('returns "frontend" for frontend hashtags', () => {
    expect(getContentCategory(['css', 'animation'])).toBe('frontend')
    expect(getContentCategory(['Frontend'])).toBe('frontend')
    expect(getContentCategory(['tailwind'])).toBe('frontend')
  })

  it('returns "coding" for programming hashtags', () => {
    expect(getContentCategory(['react'])).toBe('coding')
    expect(getContentCategory(['TypeScript'])).toBe('coding')
    expect(getContentCategory(['nextjs'])).toBe('coding')
  })

  it('returns "tools" for tooling hashtags', () => {
    expect(getContentCategory(['vscode'])).toBe('tools')
    expect(getContentCategory(['devtools'])).toBe('tools')
    expect(getContentCategory(['github'])).toBe('tools')
  })

  it('returns "productivity" for career/workflow hashtags', () => {
    expect(getContentCategory(['productivity'])).toBe('productivity')
    expect(getContentCategory(['career'])).toBe('productivity')
    expect(getContentCategory(['automation'])).toBe('productivity')
  })

  it('returns "architecture" for backend/infra hashtags', () => {
    expect(getContentCategory(['architecture'])).toBe('architecture')
    expect(getContentCategory(['devops'])).toBe('architecture')
    expect(getContentCategory(['cloud'])).toBe('architecture')
  })

  it('returns "general" when no hashtags match', () => {
    expect(getContentCategory(['random', 'stuff'])).toBe('general')
    expect(getContentCategory([])).toBe('general')
  })

  it('normalizes hashtags with # prefix', () => {
    expect(getContentCategory(['#ai'])).toBe('ai')
    expect(getContentCategory(['#React'])).toBe('coding')
  })

  it('is case-insensitive', () => {
    expect(getContentCategory(['AI'])).toBe('ai')
    expect(getContentCategory(['CSS'])).toBe('frontend')
    expect(getContentCategory(['VSCODE'])).toBe('tools')
  })

  it('majority wins over first-match', () => {
    // 3 architecture hashtags vs 1 tools hashtag → architecture wins
    expect(getContentCategory(['architecture', 'microservices', 'cloud', 'tools'])).toBe('architecture')
  })

  it('breaks ties using priority order', () => {
    // 1 frontend vs 1 coding → frontend is higher priority
    expect(getContentCategory(['react', 'css'])).toBe('frontend')
    // 1 ai vs 1 tools → ai is higher priority
    expect(getContentCategory(['ai', 'vscode'])).toBe('ai')
  })

  it('single hashtag still works', () => {
    expect(getContentCategory(['frontend'])).toBe('frontend')
    expect(getContentCategory(['react'])).toBe('coding')
  })
})

describe('getOgImage', () => {
  it('returns article image if present', () => {
    const article = { image: 'https://example.com/img.jpg', hashtags: ['ai'] }
    expect(getOgImage(article)).toBe('https://example.com/img.jpg')
  })

  it('returns category OG image when no article image', () => {
    const article = { hashtags: ['ai'] }
    expect(getOgImage(article)).toBe('https://img.motyl.dev/og/categories/og-ai.jpg')
  })

  it('returns category image for different categories', () => {
    expect(getOgImage({ hashtags: ['css'] })).toBe('https://img.motyl.dev/og/categories/og-frontend.jpg')
    expect(getOgImage({ hashtags: ['react'] })).toBe('https://img.motyl.dev/og/categories/og-coding.jpg')
    expect(getOgImage({ hashtags: ['vscode'] })).toBe('https://img.motyl.dev/og/categories/og-tools.jpg')
    expect(getOgImage({ hashtags: ['productivity'] })).toBe('https://img.motyl.dev/og/categories/og-productivity.jpg')
    expect(getOgImage({ hashtags: ['architecture'] })).toBe('https://img.motyl.dev/og/categories/og-architecture.jpg')
  })

  it('returns generic fallback when no image and no category match', () => {
    const article = { hashtags: ['unknown'] }
    expect(getOgImage(article)).toBe('https://img.motyl.dev/greg-stanczyk.jpg')
  })

  it('returns generic fallback for empty hashtags', () => {
    expect(getOgImage({ hashtags: [] })).toBe('https://img.motyl.dev/greg-stanczyk.jpg')
  })

  it('prefers article image over category image', () => {
    const article = { image: 'https://custom.com/hero.png', hashtags: ['ai'] }
    expect(getOgImage(article)).toBe('https://custom.com/hero.png')
  })
})
