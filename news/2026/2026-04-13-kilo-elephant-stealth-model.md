---
title: "Kilo's Elephant: A 100B-Parameter Stealth Model Optimized for Speed"
excerpt: "Kilo introduces Elephant, a new free stealth model with 256K context window designed for rapid code completion, document processing, and lightweight agent workflows."
publishedAt: "2026-04-13"
slug: "kilo-elephant-stealth-model"
hashtags: "#substack #ai #llm #kilo #agentic #generated #en"
source_pattern: "Substac"
---

## Introducing Elephant: A New Stealth Model, Free in Kilo

**TLDR:** Kilo has launched Elephant, a 100B-parameter model from an unnamed open model lab, available free during a stealth preview period. It targets intelligence efficiency over raw scale, offering 256K context and 32K max output with prompt caching built in.

**Summary:**
Kilo is rolling out Elephant, positioned as a fast, lightweight alternative to the larger, compute-heavy models that dominate the space. The pitch is straightforward: you get SOTA-level performance at this scale while burning through fewer tokens. That matters if you are running agentic workflows where cost and latency add up fast.

The model ships with a 256K context window, which means you can load an entire repository into a single prompt. Max output hits 32K tokens, so it can generate whole modules or test suites in one pass. Prompt caching is baked in, which should cut costs on repetitive long-context tasks. Function calling and structured output are supported, making it a natural fit for toolchain integration.

Kilo contrasts Elephant with their previous stealth model, Giga Potato. Both have similar context windows and output limits, but they serve different purposes. Giga Potato was better at deep technical document generation. Elephant leans toward rapid document processing, like churning through research reports and turning them into content drafts. The framing is that Elephant is your daily driver, snappy and lean, while Giga Potato handled heavier lifting.

Elephant is available across the Kilo ecosystem: the VS Code extension, the CLI for terminal-based agentic development, and KiloClaw for always-on assistant tasks. It is free during the stealth preview, with the caveat that prompts and completions are logged by the model provider for performance improvements.

**Key takeaways:**
- 100B parameters with 256K context and 32K max output
- Focuses on token efficiency rather than brute-force scale
- Free during stealth preview, but prompts are logged
- Integrated into VS Code, CLI, and KiloClaw

**Why do I care:**
The efficiency angle is interesting, and I want to believe that a 100B model can punch above its weight with the right optimization. But "unnamed open model lab" gives me pause. I would want to see independent benchmarks before trusting this for production work. The prompt logging during preview is also worth noting. If you are working with proprietary codebases, sending prompts to an external provider during testing is a consideration, not a footnote. The real question is whether the token savings actually translate to meaningful cost reduction at scale, or whether you are trading accuracy for speed. I would run it against Giga Potato on my own workload before deciding which one earns a permanent spot.

**Link:** [Introducing Elephant: A New Stealth Model, Free in Kilo](https://blog.kilo.ai/p/introducing-elephant-a-new-stealth-model)