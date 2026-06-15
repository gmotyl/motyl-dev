---
title: "Claude Fable 5 vs GPT-5.5: Plan with the best, execute with the rest"
excerpt: "A two-phase benchmark separating planning from implementation reveals that model choice matters most at planning time, not execution."
publishedAt: "2026-06-13"
slug: "claude-fable-5-vs-gpt-5-5-planning-execution"
hashtags: "#kilo #ai #llm #agentic #claudefable5 #gpt5 #devtools #generated #en"
source_pattern: "Kilo"
---

## Claude Fable 5 vs GPT-5.5: Better Planning, Similar Execution

**TLDR:** The Kilo team separated AI coding into two distinct phases — planning and implementation — and found that Claude Fable 5 writes sharper plans while GPT-5.5 executes equally well at 2.6x lower cost. Running the mixed pipeline (Fable 5 plans, GPT-5.5 implements) delivered identical results for 59% less spend.

**Summary:**

Most model comparisons run end-to-end, which is a trap. If you get a bad result, you cannot tell whether the plan was bad or the implementation was bad. The Kilo team decided to actually isolate the two phases, and that methodological discipline is what makes this writeup worth reading.

They picked a feature flag service as the test task — not because it is glamorous, but because it has a correctness trap buried inside it. Percentage rollouts have to be sticky (the same user always lands in the same bucket) and raising the rollout percentage from 20% to 40% must keep the original 20% in. A model that hand-waves this with "use a hash" without specifying which inputs go into the hash is leaving a time bomb for the implementer. Both Fable 5 and GPT-5.5 got the algorithm right, but the gap came from everything around it.

Claude Fable 5 won the planning round with a score of 9.1 versus GPT-5.5's 8.3, and the wins were specific. Fable 5 caught negative-space failure modes that GPT-5.5 never mentioned, like the need to cache lookups for flags that do not exist and the subtle follow-up that creating a flag later must clear that stale miss. GPT-5.5 wrote a plan three times longer (1,456 lines versus 431) but hedged at several decision points, leaving choices like error behavior open for the developer to settle. The shorter plan won because a plan's job is to remove decisions from implementation, not document every possibility. Fable 5 picked a position, argued it, and flagged it for review. GPT-5.5 reached for convention.

The implementation round is where things get interesting. Both models received Fable 5's winning plan in a fresh session with no additional context, and both passed all 15 acceptance checks. The two services were functionally interchangeable down to which individual users ended up in a 35% rollout across 100 test IDs. GPT-5.5 even implemented the hash exactly as the plan specified, including the decision to leave the environment out of the hash input, even though GPT-5.5's own planning run had gone the other way. The plan overrode the model's instinct, which is exactly what a good plan should do.

The cost math is blunt. Using Fable 5 for both phases cost $16.66. Using the mixed pipeline cost $6.79. Over 20 comparable tasks a week, the single-model approach runs roughly $10,800 more per year for results you cannot distinguish in testing. The extra Fable 5 tokens in the execution phase bought more test scenarios and some unsolicited hardening, but not correctness.

**Key takeaways:**
- Separating planning from execution is a better evaluation methodology than end-to-end benchmarks
- Claude Fable 5 plans with sharper judgment: fewer hedges, more explicit decisions, catches subtler failure modes
- GPT-5.5 executes a well-specified plan at equivalent quality for 2.6x lower cost
- The mixed pipeline (Fable 5 plans, GPT-5.5 implements) cost 59% less with identical acceptance test results
- Plan quality matters more than execution model quality once every design decision is resolved
- Note: Fable 5 has since been disabled following a US government directive, which makes these execution-equivalence findings more practically relevant

**Why do I care:**

If you are running any kind of agentic coding workflow, the takeaway here is not "use GPT-5.5 for everything." It is that the plan is the most leveraged artifact in the pipeline, and it is also the cheapest place to spend on quality. A bad plan that leaves decisions open will diverge implementations; a good one constrains both models to identical outputs. The architectural lesson is the same one we have known from software engineering for decades: get the design right, and the implementation becomes less differentiating. These models are just making that dynamic very visible in dollar terms.

**Link:** [Claude Fable 5 vs GPT-5.5: better planning, similar execution](https://blog.kilo.ai/p/claude-fable-5-vs-gpt-5-5?publication_id=4363009&post_id=201748362&isFreemail=true&triedRedirect=true)
