import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runAllAssertions } from './assertions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOTYL_DEV = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, '.output');
const MCP_JSON = path.join(MOTYL_DEV, '.mcp.json');

const PROVIDERS = {
  claude: {
    name: 'Claude Code',
    command: 'claude',
    args: ['--dangerously-skip-permissions', '-p', '/generate-news 1 safe'],
  },
  opencode: {
    name: 'OpenCode',
    command: 'opencode',
    args: ['run', '--command', 'generate-news', '1', 'safe'],
  },
} as const;

type Provider = keyof typeof PROVIDERS;

function buildEvalMcpConfig(provider: Provider) {
  return {
    mcpServers: {
      'newsletter-ai': {
        command: path.join(MOTYL_DEV, 'node_modules/.bin/tsx'),
        args: [path.join(__dirname, 'fake-mcp.ts')],
        env: {
          OUTPUT_PATH: OUTPUT_DIR,
          EVAL_PROVIDER: provider,
        },
      },
    },
  };
}

async function runEval(provider: Provider): Promise<boolean> {
  const { name, command, args } = PROVIDERS[provider];
  const outputFile = path.join(OUTPUT_DIR, `last-${provider}.md`);

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`🔬  Eval: ${name}`);
  console.log(`${'─'.repeat(60)}\n`);

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.rm(outputFile, { force: true });

  const originalMcp = await fs.readFile(MCP_JSON, 'utf-8');

  try {
    await fs.writeFile(MCP_JSON, JSON.stringify(buildEvalMcpConfig(provider), null, 2));

    console.log(`   $ ${command} ${args.join(' ')}\n`);

    const exitCode = await new Promise<number>((resolve, reject) => {
      const proc = spawn(command, args, {
        cwd: MOTYL_DEV,
        stdio: 'inherit',
      });
      proc.on('close', resolve);
      proc.on('error', reject);
    });

    if (exitCode !== 0) {
      console.log(`\n❌  CLI exited with code ${exitCode}`);
      return false;
    }
  } finally {
    await fs.writeFile(MCP_JSON, originalMcp);
  }

  // Assertion #1: file exists and is non-empty
  let content: string;
  try {
    content = await fs.readFile(outputFile, 'utf-8');
  } catch {
    console.log('\n❌  FAIL [1/19]: Output file not created — save_article was never called\n');
    return false;
  }

  if (!content.trim()) {
    console.log('\n❌  FAIL [1/19]: Output file is empty\n');
    return false;
  }

  console.log(`\n✅  [1/19]: Article captured (${content.length} chars)\n`);

  // Assertions #2–19
  const results = runAllAssertions(content, 'Sherlock Holmes');
  let passed = 1; // #1 passed above
  let failed = 0;

  for (const [i, r] of results.entries()) {
    const num = `[${i + 2}/19]`;
    if (r.pass) {
      console.log(`  ✅  ${num} ${r.name}`);
      passed++;
    } else {
      console.log(`  ❌  ${num} ${r.name}: ${r.message}`);
      failed++;
    }
  }

  console.log(`\n${name}: ${passed}/19 passed, ${failed} failed\n`);
  return failed === 0;
}

// Parse --provider argument
const idx = process.argv.indexOf('--provider');
const providerArg = idx !== -1 ? process.argv[idx + 1] : undefined;

if (!providerArg || !(providerArg in PROVIDERS)) {
  console.error('Usage: tsx evals/run.ts --provider <claude|opencode>');
  process.exit(1);
}

const allPassed = await runEval(providerArg as Provider);
process.exit(allPassed ? 0 : 1);
