-- CreateTable
CREATE TABLE "pattern_stats" (
    "id" TEXT NOT NULL,
    "pattern_name" TEXT NOT NULL,
    "week" TEXT NOT NULL,
    "processed" INTEGER NOT NULL DEFAULT 0,
    "extracted" INTEGER NOT NULL DEFAULT 0,
    "included" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pattern_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pattern_stats_pattern_name_week_key" ON "pattern_stats"("pattern_name", "week");

-- CreateIndex
CREATE INDEX "pattern_stats_week_idx" ON "pattern_stats"("week");
