import { describe, expect, it } from 'vitest'

import { splitIntoChunks } from './tts-chunks'

describe('splitIntoChunks', () => {
  it('splits paragraphs and long sentences as before', () => {
    // Splits on blank-line paragraph boundaries.
    expect(splitIntoChunks('First paragraph.\n\nSecond paragraph.')).toEqual([
      'First paragraph.',
      'Second paragraph.',
    ])

    // Strips markdown headers and bold markers.
    expect(splitIntoChunks('## Heading\n\n**bold** text')).toEqual(['Heading', 'bold text'])

    // Skips horizontal-rule section separators.
    expect(splitIntoChunks('Intro\n\n---\n\nOutro')).toEqual(['Intro', 'Outro'])

    // Breaks a paragraph that exceeds maxLength into sentence-sized chunks.
    const long = `${'a'.repeat(30)}. ${'b'.repeat(30)}.`
    const chunks = splitIntoChunks(long, 40)
    expect(chunks.length).toBeGreaterThan(1)
    chunks.forEach((chunk) => expect(chunk.length).toBeLessThanOrEqual(40))

    // Empty / whitespace-only input yields no chunks.
    expect(splitIntoChunks('   \n\n  ')).toEqual([])
  })
})
