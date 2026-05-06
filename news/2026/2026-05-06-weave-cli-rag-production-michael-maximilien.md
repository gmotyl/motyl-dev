---
title: "How One Engineer Stopped Guessing and Shipped RAG to Production with Weave CLI"
excerpt: "A deep-dive interview with Michael Maximilien on building a unified RAG toolchain that wraps 11 vector databases behind one interface, with observability baked in from the first commit."
publishedAt: "2026-04-29"
slug: "weave-cli-rag-production-michael-maximilien"
hashtags: "#ai #ml #generated #en #rag #vectordb #llm #engineering"
source_pattern: "Decoding AI"
---

## How One Engineer Stopped Guessing and Shipped RAG to Production

**TLDR:** Michael Maximilien, former IBM Distinguished Engineer and now CEO of ClawMax.ai, built Weave CLI to solve a problem he kept running into: RAG systems that demo beautifully but collapse in production. The tool unifies 11 vector databases behind a single interface, with first-class observability via Opik built in from the start, so every configuration change is measured rather than guessed.

**Summary:** There's a pattern in AI engineering teams that I find both relatable and exhausting to watch. The RAG proof-of-concept gets everyone excited. The demo works. Then it hits production, and suddenly the same query returns three different answers across releases. Someone swaps a configuration knob. Nobody tracks whether it helped. The trust in the system quietly erodes. Max, as Michael Maximilien goes by, spent a year living inside this loop across customer after customer, and he got tired of it.

His experience building RAG systems professionally reads like a catalog of production failure modes. Halfway through an ingestion run, Milvus would run out of memory, leaving two of three collections ingested and the third broken. Nobody on the team knew why something changed, just that it did. Every new project meant re-picking a vector database, re-selecting an embedding model, re-chunking the data, and starting the same iteration cycle from scratch, but without measurements to guide it.

So Max built Weave CLI, an open-source command-line tool that wraps 11 vector databases, including Weaviate, Milvus, Qdrant, PGVector, and MongoDB, behind a single interface. The design philosophy is simple and I think correct: switching a database, an embedding model, or an agent should be a config change, not a migration project. And critically, every switch should be tracked and evaluated through Opik, an open-source observability and evaluation platform baked in from the first commit. If you haven't measured the change, you haven't shipped the change.

The architecture walks through a real example, ingesting a Leica Noctilux auction catalog of 426 lens listings, each with a photo and caption. A FileScanner walks the files, applies SHA256 deduplication, and ensures re-runs are idempotent. The DocumentProcessor handles text extraction and OCR on lens barrel photos. The ChunkingAgent then selects the best chunking strategy per document, which matters more than most people realize: public benchmarks show that swapping between recursive, sentence-level, and token-level chunking strategies can shift retrieval accuracy by double-digit percentages on the same corpus. That's not a small number, and it's not something you can feel your way through without measurements.

Embeddings follow, with OpenAI's text embedding model as the default but Ollama-based local models available when you need to avoid API rate limits at scale. The BatchWriter handles durability with checkpoint and resume, so a network failure during a large ingestion doesn't force you to rebuild from scratch. At query time, a QueryAgent classifies user intent, a PlanningAgent decides which collections to hit, and a ContextBuilder merges results across image and caption vectors. Max ships 12 built-in agents, all configurable via YAML.

**Key takeaways:**
- Weave CLI unifies 11 vector databases behind a single swappable interface, making database migrations a config change rather than a rewrite
- Observability via Opik is first-class from the start, meaning every configuration experiment is measured and comparable
- Chunking strategy is a top-tier variable: switching between recursive, sentence-level, and token-level approaches can shift retrieval accuracy by double-digit percentages
- The BatchWriter's checkpoint and resume functionality prevents multi-hour ingestion rebuilds from a single network failure
- Max's recommendation as of April 2026: Weaviate for cloud deployments, Qdrant for self-hosted, PGVector surprised him by being the most incompatible on paper yet still fitting the unified interface cleanly

**Why do I care:** As someone who thinks about how frontend applications consume backend services, the "unified interface over swappable backends" pattern is something I've lived with for years in a different context. What makes Weave CLI interesting to me as an architect isn't the vector database support, it's the measurement discipline. The RAG ecosystem has a problem where teams make decisions based on vibes and blog posts rather than on their own data. Baking Opik in from commit one rather than bolting it on later is exactly the kind of structural choice that separates systems that survive production from systems that POC well. The lesson here applies well beyond RAG: if you're iterating on a system without a feedback loop, you're not engineering, you're guessing.

**Link:** [How One Engineer Escaped RAG's POC Purgatory](https://www.decodingai.com/p/ship-rag-with-weave-cli)
