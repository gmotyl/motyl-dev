---
title: "Skills vs MCP Servers: The $285 Billion Architecture Decision"
excerpt: "A deep dive into when to use Claude Skills versus MCP servers, set against the backdrop of the SaaSpocalypse that wiped $285 billion from enterprise software stocks."
publishedAt: "2026-02-09"
slug: "skills-vs-mcp-servers-285-billion-architecture-decision"
hashtags: "#substack #metacircuits #ai #llm #architecture #devops #saas #mcp #claude #automation #generated #en"
---

## Skills vs MCP Servers: When to Pick Which

**TLDR:** Skills are plain-text instruction sets that teach AI agents how to work, while MCP servers are small programs that give AI agents access to external systems and data. The real power comes from combining both, and the author demonstrates this with a cold outreach system built on Claude Code that replaces what used to require expensive SaaS subscriptions.

**Summary:**

Let us talk about what happened last week, because it is genuinely one of those inflection points people will look back on. Anthropic released a small repository of eleven industry-specific plugins for Claude covering legal, financial modeling, marketing, sales, and customer service. The market response was, to put it mildly, dramatic. Salesforce dropped 14 percent in five days, SAP fell 16 percent, Thomson Reuters lost 18 percent in a single session, and the S&P 500 software index shed nearly 9 percent over five trading sessions. Investors called it the SaaSpocalypse, and roughly 285 billion dollars in market capitalization evaporated. The kicker is that these plugins were nothing exotic. They were bundles of Skills and MCP server connections, the same building blocks available to anyone running Claude Code.

The article lays out the distinction between Skills and MCP servers with admirable clarity. A Skill is just a markdown file with plain-text instructions. You drop it in the right directory, and Claude follows those instructions when you invoke it. No programming required. Skills are cheap on context because Claude only loads their descriptions at startup and fetches full instructions on demand. They are portable across Claude Code, GitHub Copilot, and any tool supporting the Agent Skills open standard. The downside is that Skills cannot reach outside your machine, they are non-deterministic because natural language gets interpreted differently each run, and auto-invocation only works about half the time. MCP servers, on the other hand, are small software programs that expose external tools and data sources through a standardized protocol. They give you external connectivity to APIs, databases, and cloud services, they execute deterministically because they run actual code, and they enjoy first-party support from companies like Notion, GitHub, and Atlassian. The cost is real setup complexity, ongoing maintenance burden, and security risks from third-party servers.

Where this gets genuinely interesting is the combination. The author built a cold outreach system using Apollo.io for lead data, Attio CRM for pipeline management, and Perplexity for desk research, all connected through MCP servers. On top of that sits a Skill that orchestrates the entire workflow: research the company, identify the right contacts, get verified emails, draft personalized messages, and save everything to Attio. The result cuts what was 20 to 30 minutes of manual work per contact down to about two minutes, while keeping the final human review step for quality. The total cost is 7 euros per month plus a one-time 29 euro investment.

For architects and teams, the mental model here is straightforward: MCP provides the what, Skills provide the how. If your workflow is entirely local, involving file processing, text synthesis, or analysis, use Skills. If you need to connect to external systems where credentials and deterministic execution matter, use MCP servers. For most real-world workflows, you will use both. The key architectural insight is that this combination is what threatens the per-seat SaaS licensing model. When an AI agent with the right Skills and connections can replicate what a specialized SaaS tool does, the value proposition of paying per user for a rigid interface starts to collapse.

Now, here is what the author is not fully reckoning with. The cold outreach example is compelling, but it is a single-user workflow with low stakes if something goes wrong. Scale this to a team of fifty, add compliance requirements, audit trails, role-based access controls, and SLA guarantees, and suddenly those clumsy SaaS interfaces do not look so clumsy anymore. The article presents the SaaSpocalypse as a rational market correction, but the market may have been correcting for the wrong timeline. Enterprise adoption of agent-based workflows is going to be slow, painful, and full of governance hurdles that a markdown file and an MCP server simply do not address today. The 50 percent auto-invocation failure rate for Skills is hand-waved away as something you can mitigate through better naming, but for any mission-critical workflow, a coin flip on whether your automation fires correctly is a non-starter. That reliability gap is exactly where SaaS tools still earn their keep.

The broader market context is worth noting as well. In the same week, Amazon, Alphabet, Meta, and Microsoft disclosed roughly 650 billion dollars in planned 2026 capital expenditures, with the vast majority going to AI infrastructure. The article observes the irony: SaaS investors fear AI works too well, while Big Tech investors fear it does not work well enough to justify the spend. Nearly 2 trillion dollars vanished in a single week across both camps. OpenAI also shipped GPT-5.3-Codex and its Frontier enterprise platform, while Anthropic released Claude Opus 4.6 with a million-token context window.

**Key takeaways:**
- Skills are plain-text markdown instructions that are cheap, portable, and easy to iterate on, but they cannot access external systems and are non-deterministic by nature
- MCP servers provide secure, deterministic access to external APIs and databases but come with significant setup complexity and maintenance overhead
- The real power emerges when you combine both: MCP for data connectivity and Skills for workflow orchestration
- The SaaSpocalypse wiped 285 billion dollars from enterprise SaaS stocks after Anthropic released a small repository of industry plugins
- Enterprise governance, compliance, and multi-user access control remain unsolved problems in the agent-based workflow model

**Tradeoffs:**
- Gain workflow flexibility and dramatically lower costs with Skills plus MCP, but sacrifice the governance, audit trails, and role-based access controls that enterprise SaaS provides out of the box
- Gain deterministic execution with MCP servers but sacrifice the ease of iteration and zero-setup simplicity of plain-text Skills
- Gain creative adaptability with non-deterministic Skills but sacrifice repeatability for workflows that demand identical outputs every time

**Link:** [Skills vs MCP servers: when to pick which](https://metacircuits.substack.com/p/the-285-billion-question-skills-vs?publication_id=4089894&post_id=187316537&isFreemail=true&triedRedirect=true)