---
description: Generate weekly trends summary from vote data and create a PR
allowed-tools: ["Bash", "Read", "Write", "Glob"]
---

Generate a curated weekly trends summary from vote data, create a markdown file, and open a PR for review.

## Workflow

### 1. Fetch vote data

Run:
```bash
cd /Users/gmotyl/git/prv/motyl-dev && pnpm generate:trends
```

This queries the database and saves vote data to `.trends-input.json`. If the output says "No votes found", stop and inform the user.

### 2. Read the input

Read `.trends-input.json` from the project root. Parse: `week`, `weekLabel`, `totalVotes`, `byCategory`.

### 3. Draft the summary

Create a curated markdown file at `content/trends/{week}-summary.md`.

**Frontmatter:**
```yaml
---
week: "2026-w09"
weekLabel: "Week 9 (Feb 24 – Mar 2, 2026)"
totalVotes: 342
publishedAt: "YYYY-MM-DD"
---
```

Use today's date for `publishedAt`.

**Body format:**
```markdown
# Frontend & AI Trends: {weekLabel}

> {totalVotes} votes cast by the community this week.

## 🚀 Frontend

- **[Title](url)** *(89 votes)* — Engaging one-line description
- **[Title](url)** *(67 votes)* — Engaging one-line description

## 🤖 AI

...

## 🛠️ Tools

...

## 📦 Other

...

---

*Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly summaries.](https://motyl.dev/#newsletter)*
```

**Curation guidelines:**
- Write engaging descriptions — not just copy-paste from the raw data
- Skip categories that have 0 items
- Sort by votes descending within each category
- Keep it concise — quality over quantity
- Category icons: Frontend = 🚀, AI = 🤖, Tools = 🛠️, Other = 📦

### 4. Create branch and commit

```bash
cd /Users/gmotyl/git/prv/motyl-dev
git checkout -b feature/trends-{week}
git add content/trends/
git commit -m "feat(trends): add {week} summary"
```

### 5. Create PR

```bash
gh pr create \
  --title "Trends: {weekLabel} summary" \
  --body "Weekly trends summary for {weekLabel}. Review and edit before merging — the markdown is fully editable.\n\nAfter merging, run \`pnpm trends:reset\` to archive votes and start the new week."
```

### 6. Generate social media snippets

Based on the newsletter content, generate **3 short teaser proposals for each platform**: LinkedIn and Twitter/X.

Output them directly in the chat (do NOT write to a file).

**LinkedIn (aim for ~150–200 words each):**
- Professional tone, but conversational — not corporate-speak
- Lead with the most interesting insight or a provocative question
- Mention 2–3 specific topics from the newsletter
- End with a CTA linking to the newsletter: `https://motyl.dev/newsletter`
- Use line breaks for readability, 2–4 relevant hashtags at the end

**Twitter/X (aim for ~240 characters each, hard limit 280):**
- Sharp, punchy — one key idea per tweet
- Can highlight a surprising stat, a counterintuitive take, or a "did you know"
- End with the newsletter link: `https://motyl.dev/newsletter`
- 1–2 hashtags max

**Format the output as:**
```
## LinkedIn

### Option 1
[post text]

### Option 2
[post text]

### Option 3
[post text]

## Twitter/X

### Option 1
[tweet text]

### Option 2
[tweet text]

### Option 3
[tweet text]
```

### 7. Report

Show the PR URL and remind the user:

> "After reviewing and merging the PR, run `pnpm trends:reset` to archive this week's votes and reset the counter for the new week."

---

**Note:** Do NOT run `pnpm trends:reset` automatically — the user controls when votes are reset.
