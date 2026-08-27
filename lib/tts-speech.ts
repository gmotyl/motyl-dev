import { ACRONYM_MAP, PRONUNCIATION_MAP } from '@/lib/tts-pronunciation'
import { splitIntoChunks } from '@/lib/tts-chunks'

export interface SpeechSource {
  slug: string
  title: string
  content: string
}

/**
 * The reader's stable position key. Section titles repeat across articles, so
 * the slug must be part of the key for it to identify one section.
 */
export const sectionKey = (sourceSlug: string, ordinal: number): string =>
  `${sourceSlug}#${ordinal}`

export interface ReviewedSection {
  sourceSlug: string
  sourceTitle?: string
  title: string
  markdown: string
  /** 0-based index of this `##` section within its own article. */
  ordinal: number
  /** 1-based line of this section's `##` heading within the article's markdown. */
  startLine: number
}

export interface SpeechSection extends ReviewedSection {
  speechText: string
  /** `sectionKey(sourceSlug, ordinal)` — the reader's stable position key. */
  key: string
}

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const replaceWholeWordMappings = (
  text: string,
  mappings: Readonly<Record<string, string>>
): string => {
  const names = Object.keys(mappings).sort((a, b) => b.length - a.length)
  const pattern = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${names.map(escapeRegExp).join('|')})(?![\\p{L}\\p{N}_])`,
    'gu'
  )

  return text.replace(pattern, (name) => mappings[name])
}

export const applyPronunciation = (text: string): string => {
  let out = text

  // 1) Whole-word acronyms first. Match only as a standalone word (Unicode
  // boundaries, so Polish diacritics count) plus an optional plural "s"
  // (APIs, GPUs) — NOT as a prefix, so "client"/"click" are never touched.
  const acronymKeys = Object.keys(ACRONYM_MAP).sort((a, b) => b.length - a.length)
  for (const key of acronymKeys) {
    const re = new RegExp(
      `(?<![\\p{L}\\p{N}_])${escapeRegExp(key)}(s?)(?![\\p{L}\\p{N}_])`,
      'giu'
    )
    out = out.replace(re, (_m, plural: string) => ACRONYM_MAP[key] + plural)
  }

  // 2) Stem map: match at a word start and preserve trailing Polish inflection.
  const keys = Object.keys(PRONUNCIATION_MAP).sort((a, b) => b.length - a.length)
  for (const key of keys) {
    const re = new RegExp(`(?<![\\p{L}\\p{N}_])${escapeRegExp(key)}(\\p{L}*)`, 'giu')
    out = out.replace(re, (_m, suffix: string) => PRONUNCIATION_MAP[key] + suffix)
  }
  return out
}

export const normalizeVersionNumbers = (text: string): string =>
  text.replace(/(?<!\d)\d{1,5}(?:\.\d{1,5})+(?!\d)/g, (token) => token.replace(/\./g, ' '))

const stripFrontmatter = (text: string): string =>
  text.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, '')

const stripHashtagMetadata = (text: string): string =>
  text
    .split(/\r?\n/)
    .filter((line) => !/^\s*(?:#[\p{L}\p{N}_-]+\s*)+$/u.test(line))
    .join('\n')
    .replace(/(?<![\p{L}\p{N}_])#[\p{L}\p{N}_-]+/gu, '')

export const stripMarkdown = (text: string): string =>
  stripHashtagMetadata(stripFrontmatter(text))
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*```[^\n]*\r?\n?|\r?\n?\s*```\s*$/gm, '')
    .replace(
      /^[ \t]{0,3}\[[^\]\r\n]+\]:[ \t]*(?:<[^>\r\n]*>|[^\s]+)(?:[ \t]+(?:"[^"\r\n]*"|'[^'\r\n]*'|\([^\)\r\n]*\)))?[ \t]*$/gm,
      ''
    )
    .replace(/!\[([^\]]*)\]\(\s*(?:<[^>]*>|[^)]*)\)/g, '$1')
    .replace(/\[([^\]]+)\]\(\s*(?:<[^>]*>|[^)]*)\)/g, '$1')
    .replace(/\[([^\]\r\n]+)\]\[[^\]\r\n]*\]/g, '$1')
    .replace(/https?:\/\/[^\s)>]+/gi, (url) => url.match(/[.,!?;:]+$/)?.[0] ?? '')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*(?:[-*+]\s+|\d+[.)]\s+)/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*(?:[-*_]\s*){3,}$/gm, '')
    .replace(/[*_~`]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export function prepareSpeechText(markdown: string): string {
  // No acronym letter-spelling: the TTS voice reads acronyms like "CTO" more
  // naturally on its own than a hyphenated spell-out. Only the pronunciation
  // map (for terms the voice genuinely mangles) is applied.
  return applyPronunciation(normalizeVersionNumbers(stripMarkdown(markdown)))
}

export function splitReviewedSections(sources: readonly SpeechSource[]): ReviewedSection[] {
  const sections: ReviewedSection[] = []

  for (const source of sources) {
    const sectionPattern = /^##[ \t]+(.+?)[ \t]*\r?$([\s\S]*?)(?=^##[ \t]+|(?![\s\S]))/gm
    let match: RegExpExecArray | null
    let ordinal = 0
    // Line cursor advanced with the match index — heading text can repeat, so
    // the line must come from the split position, not from searching the text.
    let scannedTo = 0
    let startLine = 1

    while ((match = sectionPattern.exec(source.content)) !== null) {
      startLine += (source.content.slice(scannedTo, match.index).match(/\n/g) ?? []).length
      scannedTo = match.index

      sections.push({
        sourceSlug: source.slug,
        sourceTitle: ordinal === 0 ? source.title : undefined,
        title: match[1].trim(),
        markdown: match[0].trim(),
        ordinal,
        startLine,
      })
      ordinal += 1
    }
  }

  return sections
}

export function prepareSpeechSections(sources: readonly SpeechSource[]): SpeechSection[] {
  return splitReviewedSections(sources).map((section) => ({
    ...section,
    speechText: prepareSpeechText(
      [section.sourceTitle, section.markdown].filter(Boolean).join('\n')
    ),
    key: sectionKey(section.sourceSlug, section.ordinal),
  }))
}

// Matches the leading `## heading` line of a section's markdown (skipped so the
// heading is not spoken again as body — the title unit already speaks it).
const LEADING_HEADING = /^##[ \t]+/

// Matches a paragraph opening with `**TLDR:**` (or `**TLDR**`).
const TLDR_PARAGRAPH = /^[ \t]*\*\*TLDR:?\*\*/i

// `\s` covers a lone `\r`, so CRLF markdown splits the same as LF markdown.
const BLANK_LINE = /^\s*$/

/** Floor a merged unit is packed up to. */
export const UNIT_MIN_CHARS = 200
/** Ceiling a unit is cut at, on sentence boundaries. */
export const UNIT_MAX_CHARS = 450

export interface SpeechUnit {
  /** Already `prepareSpeechText`'d — the exact synthesis-cache key. */
  text: string
  /** 1-based, absolute in the article's (section-filtered) markdown. */
  startLine: number
  endLine: number
}

/** A body paragraph with the absolute lines it occupies; `text` is still raw. */
type Paragraph = SpeechUnit

const firstSentence = (text: string): string | null =>
  text.match(/^[\s\S]*?[.!?]+(?=\s|$)/)?.[0].trim() ?? null

/**
 * Read the section's body as blank-line-separated paragraphs, each carrying the
 * absolute line range it occupies. Paragraphs must be cut here, from the raw
 * markdown: `prepareSpeechText` collapses newlines into spaces, so paragraph
 * structure no longer exists in a prepared string.
 */
function collectBodyParagraphs(section: SpeechSection): Paragraph[] {
  const lines = section.markdown.split('\n')
  const paragraphs: Paragraph[] = []
  let start = -1

  const flush = (endIndex: number): void => {
    if (start < 0 || endIndex < start) return
    paragraphs.push({
      text: lines.slice(start, endIndex + 1).join('\n'),
      startLine: section.startLine + start,
      endLine: section.startLine + endIndex,
    })
    start = -1
  }

  // Line 0 is the `## heading` — spoken by the title unit, never as body.
  const bodyFrom = LEADING_HEADING.test(section.markdown) ? 1 : 0
  for (let index = bodyFrom; index < lines.length; index += 1) {
    if (BLANK_LINE.test(lines[index])) flush(index - 1)
    else if (start < 0) start = index
  }
  flush(lines.length - 1)

  return paragraphs
}

/**
 * Pack prepared paragraphs into units: merge consecutive ones until the unit
 * reaches `UNIT_MIN_CHARS`, never merging past `UNIT_MAX_CHARS`. A merged unit's
 * range spans from its first paragraph's line to its last one's.
 */
function packUnits(paragraphs: readonly Paragraph[]): SpeechUnit[] {
  const units: SpeechUnit[] = []
  let pending: SpeechUnit | null = null

  const flush = (): void => {
    if (pending) units.push(pending)
    pending = null
  }

  for (const paragraph of paragraphs) {
    // Oversized paragraph: cut at sentence boundaries. Every piece keeps the
    // whole paragraph's range — they all speak the same paragraph.
    if (paragraph.text.length > UNIT_MAX_CHARS) {
      flush()
      for (const chunk of splitIntoChunks(paragraph.text, UNIT_MAX_CHARS)) {
        units.push({ text: chunk, startLine: paragraph.startLine, endLine: paragraph.endLine })
      }
      continue
    }

    if (!pending) {
      pending = { ...paragraph }
    } else if (pending.text.length + 1 + paragraph.text.length > UNIT_MAX_CHARS) {
      flush()
      pending = { ...paragraph }
    } else {
      pending = {
        text: `${pending.text} ${paragraph.text}`,
        startLine: pending.startLine,
        endLine: paragraph.endLine,
      }
    }

    if (pending.text.length >= UNIT_MIN_CHARS) flush()
  }
  flush()

  return units
}

/**
 * Split a section into ordered **speech units** for synthesis and playback:
 * `[title, tldr?, ...bodyUnits]`. Each unit is `prepareSpeechText`'d
 * individually so its string is a stable, reusable synthesis-cache key (the
 * prebuffer ladder warms these exact strings), and carries the absolute line
 * range it occupies so a rendered paragraph maps back to the unit speaking it.
 *
 * - **Title** = the section's `sourceTitle` (article/frontmatter title) when
 *   present, else its `##` heading; its range is the heading line. The heading
 *   is skipped as body so the title is spoken exactly once.
 * - **TLDR** = the `**TLDR:**` paragraph. If absent, the second unit is the
 *   body's first sentence instead (keeps the fast-start second unit small).
 * - **Body** is cut on markdown paragraph boundaries, then packed to the
 *   `UNIT_MIN_CHARS` floor and cut at the `UNIT_MAX_CHARS` ceiling.
 */
export function splitIntoSpeechUnits(section: SpeechSection): SpeechUnit[] {
  const units: SpeechUnit[] = []
  const headingLine = section.startLine

  const titleText = (section.sourceTitle ?? section.title ?? '').trim()
  const title = prepareSpeechText(titleText)
  if (title) units.push({ text: title, startLine: headingLine, endLine: headingLine })

  const paragraphs = collectBodyParagraphs(section)
  // Only the FIRST body paragraph can be the TLDR. The TLDR unit is hoisted to
  // index 1, so honouring a mid-body one would emit unit start lines that are
  // not non-decreasing — and the line → unit lookup (play from a paragraph)
  // relies on that ordering. A `**TLDR:**` paragraph anywhere else is therefore
  // treated as ordinary body: not pre-spoken as the section's TLDR, and
  // packed/merged with its neighbours like any other paragraph, so a click on it
  // resolves to whichever unit covers its lines, not to a TLDR unit of its own.
  const tldrIndex = paragraphs.length > 0 && TLDR_PARAGRAPH.test(paragraphs[0].text) ? 0 : -1

  // Prepare each paragraph on its own, then drop the ones that speak nothing
  // (horizontal rules, comments) — skipping them leaves neighbours' ranges as
  // they are.
  const body = paragraphs
    .filter((_, index) => index !== tldrIndex)
    .map((paragraph) => ({ ...paragraph, text: prepareSpeechText(paragraph.text) }))
    .filter((paragraph) => paragraph.text.length > 0)

  if (tldrIndex >= 0) {
    const paragraph = paragraphs[tldrIndex]
    const text = prepareSpeechText(paragraph.text)
    if (text) {
      units.push({ text, startLine: paragraph.startLine, endLine: paragraph.endLine })
    }
    return [...units, ...packUnits(body)]
  }

  // No TLDR: unit 2 is the body's first sentence; what is left of its paragraph
  // stays at the head of the queue (same range).
  const [first, ...rest] = body
  if (!first) return units

  const sentence = firstSentence(first.text)
  if (!sentence) return [...units, ...packUnits(body)]

  units.push({ text: sentence, startLine: first.startLine, endLine: first.endLine })
  const remainder = first.text.slice(sentence.length).trim()
  return [...units, ...packUnits(remainder ? [{ ...first, text: remainder }, ...rest] : rest)]
}
