import { spawn } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { runAllAssertions } from './assertions.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MOTYL_DEV = path.resolve(__dirname, '..')
const NEWSLETTER_AI = path.resolve(MOTYL_DEV, '../newsletter-ai')
const OUTPUT_DIR = path.join(__dirname, '.output')
const OPENCODE_CONFIG = path.join(MOTYL_DEV, 'opencode.json')
const OPENCODE_CONFIG_BACKUP = path.join(OUTPUT_DIR, 'opencode.json.backup')

interface FixtureEnv {
  slug: string
  callLog: string
}

function fixtureEnv({ slug, callLog }: FixtureEnv) {
  return {
    PROJECT_DIR: NEWSLETTER_AI,
    OUTPUT_PATH: OUTPUT_DIR,
    OUTPUT_SLUG: slug,
    FIXTURE_MODE: '1',
    FIXTURE_CALL_LOG: callLog,
    NARRATOR_PERSONA: 'Sherlock Holmes',
  }
}

// Claude reads --mcp-config inline, so we hand it this shape on the CLI.
function buildClaudeMcpConfig(env: FixtureEnv) {
  return {
    mcpServers: {
      'newsletter-ai': {
        command: path.join(NEWSLETTER_AI, 'node_modules/.bin/tsx'),
        args: [path.join(NEWSLETTER_AI, 'src/mcp/index.ts')],
        cwd: NEWSLETTER_AI,
        env: fixtureEnv(env),
      },
    },
  }
}

// OpenCode has no --mcp-config flag; it reads opencode.json from cwd. We
// write one for the duration of the eval and restore any prior content.
function buildOpencodeConfig(env: FixtureEnv) {
  return {
    $schema: 'https://opencode.ai/config.json',
    mcp: {
      'newsletter-ai': {
        type: 'local',
        command: [
          path.join(NEWSLETTER_AI, 'node_modules/.bin/tsx'),
          path.join(NEWSLETTER_AI, 'src/mcp/index.ts'),
        ],
        environment: fixtureEnv(env),
      },
    },
  }
}

interface ToolCall {
  name: string
  args: Record<string, unknown>
  timestamp: number
}

async function readCallLog(logPath: string): Promise<ToolCall[]> {
  try {
    const raw = await fs.readFile(logPath, 'utf-8')
    return raw
      .split('\n')
      .filter((l) => l.trim())
      .map((l) => JSON.parse(l) as ToolCall)
  } catch {
    return []
  }
}

function assertSafeModeHonored(
  calls: ToolCall[],
  toolName: string
): { pass: boolean; message: string } {
  const matches = calls.filter((c) => c.name === toolName)
  if (matches.length === 0) {
    return { pass: false, message: `${toolName} was never called` }
  }
  const honored = matches.every((c) => c.args.safeMode === true)
  return honored
    ? { pass: true, message: '' }
    : {
        pass: false,
        message: `${toolName} called without safeMode=true (saw ${JSON.stringify(matches.map((c) => c.args.safeMode))})`,
      }
}

type Runtime = 'claude' | 'opencode'
type ArgsBuilder = (env: FixtureEnv) => string[]

const claudeArgs =
  (model: string): ArgsBuilder =>
  (env) => [
    '--dangerously-skip-permissions',
    '--mcp-config',
    JSON.stringify(buildClaudeMcpConfig(env)),
    '--strict-mcp-config',
    '--model',
    model,
    '-p',
    '/generate-news 1 safe',
  ]

const opencodeArgs =
  (model: string): ArgsBuilder =>
  (_env) => [
    'run',
    '--dangerously-skip-permissions',
    '-m',
    model,
    '--command',
    'generate-news',
    '1',
    'safe',
  ]

interface ProviderEntry {
  name: string
  runtime: Runtime
  command: string
  buildArgs: ArgsBuilder
}

const PROVIDERS: Record<string, ProviderEntry> = {
  'claude:sonnet': {
    name: 'Claude Code (sonnet)',
    runtime: 'claude',
    command: 'claude',
    buildArgs: claudeArgs('sonnet'),
  },
  'claude:opus': {
    name: 'Claude Code (opus)',
    runtime: 'claude',
    command: 'claude',
    buildArgs: claudeArgs('opus'),
  },
  'opencode:minimax': {
    name: 'OpenCode (minimax)',
    runtime: 'opencode',
    command: 'opencode',
    buildArgs: opencodeArgs('opencode/minimax-m2.5-free'),
  },
  'opencode:bigpickle': {
    name: 'OpenCode (big-pickle)',
    runtime: 'opencode',
    command: 'opencode',
    buildArgs: opencodeArgs('opencode/big-pickle'),
  },
}

const slugFor = (provider: string) => provider.replace(/:/g, '-')

async function setupOpencodeConfig(env: FixtureEnv): Promise<() => Promise<void>> {
  const exists = await fs
    .access(OPENCODE_CONFIG)
    .then(() => true)
    .catch(() => false)
  if (exists) {
    await fs.copyFile(OPENCODE_CONFIG, OPENCODE_CONFIG_BACKUP)
  }
  await fs.writeFile(
    OPENCODE_CONFIG,
    JSON.stringify(buildOpencodeConfig(env), null, 2)
  )
  return async () => {
    if (exists) {
      await fs.copyFile(OPENCODE_CONFIG_BACKUP, OPENCODE_CONFIG)
      await fs.rm(OPENCODE_CONFIG_BACKUP, { force: true })
    } else {
      await fs.rm(OPENCODE_CONFIG, { force: true })
    }
  }
}

async function runEval(providerKey: string): Promise<boolean> {
  const provider = PROVIDERS[providerKey]
  const { name, runtime, command, buildArgs } = provider
  const slug = slugFor(providerKey)
  const outputFile = path.join(OUTPUT_DIR, `last-${slug}.md`)
  const callLog = path.join(OUTPUT_DIR, `calls-${slug}.jsonl`)
  const env: FixtureEnv = { slug, callLog }

  console.log(`\n${'─'.repeat(60)}`)
  console.log(`🔬  Eval: ${name}`)
  console.log(`${'─'.repeat(60)}\n`)

  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  await fs.rm(outputFile, { force: true })
  await fs.rm(callLog, { force: true })

  const teardown = runtime === 'opencode' ? await setupOpencodeConfig(env) : null

  try {
    const args = buildArgs(env)

    console.log(
      `   $ ${command} ${args.map((a) => (a.length > 80 ? '<mcp-config-json>' : a)).join(' ')}\n`
    )

    const exitCode = await new Promise<number>((resolve, reject) => {
      const proc = spawn(command, args, { cwd: MOTYL_DEV, stdio: 'inherit' })
      proc.on('close', resolve)
      proc.on('error', reject)
    })

    if (exitCode !== 0) {
      console.log(`\n❌  CLI exited with code ${exitCode}`)
      return false
    }
  } finally {
    if (teardown) await teardown()
  }

  let content: string
  try {
    content = await fs.readFile(outputFile, 'utf-8')
  } catch {
    console.log('\n❌  FAIL: Output file not created — save_article was never called\n')
    return false
  }

  if (!content.trim()) {
    console.log('\n❌  FAIL: Output file is empty\n')
    return false
  }

  const calls = await readCallLog(callLog)

  const allResults: { name: string; pass: boolean; message: string }[] = [
    { name: `Article captured (${content.length} chars)`, pass: true, message: '' },
    ...runAllAssertions(content, 'Sherlock Holmes'),
    {
      name: 'safe arg honored: prepare_newsletters(safeMode=true)',
      ...assertSafeModeHonored(calls, 'prepare_newsletters'),
    },
    {
      name: 'safe arg honored: mark_newsletters_as_processed(safeMode=true)',
      ...assertSafeModeHonored(calls, 'mark_newsletters_as_processed'),
    },
  ]

  const total = allResults.length
  let passed = 0
  let failed = 0
  console.log('')
  for (const [i, r] of allResults.entries()) {
    const num = `[${i + 1}/${total}]`
    if (r.pass) {
      console.log(`  ✅  ${num} ${r.name}`)
      passed++
    } else {
      console.log(`  ❌  ${num} ${r.name}: ${r.message}`)
      failed++
    }
  }

  console.log(`\n${name}: ${passed}/${total} passed, ${failed} failed\n`)
  return failed === 0
}

const idx = process.argv.indexOf('--provider')
const providerArg = idx !== -1 ? process.argv[idx + 1] : undefined

if (!providerArg || !(providerArg in PROVIDERS)) {
  const known = Object.keys(PROVIDERS).join(', ')
  console.error(`Usage: tsx evals/run.ts --provider <${known}>`)
  process.exit(1)
}

const allPassed = await runEval(providerArg)
process.exit(allPassed ? 0 : 1)
