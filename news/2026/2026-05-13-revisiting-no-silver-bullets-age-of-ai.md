---
title: "Revisiting No Silver Bullets in the Age of AI"
excerpt: "A deep look at whether Frederick Brooks' 1986 thesis about software productivity still holds, and whether AI might finally break the pattern."
publishedAt: "2026-05-13"
slug: "revisiting-no-silver-bullets-age-of-ai"
hashtags: "#pragmatic-engineer #engineering #architecture #generated #en #ai #softwaredevelopment #productivity #sre"
source_pattern: "Pragmatic engineer"
---

## Revisiting "No Silver Bullets" in the Age of AI

**TLDR:** Frederick Brooks argued in 1986 that no single technology would ever deliver an order-of-magnitude improvement in software productivity, reliability, or simplicity. Nearly forty years later, Gergely Orosz revisits that claim in the context of AI-generated code and asks: is Brooks still right?

**Summary:**

Back in 1986, Frederick Brooks, the man who gave us "The Mythical Man-Month," published a paper called "No Silver Bullet." The metaphor comes from European folklore: silver bullets are the one weapon capable of stopping werewolves and other supernatural creatures. Brooks borrowed it to describe something the software industry desperately wanted but, in his view, couldn't have: a single technological leap that would make software development dramatically more productive, more reliable, and simpler all at once. His specific threshold was one order of magnitude, a ten-times improvement, within a decade.

What strikes me about revisiting this paper in 2026 is how much genuinely has changed and yet how the core argument keeps surviving contact with reality. We got version control, modern IDEs, CI/CD pipelines, open source package ecosystems, cloud infrastructure, and Stack Overflow. Each of these moved the needle. Shipping frequency went from months to multiple times a day. Firefox's team used to celebrate each release with a cake; now they ship monthly and a cake for each release would be a health hazard. But here is the thing: none of those advances, individually, cleared the ten-times bar that Brooks set. They each helped, but the overall complexity of what we build kept rising to absorb the gains.

Gergely does find one candidate for a genuine silver bullet, though: SRE at Google Search. Google's site reliability engineering practice, born in 2003 under Ben Treynor Sloss, produced something remarkable. In fifteen years, Google Search experienced exactly one global outage, lasting about an hour. That is an extraordinary reliability record, and the author is willing to call SRE a silver bullet, for that specific team, with that specific investment, in that specific culture. The problem is that the same playbook, applied to Google Cloud or Gmail or GitHub, has not produced the same results. So what kind of silver bullet only works once, for one team, in one company? That tension is worth sitting with.

Then there is AI. This is where the essay gets interesting and, I think, a little cautious. AI code generation can produce code output at what looks like a hundred-times multiplier. But Gergely is honest about the current state: productivity, reliability, and simplicity improvements have been, in his words, "a bit unimpressive, at least for now." That qualifier is doing a lot of work. The question is whether AI represents the beginning of a genuine curve upward, or whether the complexity of the problems we choose to tackle will once again absorb the productivity gains the same way it absorbed everything else over the past four decades.

One piece of evidence worth dwelling on is Grand Theft Auto VI. Rockstar started planning in 2014, with serious development from 2020, and the release is still scheduled for late 2026. Six to twelve years of development time, which is as long as major software projects have ever taken, because the ambition and the player expectations grew at the same rate as the tooling improved. That pattern, where the bar rises as fast as our capabilities do, might be the actual answer to Brooks, and it is not a comfortable one.

**Key takeaways:**
- Brooks' core claim has survived four decades remarkably intact: no single technology has delivered a standalone 10x improvement in productivity, reliability, and simplicity simultaneously
- Combinations of tools (version control, CI/CD, open source, cloud) shifted shipping cadence from months to days, but via accumulated gains, not a single leap
- SRE at Google Search is the closest thing to a genuine silver bullet, but it required a unique culture, founding values, and sustained investment that proved impossible to replicate even within Google
- AI shows enormous promise in raw code output, but the complexity of problems we target tends to expand to meet new capabilities
- Motivation, which Brooks himself flagged in 1995, remains an underrated force in software productivity

**Why do I care:**

As someone who spends time thinking about developer tooling and frontend architecture, this essay lands differently in 2026 than it would have three years ago. We are all surrounded by AI coding assistants now, and there is genuine pressure to declare the productivity problem solved. I think the more honest read is that AI is making certain parts of the job much faster while simultaneously raising expectations for what a small team can deliver. The teams I find most convincing are not the ones measuring lines of code generated per day, but the ones asking whether the software they are shipping is actually simpler and more maintainable than before. That is the question Brooks was asking, and it is still the right one.

**Link:** [Revisiting "No Silver Bullets" in the age of AI](https://newsletter.pragmaticengineer.com/p/revisiting-no-silver-bullets-in-the)
