---
title: "A Local Qwen Model Beat Claude at the Pelican Test"
excerpt: "Simon Willison used his absurd pelican-on-a-bicycle benchmark to show that a local Qwen model produced cleaner SVG output than Claude Opus 4.7 on a very specific task."
publishedAt: "2026-04-17"
slug: "a-local-qwen-model-beat-claude-at-the-pelican-test"
hashtags: "#motyldev #curated #ai #llm #open-source #performance #generated #en"
source_pattern: "Motyl.dev"
---

## Qwen3.6-35B-A3B on my laptop drew me a better pelican than Claude Opus 4.7

**TLDR:** Simon Willison compared fresh model releases using his silly but memorable SVG benchmark. On this one task, a quantized local Qwen model running on a laptop produced a better result than Claude Opus 4.7.

**Summary:** Willison knows the benchmark is a joke, and that is part of what makes the post useful. He is not claiming that a pelican on a bicycle is a serious evaluation suite. He is showing how strange model comparison has become, and how even unserious tests can reveal something real about present-day capabilities. In this case, Qwen delivered a better SVG than Anthropic's latest flagship on the exact same prompt.

The post gets more interesting when he burns one of his backup prompts and sees the same pattern with a flamingo on a unicycle. That matters because it pushes back on the easy explanation that Qwen somehow overfit the pelican meme. His take is sensible: he still does not believe the benchmark means Qwen is generally more capable than Opus. He does think it proves that narrow output quality can diverge a lot from brand expectations.

What I like here is the restraint. Too many model posts jump straight from one anecdote to sweeping claims about the leaderboard. Willison does the opposite. He admits that the benchmark has tracked general usefulness surprisingly well in the past, then notes that the correlation may have broken. That is a much better way to think about evals than pretending every cute test is a scientific instrument.

There is also a practical subtext. A reasonably sized local model, quantized and running on consumer hardware, can now outperform premium hosted models on certain structured generation tasks. That does not mean local wins everything. It does mean the old instinct that local equals toy and hosted equals serious is getting harder to defend.

**Key takeaways:**
- Small, local, quantized models can outperform premium hosted models on narrow generation tasks.
- Funny benchmarks still have value when the author is honest about their limits.
- Model evaluation is getting messier because strengths are becoming more uneven and task-specific.

**Why do I care:** Frontend and product teams increasingly use models for artifacts like SVG, UI copy, tests, and structured transforms. The lesson is not that Qwen beats Claude everywhere. The lesson is that model choice should follow the task, not the brand halo. Cheap local inference winning even once is enough to make that point stick.

**Link:** [Qwen3.6-35B-A3B on my laptop drew me a better pelican than Claude Opus 4.7](https://simonwillison.net/2026/Apr/16/qwen-beats-opus/)