---
title: "We Planted 15 Bugs and Let Five AI Models Hunt Them: Here Is What Happened"
excerpt: "A structured benchmark pitting Grok, Claude Opus 4.8, GPT-5.5, Gemini 3.1 Pro, and Claude Sonnet 4.6 against a deliberately buggy React/TypeScript app reveals that no single model is sufficient for code review."
publishedAt: "2026-06-01"
slug: "ai-code-review-benchmark-grok-opus-sonnet-gpt-gemini"
hashtags: "#kilo #ai #agents #code-review #benchmarks #llm #react #typescript #generated #en"
source_pattern: "Kilo"
---

## We Planted 15 Bugs and Let Five AI Models Hunt Them: Here Is What Happened

**TLDR:** Kilo built a complete React/TypeScript budget app with 15 deliberately planted bugs, then ran the same cold review prompt against Grok, Claude Opus 4.8, GPT-5.5, Gemini 3.1 Pro, and Claude Sonnet 4.6. Opus found the most at 10 of 15, Grok tied Sonnet at 9 and costs a tenth of Opus, Gemini disappointed badly at 2 of 15, and four bugs survived every model.

**Summary:**

This is exactly the kind of benchmark I want to see more of in the AI tooling space. No synthetic coding challenges, no cherry-picked demos, no vibes-based claims. Kilo built "Budget Harbor", a full client-side household budget planner in React, TypeScript, and Vite, shipped it with a passing test suite to make it look finished, and then planted 15 bugs ranging from a one-line useEffect mistake to a forecast function that quietly double-counts recurring transactions. They then ran identical cold prompts, no prior context, no hints, against five production models.

The headline result is Opus 4.8 at 10 of 15, which makes it the clear winner on raw recall. More interesting is what made Opus distinctive: it was the only model that checked the test math by hand rather than trusting the test output. That is a meaningful qualitative signal. Tests do not catch all bugs; a model that reads tests and then verifies the underlying logic independently is doing something closer to what a thorough human reviewer would do.

The genuine surprise is Grok. It tied Claude Sonnet 4.6 at 9 of 15 and did it while giving the clearest analysis of the hardest bug in the set, a cross-file state mutation that corrupts balance calculations. Getting the hardest bug right while missing some easier ones is an interesting failure profile. It suggests Grok has unusual depth on reasoning about mutable state across module boundaries, which is exactly the kind of bug that propagates silently in production. And it does this at roughly one tenth the per-token cost of Opus.

Gemini 3.1 Pro's performance is hard to explain charitably. Finding only 2 of 15 bugs, including missing a feature-inverting bug that every other model caught, points to something more fundamental than random sampling variance. The practical conclusion is that Gemini 3.1 Pro should not be your code review tool of choice right now, at least not for catching logic errors in typed JavaScript.

The four bugs that survived all five models are worth dwelling on. A forecast that double-counts recurring transactions, credit card debt treated as spendable cash, a localStorage call that throws in SSR/test environments, and an APR calculation using percent instead of decimal. What these have in common is that they require synthesizing business domain knowledge with technical correctness simultaneously. The APR bug in particular is invisible if you do not know that APR is expressed as a percentage and needs to be divided by 100 before use in a compound interest formula. No amount of static analysis catches that without the domain context.

**Key takeaways:**

- Opus 4.8 finds the most bugs (10/15) and is the only model that independently verifies test logic rather than trusting test results
- Grok matches Sonnet 4.6 at 9/15 at approximately one tenth the cost, with unusual strength on cross-file state mutation bugs
- Gemini 3.1 Pro is a notable underperformer at 2/15, including missing a feature-inverting bug every other model found
- Four bugs survived all five models, all requiring simultaneous domain knowledge and technical correctness to detect
- Running Grok and Sonnet together catches 11 of 15 bugs with complementary blind spots, making the combination better than either alone for most use cases

**Why do I care:** This benchmark matters because it confirms something I have suspected for a while: different models have genuinely different blind spots, not just different performance levels on a shared scale. Grok being unusually good at cross-file state mutation while missing date and timezone bugs, Sonnet catching all three date/timezone issues, these are not random noise. They reflect different training emphases and different reasoning strategies. The practical implication for anyone doing serious frontend work is that model diversity in your review pipeline is not a nice-to-have, it is a correctness multiplier. Running a single model and treating its output as comprehensive review is wishful thinking. The bugs that survived all five models are also a useful reminder that AI code review is a supplement to, not a replacement for, good type design, defensive testing strategy, and domain expertise sitting next to the code.

**Link:** [We Tested Grok, Opus, Sonnet, GPT, and Gemini in Kilo Code Reviewer](https://blog.kilo.ai/p/review-testing)
