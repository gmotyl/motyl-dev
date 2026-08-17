import { describe, expect, it } from 'vitest'
import {
  prepareSpeechSections,
  prepareSpeechText,
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

describe('prepareSpeechText', () => {
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

  it('uses approved longest matching phonetic replacements without changing unknown words', () => {
    const source = 'AI i GPT 5.6 działają z React oraz Microsoft. Unknown AIx.'

    expect(prepareSpeechText(source)).toBe(
      'ej-aj i dżi-pi-ti 5.6 działają z reakt oraz mikrosoft. Unknown AIx.'
    )
    expect(source).toBe('AI i GPT 5.6 działają z React oraz Microsoft. Unknown AIx.')
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
})
