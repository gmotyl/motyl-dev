/**
 * The session engine: which engine a reader session speaks with.
 *
 * Chosen once, at Play: OmniVoice (`openai`) when it is configured and its relay
 * answers the probe within `OMNIVOICE_PROBE_MS`, Edge otherwise. Within the
 * session it only ever moves OmniVoice -> Edge (`afterFailure`). Pure decision
 * logic: the probe is injected, and nothing here touches the TTS client.
 */

import { isOmniVoiceConfigured, OMNIVOICE_PROBE_MS, type OmniVoiceSettings } from './omnivoice'

export type SessionEngine =
  | { engine: 'openai'; fallback: false }
  | { engine: 'edge'; fallback: boolean }

/** A plain Edge session: OmniVoice was never in play, so nothing fell back. */
export const EDGE_SESSION: SessionEngine = { engine: 'edge', fallback: false }
/** Edge speaking although OmniVoice was configured: the probe or a unit failed. */
export const EDGE_FALLBACK_SESSION: SessionEngine = { engine: 'edge', fallback: true }
const OPENAI_SESSION: SessionEngine = { engine: 'openai', fallback: false }

/**
 * The engine a new session starts with. No probe is sent when OmniVoice is not
 * configured. The probe is bounded here as well as by itself: whatever `probe`
 * does (health check, catalog fetch), Play waits at most `OMNIVOICE_PROBE_MS`
 * for it, and a probe that rejects counts as a failed one.
 */
export async function chooseSessionEngine(
  s: OmniVoiceSettings,
  probe: (url: string) => Promise<boolean>
): Promise<SessionEngine> {
  if (!isOmniVoiceConfigured(s) || s.relayUrl === null) return EDGE_SESSION

  let timer: ReturnType<typeof setTimeout> | undefined
  const timedOut = new Promise<boolean>((resolve) => {
    timer = setTimeout(() => resolve(false), OMNIVOICE_PROBE_MS)
  })
  let answered = false
  try {
    answered = await Promise.race([probe(s.relayUrl).catch(() => false), timedOut])
  } finally {
    clearTimeout(timer)
  }
  return answered === true ? OPENAI_SESSION : EDGE_FALLBACK_SESSION
}

/** An abort (pause, stop, seek, superseded session) is not a failure of the engine. */
export function isAbortError(error: unknown): boolean {
  return (error as { name?: unknown } | null)?.name === 'AbortError'
}

/** The engine after a failed synthesis; unchanged for an abort or when already on edge. */
export function afterFailure(current: SessionEngine, error: unknown): SessionEngine {
  if (current.engine === 'edge' || isAbortError(error)) return current
  return EDGE_FALLBACK_SESSION
}
