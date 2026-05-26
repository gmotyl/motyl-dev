---
title: "When AI Gives You the Right Answer to the Wrong Question"
excerpt: "A structured prompt technique that turns AI from a confident list-sorter into an advisor that first challenges whether your decision frame is correct."
publishedAt: "2026-05-25"
slug: "ai-decision-advisor-prompt-wrong-frame"
hashtags: "#ai #agents #decisionmaking #prompting #llm #generated #en"
source_pattern: "AIAdopters"
---

## The Prompt for a Big Decision You Cannot Take Back

**TLDR:** Handing AI a shortlist and a single metric is a clerk move, not an advisor move. The AI sorts what you give it, without questioning whether your options or your goal are actually the right ones. A better approach is a prompt structure that interviews you before it evaluates anything.

There's a pattern I see constantly in how people use AI for decisions, and it goes something like this: you've got two or three options, you've got a goal in mind, and you drop them into a chat expecting the model to tell you which one wins. The model obliges. It's structured, it's confident, it cites the factors you care about. You pick. Six months later, things look worse, not better, and you're not entirely sure why.

The reason is what the newsletter author calls a "garbage frame, confident answer." The model ranked your options against the goal you named, but it never asked whether those options actually address your real constraint, or whether the goal itself is a symptom of something deeper. It couldn't, because you gave it a sorted list and it sorted the list. Optimization inside a bad frame is worse than no optimization at all, because now you've moved with conviction.

This is the clerk-versus-advisor distinction, and it matters enormously when the decision has a multi-year half-life. A clerk does what you ask. An advisor looks at your request and sometimes tells you the ask itself is the problem. On a reversible A/B test, you want a clerk. On a three-year supplier contract or a hiring decision that reshapes how your team functions, you want something that pushes back before it sorts.

The prompt structure described here flips the interaction. Instead of "here are my options, which wins," it starts with an interview. The AI pulls out your assumptions, your constraints, what you've measured and what you haven't, and what's one level below the goal you named. Only after that does it evaluate options, and it reserves the right to tell you none of them address the real problem.

I find this genuinely useful as a frame for how to write prompts when the stakes are high. The model is still the model, it doesn't have context you haven't given it, but the prompt structure forces you to give it the context that actually matters instead of the shortlist you've already half-decided on.

**Key takeaways:**
- AI optimizes within the frame you give it; if the frame is wrong, a confident answer makes things worse
- The advisor model starts by interviewing you rather than sorting your existing options
- A well-structured prompt can force you to surface assumptions and constraints you didn't know you were hiding
- On irreversible decisions, the most valuable thing an AI can do is question your list, not rank it

**Why do I care:** As a senior dev who spends a lot of time thinking about architecture decisions, this resonates hard. I've seen teams pick the "best" technology choice that was optimized for the wrong constraint, then spend a year living inside that choice. The instinct to hand a shortlist to a tool and get a ranked answer is exactly what makes architecture reviews go sideways. The prompt-as-interview model is worth internalizing, not just for AI conversations, but as a thinking habit for any high-stakes technical decision.

**Link:** [The Prompt for a Big Decision You Cannot Take Back](https://aiadopters.club/p/the-prompt-for-a-big-decision-you?publication_id=3593700&post_id=199217979&isFreemail=true&triedRedirect=true)
