---
title: "NVIDIA Goes All-In on Open Source with Cosmos 3 and Nemotron Ultra"
excerpt: "NVIDIA released Cosmos 3, a fully open omnimodal world model family, and announced the 550B Nemotron Ultra at Computex, signaling a serious strategic push into open-weight physical AI."
publishedAt: "2026-06-02"
slug: "nvidia-cosmos-3-nemotron-ultra-open-source-physical-ai"
hashtags: "#ainews #ai #ml #nvidia #openweights #newsletter #en"
source_pattern: "AINews"
---

## NVIDIA Goes All-In on Open Source with Cosmos 3 and Nemotron Ultra

**TLDR:** [NVIDIA](https://www.nvidia.com/) dropped [Cosmos 3](https://developer.nvidia.com/cosmos), a fully open omnimodal world model family targeting physical AI and robotics, plus [Nemotron Ultra](https://www.nvidia.com/en-us/ai-data-science/foundation-models/nemotron/) at 550B parameters, and announced the RTX Spark personal AI superchip. The open-source angle is not marketing: the weights, code, datasets, and fine-tuning recipes all shipped.

**Summary:**

NVIDIA has been a hardware company that tolerated open source. This week feels different. [Cosmos 3](https://developer.nvidia.com/cosmos) ships with weights, code, datasets, and fine-tuning recipes, which is a full-stack open release in a way that [CUDA](https://developer.nvidia.com/cuda-toolkit) ecosystem projects rarely have been. That matters, and I want to be specific about why.

Cosmos 3 uses a Mixture-of-Transformers architecture that pairs an autoregressive reasoner with a diffusion generator. The Nano configuration is 16 billion parameters (8B reasoner plus 8B generator), and the Super configuration is 64 billion parameters split evenly. Text-to-image and image-to-video fine-tunes from this family are now the top open-weight models in their categories. NVIDIA also launched the Cosmos Coalition with [Runway](https://runwayml.com/) as a partner, which is ecosystem building done seriously.

The physical AI framing is where it gets interesting. NVIDIA is positioning Cosmos 3 as infrastructure for robotics and physical automation, not just another multimodal chat model. Unifying language, image, video, audio, and action in a single architecture is aimed at the robot-that-needs-to-understand-its-environment problem. If that framing holds up, this is genuinely different from what the language model labs are doing.

[Nemotron Ultra](https://www.nvidia.com/en-us/ai-data-science/foundation-models/nemotron/) is 550 billion total parameters with 55 billion active (a mixture-of-experts model), announced by [Jensen Huang](https://en.wikipedia.org/wiki/Jensen_Huang) at [Computex](https://www.computex.com.tw/) in Taiwan. Multiple people in the AI space called it the strongest US open-weight model available. The combination of scale and efficiency is worth noting. A 550B MoE that is practically fast is a different kind of artifact than a dense 70B.

The RTX Spark personal superchip is previewed but not shipping yet. One petaflop on a personal computer is a statement about where NVIDIA thinks local inference is going. The partnership with [Microsoft](https://www.microsoft.com/) and the [Hermes Agent](https://hermes.ai/) launch partner suggest this is being positioned for developers running agentic workloads locally, not just gamers.

**Key takeaways:**
- [Cosmos 3](https://developer.nvidia.com/cosmos) is a genuinely open release (weights, code, data, recipes) using a Mixture-of-Transformers architecture targeting physical AI and robotics, not just text or code generation
- [Nemotron Ultra](https://www.nvidia.com/en-us/ai-data-science/foundation-models/nemotron/) at 550B parameters (55B active via MoE) is being called the strongest open-weight US model, combining scale with practical inference speed
- RTX Spark signals NVIDIA's intent to make one petaflop of personal AI compute a consumer reality, with agentic developer workloads as a clear target use case

**Why do I care:** The open-weight competition is accelerating faster than most product roadmaps can track. Two things stand out to me. First, Cosmos 3 being fully open including training data and recipes means the research community can actually build on it, not just run inference. That is a multiplier effect that proprietary releases do not get. Second, the physical AI framing is a reminder that the next wave of AI applications is not more chatbots, it is machines that need to perceive and act in the physical world. If NVIDIA has a head start on open infrastructure for that, the implications for who builds what over the next few years are significant. Meanwhile, the "40% of PRs include AI-generated code" stat floating around this week is a separate signal worth watching: the developer workflow is already changing faster than most teams are acknowledging.

**Link:** [AINews: NVIDIA Open Source Week](https://latent.space/p/nvidia-open-source-week)

#newsletter-cta('Open Weights, Physical World', 'Understand why NVIDIA\'s fully open Cosmos 3 release is a bigger deal for robotics and physical AI than anything the language model labs shipped this week.')
