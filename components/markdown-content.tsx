'use client'

import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import * as emoji from 'node-emoji'
import { ShareAIButton } from '@/components/share-ai-button'
import { VoteButton } from '@/components/vote-button'
import { SectionPlayFromHere } from '@/components/section-play-from-here'
import { Children, isValidElement, lazy, memo, Suspense, useEffect, useState, type ReactNode } from 'react'
import type { Components } from 'react-markdown'
import { ItemType, type ItemTypeValue } from '@/lib/types'
import type { ContentCategory } from '@/lib/og'

const MermaidDiagram = lazy(() => import('@/components/mermaid-diagram').then(m => ({ default: m.MermaidDiagram })))

interface MarkdownContentProps {
  content: string
  itemType?: ItemTypeValue
  category?: ContentCategory
  patternName?: string
  reader?: MarkdownReaderOptions
}

export interface MarkdownReaderOptions {
  enabled?: boolean
  onPlayFromHere: (sectionIndex: number) => void
  getSectionIndex?: (heading: string) => number | null | undefined
}

function getHeadingText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child)
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return getHeadingText(child.props.children)
      }
      return ''
    })
    .join('')
    .trim()
}

// Memoized so the host reader component's ~60fps progress ticks (which re-render
// the article subtree) do not re-render react-markdown + the SectionPlayFromHere
// buttons. Callers must pass a referentially stable `reader` prop (see call sites)
// for this to take effect. memo only blocks re-render from unchanged parent props,
// so the internal summaryPrompt state/effect below still works normally.
export const MarkdownContent = memo(function MarkdownContent({ content, itemType, category, patternName, reader }: MarkdownContentProps) {
  const isNews = itemType === ItemType.News
  const [summaryPrompt, setSummaryPrompt] = useState<string>('')

  // Fetch TRANSLATE_PROMPT.md on mount
  useEffect(() => {
    fetch('/TRANSLATE_PROMPT.md')
      .then((res) => res.text())
      .then((text) => setSummaryPrompt(text))
      .catch((err) => console.error('Failed to load TRANSLATE_PROMPT.md:', err))
  }, [])

  // Strip "**Link:**" labels (redundant with inline vote buttons)
  const contentCleaned = content.replace(/\*\*Link:\*\*\s*/g, '')

  // Process emojis
  const contentWithEmojis = emoji.emojify(contentCleaned)

  const components: Components = {
    h2: ({ children, ...props }) => {
      const heading = getHeadingText(children)
      const readerEnabled = reader?.enabled !== false && Boolean(reader?.onPlayFromHere)
      const resolvedIndex = reader?.getSectionIndex?.(heading)
      const sectionIndex = readerEnabled ? resolvedIndex : undefined

      return (
        <>
          <h2 {...props}>{children}</h2>
          {readerEnabled && sectionIndex !== undefined && sectionIndex !== null && (
            <SectionPlayFromHere
              sectionIndex={sectionIndex}
              onPlayFromHere={reader!.onPlayFromHere}
            />
          )}
        </>
      )
    },
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http://') || href?.startsWith('https://')
      const title = typeof children === 'string' ? children : ''

      if (isExternal && summaryPrompt && isNews) {
        return (
          <span className="inline-flex items-center gap-2 not-prose">
            <VoteButton
              linkUrl={href!}
              title={title}
              category={category}
              sourceDomain={href!}
              initialVoteCount={0}
              patternName={patternName}
            />
            <a href={href} {...props} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
            <ShareAIButton
              prompt={summaryPrompt}
              url={href}
              title={title}
              buttonLabel="Copy for AI"
              shareTitle="Summarize linked article with AI"
              successMessage="Copied! Paste in ChatGPT/Gemini to fetch and summarize this link 🔊"
              iconOnly={true}
            />
          </span>
        )
      }

      return <a href={href} {...props}>{children}</a>
    },
    code: ({ className, children, ...props }) => {
      if (/language-mermaid/.test(className || '')) {
        const chart = String(children).replace(/\n$/, '')
        return (
          <span data-mermaid-diagram="">
            <Suspense fallback={<div className="animate-pulse rounded bg-gray-800 p-8 text-center text-gray-500">Loading diagram...</div>}>
              <MermaidDiagram chart={chart} />
            </Suspense>
          </span>
        )
      }
      return <code className={className} {...props}>{children}</code>
    },
    pre: ({ children, ...props }) => {
      const child = (Array.isArray(children) ? children[0] : children) as any
      if (child?.props?.['data-mermaid-diagram'] !== undefined) return <>{children}</>
      return <pre {...props}>{children}</pre>
    },
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
})
