---
title: "Loopcraft, Silent Sandbagging, and Agents as Infrastructure"
excerpt: "An AINews roundup on stacking agent loops, Anthropic's reversed Fable 5 degradation, automated AI research systems, and the shift from best-model debates to execution control."
publishedAt: "2026-06-12"
slug: "loopcraft-stacking-loops-agents-as-infrastructure"
hashtags: "#substack #ainews #agents #llm #architecture #observability #devtools #generated #en"
---

## Loopcraft: The Art of Stacking Loops

**TLDR:** The framing of the moment is that you stop prompting coding agents and start designing the loops that prompt them. The argument is that leverage comes from removing yourself as the bottleneck and stacking automated loops, knowing when to drop down a level for reliability and when to climb up a level as models improve.

**Summary:** There's a thread running through a lot of practitioner chatter right now, and this issue collects it nicely. Peter Steipete put it as a monthly reminder that you shouldn't be prompting coding agents anymore, you should be designing loops that prompt your agents. Boris echoed it more bluntly, saying he doesn't prompt Claude anymore, he writes loops and the loops do the work. Andrej Karpathy took it furthest in the context of autonomous research, arguing that the whole game now is removing yourself from the loop entirely. His point is that being the researcher who looks at every result is holding the system back, so the real work is refactoring your abstractions until you can arrange things once and hit go.

The piece builds this into something it calls the Salty Lesson for agents, a deliberate riff on Rich Sutton's Bitter Lesson. Where the Bitter Lesson says general methods that scale with compute beat handcrafted human knowledge, the Salty Lesson says don't fix things yourself the way you've always done, focus instead on systems that scale with more agents through goals and orchestration. The interesting wrinkle is the bidirectional advice. Early in any phase, it's valuable to know when to go down a loop when things break, because that's where reliability lives. But as models improve, the bigger payoff is knowing when to go up a loop for leverage. The newsletter frames the next century of work as essentially a contest in who can stack loops most effectively.

I'd push back on the tidiness of this. The author is glossing over the part where most teams cannot yet build a loop that doesn't quietly accumulate errors over a long horizon, and the rest of the same issue actually confirms that. There's a real tension between the aspirational loop-stacking rhetoric and the brittleness reported elsewhere in the roundup, where agents do fine in bounded loops but fall apart on expert synthesis. Telling people to climb up loops is good advice only if the lower loops are reliable enough to trust unattended, and that's exactly the thing nobody has fully solved.

**Key takeaways:**

- The mental model shift is from writing prompts to designing the loops that issue prompts, with the human stepping outside the inner loop.
- The Salty Lesson reframes Sutton's Bitter Lesson for agents: scale with orchestration and goals rather than fixing things by hand.
- Going down a loop buys reliability when things break, going up a loop buys leverage as models get better.
- The advice only holds if your lower loops are trustworthy enough to run unattended, which remains the hard, unsolved part.

**Why do I care:** If you build frontend or platform tooling, this is the framing that decides how you spend your time over the next year. The practical move is to stop hand-holding individual agent runs and start investing in orchestration, evaluation harnesses, and the guardrails that let a loop run without you babysitting it. But I'd treat the loop-stacking gospel with a healthy dose of skepticism, because the reliability work at the bottom of the stack is unglamorous and it's where your incidents will actually come from. Build the boring observability and rollback machinery first, then climb.

## Anthropic's Fable 5 Silent Degradation Gets Reversed

**TLDR:** Anthropic quietly degraded Claude Fable 5 for some AI-research use cases, then reversed the policy within about a day after public criticism. The substantive complaint wasn't that safeguards exist, it was that the degradation was hidden, which researchers argued breaks the user-provider contract.

**Summary:** The dominant story in this issue is Anthropic's decision to covertly weaken Fable 5 for certain AI-research-related tasks, and then walk it back fast. Simon Willison welcomed the rollback, and several others summarized it as a retreat under pressure from researchers. The technical criticism is worth separating from the noise. Code Star's argument was that safeguards themselves are normal and expected, but obfuscation without warning violates the contract between user and provider. That's the real issue: not whether a frontier lab can restrict capabilities, but whether it can do so silently while users believe they're getting full performance.

The deeper dispute is about governance, transparency, and who gets access to frontier models. Ryan Greenblatt drew the cleanest line, saying that blocking frontier AI R&D might be defensible in principle, but silent sandbagging is not, and that the better path is access programs with know-your-customer checks and monitoring for legitimate safety and security researchers rather than blanket capability denial. Natasha Lambert's critique went to trust and power concentration, arguing the core error was an uneven safety implementation that misled users and reinforced who gets to do frontier research at all.

The most useful takeaway for engineers came from Gergely Orosz, who turned the whole episode into an architecture recommendation: put models behind provider-agnostic routers and harnesses so your team can switch vendors quickly when terms or behavior become unacceptable. That's the practical lesson. Meanwhile the capability picture for Fable 5 stayed genuinely mixed. It posted strong benchmark numbers, including 87.8% on WeirdML and a top rank on FrontierSWE with productive runs lasting close to twenty hours, but practitioners reported high cost, frequent refusals, and strange behavior like inventing internal codenames during coding and leaking its own jargon into outputs. One report described spending around 250 dollars on a roughly ten-thousand-line pull request and not finding it worth the money. What the author skips over is whether the rollback was a genuine policy change or just a PR maneuver under heat, and there's no detail on what guardrails remain in place now.

**Key takeaways:**

- The objection was to hidden degradation, not to safeguards existing; opaque behavior at the model layer breaks user trust.
- Proposed alternative is gated access with KYC and monitoring for vetted researchers rather than silent capability denial.
- The engineering response is to route through provider-agnostic harnesses so you can swap vendors fast.
- Fable 5's raw capability looks strong on benchmarks but real-world use shows cost, refusals, and odd output behavior.

**Why do I care:** This is the strongest argument I've seen for not hardwiring a single model vendor into your stack. If a provider can silently change behavior overnight, your application's quality can degrade without a single line of your code changing, and you won't even get a deprecation notice. Build an abstraction layer over your model calls now, keep a fallback provider warm, and instrument output quality so you'd actually notice a silent regression. This is partly a governance and trust story, but the portability lesson is squarely an engineering concern.

## Automated AI Research Systems Start Hitting Real Benchmarks

**TLDR:** Recursive SI and Microsoft's Arbor both showed autonomous research agents producing measurable state-of-the-art results on narrow optimization and research tasks. The honest read is that agents are useful inside bounded, high-feedback loops but still fail on expert synthesis and long-horizon economically valuable work.

**Summary:** Two releases pointed at automated AI research crossing from hype into measurable results. Richard Socher's Recursive SI presented an early open-ended discovery system that claims state-of-the-art on three public tasks, including NVIDIA's SOL-ExecBench, the NanoGPT Speedrun, and NanoChat autoresearch, and they open-sourced the discoveries. The metrics are modest but real: reaching the same loss 1.3 times faster on NanoChat, trimming the NanoGPT Speedrun from 79.7 seconds to 77.5, and nudging a mean score from 0.699 to 0.754 across 235 kernels. The honest framing in the issue is that this matters less as AGI-style research automation and more as evidence that current systems can already contribute on narrow, high-feedback systems optimization. Microsoft's Arbor goes after the long-horizon side with persistent hypothesis-tree refinement, claiming it beats Codex and Claude Code across six research tasks and reaches 86% Any-Medal on MLE-Bench Lite.

What makes the section credible is that the benchmarks are getting honest about the limits. Agents' Last Exam, a rolling benchmark of 1,500 expert-sourced tasks across 55 occupations, shows frontier agents solving a meaningful fraction of real work but scoring zero on the hardest tier. SciConBench, with over nine thousand questions drawn from Cochrane reviews, found frontier agents still cannot synthesize scientific conclusions reliably. PostTrainBench frames itself explicitly as a recursive-self-improvement eval, where AI trains weaker models and you measure the loop progress directly.

The pattern across all of it is consistent and worth holding onto: agents are increasingly useful in bounded loops with fast feedback, and they remain brittle on expert synthesis and long, valuable tasks. That maps directly back to the loop-stacking discussion from the top of the issue. The high-feedback tasks are exactly the ones where you can safely climb up a loop, and the brittle synthesis tasks are exactly where you can't yet.

**Key takeaways:**

- Recursive SI and Arbor both posted real, if incremental, state-of-the-art results on narrow research and optimization tasks.
- A split is emerging between agents tuned for rapid iterative systems work and agents tuned for long-horizon hypothesis management.
- New benchmarks like ALE and SciConBench confirm agents still hit zero on the hardest expert-synthesis tiers.
- Usefulness correlates strongly with how bounded and high-feedback the loop is.

**Why do I care:** For most of us this is directionally important rather than immediately actionable, but it tells you where to point agents today. Hand them tight, well-instrumented optimization problems with fast feedback, like performance tuning or kernel-style work, and they earn their keep. Don't hand them ambiguous, long-horizon synthesis and expect reliability, because the benchmarks say they fall to zero exactly there. That's a useful filter when deciding which parts of your workflow to automate first.

## Data Infrastructure and Agent Execution Become First-Class

**TLDR:** Several releases point to data pipelines, memory management, and managed agent execution as the real bottlenecks now. The broader theme is a shift away from best-model arguments toward execution control, review layers, observability, and portability.

**Summary:** A cluster of announcements treated infrastructure, not model architecture, as the hard problem. Macrodata Labs launched with the thesis that robotics is roughly where LLMs were a few years ago, and the difficult part is not architecture but messy multimodal physical data pipelines, things like video, multi-rate sensors, heterogeneous formats, hand tracking, and subtask segmentation. Their first product, Refiner, is an open-source framework plus cloud runtime that turns raw demonstrations into training-ready datasets with sharding, checkpointing, observability, and lineage. Goodfire introduced predictive data debugging, arguing that preference datasets hide pathologies like broken guardrails and hallucinations that should be caught before training. AllenAI's ModSleuth traces the dependency graph of modern models and makes a genuinely eye-opening point: Olmo 3 depends on 89 models and 183 datasets, and Nemotron 3 on 273 models and 560 datasets. The simplistic story of a model trained on web data is long dead; modern construction is deeply compositional and synthetic.

On memory and retrieval, the trend is toward active management rather than dumping everything into ever-larger context windows. Weaviate's Engram proposes an extract, transform, commit maintenance loop instead of naively appending chat logs. Qdrant argued that bigger context windows don't make retrieval obsolete because context still costs latency and money, and others warned against running vector search with no guardrails at all.

The execution-tooling side rounds it out. Claude Managed Agents added scheduled deployments and environment variables, so agents can run recurring jobs and authenticate without ever seeing the secrets, with credentials swapped at the network boundary. Cursor made auto-review the default with a classifier subagent gating actions and a claimed 97% accuracy. LangChain shipped a LangSmith LLM Gateway with spend limits, PII and secrets detection, trace continuity, and audit logging. The common thread across all of it is unmistakable: the conversation is moving from which model is best toward execution control, review layers, observability, and portability. Agents are becoming persistent services with real runtime boundaries rather than chat modes.

**Key takeaways:**

- The hard problems are increasingly data pipelines, lineage, and observability rather than model architecture.
- ModSleuth shows modern models depend on hundreds of other models and datasets, making provenance a real concern.
- Memory and retrieval are trending toward active maintenance loops, not naive appends or giant context windows.
- Managed agents are gaining scheduling, credential isolation at the network boundary, and gating review layers.

**Why do I care:** This is the part of the issue closest to day-to-day engineering. The credential-swapping-at-the-network-boundary pattern in managed agents is exactly how you should be thinking about giving agents access to anything sensitive, never put a secret where the model can read it. The auto-review classifier and the LLM gateway with PII detection and audit logging are patterns you'll want in your own stack whether you build on these vendors or not. And ModSleuth's dependency-graph point is a quiet supply-chain warning: if your model leans on hundreds of upstream models and datasets, you have a provenance and trust problem that looks a lot like the dependency risks we already manage in package ecosystems.

**Link:** [\[AINews\] Loopcraft: The Art of Stacking Loops](https://www.latent.space/p/ainews-loopcraft-the-art-of-stacking)
