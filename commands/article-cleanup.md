Clean up an article draft.

## Source

1. If `articles/art.md` exists, use it as the draft.
2. Otherwise, ask the user to paste the draft (markdown, with or without frontmatter). Save what they paste to `articles/art.md`, then continue.

## Cleanup steps

Apply to the draft, in order:

1. **Translate to English** — detect the draft's language. If it isn't English, translate the full body (and frontmatter `title`/`excerpt` if present) into natural, idiomatic English while preserving voice, code blocks, links, and markdown structure verbatim. Skip this step if the draft is already in English.
2. **Rename file by slug** — read the `slug` from frontmatter (or derive a kebab-case slug from the H1 title if missing). Move `articles/art.md` → `articles/<slug>.md`. If the target already exists, ask before overwriting.
3. **Add external resource links** — turn inline mentions of tools, products, papers, libraries, services, or people into proper markdown links to their canonical home (official site, docs, GitHub, paper URL). Don't invent URLs — only link when you're confident of the canonical destination.
4. **Append a newsletter CTA** — at the very end of the article, add a single line:

   ```
   #newsletter-cta('<title>', '<description>')
   ```

   Tailor `title` (short hook, ~3–6 words) and `description` (one sentence promising what the reader gets) to the article's topic.

## Report

End with: final filename, count of links added, and the CTA you chose.
