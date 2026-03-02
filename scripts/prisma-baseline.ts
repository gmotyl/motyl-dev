/**
 * Prisma migration deploy with auto-recovery.
 *
 * 1. Tries `prisma migrate deploy` normally
 * 2. If P3005 (non-empty DB, no _prisma_migrations table): drops stale
 *    migration records and retries so migrations actually run
 * 3. Future deploys work normally once _prisma_migrations is in sync
 */
import { execSync } from 'node:child_process'

function run(cmd: string, input?: string): { ok: boolean; output: string } {
  try {
    const output = execSync(cmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'], input })
    return { ok: true, output }
  } catch (e: unknown) {
    const error = e as { stdout?: string; stderr?: string }
    return { ok: false, output: `${error.stderr || ''}${error.stdout || ''}` }
  }
}

// Try normal deploy
const result = run('npx prisma migrate deploy')

if (result.ok) {
  console.log('✅ prisma migrate deploy succeeded')
  process.exit(0)
}

if (result.output.includes('P3005')) {
  console.log('⚠️  P3005: Database not empty. Resetting migration history...')

  // Drop stale _prisma_migrations table so deploy starts fresh
  const dropSql = 'DROP TABLE IF EXISTS "_prisma_migrations";'
  const dropResult = run('npx prisma db execute --stdin', dropSql)
  if (!dropResult.ok) {
    console.error('❌ Failed to drop _prisma_migrations:', dropResult.output)
    process.exit(1)
  }

  // Now deploy will fail with P3005 again because other tables exist.
  // We need to create _prisma_migrations and mark pre-existing schema,
  // but let new migrations (like trends) actually run.
  //
  // Since all our migrations create NEW tables (trends_votes, trends_archive),
  // and the existing tables were created via db push (no migration),
  // we can safely let all migrations run with CREATE IF NOT EXISTS workaround.
  //
  // Simplest: use migrate dev --create-only to mark existing, but that's
  // interactive. Instead, just init the _prisma_migrations table empty
  // and use CREATE TABLE IF NOT EXISTS approach.
  //
  // Actually simplest: just run each migration.sql manually, wrapping
  // CREATE TABLE with IF NOT EXISTS, then mark as resolved.

  console.log('   Applying migrations manually with IF NOT EXISTS...')

  const { readdirSync, readFileSync } = await import('node:fs')
  const { join } = await import('node:path')

  const migrationsDir = join(import.meta.dirname, '..', 'prisma', 'migrations')
  const migrations = readdirSync(migrationsDir)
    .filter(d => /^\d{14}_/.test(d))
    .sort()

  // Bootstrap _prisma_migrations table by resolving first migration
  const firstResolve = run(`npx prisma migrate resolve --applied ${migrations[0]}`)
  if (!firstResolve.ok) {
    console.error('❌ Failed to bootstrap migrations table:', firstResolve.output)
    process.exit(1)
  }

  // Now run each migration's SQL with CREATE TABLE → CREATE TABLE IF NOT EXISTS
  for (const migration of migrations) {
    const sqlPath = join(migrationsDir, migration, 'migration.sql')
    let sql: string
    try { sql = readFileSync(sqlPath, 'utf-8') } catch { continue }

    // Make CREATE TABLE idempotent
    const safeSql = sql.replace(/CREATE TABLE /gi, 'CREATE TABLE IF NOT EXISTS ')
      .replace(/CREATE UNIQUE INDEX /gi, 'CREATE UNIQUE INDEX IF NOT EXISTS ')
      .replace(/CREATE INDEX /gi, 'CREATE INDEX IF NOT EXISTS ')

    console.log(`  → Applying: ${migration}`)
    const execResult = run('npx prisma db execute --stdin', safeSql)
    if (!execResult.ok) {
      console.error(`  ❌ Failed: ${execResult.output}`)
      process.exit(1)
    }

    // Mark as applied
    run(`npx prisma migrate resolve --applied ${migration}`)
  }

  console.log('✅ All migrations applied and baselined')
  process.exit(0)
}

console.error('❌ prisma migrate deploy failed:', result.output)
process.exit(1)
