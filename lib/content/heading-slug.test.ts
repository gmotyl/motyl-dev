import { describe, expect, it } from 'vitest'
import GithubSlugger from 'github-slugger'
import { headingToId } from '@/lib/content/heading-slug'

describe('headingToId', () => {
  it('headingToId lowercases, trims, and hyphenates a simple heading', () => {
    expect(headingToId('Why It Matters')).toBe('why-it-matters')
    expect(headingToId('Hello World')).toBe('hello-world')

    // Stateless: repeated calls never drift into github-slugger's -1/-2 dedup suffixes
    expect(headingToId('Why It Matters')).toBe('why-it-matters')
    expect(headingToId('Why It Matters')).toBe('why-it-matters')
  })

  it('headingToId matches github-slugger output for punctuation and dot-separated names', () => {
    const title = "Node.js & AI: What's Next?"
    expect(headingToId(title)).toBe('nodejs--ai-whats-next')
    expect(headingToId(title)).toBe(new GithubSlugger().slug(title))
  })

  it('headingToId strips symbols the same way github-slugger does', () => {
    const title = 'C++ / Rust @ Scale!'
    expect(headingToId(title)).toBe('c--rust--scale')
    expect(headingToId(title)).toBe(new GithubSlugger().slug(title))
  })
})
