---
title: "The Reality of Production AI: Less RAG, More Evals"
excerpt: "A brutally honest look at shipping vertical AI agents to production — why teams are ditching RAG for context-window loading, skipping MCP layers, and building real evaluation pipelines instead of vibe checking."
publishedAt: "2026-04-02"
slug: "reality-of-production-ai-less-rag-more-evals"
hashtags: "#substac #ai #evals #rag #agents #generated #en"
source_pattern: "Substac"
---

## The AI Evals Series: Moving Beyond Vibe Checking

**TLDR:** Building an AI agent is the easy part — knowing if it actually works is where most engineers get stuck. This 7-part series walks through building real evaluation pipelines with datasets, evaluators, and a full harness integrated into your AI app.

**Summary:** There's a dirty secret in AI development that most teams are reluctant to admit: the majority of "testing" happening in production AI systems is what can charitably be called vibe checking. You run a few inputs, eyeball the outputs, and if nothing looks obviously broken, you ship. That works exactly once — for your first demo. The moment you're dealing with scale, edge cases, or a model change, you're flying blind.

Paul Iusztin and the Substac crew have been building out a comprehensive answer to this problem in the form of a 7-part series on AI Evals. The series starts from first principles: where does evaluation fit into your development lifecycle, and why does it need to be treated as a first-class engineering concern rather than an afterthought? The argument is compelling — if you can't measure performance, you can't improve it, and if your only measurement tool is your own gut, you're not engineering, you're guessing.

The series then moves into the practical mechanics of evaluation. Lesson two tackles the dataset problem directly: you can't evaluate what you haven't measured, and you can't measure without data that actually represents your system's behavior. Lesson three takes this a step further by addressing the cold start problem — what do you do before you have real production traffic? The answer is synthetic data generation, which fills the coverage gaps that real-world traces will always leave behind, especially for rare failure modes you haven't encountered yet.

What's honest about this series is its acknowledgment that the tooling around AI evaluation is still immature. The goal isn't to sell you on a specific framework — it's to get you thinking systematically. Building eval datasets, writing evaluators that can judge outputs programmatically, and wiring all of it into a harness that runs against your actual app: these are engineering problems, not research problems. And they deserve engineering solutions.

**Key takeaways:**
- Vibe checking fails at scale — systematic evals are essential for production AI
- You need eval datasets before you can measure anything meaningful
- Synthetic data solves the cold start problem and covers rare failure modes
- Evals must be integrated into the development lifecycle, not bolted on later
- A full eval harness includes datasets, evaluators, and integration with your live app

**Why do I care:** As a senior frontend dev who's increasingly being asked to integrate AI features into production apps, this series addresses the gap that nobody talks about. We have great tools for building AI features, but almost no culture around testing them rigorously. The discipline described here — treating AI evaluation like a test suite — is exactly the mindset shift our industry needs before we ship another "it worked in the demo" AI feature to real users.

**Link:** [The AI Evals Series](https://substack.com/redirect/d76481b2-83ad-4b19-a93e-7931f1a18eb2?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

---

## The ZTRON Story: Why They Killed RAG and MCP

**TLDR:** After shipping a vertical AI agent to production, the team discovered that many of their architectural choices — RAG, MCP layers, complex orchestration — were adding complexity without value. Stripping it all back made the product stable and fast.

**Summary:** There's a certain kind of engineering post-mortem that's worth its weight in gold: the one where someone is genuinely honest about what didn't work and why. Paul Iusztin's talk in San Francisco about ZTRON, the vertical AI agent he's been building for the past year, is one of those posts. The headline is counterintuitive enough to stop you mid-scroll: they stopped using RAG for many of their agents.

The reasoning is actually quite sound once you sit with it. Retrieval Augmented Generation made a lot of sense when context windows were tiny — you couldn't fit all your data in, so you had to fetch the relevant bits. But context windows have grown dramatically. Gemini now supports over a million tokens. If your data fits in the context window, just load it all. The retrieval step introduces latency, complexity, and failure modes. Removing it, where feasible, made ZTRON faster and more reliable. It's a classic case of a best practice becoming outdated as the underlying constraints change.

The MCP critique is equally pointed. The team spent significant time wrapping standard APIs in MCP layers, apparently operating under the assumption that modularity always pays off. It didn't. For ZTRON, the abstraction added overhead without delivering the benefits that would justify it. The lesson here isn't that MCP is universally bad — it's that you should only add architectural complexity when you have a concrete reason to, not because a pattern looks good on paper. Keep it simple until you actually need the modularity.

The third pillar of ZTRON's architecture is the use of DBOS for durable workflows. Heavy background tasks that previously would have required complex Kubernetes orchestration are now handled more simply. This is the kind of practical trade-off that gets lost in the hype — the best architecture isn't the most sophisticated one, it's the one your team can actually operate at three in the morning when something goes wrong.

**Key takeaways:**
- Context-window loading (CAG) is often more practical than RAG when data fits
- MCP abstraction layers can add complexity without proportional benefit
- Keep architecture simple until you have specific reasons to add modularity
- Durable workflows with tools like DBOS can replace complex Kubernetes setups
- Production stability often comes from removing complexity, not adding it

**Why do I care:** This resonates deeply. The AI tooling ecosystem is moving so fast that best practices from eighteen months ago are already obsolete. RAG was a reasonable solution to a constraint that has since been largely lifted by larger context windows. The willingness to revisit and discard architectural choices that no longer earn their complexity is exactly the kind of engineering discipline that separates teams that ship reliable software from those that maintain impressive slide decks.

**Link:** [The ZTRON Story: Why We Killed RAG and MCP](https://substack.com/redirect/ab81004d-f3b4-4bbb-8d95-8c2f79a5014a?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

---

## GraphRAG: Giving Agents a Better Mental Map of Complex Systems

**TLDR:** When your technical documentation is deeply interconnected, standard RAG loses the relational context that makes that documentation useful. GraphRAG preserves those relationships, enabling agents to understand not just what documents say but how concepts within them relate to each other.

**Summary:** Here's a scenario that will feel familiar if you've worked with RAG on complex codebases or technical documentation: you ask a question, the retrieval step pulls back the right documents, but the generated answer is still wrong or incomplete because it misses the relationships between those documents. Standard RAG treats your knowledge base as a collection of independent chunks. But real technical systems — and the documentation describing them — are graphs, not bags of text.

Anca Ioana Muscalagiu's piece on GraphRAG addresses this gap directly with an application that should make any engineering team sit up: building agents that can handle production crises. The scenario involves an agent that needs to understand not just individual runbooks or architecture docs, but the organizational and technical relationships between systems. Which team owns which service? Which services depend on which databases? What's the blast radius of this outage?

GraphRAG solves the problem by representing your knowledge base as a graph of entities and relationships rather than a flat collection of chunks. When an agent queries this graph, it gets back not just the relevant text but the relational context — the connections that let it reason about how things fit together. For interconnected technical documentation, this is the difference between an agent that can follow a chain of reasoning across multiple documents and one that gets lost because it can't see beyond the boundaries of a single retrieved chunk.

The production crisis use case is deliberately high-stakes, and that's the point. If GraphRAG can work in that environment — where the cost of getting it wrong is measured in downtime and engineering hours — it can work for less critical applications too. The architecture requires more upfront investment to build the knowledge graph, but the payoff in reasoning quality for complex, interconnected domains justifies the work.

**Key takeaways:**
- Standard RAG loses relational context that's often critical for complex technical domains
- GraphRAG represents knowledge as entities and relationships, not just text chunks
- Particularly valuable when documentation is highly interconnected
- Enables agents to reason across document boundaries, not just within them
- Production crisis management is a compelling real-world validation of the approach

**Why do I care:** As someone who's spent time trying to make AI assistants useful for large codebases, the core problem here is immediately recognizable. Code is a graph. Architecture is a graph. Standard RAG doesn't know that. GraphRAG is the architecturally honest answer to a problem that naive RAG-based tooling has been papering over with longer context windows. This is the kind of work that moves AI engineering forward rather than just scaling existing approaches.

**Link:** [GraphRAG: Giving Agents a Better Mental Map](https://substack.com/redirect/d143cfdf-9b6c-44e0-ae25-7f941eccb531?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)
