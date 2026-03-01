-- DropIndex
DROP INDEX "trends_votes_archive_week_idx";

-- AlterTable
ALTER TABLE "trends_votes_archive" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
