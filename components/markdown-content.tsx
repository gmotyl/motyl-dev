'use client'

import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import * as emoji from 'node-emoji'
import { ShareAIButton } from '@/components/share-ai-button'
import { VoteButton } from '@/components/vote-button'
import { SectionPlayFromHere } from '@/components/section-play-from-here'
import { ParagraphPlayFromHere } from '@/components/paragraph-play-from-here'
import { Children, isValidElement, lazy, memo, Suspense, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Components } from 'react-markdown'
import GithubSlugger from 'github-slugger'
import { ItemType, type ItemTypeValue } from '@/lib/content/types'
import type { ContentCategory } from '@/lib/content/og'
import { stripMarkdown } from '@/lib/tts/speech'
import { cn } from '@/lib/utils'

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
  /** Section index currently being read, so its heading can be highlighted. */
  currentSectionIndex?: number | null
  /**
   * rehype-slug id of the section currently being read. Preferred over
   * currentSectionIndex for the highlight because it matches the same way the
   * working scroll does (by element id), avoiding brittle heading-text matches.
   */
  currentSectionId?: string | null
  /** Start playback from the speech unit covering this markdown line. */
  onPlayFromLine?: (line: number) => void
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

  // Line ranges [start, end) each `##` section governs, keyed by the rehype-slug
  // id of its heading. Lets a link be mapped to its enclosing section so it can
  // be highlighted in lockstep with the section heading (the bottom "Link:" of
  // the current section). A shared slugger mirrors rehype-slug's dedup so ids
  // match the rendered <h2 id>. Computed on the same string react-markdown
  // renders, so node.position line numbers line up.
  const sectionRanges = useMemo(() => {
    const slugger = new GithubSlugger()
    const lines = contentWithEmojis.split('\n')
    const ranges: { id: string; start: number; end: number }[] = []
    let inFence = false
    lines.forEach((line, i) => {
      // Toggle on both CommonMark fence styles (``` and ~~~) so a `##` line
      // inside a fenced code block is never mistaken for a section boundary.
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence
        return
      }
      if (inFence) return
      const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line)
      if (!match) return
      const id = slugger.slug(stripMarkdown(match[2]))
      if (match[1].length !== 2) return // only ## defines a reader section boundary
      if (ranges.length > 0) ranges[ranges.length - 1].end = i + 1
      ranges.push({ id, start: i + 1, end: Number.POSITIVE_INFINITY })
    })
    return ranges
  }, [contentWithEmojis])

  // The id of the `##` section that encloses a markdown node (by line), matching
  // the rendered <h2 id>. Used both to highlight the current section's link and to
  // let the reader scroll to a section's source link on Next.
  const sectionIdForNode = (node: unknown): string | null => {
    const line = (node as { position?: { start?: { line?: number } } } | undefined)?.position?.start?.line
    if (line == null) return null
    const section = sectionRanges.find((range) => line >= range.start && line < range.end)
    return section?.id ?? null
  }

  // Paragraph-granular "Play from here". Only wired when a callback is supplied,
  // otherwise paragraphs fall through to react-markdown's default <p> untouched.
  const paragraphPlayEnabled = reader?.enabled !== false && Boolean(reader?.onPlayFromLine)

  const paragraph: Components['p'] = ({ children, node, ...props }) => {
    const line = node?.position?.start?.line
    if (line == null) return <p {...props}>{children}</p>
    return (
      <ParagraphPlayFromHere line={line} onPlayFromLine={reader!.onPlayFromLine!}>
        <p {...props}>{children}</p>
      </ParagraphPlayFromHere>
    )
  }

  const components: Components = {
    ...(paragraphPlayEnabled ? { p: paragraph } : {}),
    h2: ({ children, ...props }) => {
      const heading = getHeadingText(children)
      const readerEnabled = reader?.enabled !== false && Boolean(reader?.onPlayFromHere)
      const resolvedIndex = reader?.getSectionIndex?.(heading)
      const sectionIndex = readerEnabled ? resolvedIndex : undefined
      const isCurrent =
        (reader?.currentSectionId != null && props.id === reader.currentSectionId) ||
        (sectionIndex != null && sectionIndex === reader?.currentSectionIndex)

      return (
        <>
          <h2 {...props} className={cn(props.className, isCurrent && '!text-yellow-400 bg-yellow-400/10 rounded-md px-2 -mx-2 transition-colors')}>{children}</h2>
          {readerEnabled && sectionIndex !== undefined && sectionIndex !== null && (
            <SectionPlayFromHere
              sectionIndex={sectionIndex}
              onPlayFromHere={reader!.onPlayFromHere}
            />
          )}
        </>
      )
    },
    a: ({ href, children, node, ...props }) => {
      const isExternal = href?.startsWith('http://') || href?.startsWith('https://')
      const title = typeof children === 'string' ? children : ''
      const sectionId = sectionIdForNode(node)
      const linkIsCurrent = sectionId != null && sectionId === reader?.currentSectionId
      const linkHighlight = linkIsCurrent && 'ring-2 ring-yellow-400/70 bg-yellow-400/10 rounded-md px-1 transition-colors'

      if (isExternal && summaryPrompt && isNews) {
        return (
          <span data-section-link={sectionId ?? undefined} className={cn('inline-flex items-center gap-2 not-prose', linkHighlight)}>
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

      return <a href={href} {...props} data-section-link={sectionId ?? undefined} className={cn(props.className, linkHighlight)}>{children}</a>
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
