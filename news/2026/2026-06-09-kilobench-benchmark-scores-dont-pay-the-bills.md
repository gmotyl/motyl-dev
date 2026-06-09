---
title: "KiloBench: Why Benchmark Scores Don't Tell You What You're Actually Paying For"
excerpt: "Kilo introduces KiloBench to measure what production engineers actually care about: cost per task, completion rate, and real-world performance inside a specific agent scaffold."
publishedAt: "2026-06-09"
slug: "kilobench-benchmark-scores-dont-pay-the-bills"
hashtags: "#kilo #ai #engineering #benchmarks #agents #generated #en"
source_pattern: "Kilo"
---

## KiloBench: Why Benchmark Scores Don't Tell You What You're Actually Paying For

**TLDR:** Standard AI coding benchmarks like SWE-bench are hitting saturation and contamination problems, making them unreliable for real procurement decisions. Kilo built KiloBench to measure cost per completed task and performance inside their actual agent scaffold. That's the number that matters when your bill arrives.

**Summary:**

There's a particular kind of absurdity that creeps into engineering decisions when you're deep in the eval process. You're comparing two models on a benchmark neither of them will ever see in your actual product, one scores three points higher, and you almost ship it, even though it costs eight times more per task when run through your real pipeline. The Kilo team caught themselves doing exactly this, and it's the origin story behind KiloBench.

SWE-bench Verified was the gold standard for measuring AI coding capability for a couple of years, and right now it's essentially broken as a differentiator. The top six models are separated by 1.3 percentage points. Claude Opus 4.5 is at 80.9%, Gemini 3.1 Pro at 80.6%, GPT-5.2 at 80.0%. When OpenAI ran a contamination audit, they found models could reproduce correct patches verbatim just from being handed a task ID, with 76% accuracy coming from memorization alone. OpenAI's response was to stop reporting SWE-bench Verified scores entirely, which tells you something pretty definitive about that leaderboard's current utility.

The contamination story is bad enough, but scaffold inflation compounds it. The agent orchestration layer, meaning how a system decomposes problems, which tools it invokes, how it handles failures, can swing raw benchmark scores by twelve or more points. When a vendor publishes a SWE-bench number, they're publishing the score for a specific model-plus-scaffold combination. Swap the scaffold, and the number changes. This makes cross-vendor comparisons largely meaningless for anyone building with a different orchestration approach.

Scale AI's SWE-bench Pro is a genuine improvement: harder multi-file tasks, multi-language, more resistant to gaming. The performance collapse from Verified to Pro is dramatic. GPT-5.3 Codex scores around 80% on Verified and drops to 56.8% on Pro. Claude Opus 4.5 comes in at 45.9% on the SEAL standardized leaderboard. That 35-point gap is the distance between "optimized for this specific benchmark" and actual generalized capability. Even so, Pro still doesn't tell you what a task costs in your harness.

KiloBench is built around the procurement question, not the research question. It measures task completion rate, cost per successful task, time to completion, and all of this inside Kilo's actual agent scaffolding. The insight driving the whole project comes from a point MorphLLM made back in March: a model scoring 80% at $2 per task might be a worse deal than one scoring 75% at $0.20. Model pricing in 2026 runs from about $0.10 per million tokens to over $15, but you're not paying per token in production. You're paying per completed task, which means you need to know how many tokens a model burns to get the job done. Three attempts at the cheap price can still undercut one clean run at the premium.

**Key takeaways:**

- SWE-bench Verified is saturated and contaminated, with the top models clustered within 1.3 percentage points and some capable of reproducing gold patches from task IDs alone
- Scaffold inflation means benchmark scores reflect a model-plus-orchestration combination, not raw model capability in isolation
- SWE-bench Pro shows a 35-point performance drop from Verified scores, revealing how much gaming was inflating the earlier numbers
- Production cost is a function of cost per completed task, not cost per token, which no major benchmark currently reports
- KiloBench measures completion rate, cost per task, and time to completion inside Kilo's actual agent scaffold

**Why do I care:**

As someone thinking about AI tooling at the architecture level, the insight here is not that benchmarks are flawed, which everyone has suspected for a while. The insight is that the specific flaw matters enormously. Scaffold inflation in particular means you cannot trust any published benchmark number unless you know it was run with scaffolding similar to yours. For teams evaluating models for production agent workloads, the only trustworthy evaluation is one you run yourself, inside your own pipeline, measuring cost per successful task over a representative sample of your actual work. KiloBench is Kilo doing that math for their specific scaffold and publishing it, which is the right move. Every serious agent platform should probably do the same.

**Link:** [KiloBench - Because Your Benchmark Score Doesn't Pay the Bill](https://blog.kilo.ai/p/kilobench-because-your-benchmark)
