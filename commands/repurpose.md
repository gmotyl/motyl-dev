---
description: Repurpose newsletter or article into native posts for LinkedIn, Bluesky, Twitter/X, Instagram, TikTok
allowed-tools: ["Read", "Bash", "Glob"]
argument-hint: [issue-number-or-slug]
---

Break down a newsletter or article into "content atoms" and generate native posts for each social platform.

**Philosophy: Tuna Principle**
Don't shorten — decompose into atoms, then recompose natively for each platform. Each post should feel native, not like a copy-paste excerpt.

**Arguments:**
- Optional: issue number or slug — if omitted, picks the latest file from `news/`

---

## Step 1: Find the content file

Same logic as `/image-prompt`:

If argument provided:
- Number → search `news/` for matching file
- Slug → search `news/` and `articles/`

If no argument:
- Run: `find news/ -name "*.md" | xargs grep -l "publishedAt" | xargs ls -t | head -5`
- Pick the one with most recent `publishedAt` in frontmatter

## Step 2: Read and extract content atoms

Read the full file. Extract these **5 content atoms**:

1. **Hook** — the opening sentence or claim that stops the scroll. If none exists, craft one from the title/excerpt. Must create curiosity or tension.

2. **Central Insight** — the single most valuable idea in the piece. The one thing a reader should remember. 1-2 sentences max.

3. **Framework / List** — if the article has a numbered list, steps, or framework — extract it. If not, synthesize the structure into 3-5 bullet points.

4. **Quotable** — the most tweetable sentence: a surprising stat, a contrarian take, or a sharp observation. Should work standalone without context.

5. **CTA** — what you want readers to do. Link to full article on motyl.dev, subscribe to newsletter, or follow. Use the slug to construct URL: `https://motyl.dev/news/[slug]` or `https://motyl.dev/blog/[slug]`.

---

## Step 3: Generate platform posts

Generate all platforms. Use the content atoms — never just quote from the article verbatim.

Write in **Polish** (Greg's audience) unless the article is in English — then write in English.

Apply humanizer rules (write like a person, not an AI):
- No hollow openers ("In today's digital landscape...")
- No filler transitions ("Furthermore", "Moreover", "It's worth noting")
- No AI-isms ("game-changer", "leverage", "dive into", "delve")
- Vary sentence length — mix short punchy sentences with longer ones
- Use first person where natural
- Be direct — cut the fluff

---

### LinkedIn

**Format:** Personal narrative post
**Length:** 1200-1500 characters
**Style:** Hook → personal take → insight → data or example → reflection → CTA
**Rules:**
- Start with a single short sentence (the hook) — NOT "I'm excited to share..."
- Add 2-3 line breaks between thoughts (LinkedIn formatting)
- End with a question or direct CTA
- 3-5 relevant hashtags at the end

```
[LINKEDIN POST]
---
[post content]
---
Hashtags: #... #... #...
Characters: [count]
```

---

### Bluesky

**Format:** Thread of 5-7 posts
**Length:** Max 300 characters per post
**Style:** Conversational, punchy, each post must stand alone but connect to the thread
**Rules:**
- Post 1 = hook (must make someone want to read next)
- Post 2-5 = one idea each, tight
- Last post = CTA + link
- No hashtags needed (optional, max 2)

```
[BLUESKY THREAD]
---
1/ [text]

2/ [text]

...

[N]/ [link + CTA]
---
```

---

### Twitter/X

**Format:** Thread of 5-7 tweets
**Length:** Max 280 characters per tweet
**Style:** Punchy, lists work well, provocative takes
**Rules:**
- Tweet 1 = hook + "🧵" indicator
- Middle tweets can use numbered lists or short punchy statements
- Last tweet = CTA + link
- 1-2 hashtags max total

```
[TWITTER/X THREAD]
---
1/ [text] 🧵

2/ [text]

...

[N]/ [link + CTA]
---
```

---

### Instagram

**Format:** Caption for image post
**Length:** 150-300 characters visible, rest after "more"
**Style:** Visual storytelling — describe what's in the image (or what should be), then the insight
**Rules:**
- First line = hook (visible before "more")
- 5-10 hashtags at the end
- Emoji use is OK here — Instagram expects it

```
[INSTAGRAM CAPTION]
---
[caption]

[hashtags]
---
```

---

### TikTok

**Format:** Video script (spoken word)
**Length:** ~60 seconds (~130-160 words)
**Style:** Hook in first 3 seconds, fast pace, direct address to camera, story arc
**Structure:**
- 0-3s: Hook (surprising claim or question)
- 3-20s: Setup / context
- 20-45s: The insight or framework (the "meat")
- 45-55s: Payoff / resolution
- 55-60s: CTA ("follow for more", "link in bio")

```
[TIKTOK SCRIPT]
---
[HOOK - 0-3s]
[text]

[SETUP - 3-20s]
[text]

[INSIGHT - 20-45s]
[text]

[PAYOFF - 45-55s]
[text]

[CTA - 55-60s]
[text]
---
Estimated duration: ~[N]s / ~[N] words
```

---

## Step 4: Output summary

After all posts, add:

```
---
## Content Atoms Used

**Hook:** [text]
**Central Insight:** [text]
**Framework:** [bullets]
**Quotable:** [text]
**CTA URL:** [url]

## Source
File: [path]
Title: [title]
```
