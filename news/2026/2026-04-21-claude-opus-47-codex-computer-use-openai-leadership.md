---
title: "Claude Opus 4.7, OpenAI Codex Goes Full Computer-Use, and the Usual Leadership Churn"
excerpt: "Anthropic ships Claude Opus 4.7 with stronger coding and reasoning at unchanged pricing, while OpenAI's Codex gets full computer-control and two product leaders walk out the door."
publishedAt: "2026-04-21"
slug: "claude-opus-47-codex-computer-use-openai-leadership"
hashtags: "#substack #claude #openai #anthropic #generated #en"
source_pattern: "Substac"
---

## Claude Opus 4.7 Is Here, Codex Controls Your Computer, and OpenAI Loses Two Leaders in One Week

**TLDR:** Anthropic released Claude Opus 4.7 with meaningful gains in coding, reasoning, and vision, all at the same price as Opus 4.6. OpenAI simultaneously upgraded Codex to control an entire computer, browse the web, generate images, and run parallel background agents. Meanwhile, OpenAI's product chief Kevin Weil and Sora lead Bill Peebles both exited in the same week.

**Summary:**

Let's start with the obvious: Anthropic released Claude Opus 4.7, and the pricing stayed put. That combination is worth paying attention to. You get better coding performance, sharper reasoning, and improved vision capabilities without paying more. In this industry, price-neutral capability jumps are genuinely rare, and Anthropic is making a clear statement about where they want to compete. The model is already powering Claude Design, a new tool from Anthropic Labs that turns conversational prompts into slides, prototypes, and one-pagers. The design-generation angle is interesting because it targets people who need to produce visual output fast without deep Figma skills.

On the same week, Canva and Anthropic announced a partnership that brings Claude Design capabilities into Canva's engine. You write a text prompt, and you get fully editable, on-brand visuals back without ever opening Canva itself. That is a real workflow change for anyone producing marketing material at scale. The on-brand constraint is the part that matters most: generic image generation is everywhere, but something that respects your existing brand guide is a different proposition.

OpenAI's Codex upgrade is the other story here. This is not just a coding assistant anymore. Codex can now control your entire computer, browse the web, generate images, and run multiple background agents in parallel. That is a significant surface area expansion, and it puts Codex squarely in competition with computer-use approaches coming from Anthropic and others. Running parallel agents in isolated contexts is something developers have wanted for a while, and there is a macOS tool called Lanes that does exactly that for Claude Code, Codex, and Gemini CLI, giving each agent its own isolated git worktree with resumable sessions. Worth bookmarking if you run multiple AI coding sessions simultaneously.

The OpenAI leadership departures deserve a sentence. Kevin Weil, who led product, and Bill Peebles, who led Sora, both left in the same week. The reported reason is a refocus from consumer experiments toward enterprise. Whether that is the full story or not, losing two senior product leaders simultaneously signals some internal tension around priorities. Consumer AI features are expensive to build and hard to monetize compared to enterprise contracts, and OpenAI appears to be making a deliberate bet there.

On the investment side: Gizmo raised $22M Series A after hitting 13 million users on its AI learning app, American Express acquired Hyper (an AI expense management startup backed by Sam Altman) with the deal expected to close in Q2 2026, and Nava raised an $8.3M seed round to build AI financial agents with built-in safety guardrails.

**Key takeaways:**

- Claude Opus 4.7 improves coding, reasoning, and vision at the same price as Opus 4.6
- Anthropic Labs launched Claude Design for generating on-brand slides and prototypes via conversation
- Canva partnered with Anthropic to bring prompt-to-visual generation without opening Canva
- OpenAI Codex now controls full computers, browses the web, generates images, and runs parallel background agents
- OpenAI product chief Kevin Weil and Sora lead Bill Peebles both exited; reported refocus on enterprise
- Gizmo ($22M), Nava ($8.3M seed), and the Hyper/AmEx acquisition mark continued AI investment activity

**Why do I care:**

From where I sit as someone thinking about frontend architecture and developer experience, the Codex expansion to full computer-use is the thing worth watching most carefully. We already had to rethink how we review AI-generated code. Now we need to think about what it means when the agent is not just writing code but actually running the computer. The Lanes tool points at a real pattern: isolated worktrees per agent so you can run multiple parallel sessions without stepping on each other. That is good hygiene and something any team running AI-assisted development should be thinking about now, before the chaos of unmanaged concurrent agents becomes a real problem. Claude Opus 4.7's price-neutral improvement is good news for anyone already using the API in production. Better models at the same cost improve the economics of every AI-assisted workflow you have built.

**Link:** [Claude Opus 4.7 Is Here! Anthropic Just Dropped Its Best Model Yet](https://theaibreak.substack.com/p/claude-opus-47-is-here-anthropic)
