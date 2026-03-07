const CATEGORY_HASHTAGS: Record<string, string[]> = {
  frontend: ['frontend', 'css', 'html', 'animation', 'accessibility', 'uidev', 'browser', 'web-components', 'webcomponents', 'svg', 'tailwind', 'ux', 'performance', 'webdev'],
  architecture: ['architecture', 'backend', 'devops', 'infrastructure', 'cloud', 'distributed-systems', 'microservices', 'serverless', 'database', 'postgresql'],
  coding: ['react', 'typescript', 'javascript', 'nodejs', 'python', 'testing', 'nextjs', 'refactoring', 'frameworks', 'softwareengineering', 'software-engineering', 'cleancode', 'clean-code', 'programming', 'development', 'dev'],
  productivity: ['productivity', 'career', 'careeradvice', 'career-advice', 'workflow', 'automation', 'leadership', 'management', 'engineering-culture', 'dx', 'techwriting', 'technicalwriting', 'technical-writing', 'contentcreation', 'content-creation'],
  tools: ['devtools', 'vscode', 'cursor', 'ide', 'github', 'ci-cd', 'tooling', 'observability', 'monitoring', 'security'],
  ai: ['ai', 'agents', 'llm', 'claude', 'openai', 'anthropic', 'chatgpt', 'prompt-engineering', 'promptengineering', 'mcp', 'rag', 'deepseek', 'gemini', 'gpt', 'claude-code', 'claudecode', 'vibecoding', 'vibe-coding'],
}

export type ContentCategory = 'frontend' | 'architecture' | 'coding' | 'productivity' | 'tools' | 'ai' | 'general'


const IMG_BASE = 'https://img.motyl.dev'
const GENERIC_FALLBACK = `${IMG_BASE}/greg-stanczyk.jpg`

export function getContentCategory(hashtags: string[]): ContentCategory {
  const normalized = hashtags.map((h) => h.toLowerCase().replace(/^#/, ''))
  for (const [category, keywords] of Object.entries(CATEGORY_HASHTAGS)) {
    if (normalized.some((h) => keywords.includes(h))) return category as ContentCategory
  }
  return 'general'
}

export function getOgImage(article: { image?: string; hashtags: string[] }): string {
  if (article.image) return article.image
  const category = getContentCategory(article.hashtags)
  if (category !== 'general') return `${IMG_BASE}/og/categories/og-${category}.jpg`
  return GENERIC_FALLBACK
}
