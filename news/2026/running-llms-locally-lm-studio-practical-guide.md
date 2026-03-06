---
title: "Running LLMs Locally with LM Studio: A Practical Guide to Model Selection, Quantization, and Thinking Models"
excerpt: "A hands-on walkthrough of running language models on your own hardware using LM Studio, covering memory math, GGUF quantization tradeoffs, and when to use thinking models."
publishedAt: "2026-02-12"
slug: "running-llms-locally-lm-studio-practical-guide"
hashtags: "#substack #ai #llm #ml #ollama #performance #architecture #devtools #generated #en"
---

## Run Language Models on Your Computer with LM Studio

**TLDR:** LM Studio makes running large language models on consumer hardware surprisingly approachable. The article walks through installation, model selection based on your available VRAM, understanding GGUF quantization tradeoffs, and when to reach for a "thinking" model versus a fast instruct model. The core insight: "can I run this model?" is fundamentally a memory question.

**Summary:**

This is one of those pieces that quietly delivers more value than its title suggests. Written by Benjamin Marie, an independent AI researcher with serious hands-on chops, it starts with the basics of installing LM Studio and quickly escalates into the practical engineering knowledge that most tutorials skip entirely. The key contribution here is not the step-by-step screenshots but the mental model it builds for reasoning about local LLM deployment. If you have ever stared at a list of GGUF variants wondering what Q4_K_S actually means for your workflow, this is the article that finally connects the dots.

The memory math section is particularly well done. The formula is dead simple: each parameter in 16-bit precision occupies roughly 2 bytes, so a 4B parameter model needs about 8 GB just to load, plus roughly 20 percent overhead for the KV cache and runtime buffers. That means your RTX 3060 with 12 GB of VRAM can comfortably run a quantized 4B model but will struggle with anything much larger at full precision. The article does a good job of emphasizing that VRAM is the bottleneck, not storage, and that running on CPU RAM works but is dramatically slower. The Mac unified memory architecture gets a deserved mention as a genuine advantage for local inference.

Where the article gets really interesting is the discussion of GGUF builds and quantization. The author is careful to point out that most GGUF files are community conversions, not official releases from the model provider. This is a critical distinction that many people miss. Aggressive quantization can quietly degrade output quality or even break a model entirely, and if your only experience of a model is through a poorly quantized GGUF, you might dismiss an otherwise excellent model. The practical advice is sound: stick with known publishers like bartowski, unsloth, or ggml-org, start with Q4_K_S as a balanced default, and move to Q5 if you have headroom.

The thinking models section is where the article could have gone deeper but still delivers useful framing. The comparison between Gemma 3 4B (instruct) and Qwen3 4B (thinking) illustrates the fundamental tradeoff: thinking models spend extra compute on internal reasoning chains, which can dramatically improve accuracy on multi-step, constraint-heavy, or ambiguous tasks, but at the cost of significant latency. The author's example of 50,000 internal tokens at 100 tokens per second translating to an 8-minute wait is the kind of back-of-napkin math that makes these tradeoffs concrete. However, the article somewhat glosses over the question of when the quality improvement actually justifies that wait. For architects evaluating local LLM deployment for team use, the decision matrix is more nuanced than "hard tasks use thinking, easy tasks use instruct."

For teams and architects considering local LLM deployment, the real takeaway is that this is no longer a hobbyist endeavor. The tooling has matured to the point where a developer with a mid-range GPU can run useful models for code review, translation, summarization, and lightweight reasoning tasks without sending any data to a cloud service. The privacy and latency benefits are real. But the article does not adequately address the operational complexity of maintaining local model deployments across a team: version management, consistent quantization choices, system prompt standardization, and the inevitable support burden when someone's hardware does not quite meet the requirements. These are the problems that turn a fun experiment into a maintenance headache.

**Key takeaways:**

- Local LLM viability is primarily a memory question: parameter count times 2 bytes, plus 20 percent overhead for KV cache and buffers, gives you the minimum VRAM requirement
- GGUF files are typically community conversions, not official releases, and aggressive quantization can silently degrade quality; stick with Q4_K_S as a starting point from trusted publishers
- Thinking models trade latency for accuracy on multi-step and constraint-heavy tasks, but for simple chat and summarization, instruct models are faster and sufficient
- Mac unified memory gives a genuine advantage for local inference by allowing GPU and CPU to share a large high-bandwidth memory pool
- LM Studio supports Windows, macOS, and Linux and provides visual indicators for whether a model variant will fit your available VRAM

**Tradeoffs:**

- Higher quantization precision preserves model quality but demands more VRAM, limiting which hardware can run the model
- Thinking models deliver significantly better accuracy on complex reasoning tasks but sacrifice response speed, sometimes taking minutes instead of seconds
- Running models locally gains complete data privacy and eliminates API costs but sacrifices access to the largest frontier models that require data-center hardware

**Link:** [Run Language Models on Your Computer with LM-Studio](https://www.ai-supremacy.com/p/run-language-models-on-your-computer-llms-diy)