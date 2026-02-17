---
title: "Building AI Evals Datasets Through Error Analysis - Stop Guessing, Start Measuring"
excerpt: "A practical framework for building AI evaluation datasets from scratch using error analysis, binary labeling, and iterative LLM judges."
publishedAt: "2026-02-17"
slug: "building-ai-evals-datasets-error-analysis"
hashtags: "#substack #decodingai #ai #llm #ml #observability #testing #architecture #generated #en"
---

## No Evals Dataset? Here's How to Build One from Scratch

**TLDR:** Paul Iusztin lays out an iterative error analysis framework for building AI evaluation datasets: start with 20-50 real production traces, label them with binary pass/fail judgments and written critiques, fix the obvious stuff, build a generic LLM judge using your critiques as few-shot examples, then cluster and prioritize failures to decide where specialized evaluators are actually worth the investment. The secret weapon is your labeled data, not your prompts.

**Summary:**

This is part two of a seven-part series on AI Evals and Observability from Decoding AI Magazine, and it tackles what I think is the single most neglected step in the entire AI product lifecycle: actually looking at your outputs before building elaborate evaluation infrastructure. The premise is simple and almost embarrassingly practical. Pull 20 to 50 real traces from your production system, sit down with a domain expert, and label each one as Pass or Fail. Not a Likert scale. Not letter grades. Binary. The argument, and I find it compelling, is that a score of 3.2 out of 5 gives you nothing actionable, while a clear Fail with a written critique telling you exactly what went wrong gives you something you can fix by lunchtime.

The framework works as a flywheel. You create your initial dataset from production traces, have a domain expert label them with binary judgments and detailed critiques, fix the obvious problems you discover during labeling, then build an automated evaluator using those same critiques as few-shot examples. The article makes a counterintuitive but important point here: the real power of your LLM judge does not come from elaborate system prompts. It comes from the few-shot examples you feed it, which encode your domain expert's actual reasoning about what "good" and "bad" look like for your specific use case. Your labeled dataset is the secret weapon, not prompt engineering wizardry.

Where this gets genuinely useful for teams is the error analysis phase. Once your automated evaluator is running against new traces, you cluster the failures into categories using open coding, essentially writing quick informal notes about what went wrong with each failed trace and then grouping those notes into higher-level patterns. Then you rank those clusters on a two-by-two matrix of frequency versus severity, weighted by business value. A hallucinated pricing error that happens five percent of the time but carries critical business impact outranks a formatting annoyance that shows up in thirty percent of outputs. This is the kind of prioritization thinking that separates teams who ship improvements from teams who drown in metrics dashboards.

The article also draws a clear line on when to create specialized evaluators versus sticking with your generic one. The answer is: only when error analysis shows a persistent, high-impact failure category that your generic evaluator cannot reliably detect. Do not build evaluators speculatively. Do not create one for every possible failure mode you can imagine. Let the data demand it. Pick four to seven high-value failure modes that keep showing up despite prompt fixes, and scope each specialized evaluator tightly to exactly one failure mode. This keeps them simple, debuggable, and accurate.

For architects and engineering leads thinking about how to apply this: the initial investment is about three to four days for the first round of error analysis. After that, the article suggests thirty minutes per week is enough to review the latest failures, fix the easiest high-impact issues, and add or refine evaluators only for stubborn problems. That is a remarkably low ongoing cost for what amounts to a systematic quality improvement process. The key architectural decision is instrumenting your system to log everything, including inputs, outputs, system prompts, tool calls, retrieved documents, and metadata, so that your traces are actually useful for evaluation. If you are not logging trace spans today, that is where I would start before worrying about any of the evaluation machinery.

One thing I want to push back on, though. The article leans heavily on the assumption that you have a single domain expert whose judgment becomes ground truth. In practice, many teams struggle with exactly this step. What happens when your domain expert disagrees with themselves on Monday versus Friday? What about inter-rater reliability when you inevitably need more than one person labeling? The article acknowledges "the less, the better" for consistency, but I think it underestimates the organizational challenge of designating and empowering that person. Also notably absent is any discussion of how this framework adapts when your application has multiple distinct user populations with genuinely different definitions of "good." The email assistant example is clean and well-scoped, but real products tend to be messier. The article also mentions AlignEval by Eugene Yan as an open-source tool that embodies this workflow, which is worth checking out if you want a concrete starting point rather than building everything from scratch.

**Key takeaways:**
- Start with 20-50 real production traces, not synthetic data or imagined scenarios. Manual review of actual outputs is the single highest-leverage activity you can do.
- Use binary Pass/Fail labels with written critiques, never numeric scales. Binary decisions force clarity about what "good enough" actually means, and the critiques become your most valuable asset as few-shot examples.
- Fix obvious problems before building evaluators. If labeling reveals a missing prompt instruction or a broken tool call, just fix it now. Evaluators are for problems that resist simple fixes.
- Your labeled dataset is the secret weapon for LLM judges, not elaborate prompts. Few-shot examples drawn from expert critiques steer the judge far more effectively than prompt engineering.
- Cluster failures by category, then prioritize using frequency times severity times business value. Not all errors are equally worth fixing.
- Only create specialized evaluators when error analysis shows persistent high-impact failures that your generic evaluator cannot catch. Do not build speculatively.
- Use code-based evaluators for objective checks like format validation or tool call verification, and reserve LLM judges for subjective assessments like tone and helpfulness.
- The ongoing cost after initial setup is roughly thirty minutes per week, making this framework sustainable for production teams.

**Tradeoffs:**
- Binary Pass/Fail labeling gains clarity and actionability but sacrifices granularity, meaning you lose the ability to distinguish between "barely acceptable" and "excellent" outputs.
- Relying on a single domain expert as ground truth gains consistency but sacrifices diverse perspectives and creates a single point of failure in your evaluation pipeline.
- Starting with a generic evaluator before specialized ones gains speed and simplicity but sacrifices precision on category-specific failure modes until you invest in targeted judges.
- Few-shot examples over elaborate prompts gain alignment with real expert judgment but sacrifice generalizability, meaning your evaluator becomes tightly coupled to your specific labeled examples.

**Link:** [No Evals Dataset? Here's How to Build One from Scratch](https://www.decodingai.com/p/build-an-ai-evals-dataset-with-error-analysis)