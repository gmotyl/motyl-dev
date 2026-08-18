import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TtsVoiceSettings from './tts-voice-settings'
import {
  TTS_VOICE_STORAGE_KEY,
  getStoredTtsVoice,
} from '@/lib/tts-voices'

describe('TtsVoiceSettings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('persists a voice selection from the settings control', async () => {
    const user = userEvent.setup()
    render(<TtsVoiceSettings />)

    const select = await screen.findByRole('combobox', { name: /reader voice/i })
    await user.selectOptions(select, 'pl-PL-ZofiaNeural')

    await waitFor(() => {
      expect(localStorage.getItem(TTS_VOICE_STORAGE_KEY)).toBe('pl-PL-ZofiaNeural')
    })
    expect(getStoredTtsVoice()).toBe('pl-PL-ZofiaNeural')
  })
})
