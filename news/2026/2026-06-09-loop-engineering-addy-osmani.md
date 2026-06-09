---
title: "Loop Engineering: Designing Systems That Prompt Agents So You Don't Have To"
excerpt: "Addy Osmani explores the shift from manually prompting coding agents to building automated loop systems that orchestrate agents on your behalf."
publishedAt: "2026-06-09"
slug: "loop-engineering-addy-osmani"
hashtags: "#addyo #ai #agents #workflow #engineering #generated #en"
source_pattern: "Addy Osmani"
---

## Loop Engineering: Designing Systems That Prompt Agents So You Don't Have To

**TLDR:** The era of typing prompts to coding agents one turn at a time is giving way to something more interesting. Loop engineering means you build the system that prompts the agent rather than doing it yourself. Both Claude Code and Codex now ship with the five building blocks you need to pull this off.

**Summary:**

There is a quote from Peter Steinberger that Addy Osmani drops early in this piece, and it lands hard: "You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents." Boris Cherny, who runs Claude Code at Anthropic, says essentially the same thing from the inside: he does not prompt Claude directly anymore. He writes loops that do it. I read that and thought, okay, we have crossed a threshold somewhere.

For the past couple of years, working with a coding agent looked like a back-and-forth conversation. You wrote a careful prompt, you read what came back, you adjusted, you typed the next thing. The agent was a tool and you were holding it the whole time. That interaction model made sense when agents were inconsistent and needed a human in the loop at every turn. What Addy is describing now is the floor above that, a layer of orchestration that finds work, hands it off to agents, verifies what came back, tracks state, and decides what to do next, all without you sitting there driving.

The five building blocks he lays out are not complicated in isolation. You need something that finds work, something that dispatches it to an agent, something that checks the output, something that records what got done, and something that decides the next step. What is genuinely new is that these pieces now ship inside the products. A year ago you would have stitched this together with bash scripts and then maintained those bash scripts forever. That is not a small thing to have moved past.

Addy is refreshingly cautious about the whole thing. He points out that loops running without supervision can eat tokens at a surprising rate, and that this design is still early. I appreciate that honesty. There is a version of this conversation that is pure hype, and this is not that version. The shift he is describing from "you prompt the agent" to "you design the system that prompts the agent" is real, but it comes with real responsibilities around cost, oversight, and knowing when to stop the loop.

What strikes me most is how this reframes the senior engineer's job. Writing loops is systems design. You are thinking about failure modes, about when to halt, about how to verify outputs without just trusting them. That is a harder and more interesting problem than writing a good prompt, and it is a skill set that actually transfers from decades of building distributed systems.

**Key takeaways:**
- Loop engineering means building a system that orchestrates agent prompts automatically, rather than prompting agents manually turn by turn.
- The five core building blocks are: finding work, dispatching it, verifying output, tracking state, and deciding the next action.
- Both Claude Code and Codex now include these building blocks natively, removing the need to wire them up from scratch with custom scripts.
- Token costs are a real risk with unsupervised loops, and careful cost monitoring is not optional.
- The mental model shift is significant: you move from being the person holding the tool to being the architect of the system that holds the tool.

**Why do I care:**

As someone who thinks about system architecture, this is the framing I have been waiting for. Prompt engineering always felt like a workaround, a way to coax a tool into doing what you wanted by choosing words carefully. Loop engineering is actual engineering. You are designing for reliability, for cost bounds, for verification, for failure recovery. Those are problems I have solved in distributed systems for years, and suddenly they apply to agent orchestration. If this is where coding agents are heading, then the engineers who will do it well are not the ones who write the best prompts. They are the ones who know how to build systems that are robust by design.

**Link:** [Loop Engineering](https://addyo.substack.com/p/loop-engineering)
