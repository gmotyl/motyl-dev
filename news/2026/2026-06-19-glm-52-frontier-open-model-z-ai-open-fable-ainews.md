---
title: "GLM-5.2 Passes the Vibe Check, Z.ai Forecasts Open Fable by End of Year"
excerpt: "GLM-5.2's 744B MoE model earns genuine practitioner validation, a new agentic benchmark shows Fable 5's $31/task cost premium, and Codex Record and Replay lets agents learn by watching."
publishedAt: "2026-06-19"
slug: "glm-52-frontier-open-model-z-ai-open-fable-ainews"
hashtags: "#AINews #ai #llm #ml #agents #open-source #benchmark #generated #en"
source_pattern: "AINews"
---

## GLM-5.2 Crosses the Frontier Threshold

**TLDR:** GLM-5.2, Zhipu's 744B parameter mixture-of-experts model, earned unsolicited validation from multiple credible practitioners including Jeremy Howard and Artificial Analysis, who ranked it above GPT-5.5 on their new knowledge-work benchmark. It's the first open-weight model that passes the "frontier-adjacent in daily use" test for a meaningful slice of use cases.

The AINews crew is deliberately cautious about open model announcements because the pattern is familiar: strong benchmark numbers at launch, then fade into irrelevance a month later once people try them in real workflows. GLM-5.2 cleared a higher bar. Jeremy Howard, not given to hype, called it at least as good as Opus 4.8 and GPT-5.5 for his use. Artificial Analysis placed it between GPT-5.5 and Opus 4.8 on their new AA-Briefcase agentic benchmark. The Reddit LocalLlama community is running it and reporting genuinely frontier-level behavior. Multiple out-of-sample data points agreeing is different from one benchmark score.

The architecture addition worth noting is IndexShare, which reuses sparse-attention top-k indices across groups of layers to reduce the cost of 1M-token inference. GLM-5.2 also claims 1M token context window support with 131k token output, which is the kind of long-horizon capability that matters for the agentic knowledge-work tasks that real production deployments actually need. Zhipu made it immediately accessible: free via Hugging Face Inference Providers for a limited window, local GGUF support via llama.cpp and Unsloth.

The hardware reality check: 744B parameters in FP8 requires roughly 744-890GB of memory, dropping to around 176-180GB with dynamic 1-bit quantization. A 512GB Mac can't run it. But that's not the main use case. The distillation story is what matters. A model at this capability level with MIT licensing and 28.5 trillion token pretraining provides extremely high quality training signal for distilling into smaller models like the expected GLM-5.2 Air at 200-300B or Flash at around 40B.

**Key takeaways:**
- GLM-5.2 is the first open-weight model that multiple credible practitioners describe as frontier-adjacent in daily use, not just competitive on specific benchmarks
- Artificial Analysis' AA-Briefcase benchmark found Fable 5 topped at $31/task while GLM-5.2 cost $2.40/task, a 13x difference for comparable-quality work on many task types
- IndexShare attention optimization makes 1M-token inference economically viable rather than prohibitively expensive
- MIT licensing and large pretraining scale make GLM-5.2 an excellent source model for distillation into smaller practical variants

**Why do I care:** For teams evaluating whether frontier-level AI capabilities require frontier-level pricing commitments, GLM-5.2 is the strongest counterargument yet. The $2.40 versus $31 per task comparison on AA-Briefcase is stark. If your workloads don't require the specific ceiling performance that Fable 5 delivers on difficult tasks, GLM-5.2 may be good enough at a fraction of the cost, without the geopolitical exposure of US-based closed providers. The vision gap (GLM-5.2 lacks vision support) is a real limitation for workflows that need it, but for text and code, this is the model that finally makes the "use open weights for production" argument credible.

**Link:** [[AINews] GLM-5.2 is the real deal; Z.ai forecasts Open Fable by EOY](https://www.latent.space/p/ainews-glm-gpt-glm-52-passes-vibe)

---

## AA-Briefcase: A Benchmark That Measures the Work You Actually Do

**TLDR:** Artificial Analysis launched AA-Briefcase, a new agentic benchmark built around multi-week project simulations with real-world document corpora, where deliverables are board decks and financial models rather than multiple-choice answers. It exposes both quality and cost in a way that single-number leaderboards don't.

The problem with most benchmarks is that they measure performance on tasks that are designed to be measurable, not performance on work that matters. AA-Briefcase simulates multi-week projects with thousands of fragmented inputs across Slack, email, and document corpora, then asks models to produce deliverables like financial models and board decks. That's a genuinely different test from reasoning puzzles.

The cost data is the uncomfortable part. Fable 5 averaged $31 per task and scored 1587 Elo at the top. Opus 4.8 scored 1356 at $10.40 per task. GPT-5.5 extended-high scored higher while costing $3.68 per task. GLM-5.2 came in at $2.40 per task at 1266 Elo. The efficiency picture doesn't favor the models at the top of the capability leaderboard when you factor in cost.

The humbling finding: the top model, Fable 5, satisfied all rubric criteria on exactly 3% of tasks. Long-horizon knowledge work remains genuinely hard, and the cost premium of using the most expensive model doesn't buy you anywhere near reliable success on the full task distribution.

**Key takeaways:**
- AA-Briefcase uses real-world project simulations with fragmented document corpora rather than clean, designed benchmark tasks
- Cost-efficiency analysis shows GPT-5.5 and GLM-5.2 punch significantly above their price point compared to Fable 5 for knowledge work
- Even the best model (Fable 5) only fully satisfied all criteria on 3% of tasks, which is a useful calibration on where agent capabilities actually stand
- The benchmark evaluates harness-plus-model pairs, not models in isolation, which is closer to how production deployments actually work

**Why do I care:** AA-Briefcase is the kind of benchmark I actually want to read about because it measures something that matters. The 3% full-criteria completion rate is sobering but honest. It means you shouldn't design production workflows that assume near-perfect agent output on complex tasks. You need human review checkpoints, and the cost of those checkpoints is part of your actual system economics. The cost-per-task data also makes the model selection conversation more concrete: if Fable 5 at $31/task is 13x the cost of GLM-5.2 at $2.40/task but only marginally better on most of your actual work, the math doesn't favor defaulting to the most expensive model.

**Link:** [[AINews] GLM-5.2 is the real deal; Z.ai forecasts Open Fable by EOY](https://www.latent.space/p/ainews-glm-gpt-glm-52-passes-vibe)

---

## OpenAI Codex Record and Replay: Teach Agents by Demonstrating

**TLDR:** OpenAI introduced Codex Record and Replay, a feature that lets users demonstrate a workflow once and turn it into an inspectable, reusable skill for agents. Cursor launched a similar feature called /automate at the same time. Demonstration-based automation is becoming a real product surface.

The "teach by showing" approach has a long history in RPA and workflow automation, and it consistently outperforms "configure by specifying" for the subset of tasks where the workflow is stable enough to capture. The interesting question with LLM-based agents is whether the demonstration produces something more robust than a brittle macro, since the model has enough understanding to handle variations in the task.

Cursor's /automate takes a natural-language description of a task and configures triggers, instructions, and tools automatically. It adds Slack emoji triggers, GitHub triggers, and computer-use for cloud agents. The fact that both OpenAI and Cursor shipped variations of demonstration-based automation in the same time window suggests this is where the category is converging, at least for developers.

**Key takeaways:**
- Codex Record and Replay produces inspectable skills from demonstrated workflows, which is meaningfully different from black-box macro recording
- Cursor's /automate allows natural language task description rather than requiring explicit configuration of triggers and tools
- Claude Code shipped Artifacts, enabling agents to turn ongoing work into shareable live pages, which has already changed internal workflows for architecture changes at Anthropic

**Why do I care:** Demonstration-based agent workflows reduce the setup barrier for automating repetitive tasks in a way that explicit prompt engineering doesn't. If you can show the agent what you want once, and it generalizes that into a reusable skill, the time cost of automation drops below the threshold where most developers bother. The question is how well the resulting skills hold up against real task variation. That's the empirical test that will determine whether Record and Replay becomes a genuine productivity primitive or a demo feature.

**Link:** [[AINews] GLM-5.2 is the real deal; Z.ai forecasts Open Fable by EOY](https://www.latent.space/p/ainews-glm-gpt-glm-52-passes-vibe)
