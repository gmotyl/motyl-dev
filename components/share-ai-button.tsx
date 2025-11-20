'use client'

import { Share2, Copy, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ShareAIButtonProps {
  prompt: string
  content?: string
  url?: string
  title?: string
  buttonLabel?: string
  shareTitle?: string
  successMessage?: string
  desktopSuccessMessage?: string
}

const DEFAULT_OUTPUT_LANGUAGE = 'Polish'
const STORAGE_KEY_LANGUAGE = 'share-ai-output-language'

export function ShareAIButton({
  prompt,
  content,
  url,
  title,
  successMessage = 'Copied! Paste in ChatGPT/Gemini 🔊',
}: ShareAIButtonProps) {
  const [outputLanguage, setOutputLanguage] = useState(DEFAULT_OUTPUT_LANGUAGE)
  const [editLanguage, setEditLanguage] = useState(DEFAULT_OUTPUT_LANGUAGE)
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    // Mark as hydrated first
    setIsHydrated(true)

    // Load custom settings from localStorage
    const savedLanguage = localStorage.getItem(STORAGE_KEY_LANGUAGE)

    if (savedLanguage) {
      setOutputLanguage(savedLanguage)
      setEditLanguage(savedLanguage)
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

  // Format the prompt based on the provided template and parameters
  const formatPrompt = (): string => {
    let filledPrompt = prompt

    // Replace language placeholder
    filledPrompt = filledPrompt.replace(/\{\{?\s*LANGUAGE\s*\}?\}/gi, outputLanguage)
    filledPrompt = filledPrompt.replace(/\{OUTPUT_LANGUAGE\}/g, outputLanguage)

    // Replace URL placeholder if url is provided
    if (url) {
      filledPrompt = filledPrompt.replace(/\{ARTICLE_URL\}/g, url)
    }

    // Append content if provided (for content-based sharing)
    if (content) {
      const cleaned = cleanContent(content)
      filledPrompt = `${filledPrompt}\n\n${cleaned}`
    }

    return filledPrompt
  }

  const handleSaveSettings = () => {
    localStorage.setItem(STORAGE_KEY_LANGUAGE, editLanguage)
    setOutputLanguage(editLanguage)
    setIsOpen(false)
    toast.success('Settings saved!')
  }

  const handleResetSettings = () => {
    setEditLanguage(DEFAULT_OUTPUT_LANGUAGE)
    localStorage.removeItem(STORAGE_KEY_LANGUAGE)
    setOutputLanguage(DEFAULT_OUTPUT_LANGUAGE)
    toast.success('Settings reset to default')
  }

  const handleShare = async () => {
    const formattedPrompt = formatPrompt()

    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: formattedPrompt,
        })
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 3000)
        toast.success(successMessage)
      } catch (err) {
        // User cancelled or error occurred
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Share failed:', err)
          // Fallback to clipboard
          await handleCopy(formattedPrompt)
        }
      }
    } else {
      // Fallback to clipboard for desktop
      await handleCopy(formattedPrompt)
    }
  }

  const handleCopy = async (formattedPrompt: string) => {
    try {
      await navigator.clipboard.writeText(formattedPrompt)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 3000)
      toast.success(successMessage, {
        duration: 6000,
      })
    } catch (err) {
      console.error('Copy failed:', err)
      toast.error('Failed to copy. Please try again.')
    }
  }

  // Prevent hydration mismatch by not rendering until client-side hydration is complete
  if (!isHydrated) {
    return (
      <div className="flex gap-1 my-1">
        <Button variant="outline" size="sm" className="gap-2" disabled>
          <Share2 className="h-4 w-4" />
          Read with AI
        </Button>
        <Button variant="ghost" size="sm" className="px-2" disabled>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-1 my-1">
      <Button onClick={handleShare} variant="outline" size="sm" className="gap-2" title={title}>
        <>
          {isCopied ? (
            <>
              <Copy className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Read with AI
            </>
          )}
        </>
      </Button>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="px-2" title="Customize output language">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start" side="top">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Output Language</Label>
              <Input
                id="language"
                value={editLanguage}
                onChange={(e) => setEditLanguage(e.target.value)}
                placeholder={DEFAULT_OUTPUT_LANGUAGE}
              />
              <p className="text-xs text-muted-foreground">Language for the AI content rewrite</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveSettings} size="sm" className="flex-1">
                Save
              </Button>
              <Button onClick={handleResetSettings} size="sm" variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
