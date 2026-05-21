---
title: "OpenAI GPT-next Cracks an 80-Year-Old Math Problem for Under $1,000"
excerpt: "A general-purpose OpenAI reasoning model disproved the Erdős planar unit distance problem, while Cohere opened its largest model under Apache 2.0 and Google pushed Gemini updates through I/O follow-through."
publishedAt: "2026-05-21"
slug: "openai-gpt-next-erdos-unit-distance-cohere-command-a-plus"
hashtags: "#AINews #ai #llm #reasoning #openai #cohere #gemini #agents #generated #en"
source_pattern: "AINews"
---

## OpenAI Solves an 80-Year-Old Math Problem for Under $1,000

**TLDR:** An internal OpenAI reasoning model disproved a long-standing belief about the planar unit distance problem, a famous open question from Erdős dating to 1946. The model ran for under 32 hours at a cost below $1,000, and OpenAI says it is a general-purpose system, not a specialized math solver.

This one stops me in my tracks. The Erdős unit distance problem is not a toy benchmark or a curated olympiad puzzle. It is a real, decades-old open problem in discrete geometry that professional mathematicians have chipped away at since 1946. And now an LLM, running for less than a day on what amounts to a cloud compute bill you could expense, found a new family of constructions that improves on square-grid-style solutions and disproves a core assumption in the problem.

What makes this more than a press release is the source of validation. Timothy Gowers, a Fields Medal winner, called it "the first really clear example of AI solving a well-known open math problem." That is not a hedged statement. Gowers has been skeptical of AI math hype before, which makes his framing here notable. Hongxun Wu from OpenAI described it as a milestone on "the hardest problems" for their internal reasoning LLM.

The 125-page reasoning trace the model produced has already become its own discussion thread. There is apparently a "page 39 moment" where the model makes a move that surprised the mathematicians reviewing it. The trace length itself points to something real about what test-time compute can do when you give a model room to think. This is not chain-of-thought in the sense of two paragraphs before the answer. This is extended reasoning at a scale that starts to look like actual research work.

One nuance worth holding onto: this is a disproof, not a proof. The model found a counterexample to an existing belief rather than proving something new from scratch. Some observers noted that proving would have been more impressive. That is fair. But disproving with a novel construction in 125 pages of generated math is still a result that belongs in a journal, and OpenAI says the model was not pushed to its limit.

**Key takeaways:**
- A general-purpose reasoning model produced original mathematical research, not just olympiad solutions
- The result was validated by prominent mathematicians, including Timothy Gowers
- The compute cost was under $1,000 for under 32 hours of runtime, which puts this within reach of small research groups
- OpenAI frames this as evidence that inference-time scaling generalizes beyond narrow math tasks

**Why do I care:** For years the argument has been that AI can pass exams but cannot do research. This punches a hole in that argument. If a general-purpose model can produce a result that surprises working mathematicians, the question for frontend engineers and architects is not "when will AI do my job" but "what does this mean for the tools I build on top of." Models that can reason at this level will change what agents can do, which changes what infrastructure they need, which changes what I need to build. Start thinking about that now.

**Link:** [OpenAI GPT-next disproves 80 year old Erdős planar unit distance problem for under $1000](https://www.latent.space/p/ainews-openai-gpt-next-disproves)

---

## Cohere Opens Command A+ Under Apache 2.0

**TLDR:** Cohere released Command A+ as fully open weights under the Apache 2.0 license, making it the first Apache 2 model from Cohere. At roughly 218B MoE with 25B active parameters, it runs on as little as two H100s at W4A4 quantization and claims frontier-range performance on several benchmarks.

The licensing story here is actually the bigger deal than the benchmark numbers. Cohere has been a commercial-first shop, and flipping to Apache 2.0 for their most capable model is a meaningful shift. Apache 2.0 means you can use it in production, modify it, distribute it, and build products on top of it without negotiating terms. That is a very different proposition from "available for research."

The architecture choices are drawing attention from the community. This is not a vanilla transformer stack. Parallel transformer blocks, large shared expert usage, LayerNorm instead of RMSNorm, a relatively shallow 32-layer depth, and atypical head and expert configurations. Researchers are treating this as an architectural data point, not just a model drop. When a production lab ships something that departs from convention in this many places at once, it is worth studying.

Benchmark placement is honest rather than flattering. Artificial Analysis puts Command A+ at position 37 on their Intelligence Index, roughly in Claude 4.5 Haiku territory. Strong non-hallucination behavior and decent speed, but weaker on scientific reasoning and coding compared to the top tier. That is a coherent positioning for an enterprise model optimized for low hardware requirements. Not every workload needs GPT-5.5 level reasoning, and a model that does not hallucinate aggressively on document tasks at 2xH100 cost is genuinely useful.

vLLM day-0 support is already in, and the community has confirmed it runs on modest setups. If you are running inference at scale and want an open, deployable, enterprise-grade model that does not require a rack of GPUs, Command A+ is worth evaluating.

**Key takeaways:**
- First Apache 2.0 release from Cohere, enabling unrestricted production use
- Unusual architecture choices make it an interesting research artifact beyond the benchmark numbers
- Runs on 2x H100s at W4A4 quantization with vLLM day-0 support
- Positioned at Claude 4.5 Haiku level performance, not top-tier, but with strong non-hallucination behavior

**Why do I care:** Open weights under Apache 2.0 changes what you can build without a vendor relationship. For teams running private inference, building products on top of a model, or needing auditability in regulated environments, Command A+ is now a legitimate option worth putting in the evaluation queue. The unusual architecture also means there may be performance characteristics that show up differently on real workloads versus standardized benchmarks.

**Link:** [AINews coverage](https://www.latent.space/p/ainews-openai-gpt-next-disproves)

---

## Google I/O Follow-Through: Gemini 3.5 Flash, Omni, and Science Skills

**TLDR:** Google pushed Gemini 3.5 Flash to broader rollout with free global access, launched Gemini Omni as a conversational multimodal editing model, and added Science Skills to their agent stack integrating 30+ life-science sources including UniProt and AlphaFold DB.

The community reaction to 3.5 Flash was noticeably more skeptical than the launch messaging. Google framed it as "4x the speed of comparable models at under half the cost" with frontier-quality positioning, but external evaluation was mixed, with questions around real-world token efficiency and whether the cost numbers hold outside favorable benchmark conditions. That gap between launch claims and community reception is worth watching.

Gemini Omni made a stronger qualitative impression. The positioning as a conversational multimodal creation model, with video editing through natural dialogue, is differentiated in a way that pure LLM refresh is not. If the demos hold up in real use, that is a distinct product rather than another leaderboard contender.

The Science Skills integration is the item I find most interesting from an architecture standpoint. Connecting an agent stack directly to UniProt, AlphaFold DB, and 28 other life-science data sources is a concrete example of what "agents with tools" looks like when the tools are authoritative scientific databases rather than web search. This is not a demo. It is a productionized integration that could change how bioinformatics workflows get built.

AI Studio also pushed toward mobile access and end-to-end developer workflows, and there is ongoing community decoding of how Gemini Spark and Antigravity relate to each other and to the public-facing agent harnesses. The internal naming confusion is real, and simonw's thread on untangling it is worth reading.

**Key takeaways:**
- Gemini 3.5 Flash is broadly available with free global access, but external benchmark validation is mixed
- Gemini Omni is the more differentiated product, targeting multimodal conversational editing
- Science Skills integrates 30+ life-science databases directly into Google's agent stack
- Community skepticism around cost and performance claims is higher than typical Google I/O reception

**Why do I care:** The Science Skills integration is a preview of what enterprise agent infrastructure looks like when you combine a strong base model with authoritative domain databases. As a developer building agent workflows, the pattern of "model + curated data source + tool call" is more transferable than anything involving raw web search. Watch how Google's stack evolves here, because similar patterns will show up in frameworks you use within 12 months.

**Link:** [AINews coverage](https://www.latent.space/p/ainews-openai-gpt-next-disproves)

---

## Agent Infrastructure: Retrieval Compression, Evals, and Memory Gaps

**TLDR:** Several research and tooling releases converged on the same finding: current agents fail on infrastructure before they fail on reasoning. New benchmarks show frontier models struggling with dependency management and system-level engineering, while retrieval and memory systems show accuracy gaps even at 138k+ token contexts.

InferenceBench is the most sobering release in this batch. It tests AI R&D automation on open-ended inference optimization tasks, and the headline is that frontier agents underperform a simple baseline of vLLM/SGLang hyperparameter tuning. The failure modes are dependency conflicts, config management, and broad system exploration. These are not exotic edge cases. They are the everyday reality of running software in production. The additional finding of an apparent inverse scaling effect, where models like Claude Sonnet 4.6 rank well by producing robust final states while larger models produce brittle configurations, is worth taking seriously. Bigger is not always better for tasks with real-world constraints.

MINTEval's memory benchmark results are similarly humbling. Average context length of 138.8k tokens, up to 1.8M tokens, and the best system across seven evaluated architectures hits only 33.4% accuracy. The average is 27.9%. For tasks involving long contexts with frequent updates and interference, current memory approaches, whether RAG or context stuffing, are not solving the problem. The argument that memory needs to be a dedicated learned subsystem rather than a tacked-on retrieval layer is getting harder to dismiss.

On the retrieval side, Perplexity described a production compression system that cuts context tokens by up to 70% with claimed quality improvements, hitting 50x compression on SimpleQA. Weaviate 1.37 added MMR reranking for diversity in vector retrieval. SID-1 is an RL-trained search model claiming 1.9x recall over RAG+rerank at 24x lower latency and 99% lower cost than GPT-5.1 in the cited setup. Each of these addresses a real problem, and none of them should be taken at face value without running your own evaluation on your own data.

Cursor, VS Code, and Codex all shipped workflow updates. Cursor added automations in the agents workspace. VS Code pushed markdown/HTML preview improvements, remote session continuity, and utility-model configurability. OpenAI shipped Codex on mobile. Composer 2.5 posted a 62 on the Artificial Analysis Coding Agent Index at significantly lower cost than Opus or GPT-5.5 variants.

**Key takeaways:**
- InferenceBench shows frontier agents failing on system-level engineering tasks, not reasoning tasks
- Memory system accuracy tops out at 33.4% even at 138k+ token contexts across seven evaluated systems
- Retrieval compression at production scale is an active area, with multiple competing approaches
- Developer tooling across Cursor, VS Code, and Codex all moved forward in the same week

**Why do I care:** The infrastructure failure story from InferenceBench is the most practically relevant finding for people building agents. When your agent breaks, it will probably break because of a dependency conflict or a config mismatch, not because the LLM gave a wrong answer. Building agent systems that are resilient to real-world infrastructure messiness is an unsolved problem, and the benchmarks confirming this are more useful than ones that show impressive performance on clean tasks.

**Link:** [AINews coverage](https://www.latent.space/p/ainews-openai-gpt-next-disproves)

---

## Exa Raises $250M, Qwen Teases Next Models

**TLDR:** Exa raised a $250M Series C at a $2.2B valuation, explicitly positioning itself as a search lab organizing web data for agents. Meanwhile, Qwen previewed Qwen3.7 on Arena and the community is actively speculating about upcoming 27B and larger open-weight releases.

Exa's framing is worth noting. They are not positioning as a search engine for humans. They are positioning as infrastructure for agents, and the $2.2B valuation at Series C suggests investors are buying that framing. As agent workloads scale, the retrieval layer becomes critical infrastructure, and Exa is betting that general web search needs to be rebuilt from the ground up for machine consumers rather than human ones.

The Qwen situation is a good example of how community anticipation around open models works now. Alibaba ranks in the top 6 on text and top 5 on vision benchmarks. Qwen3.7 Max is sitting at position 5 on Artificial Analysis, roughly level with GPT 5.4, and the community is already mapping out what they want next: a 27B dense model, a 35B MoE that fits on gaming hardware, a 122B-A10B for higher quality. The gap between what the Qwen team ships commercially and what they release as open weights is the central tension in every thread.

One technical concern that keeps surfacing is "overthinking" behavior, meaning excessive reasoning-token usage, high latency, and verbose outputs that do not improve quality proportionally. It is a real usability problem and one the community is watching closely for fixes in upcoming releases.

**Key takeaways:**
- Exa raised $250M framing itself as search infrastructure for agents, not a human-facing product
- Qwen3.7 Max is competitive with GPT 5.4 on benchmarks; community is waiting for open-weight 27B and larger variants
- "Overthinking" behavior in Qwen models is flagged as an unresolved issue for reasoning-token efficiency
- Anthropic's compute expansion on Colossus 2 with a reported $1.25B/month SpaceX agreement through May 2029 is a significant infrastructure bet

**Why do I care:** Exa's positioning tells you something about where the money sees the agent stack going. If your application depends on web retrieval as a tool, you should be watching what Exa builds. And the Qwen open-weight situation matters for anyone running local inference, because the difference between a 27B and a 35B MoE in terms of what hardware can actually run it is not academic. It determines whether you can self-host your way out of vendor lock-in.

**Link:** [AINews coverage](https://www.latent.space/p/ainews-openai-gpt-next-disproves)
