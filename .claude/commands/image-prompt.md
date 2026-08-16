---
description: Generate NanoBanana image prompt for newsletter or article
allowed-tools: ["Read", "Bash", "Glob"]
argument-hint: [issue-number-or-slug]
---

Generate a ready-to-use NanoBanana image prompt based on newsletter or article content.

**Arguments:**

- Optional: issue number (e.g. `42`) or slug — if omitted, picks the latest file from `news/`

## How it works

1. Find the target content file
2. Read title, excerpt, and key themes
3. Generate an English prompt optimized for NanoBanana

---

## Step 1: Find the content file

If an argument was provided:
- If it looks like a number, search `news/` recursively for a file matching that pattern
- If it looks like a slug, search `news/` and `articles/` for a matching filename

If no argument:
- List all files in `news/` recursively, pick the one with the most recent `publishedAt` date in frontmatter
- Use Bash: `find news/ -name "*.md" | sort -r | head -5` to get candidates, then read frontmatter to confirm latest

## Step 2: Read the content

Read the file. Extract:
- `title` from frontmatter
- `excerpt` from frontmatter
- First 2-3 paragraphs of body (for themes and mood)
- Main topics/keywords

## Step 3: Generate the prompt

Write a NanoBanana-optimized prompt in **English** following these rules:

**Style guidelines:**
- Abstract/conceptual visual — NOT literal illustrations
- Tech-forward but human: think data flows, neural networks, digital butterflies, code patterns
- Mood: professional, modern, slightly futuristic
- Color palette: dark background preferred (navy, deep teal, charcoal) with bright accent (electric blue, amber, emerald)
- No text in image
- Aspect ratio note: 16:9 (hero banner for newsletter/blog)

**Prompt structure:**
```
[Main visual concept], [style descriptors], [mood/lighting], [color palette], [technical quality tags]
```

**Output format:**

```
## NanoBanana Prompt

[THE PROMPT — ready to copy-paste]

---
**Article:** [title]
**File:** [path to file]
**Suggested style:** [1-2 sentence description of what the image should convey]
```

Keep the prompt under 200 words. Aim for vivid, specific visual language — not generic "technology background" phrases.
