'use client'

import { listVoices, type VoiceInfo } from 'anytts'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

import { configureOmniVoice, resolveStoredVoice } from '@/lib/tts/client'
import {
  OMNIVOICE_PROBE_MS,
  fetchRelayVoices,
  isOmniVoiceConfigured,
  probeRelay,
  readOmniVoiceSettings,
  writeOmniVoiceSettings,
} from '@/lib/tts/omnivoice'
import {
  DEFAULT_TTS_ENGINE,
  DEFAULT_TTS_VOICE,
  MOTYL_ENGINES,
  getStoredTtsEngine,
  readStoredTtsVoice,
  setStoredTtsEngine,
  setStoredTtsVoice,
} from '@/lib/tts/voices'

const SELECT_CLASS_NAME =
  'mt-3 min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'

interface VoiceGroup {
  label: string
  voices: VoiceInfo[]
}

function languageName(language: string): string {
  try {
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(language) ?? language
  } catch {
    return language
  }
}

/** One group per language (locale prefix), in catalog order. */
function groupByLanguage(voices: VoiceInfo[]): VoiceGroup[] {
  const groups = new Map<string, VoiceGroup>()
  for (const voice of voices) {
    const language = voice.locale.split('-')[0]
    let group = groups.get(language)
    if (!group) {
      group = { label: languageName(language), voices: [] }
      groups.set(language, group)
    }
    group.voices.push(voice)
  }
  return [...groups.values()]
}

interface TtsVoiceSettingsProps {
  /** SuperAdmins get the two-engine card (OmniVoice + Edge fallback). */
  isSuperAdmin?: boolean
}

export function TtsVoiceSettings({ isSuperAdmin = false }: TtsVoiceSettingsProps) {
  return isSuperAdmin ? <EngineSettings /> : <EdgeVoiceSettings />
}

/** The card everyone else sees: Edge only. */
function EdgeVoiceSettings() {
  const [engine, setEngine] = useState(DEFAULT_TTS_ENGINE)
  const [voice, setVoice] = useState(DEFAULT_TTS_VOICE)
  const voiceGroups = useMemo(() => groupByLanguage(listVoices(engine)), [engine])

  // Load the saved engine and voice after mount (storage is client-only), and
  // resolve the voice against that engine's catalog: a stale one falls back,
  // and the fallback is written back here, never during render.
  useEffect(() => {
    const storedEngine = getStoredTtsEngine()
    const resolved = resolveStoredVoice(storedEngine, readStoredTtsVoice())
    setEngine(storedEngine)
    setVoice(resolved.voice)
    if (resolved.fellBack) setStoredTtsVoice(resolved.voice)
  }, [])

  const handleEngineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextEngine = setStoredTtsEngine(event.target.value)
    // The current voice may not exist in the next engine's catalog.
    const resolved = resolveStoredVoice(nextEngine, voice)
    setEngine(nextEngine)
    setVoice(resolved.fellBack ? setStoredTtsVoice(resolved.voice) : resolved.voice)
  }

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVoice(setStoredTtsVoice(event.target.value))
  }

  return (
    <div className="rounded-lg bg-muted/30 p-4">
      <label htmlFor="tts-engine" className="font-medium">
        Engine
      </label>
      <select
        id="tts-engine"
        value={engine}
        onChange={handleEngineChange}
        className={SELECT_CLASS_NAME}
      >
        {MOTYL_ENGINES.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="tts-voice" className="mt-4 block font-medium">
        Reader voice
      </label>
      <p id="tts-voice-description" className="mt-1 text-sm text-muted-foreground">
        Choose the voice used for continuous news reading.
      </p>
      <select
        id="tts-voice"
        value={voice}
        onChange={handleVoiceChange}
        aria-describedby="tts-voice-description"
        className={SELECT_CLASS_NAME}
      >
        {voiceGroups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.voices.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}

type RelayStatus = 'off' | 'not-configured' | 'checking' | 'reachable' | 'unreachable'

const CHIP_BASE_CLASS_NAME = 'rounded-full px-2 py-0.5 text-xs font-medium'
const CHIP_CLASS_NAMES: Record<RelayStatus, string> = {
  off: 'bg-muted text-muted-foreground',
  'not-configured': 'bg-muted text-muted-foreground',
  checking: 'bg-muted text-muted-foreground',
  reachable: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  unreachable: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
}
const CHIP_LABELS: Record<RelayStatus, string> = {
  off: 'off',
  'not-configured': 'not configured',
  checking: 'checking…',
  reachable: 'reachable',
  unreachable: 'unreachable: Edge will read',
}

/**
 * The SuperAdmin card: row 1 OmniVoice (relay URL, status chip, voice from the
 * relay's catalog), row 2 Edge (its own voice under `tts-voice`), used whenever
 * OmniVoice is off, unconfigured or does not answer.
 */
function EngineSettings() {
  const ids = useId()
  const [loaded, setLoaded] = useState(false)
  const [enabled, setEnabled] = useState(false)
  // `relayUrl` is the committed (stored) URL; `relayUrlDraft` is what is typed.
  const [relayUrl, setRelayUrl] = useState<string | null>(null)
  const [relayUrlDraft, setRelayUrlDraft] = useState('')
  const [omniVoice, setOmniVoice] = useState<string | null>(null)
  const [edgeVoice, setEdgeVoice] = useState(DEFAULT_TTS_VOICE)
  // The last settled load, keyed by the URL it was for; null voices = unreachable.
  const [relayLoad, setRelayLoad] = useState<{ url: string; voices: VoiceInfo[] | null } | null>(
    null
  )
  // Set by a Relay URL edit: the next settled load for that URL reconfigures the client.
  const configureFor = useRef<string | null>(null)

  const usableUrl =
    enabled && relayUrl && isOmniVoiceConfigured({ enabled, relayUrl, voice: null })
      ? relayUrl
      : null
  // Derived, so an answer for a URL that is no longer current never shows.
  const currentLoad = usableUrl && relayLoad?.url === usableUrl ? relayLoad : null
  const catalog = currentLoad?.voices ?? null
  const status: RelayStatus = !enabled
    ? 'off'
    : !usableUrl
      ? 'not-configured'
      : !currentLoad
        ? 'checking'
        : catalog
          ? 'reachable'
          : 'unreachable'

  const edgeGroups = useMemo(() => groupByLanguage(listVoices('edge')), [])
  const omniGroups = useMemo(() => (catalog ? groupByLanguage(catalog) : []), [catalog])

  useEffect(() => {
    const settings = readOmniVoiceSettings()
    setEnabled(settings.enabled)
    setRelayUrl(settings.relayUrl)
    setRelayUrlDraft(settings.relayUrl ?? '')
    setOmniVoice(settings.voice)
    const resolved = resolveStoredVoice('edge', readStoredTtsVoice())
    setEdgeVoice(resolved.voice)
    if (resolved.fellBack) setStoredTtsVoice(resolved.voice)
    setLoaded(true)
  }, [])

  // Probe and load the catalog on mount and whenever the switch or committed URL
  // changes. /health and /voices run in parallel, and the catalog is aborted
  // after OMNIVOICE_PROBE_MS, so a relay that hangs on /voices settles as
  // unreachable. The cleanup aborts the catalog and drops answers for a URL
  // that is no longer current.
  useEffect(() => {
    if (!loaded || !usableUrl) return

    let current = true
    const url = usableUrl
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), OMNIVOICE_PROBE_MS)
    const load = async (): Promise<VoiceInfo[] | null> => {
      const [healthy, voices] = await Promise.all([
        probeRelay(url),
        fetchRelayVoices(url, controller.signal).catch(() => null),
      ])
      return healthy && voices && voices.length > 0 ? voices : null
    }
    void load().then((voices) => {
      clearTimeout(timer)
      if (!current) return
      setRelayLoad({ url, voices })
      if (configureFor.current === url) {
        configureFor.current = null
        // An empty catalog leaves OmniVoice unconfigured in the client.
        configureOmniVoice({ relayUrl: url, catalog: voices ?? [] })
      }
    })
    return () => {
      current = false
      clearTimeout(timer)
      controller.abort()
    }
  }, [loaded, usableUrl])

  // A saved OmniVoice voice missing from the fetched catalog falls back to the
  // first catalog voice, written back here and never during render.
  useEffect(() => {
    if (!catalog || catalog.length === 0) return
    if (omniVoice && catalog.some((voice) => voice.id === omniVoice)) return
    const first = catalog[0].id
    setOmniVoice(first)
    writeOmniVoiceSettings({ voice: first })
  }, [catalog, omniVoice])

  const handleToggle = () => {
    const next = writeOmniVoiceSettings({ enabled: !enabled })
    setEnabled(next.enabled)
  }

  // The URL commits on blur or Enter, so typing does not probe per keystroke.
  const commitRelayUrl = () => {
    const next = writeOmniVoiceSettings({ relayUrl: relayUrlDraft })
    setRelayUrlDraft(next.relayUrl ?? '')
    if (next.relayUrl === relayUrl) return
    if (next.relayUrl && isOmniVoiceConfigured(next)) {
      configureFor.current = next.relayUrl
    } else {
      configureFor.current = null
      configureOmniVoice(null)
    }
    setRelayUrl(next.relayUrl)
  }

  const handleOmniVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOmniVoice(writeOmniVoiceSettings({ voice: event.target.value }).voice)
  }

  const handleEdgeVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEdgeVoice(setStoredTtsVoice(event.target.value))
  }

  const catalogReady = status === 'reachable' && catalog !== null
  const edgeInUse = status !== 'reachable' && status !== 'checking'
  const titleId = `${ids}-title`
  const omniNameId = `${ids}-omni-name`
  const omniVoiceLabelId = `${ids}-omni-voice-label`
  const relayUrlId = `${ids}-relay-url`
  const edgeNameId = `${ids}-edge-name`
  const edgeVoiceLabelId = `${ids}-edge-voice-label`

  return (
    <section aria-labelledby={titleId} className="rounded-lg bg-muted/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 id={titleId} className="font-medium">
          Read-aloud engines
        </h4>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={handleToggle}
          className="flex min-h-11 items-center gap-2 text-sm"
        >
          <span
            aria-hidden="true"
            className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
              enabled ? 'bg-primary' : 'bg-input'
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-background shadow transition-transform ${
                enabled ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </span>
          Use OmniVoice
        </button>
      </div>

      <div role="group" aria-labelledby={omniNameId} className="mt-4 border-t border-border pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">1</span>
          <span id={omniNameId} className="font-medium">
            OmniVoice
          </span>
          <span className="text-sm text-muted-foreground">SPOCK · tailnet</span>
          <span className={`${CHIP_BASE_CLASS_NAME} ${CHIP_CLASS_NAMES[status]}`}>
            {CHIP_LABELS[status]}
          </span>
        </div>

        <label htmlFor={relayUrlId} className="mt-3 block text-sm font-medium">
          Relay URL
        </label>
        <input
          id={relayUrlId}
          type="url"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          placeholder="https://spock.example.ts.net"
          value={relayUrlDraft}
          onChange={(event) => setRelayUrlDraft(event.target.value)}
          onBlur={commitRelayUrl}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              commitRelayUrl()
            }
          }}
          className="mt-1 min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />

        <span id={omniVoiceLabelId} className="mt-3 block text-sm font-medium">
          Voice
        </span>
        <select
          aria-labelledby={`${omniNameId} ${omniVoiceLabelId}`}
          value={omniVoice ?? ''}
          onChange={handleOmniVoiceChange}
          disabled={!catalogReady}
          className={`${SELECT_CLASS_NAME} mt-1 disabled:opacity-60`}
        >
          {catalogReady ? (
            omniGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.voices.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))
          ) : (
            <option value={omniVoice ?? ''}>
              {omniVoice ? `${omniVoice} (saved; catalog unavailable)` : 'No voice saved'}
            </option>
          )}
        </select>
      </div>

      <div role="group" aria-labelledby={edgeNameId} className="mt-4 border-t border-border pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">2</span>
          <span id={edgeNameId} className="font-medium">
            Edge
          </span>
          <span className="text-sm text-muted-foreground">fallback</span>
          {edgeInUse && (
            <span className={`${CHIP_BASE_CLASS_NAME} bg-muted text-muted-foreground`}>
              in use
            </span>
          )}
        </div>

        <span id={edgeVoiceLabelId} className="mt-3 block text-sm font-medium">
          Voice
        </span>
        <select
          aria-labelledby={`${edgeNameId} ${edgeVoiceLabelId}`}
          value={edgeVoice}
          onChange={handleEdgeVoiceChange}
          className={`${SELECT_CLASS_NAME} mt-1`}
        >
          {edgeGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.voices.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Voices are listed live from SPOCK. When SPOCK does not answer at Play, or fails
        mid-session, the rest of the session reads with Edge.
      </p>
      {status === 'unreachable' && (
        <p className="mt-2 text-sm text-muted-foreground">
          Is this phone on the tailnet and is SPOCK awake? The saved OmniVoice voice stays
          selected and is used again once SPOCK answers.
        </p>
      )}
      <p className="mt-2 text-xs text-muted-foreground">Visible to SuperAdmin only.</p>
    </section>
  )
}

export default TtsVoiceSettings
