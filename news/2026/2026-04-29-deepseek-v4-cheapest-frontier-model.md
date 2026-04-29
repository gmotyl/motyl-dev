---
title: "DeepSeek V4: The Cheapest Frontier Model on the Market"
excerpt: "Scott Hanselman explores DeepSeek V4's pricing, performance, and the economics that are forcing a re-evaluation of what frontier AI should cost."
publishedAt: "2026-04-29"
slug: "deepseek-v4-cheapest-frontier-model"
hashtags: "#AIForDev #ai #deepseek #inference #pricing #agents #coding #generated #en"
source_pattern: "AIForDev"
---

Scott Hanselman here. One year after DeepSeek R1 wiped six hundred billion dollars from Nvidia's market cap in a single day, the Chinese lab is back. DeepSeek V four dropped on April 24, 2026. Same day OpenAI released GPT-5.5. The timing is almost certainly deliberate. What makes this interesting is the price tag.

## The Variants

V four comes in two variants. DeepSeek-V four-Pro is the flagship: one point six trillion total parameters with forty-nine billion active per token. That's the one you reach for on hard tasks.

DeepSeek-V four-Flash is the fast workhorse: two hundred eighty-four billion total parameters, thirteen billion active. Surprisingly close to Pro on most benchmarks, at a fraction of the cost.

Both use a Mixture of Experts architecture, which is why those numbers aren't as scary as they sound. Only a small fraction of parameters fire for each token. Both support a one million token context window. Both are MIT-licensed and available as open weights on Hugging Face.

## The Technical Upgrade

The headline upgrade is the Hybrid Attention Architecture, combining Compressed Sparse Attention and Heavily Compressed Attention. At one million tokens, V four-Pro requires only twenty-seven percent of the inference compute and ten percent of the KV cache that V three point two needed. That's the difference between a one million context window being theoretically available and actually being affordable to use.

## The Pricing Math

Let's skip straight to what matters.

DeepSeek V four-Flash costs zero point twenty-eight per million output tokens. That makes it the cheapest model at its capability tier, less than every Flash, Mini, and Nano offering from every major Western provider.

DeepSeek V four-Pro costs three dollars and forty-eight cents per million output tokens. Less than GPT-5.4's input price alone. About one-ninth of Claude Opus 4.7's output cost.

For context, here's where the major models land on output pricing per million tokens: DeepSeek V four-Flash at zero dollar fifty, Gemini three Flash at three dollars forty-eight, GPT-5.4 at twelve dollars, GPT-5.5 at seventy-five dollars.

To make it concrete, imagine a pipeline generating one hundred million output tokens per month. Running on GPT-5.5: three thousand dollars per month. Running on Claude Opus 4.7: seven thousand five hundred dollars per month. Running on DeepSeek V four-Pro: three hundred forty-eight dollars per month.

That's a nine to twenty-two times cost difference. Not a rounding error. A different category of economics.

## The Benchmarks

DeepSeek published an unusual self-assessment alongside the release. They state directly that V four-Pro "trains state-of-the-art frontier models by approximately three to six months." You don't often see AI labs publish their own gap estimates.

Here's where V four stands on the benchmarks that matter.

Coding: V four-Pro reaches a three thousand two hundred six Codeforces rating, ranking twenty-third among human competitors worldwide. On SWE-bench and agentic coding tasks, DeepSeek's internal evaluation places V four-Pro above Claude Sonnet 4.5 and approaching Claude Opus 4.5. V four-Flash alone leads all open-source models in coding benchmarks.

Reasoning and Math: V four-Flash-Max scores eighty-one point zero on Putnam-200 Pass at eight, against thirty-five point five for Seed two point zero-Pro and twenty-six point five for Gemini three-Pro. On Putnam-2025 formal math, V four achieves a perfect one hundred twenty out of one hundred twenty.

The honest summary: V four-Pro isn't the best model alive. But at its price point, it doesn't need to be.

## Migration

One line of code. If you're already on the DeepSeek API, you change the model string and nothing else. The base URL stays identical. The API supports both OpenAI ChatCompletions and Anthropic API formats.

Three reasoning modes: Non-Thinking for fast direct responses, Thinking for standard chain-of-thought, and Think Max for maximum reasoning budget.

⚠️ Deprecation deadline: the old deepseek-chat and deepseek-reasoner endpoints are being retired on July 24, 2026.

## Running Locally

V four-Flash weighs one hundred sixty gigabytes on Hugging Face, potentially runnable on a one hundred twenty-eight gig M five MacBook Pro with light quantization. V four-Pro is eight hundred sixty-five gigabytes, so you need a multi-GPU setup or cloud infrastructure. Unsloth is already working on quantized versions. vLLM zero point nine plus with tensor parallel size two gives you an OpenAI-compatible endpoint.

DeepSeek V four runs on Huawei Ascend nine fifty chips, not Nvidia GPUs. This is the first frontier-class open model that doesn't need American chips to run at scale.

## The Bottom Line

For developers, this has a very practical consequence: if you're building for regulated industries, check your compliance requirements. But at these prices, the experiment costs almost nothing.

DeepSeek V four is the clearest proof yet that frontier AI performance and frontier AI pricing are being permanently decoupled. A year ago, R one proved you didn't need one hundred million dollars in compute to build a world-class reasoning model. V four extends that thesis: you don't need to pay OpenAI or Anthropic prices to get within three to six months of the frontier.

## Why Do I Care

The pricing math is what matters here. A nine to twenty-two times cost difference changes how you architect AI systems. You can run more experiments, handle more volume, and still stay within budget. At these prices, the experiment costs you almost nothing.

The benchmark performance is close enough to make the tradeoff real. For pipeline architectures, this could be your default model.

**Link:** [DeepSeek V4 Just Dropped](https://aifordevelopers.substack.com/p/deepseek-v4-just-dropped-and-its?publication_id=5560002&post_id=195585937&isFreemail=true)