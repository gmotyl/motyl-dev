---
issueNumber: 12
week: '2026-w20'
weekLabel: 'Week 20 (May 11 – May 17, 2026)'
publishedAt: '2026-05-24'
image: 'https://img.motyl.dev/blog/motyl-dev-12.webp'
---

# motyl.dev Weekly #12: Week 20 (May 11 – May 17, 2026)

> A curated digest of what I found worth reading this week.

This week leans into the unglamorous side of working with agents, how long they actually run, what they cost once you scale them, and where their memory really lives. The model news took a quieter week, and the interesting movement is in the layer underneath, databases, memory systems, and the operational habits that make agents survivable. A few pieces step out of the AI frame entirely to revisit older questions about scope, learning to code, and who your product is even built for.

## 🤖 AI

**[Long-running Agents](https://addyo.substack.com/p/long-running-agents)**
Addy Osmani lays out the three problems that bite once an agent has to work for days instead of minutes, finite context, no persistent state, and the model's inability to honestly grade its own work. The piece is rich with practitioner patterns like the Ralph loop and reads as a real engineering brief rather than a hype post. If you've watched an agent declare victory at thirty percent complete, this maps the territory.

**[Anthropic Repriced My Agent. Four Mitigations Before June 15.](https://thoughts.jock.pl/p/anthropic-agent-sdk-billing-split-mitigations-june-15-2026)**
A pragmatic field report on Anthropic's pricing split and what to do about it before the new rates land. The four mitigations are tactical and immediately actionable, useful if your agent margins were already thin.

**[AI Started Making Creative Decisions For You](https://techtiff.substack.com/p/ai-creative-direction-control)**
On the slow ceding of creative direction to defaults baked into generative tools. The piece argues the loss is less about output quality and more about taste, the muscle atrophies when the model keeps offering acceptable answers.

## 🛠️ Tools

**[It's 2026, Just Use Postgres](https://hackernoon.com/its-2026-just-use-postgres)**
The annual reminder, restated with fresh urgency. Vector search, queues, full-text, JSON, geospatial, Postgres has quietly absorbed most of the reasons teams used to reach for a second database.

**[Your File System Isn't Agent Memory](https://www.decodingai.com/p/understanding-neo4j-graph-agent-memory-system)**
A case for graph-backed memory over flat files when agents need to recall structured relationships across sessions. Neo4j is the example, but the broader argument is that "dump it in a folder" stops scaling the moment your agent needs to reason about who-knows-what.

**[Top 17 AI Testing Tools in 2026 (+ Claude Bonus)](https://hackernoon.com/top-17-ai-testing-tools-in-2026-claude-bonus)**
A roundup of the current testing-tool landscape with a Claude-specific addendum. Useful as a map if you're picking one this quarter and don't want to re-research the space yourself.

## 💻 Coding

**[Should You Still Learn Coding in the Age of AI?](https://app.daily.dev/posts/exVUdZBvk)**
The recurring question, asked again with the benefit of two more years of agent-assisted work to look back on. The honest answer is still yes, but the curriculum has shifted.

## 📰 Other

**[Scope Is The Steering Wheel](https://tidyfirst.substack.com/p/scope-is-the-steering-wheel)**
Kent Beck on scope as the lever you actually control when everything else feels fixed. Short, sharp, and a useful companion to last week's piece on widening scope to find the real problem.

**[600+ Million People Write Right-to-Left: 2 Fixes Your App Needs](https://evilmartians.com/chronicles/600-million-people-write-right-to-left-2-fixes-your-app-needs)**
Evil Martians on the two concrete CSS and layout fixes that get most apps from broken to usable in RTL. A practical reminder that the long tail of accessibility includes hundreds of millions of users your product probably ignores.

**[SVG Studio: Animate Everything](https://svgstudio.org)**
A browser-based studio for SVG animation. Worth bookmarking next time you need motion on the marketing site and don't want to bring Lottie or a heavier animation runtime along.

**[RMUX on GitHub](https://github.com/Helvesec/rmux)**
A lightweight terminal multiplexer project. Niche, but if you live in tmux and have opinions about it, the diff is interesting.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
