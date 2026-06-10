---
title: "AI Coding in 2026: Smaller PRs, Human Judgment, and Unpredictable Bills"
excerpt: "Three angles on the current state of AI-assisted development: keeping generated PRs manageable, why raw AI output is eroding credibility, and the surprise costs of GitHub Copilot's new pricing model."
publishedAt: "2026-06-09"
slug: "hackernoon-ai-coding-prs-slop-copilot-billing-2026"
hashtags: "#hackernoon #ai #engineering #generated #en"
source_pattern: "HackerNoon"
---

## AI Coding Tip 023 - How to Shrink Your AI's Pull Request

**TLDR:** AI code generation tends toward sprawl. Without explicit constraints, a single prompt can produce a PR that touches dozens of files, rewrites things that didn't need rewriting, and leaves reviewers drowning. The fix is intentional scoping before you ever hit generate.

Maxi Contieri makes a point that should be obvious but apparently isn't: the AI doesn't know when to stop. It has no intuition for "good enough" or "minimal change." It fills whatever space you give it. If you ask it to fix a bug, it might also refactor the surrounding code, update imports, rename variables it finds inconsistent, and add tests in a style that wasn't there before. The PR looks productive. It's actually a nightmare to review.

The solution is upstream discipline. Break work into smaller, tightly scoped tickets. Write prompts that name what you want changed and, just as importantly, what you don't want touched. Treat the AI the way you'd treat an eager junior developer who needs explicit guardrails, not because they're incompetent but because their enthusiasm outpaces their judgment about scope. I've found that the quality of an AI-generated PR is almost entirely a function of how clearly I constrained the task before generation, not how clever the model is.

**Key takeaways:**
- Scope the task explicitly before prompting, including what should stay unchanged
- Small, focused tickets produce PRs that are actually reviewable
- Treat AI output as a first draft with a blast radius problem, not a finished product

**Why do I care:** As a frontend architect reviewing AI-assisted PRs from the team, unscoped generation is one of the most time-consuming problems I deal with. A PR that touches 40 files when 4 would have sufficed isn't faster, it's slower, because now someone has to understand the full diff. Getting disciplined about pre-generation constraints is table stakes for any team using AI at scale.

**Link:** [AI Coding Tip 023 - How to Shrink Your AI's Pull Request](https://hackernoon.com/ai-coding-tip-023-how-to-shrink-your-ais-pull-request)

---

## On AI, Ownership, and Why Nobody Wants Your Slop: They Want You

**TLDR:** "Slop" in 2026 isn't low-effort output in the old sense. It's high-effort-looking output with no actual human judgment behind it. Michal Kadák argues that shipping raw AI output without ownership is a credibility risk, and that the engineers who survive the current wave are the ones who stay visibly in the loop.

The word "slop" has shifted meaning. It used to mean sloppy work, easy to spot by its rough edges. Now it looks polished. It's formatted, coherent, well-structured, and completely hollow. Kadák's framing cuts right to the problem: there's no one home. The output arrived from a model that has no stake in whether it's correct, appropriate, or actually useful to the reader. That absence of ownership is what people are starting to sense, even when they can't articulate it.

I think this matters more than the productivity debate. Whether AI makes you faster is almost beside the point if the output you're producing carries no fingerprint of your thinking. People don't want your AI's take on something. They want your take, possibly with AI help. The distinction sounds subtle but the experience is completely different. Strategic human judgment, as Kadák puts it, isn't just a career advantage, it's the actual product. The AI is a tool that produces raw material. What you do with it, how you shape it, what you cut, what you add from your own experience, that's the work. Shipping the raw material and calling it done is the mistake.

For anyone in a technical communication role, including developer advocates, architects writing proposals, or engineers authoring RFCs, this is worth sitting with. The temptation to let the model write the whole thing and ship it is real. The cost is that you stop sounding like yourself, and people notice.

**Key takeaways:**
- Slop in 2026 looks polished but lacks human presence and judgment
- Shipping raw AI output without editing or ownership damages professional credibility
- The competitive advantage isn't speed, it's the visible application of your own thinking

**Why do I care:** As a senior developer, I write a lot: documentation, architectural proposals, PR descriptions, team communications. The efficiency argument for full delegation to AI is tempting, but every piece I let go entirely is a piece that no longer represents how I think. Readers, colleagues, and hiring managers can tell the difference between writing that has a person behind it and writing that doesn't. I'd rather be slower and present.

**Link:** [On AI, Ownership, and Why Nobody Wants Your Slop: They Want You](https://hackernoon.com/on-ai-ownership-and-why-nobody-wants-your-slop-they-want-you)

---

## The GitHub Copilot Bill Came Due

**TLDR:** GitHub Copilot's flat subscription model is gone. Agentic AI workflows are now metered, and engineering leaders are dealing with bills that are harder to predict and harder to budget for. Gartner reports teams are scrambling.

This one doesn't surprise me, but the timing and the scale of the reaction apparently caught a lot of organizations off guard. Flat-rate subscriptions are a predictable cost. Metered usage tied to agentic workflows, where the AI is doing multi-step work autonomously, is a completely different budget problem. The more you use it, the more it costs, but the usage is driven by the agent, not directly by the engineer. Costs can spike without anyone making a deliberate decision to spend more.

The practical implication for engineering leaders is that AI tooling now needs to be treated like cloud infrastructure. You need usage visibility, budget alerts, and probably some governance around which workflows are allowed to run autonomously and at what frequency. Teams that didn't build those controls when Copilot was a flat fee are now building them reactively, which is harder and more disruptive than doing it proactively.

There's a broader lesson about the adoption curve here. Flat subscriptions made it easy to say yes to AI tooling without much scrutiny. Metered pricing forces the conversation about actual value, actual usage, and actual ROI. That conversation is probably healthy, even if the timing is uncomfortable.

**Key takeaways:**
- Metered agentic AI billing requires the same governance as cloud infrastructure
- Reactive cost controls are harder to implement than proactive ones
- Flat-rate AI subscriptions masked the real cost question; metering surfaces it

**Why do I care:** Budget unpredictability is one of the fastest ways to get AI tooling deprioritized or cut. If engineering leaders can't explain the cost model to finance, the tool goes away regardless of how useful it is. Getting ahead of metered pricing with proper usage monitoring is now part of the job.
