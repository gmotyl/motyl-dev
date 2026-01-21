---
title: "Kilo Speed: How One Engineer Shipped an AI Dashboard in Two Days"
excerpt: "A practical breakdown of 'agent team' engineering — how pre-planning, parallel cloud agents, and knowing what to delegate transformed a month-long project into a two-day delivery."
publishedAt: "2026-01-21"
slug: "kilo-speed-engineer-shipped-ai-dashboard-two-days"
hashtags: "#substack #ai #agents #productivity #engineering #devtools #workflow #generated #en"
---

## Inside Kilo Speed: How One Engineer Shipped an AI Adoption Dashboard in Two Days

**TLDR:** A complex AI adoption dashboard that would traditionally take two to three engineers a month was shipped in two days by one engineer using an "agent team" model — pre-planning with discovery documents, parallel cloud agents for boilerplate work, and focused deep work with a local coding agent for core logic.

John Fawcett, who joined Kilo after nearly a decade at Cloudflare, shares the concrete workflow behind what the company calls "Kilo Speed." The contrast with his previous environment is stark: at Cloudflare, the development process required quarterly roadmaps, PRDs, technical specs, and Jira tickets — necessary for scale, security, and maintainability at that level. Kilo operates on a weekly cadence.

The AI Adoption Score dashboard required frontend work, backend data aggregation, and complex logic — the kind of project that traditionally demands coordination between multiple engineers over weeks. The breakthrough insight is treating the workflow as managing an "agent team" rather than doing everything sequentially.

The process breaks into three phases. First, pre-planning is non-negotiable. John creates a discovery document as a dumping ground for ideas, competitor research, and metric definitions. He uses AI chat to critique the initial PRD, identify holes, and generate technical specifications. Crucially, this is purely for building context and understanding — not for generating code. Without this step, he warns, you risk generating unmaintainable code and unmanageable technical debt.

Second comes parallelization. Once the plan is clear, John works on two tracks simultaneously. For "deep work," he uses a single local coding agent in a tight feedback loop, focusing on the hardest problems — in this case, data aggregation and core logic. For "background work," he kicks off multiple cloud agents for smaller, self-contained tasks identified during planning. Finally, finished work goes through a review agent before human approval.

Three categories of work are fully delegated to agents: writing UI code (agents are faster and produce "good enough" solutions for rapid iteration), writing tests (Claude Sonnet 4.5 is highly effective, freeing the engineer to focus on testing strategy), and spinning up new projects with boilerplate configuration. When hitting roadblocks or lacking expertise, consulting AI first is the default. But for high-stakes decisions, human collaboration remains essential — LLMs are, as John puts it, "the ultimate Yes Man/confirmation bias machines."

The counterintuitive advice on quality is worth considering. Kilo doesn't overindex on architectural quality, consistency, or long-term technical vision right now. The reasoning: "You don't typically know what quality architecture looks like until you've built a version that doesn't scale." Focusing on architecture too early means focusing on the wrong things instead of getting customers. Stylistic consistency only matters if it can be automated. Long-term technical vision is unnecessary until the MVP fails to scale.

For engineers at larger organizations who can't adopt this wholesale, the transition can be gradual. Create a discovery document. Formulate a clear plan. Identify small, self-contained units of work. Kick off agents for boilerplate, tests, and UI while you focus on core logic. Even at a large company, you can operate this way for a POC, then layer back in considerations for scale, security, and maintainability.

**Key takeaways:**
- Pre-planning before prompting agents is critical — understand the solution internally first
- Parallelize with an "agent team": local agent for deep work, cloud agents for background tasks
- Delegate fully: UI code, tests, and project boilerplate are well-suited for agents
- Consult AI for roadblocks, but seek dissenting human opinions for high-stakes decisions
- Defer architecture and consistency concerns until you have something that doesn't scale

**Tradeoffs:**
- Speed-focused development accelerates customer acquisition but defers architectural quality
- Agent delegation increases velocity but requires clear pre-planning to avoid technical debt
- Minimal coordination enables individual productivity but may create consistency challenges at scale

**Link:** [Inside Kilo Speed: How One Engineer Shipped an AI Adoption Dashboard in Two Days](https://blog.kilo.ai/p/inside-kilo-speed-how-one-engineer)

---

*This article was compiled from the Substack newsletter. The opinions and summaries presented are interpretations of the original sources — always read the linked articles for complete context.*