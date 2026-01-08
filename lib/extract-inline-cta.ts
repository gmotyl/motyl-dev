export interface InlineCTA {
  title?: string
  description?: string
  index: number
}

/**
 * Extracts inline newsletter CTAs from markdown content
 * Supports two formats:
 * - #newsletter-cta (uses default title and description)
 * - #newsletter-cta('Title', 'Description') (custom values, supports escaped quotes)
 *
 * @param content - The markdown content to parse
 * @returns Object with cleaned content and extracted CTAs
 */

// Pattern with parameters: #newsletter-cta('title', 'description')
const CTA_WITH_PARAMS = /#newsletter-cta\(\s*'((?:\\'|[^'])*)'\s*,\s*'((?:\\'|[^'])*)'\s*\)/g
// Pattern without parameters: #newsletter-cta (not followed by opening paren)
const CTA_SIMPLE = /#newsletter-cta(?!\()/g
// Combined pattern for replacement
const CTA_ANY = /#newsletter-cta(?:\(\s*'((?:\\'|[^'])*)'\s*,\s*'((?:\\'|[^'])*)'\s*\))?/g

function unescapeQuotes(str: string): string {
  return str.replace(/\\'/g, "'")
}

// Browser-compatible base64 encoding (works in both Node.js and browser)
function toBase64(str: string): string {
  if (typeof btoa === 'function') {
    return btoa(unescape(encodeURIComponent(str)))
  }
  return Buffer.from(str).toString('base64')
}

export function extractInlineCTAs(content: string): {
  content: string
  ctas: InlineCTA[]
  hasNewsletterCTA: boolean
} {
  const ctas: InlineCTA[] = []
  let index = 0

  // First, find CTAs with parameters
  let match
  while ((match = CTA_WITH_PARAMS.exec(content)) !== null) {
    ctas.push({
      title: unescapeQuotes(match[1]),
      description: unescapeQuotes(match[2]),
      index: index++,
    })
  }
  CTA_WITH_PARAMS.lastIndex = 0

  // Then, find simple CTAs (without parameters)
  while ((match = CTA_SIMPLE.exec(content)) !== null) {
    ctas.push({
      title: undefined, // Will use defaults in component
      description: undefined,
      index: index++,
    })
  }
  CTA_SIMPLE.lastIndex = 0

  // Sort by position in content to maintain order
  // We need to re-find positions
  const ctaPositions: Array<{ pos: number; title?: string; description?: string }> = []

  CTA_ANY.lastIndex = 0
  while ((match = CTA_ANY.exec(content)) !== null) {
    ctaPositions.push({
      pos: match.index,
      title: match[1] ? unescapeQuotes(match[1]) : undefined,
      description: match[2] ? unescapeQuotes(match[2]) : undefined,
    })
  }
  CTA_ANY.lastIndex = 0

  // Sort by position and rebuild ctas array
  ctaPositions.sort((a, b) => a.pos - b.pos)
  const orderedCtas: InlineCTA[] = ctaPositions.map((item, idx) => ({
    title: item.title,
    description: item.description,
    index: idx,
  }))

  // Replace all CTAs with placeholders
  const cleanedContent = content.replace(
    CTA_ANY,
    (_, title, desc) => {
      const data = {
        title: title ? unescapeQuotes(title) : undefined,
        desc: desc ? unescapeQuotes(desc) : undefined,
      }
      return `\n<!-- NEWSLETTER_CTA:${toBase64(JSON.stringify(data))} -->\n`
    }
  )

  return {
    content: cleanedContent,
    ctas: orderedCtas,
    hasNewsletterCTA: orderedCtas.length > 0,
  }
}
