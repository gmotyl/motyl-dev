---
title: "The Inference Inflection: CPU Demand, Agent Harnesses, and the Race for Cheap Tokens"
excerpt: "AI compute has shifted from training to inference at scale, and the knock-on effects are reshaping everything from chip demand to how coding agents are built."
publishedAt: "2026-04-30"
slug: "ainews-20260430"
hashtags: ["#ai", "#inference", "#agents", "#llm", "#openai", "#machinelearning"]
---

## TLDR

Inference is now the center of gravity in AI, not training. CPU demand is spiking partly because agentic workloads need something to actually run on, and Jensen Huang put a number on it: compute demand has grown 1 million times in two years. Separately, coding agents are evolving into programmable platforms, harness engineering is emerging as a real discipline, and open-weight models are getting cheap enough to make you rethink whether you need a frontier API at all.

## The Inference Inflection Is Here

Sam Altman said it plainly: "To a significant degree, we have to become an AI inference company now." Noam Brown echoed it: "inference compute is a strategic resource, currently undervalued." These statements are not marketing. They reflect something structural that has been building for a while and is now undeniable.

Jensen Huang framed it well at GTC: every time AI has to think, reason, read, or act, it has to inference. The amount of compute required for this has gone up roughly 10,000x. Combine that with a 100x increase in usage, and you get to his "1 million times" figure. That is an extraordinary number and worth sitting with.

What I find interesting is where the compute is actually going. Intel CEO Lip-Bu Tan flagged a CPU shortage building for reasons most people have not been tracking. The enterprise world did a massive COVID-era CPU refresh in 2020-2021, then diverted every available dollar to GPUs for the past two years. Those old CPUs are hitting end-of-life now, but there is no budget for a normal refresh. At the same time, Claude Code-style agentic workflows need CPUs to run the software they write. RL gyms simulate on CPUs. Production agents run on CPUs. The GPU obsession masked a quiet build-up of underinvestment in the unsexy part of the stack, and now it is showing up.

**Link:** [AINews - The Inference Inflection](https://www.latent.space/p/ainews-the-inference-inflection)

## Coding Agents Are Becoming Platforms

OpenAI, Cursor, and VS Code all made moves in the same direction this week, and taken together they tell a clear story: coding agents are not tools anymore, they are runtimes.

OpenAI is expanding Codex beyond code. Research synthesis, spreadsheets, decision tracking — the pitch is a general work surface, not just a code generator. They also launched Codex-only seats at $0 seat fee for eligible Business and Enterprise customers through end of June, which is a land-grab strategy worth paying attention to. The technical piece is the WebSocket mode on the Responses API: keeping state warm across tool calls cuts repeated work and yields up to 40% faster agentic workflows. That kind of number matters when you are running dozens of parallel tasks.

Cursor's play is more explicit. The new Cursor SDK exposes the same runtime and harness that powers the IDE for use in CI/CD pipelines, automations, and embedded agents inside products. Seat-based IDE product to programmable agent infrastructure is a real shift in framing, and it is the right direction. VS Code is doing something similar from a different angle: semantic indexing across workspaces, cross-repo search, chat session insights, remote control for Copilot CLI, and a prompt/agent evaluation extension. The throughline across all three is that raw model intelligence matters less than harness quality, memory, retrieval, and tool orchestration.

## Harness Engineering Is a Real Discipline Now

This one caught my attention. A paper on Agentic Harness Engineering showed that making harness evolution observable through revertible components and falsifiable predictions led to real benchmark gains: Terminal-Bench 2 pass@1 went from 69.7% to 77.0% in ten iterations, beating a human-designed Codex-CLI baseline at 71.9%, and also reduced token use on SWE-bench Verified by 12%. These gains transferred across model families.

A related system called HALO describes recursively self-improving agents that use trace analysis to patch harness failures. The claimed improvement on AppWorld went from 73.7 to 89.5 on Sonnet 4.6. I have not fully validated those numbers, but the direction is consistent with what practitioners are finding: spending time on the harness around a model often pays off more than swapping to a bigger model.

LangChain's Deep Agents product is leaning into this with Harness Profiles — versioned per-model prompts, tools, and middleware with built-in profiles for OpenAI, Anthropic, and Google models. DeepAgents Deploy simplifies deployment down to a small set of markdown and config files backed by LangSmith tracing. The stated rationale from LangChain staff is worth repeating: closed models are becoming too expensive for many agent workloads, so open harnesses and OSS-friendly model mixes are not just ideological, they are practical.

Cloudflare extended this logic into something genuinely new: letting agents become Cloudflare customers. Create accounts, register domains, start paid plans, get deployment tokens. The agents-as-first-class-participants framing is different from agents-as-copilots, and more vendors need to start thinking this way.

## Model Releases and the Open-Weight Price War

Mistral Medium 3.5 landed and split opinion. It is a dense 128B model that can run locally on roughly 64GB RAM. Some critics pointed to its 128K context and pricing as weak relative to large Chinese open MoEs. Others argued Mistral is making a deliberate enterprise reliability bet rather than chasing benchmark spectacle. Both takes can be true at once — it depends on what you are building.

IBM Granite 4.1 added three new Apache 2.0 non-reasoning models at 30B, 8B, and 3B. The standout stat: Granite 4.1 8B used only 4M output tokens on the Artificial Analysis Intelligence Index, versus 78M for Qwen3.5 9B. Intelligence lags stronger peers, but if you need something cheap, transparent, and predictable for enterprise or edge deployments, this family deserves a look.

The pricing pressure on open weights is real and accelerating. Qwen 3.5 Plus is at $3/M output tokens. MiMo-V2.5 Pro is shifting the Pareto frontier on Code Arena at $1/$3 per million tokens. Ant OSS's Ling-2.6-flash is MIT-licensed, roughly 107B MoE, with a 61.2 on SWE-bench Verified. Tencent released a 440MB offline translation model covering 33 languages at 1.25-bit quantization, claiming parity with commercial APIs. The open-weight ecosystem is moving faster than most proprietary players want to admit.

## Inference Engineering in the Weeds

A few technical threads worth flagging for people who care about the stack below the model.

Qwen's FlashQLA is a linear attention kernel library on TileLang reporting 2-3x forward and 2x backward speedups, particularly for small models and long-context workloads. It is explicitly positioned for agentic AI on personal devices, which fits the broader pattern of long-context optimization migrating toward edge-friendly runtimes.

vLLM reported number one output speed on Artificial Analysis for DeepSeek V3.2 at 230 tokens per second with 0.96s time-to-first-token, running on NVIDIA HGX B300 using NVFP4 quantization, EAGLE3 speculative decoding, and per-model kernel fusion. This is what hardware/software/model co-design looks like when it translates into publicly visible latency numbers.

John Carmack posted a reminder that GPU library performance is notchy in ways that will surprise you. A 10x regression in torch.linalg.solve_ex going from a 511x511 to a 512x512 matrix, apparently from a different internal CudaMalloc path. Keep that in mind next time you are profiling and something inexplicably breaks.

Zhipu AI published a serving postmortem on GLM-5 covering KV cache race conditions, HiCache synchronization bugs, and a technique called LayerSplit that improved prefill throughput by up to 132% for long-context coding-agent serving. Postmortems like this are rare and worth reading in full.

## Research: Factual Knowledge Does Not Compress

One research thread I keep coming back to: Incompressible Knowledge Probes. The claim is that factual accuracy across 1,400 questions and 188 models from 27 vendors gives a strong log-linear signal of model size, with R² of 0.917 on open-weight models ranging from 135M to 1.6T parameters. The argument is that factual capacity does not compress over time the way reasoning-compression narratives imply.

Whether or not you buy the fitted curve estimates for closed-model sizes, the broader point is worth internalizing: black-box evals still leak architecture-scale information. Models do not get magically smarter per parameter forever. The scaling signal is still in the data if you look for it.

## Key Takeaways

- Inference compute is now the strategic resource in AI, not training. CPU demand is a secondary effect of agentic workloads, not just GPU overflow.
- Coding agents are converging on headless runtimes with programmable harnesses and usage-based economics. Cursor SDK, OpenAI Codex app-server, VS Code harness work — all pointing the same direction.
- Harness quality, memory, and tool orchestration matter more than model intelligence in production agent workloads. This is backed by benchmark data now, not just practitioner intuition.
- Open-weight models are getting cheap and capable fast. The business case for always reaching for a frontier API is weakening every month.
- GPU library performance is path-dependent in ways that are hard to predict. Profiling and co-design matter as much as choosing the right hardware.
