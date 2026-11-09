---
issueNumber: 36
week: '2026-w46'
weekLabel: 'Week 46 (Nov 9 – Nov 15, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-36.webp'
publishedAt: '2026-11-09'
---

# motyl.dev Weekly #36: Week 46 (Nov 9 – Nov 15, 2026)

> A curated digest of what I found worth reading this week.

Most of what I saved this week says the model isn't the interesting part anymore. Thoughtworks wants the code around an agent to have an owner and an eval set. Another writer says your rules for the agent belong in scripts that fail, not in Markdown it can ignore. Then comes proof. Agent-authored PRs now outnumber human ones on GitHub, a regression suite can't tell you an agent's change is safe, and OpenAI had to rebuild its Git storage just to keep up with the pushes. I close with three frontend releases, including a 300 ms delay React adds on purpose.

## ✨ Featured

**[The harness is a product](https://www.thoughtworks.com/insights/blog/generative-ai/harness-is-a-product)**
Thoughtworks wants the harness around a coding agent run like a product, with an owner, a test strategy and the rule "no eval, no change". Start with a golden set of 20 to 30 scored tasks from real work, version it with the harness and run it on every significant change. Cost and latency count as metrics, because a better score at double the price isn't an improvement. I lead with it because most teams I see measure tokens and accepted suggestions, which only prove the agent is busy. The warning I'd pin up is that an eval set nobody owns drifts, and one that was representative in March can lie to you by June.

## 🧰 Rules the agent can't argue with

**[Don't Write Markdown Files for Your Coding Agent. Write Scripts.](https://daily.dev/posts/GIqM4P76d)**
AGENTS.md is advice. The agent weighs it, and it can decide the code is right and the docs are stale. The author turns rules into scripts with a pass or fail exit code, wires them into hooks, and backs every local hook with a required CI job. A Claude Code Stop hook that checks sentence length caught 9 violations in 10 responses and sent the agent back to fix them. I agree with nearly all of it. Markdown still has a job for the things no script can check, and the author says so too.

**[Harness Engineering Roadmap: Claude Code From First Principles](https://www.decodingai.com/p/claude-code-from-scratch-harness-engineering-roadmap)**
An open-source course builds a coding agent called Decode in eight lessons. The agent core is about 20 lines of Pydantic AI, and the rest is harness: a sandbox, memory, skills, an LSP tool, compaction, sub-agents and evals. The sandbox lesson exists because an agent deleted half the author's notes, which is an honest way to motivate it. The number I keep is LangChain going from 53% to 67% on Terminal-Bench by changing only its harness.

**[How Anthropic's Dynamic Workflows Coordinate Claude Agents](https://www.latent.space/p/claude-dynamic-workflows)**
In Claude Managed Agents the lead agent can now plan the work, write the orchestration program and decide how many sub-agents to run. The presenters say the bottleneck is humans approving piles of agent PRs, so big agent projects need layers, the way Linux has maintainers. The demo split a stock scan across agents with isolated contexts and added a review phase before the report. It's a vendor talk, and flows cost noticeably more with no numbers given. I'd run my own eval set before paying for it.

**[Anthropic donates Agent Skills to AAIF](https://x.com/ClaudeDevs/status/2113328526413996100)**
Agent Skills now belongs to the Agentic AI Foundation, with a technical committee that includes Google, Microsoft and OpenAI. More than 70 platforms already integrate it. I'm glad it's no longer one vendor's format, and the timing is funny next to the scripts piece, since a skill is mostly a Markdown procedure. Nobody has said how implementations will be tested against each other. That decides whether a skill written for one agent really runs in another.

## 🧪 Proving the change works

**[Test the Diff, Not the App](https://hackernoon.com/test-the-diff-not-the-app)**
A regression suite checks what the team already knows, so it stays green while an agent PR breaks something nobody covered. The proposal is to read the diff, work out what it could break, generate new tests and run them on a preview environment before merge, then post the result to the PR. The Faros numbers behind it are grim. PRs merged with no review are up 31.3% and median review time is up 441.5%. The author still keeps a small regression suite for payments and login, which is the right call.

**[The state of the tech industry in 2026](https://newsletter.pragmaticengineer.com/p/the-state-of-the-tech-industry-in)**
The Pragmatic Engineer's LDX3 keynote, written up. Agent-authored PRs on GitHub grew 9x in eight months and passed human-authored ones in August. No VS Code-fork IDE has launched since November 2025, and Uber's migration of 600,000 JUnit 4 tests shows years of work fitting into weeks. The line about code review turning into theatre ties straight back to the diff-testing piece. If PR volume grew 9x, a human reviewer can't be the only gate.

**[Scaling Git at OpenAI](https://openai.com/index/scaling-git-at-openai/)**
Codex running in parallel flooded OpenAI's monorepo with branches, pushes and fetches until reliability sometimes fell below 90%. Their fix, Pando, is a Git storage backend that still speaks the normal protocol. It gives up global consistency, so pushes to unrelated branches don't wait on each other, and it reuses packfiles instead of building one per client. Median push latency fell almost 80% at close to a petabyte a day. Most of us won't hit this scale, but it shows where agent load breaks things first.

## ⚛️ Frontend, still shipping

**[React.lazy, Suspense and the Hidden 300 ms Startup Delay](https://tabwidgets.com/blog/react-lazy-suspense-delay)**
The Tab Widgets team had code ready at about 100 ms and widgets on screen at about 380 ms. A lazy component always suspends on its first render, even when the code is loaded, and React reveals suspended content at most once every 300 ms to avoid flicker. You can't configure that throttle. Their fix renders their own placeholder and relies on React private fields, so a test has to guard it. Worth a look if your app loads from disk or cache and still feels slow.

**[Next.js 16.4](https://nextjs.org/blog/next-16-4)**
Cache Components are now the recommended model, on by default in create-next-app and set to become the default in Next.js 17. `export const ensureStatic` fails the build if dynamic content leaks into a static route, which is the kind of guarantee I want. `await navigation()` keeps chosen content out of prefetching. If you were waiting for Cache Components to settle, this is the release to start on.

**[Announcing Vite+ 1.0](https://voidzero.dev/posts/announcing-vite-plus-1-0)**
VoidZero puts the runtime, package manager, linter, formatter, test runner and bundler under one config, tested together, so an upgrade is one version bump. Oxlint is 50 to 100x faster than ESLint and Oxfmt up to 30x faster than Prettier. Tiptap replaced separate Vite, Vitest, tsup and Oxc configs with it. I'm interested and a bit wary, because one toolchain also means one vendor deciding when all your tools move.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
