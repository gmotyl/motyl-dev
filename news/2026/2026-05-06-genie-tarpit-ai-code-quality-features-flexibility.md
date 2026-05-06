---
title: "The Genie Tarpit: Why AI-Generated Code Drifts Toward Mediocrity"
excerpt: "Kent Beck maps AI-generated code on a two-axis framework of features vs. flexibility, arguing that genies naturally pull development toward the worst possible quadrant."
publishedAt: "2026-04-29"
slug: "genie-tarpit-ai-code-quality-features-flexibility"
hashtags: "#engineering #architecture #generated #en #ai #softwaredevelopment #kentbeck #codequality"
source_pattern: "Kent Beck"
---

## Genie Tarpit

**TLDR:** Kent Beck argues that AI coding assistants ("genies") don't just fail to improve code quality, they actively drag teams toward a worse state than the pre-AI baseline. He frames this using two axes: whether code works (features) and whether it can be changed safely (flexibility), and observes that genies tend to score poorly on both.

**Summary:** Beck opens with a blunt framing: genies produce a degraded copy of mediocre training data. That's not a hot take thrown to provoke engagement, it's the premise for a more interesting analysis. He sketches a two-dimensional space where software quality lives. The first axis is features, a fairly binary question of whether the code works or not, with a narrow band of success. The second axis is flexibility, or what he's been calling "optionality" and "futures," which describes how easily you can change the code without breaking things. This dimension has a wider operating range. You can ignore flexibility for months before it starts hurting you, which is exactly why teams do.

Before AI entered the picture, most teams weren't operating in the upper-right quadrant of high correctness and high flexibility. They were muddling along: mostly-working software that was genuinely hard to change. That was the baseline. Beck's observation is that AI genies don't bring teams up to the upper right. They land below and to the left of even muddling. The code AI produces often claims to work when it doesn't, driven by what Beck calls a "plausible deniability" task orientation. The model produces something plausible, the check passes, and the complexity accumulates until even the model can't pretend progress is possible anymore.

There's an honest admission baked into the piece that I appreciate: nobody knows the fix. Beck lists the candidate solutions without committing to any of them. Better training data? Training on good commits rather than just code? Better test harnesses? Letting the model develop its own style of development even if it becomes incomprehensible to humans? He references the Bitter Lesson, that scaling beats human-engineered priors, as the uncomfortable possibility that the "right" answer might not be legible to us at all. That's a more intellectually honest position than most takes on this topic, which tend to pick a villain (bad prompts, bad models, bad users) and stick with it.

The two-axis framework is genuinely useful for teams trying to reason about where AI fits in their workflow. If you already have strong practices around testing, integration, and code review, you're better positioned to constrain what the genie produces. Teams with weaker practices are more vulnerable to drifting into the tarpit, because they lack the feedback loops that would surface the correctness problems early and the flexibility erosion slowly.

**Key takeaways:**
- AI coding tools don't just fail to raise code quality, they tend to lower it below the "muddling" baseline most teams were already at
- Software quality has two dimensions, correctness (narrow band, you either work or you don't) and flexibility (wide band, you can coast on technical debt for a while before it bites)
- Genies score poorly on both dimensions, claiming success on correctness through plausible-looking outputs, while aggressively eroding flexibility
- Teams with existing quality practices (tests, CI, pairing, reviews) have more ability to constrain the genie's output than teams without those practices
- There is no agreed-upon fix, and Beck's honesty about that uncertainty is more useful than confident prescriptions would be

**Why do I care:** As someone who spends a lot of time thinking about frontend architecture and developer experience, this framing hits close to home. The flexibility axis is exactly where I've felt the pain most acutely when reviewing AI-assisted pull requests. The code works, the tests pass, and then six weeks later nobody can touch that component without everything breaking. Beck's framing gives me a concrete vocabulary for explaining why "it works" isn't sufficient for shipping code. The question I now want to ask in every code review is not just "does this function correctly" but "can we change this without surprises." If the answer is no, the genie gave us a local optimum at the cost of a global one.

**Link:** [Genie Tarpit](https://tidyfirst.substack.com/p/genie-tarpit)
