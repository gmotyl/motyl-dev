---
title: "How to Set Up Codebase Indexing in Kilo Code"
excerpt: "Kilo Code brings back codebase indexing with a practical guide covering embedding providers, vector stores, file filters, and verification. This post walks through the exact mechanics so you can get semantic search working across your entire repo."
publishedAt: "2026-06-06"
slug: "how-to-set-up-codebase-indexing-in-kilo-code"
hashtags: "#generated #en #kilo #devtools #agents #embeddings #vectorsearch #dx"
---

## How to Set Up Codebase Indexing in Kilo Code

**TLDR:** Kilo Code now supports full codebase indexing powered by embedding providers and vector stores, letting you ask conceptual questions like "where does the retry logic live?" instead of grepping blindly. Setting it up requires configuring both an embedding provider and a vector store, then explicitly enabling indexing at the right scope.

**Summary:** There is a concept in software tooling I find genuinely underappreciated: the difference between configuration and activation. Kilo Code's new indexing guide hammers this point immediately and correctly. You can drop in your OpenAI API key, pick an embedding model, and point at a Qdrant server, and nothing will happen until you explicitly set `indexing.enabled` to true at either the global or project scope. That one rule saves hours of confused debugging.

The system itself is elegant in its separation of concerns. Kilo uses Tree-sitter to parse your code locally into semantic chunks, functions, classes, methods, the structural units that actually matter. Those chunks get sent to your chosen embedding provider, which returns vectors. Those vectors land in your vector store, either an embedded LanceDB file or a running Qdrant server. After that, when you ask Kilo a conceptual question, it runs `semantic_search` against your own index, not against some cloud service's understanding of your repo.

The provider options cover a reasonable range of deployment postures. If you want fully local with no data leaving your machine, Ollama plus LanceDB is the answer. Pull `mxbai-embed-large` or `nomic-embed-text`, point the config at your local Ollama URL, and that is genuinely it. No Docker for the vector store, no external API calls, no billing. For teams that want more capacity, Mistral BYOK and OpenAI are both supported, with clear callouts about common mistakes like accidentally using Codestral-specific keys instead of regular Mistral API keys. The OpenAI-compatible endpoint shape means Vercel AI Gateway, OpenRouter, and Bedrock are also in play.

Tuning is something I appreciate being documented honestly rather than hidden. `searchMinScore` defaults to 0.4 and controls how loosely related a result can be before it gets dropped. `embeddingBatchSize` defaults to 60, and lowering it is the first thing to try when a hosted provider starts rate-limiting you. These are not exotic knobs. They are the exact levers you reach for when a working setup starts behaving unexpectedly at scale, and having them documented up front instead of buried in a GitHub issue is the kind of thing that actually saves time.

The file filtering story is also sensible. Binary files, files over 1MB, `.git`, `node_modules`, and anything in `.gitignore` are excluded by default. For cases where you want indexing-specific exclusions without polluting your Git ignore rules, `.kilocodeignore` handles that. The privacy model is worth reading carefully: Kilo parses locally and only sends small code snippets to hosted providers, not whole files. That distinction matters for teams with compliance requirements.

**Key takeaways:**
- Provider configuration and indexing activation are separate steps. You must set `indexing.enabled: true` at global or project scope or nothing gets indexed.
- Ollama plus LanceDB gives you a fully local setup with no external calls, no server to run, and no data leaving the machine.
- The tuning parameters `searchMinScore`, `searchMaxResults`, and `embeddingBatchSize` are your main levers for fixing quality and reliability issues at scale.

**Why do I care:** I spend a non-trivial part of my week navigating large codebases where the question is not "where is the file" but "what handles this concern." Grep finds text. Semantic search finds meaning, or at least a useful approximation of it. The Kilo approach of indexing locally parsed semantic chunks rather than raw text is the right abstraction. What I find most practical here is the separation between LanceDB for low-friction setups and Qdrant for team deployments, because that maps cleanly to the two actual deployment contexts most of us work in. If you are evaluating AI coding tools and this feature was the reason you left a competitor, the setup guide is genuinely thorough enough to get you running in an afternoon.

**Link:** [How to Set Up Codebase Indexing in Kilo Code](https://blog.kilo.ai/p/how-to-set-up-codebase-indexing-in?publication_id=4363009&post_id=200779012&isFreemail=true&triedRedirect=true)
