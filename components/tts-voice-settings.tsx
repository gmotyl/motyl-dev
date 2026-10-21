'use client'

import { listEngines, listVoices, type VoiceInfo } from 'anytts'
import { useEffect, useMemo, useState } from 'react'

import { resolveStoredVoice } from '@/lib/tts/client'
import {
  DEFAULT_TTS_ENGINE,
  DEFAULT_TTS_VOICE,
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

export function TtsVoiceSettings() {
  const engines = useMemo(() => listEngines(), [])
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
        {engines.map((option) => (
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

export default TtsVoiceSettings
