'use client'

import { Share2, Copy, Settings, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getContentItemBySlug } from '@/lib/articles'

interface ShareAIButtonProps {
  articleContent?: string
  prompt: string
  articleSlug?: string
  url?: string
  title?: string
  buttonLabel?: string
  shareTitle?: string
  successMessage?: string
  desktopSuccessMessage?: string
  iconOnly?: boolean
}

const DEFAULT_OUTPUT_LANGUAGE = 'Polish'
const STORAGE_KEY_LANGUAGE = 'share-ai-output-language'

export function ShareAIButton({
  articleContent: passedContent,
  prompt,
  articleSlug,
  url,
  title,
  successMessage = 'Copied! Paste in ChatGPT/Gemini 🔊',
  iconOnly = false,
}: ShareAIButtonProps) {
  const [outputLanguage, setOutputLanguage] = useState(DEFAULT_OUTPUT_LANGUAGE)
  const [editLanguage, setEditLanguage] = useState(DEFAULT_OUTPUT_LANGUAGE)
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [articleContent, setArticleContent] = useState<string | undefined>(undefined)
  const [isLoadingContent, setIsLoadingContent] = useState(false)

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

  useEffect(() => {
    if (isOpen && articleSlug && !articleContent && !isLoadingContent) {
      const fetchContent = async () => {
        setIsLoadingContent(true)
        try {
          const article = await getContentItemBySlug(articleSlug)
          if (article) {
            setArticleContent(article.content)
          } else {
            toast.error('Failed to load article content.')
          }
        } catch (error) {
          console.error('Error fetching article content:', error)
          toast.error('Error loading article content.')
        } finally {
          setIsLoadingContent(false)
        }
      }
      fetchContent()
    }
  }, [isOpen, articleSlug, articleContent, isLoadingContent])

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
  // Accepts optional content parameter to avoid race condition with async state updates
  const formatPrompt = (content?: string): string => {
    let filledPrompt = prompt

    // Replace language placeholder
    filledPrompt = filledPrompt.replace(/\{\{?\s*LANGUAGE\s*\}?\}/gi, outputLanguage)
    filledPrompt = filledPrompt.replace(/\{OUTPUT_LANGUAGE\}/g, outputLanguage)

    // Replace URL placeholder if url is provided
    if (url) {
      filledPrompt = filledPrompt.replace(/\{ARTICLE_URL\}/g, url)
    }

    // Append content if provided (for content-based sharing)
    // Use passed content parameter, falling back to state
    const contentToUse = content ?? passedContent ?? articleContent
    if (contentToUse) {
      const cleaned = cleanContent(contentToUse)
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
    let contentForPrompt = articleContent

    if (!articleContent && articleSlug) {
      setIsLoadingContent(true)
      try {
        const article = await getContentItemBySlug(articleSlug)
        if (article) {
          contentForPrompt = article.content
          setArticleContent(article.content) // Cache for future clicks
        } else {
          toast.error('Failed to load article content. Cannot share.')
          setIsLoadingContent(false)
          return
        }
      } catch (error) {
        console.error('Error fetching article content for share:', error)
        toast.error('Error loading article content for share. Cannot share.')
        setIsLoadingContent(false)
        return
      }
    }
    setIsLoadingContent(false)

    const formattedPrompt = formatPrompt(contentForPrompt)

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
      <span className="inline-flex gap-1 my-1 align-middle">
        <Button
          variant="outline"
          size="sm"
          className={iconOnly ? 'px-2' : 'gap-2'}
          disabled
          title="Read with AI"
        >
          <Sparkles className="h-4 w-4" />
          {!iconOnly && 'share'}
        </Button>
        <Button variant="ghost" size="sm" className="px-2" disabled>
          <Settings className="h-4 w-4" />
        </Button>
      </span>
    )
  }

  return (
    <span className="inline-flex gap-1 my-1 align-middle">
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="gap-2"
        title={title}
        disabled={isLoadingContent}
      >
        <>
          {isLoadingContent ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : isCopied ? (
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
    </span>
  )
}
