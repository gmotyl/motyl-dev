import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  READER_LOG_CAPACITY,
  READER_LOG_FLAG,
  clearReaderLog,
  formatReaderLog,
  logReaderEvent,
  readReaderLog,
} from '@/lib/reader/diagnostic-log'

import { ReaderDiagnosticPanel } from './reader-diagnostic-panel'

/**
 * The flag is enabled by writing the real key. An INSTANCE spy on
 * `window.localStorage` is inert in this repo's jsdom 27 — `Storage` is a
 * Proxy, so `vi.spyOn(window.localStorage, 'getItem')` stores an item under the
 * key `"getItem"` while the real method keeps running.
 */
const enableFlag = () => window.localStorage.setItem(READER_LOG_FLAG, '1')

const STUB_USER_AGENT = 'TestAgent/9.9 (diagnostic panel spec)'

/**
 * `navigator.clipboard` does not exist in jsdom and `navigator.userAgent` is a
 * prototype getter. Both are shadowed with configurable OWN properties so the
 * teardown can delete them again — deliberately not `vi.stubGlobal`, which
 * would force `vi.unstubAllGlobals()` and take `vitest.setup.ts`'s
 * `ResizeObserver` stub down with it for the rest of the file.
 */
const stubClipboard = (writeText: ReturnType<typeof vi.fn>) => {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
  Object.defineProperty(navigator, 'userAgent', { configurable: true, get: () => STUB_USER_AGENT })
}

const openPanel = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: 'Show reader log entries' }))
}

beforeEach(() => {
  // The ring buffer is module-level and survives between tests; the flag lives
  // in localStorage and is read per event. Clearing both gives every test an
  // empty log and a disabled instrument to start from.
  window.localStorage.clear()
  clearReaderLog()
})

afterEach(() => {
  Reflect.deleteProperty(navigator, 'clipboard')
  Reflect.deleteProperty(navigator, 'userAgent')
})

describe('ReaderDiagnosticPanel', () => {
  it('renders nothing while the flag is unset', () => {
    logReaderEvent('unit-start', 'ignored')

    const { container } = render(<ReaderDiagnosticPanel />)

    // Not an empty wrapper, not a hidden div — nothing at all.
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a collapsed panel once the flag is set', () => {
    enableFlag()
    logReaderEvent('unit-start', 'alpha')

    render(<ReaderDiagnosticPanel />)

    const toggle = screen.getByRole('button', { name: 'Show reader log entries' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    // Copy is reachable in one tap, without expanding first.
    expect(screen.getByRole('button', { name: 'Copy log' })).toBeInTheDocument()

    // Collapsed: the entry list itself is not rendered.
    expect(screen.queryByRole('list')).toBeNull()
    expect(screen.queryByText(/alpha/)).toBeNull()

    // The count tells the operator how close the buffer is to its cap.
    expect(screen.getByText(`1/${READER_LOG_CAPACITY}`)).toBeInTheDocument()
  })

  it('lists a snapshot of the log when expanded', async () => {
    const user = userEvent.setup()
    enableFlag()
    logReaderEvent('unit-start', 'alpha')
    logReaderEvent('play-called', 'beta')

    render(<ReaderDiagnosticPanel />)
    await openPanel(user)

    expect(screen.getByRole('button', { name: 'Hide reader log entries' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    const items = screen.getAllByRole('listitem').map((item) => item.textContent)
    expect(items).toHaveLength(2)
    expect(items[0]).toContain('unit-start alpha')
    expect(items[1]).toContain('play-called beta')
  })

  it('picks up newly recorded entries on refresh', async () => {
    const user = userEvent.setup()
    enableFlag()
    logReaderEvent('unit-start', 'alpha')

    render(<ReaderDiagnosticPanel />)
    await openPanel(user)

    logReaderEvent('play-rejected', 'gamma')
    await user.click(screen.getByRole('button', { name: 'Refresh' }))

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText(/play-rejected gamma/)).toBeInTheDocument()
    expect(screen.getByText(`2/${READER_LOG_CAPACITY}`)).toBeInTheDocument()
  })

  it('does not change the list without a refresh', async () => {
    const user = userEvent.setup()
    enableFlag()
    logReaderEvent('unit-start', 'alpha')

    const { rerender } = render(<ReaderDiagnosticPanel />)
    await openPanel(user)

    logReaderEvent('play-rejected', 'gamma')
    // A re-render must not smuggle the buffer back in: the panel holds a
    // snapshot, it does not subscribe to or re-read the log.
    rerender(<ReaderDiagnosticPanel />)

    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.queryByText(/gamma/)).toBeNull()
    expect(screen.getByText(`1/${READER_LOG_CAPACITY}`)).toBeInTheDocument()
  })

  it('copies the formatted log with a user-agent header', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)
    enableFlag()
    logReaderEvent('unit-start', 'alpha')
    logReaderEvent('freeze')

    render(<ReaderDiagnosticPanel />)
    await user.click(screen.getByRole('button', { name: 'Copy log' }))

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1))
    const copied = writeText.mock.calls[0][0] as string

    expect(copied).toContain(`ua: ${STUB_USER_AGENT}`)
    expect(copied).toContain(`flag: ${READER_LOG_FLAG}=on`)
    expect(copied).toMatch(/copied: \d{4}-\d{2}-\d{2}T/)
    expect(copied).toContain(`entries: 2/${READER_LOG_CAPACITY}`)
    // The header PRECEDES the entries, and the entries are formatted by
    // `formatReaderLog` rather than re-implemented here.
    expect(copied.endsWith(formatReaderLog(readReaderLog()))).toBe(true)

    // No fallback while the clipboard co-operates.
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  it('falls back to a selectable textarea when the clipboard rejects', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockRejectedValue(new DOMException('denied', 'NotAllowedError'))
    stubClipboard(writeText)
    enableFlag()
    logReaderEvent('unit-start', 'alpha')

    render(<ReaderDiagnosticPanel />)
    await user.click(screen.getByRole('button', { name: 'Copy log' }))

    const textarea = await screen.findByRole('textbox', { name: 'Reader log text to copy manually' })
    expect(writeText).toHaveBeenCalledTimes(1)
    expect(textarea).toHaveValue(writeText.mock.calls[0][0] as string)
    // Selectable, and big enough to select from on a phone.
    expect(textarea).toHaveAttribute('readonly')
    expect(Number(textarea.getAttribute('rows'))).toBeGreaterThanOrEqual(6)
  })

  it('shows the reader error message and drops it once the error clears', () => {
    enableFlag()

    const { rerender } = render(<ReaderDiagnosticPanel error={new Error('speech synthesis died')} />)
    expect(screen.getByText('speech synthesis died')).toBeInTheDocument()

    rerender(<ReaderDiagnosticPanel error={null} />)
    expect(screen.queryByText('speech synthesis died')).toBeNull()
  })
})
