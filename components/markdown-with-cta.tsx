'use client'

import { MarkdownContent } from '@/components/markdown-content'
import { NewsletterCTA } from '@/components/newsletter-cta'
import { extractInlineCTAs } from '@/lib/extract-inline-cta'
import { ItemTypeValue } from '@/lib/types'

interface MarkdownWithCTAProps {
  content: string
  itemType?: ItemTypeValue
  articleSlug?: string
}

export function MarkdownWithCTA({ content, itemType, articleSlug }: MarkdownWithCTAProps) {
  const { content: cleanedContent, ctas } = extractInlineCTAs(content)

  // If no CTAs, just render the content normally
  if (ctas.length === 0) {
    return <MarkdownContent content={content} itemType={itemType} />
  }

  // Split content by CTA placeholders (format: <!-- NEWSLETTER_CTA:base64string -->)
  // Use flexible whitespace matching to handle various newline scenarios
  const parts = cleanedContent.split(/\s*<!-- NEWSLETTER_CTA:[A-Za-z0-9+/=]+ -->\s*/g)

  return (
    <>
      {parts.map((part, index) => (
        <div key={index}>
          {part.trim() && (
            <MarkdownContent content={part} itemType={itemType} />
          )}
          {ctas[index] && (
            <NewsletterCTA
              title={ctas[index].title}
              description={ctas[index].description}
              articleSlug={articleSlug}
            />
          )}
        </div>
      ))}
    </>
  )
}
