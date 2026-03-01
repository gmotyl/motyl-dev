-- CreateTable
CREATE TABLE "trends_votes_archive" (
    "id" TEXT NOT NULL,
    "week" TEXT NOT NULL,
    "summary_markdown" TEXT NOT NULL,
    "total_votes" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trends_votes_archive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trends_votes_archive_week_key" ON "trends_votes_archive"("week");

-- CreateIndex
CREATE INDEX "trends_votes_archive_week_idx" ON "trends_votes_archive"("week");
