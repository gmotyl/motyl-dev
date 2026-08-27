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

// Matches the leading `## heading` line of a section's markdown (removed so the
// heading is not spoken again as body — the title unit already speaks it).
const LEADING_HEADING = /^##[ \t]+.*(?:\r?\n|$)/

// Matches a `**TLDR:**` (or `**TLDR**`) paragraph up to the next blank line.
const TLDR_PARAGRAPH = /(?:^|\n)[ \t]*\*\*TLDR:?\*\*[\s\S]*?(?=\n[ \t]*\n|$)/i

const firstSentence = (text: string): string | null =>
  text.match(/^[\s\S]*?[.!?]+(?=\s|$)/)?.[0].trim() ?? null

/**
 * Split a section into ordered **speech units** for synthesis and playback:
 * `[title, tldr?, ...bodyChunks]`. Each unit is `prepareSpeechText`'d
 * individually so its string is a stable, reusable synthesis-cache key (the
 * prebuffer ladder warms these exact strings).
 *
 * - **Title** = the section's `sourceTitle` (article/frontmatter title) when
 *   present, else its `##` heading. The `##` heading is stripped from the body
 *   so the title is spoken exactly once (no double-title read).
 * - **TLDR** = the `**TLDR:**` paragraph. If absent, the second unit is the
 *   body's first sentence instead (keeps the fast-start second unit small).
 * - **Body** stays at the default 1000-char chunking (not cut smaller): the
 *   title + TLDR give enough playback runway to fetch full body chunks ahead.
 */
export function splitIntoSpeechUnits(section: SpeechSection): string[] {
  const units: string[] = []

  const titleText = (section.sourceTitle ?? section.title ?? '').trim()
  const title = prepareSpeechText(titleText)
  if (title) units.push(title)

  // Body = section markdown minus its leading `## heading` line.
  let body = section.markdown.replace(LEADING_HEADING, '')

  const tldrMatch = body.match(TLDR_PARAGRAPH)
  if (tldrMatch) {
    const tldr = prepareSpeechText(tldrMatch[0])
    if (tldr) units.push(tldr)
    const rest = body.slice(0, tldrMatch.index) + body.slice(tldrMatch.index! + tldrMatch[0].length)
    units.push(...splitIntoChunks(prepareSpeechText(rest)))
  } else {
    // No TLDR: second unit is the body's first sentence, remainder follows.
    const preparedBody = prepareSpeechText(body)
    const first = firstSentence(preparedBody)
    if (first) {
      units.push(first)
      const remainder = preparedBody.slice(first.length).trim()
      if (remainder) units.push(...splitIntoChunks(remainder))
    } else if (preparedBody) {
      units.push(...splitIntoChunks(preparedBody))
    }
  }

  return units.filter((u) => u.length > 0)
}
