---
title: "Starving Genies: Why AI Usage Limits Are a Narrative Problem, Not an Engineering One"
excerpt: "The AI model providers are throttling usage simultaneously, and it's not because they're running out of chips or compute. The real bottleneck is investor narrative, and understanding that changes everything about what comes next."
publishedAt: "2026-04-04"
slug: "starving-genies-ai-usage-limits-narrative"
hashtags: "#ai #llm #softwareengineering #substack #generated #en"
source_pattern: "Substac"
---

## Starving Genies

**TLDR:** AI model providers are all throttling usage at the same time, and the reason isn't chips, compute capacity, or money. It's investor narrative, and Kent Beck's analysis of this is sharper than anything I've read on the topic.

**Summary:** Kent Beck opens this piece with a useful framing from his 3X model of product development: Explore, Expand, Extract. Right now, the major AI providers are in Expand, where growth happens in staircases, not smooth curves. You hit a rate-limiting resource ceiling, you address it, you grow until the next ceiling. The interesting question is: what's the current ceiling?

Beck walks through the obvious candidates and systematically rules them out. Chips? No, because Google and Amazon make their own, and Anthropic has preferential supply agreements, yet all three cut limits at the same time. Physical compute capacity? That hits different companies at different times based on their data center footprints and geographies. You'd see variation, not synchrony. The economics of inference are genuinely broken at scale, especially for free users, but these companies have basically unlimited capital. The compute bill is large, but it's fundable.

So what is it? The bottleneck is the story. Specifically, how long investors will fund giving away expensive capability while waiting for profits to appear. That story has a shelf life. At some point, "trust us, it'll work out" stops being enough, and you have to show a path to profitability rather than just assert one. Usage limits are evidence you're managing toward that. It's a signal to investors, not a sign of running out of money.

This is why all three major providers moved together. Same investor class, same stage, same moment when the narrative needed to shift. For developers in particular, these limits hit differently. A power user hitting a daily cap mid-flow isn't mildly inconvenienced, their work stops. Beck's uncomfortable closing question is whether these limits are a temporary bridge while supply catches up, or the beginning of Extract mode, where growth slows, margins matter, and rationing becomes a feature rather than a bug.

**Key takeaways:**
- AI providers cutting limits simultaneously is a coordinated investor narrative signal, not a technical constraint
- The real bottleneck in the current Expand phase is story, specifically the story told to investors about the path to profitability
- Usage limits split the user base into casual (free, capped), developers (metered, uncapped via API), and technical-but-not-API-savvy power users who get squeezed into paid tiers
- The company that bends the supply curve up first, through distillation, caching, smarter routing, or cheaper inference, wins the next wave
- Watch which provider opens the throttle first when competitors can't afford to. That company has cracked unit economics.

**Why do I care:** I live in the world of augmented coding, and hitting daily caps mid-flow is genuinely workflow-destroying. Beck's framing here is important because it reframes how I think about the AI market. I've been watching the AI space as a technology competition, but it's also a capital markets competition. The providers aren't competing purely on model quality right now. They're competing on who can tell the most convincing story to investors about sustainable economics while not destroying their user base in the process. That's a different game, and it matters for which tools I bet my workflow on. If the limits are temporary, I stay patient. If they're the beginning of Extract mode, I need to be much more deliberate about which provider's API I build against and which free tiers I depend on for daily work.

**Link:** [Starving Genies](https://tidyfirst.substack.com/p/starving-genies)
