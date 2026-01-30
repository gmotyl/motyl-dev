---
title: "Trinity Large: The Largest US Open-Weight Model Now Available for Free"
excerpt: "Arcee AI releases a 400B parameter MoE model with 13B active parameters, marking a significant milestone for open-source AI accessibility."
publishedAt: "2026-01-28"
slug: "trinity-large-open-weight-model-kilo"
hashtags: "#substack #ai #ml #llm #open-source #architecture #agents #generated #en"
---

## Trinity Large is Live in Kilo!

**TLDR:** Arcee AI has released Trinity Large, a 400B parameter sparse Mixture of Experts model with 13B active parameters, making it the largest open-weight model ever released by a US-based lab. It's available for free in Kilo Code right now.

The open-source AI landscape just got a significant new player. Trinity Large represents a strategic response to the dominance of models from Z AI, Qwen, and DeepSeek. What makes this release noteworthy isn't just the raw parameter count - it's the architecture and the accessibility.

Let's break down what we're looking at: 400 billion parameters total, but only 13 billion active per token. This is the magic of Mixture of Experts architecture - you get the knowledge capacity of a massive model with the inference efficiency of a much smaller one. Trinity Large uses 256 total experts with 4 experts activated per token, following the DeepSeekMoE design but with proprietary modifications that Arcee details in their Trinity Manifesto.

The training infrastructure tells a story of serious investment: 2048 B300 GPUs were used to train this model. For context, that's significant compute by any standard, and it represents a US-based lab making a deliberate push to compete with the open-source leaders that have emerged from China and elsewhere. Arcee, founded in 2023 with backing from Flybridge, Samsung, and Emergence Capital, has positioned themselves as champions of developer ownership and extreme efficiency.

For architects evaluating model options, the practical implications are worth considering. Trinity Large's massive context window and reasoning efficiency are specifically tuned for code-related tasks - maintaining context across large codebases, complex refactoring, and architecture planning. The sparse MoE approach means you're not paying the full computational cost of a 400B model at inference time, making it potentially viable for more use cases than a dense model of equivalent total parameters would be.

The "free for all users" availability in Kilo Code is a deliberate strategy to build adoption and gather real-world performance data. Kilo is running internal benchmarks on boilerplate generation, debugging, and complex refactoring tasks, with full results promised in a future post. This follows the increasingly common pattern of releasing models to developers before comprehensive benchmark publications, letting the community validate (or challenge) the capabilities in production scenarios.

For teams considering open-weight alternatives to proprietary models, this is worth tracking. The US-based origin may matter for organizations with data residency or supply chain concerns. The MoE architecture offers an interesting efficiency profile. And the explicit focus on coding tasks suggests Arcee is making a targeted play for the developer tools market rather than trying to be everything to everyone.

**Key takeaways:**
- Trinity Large is the largest open-weight model released by a US-based lab (400B total, 13B active parameters)
- Sparse MoE architecture with 256 experts provides capacity with efficiency
- Specifically optimized for code tasks: large codebase context, refactoring, architecture planning
- Available for free in Kilo Code immediately
- Strategic response to open-source dominance by Chinese labs

**Tradeoffs:**
- MoE architecture gains inference efficiency but adds routing complexity and potential inconsistency between expert activations
- Open-weight availability enables customization but requires self-hosting infrastructure for production deployments
- Large context windows improve codebase understanding but increase memory requirements

**Link:** [Trinity Large is live in Kilo!](https://blog.kilo.ai/p/trinity-large-is-live-in-kilo)

---

*The content above is AI-generated based on newsletter sources. While I strive for accuracy, please verify critical information from original sources.*