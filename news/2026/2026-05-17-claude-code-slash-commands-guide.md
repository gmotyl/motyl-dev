---
title: "Claude Code Slash Commands: A Practical Guide to Steering Your AI Sessions"
excerpt: "A comprehensive walkthrough of Claude Code's slash command system, from built-in session controls to custom skills that compound value over time."
publishedAt: "2026-05-17"
slug: "claude-code-slash-commands-guide"
hashtags: "#ai #agents #engineering #claudecode #developer-tools #productivity #generated #en"
source_pattern: "AIForDev"
---

## Claude Code Slash Commands Guide

**TLDR:** Claude Code slash commands are direct control signals for the tool itself, not prompts for the AI. This guide covers the four command categories, session management patterns, and how custom skills become the real leverage point for teams that invest in them.

Most people stumble onto slash commands by accident. You type a forward slash, a menu appears, you pick something, and it works. That accidental discovery is fine for occasional use, but it leaves a lot on the table. The commands aren't just shortcuts. They're a separate interface layer, and understanding the distinction between what they do versus what prompting does changes how you think about running sessions.

Where natural language tells Claude what to build, slash commands control the tool itself. Compressing context, switching models, locking down permissions, triggering predefined workflows. These are operational controls. The analogy I keep coming back to is the difference between telling a pilot where you want to go versus knowing how to operate the instrument panel. You need both.

There are four categories worth understanding. Built-in commands like `/help`, `/clear`, and `/model` are hardcoded into the CLI and run fixed logic. Bundled skills like `/debug`, `/simplify`, `/batch`, and `/loop` ship with Claude Code but are prompt-based — they hand Claude a detailed playbook and let it orchestrate the work. User skills are ones you define in `.claude/skills/` or `~/.claude/skills/`. And MCP and plugin commands are exposed by external servers, namespaced like `/mcp__github__list_prs`. One important terminology note: custom slash commands have been merged into skills. Files in `.claude/commands/` still work, but `.claude/skills/<name>/SKILL.md` is the recommended approach, and when a skill and a legacy command share the same name, the skill wins.

Session and context management is where most daily command usage lands. `/compact` compresses conversation history into a summary to free up context window space. You can pass an instruction alongside it, something like "preserve decisions, final approach, and any TODOs." The right habit is to compact proactively at logical milestones, not when the context is already full. By then the summaries get messy because Claude is already degraded. `/clear` is the hard reset: it wipes conversation history entirely, though file edits from the session stay on disk. The distinction between these two matters. Compact keeps Claude oriented on what happened; clear starts fresh with no memory of the session at all. `/rewind` rolls code and conversation back to an earlier checkpoint, and rather than arguing a session back to the right answer, rewinding and re-prompting is almost always faster.

The `/diff` command opens an interactive diff viewer showing everything that changed during the session. You can toggle between a full git diff and per-turn diffs, and navigate files with arrow keys. The per-turn view is particularly useful for tracing when a specific change happened. Running it after a series of edits, and always before committing, should become a reflex. `/review` runs a deeper read-only pass looking for bugs, style issues, performance problems, and missing tests. You can scope it: "focus on security issues only" or "check the database query performance." `/security-review` is a focused pass for SQL injection, cross-site scripting, exposed credentials, and insecure configurations, and it belongs in your workflow before touching anything user-facing.

Custom skills are where the real leverage lives, and the article is direct about the fact that most teams are underusing them. A skill is a SKILL.md file with optional YAML frontmatter and markdown instructions. The filename or name field becomes the slash command; the markdown becomes the prompt Claude sees when you invoke it. A few things in the frontmatter matter significantly. The description field is what Claude uses to decide whether to load a skill automatically, so front-loading the key use case is important since it gets truncated at 250 characters. `disable-model-invocation: true` means only you can trigger it, so Claude won't decide on its own that now is a good time to deploy. `allowed-tools` grants specific bash patterns without per-use approval while the skill is active. The `$ARGUMENTS` variable captures whatever follows the command name, and you can also access positional arguments for skills that take multiple distinct inputs.

**Key takeaways:**
- Slash commands are a separate control interface from prompting, not just shortcuts
- Compact proactively at logical milestones, not when the context window is already full
- Skills live in `.claude/skills/<name>/SKILL.md` and supersede legacy commands in `.claude/commands/`
- The `disable-model-invocation: true` frontmatter field prevents Claude from auto-triggering sensitive skills like deploy
- `/diff` before committing and `/review` before merging should be reflexive habits
- Subagents via `/agents` keep verbose work out of your main session context
- `/help` is always authoritative since commands ship and rename frequently

**Why do I care:** As a senior frontend developer, the part that changes my workflow most is the custom skills system. The ability to define a `/review` or `/security-review` scope specific to my team's conventions, pin it to the repository, and have every team member get that context automatically, that's the kind of tooling investment that pays back constantly. The observation that most teams are underusing skills rings true. Writing a SKILL.md file feels like overhead until you've run a well-tuned one a dozen times and realized you've stopped manually specifying the same constraints on every prompt. The advice to treat skills as code, review them in pull requests, and refine descriptions over time, is the correct mental model. These are not one-shot prompts. They're interfaces.

**Link:** [Claude Code Slash Commands Guide](https://aifordevelopers.substack.com/p/claude-code-slash-commands-guide)
