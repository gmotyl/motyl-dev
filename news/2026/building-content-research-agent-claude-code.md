---
title: "Building a Content Research Agent with Claude Code in Under 30 Minutes"
excerpt: "A practical guide to building a plain-English AI research agent using Claude Code, MCP servers, and business context files that turns a 7-word prompt into a full research brief."
publishedAt: "2026-03-12"
slug: "building-content-research-agent-claude-code"
hashtags: "#wyndo #claude-code #agents #mcp #content-research #workflow #generated #en"
---

## Building a Content Research Agent with Claude Code -- No Coding Required

**TLDR:** Wyndo and Dheeraj Sharma demonstrate how to build a Claude Code research agent using three layers -- MCP servers for web search and scraping, business context files that teach the agent your brand and audience, and a plain-English agent markdown file. The result turns a 7-word prompt into a structured research brief in under 4 minutes.

**Summary:**

Here is the thing about research workflows that nobody wants to admit: most of us are terrible at them. You open Perplexity in one tab, ChatGPT in another, copy some competitor URLs into a third tool, and by the time you have synthesized anything useful, you have context-switched ten times and you have not written a single word. That is the problem Wyndo and Dheeraj Sharma tackle head-on in the first episode of their "One Shot Show" live series on Substack.

The architecture they present is genuinely elegant in its simplicity. Three layers, and not a single line of traditional code required. The first layer is MCP servers -- specifically Perplexity for AI-powered web search with citations, Firecrawl for reliable competitor page scraping, and Jina AI as a free backup scraper. The second layer is where it gets interesting: business context files stored in a `.claude/research-profiles/` directory. These are plain markdown files describing who you are, your content strategy, and your competitor landscape. The third layer is an agent markdown file -- 163 lines of plain English that tells Claude how to behave, what tools to use, and critically, how to manage costs.

What makes this approach genuinely different from the dozen other "build an AI agent" tutorials floating around is that business context layer. Without it, you are just building a glorified search wrapper. With it, the agent already knows your niche, your audience avatars, your brand voice, and your competitors before it executes a single query. Dheeraj demonstrated this live by typing just seven words -- "Do me research on Ladakh bike trip 2026" -- and the agent produced a full research brief with competitor gap analysis, SEO opportunity assessment, and a recommended content angle in about three to four minutes. That is not hypothetical productivity gain. That is a concrete before-and-after.

Now, let me push back on a few things the authors gloss over. First, the claim of "no coding required" deserves an asterisk. Yes, the agent file is plain English markdown, but you still need to configure a `.mcp.json` file with API keys, understand what MCP servers are, and navigate Claude Code's terminal interface. For someone who has never touched a terminal, "no coding" is still a stretch. Second, the cost optimization story is more nuanced than presented. Dheeraj admits he burned twenty dollars in credits early on because the Sonar Deep Research model was running on every query. The solution -- capping Perplexity at three calls per session and duplicating cost rules at the top and bottom of the agent file -- works, but it highlights a broader fragility. You are one misconfiguration away from draining your API budget. That is worth acknowledging more prominently than a passing anecdote.

For architects and teams thinking about applying this pattern, the three-layer architecture is the real takeaway here. The separation between tools (MCP servers), context (business profiles), and behavior (agent files) is a pattern that scales well beyond content research. You could build a technical SEO agent, a YouTube research agent, or a content verification agent using the exact same structure. The key insight is that context files are what differentiate a useful agent from a generic one. If your team is building internal AI tools, invest the time in creating rich context documents before you optimize the agent logic. The context is the competitive moat, not the tooling.

**Key takeaways:**
- The three-layer architecture (MCP servers, business context files, agent markdown) is a reusable pattern for building any type of research agent, not just content research
- Business context files are the differentiator that turns a generic AI wrapper into a brand-aware research assistant -- invest time here first
- Cost optimization rules must be explicit and redundant in the agent file; without them, a single research session can drain API credits unexpectedly
- Short intent prompts (seven words) outperform long detailed prompts when the agent already has access to rich context files
- Use Sonnet instead of Opus for research execution tasks -- equal capability at lower token cost; reserve Opus for creative or complex planning work

**Tradeoffs:**
- Gain workflow integration and project-local outputs but sacrifice the depth of dedicated Deep Research tools like Gemini or Perplexity Sonar Deep Research
- Gain cost control through batched queries and call caps but sacrifice thoroughness when complex topics need more than three search calls
- Gain zero-code agent setup through plain English markdown but sacrifice fine-grained programmatic control over agent behavior and error handling

**Link:** [Building Content Research Agent in 30 Mins Using Claude Code](https://open.substack.com/live-stream/127278)
