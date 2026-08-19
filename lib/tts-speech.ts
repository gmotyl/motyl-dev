import { PRONUNCIATION_MAP } from '@/lib/tts-pronunciation'

export interface SpeechSource {
  slug: string
  title: string
  content: string
}

export interface ReviewedSection {
  sourceSlug: string
  sourceTitle?: string
  title: string
  markdown: string
}

export interface SpeechSection extends ReviewedSection {
  speechText: string
}

const ACRONYM_LETTER_MAP: Record<string, string> = {
  A: 'ej',
  B: 'bi',
  C: 'si',
  D: 'di',
  E: 'i',
  F: 'ef',
  G: 'dżi',
  H: 'ejcz',
  I: 'aj',
  J: 'dżej',
  K: 'kej',
  L: 'el',
  M: 'em',
  N: 'en',
  O: 'oł',
  P: 'pi',
  Q: 'kiu',
  R: 'ar',
  S: 'es',
  T: 'ti',
  U: 'ju',
  V: 'wi',
  W: 'dabliu',
  X: 'eks',
  Y: 'łaj',
  Z: 'zi',
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
  const keys = Object.keys(PRONUNCIATION_MAP).sort((a, b) => b.length - a.length)
  let out = text
  for (const key of keys) {
    // word-start boundary; capture trailing Polish letters (inflection) to preserve them
    const re = new RegExp(`(?<![\\p{L}\\p{N}_])${escapeRegExp(key)}(\\p{L}*)`, 'giu')
    out = out.replace(re, (_m, suffix: string) => PRONUNCIATION_MAP[key] + suffix)
  }
  return out
}

const spellOutAcronyms = (text: string): string =>
  text.replace(/(?<![\p{L}\p{N}_])([A-Z]{2,})(?![\p{L}\p{N}_])/gu, (acronym) =>
    acronym
      .split('')
      .map((letter) => ACRONYM_LETTER_MAP[letter] ?? letter)
      .join('-')
  )

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
  return spellOutAcronyms(
    applyPronunciation(normalizeVersionNumbers(stripMarkdown(markdown)))
  )
}

export function splitReviewedSections(sources: readonly SpeechSource[]): ReviewedSection[] {
  const sections: ReviewedSection[] = []

  for (const source of sources) {
    const sectionPattern = /^##[ \t]+(.+?)[ \t]*\r?$([\s\S]*?)(?=^##[ \t]+|(?![\s\S]))/gm
    let match: RegExpExecArray | null
    let isFirstSection = true

    while ((match = sectionPattern.exec(source.content)) !== null) {
      sections.push({
        sourceSlug: source.slug,
        sourceTitle: isFirstSection ? source.title : undefined,
        title: match[1].trim(),
        markdown: match[0].trim(),
      })
      isFirstSection = false
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
  }))
}
