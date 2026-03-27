-- Idempotent migration: change week (text) to date (date) in pattern_stats
-- Safe to re-run if previous attempt partially applied

DO $$
BEGIN
  -- Drop unique constraint if it still exists (may have been dropped in prior attempt)
  IF EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'pattern_stats_pattern_name_week_key'
  ) THEN
    ALTER TABLE "pattern_stats" DROP CONSTRAINT "pattern_stats_pattern_name_week_key";
  END IF;

  -- Drop week index if it still exists
  IF EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'pattern_stats_week_idx'
  ) THEN
    DROP INDEX "pattern_stats_week_idx";
  END IF;

  -- Drop week column if it still exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pattern_stats' AND column_name = 'week'
  ) THEN
    ALTER TABLE "pattern_stats" DROP COLUMN "week";
  END IF;

  -- Add date column if not already present
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pattern_stats' AND column_name = 'date'
  ) THEN
    ALTER TABLE "pattern_stats" ADD COLUMN "date" DATE NOT NULL DEFAULT CURRENT_DATE;
    ALTER TABLE "pattern_stats" ALTER COLUMN "date" DROP DEFAULT;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "pattern_stats_pattern_name_date_key" ON "pattern_stats"("pattern_name", "date");
CREATE INDEX IF NOT EXISTS "pattern_stats_date_idx" ON "pattern_stats"("date");
