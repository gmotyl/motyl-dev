---
title: "MiniMax-M2.7 Lands in Kilo — A Deep-Reading Model That Trades Speed for Thoroughness"
excerpt: "MiniMax's latest model scores 86.2% on PinchBench, rivaling GPT-5.4 and GLM-5, but its real story is in how it thinks — reading extensively before writing, solving tasks other models miss, and costing a fraction of frontier pricing."
publishedAt: 2026-03-18
slug: minimax-m27-kilo-benchmark-deep-reading-model
hashtags: "#substack #ai #llm #benchmarks #coding-agents #minimax #generated #en"
---

## MiniMax-M2.7 Is Now Available in Kilo — Here's How It Performs

**TLDR:** MiniMax-M2.7 scores 86.2% on PinchBench (5th overall, within 1.2 points of Claude Opus 4.6) and 47% on Kilo Bench's 89-task gauntlet. It reads more context than any other model tested, which means it catches things others miss — but sometimes runs out of time doing it. At $0.30/M input and $1.20/M output, it undercuts frontier models significantly.

**Summary:** MiniMax just shipped M2.7, and the Kilo team ran it through two benchmarks that tell very different stories. PinchBench, which measures standard agentic coding tasks, places M2.7 in the top tier alongside GPT-5.4 and GLM-5 — a 3.7-point jump from M2.5 that moved MiniMax from mid-pack to contender. The more interesting picture comes from Kilo Bench, an 89-task autonomous evaluation spanning git operations, cryptanalysis, QEMU automation, and more. There, M2.7 came in second at 47%, but the pass rate barely scratches the surface. The model's defining trait is its exploration-heavy behavior — it reads surrounding files, traces call chains, and analyzes dependencies before writing a single line. This thoroughness pays off on complex reasoning tasks (it uniquely solved a SPARQL task requiring a subtle distinction between eligibility criteria and output filters) but bleeds tokens and time on simpler work, averaging 2.8M input tokens per trial and a median task duration of 355 seconds. Perhaps most fascinating is MiniMax's claim that M2.7 "deeply participates in its own evolution" — the model was involved in updating its own memory and building training skills during development, autonomously running over 100 rounds of scaffold optimization. Whether that self-evolution process explains the exploration-heavy behavior remains an open question. The benchmark data also reveals that a hypothetical oracle selecting the best model per task would solve 67% of tasks — a 36% improvement over any single model — reinforcing that these models are complementary, not interchangeable.

**Key takeaways:**
- M2.7 scores 86.2% on PinchBench, a 3.7-point jump from M2.5, placing it alongside GPT-5.4 and GLM-5
- On Kilo Bench (89 autonomous tasks), it hits 47% — second place behind Qwen3.5-plus
- The model reads more context per step than any other tested model, consuming roughly 2.8M input tokens per trial
- Every model in the comparison uniquely solved tasks no other model could — they are complementary, not interchangeable
- An oracle picking the best model per task would achieve 67%, a 36% improvement over the best single model
- Pricing at $0.30/M input and $1.20/M output makes it far cheaper than frontier models with similar PinchBench scores
- 29 out of 89 tasks remain unsolved by any model — circuit synthesis, MIPS emulation, pixel-perfect rendering mark the current hard ceiling

**Why do I care:** As someone who lives in codebases day-to-day, the exploration-heavy behavior is the most interesting signal here. We have all worked with that one developer who reads the entire module before changing a line — sometimes they catch the subtle coupling nobody else sees, sometimes they burn a sprint on analysis paralysis. M2.7 is that developer in model form. If you are using AI agents for complex refactors or codebase-wide changes where understanding the full dependency graph matters, this model's thoroughness is a genuine advantage at a fraction of the cost of Opus 4.6 or GPT-5.4. But the complementarity data is the real takeaway — the era of picking one model and sticking with it is over. The smart move is routing different tasks to different models based on their behavioral profiles, which is exactly what multi-model platforms like Kilo are betting on.

**Link:** [MiniMax-M2.7 Is Now Available in Kilo. Here's How It Performs.](https://blog.kilo.ai/p/minimax-m27?publication_id=4363009&post_id=191412210&isFreemail=true&triedRedirect=true)
