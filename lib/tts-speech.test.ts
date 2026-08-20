import { describe, expect, it } from 'vitest'
import {
  applyPronunciation,
  normalizeVersionNumbers,
  prepareSpeechSections,
  prepareSpeechText,
  replaceWholeWordMappings,
  splitIntoSpeechUnits,
  splitReviewedSections,
  type SpeechSection,
} from './tts-speech'
import { ACRONYM_MAP } from './tts-pronunciation'

// Assert against the map's own values so ear-tuning the spellings never breaks
// these behavioral tests.
describe('applyPronunciation — whole-word acronyms (ACRONYM_MAP)', () => {
  it('replaces a standalone acronym with its mapped spelling', () => {
    expect(applyPronunciation('Użyj CLI do tego')).toBe(`Użyj ${ACRONYM_MAP.cli} do tego`)
    expect(applyPronunciation('nowe API i GPU')).toContain(ACRONYM_MAP.api)
    expect(applyPronunciation('nowe API i GPU')).toContain(ACRONYM_MAP.gpu)
  })

  it('handles multi-token acronyms containing a slash (CI/CD)', () => {
    expect(applyPronunciation('nasz CI/CD tutaj')).toBe(
      `nasz ${ACRONYM_MAP['ci/cd']} tutaj`
    )
  })

  it('does NOT corrupt normal words that start with an acronym (client/click)', () => {
    const out = applyPronunciation('client kliknął, potem click i clipboard')
    expect(out).toContain('client')
    expect(out).toContain('click')
    expect(out).toContain('clipboard')
    expect(out).not.toContain(ACRONYM_MAP.cli)
  })

  it('handles a trailing plural s but not a longer suffix', () => {
    expect(applyPronunciation('mamy dwa GPUs')).toBe(`mamy dwa ${ACRONYM_MAP.gpu}s`)
    // Not a standalone word (Polish diacritic follows) → left untouched.
    expect(applyPronunciation('CLIą')).toBe('CLIą')
  })

  it('word-style acronym (JSON) uses its mapped token', () => {
    expect(applyPronunciation('zwraca JSON')).toBe(`zwraca ${ACRONYM_MAP.json}`)
  })

  it('is case-insensitive', () => {
    expect(applyPronunciation('cli i Cli i CLI')).toBe(
      `${ACRONYM_MAP.cli} i ${ACRONYM_MAP.cli} i ${ACRONYM_MAP.cli}`
    )
  })
})

const section = (over: Partial<SpeechSection>): SpeechSection => ({
  sourceSlug: 'news',
  sourceTitle: undefined,
  title: 'Section title',
  markdown: '## Section title\nBody sentence one. Body sentence two.',
  speechText: '',
  ...over,
})

describe('splitIntoSpeechUnits', () => {
  it('emits [title, tldr, ...body] with title first from sourceTitle', () => {
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'Article Title',
        title: 'Article Title',
        markdown: '## Article Title\n**TLDR:** Short summary here.\n\nFull body paragraph text.',
      })
    )

    expect(units[0]).toBe('Article Title')
    // The TLDR unit is the `**TLDR:**` paragraph, run through prepareSpeechText
    // (which maps the structural `tldr`/`summary` labels to pause punctuation).
    expect(units[1]).toBe(prepareSpeechText('**TLDR:** Short summary here.'))
    expect(units[1]).not.toContain('Full body paragraph text.')
    expect(units.slice(2).join(' ')).toContain('Full body paragraph text.')
  })

  it('does not speak the heading twice when sourceTitle equals the heading', () => {
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'Same Title',
        title: 'Same Title',
        markdown: '## Same Title\n**TLDR:** A summary.\n\nBody.',
      })
    )

    // "Same Title" appears exactly once across all units (title unit only).
    const occurrences = units.filter((u) => u.includes('Same Title')).length
    expect(occurrences).toBe(1)
    expect(units[0]).toBe('Same Title')
  })

  it('falls back to the body first sentence as unit 2 when there is no TLDR', () => {
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'Title',
        markdown: '## Title\nFirst sentence here. Second sentence follows. Third one too.',
      })
    )

    expect(units[0]).toBe('Title')
    expect(units[1]).toBe('First sentence here.')
    expect(units[2]).toContain('Second sentence follows.')
  })

  it('uses the section heading as the title when there is no sourceTitle', () => {
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: undefined,
        title: 'Heading Only',
        markdown: '## Heading Only\n**TLDR:** T.\n\nBody.',
      })
    )

    expect(units[0]).toBe('Heading Only')
  })

  it('keeps body chunks at the default (non-shrunk) chunk size', () => {
    const long = 'Zdanie. '.repeat(400) // ~3200 chars of body
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'T',
        markdown: `## T\n**TLDR:** Krotko.\n\n${long}`,
      })
    )

    const bodyUnits = units.slice(2)
    expect(bodyUnits.length).toBeGreaterThan(1)
    // No body chunk exceeds the 1000-char default; none is artificially tiny.
    for (const chunk of bodyUnits) expect(chunk.length).toBeLessThanOrEqual(1000)
    expect(Math.max(...bodyUnits.map((c) => c.length))).toBeGreaterThan(500)
  })
})

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
    const source = `Read [the guide][guide] and [the manual][api].

[guide]: https://example.com/guide "Guide"
[api]: <https://example.com/api> (API docs)`

    expect(prepareSpeechText(source)).toBe('Read the guide and the manual.')
  })

  it('keeps sentence punctuation after stripped URL destinations', () => {
    expect(prepareSpeechText('Visit https://example.com/news. Then continue.')).toBe(
      'Visit . Then continue.'
    )
  })

  it('uses approved longest matching phonetic replacements without changing unknown words', () => {
    const source = 'AI i GPT 5.6 działają z React oraz Microsoft. Unknown Xyzzy.'

    // Acronyms are NOT letter-spelled — spelling was removed; specific acronyms
    // live in PRONUNCIATION_MAP instead. Only the map applies: AI -> 'ej aj',
    // GPT -> 'dżi pi ti', React -> reakt, Microsoft -> mikrosoft; version
    // 5.6 -> '5 6'. 'Xyzzy' (no map stem) is left untouched.
    expect(prepareSpeechText(source)).toBe(
      'ej aj i dżi pi ti 5 6 działają z reakt oraz mikrosoft. Unknown Xyzzy.'
    )
    expect(source).toBe('AI i GPT 5.6 działają z React oraz Microsoft. Unknown Xyzzy.')
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
      'Dzisiejsze wiadomości ej aj w praktyce ej aj pomaga.',
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
