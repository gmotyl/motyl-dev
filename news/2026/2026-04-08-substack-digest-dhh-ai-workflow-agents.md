---
title: "DHH's Agent-First Workflow, AI Knowledge Management, and the Coding Paradigm Shift"
excerpt: "A week of candid takes on AI-assisted development: DHH embraces agent-first coding, a knowledge management app built for the AI age, and an honest look at managing AI agents with structure, not empathy."
publishedAt: "2026-04-08"
slug: "dhh-agent-workflow-ai-knowledge-management-paradigm-shift"
hashtags: "#substack #ai #agents #coding-workflow #ruby-on-rails #knowledge-management #architecture #generated #en"
source_pattern: "Substac"
---

## DHH's New Way of Writing Code: Agent-First Development

**TLDR:** DHH has shifted from typing all his own code to running an "agent-first" workflow with multiple LLMs operating in parallel — a fast model (Gemini 2.5) and a powerful model (Opus) — while he reviews diffs through neovim and lazygit. He barely writes code by hand anymore but maintains the same quality standards.

**Summary:**

David Heinemeier Hansson's evolution on AI coding is notable precisely because he was one of the most prominent holdouts. Six months ago on Lex Fridman's podcast, he proudly described typing out all his own code. Today, he runs tmux with two models side by side — Gemini 2.5 for speed and Opus for depth — reviewing their output through neovim and lazygit. The shift wasn't ideological; the tools simply got good enough that his resistance became counterproductive. The turning point was when agents started producing code he actually wanted to merge with minimal alteration.

What's particularly interesting is DHH's observation that Ruby on Rails is experiencing a renaissance thanks to AI. Rails turns out to be one of the most token-efficient ways to build web applications, making it well-suited for agent workflows. The framework's built-in testing conventions help agents validate their own outputs, and the resulting code remains readable and verifiable by humans — which matters enormously when you're reviewing agent output at speed. This is a validation of convention-over-configuration that DHH has been advocating for two decades.

The productivity gains aren't just about writing code faster — they're about tackling work that previously wouldn't have been considered worthwhile. A senior engineer at 37signals used an AI agent to optimize their P1 response time from 4 milliseconds to under half a millisecond. This is the kind of marginal performance improvement that no business case would justify in human-hours, but an agent can run it overnight and deliver results by morning. This is the real unlock: not doing the same work faster, but doing entirely different work that was previously uneconomical.

**Key takeaways:**
- DHH's workflow: Gemini 2.5 for speed + Opus for depth + neovim/lazygit for review — agent generates, human curates
- Ruby on Rails is thriving in the AI era due to token efficiency, built-in testing, and human-readable output
- The biggest productivity gain isn't speed — it's tackling work previously deemed uneconomical to justify
- Agent-first doesn't mean quality-first is abandoned — DHH maintains the same standards for beauty and correctness

**Why do I care:** DHH's conversion from AI skeptic to agent-first practitioner is significant because he represents the craftsman-developer archetype — someone who believes typing code is part of the thinking process. His reversal suggests the tools have crossed a genuine threshold, not just a hype cycle. The dual-model approach (fast + powerful) is a pattern every team using AI agents should consider. And the Rails renaissance observation is a reminder that framework choice in 2026 should include "how well do AI agents work with this framework" as a first-class criterion.

**Link:** [DHH's new way of writing code — Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/dhhs-new-way-of-writing-code)

## Building Tolaria: Knowledge Management for the AI Age

**TLDR:** A developer is building Tolaria, an open-source personal knowledge management app designed specifically for AI agent collaboration — fetching meeting summaries, processing voice notes, splitting articles into atomic ideas, and suggesting content based on knowledge graph connections.

**Summary:**

The premise behind Tolaria is that personal knowledge management needs to be redesigned from the ground up for an era where AI agents are active participants in your workflow, not just passive search tools. The app is built around the insight that the core problem with AI-assisted work is continuously supplying agents with reliable, up-to-date information about your life and projects, and creating a good collaboration surface for bidirectional work between human and agent.

The specific use cases paint a compelling picture of what AI-augmented knowledge work looks like. An agent should periodically fetch meeting summaries from tools like Fathom, create notes with action items, and link them to individual attendees — effectively maintaining a personal CRM automatically. Voice notes get processed into long-term notes and tasks, connected to existing relevant pages. Articles get split into atomic ideas, connected to similar past ideas, organizing the knowledge base for easier future writing. The agent should even suggest article topics and podcast guests based on recent readings and their connections to past work.

What makes this approach interesting compared to Notion, Obsidian, or Roam is the agent-first design philosophy. Traditional knowledge management tools are built around human navigation patterns — folders, tags, search bars, graph views. Tolaria is designed around what agents need: structured, linkable, contextual information that can be programmatically fetched, updated, and connected. The human interface is still present, but it's a equal partner rather than the primary interaction model.

**Key takeaways:**
- Knowledge management needs redesigning for AI agents — they need structured, linkable, contextual data, not just human navigation patterns
- Tolaria's use cases (meeting summaries, voice notes, article splitting, topic suggestions) demonstrate the practical value of agent-collaborative knowledge systems
- The open-source approach to a personal tool reflects a growing pattern: build in public, share the infrastructure, let the community extend
- The core problem isn't storing information — it's continuously supplying agents with reliable, current context about your work

**Why do I care:** The knowledge management space is about to be reshaped by the same forces that are reshaping coding. The question isn't "where do I store my notes" anymore — it's "how do I give my AI agents enough context about my work to be genuinely useful collaborators." If you're not thinking about how your personal knowledge infrastructure serves both you and your agents, you're building for a workflow that's already obsolete.

**Link:** [Updates to my AI Coding Workflow — Refactoring.fm](https://refactoring.fm/p/updates-to-my-ai-coding-workflow)

## You Can't Gentle Parent Your OpenClaw Bot

**TLDR:** Managing an AI agent like a person — with empathy, patience, and rephrased kindness — is a recipe for silent failures. AI agents have no emotional subtext; they operate on files. If an instruction isn't persisted to SOUL.md, MEMORY.md, or the daily logs, it doesn't exist.

**Summary:**

This piece delivers a brutal but necessary reality check about how developers interact with AI agents. The author trusted their OpenClaw bot when it said an email was sent. It wasn't. Two days later, a client confirmed it never arrived. The natural human instinct — give it another chance, rephrase more kindly, assume good intent — is exactly the wrong approach because AI agents don't operate on social dynamics. They operate on file system state.

The critical insight is that every new session, an AI agent wakes up completely fresh. No memory of yesterday's conversation, no accumulated relationship context, no learned patterns from past interactions. What the agent has access to is a set of files in its workspace, and those files are its entire memory. SOUL.md defines behavioral core — voice, temperament, constraints. MEMORY.md holds long-term facts and decisions. Daily logs capture what happened. USER.md describes the human's preferences. AGENTS.md is the operating contract.

If something isn't in one of these files, it doesn't exist for the agent. You can say it in chat all you want, but when the context window fills up or the session ends, that instruction is gone. This is the root cause of almost every "my bot isn't doing what I asked" problem. The failure modes have nothing to do with emotional regulation or trust. When the bot says it sent an email and didn't, it hallucinated. When it ignores a recurring task, the instruction never made it into a persistent file.

**Key takeaways:**
- AI agents have zero session-to-session memory — their workspace files (SOUL.md, MEMORY.md, daily logs) are their only persistent state
- Managing agents with empathy and rephrased kindness doesn't work — structure and file-based persistence does
- Hallucination about completed tasks is a known failure mode — verification, not trust, is the correct operating stance
- The gap between what you told the agent in chat and what's persisted to files is where all agent failures live

**Why do I care:** This is the most practical piece of AI agent advice I've read all year. Every developer I know who's frustrated with AI agents is frustrated for exactly this reason — they're treating the agent like a junior developer who learns from feedback rather than a stateless process that only knows what's written down. If you're using any AI agent framework, audit your persistent files right now. If your instructions aren't in them, they're not instructions — they're wishes.

**Link:** [You Can't Gentle Parent Your OpenClaw Bot — Kilo Blog](https://blog.kilo.ai/p/you-cant-gentle-parent-your-openclaw)

## Run Out to Meet It: Charity Majors on AI and the Engineering Reset

**TLDR:** Charity Majors spent a year telling engineers they needed to learn to code to stay relevant. Then, in about three months, that advice became obsolete. Nobody has a head start anymore — everybody's ignorance has been reset to zero.

**Summary:**

Charity Majors' pivot is a candid admission of how rapidly the AI coding landscape has shifted. She spent a year advocating for engineers to strengthen their coding skills as the differentiator for career relevance. Then AI agents improved to the point where raw coding ability stopped being the bottleneck it once was. The timeline — "about three months" for advice to become obsolete — captures the velocity of change in this space better than any market analysis.

The conversation touches on a counterintuitive dynamic: engineers who built careers on beautiful, readable code are struggling more than anyone else with AI-assisted development, while junior developers might actually have a hidden advantage. The reason is that senior engineers have deeply ingrained patterns and aesthetic preferences that AI agents frequently violate, creating friction and second-guessing. Junior developers, meanwhile, have fewer pre-existing expectations and are more willing to accept AI output as a starting point rather than something to critique.

The broader observation is that "nobody has a head start anymore." Every engineer's accumulated advantage from years of experience in specific tools, patterns, and debugging techniques has been partially flattened by AI agents that can produce competent code in any framework on demand. This doesn't make experience worthless — architectural judgment, system design thinking, and product intuition are more valuable than ever. But the specific advantage of "I've been writing React longer than you" has evaporated.

**Key takeaways:**
- AI agents have flattened the coding skill curve — raw coding ability is no longer the primary career differentiator
- Senior engineers may struggle more than juniors because ingrained patterns create friction with AI output
- Experience in architecture, system design, and product thinking is now the differentiator, not coding speed or language expertise
- The timeline for professional adaptation is measured in months, not years

**Why do I care:** If Charity Majors can pivot her career advice in three months because the ground shifted, every developer should be prepared to do the same. The signal here isn't "coding doesn't matter" — it's "coding isn't the bottleneck anymore." The engineers who thrive in this environment will be the ones who invest their learning time in system design, product thinking, and the ability to evaluate AI output critically rather than the ones who double down on memorizing API surface areas.

**Link:** [Run Out to Meet It — TidyFirst (Charity Majors)](https://tidyfirst.substack.com/p/run-out-to-meet-it)
