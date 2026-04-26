---
issueNumber: 8
week: '2026-w16'
weekLabel: 'Week 16 (Apr 13 – Apr 19, 2026)'
publishedAt: '2026-04-26'
image: 'https://img.motyl.dev/blog/motyl-dev-8.webp'
---

# motyl.dev Weekly #8: Week 16 (Apr 13 – Apr 19, 2026)

> A curated digest of what I found worth reading this week.

A quieter week than the last, but a more reflective one. The thread running through it: people are starting to write down what they've actually learned from a year of agent-assisted development , not the hype, not the demos, the operational stuff. How to structure a CLAUDE.md after a thousand sessions. What harnessing actually means when an agent is in production. Why "AI computes but doesn't think" isn't a philosophical pose, it's something you feel in your codebase three months in. Around it: Railway leaving Next.js, pnpm 11 quietly rolling toward release, and a couple of pieces about the long-term maintenance bill of code an AI wrote but no one read.
This week I have few intresting tools to share. I remember when Postman was lighweight and simple, now it is a monster + subscription. I tested Kivo and even though it is on early stage (binary did not woorked on my macbook, so I had to comile from sources), it has a potential to be a great tool for testing and debugging these APIs.

## 🤖 AI

**[How I Structure CLAUDE.md After 1000+ Sessions](https://thoughts.jock.pl/p/how-i-structure-claude-md-after-1000-sessions)**
Hard-won, opinionated patterns from someone who has actually run the experiment. If your CLAUDE.md is still the boilerplate that came with the project, this is the post that will make you sit down and rewrite it.

**[Claude Stopped Guessing What You Meant](https://techtiff.substack.com/p/how-to-prompt-opus-4-7)**
A look at the prompting shifts that come with Opus 4.7 , namely that it stops over-interpreting and asks more often. The piece is practical: what changes in your prompts, what changes in your harness, and where the friction has moved.

**[Agent Harnessing: The Non-Model Infrastructure That Makes AI Agents Actually Work](https://hackernoon.com/agent-harnessing-the-non-model-infrastructure-that-makes-ai-agents-actually-work)**
The argument that the model is the boring part now. What separates a flaky agent from a useful one is the scaffolding around it , context plumbing, tool routing, memory, retries, evals , and that work is where a lot of the actual engineering is happening in 2026.

**[The Eternal Junior: Why AI Computes but Does Not Think](https://hackernoon.com/the-eternal-junior-why-ai-computes-but-does-not-think)**
A grounded take on the "thinking" framing. The author's claim is that LLMs occupy the role of a permanent junior engineer , fast, eager, sometimes brilliant, but lacking the architectural taste that comes from carrying systems through their second and third year.

## 🎨 Frontend

**[Awesome Design Skills for Claude, Codex, Cursor, and Other AI Coding Agents](https://github.com/bergside/awesome-design-skills?ref=motyldev)**
A curated list of design-oriented skills for the major coding agents. Worth a scan if you're building a skills library for your team and trying to work out which ones actually move the needle on UI work.

**[Making Your Site Visible to LLMs: 6 Techniques That Work, 8 That Don't](https://evilmartians.com/chronicles/how-to-make-your-website-visible-to-llms)**
Evil Martians do their usual thing of cutting through the noise. SEO is being quietly rewritten by AI-assisted browsing and answer engines, and a lot of the folk wisdom around llms.txt and structured data is half right at best. This sorts the signal from the cargo cult.

**[Moving Railway's Frontend Off Next.js](https://blog.railway.com/p/moving-railways-frontend-off-nextjs)**
Railway migrated their entire production frontend , dashboard, canvas, marketing , from Next.js Pages Router to TanStack Start + Vite in two PRs with zero downtime. Build times went from 10+ minutes to near-instant. The deeper point is that Next.js's server-first defaults are overhead for apps that are intentionally client-driven, and the alternative is finally good enough to take seriously.

## 🏗️ Architecture

**[The Mighty Metaphor](https://architectelevator.com/transformation/mighty-metaphor/?ref=motyldev)**
A short reflection on how the metaphors we choose for our systems silently shape the systems themselves. "Pipeline," "factory," "marketplace" , each one reaches for different parts of your toolkit. Worth reading if you're about to name something important.

## 💻 Coding

**[Break the Loop, Part 2: From Data Structures to Computational Control](https://hackernoon.com/break-the-loop-part-2-from-data-structures-to-computational-control)**
Continuing the thread on iteration alternatives. The piece moves from what data you're holding to how you're stepping through it, with concrete examples of where loops obscure intent and where they're still the right call.

**[The Black Box Problem: Why AI-Generated Code Stops Being Maintainable](https://app.daily.dev/posts/the-black-box-problem-why-ai-generated-code-stops-being-maintainable-7ovjc2yg0)**
The honest accounting of a question we'll all have to answer eventually: code generated quickly, accepted without close reading, and shipped without anyone holding the model in their head. The fix isn't to stop generating , it's to change the review threshold.

## 🛠️ Tools

**[GitHub – DevlogZz/Kivo](https://github.com/DevlogZz/Kivo)**
Laighweight, open-source Postman alternative. The UI is a little rough around the edges, but the core features are there and it's free... and I find free a fair price ;)

**[GitHub – 0xGF/boneyard](https://github.com/0xGF/boneyard)**
A small, focused framework that auto-generates skeleton loading states by analyzing your component tree. The kind of utility that disappears into the background and quietly saves a few hours per project.

**[pnpm 11 RC 0 Release Notes](https://github.com/pnpm/pnpm/releases/tag/v11.0.0-rc.0)**
The first release candidate for pnpm 11 is out. Worth scanning the notes now so the upgrade isn't a surprise , pnpm tends to land breaking changes at majors and there are a few here that touch lockfile behavior.

## 🧪 Productivity

**[I Let Claude Diagnose My Data Pipeline Failures for 3 Months: Here's What Actually Happened](https://hackernoon.com/i-let-claude-diagnose-my-data-pipeline-failures-for-3-months-heres-what-actually-happened)**
A field report rather than a benchmark. The author handed Claude their failing pipelines and tracked what worked, what didn't, and where the model was confidently wrong. Useful precisely because it's specific to one person's stack instead of a general claim.

**[I don't want a screenshot of your Claude conversation](https://daverupert.com/2026/04/claude-no/)**
Dave Rupert with a sharp little post on the screenshot-as-receipt culture that's grown up around AI. The complaint isn't about AI , it's about how the medium of "look what it did" obscures whether the work is any good.

## 🎬 Video

**[Building a software factory: Week 1, zero to product](https://ona.com/stories/building-a-software-factory-week-1)**
A first-week diary of standing up a software factory from scratch. Less polished than a conference talk, more useful for the same reason , you see the actual choices being made and the order they're made in. Even if it is oriented around a specific product, the general flow ofbuilding with agents is something most of us are trying to figure out.

**["Clean Code" a Timeless Truth OR a Myth We Keep Telling Ourselves?](https://www.youtube.com/watch?v=OjW_0ZRdN5E)**
Continuous Delivery revisits Clean Code with the benefit of twenty more years of practice. Not a hit piece , more a careful re-reading of which parts have aged into common sense and which parts are starting to look like advice from a different industry.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
