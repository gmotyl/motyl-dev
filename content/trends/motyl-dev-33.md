---
issueNumber: 33
week: '2026-w42'
weekLabel: 'Week 42 (Oct 12 – Oct 18, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-33.webp'
publishedAt: '2026-10-19'
---

# motyl.dev Weekly #33: Week 42 (Oct 12 – Oct 18, 2026)

> A curated digest of what I found worth reading this week.

Most of what I saved this week asks who checks the agent's work. Osmani would rather have a better feedback loop than a better model. In Tiger Data's 41-experiment log the human mostly caught the eval lying, and Uber declared a CI code red after agents doubled its job count. Tuncer blames the codebase rather than the model, and the open-weights panel shows why ten steps that each work 95% of the time add up to about 60%. The web platform section at the end has nothing to do with agents, and I was glad of it.

## ✨ Featured

**[Agentic Verification](https://addyo.substack.com/p/agentic-verification)**
Osmani's claim is that writing code stopped being the bottleneck and checking it took its place, and he'd take a much better feedback loop over a slightly better model. He ranks E2E tests as the best oracle because they're hard to game, then adds property-based tests and, for migrations, differential tests against the old system. I agree most with deleting flaky tests on sight, since an agent will just retry until it sees green. I'd push back on "if you can only have one test, make it E2E", because a few paragraphs later he admits those are the slow, flaky ones.

## 🧪 Who checks the agent

**[41 Experiments in 6 Days: What the Human Was Actually For](https://hackernoon.com/41-experiments-in-6-days-what-the-human-was-actually-for)**
Claude Code ran 41 experiments in six days and pushed LoCoMo F1 from 0.392 to 0.666, and the human mostly caught the eval lying. The prompt leaked the question category, and a recall metric counted turn IDs that extracted facts never have. My problem is that the authors measured ±0.04 run-to-run noise and still credit gains of +0.010 and +0.013. It's Tiger Data partner content too, so read the Postgres pitch at the end with that in mind.

**[Your Architecture Is Why Your Coding Agent Keeps Writing Bad Code](https://hackernoon.com/your-architecture-is-why-your-coding-agent-keeps-writing-bad-code)**
Tuncer blames agent-written mess on the codebase, not the model, and prescribes a pnpm and Turborepo monorepo, micro frontends with no horizontal imports, and rule files loaded per module. The rule files are the part I'd take. Rebuilding into micro frontends so an agent behaves is a heavy price, and the "reasoning drops after 3,000 tokens" claim has no source and doesn't match current models.

**[Uber's AI infra, from the inside](https://newsletter.pragmaticengineer.com/p/ubers-ai-infra-from-the-inside)**
Uday Kiran Medisetty walks through Uber's model gateway, a layer that carries skills and plugins between Claude Code, Codex and OpenCode, and spend tiers that managers can raise. The detail I keep thinking about is CI jobs more than doubling in a year, enough for an internal code red. Their fix runs simple checks inside the agent's loop before a PR exists. They now tag PRs as feature, bugfix or maintenance instead of counting them, though a rising feature share could reflect tagging habits as much as impact.

## 🧩 Open models and agent-built demos

**[Open Weights Are Ready for Production. Is Your Stack?](https://blog.kilo.ai/p/open-weights-are-ready-for-production)**
A Kilo, Friendli AI and MiniMax panel says banks and biotech moved open models into production in the last couple of months, for control more than cost. Yunmo Koo's math is the useful bit. A step that works 95% of the time gives you about 60% across a ten-step agent chain. That assumes independent failures and no retries, and the rest is vendor anecdotes without numbers.

**[Remocn](https://remocn.dev/)**
A registry of 395 MIT-licensed animation components that a coding agent stitches into a product demo video, with a local preview player you steer by describing edits. Nothing runs on their servers and the code lands in your repo, which I like. "No need to code" still assumes you're comfortable driving an agent in a terminal though.

## 🎨 Back to the web platform

**[The best way to use icons in Web UIs](https://lea.verou.me/blog/2026/icons/)**
Verou argues icon fonts were right to put icons in CSS and only the font was wrong. Her system stores icons as `--icon-*` custom properties and paints them with a mask on a pseudo-element, so they follow hover, dark mode and RTL without markup changes. Style queries reach about 93% of users, and Safari needs WebKit-sniffing workarounds. I'd still try it in a design system, with the fallback classes she suggests for icon-only buttons.

**[Fingerprints are the new cookies](https://royfish.dev/fingerprints-are-the-new-cookies)**
An interactive page that fingerprints your device and gives you a nickname that survives cleared cookies and a VPN. Its Guess Who explanation of entropy is the clearest I've read, and it ranks browsers from Chrome, which does nothing, to Tor, which makes everyone look alike. The Google story it tells has no sources, so check that part elsewhere.

**[The Color System I Wish I Understood Sooner](https://theadminbar.com/semantics-and-primitives-color-system/)**
Van Deusen's fix is two layers. Primitives hold the hex values, and semantic variables like `--button-background` point at them. It's an introduction for WordPress agencies, and it skips the strongest reason for the semantic layer, which is swapping the mappings for dark mode. One example also points `--color-warning` at an `--orange-500` it never defines.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
