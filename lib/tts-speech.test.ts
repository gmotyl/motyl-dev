import { describe, expect, it } from 'vitest'
import {
  normalizeVersionNumbers,
  prepareSpeechSections,
  prepareSpeechText,
  replaceWholeWordMappings,
  splitReviewedSections,
} from './tts-speech'

describe('splitReviewedSections', () => {
  it('splits consecutive reviewed sections in source order', () => {
    const sections = splitReviewedSections([
      {
        slug: 'first-news',
        title: 'Pierwszy przegląd wiadomości',
        content: `Wstęp.

## Pierwszy temat
Treść pierwszego tematu.

## Drugi temat
Treść drugiego tematu.`,
      },
      {
        slug: 'second-news',
        title: 'Drugi przegląd wiadomości',
        content: `## Trzeci temat
Treść trzeciego tematu.`,
      },
    ])

    expect(sections.map((section) => section.title)).toEqual([
      'Pierwszy temat',
      'Drugi temat',
      'Trzeci temat',
    ])
    expect(sections.map((section) => section.sourceSlug)).toEqual([
      'first-news',
      'first-news',
      'second-news',
    ])
  })

  it('includes the source title only for the first section in a file', () => {
    const sections = splitReviewedSections([
      {
        slug: 'news',
        title: 'Źródłowy tytuł',
        content: `## Pierwszy temat
Pierwsza treść.

## Drugi temat
Druga treść.`,
      },
    ])

    expect(sections.map((section) => section.sourceTitle)).toEqual([
      'Źródłowy tytuł',
      undefined,
    ])
  })
})

describe('normalizeVersionNumbers', () => {
  it('normalizeVersionNumbers reads 3.6.3 as space-separated numbers', () => {
    expect(normalizeVersionNumbers('3.6.3')).toBe('3 6 3')
    expect(normalizeVersionNumbers('10.6.3')).toBe('10 6 3')
  })

  it('normalizeVersionNumbers handles four-part versions', () => {
    expect(normalizeVersionNumbers('1.2.3.4')).toBe('1 2 3 4')
  })

  it('normalizeVersionNumbers now normalizes two-part version numbers', () => {
    expect(normalizeVersionNumbers('5.6')).toBe('5 6')
    expect(normalizeVersionNumbers('16.3')).toBe('16 3')
    expect(normalizeVersionNumbers('Next.js 16.3')).toBe('Next.js 16 3')
  })

  it('normalizeVersionNumbers allows groups up to five digits', () => {
    expect(normalizeVersionNumbers('12345.6')).toBe('12345 6')
  })

  it('normalizeVersionNumbers leaves numbers with a 6+ digit group unchanged', () => {
    expect(normalizeVersionNumbers('123456.7')).toBe('123456.7')
  })

  it('normalizeVersionNumbers leaves comma decimals and plain integers unchanged', () => {
    expect(normalizeVersionNumbers('42')).toBe('42')
    expect(normalizeVersionNumbers('3,14')).toBe('3,14')
    expect(normalizeVersionNumbers('Wersja 3,14 liczby')).toBe('Wersja 3,14 liczby')
  })
})

describe('prepareSpeechText', () => {
  it('prepareSpeechText normalizes semver version numbers', () => {
    expect(prepareSpeechText('Wersja 3.6.3 wychodzi')).toContain('3 6 3')
  })

  it('prepareSpeechText normalizes two-part version numbers in prose', () => {
    expect(prepareSpeechText('GPT 5.6 jest')).toContain('5 6')
  })


  it('prepares spoken text without tags Markdown syntax or URL destinations', () => {
    const source = `---
title: Ukryty tytuł
hashtags: "#pl #ai"
---
# Widoczny tytuł

## Najważniejsze wieści

**Opis** z [ważnym linkiem](https://example.com/news) i \`kodem\`.

- Pierwszy punkt
- Drugi punkt

#pl #ai`

    expect(prepareSpeechText(source)).toBe(
      'Widoczny tytuł Najważniejsze wieści Opis z ważnym linkiem i kodem. Pierwszy punkt Drugi punkt'
    )
  })

  it('keeps reference-link labels while removing definitions and destinations', () => {
    const source = `Read [the guide][guide] and [the endpoint][api].

[guide]: https://example.com/guide "Guide"
[api]: <https://example.com/api> (API docs)`

    expect(prepareSpeechText(source)).toBe('Read the guide and the endpoint.')
  })

  it('keeps sentence punctuation after stripped URL destinations', () => {
    expect(prepareSpeechText('Visit https://example.com/news. Then continue.')).toBe(
      'Visit . Then continue.'
    )
  })

  it('uses approved longest matching phonetic replacements without changing unknown words', () => {
    const source = 'AI i GPT 5.6 działają z React oraz Microsoft. Unknown AIx.'

    expect(prepareSpeechText(source)).toBe(
      'ej-aj i dżi-pi-ti 5 6 działają z reakt oraz mikrosoft. Unknown AIx.'
    )
    expect(source).toBe('AI i GPT 5.6 działają z React oraz Microsoft. Unknown AIx.')
  })

  it('replaces overlapping mappings longest-first and transforms each match once', () => {
    expect(
      replaceWholeWordMappings('React Native oraz React.', {
        React: 'R',
        'React Native': 'React',
      })
    ).toBe('React oraz R.')
  })

  it('applies inflection-aware pronunciation for English stems', () => {
    expect(prepareSpeechText('Nowe benchmarki Reacta')).toBe('Nowe benczmarki reakta')
  })
})

describe('prepareSpeechSections', () => {
  it('prepares each split section while keeping the source title on the first item', () => {
    const sections = prepareSpeechSections([
      {
        slug: 'news',
        title: 'Dzisiejsze wiadomości',
        content: `## AI w praktyce
AI pomaga.

## React rośnie
React działa.`,
      },
    ])

    expect(sections.map((section) => section.speechText)).toEqual([
      'Dzisiejsze wiadomości ej-aj w praktyce ej-aj pomaga.',
      'reakt rośnie reakt działa.',
    ])
  })

  it('splits sections with Windows line endings', () => {
    const sections = splitReviewedSections([{
      slug: 'news',
      title: 'Wiadomości',
      content: '## Pierwszy temat\r\nTreść.\r\n\r\n## Drugi temat\r\nDalsza treść.',
    }])

    expect(sections.map((section) => section.title)).toEqual(['Pierwszy temat', 'Drugi temat'])
  })
})
