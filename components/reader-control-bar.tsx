'use client'

import { useState } from 'react'

import {
  ContinuousReaderControls,
  type ContinuousReaderControlsProps,
} from '@/components/continuous-reader-controls'
import { ReaderDiagnosticPanel } from '@/components/reader-diagnostic-panel'
import { useReaderLifecycleLog } from '@/hooks/use-reader-lifecycle-log'
import { applyReaderLogParam } from '@/lib/reader/diagnostic-flag'

export type ReaderControlBarProps = ContinuousReaderControlsProps & {
  /** The reader's current error, surfaced in the diagnostic panel. */
  error?: Error | null
}

/**
 * Persists `?readerlog=1|0` ONCE per mount, DURING render — deliberately not in
 * an effect.
 *
 * React runs child effects before parent effects. `ReaderDiagnosticPanel`
 * resolves the flag during its own render (via `useSyncExternalStore`) and
 * subscribes to nothing, so if this bar wrote the flag from a `useEffect` the
 * panel would already have rendered as "off" and nothing would ever re-render
 * it: visiting `?readerlog=1` would need a second page load. The operator's
 * screen is off for the run that matters, so a reload is not an option.
 *
 * A lazy `useState` initialiser is React's supported "compute once per mount"
 * slot, and it runs before this component's children render — which is exactly
 * the ordering the panel needs. The state value itself is unused; the flag's
 * single source of truth stays `localStorage`, read by the panel.
 */
function usePersistedReaderLogParam(): void {
  useState(() =>
    // SSR: this is a client component that is still server-rendered, and there
    // is no URL or storage to act on there.
    typeof window === 'undefined' ? false : applyReaderLogParam(window.location.search),
  )
}

export function ReaderControlBar({ error = null, ...controlsProps }: ReaderControlBarProps) {
  usePersistedReaderLogParam()
  // Mounted HERE, once, because this bar is the single floating control used by
  // BOTH the single News page and Read All News. Per host it would attach a
  // duplicate listener set and double every lifecycle entry.
  useReaderLifecycleLog()

  return (
    <div
      data-reader-floating
      className="fixed bottom-16 left-2 right-2 z-40 rounded-xl border border-border bg-background/95 p-2 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:bottom-6 sm:left-auto sm:right-4 sm:w-[min(42rem,calc(100vw-2rem))]"
    >
      {/* Above the controls: the panel brings its own `mb-2` and no
          positioning, and below them it would push the thumb targets off the
          bottom of a phone screen. It renders nothing unless the flag is set. */}
      <ReaderDiagnosticPanel error={error} />
      <ContinuousReaderControls {...controlsProps} />
    </div>
  )
}

export default ReaderControlBar
