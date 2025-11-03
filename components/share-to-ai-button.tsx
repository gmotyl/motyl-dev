'use client'

import { Share2, Copy, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ShareToAIButtonProps {
  content: string
}

const DEFAULT_PROMPT =
  'Rewrite this information back to me without changing anything, except translation to Polish language'
const STORAGE_KEY = 'tts-custom-prompt'

export function ShareToAIButton({ content }: ShareToAIButtonProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [customPrompt, setCustomPrompt] = useState(DEFAULT_PROMPT)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(DEFAULT_PROMPT)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    setIsMobile(mobile)

    // Load custom prompt from localStorage
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setCustomPrompt(saved)
      setEditValue(saved)
    }
  }, [])

  // Clean content: remove markdown, excessive whitespace
  const cleanContent = (text: string): string => {
    return text
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '') // Remove italic
      .replace(/`{1,3}/g, '') // Remove code blocks
      .replace(/\n{3,}/g, '\n\n') // Normalize line breaks
      .trim()
  }

  // Format the magic prompt
  const formatPrompt = (): string => {
    const cleaned = cleanContent(content)
    return `${customPrompt}: ${cleaned}`
  }

  const handleSavePrompt = () => {
    localStorage.setItem(STORAGE_KEY, editValue)
    setCustomPrompt(editValue)
    setIsOpen(false)
    toast.success('Custom prompt saved!')
  }

  const handleResetPrompt = () => {
    setEditValue(DEFAULT_PROMPT)
    localStorage.removeItem(STORAGE_KEY)
    setCustomPrompt(DEFAULT_PROMPT)
    toast.success('Prompt reset to default')
  }

  const handleShare = async () => {
    const prompt = formatPrompt()

    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Read article with AI',
          text: prompt,
        })
        toast.success('Shared successfully! Now send the message and tap Read Aloud 🔊')
      } catch (err) {
        // User cancelled or error occurred
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Share failed:', err)
          // Fallback to clipboard
          await handleCopy(prompt)
        }
      }
    } else {
      // Fallback to clipboard for desktop
      await handleCopy(prompt)
    }
  }

  const handleCopy = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      toast.success('Copied! Open ChatGPT or Gemini, paste, and use Read Aloud 🔊', {
        duration: 6000,
      })
    } catch (err) {
      console.error('Copy failed:', err)
      toast.error('Failed to copy. Please try again.')
    }
  }

  return (
    <div className="flex gap-1">
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="gap-2"
        title={
          isMobile
            ? 'Share article to ChatGPT/Gemini for high-quality TTS'
            : 'Copy article for ChatGPT/Gemini TTS'
        }
      >
        {isMobile ? (
          <>
            <Share2 className="h-4 w-4" />
            Read with AI
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy for AI
          </>
        )}
      </Button>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="px-2" title="Customize AI prompt">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end" side="top">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Custom AI Prompt</Label>
              <Textarea
                id="prompt"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={DEFAULT_PROMPT}
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                Article content will be appended after this prompt. Open ChatGPT or Gemini, paste,
                and use Read Aloud 🔊',
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSavePrompt} size="sm" className="flex-1">
                Save
              </Button>
              <Button onClick={handleResetPrompt} size="sm" variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
