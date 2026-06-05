---
title: "NVIDIA Nemotron 3 Ultra Brings 550B Open-Weights Power to Agentic Coding"
excerpt: "NVIDIA's Nemotron 3 Ultra, a 550B-parameter open-weights model optimized for agentic coding, is now free to use in Kilo Code."
publishedAt: "2026-06-04"
slug: "nvidia-nemotron-3-ultra-open-weights-agentic-coding-kilo"
hashtags: "#kilo #agents #ai #nvidia #nemotron #openweights #llm #agentic #generated #en"
source_pattern: "Kilo"
---

## NVIDIA Nemotron 3 Ultra is Here and It's Free to Use in Kilo

**TLDR:** NVIDIA announced Nemotron 3 Ultra at Computex 2026, a 550B-parameter open-weights model built for agentic coding workflows. It's currently the top open model on the PinchBench agentic leaderboard, and it's free to use in Kilo Code for a limited time.

**Summary:** Jensen Huang took the stage at Computex 2026 in Taipei last weekend and dropped what might be one of the more interesting open-weights model announcements in a while. Nemotron 3 Ultra is NVIDIA's flagship open model, and the headline numbers are genuinely striking. Five hundred and fifty billion total parameters, but the architecture only activates 55 billion of them per token during inference. That's the hybrid Mamba-Transformer Mixture-of-Experts design doing its thing, and the result is apparently over 300 tokens per second throughput, which puts it firmly in the "fast enough to not annoy you" category.

The model tops the PinchBench agentic leaderboard with a 90% median success rate, and it scores a 48 on the Artificial Analysis Intelligence Index. Kilo describes it as the smartest open model from the US so far. Their internal KiloBench evals show it performing very similarly to Qwen 3.7 Plus for agentic tasks. That's a meaningful comparison because Qwen has been one of the stronger open contenders. Having a competitive US-origin alternative matters, particularly for organizations with data sovereignty requirements.

The 1 million token context window is the other detail worth sitting with. You can load an entire codebase, extensive API documentation, and long error logs into a session without worrying about the model losing coherence partway through. For agentic coding workflows, that's not a luxury, it's a practical necessity. The model was also specifically engineered for tool use and multi-step planning through multi-environment reinforcement learning, including SWE-RL, which is the kind of training that actually translates to better behavior in the inner loops of a coding agent.

Kilo is making it free across all their products for a limited time. The model runs in your terminal, VS Code, or JetBrains IDE through Kilo Code. Beyond the benchmark numbers, NVIDIA is releasing Nemotron 3 Ultra with open weights, datasets, and training recipes, which means organizations can fine-tune it for domain-specific workflows, deploy it in self-hosted environments, and maintain full control over where the model and data live. That story about regulatory compliance and data localization is one that enterprises have been waiting for from an open model at this capability level.

**Key takeaways:**
- Nemotron 3 Ultra uses a hybrid Mamba-Transformer MoE architecture with 550B total parameters, activating only 55B per token, delivering over 300 tokens per second
- It leads the PinchBench agentic leaderboard among open-weights models with a 90% median success rate and a 1 million token context window
- The model is fully open, including weights, datasets, and recipes, supporting self-hosted deployments for teams with strict data locality or compliance needs
- It is currently free to use in Kilo Code across VS Code, JetBrains, and terminal

**Why do I care:** From where I sit as someone thinking about frontend architecture and the tooling that surrounds it, the open-weights story here is the one that actually matters for serious teams. Cloud-hosted models are convenient until they aren't, whether that's a compliance audit, a pricing change, or a simple network dependency in a critical workflow. A 550B model that you can self-host, fine-tune on your own codebase, and run at 300 tokens per second starts to look less like a curiosity and more like infrastructure. The agentic optimization is real work, not marketing. SWE-RL training on multi-step planning and tool calling is exactly what separates a model that writes plausible code from one that can actually navigate your project, call the right tools in the right order, and recover from errors. I'd run the evals yourself before fully committing, but the benchmark positioning against Qwen 3.7 Plus is a serious signal.

**Link:** [NVIDIA Nemotron 3 Ultra is Here and it's Free to Use in Kilo](https://blog.kilo.ai/p/nvidia-nemotron-3-ultra?publication_id=4363009&post_id=200612126&isFreemail=true&triedRedirect=true)
