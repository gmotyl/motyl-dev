/**
 * Prisma migration deploy with idempotent table creation.
 *
 * Always runs migration SQL with IF NOT EXISTS to ensure tables exist,
 * then syncs _prisma_migrations table to match.
 */
import { execSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

function run(cmd: string, input?: string): { ok: boolean; output: string } {
  try {
    const output = execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'], input })
    return { ok: true, output }
  } catch (e: unknown) {
    const error = e as { stdout?: string; stderr?: string }
    return { ok: false, output: `${error.stderr || ''}${error.stdout || ''}` }
  }
}

const migrationsDir = join(import.meta.dirname, '..', 'prisma', 'migrations')
const migrations = readdirSync(migrationsDir)
  .filter(d => /^\d{14}_/.test(d))
  .sort()

console.log(`Found ${migrations.length} migrations. Ensuring all tables exist...`)

for (const migration of migrations) {
  const sqlPath = join(migrationsDir, migration, 'migration.sql')
  let sql: string
  try { sql = readFileSync(sqlPath, 'utf-8') } catch { continue }

  // Make all DDL idempotent
  const safeSql = sql
    .replace(/CREATE TABLE /gi, 'CREATE TABLE IF NOT EXISTS ')
    .replace(/CREATE UNIQUE INDEX /gi, 'CREATE UNIQUE INDEX IF NOT EXISTS ')
    .replace(/CREATE INDEX /gi, 'CREATE INDEX IF NOT EXISTS ')

  console.log(`  → ${migration}`)
  const result = run('npx prisma db execute --schema prisma/schema.prisma --stdin', safeSql)
  if (!result.ok) {
    console.error(`  ❌ SQL failed: ${result.output}`)
    process.exit(1)
  }

  // Mark as applied in _prisma_migrations (idempotent — resolve ignores duplicates)
  run(`npx prisma migrate resolve --applied ${migration}`)
}

console.log('✅ All migrations applied')
