---
title: "A Full Workflow for Coding With AI Agents, From Vague Brief to Shipped Feature"
excerpt: "Matt Pocock walks through a complete lifecycle for AI-assisted development, turning ambiguous requirements into agent-ready plans and running autonomous coding agents with TDD."
publishedAt: "2026-06-03"
slug: "full-workflow-for-ai-coding-matt-pocock"
hashtags: "#curated #ai #agents #tdd #architecture #dx #generated #en"
source_pattern: "YouTube Content"
---

## Full Walkthrough: A Workflow for AI Coding

**TLDR:** This is a hands-on workshop from Matt Pocock covering the whole lifecycle of building software with AI agents, from interrogating a fuzzy brief into a real PRD, slicing the work into thin vertical slices, and then running an agent through test-driven development until it ships. The pitch is that chatting with an AI in a sidebar is not a workflow, and that the real skill is designing the process and the codebase around what agents are actually good at.

**Summary:** The framing here is one I keep coming back to, so it is worth sitting with. Most people who say they "use AI to code" mean they open a chat window, paste in a problem, and copy back whatever comes out. Pocock's argument is that this is the least valuable way to work with these tools, because the model is only as good as the context and the structure you hand it. The talk reframes AI coding as a pipeline with distinct phases, and each phase exists to reduce ambiguity before the agent ever writes a line of code. That ordering matters. The whole thing falls apart if you let the agent start implementing against a vague brief, because it will confidently build the wrong thing very fast.

The early phases are about thinking, not typing. There is a research and prototyping stage, then what he calls a grill session, where you deliberately stress-test a vague request by poking holes in it and forcing the assumptions out into the open. Only after that do you write the PRD, the product requirements document, which becomes the source of truth the agent reads from. I like this because it puts the hard human work first. The grill session is really just rubber-duck debugging applied to requirements, except the duck talks back and you are doing it before any code exists. If you have ever watched a feature balloon in scope mid-build, you know that most of that pain traces back to a brief nobody pinned down.

The part that will get the most attention is the slicing. Pocock borrows the old "tracer bullet" idea, where instead of building a feature layer by layer, you build one thin vertical slice that runs end to end, from the UI down to the database, even if it does almost nothing. The reason this matters for agents specifically is independence. A well-sliced issue is something an agent can pick up on its own, work without constant clarification, and finish without stepping on five other pieces of in-flight work. Slicing is the skill that makes autonomous runs possible, and it is also the skill most teams are worst at.

Then comes the implementation loop, and this is where TDD does real work. The agent selects a task, writes a failing test, implements the code, watches the test pass, and commits. Tests are not just quality insurance here, they are the guardrail that keeps an autonomous agent honest, because a passing test is an objective signal the model cannot talk its way around. He demonstrates running this human-in-the-loop first, where you review and correct, and then graduating to fully autonomous, away-from-keyboard runs once your prompts and your test coverage are solid enough to trust. The honest bit is that he refines prompts based on where the agent struggles, which tells you the autonomy is earned, not assumed.

The last theme is the one I think has the longest shelf life, designing codebases that agents love to work in. The same things that make a codebase pleasant for a new human teammate, clear boundaries, good naming, tests that document intent, small well-scoped modules, are the things that let an agent navigate without getting lost. What he is avoiding saying out loud is the uncomfortable flip side, that a messy legacy codebase will throttle agent effectiveness no matter how good the model gets, and most of us work in exactly those codebases. The workflow assumes a greenfield-ish environment and a discipline most teams do not have yet, so the gap between the demo and a real sprint is bigger than the polish suggests.

**Key takeaways:**
- AI coding is a multi-phase pipeline, not a chat window. The value is in reducing ambiguity before the agent writes code, through a grill session and a written PRD.
- Slice work into thin vertical "tracer bullet" issues so an agent can grab one and finish it independently without blocking on clarification or colliding with other work.
- TDD is the control mechanism for autonomous agents. A passing test is an objective signal, which is what makes away-from-keyboard runs trustworthy.
- Codebase design for AI mirrors codebase design for humans. Clear boundaries, naming, and tests are what let an agent navigate without getting lost.

**Why do I care:** If you are a senior frontend dev or architect, the takeaway is not "agents will replace the loop," it is that your existing engineering hygiene is now the bottleneck on agent productivity. The PRD-first, slice-it-thin, test-as-guardrail approach is just good practice with the volume turned up, and the teams that already write clean issues and keep tests honest will get an outsized boost. The part worth pushing back on is the implicit assumption of a tidy codebase. Most of us maintain something gnarly, and the real near-term work is making legacy code legible enough that an agent can operate in it at all. That is an architecture problem, which puts it squarely on your desk.

**Link:** [Full Walkthrough: Workflow for AI Coding — Matt Pocock](https://www.youtube.com/watch?v=-QFHIoCo-Ko)
