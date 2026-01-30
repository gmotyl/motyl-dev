---
title: "Inside Craft's AI-First Transformation: From Terminal to Visual Agents"
excerpt: "How a five-year-old startup rebuilt their entire workflow around AI agents, with non-engineers becoming the heaviest users."
publishedAt: "2026-01-27"
slug: "craft-ai-first-transformation-visual-agents"
hashtags: "#substack #ai #agents #startup #productivity #dx #architecture #engineering #open-source #generated #en"
---

## Inside a Five-Year-Old Startup's Rapid AI Makeover

**TLDR:** Craft Docs founder spent his Christmas break building a visual UI on top of Claude Code, creating "Craft Agents" - an open-source tool that transformed how the entire company works. Non-engineers became the heaviest users, automating customer support, marketing, and HR workflows that previously required developer involvement.

The story of Craft's AI transformation is fascinating not because they jumped on the AI bandwagon, but precisely because they resisted doing so for years. This is a company that launched their AI assistant two days before ChatGPT in 2022, yet consciously avoided shipping what they called "gimmick" features. They watched Microsoft's Copilot roll-out become associated with "uselessness" and decided they would wait until they had a genuine "wow" moment before going all-in.

That moment came in stages. First, there was the shape recognition feature - a highly requested capability that the founder estimated would take weeks to implement. Using GPT-4o, he built it in a day. That was the proof point that AI could deliver features they simply couldn't have shipped otherwise. But the real transformation came during Christmas 2025, when Balint Orosz decided to build something more ambitious: a visual interface for Claude Code that would be accessible to non-technical team members.

Here's what makes this story worth paying attention to: the heaviest users of Craft Agents aren't developers. They're customer support, marketing, and HR. The customer support team built parallel agents that triage tickets in batches, automatically cross-reference bug reports against the source code, and draft ready-to-send responses. Marketing built entire web pages without engineering involvement. HR automated Hungarian age-based holiday allocations through a Bamboo HR plugin. Finance built a tool that matches Revolut transactions with Slack invoice posts.

The technical architecture reveals some clever thinking. Data sources connect to agents through a concept of "Sources" - APIs, databases, MCP servers - but Craft Agents hijacks the requests to inject credentials without the agent ever having access to sensitive information. There's a three-tier permissions system: Explore (readonly), Auto (can write without confirmation), and Ask to Edit (requires approval). Most sessions start in Explore mode by default.

For architects and team leads, there are several patterns worth examining here. First, the progression from terminal-based tools to visual interfaces unlocked adoption across the entire organization. The terminal wasn't "wrong" - developers were fine with it - but it created an artificial barrier to non-technical users who could benefit enormously from the same capabilities. Second, the skills system (similar to Claude Code's skills) allows teams to codify workflows with specific data sources, required outputs, and step-by-step instructions. These become reusable templates that maintain consistency while allowing AI flexibility in execution. Third, the open-source release under Apache 2.0 has already spawned "remixing" - users instructing the agent to modify its own code to add features like project organization and drag-and-drop.

The implications for engineering organizations are significant. The customer support lead reports that tickets that took 20-30 minutes now take 2-3 minutes, but more importantly, they can process far higher volumes through parallel execution. The team built six major skills in just two weeks. Bug escalation to engineering has dropped dramatically because the agent can check code paths and determine if something is actually a code issue. This isn't replacing people - it's dramatically expanding what non-technical team members can accomplish independently.

**Key takeaways:**
- Non-engineers can become the heaviest users of AI coding tools when given appropriate interfaces
- Three years of AI experimentation with no "stickiness" taught Craft to wait for genuine value before shipping
- Visual interfaces unlock adoption that terminal-based tools cannot achieve
- Permissions systems (readonly/auto/ask-to-edit) are essential for production use
- Skills and workflows codify institutional knowledge into reusable AI templates

**Tradeoffs:**
- Visual UI increases accessibility but adds maintenance overhead compared to pure terminal solutions
- Auto mode enables speed but sacrifices the safety of human review
- Open-sourcing enables community remixing but fragments control over the product direction

**Link:** [Inside a five-year-old startup's rapid AI makeover](https://newsletter.pragmaticengineer.com/p/ai-first-makeover-craft)

---

*The content above is AI-generated based on newsletter sources. While I strive for accuracy, please verify critical information from original sources.*