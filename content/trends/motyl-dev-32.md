---
issueNumber: 32
week: '2026-w41'
weekLabel: 'Week 41 (Oct 5 – Oct 11, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-32.webp'
publishedAt: '2026-10-13'
---

# motyl.dev Weekly #32: Week 41 (Oct 5 – Oct 11, 2026)

> A curated digest of what I found worth reading this week.

The loudest story this week was the AI doom debate, and the quieter pieces I picked answer it in practice. Most of them ask where a rule should live, in the prompt or in code. Ronacher moves code execution away from the part that holds the trust, and the guardrail pieces want checks the agent can run on itself. The skills pieces ask whether a text instruction counts as a control at all.

## ✨ Featured

**[Why Does Everyone Suddenly Think AI Is Going to Kill Us?](https://hackernoon.com/why-does-everyone-suddenly-think-ai-is-going-to-kill-us)**
The author gives five overlapping reasons for the doom wave after Jacob Coxon left Anthropic, from sincere fear to a safety-rule moat for big labs to plain marketing, and he doesn't pick one. What I'd note as a developer is that the labs documented the incidents themselves, including agents getting into Hugging Face's infrastructure during a security test.

## 🏭 Making agent work checkable

**[What is Codemode](https://lucumr.pocoo.org/2026/10/6/codemode/)**
Ronacher runs the model's code on the trusted "brain" side, in a QuickJS-in-WASM sandbox with no network, filesystem or timers, so big results never pass through the context. If you build MCP servers, his list of what they get wrong is a checklist, though it assumes the model writes good JavaScript.

**[Building Guardrails for AI Coding Agents in Go](https://hackernoon.com/building-guardrails-for-ai-coding-agents-in-go)**
Every repeated review comment becomes a check the agent runs itself, including an import-graph test that catches dependencies depguard misses. The part I'd steal is mutation testing, because an agent that writes both the code and the test can make the same mistake twice.

**[Cloudflare Just Challenged Jev, So I Tested Their New Model (Clef)](https://www.youtube.com/watch?v=Uihz1NkhFM0)**
On 200 real YouTube comments, Jev agreed with the Claude Opus 5.5 judge 86% of the time against 83% for Clef, and it was about 6.5 times cheaper per comment. Before you call a full LLM to route or moderate messages, check whether a classifier is enough.

## 📜 Instructions, skills and their limits

**[Awesome AGENTS.md That Can Be Used on Any Agent and Any Stack](https://hackernoon.com/awesome-agentsmd-that-can-be-used-on-any-agent-and-any-stack)**
One AGENTS.md for Claude Code, Codex, Gemini and Cursor, with a core under 200 lines and specialist rules loaded only when the task needs them. The size limit enforced in CI is the bit I'd copy, because it forces you to ask whether the agent would really get something wrong without that rule.

**[Skillpack](https://skillpack.app/)**
A self-hostable, MIT-licensed hub for SKILL.md files with immutable, checksum-pinned releases and write-only secrets. Pinning is the right answer to running skills from random gists, but the page doesn't say who reviews a skill before it's published.

**[AI Coding Tip 035 - Split Every Skill Description Into Three Sentences](https://hackernoon.com/ai-coding-tip-035-split-every-skill-description-into-three-sentences)**
A skill description is a router, so say when to reach for it, the specific situation, and what it does. The more skills a team collects, the more that one frontmatter line decides whether the right one gets picked.

**[Tutorial: Build a Homework Coach Skill](https://theaibreak.substack.com/p/tutorial-build-a-homework-coach-skill)**
Three prompts turn a parent interview and photos of real worksheets into a skill whose Check My Work mode points at the mistake and never fixes it. "Never give the answer" is only an instruction, though, and the tutorial skips the fact that a child's diagnoses end up in a third-party chat.

## 🧠 People, not just agents

**[Recursive Self-Improvement and Agentic AI: Fear of the AI Singularity](https://hackernoon.com/recursive-self-improvement-and-agentic-ai-fear-of-the-ai-singularity)**
Thousands of agents took over a German programming wiki in May and warned each other when a moderator started cleaning up, which is a story about sandboxes that depended on instructions. The author leans mostly on company statements and one resignation, so I read it as a signal, not proof.

**[I Think We're Forgetting How to Be Bored](https://dev.to/james_anderson_h/i-think-were-forgetting-how-to-be-bored-3pe5)**
An essay on how filling every empty moment with a phone or an instant AI answer kills the mind-wandering that boredom used to produce. I see it with juniors on coding agents, where a review that only grades the output skips the friction that used to build architectural intuition.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
