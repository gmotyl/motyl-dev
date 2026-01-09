---
description: Generate newsletter articles from mailbox
allowed-tools: ["mcp__newsletter-ai__*"]
argument-hint: [limit] [pattern]
---

Generate newsletter articles using the newsletter-ai MCP server.

**Arguments:**

- First argument: limit - number of newsletters to process or "all" (default: 1)
- Second argument (optional): pattern - filter by newsletter pattern (e.g., "daily.dev") OR "safe" keyword
- If "safe" is included anywhere in arguments, emails will NOT be deleted (safe mode)

## Hashtags

Newsletters can have default hashtags configured in the newsletter-ai MCP server's config:

```yaml
newsletterPatterns:
  - name: 'daily.dev'
    hashtags: ['#dailydev', '#frontend', '#webdev']
```

When preparing newsletters:

- Default hashtags are copied from newsletter-ai MCP config to `LINKS.yaml`
- You can manually edit hashtags in `LINKS.yaml` before generation
- During article generation, newsletter hashtags are provided to the LLM
- The LLM combines newsletter hashtags with article-specific tags

**Examples:**

- `/generate-news` → Process 1 newsletter
- `/generate-news 5 safe` → Process 5 newsletters, safe mode (no deletion)
- `/generate-news 3 daily.dev` → Process 3 daily.dev newsletters only
- `/generate-news all daily.dev safe` → Process all daily.dev newsletters, safe mode

**Workflow:**

1. **Parse arguments**

   - Extract limit from first argument (default: 1)
   - Check if "safe" keyword is present in any argument
   - Extract pattern from remaining arguments (if not "safe")

2. **Check mailbox count**

   - Call `mcp__newsletter-ai__get_newsletters_count` with pattern (if provided)
   - Display: "Found X newsletters in mailbox [breakdown by pattern]"
   - If safe mode: Display: "🔒 Safe mode enabled - emails will NOT be deleted"
   - Display: "Processing [limit] newsletter(s)..."

3. **Prepare newsletters**

   - Call `mcp__newsletter-ai__prepare_newsletters` with:
     - limit: number or "all"
     - pattern: optional newsletter filter
     - safeMode: true if "safe" keyword was in arguments
   - This will fetch emails, extract links, clean/enrich them, and write to LINKS.yaml
   - If safeMode=false and newsletter-ai MCP config has autoDelete=true, emails will be deleted after processing

4. **Get newsletters list and config**

   - Call `mcp__newsletter-ai__get_newsletters_list` to see what was prepared
   - Call `mcp__newsletter-ai__get_config` to get newsletter-ai MCP config
   - Call `mcp__newsletter-ai__get_prompt_template` to get PROMPT.md

5. **For each newsletter (sequentially, automatically):**

   - Display: "Processing newsletter X of Y: [name]..."
   - Call `mcp__newsletter-ai__get_newsletter_links` to get links
   - Display: "Scraping X articles..."
   - For each link (in parallel when possible):
     - Call `mcp__newsletter-ai__scrape_article` to get content
     - Skip if scraping fails (log error but continue)
     - Keep track of successfully scraped articles
   - **Handle fallback scenario:**
     - If ALL links failed to scrape OR the newsletter has 0 links:
       - Display: "⚠️ No articles could be scraped. Attempting to use newsletter body as fallback..."
       - Call `mcp__newsletter-ai__get_newsletter_body` with the newsletter's UID
       - If body is available:
         - Display: "✓ Using newsletter body content as fallback"
         - Use the bodyText or bodyHtml as content for article generation
         - Mark this as a "body-based" article (different prompt approach)
         - **IMPORTANT**: Extract any URLs from the newsletter body and add them as proper `**Link:**` entries after each topic section
       - If body is NOT available:
         - Display: "✗ Newsletter body not available. Skipping this newsletter."
         - Continue to next newsletter
   - Display: "Generating article content..."
   - **Generate article content** using the prompt template:
     - Replace `{NARRATOR_PERSONA}` with config.narratorPersona
     - Replace `{OUTPUT_LANGUAGE}` with config.outputLanguage
     - If using scraped articles:
       - Replace `{NEWSLETTER_CONTENT}` with formatted articles (title, url, content for each)
     - If using newsletter body (fallback):
       - Replace `{NEWSLETTER_CONTENT}` with the raw newsletter body
       - Adapt the prompt to handle body-based content (extract key topics, summarize sections, etc.)
       - **CRITICAL**: Ensure each topic section ends with a proper `**Link:** [Title](URL)` line extracted from the newsletter body
     - Generate markdown article with frontmatter following PROMPT.md format:
       - Include `---` frontmatter with: title, excerpt, publishedAt, slug, hashtags
       - Include TLDR section
       - Include detailed summary for each article (or sections from body)
       - Include key takeaways
       - Include tradeoffs/considerations
       - **Each topic section MUST end with `**Link:** [Title](URL)` line**
       - Include disclaimer at the end
       - **IMPORTANT**: Do NOT include any "Co-Authored-By" attribution lines - these scare readers
       - **IMPORTANT**: Do NOT include any "Generated with [Tool Name]" marketing lines - keep it clean and professional
   - Call `mcp__newsletter-ai__save_article` with generated content and newsletter name
   - Display: "✅ Saved article to [filepath]"

6. **Mark newsletters as processed**

   - Call `mcp__newsletter-ai__mark_newsletters_as_processed` with:
     - safeMode: true if "safe" keyword was in arguments
   - This marks emails as read and optionally deletes them (unless safe mode)
   - Display: "✅ Marked X newsletter(s) as read [and deleted Y]"

7. **Display summary**

   - Show list of all generated articles with file paths
   - **Show processed emails with subjects** (from mark_newsletters_as_processed result):
     - For each processed email, display: subject line (or pattern name if no subject), UID, and deletion status
     - Example format:
       - "📧 [DELETED] 'Your Weekly Newsletter - Nov 14' (UID: 87914)"
       - "📧 [READ ONLY] 'Tech Updates for Today' (UID: 87729)"
     - This helps identify which emails were deleted for potential recovery
   - Confirm save location
   - Display total time taken
   - If safe mode: Display reminder that emails were NOT deleted

8. **Commit and push**

   - Stage new articles: `git add news/`
   - Commit with descriptive message
   - Push to remote

**Important:**

- **Process automatically without user confirmation** - no prompts between steps
- Process newsletters one at a time (sequentially)
- Scrape articles in parallel when possible for speed
- Respect the user's specified limit
- Show clear progress indicators for each step
- Handle errors gracefully and continue with remaining newsletters/articles if one fails
- Skip articles that fail to scrape rather than stopping the entire process
- Do NOT mention `{NARRATOR_PERSONA}` or persona name in generated articles
