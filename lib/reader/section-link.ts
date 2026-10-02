import { stripMarkdown } from '@/lib/tts/speech'

export interface SectionLink {
  url: string
  title: string
}

/**
 * Inline markdown link: `[text](dest "optional title")`.
 * - group 1: a leading `!` (an image, which is not a link)
 * - group 2: link text (allows one level of nested brackets)
 * - group 3: `<dest>` in angle brackets (no whitespace allowed here)
 * - group 4: bare dest, allowing one level of balanced parentheses
 */
const INLINE_LINK =
  /(!?)\[((?:[^[\]]|\[[^[\]]*\])*)\]\(\s*(?:<([^\s<>]*)>|((?:[^\s()<>]|\([^\s()]*\))+))(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)/g

const EXTERNAL = /^https?:\/\//i

/**
 * The first external (http/https) inline link in a Section's markdown body,
 * with its text reduced to plain text. Images, relative paths, `#anchors` and
 * `mailto:` links are skipped; bare URLs without link syntax do not count.
 */
export function firstExternalLink(markdown: string): SectionLink | null {
  for (const match of markdown.matchAll(INLINE_LINK)) {
    const [, bang, text, angled, bare] = match
    const url = angled ?? bare
    if (bang || !url || !EXTERNAL.test(url)) continue
    return { url, title: stripMarkdown(text) || url }
  }
  return null
}
