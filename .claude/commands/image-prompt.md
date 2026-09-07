---
description: Generate NanoBanana image prompt for newsletter or article
allowed-tools: ["Read", "Bash", "Glob"]
argument-hint: [issue-number-or-slug] [optional style/angle note]
---

Generate a ready-to-use NanoBanana image prompt based on newsletter or article content.

**Arguments:**

- Optional: issue number (e.g. `42`) or slug — if omitted, picks the newest content file
- Optional: a free-text note after the identifier describing the angle, subject, or visual style to aim for. Anything the user says here **overrides the default style guidelines below**, including the abstract/conceptual default.

All commands run from the repository root. Never hardcode an absolute checkout path; this repo lives at a different location on macOS, Linux/WSL and Windows.

---

## Step 1: Find the content file

Content lives in three places. Search all of them:

| Directory | Filename shape | Holds |
|---|---|---|
| `content/trends/` | `motyl-dev-{issueNumber}.md` | weekly newsletter issues |
| `news/` | `{YYYY}/{YYYY-MM-DD}-{slug}.md` | daily news roundups |
| `articles/` | `{slug}.md` | standalone articles |

If the argument is a **number**, it is an issue number. Check `content/trends/motyl-dev-{n}.md` first, since that is the newsletter numbering:

```bash
ls content/trends/motyl-dev-{n}.md 2>/dev/null || grep -rl "issueNumber: {n}" content/trends/ news/
```

If the argument is a **slug**, search all three directories:

```bash
find content/trends news articles -name "*{slug}*.md" 2>/dev/null
```

If there is **no argument**, list candidates across all three and pick the newest `publishedAt` from frontmatter:

```bash
find content/trends news articles -name "*.md" 2>/dev/null | sort -r | head -10
```

If nothing matches, say so and ask the user for the path. Do not silently fall back to a different issue.

## Step 2: Read the content

Read the file. Extract:
- `title` from frontmatter, or the `# ` heading for trends issues (they have no `title` field)
- `excerpt` from frontmatter where present
- The intro paragraph and section headings (for themes and mood)
- Main topics/keywords

For a trends issue, the intro paragraph states the through-line of the week. That is usually the best source for the image concept.

## Step 3: Generate the prompt

Write a NanoBanana-optimized prompt in **English**.

**If the user supplied a style or angle note, follow it and skip the default style block below.** Keep only the hard constraints (no text in image, 16:9, and the negative list).

**Default style (used only when the user gave no direction):**
- Abstract/conceptual visual, not a literal illustration
- Tech-forward but human: data flows, code patterns, natural forms
- Mood: professional, modern, slightly futuristic
- Dark background (navy, deep teal, charcoal) with one bright accent (electric blue, amber, emerald)

**Hard constraints, always applied:**
- No text, letterforms, or logos in the image
- 16:9 hero banner
- Name a concrete lighting setup and a concrete medium (film stock, lens, or paint/print medium). "Digital art" and "highly detailed" are not descriptions.
- Always append a negative list. These are the generic AI-image tells and they make the newsletter look cheap:

```
Negative: no text, no logos, no lens-flare spam, no neon circuit-board motifs, no
holographic HUD overlays, no glowing wireframe grids, no hexagon patterns, no glossy
3D-render plastic look, no perfect symmetry, no floating particles.
```

**Prompt structure:**
```
[Main visual concept and scene], [medium and camera/lens], [lighting], [color palette], [mood], [negative list]
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

Keep the prompt under 200 words. Aim for vivid, specific visual language. A prompt that could describe any tech article has failed; it should only fit this issue.

## Step 4: Hand off

The user renders the image in NanoBanana and downloads it. The `publish-image` skill takes it from there and writes the `image:` frontmatter field, so do **not** add or edit `image:` here.
