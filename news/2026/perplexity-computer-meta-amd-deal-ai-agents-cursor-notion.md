---
title: "Perplexity Goes Full Computer, Meta Bets $60B on AMD, and AI Agents Take Over Your Workflow"
excerpt: "Perplexity launches an end-to-end AI computer, Meta signs a massive AMD chip deal to challenge Nvidia, and both Cursor and Notion ship autonomous AI agents that fundamentally change how software gets built."
publishedAt: "2026-02-26"
slug: "perplexity-computer-meta-amd-deal-ai-agents-cursor-notion"
hashtags: "#theaibreak #ai #perplexity #meta #amd #cursor #notion #ai-agents #ai-chips #infrastructure #generated #en"
---

## Perplexity Launches "Computer" -- A General-Purpose AI System That Does Everything

**TLDR:** Perplexity just unveiled Computer, a general-purpose AI system that can research, code, and deploy entire projects end-to-end using 19 specialized models. This is not another chatbot -- it is a system that takes over the full lifecycle of a software project.

**Summary:**

This is a significant step beyond what we have seen from most AI companies. While everyone else is shipping chat interfaces and copilots, Perplexity decided to skip the incremental steps and build something that handles entire workflows. Computer uses 19 specialized models working together, which suggests they are taking an ensemble approach where different models handle different parts of the pipeline -- research, planning, coding, testing, deployment.

The ambition here is enormous. We are talking about a system that does not just help you write code or answer questions. It researches a topic, generates a project plan, writes the code, and deploys it. That is the full stack of what a developer does, compressed into a single system.

Now, here is where I push back a little. We have seen plenty of demos where AI systems look magical on stage but fall apart on real-world complexity. The question is not whether Perplexity can demo an impressive workflow -- it is whether Computer can handle the messy, ambiguous, edge-case-riddled reality of actual software projects. Using 19 models adds coordination overhead and potential failure points. Each handoff between models is a place where context can be lost or misinterpreted.

That said, the direction is right. The industry is clearly moving from "AI as a tool" to "AI as a teammate," and Perplexity is making a bold bet on that future.

**Key takeaways:**
- Perplexity Computer uses 19 specialized models for end-to-end project execution
- It handles research, coding, and deployment in a single workflow
- The ensemble approach is ambitious but introduces coordination complexity
- This signals the industry moving beyond copilots toward fully autonomous AI systems

**Link:** [Introducing Perplexity Computer](https://www.perplexity.ai/hub/blog/introducing-perplexity-computer)

---

## Meta Signs $60 Billion Multi-Year Deal with AMD to Challenge Nvidia's GPU Dominance

**TLDR:** Meta and AMD announced a massive 6-gigawatt, multi-year partnership to deploy AMD Instinct GPUs at scale, with shipments starting in the second half of 2026. This is the most significant challenge to Nvidia's AI infrastructure monopoly we have seen so far.

**Summary:**

Let us talk numbers, because they are staggering. Six gigawatts of GPU deployment. To put that in perspective, that is roughly the power output of six nuclear reactors dedicated entirely to AI compute. The deal spans multiple generations of AMD Instinct GPUs, starting with a custom chip based on the MI450 architecture optimized specifically for Meta's workloads.

What makes this deal particularly interesting is the depth of integration. This is not Meta simply buying AMD chips off the shelf. They are co-designing silicon, systems, and software. The AMD Helios rack-scale architecture was developed jointly through the Open Compute Project. Meta is also getting 6th Gen AMD EPYC CPUs codenamed "Venice" and a next-generation variant called "Verano" with workload-specific optimizations.

The financial structure tells you how seriously both companies are taking this. AMD issued Meta a performance-based warrant for up to 160 million shares of AMD common stock, structured to vest as shipment milestones are achieved. That is AMD literally giving Meta equity to align their interests. Meta gets cheaper chips, AMD gets guaranteed volume, and both are financially incentivized to make it work.

Mark Zuckerberg described this as an "important step for Meta as we diversify our compute." That word -- diversify -- is the key. No company wants to be dependent on a single supplier for their most critical infrastructure. Nvidia has had a near-monopoly on AI training and inference hardware, and Meta is making a calculated bet that AMD can deliver competitive performance at a scale that Nvidia either cannot or will not match.

The risk for AMD is execution. They need to deliver chips that actually perform at the level Meta needs, on time, at the promised scale. The risk for Meta is opportunity cost -- if AMD chips underperform, they have locked themselves into a massive commitment.

**Key takeaways:**
- 6-gigawatt deployment across multiple generations of AMD Instinct GPUs
- Custom MI450 architecture chips optimized specifically for Meta's workloads
- AMD issued Meta up to 160 million shares as performance-based warrants
- Shipments begin second half of 2026
- This is the most credible challenge to Nvidia's AI chip dominance to date

**Link:** [AMD and Meta Announce Expanded Strategic Partnership](https://www.amd.com/en/newsroom/press-releases/2026-2-24-amd-and-meta-announce-expanded-strategic-partnersh.html)

---

## Pentagon Threatens to Blacklist Anthropic Over AI Safeguards

**TLDR:** Defense Secretary Hegseth gave Anthropic until Friday to drop its AI safety restrictions or face being placed on the Pentagon blacklist and potential invocation of the Defense Production Act. This is a direct collision between AI safety principles and government power.

**Summary:**

This story cuts right to the heart of one of the most important debates in AI. Anthropic has built its entire brand and corporate identity around responsible AI development. They have safety guardrails, usage restrictions, and policies designed to prevent misuse of their models. And now the Pentagon is essentially saying: remove those guardrails or we will cut you off from defense contracts and potentially compel you to comply under the Defense Production Act.

The Defense Production Act is not a minor threat. It was originally designed for wartime manufacturing and gives the government broad authority to direct private companies to prioritize government orders. Using it to force an AI company to weaken safety measures would set an extraordinary precedent.

From Anthropic's perspective, this creates an impossible choice. Their investors, employees, and public positioning all depend on being the "safety-first" AI company. If they cave to Pentagon pressure, they undermine their core identity. If they refuse, they potentially lose access to one of the largest and most lucrative customers in the world, and face legal consequences.

The broader implications are significant for every AI company. If the government can force one company to remove safety restrictions, it creates a precedent that applies to the entire industry. This is exactly the kind of scenario that AI safety researchers have been warning about -- not a rogue AI, but a government deciding that safety measures are inconvenient.

**Key takeaways:**
- Defense Secretary Hegseth issued a deadline for Anthropic to remove AI safety guardrails
- The Pentagon threatened blacklisting and the Defense Production Act
- This sets a precedent for government authority over AI safety policies
- Anthropic faces a conflict between its safety-first identity and government pressure
- The outcome could reshape the relationship between AI companies and government regulation

**Link:** [Anthropic Pentagon Claude Hegseth](https://www.axios.com/2026/02/24/anthropic-pentagon-claude-hegseth-dario)

---

## Cursor Ships Cloud Agents That Build Software in Their Own Virtual Machines

**TLDR:** Cursor launched cloud agents that run in isolated VMs with full development environments, can test their own changes, produce video artifacts for verification, and now generate over 30 percent of the PRs that Cursor itself merges. This is a fundamental shift in how AI-assisted development works.

**Summary:**

This is one of those announcements that sounds incremental but is actually a paradigm shift. The key insight is simple: agents are only as capable as the environment they run in. Local agents compete for your resources, cannot run browsers, cannot test UI, and cannot verify their own work. Cursor solved this by giving each agent its own virtual machine with a complete development environment.

The results from Cursor's internal usage are remarkable. Over 30 percent of their merged pull requests are now created by agents running autonomously in cloud sandboxes. These are not toy demos -- these are production PRs in their own codebase. The examples they shared are genuinely impressive. One agent reproduced a clipboard exfiltration vulnerability by building an HTML page, hosting it, loading it in Cursor's browser, and demonstrating the complete attack flow. Another agent spent 45 minutes doing a comprehensive walkthrough of their docs site, testing sidebar navigation, search, theme switching, and more.

What changes the developer experience is the ability to kick off multiple agents in parallel without them competing for resources. You can start an agent from Slack, have it run for hours, and get back a video recording of what it did along with a ready-to-merge PR. The developer's role shifts from writing code to setting direction and deciding what ships.

The tradeoff is clear though. You are trading direct control for scale. When an agent produces a PR with a video demo, you still need to review it carefully. Automated testing covers many cases, but the judgment calls -- should this feature work this way? -- still require human attention.

**Key takeaways:**
- Cloud agents run in isolated VMs with full dev environments
- Over 30 percent of Cursor's own merged PRs are created by autonomous agents
- Agents can record themselves testing UI, reproducing bugs, and verifying features
- Available from web, mobile, desktop, Slack, and GitHub
- Developer role shifts from code writing to direction setting and review

**Tradeoffs:**
- Scale and parallelism versus direct control over implementation
- Faster throughput versus the need for careful review of autonomous output
- Agent autonomy versus the risk of subtle bugs that pass automated testing

**Link:** [Cursor agents can now control their own computers](https://cursor.com/blog/agent-computer-use)

---

## Notion Introduces Custom AI Agents for Autonomous Workflow Automation

**TLDR:** Notion launched Custom Agents that autonomously handle Q&A, task routing, status reports, and workflows across Notion, Slack, Mail, Calendar, Figma, Linear, and custom MCP servers. They already have more agents than employees internally, and early testers built over 21,000 agents.

**Summary:**

Notion has been steadily building its AI capabilities, and Custom Agents represent their most ambitious step yet. These are not one-off assistants that respond when you ask a question. They are autonomous agents that monitor channels, route tasks, compile updates, and answer questions continuously in the background.

The real-world examples tell the story better than any feature list. Ramp has over 300 agents, with one "Product Oracle" answering dozens of roadmap and feature questions daily. Remote eliminated their IT help desk entirely and saved 20 hours per week with a single agent. Braintrust built a Deal Spotter agent that identifies accounts ready for upgrades and sends weekly reports. These are not demos -- they are production workflows replacing real human labor.

The integration story is strong. Custom Agents work across Notion, Slack, Mail, Calendar, Figma, Linear, and support custom MCP servers. The MCP server support is particularly interesting because it means agents can plug into virtually any tool your team uses.

On the pricing side, Notion is introducing a credit-based model. Your seat price stays the same, and other AI features remain included. Custom Agents consume credits based on work performed, available as add-ons for Business and Enterprise plans. They are free through May 3, 2026 during public beta.

Notion also addressed the elephant in the room -- prompt injection. When agents autonomously read content from various sources, they are vulnerable to hidden instructions in that content. Notion built detection guardrails and recommends limiting agent scope through permissions. This is honest and responsible, though the risk remains inherent in any system where agents process untrusted content.

**Key takeaways:**
- Custom Agents run autonomously 24/7 across multiple tools and platforms
- Notion internally runs more agents than employees
- Ramp deployed 300+ agents, Remote saved 20 hours per week on IT help desk
- Usage-based credit pricing, free during public beta through May 2026
- Supports custom MCP servers for integration with any tool
- Prompt injection risks acknowledged with detection guardrails

**Tradeoffs:**
- Autonomous operation versus the security risks of agents processing untrusted content
- Productivity gains versus the new overhead of monitoring and managing agent fleets
- Credit-based pricing provides flexibility but creates unpredictable costs at scale

**Link:** [Introducing Custom Agents](https://www.notion.com/blog/introducing-custom-agents)

---

## Andrej Karpathy's LLM Council -- Open Source Tool for Multi-Model Peer Review

**TLDR:** Karpathy released LLM Council, an open-source web app that sends your query to multiple LLMs simultaneously, has them anonymously peer-review each other's responses, and then a "chairman" model synthesizes the final answer.

**Summary:**

This is a delightfully practical project from Andrej Karpathy, and the concept is brilliant in its simplicity. Instead of asking one LLM and hoping you picked the right one, you ask all of them. Then, in a move that mirrors actual academic peer review, each model reviews the others' responses without knowing who wrote what. Finally, a designated chairman model compiles everything into a final answer.

The three-stage pipeline works like this. Stage one: your query goes to all configured LLMs individually. Stage two: each model receives the anonymized responses from the others and ranks them by accuracy and insight. Stage three: the chairman takes all responses and peer reviews to produce a synthesized final answer.

Karpathy himself calls this a "vibe coded Saturday hack," and honestly, that is part of what makes it great. It uses OpenRouter to access multiple models, has a React and Vite frontend, and stores conversations as JSON files. The default council includes GPT 5.1, Gemini 3.0 Pro, Claude Sonnet 4.5, and Grok 4.

The practical value is real. Different models have different strengths, different training data, and different failure modes. Getting multiple perspectives and having them critique each other produces better results than any single model alone. It is essentially the "wisdom of crowds" applied to language models.

**Key takeaways:**
- Queries go to multiple LLMs simultaneously via OpenRouter
- Anonymous peer review prevents models from playing favorites
- Chairman model synthesizes final answer from all responses and reviews
- Open source with React frontend and FastAPI backend
- Default council includes GPT 5.1, Gemini 3.0 Pro, Claude Sonnet 4.5, and Grok 4

**Link:** [LLM Council on GitHub](https://github.com/karpathy/llm-council)

---

## AI Investment Roundup: MatX, Basis, and Mistral's First Acquisition

**TLDR:** MatX raised $500M to build Nvidia-competing AI chips, Basis secured $100M at $1.15B valuation for AI accounting agents, and Mistral AI acquired cloud startup Koyeb to become a full-stack AI platform.

**Summary:**

Three notable funding and acquisition stories this week paint a picture of an AI industry that is rapidly maturing and verticalizing.

MatX, founded by two former Google TPU engineers, raised a $500 million Series B led by Jane Street and Leopold Aschenbrenner's Situational Awareness fund. Their pitch is audacious -- processors that are 10 times better at training LLMs than Nvidia's GPUs. The founding team has credibility here: CEO Reiner Pope led AI software development for Google's TPUs, and co-founder Mike Gunter was a lead TPU hardware designer. The funding goes toward chip fabrication with TSMC, with shipments planned for 2027. Other investors include Marvell Technology and Stripe co-founders Patrick and John Collison. The AI chip space is getting crowded, but the demand is so enormous that multiple winners can coexist.

Basis secured $100 million at a $1.15 billion valuation for AI agents that autonomously handle accounting tasks. Led by Accel with GV and Lloyd Blankfein participating, this is a bet that accounting -- one of the most rule-bound, process-heavy professions -- is ripe for AI automation. The unicorn valuation tells you that investors believe this vertical AI agent approach has legs.

Mistral AI made its first acquisition, buying Paris-based cloud startup Koyeb. This is about Mistral's transition from a model company to a full-stack AI platform. Koyeb's team of 13 will join Mistral's engineering organization and help build out Mistral Compute, their cloud infrastructure offering. Koyeb's expertise in serverless deployment, GPU optimization, and AI inference scaling fills critical gaps in Mistral's stack. The timing aligns with Mistral's $1.4 billion investment in Swedish data centers and their recent milestone of $400 million in annual recurring revenue. This is a European AI company that is serious about competing with American incumbents by owning the full stack from models to infrastructure.

**Key takeaways:**
- MatX raised $500M to build AI chips targeting 10x Nvidia performance, shipping 2027
- Basis hit unicorn status at $1.15B for AI accounting agents
- Mistral acquired Koyeb to accelerate its full-stack cloud AI ambitions
- Mistral now at $400M ARR and investing $1.4B in European data centers
- The AI investment landscape is shifting from model companies to infrastructure and vertical applications

**Link:** [MatX raises $500M](https://techcrunch.com/2026/02/24/nvidia-challenger-ai-chip-startup-matx-raised-500m/) | [Mistral AI buys Koyeb](https://techcrunch.com/2026/02/17/mistral-ai-buys-koyeb-in-first-acquisition-to-back-its-cloud-ambitions/)
