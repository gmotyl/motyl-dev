import { describe, expect, it } from 'vitest'
import { PRONUNCIATION_MAP } from '@/lib/tts/pronunciation'
import { applyPronunciation } from '@/lib/tts/speech'

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

  it('fixes English c-words (Polish would read leading "c" as "ts")', () => {
    expect(applyPronunciation('cache')).toBe('kesz')
    expect(applyPronunciation("cache'owania")).toBe("kesz'owania")
    expect(applyPronunciation('commit')).toBe('komit')
    expect(applyPronunciation('commitowanego')).toBe('komitowanego')
    expect(applyPronunciation('Cursora')).toBe('kersora')
  })

  it('applies the codex guard before the shorter code stem (longest-first)', () => {
    expect(applyPronunciation('Codex')).toBe('kodeks')
    expect(applyPronunciation('Claude Code')).toBe('klod koud')
  })

  it('applies cloudflare before the shorter cloud stem', () => {
    expect(applyPronunciation('Cloudflare')).toBe('klałdfler')
    expect(applyPronunciation('Google Cloud')).toBe('Google klałd')
  })

  it('matches multi-word phrase keys and preserves inflection', () => {
    expect(applyPronunciation('pull requesty')).toBe('pul rikłesty')
    expect(applyPronunciation('open source')).toBe('oupen sors')
    expect(applyPronunciation('Hugging Face')).toBe('haging fejs')
  })

  it('does not corrupt the Polish word "facet" (no bare face stem)', () => {
    expect(applyPronunciation('facet')).toBe('facet')
  })

  it('preserves Polish inflection on new stems', () => {
    expect(applyPronunciation('frameworku')).toBe('frejmłerku')
    expect(applyPronunciation('deploya')).toBe('diploja')
    expect(applyPronunciation('bugi')).toBe('bagi')
  })
})
