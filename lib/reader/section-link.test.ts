import { describe, expect, it } from 'vitest'
import { firstExternalLink } from './section-link'

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
    expect(firstExternalLink('Sam tekst z adresem https://example.com bez nawiasów.')).toBeNull()
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
    expect(firstExternalLink('[Ostre](<https://example.com/a b>)')).toBeNull()
    expect(firstExternalLink('[Ostre](<https://example.com/ab>)')).toEqual({
      url: 'https://example.com/ab',
      title: 'Ostre',
    })
  })

  it('falls back to the URL when the link text is empty after stripping', () => {
    expect(firstExternalLink('[**](https://example.com/x)')).toEqual({
      url: 'https://example.com/x',
      title: 'https://example.com/x',
    })
  })
})
