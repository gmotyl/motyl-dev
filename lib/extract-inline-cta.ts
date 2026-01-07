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
export function extractInlineCTAs(content: string): {
  content: string
  ctas: InlineCTA[]
  hasNewsletterCTA: boolean
} {
  const ctas: InlineCTA[] = []
  const ctaRegex = /#newsletter-cta\(\s*'([^']*)'\s*,\s*'([^']*)'\s*\)/g

  let match
  let index = 0

  while ((match = ctaRegex.exec(content)) !== null) {
    ctas.push({
      title: match[1],
      description: match[2],
      index,
    })
    index++
  }

  // Replace CTAs with a placeholder that MarkdownContent can handle
  const cleanedContent = content.replace(
    /#newsletter-cta\(\s*'([^']*)'\s*,\s*'([^']*)'\s*\)/g,
    (_, title, desc) => `\n<!-- NEWSLETTER_CTA:${Buffer.from(JSON.stringify({ title, desc })).toString('base64')} -->\n`
  )

  return {
    content: cleanedContent,
    ctas,
    hasNewsletterCTA: ctas.length > 0,
  }
}
