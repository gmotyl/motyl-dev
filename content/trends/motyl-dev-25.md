---
issueNumber: 25
week: '2026-w33'
weekLabel: 'Week 33 (Aug 10 – Aug 16, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-25.webp'
publishedAt: '2026-08-23'
---

# motyl.dev Weekly #25: Week 33 (Aug 10 – Aug 16, 2026)

> A curated digest of what I found worth reading this week.

Short issue this week. I'm on vacation — the active kind, so I barely opened my laptop and read almost nothing. Two pieces made the cut, and both are worth your time.

I picked the Tailwind one for a reason. I talked with a frontend dev recently who really doesn't like Tailwind. I get it, and I don't think it's a silver bullet either. But most complaints I hear are about things Tailwind never asked you to do: class lists thirty items long, magic numbers everywhere, a slightly different button in every file. That's not the tool, that's using it without any rules. So maybe learn it properly first, then criticise. This article is a good place to start — it's basically the rules I wish that conversation had started from.

The other one is about staying sharp while an agent writes your code. Small habits, no manifesto.

## ✨ Featured

**[How I Stay Engaged in AI Agentic Development](https://spin.atomicobject.com/engaged-ai-agentic-development/)**
Written as habits rather than opinions, which is why it lands. Verification mixed into the flow instead of bolted onto the end. A map of where models reliably fail — data flow, architecture, following the patterns already in the repo, and scope that grew too big. Small PRs, because orchestration burnout is real and arrives quietly. The part I keep thinking about is the deliberate self-testing: find the file before the agent does, commit to a bug hypothesis before letting it investigate, hand-write something occasionally just to check the muscle still works.

## 🎨 Frontend

**[5 best practices for preventing chaos in Tailwind CSS](https://evilmartians.com/chronicles/5-best-practices-for-preventing-chaos-in-tailwind-css)**
Starts small and compounding — `py-4` over `pt-4 pb-4`, drop the `flex-row` that CSS already defaults to, `border-black/50` instead of a five-class border incantation. Then the two that actually change a codebase: design tokens grouped and named semantically in `@theme`, and fixed variants instead of a `className` prop that lets every caller invent a new button. Evil Martians also packaged the whole guide as an installable agent skill, which is a neat signal of where documentation is heading.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
