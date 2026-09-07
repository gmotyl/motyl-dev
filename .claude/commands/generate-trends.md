---
description: Generate weekly trends summary from vote data and create a PR
allowed-tools: ["Bash", "Read", "Write", "Glob", "Skill"]
---

Generate a curated weekly trends summary from vote data, create a markdown file, and open a PR for review.

All commands below run from the repository root. Never hardcode an absolute checkout path: this repo lives at a different location on macOS, Linux/WSL and Windows. If you need the root explicitly, resolve it at runtime with `git rev-parse --show-toplevel`.

## Workflow

### 1. Sync with main

Start from an up-to-date checkout. Drafting on a stale branch produces the wrong issue number and misses content merged since your last session.

```bash
git checkout main && git pull --ff-only
```

If the working tree is dirty or the pull is not a fast-forward, stop and tell the user rather than forcing or stashing anything.

### 2. Fetch vote data

```bash
pnpm generate:trends
```

This queries the database and saves vote data to `.trends-input.json`. If the output says "No votes found", stop and inform the user.

### 3. Read the input

Read `.trends-input.json` from the project root. It contains:

- `week` (e.g. `2026-w36`)
- `weekLabel` (e.g. `Week 36 (Aug 31 – Sep 6, 2026)`)
- `issueNumber` (integer, already incremented for this issue)
- `items` (flat array) and `byCategory` (same items grouped)

Each item has `title`, `linkUrl`, `category`, and `contentSlug`. When `contentSlug` is non-null the article was already covered in `news/`; grep that file for its `TLDR` / `Why do I care` block and reuse the reporting rather than guessing at the article's contents. For unmatched items, fetch the URL before writing about it. Do not invent claims about an article you have not read.

### 4. Draft the summary

Write to `content/trends/motyl-dev-{issueNumber}.md`.

**Frontmatter:**
```yaml
---
issueNumber: 27
week: '2026-w36'
weekLabel: 'Week 36 (Aug 31 – Sep 6, 2026)'
publishedAt: 'YYYY-MM-DD'
---
```

Use today's date for `publishedAt`. Leave out `image:` — the `publish-image` skill writes that field later.

**Body format:** read the previous issue (`content/trends/motyl-dev-{issueNumber - 1}.md`) and match it. The shape is:

```markdown
# motyl.dev Weekly #{issueNumber}: {weekLabel}

> A curated digest of what I found worth reading this week.

{One paragraph naming the through-line of the week and how the pieces argue with each other.}

## ✨ Featured

**[Title](url)**
{Two to four sentences on why this one leads the issue.}

## {emoji} {Themed section heading}

**[Title](url)**
{Two to four sentences.}

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
```

**Curation guidelines:**
- Group items into themed sections you derive from the actual items. Do not force them into fixed Frontend/AI/Tools/Other buckets; the vote data usually reports every item as `general`.
- One `✨ Featured` item leads, then two to four themed sections of two to four items each.
- Write in Grzegorz's voice: first person, opinionated, willing to disagree with a linked piece.
- Section headings use an emoji plus a short phrase, matching the previous issue.
- There are no vote counts in the input. Never print vote numbers.

**Unslop pass:** before writing the file, invoke `Skill: unslop` on the intro paragraph and every item description, and rewrite anything it flags. In particular: no em dashes in prose. Keep the frontmatter, headings, emoji, and links untouched.

### 5. Create branch and commit

Skip this step and step 6 when this skill was invoked from `newsletter-wizard`; that wizard commits to the current branch itself. Report the issue number and file path and stop.

Otherwise:

```bash
git checkout -b feature/trends-{week}
git add content/trends/
git commit -m "feat(trends): add {week} summary"
```

### 6. Create PR

```bash
gh pr create \
  --title "Trends: {weekLabel} summary" \
  --body "Weekly trends summary for {weekLabel}. Review and edit before merging; the markdown is fully editable. After merging, run \`pnpm trends:reset\` to archive votes and start the new week."
```

### 7. Generate social media snippets

Based on the newsletter content, generate **3 short teaser proposals for each platform**: LinkedIn and Twitter/X.

Before output, invoke `Skill: unslop` on all 6 drafts and rewrite anything it flags, keeping each platform's length limit intact.

Output them directly in the chat (do NOT write to a file).

**LinkedIn (aim for ~150–200 words each):**
- Professional tone, but conversational, not corporate-speak
- Lead with the most interesting insight or a provocative question
- Mention 2–3 specific topics from the newsletter
- End with a CTA linking to the newsletter: `https://motyl.dev/newsletter`
- Use line breaks for readability, 2–4 relevant hashtags at the end

**Twitter/X (aim for ~240 characters each, hard limit 280):**
- Sharp, punchy, one key idea per tweet
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

### 8. Report

Show the issue number and file path, plus the PR URL if one was created, and remind the user:

> "After reviewing and merging the PR, run `pnpm trends:reset` to archive this week's votes and reset the counter for the new week."

---

**Note:** Do NOT run `pnpm trends:reset` automatically — the user controls when votes are reset.
