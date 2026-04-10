---
title: "Anthropic Is Now the Biggest AI-as-a-Service Company in History"
excerpt: "Anthropic's run-rate revenue doubled from $14B to $30B in under two months, surpassing OpenAI while spending four times less."
publishedAt: "2026-04-10"
slug: "anthropic-biggest-ai-as-a-service-company-history"
hashtags: "#substack #ai #anthropic #claude #llm #agents #enterprise #aas #generated #en"
source_pattern: "Substac"
---

## Anthropic Is Now the Biggest AI-as-a-Service Company in History

**TLDR:** Anthropic crossed OpenAI in revenue while spending four times less, with run-rate jumping from $14 billion to $30 billion between February and April 2026. The company is rolling out a full platform of agentic services under the Claude brand. A new model called Claude Mythos reportedly "obliterated every single benchmark in AI" but has not been released yet due to safety prioritization.

**Summary:**

What just happened with Anthropic is genuinely hard to wrap your head around. Between February and April 2026, the company's annualized revenue run-rate went from $14 billion to $30 billion. That is not a typo. For reference, it took most hyperscalers years to even approach numbers in that range. The headline from one source says it plainly: "Anthropic Just Passed OpenAI in Revenue. Spending 4x Less." That spending efficiency angle is actually the more interesting part of the story.

Anthropic's compute stack plays a role here. They are diversified across Nvidia GPUs, Amazon infrastructure, and Google AI chips, which gives them flexibility that pure Nvidia customers do not have. But the real accelerant was API adoption. Cursor, the AI coding assistant that has become a daily tool for a large chunk of the developer community, is built on Claude's API. When Cursor blew up, Anthropic's API numbers went with it. That kind of third-party distribution, where someone else is doing the growth work and you are just the model layer, is an extremely efficient way to scale revenue without proportional sales and marketing spend.

The product catalog they are building out is worth paying attention to. Claude Code went widely available in May 2025. Since then, the company has been shipping relentlessly: 74 releases in 52 days is the number cited in this piece. They have launched Claude Managed Agents, which is a suite of composable APIs for building and running cloud-hosted agents at scale. The pitch there includes sandboxed code execution, checkpointing, credential management, scoped permissions, and end-to-end tracing. That is not a toy API. That is infrastructure. They also introduced Claude Cowork, an agentic workflow platform, Claude Dispatch for mobile agent access, and Claude Skills for community-built extensions. The Model Context Protocol (MCP) ties these together for system connectivity. They are building a platform, not just a model.

There is also a model sitting unreleased. Claude Mythos, described by partner Deedy Das as something that "obliterated every single benchmark in AI," is being held back while Anthropic prioritizes trust and safety reviews before wider release. That decision is a deliberate signal about the company's posture. You do not hold back a benchmark-smashing model unless you are either very worried about what it can do or you are extremely confident in your brand as the safe choice. Given that their IPO is reportedly expected within six months, they have strong incentives to maintain that reputation.

Enterprise traction rounds out the picture. Contracts exceeding one million dollars are becoming standard for their larger customers. The article frames this period as more significant than the DeepSeek moment from January 2025, arguing that Anthropic's dominance is actively reshaping tech employment at companies like Oracle, Disney, and others. Whether or not the comparison holds, the underlying numbers suggest this is a real inflection point, not a promotional narrative.

**Key takeaways:**

- Run-rate revenue went from $14B to $30B between February and April 2026, surpassing OpenAI
- Anthropic achieves this at four times lower spend than OpenAI, driven by API distribution (notably Cursor) and diversified compute
- Claude Managed Agents is a full agentic infrastructure platform: sandboxed execution, checkpointing, credential management, scoped permissions, tracing
- Claude Mythos is unreleased, reportedly benchmark-topping, being held back for safety review before expected IPO in approximately six months
- 74 product releases in 52 days reflects an aggressive shipping cadence across Claude Code, Cowork, Dispatch, Skills, and MCP
- Enterprise contracts above $1M are becoming common; the model is drifting toward serious B2B infrastructure

**Why do I care:**

This is primarily a business story but it has direct implications for how we build things. When Anthropic ships Claude Managed Agents with sandboxed code execution, checkpointing, and scoped permissions baked in at the API layer, that is offloading a massive amount of infrastructure that frontend and full-stack teams would otherwise need to build themselves. The MCP layer on top means your existing tooling can connect without rebuilding everything. As someone who thinks about architecture, the pattern I see here is Anthropic positioning Claude as the compute and orchestration substrate, the same way AWS positioned Lambda for serverless. If they get the developer experience right, the lock-in follows naturally. I would be paying very close attention to whether Managed Agents become the default way enterprise teams ship agentic workflows, because that will reshape what we actually build at the application layer.

**Link:** [The Biggest AI-as-a-Service Company in History: Anthropic & Claude (2026)](https://www.ai-supremacy.com/p/the-biggest-ai-as-a-service-company-in-history-anthropic-claude-2026?publication_id=396235&post_id=193755244&isFreemail=true&triedRedirect=true)
