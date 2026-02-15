import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { spawn } from 'child_process'
import { readFile, unlink } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'
export const maxDuration = 30

interface TTSRequest {
  text: string
  voice?: string
}

// Default voices - male voices for better quality
const DEFAULT_VOICE = 'en-GB-RyanNeural'

// Available voices mapping for common languages
const LANGUAGE_VOICES: Record<string, string> = {
  'pl-PL': 'pl-PL-MarekNeural',
  'en-US': 'en-GB-RyanNeural',
  'en-GB': 'en-GB-RyanNeural',
  'de-DE': 'de-DE-KatjaNeural',
  'fr-FR': 'fr-FR-DeniseNeural',
  'es-ES': 'es-ES-ElviraNeural',
  'it-IT': 'it-IT-ElsaNeural',
  'pt-PT': 'pt-PT-RaquelNeural',
  'ru-RU': 'ru-RU-SvetlanaNeural',
  'ja-JP': 'ja-JP-NanamiNeural',
  'zh-CN': 'zh-CN-XiaoxiaoNeural',
  'ko-KR': 'ko-KR-SunHiNeural',
}

// Helper to run uvx edge-tts command
function generateSpeech(text: string, voice: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const tempFile = join(tmpdir(), `tts_${randomUUID()}.mp3`)

    try {
      // Run uvx edge-tts command
      const proc = spawn(
        'uvx',
        ['edge-tts', '--text', text, '--write-media', tempFile, '--voice', voice],
        {
          stdio: 'pipe',
        }
      )

      let stderr = ''
      proc.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      proc.on('close', async (code) => {
        if (code !== 0) {
          console.error('[TTS] uvx edge-tts failed:', stderr)
          reject(new Error(`uvx edge-tts failed: ${stderr}`))
          return
        }

        try {
          const audioBuffer = await readFile(tempFile)
          await unlink(tempFile) // Clean up temp file
          resolve(audioBuffer)
        } catch (err) {
          reject(err)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    // CSRF protection: Verify origin header for cross-site requests
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    const host = request.headers.get('host')

    // Allow requests from same origin or Vercel preview deployments
    const isSameOrigin =
      origin === `https://${host}` || origin === `https://${host?.replace('3000', '3001')}`
    const isVercelPreview = origin?.includes('vercel.app') || referer?.includes('vercel.app')

    if (!isSameOrigin && !isVercelPreview && process.env.NODE_ENV === 'production') {
      console.log('[TTS] CSRF check failed:', { origin, referer, host })
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
    }

    // Authentication check: Only allow logged-in users
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to use TTS.' },
        { status: 401 }
      )
    }

    const body = (await request.json()) as TTSRequest
    const { text, voice } = body

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // Truncate text if too long (Vercel has timeout limits, ~450 chars is safe for streaming)
    const maxLength = 450
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text

    // Determine voice based on language or use provided voice
    const selectedVoice = voice || DEFAULT_VOICE

    console.log(
      '[TTS] Generating audio for voice:',
      selectedVoice,
      'text length:',
      truncatedText.length
    )

    const audioBuffer = await generateSpeech(truncatedText, selectedVoice)

    if (!audioBuffer || audioBuffer.length === 0) {
      console.error('[TTS] No audio data generated')
      return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 })
    }

    console.log('[TTS] Generated audio, size:', audioBuffer.length)

    // Return audio as MP3 response - convert Buffer to Uint8Array
    return new NextResponse(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('[TTS] API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate speech',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET endpoint to list available voices
export async function GET() {
  const voices = Object.entries(LANGUAGE_VOICES).map(([lang, voice]) => ({
    language: lang,
    voice: voice,
  }))

  return NextResponse.json({ voices })
}
