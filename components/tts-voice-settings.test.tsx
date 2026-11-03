import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { listVoices, type VoiceInfo } from 'anytts'
import { vi } from 'vitest'

import TtsVoiceSettings from './tts-voice-settings'
import { configureOmniVoice } from '@/lib/tts/client'
import {
  OMNIVOICE_ENABLED_KEY,
  OMNIVOICE_RELAY_URL_KEY,
  OMNIVOICE_VOICE_KEY,
  fetchRelayVoices,
  probeRelay,
} from '@/lib/tts/omnivoice'
import {
  DEFAULT_TTS_VOICE,
  TTS_ENGINE_STORAGE_KEY,
  TTS_VOICE_CHANGE_EVENT,
  TTS_VOICE_STORAGE_KEY,
  getStoredTtsVoice,
} from '@/lib/tts/voices'

vi.mock('@/lib/tts/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/tts/client')>()
  return { ...actual, configureOmniVoice: vi.fn() }
})

vi.mock('@/lib/tts/omnivoice', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/tts/omnivoice')>()
  return { ...actual, probeRelay: vi.fn(), fetchRelayVoices: vi.fn() }
})

const RELAY_URL = 'https://spock.tailnet.ts.net'
const OTHER_RELAY_URL = 'https://spock-2.tailnet.ts.net'

const RELAY_CATALOG: VoiceInfo[] = [
  { id: 'krystyna1', label: 'krystyna1 — krystyna', locale: 'pl-PL', gender: 'female', multilingual: false },
  { id: 'pl-female', label: 'pl-female — Polish, young', locale: 'pl-PL', gender: 'female', multilingual: false },
  { id: 'krystyna-gb', label: 'krystyna-gb — krystyna-gb', locale: 'en-GB', gender: 'female', multilingual: false },
]

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => {
    resolve = done
  })
  return { promise, resolve }
}

function enableOmniVoice(voice: string | null = 'krystyna1', relayUrl = RELAY_URL) {
  localStorage.setItem(OMNIVOICE_ENABLED_KEY, '1')
  localStorage.setItem(OMNIVOICE_RELAY_URL_KEY, relayUrl)
  if (voice) localStorage.setItem(OMNIVOICE_VOICE_KEY, voice)
}

function omniVoiceSelect() {
  return screen.getByRole('combobox', { name: /omnivoice voice/i }) as HTMLSelectElement
}

function edgeVoiceSelect() {
  return screen.getByRole('combobox', { name: /edge voice/i }) as HTMLSelectElement
}

function engineRow(name: string) {
  return screen.getByRole('group', { name }) as HTMLElement
}

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
    vi.mocked(probeRelay).mockReset()
    vi.mocked(fetchRelayVoices).mockReset()
    vi.mocked(configureOmniVoice).mockReset()
  })

  it('the engine select offers edge only', () => {
    localStorage.setItem(TTS_ENGINE_STORAGE_KEY, 'openai')
    render(<TtsVoiceSettings />)

    const engineOptions = within(engineSelect()).getAllByRole('option') as HTMLOptionElement[]
    expect(engineOptions.map((option) => option.value)).toEqual(['edge'])
    expect(engineSelect().value).toBe('edge')
  })

  it('renders an engine select and voices grouped per language', () => {
    const { container } = render(<TtsVoiceSettings />)

    const engineOptions = within(engineSelect()).getAllByRole('option') as HTMLOptionElement[]
    expect(engineOptions.map((option) => option.value)).toEqual(['edge'])

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

  describe('SuperAdmin', () => {
    beforeEach(() => {
      vi.mocked(probeRelay).mockResolvedValue(true)
      vi.mocked(fetchRelayVoices).mockResolvedValue(RELAY_CATALOG)
    })

    it('SuperAdmin card shows the header and Use OmniVoice switch', async () => {
      const user = userEvent.setup()
      render(<TtsVoiceSettings isSuperAdmin />)

      expect(screen.getByRole('heading', { name: 'Read-aloud engines' })).toBeInTheDocument()
      const toggle = screen.getByRole('switch', { name: 'Use OmniVoice' })
      expect(toggle).toHaveAttribute('aria-checked', 'false')

      await user.click(toggle)
      expect(toggle).toHaveAttribute('aria-checked', 'true')
      expect(localStorage.getItem(OMNIVOICE_ENABLED_KEY)).toBe('1')

      await user.click(toggle)
      expect(toggle).toHaveAttribute('aria-checked', 'false')
      expect(localStorage.getItem(OMNIVOICE_ENABLED_KEY)).toBeNull()
    })

    it('reachable relay shows the green chip, relay URL field and grouped voices', async () => {
      enableOmniVoice('krystyna1')
      render(<TtsVoiceSettings isSuperAdmin />)

      const row = engineRow('OmniVoice')
      expect(within(row).getByText('OmniVoice')).toBeInTheDocument()
      expect(within(row).getByText('SPOCK · tailnet')).toBeInTheDocument()
      const chip = await within(row).findByText('reachable')
      expect(chip.className).toMatch(/emerald/)
      expect(probeRelay).toHaveBeenCalledWith(RELAY_URL)
      expect(fetchRelayVoices).toHaveBeenCalledWith(RELAY_URL)

      const urlField = within(row).getByRole('textbox', { name: 'Relay URL' }) as HTMLInputElement
      expect(urlField.value).toBe(RELAY_URL)

      const select = omniVoiceSelect()
      await waitFor(() => expect(select).not.toBeDisabled())
      expect(select.value).toBe('krystyna1')
      const groups = Array.from(select.querySelectorAll('optgroup'))
      expect(groups.map((group) => group.getAttribute('label'))).toEqual(['Polish', 'English'])
      expect(
        Array.from(groups[0].querySelectorAll('option')).map((option) => option.value)
      ).toEqual(['krystyna1', 'pl-female'])
      expect(
        Array.from(groups[1].querySelectorAll('option')).map((option) => option.textContent)
      ).toEqual(['krystyna-gb — krystyna-gb'])

      const user = userEvent.setup()
      await user.selectOptions(select, 'pl-female')
      expect(localStorage.getItem(OMNIVOICE_VOICE_KEY)).toBe('pl-female')
      // Edge is not in use while OmniVoice answers.
      expect(within(engineRow('Edge')).queryByText('in use')).not.toBeInTheDocument()
    })

    it('Edge row keeps its own voice under tts-voice', async () => {
      enableOmniVoice('krystyna1')
      localStorage.setItem(TTS_VOICE_STORAGE_KEY, 'pl-PL-ZofiaNeural')
      const user = userEvent.setup()
      render(<TtsVoiceSettings isSuperAdmin />)

      const row = engineRow('Edge')
      expect(within(row).getByText('Edge')).toBeInTheDocument()
      expect(within(row).getByText('fallback')).toBeInTheDocument()
      await waitFor(() => expect(edgeVoiceSelect().value).toBe('pl-PL-ZofiaNeural'))
      const edgeIds = Array.from(edgeVoiceSelect().querySelectorAll('option')).map((o) => o.value)
      expect(edgeIds.sort()).toEqual(listVoices('edge').map((voice) => voice.id).sort())

      await user.selectOptions(edgeVoiceSelect(), 'pl-PL-MarekNeural')
      expect(localStorage.getItem(TTS_VOICE_STORAGE_KEY)).toBe('pl-PL-MarekNeural')
      // The OmniVoice voice is stored separately and stays untouched.
      expect(localStorage.getItem(OMNIVOICE_VOICE_KEY)).toBe('krystyna1')
    })

    it('unreachable relay disables the OmniVoice select and marks Edge in use', async () => {
      vi.mocked(probeRelay).mockResolvedValue(false)
      enableOmniVoice('krystyna1')
      render(<TtsVoiceSettings isSuperAdmin />)

      const chip = await within(engineRow('OmniVoice')).findByText('unreachable: Edge will read')
      expect(chip.className).toMatch(/amber/)
      const select = omniVoiceSelect()
      expect(select).toBeDisabled()
      expect(select.selectedOptions[0].textContent).toBe('krystyna1 (saved; catalog unavailable)')
      expect(within(engineRow('Edge')).getByText('in use')).toBeInTheDocument()
      // The saved voice is not rewritten while the catalog is unavailable.
      expect(localStorage.getItem(OMNIVOICE_VOICE_KEY)).toBe('krystyna1')
      expect(fetchRelayVoices).not.toHaveBeenCalled()
    })

    it('the fallback hint is rendered under the rows', () => {
      render(<TtsVoiceSettings isSuperAdmin />)

      const hint = screen.getByText(
        'Voices are listed live from SPOCK. When SPOCK does not answer at Play, or fails mid-session, the rest of the session reads with Edge.'
      )
      // The hint follows both engine rows.
      const edgeRow = engineRow('Edge')
      expect(
        edgeRow.compareDocumentPosition(hint) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy()
    })

    it('editing the relay URL stores it and reloads probe and catalog', async () => {
      const staleProbe = deferred<boolean>()
      vi.mocked(probeRelay).mockImplementation((url) =>
        url === RELAY_URL ? staleProbe.promise : Promise.resolve(true)
      )
      enableOmniVoice('krystyna1')
      const user = userEvent.setup()
      render(<TtsVoiceSettings isSuperAdmin />)

      const row = engineRow('OmniVoice')
      await waitFor(() => expect(probeRelay).toHaveBeenCalledWith(RELAY_URL))
      const urlField = within(row).getByRole('textbox', { name: 'Relay URL' })

      await user.clear(urlField)
      await user.type(urlField, OTHER_RELAY_URL)
      // Typing alone does not commit: no probe per keystroke.
      expect(probeRelay).toHaveBeenCalledTimes(1)
      expect(localStorage.getItem(OMNIVOICE_RELAY_URL_KEY)).toBe(RELAY_URL)

      await user.keyboard('{Enter}')
      expect(localStorage.getItem(OMNIVOICE_RELAY_URL_KEY)).toBe(OTHER_RELAY_URL)
      await waitFor(() => expect(probeRelay).toHaveBeenCalledWith(OTHER_RELAY_URL))
      await waitFor(() => expect(fetchRelayVoices).toHaveBeenCalledWith(OTHER_RELAY_URL))
      await within(row).findByText('reachable')
      await waitFor(() =>
        expect(configureOmniVoice).toHaveBeenCalledWith({
          relayUrl: OTHER_RELAY_URL,
          catalog: RELAY_CATALOG,
        })
      )

      // The probe for the old URL answers late; it must not overwrite the new state.
      await act(async () => {
        staleProbe.resolve(false)
        await staleProbe.promise
      })
      expect(within(row).getByText('reachable')).toBeInTheDocument()
      expect(within(row).queryByText('unreachable: Edge will read')).not.toBeInTheDocument()

      // An unusable URL is stored, but nothing is probed and OmniVoice is unconfigured.
      vi.mocked(probeRelay).mockClear()
      await user.clear(urlField)
      await user.type(urlField, 'http://spock.tailnet.ts.net')
      await user.tab()
      expect(localStorage.getItem(OMNIVOICE_RELAY_URL_KEY)).toBe('http://spock.tailnet.ts.net')
      expect(await within(row).findByText('not configured')).toBeInTheDocument()
      expect(probeRelay).not.toHaveBeenCalled()
      expect(configureOmniVoice).toHaveBeenLastCalledWith(null)
    })

    it('a missing saved OmniVoice voice falls back to the first catalog voice', async () => {
      enableOmniVoice('gone-voice')
      const setItem = vi.spyOn(Storage.prototype, 'setItem')
      const consoleError = vi.spyOn(console, 'error')
      render(<TtsVoiceSettings isSuperAdmin />)

      await waitFor(() => expect(omniVoiceSelect().value).toBe('krystyna1'))
      await waitFor(() => {
        expect(setItem).toHaveBeenCalledWith(OMNIVOICE_VOICE_KEY, 'krystyna1')
      })
      expect(localStorage.getItem(OMNIVOICE_VOICE_KEY)).toBe('krystyna1')
      // A write-back during render would surface as a React state-update warning.
      expect(consoleError).not.toHaveBeenCalled()
    })

    it('non-SuperAdmin sees the edge-only card', () => {
      enableOmniVoice('krystyna1')
      render(<TtsVoiceSettings isSuperAdmin={false} />)

      expect(engineSelect()).toBeInTheDocument()
      expect(voiceSelect()).toBeInTheDocument()
      expect(screen.queryByText('Read-aloud engines')).not.toBeInTheDocument()
      expect(screen.queryByRole('switch')).not.toBeInTheDocument()
      expect(screen.queryByText('OmniVoice')).not.toBeInTheDocument()
      expect(screen.queryByRole('textbox', { name: 'Relay URL' })).not.toBeInTheDocument()
      expect(probeRelay).not.toHaveBeenCalled()
    })
  })
})
