---
title: "How I Migrated Hundreds of Pages Without Losing My Mind"
excerpt: "A two-week documentation migration from Docusaurus to Next.js with Markdoc, powered by methodical planning and 810 redirect rules."
publishedAt: "2026-03-28"
slug: "migrating-docs-without-losing-your-mind"
hashtags: "#substack #nextjs #documentation #architecture #dx #workflow #ai #generated #en"
source_pattern: "Substac"
---

## How I Migrated Hundreds of Pages Without Losing My Mind

**TLDR:** The author migrated Kilo's documentation from Docusaurus to Next.js with Markdoc over two weeks, writing 810 redirect rules and reorganizing hundreds of pages with remarkably few broken external links. The secret weapon was treating the migration like an AI-assisted coding task — Research, Plan, then Implement — and not skipping any of those phases. The bonus outcome was an LLM-friendly docs site with machine-readable endpoints baked in from day one.

**Summary:** There's something almost meditative about writing 810 redirect rules. Not because the work is interesting — it absolutely is not — but because the sheer tedium of it is the proof that you actually did your homework. Most migrations fail not in the implementation phase but in the planning phase that never really happened. The author didn't just move files from one framework to another; they catalogued what existed, identified overlapping content, filled gaps in the information architecture, and only then started touching code. That ordering matters more than any technical choice along the way.

What's worth sitting with here is the framing: the same Research-Plan-Implement pattern used for AI-assisted coding tasks turns out to be a solid framework for humans doing infrastructure work too. That's either obvious in retrospect or quietly profound, depending on your mood. The author is essentially arguing that the discipline we're trying to teach AI agents — don't jump to implementation, do your research first, have a checklist — is discipline we've been bad at ourselves for years. Migrations are boring, so humans declare victory too early. Checklists prevent that. The boring part is the feature.

The move away from Docusaurus wasn't dramatic or ideological. The team had already built their marketing site and blog on Next.js, so running two separate React frameworks for adjacent content was pure maintenance overhead. Markdoc was chosen specifically for being less magical than MDX — explicit tags over implicit React component resolution, markdown in, pages out. Less framework cleverness means fewer surprises when the next person touches it. That's a tradeoff worth naming: you give up some expressiveness in exchange for predictability, and for documentation infrastructure that's almost always the right call.

The LLM-friendly docs angle is the sleeper hit of this piece. Adding a structured index endpoint, a raw markdown API, and a "copy to markdown" button aren't headline features, but they reflect a real shift in how documentation gets consumed. AI assistants are increasingly the first stop for developers trying to understand an API or debug a workflow. If your docs aren't machine-readable, you're invisible to that query path. Building those endpoints into the migration rather than retrofitting them later is exactly the kind of decision that looks obvious only after someone else does it first.

The link checker running in CI is the part most teams skip and then regret. A migration of this scale is a one-time event, but the docs site keeps accumulating content from multiple contributors afterward. Catching broken links on every PR that touches docs is infrastructure that pays compounding returns. It's the kind of unglamorous tooling decision that separates a docs site that degrades gracefully over time from one that quietly fills up with 404s nobody notices until a customer complains.

**Key takeaways:**
- Mapping every existing page to a target destination before writing a single line of migration code — a literal spreadsheet with old URLs, content summaries, and new destinations — is what keeps a large migration from becoming an archaeological dig halfway through.
- LLM-readable documentation endpoints (structured indexes, raw markdown APIs) are becoming table stakes for developer-facing products, and they're far cheaper to build during a migration than to retrofit afterward.
- Automated link checking in CI is not a nice-to-have; it is the mechanism that prevents a successful migration from slowly rotting back into a broken state as the team adds content over the following months.

**Why do I care:** Documentation infrastructure is code, and it deserves the same rigor we apply to application code. What this article gets right — and what most engineering teams still get wrong — is that a migration is not a copy-paste operation. It is an audit, a redesign, and an implementation, in that order. The Research-Plan-Implement framing is deceptively simple but I have watched enough "quick migrations" spiral into months of cleanup to know that skipping the research phase is how you accumulate technical debt in your docs the same way you accumulate it in your codebase. The redirect list is not busywork. The redirect list is the migration. Everything else is just file moves.

**Link:** [How I Migrated Hundreds of Pages Without Losing My Mind](https://blog.kilo.ai/p/migrating-docs-without-losing-your-mind)