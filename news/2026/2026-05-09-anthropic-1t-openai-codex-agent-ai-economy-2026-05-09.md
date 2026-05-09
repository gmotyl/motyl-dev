---
title: "Anthropic at $1T, OpenAI's Codex Turns Agent, and the AI Economy's Uneven Distribution"
excerpt: "Anthropic's explosive 80x annualized growth pushes it past OpenAI in valuation while the rest of tech shrinks, and OpenAI's Codex evolves from coding assistant into a long-running autonomous agent runtime."
publishedAt: "2026-05-09"
slug: "anthropic-1t-openai-codex-agent-ai-economy-2026-05-09"
hashtags: "#AINews #ai #llm #agents #ml #engineering #open-source #generated #en"
source_pattern: "AINews"
---

## Anthropic Growing 10x/Year While the Rest of Tech Lays Off

**TLDR:** Anthropic has hit a valuation between $1 trillion and $1.2 trillion after a staggering Q1 that saw 80x annualized growth and a single-month jump of $15 billion in ARR. Meanwhile, Block, Coinbase, and Cloudflare are all cutting double-digit percentages of their staff, citing AI readiness as the reason.

**Summary:** There is something almost disorienting about the current state of the AI economy. On one side, you have Anthropic — a company that, not long ago, was still fighting for name recognition outside of technical circles — now officially valued higher than OpenAI and sitting somewhere in the range of the 11th to 15th most valuable company in the world. The numbers being thrown around are not speculative venture math. There are secondary market transactions and traditional media reports backing this up, and the ARR chart is revenue-based, not a projection cooked up to raise a round.

What makes this even more interesting is the contrast it creates with the broader tech labor market. Block shed 40% of its workforce. Coinbase cut 14%. Cloudflare dropped 20%. All three cited AI readiness — the idea that they need to restructure around AI-enabled productivity rather than headcount. I find myself skeptical of how much of this is genuine strategic realignment versus AI-washing layoffs that would have happened regardless. The macroeconomic pressure was building before any of these announcements, and "we're restructuring for AI" is a more palatable story than "we over-hired during the ZIRP era."

But the data point that actually cuts through the noise is Linear. Linear is growing headcount, not shrinking it. And that fits a pattern worth paying attention to: the companies with clear product-market fit and discipline are not treating AI as a reduction mechanism. They are treating it as a multiplier on a team that was already working well. The companies doing mass layoffs were likely over-extended before any AI conversation started.

The broader picture here is one of concentration. AI growth has been driven overwhelmingly by hardware and energy — the picks and shovels — not by software or application-layer companies. And that concentration in a small number of infrastructure players is starting to create the kind of economic imbalance that tends to look obvious in hindsight. Whether this is a bubble depends heavily on whether the revenue at companies like Anthropic is durable and whether the enterprise spending on foundation model access actually compounds over time. That is genuinely unclear right now.

**Key takeaways:**
- Anthropic's valuation at $1–1.2T is driven by real revenue metrics, not just speculative funding rounds
- Major layoffs at Block, Coinbase, and Cloudflare are framed as AI readiness pivots, though the actual driver is debatable
- AI-era growth is concentrating in hardware and energy infrastructure, with software application layers still catching up

**Why do I care:** For anyone building on top of these foundation models, the valuation trajectory of model providers matters more than it might seem. A $1T Anthropic has very different pricing power, API terms, and strategic priorities than a scrappy startup. The dependency risk for teams building Claude-based products is real, and the companies that treat this as just another API relationship are going to be surprised when the leverage shifts. I also think the linear vs. Cloudflare contrast is worth internalizing for engineering leaders: the answer to AI is not automatically fewer engineers, and organizations that gut their teams in anticipation of AI productivity gains they haven't actually realized yet are making a bet that may not pay out.

**Link:** [AINews: Anthropic Growing 10x/Year While Everyone Else Is Laying Off](https://www.latent.space/p/ainews-anthropic-growing-10xyear?publication_id=1084089&post_id=196960028&isFreemail=true&triedRedirect=true)

---

## OpenAI's GPT-5.5 Family and the Codex Runtime Bet

**TLDR:** OpenAI has been on a rapid release cadence, pushing out multiple model variants in under two weeks, while Codex has been repositioned from a coding assistant into a long-running autonomous agent runtime capable of indefinitely pursuing goals across complex tasks.

**Summary:** OpenAI shipped a lot in a short window. GPT-image-2, GPT-5.5, GPT-5.5 Pro, GPT-5.5 Instant, GPT-Realtime-2, realtime translate, realtime whisper, and GPT-5.5 Cyber all landed within roughly two weeks. The external reactions to GPT-5.5 Instant in particular were positive — DHH called it "very good, very efficient," and Greg Brockman described it as "very capable and very succinct." On the evaluation side, GPT-5.5 Instant placed fifth on multi-turn, eleventh on vision, and twenty-fourth on document tasks in the Arena rankings. These are solid placements, but the real story with OpenAI right now is not benchmark position — it is the Codex pivot.

Codex has been quietly repositioned as something much bigger than a code completion tool. OpenAI is framing it as an agent runtime built for indefinite task pursuit — not "write me a function," but "pursue this goal, retry when you fail, migrate what needs migrating, refactor what needs refactoring, and don't stop." The slash-goal mechanism is the interface to this. What is genuinely interesting here is that independent testing found Codex reaching 61% on public ARC-AGI-3 game tasks after 160 hours and roughly 30,000 actions. That is a striking number, though the caveat is that most of the productive work happened in the first few hours before the system started to stagnate. The long tail of those 160 hours was not compounding — it was spinning. That is a meaningful limitation that the framing of "indefinite task pursuit" does not acknowledge.

The safety infrastructure around Codex is also worth noting. OpenAI published details on how they run Codex at scale — sandboxing, approval gates, network policies, and telemetry. This is the right move, and I'd argue it is overdue. Autonomous agents with broad code execution access and the ability to make network calls are a serious attack surface, and shipping the safety documentation alongside the capability (rather than well after the fact) is a better pattern than we have seen historically from this space.

What is not being discussed as openly is the economic model of 30,000 actions over 160 hours. That is a lot of compute, and the cost structure of agentic workloads at that scale is not trivial. The framing of agents as infinitely persistent workers glosses over the reality that token costs accumulate fast when a model is retrying and exploring for hours. The business case for long-horizon agents depends heavily on whether the output quality justifies those costs at production scale — and that calculus is still being worked out.

OpenAI also disclosed an alignment process issue involving accidental chain-of-thought grading, which is the kind of transparency that builds trust when handled well. They included mitigations like real-time detection and monitorability stress tests, which signals they are treating this as an ongoing engineering problem rather than a one-time fix.

**Key takeaways:**
- GPT-5.5 Instant is receiving strong practical feedback for being efficient and capable without being over-verbose
- Codex's repositioning as a persistent agent runtime is a significant strategic bet, with real-world results showing promise but also meaningful stagnation after early progress
- OpenAI's published safety infrastructure for Codex is a meaningful step, though the cost model of long-horizon agentic tasks remains underexplored

**Why do I care:** The Codex agent runtime direction is the thing I am watching most closely. If you are building developer tooling, CI pipelines, or any kind of automated code maintenance workflow, the question of "when do we hand this off to an agent" is moving from theoretical to operational. The 61% ARC-AGI-3 result is impressive, but the stagnation pattern matters for how you design agent handoffs and retry logic. I would not build a production system that assumes indefinite agent persistence without explicit checkpointing and cost caps. The cybersecurity model line is also worth noting for teams with enterprise or government contracts — that is a market signal about where OpenAI sees near-term revenue, and it shapes what capabilities will get the most investment.

**Link:** [AINews: Anthropic Growing 10x/Year While Everyone Else Is Laying Off](https://www.latent.space/p/ainews-anthropic-growing-10xyear?publication_id=1084089&post_id=196960028&isFreemail=true&triedRedirect=true)
