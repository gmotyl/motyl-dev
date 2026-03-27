-- AlterTable: change week (text) to date (date) in pattern_stats
-- This drops existing data since the column type is incompatible

ALTER TABLE "pattern_stats" DROP CONSTRAINT "pattern_stats_pattern_name_week_key";
DROP INDEX "pattern_stats_week_idx";

ALTER TABLE "pattern_stats" DROP COLUMN "week";
ALTER TABLE "pattern_stats" ADD COLUMN "date" DATE NOT NULL DEFAULT CURRENT_DATE;

ALTER TABLE "pattern_stats" ALTER COLUMN "date" DROP DEFAULT;

CREATE UNIQUE INDEX "pattern_stats_pattern_name_date_key" ON "pattern_stats"("pattern_name", "date");
CREATE INDEX "pattern_stats_date_idx" ON "pattern_stats"("date");
