export interface NewsletterCTAParams {
  title?: string
  description?: string
}

/**
 * Parses a newsletter-cta hashtag to extract optional title and description
 *
 * Supports two formats:
 * - #newsletter-cta (returns null, use defaults)
 * - #newsletter-cta('Custom Title', 'Custom Description') (returns parsed params)
 *
 * @param hashtag - The hashtag string to parse (e.g., "#newsletter-cta" or "#newsletter-cta('title', 'desc')")
 * @returns Object with title and description if found, null otherwise
 */
export function parseNewsletterCTAHashtag(hashtag: string): NewsletterCTAParams | null {
  // Remove the '#' prefix
  const normalized = hashtag.startsWith('#') ? hashtag.slice(1) : hashtag

  // Check if it's just the basic hashtag
  if (normalized === 'newsletter-cta') {
    return null
  }

  // Try to parse the parametrized format: newsletter-cta('title', 'description')
  const match = normalized.match(/^newsletter-cta\(\s*'([^']*)'\s*,\s*'([^']*)'\s*\)$/)

  if (match && match[1] && match[2]) {
    return {
      title: match[1],
      description: match[2],
    }
  }

  // If it looks like newsletter-cta but doesn't match the format, return null (use defaults)
  return null
}
