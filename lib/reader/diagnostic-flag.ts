/**
 * The URL switch for the reader diagnostic log.
 *
 * The flag is persisted rather than kept in the URL because the device test
 * runs in an INSTALLED PWA: its `start_url` is '/', which carries no query
 * string, so a URL-only flag would die the moment the app is relaunched — and
 * the operator's screen is off for the run that matters. Visiting
 * `?readerlog=1` once must therefore survive reloads, navigation and launches.
 */

import { READER_LOG_FLAG, isReaderLogEnabled } from '@/lib/reader/diagnostic-log'

const PARAM = 'readerlog'

/** Applies a ?readerlog=1|0 parameter to the persisted flag. Returns the resulting enabled state. */
export function applyReaderLogParam(search: string): boolean {
  // SSR: there is no localStorage on the server, and nothing to persist into.
  if (typeof window === 'undefined') return false

  const value = new URLSearchParams(search).get(PARAM)

  try {
    if (value === '1') {
      window.localStorage.setItem(READER_LOG_FLAG, '1')
      return true
    }
    if (value === '0') {
      window.localStorage.removeItem(READER_LOG_FLAG)
      return false
    }
  } catch {
    // Private mode / storage denied: degrade to "off" rather than throw out of
    // the component that applied the URL.
    return false
  }

  // Any other value is treated as absent: the stored flag is neither written
  // nor removed, and the caller just learns what is already persisted.
  return isReaderLogEnabled()
}
