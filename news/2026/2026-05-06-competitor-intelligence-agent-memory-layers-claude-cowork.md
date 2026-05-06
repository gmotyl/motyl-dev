---
title: "Building a Competitor Intelligence Agent That Actually Remembers"
excerpt: "How a recurring AI agent with memory layers, context files, and structured logs changes content research from one-off queries into compounding editorial judgment."
publishedAt: "2026-05-06"
slug: "competitor-intelligence-agent-memory-layers-claude-cowork"
hashtags: "#aimaker #ai #agents #llm #prompt-engineering #architecture #ai #generated #en"
source_pattern: "AI Maker"
---

## What I Learned From Building Competitor Intelligence Agent

**TLDR:** Dheeraj Sharma built a competitor intelligence agent in Claude Cowork that scans a watchlist weekly, stores scan history, and generates ranked content gaps with editorial judgment baked in. The real story is not the scanning, it is the memory layer that lets each run build on the last.

**Summary:** Let me tell you what struck me most about this episode of the One Shot Show. The premise sounds simple enough: take the content research agent from episode one and make it recurring. But there is a subtle and genuinely interesting architectural leap buried in that description. The original agent was reactive. You gave it a topic, it returned a brief. Useful, but it reset to zero every single time. This new competitor intelligence agent flips that around entirely. It starts with a watchlist, not a question. It already knows the competitors, the creator's content pillars, what topics are off-limits, and what counts as a meaningful gap. That context transformation changes everything about the quality of output you get.

The architecture Dheeraj laid out has four practical layers. First, there is the tool layer, handling the actual web research. He moved from a combination of Perplexity, Firecrawl, and Jina AI toward Tavily as the primary connector. The reasoning here is solid: Tavily covers search, crawl, extract, map, and deeper research in one place. Fewer moving parts in a recurring system is almost always the right call. The second layer is knowledge, which includes corrections, scan history, patterns from previous runs, and lessons from past failures. The third is context, everything the agent knows about the creator: business goals, content pillars, audience, seasonal timing, the competitor list, and what constitutes a real opportunity versus noise. The fourth is the operating layer, which defines scan modes, output formats, cost guardrails, and when to update memory.

What I want to sit with for a moment is the memory problem, because I think it is the most underappreciated challenge in building agents that do research over time. More memory does not automatically produce better output. If your logs contain stale data, hallucinated conclusions, or bad recommendations that went unquestioned, the agent keeps building on top of that rotten foundation. Dheeraj's answer was practical and honest: use Git for version control on the agent folder. If memory files or logs get corrupted, you inspect the diff and roll back. That is not glamorous, but it is exactly the kind of discipline that separates an agent that works at week eight from one that degraded quietly by week three.

One of my favorite moments from the demo was when Dheeraj asked whether to write about solo women riders on Himalayan roads. A naive content tool would see the gap, call it an opportunity, and move on. This agent flagged that Dheeraj should not publish that guide without first-hand experience or a co-author who actually fits the topic. It connected the gap to credibility and reader trust before recommending any action. That is editorial judgment, not just keyword research. I want more agents that tell me what should not be written yet, not just what can be written.

The conversation about connector usage and token costs also deserves attention. One audience member asked about the cost of using MCP connectors versus local file access. The answer is that local file search stays relatively lean, but triggering MCP connectors, including Gmail, Calendar, Drive, or Notion, can consume tokens quickly because the model has to inspect tool schemas and process returned data. Dheeraj disabled every connector except Tavily for the demo run. That is the right approach. Agents get worse when they have too many irrelevant tools available. More surface area means more context consumed, slower decisions, and more opportunities to wander somewhere unhelpful.

**Key takeaways:**
- A recurring agent with a memory layer, context files, and logs is fundamentally different from a one-off research prompt: each run has access to what happened before
- The context files, business goals, competitor watchlist, content strategy, and editorial constraints, give the agent taste before it touches the web
- Fewer active connectors during a run is better for token efficiency and agent focus; turn on only what the current task needs
- Git version control for the agent folder is a practical safety net for catching corrupted memory before it poisons future runs
- Editorial judgment from an agent comes from knowing what should not be written, not just identifying gaps

**Why do I care:** As someone who thinks about content systems and architecture, the pattern here is directly applicable beyond travel blogs. The four-layer structure, operating brain, memory, context, and output, is a template for any domain where you need to track change over time rather than answer isolated questions. The move from "research this topic" to "what changed and what should I stop ignoring" is the same mental model I would apply to monitoring competitor releases in a software product, tracking recurring support complaints, or watching how API documentation evolves across tools I depend on. The memory layer is the lever. Get that right and the agent compounds. Get it wrong and you are just running expensive one-off queries with extra steps.

**Link:** [What I Learned From Building Competitor Intelligence Agent](https://aimaker.substack.com/p/claude-cowork-competitor-agent)
