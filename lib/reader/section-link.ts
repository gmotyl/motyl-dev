import { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export interface SectionLink {
  url: string
  title: string
}

/** Minimal structural view of the hast nodes this module walks. */
interface HastNode {
  type: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

/**
 * The same markdown -> hast pipeline `<MarkdownContent>` hands to react-markdown
 * (remark-parse + remark-gfm + remark-rehype). rehype-slug is left out: it only
 * adds heading ids and never touches links. Frozen once; reused per call.
 */
const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype).freeze()

/** Mirrors the inline `a` renderer's VoteButton condition in markdown-content.tsx. */
function isExternal(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}

function textOf(node: HastNode): string {
  if (node.type === 'text') return node.value ?? ''
  return (node.children ?? []).map(textOf).join('')
}

/** Depth-first, document-order search for the first external `<a>`. */
function findLink(node: HastNode): SectionLink | null {
  if (node.type === 'element' && node.tagName === 'a') {
    // react-markdown runs every href through its urlTransform before rendering.
    const href = defaultUrlTransform(String(node.properties?.href ?? ''))
    if (isExternal(href)) {
      const title = textOf(node).replace(/\s+/g, ' ').trim()
      return { url: href, title: title || href }
    }
  }
  for (const child of node.children ?? []) {
    const found = findLink(child)
    if (found) return found
  }
  return null
}

/**
 * The first external (http/https) link in a Section's markdown body, exactly as
 * the rendered page sees it: the URL is the `href` react-markdown gives the
 * inline `a` renderer (so the per-link vote state, keyed by URL, matches the
 * inline VoteButton), and the title is the link's plain text. Covers inline,
 * reference-style and GFM autolink-literal links; links inside code, images,
 * relative paths, `#anchors` and `mailto:` are skipped.
 */
export function firstExternalLink(markdown: string): SectionLink | null {
  if (!markdown) return null
  const tree = processor.runSync(processor.parse(markdown)) as unknown as HastNode
  return findLink(tree)
}
