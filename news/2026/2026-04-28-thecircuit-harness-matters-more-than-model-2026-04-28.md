---
title: "TheCircuit: Why the harness matters more than the model"
excerpt: "Frontier model launches keep coming, but pricing diverges sharply while benchmarks converge. The real lever is how you drive these systems, not which one you pick."
publishedAt: "2026-04-28"
slug: "thecircuit-harness-matters-more-than-model-2026-04-28"
hashtags: ["#TheCircuit", "#AI", "#LLM", "#Agents", "#ClaudeCode", "#Kaizen", "#generated", "#en"]
source_pattern: "TheCircuit"
---

## Why the harness matters more than the model

**TLDR:** Ten days of frontier launches from Anthropic, OpenAI, Alibaba, Google, and DeepSeek. Benchmarks are converging, prices are not, and the +5 point bump on Opus 4.7 over Qwen 3.6 Max can cost up to 5.5x more. The interesting question is no longer which model you use — it is how you drive it.

**Summary:**

The release calendar this month read like a stress test. Anthropic shipped Opus 4.7 on April 16th, Claude Design on the 17th, and then OpenAI fired back with ChatGPT Images 2.0 on the 21st, workspace agents on the 22nd, and a GPT-5.5 preview on the 23rd. Alibaba dropped Qwen 3.6 Max Preview, Google announced Gemini Enterprise, and DeepSeek slid V4 into the conversation. If you blinked you missed at least three of them. I keep a tab group open just for changelogs now and it still feels insufficient.

What jumps out from the noise is not the capabilities. It is the cost curve. The author makes the point bluntly: the most expensive model is not necessarily the smartest. GPT-5.5 reportedly outperforms Opus 4.7 on both price and benchmarks, and the marginal frontier gain (roughly 5 points over Qwen 3.6 Max) can carry a 5.5x premium. That math only works for a narrow slice of use cases. For everything else, the SLM renaissance is real and getting realer. Economics still apply, even when the marketing decks suggest otherwise.

The deeper argument in the post is about what he calls goldfish brain. Models are trained, frozen, and shipped. Anything outside the session context ceases to exist for them. Demis Hassabis has been saying the quiet part out loud — these systems do not learn online from experience. So everything we layer on top (sessions, memory systems, file-based todos, AGENTS.md, skills, version-controlled prompts) is scaffolding to compensate. Anthropic's reported 30 billion ARR is, in this read, a story about Claude Code being a better harness than competitors, not strictly a better brain.

Then comes the part I actually liked. The author maps this to Kaizen and the Toyota Production System: standards exist as a baseline for continuous improvement, every operator can pull the Andon cord, and you have to watch the work happen (Genchi Genbutsu) instead of just inspecting outputs. With computer agents, you do not even pause the line. You run two Claude Code sessions side by side — one doing the work, one improving the harness. That is a workflow I have been living with for months and I would not go back.

The closing argument is about treating agents as a living system: sample work continuously, interrupt and improve in flight, version your configs so you can trace what changed, and watch the process rather than only checking outputs. The "fire and forget" mental model still dominating boardroom decks is wrong for almost everything except the most trivial tasks. Humans in the loop are not a transitional phase — they are the design.

**Key takeaways:**

- Benchmark performance is converging across labs, but pricing is not — match model selection to actual task value.
- The harness (context, skills, AGENTS.md, todo files, evals) often matters more than the model behind it.
- SLMs are due for a renaissance because the economics of marginal frontier gains rarely justify the cost.
- Kaizen on agents: run a second session whose only job is to improve how the first session works.
- Version your prompts, skills, and agent configs the same way you version code — you will need the diff history.

**Why do I care:**

Because I keep watching teams pick a model like it is a religion and then ignore the harness around it. I do the same thing on bad days. The honest truth is that I have shipped more value in the last quarter by tuning AGENTS.md, splitting sessions, and writing better skill files than by switching to whatever is on top of the leaderboard this week. The leaderboard moves every Tuesday. My harness compounds. As an architect I want compounding. The other thing that lands for me is the Andon cord framing — when an agent goes off the rails I used to just rerun. Now I stop, fix the prompt or the skill or the context shape, and continue. That tiny discipline shift has been worth more than any model upgrade. If you are still comparing GPT vs Claude vs Gemini in a spreadsheet without comparing how you drive them, you are optimizing the wrong variable.

**Link:** [Why the harness matters more than the model](https://metacircuits.substack.com/p/why-the-harness-matters-more-than-the-model)

## Last week in AI: the unified ChatGPT super-app takes shape

**TLDR:** OpenAI shipped ChatGPT Images 2.0, Workspace Agents, and previewed GPT-5.5 — positioned as the reasoning core of an emerging unified super-app spanning chat, coding, and browser agents.

**Summary:**

The pattern OpenAI is drawing on the whiteboard is becoming legible. Images 2.0 is the multimodal output layer, Workspace Agents is the place where the assistant does work for you instead of next to you, and GPT-5.5 is the reasoning engine underneath it all. Stitch those three together and you get a single product surface where chat, code, and browser all share state. That is the bet.

It is also a direct shot at the "best of breed" tooling story. If GPT-5.5 is good enough at reasoning, and the agents can drive a browser, and the canvas can produce images on the fly, the argument for a stack of separate tools weakens. I am not fully convinced — Workspace Agents in particular has the smell of a v1 that needs another six months to be reliable — but the strategy is clear and it is consistent.

The interesting tension is with the harness argument from the main piece. OpenAI is building a vertically integrated super-app. Anthropic's lead came from a horizontally usable harness (Claude Code) that engineers extended themselves. Both can win, but they win in different ways and with different customers. Watch which one accumulates more retention.

**Key takeaways:**

- OpenAI is consolidating chat, coding, and browser agents into one product surface.
- GPT-5.5 is being framed as the reasoning core, not just another model upgrade.
- Workspace Agents is the bet on assistants that do work, not just chat about it.
- The integration story competes with the open-harness story Anthropic has built.

**Why do I care:**

Because as a frontend architect I have to decide whether to build on top of one super-app or compose against open primitives. The composability question is real. I have been burned before by closed ecosystems that promised everything and delivered a slow-moving subset. I am watching this one with one eye on the lock-in clauses and the other on whether the agents actually finish the work I hand them. Until they do, I keep my Claude Code sessions running.

**Link:** [GPT-5.5 preview](https://substack.com/redirect/1c8877cf-bad4-4278-8145-48c5997d8432?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## Intercom doubled engineering velocity with Claude Code in nine months

**TLDR:** Intercom published a detailed productivity case study showing engineering velocity doubled across the org in nine months of Claude Code adoption.

**Summary:**

I always read these case studies with a side-eye. Vendor-friendly numbers are the norm. But Intercom is not a small shop and "doubled velocity" is not the kind of claim you put in a public post unless you can defend it internally. If even half of that gain is real and durable, it changes the staffing math for engineering orgs that have been hesitant to commit.

What I find more interesting than the headline is the time horizon. Nine months. That is enough time to learn the harness, build internal skills and AGENTS files, retire some of the early prompts that did not work, and start measuring real cycle time rather than vibes. The teams that report wins inside two months are usually measuring novelty. Nine months is closer to a real adoption curve.

The thing the case study does not solve is attribution. Velocity goes up, but is it the model, the harness, the cultural shift toward writing tests and specs, or the survivorship of engineers who already had a knack for collaborating with agents? Probably all of the above. That is fine. The compounding effect is the point.

**Key takeaways:**

- Nine months is closer to a realistic adoption window than the two-month wins most case studies report.
- Velocity gains likely come from a bundle: model, harness, skill files, and culture shifts.
- Public claims at this scale are useful as a benchmark even if you discount them.
- Attribution is messy — the harness and the practices around it matter at least as much as the model.

**Why do I care:**

Because I am usually the person asked to defend or attack an AI tooling rollout, and these case studies are the artifacts that end up in slide decks. I want to know which parts replicate. The honest answer is that the harness, the skill files, and the willingness to interrupt and correct mid-task are the parts that travel. The specific model is replaceable. If I were running an engineering org I would copy the structure, not the vendor.

**Link:** [Intercom Claude Code productivity case study](https://substack.com/redirect/ac210e0c-ddb9-4858-a469-93cd459c99a8?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

## DeepSeek V4 and Qwen 3.6 Max narrow the open versus closed gap

**TLDR:** DeepSeek previewed V4 and Alibaba previewed Qwen 3.6 Max — both claim frontier-class agentic and reasoning gains at significantly lower price points than US peers, narrowing the open and closed performance gap.

**Summary:**

The pricing argument from the main piece gets sharper when you look at what the Chinese labs are putting on the table. Qwen 3.6 Max is, on the numbers shared, within striking distance of frontier on reasoning while costing a fraction of what Opus 4.7 charges per token. DeepSeek V4 is in the same conversation. If you are running cost-sensitive workloads at scale, the math is starting to favor "good enough at one fifth the price" over "best at five times the price."

This is also where the SLM renaissance becomes concrete. The frontier-class label is becoming less meaningful as a differentiator and more meaningful as a price tier. For a senior engineer or architect, that means your routing layer (which model handles which kind of request) starts to matter more than your model choice. I have been quietly building task-aware routing into a few projects and it pays for itself fast.

The geopolitics around this is its own conversation and I am not going to pretend to have a clean read on it. What I will say is that for a builder, the existence of cheap, capable, openish models is a good thing. It keeps the closed labs honest on price and gives you a fallback when one provider has a bad week.

**Key takeaways:**

- The open and closed performance gap is narrowing fast on reasoning and agentic tasks.
- Routing logic across multiple models is becoming a real architectural concern.
- Price-performance ratios are shifting in favor of cheaper models for most workloads.
- Frontier-class is becoming a price tier, not a capability tier.

**Why do I care:**

Because I have spent more time than I want to admit defending a single-vendor strategy in architectural reviews. It is simpler to operate and easier to debug. But the pricing pressure from these previews is going to force a model-routing conversation in every org with a real AI bill. As an architect I would rather get ahead of that with a clean abstraction layer than be surprised by a finance review next quarter. The other thing I keep noticing is how much faster the Chinese labs ship — that velocity alone changes how I plan dependencies. I do not want my product roadmap blocked on one provider's release cadence.

**Link:** [DeepSeek V4 preview](https://substack.com/redirect/cac74896-6992-4b4b-b64b-9fdce4ab8ea2?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)
