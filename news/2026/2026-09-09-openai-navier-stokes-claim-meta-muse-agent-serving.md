---
title: "10,000 agents, a Millennium Prize claim and nobody showing the proof"
excerpt: "OpenAI says a swarm of agents cracked Navier-Stokes, Meta shipped a personal agent with a real security design, and the serving infrastructure numbers are quietly the best part."
publishedAt: "2026-09-09"
slug: "openai-navier-stokes-claim-meta-muse-agent-serving"
hashtags: "#AINews #ai #llm #agents #openai #meta #infrastructure #performance #security #generated #en"
source_pattern: "AINews"
---

## The Navier-Stokes claim and what was actually disclosed

**TLDR:** OpenAI said a group of agents using an unreleased model produced a solution to the Navier-Stokes Millennium Prize problem. The public claims include roughly 10,000 agents and about a year of multi agent reinforcement learning. What is missing is a theorem statement, a preprint, a proof sketch or any verification artifact.

**Summary:** The most concrete public claim came from Ethan Knight, who said the result came from a collaboration of about 10,000 agents working together, that OpenAI had spent the past year training models to collaborate through multi agent reinforcement learning, and that hard problems may yield to large amounts of unstructured parallel test time compute with the models deciding how to organize themselves. That is a systems description. It is not a mathematical one, and the distinction is the whole story here.

The AINews writeup does something I wish more coverage did, which is separate what the tweets establish from what people extrapolated. Established: an OpenAI linked claim about roughly 10,000 agents, a year of multi agent RL, and an emphasis on parallel test time compute over a single long proof attempt. Not established: any theorem statement, the scope of the proof, whether it addresses standard 3D incompressible global regularity or a variant, and how much of the work was human. A collaboration of 10,000 agents does not tell you whether humans decomposed the search, curated lemmas, verified steps, or just launched the infrastructure. The widely repeated 88 hours figure appears only in a satirical post in the set, which did not stop it becoming the headline number everywhere.

Solution is doing a lot of unmarked work too. In mathematics it could mean a complete proof, a proof strategy, a candidate counterexample, a formalized derivation or a research lead. Navier-Stokes is a bad problem to be vague about, because a claim that finite time singularities can occur implies a negative answer to global regularity in the relevant formulation, and that requires extraordinary precision.

The reactions split predictably. Theo Jensen called it the science world's moment of realizing AI can actually code. Hrishikesh framed it as evidence of a high compute regime and told people to adjust their plans. Someone connected ChatGPT latency warnings to compute being redirected at the run, which was pure conjecture. The neutral reading is the one I would hold. Even if the theorem does not survive review, a system that generates mathematically nontrivial candidate paths on a problem of this stature is a real capability milestone, and the multi agent RL plus parallel test time compute architecture may matter more as a research method than as a result.

What is genuinely absent from the disclosure is worth listing, because it is what a reviewer would need. No theorem prover integration described, no formal verification, no proof assistant stack, no model size, no compute budget, no ablation against a single agent baseline, no proof check success rate. OpenAI's separate statement that no specific user data was accessed, with a caveat about possible de-identified derivative improvement, became its own flashpoint for reasons that are obvious to anyone who read the other side of this story.

**Key takeaways:**
- The disclosed facts are systems level: roughly 10,000 agents, about a year of multi agent RL, heavy parallel test time compute
- No theorem statement, preprint, proof sketch or verification artifact appeared alongside the claim
- The 88 hours figure that spread everywhere traces to a satirical post, not to OpenAI
- Provenance matters technically here, since who framed the conjecture and who verified the steps changes what the artifact is
- The architecture may be the more durable contribution even if the specific proof does not hold up

**Why do I care:** The part worth carrying into your own work is the shift from bigger single model to coordinated ensembles with compute spent at solve time. If that direction holds, the interesting engineering moves to task decomposition, inter agent communication and candidate selection, which are ordinary distributed systems problems rather than machine learning ones. That is a set of skills a senior engineer already has. Treat the Millennium Prize framing as marketing until a proof exists you can read.

**Link:** [OpenAI reports Navier-Stokes singularity find using Astra-next](https://www.latent.space/p/ainews-openai-reports-navier-stokes)

## Meta Muse and a personal agent with a real security design

**TLDR:** Meta launched Muse, an always on personal agent with app connectors and browser access, distributed through Meta's own properties. Each Muse runs in its own isolated Linux VM, a separate component called Sentinel mediates actions, secrets are never exposed to the agent, and there is a bug bounty up to $300k.

**Summary:** The product shape is familiar by now. Persistent VMs, browser use, a WhatsApp interface, connectors to Gmail, Calendar, Outlook, Plaid, OpenTable, Docs, Spotify and Peloton, plus Meta native connectors to Instagram, Messenger, Facebook and Marketplace. Meta says day one usage came in ten times above internal projections, which is the kind of number a launch post always produces and which nobody can check.

The security architecture is what Meta pushed hardest and it is the reason practitioners reacted well. Each Muse gets its own isolated VM. Actions are mediated by a separate component rather than executed directly by the agent. Secrets are never handed to the model. Sensitive actions require approval. There is a public bug bounty topping out at $300k, which is a real commitment rather than a slide. Commerce runs through Stripe Link with an agentic payment protection and refund guarantee, with Shop Pay coming.

That reception is the interesting signal. The people quoted were positive specifically about permissioning and secrets management rather than about model quality, which suggests Muse may be one of the first personal agent products where the bottleneck is context and access rather than raw intelligence. That has been true for a while and most launches have not acted like it.

Meta also exposed Muse Spark 1.3 in third party tooling including Cursor almost immediately, and arena style benchmarking positioned Muse Spark 1.3 Max as competitive on price and performance for web development coding workloads. Shipping a consumer agent and a developer accessible model in the same week is a distribution move more than a technical one, and Meta has the distribution.

**Key takeaways:**
- Each Muse runs in its own isolated Linux VM with a separate mediator between the agent and any action
- Secrets stay out of the agent's reach entirely, and sensitive actions need approval
- The bug bounty goes up to $300k, which is a stronger signal than the architecture diagram
- Muse Spark 1.3 landed in Cursor immediately and benchmarked competitively for web dev coding

**Why do I care:** The permission and secrets design is the part to steal, and it is directly relevant if you are building anything agentic for a product team. Keeping credentials out of the model's context and putting a mediator between intent and execution is not novel, and it is still the thing most internal agent projects skip because it slows the demo down. Meta having done it publicly gives you something to point at in a design review. The rest is a distribution story that does not affect your architecture either way.

**Link:** [Meta Muse launch coverage in AINews](https://www.latent.space/p/ainews-openai-reports-navier-stokes)

## Agent harnesses, post training and the numbers that matter

**TLDR:** Harvey and Baseten published the clearest case yet that the harness and the post training matter as much as the model. Moving from a standard tool loop to a recursive harness took mean rubric pass rate from 23% to 62%. Reinforcement learning on top took one model from 30% to 63%.

**Summary:** The setup is legal due diligence over corpora up to 80 million tokens. A root agent searches a data room, delegates document review to sub agents, and aggregates findings. On a synthetic benchmark called LAB Diligence, swapping a standard tool loop for that recursive structure raised mean rubric pass rate from 23% to 62% across models. That is a bigger delta than most model upgrades produce, achieved without changing the model.

Then post training compounded it. Self distilled supervised fine tuning on GLM-5.2 moved pass rate from 46% to 60%. GRPO on Qwen3.5-122B-A10B moved it from 30% to 63% on held out data rooms, and improved document coverage from 62% to 96%. The coverage number is the one to notice, because a legal review that misses a third of the documents is worse than useless regardless of how good its findings are.

The implication both teams draw is that agent benchmarks need to treat orchestration and post training as part of the system rather than as glue around it. That is consistent with the ARC-AGI-3 result OpenAI published, where two API settings tripled a score with no model change, and with Harness-Bench finding a 23.8 point spread across harnesses on identical tasks with an identical model. Three independent results pointing the same direction is enough to act on.

LangChain shipped supporting pieces in deepagents: sub agent forking that passes supervisor context down, and managed connections that abstract OAuth, token and consent flows for either agent owned or user owned identities. Unglamorous plumbing, and exactly what long horizon agent work has been missing.

**Key takeaways:**
- A recursive harness took mean rubric pass rate from 23% to 62% with no model change
- GRPO on Qwen3.5-122B-A10B raised pass rate from 30% to 63% and document coverage from 62% to 96%
- Harness-Bench measured a 23.8 point spread across harnesses running the same model on the same 106 tasks
- Agent benchmarks that hold the harness constant are measuring the wrong thing
- deepagents added sub agent forking with inherited supervisor context and managed OAuth style connections

**Why do I care:** If you have concluded that agents cannot do some task in your product, the honest next step is to check whether you tested the model or your loop around it. A 23 to 62 point swing from restructuring the orchestration means most internal evaluations are measuring their own plumbing. For architects this reframes the build decision entirely. The gains sit in decomposition, delegation and aggregation, which your team can iterate on weekly, rather than in waiting for the next model.

**Link:** [Harvey and Baseten harness results in AINews](https://www.latent.space/p/ainews-openai-reports-navier-stokes)

## Serving infrastructure is where the real numbers are

**TLDR:** vLLM published sparse attention offloading that took sustained concurrency from 5 or 6 requests to 19 to 25 at a million tokens of context on one node. It also found that session sticky routing beats naive load balancing for agent traffic, because a warm cache matters more than an even queue.

**Summary:** The long context work is the headline. vLLM's Hybrid HiSparse keeps the KV cache on GPU while it can, offloads cold pages to host memory, and keeps a hot buffer for the indexer. Running GLM 5.3 with a million tokens of context on an eight by H200 node at configured concurrency 32, plain offloading sustained 5 to 6 requests while Hybrid HiSparse sustained 19 to 25. That is a three to four times improvement in how many long context requests one node can actually serve, which matters directly for reinforcement learning rollouts where decode is VRAM bound.

The full stack optimization pass is more surprising and more useful. Benchmarked on real agent traffic, pipeline parallelism helps for cold long prompts and loses for warm short turns, so the right configuration depends on your traffic mix rather than on a general rule. Decode context parallelism depends heavily on the model's attention design. And session sticky routing beats naive load balancing, because in fast turn agent workloads a warm KV cache is worth more than an evenly distributed queue. That last finding is the one that contradicts a default most people ship with, and it is the sort of thing you only learn from production shaped traffic.

Cohere released an open source serving stack built around a decode megakernel, claiming up to 1.58 times faster than vLLM on North Mini Code and 1.25 to 1.41 times end to end at higher batch sizes. Baseten separately reported that frontier RL rollouts now receive new policy weights globally in under 40 seconds with a 6 second pause. Put those together and the direction is clear. Serving infrastructure is being rebuilt for continuous post training and rollout refresh rather than for static model serving, which is a different set of constraints than most of us learned.

**Key takeaways:**
- Hybrid HiSparse took sustained concurrency from 5 or 6 to 19 to 25 at a million tokens on an eight by H200 node
- Session sticky routing beats naive load balancing for agent traffic, because warm KV caches matter more than queue evenness
- Pipeline parallelism helps cold long prompts and hurts warm short turns, so the answer depends on your traffic
- Cohere's decode megakernel claims up to 1.58 times faster than vLLM on one workload
- Baseten reports new policy weights live globally in under 40 seconds with a 6 second pause

**Why do I care:** This is not frontend work and one finding transfers directly anyway. Session sticky routing beating even load distribution is the same insight as sticky sessions in front of a stateful web tier, and if you are putting a load balancer in front of self hosted inference you are probably shipping the wrong default today. More broadly, if your product depends on self hosted models, these numbers say your inference cost is more a serving configuration problem than a hardware budget problem, and that is a much cheaper thing to fix.

**Link:** [vLLM and Cohere serving results in AINews](https://www.latent.space/p/ainews-openai-reports-navier-stokes)

## Images 2.5, Astra rollout and the rest of a crowded day

**TLDR:** OpenAI shipped ChatGPT Images 2.5 with up to 50% lower latency and better edit consistency, and finished rolling Astra out to Plus, Pro, Business and Enterprise. Cognition raised over $2B at a $48B valuation. A researcher resigned from Anthropic over safety.

**Summary:** Images 2.5 got overshadowed and is a solid release. Up to 50% lower latency than Images 2.0, better realism, edit consistency that holds across repeated edits, comment based localized changes, transparent backgrounds, and a Sketch tool for guided generation. Two API variants shipped, Flare for speed and Sunburst for higher precision detail work. Arena results claimed first and second across text to image, image edit and multi image edit, with the largest gains in multi image editing. Integrations landed at fal, Higgsfield, Manus and Hermes Agent within the day.

Astra availability widened to all Plus, Pro, Business and Enterprise users in Codex and ChatGPT Work. Two community demos are worth the anecdote value. Theo reported Astra compiling and running Super Smash Bros. Melee on macOS at 120 FPS after roughly a six hour loop. Vals reported it nearly saturating an unreleased computer use evaluation by building a Minecraft Nether portal in under three hours with no specialized harness. Both are cherry picked and both are the kind of task that would have been impossible last year.

The financing and personnel news is the part with consequences. Cognition raised over $2B at a $48B valuation, saying run rate revenue grew from $492M to nearly $900M since May. Separately, Jacob Hilton resigned from Anthropic, arguing both Anthropic and OpenAI are racing toward self improving superintelligence irresponsibly and that insiders privately treat extinction risk as real. Two decacorn rounds, Cognition's and Mistral's $24B, landed on the same day as everything else and did not make the headline, which tells you what the news cycle now costs to break into.

**Key takeaways:**
- Images 2.5 cuts latency up to 50% and adds edit consistency across repeated edits plus a Sketch tool
- Flare and Sunburst are the speed and precision API variants
- Astra is now fully rolled out to Plus, Pro, Business and Enterprise in Codex and ChatGPT Work
- Cognition raised over $2B at $48B, reporting run rate revenue up from $492M to nearly $900M since May
- Jacob Hilton resigned from Anthropic citing an irresponsible race toward self improving systems
- Mistral's $24B round landed the same day and did not make the headline

**Why do I care:** The Images 2.5 edit consistency is the one with a direct product use, because holding a subject stable across repeated edits is exactly what breaks when you try to generate a set of related assets for a design system or a marketing page. If you evaluated image generation for that and gave up, this is worth a second look. Everything else here is context for planning conversations rather than for code, and the Hilton resignation is worth reading in full if you make procurement decisions, since it is a first hand account rather than commentary.

**Link:** [AINews for 9/8/2026](https://www.latent.space/p/ainews-openai-reports-navier-stokes)
