---
title: "From Coder to Architect: How AI Agents Enable Parallel Development Workflows"
excerpt: "An engineer's workflow transformation from single-threaded coding to orchestrating multiple AI agents, shipping an MVP in his first week at a new company."
publishedAt: "2026-01-28"
slug: "architect-mode-ai-agents-parallel-development"
hashtags: "#substack #ai #agents #productivity #dx #architecture #engineering #workflow #generated #en"
---

## Inside Kilo Speed: How One Engineer Shipped an MVP in His First Week

**TLDR:** A software engineer transitioned from traditional coding to "Architect Mode" - spending 80% of energy on planning and letting AI agents execute in parallel. Result: a production-ready MVP shipped in his first week, with multiple features developed simultaneously while agents run in the background.

The story of Evgeny Shurakov's transition from Automattic to Kilo illustrates something important about how AI is changing the developer role. He was hired on a Wednesday, started Monday, made his first commit that same day, demoed a Vercel-like deployment tool Tuesday, and had a working MVP by Friday. At most companies, a project of that scale would spend the first week in discovery.

The secret isn't working harder - it's a fundamental shift in what the work actually is. Evgeny describes his role as transitioning to "Architect Mode": "I don't write as much code now, but I plan things and help AI to write what I have in mind. My job has transitioned more to planning, reviewing, and guiding."

His workflow breaks down into three phases. First, information aggregation - using Perplexity to search documentation and gather technical requirements. Second, architectural drafting - iterating on a plan in Architect Mode until it's solid. "If things are wrong or unspecified, things will go wrong once you send the plan to the AI. You have to figure out the plan beforehand." Third, orchestrated execution - handing the plan to Orchestrator Mode to execute tasks sequentially.

The parallel execution model is where the real leverage comes from. While an Orchestrator session runs in the background executing a complex plan (which can take 10-20 minutes), Evgeny doesn't sit idle. He starts planning another feature, kicks off small fixes via Slack-based agents, or handles human-centric tasks. By the time he finishes one thing, the AI has generated a pull request for something else entirely.

This parallelization extends to the administrative overhead of engineering - what he calls the "connective tissue." PR creation, commit messages, acting on code review feedback, fixing linting errors - all offloaded to automation. "I really don't like creating pull requests or coming up with commit messages. I have a workflow that checks my changes and creates the PR automatically."

The safety net for shipping fast is a layered review process: local pass with AI reviewer to catch logic flaws before committing, automated PR scanning, and mandatory human review for design decisions and pattern consistency. Speed doesn't mean skipping quality - it means automating the parts that don't require human judgment.

For architects and team leads, the cultural shift is worth noting: "Some companies take half a year to release a feature because they want to do it right from the first attempt. But you don't know what's right until you listen to users." The approach is aggressive scoping down, shipping the minimum viable version, and extending later based on feedback. Deploy once or twice a day, set up alerts, fix issues immediately.

The adoption path doesn't require organizational buy-in. Much of it is mental: stop coding, start planning. Spend 80% of energy on the discovery document and plan. Identify one-shot tasks (boilerplate, tests, PR descriptions) and let agents handle them while you solve core logic. Brainstorm with humans or AI before reaching the implementation phase.

**Key takeaways:**
- "Architect Mode" shifts the job from writing code to planning, reviewing, and guiding AI execution
- Parallel agent execution means working on multiple features simultaneously while background tasks run
- Aggressive scope reduction enables shipping: "Cut scope to the absolute minimum to get to a usable state"
- Layered review (local AI → automated PR scan → human review) maintains quality at high velocity
- 80% of energy should go to the plan; poor planning means poor AI execution

**Tradeoffs:**
- Planning-heavy workflows increase upfront investment but reduce downstream iteration and rework
- Aggressive shipping velocity enables faster user feedback but requires robust alerting and quick-fix culture
- Offloading administrative tasks to agents improves focus but requires trust in automation quality

**Link:** [Inside Kilo Speed: How One Engineer Shipped an MVP in His First Week](https://blog.kilo.ai/p/inside-kilo-speed-how-one-engineer-971)

---

*The content above is AI-generated based on newsletter sources. While I strive for accuracy, please verify critical information from original sources.*