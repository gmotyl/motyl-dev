---
title: "The Eval Playbook: How Anthropic Tests AI Agents Before They Reach You"
excerpt: "Anthropic's engineering team published a field-tested guide to evaluating AI agents in production, covering grader types, non-determinism metrics, task design, and the full eval lifecycle."
publishedAt: "2026-04-12"
slug: "demystifying-evals-ai-agents-anthropic"
hashtags: "#ai #agents #testing #llm #engineering #architecture #generated #EN"
source_pattern: "url-to-news"
---

## The Eval Playbook: How Anthropic Tests AI Agents Before They Reach You

**TLDR:** Anthropic's engineering team shares a comprehensive, field-tested methodology for evaluating AI agents, covering grader design, task collection, handling non-determinism with pass@k and pass^k metrics, and why teams that skip evals eventually pay for it in production.

**Summary:**

The core problem with evaluating AI agents is not a tooling problem. It is a definition problem. An evaluation is a test: give an AI an input, apply grading logic to the output, measure success. Simple enough for a single-turn prompt. Much harder when the agent runs for 20 tool calls across multiple turns, modifies environment state, and finds creative solutions that your graders were never designed to score. Anthropic's guide, written by Mikaela Grace, Jeremy Hadfield, Rodrigo Olivares, and Jiri De Jonghe, tackles this directly and with enough detail to be actionable.

The terminology section alone is worth reading carefully. Most teams conflate "task," "trial," "transcript," and "outcome" in ways that make debugging evaluation results nearly impossible. In Anthropic's framework: a task is the test case with defined inputs and success criteria; a trial is a single attempt at that task (because you should run multiple due to non-determinism); a transcript is the full record of a trial including every tool call and intermediate result; and an outcome is the final state of the environment, not what the agent said. The distinction between transcript and outcome matters more than it sounds. An agent that says "your flight has been booked" while no reservation exists in the SQL database has failed the outcome even if the transcript reads perfectly.

Three grader types cover most evaluation needs. Code-based graders are fast, cheap, and objective. They handle string matching, binary pass/fail tests, static analysis, and tool call verification. Their weakness is brittleness: an agent that produces a correct but differently-formatted answer fails a regex check even when it should not. Model-based graders handle what code cannot: rubric scoring, natural language assertions, pairwise comparisons. They capture nuance but are non-deterministic, more expensive, and need to be calibrated against human judgment before you can trust them. Human graders are the gold standard and the bottleneck. The recommendation is to use deterministic graders wherever possible, LLM graders where you need flexibility, and humans to calibrate the LLM graders.

The pass@k and pass^k metrics are how you account for non-determinism honestly. Pass@k asks: in k attempts, did the agent succeed at least once? As k increases, this score rises. Pass^k asks: did the agent succeed on all k attempts? As k increases, this score falls. At k=1, they are identical. By k=10, they tell completely different stories. Which one matters depends on your product. If one success out of ten is acceptable, like suggesting code that a developer evaluates, optimize for pass@k. If every single interaction needs to work reliably, like a customer service agent that processes refunds, optimize for pass^k. Most teams do not make this distinction explicitly, which means they are probably optimizing for the wrong metric without realizing it.

The most uncomfortably honest section is about what happens when evaluation scores do not reflect actual capability. Opus 4.5 initially scored 42% on CORE-Bench, a reasonable-looking result. A researcher dug into the transcripts and found the eval was broken: graders rejected "96.12" when the expected value was "96.124991", task specs were ambiguous, and stochastic tasks could not be reproduced. After fixing the eval, Opus 4.5 scored 95%. The benchmark was not measuring the model; it was measuring the evaluation's own defects. METR ran into the same issue: their time horizon benchmark had graders that required exceeding a threshold the task spec said to optimize to, penalizing models that actually followed the instructions. The section on reading transcripts is not a soft suggestion. It is the only way to find these failures before they cause you to draw the wrong conclusions about your agent.

**Key takeaways:**

- Distinguish transcript (what the agent said and did) from outcome (actual environment state); an agent claiming success is not the same as success
- Use pass@k when one correct solution is enough, pass^k when reliability every single time is required
- Start with 20 to 50 tasks from real failures, not hundreds of synthetic cases; effect sizes are large early on
- Read the transcripts: most grading bugs, ambiguous specs, and capability misreadings are only visible there
- Eval saturation at 100% pass rate means the suite is no longer useful for improvement, only regression detection

**Why do I care:** This article changed how I think about a failure mode I have seen repeatedly on AI product teams: high eval scores on a benchmark that was quietly measuring something different from what the product actually needs. The pass@k versus pass^k distinction alone is worth sharing widely. I have seen production agents with impressive "pass rates" that were measuring whether the agent ever got the right answer in five tries, while the product actually needed it right on the first try every time. That is not a model quality issue. That is a metrics definition issue. The section on eval-driven development, where you write evals for capabilities before the agent can fulfill them as a bet on near-future model capability, is a genuinely interesting inversion of test-driven development. It turns model upgrades from a manual testing scramble into a suite run, which is exactly the kind of leverage small teams need.

**Link:** [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
