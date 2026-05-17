---
issueNumber: 11
week: '2026-w19'
weekLabel: 'Week 19 (May 4 – May 10, 2026)'
publishedAt: '2026-05-17'
image: 'https://img.motyl.dev/blog/motyl-dev-11.webp'
---

# motyl.dev Weekly #11: Week 19 (May 4 – May 10, 2026)

> A curated digest of what the I found worth reading this week.

This week the discourse zoomed out. Several pieces stop asking how to use AI faster and start asking what stays when the model writes the code — the shape of dependencies, the source of truth, the practices we keep, and the meaning that work still carries. The architecture conversations got sharper, the productivity ones got more honest, and the existential ones got louder.

## 🏗️ Architecture

**[There are only four sensible ways to build a website](https://www.jonoalderson.com/conjecture/four-ways-to-build-a-website/)**
Jono Alderson collapses the modern web stack into four legitimate archetypes and argues the rest are accidents. A clarifying read if you've ever felt the SSR/SSG/SPA/MPA discourse was eating its own tail.

**[Projecting React](https://tannerlinsley.com/posts/projecting-react)**
Tanner Linsley used an AI agent to build a 10 KB React-compatible runtime for TanStack Start — 80–85% smaller than React, 2–3× faster SSR, already running in production. The point isn't the library; it's that "project your dependency to your actual shape" is now a weekend project, not a months-long fork.

**[Understanding Complexity Can Make Life and Work Less Complicated](https://hackernoon.com/understanding-complexity-can-make-life-and-work-less-complicated)**
A primer on distinguishing complicated systems (knowable, decomposable) from complex ones (emergent, irreducible) — and why conflating them breaks both engineering and management.

## 🧪 Productivity

**[Claude Code for Real Engineers (AI Hero)](https://www.aihero.dev)**
Matt Pocock's AI Hero is shaping up to be the serious-engineer counterweight to vibe-coding tutorials. Worth a look if your relationship with Claude Code still feels improvisational.

**[Skills Changelog: /handoff, /prototype, /review and /writing](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing)**
Concrete additions to the AI Hero skills catalog. Worth a skim if you're curating your own skill library and want to see how someone else is structuring the surface area.

**[Cowboy Coder Is Back. This Time, They Scale](https://blog.kilo.ai/p/cowboy-coder-is-back-this-time-they)**
The Kilo team makes the case that the lone cowboy coder archetype, long suppressed by process and review culture, is structurally back — only now with an army of agents. Half celebration, half warning.

**[Inside Kilo Speed: The Engineer Who Teaches Teams How to Think in Agents](https://blog.kilo.ai/p/inside-kilo-speed-the-engineer-who)**
A profile of what teaching agentic thinking actually looks like inside a company. The interesting bit is less the tooling and more the cognitive habits engineers have to unlearn.

**[Software engineering may no longer be a lifetime career](https://www.seangoedecke.com/software-engineering-may-no-longer-be-a-lifetime-career/?ref=motyldev)**
The uncomfortable framing: the half-life of the discipline as we currently practice it may be shorter than the working lives of people in it. Worth sitting with even if you disagree.

## 🤖 AI

**[If AI Trains Mostly on AI Text, Where Does New Knowledge Come From?](https://hackernoon.com/if-ai-trains-mostly-on-ai-text-where-does-new-knowledge-come-from)**
The recursive training problem stated plainly. As model-generated text saturates the web, the epistemic question of where genuinely new signal enters the system is no longer hypothetical.

**[Don't overestimate domain expertise](https://www.architecture-weekly.com/p/dont-overestimate-domain-expertise)**
Oskar Dudycz pushes back on the comforting "AI can't replace deep domain knowledge" trope. Domain expertise matters, but not always where you think — and a lot of what passes for it is pattern-matching the LLM does cheaper.

**[The Browser Is Becoming an AI Operating System](https://hackernoon.com/the-browser-is-becoming-an-ai-operating-system)**
The browser was already the most important OS on the planet; native AI APIs and agent frameworks are turning it into a context-aware execution environment. Concentration of that layer in three companies is the part nobody is happy about.

## 📰 Other

**[How to Survive the Agentic AI Era](https://hackernoon.com/how-to-survive-the-agentic-ai-era)**
Mert Satilmaz treats agents as new principals in the security model — with credentials, tool access, and adversarial inputs that can hijack them. The prompt-injection-as-SQL-injection analogy is apt, and most teams are about where the industry was on SQLi in 2003.

**[When code is cheap, and spec stale right after it's written, what will be source of truth?](https://blog.reqproof.com/p/code-spec-or-requirement?ref=motyldev&hide_intro_popup=true)**
The question every team using agents eventually has to answer. If code is ephemeral and specs rot on contact with reality, the locus of truth has to move somewhere — tests, intent, or something we haven't named yet.

**[Thinkie: Wider Scope](https://tidyfirst.substack.com/p/thinkie-wider-scope)**
Kent Beck on the cognitive move of deliberately widening scope to find the real problem. Short, sharp, and a useful counterweight to the agent-driven instinct to ship the first thing that compiles.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
