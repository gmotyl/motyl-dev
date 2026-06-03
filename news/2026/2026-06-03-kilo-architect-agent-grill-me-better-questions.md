---
title: "Kilo's Architect Agent Borrows Grill-Me to Stop Planning Too Early"
excerpt: "Kilo's new Architect agent uses the Grill-Me technique to interrogate underspecified requests before producing a plan you can actually execute."
publishedAt: "2026-06-03"
slug: "kilo-architect-agent-grill-me-better-questions"
hashtags: "#kilo #agents #architecture #dx #workflow #generated #en"
source_pattern: "Kilo"
---

## Architect Agent Uses Grill-Me to Ask Better Questions

**TLDR:** Kilo shipped an Architect agent in its marketplace that challenges you with questions before it commits to a plan, instead of guessing at the blanks. The behavior is inspired by Matt Pocock's Grill-Me skill, a four-line prompt that keeps poking at your idea until it gets concrete. The point is knowing when not to write a plan yet.

**Summary:** Here's a failure mode anyone who has used an AI planner mode will recognize. You hand it a vague request, it fills in the gaps with its own assumptions, and out comes a plan that reads beautifully and rests on sand. Kilo's team noticed two things their users disliked. First, the plans that came back were under-defined and unrefined. Second, the agent was almost twitchy about jumping straight into implementation, and that eagerness to start coding actually made some people anxious. Those are the two problems the new Architect agent tries to solve.

The fix is to make the agent behave like a decent engineer at the start of a project rather than an over-caffeinated junior who wants to open a pull request immediately. When there is genuine room to disambiguate, it asks the questions a thoughtful person would ask first. What actually matters here? What is constrained? What can we defer? What does success look like? Instead of pretending the request is clear, it forces those decisions out into the open. The author makes a point I find honest and a little uncomfortable, which is that the number and quality of questions depend heavily on how you write the first prompt and how you answer each follow-up. In other words, the tool is a mirror. Give it lazy answers and you get a lazy plan back.

The intellectual core comes from Grill-Me, a skill written by Matt Pocock that got popular precisely because it is tiny. About four lines of text, and yet it reliably challenges your initial ideas from several angles until they sharpen into something usable. Take a prompt like "build planner mode for Architect." Sounds clear, right? Then you start tugging at the threads. Should it ask questions every single time, or only when ambiguity is high? Should it inspect the repo before asking anything? Should it read the project documentation up front, or wait until you explicitly ask? What even counts as enough clarity to stop questioning and start planning? What does a good output plan need to contain? Grill-Me drags every one of those unspoken decisions into the light, and the plan that survives is narrower, more concrete, and far easier to implement.

The line that stuck with me is that a lot of bad implementation work is just unresolved ambiguity with code wrapped around it. That is exactly right, and it is the kind of thing senior engineers learn the hard way after shipping the wrong thing a few times. If a planner can surface the missing decisions earlier, the whole downstream workflow improves. Fewer wrong assumptions, less rework, a cleaner handoff to the coding step. The value of the Architect mode, as the author puts it, is not that it writes a long plan. It is that it knows when not to write one yet.

Now for what the piece is quietly avoiding. There is no example of an Architect transcript, so we never see whether the questions are genuinely sharp or just generic prompts dressed up as rigor. There is also an unexamined risk on the other side. An agent built to keep grilling you can easily tip into being annoying, asking five questions when one would do, and the article admits the question count is tuned by the user without showing how you actually control that floor. The claim that Grill-Me "really produces incredible results" is asserted rather than demonstrated. And there is a deeper tension nobody names. The same model that was too eager to implement is now the one deciding when ambiguity is high enough to ask a question. That judgment is the whole ballgame, and a four-line prompt nudging it is a thin lever for such a load-bearing decision.

**Key takeaways:**
- The Architect agent interrogates underspecified requests with clarifying questions before producing a plan, rather than filling blanks with its own assumptions.
- It is inspired by Matt Pocock's Grill-Me skill, roughly four lines of prompt text that challenge an idea from multiple angles until it becomes concrete.
- Question quantity and quality scale with how you write the first prompt and how you answer follow-ups, so the output is only as good as your engagement.
- The stated win is reduced rework and a cleaner handoff to coding, on the premise that bad implementation is often just hidden ambiguity.
- The agent's main feature is restraint: knowing when not to write a plan yet.

**Why do I care:** If you architect systems or lead a team, this maps directly onto a problem you already fight, which is people coding before the requirements are settled. An agent that front-loads the awkward questions is a real workflow improvement, and the Grill-Me pattern is portable. You do not need Kilo to adopt it; you can drop those same four lines of "challenge my assumptions before planning" into whatever assistant your team uses, including a custom skill or a Cursor rule. My caution as a consultant is to treat this as a forcing function for your own thinking, not a substitute for it. The agent surfaces decisions, but you still have to make the right calls, and a planner that asks good questions will still happily build the wrong thing if you answer carelessly.

**Link:** [Architect Agent Uses Grill-Me to Ask Better Questions](https://blog.kilo.ai/p/architect-agent-uses-grill-me-to-create-plan)
