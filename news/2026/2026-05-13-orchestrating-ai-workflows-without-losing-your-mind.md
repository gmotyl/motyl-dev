---
title: "Orchestrating AI Workflows Without Losing Your Mind"
excerpt: "A practical look at when to let agents run free in natural language, and when to wrap them in proper orchestration before things get expensive and flaky."
publishedAt: "2026-05-13"
slug: "orchestrating-ai-workflows-without-losing-your-mind"
hashtags: "#refactoring #engineering #ai-workflows #orchestration #agents #automation #generated #en"
source_pattern: "🌀 Refactoring"
---

## Orchestrating AI Workflows Without Losing Your Mind

**TLDR:** Pure "100% AI mode" workflows where you describe a task in natural language and an agent figures it out are fast to ship but flaky and expensive at scale. The better path is treating agents as scaffolding: start in natural language, then progressively replace fuzzy reasoning with deterministic code in a real orchestration engine.

**Summary:** Luca's piece walks through a very ordinary example: when he ships a stable release of Tolaria, he wants the aftermath handled automatically. Fetch the bug fixes and feature requests that made it in, update the relevant tickets, close them, and ping the users who reported the issues. Nothing exotic. But that humble little chore turns out to be a great lens for the bigger question that everyone seems to be arguing about right now: do you let an agent do all of this in one big natural-language prompt, or do you wire it up as a proper workflow?

His honest answer is that he started in full AI mode and it mostly worked, which is exactly the trap. "Mostly works" is a fine bar for a side project and a terrible bar for anything that touches your users. Agents drift. Token costs balloon. A step that succeeded yesterday silently misroutes today because the model decided to be creative. And good luck debugging a five-step chain when there's no log of what each "step" actually decided to do.

The mental model I liked most is agents as scaffolding. You use the agent to get from zero to something working, the way you'd use a generator or a quick script. Then, as the workflow proves itself, you start carving out the parts that should never have been probabilistic in the first place. Fetching issues from an API is not a reasoning task. Closing a ticket is not a reasoning task. Sending a templated message to a user is not a reasoning task. Those go into deterministic steps. What's left for the model is the genuinely fuzzy bit, like summarizing what changed or deciding tone.

The orchestration piece matters here. Tools like Kestra (which sponsored the article, and Luca is upfront about that) exist because once you've got retries, branching, observability, and scheduling, you stop reinventing them badly inside a prompt. The maturity model he sketches goes from "agent does everything" to "orchestrator runs the workflow and calls the model only where judgment is needed," and that progression matches what I've seen in real teams too. The all-agents-calling-agents crowd is loud right now, but the people quietly shipping reliable AI features look a lot more like the boring orchestration camp with a sprinkle of LLM on top.

**Key takeaways:**
- "100% AI mode" workflows are great for prototyping and risky as production infrastructure
- Treat the agent as scaffolding, then replace fuzzy reasoning with deterministic code as the workflow stabilizes
- Real orchestration engines give you retries, observability, and scheduling so you stop reinventing them inside a prompt
- The fuzzy parts (summarizing, tone, classification) stay with the model; the mechanical parts (API calls, state updates, notifications) become code

**Why do I care:** I've watched frontend teams get seduced by the idea that an agent will "just handle" their content pipelines, release notes, or PR triage. It works in the demo and then quietly costs you a fortune in tokens while producing inconsistent output that QA can't reproduce. As an architect, I want the boring parts of any workflow to be boring: typed, logged, retryable, and cheap. The model earns its keep on the genuinely ambiguous decisions, not on stringing together HTTP calls. This framing of agents-as-scaffolding is the cleanest version of that argument I've read in a while, and it's the one I'll be pointing teammates at when they're about to wire a critical pipeline entirely out of natural language.

**Link:** [How to Orchestrate AI Workflows](https://refactoring.fm/p/how-to-orchestrate-ai-workflows?publication_id=64099&post_id=197106828&isFreemail=true&triedRedirect=true)
