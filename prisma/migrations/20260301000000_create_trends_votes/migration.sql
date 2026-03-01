-- CreateTable
CREATE TABLE "trends_votes" (
    "id" TEXT NOT NULL,
    "week" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL DEFAULT 'other',
    "vote_count" INTEGER NOT NULL DEFAULT 0,
    "source_domain" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trends_votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trends_votes_week_link_url_key" ON "trends_votes"("week", "link_url");

-- CreateIndex
CREATE INDEX "trends_votes_week_idx" ON "trends_votes"("week");

-- CreateIndex
CREATE INDEX "trends_votes_vote_count_idx" ON "trends_votes"("vote_count" DESC);
