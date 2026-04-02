---
title: "Claude Code Source Leak: A Timeline of the Biggest AI Dev Tool Incident of 2026"
excerpt: "Anthropic accidentally shipped 512,000 lines of Claude Code source across 1,900 TypeScript files inside an npm package update, triggering DMCA takedowns, copyright debates, and a community deep-dive into AI agent architecture."
publishedAt: "2026-04-02"
slug: "claude-code-source-leak-timeline"
hashtags: "#kilocode #claudecode #ai #typescript #security #generated #en"
source_pattern: "Substac"
---

## Claude Code Source Leak: A Timeline

**TLDR:** On March 31, 2026, a debugging artifact accidentally included in Claude Code version 2.1.88 exposed 512,000 lines of TypeScript source to the public. The leak revealed unreleased features, internal model codenames, an "Undercover Mode," and anti-distillation mechanisms — and set off a cascading wave of DMCA takedowns, community analysis, and legal debate about AI copyright.

**Summary:**

It started with a single post on X from security researcher Chaofan Shou. A source map file — the kind developers use to translate minified production code back into readable TypeScript — had been accidentally bundled into Claude Code's public npm package update, version 2.1.88. That source map pointed directly to an unprotected zip archive on Anthropic's cloud storage. Anyone who knew where to look could download the entire codebase.

The root cause traces back to a known bug in Bun, the JavaScript runtime that Claude Code is built on. That bug, filed on March 11th and still open at the time of the incident, causes Bun to include source maps in production builds even when they should be excluded. The timing is worth noting: Anthropic acquired Bun in late 2025, meaning they owned the runtime with the known defect and shipped production code with it anyway. Anthropic described the incident as a "release packaging issue caused by human error, not a security breach," and confirmed no customer data or credentials were exposed.

What researchers found in those 512,000 lines was arguably more interesting than the leak itself. The codebase contained 44 unreleased feature flags covering autonomous background agents internally named KAIROS, multi-agent orchestration, voice commands, and browser control via Playwright. It contained internal model codenames — Capybara, Fennec, Numbat — mapped to specific Claude versions, along with performance benchmarks showing regression on a false-claims evaluation between releases. There was a three-layer memory system, an idle-time consolidation process called "autoDream," and 187 hardcoded spinner verbs for loading animations including "hullaballooing" and "razzmatazzing." Developer Wes Bos posted the full list to X, where it earned 374,900 views. And the code filtered out 25 swear words from randomly generated four-character IDs. Claude Code, apparently, has standards.

The finding that generated the most controversy was a module called undercover.ts, which tells Claude Code to strip AI attribution and Anthropic codenames from commit messages and pull request descriptions when contributing to public repositories. No Co-Authored-By lines. No mentions of Claude or Anthropic. On Hacker News, critics pointed to the explicit instruction to write commits "as a human developer would" and raised the question of AI impersonating human contributors in open source. Others pushed back, arguing the feature is primarily about preventing internal Anthropic project names and model identifiers from leaking into public git history — a legitimate operational concern. The name "Undercover Mode" does the feature no favors in that framing debate.

The community response was enormous. Shou's original post hit 32 million views on X. The main GitHub mirror accumulated 84,000 stars and 82,000 forks before DMCA takedowns began, with GitHub ultimately disabling over 8,100 repositories. Then developer Sigrid Jin used OpenAI's Codex to rewrite the entire TypeScript codebase in Python. The resulting project, claw-code, reached 50,000 stars in roughly two hours and stood at 105,000 at the time of publication. Gergely Orosz raised the central legal question: if AI rewrites TypeScript as Python, does copyright still apply? And if significant portions of the original codebase were themselves written by Claude Code — which contributor Boris Cherny has publicly stated — then AI-generated work carrying no automatic copyright under current US case law could complicate Anthropic's DMCA enforcement standing entirely. This leak also came just days after a CMS misconfiguration had exposed internal files about an unreleased model codenamed Mythos, with Fortune reporting the back-to-back incidents raised operational concerns ahead of a reportedly planned IPO. Markets had already reacted to the Mythos leak with cybersecurity stocks dropping sharply on March 27th.

**Key takeaways:**

- A Bun runtime bug (oven-sh/bun#28001, filed March 11) that serves source maps in production mode caused a source map to be included in Claude Code 2.1.88, pointing to a publicly accessible zip archive of the full codebase
- The leak exposed 44 unreleased feature flags, internal model codenames (Capybara, Fennec, Numbat), a three-layer memory system with idle-time consolidation called "autoDream," and anti-distillation mechanisms including fake tool injection into system prompts
- "Undercover Mode" (undercover.ts) strips AI attribution from commits and PRs on public repos — framed by critics as AI impersonation, framed by defenders as internal codename hygiene
- Only about 1.6% of the leaked code directly involves the AI model itself; the rest is orchestration: context management, memory, multi-agent coordination, tool handling, and permissions
- Developer Sigrid Jin used OpenAI's Codex to rewrite the codebase from TypeScript to Python in hours, raising unresolved questions about whether AI-translated code escapes copyright protection
- GitHub disabled 8,100+ repositories via DMCA; the Python rewrite claw-code hit 105,000 stars regardless
- This was Anthropic's second data exposure in under a week, following the Mythos model leak that rattled cybersecurity stocks

**Why do I care:**

From where I sit as a senior frontend developer, the architectural details in this leak matter more than the drama around it. The revelation that only 1.6% of Claude Code's codebase directly touches the AI model is a clarifying data point: the differentiated engineering work in agentic coding tools is in the orchestration layer, not the model calls. Context management, memory consolidation, multi-agent coordination, permission handling — that's where the real complexity lives, and this leak made that concrete rather than theoretical. The Undercover Mode controversy is worth taking seriously too, even if you accept the charitable interpretation. Any tool that has a code path explicitly designed to alter how it presents itself in public artifacts deserves scrutiny, and "we were hiding internal codenames" is a reasonable explanation that still doesn't resolve the underlying question of what else gets hidden and when. The anti-distillation mechanisms — fake tool definitions injected into system prompts to pollute competitor training data — are a fascinating arms race detail that signals where proprietary AI tooling is heading: deeper verification layers, cryptographic attestation, and deliberate poisoning of the API traffic that competitors might observe.

**Link:** [Claude Code Source Leak: A Timeline](https://blog.kilo.ai/p/claude-code-source-leak-a-timeline)
