---
description: Publish repurposed content to social media platforms (Bluesky, Twitter/X, LinkedIn)
allowed-tools: ["Read", "Bash", "Glob"]
argument-hint: [issue-number-or-slug] [--platforms bluesky,twitter,linkedin]
---

Publish newsletter or article content to social media platforms using direct API calls.

**Arguments:**
- Optional: issue number or slug (same as `/repurpose`)
- Optional: `--platforms bluesky,twitter,linkedin` — comma-separated list (default: all configured)
- Optional: `--dry-run` — show posts without publishing

---

## Step 1: Find the content file

Same logic as `/repurpose`:

If argument provided (and not a flag):
- Number → search `news/` for matching file
- Slug → search `news/` and `articles/`

If no argument:
- Run: `find news/ -name "*.md" | xargs grep -l "publishedAt" 2>/dev/null | xargs ls -t | head -5`
- Pick the one with most recent `publishedAt` in frontmatter

Read the file. Extract: title, excerpt, slug, and full body.

Build article URL: `https://motyl.dev/news/[slug]` or `https://motyl.dev/blog/[slug]`

---

## Step 2: Generate posts using Tuna Principle

Same as `/repurpose` — extract content atoms and generate native posts.

**Content Atoms:**
1. **Hook** — scroll-stopper opening
2. **Central Insight** — the one idea worth remembering
3. **Framework / List** — synthesized structure, 3-5 bullets
4. **Quotable** — standalone tweetable sentence
5. **CTA** — link to full article

**Platform posts to generate:**

### Bluesky (300 chars max)
- Conversational, authentic, tech-aware audience
- Hook + 1-2 key points + link
- No hashtags (Bluesky culture = no hashtag spam)
- Max 300 characters including link

### Twitter/X (280 chars max)
- Similar to Bluesky but slightly punchier
- 1-2 hashtags max, relevant only
- Max 280 characters

### LinkedIn (3000 chars max)
- Professional, structured
- Line breaks between paragraphs
- Start with Hook, then Framework/list, end with CTA
- 3-5 relevant hashtags at the end
- 800-1200 characters is sweet spot

Write in **Polish** (Greg's audience is Polish).

---

## Step 3: Show posts and confirm

Display all generated posts clearly labeled with platform name and character count.

Check which platforms are configured (look for keys in `.env`):
- Bluesky: `BLUESKY_IDENTIFIER` + `BLUESKY_APP_PASSWORD`
- Twitter: `TWITTER_API_KEY` + `TWITTER_ACCESS_TOKEN`
- LinkedIn: `LINKEDIN_ACCESS_TOKEN` + `LINKEDIN_PERSON_URN`

Show warning for any platform missing credentials.

Then ask: **"Publish to: [list of configured platforms]? (all / pick / skip)"**

If `--dry-run` was passed — stop here, don't publish.

---

## Step 4: Publish

For each confirmed platform, run:

```bash
node scripts/publish-social.mjs \
  --platform [bluesky|twitter|linkedin] \
  --text "[generated post text]" \
  --link "[article URL]"
```

Pass the text carefully — use a temp file if content has special characters:

```bash
# Write to temp file first
cat > /tmp/social-post.txt << 'POSTEOF'
[post text here]
POSTEOF

node scripts/publish-social.mjs \
  --platform bluesky \
  --text @/tmp/social-post.txt \
  --link "https://motyl.dev/news/[slug]"
```

---

## Step 5: Report results

Show each platform result:
- ✓ Published: [URL]
- ✗ Failed: [error message]

If any failed, show the post text so Greg can publish manually.
