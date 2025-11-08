'use client'

import { marked } from 'marked'
import * as emoji from 'node-emoji'
import { ShareAIButton } from '@/components/share-ai-button'
import { useEffect, useRef, useState } from 'react'

interface MarkdownContentProps {
  content: string
}

// Configure marked for better markdown rendering
marked.setOptions({
  gfm: true,
  breaks: true,
})

export function MarkdownContent({ content }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [summaryPrompt, setSummaryPrompt] = useState<string>('')

  // Fetch TRANSLATE_PROMPT.md on mount
  useEffect(() => {
    fetch('/TRANSLATE_PROMPT.md')
      .then((res) => res.text())
      .then((text) => setSummaryPrompt(text))
      .catch((err) => console.error('Failed to load TRANSLATE_PROMPT.md:', err))
  }, [])

  // TEMPORARILY DISABLED FOR EDGE READ ALOUD COMPATIBILITY TESTING
  // This dynamic DOM manipulation breaks Edge's Read Aloud feature
  // TODO: Re-enable with a user-controlled option or find alternative solution
  /*
  useEffect(() => {
    if (!containerRef.current || !summaryPrompt) return

    // EDGE READ ALOUD COMPATIBILITY FIX:
    // Delay button injection to avoid breaking Edge's Read Aloud feature
    // Edge Read Aloud scans the page on activation and any DOM changes after
    // that cause it to stop working. By delaying 5 seconds, we give users
    // time to activate Read Aloud before we modify the DOM.
    const timeoutId = setTimeout(() => {
      if (!containerRef.current) return

      // Find all links and add share buttons
      const links = containerRef.current.querySelectorAll('a[href]')

      links.forEach((link) => {
        const href = link.getAttribute('href')
        const title = link.textContent || ''

        // Only add share button for external links (http/https)
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
          // Check if share button already exists
          const existingButton = link.parentElement?.querySelector('[data-share-link-button]')
          if (existingButton) return

          // Create a wrapper div for the share button (block element, below link)
          const buttonWrapper = document.createElement('div')
          buttonWrapper.setAttribute('data-share-link-button', 'true')
          buttonWrapper.className = 'block my-2'

          // Insert the wrapper after the link's parent paragraph/element
          const parentElement = link.closest('p') || link.parentElement
          if (parentElement && parentElement.parentNode) {
            parentElement.parentNode.insertBefore(buttonWrapper, parentElement.nextSibling)

            // Create and mount the React component
            const root = document.createElement('div')
            buttonWrapper.appendChild(root)

            // Use a dynamic import to render the React component
            import('react-dom/client').then(({ createRoot }) => {
              const reactRoot = createRoot(root)
              reactRoot.render(
                <ShareAIButton
                  prompt={summaryPrompt}
                  url={href}
                  title={title}
                  buttonLabel="Copy for AI"
                  shareTitle="Summarize linked article with AI"
                  successMessage="Copied! Paste in ChatGPT/Gemini to fetch and summarize this link 🔊"
                />
              )
            })
          }
        }
      })
    }, 5000) // 5 second delay

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId)
  }, [content, summaryPrompt])
  */

  // First, process emoji shortcodes like :rocket: -> 🚀
  const contentWithEmojis = emoji.emojify(content)

  // Then process markdown
  const htmlContent = marked.parse(contentWithEmojis)

  // Handle both sync and async cases
  if (typeof htmlContent === 'string') {
    return (
      <div
        ref={containerRef}
        className="prose prose-lg prose-invert max-w-none
                   prose-headings:text-white prose-headings:font-bold
                   prose-p:text-gray-300 prose-p:leading-relaxed
                   prose-strong:text-white prose-strong:font-semibold
                   prose-code:text-purple-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
                   prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700
                   prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-300
                   prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
                   prose-ul:text-gray-300 prose-ol:text-gray-300
                   prose-li:text-gray-300"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    )
  }

  // Fallback for async case
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <p className="text-gray-300">Loading content...</p>
    </div>
  )
}
