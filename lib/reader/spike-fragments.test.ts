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
 * A floor on fragment length. It is NOT a guarantee of twenty seconds.
 *
 * What it actually guards against is a one-liner: a fragment short enough that
 * the run would be mostly boundaries, which would quietly change what the
 * protocol measures.
 *
 * The arithmetic, stated honestly. Polish TTS at a normal rate reads roughly
 * 150 words per minute and a Polish word plus its following space averages
 * about 7 characters: ~17.5 chars/s. 240 was derived by rounding that DOWN to
 * 13 chars/s — i.e. from the SLOWEST plausible voice, which is the direction
 * that makes fragments PASS, not the direction that makes the audio long
 * enough. To actually guarantee twenty seconds you divide by the FASTEST
 * plausible rate, and at ~17.5 chars/s that is ~350 characters.
 *
 * The floor is deliberately left at 240 anyway. The eight committed fragments
 * run 288–303 characters, so raising it would rewrite prose against a number
 * nobody has checked against a real synth: no measured duration exists yet.
 * The seam report's `expectedDuration` settles the true durations on the first
 * screen-on bench run, and the floor can be set from that instead of from an
 * estimate.
 *
 * What a passing-but-short fragment would cost, so the risk is on the record:
 * a 243-character fragment speaks for about 14–16 s rather than 20 s, which is
 * 27–43% more fragment boundaries per ten-minute run. Boundaries survived over
 * time is the measurement, so that is silent drift in the instrument itself.
 */
const MIN_FRAGMENT_CHARS = 240

const enable = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

/**
 * The vocabulary Task 1 adds; every one must be loggable like any existing type.
 *
 * The `readonly ReaderLogEventType[]` annotation is the ENTIRE compile-time
 * gate for "nine new types": it fails only on a name that is not in the union.
 * A member DELETED from the union is invisible to `pnpm test` — this array
 * would simply stop compiling, which only `npx tsc --noEmit` reports. The
 * length assertion below is what stops the array itself being emptied.
 */
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
      // Long enough not to be a one-liner — NOT a proof of twenty seconds.
      // See MIN_FRAGMENT_CHARS above for why the two differ.
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

    // The criterion says nine. Without this the whole test passes vacuously on
    // an emptied array, and only a hand count stands behind the number.
    expect(NEW_EVENT_TYPES).toHaveLength(9)

    for (const type of NEW_EVENT_TYPES) {
      logReaderEvent(type, type)
    }

    const entries = readReaderLog()
    expect(entries.map((entry) => entry.type)).toEqual([...NEW_EVENT_TYPES])
    expect(entries.map((entry) => entry.detail)).toEqual([...NEW_EVENT_TYPES])
  })
})
