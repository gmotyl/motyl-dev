---
title: "GPT-5.5 vs Claude Opus 4.7: Five UIs, One Honest Comparison"
excerpt: "Kilo gave both frontier coding models the same five UI prompts and one-shot rendered the results. The verdict on taste, prompt adherence, and which output is closer to ship-ready is more interesting than the headline."
publishedAt: "2026-04-28"
slug: gpt-55-vs-claude-opus-47-five-uis-comparison
hashtags: ["#kilo", "#ai", "#coding-assistants", "#frontend", "#design", "#gpt55", "#claude", "#ui", "#tailwind", "#generated", "#en"]
source_pattern: "Kilo"
---

## GPT-5.5 vs Claude Opus 4.7: Five UIs, One Honest Comparison

**TLDR:** Kilo ran both GPT-5.5 and Claude Opus 4.7 through five identical UI prompts (landing, dashboard, settings, sign-up, pricing) using Kilo CLI in Code mode at high reasoning, single-shot output, Tailwind via CDN. Opus produced more varied, more on-brief work with better typographic instincts; GPT-5.5 leaned on a generic modern-SaaS template and missed three prompt requirements outright. Opus is roughly 20% cheaper per output token, which makes the comparison even less flattering for the OpenAI side.

**Summary:**
The setup is the kind of test I always want to see and rarely do. Same prompts, no iteration, no shared state, identical mode and reasoning level, just one self-contained index.html out of each model. The prompts were deliberately vague on visual decisions, which is the part I find most useful, because that is exactly how you and I prompt these things in practice. Nobody hands a model a fully spec'd design system at 11pm before a demo.

The biggest difference is not raw quality. It is design vocabulary. Opus 4.7 made its five outputs look like five different products. Different palettes, different type pairings, different density per surface. Its pricing page used a warm cream background with a charcoal middle tier pushed forward by z-index overlap. Its landing page paired sans-serif with an italicized serif accent on a single word. The settings page used the standard left-sidebar pattern with a floating unsaved-changes toast pinned bottom-right, the way Linear does it. That is not template work, that is taste being applied per context.

GPT-5.5 reused the same modern-SaaS template across all five surfaces. Soft card shadows, blue or purple accent on dark, two weights of sans-serif. The dashboard suffered most because it had the same density as the landing page, which means it read as under-packed when a dashboard should be tight and information-dense. And it missed three prompt requirements: the in-hero CTAs on the landing, Save/Cancel on the settings page, and the log-in link on the sign-up screen. Those are not subjective taste calls. Those are explicit instructions that got dropped.

Opus did not escape unscathed. Its pricing card overflowed because the layout was more ambitious than the content allowed for, a one-line CSS fix but a real bug. The trade-off is honest: Opus reached further and broke slightly, GPT-5.5 played it safer and shipped a working but generic page. Both outputs would need a designer-engineer pass before going anywhere near production, but Opus's set is a better starting point because the foundational decisions (palette, type, density) are already aligned with the brief.

The cost angle ties it together. GPT-5.5 is $30 per million output tokens versus Opus 4.7 at $25, so you pay 20% more for the output that needs more cleanup. That math doesn't shake out in OpenAI's favor for greenfield UI work right now, even if the gap on raw reasoning has clearly closed.

**Key takeaways:**
- Opus 4.7 picks density and palette per surface; GPT-5.5 applies one template everywhere.
- GPT-5.5 missed three explicit prompt requirements across five tasks; Opus missed zero (had one CSS overflow bug).
- The "template to custom design" gap has narrowed but Opus still owns it.
- For a real product surface you plan to refine, Opus is the faster starting point. For throwaway mockups, GPT-5.5 is fine.
- GPT-5.5 costs 20% more per output token while producing work that needs more cleanup.

**Why do I care:**
Because this is the test I keep wanting to run myself and never quite get around to. Vibes-based comparisons of frontier models are everywhere, and most of them are noise. Five tasks, identical prompts, single-shot, screenshots in the post is the format I trust. As a senior frontend person, I have spent enough time deleting AI-generated UI to know the difference between "this is a starting point" and "I need to throw this away and try again." Opus producing five outputs that look like five different products matters because the alternative is the thing I dread, opening every new project to find the same dark gradient hero with a purple accent and two weights of Inter. Taste is a real axis. It compounds across every prompt you send for the rest of the year. And the cost inversion is the kicker, the better-looking output is also the cheaper one, which is not where I expected the market to land six months ago. I'd still keep both in the toolbox, GPT-5.5 for fast scaffolding when the visual layer doesn't matter yet, Opus when I actually want the prototype to suggest a product. But for any work where the design has to feel chosen rather than templated, the answer is currently obvious.

**Link:** [We Asked GPT-5.5 and Claude Opus 4.7 to Design 5 UIs](https://blog.kilo.ai/p/we-asked-gpt-55-and-claude-opus-47?publication_id=4363009&post_id=195674022&isFreemail=true&triedRedirect=true)
