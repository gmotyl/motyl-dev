---
description: Generate newsletter articles from mailbox
allowed-tools: ["mcp__newsletter-ai__*", "Task"]
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

## Body-Only Newsletters

Some newsletters use tracking URLs that cannot be resolved to actual article content. For these newsletters, skip link extraction entirely and use the newsletter body directly.

**Newsletters that should use body-only mode:**

- `The Batch` - All links are deeplearning.ai tracking URLs that don't resolve to article content

When processing these newsletters:

1. Skip calling `mcp__newsletter-ai__get_newsletter_links`
2. Skip the article scraping step entirely
3. Go directly to `mcp__newsletter-ai__get_newsletter_body`
4. Use the body content for article generation

**Workflow:**

**IMPORTANT: Track which newsletters are actually processed (either used for article generation OR deemed useless/promotional) to avoid marking all prepared newsletters as processed/deleted**

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

5. **Batch parallel processing**

   BATCH_SIZE = 3 (process 3 newsletters at a time)

   Split newsletters into batches of 3:

   For each batch:

   a) Display: "Processing batch X/Y (3 newsletters in parallel)..."

   b) Spawn 3 subagents in parallel (single message with 3 Task tool calls):
      - Each Task call: subagent_type="general-purpose"
      - Each Task prompt includes complete workflow instructions with:
        - Newsletter data: UID, name, hashtags, body-only flag detection
        - Config: narratorPersona, outputLanguage
        - Full prompt template content
        - Complete detailed workflow instructions

      Each subagent should execute:
      1. **Detect body-only mode**: If newsletter name contains "The Batch", skip link extraction
      2. **Link extraction** (if not body-only):
         - Call `mcp__newsletter-ai__get_newsletter_links(uid)` to get links
         - For each link: Call `mcp__newsletter-ai__scrape_article(url)` (in parallel if possible)
         - Track successfully scraped articles
      3. **Fallback to body** (if all links failed OR 0 links OR body-only mode):
         - Call `mcp__newsletter-ai__get_newsletter_body(uid)`
         - If available: Use body content; Extract URLs from body for **Link:** entries
         - If unavailable: Return error status
      4. **Generate article content**:
         - Replace `{NARRATOR_PERSONA}` with provided narratorPersona value
         - Replace `{OUTPUT_LANGUAGE}` with provided outputLanguage value
         - Replace `{NEWSLETTER_CONTENT}` with scraped articles or newsletter body
         - Generate markdown with:
           - Frontmatter: title, excerpt, publishedAt, slug, hashtags
           - TLDR section
           - Detailed summaries per topic
           - Key takeaways
           - Tradeoffs/considerations
           - Each topic ends with `**Link:** [Title](URL)`
           - NO Co-Authored-By lines
           - NO Generated-with lines
      5. **Save article**:
         - Call `mcp__newsletter-ai__save_article(content, newsletterName)`
         - Return filepath
      6. **Return result in exact format**:
         ```
         STATUS: success
         UID: [uid]
         FILEPATH: [filepath]
         ```
         Or on error:
         ```
         STATUS: error
         UID: [uid]
         ERROR: [error message]
         ```

   c) Wait for all subagents in batch to complete

   d) Parse each subagent output:
      - Extract STATUS, UID, FILEPATH, ERROR using string matching
      - If STATUS=success:
        - Add UID to processedUids array
        - Add FILEPATH to savedArticles array
        - Display: "✅ Saved: {FILEPATH}"
      - If STATUS=error:
        - Add UID to failedUids array
        - Display: "❌ Failed (UID {UID}): {ERROR}"

6. **Mark processed newsletters as read/deleted**

   - Only pass successfully processed UIDs (from processedUids array, not failedUids)
   - Call `mcp__newsletter-ai__mark_newsletters_as_processed` with:
     - uids: processedUids (array of successful UIDs only)
     - safeMode: true if "safe" keyword was in arguments
   - This marks processed emails as read and optionally deletes them (unless safe mode)
   - Display: "✅ Marked X newsletter(s) as processed"
   - Show processed emails with subjects and deletion status if available

7. **Display summary**

   - Show all generated articles with file paths
   - If failedUids.length > 0:
     - Display: "Failed newsletters: X"
     - List failed newsletter names and error reasons
   - Display total newsletters processed (successful + failed)
   - Display total time taken
   - If safe mode: Remind that emails were NOT deleted

8. **Commit and push**

   - Stage new articles: `git add news/`
   - Commit with descriptive message
   - Push to remote

**Important:**

- **Process automatically without user confirmation** - no prompts between steps
- Process newsletters in batches of 3 using parallel subagents
- Each subagent handles full workflow (scrape + generate + save)
- Continue if individual newsletter fails (error isolation)
- Scrape articles within each newsletter in parallel when possible
- Respect the user's specified limit
- Show clear progress indicators for each batch and newsletter
- Handle errors gracefully - only successful UIDs marked as processed
- Skip articles that fail to scrape rather than stopping the newsletter
- Do NOT mention `{NARRATOR_PERSONA}` or persona name in generated articles
