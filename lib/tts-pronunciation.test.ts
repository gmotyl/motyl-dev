import { describe, expect, it } from 'vitest'
import { PRONUNCIATION_MAP } from './tts-pronunciation'
import { applyPronunciation } from './tts-speech'

describe('PRONUNCIATION_MAP', () => {
  it('contains the migrated and new entries with lowercase keys', () => {
    expect(PRONUNCIATION_MAP.benchmark).toBe('benczmark')
    expect(PRONUNCIATION_MAP.react).toBe('reakt')
    expect(PRONUNCIATION_MAP.microsoft).toBe('mikrosoft')
  })
})

describe('applyPronunciation', () => {
  it('replaces the stem and preserves Polish inflection suffixes', () => {
    expect(applyPronunciation('benchmark')).toBe('benczmark')
    expect(applyPronunciation('benchmarki')).toBe('benczmarki')
    expect(applyPronunciation('benchmarków')).toBe('benczmarków')
    expect(applyPronunciation('benchmarkiem')).toBe('benczmarkiem')
    expect(applyPronunciation('benchmarkingu')).toBe('benczmarkingu')
  })

  it('matches case-insensitively while lowercasing the stem', () => {
    expect(applyPronunciation('Benchmarki')).toBe('benczmarki')
    expect(applyPronunciation('React')).toBe('reakt')
    expect(applyPronunciation('react')).toBe('reakt')
    expect(applyPronunciation('Microsoft')).toBe('mikrosoft')
  })

  it('does not transform a key that is not at a word start', () => {
    expect(applyPronunciation('arbenchmark')).toBe('arbenchmark')
  })

  it('transforms multiple occurrences in a sentence', () => {
    expect(applyPronunciation('Nowe benchmarki Reacta')).toBe('Nowe benczmarki reakta')
  })
})
