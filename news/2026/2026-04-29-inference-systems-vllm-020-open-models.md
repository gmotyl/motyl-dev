---
title: "Inference Systems, vLLM 0.20, and the Week in Open Models"
excerpt: "Scott Hanselman covers vLLM 0.20 with TurboQuant, DeepSeek V4 serving analysis, Poolside Laguna XS.2 debut, NVIDIA Nemotron 3 Nano Omni, and agent production primitives."
publishedAt: "2026-04-29"
slug: "inference-systems-vllm-020-open-models"
hashtags: "#AINews #ai #inference #models #vllm #deepseek #nvidia #agents #generated #en"
source_pattern: "AINews"
---

Scott Hanselman here, and this week's AINews covers the inference systems battle, new open model releases, and the shift from demos to production.

## vLLM 0.20 and the Hardware Race

vLLM zero point twenty shipped with some significant updates. TurboQuant two-bit KV cache gives four times the KV capacity. FA four is re-enabled for MLA prefill on SM ninety plus. Fused RMSNorm delivers a reported two point one percent end-to-end latency improvement. But the big story is DeepSeek V four MegaMoE support on Blackwell, Jetson Thor, ROCm, Intel XPU, and easier GB200 setup.

The DeepSeek serving analysis is worth digging into. Jeremy Howard noted DeepSeek V four's support for prefill as a capability many providers have dropped. This matters because prefill is expensive in terms of compute. Maharshi pointed out the overheads of dynamic activation quantization, arguing that static quantization often wins on inference speed despite calibration cost. There's also growing interest in alternate stack portability: DeepSeek is structurally moving away from CUDA lock-in via TileKernels. Model vendors may increasingly optimize for heterogeneous or domestic accelerator fleets.

## Open Model Releases

Three significant open model drops this week.

Poolside made its first public model release with Laguna XS point two, a thirty-three billion total, three billion active MoE coding model trained fully in-house, released under Apache two. The key detail: it claims to run on a single GPU. Ollama shipped it immediately.

NVIDIA dropped Nemotron three Nano Omni, a thirty billion total, A three billion multimodal MoE with two hundred fifty-six K context built for agentic workloads across text, image, video, audio, and documents. Distribution was immediate across the stack: OpenRouter, LM Studio, Ollama, Unsloth, Fireworks, DeepInfra, Together, Baseten, and others all announced same-day availability. Key spec: around nine times throughput versus comparable open omni models. This is the biggest infra-native model launch of the week.

Microsoft released TRELLIS point two, an open-source four billion image-to-three-D model producing up to fifteen thirty-six cubed PBR textured assets, built on native three-D VAEs with sixteen times spatial compression.

## Agent Production Primitives

The shift from demos to production is accelerating. Mistral launched Workflows in public preview as an orchestration layer aimed at turning enterprise AI processes into durable, observable, fault-tolerant production systems.

Local and offline agents moved from aspiration to credible workflow. Teknium asserted totally offline agents are possible. One demo showed Pi plus local models for desktop cleanup. Hugging Face reported three hundred thousand users have added hardware specs to the Hub to discover what can run locally. A vibe-coding app running Gemma four fully on-device with MLX was open-sourced.

The Hermes harness is gaining real-world traction. Multiple posts reported Hermes outperforming OpenClaw in instruction-following.

## Benchmarks Worth Watching

Epoch reported GPT five point five Pro reaching one fifty-nine on the Epoch Capabilities Index and new highs on FrontierMath: fifty-two percent on Tiers one through three and forty percent on Tier four, including two Tier four problems not previously solved by any model.

VibeBench proposes subjective testing by one thousand qualified software engineers to measure how models actually feel in real work. This is a good step beyond pure accuracy metrics.

## Why Do I Care

The inference systems story is where the rubber meets the road for AI deployment. vLLM keeps shipping meaningful optimizations. The DeepSeek serving analysis is important because it shows the community is thinking beyond just "run the model" to "run it well."

The open model releases are getting more deployment-friendly. Poolside's single-GPU claim matters if it holds up. Nemotron Omni's immediate availability across the stack shows the ecosystem has matured.

The agent production shift is the most important trend. Demos are useless in production. Durable, observable, fault-tolerant systems are what's needed now.

**Link:** [AINews not much happened today](https://www.latent.space/p/ainews-not-much-happened-today?publication_id=1084089&post_id=195821425&isFreemail=true&triedRedirect=true)