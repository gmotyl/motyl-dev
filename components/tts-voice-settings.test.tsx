import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { listEngines, listVoices } from 'anytts'
import { vi } from 'vitest'

import TtsVoiceSettings from './tts-voice-settings'
import {
  DEFAULT_TTS_VOICE,
  TTS_ENGINE_STORAGE_KEY,
  TTS_VOICE_CHANGE_EVENT,
  TTS_VOICE_STORAGE_KEY,
  getStoredTtsVoice,
} from '@/lib/tts/voices'

// The ids the hand-curated list offered before the anytts catalog replaced it;
// a reader who saved one of them must keep it.
const PREVIOUSLY_OFFERED_VOICES = [
  'en-AU-WilliamMultilingualNeural',
  'en-US-AndrewMultilingualNeural',
  'en-US-EmmaMultilingualNeural',
  'en-US-AvaMultilingualNeural',
  'en-US-BrianMultilingualNeural',
  'de-DE-SeraphinaMultilingualNeural',
  'de-DE-FlorianMultilingualNeural',
  'fr-FR-VivienneMultilingualNeural',
  'fr-FR-RemyMultilingualNeural',
  'it-IT-GiuseppeMultilingualNeural',
  'pl-PL-MarekNeural',
  'pl-PL-ZofiaNeural',
]

function voiceSelect() {
  return screen.getByRole('combobox', { name: /reader voice/i }) as HTMLSelectElement
}

function engineSelect() {
  return screen.getByRole('combobox', { name: /engine/i }) as HTMLSelectElement
}

describe('TtsVoiceSettings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders an engine select and voices grouped per language', () => {
    const { container } = render(<TtsVoiceSettings />)

    const engineOptions = within(engineSelect()).getAllByRole('option') as HTMLOptionElement[]
    expect(engineOptions.map((option) => option.value)).toEqual(
      listEngines().map((engine) => engine.id)
    )

    // Label and description are unchanged.
    expect(
      screen.getByText('Choose the voice used for continuous news reading.')
    ).toBeInTheDocument()

    const catalog = listVoices('edge')
    const options = Array.from(voiceSelect().querySelectorAll('option'))
    expect(options.map((option) => option.value).sort()).toEqual(
      catalog.map((voice) => voice.id).sort()
    )

    // One group per language, and every voice sits in the group of its own language.
    const labels = Array.from(container.querySelectorAll('#tts-voice optgroup')).map((group) =>
      group.getAttribute('label')
    )
    expect(new Set(labels).size).toBe(labels.length)
    expect(labels).toEqual(expect.arrayContaining(['English', 'Polish', 'German']))
    const names = new Intl.DisplayNames(['en'], { type: 'language' })
    for (const voice of catalog) {
      const option = options.find((candidate) => candidate.value === voice.id)!
      expect(option.parentElement?.tagName).toBe('OPTGROUP')
      expect(option.parentElement?.getAttribute('label')).toBe(
        names.of(voice.locale.split('-')[0])
      )
      expect(option.textContent).toBe(voice.label)
    }
  })

  it('choosing a voice stores it and dispatches the change event', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    window.addEventListener(TTS_VOICE_CHANGE_EVENT, onChange)
    render(<TtsVoiceSettings />)

    await user.selectOptions(voiceSelect(), 'pl-PL-ZofiaNeural')

    await waitFor(() => {
      expect(localStorage.getItem(TTS_VOICE_STORAGE_KEY)).toBe('pl-PL-ZofiaNeural')
    })
    expect(voiceSelect().value).toBe('pl-PL-ZofiaNeural')
    expect(getStoredTtsVoice()).toBe('pl-PL-ZofiaNeural')
    expect(onChange).toHaveBeenCalled()
    window.removeEventListener(TTS_VOICE_CHANGE_EVENT, onChange)
  })

  it('choosing an engine stores it', async () => {
    const user = userEvent.setup()
    render(<TtsVoiceSettings />)

    await user.selectOptions(engineSelect(), 'edge')

    await waitFor(() => {
      expect(localStorage.getItem(TTS_ENGINE_STORAGE_KEY)).toBe('edge')
    })
    expect(engineSelect().value).toBe('edge')
  })

  it('a stale stored voice falls back and is written back after render', async () => {
    localStorage.setItem(TTS_VOICE_STORAGE_KEY, 'xx-XX-NotARealVoiceNeural')
    // Prototype spy (an instance spy on jsdom storage is inert); calls through.
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    const consoleError = vi.spyOn(console, 'error')

    render(<TtsVoiceSettings />)

    await waitFor(() => {
      expect(voiceSelect().value).toBe(DEFAULT_TTS_VOICE)
    })
    await waitFor(() => {
      expect(setItem).toHaveBeenCalledWith(TTS_VOICE_STORAGE_KEY, DEFAULT_TTS_VOICE)
    })
    expect(localStorage.getItem(TTS_VOICE_STORAGE_KEY)).toBe(DEFAULT_TTS_VOICE)
    // A write-back during render would surface as a React state-update warning.
    expect(consoleError).not.toHaveBeenCalled()
  })

  it('every previously offered voice stays selectable', async () => {
    const catalog = new Set(listVoices('edge').map((voice) => voice.id))
    for (const id of PREVIOUSLY_OFFERED_VOICES) {
      expect(catalog.has(id)).toBe(true)

      localStorage.setItem(TTS_VOICE_STORAGE_KEY, id)
      const { unmount } = render(<TtsVoiceSettings />)
      await waitFor(() => {
        expect(voiceSelect().value).toBe(id)
      })
      expect(localStorage.getItem(TTS_VOICE_STORAGE_KEY)).toBe(id)
      unmount()
    }
  })

  it('defaults to edge and the default voice', async () => {
    render(<TtsVoiceSettings />)

    await waitFor(() => {
      expect(voiceSelect().value).toBe(DEFAULT_TTS_VOICE)
    })
    expect(engineSelect().value).toBe('edge')
  })
})
