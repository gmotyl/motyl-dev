---
title: "Mistral Medium 3.5 Lands in Kilo: A Dense 128B Model Built for Agentic Work"
excerpt: "Mistral Medium 3.5, a 128B dense model with 256k context and 77.6% SWE-Bench score, is now available across all Kilo Code surfaces."
publishedAt: "2026-05-06"
slug: "mistral-medium-35-kilo-code-agentic-model"
hashtags: "#kilo #ai #llm #agents #ml #productivity #architecture #generated #en"
source_pattern: "Kilo"
---

## Mistral Medium 3.5 is Live in Kilo Code

**TLDR:** Mistral Medium 3.5 is a 128B dense model that merges instruction-following, reasoning, and coding into one set of weights, scores 77.6% on SWE-Bench Verified, and is now available across Kilo's VS Code extension, CLI, and Cloud Agents. It runs on as few as four GPUs with open weights under a modified MIT license.

**Summary:** Mistral has been quiet for a while, and that silence turned out to be productive. Mistral Medium 3.5 is a serious model, and the decision to merge instruction-following, reasoning, and coding into a single dense architecture rather than a mixture-of-experts approach is an interesting bet. Most of the recent model releases in the 100B+ range have gone MoE because the per-token compute cost is lower. Mistral went the other direction: one dense 128B model that you can actually reason about without needing to understand routing tables.

The 256k context window is the number that jumps out for agentic work. Long-horizon agent tasks fall apart when the model loses the thread, and most models in this class start degrading meaningfully around 64k to 128k tokens. A model that was trained from the ground up for long-context retention and that was specifically designed for multi-tool agentic sessions is a different kind of tool than a chat model with a big context window bolted on afterward.

The SWE-Bench score of 77.6% puts it ahead of Devstral 2 and Qwen3.5 397B A17B. I'd take SWE-Bench numbers with some skepticism, because harness design and prompt engineering matter enormously for those scores, and different labs are not always testing apples-to-apples. But the relative positioning against models significantly larger by parameter count is worth noting, especially combined with the self-hosting story. Running a frontier-class coding model on four GPUs is a meaningfully different infrastructure requirement than the ten or twenty you'd need for comparable alternatives.

The pricing is competitive. At $1.50 per million input tokens and $7.50 per million output, it's priced below Claude Sonnet and GPT-4o while claiming comparable agentic performance. For async agent runs where you're accumulating hundreds of thousands of tokens per session, the blended cost matters a lot. Kilo's framing around the Kilo Pass discount is sales language, but the base API pricing is genuinely not bad for a model at this capability level.

What's missing from this announcement is any independent evaluation of the model's behavior on Kilo-specific workflows. The SWE-Bench score comes from Mistral, and the framing around "built from the ground up for agentic work" is exactly what every model announcement says now. I'd want to see how it performs on multi-turn agent sessions with real tool call sequences before drawing firm conclusions.

**Key takeaways:**
- 128B dense model with 256k context, combining instruction-following, reasoning, and coding in one set of weights
- 77.6% SWE-Bench Verified, ahead of Devstral 2 and larger MoE alternatives
- Self-hostable on four GPUs with open weights under a modified MIT license
- Available across Kilo's VS Code extension, CLI, Cloud Agents, and KiloClaw at $1.50/$7.50 per million input/output tokens

**Why do I care:** A dense 128B model at these specs that you can self-host and that's designed for async multi-tool work is the profile I want for serious agent infrastructure. The open weights are genuinely important: when an agent is running production-level tasks, I want the option to host the model myself and not be dependent on a provider's uptime or pricing changes. Whether the real-world agentic performance matches the benchmark positioning is still an open question, but the architecture choices are the right ones.

**Link:** [Mistral Medium 3.5 is Live in Kilo Code](https://blog.kilo.ai/p/mistral-medium-35-is-live-in-kilo)
