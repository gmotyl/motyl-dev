import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { READER_LOG_FLAG, clearReaderLog, readReaderLog } from '@/lib/reader/diagnostic-log'

import { ReaderControlBar } from './reader-control-bar'

/**
 * The flag is enabled by writing the real key. An INSTANCE spy on
 * `window.localStorage` is inert in this repo's jsdom 27 — `Storage` is a
 * Proxy, so `vi.spyOn(window.localStorage, 'setItem')` stores an item under the
 * key `"setItem"` while the real method keeps running.
 */
const enableFlag = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

/**
 * Drives `window.location.search` the way a real visit would: jsdom implements
 * `history.replaceState`, so the URL (and therefore `location.search`) really
 * changes — no non-configurable `window.location` to redefine and restore.
 */
const visitWith = (search: string) => window.history.replaceState({}, '', `/${search}`)

const baseProps = {
  isPlaying: false,
  onPlayPause: vi.fn(),
  onNext: vi.fn(),
}

beforeEach(() => {
  // The ring buffer is module-level and survives between tests; the flag lives
  // in localStorage and is read per event. Clear both, and start from a URL
  // that carries no parameter.
  window.localStorage.clear()
  clearReaderLog()
  visitWith('')
})

afterEach(() => {
  visitWith('')
})

describe('ReaderControlBar', () => {
  it('renders forwarded reader controls with a Play control', async () => {
    const onPlayPause = vi.fn()
    const onNext = vi.fn()
    const onMarkRead = vi.fn()

    render(
      <ReaderControlBar
        isPlaying={false}
        isBuffering={false}
        markReadDisabled={false}
        canPlay
        canNext
        onPlayPause={onPlayPause}
        onNext={onNext}
        onMarkRead={onMarkRead}
      />
    )

    const playPause = screen.getByRole('button', { name: 'Play' })
    expect(playPause).toHaveAttribute('data-reader-action', 'play-pause')

    await userEvent.click(playPause)
    expect(onPlayPause).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(onNext).toHaveBeenCalledTimes(1)

    await userEvent.click(screen.getByRole('button', { name: 'Mark read' }))
    expect(onMarkRead).toHaveBeenCalledTimes(1)
  })

  it('wrapper is the floating panel (data-reader-floating, fixed bottom on mobile, floating pill on desktop)', () => {
    const { container } = render(
      <ReaderControlBar isPlaying={false} onPlayPause={vi.fn()} onNext={vi.fn()} />
    )

    const wrapper = container.querySelector('[data-reader-floating]')
    expect(wrapper).not.toBeNull()
    expect(wrapper).toHaveClass('fixed', 'bottom-16', 'sm:bottom-6', 'sm:right-4')
  })

  it('renders no diagnostic markup while the flag is unset', () => {
    const { container } = render(<ReaderControlBar {...baseProps} />)

    expect(container.querySelector('[data-reader-diagnostic]')).toBeNull()
    expect(screen.queryByRole('button', { name: 'Copy log' })).not.toBeInTheDocument()
    // The controls are untouched by the flag being off.
    expect(screen.getByRole('group', { name: 'Continuous reader controls' })).toBeInTheDocument()
  })

  it('renders the diagnostic panel once the flag is set', () => {
    enableFlag()

    const { container } = render(<ReaderControlBar {...baseProps} />)

    expect(container.querySelector('[data-reader-diagnostic]')).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Copy log' })).toBeInTheDocument()
  })

  it('renders the diagnostic panel above the controls inside the bar', () => {
    enableFlag()

    const { container } = render(<ReaderControlBar {...baseProps} />)

    const floating = container.querySelector('[data-reader-floating]')
    const panel = container.querySelector('[data-reader-diagnostic]')
    const controls = screen.getByRole('group', { name: 'Continuous reader controls' })

    // Both live inside the bar's existing floating wrapper...
    expect(floating).toContainElement(panel as HTMLElement)
    expect(floating).toContainElement(controls)
    // ...and the panel comes FIRST. It is built to sit above the controls (it
    // emits its own `mb-2` and no positioning of its own); rendered below them
    // it would push the thumb targets off the bottom of a phone screen.
    expect(panel!.compareDocumentPosition(controls) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('persists the flag from a readerlog=1 URL and shows the panel without a reload', () => {
    // No stored flag: the URL is the only thing that can enable the panel.
    expect(window.localStorage.getItem(READER_LOG_FLAG)).toBeNull()
    visitWith('?readerlog=1')

    const { container } = render(<ReaderControlBar {...baseProps} />)

    expect(window.localStorage.getItem(READER_LOG_FLAG)).toBe('1')
    // THE POINT OF THIS TEST: the panel is there in this same render pass, with
    // no rerender and no second mount. React runs child effects before parent
    // effects, so a bar that applied the URL parameter inside its own
    // `useEffect` would persist the flag only AFTER the panel had already read
    // it as off — and since the panel subscribes to nothing, nothing would ever
    // re-render it. The operator would have to reload, which this change forbids.
    expect(container.querySelector('[data-reader-diagnostic]')).not.toBeNull()
  })

  it('clears the flag from a readerlog=0 URL', () => {
    enableFlag()
    visitWith('?readerlog=0')

    const { container } = render(<ReaderControlBar {...baseProps} />)

    expect(window.localStorage.getItem(READER_LOG_FLAG)).toBeNull()
    expect(container.querySelector('[data-reader-diagnostic]')).toBeNull()
  })

  it('leaves a stored flag alone when the URL carries no parameter', () => {
    enableFlag()

    const { container } = render(<ReaderControlBar {...baseProps} />)

    expect(window.localStorage.getItem(READER_LOG_FLAG)).toBe('1')
    expect(container.querySelector('[data-reader-diagnostic]')).not.toBeNull()
  })

  it('passes the reader error through to the panel', () => {
    enableFlag()

    render(<ReaderControlBar {...baseProps} error={new Error('playback died while hidden')} />)

    expect(screen.getByRole('alert')).toHaveTextContent('playback died while hidden')
  })

  it('records page lifecycle events exactly once per mounted bar', () => {
    enableFlag()

    render(<ReaderControlBar {...baseProps} />)

    document.dispatchEvent(new Event('freeze'))

    // One listener set, so one entry. A host that mounted its own
    // `useReaderLifecycleLog` next to the bar would double every entry.
    expect(readReaderLog().filter((entry) => entry.type === 'freeze')).toHaveLength(1)
  })
})
