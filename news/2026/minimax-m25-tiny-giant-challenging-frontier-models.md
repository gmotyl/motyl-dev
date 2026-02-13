---
title: "MiniMax M2.5 Drops Into the Arena: A Tiny Giant Challenging Frontier Models"
excerpt: "MiniMax releases M2.5, an open-weight model rivaling Claude Opus 4.6 and GPT-5.2 on coding benchmarks, with only 10B activated parameters and free access on Kilo Code for a week."
publishedAt: "2026-02-12"
slug: "minimax-m25-tiny-giant-challenging-frontier-models"
hashtags: "#ai #llm #minimax #openweight #codingagents #swebench #agentic #devtools #oss #generated #en"
---

## MiniMax M2.5 Is Here, and It Is Free in Kilo for a Week

**TLDR:** MiniMax has released M2.5, an open-weight model that scores 80.2% on SWE-Bench Verified -- putting it neck and neck with Claude Opus 4.6. It uses only 10B activated parameters, runs at 100 tokens per second, and Kilo Code is offering it free for a week.

**Summary:**

Alright, so here is something that caught my attention in a big way. MiniMax, the international AI lab, just dropped M2.5, and the numbers are frankly a little wild. We are talking about an open-weight model that hits 80.2% on SWE-Bench Verified, which is the human-validated benchmark where AI has to solve real production-level GitHub issues. To put a pin in that: Claude Opus 4.6 sits just below 80% in standard trials. Anthropic noted that with a specific prompt tweak you can push Opus to 81.42%, but out of the box, M2.5 is right there competing. That is remarkable for a model that is not behind a proprietary API wall.

Now here is where it gets really interesting from an architecture perspective. M2.5 only activates 10 billion parameters. Let that sink in for a moment. The frontier models we are used to comparing against -- Opus, GPT-5.2, Gemini 3 Pro -- they require massive compute clusters. M2.5 is the smallest Tier-1 model in existence, and yet it is outperforming Gemini 3 Pro on both SWE-Bench Pro (55.4% vs 43.3%) and Multi-SWE-Bench (51.3% vs 50.3%). The gap between open-weight and proprietary is not just narrowing, it is practically vanishing in certain domains.

The throughput story is compelling too. At 100 tokens per second, M2.5 is reportedly three times faster than Opus in early testing. And the pricing -- 30 cents per million input tokens, with a blended cost of 6 cents per million when you factor in caching -- makes it absurdly affordable for always-on agentic workflows. The "thinking efficiency" optimization they have done means the model was trained to plan before acting, which reduces wasted token generation.

Kilo Code, which is the platform announcing this, has been positioning itself as a developer tool that gives access to top-tier models without what they call the "frontier tax." They are making M2.5 completely free for all users for one week, no credits required. Previously they did something similar with M2.1 for their Slack integration, and apparently M2.1 was already their most popular open-weight model.

Now, let me push back on a few things the article glosses over. First, SWE-Bench Verified is one benchmark. It is a good one, but it is not the whole picture. The article does not mention anything about reasoning tasks, multilingual performance, or safety evaluations. Second, "10B activated parameters" strongly implies a mixture-of-experts architecture, but the article never actually explains how many total parameters the model has. That is a meaningful omission -- the storage and memory requirements for the full model could be significantly larger. Third, the comparison to Opus at "just below 80%" is a bit of a cherry-pick. Model performance varies across runs, and the article itself admits Opus can hit 81.42% with prompt tuning. The right framing is "competitive with" rather than "surpassing." Finally, the self-hosting angle is tantalizing but underexplored. What hardware do you actually need? What is the memory footprint? Those are the questions developers care about, and the article does not answer them.

**Key takeaways:**
- MiniMax M2.5 scores 80.2% on SWE-Bench Verified, competitive with Claude Opus 4.6 and ahead of Gemini 3 Pro
- Only 10B activated parameters make it the smallest Tier-1 model, potentially viable for self-hosting
- Throughput of 100 tokens per second is roughly 3x faster than Opus in early benchmarks
- Pricing at $0.30/M input tokens and $0.06/M blended makes it one of the cheapest frontier-class models
- Free for one week on Kilo Code with no credit requirement
- The open-weight vs proprietary distinction continues to blur for coding-specific tasks

**Tradeoffs:** The article presents M2.5 as an unambiguous win, but the real architectural tradeoff is specialization vs generality. A model optimized heavily for agentic coding workflows and SWE-Bench may not perform as well on creative writing, complex reasoning chains, or multimodal tasks. The 10B activated parameter count suggests a sparse mixture-of-experts approach, which trades inference efficiency for a larger total model footprint -- a meaningful consideration for anyone planning to self-host. Developers need to evaluate whether their use cases align with the benchmarks being highlighted.

**Link:** [MiniMax M2.5 is Here, and it's Free in Kilo for a Week](https://blog.kilo.ai/p/minimax-m25-is-here-and-its-free)