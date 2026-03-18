---
title: "RAG Evaluation Demystified: The Only 6 Metrics That Actually Matter"
excerpt: "A practical framework for evaluating RAG systems using just three variables and six relationships, cutting through vendor complexity theater."
publishedAt: "2026-03-17"
slug: "rag-evaluation-six-metrics-framework"
hashtags: "#substack #ai #llm #architecture #testing #observability #rag #generated #en"
---

## RAG Evaluation: The Only 6 Metrics You Need

**TLDR:** Every RAG system has exactly three variables — Question, Context, and Answer — producing six possible relationships. When your RAG system fails, one of these six links is broken. The article presents a tiered evaluation framework that cuts through vendor complexity and tells you exactly what to measure, when, and why.

**Summary:** There is a beautiful simplicity hiding underneath all the RAG evaluation noise, and this article from Paul Iusztin at Decoding AI does an excellent job of revealing it. The core insight comes from Jason Liu's formalization: any RAG system has three variables — the Question (Q), the retrieved Context (C), and the generated Answer (A). That gives you exactly six conditional relationships, and every single RAG failure maps to one of them. Context Relevance asks whether your retriever pulled the right documents. Faithfulness checks if your generator hallucinated beyond what the context provided. Answer Relevance verifies the end-to-end user experience. Then you have three advanced metrics — Context Support, Question Answerability, and Self-Containment — for when you need to dig deeper into subtle failure modes.

What makes this framework genuinely useful is the tiered approach to running evaluations. Tier 1 covers classical information retrieval metrics like Precision at K, Recall at K, Mean Average Precision, and Mean Reciprocal Rank. These are cheap, fast, require no LLM judges, and should run daily during development. They tell you whether your retriever even works before you bother evaluating anything downstream. Tier 2 introduces the three core RAG relationships using LLM-based grading on a weekly cadence. Tier 3 brings in the advanced diagnostic metrics monthly for catching subtle issues like insufficient context support or questions the system should refuse to answer.

The article draws from real production experience building a financial personal assistant. One practical gem stands out: the team solved the RAG dataset problem by coupling each test case with a Postgres SQL export containing documents, chunks, embeddings, and metadata. They injected this directly into storage, creating a context cache that bypassed the ingestion pipeline entirely. That is the kind of pragmatic engineering detail that separates theoretical frameworks from things that actually work in production.

There is also a smart domain-based prioritization model. High-severity domains like finance, medical, and legal should emphasize Faithfulness and Context Support because every claim must be traceable. Medium-severity domains like customer support should lead with Answer Relevance. Low-severity domains like content generation can tolerate lower Faithfulness thresholds because synthesis is expected.

Now, here is what the article dances around but never quite confronts directly. The entire framework assumes your retrieval architecture is a relatively straightforward vector search plus generation pipeline. But the moment you introduce agentic tool selection — where the model decides which data source to query — your retrieval evaluation becomes fundamentally harder. The article mentions this briefly with their CRM versus transaction database example, but treats it as a side note rather than the paradigm shift it actually represents. As RAG systems become more agentic, the clean three-variable model starts to leak.

**Key takeaways:**
- RAG evaluation reduces to six relationships between three variables (Q, C, A) — anything beyond this is vendor noise
- Use classical IR metrics daily for retriever tuning, core RAG metrics weekly, and advanced diagnostics monthly
- Build RAG test datasets by coupling test cases with database exports to create reproducible context caches
- Match evaluation priorities to your domain's risk profile — high-severity domains need Faithfulness and Context Support, medium needs Answer Relevance
- Always run separate LLM judges per evaluation dimension rather than asking one judge to assess everything at once

**Why do I care:** If you are building anything with RAG — and let us be honest, most of us are at this point — this framework gives you a mental model that actually scales. Instead of drowning in vendor dashboards with dozens of proprietary metrics, you map every failure back to one of six relationships and fix that specific link. The tiered cadence approach is particularly practical for teams that cannot afford to run expensive LLM-based evaluations on every commit. What I would push back on is the implicit assumption that these six metrics are truly exhaustive once you move into agentic architectures where tool selection and multi-step reasoning add variables the framework does not account for. But as a foundation for evaluating straightforward RAG pipelines, this is as clean as it gets.

**Link:** [RAG Evaluation: The Only 6 Metrics You Need](https://www.decodingai.com/p/rag-evaluation-6-metrics-framework)