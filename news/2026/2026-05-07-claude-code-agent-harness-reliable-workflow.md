---
title: "Building a Claude Code Agent Harness: Beyond Instructions to a Working System"
excerpt: "A practical breakdown of how to layer memory, hooks, parallel agents, and evaluation loops around Claude Code to build a genuinely reliable AI workflow."
publishedAt: "2026-05-07"
slug: "claude-code-agent-harness-reliable-workflow"
hashtags: "#aimaker #ai #agents #llm #productivity #workflow #dx #generated #en"
source_pattern: "AI Maker"
---

## How an Agent Harness Made My Claude Code Setup 10x More Reliable

**TLDR:** Adding a CLAUDE.md and a few commands to Claude Code is only the first step. The real reliability comes from building a harness around the model: persistent memory for repeated corrections, hooks for mechanical checks, parallel agents for distinct tasks, and a review layer before you ever look at the output.

**Summary:** The author starts from a frustration most people hit after their first few weeks of using Claude Code seriously. The initial setup works. Claude knows where files live, understands the project style, and produces output that is noticeably better than starting from scratch. Then it plateaus. The same voice mistakes come back. Different writing formats start bleeding into each other. Corrections that got made in one session disappear by the next. The instinct is to fix the instruction files, to add more rules and sharper wording to CLAUDE.md. That helps marginally, but it misses the deeper problem.

The insight here is that CLAUDE.md and memory serve genuinely different purposes. CLAUDE.md holds stable project rules: what the project is, where things live, what voice rules apply across all work. Memory, by contrast, holds the bruises. The specific corrections that only emerged from real use, the moments where the setup almost worked and missed something important. "When a LinkedIn post ends by restating the thesis, replace the recap with a sharper final punch" is not a rule someone would write in advance. It comes from watching the same failure repeat.

The author's framing of an "agent harness" is the useful conceptual move here. A harness is everything around the model: what it remembers, what it checks automatically, which task gets which context, and who reviews the output before it reaches the human. For the author's newsletter workflow, that means four distinct layers. Memory keeps corrections alive across sessions. Hooks run mechanical style checks even when the model forgets mid-task. Separate agents handle LinkedIn, Twitter threads, and Substack Notes in parallel without bleeding context between formats. And a review pass from another agent inspects the draft before the author spends any attention on it.

The parallel repurposing example is concrete in a useful way. One command kicks off three agents at once. Each gets its own context and its own format constraints. LinkedIn gets a rawer, sharper cadence. Notes stay short but inspiring. Twitter needs a single thread arc, not a compressed essay. Letting all three run from the same conversation would cause them to converge on the same voice, which defeats the purpose. The harness keeps them separated.

The weekly review section reveals the same pattern in a different domain. A command pulls Obsidian notes, checks annual goals against quarterly priorities, drafts next week's plan, and runs a review pass before the author sees it. What used to take an hour on a Sunday now takes a few minutes. The author is careful to note they still sanity check the priorities themselves. The harness doesn't remove the human. It means the human arrives at a better starting point.

**Key takeaways:**
- CLAUDE.md is for stable project rules; memory is for corrections discovered through actual use — they are not interchangeable
- Agent harnesses add four layers: persistent memory, automated hooks, context-isolated parallel agents, and evaluation loops
- Separating agents by task (LinkedIn vs. Twitter vs. Notes) prevents context bleed and keeps each format distinct
- The review layer is what turns "Claude generates a draft" into "Claude generates and inspects a draft before I look at it"
- Memory files live in a project-specific folder tied to the project path, not inside the project directory itself

**Why do I care:** This is the article I wish existed when I started trying to make Claude Code do something consistent. The jump from "Claude can do this" to "Claude reliably does this the same way every time" is not a prompt engineering problem. It is a systems problem. The harness framing is the right mental model: you are building infrastructure around the model, not just writing better instructions for it. For anyone doing serious content work, product documentation, or even code review automation with Claude Code, the four-layer pattern here translates directly. The memory type distinctions alone, separating stable rules from discovered corrections, will change how you structure these setups. The one thing the article skips is failure modes: what happens when memory accumulates contradictory corrections, or when a hook fires incorrectly. Those edge cases matter and they are left as an exercise for the reader.

**Link:** [How an Agent Harness Made My Claude Code Setup 10x More Reliable](https://aimaker.substack.com/p/claude-code-hooks-workflow)
