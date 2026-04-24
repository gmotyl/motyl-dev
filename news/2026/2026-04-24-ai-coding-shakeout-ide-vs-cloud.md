---
title: "The AI Coding Shakeout: IDE vs Cloud and Who Wins"
excerpt: "As AI coding tools consolidate, Cursor gets a $60B acquisition option while Roo Code shuts down. Two very different bets on where value accumulates."
publishedAt: "2026-04-24"
slug: "ai-coding-shakeout-ide-vs-cloud"
hashtags: "#substac #ai #agents #cursor #kilo #coding #software #generated #en"
source_pattern: "Substac"
---

## The AI Coding Shakeout Is Here

**TLDR:** Two major events hit the AI coding space this week. SpaceX announced a deal with Cursor including a $60 billion acquisition option, giving them access to xAI's Colossus supercomputer. The same day, Roo Code announced they are shutting down their VS Code extension, pivoting to a Slack-based cloud agent. Both decisions trace back to the same pressure: foundation models are getting better and cheaper, and when your suppliers become your competitors, the economics stop working.

**Summary:**

The SpaceX deal is Cursor buying insurance. They built a great product on top of Claude and GPT, but they were always one upstream decision away from having the rug pulled. When your API suppliers start shipping their own coding tools, you are in an awkward position. The $60 billion option is expensive but explicit: access to a million H100s to train your own models, absorption into the xAI ecosystem, and a path from wrapper to infrastructure provider.

Roo Code took the opposite approach. Instead of going deeper into the stack, they are getting out of the IDE game entirely. Their CEO was direct: they do not believe IDEs are the future of coding. Their team is already moving to cloud environments where agents run multiple tasks in parallel without direct oversight. The IDE becomes a place you visit to review work, not where work happens.

The article disagrees with the "IDE is over" thesis. Every independent developer, engineering team, and enterprise shipping production software still lives in an editor for most of their working hours. That is not changing anytime soon. The more important variable is model lock-in, not IDE versus cloud.

Kilo, the author of this piece, started as a fork of Roo. A lot of what they do well today started with work Roo shipped first: custom modes, the Architect/Code/Debug split, the whole "let the agent actually do things" philosophy. But they disagree that the IDE is over. The real question is where value accumulates.

Their answer is the platform layer: model-agnostic, open source, focused on engineering workflows. Not a Claude wrapper vulnerable to API changes, not a walled garden training proprietary models on a million GPUs. They rebuilt their VS Code extension around true parallel execution, subagent delegation, and cross-platform sessions that carry state between terminal and editor.

**Key takeaways:**

- Foundation models getting better and cheaper narrows the gap for open-weight competitors
- When suppliers become competitors, products built only on top of their APIs are at risk
- Cursor's $60B deal is expensive insurance against model dependency
- Roo Code's "IDE is over" thesis is a bet, not a fact
- Open source and model-agnostic tooling is the hedge against vendor lock-in

**Why do I care:** This is the consolidation we expected to see happening, and now it is happening. The pattern is familiar from every tech shift: wrappers build first, then infrastructure gets commoditized, then whoever owns the compute and the model owns the value. For developers, the lesson is the same as always: understand your dependencies. If your workflow depends on a tool, understand who controls the layers beneath it. The IDE is not over, but the tool that is just a wrapper on top of an API is very much in question.

**Link:** [The AI Coding Shakeout Is Here](https://blog.kilo.ai/p/the-ai-coding-shakeout-is-here)