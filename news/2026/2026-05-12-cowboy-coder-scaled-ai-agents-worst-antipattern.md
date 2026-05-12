---
title: "The Cowboy Coder Scaled: AI Agents and the Return of Software's Worst Antipattern"
excerpt: "A CISO-turned-engineer argues that AI coding agents are quietly resurrecting the 'cowboy coder' antipattern, but at a scale and with a bus factor the industry has never seen before."
publishedAt: "2026-05-12"
slug: "cowboy-coder-scaled-ai-agents-worst-antipattern"
hashtags: "#kilo #ai #softwareengineering #teamculture #codereview #generated #en"
source_pattern: "Kilo"
---

## The Cowboy Coder Scaled: AI Agents and the Return of Software's Worst Antipattern

**TLDR:** A CISO who still writes code makes a compelling and uncomfortable argument: AI coding agents are bringing back the cowboy coder antipattern the industry spent decades eradicating, except this time the bus factor isn't one, it's zero. The productivity gains are real, but so is the organizational rot accumulating underneath them.

There's a confession at the heart of this piece that I find genuinely unsettling: the author can sketch the architecture of code they wrote three years ago from memory, but something built last month with an AI agent? They know what it does and why it exists, but the deep mental model isn't there. That's not carelessness. They read every diff. They can speak to intent and shape. But the granular understanding, the kind you need at 2am when everything is on fire and the agent isn't helping, never formed.

That admission earns the argument that follows. The cowboy coder is one of software's most recognizable antipatterns: the engineer who disappears over a weekend and reappears Monday with a full rewrite nobody asked for, who becomes the sole person who understands the billing module or the deployment pipeline. The engineering industry spent roughly twenty years building practices specifically designed to make this person either unnecessary or impossible. Code review, pair programming, design docs, collective ownership, blameless postmortems. The whole inheritance from XP, agile, and DevOps was, in significant part, a response to the lesson that cowboy culture feels productive and is actually corrosive. And it worked, imperfectly but measurably.

Then the agents arrived, and something subtle started going wrong that nobody is naming yet. An engineer prompts an agent, the agent emits eight hundred lines, the engineer sees green tests and merges. Ten times a day, across the whole team. The velocity charts look extraordinary. Underneath, nobody has actually reasoned through the code. The author couldn't walk you through it under questioning. The reviewer couldn't either, partly because they had thirty other PRs in the queue, and partly because another agent was doing some of that reviewing too. Six months later, when something breaks at 2am, the engineer on call is debugging code that has, in any meaningful sense, no human author at all.

The author names this clearly: this is bus factor zero. The original cowboy, for all the damage they caused, had one redeeming quality. Somewhere, in one human brain, the model of the system existed. Agent-driven development without comprehension produces something worse. The code enters the repository with nobody understanding it. There is no expert to consult, because the expert was a probability distribution that has since moved on to the next prompt. And the social brakes that slowed cowboys down are also missing. Cowboys had egos and reputations and peers who could push back. Agents feel no shame when production breaks, and when something does go wrong, the blame diffuses into the tooling. "The AI wrote it," everyone shrugs, and nothing changes.

The proposed fixes are practical and not original, which is the point. Require comprehension before merge: the author of an agent-assisted PR should be able to walk through it without asking the agent again. Cap PR size hard in tooling, because a 50-line PR can be meaningfully reviewed and an 800-line PR cannot. Tag AI authorship as first-class metadata and track incident rates on modules where agents wrote most of the code. Protect deliberate practice for junior engineers, because the seniors riding herd on agents today learned their craft the hard way, and the next cohort needs a path to the same skill. Treat unread code as a liability, not just bad code, and schedule comprehension audits accordingly.

**Key takeaways:**
- AI coding agents are recreating the cowboy coder antipattern at scale, producing code with bus factor zero rather than bus factor one
- The social and organizational brakes that once limited cowboy culture (peer pressure, reputation, code review scrutiny) are absent when the "author" is an agent
- The existing playbook works: require comprehension before merge, cap PR size, track AI authorship as metadata, and protect deliberate practice for junior engineers

**Why do I care:** From an architectural standpoint, "unread code as liability" is the framing that should change how engineering orgs think about agent-generated output. Technical debt has always been about future cost, but unread code is a different category: it's code that may work perfectly today while being completely opaque to the team responsible for it. The comprehension audit idea, assigning engineers to read and document modules written by agents they didn't author, is something I'd want to operationalize immediately. The concern about junior engineers is also real and underappreciated. We've always learned by struggling through hard problems. If agents absorb all the struggle, the next generation of seniors may be able to prompt fluently and reason about almost nothing.

**Link:** [Cowboy Coder Is Back. This Time, They Scale](https://blog.kilo.ai/p/cowboy-coder-is-back-this-time-they?publication_id=4363009&post_id=196901382&isFreemail=true&triedRedirect=true)
