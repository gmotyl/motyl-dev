---
title: "Using Local LLMs for Agentic Coding: A Practical Guide"
excerpt: "GitHub Copilot switched to usage-based billing, so here's a deep dive into running local language models for agentic coding workflows using LM Studio, Gemma 4, and OpenRouter."
publishedAt: "2026-06-04"
slug: "local-llms-agentic-coding-lm-studio-gemma4"
hashtags: "#AlexEwerlöf #ai #llm #agents #vscode #github-copilot #ollama #open-source #dx #engineering #generated #en"
source_pattern: "AlexEwerlöf"
---

## Using Local LLMs for Agentic Coding

**TLDR:** GitHub Copilot flipped to usage-based billing, which has a lot of developers looking at local models again. This post walks through the full setup: picking a runtime, choosing the right model, configuring VS Code Copilot to talk to it, and squeezing out enough context window to actually get work done.

**Summary:**

Let's start with the trigger. GitHub Copilot moved from its credit model to usage-based billing, which means even the models that were previously free are now metered. The author has been running local LLMs for about three years, initially for cost reasons while building an AI-powered app, and that experience covers the full spectrum of runtimes and hardware, from Llama.cpp in containers to LM Studio on Linux. That background shows in how the guide is structured — it's not a quickstart, it's a map.

The foundation here is understanding what you're actually downloading and running. A model is a massive file of neural network weights. The runtime is the engine that loads those weights and generates tokens. A model manager like LM Studio or Ollama wraps all that in something approachable, while also exposing an OpenAI-compatible REST API so that your coding tools don't need to know anything special about where the model lives. The distinction matters because the ecosystem has a lot of overlapping terminology: Llama.cpp the runtime, LLaMA the Meta model family, Ollama the manager — these are three completely different things that happen to share syllables.

For the model itself, the author lands on Gemma 4 with a strong recommendation for the 26B A4B variant. That alphanumeric soup actually tells you something important: 26 billion total parameters, but only 4 billion are active at any given moment. This is the Mixture of Experts architecture, where the model routes each task to a specialized subset of its weights rather than engaging everything at once. The result is a model that punches well above its active parameter count for an 8-12GB VRAM card. The non-negotiables for agentic work are tool use (you can't do anything agentic without it), reasoning, and ideally vision support for pasting in screenshots.

The configuration section is where the article gets genuinely useful and a bit painful. VS Code Copilot was built for cloud AI, so connecting it to a local endpoint requires manual JSON configuration. You have to set the URL, maxInputTokens, and maxOutputTokens yourself, and the default context window in LM Studio is only 4k tokens — which is completely unusable for coding because Copilot's system prompt alone eats 20-40k tokens. The author's sweet spot is a 150k context window with 100k input and 50k output, and they share a KV cache quantization trick — setting K cache to Q8_0 and V cache to Q4_0 — that brought the VRAM requirement down from 28.75GB to 22.45GB on their setup. These are the kinds of hard-won details that take hours to stumble onto yourself.

There's an honest treatment of the cold start problem too. When LM Studio JIT-loads a model on first request, you can wait two to five minutes while it processes Copilot's enormous initial system prompt. After that it's fast, because prompt caching kicks in. But that first interaction is rough, and the author is upfront about it rather than glossing over it. The same section notes that if your hardware can't manage at least 10 tokens per second, the experience becomes frustrating enough to undermine the whole setup. For people whose machines aren't up to it, the article closes with a practical alternative: OpenRouter, which aggregates hundreds of models through a single API, includes free tiers for models like the 26B, and works natively with both Copilot and Pi. The catch is that your data may be used for training unless you enable Zero Data Retention, and you're dependent on OpenRouter continuing to offer free models, which history suggests is not guaranteed.

**Key takeaways:**

- LM Studio is the recommended model manager for beginners; it handles model discovery, VRAM estimation, and exposes an OpenAI-compatible API that Copilot can talk to without any extra plumbing
- The Gemma 4 26B A4B (Mixture of Experts) is the author's current recommendation for agentic coding: smarter than a plain 4B model, fits on common 8-12GB VRAM cards because only 4B parameters are active at a time
- The default 4k context window in LM Studio will break your Copilot workflow — manually configure it to at least 100k, and save the settings or LM Studio reverts on next load
- KV cache quantization (K=Q8_0, V=Q4_0) can reduce VRAM requirements significantly without a meaningful quality hit — worth trying if you're near your hardware limit
- OpenRouter is a legitimate fallback if your hardware can't run a capable model locally — free 26B model access, but read the data retention policy before putting sensitive code through it

**Why do I care:** This is the kind of guide I wish existed three years ago when local models were genuinely hard to get working with coding tools. The GitHub billing change is a real inflection point — the "free for light usage" era is over, and teams are going to need to make deliberate choices about AI spend. Running local models isn't free either; there's upfront hardware cost and non-trivial configuration time. What the author doesn't address much is the team dimension: this setup works great on a beefy personal machine, but sharing a local inference server across a team introduces latency, multi-user context management, and an ops burden that most dev teams aren't staffed for. The honest answer for most teams is probably a mix: local models for offline/private work, cloud for the heavy agentic sessions where context length and model quality actually matter. The OpenRouter section hints at this but doesn't lean into it.

**Link:** [Using local LLMs for agentic coding](https://blog.alexewerlof.com/p/local-llms-for-agentic-coding)
