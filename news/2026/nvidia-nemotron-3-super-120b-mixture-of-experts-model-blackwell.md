---
title: "NVIDIA Nemotron 3 Super: A 120B Mixture-of-Experts Model Optimized for Blackwell"
excerpt: "NVIDIA launches Nemotron 3 Super, a 120B parameter hybrid mixture-of-experts model with impressive benchmark scores and strong agentic coding capabilities."
publishedAt: "2026-03-11"
slug: "nvidia-nemotron-3-super-120b-mixture-of-experts-model-blackwell"
hashtags: "#kilo #ai #llm #ml #architecture #performance #agents #generated #en"
---

## NVIDIA Nemotron 3 Super: What a 120B Open-Weight Model Means for Agentic Coding

**TLDR:** NVIDIA has released Nemotron 3 Super, a 120 billion parameter hybrid mixture-of-experts model optimized for their Blackwell hardware. It posts strong benchmark numbers including 60.5 on SWE-Bench Verified and already ranks as the top open-weight model on PinchBench for agentic coding tasks.

Look, every few months someone drops a new model and tells you it changes everything. Most of the time, it does not. But when NVIDIA releases a model specifically optimized for their own silicon, with a mixture-of-experts architecture that activates only 12 billion of its 120 billion parameters at inference time, that is worth paying attention to. The Nemotron 3 Super is not just a bigger number on the parameter count -- it is a fundamentally different approach to how you build a large model that can actually be deployed efficiently.

Let us talk about what matters here. The SWE-Bench Verified score of 60.5 is notable. For those not tracking this benchmark, SWE-Bench tests whether a model can autonomously resolve real GitHub issues from popular open-source repositories. Scoring above 60 puts this model in serious territory for automated code repair and generation workflows. The MMLU score of 86.01 and HumanEval of 79.40 round out the picture -- this is a model that handles both broad knowledge and specific code generation competently. It also claimed the top spot on the Artificial Analysis Intelligence Index with a score of 36, which factors in not just raw capability but efficiency and openness.

What is genuinely interesting is the performance data from PinchBench testing. The model achieved an 84.7 percent average across three runs when running natively, compared to 79.4 percent when forced through a proxy with constrained reasoning budgets. That five percent gap tells you something important about model evaluation methodology that a lot of teams overlook. When you artificially constrain a model's reasoning process, you are not just limiting its compute budget -- you are changing its behavior in ways that can mask its true capabilities. The native run also showed much lower variance, which for production deployments matters as much as peak performance.

The task-level breakdown reveals where this model genuinely excels and where it falls short. Perfect scores on project scaffolding, file search and replace, and data summarization tasks suggest that for structured, well-defined automation workflows, Nemotron 3 Super is extremely reliable. The near-perfect CSV and Excel summarization scores are particularly relevant for teams building data pipeline automation. On the other hand, the model scored only 27 percent on creative image generation tasks, falling back to Python libraries instead of using native tooling. This is a classic pattern with large language models -- they tend to excel at tasks with clear structure and struggle with creative or multimodal operations.

For architects and engineering teams evaluating this model, the mixture-of-experts architecture is the key design decision to understand. By activating only a fraction of the total parameters for any given inference, NVIDIA achieves a favorable tradeoff between model capacity and inference cost. You get the knowledge of a 120 billion parameter model with the computational cost closer to a 12 billion parameter one. This matters enormously for teams considering self-hosted or on-premise deployment scenarios, especially if you are running on NVIDIA Blackwell hardware where the model has been specifically optimized. The open-weight nature of this release is also significant -- unlike proprietary models, you can inspect, fine-tune, and deploy this model on your own infrastructure without API dependency.

**Key takeaways:**

- Nemotron 3 Super uses a hybrid mixture-of-experts architecture with 120B total parameters but only 12B active at inference time, making it significantly more efficient to run than a dense model of equivalent capability
- A 60.5 SWE-Bench Verified score places it among the top models for autonomous code generation and bug resolution tasks
- Native execution without constrained reasoning budgets improved performance by over five percentage points and reduced variance, an important consideration for production deployments
- The model excels at structured automation tasks like scaffolding, data summarization, and file operations, but struggles with creative and multimodal tasks
- As an open-weight model optimized for Blackwell, it offers a self-hostable alternative to proprietary API-based models for teams with NVIDIA hardware

**Tradeoffs:**

- Mixture-of-experts gives you inference efficiency close to a 12B model but sacrifices the simplicity of a dense architecture, adding complexity to deployment and fine-tuning
- Open-weight access enables self-hosting and customization but requires significant infrastructure investment compared to using a hosted API
- Optimizing specifically for Blackwell hardware maximizes performance on that platform but limits portability to other hardware ecosystems

**Link:** [Nemotron 3 Super is Live in Kilo](https://blog.kilo.ai/p/nvidia-nemotron-3-super-launch)
