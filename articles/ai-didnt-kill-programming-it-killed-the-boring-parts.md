---
title: "AI Didn't Kill Programming — It Just Killed the Boring Parts"
excerpt: "After 20 years of writing code by hand, I've embraced AI as my new pair-programming partner. Here's why the fundamentals haven't changed since Uncle Bob was punching tape."
publishedAt: '2026-01-24'
slug: 'ai-didnt-kill-programming-it-killed-the-boring-parts'
hashtags: '#AI #SoftwareEngineering #CleanCode #Programming #CareerAdvice'
---

### TLDR:

The developer profession is evolving fast, but this isn't new — we went from punch cards to assembler to high-level languages. Now AI handles the syntax grind while we focus on what always mattered: architecture, solving the *right* problems, and taking responsibility for what ships. The core job? Same as when Uncle Bob was poking holes in tape.

---

## From Punch Cards to Prompts: Same Game, New Tools

A lot has changed in software development over the past years — even months. But let's not pretend this is unprecedented. Programmers started with perforated tape. If you've read [Uncle Bob's](https://en.wikipedia.org/wiki/Robert_C._Martin) *[The Clean Coder](https://www.oreilly.com/library/view/the-clean-coder/9780137081073/)*, you know what the feedback loop looked like decades ago: you'd carry your punched tape to a separate department, they'd load it onto the computer, and *eventually* you'd get your results back. Then came assembler. Then high-level languages. And now? The era of artificial intelligence — another revolution in our craft.

Here's what's actually changed: **syntax mastery is no longer the crown jewel**. Being the wizard who memorizes every function in every library? Less valuable. What's skyrocketed in importance are the skills that were *always* premium: architecture, high-level thinking, and — crucially — knowing which problems are worth solving in the first place.

## The Human Stamp Isn't Going Anywhere

Maybe future AI generations will nail architectural decisions too. Maybe they'll give brilliant advice on system design. But here's what I can't imagine: production software shipping without a human reading it, approving it, and saying "this is okay to deploy."

Think about it. Even for the simplest possible use case — a bakery's landing page — if something goes wrong, if there's a vulnerability that lets unauthorized users modify content, that bakery gets publicly embarrassed. *Their digital storefront becomes a liability.* Someone will always need to confirm: this is secure, this is correct.

Perhaps one day that "someone" will also be AI. That would actually be fascinating. But for systems where human lives could be at stake? No matter how advanced the AI, there will always be a final human verification. And since software is proliferating across every domain — many systems directly affecting people's lives — the programming profession is surprisingly safe.

## The Real Programmers Will Be Fine

There's a lot of talk about how people doing simple, repetitive, monotonous work are quietly disappearing. Companies stopped hiring for those roles. Those workers just... vanish. But *real* programmers — the ones who are genuinely passionate about building software, who stay current with trends and keep evolving — they'll never struggle to find work.

I've heard the concern that future developers might find it harder to reach the architect level, that broad, abstract thinking about systems will be harder to develop when AI handles the grunt work. I don't buy it.

**Today, generalists are shining.** People with a wide-angle view of how the internet works, how software behaves — even if they were never great at the nitty-gritty details. Now AI handles all those details for them. That's a feature, not a bug.

## My Workflow: Plan First, Generate Second, Read Last

Let's be practical. If you're not using AI in your workflow, you need to join the peloton — the pack of developers who are simply *faster* now.

Here's my process when a task lands on my desk:

1. **Plan first.** Maybe with AI's help. I clarify the requirements, ask questions, understand what *really* needs to be done.
2. **Request a detailed implementation plan.** I ask the AI to walk through the project and create a step-by-step blueprint for the feature.
3. **Maintain an `AGENTS.md` file.** This is crucial. I document the conventions of my system — how I want things implemented, which libraries and functions to use. Every time the AI makes a mistake during implementation, I correct the code *and* update the `AGENTS.md` so it doesn't happen again.

   *Why `AGENTS.md` and not `CLAUDE.md` or `GEMINI.md`? I experiment with different coding agents and don't want to be locked into any single tool. A generic `AGENTS.md` lets me point Claude, Gemini, Cursor, or whatever I'm using that day to the same source of truth.*

4. **Test before reading.** I verify the solution works before I dive into the code. Sometimes it doesn't work at all — no point reading broken code.
5. **Then refactor and review.** If the instructions and plan were solid, the architecture should already be good. Heavy refactoring shouldn't be necessary. But I *must* understand everything that was generated and confirm it meets my expectations.

## The Lazy Dev vs. The Ambitious Dev

Here's a real concern: will future programmers be as skilled at reading code as we are? I have 20 years of experience. For two decades, I wrote code by hand. I know the quirks, the gotchas — the syntax lives in my muscle memory.

You can imagine a lazy future developer just approving AI-generated code without truly understanding it. No learning process. No knowledge absorption. Just a passive relay for whatever the AI spits out, pretending to be in control.

But flip the script. An *ambitious* beginner today can reach an incredibly high level. Why? Because **AI is also a teacher**. Anything you don't understand in the generated code? You have a chat interface right there. Ask for an explanation. This *accelerates* growth.

When I started 20 years ago, I barely knew English. There was essentially no usable internet — no examples to find, no communities to ask. I was stuck flipping through books, page by page, slowly building my skills.

## The Core Hasn't Changed

What AI has taken away is the obsession with details. What remains is the higher level — being the engineer *responsible* for the software. That responsibility is exactly the same as it always was.

The tools change. The speed of delivery changes. But the essence? It's practically identical to what Uncle Bob was doing when he was punching holes in tape on the first computers.

The fundamentals never die. They just get a new interface.
