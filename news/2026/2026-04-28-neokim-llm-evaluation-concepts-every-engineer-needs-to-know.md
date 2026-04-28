---
title: "29 LLM Evaluation Concepts Every Engineer Needs to Know"
excerpt: "A practical vocabulary and layered playbook for evaluating LLM applications, from rubrics and golden sets to RAG triads and judge calibration."
publishedAt: "2026-04-28"
slug: "neokim-llm-evaluation-concepts-every-engineer-needs-to-know"
hashtags: ["#NeoKim", "#LLM", "#evaluation", "#AI", "#engineering", "#RAG", "#prompts", "#testing", "#generated", "#en"]
source_pattern: "NeoKim"
---

## 29 LLM Evaluation Concepts Every Engineer Needs to Know

**TLDR:** Shipping an LLM feature without a real evaluation system is shipping vibes. This piece gives you the vocabulary, the failure modes, and a layered approach to measuring quality that actually scales beyond a few manual tests.

**Summary:**

The article opens with a moment every LLM engineer recognizes. You ship something. It passes manual checks. A user posts a screenshot of it hallucinating. You tweak the prompt, run it again, and it works fine. Did you fix it, or did you get lucky? The author reframes the question: this is not a debugging problem, it is a measurement problem, and measurement has a name. Evaluation. Most existing engineering instincts were built for deterministic systems where a passing test is a verdict. With LLMs a passing test is a single sample from a probability distribution, which is barely a data point.

To talk about quality you need vocabulary. The author walks through criteria, quality dimensions, rubrics, test cases, golden sets, pass thresholds, eval coverage, temperature and top-p, and the importance of variance across runs. Criteria are a product decision, not a technical one. A customer support bot cares about empathy and de-escalation, a code generator cares about syntactic validity and project conventions, and the same evaluation framework cannot serve both without different rubrics. Rubrics turn vague criteria like helpfulness into scorable checklists, and the golden set is the curated collection of representative inputs you measure everything against. Build it from anonymized production traffic, not from your imagination, because users phrase things in ways you did not anticipate.

Scoring itself comes from three sources. Human review is the gold standard but does not scale, so you use it strategically to validate the golden set, calibrate the automated layers, and debug surprises. Heuristic checks are fast and cheap and great at structural validation, things like JSON validity or banned phrases, but they cannot judge whether an answer is helpful. LLM-as-judge is the workhorse for scale, with pointwise scoring and pairwise comparisons each having different cost and reliability tradeoffs. The author drives home that any judge needs calibration against humans, periodically rechecked, otherwise you have confident hallucinated quality scores layered on top of confident hallucinated answers.

The RAG triad gets its own treatment. Faithfulness asks whether the answer was actually grounded in retrieved context. Answer relevance asks whether the response matched user intent. Context precision asks whether retrieval fetched the right documents in the first place. Each stage fails in distinct ways, and treating RAG as a single black box hides which one is broken. The article ends with the most important structural insight, which is that production-grade evaluation is layered. Heuristics, semantic similarity and task metrics, offline LLM-as-judge with your best model, online LLM-as-judge with a cheaper model, and periodic human spot checks. Each layer catches what the previous one missed, and you build them up over time rather than all at once.

The recommended MVP is humble and useful. Fifty examples in your golden set, one deterministic heuristic for the most important structural requirement, and one LLM judge prompt scoring a single quality dimension. Read the explanations carefully, because they will surprise you, and that is the point.

**Key takeaways:**
- LLM outputs are samples from a distribution, so a single passing test proves almost nothing. Run many samples and report variance, not just the mean.
- Criteria, rubric, golden set, threshold. If any of these is missing, you do not have an eval system, you have opinions.
- Set temperature to 0 during evals to lock in determinism, but recognize you are testing a different system than what runs in production at higher temperature.
- The RAG triad of faithfulness, answer relevance, and context precision separates retrieval failures from generation failures, which is where most teams misdiagnose.
- LLM judges are approximations of human judgment and need calibration. Recheck calibration whenever you swap models or rewrite the judge prompt.
- A 92% pass rate hides the 8% catastrophic failures. Tail review beats average review for safety-sensitive systems.
- Online and offline evals are not redundant. Offline catches known regressions before deploy, online catches the inputs you never imagined.

**Why do I care:**

I have watched enough teams ship "AI features" on the strength of a demo and a vibe to know this article is not academic. The hard part is not bolting an LLM call into your app, it is the slow grind of figuring out what good actually looks like and building the harness to measure it. I think the framing of evaluation as a measurement problem rather than a debugging problem is the single most useful mental shift here. If you treat it as debugging you keep poking at prompts forever. If you treat it as measurement you build the infrastructure once and iterate against signal instead of folklore.

What I particularly like is the layered approach, because it matches how mature software organizations already think about quality. We have linters, unit tests, integration tests, staging environments, and production monitoring for a reason, and the LLM equivalent is heuristics, semantic checks, offline judges, online judges, and human spot checks. Anyone who has built a CI pipeline can map this onto their existing mental model in about ten minutes. The MVP recipe at the end is genuinely actionable, and I would push any team starting their first LLM feature to do exactly that before they ship anything customer-facing.

The bit about Goodhart's Law deserves a full minute of reflection. Reward confidence and you get confident hallucinations. Reward length and you get verbose nonsense. This is the trap I see senior engineers fall into when they get excited about a single eval metric, and it is exactly why the layered approach matters. No single number is your quality, your quality is the system that catches the failures each layer was designed for. Worth the read, worth bookmarking, and worth handing to anyone on your team who still thinks "I tried it a few times and it looked good" is a testing strategy.

**Link:** [29 LLM Evaluation Concepts Every Engineer Needs to Know](https://newsletter.systemdesign.one/p/llm-evals?publication_id=1511845&post_id=192885623&isFreemail=true&triedRedirect=true)
