'use client'

import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import * as emoji from 'node-emoji'
import { ShareAIButton } from '@/components/share-ai-button'
import { useEffect, useState } from 'react'
import type { Components } from 'react-markdown'
import { ItemType, type ItemTypeValue } from '@/lib/types'

interface MarkdownContentProps {
  content: string
  itemType?: ItemTypeValue
}

export function MarkdownContent({ content, itemType }: MarkdownContentProps) {
  const isNews = itemType === ItemType.News
  const [summaryPrompt, setSummaryPrompt] = useState<string>('')

  // Fetch TRANSLATE_PROMPT.md on mount
  useEffect(() => {
    fetch('/TRANSLATE_PROMPT.md')
      .then((res) => res.text())
      .then((text) => setSummaryPrompt(text))
      .catch((err) => console.error('Failed to load TRANSLATE_PROMPT.md:', err))
  }, [])

  // Process emojis
  const contentWithEmojis = emoji.emojify(content)

  const components: Components = {
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http://') || href?.startsWith('https://')
      const title = typeof children === 'string' ? children : ''

      if (isExternal && summaryPrompt && isNews) {
        return (
          <>
            <a href={href} {...props} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
            {' '}
            <ShareAIButton
              prompt={summaryPrompt}
              url={href}
              title={title}
              buttonLabel="Copy for AI"
              shareTitle="Summarize linked article with AI"
              successMessage="Copied! Paste in ChatGPT/Gemini to fetch and summarize this link 🔊"
              iconOnly={true}
            />
          </>
        )
      }

      return <a href={href} {...props}>{children}</a>
    }
  }

  return (
    <div className="prose prose-lg prose-invert max-w-none
                   prose-headings:text-white prose-headings:font-bold
                   prose-p:text-gray-300 prose-p:leading-relaxed
                   prose-strong:text-white prose-strong:font-semibold
                   prose-code:text-purple-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
                   prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700
                   prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-300
                   prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
                   prose-ul:text-gray-300 prose-ol:text-gray-300
                   prose-li:text-gray-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {contentWithEmojis}
      </ReactMarkdown>
    </div>
  )
}
