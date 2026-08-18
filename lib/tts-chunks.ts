/**
 * Split source text into chunks suitable for TTS synthesis.
 *
 * Single source of truth for chunking (shared by useTTS and the continuous
 * reader's cross-section prefetch). Strips markdown, skips horizontal-rule
 * separators, and keeps each chunk within `maxLength` characters, breaking on
 * paragraph -> sentence -> word boundaries as needed.
 */
export function splitIntoChunks(text: string, maxLength = 1000): string[] {
  const chunks: string[] = []
  const paragraphs = text.split(/\n\n+/)

  for (const paragraph of paragraphs) {
    // Skip horizontal rules (section separators)
    if (/^-{3,}$/.test(paragraph.trim())) continue

    const clean = paragraph
      .replace(/#{1,6}\s+/g, '') // Remove markdown headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/`([^`]+)`/g, '$1') // Remove code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
      .replace(/>\s+/g, '') // Remove blockquotes
      .replace(/[-*+]\s+/g, '') // Remove list markers
      .replace(/\d+\.\s+/g, '') // Remove numbered list markers
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()

    if (!clean) continue

    if (clean.length <= maxLength) {
      chunks.push(clean)
    } else {
      const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean]
      let currentChunk = ''

      for (const sentence of sentences) {
        if ((currentChunk + ' ' + sentence).trim().length <= maxLength) {
          currentChunk = (currentChunk + ' ' + sentence).trim()
        } else {
          if (currentChunk) chunks.push(currentChunk)

          if (sentence.length > maxLength) {
            const words = sentence.split(/\s+/)
            let wordChunk = ''
            for (const word of words) {
              if ((wordChunk + ' ' + word).trim().length <= maxLength) {
                wordChunk = (wordChunk + ' ' + word).trim()
              } else {
                if (wordChunk) chunks.push(wordChunk)
                wordChunk = word
              }
            }
            if (wordChunk) currentChunk = wordChunk
          } else {
            currentChunk = sentence
          }
        }
      }
      if (currentChunk) chunks.push(currentChunk)
    }
  }

  return chunks.filter((c) => c.length > 0)
}
