---
title: "Building Pi: Self-Modifying Software and the Case for Slowing Down"
excerpt: "The creator of Pi and the creator of Flask sit down to talk about AI agents, code quality, automation bias, and why friction in software delivery is actually a good thing."
publishedAt: "2026-04-30"
slug: "pragmatic-engineer-20260430"
hashtags: ["#softwareengineering", "#aiagents", "#programming", "#devtools"]
---

## TLDR

Mario Zechner built Pi, a minimalist self-modifying AI coding agent, because Claude Code started behaving unpredictably as it grew. In a conversation with Armin Ronacher (the creator of Flask), they dig into what AI agents are actually doing to code quality, why junior engineers are still more valuable than agents, and why the tech industry desperately needs to slow down.

## The Origin of Pi: When Your Tools Become Unpredictable

Mario Zechner started with Claude Code and liked it. Then as the team kept shipping features, the tool's behavior changed in ways he couldn't anticipate. Bugs multiplied. So he built Pi with one guiding principle: as few features as possible. Stability over velocity.

What makes Pi interesting isn't just the minimalism. It's that Pi can modify itself. Users can create specialized harnesses for specific tasks. The same hammer doesn't work for every construction job, and Mario's betting that bespoke, task-specific AI harnesses are where this whole thing is heading. Peter Steinberger's OpenClaw is built on top of Pi, which is real evidence that the concept has legs.

I keep thinking about this as a swing back to Unix philosophy after years of monolithic, feature-packed tools. Small, composable, predictable. There's something refreshing about that.

**Link:** [Building Pi, and what makes self-modifying software so fascinating](https://newsletter.pragmaticengineer.com/p/building-pi-and-what-makes-self-modifying?publication_id=458709&post_id=195661847&play_audio=true&triedRedirect=true)

## Automation Bias Is the Real Problem

Here's what gets me about this episode: the technical risks of AI agents are well understood. The social and psychological risks are not.

Armin surveyed 30+ engineering teams and found code quality is down across the board. Serious projects are shipping with what he calls "vibe slop." The root cause isn't the AI itself, it's automation bias. Once a dev confirms that an agent can produce acceptable output, they review its code less carefully. The agent's quality isn't guaranteed by its past performance, but humans stop acting like that's true.

Mario puts it plainly: agents don't feel pain. A junior engineer who writes a terrible abstraction and then has to maintain it for six months learns something. They feel the friction. An agent will happily extend that same terrible structure forever because it has no skin in the game. Humans rewrite bad interfaces because maintaining them hurts. Agents don't experience that.

The conclusion here isn't "don't use agents." It's "don't trust them on autopilot."

## When Senior Engineers Lose the Ability to Say No

This was the part of the conversation I wasn't expecting. Armin talks about a new dynamic emerging where senior engineers push back on bad ideas, and more junior engineers and product managers respond with agent-scripted counterarguments. Elaborate, well-structured, citation-filled cases for the bad idea.

Saying "no" used to be a power move for senior engineers. It kept complexity at bay. Now, that veto is being challenged by AI-generated argumentation that can outlast anyone's patience in a code review thread.

More bad ideas are making it into production as a result. Decision-making becomes exhausting when you have to argue against an AI-assisted brief every time someone wants to add complexity. That's a genuinely new kind of organizational problem, and nobody has good playbooks for it yet.

## Friction Is Not the Enemy

Armin's take on frictionless shipping is worth sitting with. The industry has spent years treating friction as waste, optimizing CI/CD pipelines to get code into production faster. But some friction is load-bearing.

Multi-reviewer approvals on critical services. SLO gates. Migration checklists. These things make humans stop and think. Remove them in the name of speed and you remove the moments where judgment gets applied.

Mario's post about slowing down, written from Austria where he apparently spends time hiking with his kids and not doom-scrolling AI Twitter, makes a point that's easy to dismiss but hard to argue with: not being inside the Bay Area hype machine helps you see things more clearly. Physical distance from San Francisco as a source of epistemic grounding. I'm not sure he's wrong.

## Key Takeaways

- Pi was built because Claude Code became unpredictable as features were added; minimalism and stability were the response
- Self-modifying software that builds specialized harnesses per task might be the actual future of AI tooling
- Automation bias, not AI capability, is driving the decline in code quality across engineering teams
- Junior engineers are more valuable than AI agents because they feel the pain of bad code and learn from it
- AI makes it harder for senior engineers to say no, because junior devs can now generate agent-scripted counterarguments
- Some shipping friction is good: it creates moments where human judgment enters the loop
- Staying grounded about AI hype may be partly a function of geography and lifestyle, not just technical rigor
