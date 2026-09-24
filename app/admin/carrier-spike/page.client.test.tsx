import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'

import type { SpikeMode } from '@/hooks/use-carrier-spike'
import { READER_LOG_FLAG, clearReaderLog } from '@/lib/reader/diagnostic-log'
import type { SeamReport } from '@/lib/reader/seam-report'

import CarrierSpikeClient from './page.client'

/**
 * The hook is mocked, not driven: `useCarrierSpike` owns a real `new Audio()`
 * and jsdom refuses playback outright. What is under test here is the bench the
 * operator holds — which mode is preselected, what the seam report reads like,
 * whether there is a lock-screen widget to lose, and whether the log can be
 * copied off the device without leaving the page.
 */
interface SpikeHarness {
  mode: SpikeMode
  isRunning: boolean
  seam: SeamReport | null
  mseSupported: boolean
  setMode: Mock<(mode: SpikeMode) => void>
  start: Mock<() => Promise<void>>
  stop: Mock<() => void>
}

const { harness } = vi.hoisted(() => ({
  harness: { current: null as unknown as SpikeHarness },
}))

vi.mock('@/hooks/use-carrier-spike', () => ({
  useCarrierSpike: () => harness.current,
}))

const freshHarness = (): SpikeHarness => ({
  mode: 'src-swap',
  isRunning: false,
  seam: null,
  mseSupported: true,
  setMode: vi.fn(),
  start: vi.fn(async () => {}),
  stop: vi.fn(),
})

/** A gapped buffer: three ranges, 0.6 s of content lost, gaps at boundaries 1 and 2. */
const GAPPED_SEAM: SeamReport = {
  contiguous: false,
  ranges: [
    [0, 19.7],
    [20, 39.7],
    [40, 60],
  ],
  bufferedDuration: 60,
  contentDuration: 59.4,
  expectedDuration: 60,
  drift: -0.6,
  gapsAtBoundaries: [1, 2],
}

const CONTIGUOUS_SEAM: SeamReport = {
  contiguous: true,
  ranges: [[0, 59.4]],
  bufferedDuration: 59.4,
  contentDuration: 59.4,
  expectedDuration: 60,
  drift: -0.6,
  gapsAtBoundaries: [],
}

/**
 * `navigator.mediaSession` and `MediaMetadata` are both absent in jsdom, and
 * `useMediaSession` writes nothing without them — so an unstubbed run would
 * pass the media-session test by publishing nothing at all. Defined as own,
 * configurable properties and removed again in `afterEach`; deliberately NOT
 * `vi.stubGlobal`, whose `unstubAllGlobals` would also wipe `vitest.setup.ts`'s
 * stubs for every later test in the run.
 */
class FakeMediaMetadata {
  title: string
  artist: string
  album: string
  artwork: unknown
  constructor(init: { title: string; artist: string; album: string; artwork?: unknown }) {
    this.title = init.title
    this.artist = init.artist
    this.album = init.album
    this.artwork = init.artwork
  }
}

interface FakeMediaSession {
  metadata: FakeMediaMetadata | null
  playbackState: string
  setActionHandler: Mock<(action: string, handler: (() => void) | null) => void>
  handlers: Map<string, (() => void) | null>
}

let mediaSession: FakeMediaSession

const installMediaSession = () => {
  const handlers = new Map<string, (() => void) | null>()
  mediaSession = {
    metadata: null,
    playbackState: 'none',
    setActionHandler: vi.fn((action: string, handler: (() => void) | null) => {
      handlers.set(action, handler)
    }),
    handlers,
  }
  Object.defineProperty(navigator, 'mediaSession', {
    value: mediaSession,
    configurable: true,
    writable: true,
  })
  Object.defineProperty(globalThis, 'MediaMetadata', {
    value: FakeMediaMetadata,
    configurable: true,
    writable: true,
  })
}

const removeMediaSession = () => {
  delete (navigator as unknown as Record<string, unknown>).mediaSession
  delete (globalThis as unknown as Record<string, unknown>).MediaMetadata
}

/**
 * The flag is a real `localStorage` write. `vi.spyOn(window.localStorage, …)`
 * is INERT here — jsdom 27's `Storage` is a Proxy — so the store is the only
 * honest switch.
 */
const enableLog = () => window.localStorage.setItem(READER_LOG_FLAG, '1')
const disableLog = () => window.localStorage.removeItem(READER_LOG_FLAG)

const seamText = (container: HTMLElement, selector: string): string =>
  container.querySelector(selector)?.textContent ?? ''

beforeEach(() => {
  harness.current = freshHarness()
  disableLog()
  clearReaderLog()
  installMediaSession()
})

afterEach(() => {
  cleanup()
  removeMediaSession()
  disableLog()
  clearReaderLog()
})

describe('CarrierSpikeClient', () => {
  it('preselects the src-swap control', async () => {
    const { container } = render(<CarrierSpikeClient />)

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
    expect(radios.filter((radio) => radio.getAttribute('aria-checked') === 'true')).toHaveLength(1)

    // The page — not the hook — declares which run the protocol is void
    // without, and the operator has to be able to read it off the screen.
    const control = container.querySelector('[data-spike-control]')
    expect(control).not.toBeNull()
    expect(control?.textContent).toMatch(/src-swap/)
    expect(control?.textContent).toMatch(/control/i)
    expect(control?.getAttribute('aria-checked')).toBe('true')

    // All three are real choices, not decoration.
    for (const id of ['src-swap', 'mse-upfront', 'mse-progressive'] as const) {
      expect(screen.getByRole('radio', { name: new RegExp(id) })).toBeTruthy()
    }

    await userEvent.click(screen.getByRole('radio', { name: /mse-progressive/ }))
    expect(harness.current.setMode).toHaveBeenCalledWith('mse-progressive')
  })

  it('publishes media-session metadata when a run starts', () => {
    const { rerender } = render(<CarrierSpikeClient />)

    // Nothing published before a run: there is no widget to lose yet.
    expect(mediaSession.metadata).toBeNull()

    harness.current.isRunning = true
    rerender(<CarrierSpikeClient />)

    expect(mediaSession.metadata).toBeInstanceOf(FakeMediaMetadata)
    // The widget has to name the mode, or a photographed lock screen says
    // nothing about which carrier produced it.
    expect(mediaSession.metadata?.title).toMatch(/src-swap/)
    expect(mediaSession.playbackState).toBe('playing')

    const play = mediaSession.handlers.get('play')
    const pause = mediaSession.handlers.get('pause')
    expect(typeof play).toBe('function')
    expect(typeof pause).toBe('function')

    pause?.()
    expect(harness.current.stop).toHaveBeenCalled()
    play?.()
    expect(harness.current.start).toHaveBeenCalled()
  })

  it('shows the seam verdict, drift and gapped boundaries', () => {
    harness.current.seam = GAPPED_SEAM
    const { container, rerender } = render(<CarrierSpikeClient />)

    // The verdict is the cheapest decisive result in the change, and it has to
    // read as a sentence, not as a number to be interpreted.
    const verdict = seamText(container, '[data-seam-verdict]')
    expect(verdict).toMatch(/gapped/i)
    expect(verdict).not.toMatch(/contiguous/i)

    // Both durations, because they differ by exactly the gap time and quoting
    // only the span lets a gapped buffer report a reassuring drift.
    expect(seamText(container, '[data-seam-content]')).toMatch(/59\.4/)
    expect(seamText(container, '[data-seam-span]')).toMatch(/60\.0/)
    expect(seamText(container, '[data-seam-drift]')).toMatch(/-0\.6/)

    const boundaries = seamText(container, '[data-seam-boundaries]')
    expect(boundaries).toMatch(/1/)
    expect(boundaries).toMatch(/2/)

    harness.current.seam = CONTIGUOUS_SEAM
    rerender(<CarrierSpikeClient />)

    expect(seamText(container, '[data-seam-verdict]')).toMatch(/contiguous/i)
    expect(container.querySelector('[data-seam-boundaries]')).toBeNull()
  })

  it('renders the diagnostic panel when the flag is set', () => {
    enableLog()
    const { container } = render(<CarrierSpikeClient />)

    expect(container.querySelector('[data-reader-diagnostic]')).not.toBeNull()
    expect(container.querySelector('[data-spike-log-off]')).toBeNull()

    cleanup()
    disableLog()

    // Flag off: the operator must be TOLD the log is off, before spending ten
    // minutes with the screen dark on a run that will produce nothing.
    const off = render(<CarrierSpikeClient />)
    expect(off.container.querySelector('[data-reader-diagnostic]')).toBeNull()
    expect(off.container.querySelector('[data-spike-log-off]')).not.toBeNull()
  })

  it('marks the MSE modes unavailable when MSE is unsupported', async () => {
    harness.current.mseSupported = false
    const { container, rerender } = render(<CarrierSpikeClient />)

    const upfront = screen.getByRole('radio', { name: /mse-upfront/ })
    const progressive = screen.getByRole('radio', { name: /mse-progressive/ })
    expect(upfront).toHaveProperty('disabled', true)
    expect(progressive).toHaveProperty('disabled', true)
    expect(screen.getByRole('radio', { name: /src-swap/ })).toHaveProperty('disabled', false)

    // Disabled alone is a mystery; the page has to say why.
    expect(container.querySelector('[data-mse-unsupported]')?.textContent ?? '').toMatch(
      /MediaSource|MSE/,
    )

    await userEvent.click(upfront)
    expect(harness.current.setMode).not.toHaveBeenCalled()

    harness.current.mseSupported = true
    rerender(<CarrierSpikeClient />)

    expect(screen.getByRole('radio', { name: /mse-upfront/ })).toHaveProperty('disabled', false)
    expect(container.querySelector('[data-mse-unsupported]')).toBeNull()
  })
})
