---
title: "Peter Steinberger on AI-Native Development: 6,600 Commits in January and Shipping Code He Doesn't Read"
excerpt: "The creator of Moltbot shares his radical workflow of running 5-10 AI agents simultaneously, treating PRs as 'prompt requests', and why architecture matters more than ever."
publishedAt: "2026-01-28"
slug: "peter-steinberger-ai-native-development-moltbot"
hashtags: "#substack #ai #agents #architecture #dx #engineering #open-source #generated #en"
---

## The Creator of Clawd: "I Ship Code I Don't Read"

**TLDR:** Peter Steinberger, creator of Moltbot (formerly Clawdbot) and founder of PSPDFKit, made over 6,600 commits in January alone - by running 5-10 AI agents simultaneously. His controversial approach: treat pull requests as "prompt requests" and focus on architecture rather than reading code.

**Summary:**

This is one of those conversations that makes you question everything you thought you knew about software development. Peter Steinberger's Moltbot has become the fastest-growing repository in GitHub history by stars, surpassing even Tailwind CSS's growth trajectory. It's been searched on Google more than Claude Code and Codex combined. And here's the kicker - it looks like it was built by a company, but it's just one person sitting at home having fun.

Peter's background gives context to his approach. He built and scaled PSPDFKit into a global developer tools business with 70+ employees. That experience taught him something crucial: managing a team forces you to let go of perfectionism because code won't always match your exact preferences. That skill transfers directly to working with AI agents - you have to accept that the output won't be exactly what you'd write, but that's okay.

His workflow is genuinely radical. He runs 5-10 agents simultaneously, spending significant time upfront planning and challenging the agent on its approach. Once he's satisfied with the plan, he kicks it off and moves to the next task. He prefers Codex over Claude Code specifically because Codex handles long-running tasks without coming back for clarifications - he finds interruptions distracting when he's already fleshed out a solid plan.

The most provocative insight: Peter now views pull requests as "prompt requests." He's more interested in seeing the prompts that generated code than the code itself. Code reviews as we know them are dead in his workflow - replaced by architecture discussions. Even in Discord, his core team never talks about code; they only discuss architecture and big decisions.

What's missing from the hype, though, is that this approach works precisely because Peter is an exceptional software architect. He keeps the high-level structure of his project in his head and deeply cares about architecture, tech debt, extensibility, and modularity. Moltbot is successful largely because it's so extensible - and Peter spends considerable energy ensuring the project follows his architectural vision. This isn't "anyone can vibe-code now" - this is an experienced architect leveraging AI to execute faster on clear mental models.

For teams and architects, there are several principles worth extracting here. First, close the loop: design systems so agents can compile, lint, execute, and validate their own output. Second, local CI beats remote CI for agent-driven development - waiting 10 minutes for remote CI disrupts the feedback loop. Third, most application code is "massaging data in different forms" and doesn't warrant obsessive attention - focus energy on system design instead. And finally, engineers who thrive with AI care about outcomes over implementation details. Those who love solving algorithmic puzzles for their own sake may struggle to go "AI-native."

**Key takeaways:**
- AI-native development requires strong architectural vision - the agents execute, but you must provide clear direction and structure
- "Prompt requests" may replace pull requests - the prompts that generated code become more valuable than reviewing the code itself
- Close the feedback loop: agents must be able to verify their own work through local compilation, linting, and testing
- Engineers who focus on outcomes over implementation details thrive in this paradigm; puzzle-lovers may struggle

**Tradeoffs:**
- Running multiple agents increases velocity but sacrifices deep understanding of individual code changes
- Under-prompting enables discovery of unexpected solutions but sacrifices predictability and control
- Local CI provides faster feedback but sacrifices the consistency guarantees of standardized remote pipelines

**Link:** [The creator of Clawd: "I ship code I don't read"](https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code)
