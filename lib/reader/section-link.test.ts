import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { describe, expect, it } from 'vitest'
import { firstExternalLink } from './section-link'

/**
 * Every href react-markdown hands the `a` renderer, configured with the same
 * plugins as `<MarkdownContent>`, in document order.
 */
function renderedHrefs(markdown: string): string[] {
  const hrefs: string[] = []
  renderToStaticMarkup(
    createElement(ReactMarkdown, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
      components: {
        a: ({ href }) => {
          hrefs.push(href ?? '')
          return null
        },
      },
      children: markdown,
    }),
  )
  return hrefs
}

const firstRenderedExternal = (markdown: string) =>
  renderedHrefs(markdown).find((h) => h.startsWith('http://') || h.startsWith('https://')) ?? null

describe('firstExternalLink', () => {
  it('returns the only external link', () => {
    const md = 'Nowy model trafił do API. [Ogłoszenie](https://example.com/post) zawiera szczegóły.'
    expect(firstExternalLink(md)).toEqual({ url: 'https://example.com/post', title: 'Ogłoszenie' })
  })

  it('returns the first of several external links', () => {
    const md = [
      'Wstęp z [linkiem](http://first.example/a).',
      '',
      '- [Drugi](https://second.example/b)',
    ].join('\n')
    expect(firstExternalLink(md)).toEqual({ url: 'http://first.example/a', title: 'linkiem' })
  })

  it('skips relative, anchor and mailto links', () => {
    const md = [
      '[Relatywny](/news/2026-10-02)',
      '[Kotwica](#sekcja)',
      '[Mail](mailto:a@b.pl)',
      '![Obrazek](https://cdn.example/img.png)',
      '[Właściwy](https://example.com/real)',
    ].join(' ')
    expect(firstExternalLink(md)).toEqual({ url: 'https://example.com/real', title: 'Właściwy' })
    expect(firstExternalLink('[a](/x) [b](#y) [c](mailto:z@z.pl)')).toBeNull()
  })

  it('returns null without a link', () => {
    expect(firstExternalLink('')).toBeNull()
    expect(firstExternalLink('Sam tekst bez adresu, tylko `https://example.com` w kodzie.')).toBeNull()
    expect(firstExternalLink('Tylko obrazek ![alt](https://cdn.example/x.png)')).toBeNull()
  })

  it('strips inline markdown from the link text', () => {
    expect(firstExternalLink('[**Gruby** i `kod`](https://example.com/x)')).toEqual({
      url: 'https://example.com/x',
      title: 'Gruby i kod',
    })
  })

  it('handles a link title and balanced parentheses in the URL', () => {
    expect(firstExternalLink('[Wiki](https://en.wikipedia.org/wiki/Foo_(bar) "Tytuł")')).toEqual({
      url: 'https://en.wikipedia.org/wiki/Foo_(bar)',
      title: 'Wiki',
    })
    expect(firstExternalLink('[Ostre](<https://example.com/a b>)')).toEqual({
      url: 'https://example.com/a%20b',
      title: 'Ostre',
    })
    expect(firstExternalLink('[Ostre](<https://example.com/ab>)')).toEqual({
      url: 'https://example.com/ab',
      title: 'Ostre',
    })
  })

  it('falls back to the URL when the link text is empty after stripping', () => {
    expect(firstExternalLink('[](https://example.com/x)')).toEqual({
      url: 'https://example.com/x',
      title: 'https://example.com/x',
    })
  })

  it('treats a bare URL (GFM autolink literal) as a link', () => {
    expect(firstExternalLink('**Link:** https://example.com/post')).toEqual({
      url: 'https://example.com/post',
      title: 'https://example.com/post',
    })
  })

  it('decodes HTML entities in the URL', () => {
    expect(firstExternalLink('[Q](https://example.com/?a=1&amp;b=2)')?.url).toBe('https://example.com/?a=1&b=2')
  })

  it('percent-encodes non-ASCII and unsafe characters like the renderer', () => {
    expect(firstExternalLink('[Ł](https://example.com/żółw|x)')?.url).toBe(
      'https://example.com/%C5%BC%C3%B3%C5%82w%7Cx',
    )
  })

  it('ignores links inside inline and fenced code', () => {
    const md = ['`[a](https://code.example/a)`', '', '```', '[b](https://code.example/b)', '```', '', '[c](https://real.example/c)'].join('\n')
    expect(firstExternalLink(md)?.url).toBe('https://real.example/c')
  })

  it('resolves reference-style links', () => {
    expect(firstExternalLink('Zobacz [artykuł][ref].\n\n[ref]: https://example.com/ref')).toEqual({
      url: 'https://example.com/ref',
      title: 'artykuł',
    })
  })

  it('rejects an uppercase scheme like the inline renderer does', () => {
    expect(firstExternalLink('[Duże](HTTPS://example.com/x)')).toBeNull()
  })

  it('matches the href the renderer gives the inline VoteButton', () => {
    const cases = [
      '**Link:** https://example.com/post',
      '[Q](https://example.com/?a=1&amp;b=2)',
      '[Ł](https://example.com/żółw|x "t")',
      '[Esc](https://example.com/a\\)b)',
      '[Ostre](<https://example.com/a b>)',
      '`[x](https://code.example)` then [y][r]\n\n[r]: https://example.com/ref',
      '![img](https://cdn.example/i.png) [Wiki](https://en.wikipedia.org/wiki/Foo_(bar))',
      'www.example.com/autolink i [x](https://late.example)',
      '[Mail](mailto:a@b.pl) <https://angle.example/x?y="z">',
      '[Duże](HTTPS://example.com/x)',
    ]
    for (const md of cases) {
      expect(firstExternalLink(md)?.url ?? null, md).toBe(firstRenderedExternal(md))
    }
  })
})
