'use client'

import { useEffect } from 'react'

import { logReaderEvent } from '@/lib/reader/diagnostic-log'

/**
 * Records the page's lifecycle transitions into the reader diagnostic log.
 *
 * `freeze` / `resume` are the point of this hook: they turn "the page was
 * frozen" from an inference drawn from silence into a positive, timestamped
 * fact, which is what separates a frozen page from a refused `play()` when the
 * reader dies with the screen off.
 *
 * The hook holds no React state and never re-renders its host — it only writes
 * into the module-level buffer. It also does NOT check the enable flag: the
 * store returns early when the log is disabled, and a second gate here would
 * only be a second place to get wrong.
 */
export function useReaderLifecycleLog(): void {
  useEffect(() => {
    // SSR / non-DOM environments have nothing to listen to.
    if (typeof document === 'undefined') return

    const onFreeze = () => logReaderEvent('freeze')
    const onResume = () => logReaderEvent('resume')
    const onVisibilityChange = () => {
      logReaderEvent(
        document.visibilityState === 'hidden' ? 'visibility-hidden' : 'visibility-visible',
      )
    }
    const onPageHide = () => logReaderEvent('pagehide')

    document.addEventListener('freeze', onFreeze)
    document.addEventListener('resume', onResume)
    document.addEventListener('visibilitychange', onVisibilityChange)
    // pagehide is fired at the Window, never at the document.
    window.addEventListener('pagehide', onPageHide)

    return () => {
      document.removeEventListener('freeze', onFreeze)
      document.removeEventListener('resume', onResume)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pagehide', onPageHide)
    }
    // Registered once on mount: re-attaching per render would churn listeners
    // in the very path whose timing is under investigation.
  }, [])
}
