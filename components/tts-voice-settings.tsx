'use client'

import { useEffect, useState } from 'react'

import {
  DEFAULT_TTS_VOICE,
  getStoredTtsVoice,
  setStoredTtsVoice,
  TTS_VOICES,
  type TtsVoice,
} from '@/lib/tts-voices'

export function TtsVoiceSettings() {
  const [voice, setVoice] = useState<TtsVoice>(DEFAULT_TTS_VOICE)

  useEffect(() => {
    setVoice(getStoredTtsVoice())
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVoice(setStoredTtsVoice(event.target.value))
  }

  return (
    <div className="rounded-lg bg-muted/30 p-4">
      <label htmlFor="tts-voice" className="font-medium">
        Reader voice
      </label>
      <p id="tts-voice-description" className="mt-1 text-sm text-muted-foreground">
        Choose the voice used for continuous news reading.
      </p>
      <select
        id="tts-voice"
        value={voice}
        onChange={handleChange}
        aria-describedby="tts-voice-description"
        className="mt-3 min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        {TTS_VOICES.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TtsVoiceSettings
