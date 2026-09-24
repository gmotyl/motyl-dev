import { beforeEach, describe, expect, it } from 'vitest'
import {
  READER_LOG_FLAG,
  type ReaderLogEventType,
  clearReaderLog,
  logReaderEvent,
  readReaderLog,
} from '@/lib/reader/diagnostic-log'
import { SPIKE_FRAGMENTS } from '@/lib/reader/spike-fragments'

/**
 * Speech-rate assumption for the length floor below.
 *
 * Polish TTS at a normal rate reads roughly 150 words per minute; a Polish word
 * plus its following space averages about 7 characters. That is ~17.5 chars/s,
 * which we round DOWN to 13 chars/s so a slower voice still clears the bar.
 * Twenty seconds at 13 chars/s is 260 characters, and we require 240 to leave
 * the wording a little room without letting a one-liner through.
 */
const MIN_FRAGMENT_CHARS = 240

const enable = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

/** The vocabulary Task 1 adds; every one must be loggable like any existing type. */
const NEW_EVENT_TYPES: readonly ReaderLogEventType[] = [
  'spike-mode',
  'append',
  'append-failed',
  'media-pause',
  'media-stalled',
  'media-waiting',
  'media-suspend',
  'mediasession-state',
  'heartbeat',
]

beforeEach(() => {
  window.localStorage.clear()
  clearReaderLog()
})

describe('SPIKE_FRAGMENTS', () => {
  it('exposes eight fragments with contiguous indices', () => {
    expect(SPIKE_FRAGMENTS).toHaveLength(8)
    expect(SPIKE_FRAGMENTS.map((fragment) => fragment.index)).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
  })

  it('gives every fragment distinct, speakable text', () => {
    // Guard against a vacuous pass: an empty array would satisfy every loop
    // and every Set comparison below.
    expect(SPIKE_FRAGMENTS.length).toBeGreaterThan(0)

    for (const fragment of SPIKE_FRAGMENTS) {
      expect(fragment.text.trim()).not.toBe('')
      // Roughly twenty seconds of speech; see MIN_FRAGMENT_CHARS above.
      expect(fragment.text.trim().length).toBeGreaterThanOrEqual(MIN_FRAGMENT_CHARS)
    }

    // Distinct text is what makes a repeated log line mean a real repeat: the
    // operator listening with the screen off identifies the fragment by ear.
    const texts = SPIKE_FRAGMENTS.map((fragment) => fragment.text.trim())
    expect(new Set(texts).size).toBe(texts.length)
  })
})

describe('the widened diagnostic log vocabulary', () => {
  it('records each of the new spike event types', () => {
    enable()

    for (const type of NEW_EVENT_TYPES) {
      logReaderEvent(type, type)
    }

    const entries = readReaderLog()
    expect(entries.map((entry) => entry.type)).toEqual([...NEW_EVENT_TYPES])
    expect(entries.map((entry) => entry.detail)).toEqual([...NEW_EVENT_TYPES])
  })
})
