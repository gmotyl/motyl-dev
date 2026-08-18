import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export const CANDIDATE_GROUPS = [
  'acronyms',
  'model/version',
  'technical-name',
  'hyphenated',
] as const

export type CandidateGroup = (typeof CANDIDATE_GROUPS)[number]

export interface ArticleDocument {
  file: string
  content: string
}

export interface TtsCandidate {
  term: string
  frequency: number
  sourceFiles: string[]
}

export type CandidateInventory = Record<CandidateGroup, TtsCandidate[]>

interface ArticleParts {
  frontmatter: string
  body: string
}

const GROUP_TITLES: Record<CandidateGroup, string> = {
  acronyms: 'Acronyms',
  'model/version': 'Model/version forms',
  'technical-name': 'Technical names',
  hyphenated: 'Hyphenated terms',
}

// These names make the proposal useful for PascalCase names that are not
// acronyms. The list identifies candidates only; it does not define speech.
const TECHNICAL_NAME_HINTS = new Set([
  'Anthropic',
  'Claude',
  'DeepSeek',
  'Docker',
  'Figma',
  'Gemini',
  'GitHub',
  'GitLab',
  'Grok',
  'Kubernetes',
  'Llama',
  'Mistral',
  'Next.js',
  'Node.js',
  'Ollama',
  'OpenAI',
  'Postgres',
  'PostgreSQL',
  'Prisma',
  'Python',
  'Qwen',
  'React',
  'Rust',
  'Supabase',
  'Tailwind',
  'TypeScript',
  'Vercel',
])

function emptyInventory(): CandidateInventory {
  return {
    acronyms: [],
    'model/version': [],
    'technical-name': [],
    hyphenated: [],
  }
}

function splitFrontmatter(content: string): ArticleParts {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { frontmatter: '', body: content }

  return {
    frontmatter: match[1],
    body: content.slice(match[0].length),
  }
}

function isPolishNewsArticle(content: string): boolean {
  const { frontmatter } = splitFrontmatter(content)
  return /(?:^|[^A-Za-z0-9_])#pl(?:$|[^A-Za-z0-9_])/i.test(frontmatter)
}

function visibleMarkdown(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<https?:\/\/[^>]+>/gi, ' ')
    .replace(/https?:\/\/[^\s)\]>]+/gi, ' ')
    .replace(/`[^`\r\n]*`/g, ' ')
    .replace(/(?:^|\s)#[\p{L}\p{N}_-]+/gmu, '$1')
    .replace(/[>*_~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function addCandidate(
  groups: Map<CandidateGroup, Map<string, TtsCandidate>>,
  group: CandidateGroup,
  term: string,
  file: string
): void {
  const normalized = term.trim().replace(/[.,;:!?]+$/, '')
  if (!normalized) return

  const candidates = groups.get(group)
  if (!candidates) return

  const candidate = candidates.get(normalized)
  if (candidate) {
    candidate.frequency += 1
    if (!candidate.sourceFiles.includes(file)) candidate.sourceFiles.push(file)
    return
  }

  candidates.set(normalized, {
    term: normalized,
    frequency: 1,
    sourceFiles: [file],
  })
}

function collectCandidates(
  text: string,
  file: string,
  groups: Map<CandidateGroup, Map<string, TtsCandidate>>
): void {
  const modelVersionPattern =
    /\b([A-Za-z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)*)(\s+|-)(\d+\.\d+(?:[.-]\d+)*)\b/g
  for (const match of text.matchAll(modelVersionPattern)) {
    const separator = match[2]?.trim() === '-' ? '-' : ' '
    addCandidate(groups, 'model/version', `${match[1]}${separator}${match[3]}`, file)
  }

  const acronymPattern = /\b(?:[A-Z]{2,}[0-9]*|[A-Z]+[0-9]+)\b/g
  for (const match of text.matchAll(acronymPattern)) {
    addCandidate(groups, 'acronyms', match[0], file)
  }

  const technicalNamePattern =
    /(?<![A-Za-z0-9])(?:\.[A-Za-z][A-Za-z0-9]*|[A-Za-z][A-Za-z0-9]*(?:[.#][A-Za-z0-9]+|\+\+)?)/g
  for (const match of text.matchAll(technicalNamePattern)) {
    const term = match[0]
    const hasTechnicalShape =
      /[.#]|\+\+/.test(term) || /[a-z][A-Z]/.test(term) || TECHNICAL_NAME_HINTS.has(term)
    if (hasTechnicalShape) addCandidate(groups, 'technical-name', term, file)
  }

  const hyphenatedPattern = /\b[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\b/g
  for (const match of text.matchAll(hyphenatedPattern)) {
    const end = (match.index ?? 0) + match[0].length
    const isModelVersionPrefix =
      /^[A-Za-z][A-Za-z0-9]*-\d+$/.test(match[0]) && /^\.\d/.test(text.slice(end))
    if (!isModelVersionPrefix) {
      addCandidate(groups, 'hyphenated', match[0], file)
    }
  }
}

export function extractPolishTtsCandidates(
  documents: readonly ArticleDocument[]
): CandidateInventory {
  const groups = new Map<CandidateGroup, Map<string, TtsCandidate>>(
    CANDIDATE_GROUPS.map((group) => [group, new Map()])
  )

  for (const document of documents) {
    if (!isPolishNewsArticle(document.content)) continue
    const { body } = splitFrontmatter(document.content)
    collectCandidates(visibleMarkdown(body), document.file, groups)
  }

  return CANDIDATE_GROUPS.reduce((inventory, group) => {
    inventory[group] = [...(groups.get(group)?.values() ?? [])].sort(
      (left, right) =>
        right.frequency - left.frequency || left.term.localeCompare(right.term)
    )
    return inventory
  }, emptyInventory())
}

export function renderDictionaryProposal(inventory: CandidateInventory): string {
  const sections = CANDIDATE_GROUPS.map((group) => {
    const entries = inventory[group]
    const body = entries.length
      ? entries
          .map(
            (candidate) =>
              `- \`${candidate.term}\` — frequency: ${candidate.frequency}; source: \`${candidate.sourceFiles[0]}\``
          )
          .join('\n')
      : '_No candidates found._'

    return `## ${GROUP_TITLES[group]}\n\n${body}`
  }).join('\n\n')

  return `# Polish TTS dictionary proposal

Generated candidate inventory from Polish News Articles tagged \`#pl\`.

Pending human approval. This document proposes candidates only; it contains no production phonetic mappings.

${sections}
`
}

function walkMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return []

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) return walkMarkdownFiles(file)
    return entry.isFile() && entry.name.endsWith('.md') ? [file] : []
  })
}

function main(): void {
  const root = process.cwd()
  const newsDirectory = path.join(root, 'news')
  const documents = walkMarkdownFiles(newsDirectory).map((file) => ({
    file: path.relative(root, file).split(path.sep).join('/'),
    content: fs.readFileSync(file, 'utf8'),
  }))
  const proposal = renderDictionaryProposal(extractPolishTtsCandidates(documents))
  const outputFile = path.join(root, 'docs', 'tts', 'polish-dictionary-proposal.md')

  fs.mkdirSync(path.dirname(outputFile), { recursive: true })
  fs.writeFileSync(outputFile, proposal, 'utf8')

  const polishCount = documents.filter(({ content }) => isPolishNewsArticle(content)).length
  console.log(`Generated ${outputFile} from ${polishCount} Polish News Articles.`)
}

const entryPoint = process.argv[1]
if (entryPoint && import.meta.url === pathToFileURL(path.resolve(entryPoint)).href) {
  main()
}
