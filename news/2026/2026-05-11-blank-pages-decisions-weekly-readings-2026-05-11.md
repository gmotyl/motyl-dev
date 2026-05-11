---
title: "Blank Pages, Better Decisions, and the Art of Knowing When to Step In"
excerpt: "This week: why starting from scratch is the wrong move, Annie Duke's four-step decision checklist, and three sharp reads on leadership, frustration signals, and AI-generated open source contributions."
publishedAt: "2026-05-11"
slug: "blank-pages-decisions-weekly-readings-2026-05-11"
hashtags: "#refactoring #note-taking #decision-making #open-source #leadership #knowledge-management #generated #en"
source_pattern: "🌀 Refactoring"
---

## The Blank Page Is a Lie

**TLDR:** Starting from scratch on any piece of writing or creative work isn't romantic, it's inefficient. The real work happens before you ever open a blank document, in capturing, organizing, and connecting ideas over time.

**Summary:** There's a certain mythology around the blank page. The lone genius, cursor blinking, waiting for inspiration to strike. Luca pushes back on that pretty directly, and I think he's right. If you're starting from nothing, something went wrong upstream. Good writing, good thinking, good anything, is mostly assembly work. You're connecting ideas you've already captured and refined, not conjuring them from thin air.

The quote he surfaces here is worth sitting with. An Italian singer-songwriter, when asked how long it takes to write a song, answers: it takes ten minutes, but only if he spends the rest of his life making sure it eventually takes ten minutes. That's the whole point. The preparation is the product. The ten minutes is just the last step.

The framework Luca uses breaks the process into three distinct stages: capture, organize, and express. He argues, convincingly, that these tasks should happen at different times and shouldn't bleed into each other. Capture plus organize in the same sitting leads to exhaustion, because every new thought becomes an administrative burden. Organize plus express without a proper capture habit leads to chaos, missed connections, ideas that evaporate. Trying to do all three at once? That's how you get writer's block, or more accurately, thinker's block.

This tracks with Luhmann's Zettelkasten and Tiago Forte's CODE framework, both of which Luca name-checks. Neither system requires religious adherence, but the underlying principle, separation of concerns applied to thought work, is genuinely useful. What I'd push back on slightly is that this framing assumes you have a consistent enough practice to build up the raw material. Many people don't. The capture habit is actually the hard part for most people, not the expression stage.

**Key takeaways:**
- Blank pages are a symptom of inadequate preparation, not a creative starting point
- Split capture, organization, and expression into separate activities at separate times
- The ten-minute rule applies broadly: fluency comes from accumulated preparation, not talent
- Both Zettelkasten and CODE are implementations of the same separation-of-concerns principle

**Why do I care:** As a senior developer, I deal with this constantly when writing documentation, ADRs, or technical proposals. The instinct is to open a doc and start typing. The better move is to have a running capture system, fragments of thought, links, observations, so that when it's time to write something coherent, you're editing and assembling, not generating from zero. The same applies to architecture decisions. If you're coming up with your constraints and tradeoffs in the meeting, you're already too late.

**Link:** [Blank pages, decisions, and weekly readings! 💡](https://refactoring.fm/p/blank-pages-decisions-and-weekly)

---

## Annie Duke's Four-Principle Checklist for Better Decisions

**TLDR:** Former world-class poker player Annie Duke offers a four-step framework for making higher-quality decisions, covering how much time to spend, how to surface implicit reasoning, how to quantify fuzzy opinions, and how to avoid groupthink when gathering input.

**Summary:** Luca revisits an interview he did with Annie Duke, and it's one of those conversations that keeps giving. Duke is a former world-championship poker player who now consults on decision-making, and her frameworks are notably free of the vagueness that plagues most advice in this space.

The first principle is speed assessment. Before you do anything else with a decision, figure out how much time it deserves. The axis she uses is: how long-term is the impact, and how reversible is it? Spend time accordingly. This sounds obvious until you notice how often teams spend three hours debating something that could be undone next sprint and ten minutes on something that will constrain the architecture for two years.

The second principle is making the implicit explicit. We often decide by feel, and the instinct is to trust that. Duke's position is that you should articulate what the feeling actually is. What are the real criteria driving your gut reaction? Making reasoning explicit before committing serves two purposes: it helps you catch flawed logic in advance, and it makes post-hoc rationalization harder. That second point matters a lot. Once a decision is made, we tend to construct justifications rather than evaluations. Writing down your reasoning beforehand locks in your actual thinking.

Third is quantifying qualitative opinions. Instead of saying a market looks promising, rate it one to ten. It feels a little uncomfortable, and that discomfort is the point. Vague language masks disagreement. Two people can both nod at "this looks good" and mean completely different things. Forcing even rough numerical precision surfaces that gap before it becomes a problem.

The fourth principle is collecting opinions independently. Never gather important input in a group setting first. Anchoring bias and groupthink are both well-documented and both genuinely damaging to decision quality. Get individual perspectives separately, then compare the differences. You're looking for the spread, not the average.

What the article doesn't fully address is the overhead cost of applying all four principles to every decision. Duke's speed assessment step is supposed to handle that, but in practice, most teams lack the discipline to actually triage decisions before diving in. That's the missing implementation detail.

**Key takeaways:**
- Calibrate time investment to decision reversibility and long-term impact before anything else
- Write down your actual decision criteria before committing, not after
- Use rough numerical scales to force precision on qualitative assessments
- Collect individual opinions before any group discussion to prevent anchoring and groupthink

**Why do I care:** These principles map directly onto engineering team dynamics. Every sprint planning, every architectural discussion, every "should we use library X or Y" conversation. The independent opinion collection principle alone would improve most team decisions I've seen. The default is to let the most vocal person set the frame and watch everyone else anchor to it. Duke's approach is just better process hygiene, and it's not that expensive to apply once you're used to it.

**Link:** [Blank pages, decisions, and weekly readings! 💡](https://refactoring.fm/p/blank-pages-decisions-and-weekly)

---

## Three Sharp Reads: Leadership Lines, Frustration Signals, and AI Contributions in Open Source

**TLDR:** This week's reading list covers when leaders should draw hard lines rather than stay hands-off, how "why can't they just" frustration is actually a diagnostic tool, and why at least one open source project is banning AI-generated contributions entirely.

**Summary:** Luca wraps up with three external articles, and each one is worth more than a quick skim.

The Rands piece is about Slack's major outage and how it forced a transformation in their development process. The framing is about the tension between good leaders knowing when to stay out of the way and great leaders knowing when to step in and draw a hard line that resets how a team works. Outages have a way of revealing the gap between the process you think you have and the one you actually have. The interesting part is when leadership uses that moment not just to fix the immediate problem but to change the structural conditions that created it.

Lara Hogan's article takes the phrase "why can't they just" and reframes it as a diagnostic signal rather than a sign of frustration to suppress. When you catch yourself saying it about another team or role, it's pointing at a complexity you don't fully understand. Her suggestion is to use that phrase as a trigger to go investigate: what are the constraints they're operating under that make the obvious solution not obvious? This is useful for any cross-functional work, which is to say, all the work that actually matters.

The Loris Cro piece is the most pointed of the three. It's about Zig's decision to ban AI-generated contributions to their open source project. The argument is that open source maintainers aren't really betting on PRs, they're betting on contributors. A contributor who shows up with AI-generated code hasn't demonstrated the learning, judgment, or investment that makes them worth betting on. The thesis is well-articulated and it challenges the assumption that more contributions are always better. Volume is not quality, and for a small maintainer team, low-signal PRs are actually a net cost.

I find myself partly persuaded and partly skeptical. The concern about AI-generated noise is real and I've seen it play out. But the blanket ban feels like it might throw out contributors who use AI thoughtfully as a tool rather than a shortcut. The distinction between "AI-assisted" and "AI-generated" is blurry and worth examining more carefully than a binary policy allows.

**Key takeaways:**
- Great leaders know when to draw hard lines, not just when to step back
- "Why can't they just" is a diagnostic phrase, not just a complaint, use it to investigate hidden constraints
- Open source maintainers bet on contributors, not just code quality, and AI-generated PRs may undermine that bet
- Volume of contributions is not the same as value of contributions

**Why do I care:** The open source AI contribution debate is going to get louder. As someone who works on and depends on open source tools, the signal-to-noise ratio on contribution queues matters. The Zig stance is defensible. What concerns me is that the same logic, applied carelessly, could shut out valid contributors who happen to use AI tools in their workflow. We need better heuristics than "did AI touch this code."

**Link:** [Blank pages, decisions, and weekly readings! 💡](https://refactoring.fm/p/blank-pages-decisions-and-weekly)
