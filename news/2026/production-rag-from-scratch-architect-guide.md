---
title: "Why Most RAG Tutorials Fail You: Building Production-Grade Retrieval From Scratch"
excerpt: "A senior architect deconstructs RAG with a production-first mindset, skipping theoretical demos to focus on idempotent ingestion, debuggable retrieval, and controllable generation."
publishedAt: "2026-03-12"
slug: "production-rag-from-scratch-architect-guide"
hashtags: "#substack #ai #llm #architecture #postgresql #langchain #python #observability #mcp #generated #en"
---

## Why Most RAG Tutorials Fail You: Building Production-Grade RAG From Scratch

**TLDR:** Priya, a senior software architect, shares how she built a production-grade RAG system by deliberately rejecting framework-managed chains in favor of explicit control flow. The system covers idempotent ingestion, debuggable retrieval, and generation with the LLM treated as an unreliable dependency, all backed by Postgres plus pgvector instead of a separate vector database.

I have been saying for years that the gap between demo code and production code is where careers are made or broken. This article from Priya at Decoding AI is one of the clearest illustrations of that principle I have seen in the RAG space. She is not showing you how to get an answer out of a model. She is showing you how to build a system that survives contact with reality, and that distinction matters enormously.

The core philosophy here, heavily influenced by Paul Iusztin's "From 100+ AI Tools to 4" essay, is that AI frameworks like LangChain are good utilities but should never dictate your architecture or control flow. Priya uses LangChain for specific things like document loaders and LLM provider abstraction, but the pipeline orchestration is entirely her own code. Every step -- file discovery, document loading, text normalization, chunking, embedding, storage -- is isolated, independently loggable, and independently replaceable. When something breaks, she debugs her code, not a framework-managed chain. This is a pattern that experienced backend engineers will recognize immediately, but it runs counter to the way most RAG tutorials teach you to build.

The ingestion pipeline design deserves special attention. Priya hashes every file's contents. If the hash matches what is already stored, the file is skipped. If content has changed, old chunks and embeddings are completely removed before new ones are written. This idempotency means you can tweak chunk sizes, swap embedding models, or change preprocessing logic, then re-run the entire pipeline and trust the result. Without this, every experiment means manually cleaning up the database or, worse, not realizing stale data is silently affecting retrieval quality. She chose Postgres with pgvector over a dedicated vector database, which means chunks, embeddings, and metadata all live together. You can inspect ingestion results with plain SQL, join vectors with relational metadata, and reproduce retrieval behavior outside the application. That inspectability is not just a learning aid -- it is an operational lifeline when things go wrong in production.

The retrieval and generation layers follow the same philosophy of explicit control. Retrieval is not hidden inside a chain call. It is a sequence of explicit function calls: query preprocessing, embedding, similarity search, optional reranking. When an answer is wrong, you can pinpoint whether the issue came from query preprocessing, embedding quality, recall, or ranking. Generation treats the LLM as an unreliable dependency from day one, with retries for transient failures and a factory pattern that makes swapping providers a configuration change rather than a code change. Priya makes a critical distinction that many tutorials blur: retrieval is a search problem (it fails by missing relevant information or burying it in noise), while generation is a reasoning problem (it fails by misinterpreting context or hallucinating). Keeping that boundary explicit is what lets you diagnose which problem you actually have.

What I find particularly forward-thinking is the serving layer architecture. Priya built her RAG core as a standalone library with a pure function that takes a Pydantic object and returns one. It knows nothing about HTTP, headers, or JSON. She then wraps it with two thin adapters: a REST API for traditional software systems and an MCP server for tool-using LLMs. The MCP exposure transforms the RAG pipeline from an application feature into a standardized capability that Claude Desktop, Cursor, or autonomous agents can invoke directly. For architects thinking about how AI capabilities will be composed in the future, this adapter pattern is exactly right. Your RAG system becomes a building block that multi-agent workflows can incorporate without custom integration code.

Now, let me push back on a few things. The article skips over evaluation almost entirely, listing it as a "next step." In practice, you cannot meaningfully iterate on a RAG system without systematic evaluation of retrieval quality and faithfulness. Building all this observability infrastructure without a way to measure whether your changes actually improve answers is like instrumenting a web application without defining SLOs. The traceability work is necessary but not sufficient. Additionally, the choice to avoid LCEL and runnable abstractions is defensible while learning, but in a team setting with multiple engineers, some level of standardized composition becomes valuable for consistency. The explicit approach trades team scalability for individual debuggability, and that tradeoff deserves acknowledgment.

**Key takeaways:**
- Use AI frameworks as utilities for specific tasks (document loading, LLM abstraction) but own the control flow and pipeline orchestration yourself
- Idempotent ingestion with content hashing makes experimentation safe and production pipelines resilient to partial failures
- Postgres plus pgvector eliminates the need for a separate vector database and enables SQL-based inspection of the entire retrieval pipeline
- Keep the retrieval-generation boundary explicit: retrieval is a search problem, generation is a reasoning problem, and conflating them makes diagnosis impossible
- Expose RAG capabilities through thin adapter layers (REST and MCP) over a framework-agnostic core library to maximize reusability across integration contexts

**Tradeoffs:**
- Gain full debuggability and control over every pipeline step but sacrifice the development speed that higher-level framework abstractions provide
- Gain the inspectability of a single Postgres database for vectors and metadata but sacrifice the specialized performance optimizations of dedicated vector databases at scale
- Gain provider-agnostic LLM integration through a factory pattern but sacrifice access to provider-specific features and optimizations
- Gain serving flexibility through the adapter pattern (REST plus MCP) but sacrifice the simplicity of a single tightly-coupled serving layer

**Link:** [Why Most RAG Tutorials Fail You](https://www.decodingai.com/p/production-rag-from-scratch-senior-architect-guide)