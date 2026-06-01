---
title: "Measuring AI Leverage, Not AI Usage: Why Context Layers Are the Real Unlock"
excerpt: "The Refactoring newsletter argues that teams measuring AI by lines of code or tokens are asking the wrong question — real leverage is about how little context humans need to provide for AI to do good work."
publishedAt: "2026-06-01"
slug: "ai-leverage-context-layers-measuring-effectiveness"
hashtags: "#Refactoring #ai #agents #engineering #dx #architecture #productivity #teams #generated #en"
source_pattern: "🌀 Refactoring"
---

## AI Leverage, Bottom Line Up Front, and Context Layers

**TLDR:** Real AI leverage is measured by how much useful output you get per unit of human input — not tokens spent or code generated. The teams pulling ahead are building context layers that let agents understand system conventions so prompts can stay short and results stay accurate.

Luca's framing here cuts through the noise on a question a lot of engineering organizations are currently answering badly. Most teams that are "measuring AI adoption" are counting the wrong things. Lines of code attributed to AI completions tells you almost nothing about actual productivity improvement. Teams can optimize for that metric by writing exhaustive specs — essentially pseudo-code — that the AI then just translates to final syntax. The human still did the hard intellectual work. The AI just handled the typing.

The more useful question is: how much context does a human have to provide before the AI can do a good job? Some context will always be task-specific. If you're asking an agent to add a button, it needs to know where the button goes and what it does. But a huge portion of what engineers currently put in prompts shouldn't have to be there: the design system conventions, the testing patterns, the architecture decisions made six months ago, the specific component library the team has standardized on. That's not task context. That's system context. And if you're re-providing it every time, you're doing it wrong.

This is where the context layer concept comes in. Tools like Unblocked (mentioned as a sponsor but the concept stands on its own) position themselves as the layer that turns your codebase, docs, tickets, and team discussions into structured context that agents can pull from automatically. The prompt gets shorter. The result quality goes up. The correction loop shrinks. That's the actual leverage improvement.

The leverage scale Luca describes is worth internalizing. At the bottom, negative leverage: teams spending more time fighting the AI than they would have spent doing the work themselves. Then low leverage: AI writes code, but humans write exhaustive instructions. Then high leverage: the AI reuses enough system context that prompts stay short and results stay consistent. Most teams I observe are somewhere between low and high leverage, stuck in a mode where individual developers have found good workflows but the context isn't shared or systematized, so the next developer on the same codebase starts from scratch.

**Key takeaways:**
- Measuring AI by lines of code or tokens spent is misleading — it can be gamed without producing real leverage
- Real leverage = useful output per unit of human input
- Task-specific context is unavoidable; system context (conventions, patterns, constraints) shouldn't have to be re-provided every time
- Context layers that encode system understanding let agents produce better results with shorter prompts
- Teams systematizing context are pulling ahead of teams where only individual contributors have good AI workflows

**Why do I care:** This is the conversation I want engineering leaders to be having with their teams right now. The question isn't "are we using AI?" — it's "are we organized in a way that makes AI effective?" That requires investing in shared context artifacts: well-maintained ADRs, living architecture docs, consistent tooling. The teams that treat that as an AI-readiness investment are going to compound their productivity gains faster than teams that let individual developers figure it out on their own. The leverage model gives you a concrete way to talk about this with people who want to see numbers.

**Link:** [AI leverage, bottom line up front, and great talks](https://refactoring.fm/p/ai-leverage-bottom-line-up-front)
