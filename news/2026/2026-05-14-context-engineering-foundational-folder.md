---
title: "Context Engineering: The Folder That Replaces Your Bloated Prompts"
excerpt: "Why a /foundational folder of small, purpose-scoped files outperforms a giant CLAUDE.md, and how progressive disclosure stops your agent from giving generic answers."
publishedAt: 2026-05-14
slug: context-engineering-foundational-folder
hashtags:
  - "#aimaker"
  - "#ai"
  - "#claudecode"
  - "#contextengineering"
  - "#agents"
  - "#prompting"
  - "#generated"
  - "#en"
source_pattern: "AI Maker"
---

## Context Engineering: The Folder That Replaces Your Bloated Prompts

**TLDR:** The author argues that "context engineering" beats prompt engineering for serious agent work. Instead of stuffing rules, audience notes, voice, and product details into one bloated CLAUDE.md, you split the truth into small purpose-scoped files inside a /foundational folder and let the instruction file route the agent to the right slice for each task.

**Summary:** The post starts where a lot of us have landed: a new Claude Code session that gives a reasonable, useful, but disconnected answer. The model did not know which products existed, what audience pain had surfaced last week, or what the author was trying to avoid. So the advice sounded fine and missed the actual situation. That gap is the whole essay. It is not a prompt problem, it is a source-material problem.

The author's first instinct was the one most of us have. Paste in the products. Paste in the audience. Paste in the recent feedback. Paste in today's constraint. Prompts got longer, outputs got better, and every new chat rebuilt the world from scratch. Treating the prompt as the place where everything lives is the mistake. Karpathy's framing of "context engineering" gets quoted here, and I think it is the right framing. The real skill is filling the context window with the right material for the next step, not crafting a clever sentence on top of an empty model.

The proposed structure is one folder next to your instruction file. CLAUDE.md or AGENTS.md becomes a router. It tells the agent how to work and when to read each file. The /foundational folder holds the truth: audience, voice, decision rules, project context, principles, performance patterns, working preferences. The agent pulls only what the task needs. A LinkedIn hook reads audience and voice. A free-versus-paid decision reads decision rules. A product question reads audience, project context, and principles. The technique has a name, progressive disclosure, and it is the same instinct good frontend engineers apply to bundle splitting and lazy-loaded routes.

The goal is modest on purpose. The first answer is not supposed to be final. It is supposed to start closer to the real situation so the review loop gets cheaper. Most AI work is iterative anyway: ask, review, correct, sharpen, ask again. If the first draft starts generic, every cycle costs more. If it starts close, you spend your time on the part only you can do, which is noticing what feels wrong and updating the source material so the next answer starts stronger.

**Key takeaways:**
- Move stable truth out of the prompt and into versioned files the agent can read on demand.
- Keep CLAUDE.md or AGENTS.md as a thin router that tells the agent which file to load for which task.
- Split source material by concern: audience, voice, decision rules, project context, principles, patterns, working style.
- Apply progressive disclosure so each prompt only sees the slice it needs, not your entire belief system.
- Update the folder from real friction during work, not from a calendar-driven monthly review you will skip.

**Why do I care:** As a senior frontend dev this maps cleanly onto patterns I already trust. A bloated CLAUDE.md is the same anti-pattern as a single global state blob or a megabyte first-load JS bundle. You pay for it on every interaction, even the ones that do not need it. Splitting context by responsibility and routing per task is what we do with code-split routes, scoped CSS, and React Server Components. The instruction file as router, foundational files as data, prompt as the actual task, that separation is the agent equivalent of presentation, data, and behavior. If you are building anything serious on top of Claude Code, Cursor, or Codex, treat your context like production code: small files, clear ownership, lazy-loaded, evolved from real usage. The teams that win at agent workflows in 2026 will not be the ones with the cleverest prompts. They will be the ones whose repos teach the agent what is true.

**Link:** [The Complete Guide to the Context Folder That Changed How I Work With AI Agents](https://aimaker.substack.com/p/ai-context-management-guide)
