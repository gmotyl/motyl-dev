---
title: "Building a Sales Engine with Claude Code and MCP Servers"
excerpt: "A solopreneur's approach to automating sales prospecting, outreach, and CRM management using Claude Code skills, Apollo.io, Attio CRM, and custom MCP servers."
publishedAt: "2026-04-13"
slug: "building-sales-engine-claude-code-mcp"
hashtags: "#substack #ai #agents #automation #startup #workflow #generated #en"
source_pattern: "Substac"
---

## How to Build a Sales Engine With Claude Code

**TLDR:** A solopreneur replaced roughly twenty hours of weekly sales admin work by building a prospecting and outreach system using Claude Code custom skills, Apollo.io for company data, Attio CRM via its official MCP server, and Perplexity for research. The entire setup cost around EUR 100 in tooling and filters out ninety percent of unqualified prospects automatically.

**Summary:** The author starts from a familiar pain point: sales reps spend seventy percent of their week on administrative tasks that generate zero revenue. Rather than buying into an existing sales platform, they decided to build a custom system using Claude Code. The reasoning makes sense. Off-the-shelf tools like Clay.com force you into their UI, mix automation and data costs through opaque credit systems, and get expensive quickly. With a Claude Max subscription already in hand, the automation capability exists in-house. The question becomes how to wire it together.

The architecture uses Apollo.io as the company data source. The author filters Apollo's database for their ideal customer profile — European services companies with five to fifty million in annual revenue — downloads that list, and runs a custom Claude Code skill called prescreen. This skill augments the Apollo data with web search and Perplexity API lookups to evaluate each company against contextual criteria. The results are striking. Prescreening eliminated ninety percent of the downloaded companies due to poor fit, weak financials, or lack of operational readiness. At ten to twenty minutes per company for manual research, that filtering saved over twenty hours for roughly thirty-five euros in API credits.

From the prescreened list, a second skill called lead-source handles the heavy lifting for each targeted company. It runs in parallel across multiple agents, sourcing contact data from Apollo via API calls, creating CRM records in Attio, generating PDF reports that identify operational bottlenecks, and drafting personalized LinkedIn messages and cold emails directly in Gmail. A custom Gmail MCP server handles the email creation with the PDF attached. The human's job shrinks to reviewing and editing each draft before hitting send — minutes per prospect instead of hours.

The author also includes some quick industry news: Anthropic hit thirty billion in annualized revenue surpassing OpenAI, Meta released Muse Spark from its Superintelligence Labs, Amazon defended two hundred billion in capital expenditure, and OpenAI is dealing with executive departures and internal friction over IPO timing.

**Key takeaways:**
- Claude Code custom skills can automate prospecting, prescreening, contact sourcing, CRM record creation, and email drafting in parallel
- Prescreening with Perplexity filtered out ninety percent of prospects, saving twenty-plus hours for roughly EUR 35 in API credits
- Keeping a human in the loop for outreach is essential — agents should draft, humans should decide and send
- API-first tools with MCP server support (like Attio) are critical for agent-driven workflows
- The total cost for the entire setup was approximately EUR 100

**Why do I care:** This is more of a business and automation story than a frontend one, but there is a real architectural lesson hiding in plain sight. The author's choice of Attio came down to two factors: a generous free plan and an official MCP server. That second point matters. As AI agents become more capable, the software tools that expose clean APIs and build proper MCP servers will become the default choices for automation-heavy workflows. The UI-first tools that lack strong abstraction layers will get left behind. I keep thinking about how this applies to the tools we build and integrate — if your product does not have a solid API layer, an AI agent cannot use it, and that is an increasingly important purchasing criterion. The prescreening approach using Perplexity for contextual research is also clever, though I would want to see how it holds up at larger volumes. The hit rate of fifty percent from prescreened to scheduled outreach sounds good on paper, but the real test is whether those meetings convert.

**Link:** [How to Build a Sales Engine With Claude Code](https://metacircuits.substack.com/p/how-to-build-a-sales-engine-with)