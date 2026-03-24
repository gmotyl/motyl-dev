---
title: "The AI Evals Roadmap I Wish I Had"
excerpt: "7-part AI Evals series covering optimization during development, regression testing, production monitoring, LLM judges, custom datasets, RAG evaluation with 6 metrics, and lessons from 6 months in production."
publishedAt: "2026-03-24"
slug: "ai-evals-roadmap-7-part-series"
hashtags: "#substack #ai #evals #testing #llm #rag #generated #en"
---

## The AI Evals Roadmap I Wish I Had

**TLDR:** A 7-part AI Evals & Observability series from Decoding AI covering: where evals fit in development lifecycle, building datasets from production traces, designing LLM judges, evaluating evaluators, RAG evaluation with exactly 6 metrics, and lessons from 6 months running evals in production.

**Summary:**

This is a comprehensive AI evaluation roadmap from Paul Iusztin at Decoding AI. AI Evals is the topic most AI engineers know they should invest in, but don't know where to start. The author struggled with this himself. He didn't know how to properly integrate evals into his app until he understood there are three core layers: optimization during development, regression testing before merging, and production monitoring on live traffic. Once that clicked, everything else fell into place.

He didn't know how to build LLM judges and evaluators he could actually trust and use. Every guide he found either hand-waved the details or dumped a generic "helpfulness" metric and moved on. Instead, he needed evaluators grounded in actual business requirements. He didn't know how to gather custom datasets without wasting too much time. He tried generating hundreds of synthetic test cases up front, but the real unlock came from learning how to organically grow a high-quality dataset from production data, starting small and letting the error-analysis flywheel do the heavy lifting.

The 7-lesson series breaks it all down from first principles:

**Lesson 1: Integrating AI Evals Into Your AI App** - Covers the three core scenarios where evals matter: optimization during development, regression testing before merging, and production monitoring on live traffic. Explains the difference between guardrails and evaluators. Confusing them leads to gaps in your system. The minimum viable tech stack: a custom annotation tool and an LLMOps platform.

**Lesson 2: Build an AI Evals Dataset from Scratch** - Teaches the error analysis flywheel: sample traces, label manually, build evaluators iteratively, perform error analysis, and create specialized evaluators. Explains why one "benevolent dictator" should own labeling consistency across your team. How to graduate from generic to specialized evaluators as your understanding deepens.

**Lesson 3: Generate Synthetic Datasets for AI Evals** - Covers why you should generate only inputs, not outputs, and let your real app produce the outputs. How to think in dimensions like persona, feature, scenario, and input modality to avoid mode collapse. Tester agents for simulating multi-turn conversations. The reverse workflow for RAG: generate questions from your knowledge base, not the other way around.

**Lesson 4: How to Design Evaluators** - Teaches the evaluation harness: infrastructure that automates running evaluators across your dataset. When to use fast, deterministic code-based evaluators versus flexible, nuanced LLM judges. Common design mistakes. Advanced designs for multi-turn conversations and agentic workflows.

**Lesson 5: How to Evaluate the Evaluator** - Covers the iterative refinement loop: measure alignment, diagnose disagreements, adjust few-shot examples, and re-measure. Dealing with non-determinism: why LLM judges give different answers on the same input, and how to stabilize them.

**Lesson 6: RAG Evaluation: The Only 6 Metrics You Need** - Proves there are exactly three variables in any RAG system: Question, Context, and Answer. There are exactly six possible relationships between them. Every RAG metric maps to one of these six relationships. Tier 1: Retrieval metrics. If retrieval is broken, nothing else matters. Tier 2: The three core RAG metrics you always need. Tier 3: When core metrics cannot explain the failure.

**Lesson 7: Lessons from 6 Months of Evals on a Production AI Companion** - Guest post by Alejandro Aboy, Senior Data Engineer at Workpath. Covers three observability problems most teams hit: falling for generic metrics, skipping manual annotation, and not treating AI agents as data products. How to use Opik's architecture for production monitoring and evals. How to reverse-engineer evaluation criteria from real traces instead of guessing upfront.

The series is sponsored by Opik, the LLMOps open-source platform used by Uber, Etsy, Netflix, and more. Opik provides custom LLM judges, experiment comparison, and production monitoring with alarms when scores drop below thresholds.

**Key takeaways:**

- Three eval layers: development optimization, regression testing, production monitoring
- Error analysis flywheel: sample traces, label, build evaluators, analyze, iterate
- Generate synthetic inputs only, let real app produce outputs
- Code-based evaluators for speed, LLM judges for nuance
- RAG has 3 variables (Question, Context, Answer) and 6 metric relationships
- Common problems: generic metrics, skipping annotation, not treating agents as data products

**Why do I care:**

As a developer building AI-assisted features, evals are on my todo list but I haven't known where to start. This roadmap is exactly what I needed. The three-layer framework clarifies where evals fit. Development optimization catches issues before users see them. Regression testing prevents backslides. Production monitoring catches drift. The error analysis flywheel is practical. Start with 20-50 real production traces. Label manually. Build evaluators iteratively. This is how you get high-quality datasets without wasting months. The RAG evaluation section is particularly valuable. Six metrics covering all relationships between Question, Context, and Answer. That's actionable. I can implement this. The production lessons from Workpath are gold. Falling for generic metrics, skipping manual annotation, not treating AI agents as data products - these are mistakes I was about to make. I'd recommend this series to any developer shipping AI features. Start with Lesson 1. Build the mental model. Then implement layer by layer. The series is free. The ROI is enormous.

**Link:** [The AI Evals Roadmap I Wish I Had](https://www.decodingai.com/p/the-ai-evals-roadmap-i-wish-i-had)