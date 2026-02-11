---
description: Generate newsletter articles and output a text summary for audio/external use
allowed-tools: ["mcp__newsletter-ai__*", "Task"]
argument-hint: [limit] [pattern]
---

This command works exactly like `/generate-news` but adds a structured text summary at the very end, designed to be consumed by an external agent (e.g. OpenClaw) for audio generation and Discord posting.

## Full workflow

Execute the entire `/generate-news` workflow as documented (parse args, check mailbox, prepare, batch process, mark processed, commit & push).

Use the same arguments, logic, batching (3 parallel), error handling, and all rules from `/generate-news`.

## Additional final step: Output summary

After the commit & push step, output a clearly delimited summary block:

```
===SUMMARY_START===
ARTICLES_COUNT: [number of successfully generated articles]
FAILED_COUNT: [number of failed newsletters]

TOP_HEADLINES:
- [headline 1 from generated article]
- [headline 2 from generated article]
- [headline 3 from generated article]
(up to 5 most interesting headlines)

BRIEF:
[2-4 sentences in Polish summarizing today's most interesting news topics. Written in a natural, conversational tone suitable for text-to-speech. Mention specific technologies, trends, or notable events covered.]

ARTICLES:
- [filename1.md]: [article title]
- [filename2.md]: [article title]
...
===SUMMARY_END===
```

**Important:**
- The BRIEF should be in Polish and sound natural when read aloud
- Keep the BRIEF concise (2-4 sentences max)
- TOP_HEADLINES should highlight the most noteworthy items across all generated articles
- The summary block MUST be the very last output, after all other status messages
- If no articles were generated successfully, still output the block with ARTICLES_COUNT: 0 and an appropriate BRIEF
