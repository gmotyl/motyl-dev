---
title: "AI Coding meets Code Health: How Loveholidays Ships 80 Times a Day with 60% AI-Written Code"
excerpt: "Stuart Caborn from Loveholidays explains how his team made AI-first engineering work at scale without sacrificing code quality."
publishedAt: "2026-04-17"
slug: "ai-coding-meets-code-health-loveholidays-stuart-caborn"
hashtags: "#refactoring #ai #engineering #code-health #generated #en"
source_pattern: "Substac"
---

## AI Coding meets Code Health — with Stuart Caborn

**TLDR:** Stuart Caborn, Distinguished Engineer at Loveholidays, joins Luca Rossi on the Refactoring podcast to talk through how his team achieved a remarkable engineering setup: over 60% of production code written by AI, each engineer deploying more than 80 times a month, all while keeping a change failure rate under 1%. This is not a thought experiment — it is happening in production today.

**Summary:** The conversation starts with context about Loveholidays itself, which is an online travel agency serving millions of customers. Travel is a domain with real complexity — pricing, availability, integrations with hundreds of suppliers, and tight margins. Getting software wrong in that environment is expensive, which makes the fact that they ship so aggressively with AI assistance all the more interesting.

Stuart's background before this AI-first push is telling. Loveholidays invested seriously in code health before the AI tools arrived. That order of operations matters a lot. The team built a codebase with clear structure, consistent patterns, and measurable quality signals. When AI coding assistants came into the picture, they had something solid to work with and, crucially, something to measure against. Code health was not a nice-to-have — it was the foundation that made AI-assisted development trustworthy.

The shift to becoming an AI-first engineering team was not just about switching on Copilot or a similar tool. Stuart talks about the mental model shift required. Engineers had to learn to work with AI as a genuine collaborator, not just an autocomplete engine. That means writing better prompts, structuring tasks so AI can reason about them, and building habits around reviewing AI output rather than writing everything from scratch. The 80 deployments per month per engineer figure is staggering — it points to very short feedback loops and a team that has internalized continuous delivery deeply.

What keeps this from becoming chaos is the guardrails and review culture Stuart describes. The team did not simply trust the machine and ship. They built processes around verifying AI output, understanding what the AI got right and what it missed, and maintaining human accountability for what goes to production. The change failure rate under 1% — which is the elite tier in DORA metrics — suggests those guardrails are actually working rather than just existing on paper.

There is also a broader theme here about how AI changes the development process itself. The tasks engineers spend time on shift. More time goes into design, architecture decisions, and review. Less time goes into mechanical implementation. Stuart's framing suggests this is not about replacing engineers but about changing what they actually do day to day, with the volume and speed of delivery increasing substantially.

**Key takeaways:**
- Investing in code health before adopting AI tooling creates the foundation for safe, high-velocity AI-assisted development
- An elite change failure rate under 1% is achievable even when 60% of code is AI-written, if review and guardrail processes are strong
- The mental model shift from "AI as autocomplete" to "AI as collaborator" is what drives the real productivity gains
- High deployment frequency (80+ per engineer per month) requires deeply internalized continuous delivery practices across the whole team
- The role of engineers evolves toward architecture, design, and review rather than diminishing — volume and speed increase, not headcount decreases

**Why do I care:** This episode matters to me as someone who thinks about engineering systems at scale. The sequence Loveholidays followed — code health first, then AI — is exactly backwards from how most teams approach it. Most teams bolt AI on top of whatever they have and then wonder why the output is unreliable. The real lesson here is that AI amplifies what is already there. If your codebase is inconsistent, AI will write inconsistent code faster. If it is clean and well-structured, AI becomes a genuine multiplier. The 80-deployments-per-month number is also a useful forcing function for thinking about your own CI/CD pipeline — if you could not do that today, the bottleneck is almost certainly not the AI.

**Link:** [AI Coding meets Code Health — with Stuart Caborn](https://refactoring.fm/p/ai-coding-meets-code-health-with?publication_id=64099&post_id=194274334&play_audio=true&triedRedirect=true)
