---
title: "How Uber Uses AI for Development: Inside Their Agentic Engineering Stack"
excerpt: "An inside look at how Uber built an AI-powered development platform with MCP gateways, background agents, and internal tooling that has 92% of their engineers using agents monthly."
publishedAt: "2026-03-10"
slug: "how-uber-uses-ai-for-development-inside-look"
hashtags: "#pragmatic-engineer #ai #developer-experience #architecture #generated #en"
---

## How Uber Uses AI for Development: Inside Look

**TLDR:** Uber has built a comprehensive internal AI development platform spanning MCP gateways, background agent infrastructure called Minion, and specialized tools for code review and test generation. With 92% of devs using agents monthly and 31% of code now AI-authored, the company offers a candid look at both the wins and the real challenges of scaling AI across engineering, including a 6x cost increase since 2024.

**Summary:**

This is one of those deep dives that actually pulls back the curtain instead of just waving at it. At the recent Pragmatic Summit in San Francisco, Uber's principal engineer Ty Smith and engineering director Anshu Chada walked through the full stack of how Uber has integrated AI into its software development process. And what's refreshing here is the honesty. They don't just talk about the wins; they talk about what's hard, what's expensive, and what adoption actually looks like when you're trying to move almost 3,000 engineers onto new workflows.

Uber's approach is structured around what they call an "agentic system" made up of several layers: an internal AI platform built on their existing Michelangelo ML infrastructure, context sources like source code and Slack and JIRA, industry tools like Claude Code and Copilot and Cursor, and then specialized agents for things like testing and code review. On top of this, they built an MCP Gateway -- which is a centralized proxy that lets any internal Thrift, Protobuffer, or HTTP endpoint be exposed as an MCP server with minimal config changes. This is genuinely clever infrastructure. The gateway handles auth, telemetry, and logging in one place, and provides a registry and sandbox for experimentation. They also built an "Uber Agent Builder" which is essentially a no-code platform for assembling multi-agent workflows with visualization, debugging, tracing, and versioning. This is the kind of platform engineering that most companies talk about but few actually ship.

The real paradigm shift they describe is how developer workflows have changed. The traditional model was plan, write code, review. The first wave of AI was single-threaded: one dev, one agent in an IDE. But what Uber is seeing now is engineers naturally gravitating toward running multiple agents in parallel. As Ty puts it, once you kick off one agent and you're waiting, the instinct is to kick off another one rather than browsing Reddit. This creates an interesting challenge around resource management and cost control that the article doesn't fully explore but clearly hints at.

Uber built "Minion," their internal background agent platform that gives agents monorepo access and optimized defaults. This is essentially an abstraction layer that handles the infrastructure headaches of running agents at scale. They've also built a suite of downstream tools to handle the consequences of more AI-generated code: Code Inbox for smart PR routing (because more code means more PRs to review), uReview for AI-powered code review comments that are actually high-signal, Autocover that generates over 5,000 unit tests per month, and Shepherd for managing large-scale migrations end to end.

But here's what the article is somewhat dancing around: the cost story. AI-related costs are up 6x since 2024, and they acknowledge that token cost optimization is a "growing priority." The article also admits that adoption is slower than expected, even at a company as engineering-forward as Uber. Top-down mandates to use AI tools turned out to be less effective than engineers organically sharing their wins with peers. That's a crucial insight that deserves more airtime than it gets.

**Key takeaways:**

- Uber structured its AI engineering platform into distinct layers: internal AI platform, context sources, industry agent tools, specialized agents, and engineering enablement
- Their MCP Gateway centralizes access to internal and external MCP servers with a single interface, handling auth, logging, and discovery
- Developer workflows are shifting from single-threaded coding to orchestrating multiple parallel agents, which creates new resource and cost challenges
- Minion, their background agent platform, provides monorepo access and optimized defaults for running agents at scale
- 92% of Uber devs use agents monthly, 31% of code is AI-authored, and 11% of PRs are opened by agents
- AI costs have increased 6x since 2024 and token optimization is becoming critical
- Peer-driven adoption (engineers sharing wins) has been more effective than top-down mandates

**Tradeoffs:**

- The 6x cost increase is a serious concern that doesn't get enough attention in the article. When 31% of code is AI-authored, you have to ask: is the code quality equivalent? Are you trading developer hours for compute dollars, and is that trade favorable at scale?
- The shift to parallel agent workflows sounds productive, but there's a missing conversation about cognitive overhead. Orchestrating multiple agents is a different skill than writing code, and not every engineer will thrive in that mode.
- Building all this internal tooling (MCP Gateway, Agent Builder, AIFX CLI, Minion, Code Inbox, uReview, Autocover, Shepherd) represents a massive platform investment. Smaller companies can't replicate this. The article doesn't address what this means for the industry more broadly -- is this a competitive moat for large companies, or will the ecosystem eventually commoditize these capabilities?
- The 92% monthly usage stat sounds impressive, but "uses agents monthly" is a very low bar. The more telling metric would be daily active usage or percentage of actual coding time spent with agents. The article avoids this granularity.

**Link:** [How Uber uses AI for development: inside look](https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development)
