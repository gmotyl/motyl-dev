---
title: "Engineering Leaders Can't Afford to Watch Agentic AI From a Distance"
excerpt: "A former Director of Engineering argues that leading through the agentic shift requires hands-on experience with the tools, not just reading the summaries."
publishedAt: "2026-05-21"
slug: "engineering-leaders-cant-afford-sidelines-agentic-ai"
hashtags: "#kilo #ai #agents #engineering #generated #en"
source_pattern: "Kilo"
---

## Engineering Leaders Can't Afford to Watch Agentic AI From a Distance

**TLDR:** A CTO who told engineers to write tickets at night and review agent output in the morning had the ambition right but the operating model backwards. Leading through the agentic shift demands firsthand contact with the work, not a strategy deck and a secondhand account from whoever is closest to the tools.

There's a story in this newsletter that I find genuinely unsettling. An engineering manager's company went "all in on AI" in late 2025, with the CTO's vision described as engineers writing tickets overnight and agents implementing them while everyone slept. Engineers would return in the morning, review the output, and get it over the line. Clean in the way plans are clean before they hit a real codebase. The manager's mentor, the author, had spent 2025 as a Director of Engineering actually doing this work, and the plan set off every alarm.

What makes the critique land is that it is not a "slow down" argument. The author is not skeptical about agents being real or useful. The problem is specifically about distance. When a leader hasn't personally watched an LLM produce 800 lines of confidently wrong code, hasn't felt the cognitive load of reviewing output that's plausible but subtly misunderstands the problem, they build plans around the demo version of the story. The demo is genuinely impressive. The demo is also not what shipping to production feels like.

The article describes agentic engineering as an ongoing shift, not a settled practice. A workflow that works cleanly on a greenfield internal tool may fall apart in a legacy distributed system with weak tests and ambiguous ownership. Agents can move fast while missing the point entirely. They compress the cost of executing bad judgment, not just good judgment. If code review was barely holding together before, faster code generation makes that pain impossible to ignore. If product direction was vague, agents help you create expensive noise with higher velocity. The bottlenecks don't disappear; they get stressed faster.

There is a passage about fear that I think deserves to sit on its own for a moment. Many engineers are genuinely curious about these tools. But skepticism is not obstruction. It is often a rational response to watching AI adoption get oversold by people who have never had to land the output in production. The fear of irrelevance is real. The fear that hard-earned craft is being devalued is real. Leaders cannot offer certainty the industry itself doesn't have. What they can do is decide whether people get to work through that uncertainty honestly. If they can't talk openly about what isn't working, they'll still notice it. They'll just stop telling you.

The practical recommendation here is intentionally unromantic. Ship something real. Not a toy demo, something with actual stakes and constraints. Get frustrated at an LLM in all caps at least once. Create shared spaces for engineers to compare notes on what worked, what failed, which model suited which task, which generated code looked right but was painful to land. Don't standardize too early. The variation across teams, codebases, and workflows is signal. Treat it as such before you optimize it away.

**Key takeaways:**
- Agentic engineering amplifies existing organizational bottlenecks rather than removing them, so slow CI/CD, vague product direction, and gatekept decisions all become more painful.
- Leadership credibility through this shift requires firsthand experience with the tools, including the frustrating, humbling parts that demos skip.
- Shared learning across teams matters more than early standardization; teams independently rediscovering the same broken workflow is one of the easiest ways to waste the moment.

**Why do I care:** From where I sit as a frontend architect, the "ticket writers and cleanup crew" failure mode is not hypothetical. I've seen it start to form. The deeper problem the article identifies is that if engineers aren't pulled into problem framing earlier, they lose the product context needed to challenge a technically plausible but strategically wrong agent output. Agentic tools don't reduce the need for that judgment. They surface it faster. An organization that doesn't structure for that will produce a lot of impressive-looking code that no one is sure whether to ship.

**Link:** [You can't afford to lead agentic engineering from the sidelines](https://blog.kilo.ai/p/you-cant-afford-to-lead-agentic-engineering)
