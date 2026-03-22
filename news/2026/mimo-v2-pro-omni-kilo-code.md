---
title: 'Xiaomi Launches MiMo-V2-Pro and MiMo-V2-Omni — Free in Kilo Code This Week'
excerpt: "Xiaomi's expanded MiMo-V2 family brings trillion-parameter reasoning and omni-modal capabilities to agentic coding workflows."
publishedAt: '2026-03-19'
slug: 'mimo-v2-pro-omni-kilo-code'
hashtags: '#substack #ai #llm #agents #coding #architecture #performance #generated #en'
---

## Try MiMo-V2-Pro and MiMo-V2-Omni for Free in Kilo Code

**TLDR:** Xiaomi has officially released the MiMo-V2 family with Pro and Omni models — a trillion-parameter reasoning model and an omni-modal powerhouse with vision and audio capabilities. Both are free in Kilo Code for a week to let developers stress-test them in agentic coding workflows.

The model landscape just got more competitive. Xiaomi has dropped the expanded MiMo-V2 family, and the new Pro and Omni models are positioned as serious contenders for agentic work. If you tried the stealth models Hunter Alpha and Healer Alpha on OpenRouter over the past week, now you know what they were — Hunter Alpha was MiMo-V2-Pro and Healer Alpha was MiMo-V2-Omni. They quickly became top performers in both Kilo and OpenClaw during their stealth phase.

MiMo-V2-Pro is the heavyweight reasoning model built on a staggering one trillion parameters. It features a massive one million token context window, making it purpose-built for long-horizon planning, complex reasoning, and sustained multi-step task execution. The model brings the kind of instruction-following precision and reliability that frameworks like OpenClaw demand. It's particularly well-suited for executing complex multi-step tasks across different modalities in KiloClaw, the agentic coding environment.

MiMo-V2-Omni serves as the versatile multi-modal counterpart. True to its name, it's a frontier omni-modal model equipped with vision, hearing, reasoning, and action capabilities. It has a 262K context window and brings agentic intelligence into the real world by natively perceiving visual and audio inputs. Xiaomi also released a lifelike text-to-speech model alongside this update, though only Pro and Omni are free in Kilo this week.

The original MiMo models were known for being blazingly fast but sometimes struggled to hold context deep in monolithic codebases or during several passes in agentic work. V2 completely flips the script by leveraging Multi-Token Prediction, which uses a native draft model to generate multiple tokens in parallel. This achieves a 2.0 to 2.6x speedup and up to 3.6x accepted token length. On PinchBench, early testing found MiMo-V2 competitive not just with open-weight heavyweights like NVIDIA's Nemotron 3 Super and GLM-5-Turbo, but also with state-of-the-art models from frontier labs like Anthropic and OpenAI.

The MiMo-V2-Flash predecessor had already proven itself popular in Kilo for various use cases — a tiny powerhouse at 73.4 percent accuracy on SWB with remarkable cost efficiency at just 10 cents per input token and one cent for cached tokens. With Pro and Omni, Xiaomi is proving they can compete at the frontier while maintaining their cost advantage. The previous MiMo-V2 cost roughly one-thousandth of what comparable frontier models charge, and the new releases continue that pricing philosophy.

To celebrate the launch, Kilo is running a hackathon challenging developers to build the worst captcha ever using MiMo-V2-Pro or Omni. First place prize is 500 dollars of Kilo Credits and 250 dollars to Amazon. This follows their previous Worst Website hackathon where over 500 developers spent a week building intentionally terrible websites with Kilo's App Builder.

The models are live in the Kilo model picker right now with free access for a full week. Xiaomi has cultivated a highly active developer community around the MiMo ecosystem with official documentation and developer hubs available.

**Key takeaways:**

- MiMo-V2-Pro brings trillion-parameter reasoning with a 1M token context window designed explicitly for agentic coding work
- MiMo-V2-Omni adds native vision, audio, and action capabilities with a 262K context for multi-modal workflows
- Multi-Token Prediction delivers 2-2.6x inference speedup by predicting multiple tokens in parallel
- Competitive with frontier models from Anthropic and OpenAI on benchmarks while maintaining aggressive pricing
- Free for a week in Kilo Code — a deliberate strategy to let the developer community stress-test before committing

**Why do I care:** The agentic coding space is getting crowded fast, and model choice is becoming the key differentiator for developer tools. What's interesting about MiMo-V2 is that Xiaomi is attacking the problem from a cost-efficiency angle while still competing on raw capability. For teams building AI-powered developer tools, having a trillion-parameter model with a million-token context at Xiaomi's pricing levels changes the economics of what's feasible. The Multi-Token Prediction approach is also worth watching — if inference speed becomes a solved problem through architectural innovations like MTP, the bottleneck shifts entirely to context management and tool orchestration, which is where the real engineering value lives.

**Link:** [Try MiMo-V2-Pro and MiMo-V2-Omni for Free in Kilo Code](https://blog.kilo.ai/p/try-mimo-v2-pro-and-mimo-v2-omni)
