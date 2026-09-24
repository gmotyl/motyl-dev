'use client'

import { ChevronDown, ChevronUp, ClipboardCopy, RotateCw } from 'lucide-react'
import { useCallback, useState, useSyncExternalStore } from 'react'

import { Button } from '@/components/ui/button'
import {
  READER_LOG_CAPACITY,
  READER_LOG_FLAG,
  type ReaderLogEntry,
  formatReaderLog,
  isReaderLogEnabled,
  readReaderLog,
} from '@/lib/reader/diagnostic-log'

export interface ReaderDiagnosticPanelProps {
  /** The reader's current error, surfaced alongside the log. */
  error?: Error | null
}

/**
 * Builds the text that leaves the device: a header the reader of the log needs
 * in order to interpret it, then the entries.
 *
 * The user agent is load-bearing, not decoration — which Chrome/Edge build is
 * running decides which page-lifecycle behaviours apply at all, and the whole
 * point of the instrument is to attribute a screen-off failure to one of them.
 */
function buildExportText(snapshot: readonly ReaderLogEntry[]): string {
  const userAgent = typeof navigator === 'undefined' ? 'unknown' : navigator.userAgent
  const header = [
    'motyl.dev reader diagnostic log',
    `copied: ${new Date().toISOString()}`,
    `flag: ${READER_LOG_FLAG}=${isReaderLogEnabled() ? 'on' : 'off'}`,
    `entries: ${snapshot.length}/${READER_LOG_CAPACITY}`,
    `ua: ${userAgent}`,
  ].join('\n')

  // `formatReaderLog` owns the line format; it is never re-implemented here.
  return `${header}\n\n${formatReaderLog(snapshot)}`
}

/**
 * The flag is a value the component READS, never one it is notified about, so
 * the subscribe callback deliberately registers nothing. Its only job is to
 * make `useSyncExternalStore` legal, which is what keeps the server render
 * (flag off, no markup) and the client render (flag read from `localStorage`)
 * from disagreeing at hydration — without a setState-in-an-effect.
 */
const subscribeToNothing = () => () => {}
const flagOffOnServer = () => false

/**
 * Pre-selects the manual-copy fallback, ONCE, when it mounts.
 *
 * Module scope is load-bearing, not tidiness: an inline arrow here would get a
 * fresh identity on every render, so React would detach it (call it with
 * `null`) and re-attach it — re-running `select()` each time. This panel
 * re-renders whenever `ReaderControlBar` does, i.e. on every reader state
 * change, which during playback is constant. The operator dragging a selection
 * on a phone would have it reset under their finger — on the one path that
 * exists BECAUSE the clipboard already refused, so it is their only way to get
 * the log off the device. A stable callback is attached once and never re-run.
 */
const selectOnMount = (node: HTMLTextAreaElement | null) => {
  node?.select()
}

/**
 * Flag-gated diagnostic panel for the continuous reader.
 *
 * SNAPSHOT, NEVER A SUBSCRIPTION. The panel pulls `readReaderLog()` into local
 * state on mount, on Refresh and on Copy — and at no other moment. A panel that
 * subscribed to or re-read the buffer would re-render the reader at every
 * speech-unit boundary, which is precisely the timing this instrument exists to
 * measure; the instrument would then be perturbing its own subject.
 *
 * The operator is holding a phone with the screen just woken, about to paste
 * this into a chat: the panel starts collapsed so it never covers the reader
 * controls, Copy works without expanding first, and every control is a
 * thumb-sized target matching the reader buttons' `min-h-[56px]`.
 */
export function ReaderDiagnosticPanel({ error = null }: ReaderDiagnosticPanelProps) {
  const enabled = useSyncExternalStore(subscribeToNothing, isReaderLogEnabled, flagOffOnServer)
  const [open, setOpen] = useState(false)
  // One snapshot at mount, via a lazy initialiser, so the collapsed header can
  // state a real count before anything is expanded. It is read ONCE — later
  // renders reuse this state until Refresh or Copy replaces it.
  const [entries, setEntries] = useState<readonly ReaderLogEntry[]>(() => readReaderLog())
  const [status, setStatus] = useState<string | null>(null)
  /** Non-null only once the clipboard has refused; holds the text to copy by hand. */
  const [fallbackText, setFallbackText] = useState<string | null>(null)

  const handleToggle = useCallback(() => {
    setOpen((wasOpen) => {
      if (!wasOpen) setEntries(readReaderLog())
      return !wasOpen
    })
  }, [])

  const handleRefresh = useCallback(() => {
    setEntries(readReaderLog())
    setStatus(null)
  }, [])

  const handleCopy = useCallback(async () => {
    const snapshot = readReaderLog()
    const text = buildExportText(snapshot)
    // Keep the visible count honest about what was just copied.
    setEntries(snapshot)

    if (!navigator.clipboard?.writeText) {
      setStatus('Clipboard unavailable — select and copy the text below.')
      setFallbackText(text)
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setFallbackText(null)
      setStatus('Copied to clipboard.')
    } catch {
      // Android refuses this often enough that the fallback is the real path.
      setStatus('Clipboard refused — select and copy the text below.')
      setFallbackText(text)
    }
  }, [])

  // Nothing at all while the flag is unset: not an empty wrapper, not a hidden
  // div. The panel must be invisible to every reader who is not diagnosing.
  if (!enabled) return null

  return (
    <section
      data-reader-diagnostic
      aria-label="Reader diagnostic log"
      className="mb-2 w-full min-w-0 overflow-hidden rounded-lg border border-border bg-background text-foreground"
    >
      <div className="flex w-full min-w-0 items-stretch gap-1">
        <Button
          type="button"
          variant="ghost"
          onClick={handleToggle}
          aria-expanded={open}
          aria-controls="reader-log-entries"
          aria-label={open ? 'Hide reader log entries' : 'Show reader log entries'}
          className="min-h-[56px] min-w-0 flex-1 justify-between gap-2 px-3"
        >
          <span className="flex min-w-0 items-center gap-2">
            {open ? (
              <ChevronUp className="h-4 w-4 shrink-0" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            <span className="truncate">Reader log</span>
          </span>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {`${entries.length}/${READER_LOG_CAPACITY}`}
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleRefresh}
          aria-label="Refresh"
          className="min-h-[56px] shrink-0 px-3"
        >
          <RotateCw className="h-4 w-4" aria-hidden="true" />
        </Button>

        {/* Reachable in one tap while collapsed — the screen has just woken. */}
        <Button
          type="button"
          variant="outline"
          onClick={handleCopy}
          aria-label="Copy log"
          className="min-h-[56px] shrink-0 gap-2 px-3"
        >
          <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
          Copy log
        </Button>
      </div>

      {error ? (
        <p
          role="alert"
          className="break-words border-t border-border px-3 py-2 text-xs text-destructive"
        >
          {error.message}
        </p>
      ) : null}

      {status ? (
        <p role="status" className="px-3 pb-2 pt-1 text-xs text-muted-foreground">
          {status}
        </p>
      ) : null}

      {open ? (
        <ul
          id="reader-log-entries"
          // Scrolls inside its own box; long details wrap rather than pushing
          // the page sideways.
          className="max-h-64 w-full min-w-0 space-y-1 overflow-x-hidden overflow-y-auto overscroll-contain border-t border-border px-3 py-2 font-mono text-[11px] leading-snug text-muted-foreground"
        >
          {entries.length === 0 ? (
            <li className="text-muted-foreground">No entries recorded yet.</li>
          ) : (
            entries.map((entry, index) => (
              <li key={`${entry.t}-${index}`} className="break-words whitespace-pre-wrap">
                {formatReaderLog([entry])}
              </li>
            ))
          )}
        </ul>
      ) : null}

      {fallbackText !== null ? (
        <div className="border-t border-border px-3 py-2">
          <textarea
            readOnly
            rows={10}
            value={fallbackText}
            aria-label="Reader log text to copy manually"
            ref={selectOnMount}
            onFocus={(event) => event.currentTarget.select()}
            className="w-full min-w-0 resize-y rounded-md border border-border bg-background p-2 font-mono text-[11px] text-foreground"
          />
        </div>
      ) : null}
    </section>
  )
}

export default ReaderDiagnosticPanel
