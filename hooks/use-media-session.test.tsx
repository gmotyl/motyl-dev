import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  MEDIA_SESSION_ARTWORK,
  useMediaSession,
  type MediaSessionHandlers,
  type MediaSessionPosition,
  type UseMediaSessionOptions,
} from './use-media-session'

type ActionHandler = (() => void) | null

interface MediaSessionStub {
  metadata: unknown
  playbackState: string
  setActionHandler: (action: string, handler: ActionHandler) => void
  setPositionState?: unknown
}

let mediaSession: MediaSessionStub
let actionHandlers: Map<string, ActionHandler>
/** Every value written through the `metadata` setter, in order. */
let metadataWrites: unknown[]
/**
 * Every argument `setPositionState` was called with, in order — `undefined`
 * being the clear. The count is observable behaviour in both directions here:
 * a state the API would reject must not be published AT ALL, and a stale one
 * must not be left standing.
 */
let positionWrites: Array<MediaSessionPosition | undefined>

class MediaMetadataStub {
  title: string
  artist: string
  album: string
  artwork: unknown

  constructor(init: { title?: string; artist?: string; album?: string; artwork?: unknown }) {
    this.title = init.title ?? ''
    this.artist = init.artist ?? ''
    this.album = init.album ?? ''
    this.artwork = init.artwork ?? []
  }
}

const installMediaSession = () => {
  actionHandlers = new Map()
  metadataWrites = []
  positionWrites = []
  let metadataValue: unknown = null

  mediaSession = {
    get metadata() {
      return metadataValue
    },
    // Chromium forwards every setter call to the browser process, so the number of
    // writes is observable behaviour, not an implementation detail.
    set metadata(next: unknown) {
      metadataValue = next
      metadataWrites.push(next)
    },
    playbackState: 'none',
    setActionHandler: vi.fn((action: string, handler: ActionHandler) => {
      actionHandlers.set(action, handler)
    }),
    setPositionState: vi.fn((state?: MediaSessionPosition) => {
      positionWrites.push(state)
    }),
  }

  Object.defineProperty(navigator, 'mediaSession', {
    value: mediaSession,
    configurable: true,
    writable: true,
  })
  vi.stubGlobal('MediaMetadata', MediaMetadataStub)
}

const removeMediaSession = () => {
  delete (navigator as unknown as Record<string, unknown>).mediaSession
  vi.unstubAllGlobals()
}

const fireAction = (action: string) => {
  const handler = actionHandlers.get(action)
  expect(handler).toBeTypeOf('function')
  handler?.()
}

const makeHandlers = (): MediaSessionHandlers => ({
  play: vi.fn(),
  pause: vi.fn(),
  nexttrack: vi.fn(),
  previoustrack: vi.fn(),
})

const baseOptions = (overrides: Partial<UseMediaSessionOptions> = {}): UseMediaSessionOptions => ({
  active: true,
  metadata: { title: 'Section 1', artist: 'Motyl.dev', album: 'Reader Article' },
  playbackState: 'playing',
  readPosition: null,
  handlers: makeHandlers(),
  ...overrides,
})

/** A position state the API accepts, so a test can vary one field at a time. */
const validPosition = (overrides: Partial<MediaSessionPosition> = {}): MediaSessionPosition => ({
  position: 4,
  duration: 30,
  playbackRate: 1,
  ...overrides,
})

/**
 * The hook asks for the position once per commit, so a test supplies a reader
 * rather than a value — `readingNothing` being the caller with no track at all.
 */
const reading = (overrides: Partial<MediaSessionPosition> = {}) => () => validPosition(overrides)
const readingNothing = () => (): MediaSessionPosition | null => null

const publishedMetadata = () => mediaSession.metadata as MediaMetadataStub

describe('useMediaSession', () => {
  beforeEach(() => {
    installMediaSession()
  })

  afterEach(() => {
    removeMediaSession()
    vi.restoreAllMocks()
  })

  it('publishes metadata with the manifest artwork while active', () => {
    renderHook(() => useMediaSession(baseOptions()))

    const metadata = publishedMetadata()
    expect(metadata).toBeInstanceOf(MediaMetadataStub)
    expect(metadata.title).toBe('Section 1')
    expect(metadata.artist).toBe('Motyl.dev')
    expect(metadata.album).toBe('Reader Article')
    expect(metadata.artwork).toEqual([
      { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ])
    expect(metadata.artwork).toEqual([...MEDIA_SESSION_ARTWORK])
  })

  it('follows the section: republishes metadata when the section changes', () => {
    const { rerender } = renderHook(
      (options: UseMediaSessionOptions) => useMediaSession(options),
      { initialProps: baseOptions() },
    )
    expect(publishedMetadata().title).toBe('Section 1')

    rerender(
      baseOptions({
        metadata: { title: 'Section 2', artist: 'Motyl.dev', album: 'Reader Article' },
      }),
    )

    const metadata = publishedMetadata()
    expect(metadata).toBeInstanceOf(MediaMetadataStub)
    expect(metadata.title).toBe('Section 2')
    expect(metadata.artist).toBe('Motyl.dev')
    expect(metadata.album).toBe('Reader Article')
  })

  it('writes metadata exactly once per section change, never a null in between', () => {
    const { rerender } = renderHook(
      (options: UseMediaSessionOptions) => useMediaSession(options),
      { initialProps: baseOptions() },
    )
    expect(metadataWrites).toHaveLength(1)

    rerender(
      baseOptions({
        metadata: { title: 'Section 2', artist: 'Motyl.dev', album: 'Reader Article' },
      }),
    )
    expect(metadataWrites).toHaveLength(2)

    rerender(
      baseOptions({
        metadata: { title: 'Section 3', artist: 'Motyl.dev', album: 'Reader Article' },
      }),
    )
    expect(metadataWrites).toHaveLength(3)

    // A null between sections collapses the Android media notification.
    expect(metadataWrites).not.toContain(null)
    expect(metadataWrites[2]).toBe(mediaSession.metadata)
  })

  it('keeps the MediaMetadata identity stable across value-identical rerenders', () => {
    const { rerender } = renderHook(
      (options: UseMediaSessionOptions) => useMediaSession(options),
      { initialProps: baseOptions() },
    )
    const first = mediaSession.metadata
    expect(first).toBeInstanceOf(MediaMetadataStub)

    // Fresh `metadata` object identities, identical values — every parent render.
    rerender(baseOptions())
    rerender(baseOptions())

    expect(mediaSession.metadata).toBe(first)
    expect(metadataWrites).toHaveLength(1)
  })

  it('clears metadata instead of constructing MediaMetadata when active with no metadata', () => {
    mediaSession.metadata = new MediaMetadataStub({ title: 'Owned by someone else' })

    renderHook(() => useMediaSession(baseOptions({ metadata: null })))

    expect(mediaSession.metadata).toBeNull()
    expect(mediaSession.metadata).not.toBeInstanceOf(MediaMetadataStub)
  })

  it('registers play, pause, nexttrack and previoustrack handlers', () => {
    const handlers = makeHandlers()
    renderHook(() => useMediaSession(baseOptions({ handlers })))

    for (const action of ['play', 'pause', 'nexttrack', 'previoustrack']) {
      expect(actionHandlers.get(action)).toBeTypeOf('function')
    }

    fireAction('play')
    fireAction('pause')
    fireAction('nexttrack')
    fireAction('previoustrack')

    expect(handlers.play).toHaveBeenCalledTimes(1)
    expect(handlers.pause).toHaveBeenCalledTimes(1)
    expect(handlers.nexttrack).toHaveBeenCalledTimes(1)
    expect(handlers.previoustrack).toHaveBeenCalledTimes(1)
  })

  it('invokes the latest handler when an action fires after a re-render', () => {
    const staleHandlers = makeHandlers()
    const freshHandlers = makeHandlers()

    const { rerender } = renderHook(
      (options: UseMediaSessionOptions) => useMediaSession(options),
      { initialProps: baseOptions({ handlers: staleHandlers }) },
    )

    rerender(baseOptions({ handlers: freshHandlers }))

    fireAction('play')
    fireAction('nexttrack')

    expect(staleHandlers.play).not.toHaveBeenCalled()
    expect(staleHandlers.nexttrack).not.toHaveBeenCalled()
    expect(freshHandlers.play).toHaveBeenCalledTimes(1)
    expect(freshHandlers.nexttrack).toHaveBeenCalledTimes(1)
  })

  it('mirrors playbackState onto the media session', () => {
    const { rerender } = renderHook(
      (options: UseMediaSessionOptions) => useMediaSession(options),
      { initialProps: baseOptions({ playbackState: 'playing' }) },
    )
    expect(mediaSession.playbackState).toBe('playing')

    rerender(baseOptions({ playbackState: 'paused' }))
    expect(mediaSession.playbackState).toBe('paused')

    rerender(baseOptions({ playbackState: 'none' }))
    expect(mediaSession.playbackState).toBe('none')
  })

  it('registers nothing while inactive and never writes to the global', () => {
    // Pre-seed the singleton as another, active reader would have left it.
    const foreignMetadata = new MediaMetadataStub({ title: 'Owned by someone else' })
    mediaSession.metadata = foreignMetadata
    mediaSession.playbackState = 'playing'

    renderHook(() => useMediaSession(baseOptions({ active: false })))

    expect(mediaSession.metadata).toBe(foreignMetadata)
    expect(mediaSession.setActionHandler).not.toHaveBeenCalled()
    expect(mediaSession.playbackState).toBe('playing')
  })

  it('leaves an active instance untouched when an inactive instance is mounted alongside it', () => {
    const activeHandlers = makeHandlers()

    renderHook(() => {
      useMediaSession(baseOptions({ active: true, handlers: activeHandlers }))
      // The blog article's reader: mounted with an empty queue, so inactive.
      useMediaSession(
        baseOptions({ active: false, metadata: null, playbackState: 'none', handlers: makeHandlers() }),
      )
    })

    const metadata = publishedMetadata()
    expect(metadata).toBeInstanceOf(MediaMetadataStub)
    expect(metadata.title).toBe('Section 1')
    expect(mediaSession.playbackState).toBe('playing')

    for (const action of ['play', 'pause', 'nexttrack', 'previoustrack']) {
      expect(actionHandlers.get(action)).toBeTypeOf('function')
    }

    fireAction('play')
    expect(activeHandlers.play).toHaveBeenCalledTimes(1)
  })

  it('leaves an active instance untouched when it mounts after an inactive one', () => {
    renderHook(() => {
      useMediaSession(
        baseOptions({ active: false, metadata: null, playbackState: 'none', handlers: makeHandlers() }),
      )
      useMediaSession(baseOptions({ active: true }))
    })

    const metadata = publishedMetadata()
    expect(metadata).toBeInstanceOf(MediaMetadataStub)
    expect(metadata.title).toBe('Section 1')
    expect(mediaSession.playbackState).toBe('playing')
    expect(actionHandlers.get('play')).toBeTypeOf('function')
  })

  it('does not let a former owner tear down the session after another instance took over', () => {
    const readerA = makeHandlers()
    const readerB = makeHandlers()

    const { rerender } = renderHook(
      ({ aActive, bActive }: { aActive: boolean; bActive: boolean }) => {
        useMediaSession(
          baseOptions({
            active: aActive,
            metadata: { title: 'Reader A', artist: 'Motyl.dev', album: 'Article A' },
            playbackState: 'paused',
            handlers: readerA,
          }),
        )
        useMediaSession(
          baseOptions({
            active: bActive,
            metadata: { title: 'Reader B', artist: 'Motyl.dev', album: 'Article B' },
            playbackState: 'playing',
            handlers: readerB,
          }),
        )
      },
      { initialProps: { aActive: true, bActive: false } },
    )

    // Commit 1: A owns the global.
    expect(publishedMetadata().title).toBe('Reader A')
    expect(mediaSession.playbackState).toBe('paused')

    // Commit 2: B becomes active too and seizes the global.
    rerender({ aActive: true, bActive: true })
    expect(publishedMetadata().title).toBe('Reader B')
    expect(mediaSession.playbackState).toBe('playing')

    // Commit 3: the former owner goes inactive. B's deps did not change, so B
    // never re-runs — its writes have to survive A's teardown on their own.
    rerender({ aActive: false, bActive: true })

    expect(publishedMetadata()).toBeInstanceOf(MediaMetadataStub)
    expect(publishedMetadata().title).toBe('Reader B')
    expect(mediaSession.playbackState).toBe('playing')
    expect(actionHandlers.get('play')).toBeTypeOf('function')
    expect(actionHandlers.get('pause')).toBeTypeOf('function')
    expect(actionHandlers.get('nexttrack')).toBeTypeOf('function')
    expect(actionHandlers.get('previoustrack')).toBeTypeOf('function')

    fireAction('play')
    expect(readerB.play).toHaveBeenCalledTimes(1)
    expect(readerA.play).not.toHaveBeenCalled()
  })

  it('registers the remaining actions when one action is unsupported', () => {
    mediaSession.setActionHandler = vi.fn((action: string, handler: ActionHandler) => {
      if (action === 'nexttrack') throw new TypeError('unsupported action')
      actionHandlers.set(action, handler)
    })

    expect(() => renderHook(() => useMediaSession(baseOptions()))).not.toThrow()

    expect(actionHandlers.get('play')).toBeTypeOf('function')
    expect(actionHandlers.get('pause')).toBeTypeOf('function')
    expect(actionHandlers.get('previoustrack')).toBeTypeOf('function')
    expect(actionHandlers.has('nexttrack')).toBe(false)
  })

  it('releases handlers, metadata and playbackState when it goes inactive', () => {
    const { rerender } = renderHook(
      (options: UseMediaSessionOptions) => useMediaSession(options),
      { initialProps: baseOptions({ active: true }) },
    )
    expect(actionHandlers.get('play')).toBeTypeOf('function')
    expect(mediaSession.metadata).toBeInstanceOf(MediaMetadataStub)
    expect(mediaSession.playbackState).toBe('playing')

    rerender(baseOptions({ active: false }))

    expect(actionHandlers.get('play')).toBeNull()
    expect(actionHandlers.get('pause')).toBeNull()
    expect(actionHandlers.get('nexttrack')).toBeNull()
    expect(actionHandlers.get('previoustrack')).toBeNull()
    expect(mediaSession.playbackState).toBe('none')
    expect(mediaSession.metadata).toBeNull()
  })

  it('releases handlers, metadata and playbackState on unmount', () => {
    const { unmount } = renderHook(() => useMediaSession(baseOptions()))
    expect(actionHandlers.get('play')).toBeTypeOf('function')
    expect(mediaSession.metadata).toBeInstanceOf(MediaMetadataStub)

    unmount()

    expect(actionHandlers.get('play')).toBeNull()
    expect(actionHandlers.get('pause')).toBeNull()
    expect(actionHandlers.get('nexttrack')).toBeNull()
    expect(actionHandlers.get('previoustrack')).toBeNull()
    expect(mediaSession.playbackState).toBe('none')
    expect(mediaSession.metadata).toBeNull()
  })

  it('no-ops when the Media Session API is unavailable', () => {
    removeMediaSession()
    expect('mediaSession' in navigator).toBe(false)

    const { unmount } = renderHook(() => useMediaSession(baseOptions()))
    expect(() => unmount()).not.toThrow()
  })

  it('no-ops for metadata when MediaMetadata is unavailable but mediaSession exists', () => {
    const foreignMetadata = new MediaMetadataStub({ title: 'Owned by someone else' })
    mediaSession.metadata = foreignMetadata
    vi.stubGlobal('MediaMetadata', undefined)
    expect('mediaSession' in navigator).toBe(true)

    const { unmount } = renderHook(() => useMediaSession(baseOptions()))

    // No constructor, nothing to publish — and nothing written either.
    expect(mediaSession.metadata).toBe(foreignMetadata)
    // Everything that does not need the constructor still works.
    expect(actionHandlers.get('play')).toBeTypeOf('function')
    expect(mediaSession.playbackState).toBe('playing')
    expect(() => unmount()).not.toThrow()
  })

  /**
   * Position state — what a car head unit reads over AVRCP.
   *
   * Chrome derives one from the `<audio>` element when nothing publishes it,
   * and on the MSE carrier that derivation is incoherent: the element's clock
   * runs for the whole session while a TRACK is one section, and its duration
   * is NaN. Publishing the section's own numbers is the fix — but
   * `setPositionState` throws a `TypeError` on a duration that is negative or
   * NaN, on a position outside `[0, duration]` and on a rate of 0, so every
   * test here is about what must NOT reach it as much as what must.
   */
  describe('position state', () => {
    const lastPosition = () => positionWrites.at(-1)

    it('publishes the position, duration and rate it is given while active', () => {
      renderHook(() => useMediaSession(baseOptions({ readPosition: reading() })))

      expect(positionWrites).toEqual([{ position: 4, duration: 30, playbackRate: 1 }])
    })

    it('republishes when the playhead moves and stays quiet when it has not', () => {
      const { rerender } = renderHook(
        (options: UseMediaSessionOptions) => useMediaSession(options),
        { initialProps: baseOptions({ readPosition: reading({ position: 4 }) }) },
      )
      expect(positionWrites).toHaveLength(1)

      rerender(baseOptions({ readPosition: reading({ position: 9 }) }))
      expect(lastPosition()).toEqual({ position: 9, duration: 30, playbackRate: 1 })

      // Fresh object identity, identical values — every parent render. Chromium
      // forwards each call to the browser process, so a re-publish per render
      // is traffic, not a no-op.
      rerender(baseOptions({ readPosition: reading({ position: 9 }) }))
      expect(positionWrites).toHaveLength(2)
    })

    it('skips a state with a NaN duration and keeps the last good one standing', () => {
      const { rerender } = renderHook(
        (options: UseMediaSessionOptions) => useMediaSession(options),
        { initialProps: baseOptions({ readPosition: reading({ position: 4 }) }) },
      )

      // The MSE path's natural failure: `element.duration` is NaN, so a
      // duration derived from it is too.
      rerender(baseOptions({ readPosition: reading({ duration: Number.NaN }) }))
      rerender(baseOptions({ readPosition: reading({ position: 9 }) }))

      // Three renders, two writes: the rejected one left no trace between them.
      expect(positionWrites).toEqual([
        { position: 4, duration: 30, playbackRate: 1 },
        { position: 9, duration: 30, playbackRate: 1 },
      ])
    })

    it('skips a position past the end of its own track', () => {
      const { rerender } = renderHook(
        (options: UseMediaSessionOptions) => useMediaSession(options),
        { initialProps: baseOptions({ readPosition: reading({ position: 4 }) }) },
      )

      rerender(baseOptions({ readPosition: reading({ position: 31, duration: 30 }) }))
      rerender(baseOptions({ readPosition: reading({ position: 9 }) }))

      expect(positionWrites).toEqual([
        { position: 4, duration: 30, playbackRate: 1 },
        { position: 9, duration: 30, playbackRate: 1 },
      ])
    })

    it('skips a negative position and a negative duration', () => {
      const { rerender } = renderHook(
        (options: UseMediaSessionOptions) => useMediaSession(options),
        { initialProps: baseOptions({ readPosition: reading({ position: 4 }) }) },
      )

      rerender(baseOptions({ readPosition: reading({ position: -1 }) }))
      rerender(baseOptions({ readPosition: reading({ duration: -30, position: 0 }) }))
      rerender(baseOptions({ readPosition: reading({ position: 9 }) }))

      expect(positionWrites).toEqual([
        { position: 4, duration: 30, playbackRate: 1 },
        { position: 9, duration: 30, playbackRate: 1 },
      ])
    })

    it('skips a playback rate of zero', () => {
      const { rerender } = renderHook(
        (options: UseMediaSessionOptions) => useMediaSession(options),
        { initialProps: baseOptions({ readPosition: reading({ position: 4 }) }) },
      )

      rerender(baseOptions({ readPosition: reading({ playbackRate: 0 }) }))
      rerender(baseOptions({ readPosition: reading({ position: 9 }) }))

      expect(positionWrites).toEqual([
        { position: 4, duration: 30, playbackRate: 1 },
        { position: 9, duration: 30, playbackRate: 1 },
      ])
    })

    it('clears the position state when the reader has no track to be in', () => {
      const { rerender } = renderHook(
        (options: UseMediaSessionOptions) => useMediaSession(options),
        { initialProps: baseOptions({ readPosition: reading() }) },
      )
      expect(positionWrites).toHaveLength(1)

      // Stop: the timeline is gone, so there is no position — and a stale one
      // left on the lock screen outlives the reader that put it there.
      rerender(baseOptions({ readPosition: readingNothing() }))

      expect(positionWrites).toHaveLength(2)
      expect(lastPosition()).toBeUndefined()
    })

    it('clears the position state on unmount', () => {
      const { unmount } = renderHook(() =>
        useMediaSession(baseOptions({ readPosition: reading() })),
      )
      expect(positionWrites).toEqual([{ position: 4, duration: 30, playbackRate: 1 }])

      unmount()

      expect(positionWrites).toHaveLength(2)
      expect(lastPosition()).toBeUndefined()
    })

    it('clears the position state when it goes inactive', () => {
      const { rerender } = renderHook(
        (options: UseMediaSessionOptions) => useMediaSession(options),
        { initialProps: baseOptions({ active: true, readPosition: reading() }) },
      )
      expect(positionWrites).toHaveLength(1)

      rerender(baseOptions({ active: false, readPosition: reading() }))

      expect(positionWrites).toHaveLength(2)
      expect(lastPosition()).toBeUndefined()
    })

    it('publishes nothing at all while inactive', () => {
      // Both directions in one test: silence has to be caused by `active:
      // false` and by nothing else, or an implementation that publishes no
      // position ever would pass the first half on its own.
      const { rerender } = renderHook(
        (options: UseMediaSessionOptions) => useMediaSession(options),
        { initialProps: baseOptions({ active: false, readPosition: reading() }) },
      )
      expect(positionWrites).toEqual([])

      rerender(baseOptions({ active: true, readPosition: reading() }))
      expect(positionWrites).toEqual([{ position: 4, duration: 30, playbackRate: 1 }])
    })

    it('does not let a former owner clear the position another instance published', () => {
      // The same fight `aa9c831` and `7b1dbb0` settled for metadata and
      // playbackState: two readers mounted at once, and the one going inactive
      // must not undo the one that took the global over.
      const { rerender } = renderHook(
        ({ aActive, bActive }: { aActive: boolean; bActive: boolean }) => {
          useMediaSession(
            baseOptions({ active: aActive, readPosition: reading({ position: 4 }) }),
          )
          useMediaSession(
            baseOptions({ active: bActive, readPosition: reading({ position: 20 }) }),
          )
        },
        { initialProps: { aActive: true, bActive: false } },
      )
      expect(lastPosition()).toEqual({ position: 4, duration: 30, playbackRate: 1 })

      rerender({ aActive: true, bActive: true })
      expect(lastPosition()).toEqual({ position: 20, duration: 30, playbackRate: 1 })

      // The former owner leaves. B's deps did not change, so B never re-runs:
      // its published position has to survive A's teardown on its own.
      rerender({ aActive: false, bActive: true })

      expect(lastPosition()).toEqual({ position: 20, duration: 30, playbackRate: 1 })
      expect(positionWrites).not.toContain(undefined)
    })

    it('keeps going when setPositionState throws', () => {
      // A media-session failure must never break playback, and Chromium has
      // shipped versions that reject states this hook considers valid.
      const throwing = vi.fn(() => {
        throw new TypeError('rejected')
      })
      mediaSession.setPositionState = throwing

      expect(() =>
        renderHook(() => useMediaSession(baseOptions({ readPosition: reading() }))),
      ).not.toThrow()

      expect(throwing).toHaveBeenCalledTimes(1)
      // ...and the rest of the session was still published.
      expect(publishedMetadata().title).toBe('Section 1')
      expect(mediaSession.playbackState).toBe('playing')
    })

    it('feature-detects setPositionState and publishes once the browser has one', () => {
      // Not every browser implements it; on those the property is simply
      // absent, and calling it would throw inside a render.
      delete mediaSession.setPositionState

      const { rerender } = renderHook(
        (options: UseMediaSessionOptions) => useMediaSession(options),
        { initialProps: baseOptions({ readPosition: reading({ position: 4 }) }) },
      )
      expect(publishedMetadata().title).toBe('Section 1')

      mediaSession.setPositionState = vi.fn((state?: MediaSessionPosition) => {
        positionWrites.push(state)
      })
      rerender(baseOptions({ readPosition: reading({ position: 9 }) }))

      expect(positionWrites).toEqual([{ position: 9, duration: 30, playbackRate: 1 }])
    })
  })
})
