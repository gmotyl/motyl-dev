export interface InlineCTA {
  title: string
  description: string
  index: number
}

/**
 * Extracts inline newsletter CTAs from markdown content
 * Format: #newsletter-cta('Title', 'Description')
 *
 * @param content - The markdown content to parse
 * @returns Object with cleaned content and extracted CTAs
 */
// Regex pattern supports escaped single quotes: #newsletter-cta('It\'s great', 'Description')
const CTA_PATTERN = /#newsletter-cta\(\s*'((?:\\'|[^'])*)'\s*,\s*'((?:\\'|[^'])*)'\s*\)/g

function unescapeQuotes(str: string): string {
  return str.replace(/\\'/g, "'")
}

export function extractInlineCTAs(content: string): {
  content: string
  ctas: InlineCTA[]
  hasNewsletterCTA: boolean
} {
  const ctas: InlineCTA[] = []

  let match
  let index = 0

  while ((match = CTA_PATTERN.exec(content)) !== null) {
    ctas.push({
      title: unescapeQuotes(match[1]),
      description: unescapeQuotes(match[2]),
      index,
    })
    index++
  }

  // Reset regex lastIndex for reuse
  CTA_PATTERN.lastIndex = 0

  // Replace CTAs with a placeholder that MarkdownContent can handle
  const cleanedContent = content.replace(
    CTA_PATTERN,
    (_, title, desc) => `\n<!-- NEWSLETTER_CTA:${Buffer.from(JSON.stringify({ title: unescapeQuotes(title), desc: unescapeQuotes(desc) })).toString('base64')} -->\n`
  )

  return {
    content: cleanedContent,
    ctas,
    hasNewsletterCTA: ctas.length > 0,
  }
}
