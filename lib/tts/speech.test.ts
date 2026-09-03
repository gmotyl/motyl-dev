import { describe, expect, it } from 'vitest'
import {
  applyPronunciation,
  normalizeVersionNumbers,
  prepareSpeechSections,
  prepareSpeechText,
  replaceWholeWordMappings,
  sectionKey,
  splitIntoSpeechUnits,
  splitReviewedSections,
  UNIT_MAX_CHARS,
  UNIT_MIN_CHARS,
  type SpeechSection,
} from '@/lib/tts/speech'
import { ACRONYM_MAP } from '@/lib/tts/pronunciation'

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
  ordinal: 0,
  startLine: 1,
  speechText: '',
  ...over,
  key: sectionKey(over.sourceSlug ?? 'news', over.ordinal ?? 0),
})

// Filler built from one fixed 26-char sentence: no token matches a
// pronunciation-map stem and there are no digits, so the prepared text is
// byte-identical to the raw text and unit sizes are exactly predictable.
const SENTENCE = 'Zdanie wypelniajace tekst.'
const sentences = (count: number): string =>
  Array.from({ length: count }, () => SENTENCE).join(' ')

const ranges = (units: readonly { startLine: number; endLine: number }[]) =>
  units.map((unit) => [unit.startLine, unit.endLine])

describe('splitIntoSpeechUnits', () => {
  it('keeps title then TLDR then body ordering', () => {
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'Article Title',
        title: 'Article Title',
        markdown: '## Article Title\n**TLDR:** Short summary here.\n\nFull body paragraph text.',
      })
    )

    expect(units[0].text).toBe('Article Title')
    // The TLDR unit is the `**TLDR:**` paragraph, run through prepareSpeechText
    // (which maps the structural `tldr`/`summary` labels to pause punctuation).
    expect(units[1].text).toBe(prepareSpeechText('**TLDR:** Short summary here.'))
    expect(units[1].text).not.toContain('Full body paragraph text.')
    expect(units.slice(2).map((unit) => unit.text).join(' ')).toContain(
      'Full body paragraph text.'
    )
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
    const occurrences = units.filter((u) => u.text.includes('Same Title')).length
    expect(occurrences).toBe(1)
    expect(units[0].text).toBe('Same Title')
  })

  it("falls back to the body's first sentence when there is no TLDR", () => {
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'Title',
        markdown: '## Title\nFirst sentence here. Second sentence follows. Third one too.',
      })
    )

    expect(units[0].text).toBe('Title')
    expect(units[1].text).toBe('First sentence here.')
    expect(units[2].text).toContain('Second sentence follows.')
  })

  it('uses the section heading as the title when there is no sourceTitle', () => {
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: undefined,
        title: 'Heading Only',
        markdown: '## Heading Only\n**TLDR:** T.\n\nBody.',
      })
    )

    expect(units[0].text).toBe('Heading Only')
  })

  it('keeps body units at the unit ceiling rather than an artificially tiny size', () => {
    const long = 'Zdanie. '.repeat(400) // ~3200 chars of body
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'T',
        markdown: `## T\n**TLDR:** Krotko.\n\n${long}`,
      })
    )

    const bodyUnits = units.slice(2).map((unit) => unit.text)
    expect(bodyUnits.length).toBeGreaterThan(1)
    // No body unit exceeds the ceiling; none is artificially tiny.
    for (const chunk of bodyUnits) expect(chunk.length).toBeLessThanOrEqual(UNIT_MAX_CHARS)
    expect(Math.max(...bodyUnits.map((c) => c.length))).toBeGreaterThan(UNIT_MIN_CHARS)
  })

  it('cuts body on paragraph boundaries rather than a fixed character count', () => {
    const first = sentences(8)
    const second = sentences(8)
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'T',
        markdown: `## T\n**TLDR:** Krotko.\n\n${first}\n\n${second}`,
      })
    )

    // Both paragraphs together still fit one unit, so only the paragraph
    // boundary can explain the cut.
    expect(prepareSpeechText(`${first}\n\n${second}`).length).toBeLessThan(UNIT_MAX_CHARS)
    expect(units.map((unit) => unit.text)).toEqual([
      'T',
      prepareSpeechText('**TLDR:** Krotko.'),
      first,
      second,
    ])
  })

  it('merges consecutive short paragraphs up to the minimum unit size', () => {
    const short = sentences(4)
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'T',
        markdown: `## T\n**TLDR:** Krotko.\n\n${short}\n\n${short}\n\n${short}\n\n${short}`,
      })
    )

    expect(short.length).toBeLessThan(UNIT_MIN_CHARS)
    const bodyUnits = units.slice(2)
    expect(bodyUnits.map((unit) => unit.text)).toEqual([
      `${short} ${short}`,
      `${short} ${short}`,
    ])
    for (const unit of bodyUnits) {
      expect(unit.text.length).toBeGreaterThanOrEqual(UNIT_MIN_CHARS)
      expect(unit.text.length).toBeLessThanOrEqual(UNIT_MAX_CHARS)
    }
    // A merged unit spans from its first paragraph's line to its last one's.
    expect(ranges(bodyUnits)).toEqual([[4, 6], [8, 10]])
  })

  it('splits an oversized paragraph at sentence boundaries and shares its line range', () => {
    const oversized = `${sentences(10)}\n${sentences(10)}\n${sentences(10)}`
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'T',
        markdown: `## T\n**TLDR:** Krotko.\n\n${oversized}`,
      })
    )

    const bodyUnits = units.slice(2)
    expect(bodyUnits.length).toBeGreaterThan(1)
    for (const unit of bodyUnits) {
      expect(unit.text.length).toBeLessThanOrEqual(UNIT_MAX_CHARS)
      expect(unit.text.endsWith('.')).toBe(true)
    }
    // splitIntoChunks re-joins its sentence matches, which keep their leading
    // space, so compare with whitespace collapsed.
    expect(bodyUnits.map((unit) => unit.text).join(' ').replace(/\s+/g, ' ')).toBe(
      prepareSpeechText(oversized)
    )
    // The paragraph occupies markdown lines 4-6; every piece of it says so.
    expect(ranges(bodyUnits)).toEqual(bodyUnits.map(() => [4, 6]))
  })

  it('reports absolute line ranges that match the source markdown', () => {
    const lines = [
      'Wstep.', // 1
      '', // 2
      '## Temat', // 3
      '**TLDR:** Krotko.', // 4
      '', // 5
      sentences(4), // 6 — paragraph A, line one
      sentences(4), // 7 — paragraph A, line two
      '', // 8
      sentences(4), // 9 — paragraph B, line one
      sentences(4), // 10 — paragraph B, line two
    ]
    const [prepared] = prepareSpeechSections([
      { slug: 'news', title: 'Tytul', content: lines.join('\n') },
    ])

    const units = splitIntoSpeechUnits(prepared)

    expect(ranges(units)).toEqual([[3, 3], [4, 4], [6, 7], [9, 10]])
    // Cross-check against the source: the reported lines really hold the text.
    expect(lines[units[0].startLine - 1]).toBe('## Temat')
    expect(units[2].text).toBe(`${lines[5]} ${lines[6]}`)
    expect(units[3].text).toBe(`${lines[8]} ${lines[9]}`)
  })

  it('skips horizontal rules and paragraphs that prepare to nothing', () => {
    const first = sentences(8)
    const second = sentences(9)
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'T',
        markdown: [
          '## T', // 1
          '**TLDR:** Krotko.', // 2
          '', // 3
          first, // 4
          '', // 5
          '---', // 6
          '', // 7
          '<!-- notatka -->', // 8
          '', // 9
          second, // 10
        ].join('\n'),
      })
    )

    expect(units.map((unit) => unit.text)).toEqual([
      'T',
      prepareSpeechText('**TLDR:** Krotko.'),
      first,
      second,
    ])
    // The skipped paragraphs neither emit a unit nor shift their neighbours.
    expect(ranges(units)).toEqual([[1, 1], [2, 2], [4, 4], [10, 10]])
  })

  it('keeps unit line ranges non-decreasing when a TLDR appears mid-body', () => {
    // No sentence-ending punctuation, so no first-sentence split, and each
    // paragraph is over the floor — one unit per paragraph, one line each.
    const clause = 'zdanie wypelniajace tekst bez kropki'
    const paragraph = Array.from({ length: 6 }, () => clause).join(', ')
    const units = splitIntoSpeechUnits(
      section({
        sourceTitle: 'T',
        markdown: [
          '## T', // 1
          '', // 2
          paragraph, // 3
          '', // 4
          `**TLDR:** ${paragraph}`, // 5
          '', // 6
          paragraph, // 7
        ].join('\n'),
      })
    )

    // Only the first body paragraph can be the TLDR unit. A later one stays in
    // positional order, because the TLDR unit is hoisted to index 1 and hoisting
    // a mid-body paragraph would make the start lines non-monotonic — which the
    // line → unit lookup relies on.
    const startLines = units.map((unit) => unit.startLine)
    expect([...startLines].sort((a, b) => a - b)).toEqual(startLines)
    expect(ranges(units)).toEqual([[1, 1], [3, 3], [5, 5], [7, 7]])
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

  it('assigns per-article ordinals restarting at zero for each source', () => {
    const sections = splitReviewedSections([
      {
        slug: 'first-news',
        title: 'Pierwszy przegląd',
        content: `Wstęp.

## Pierwszy temat
Treść pierwszego tematu.

## Drugi temat
Treść drugiego tematu.`,
      },
      {
        slug: 'second-news',
        title: 'Drugi przegląd',
        content: '## Trzeci temat\nTreść trzeciego tematu.',
      },
    ])

    expect(sections.map((section) => section.ordinal)).toEqual([0, 1, 0])
  })

  it('reports the 1-based line of each section heading', () => {
    const sections = splitReviewedSections([
      {
        // Line 1 is the `##` heading itself → startLine 1.
        slug: 'lead-heading',
        title: 'Od razu nagłówek',
        content: '## Pierwszy\nTreść.\n\n## Drugi\nTreść.',
      },
      {
        slug: 'with-intro',
        title: 'Ze wstępem',
        content: 'Wstęp.\n\n## Trzeci\r\nTreść.\r\n\r\n## Czwarty\nTreść.',
      },
    ])

    expect(sections.map((section) => section.startLine)).toEqual([1, 4, 3, 6])
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

  it('gives identically-titled sections in different articles distinct keys', () => {
    const sections = prepareSpeechSections([
      { slug: 'first-news', title: 'Pierwszy', content: '## Ten sam temat\nTreść.' },
      { slug: 'second-news', title: 'Drugi', content: '## Ten sam temat\nTreść.' },
    ])

    expect(sections.map((section) => section.key)).toEqual([
      'first-news#0',
      'second-news#0',
    ])
    expect(sections.map((section) => section.key)).toEqual(
      sections.map((section) => sectionKey(section.sourceSlug, section.ordinal))
    )
  })

  it('leaves speechText unchanged', () => {
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
})
