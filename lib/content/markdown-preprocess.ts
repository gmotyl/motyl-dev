import * as emoji from 'node-emoji'

/**
 * The text transform `<MarkdownContent>` applies before handing markdown to
 * react-markdown. Shared with `firstExternalLink` so the reader-bar vote strip
 * parses exactly the string the page renders (e.g. a `:rocket:` shortcode
 * inside a URL becomes the same href on both sides). Pure, client-safe.
 */
export function preprocessMarkdown(content: string): string {
  // Strip "**Link:**" labels (redundant with inline vote buttons)
  const cleaned = content.replace(/\*\*Link:\*\*\s*/g, '')
  return emoji.emojify(cleaned)
}
