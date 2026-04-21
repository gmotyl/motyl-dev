---
title: "Kimi K2.6: Moonshot AI's Open-Weight Model That Can Code for 13 Hours Straight"
excerpt: "Moonshot AI releases Kimi K2.6, an open-weight model with SOTA-level coding benchmarks and remarkable endurance for long-running agentic workflows."
publishedAt: "2026-04-21"
slug: "kimi-k26-open-weight-agentic-coding-model"
hashtags: "#kilocode #ai #openweight #agenticai #generated #en"
source_pattern: "Substac"
---

## Kimi K2.6: Moonshot AI's Open-Weight Model That Can Code for 13 Hours Straight

**TLDR:** Moonshot AI released Kimi K2.6, a fully open-weight model that scores 80.2% on SWE-Bench Verified and ran autonomously for 13 hours making over 1,000 tool calls in a real-world test. It's available now in the Kilo Code platform and supports scaling to 300 parallel sub-agents.

**Summary:**

Moonshot AI has a pattern of releasing models that immediately become competitive, and Kimi K2.6 continues that trend. The previous version, K2.5, was already a hit with developers doing complex codebase work. K2.6 is not an incremental update in the usual sense — the benchmark numbers and the real-world stress tests suggest something more meaningful happened between versions.

The headline benchmark is 80.2% on SWE-Bench Verified and 58.6% on SWE-Bench Pro. Those are software engineering problem-solving benchmarks built around real GitHub issues, and they are hard to game by just scaling compute. A 92.5% F1-score on DeepSearchQA and 66.7% on Terminal-Bench 2.0 round out a picture of a model that understands code structure, not just code syntax.

What makes the Kilo Code team's experience worth reading is that they did not just run the model on benchmarks. They let it run for 13 continuous hours on a real optimization task. In that window it independently tried 12 different optimization strategies, made over 1,000 tool calls, and modified more than 4,000 lines of code. The end result was a 185% improvement in median throughput, from 0.43 to 1.24 MT/s. That is a very different story from "here is a chart showing our model scores well on synthetic tests."

The multi-agent scaling numbers are also worth noting. K2.5 could coordinate 100 sub-agents across 1,500 steps. K2.6 raises that to 300 sub-agents across 4,000 coordinated steps simultaneously. For anyone building agent swarm architectures this is not a minor spec bump — it fundamentally changes what you can attempt in a single workflow. There is also a new capability to turn files like PDFs, spreadsheets, and slides into agent skills, which opens up a broader class of knowledge work tasks beyond pure coding.

One honest caveat from the team: the model is creative, sometimes unusually so. That is a polite way of saying it may go in unexpected directions if you give it vague instructions. Clear, specific prompts are especially important here. When you do that, the payoff is a model that minimizes repetitive overhead and stays on task across very long sessions.

**Key takeaways:**

- Kimi K2.6 is open-weight from release day, available via Kilo Code, Kilo CLI, VS Code and JetBrains extensions, Hermes, and KiloClaw
- SWE-Bench Verified score: 80.2%; SWE-Bench Pro: 58.6%; Terminal-Bench 2.0: 66.7%
- Real-world test: 13 hours continuous, 1,000+ tool calls, 4,000+ lines modified, 185% throughput gain
- Multi-agent scaling: up to 300 sub-agents, 4,000 coordinated steps (up from 100 sub-agents / 1,500 steps in K2.5)
- Supports converting documents (PDFs, spreadsheets, slides) into agent skills
- Requires specific instructions; the model's creativity can be a liability with vague prompts

**Why do I care:**

From a frontend architect's perspective, the most interesting thing here is not the benchmark score — it is the 13-hour autonomous run. Most discussions of AI coding assistants treat them as interactive tools, something you ping and get a response from. A model that can stay coherent and productive across thousands of tool calls in a single session is a different category of tool. That has real implications for how you think about automated code review pipelines, refactoring automation, or long-running test generation tasks. The 300 sub-agent ceiling also matters if you are exploring agent-per-service architectures for large monorepo work. The open-weight part is not just philosophically appealing — it means you can self-host it, audit its behavior, and not worry about API availability during a critical deployment window.

**Link:** [Kimi K2.6 Announcement](https://blog.kilo.ai/p/kimi-k26-has-arrived-an-open-weight)
