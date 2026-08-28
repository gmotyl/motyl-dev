import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  MEDIA_SESSION_ARTWORK,
  useMediaSession,
  type MediaSessionHandlers,
  type UseMediaSessionOptions,
} from './use-media-session'

type ActionHandler = (() => void) | null

interface MediaSessionStub {
  metadata: unknown
  playbackState: string
  setActionHandler: (action: string, handler: ActionHandler) => void
}

let mediaSession: MediaSessionStub
let actionHandlers: Map<string, ActionHandler>
/** Every value written through the `metadata` setter, in order. */
let metadataWrites: unknown[]

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
  handlers: makeHandlers(),
  ...overrides,
})

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
})
