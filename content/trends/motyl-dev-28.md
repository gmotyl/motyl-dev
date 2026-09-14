---
issueNumber: 28
week: '2026-w37'
weekLabel: 'Week 37 (Sep 7 – Sep 13, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-28.webp'
publishedAt: '2026-09-14'
---

# motyl.dev Weekly #28: Week 37 (Sep 7 – Sep 13, 2026)

> A curated digest of what I found worth reading this week.

Most of what I kept this week circles one question. When can you trust an answer? MIT's sycophancy paper argues that a model able to sense what you want to hear has already stopped being a reviewer. A fourteen-night forecasting experiment falls apart on a constant the author guessed on the first evening. The Next.js team pointed an agent at their issue backlog and then refused to let it press close. Underneath all three sits the best essay I read this week, which says everything an agent does facing the machine ends up in the model's weights sooner or later, and what survives is the part facing you. Two releases close the issue out, neither of them about agents, which was a relief.

## ✨ Featured

**[The Evolution of the Agent Harness](https://www.latent.space/p/attention-interface)**
The clearest account I have read of why agents started working around the end of 2025. Two curves, what your tooling demands of the model and what the model can actually deliver, and the gap between them decides whether your agent works at all. The arithmetic everyone skips is that 95% per-step reliability over 20 steps averages about 36% success, which is why AutoGPT failed and Cursor did not. The ending is the part I would bet on. Models keep absorbing tooling features into their weights, Anthropic recently deleted 80% of Claude Code's system prompt, and what nobody absorbs is the half facing you. Permissions, identity, trust, when an agent may interrupt you. Worth asking of your own setup. How much of it can you delete and keep the same capability?

## 🔍 Who grades the answer

**[We Warned You About the AI Yes-Man - MIT Just Proved It With Math](https://hackernoon.com/we-warned-you-about-the-ai-yes-man-mit-just-proved-it-with-math)**
Across eight models, emotional validation showed up in 76% of answers against 22% for humans, and models accepted the user's framing of a question 90% of the time against 60%. Neither better prompting nor bolting on RAG closes that gap, because the model still knows which answer you were hoping for. The fix has to be structural. Whatever component does the grading has to not know what you wanted. If you have an agent reviewing your own architecture decisions today, you have an enthusiastic colleague, not a reviewer.

**[I Ran Five Diverse AI Agents Against Five Clones for 14 Nights. A Number I Made Up Decided the Result.](https://thoughts.jock.pl/p/five-lenses-one-brain-agent-diversity-experiment-2026)**
The most honest writeup I have read all year, because the author publishes the experiment that killed his own thesis. Five agents with genuinely different contexts against five clones of one model, same budget, deterministic scoring, no model judging another model. He guessed the base rate at 10-15%. It turned out to be 0.72%. Brier score punishes the level of your answer harder than the ranking, so that one shared guess accounted for roughly 70% of both groups' scores, and rescaling flipped the winner. A constant equal to the real base rate beat both groups of agents. If somebody is selling you a panel of AI experts, this piece is your question list.

## 🤖 Agents doing the boring jobs

**[How we closed 1,500 GitHub issues in one month](https://nextjs.org/blog/how-we-closed-1500-github-issues)**
The design decisions here matter more than the number. The agent runs in a fresh sandbox with the repo, Node, Playwright and Chromium, reproduces the bug against the reported version, latest stable and canary, and stays read-only everywhere outside that sandbox. It investigates and it cannot close. 1462 issues closed in three weeks, 37% already fixed, 19% duplicates, 16% expected behaviour, and a 14-day appeal window that saw 3 come back. The appeal window is what I would copy first, because it turns an irreversible action into a cheap measurement.

## 🛠️ Releases worth a look

**[Announcing Vitest 5.0](https://vitest.dev/blog/vitest-5)**
Performance is the headline. Up to 53% faster on vm pools with heavy dependencies and 19% on a 1280-module monolith, measured against a repo of reference apps rather than microbenchmarks. Trace View records every interaction and assertion as a DOM snapshot, so you can replay a browser test after the fact, which is the CI debugging story. Watch the two default changes when you upgrade. `clearMocks` is on by default now, and unawaited async assertions fail the test instead of printing a warning, so expect a few tests that were passing by accident to stop.

**[Wait… Shadcn Now Has a PDF Library?](https://daily.dev/posts/7J1s5f3Be)** `tool`
PDFCN brings the shadcn distribution model, copy components in through a CLI rather than install a package, to PDF generation. Two rendering engines, prebuilt blocks like invoice templates, and documents that use the same design system as the rest of your UI. About a month old and past 1500 stars, which for a niche this narrow tells you how much the existing options hurt.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
