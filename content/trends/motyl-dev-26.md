---
issueNumber: 26
week: '2026-w34'
weekLabel: 'Week 34 (Aug 17 – Aug 23, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-26.webp'
publishedAt: '2026-08-30'
---

# motyl.dev Weekly #26: Week 34 (Aug 17 – Aug 23, 2026)

> A curated digest of what I found worth reading this week.

One question is front and center this week, and it's the one nobody in our field can stop arguing about: what happens to human skill when the machine writes the code. Read together, the pieces below stake out the whole spectrum - from "code was never the hard part" to "AI coding will quietly erase your expertise." I don't think either extreme is right, but the tension between them is where all the interesting questions live. The rest of the issue is the practical counterweight: how to actually stay good at this — failing tests first, auditing your agent files, and keeping an eye on where the craft still hides.

## ✨ Featured

**[Human judgment doesn't leave the software factory. It relocates.](https://addyo.substack.com/p/human-judgment-doesnt-leave-the-software)**
Addy Osmani's framing is the most useful lens I've found for the whole debate. The claim isn't that judgment disappears when agents take over the typing — it's that it moves. Up the stack, into what to build and why, into review and taste and the calls that don't have a test. Worth reading before you form an opinion on any of the pieces below.

## 🤖 The expertise debate

**["Code was never the hard part" is an insult to all programmers](https://blog.senko.net/code-was-never-the-hard-part-is-an-insult-to-all-programmers)**
A sharp rebuttal to the line you've heard a hundred times. If code was never the hard part, why did so much of it stay broken for so long? A good corrective to the idea that implementation is a solved, low-value chore.

**[AI Coding will Prevent Expertise](https://larsfaye.com/articles/ai-coding-will-prevent-expertise)**
The pessimist's case, argued well: expertise is built by struggling through the parts you're now tempted to delegate. Skip the struggle enough times and the depth never forms. The uncomfortable question is whether we're trading short-term velocity for a generation that can't debug what it didn't write.

**[The End of No Code](https://blog.exe.dev/the-end-of-no-code)**
No-code promised software without programmers; AI arguably delivers it. But the piece argues the ceiling didn't move - it just relocated, again - to the person who can describe, verify, and correct. Pairs neatly with the Featured link.

## 🛠️ Staying sharp

**[AI Coding Tip 033 - Write the Failing Test First and Ban Deletions](https://hackernoon.com/ai-coding-tip-033-write-the-failing-test-first-and-ban-deletions)**
Two small guardrails with outsized payoff when an agent is doing the work: pin the behaviour with a failing test before it starts, and forbid it from "fixing" things by deleting them. The second one is the fix for a very specific and very annoying failure mode.

**[Audit your Agent files](https://addyo.substack.com/p/audit-your-agent-files)**
Your `AGENTS.md` / `CLAUDE.md` files quietly accumulate cruft, contradictions, and stale instructions — and the agent follows all of it. Osmani makes the case for treating them like real config: review them, prune them, test that they still say what you mean.

**[AI Code Review Tools: Benchmarks & Comparison](https://hackernoon.com/ai-code-review-tools-benchmarks-and-comparison)**
A side-by-side look at the current crop of AI review tools. Useful if you're deciding what to put in the loop between "agent wrote it" and "it ships."

## 🎨 Frontend

**[Introducing Motion UI](https://daily.dev/posts/AzsyaVrza)**
A fresh take on motion primitives for the web — worth a look if you're tired of hand-rolling the same transitions.

## 📦 Craft & experiments

**[Code Smell 321 - Getter Piggybacking](https://hackernoon.com/code-smell-321-getter-piggybacking)**
The long-running code smell series lands on getters that quietly do more than get. A small, concrete reminder that side effects hiding behind innocent-looking accessors are exactly the kind of thing agents (and humans) miss.

**[Single file apps with Gleam and Bun](https://alistair.sh/gleam-bun-apps)**
A fun experiment: whole apps in a single file, using Gleam on Bun. The single-file-app idea keeps coming back because it lowers the activation energy for building something real to almost zero.

**[Small Models Have Arrived](https://calv.info/small-models-have-arrived)**
The case that small, local models have crossed the line from toy to tool. Relevant to everything above — a lot of the "stay sharp" advice gets easier when the model runs on your machine.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
