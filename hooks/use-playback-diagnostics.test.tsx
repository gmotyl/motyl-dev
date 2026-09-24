import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { READER_LOG_FLAG, clearReaderLog, readReaderLog } from '@/lib/reader/diagnostic-log'

import { usePlaybackDiagnostics } from './use-playback-diagnostics'

const enable = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

const recorded = () => readReaderLog().map((entry) => [entry.type, entry.detail])

const recordedTypes = () => readReaderLog().map((entry) => entry.type)

/**
 * jsdom's HTMLMediaElement refuses playback and pins `currentTime`, so the
 * element under test is a bare EventTarget carrying the two properties the hook
 * actually reads. Everything the hook does with it — addEventListener,
 * removeEventListener, dispatchEvent, `paused`, `currentTime` — is real.
 */
class FakeAudioElement extends EventTarget {
  paused = true
  currentTime = 0
}

const makeElement = () => new FakeAudioElement()

/**
 * The hook's parameter is `HTMLAudioElement`, whose `paused` and `currentTime`
 * are readonly to TypeScript; the fake keeps them writable, so the cast happens
 * at the call site and the test keeps the mutable handle.
 */
const asAudio = (element: FakeAudioElement) => element as unknown as HTMLAudioElement

/** The four element events the hook is responsible for. */
const fireAllElementEvents = (element: FakeAudioElement) => {
  element.dispatchEvent(new Event('pause'))
  element.dispatchEvent(new Event('stalled'))
  element.dispatchEvent(new Event('waiting'))
  element.dispatchEvent(new Event('suspend'))
}

/**
 * `navigator.mediaSession` is absent in jsdom. It is defined as an own,
 * configurable property and deleted again in `afterEach` — deliberately NOT
 * `vi.stubGlobal`, because the matching `vi.unstubAllGlobals()` would also wipe
 * `vitest.setup.ts`'s ResizeObserver stub for every later test in the run.
 */
const setMediaSession = (playbackState: MediaSessionPlaybackState | undefined) => {
  if (playbackState === undefined) {
    delete (navigator as unknown as Record<string, unknown>).mediaSession
    return
  }
  const existing = (navigator as unknown as Record<string, unknown>).mediaSession as
    | { playbackState: MediaSessionPlaybackState }
    | undefined
  if (existing) {
    existing.playbackState = playbackState
    return
  }
  Object.defineProperty(navigator, 'mediaSession', {
    configurable: true,
    writable: true,
    value: { playbackState },
  })
}

beforeEach(() => {
  // The buffer is module-level and survives between tests; the flag lives in
  // localStorage and is read per event, so clearing both is what gives each
  // test an empty log and a disabled instrument to start from.
  window.localStorage.clear()
  clearReaderLog()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  delete (navigator as unknown as Record<string, unknown>).mediaSession
  vi.restoreAllMocks()
  // No vi.unstubAllGlobals() here: nothing in this file stubs a global, and it
  // would wipe vitest.setup.ts's ResizeObserver stub for every later test.
})

describe('usePlaybackDiagnostics', () => {
  it('records pause, stalled, waiting and suspend from the element', () => {
    enable()
    const element = makeElement()
    renderHook(() => usePlaybackDiagnostics(asAudio(element)))

    fireAllElementEvents(element)

    expect(recordedTypes()).toEqual([
      'media-pause',
      'media-stalled',
      'media-waiting',
      'media-suspend',
    ])
  })

  it('records a heartbeat carrying currentTime while playing', () => {
    enable()
    const element = makeElement()
    element.paused = false
    element.currentTime = 12.5

    renderHook(() => usePlaybackDiagnostics(asAudio(element)))

    // The documented default is 5000 ms: one tick short of it records nothing.
    vi.advanceTimersByTime(4999)
    expect(readReaderLog()).toHaveLength(0)

    vi.advanceTimersByTime(1)
    element.currentTime = 25
    vi.advanceTimersByTime(5000)

    expect(recorded()).toEqual([
      ['heartbeat', 'currentTime=12.500'],
      ['heartbeat', 'currentTime=25.000'],
    ])
  })

  it('records no heartbeat while paused', () => {
    enable()
    const element = makeElement()
    element.paused = true

    renderHook(() => usePlaybackDiagnostics(asAudio(element), { heartbeatMs: 100 }))

    vi.advanceTimersByTime(1000)
    expect(recordedTypes().filter((type) => type === 'heartbeat')).toEqual([])

    // Guards the assertion above against passing because no interval exists at
    // all: the same element, playing, does produce heartbeats.
    element.paused = false
    vi.advanceTimersByTime(100)
    expect(recordedTypes().filter((type) => type === 'heartbeat')).toHaveLength(1)
  })

  it('records media-session playback state transitions', () => {
    enable()
    setMediaSession('none')
    const element = makeElement()
    // Paused, so nothing but the state samples reaches the log.
    renderHook(() => usePlaybackDiagnostics(asAudio(element), { heartbeatMs: 100 }))

    setMediaSession('playing')
    vi.advanceTimersByTime(100)
    setMediaSession('paused')
    vi.advanceTimersByTime(100)
    // A sample with no change must not add a second entry.
    vi.advanceTimersByTime(100)

    expect(recorded()).toEqual([
      ['mediasession-state', 'playing'],
      ['mediasession-state', 'paused'],
    ])
  })

  it('samples the playback state right after an element event, with no timer advance', () => {
    enable()
    setMediaSession('playing')
    const element = makeElement()
    renderHook(() => usePlaybackDiagnostics(asAudio(element), { heartbeatMs: 100 }))

    // The state changed and an element event followed, with no tick in between.
    // The post-event sample is the only thing that can record the transition
    // here — half the documented strategy, and previously unexercised.
    setMediaSession('paused')
    element.dispatchEvent(new Event('pause'))

    expect(recorded()).toEqual([
      ['media-pause', undefined],
      ['mediasession-state', 'paused'],
    ])
  })

  it('records nothing and does not throw when there is no element', () => {
    enable()
    setMediaSession('playing')
    // A host that has not mounted its <audio> yet: the hook must no-op rather
    // than attach an interval to nothing.
    expect(() => renderHook(() => usePlaybackDiagnostics(null))).not.toThrow()

    setMediaSession('paused')
    vi.advanceTimersByTime(60_000)

    expect(readReaderLog()).toEqual([])
  })

  it('removes every listener and stops the heartbeat on unmount', () => {
    enable()
    const element = makeElement()
    const add = vi.spyOn(element, 'addEventListener')
    const remove = vi.spyOn(element, 'removeEventListener')

    const { unmount } = renderHook(() => usePlaybackDiagnostics(asAudio(element), { heartbeatMs: 100 }))

    const registrations = add.mock.calls
    // Guards the assertion below against passing vacuously.
    expect(registrations.length).toBeGreaterThan(0)

    unmount()

    // Mechanism: every registration was withdrawn with the same handler identity.
    for (const [type, handler] of registrations) {
      expect(
        remove.mock.calls.some(
          ([removedType, removedHandler]) => removedType === type && removedHandler === handler,
        ),
      ).toBe(true)
    }

    // Behaviour: neither the events nor the heartbeat reach the log once gone.
    fireAllElementEvents(element)
    element.paused = false
    vi.advanceTimersByTime(1000)
    expect(readReaderLog()).toHaveLength(0)
  })

  it('records nothing while the flag is unset', () => {
    const element = makeElement()
    element.paused = false
    const add = vi.spyOn(element, 'addEventListener')
    setMediaSession('none')

    renderHook(() => usePlaybackDiagnostics(asAudio(element), { heartbeatMs: 100 }))

    // The store is the single gate: the hook still attaches its listeners.
    expect(add.mock.calls.map(([type]) => type)).toEqual(
      expect.arrayContaining(['pause', 'stalled', 'waiting', 'suspend']),
    )

    fireAllElementEvents(element)
    setMediaSession('playing')
    vi.advanceTimersByTime(1000)

    expect(readReaderLog()).toHaveLength(0)
  })
})
