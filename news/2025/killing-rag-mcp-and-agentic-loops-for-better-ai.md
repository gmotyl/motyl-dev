---
title: "The Counterintuitive Move: Why Killing RAG, MCP, and Agentic Loops Led to a Better AI Product"
excerpt: "A case study from the trenches on how simplifying an AI agent's architecture by removing popular but complex components like RAG and MCP resulted in a faster, more stable, and scalable product."
publishedAt: "2025-12-23"
slug: "killing-rag-mcp-and-agentic-loops-for-better-ai"
hashtags: "#decodingai #substack #ai #rag #mcp #agents #architecture #generated #en"
---
## We Killed RAG, MCP, and Agentic Loops. Here's What Happened.
**TLDR:** The ZTRON team built a vertical AI agent for financial advisors and found that their initial complex architecture, using trendy technologies like multi-index RAG and MCP, created a slow and unstable application. They achieved stability, performance, and scalability by simplifying their stack, replacing agentic RAG with Context-Aware Generation (CAG) for many tasks, and using durable workflows for background processing.

**Summary:**
This is a fascinating story from Paul Iusztin about the real-world engineering journey of building ZTRON, a vertical AI agent for financial advisors. It’s a cautionary tale about the allure of hype-driven development. The team initially went all-in on the popular buzzwords of early 2025: a complex, multi-modal RAG (Retrieval-Augmented Generation) pipeline and an MCP (Model-as-a-Component-Protocol) layer for third-party integrations. The idea was to build a system that could answer complex user queries by synthesizing information from various data sources like PDFs, emails, and even images.

The reality, however, was a slow, expensive, and unstable application. The "agentic RAG," which was supposed to enable multi-step reasoning, resulted in a "zigzag" pattern of constant retrieval and re-retrieval, drastically increasing latency. Similarly, implementing MCP for integrations like Gmail and Calendar added an unnecessary layer of abstraction, as most required services didn't have ready-made MCP servers, forcing the team to build them from scratch. It was a classic case of over-engineering for a future that hadn't arrived.

The turning point came when they decided to return to fundamentals. They decoupled their heavy RAG ingestion pipeline from the main API server using DBOS, a durable workflow tool that used their existing Postgres database. This simple change allowed them to scale ingestion from a few documents to hundreds. To further optimize, they separated their infrastructure into a lightweight group for the API and another auto-scaling group of ephemeral workers for heavy processing, all orchestrated by a simple queue-monitoring controller. This provided a scalable and cost-effective solution without the overhead of Kubernetes.

The most significant shift was moving from RAG to CAG (Context-Aware Generation) for many of their specialized agents. They realized that for most user sessions, the relevant context was less than 64k tokens, which modern LLMs can handle directly. By loading all necessary data into the prompt, they eliminated the unpredictable and latent retrieval step, resulting in a single, deterministic LLM call. This made the system faster and more reliable. They still use RAG for open-ended queries, but the core, specialized features now rely on this much simpler approach. The author argues that the future of vertical AI agents lies not in bigger RAG pipelines but in smarter context management, potentially using simple Knowledge Graphs and a hybrid approach with Small Language Models (SLMs) for specialized tasks.

**Key takeaways:**
-   Following the hype cycle can lead to over-engineered, complex, and unstable systems.
-   Agentic RAG can introduce significant latency and cost due to its "zigzag" retrieval pattern. Use it judiciously.
-   Adopting protocols like MCP before the ecosystem is mature can lead to writing unnecessary boilerplate and abstraction layers.
-   Decoupling heavy background tasks (like RAG ingestion) from your main application server is crucial for scalability and stability. Durable workflow tools can simplify this process.
-   For specialized tasks with bounded context, Context-Aware Generation (CAG) can be a faster, cheaper, and more reliable alternative to RAG.

**Tradeoffs:**
-   **RAG vs. CAG:** RAG offers flexibility for querying massive, open-ended datasets but sacrifices determinism and performance. CAG provides a fast and reliable experience for specialized tasks but is limited by the LLM's context window size.
-   **Microservices vs. Simple Distributed System:** A full microservices architecture with Kubernetes offers ultimate scalability but comes with high operational overhead. A simpler distributed system using durable queues (like DBOS) and separate worker groups provides a good balance of scalability and simplicity, especially during initial product development.

**Link:** [We Killed RAG, MCP, and Agentic Loops. Here's What Happened.](https://www.decodingai.com/p/building-vertical-ai-agents-case-study-1?publication_id=1526003&post_id=181973383&isFreemail=true&triedRedirect=true)
