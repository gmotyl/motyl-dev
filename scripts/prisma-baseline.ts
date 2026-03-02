/**
 * Prisma migration baseline script.
 *
 * Runs `prisma migrate deploy`. If it fails with P3005 (non-empty schema),
 * baselines all pending migrations as already applied, then retries.
 */
import { execSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

function run(cmd: string): { ok: boolean; output: string } {
  try {
    const output = execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' })
    return { ok: true, output }
  } catch (e: unknown) {
    const error = e as { stdout?: string; stderr?: string }
    return { ok: false, output: (error.stderr || error.stdout || '') }
  }
}

const migrateResult = run('npx prisma migrate deploy')

if (migrateResult.ok) {
  console.log('✅ prisma migrate deploy succeeded')
  process.exit(0)
}

if (!migrateResult.output.includes('P3005')) {
  console.error('❌ prisma migrate deploy failed:', migrateResult.output)
  process.exit(1)
}

console.log('⚠️  P3005: Database not empty. Baselining existing migrations...')

const migrationsDir = join(import.meta.dirname, '..', 'prisma', 'migrations')
const migrations = readdirSync(migrationsDir)
  .filter(d => /^\d{14}_/.test(d))
  .sort()

for (const migration of migrations) {
  console.log(`  → Resolving: ${migration}`)
  const result = run(`npx prisma migrate resolve --applied ${migration}`)
  if (!result.ok) {
    console.error(`❌ Failed to resolve ${migration}:`, result.output)
    process.exit(1)
  }
}

console.log('🔄 Retrying prisma migrate deploy...')
const retryResult = run('npx prisma migrate deploy')

if (retryResult.ok) {
  console.log('✅ prisma migrate deploy succeeded after baseline')
  process.exit(0)
}

console.error('❌ prisma migrate deploy still failed:', retryResult.output)
process.exit(1)
