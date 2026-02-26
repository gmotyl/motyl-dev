---
title: "Mitchell Hashimoto on AI Agents, Open Source Trust, and the Future of Version Control"
excerpt: "The HashiCorp co-founder and Ghostty creator shares how AI agents transformed his workflow, why open source must shift to default-deny, and why Git might not survive the agentic era."
publishedAt: "2026-02-25"
slug: "mitchell-hashimoto-ai-agents-open-source-trust-version-control"
hashtags: "#substack #ai #architecture #open-source #devtools #infrastructure #performance #engineering #career #generated #en"
---

## Mitchell Hashimoto's New Way of Writing Code

**TLDR:** Mitchell Hashimoto, co-founder of HashiCorp and creator of Ghostty, shares how AI agents have fundamentally changed how he builds software. The conversation covers HashiCorp's origin story, why Terraform won despite being seventh to market, and why the entire version control paradigm may need reinvention for the agent era.

**Summary:**

This is one of those conversations that starts as a founder retrospective and quietly turns into a manifesto for what software engineering looks like in 2026 and beyond. Mitchell Hashimoto has built some of the most consequential infrastructure tools of the last decade — Vagrant, Terraform, Vault, Consul — and now he is working on Ghostty, a terminal emulator written in Zig. What makes this interview worth your time is not the nostalgia. It is the clarity with which Mitchell articulates where the industry is headed.

The HashiCorp origin story alone is worth unpacking because it demolishes the "first mover advantage" myth that startup culture loves to repeat. Terraform was the seventh infrastructure-as-code tool to market. Not second, not third — seventh. It won through relentless developer experience work, conference presence, and community building. The lesson here is uncomfortable for teams that are racing to ship: timing matters far less than sustained execution and developer empathy. And the early commercialization failure is equally instructive. HashiCorp's first product, Atlas, required customers to buy the entire stack at once, which meant no single team inside a company could justify the budget. They had to unbundle, sell individual products like Vault separately, and that pivot is what actually built the business. Four years with no real revenue. That is a detail most startup narratives conveniently skip.

Now, the AI part. Mitchell's new rule is deceptively simple: always have an agent running in the background doing something. If he is writing code, an agent is planning. If an agent is coding, he is reviewing. He kicks off research tasks — library comparisons, edge-case analysis — before leaving the house so that work progresses while he is away. This is not about replacing engineers. It is about treating agents as asynchronous collaborators with a very different cost profile than human teammates. The practical implication for teams is significant: your development workflow should probably look more like a producer-consumer pipeline than a single-threaded loop.

The most provocative claim is about open source and version control. Mitchell argues that AI has broken the trust model that open source has relied on for decades. It is now trivial to generate plausible-looking but incorrect contributions, which means maintainers need to shift from "default trust" to "default deny." That is a painful cultural shift, but he is right that the economics of contribution quality have fundamentally changed. On version control, he compares the needed transformation to what Gmail did for email: never delete, archive everything. Agents create so much churn — branches proliferating, merge queues buckling — that Git and GitHub in their current form may not be adequate. Whether you agree or not, if you are an architect designing workflows for teams using AI agents, you need to be thinking about this problem now, not later.

For architects and engineering leaders, there are several threads worth pulling on here. The unbundling lesson from HashiCorp applies directly to how you package internal platforms and developer tools — forcing adoption of an entire stack is a losing strategy. The agent-as-background-worker pattern has real implications for how you structure CI/CD pipelines, code review processes, and even how you think about developer productivity metrics. And the open source trust question is going to hit every team that depends on community contributions.

**Key takeaways:**

- Terraform won as the seventh entrant to infrastructure-as-code by investing in developer experience and community, not by being first
- HashiCorp had zero revenue for four years; their first commercial product failed because it required customers to adopt the entire stack
- VMware came within a single board vote of acquiring HashiCorp for ~$100M when it was a three-person company — Terraform would likely never have existed
- Mitchell's core workflow principle: always have an AI agent running in the background — planning while you code, researching while you drive
- Open source must shift from "default trust" to "default deny" because AI makes it trivial to generate plausible but incorrect contributions
- Git and GitHub may not survive the agentic era in their current form — the volume of agent-generated churn breaks merge queues and bloats repositories
- The best engineers Mitchell ever hired had no public profiles, no GitHub contributions, and worked nine-to-five at companies nobody has heard of
- For AI-skeptical engineers: start by delegating research tasks (library comparisons, edge-case analysis), not code generation

**Tradeoffs:**

- **Default-deny open source** preserves quality but risks alienating genuine contributors and slowing community growth. The maintainer burden shifts from reviewing contributions to justifying rejections.
- **Agent-as-background-worker** increases throughput but introduces coordination overhead. You need to be disciplined about what you delegate, or you end up reviewing more garbage than you would have written yourself.
- **Abandoning Git's current model** could unlock better agentic workflows but creates massive migration costs and fragments tooling ecosystems that took a decade to mature.

**Link:** [Mitchell Hashimoto's new way of writing code](https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto)
