---
title: "Building a Content Research Agent with Claude Code"
excerpt: "How a three-layer architecture of tools, context profiles, and a plain-English agent file turns hours of manual research into a four-minute automated run."
publishedAt: 2026-03-15
slug: building-content-research-agent-claude-code
hashtags:
  - "#substack"
  - "#claude"
  - "#ai-agents"
  - "#mcp"
  - "#automation"
  - "#content-strategy"
  - "#llm"
  - "#developer-tools"
  - "#generated"
  - "#en"
---

## We Went Live on Substack and Built a Research Agent Using Claude Code

**TLDR:** A live Substack series called One Shot Show demonstrated how to build a content research agent using Claude Code that replaces three hours of manual research with a four-minute automated run costing less than ten cents. The key insight is structuring your business context as persistent markdown files so the agent already knows who you are before you ask it anything.

**Summary:**

The first episode of One Shot Show, a new live series where AI builders walk through real systems they have built, featured a deep dive into a content research agent constructed entirely with Claude Code. The agent takes a topic, scrapes competitor content, pulls research from multiple sources, and delivers a complete research brief with content angles, SEO gaps, and strategic recommendations. What makes it interesting is not the tools themselves but the architectural thinking behind how they are composed.

The system follows a three-layer architecture. The first layer is the tooling layer, connecting three external services through a single MCP configuration file. Perplexity handles AI-powered web search, Firecrawl manages competitor page scraping, and Jina Reader serves as a free fallback when paid credits run out. This redundancy means the agent does not simply stop working when a service limit is reached, which is the kind of pragmatic design that separates daily-use systems from weekend demos.

The second layer, and arguably the most valuable, is the context layer. Three markdown files stored in a dedicated directory describe the business context, content strategy, and competitor watchlist. These files are written in plain English and are read by the agent before every session. This is what transforms the interaction from a chatbot pattern, where you re-explain everything in a long prompt each time, into an agent pattern where the system already holds persistent awareness of who it serves and what matters.

The third layer is a single agent file with YAML frontmatter and a system prompt that ties everything together. It tells the agent how to behave, which tools to use, and how to structure its output. The entire setup consists of five files, requires no code, and takes roughly thirty minutes to configure from scratch.

A particularly practical detail is the built-in cost control. The agent caps Perplexity API calls at three per research session, a constraint born from real experience with runaway credit consumption. This kind of operational discipline is rarely discussed in tutorials but is exactly what determines whether a system survives past its first week of use.

**Key takeaways:**

- The shift from chatbot to agent thinking means writing your context once in persistent files rather than re-prompting every session
- A three-layer architecture of tools, context profiles, and an agent file can be set up in about thirty minutes with no code
- Having a free fallback tool like Jina Reader prevents the agent from breaking when paid service credits run out
- Cost controls such as capping API calls per session are essential for building systems you actually use daily
- The same tools and agent file produce completely different results depending on the context profiles, making personalization the true differentiator

**Why do I care:** As a senior frontend developer or architect, you are likely already using AI assistants for research and content work, but probably in the chatbot pattern of writing detailed prompts from scratch each session. This three-layer approach of separating tools, persistent context, and agent behavior into plain files is a composable architecture pattern that scales beyond content research. The MCP configuration approach for tool integration, the idea of context profiles as a form of application state, and the cost-control discipline are all directly transferable to any agent-based workflow you might build for your team or product.

**Link:** [We Went Live on Substack and Built a Research Agent Using Claude Code. Here's What I Learned.](https://aimaker.substack.com/p/ai-agent-vs-chatbot-content-research-agent?publication_id=4443372&post_id=190511819&play_audio=true&triedRedirect=true)