---
title: "All Model Labs Are Now Agent Labs: The Week AI Went Full Stack"
excerpt: "From DeepSeek's permanent price cut to MCP going stateless, the AI industry shifted decisively from selling models to building agents this week."
publishedAt: "2026-05-23"
slug: "all-model-labs-are-now-agent-labs"
hashtags: "#ai #llm #ml #agents #mcp #deepseek #openai #gemini #codex #security #generated #en"
source_pattern: "AINews"
---

## The Model Is No Longer the Product

Greg Brockman said it plainly: "the model alone is no longer the product." That statement, coming from someone who helped build the model-centric era at OpenAI, is worth sitting with for a moment. It's not a surprise at this point, but hearing it said out loud from that corner of the industry feels like a turning point that the whole field has been circling for months.

**TLDR:** Every major AI lab is now building agent products on top of their models. DeepSeek slashed prices permanently, MCP went stateless, and Anthropic found 10,000+ critical security vulnerabilities using its own model in a single month.

**Summary:**

The broader pattern this week is unmistakable: labs are building harnesses, UIs, memory layers, and full product stacks, not just shipping weights or APIs. AI21 shuttered its model team to go all-in on agents. DeepSeek formed a "Harness team" for the first time. The argument from the systems-over-models camp is feeling increasingly validated, though there's a genuine risk here worth naming: if you co-train a model with a closed-source harness, you create pressure to funnel users toward your proprietary stack. The API becomes secondary. That's a real tension the community should watch carefully.

On the cost side, DeepSeek made its 75% V4-Pro discount permanent, and the numbers are striking. One analysis pegged blended inference cost at roughly $0.18 per million tokens, placing it on the Pareto frontier for intelligence versus run cost. Running the same intelligence benchmark on V4 Pro costs about 3x less than Gemini 3.1 Pro Preview, 12x less than GPT-5.5, and 19x less than Claude Opus 4.7. The phrase "intelligence too cheap to meter" is getting more plausible by the month. Gemini Flash also made progress, jumping 16 positions on Design Arena, though several developers pushed back that benchmark gains don't always translate to better cooperation in real workflows.

The infrastructure story this week centered on two things: MCP going stateless and agent sandboxes becoming first-class primitives. The MCP 2026-07-28 release candidate drops the handshake and session ID entirely, meaning any request can hit any server instance. For anyone running agentic systems at scale, this is a meaningful simplification: easier load balancing, no sticky sessions, cleaner deployments. Separately, CoreWeave launched public preview sandboxes for RL and agent tool use, and Google demoed managed agents with hosted Linux sandboxes including memory and code execution. The runtime layer is getting real.

Research-wise, the distillation result deserves more attention than it got. A paper demonstrated that a full multi-step agentic workflow, including tool calls, scratchpads, and decision logic, can be distilled into model weights and run at roughly 100x lower inference cost with near-frontier quality preserved. That's a compelling economic argument for compiling expensive agent loops into cheaper deployable models. On the reasoning front, GPT-5.5 with medium reasoning hit 99.46% on multi-digit multiplication, and modern LLMs can apparently do 100-digit multiplication without tools. The old "autoregression can't do arithmetic" argument is getting harder to sustain.

Anthropic's Project Glasswing finding over ten thousand high- and critical-severity vulnerabilities in production software within a single month is the most sobering data point of the week. The explicit warning from Anthropic that the industry needs to adapt to this volume is not marketing. That's a genuine signal that AI-driven vulnerability discovery is now operating at a scale that breaks existing security engineering assumptions.

**Key takeaways:**
- Model labs are now agent labs: Greg Brockman's quote reflects an industry-wide shift, with AI21 and DeepSeek both reorganizing around agent products
- DeepSeek V4-Pro permanent discount places it on the intelligence/cost Pareto frontier, materially changing build vs. buy decisions
- MCP 2026-07-28 RC goes stateless: no handshake, no session ID, easier scaling for infra teams
- Agent workflow distillation into weights at 100x lower inference cost is a credible economic path for production deployments
- Anthropic found 10,000+ critical vulnerabilities in a month, signaling AI-driven security research is now operating at industrial scale
- Gemini Flash benchmark gains are real but several developers report the model feels optimized for evals rather than cooperative behavior
- US immigration policy changes targeting green-card applicants drew sharp reactions from AI leaders citing talent pipeline damage

**Why do I care:**

From where I sit building and thinking about production systems, the stateless MCP update is the most immediately actionable thing here. Sticky sessions and stateful protocol handshakes are operational debt. If your team is building on MCP, the 2026-07-28 RC is worth evaluating now rather than after it ships. The agent distillation paper is the other one I'd flag for architects: if you're running expensive multi-step agent pipelines in production and cost is a constraint, this is the clearest technical argument yet for a compile step. You build with the expensive model, then distill to a cheaper deployable. And on the vulnerability discovery front, if you run security reviews manually or on a slow cadence, the Glasswing numbers should prompt a real conversation about whether your current process scales to the threat surface that AI tooling is about to expose.

**Link:** [[AINews] All Model Labs are now Agent Labs](https://www.latent.space/p/ainews-all-model-labs-are-now-agent?publication_id=1084089&post_id=198927453&isFreemail=true&triedRedirect=true)
