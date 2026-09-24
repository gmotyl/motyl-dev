'use client'

import { Play, Square } from 'lucide-react'
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react'

import { ReaderDiagnosticPanel } from '@/components/reader-diagnostic-panel'
import { Button } from '@/components/ui/button'
import { useCarrierSpike, type SpikeMode } from '@/hooks/use-carrier-spike'
import { useMediaSession } from '@/hooks/use-media-session'
import { applyReaderLogParam } from '@/lib/reader/diagnostic-flag'
import { isReaderLogEnabled } from '@/lib/reader/diagnostic-log'
import type { SeamReport } from '@/lib/reader/seam-report'
import { cn } from '@/lib/utils'

/**
 * The bench the operator holds.
 *
 * Everything on this page serves one sequence: tap a mode, tap Play, darken the
 * screen, wait ten minutes, wake the screen, copy a log into a chat. So the
 * controls are thumb-sized, the decisive result is a sentence rather than a
 * number, and the log can be copied without leaving the page.
 *
 * ## There is deliberately no `<audio>` element here
 *
 * `useCarrierSpike` constructs its own detached `new Audio()` and never exposes
 * it, and this page does not ask it to. A detached element plays and owns a
 * media session exactly like an attached one, so nothing is lost — and the hook
 * documents why there may be only ONE media element while a run is measured:
 * two of them make media-session ownership flap between them, and the media
 * session is precisely what the OS is suspected of revoking in the failure
 * under investigation. Rendering an `<audio controls>` "for a sanity check"
 * would therefore perturb the experiment while looking like an aid. Native
 * controls are not needed here: the lock-screen widget is the observable, and
 * the diagnostic log is the record.
 */

/**
 * The run the whole protocol is void without.
 *
 * Declared HERE and not in the hook because this page is what the operator
 * reads: a `src-swap` run that survives ten minutes means the phone was lenient
 * that afternoon — battery, thermal, Doze — and the MSE runs beside it support
 * no conclusion at all. The bench opens on it so the first run of a session is
 * the one that licenses the others.
 */
const CONTROL_MODE: SpikeMode = 'src-swap'

/** Shown as the album on every OS media control, as the reader does. */
const MEDIA_SESSION_ALBUM = 'Motyl.dev'

interface ModeOption {
  id: SpikeMode
  /** False for the control, which needs no MediaSource at all. */
  needsMse: boolean
  summary: string
}

const MODES: readonly ModeOption[] = [
  {
    id: 'src-swap',
    needsMse: false,
    summary:
      'Assigns the element a new source per fragment and calls play() each time — exactly what the reader does today.',
  },
  {
    id: 'mse-upfront',
    needsMse: true,
    summary:
      'Appends all eight fragments before a single play(), then seeks back inside the one buffer. Nothing is appended while hidden.',
  },
  {
    id: 'mse-progressive',
    needsMse: true,
    summary:
      'One play(); later fragments are appended onto the same buffer while an earlier one is playing.',
  },
]

/** Three decimals, because encoder delay and padding live in the milliseconds. */
const seconds = (value: number): string => `${value.toFixed(3)} s`

/**
 * Mirrors `ReaderControlBar`: the flag is persisted from `?readerlog=1|0` ONCE
 * per mount, DURING render rather than in an effect, because the diagnostic
 * panel resolves the flag during its own render and subscribes to nothing — a
 * write from an effect would need a second page load to show, and the
 * operator's screen is off for the run that matters. `applyReaderLogParam` is
 * idempotent, so StrictMode's double invocation costs nothing.
 */
function usePersistedReaderLogParam(): void {
  useState(() =>
    typeof window === 'undefined' ? false : applyReaderLogParam(window.location.search),
  )
}

/**
 * Same idiom as `ReaderDiagnosticPanel`: the flag is a value this page READS,
 * never one it is notified about, so the subscribe callback registers nothing.
 * It exists to keep the server render (flag off) and the client render (flag
 * read from `localStorage`) from disagreeing at hydration.
 */
const subscribeToNothing = () => () => {}
const falseOnServer = () => false
const trueOnClient = () => true

export default function CarrierSpikeClient() {
  usePersistedReaderLogParam()
  const logEnabled = useSyncExternalStore(subscribeToNothing, isReaderLogEnabled, falseOnServer)

  const { mode, setMode, isRunning, seam, mseSupported, start, stop } = useCarrierSpike()

  /**
   * `mseSupported` starts false and is only corrected in the hook's effect,
   * because `MediaSource` does not exist on the server. Without this gate the
   * server HTML would state "MSE unavailable" on a phone that supports it
   * perfectly — a decisive-sounding claim, rendered wrong, in front of an
   * operator about to decide which modes are worth ten minutes.
   *
   * The same `useSyncExternalStore` shape as the flag above, for the same
   * reason and not as a trick: the server snapshot is what React renders on the
   * server and during hydration, the client snapshot is what it renders after —
   * so "has the client answered yet" is available without a setState in an
   * effect, which would cost a cascading render on every mount.
   */
  const hydrated = useSyncExternalStore(subscribeToNothing, trueOnClient, falseOnServer)
  const mseUnavailable = hydrated && !mseSupported

  const handlePlayStop = useCallback(() => {
    if (isRunning) stop()
    else void start()
  }, [isRunning, start, stop])

  const mediaMetadata = useMemo(
    () => ({
      // The mode is the title so a photographed lock screen says which carrier
      // produced the run it is evidence about.
      title: mode === CONTROL_MODE ? `${mode} (control)` : mode,
      artist: 'Carrier spike',
      album: MEDIA_SESSION_ALBUM,
    }),
    [mode],
  )

  const mediaHandlers = useMemo(
    () => ({
      play: () => void start(),
      pause: () => stop(),
      // The bench has no track list. `useMediaSession` takes four handlers, and
      // mirroring its ~140 lines of singleton-ownership logic just to drop two
      // of them would put a SECOND writer on `navigator.mediaSession`, with its
      // own ownership token — the one hazard that hook exists to prevent.
      nexttrack: () => {},
      previoustrack: () => {},
    }),
    [start, stop],
  )

  // Published exactly as the reader publishes it, so there is a lock-screen
  // widget to watch disappear. Without one the whole protocol is blind.
  useMediaSession({
    active: isRunning,
    metadata: mediaMetadata,
    playbackState: isRunning ? 'playing' : 'none',
    handlers: mediaHandlers,
  })

  return (
    // `min-w-0` at every level and no fixed widths: a phone must never scroll
    // sideways, so long numbers wrap and the range list scrolls in its own box.
    <main className="mx-auto flex w-full min-w-0 max-w-2xl flex-col gap-4 bg-background px-3 py-4 text-foreground">
      <header className="min-w-0">
        <h1 className="text-xl font-bold">Carrier spike</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Eight fixed fragments, looped. Ten minutes per mode, screen off, a fresh start each time.
          The protocol is void unless the control run fails at least once.
        </p>
      </header>

      <section role="radiogroup" aria-label="Carrier mode" className="flex min-w-0 flex-col gap-2">
        {MODES.map((option) => {
          const selected = option.id === mode
          const isControl = option.id === CONTROL_MODE
          const disabled = option.needsMse && mseUnavailable
          return (
            <Button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              data-spike-mode={option.id}
              data-spike-control={isControl ? 'true' : undefined}
              disabled={disabled}
              variant={selected ? 'default' : 'outline'}
              onClick={() => setMode(option.id)}
              className="min-h-[56px] w-full min-w-0 flex-col items-start justify-center gap-1 whitespace-normal px-3 py-2 text-left"
            >
              <span className="flex w-full min-w-0 flex-wrap items-center gap-2 font-mono text-sm">
                {option.id}
                {isControl ? (
                  <span className="rounded border border-current px-1 text-[10px] font-semibold uppercase tracking-wide">
                    control
                  </span>
                ) : null}
                {disabled ? (
                  <span className="rounded border border-current px-1 text-[10px] font-semibold uppercase tracking-wide">
                    unavailable
                  </span>
                ) : null}
              </span>
              <span className="w-full min-w-0 text-xs font-normal opacity-80">
                {option.summary}
              </span>
            </Button>
          )
        })}
      </section>

      {mseUnavailable ? (
        <p
          data-mse-unsupported
          role="status"
          className="min-w-0 break-words rounded-lg border border-border bg-background px-3 py-2 text-xs text-destructive"
        >
          MediaSource cannot carry audio/mpeg in this browser, so both MSE modes are unavailable
          here. Only the control can run on this device.
        </p>
      ) : null}

      <Button
        type="button"
        variant={isRunning ? 'default' : 'outline'}
        onClick={handlePlayStop}
        aria-label={isRunning ? 'Stop' : 'Play'}
        aria-pressed={isRunning}
        className="min-h-[56px] w-full gap-2"
      >
        {isRunning ? (
          <Square className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Play className="h-5 w-5" aria-hidden="true" />
        )}
        {isRunning ? 'Stop' : 'Play'}
      </Button>

      <SeamSection seam={seam} />

      {logEnabled ? (
        <div data-spike-log className="min-w-0">
          <ReaderDiagnosticPanel />
        </div>
      ) : (
        <p
          data-spike-log-off
          role="status"
          className="min-w-0 break-words rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground"
        >
          Diagnostic log is off — nothing is being recorded. Open this page once with{' '}
          <code className="font-mono">?readerlog=1</code> before the run, or ten minutes with the
          screen dark will produce nothing to copy.
        </p>
      )}
    </main>
  )
}

/**
 * The cheapest decisive result in the whole change, and the only one available
 * with the screen on, in seconds — so it is a sentence first and numbers
 * second. A gapped buffer means MSE reintroduces the micro-gap it was chosen to
 * remove, and the device protocol is then not worth running at all.
 */
function SeamSection({ seam }: { seam: SeamReport | null }) {
  if (!seam) {
    return (
      <p className="min-w-0 text-sm text-muted-foreground">
        No seam report yet — start an MSE run and it appears within seconds, screen on.
      </p>
    )
  }

  const unattributed = Math.max(0, seam.ranges.length - 1 - seam.gapsAtBoundaries.length)

  return (
    <section
      aria-label="Seam report"
      className="min-w-0 overflow-hidden rounded-lg border border-border bg-background"
    >
      <p
        data-seam-verdict
        className={cn(
          'break-words border-b border-border px-3 py-2 text-sm font-semibold',
          seam.contiguous ? 'text-foreground' : 'text-destructive',
        )}
      >
        {seam.contiguous
          ? 'Contiguous — the fragments fused into one buffered range. The seams are clean; the device protocol is worth running.'
          : `Gapped — the buffer broke into ${seam.ranges.length} ranges. MSE is reintroducing the micro-gap it was chosen to remove, so the device protocol is not worth running.`}
      </p>

      {seam.contiguous ? null : (
        <p
          data-seam-boundaries
          className="break-words border-b border-border px-3 py-2 font-mono text-xs text-destructive"
        >
          {seam.gapsAtBoundaries.length > 0
            ? `gaps at fragment boundaries: ${seam.gapsAtBoundaries.join(', ')}`
            : 'gaps at fragment boundaries: none could be attributed'}
          {unattributed > 0 ? ` (+${unattributed} unattributed — read the ranges)` : ''}
        </p>
      )}

      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 px-3 py-2 text-xs">
        {/*
          Content and span are BOTH shown, always. They differ by exactly the
          total gap time, and quoting only the span lets a gapped buffer report
          the most reassuring number available.
        */}
        <dt className="text-muted-foreground">content (gaps excluded)</dt>
        <dd data-seam-content className="break-words text-right font-mono">
          {seconds(seam.contentDuration)}
        </dd>

        <dt className="text-muted-foreground">span (gaps included)</dt>
        <dd data-seam-span className="break-words text-right font-mono">
          {seconds(seam.bufferedDuration)}
        </dd>

        <dt className="text-muted-foreground">expected</dt>
        <dd className="break-words text-right font-mono">{seconds(seam.expectedDuration)}</dd>

        <dt className="text-muted-foreground">drift (content − expected)</dt>
        <dd data-seam-drift className="break-words text-right font-mono">
          {seconds(seam.drift)}
        </dd>
      </dl>

      {/* Ground truth when a gap could not be named. Scrolls in its own box. */}
      <div className="w-full min-w-0 overflow-x-auto border-t border-border px-3 py-2">
        <p className="whitespace-nowrap font-mono text-[11px] text-muted-foreground">
          {seam.ranges.length === 0
            ? 'ranges: none'
            : `ranges: ${seam.ranges
                .map(([from, to]) => `[${from.toFixed(3)}, ${to.toFixed(3)}]`)
                .join(' ')}`}
        </p>
      </div>
    </section>
  )
}
