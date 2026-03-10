---
title: "GPT-5.4 Drops With 1M Context Window, Claude Code Goes Background, and Gemini Gets Dirt Cheap"
excerpt: "OpenAI launches GPT-5.4 with built-in computer use, Anthropic turns Claude Code into a scheduled background worker, and Google makes fast AI cheaper than ever with Gemini Flash-Lite."
publishedAt: "2026-03-09"
slug: "gpt-5-4-drops-1m-context-claude-code-background-gemini-cheap"
hashtags: "#substack #ai #openai #anthropic #google #llm #developer-tools #generated #en"
---

## GPT-5.4: OpenAI's New Frontier Model With 1M Token Context and Computer Use

**TLDR:** OpenAI released GPT-5.4, featuring a 1 million token context window and built-in computer use capabilities. It is being positioned as their most capable frontier model yet, with state-of-the-art coding performance.

**Summary:**

OpenAI has launched GPT-5.4, and the headline numbers are staggering: a 1 million token context window and native computer use baked right in. That context window alone changes the game for anyone working with large codebases, lengthy documents, or complex multi-step reasoning tasks. You can now feed in an entire repository or a sprawling specification document without worrying about hitting the ceiling.

The built-in computer use angle is particularly interesting. This means GPT-5.4 can interact with desktop applications, browsers, and file systems directly, a capability that until recently was Anthropic's differentiator with their Claude computer use feature. OpenAI is clearly signaling that agent-like behavior -- where the model takes actions rather than just generating text -- is a first-class priority for them now.

What is worth questioning here is whether a 1 million token context window actually translates to equally strong attention and recall across the entire window, or whether we will see the familiar "lost in the middle" problem just pushed out further. More context is great, but context quality matters more than context quantity. The marketing says "most capable," but the benchmarks that matter for day-to-day engineering work -- debugging accuracy, architectural reasoning, multi-file refactoring -- are harder to capture in a press release.

For architects and teams, the real question is: does this change your tooling strategy? If you have been building RAG pipelines specifically to work around context limitations, a 1M token window might let you simplify your stack considerably. But do not rip out your retrieval layer just yet -- you will want to test how well the model actually performs at the edges of that window with your specific workloads.

Also notably missing from the announcement is any discussion of latency and cost implications. A model this capable with a context window this large is going to be expensive and likely slower. OpenAI tends to lead with the impressive capabilities and let the pricing reality settle in afterward.

**Key takeaways:**
- 1M token context window enables processing entire codebases and large document sets in a single request
- Built-in computer use puts OpenAI in direct competition with Anthropic's agent capabilities
- State-of-the-art coding performance claimed but real-world benchmarks on complex tasks should be verified independently
- Teams should test context recall quality across the full window before restructuring their retrieval architectures

**Link:** [Introducing GPT-5.4](https://openai.com/index/introducing-gpt-5-4/)

---

## ChatGPT Lands Inside Excel With GPT-5.4

**TLDR:** OpenAI released a ChatGPT add-in for Excel powered by GPT-5.4, allowing users to build spreadsheet models and analyze financial data using natural language. This brings AI directly into one of the most widely used business tools.

**Summary:**

This is one of those moves that looks simple on the surface but could be enormously consequential. Putting ChatGPT inside Excel is not just a convenience feature -- it is meeting hundreds of millions of users exactly where they already work. No new tool to learn, no workflow to redesign, no API integration to build. You just talk to your spreadsheet.

The GPT-5.4 backbone means the add-in should be capable of handling fairly sophisticated financial modeling, data transformation, and analysis tasks. For teams that spend hours building and maintaining complex spreadsheet models, the productivity gain here could be substantial. Instead of wrestling with nested formulas and pivot table configurations, you describe what you want in plain language.

But here is the assumption worth challenging: just because AI can generate a financial model does not mean you should trust it without verification. Spreadsheets in enterprise settings often drive real financial decisions. A formula error in a traditional spreadsheet is bad; an AI hallucination in a financial model is potentially catastrophic. The question is whether teams will develop the same rigor around validating AI-generated spreadsheet logic that they have around auditing human-built spreadsheets. History suggests they will not, at least not initially.

For engineering teams and architects, the interesting play here is how this integration model -- embedding AI directly into existing productivity tools -- compares to the "build a new AI-native application" approach. Microsoft and OpenAI are betting heavily that augmenting existing workflows beats replacing them. That is probably the right bet for enterprise adoption.

**Key takeaways:**
- ChatGPT inside Excel removes the friction of switching tools for AI-assisted data analysis
- GPT-5.4 powers the add-in, bringing frontier-level reasoning to spreadsheet tasks
- Validation of AI-generated financial models and formulas remains a critical concern that teams need to address
- The embedded AI approach signals that the winning strategy is augmenting existing tools, not replacing them

**Link:** [ChatGPT for Excel](https://openai.com/index/chatgpt-for-excel/)

---

## Claude Code Becomes a Background Worker With Scheduled Tasks

**TLDR:** Anthropic has added local scheduled task capabilities to Claude Code, turning it into a background automation agent that can run recurring jobs like nightly code audits and dependency updates without manual intervention.

**Summary:**

This is a genuinely interesting product evolution. Claude Code started as an interactive coding assistant, but scheduled background tasks transform it into something more like a persistent development operations agent. Think of it as cron jobs, but instead of running a script you wrote, you are running an AI agent that can reason about your codebase.

The use cases Anthropic is highlighting -- nightly code audits, dependency updates -- are the kind of toil that developers know they should do regularly but rarely get around to. Having an AI agent that just handles this automatically is appealing. Imagine waking up to a pull request that updates your dependencies, runs your test suite, and provides a summary of what changed and why, all generated while you slept.

What the announcement does not address, and what is worth thinking hard about, is the trust and oversight question. When you run Claude Code interactively, you can review what it is doing in real-time. When it runs as a background scheduled task, you are trusting it to make decisions autonomously. That is a fundamentally different risk profile. What happens when the nightly code audit decides to "fix" something that was not actually broken? What are the guardrails? How do you audit the auditor?

For teams and architects considering this, the practical concern is: how does this fit into your existing CI/CD pipeline? You already have automated testing, linting, and dependency scanning tools. Claude Code as a background worker needs to complement these, not create a parallel automation path that duplicates effort or, worse, conflicts with your existing workflows. The integration story is what will determine whether this is transformative or just another tool generating noise.

There is also the broader strategic angle. Anthropic is pushing hard into the "AI as a team member" space rather than "AI as a tool." Scheduled tasks are what real team members do -- they take ownership of recurring responsibilities. This is a deliberate positioning move, and it signals where the whole industry is headed.

**Key takeaways:**
- Claude Code can now run as a scheduled background worker for recurring development tasks
- Nightly code audits, dependency updates, and other maintenance toil can be automated
- Trust and oversight become critical when AI agents operate autonomously without real-time human review
- Teams should carefully consider how background AI agents integrate with existing CI/CD and automation pipelines
- This signals a broader shift from "AI as tool" to "AI as autonomous team member"

**Link:** [Anthropic Turns Claude Code Into a Background Worker With Local Scheduled Tasks](https://the-decoder.com/anthropic-turns-claude-code-into-a-background-worker-with-local-scheduled-tasks/)

---

## Gemini 3.1 Flash-Lite: Google Makes Fast AI Dramatically Cheaper

**TLDR:** Google released Gemini 3.1 Flash-Lite at just 25 cents per million input tokens with 2.5x faster response times, making it their most affordable and fastest model. This is aimed squarely at high-volume, latency-sensitive applications.

**Summary:**

Google is playing the pricing game aggressively. Gemini 3.1 Flash-Lite at 25 cents per million input tokens is not just cheap -- it is approaching the point where the cost of the API call becomes negligible compared to the engineering time spent integrating it. At this price point, you can afford to be wasteful with tokens in a way that was not practical before.

The 2.5x speed improvement is arguably more important than the price. For real-time applications -- chatbots, inline code completion, search augmentation -- latency is the constraint that users actually feel. A model that is good enough and fast enough beats a model that is better but slower in most production scenarios.

What Google is not highlighting, and what developers need to think about carefully, is the capability tradeoff. "Flash-Lite" is not "Flash," and "Flash" is not "Pro." You are getting speed and price at the expense of reasoning depth. For many applications -- summarization, classification, simple Q&A, content filtering -- this is absolutely fine. But if you try to use Flash-Lite for complex multi-step reasoning, architectural analysis, or nuanced code generation, you are going to be disappointed.

The strategic implications for architects are worth considering. With models at this price point, you can build multi-model architectures where a cheap, fast model handles the initial triage and routing, and a more capable model handles the complex cases. This pattern -- using different models for different parts of the same pipeline -- is becoming the standard approach, and Google pricing Flash-Lite this aggressively is making the economic case even more compelling.

What is missing from the conversation is any discussion of quality benchmarks specific to the tasks where Flash-Lite will actually be deployed. Marketing a model as "fast and cheap" without being transparent about where it falls short is a pattern we see across all the model providers. Teams should run their own evaluations on their specific use cases before committing to a model at this tier.

**Key takeaways:**
- At 25 cents per million input tokens, Gemini Flash-Lite makes token costs near-negligible for high-volume applications
- 2.5x faster response times make it suitable for latency-sensitive production use cases
- The capability-speed-cost tradeoff means this model is best for simpler tasks like classification, summarization, and routing
- Multi-model architectures that combine cheap fast models with capable slower models are becoming the standard pattern
- Teams should benchmark Flash-Lite against their specific workloads rather than relying on general marketing claims

**Tradeoffs:**
- Speed and cost versus reasoning capability -- Flash-Lite excels at simple, high-volume tasks but is not suitable for complex reasoning
- Using a single powerful model versus a multi-model pipeline adds architectural complexity but can optimize both cost and quality

**Link:** [Gemini 3.1 Flash-Lite](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/)

---

## Red Hat and NVIDIA Announce Joint AI Factory for Enterprise

**TLDR:** Red Hat and NVIDIA are partnering to deliver production-ready AI infrastructure and a new enterprise AI suite aimed at large organizations looking to deploy AI at scale within their existing infrastructure.

**Summary:**

This partnership is squarely aimed at the enterprise market that is still struggling to move AI from proof-of-concept to production. Red Hat brings the OpenShift and RHEL ecosystem that most large enterprises already run on, and NVIDIA brings the GPU infrastructure and AI software stack. Together, they are trying to solve the "last mile" problem of enterprise AI deployment.

The pitch makes sense on paper. Most enterprises do not want to build AI infrastructure from scratch. They want something that plugs into their existing container orchestration, security policies, and operational workflows. A joint "AI Factory" that combines Red Hat's enterprise Linux and Kubernetes expertise with NVIDIA's GPU and inference optimization could significantly lower the barrier to production AI deployment.

What is conspicuously absent from the announcement is any discussion of the cost model. Enterprise AI infrastructure is expensive, and combining two premium vendors is not going to make it cheaper. For organizations that are already running on cloud-native infrastructure, the question is whether this on-premises-centric approach provides enough benefit over simply using managed AI services from AWS, Azure, or GCP. The data sovereignty and compliance angle is real, but it applies to a subset of enterprises, not all of them.

The other thing worth noting is that this kind of announcement -- two large vendors partnering to sell enterprise AI infrastructure -- does not actually advance the state of AI itself. It is a distribution and packaging play. For teams that are already successfully deploying models on their own infrastructure, this may not offer anything new. It is most valuable for organizations that have the budget but not the in-house expertise to stand up AI workloads at scale.

**Key takeaways:**
- Red Hat and NVIDIA are targeting the enterprise gap between AI proof-of-concept and production deployment
- The partnership combines enterprise Linux and Kubernetes expertise with GPU infrastructure and AI software
- Cost implications are not addressed and may make this approach less competitive than managed cloud AI services
- Most valuable for large organizations with compliance requirements and limited in-house AI infrastructure expertise
- This is a distribution and packaging play, not a technology advancement

**Link:** [Red Hat AI and NVIDIA Partnership](https://www.redhat.com/en/blog/friday-five-march-6-2026-red-hat)
