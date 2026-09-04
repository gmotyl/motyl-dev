import { createElement } from 'react'
import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MarkdownContent } from '@/components/markdown-content'
import { ItemType } from '@/lib/content/types'
import { resolveScrollTarget } from '@/lib/reader/scroll-target'
import { headingToId } from '@/lib/content/heading-slug'
import type { SpeechSection } from '@/lib/tts/speech'

const section = (over: Partial<SpeechSection>): SpeechSection => ({
  sourceSlug: 'digest',
  sourceTitle: 'Digest',
  title: 'Section',
  markdown: '',
  ordinal: 0,
  startLine: 1,
  speechText: '',
  key: 'digest#0',
  ...over,
})

// A two-section digest article, each section carrying a bottom source link tagged
// with data-section-link = its heading id (mirrors what markdown-content renders).
const buildArticle = (): HTMLElement => {
  const idA = headingToId('Preline 5.0')
  const idB = headingToId('Port Menu')
  const el = document.createElement('div')
  el.innerHTML = `
    <article data-reader-article="digest">
      <div><a href="/news/digest"><h2>Tailwind Weekly</h2></a></div>
      <h2 id="${idA}">Preline 5.0</h2>
      <div><button data-line="5">▶</button><p>Preline body.</p></div>
      <span data-section-link="${idA}"><a href="https://preline.co">Preline docs</a></span>
      <h2 id="${idB}">Port Menu</h2>
      <div><button data-line="9">▶</button><p>Port Menu body.</p></div>
      <span data-section-link="${idB}"><a href="https://portmenu.dev">Port Menu</a></span>
    </article>`
  return el.querySelector('article') as HTMLElement
}

const sections = [
  section({ title: 'Preline 5.0', ordinal: 0, key: 'digest#0' }),
  section({ title: 'Port Menu', ordinal: 1, key: 'digest#1' }),
]

describe('resolveScrollTarget', () => {
  it('{ link } → the section source link box (data-section-link), not the heading', () => {
    const article = buildArticle()
    const target = resolveScrollTarget(article, sections, sections[0], 0, { link: true })

    expect(target?.tagName).toBe('SPAN')
    expect(target?.getAttribute('data-section-link')).toBe(headingToId('Preline 5.0'))
  })

  it('{ link } resolves the correct section among several', () => {
    const article = buildArticle()
    const target = resolveScrollTarget(article, sections, sections[1], 1, { link: true })

    expect(target?.getAttribute('data-section-link')).toBe(headingToId('Port Menu'))
  })

  it('{ link } falls back to the heading when the section has no source link', () => {
    const article = buildArticle()
    // Remove Preline's source link.
    article.querySelector(`[data-section-link="${headingToId('Preline 5.0')}"]`)?.remove()

    const target = resolveScrollTarget(article, sections, sections[0], 0, { link: true })
    expect(target?.tagName).toBe('H2')
    expect(target?.id).toBe(headingToId('Preline 5.0'))
  })

  it('{ line } → the clicked paragraph wrapper', () => {
    const article = buildArticle()
    const target = resolveScrollTarget(article, sections, sections[0], 0, { line: 5 })

    // The wrapper div of the [data-line] button.
    expect(target?.tagName).toBe('DIV')
    expect(target?.querySelector('[data-line="5"]')).not.toBeNull()
  })

  it('no hint → the section heading', () => {
    const article = buildArticle()
    const target = resolveScrollTarget(article, sections, sections[1], 1)

    expect(target?.tagName).toBe('H2')
    expect(target?.id).toBe(headingToId('Port Menu'))
  })
})

// Integration: run the resolver against the REAL DOM that MarkdownContent renders
// for a digest, to prove data-section-link lines up with the section headings the
// resolver matches — the gap the synthetic DOM above cannot cover.
describe('resolveScrollTarget over real MarkdownContent DOM', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ text: () => Promise.resolve('') })))
  })
  afterEach(() => vi.unstubAllGlobals())

  const digest = [
    '## Preline 5.0',
    '',
    'Preline body paragraph.',
    '',
    '**Link:** [Preline docs](https://preline.co)',
    '',
    '## Port Menu',
    '',
    'Port Menu body paragraph.',
    '',
    '**Link:** [Port Menu](https://portmenu.dev)',
  ].join('\n')

  it('{ link } resolves each section to its own source link', () => {
    const { container } = render(
      createElement(MarkdownContent, {
        content: digest,
        itemType: ItemType.News,
        reader: { onPlayFromHere: vi.fn(), onPlayFromLine: vi.fn(), currentSectionId: null },
      }),
    )

    const first = resolveScrollTarget(container, sections, sections[0], 0, { link: true })
    expect(first?.getAttribute('data-section-link')).toBe(headingToId('Preline 5.0'))
    expect(first?.textContent).toContain('Preline docs')

    const second = resolveScrollTarget(container, sections, sections[1], 1, { link: true })
    expect(second?.getAttribute('data-section-link')).toBe(headingToId('Port Menu'))
    expect(second?.textContent).toContain('Port Menu')
  })
})
