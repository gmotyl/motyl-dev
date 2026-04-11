---
description: Generate newsletter article from one or more URLs
allowed-tools: ["mcp__newsletter-ai__*", "Bash"]
argument-hint: <url> [url2] [url3] ...
---

Generate a newsletter article from one or more provided URLs, using the same format and quality standards as `/generate-news`.

**Arguments:**

- One or more URLs to scrape and turn into an article
- All URLs are treated as a single "newsletter" batch — one article is generated covering all provided links

**Examples:**

- `/url-to-news https://example.com/article`
- `/url-to-news https://site.com/post1 https://site.com/post2`

## Workflow

**Process automatically without user confirmation — no prompts between steps.**

1. **Parse arguments**

   - Extract all URLs from the arguments
   - Display: "Processing X URL(s)..."

2. **Get config and prompt template**

   - Call `mcp__newsletter-ai__get_config` to get narrator persona, output language, and other settings
   - Call `mcp__newsletter-ai__get_prompt_template` to get PROMPT.md

3. **Scrape each URL**

   - For each URL (in parallel when possible):
     - Call `mcp__newsletter-ai__scrape_article` with the URL
     - If scraping fails, attempt **agent-browser fallback**:
       - Display: "⚠️ Scrape failed for [url], trying agent-browser..."
       - Run: `agent-browser open <url> && agent-browser wait --load networkidle && agent-browser get text body`
       - If agent-browser succeeds: use the extracted text, display "✓ agent-browser fallback succeeded for [url]"
       - If agent-browser also fails: log error and skip the URL
   - Keep track of successfully scraped articles

4. **Generate article content**

   - Display: "Generating article content..."
   - Use the prompt template:
     - Replace `{NARRATOR_PERSONA}` with config.narratorPersona
     - Replace `{OUTPUT_LANGUAGE}` with config.outputLanguage
     - Replace `{NEWSLETTER_CONTENT}` with formatted scraped articles (title, url, content for each)
   - Generate markdown article with frontmatter:
     - Include `---` frontmatter with: title, excerpt, publishedAt, slug, hashtags
     - Include TLDR section
     - Include detailed summary for each article
     - Include key takeaways
     - Include "Why do I care" commentary (senior frontend dev perspective) — LAST section before the link, per article
     - **Each topic section MUST end with `**Link:** [Title](URL)` line**
   - Writing rules (apply during generation, not as a post-process):
     - No em dashes (—); use commas or separate sentences instead
     - No "rule of three" (avoid listing exactly three items just to seem thorough)
     - No AI vocabulary: additionally, crucial, delve, highlight, landscape, pivotal, showcase, testament, underscore, vibrant, key (as adjective), foster, enhance
     - No inflated significance: "marks a turning point", "reflects broader trends", "serves as a reminder"
     - No promotional language: groundbreaking, stunning, breathtaking, boasts, nestled, renowned
     - No vague attributions: "experts say", "industry observers note", "some argue"
     - No negative parallelisms: "It's not just X, it's Y"
     - No inline-header bullet lists (**Key:** description) — write in prose instead
     - Vary sentence length: mix short punchy sentences with longer ones
     - Have opinions — react to the content, don't just neutrally report it
     - Use "I" when it fits naturally
     - Be specific: concrete details beat vague claims every time
     - Do NOT include any "Co-Authored-By" attribution lines
     - Do NOT include any "Generated with [Tool Name]" marketing lines

5. **Save article**

   - Call `mcp__newsletter-ai__save_article` with the generated content and a descriptive source name (e.g. domain name of the first URL)
   - Display: "✅ Saved article to [filepath]"

6. **Commit and push**

   - Stage new articles: `git add news/`
   - Commit: `chore: add article from URL(s) [first url domain]`
   - Push to remote

7. **Display summary**

   - Show generated article file path
   - Show which URLs were successfully scraped
   - Show any URLs that failed
