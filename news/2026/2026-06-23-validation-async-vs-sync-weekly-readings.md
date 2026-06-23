---
title: "Validation, async vs sync, and weekly readings"
excerpt: "Validation is the new bottleneck in AI-assisted development, async-first doesn't mean async-only, and three sharp reads on engineering in the agent era."
publishedAt: "2026-06-22"
slug: "validation-async-vs-sync-weekly-readings"
hashtags: "#refactoring #architecture #engineering #validation #asyncwork #aiengineering #remotework #generated #en"
source_pattern: "🌀 Refactoring"
---

## Validation Is the New Bottleneck (And That's Actually Fine)

**TLDR:** As AI handles more implementation work, human validation time has become the new critical path. The author shares a practical review workflow for AI-generated code, and argues that releasing imperfect but useful progress is almost always the right call.

**Summary:** There's a useful honesty in admitting that validation has become a bottleneck, rather than pretending AI-assisted development is purely additive. When an AI completes a task overnight and ships it to a review queue, someone still has to look at it — carefully. The author describes a structured triage system: tasks land in an "in review" state, get evaluated against production, and are sorted into "good to release," "needs minor tweaks," "incomplete but shippable," or "needs rework." That last category is the expensive one, but it's also the clearest signal — it gets a QA comment and goes back into the queue with context.

What's interesting is the bias articulated here: when something is 90% right or even incomplete, the lean is toward shipping and iterating rather than waiting for perfection. This isn't new thinking — MVPs have been around for decades — but the magnitude is different. AI compresses the iteration loop so much that holding back incomplete features costs more in opportunity than releasing them costs in polish. Users can chip in, feedback shapes the next pass, and the product moves faster than a carefully gated release cycle would allow.

The harder, more interesting claim is this: the right move is consistently to release a bit more control than you're comfortable with, and that threshold keeps moving. That's a meaningful statement about how engineering culture needs to adapt. It's not that quality stops mattering — it's that the definition of "good enough to learn from" is shifting. AI doesn't replace judgment; it just forces you to exercise judgment more often, at higher velocity.

The underlying tension is one every senior engineer will recognize: the gap between the code that exists and the shared understanding of why it exists. AI generates more of the former without guaranteeing any of the latter. A disciplined validation loop is partly about catching bugs, but it's also about maintaining the mental model of what the system is supposed to do. Skip that, and you accumulate technical debt at machine speed.

**Key takeaways:**
- Validation — not generation — is the rate-limiter in AI-assisted development workflows
- A structured review triage (good / tweaks needed / incomplete-but-useful / rework) helps process AI output systematically
- Bias toward releasing imperfect but useful progress; iteration is faster than perfection-gating
- The comfort boundary around releasing control keeps moving — and moving with it is the skill
- Discipline in validation matters more, not less, as AI produces more code faster

**Why do I care:** This resonates directly with the real cost of AI-assisted development that most tooling demos ignore. Shipping a feature at agent speed means nothing if the review loop is a single person squinting at diffs every morning. Teams that win here won't be the ones with the best prompts — they'll be the ones with the most systematic validation pipelines. If you're architecting a frontend team's workflow around AI assistance, build the review infrastructure first.

**Link:** [Validation, async vs sync, and weekly readings](https://refactoring.fm/p/validation-async-vs-sync-and-weekly?publication_id=64099&post_id=202693861&isFreemail=true&triedRedirect=true)

---

## Async-First Doesn't Mean Async-Only

**TLDR:** Doist's CTO shares a decade of remote-first learnings: async works brilliantly for focused, bounded work, but synchronous conversation is still the fastest tool when you're not converging. The heuristic is deceptively simple — count your expected iterations.

**Summary:** Remote work discourse has a bad habit of turning into ideology. Async-everything evangelists and meeting-culture defenders talk past each other because they're each right about different kinds of work. What makes the Doist perspective useful is that it's grounded in more than a decade of actual practice — not pandemic-era improvisation, but deliberate design.

Their model is pragmatic: async is excellent for status updates, focused work, and well-bounded decisions where a thoughtful written message is sufficient. The overhead of coordinating schedules and shared attention is too high to justify for things that a good Slack thread handles fine. Doist replaced a lot of synchronous rituals — standups, check-ins — with async threads, and people write when they think best rather than when a calendar says to.

But the honest admission is that some conversations are fundamentally bad candidates for async. The tell is the iteration count. If a back-and-forth has been running for days without converging, that's not a sign that more writing is needed — it's a sign that the conversation needs a different medium. Gonçalo Silva's example is instructive: a multi-day async disagreement resolved in a 14-minute call. The synchronous format didn't just save time, it changed the dynamics of how people were engaging with the problem.

The broader principle is worth internalizing: async-first is a default, not a dogma. The goal is reducing unnecessary synchronization overhead, not eliminating all synchronous communication. Engineers and managers who treat "we should meet less" as an absolute principle often end up with teams that thrash on decisions that would have taken fifteen minutes to talk through. Good judgment here is knowing which mode fits which problem — and being willing to switch when the signals are clear.

**Key takeaways:**
- Async works best for focused work, bounded decisions, and status communication
- Synchronous conversation is the right tool when iterations are high or convergence is stalling
- A practical heuristic: if you can't see quick progress toward agreement, call a meeting
- Async-first is a default preference, not a prohibition on synchronous communication
- More than a decade of remote-first experience shows the approach is sustainable when applied pragmatically

**Why do I care:** Frontend teams and platform teams both tend to accumulate the worst of both worlds — too many status meetings AND too many slow async threads on hard architectural decisions. The iteration-count heuristic is something you can actually use in practice. If a PR review thread has three rounds of comments with no clear resolution, that's a call, not another comment. Baking this into team norms reduces frustration and speeds up decisions without requiring anyone to be in an office.

**Link:** [Validation, async vs sync, and weekly readings](https://refactoring.fm/p/validation-async-vs-sync-and-weekly?publication_id=64099&post_id=202693861&isFreemail=true&triedRedirect=true)
