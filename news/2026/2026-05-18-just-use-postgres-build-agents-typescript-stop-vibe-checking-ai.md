---
title: "Just Use Postgres, Build Agents in TypeScript, and Stop Vibe-Checking AI"
excerpt: "HackerNoon's May 17 edition covers the case for Postgres as your only database, production-ready agentic AI in TypeScript, vibe-coded app security risks, clean data for LLMs, and the rise of Eval-Ops."
publishedAt: "2026-05-18"
slug: "just-use-postgres-build-agents-typescript-stop-vibe-checking-ai"
hashtags: "#hackernoon #postgresql #typescript #agenticai #evalops #vibecoding #llm #generated #en"
source_pattern: "HackerNoon"
---

## It's 2026, Just Use Postgres

**TLDR:** Tiger Data, the team behind TimescaleDB, argues that modern teams can replace Elasticsearch, Redis, Pinecone, Kafka, and MongoDB by leaning on Postgres with the right extensions. It is a compelling case for simplifying your data stack in the AI era.

**Summary:** I have to say, this one hit me in the gut in the best possible way. For years, the default move in any growing startup was to bolt on another specialized database the moment you hit the edges of your current one. Need full-text search? Spin up Elasticsearch. Need a cache? Redis. Need vector search? Pinecone. Need a message queue? Kafka. The result was a distributed tangle of infrastructure that required five different teams to operate, five different failure modes to understand, and five different cost line items to justify.

The argument here is simple and, in 2026, increasingly hard to dismiss: Postgres has grown up. With extensions like pgvector for vector similarity search, pg_bm25 for full-text ranking comparable to Elasticsearch, and TimescaleDB for time-series workloads, the modern Postgres instance can handle an extraordinary range of workloads. The "single database architecture" approach the article champions is not a compromise, it is a design decision.

What makes this argument land particularly well right now is the AI context. RAG pipelines, embedding storage, metadata filtering, and query results all living in the same database with proper ACID guarantees and familiar SQL tooling is genuinely attractive. You stop paying the tax of cross-system consistency and network hops between your relational data and your vector index.

There is a real conversation to have about whether this works at extreme scale. Nobody is suggesting you migrate Uber's real-time data platform to a single Postgres instance. But for the vast majority of teams building production AI applications, the article makes a credible case that the multi-database default is more habit than necessity.

**Key takeaways:**
- Postgres extensions now cover vector search, full-text search, time-series, and streaming use cases
- A single-database architecture reduces operational complexity and improves data consistency
- The AI era actually favors consolidated data stores, since RAG and embedding workflows benefit from co-location with relational data
- This is not for every scale, but it is right for more teams than currently practice it

**Why do I care:** As someone who has watched teams spiral into data infrastructure debt, this resonates. Every additional database you introduce is a new operational surface area, a new connection pool, a new migration story, a new monitoring dashboard. If Postgres can handle your vector search and your time-series and your full-text search without meaningful trade-offs, the default should be Postgres first and specialized tools only when you can clearly articulate what you are giving up.

**Link:** [It's 2026, Just Use Postgres](https://hackernoon.com/its-2026-just-use-postgres)

---

## How to Build Production-Ready Agentic AI Systems with TypeScript

**TLDR:** Engineering Manager Raju Dandigam walks through building production-grade agentic AI in TypeScript, covering tool orchestration, reasoning loops, observability, and human-in-the-loop patterns. At 35 minutes of reading, this is a substantial technical guide.

**Summary:** This is the kind of article I wish existed two years ago when everyone was still experimenting with one-off scripts that called GPT-4 in a while loop and called it an agent. Dandigam is writing from real engineering management experience, and it shows in the structure. He is not just describing what agents are, he is describing how you actually ship them.

The TypeScript angle matters here. Most of the serious agentic AI tooling has been Python-first, and there is a reason for that. But TypeScript has a few properties that make it genuinely interesting for production agent work. The type system lets you describe tool schemas in a way that both your agent runtime and your human developers can read and validate. The ecosystem of Node.js observability tooling is mature. And if you are building agents that interact with web-facing systems, you are probably already in TypeScript territory.

The human-in-the-loop section is worth the price of admission alone. The failure mode that kills agentic systems in production is not usually the LLM making a wrong decision. It is the system not knowing when to pause and ask. Getting that escalation logic right, knowing when the agent should proceed autonomously and when it should surface a decision to a human, is the actual engineering problem. Dandigam addresses this directly.

Observability is the other piece that separates toy demos from production systems. Agents that run reasoning loops are notoriously hard to debug after the fact because the state is ephemeral and the decision path is implicit. The article covers how to instrument your loops so you have something to look at when things go wrong at 2am.

**Key takeaways:**
- TypeScript is a viable and increasingly practical choice for production agentic AI systems
- Structured tool orchestration with typed schemas reduces errors and improves maintainability
- Human-in-the-loop patterns need explicit design, not afterthought implementation
- Observability for reasoning loops requires deliberate instrumentation from day one

**Why do I care:** Frontend and full-stack developers are being handed agent work whether they asked for it or not. If you are already in TypeScript, this is the guide that gets you from "I can make the API call" to "I can ship this to production with confidence." The architecture patterns described here, tool registries, reasoning loop state management, escalation logic, are the same patterns I expect to become as standard as Redux patterns were in 2018.

**Link:** [How to Build Production-Ready Agentic AI Systems with TypeScript](https://hackernoon.com/how-to-build-production-ready-agentic-ai-systems-with-typescript)

---

## Vibe-coded Mac Apps Are Arriving Fast — Here Is What Gets Lost in the Process

**TLDR:** MacPaw examines the wave of AI-generated Mac utilities flooding the market, arguing that while they ship fast, many lack reliability, security review, and the kind of careful engineering that makes a system utility trustworthy on your machine.

**Summary:** MacPaw makes Mac software for a living, so they have obvious skin in this game, but that does not make their argument wrong. The vibe-coding phenomenon has made it trivially easy to ship a Mac app that does one thing in a weekend. You describe what you want, an AI builds most of it, you package it and post it on Product Hunt, and by Monday you have downloads. That speed is real and the creativity it unlocks is genuine.

The problem is that Mac system utilities sit in a particular threat model. A free app that monitors your menu bar, manages your clipboard, or tweaks your network settings has significant system access. The engineering decisions that make these apps safe are invisible to users and require exactly the kind of careful, boring, deliberate work that vibe-coding skips. Code review, security audits, minimal permission requests, proper sandboxing, responsible update mechanisms. These things do not emerge from a prompt.

The article from MacPaw is not anti-AI. It is a call for users to think more carefully about what they are installing, and for developers shipping AI-assisted utilities to be honest about what they have and have not reviewed. The app working is not the same as the app being safe. That gap is where trust gets destroyed.

I find this genuinely interesting as a software quality argument. The same pressure that is making agents ship faster is also eroding the feedback loops that caught quality problems. When a human wrote every line, the human at least saw every line. That is no longer true, and the industry has not yet figured out what replaces that review mechanism.

**Key takeaways:**
- AI-generated Mac utilities are shipping faster but often without adequate security review
- System utilities require elevated trust that should be earned through deliberate engineering, not assumed
- Free macOS tools that request broad system permissions deserve extra scrutiny from users
- The speed advantage of vibe-coding comes at a cost to the engineering discipline that makes software trustworthy

**Why do I care:** This is not just a macOS story. Every platform is accumulating AI-generated utilities, plugins, and integrations at a pace that quality processes cannot keep up with. As developers who review dependencies, approve PRs, and set team tooling standards, we are the ones who need to ask whether the tool we are about to install actually had a human read its network code. The answer is increasingly uncertain.

**Link:** [Vibe-coded Mac apps are arriving fast — here is what gets lost in the process](https://hackernoon.com/vibe-coded-mac-apps-are-arriving-fast-here-is-what-gets-lost-in-the-process)

---

## Garbage In, Hallucinations Out: How Clean Data Drives LLM Performance

**TLDR:** A practical examination of how data quality directly shapes LLM behavior in enterprise systems, with specific focus on RAG pipelines and how validated, clean data reduces hallucinations and improves retrieval accuracy.

**Summary:** The title is a riff on the classic "garbage in, garbage out" computing maxim, and the point lands. There is a pattern I have seen repeatedly in organizations deploying RAG-based AI systems: they spend enormous energy choosing the right model and the right embedding strategy, then they feed the system documents that were never designed to be machine-readable. Scanned PDFs with poor OCR, HTML pages with navigation cruft, internal wikis with contradictory outdated sections. The model does its best and hallucinates to fill the gaps.

The article from Melissa India makes the case that data cleaning and validation should happen before your embedding pipeline, not as an afterthought. This means deduplication, format normalization, metadata enrichment, and conflict resolution in your source documents. It is unglamorous work. It is exactly the kind of work that tends to get skipped when a team is excited about deploying AI quickly.

The RAG performance angle is where this gets concrete. A retrieval system that returns three documents, two of which are outdated and one of which is a duplicate of another, gives your LLM conflicting signals. The model has no reliable way to know which version is authoritative. Clean data with good temporal metadata and explicit versioning gives the retrieval step a fighting chance to surface what actually answers the question.

Enterprise AI systems are also where this matters most, because the stakes of a confident-but-wrong answer are higher. Customer service, legal document review, medical information retrieval. These are the contexts where data quality is not a nice-to-have, it is a safety property.

**Key takeaways:**
- LLM hallucinations in RAG systems often trace back to dirty or conflicting source data, not model weakness
- Data cleaning, deduplication, and metadata enrichment should precede the embedding pipeline
- Temporal metadata and versioning help retrieval systems surface authoritative documents
- For enterprise AI, data quality is a correctness and safety requirement

**Why do I care:** Every frontend team building on top of a company's internal knowledge base is implicitly depending on someone having done this data hygiene work. If you are building the AI interface layer and the retrieval layer keeps returning junk, the problem is not your prompt. Push upstream. Advocate for a data quality step in your AI pipeline the same way you would advocate for API contract testing.

**Link:** [Garbage In, Hallucinations Out: How Clean Data Drives LLM Performance](https://hackernoon.com/garbage-in-hallucinations-out-how-clean-data-drives-llm-performance)

---

## The Era of "Vibe Checking" AI is Over: Welcome to Eval-Ops

**TLDR:** Sidhesh Badrinarayan, a Tech Lead at Google, argues that the transition from building software to building intelligent agents requires a new engineering discipline called Eval-Ops, moving beyond informal "does it feel right" testing to systematic, reproducible evaluation frameworks.

**Summary:** This one is from someone who clearly lives the problem. The vibe-checking era he describes is familiar to anyone who has worked on an AI product. You run a few prompts, the outputs look reasonable, you ship. Then three weeks later you get a bug report that is actually the model doing something catastrophically wrong on an edge case you never tested. The "vibe check" told you it was fine. The actual behavior said otherwise.

Eval-Ops is Badrinarayan's term for the systematic practice of evaluating AI agent behavior with the same rigor that DevOps brought to software deployment. That means defining what good looks like before you build, creating test suites that run on every change, tracking metrics over time, and treating regressions in model behavior as real bugs requiring root cause analysis. The transition from building software to building intelligent agents fundamentally changes the role of the engineer, and Eval-Ops is his answer to what that new role looks like.

The state-retention problem he raises is particularly interesting. Traditional software testing assumes stateless functions where the same input produces the same output. Agents that maintain context across turns, update their understanding as they gather information, and make decisions based on accumulated state break that assumption. Your eval framework has to account for the fact that the same prompt in a different conversation history produces different behavior. That is a genuinely hard testing problem.

The piece references something he calls G-Val, which appears to be an internal Google framework for agent evaluation. The specific tooling is less interesting to me than the discipline it represents. Whether you use G-Val or build your own eval harness, the point is that systematic evaluation is now table stakes for shipping reliable AI systems.

**Key takeaways:**
- Informal "vibe checking" of AI outputs cannot scale to production reliability requirements
- Eval-Ops treats agent evaluation as a first-class engineering discipline with test suites, metrics, and regression tracking
- Stateful agents require evaluation frameworks that account for conversation history and context accumulation
- The engineer's role shifts from writing deterministic logic to designing and validating probabilistic systems

**Why do I care:** I have been in code reviews where someone asked "did you test this?" and the answer was "I ran it a few times and it looked fine." For deterministic code that answer is already insufficient. For AI agents it is genuinely reckless. If your team is shipping agents into production without systematic evals, you are accumulating technical debt at a rate that will eventually result in a very bad day. Eval-Ops is the discipline that prevents that day.

**Link:** [The Era of "Vibe Checking" AI is Over: Welcome to Eval-Ops](https://hackernoon.com/the-era-of-vibe-checking-ai-is-over-welcome-to-eval-ops)
