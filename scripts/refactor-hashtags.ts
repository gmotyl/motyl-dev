/**
 * Hashtag Refactoring Script
 *
 * Unifies and merges hashtags across news articles.
 * Only modifies news articles in /news/{year}/*.md, never touches /articles/*.md
 *
 * Usage:
 *   pnpm tsx scripts/refactor-hashtags.ts --plan     # Generate mapping file for review
 *   pnpm tsx scripts/refactor-hashtags.ts --preview  # Preview changes (dry run)
 *   pnpm tsx scripts/refactor-hashtags.ts --apply    # Apply changes
 *
 * Run with: tsx scripts/refactor-hashtags.ts [--plan|--preview|--apply]
 */

import path from 'node:path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import yaml from 'js-yaml'

// --- Types ---

interface HashtagMapping {
  from: string
  to: string
  reason: 'case' | 'merge' | 'hyphen' | 'consolidation'
  count: number
}

interface MappingConfig {
  version: number
  generatedAt: string
  totalMappings: number
  affectedArticles: number
  mappings: HashtagMapping[]
}

interface ArticleData {
  filePath: string
  slug: string
  frontmatter: Record<string, unknown>
  body: string
  hashtags: string[]
}

interface ArticleChange {
  filePath: string
  slug: string
  originalHashtags: string[]
  newHashtags: string[]
  changes: Array<{ from: string; to: string }>
}

interface RefactorPlan {
  timestamp: string
  mappingFile: string
  articlesToModify: ArticleChange[]
  summary: {
    totalArticles: number
    totalChanges: number
    hashtagsBefore: number
    hashtagsAfter: number
  }
}

interface HashtagStats {
  generatedAt: string
  totalHashtags: number
  frequency: Record<string, number>
}

// --- Constants ---

const ROOT_DIR = process.cwd()
const NEWS_DIR = path.join(ROOT_DIR, 'news')
const DATA_DIR = path.join(ROOT_DIR, 'data')
const BACKUPS_DIR = path.join(ROOT_DIR, 'backups')
const MAPPING_FILE = path.join(DATA_DIR, 'hashtag-mapping.yaml')
const STATS_FILE = path.join(DATA_DIR, 'hashtag-stats.json')

const matterOptions = {
  engines: {
    yaml: (s: string) => yaml.load(s) as object,
  },
}

// --- Predefined Merge Rules ---

const PREDEFINED_MERGES: Array<{ from: string; to: string; reason: HashtagMapping['reason'] }> = [
  // Case normalizations
  { from: 'AI', to: 'ai', reason: 'case' },
  { from: 'LLM', to: 'llm', reason: 'case' },
  { from: 'MCP', to: 'mcp', reason: 'case' },
  { from: 'UI', to: 'ui', reason: 'case' },
  { from: 'Productivity', to: 'productivity', reason: 'case' },
  { from: 'Workflow', to: 'workflow', reason: 'case' },
  { from: 'Gemini', to: 'gemini', reason: 'case' },
  { from: 'OpenAI', to: 'openai', reason: 'case' },
  { from: 'ChatGPT', to: 'chatgpt', reason: 'case' },
  { from: 'Anthropic', to: 'anthropic', reason: 'case' },
  { from: 'Automation', to: 'automation', reason: 'case' },
  { from: 'VibeCoding', to: 'vibe-coding', reason: 'case' },
  { from: 'NestJS', to: 'nestjs', reason: 'case' },
  { from: 'Nodejs', to: 'nodejs', reason: 'case' },
  { from: 'Vite', to: 'vite', reason: 'case' },
  { from: 'Robotics', to: 'robotics', reason: 'case' },
  { from: 'ContentCreation', to: 'content-creation', reason: 'case' },
  { from: 'TechnicalWriting', to: 'documentation', reason: 'case' },
  { from: 'TechWriting', to: 'documentation', reason: 'case' },

  // Hyphenation fixes
  { from: 'opensource', to: 'open-source', reason: 'hyphen' },
  { from: 'contentcreation', to: 'content-creation', reason: 'hyphen' },
  { from: 'reactnative', to: 'react-native', reason: 'hyphen' },
  { from: 'futureofwork', to: 'future-of-work', reason: 'hyphen' },
  { from: 'promptengineering', to: 'prompt-engineering', reason: 'hyphen' },
  { from: 'servercomponents', to: 'server-components', reason: 'hyphen' },
  { from: 'tailwindcss', to: 'tailwind', reason: 'hyphen' },
  { from: 'systemdesign', to: 'architecture', reason: 'hyphen' },
  { from: 'softwareengineering', to: 'engineering', reason: 'hyphen' },
  { from: 'productmanagement', to: 'product', reason: 'hyphen' },
  { from: 'machinelearning', to: 'ml', reason: 'hyphen' },
  { from: 'generativeai', to: 'ai', reason: 'hyphen' },

  // Productivity consolidation
  { from: 'developer-productivity', to: 'productivity', reason: 'consolidation' },
  { from: 'team-productivity', to: 'productivity', reason: 'consolidation' },
  { from: 'employee-productivity', to: 'productivity', reason: 'consolidation' },

  // Performance consolidation
  { from: 'web-performance', to: 'performance', reason: 'consolidation' },
  { from: 'core-web-vitals', to: 'performance', reason: 'consolidation' },
  { from: 'web-vitals', to: 'performance', reason: 'consolidation' },

  // Architecture consolidation
  { from: 'software-architecture', to: 'architecture', reason: 'consolidation' },
  { from: 'system-design', to: 'architecture', reason: 'consolidation' },
  { from: 'clean-architecture', to: 'architecture', reason: 'consolidation' },

  // Engineering consolidation
  { from: 'software-engineering', to: 'engineering', reason: 'consolidation' },
  { from: 'ai-engineering', to: 'engineering', reason: 'consolidation' },

  // Management consolidation
  { from: 'engineering-management', to: 'management', reason: 'consolidation' },
  { from: 'project-management', to: 'management', reason: 'consolidation' },
  { from: 'team-management', to: 'management', reason: 'consolidation' },
  { from: 'product-management', to: 'management', reason: 'consolidation' },

  // Leadership consolidation
  { from: 'engineering-leadership', to: 'leadership', reason: 'consolidation' },
  { from: 'team-leadership', to: 'leadership', reason: 'consolidation' },

  // Teams consolidation
  { from: 'team-collaboration', to: 'teams', reason: 'consolidation' },
  { from: 'team-development', to: 'teams', reason: 'consolidation' },

  // DX consolidation
  { from: 'developer-experience', to: 'dx', reason: 'consolidation' },
  { from: 'devex', to: 'dx', reason: 'consolidation' },

  // DevTools consolidation
  { from: 'developer-tools', to: 'devtools', reason: 'consolidation' },
  { from: 'dev-tools', to: 'devtools', reason: 'consolidation' },

  // Agents consolidation
  { from: 'ai-agents', to: 'agents', reason: 'consolidation' },
  { from: 'coding-agents', to: 'agents', reason: 'consolidation' },
  { from: 'agentic-ai', to: 'agents', reason: 'consolidation' },
  { from: 'agentic', to: 'agents', reason: 'consolidation' },
  { from: 'agentic-loops', to: 'agents', reason: 'consolidation' },
  { from: 'agent', to: 'agents', reason: 'consolidation' },
  { from: 'agent-patterns', to: 'agents', reason: 'consolidation' },
  { from: 'agentengineering', to: 'agents', reason: 'consolidation' },

  // ML consolidation
  { from: 'machine-learning', to: 'ml', reason: 'consolidation' },
  { from: 'deep-learning', to: 'ml', reason: 'consolidation' },
  { from: 'neural-networks', to: 'ml', reason: 'consolidation' },
  { from: 'reinforcement-learning', to: 'ml', reason: 'consolidation' },

  // AI consolidation
  { from: 'generative-ai', to: 'ai', reason: 'consolidation' },

  // Prompt-engineering consolidation
  { from: 'prompting', to: 'prompt-engineering', reason: 'consolidation' },

  // Server-components consolidation
  { from: 'react-server-components', to: 'server-components', reason: 'consolidation' },
  { from: 'rsc', to: 'server-components', reason: 'consolidation' },

  // Career consolidation
  { from: 'professional-development', to: 'career', reason: 'consolidation' },
  { from: 'personal-growth', to: 'career', reason: 'consolidation' },

  // Product consolidation
  { from: 'product-engineering', to: 'product', reason: 'consolidation' },

  // Accessibility consolidation
  { from: 'a11y', to: 'accessibility', reason: 'consolidation' },

  // Technical debt consolidation
  { from: 'technical-debt', to: 'refactoring', reason: 'consolidation' },
  { from: 'technicaldebt', to: 'refactoring', reason: 'consolidation' },
  { from: 'techdebt', to: 'refactoring', reason: 'consolidation' },

  // Database consolidation
  { from: 'databases', to: 'database', reason: 'consolidation' },
  { from: 'database-design', to: 'database', reason: 'consolidation' },

  // Animation consolidation
  { from: 'animations', to: 'animation', reason: 'consolidation' },
  { from: 'scroll-driven-animations', to: 'animation', reason: 'consolidation' },
  { from: 'scroll-animations', to: 'animation', reason: 'consolidation' },

  // Startup consolidation
  { from: 'startups', to: 'startup', reason: 'consolidation' },

  // Workflow consolidation
  { from: 'workflows', to: 'workflow', reason: 'consolidation' },
  { from: 'workflow-optimization', to: 'workflow', reason: 'consolidation' },

  // Gemini consolidation
  { from: 'google-gemini', to: 'gemini', reason: 'consolidation' },

  // Browser consolidation
  { from: 'browsers', to: 'browser', reason: 'consolidation' },
  { from: 'browser-compatibility', to: 'browser', reason: 'consolidation' },
  { from: 'browser-apis', to: 'browser', reason: 'consolidation' },
  { from: 'browser-engine', to: 'browser', reason: 'consolidation' },

  // Other merges
  { from: 'tanstack-query', to: 'react-query', reason: 'merge' },
  { from: 'uidev', to: 'ui', reason: 'merge' },
]

// Newsletter source tags - these are always the FIRST hashtag and should be preserved
// The script automatically skips the first hashtag in each article

// --- Utility Functions ---

function parseHashtags(hashtagData: unknown): string[] {
  if (!hashtagData) return []
  if (Array.isArray(hashtagData)) {
    return hashtagData.map((tag) => tag.toString().replace(/^#/, ''))
  }
  if (typeof hashtagData === 'string') {
    return hashtagData
      .split(/\s+/)
      .filter((tag) => tag.startsWith('#'))
      .map((tag) => tag.substring(1))
      .filter((tag) => tag.length > 0)
  }
  return []
}

function formatHashtagsForFrontmatter(hashtags: string[]): string {
  return hashtags.map((t) => `#${t}`).join(' ')
}

// --- Core Functions ---

async function loadHashtagStats(): Promise<HashtagStats> {
  const content = await fs.readFile(STATS_FILE, 'utf8')
  return JSON.parse(content)
}

async function getNewsYearDirectories(): Promise<string[]> {
  try {
    const entries = await fs.readdir(NEWS_DIR, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name))
      .map((entry) => path.join(NEWS_DIR, entry.name))
  } catch {
    console.error('Error finding news year directories')
    return []
  }
}

async function loadNewsArticles(): Promise<Map<string, ArticleData>> {
  const articles = new Map<string, ArticleData>()
  const yearDirs = await getNewsYearDirectories()

  for (const yearDir of yearDirs) {
    const files = await fs.readdir(yearDir)
    for (const file of files.filter((f) => f.endsWith('.md'))) {
      const filePath = path.join(yearDir, file)
      const content = await fs.readFile(filePath, 'utf8')
      const { data, content: body } = matter(content, matterOptions)

      articles.set(filePath, {
        filePath,
        slug: data.slug || file.replace(/\.md$/, ''),
        frontmatter: data,
        body,
        hashtags: parseHashtags(data.hashtags),
      })
    }
  }

  return articles
}

function buildMappingsWithCounts(stats: HashtagStats): HashtagMapping[] {
  const mappings: HashtagMapping[] = []

  for (const rule of PREDEFINED_MERGES) {
    const count = stats.frequency[rule.from] || 0
    if (count > 0) {
      mappings.push({
        from: rule.from,
        to: rule.to,
        reason: rule.reason,
        count,
      })
    }
  }

  return mappings.sort((a, b) => b.count - a.count)
}

async function generateMappingFile(mappings: HashtagMapping[]): Promise<void> {
  const affectedTags = new Set<string>()
  for (const m of mappings) {
    affectedTags.add(m.from)
  }

  const config: MappingConfig = {
    version: 1,
    generatedAt: new Date().toISOString(),
    totalMappings: mappings.length,
    affectedArticles: 0, // Will be calculated during preview
    mappings,
  }

  const yamlContent = `# Hashtag Refactoring Mapping
# Generated: ${config.generatedAt}
#
# Review this file before running --apply
# Remove or comment out lines you don't want to apply
#
# Format:
#   - from: original hashtag
#     to: target hashtag
#     reason: case | hyphen | merge | consolidation
#     count: number of occurrences

${yaml.dump(config, { lineWidth: 120, quotingType: '"' })}`

  await fs.writeFile(MAPPING_FILE, yamlContent, 'utf8')
}

async function loadMappingFile(): Promise<MappingConfig> {
  const content = await fs.readFile(MAPPING_FILE, 'utf8')
  return yaml.load(content) as MappingConfig
}

function planRefactoring(
  articles: Map<string, ArticleData>,
  mappings: HashtagMapping[]
): RefactorPlan {
  const mappingLookup = new Map(mappings.map((m) => [m.from, m.to]))
  const articlesToModify: ArticleChange[] = []
  const allOriginalTags = new Set<string>()
  const allNewTags = new Set<string>()

  for (const [, article] of articles) {
    const changes: Array<{ from: string; to: string }> = []
    const newHashtags: string[] = []

    for (let i = 0; i < article.hashtags.length; i++) {
      const tag = article.hashtags[i]
      allOriginalTags.add(tag)

      // Skip the FIRST hashtag (index 0) - it's the newsletter source identifier
      if (i === 0) {
        newHashtags.push(tag)
        allNewTags.add(tag)
        continue
      }

      if (mappingLookup.has(tag)) {
        const newTag = mappingLookup.get(tag)!
        changes.push({ from: tag, to: newTag })
        if (!newHashtags.includes(newTag)) {
          newHashtags.push(newTag)
          allNewTags.add(newTag)
        }
      } else {
        if (!newHashtags.includes(tag)) {
          newHashtags.push(tag)
          allNewTags.add(tag)
        }
      }
    }

    if (changes.length > 0) {
      articlesToModify.push({
        filePath: article.filePath,
        slug: article.slug,
        originalHashtags: article.hashtags,
        newHashtags,
        changes,
      })
    }
  }

  return {
    timestamp: new Date().toISOString(),
    mappingFile: MAPPING_FILE,
    articlesToModify,
    summary: {
      totalArticles: articlesToModify.length,
      totalChanges: articlesToModify.reduce((sum, a) => sum + a.changes.length, 0),
      hashtagsBefore: allOriginalTags.size,
      hashtagsAfter: allNewTags.size,
    },
  }
}

async function createBackup(plan: RefactorPlan): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = path.join(BACKUPS_DIR, `hashtag-refactor-${timestamp}`)

  await fs.mkdir(path.join(backupDir, 'news'), { recursive: true })
  await fs.mkdir(path.join(backupDir, 'data'), { recursive: true })

  // Backup affected markdown files
  for (const article of plan.articlesToModify) {
    const relativePath = path.relative(ROOT_DIR, article.filePath)
    const backupPath = path.join(backupDir, relativePath)
    await fs.mkdir(path.dirname(backupPath), { recursive: true })
    await fs.copyFile(article.filePath, backupPath)
  }

  // Backup data files
  await fs.copyFile(
    path.join(DATA_DIR, 'content-cache.json'),
    path.join(backupDir, 'data', 'content-cache.json')
  )
  await fs.copyFile(STATS_FILE, path.join(backupDir, 'data', 'hashtag-stats.json'))

  return backupDir
}

async function applyChanges(
  articles: Map<string, ArticleData>,
  plan: RefactorPlan,
  dryRun: boolean
): Promise<void> {
  for (const articleChange of plan.articlesToModify) {
    const article = articles.get(articleChange.filePath)
    if (!article) continue

    // Read original file content
    const originalContent = await fs.readFile(articleChange.filePath, 'utf8')

    // Find the hashtags line in frontmatter and replace it
    // Original format is: hashtags: "#tag1 #tag2 #tag3"
    const newHashtagsStr = formatHashtagsForFrontmatter(articleChange.newHashtags)

    // Replace the hashtags line using regex
    const hashtagRegex = /^hashtags:\s*["']?#[^"'\n]+["']?\s*$/m
    let newContent: string

    if (hashtagRegex.test(originalContent)) {
      newContent = originalContent.replace(hashtagRegex, `hashtags: "${newHashtagsStr}"`)
    } else {
      // Handle array format or other edge cases - fall back to full rewrite
      const { data, content: body } = matter(originalContent, matterOptions)
      data.hashtags = newHashtagsStr
      // Manual stringify to avoid js-yaml safeDump issue
      const frontmatterYaml = yaml.dump(data, { lineWidth: -1, quotingType: '"' })
      newContent = `---\n${frontmatterYaml}---\n${body}`
    }

    if (dryRun) {
      console.log(`[DRY RUN] Would update: ${articleChange.filePath}`)
      console.log(`  Before: ${articleChange.originalHashtags.join(', ')}`)
      console.log(`  After:  ${articleChange.newHashtags.join(', ')}`)
      console.log()
    } else {
      await fs.writeFile(articleChange.filePath, newContent, 'utf8')
    }
  }
}

async function regenerateCache(): Promise<void> {
  const { execSync } = await import('child_process')
  console.log('\nRegenerating content cache...')
  execSync('pnpm prebuild', { cwd: ROOT_DIR, stdio: 'inherit' })
}

function printHashtagReport(stats: HashtagStats): void {
  console.log('\n=== Updated Hashtag List for PROMPT.md ===\n')
  console.log('Top 50 hashtags by frequency:')

  const sorted = Object.entries(stats.frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)

  for (const [tag, count] of sorted) {
    console.log(`  #${tag}: ${count}`)
  }

  console.log('\nTotal unique hashtags:', stats.totalHashtags)
}

// --- Main Commands ---

async function runPlanMode(): Promise<void> {
  console.log('Hashtag Refactoring Script - Plan Mode')
  console.log('======================================\n')

  console.log('Loading hashtag statistics...')
  const stats = await loadHashtagStats()
  console.log(`  Found ${stats.totalHashtags} unique hashtags\n`)

  console.log('Building mapping from predefined rules...')
  const mappings = buildMappingsWithCounts(stats)
  console.log(`  ${mappings.length} mappings found (tags that exist in current data)\n`)

  console.log('Generating mapping file...')
  await generateMappingFile(mappings)
  console.log(`  Written to: ${MAPPING_FILE}\n`)

  // Show summary by reason
  const byReason = new Map<string, number>()
  for (const m of mappings) {
    byReason.set(m.reason, (byReason.get(m.reason) || 0) + 1)
  }

  console.log('Mappings by type:')
  for (const [reason, count] of byReason) {
    console.log(`  ${reason}: ${count}`)
  }

  console.log('\nTop 10 mappings by occurrence count:')
  for (const m of mappings.slice(0, 10)) {
    console.log(`  ${m.from} → ${m.to} (${m.count} occurrences)`)
  }

  console.log('\nNext steps:')
  console.log('  1. Review and edit: data/hashtag-mapping.yaml')
  console.log('  2. Preview changes: pnpm tsx scripts/refactor-hashtags.ts --preview')
  console.log('  3. Apply changes:   pnpm tsx scripts/refactor-hashtags.ts --apply')
}

async function runPreviewMode(): Promise<void> {
  console.log('Hashtag Refactoring Script - Preview Mode')
  console.log('=========================================\n')

  console.log('Loading mapping file...')
  const config = await loadMappingFile()
  console.log(`  ${config.mappings.length} mappings loaded\n`)

  console.log('Loading news articles...')
  const articles = await loadNewsArticles()
  console.log(`  ${articles.size} news articles found\n`)

  console.log('Building refactoring plan...')
  const plan = planRefactoring(articles, config.mappings)

  console.log('\n=== Preview Summary ===\n')
  console.log(`Articles to modify: ${plan.summary.totalArticles}`)
  console.log(`Total hashtag changes: ${plan.summary.totalChanges}`)
  console.log(`Unique hashtags before: ${plan.summary.hashtagsBefore}`)
  console.log(`Unique hashtags after: ${plan.summary.hashtagsAfter}`)
  console.log(`Reduction: ${plan.summary.hashtagsBefore - plan.summary.hashtagsAfter} hashtags`)

  console.log('\n=== Sample Changes (first 10) ===\n')
  for (const article of plan.articlesToModify.slice(0, 10)) {
    const relativePath = path.relative(ROOT_DIR, article.filePath)
    console.log(`${relativePath}:`)
    for (const change of article.changes) {
      console.log(`  ${change.from} → ${change.to}`)
    }
    console.log()
  }

  if (plan.articlesToModify.length > 10) {
    console.log(`... and ${plan.articlesToModify.length - 10} more articles\n`)
  }

  console.log('To apply these changes, run:')
  console.log('  pnpm tsx scripts/refactor-hashtags.ts --apply')
}

async function runApplyMode(): Promise<void> {
  console.log('Hashtag Refactoring Script - Apply Mode')
  console.log('=======================================\n')

  console.log('Loading mapping file...')
  const config = await loadMappingFile()
  console.log(`  ${config.mappings.length} mappings loaded\n`)

  console.log('Loading news articles...')
  const articles = await loadNewsArticles()
  console.log(`  ${articles.size} news articles found\n`)

  console.log('Building refactoring plan...')
  const plan = planRefactoring(articles, config.mappings)

  console.log(`\nArticles to modify: ${plan.summary.totalArticles}`)
  console.log(`Total changes: ${plan.summary.totalChanges}\n`)

  if (plan.articlesToModify.length === 0) {
    console.log('No changes to apply.')
    return
  }

  console.log('Creating backup...')
  const backupDir = await createBackup(plan)
  console.log(`  Backup saved to: ${backupDir}\n`)

  console.log('Applying changes...')
  let count = 0
  for (const article of plan.articlesToModify) {
    count++
    const relativePath = path.relative(ROOT_DIR, article.filePath)
    process.stdout.write(`\r  [${count}/${plan.articlesToModify.length}] ${relativePath}`)
  }
  await applyChanges(articles, plan, false)
  console.log('\n')

  await regenerateCache()

  // Reload stats and show report
  const newStats = await loadHashtagStats()

  console.log('\n=== Refactoring Complete ===\n')
  console.log(`Articles modified: ${plan.summary.totalArticles}`)
  console.log(`Hashtag changes: ${plan.summary.totalChanges}`)
  console.log(`Unique hashtags before: ${plan.summary.hashtagsBefore}`)
  console.log(`Unique hashtags after: ${newStats.totalHashtags}`)

  printHashtagReport(newStats)
}

// --- Entry Point ---

async function main(): Promise<void> {
  const args = process.argv.slice(2)

  if (args.includes('--plan')) {
    await runPlanMode()
  } else if (args.includes('--preview')) {
    await runPreviewMode()
  } else if (args.includes('--apply')) {
    await runApplyMode()
  } else {
    console.log('Hashtag Refactoring Script')
    console.log('==========================')
    console.log('')
    console.log('Usage:')
    console.log('  pnpm tsx scripts/refactor-hashtags.ts --plan     Generate mapping file')
    console.log('  pnpm tsx scripts/refactor-hashtags.ts --preview  Preview changes')
    console.log('  pnpm tsx scripts/refactor-hashtags.ts --apply    Apply changes')
    console.log('')
    console.log('Workflow:')
    console.log('  1. Run --plan to generate data/hashtag-mapping.yaml')
    console.log('  2. Review and edit the mapping file')
    console.log('  3. Run --preview to see what will change')
    console.log('  4. Run --apply to execute the refactoring')
  }
}

main().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
