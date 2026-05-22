---
title: "AI Infra Unicorns, Agent Orchestration, and Math Breakthroughs: The Week That Was"
excerpt: "A deep look at the fundraising frenzy hitting AI infrastructure, the maturation of agent design patterns, and what OpenAI's math result actually means."
publishedAt: "2026-05-22"
slug: "ai-infra-unicorns-agent-orchestration-math-breakthroughs-may-2026"
hashtags: "#ai-news #ai #ml #llm #agents #infrastructure #fundraising #generated #en"
source_pattern: "AINews"
---

## New AI Infrastructure Unicorns: Exa, Modal, and TurboPuffer Hit Massive Milestones

**TLDR:** Three AI infrastructure companies — TurboPuffer, Exa, and Modal — reached unicorn or near-unicorn valuations this week, signaling that the real money in the AI era is flowing to the plumbing, not just the models. The numbers are staggering and the speed is faster than almost any prior tech cycle.

Let's talk about money, because it tells you something real about where the industry thinks the value actually lives. TurboPuffer crossed $100 million in annual recurring revenue in March, just 19 months after hitting $1 million. They did it while being profitable. They raised less than $1 million total. Read that again. Less than a million raised, a hundred million in revenue. That is not a rounding error — that is a company that found genuine product-market fit in the AI retrieval space before most people could even spell "vector database." Their thesis is elegant and hard to argue with: the magic in AI applications happens when models draw in exactly the right context at exactly the right moment. That turns an enormous amount of product differentiation into a search and retrieval problem. TurboPuffer bet on that early.

Meanwhile, Exa closed a $250 million Series C at a $2.2 billion valuation, and Modal raised $355 million at $4.65 billion. Modal's pitch is essentially "rebuild the cloud from scratch for AI workloads" — and investors are buying it. The endorsements from real users matter here more than the press releases. People who actually run GPU workloads at scale are choosing Modal because the developer experience and performance genuinely stand out. That is a harder thing to fake than a valuation number.

The Hark raise is the outlier in this group. $700 million at a $6 billion valuation, targeting GPU infrastructure, future models, hardware, and multimodal personal intelligence. The details are thin — they report a 200-hour uninterrupted autonomous run for something called F.03, but without enough technical specifics to evaluate the robotics stack underneath. At $700 million, investors are making a bet on a vision more than a product. That is not necessarily wrong, but the contrast with TurboPuffer's capital efficiency is almost comical.

What nobody is saying loudly enough is that this infrastructure funding wave represents a quiet acknowledgment that model differentiation is compressing. When the models start feeling interchangeable, the infrastructure layer becomes the moat. Storage, retrieval, compute, sandboxes, streaming protocols — these are the new switching costs. The "boring" AI infrastructure companies, as one observer put it, are where the wealth is actually accumulating.

**Key takeaways:**
- TurboPuffer reached $100M ARR in 19 months on under $1M raised, profitable
- Modal raised $355M at $4.65B to rebuild cloud infrastructure for AI workloads
- Exa raised $250M at $2.2B, focused on AI-native search and retrieval
- Hark raised $700M at $6B with sparse technical details — a vision bet
- Infrastructure is becoming the new moat as model differentiation compresses

**Why do I care:** If you are building AI applications, your architecture decisions about retrieval, compute, and infrastructure are now strategic bets, not just technical choices. The companies eating your lunch in 18 months will be the ones that figured out context retrieval before you did. TurboPuffer's trajectory should be a wake-up call.

---

## Agent Design Patterns Are Finally Growing Up

**TLDR:** The "single agent first" doctrine is gaining traction as practical wisdom, but the real story is that agent orchestration patterns are maturing into something engineers can actually reason about. Harnesses, subagent topologies, and product-layer expansions from OpenAI and Google are all pointing the same direction.

There is a piece of advice going around that sounds obvious but takes real experience to internalize: start with a single agent, and only move to multi-agent topologies when tool sprawl or prompt bloat becomes genuinely unmanageable. This is not timidity. This is the kind of thing you only say after watching teams spend two weeks building elaborate orchestration frameworks for problems that a well-prompted single agent would have solved. The advice comes from watching real systems fail, and it aligns with what the most experienced agent practitioners are reporting.

The Devin story is worth pausing on. One user described Cognition's sub-Devin workflow compressing what previously looked like two-plus engineer-weeks of work into a couple of hours. I am always cautious about these testimonials because they tend to be cherry-picked for the best case, but the directional signal is real. Agent-native compute is becoming a category unto itself, and the productivity delta between teams using it well and teams not using it at all is starting to look less like an edge and more like a cliff.

OpenAI's "Codex Thursday" update is interesting less for its individual features than for what they collectively signal. Appshots captures both screenshot and text from Mac app windows, giving agents richer working context. Team plugin sharing and org analytics are housekeeping. But remote computer use — Codex operating apps on your Mac from your phone even when the Mac is locked — that is a significant architectural statement. The agent product surface is moving from chat IDEs to persistent cross-device operator workflows. That is a different category of product entirely.

Google's Gemini story is moving fast too. Gemini 3.5 Flash now ranks first on the APEX-Agents-AA benchmark, outperforming larger models. One demo showed a GitHub issue triage agent built with a single Gemini API call and zero orchestration framework. Another showed Gemini 3.5 Flash replacing an entire custom vision pipeline for lane and car reasoning with one multimodal API call. The pattern here is consistent: the models are getting capable enough that sophisticated scaffolding is sometimes just adding latency and failure modes.

What is missing from most of the agent discourse is honest accounting of failure rates. The impressive demos show what works. Nobody is publishing the 40-step agent runs that derailed on step 12 and did something destructive. The harness work from researchers who boosted Gemini 3.1 Pro from 17.7 to 31.4 on physics problems is genuinely interesting, but the fact that GPT 5.5 Pro did not benefit from the same harness suggests model-specific scaffolding sensitivity that is going to cause real headaches at scale.

**Key takeaways:**
- Start with single agents; only add multi-agent topologies when complexity demands it
- Codex's remote computer use capability signals agents moving from IDEs to persistent cross-device operators
- Gemini 3.5 Flash tops APEX-Agents-AA, sometimes outperforming larger models with simpler prompting
- Physics harness boosted Gemini 3.1 Pro dramatically but had no effect on GPT 5.5 Pro — model-specific sensitivity is real
- LangChain's new typed streaming protocol and Auth Proxy are infrastructure maturing around agent workflows

**Why do I care:** The difference between a demo agent and a production agent is almost entirely in how you handle failure, security boundaries, and observability. The infrastructure pieces — sandboxes, auth proxies, typed streaming — are the things that will actually make agents deployable. Pay more attention to those than to benchmark numbers.

---

## OpenAI's Math Result and What It Actually Means for AI Research

**TLDR:** OpenAI reported an AI-assisted result on an Erdős unit-distance problem, sparking genuine debate about whether mathematics is uniquely well-suited as a domain for AI co-research. The reaction split between real excitement and predictable goalpost-moving.

Mathematics is getting a lot of attention as a frontier for AI co-research, and the OpenAI result on a problem related to Erdős unit distances is the clearest example yet of why. The argument for math as a proving ground is structural: unlike most domains where AI output is hard to evaluate, mathematical claims can be checked. You can verify a proof. You can extend a result. The feedback loop is tight and the ground truth is real.

The reaction to OpenAI's reported result was immediate and illuminating. Genuine mathematicians noted that if the reported low level of human interaction holds up, the result is genuinely interesting — not just a benchmark score but an actual contribution to open mathematics. At the same time, the criticism machine spun up almost immediately, with observers pointing out that the result was reportedly outdated by a human within hours and flagging the predictable "goalpost moving" about what counts as legitimate AI mathematics.

I think the goalpost critique cuts both ways. There is a contingent who will always find a reason the result "does not count," and there is a contingent who will oversell it. The honest position is that having AI contribute to unsolved problems in mathematics, even incrementally, is genuinely new territory. The question of how much human guidance was actually involved matters enormously — a system that generates candidate proofs for a human to verify is a different thing from a system that independently identifies and closes an open problem.

What nobody is saying in this debate is that the current excitement about math is partly a measurement convenience story. Math is getting attention because we can score it. Most of the domains where AI co-research would matter most — drug discovery, materials science, fundamental physics — have much murkier evaluation rubrics. The spotlight on math may be telling us more about what we can measure than about where AI is actually most useful.

**Key takeaways:**
- OpenAI reported an AI-assisted result on an Erdős unit-distance problem with reportedly low human interaction
- Mathematics is attractive for AI co-research because outputs can be independently verified
- Skepticism about the result was immediate; debate about what "counts" as AI-assisted math is ongoing
- The focus on math as a frontier may reflect measurement convenience as much as genuine AI capability

**Why do I care:** If AI systems can contribute to open problems in mathematics, the implications for formal verification, theorem proving, and eventually software correctness are direct. This is not just an academic curiosity. A system that can navigate mathematical reasoning at this level is eventually going to change how we think about correctness proofs in software.

---

## Representation Learning, Tokenization, and Linear Attention: Research Roundup

**TLDR:** RAEv2 brings faster convergence and better generation to representation-first vision models, Gated DeltaNet-2 challenges standard attention assumptions, and a controlled tokenization study from NousResearch reveals that most of the assumed benefits of subword tokenization do not actually show up at 1.7B scale.

The research front this week had several threads worth following. RAEv2, a follow-on to Representation Autoencoders, delivers more than 10x faster convergence with better reconstruction and generation quality. The key technical insight is that summing the last K encoder layers instead of only the final layer improves both reconstruction and generation without adding inference cost. RAE and REPA turn out to be complementary rather than competing — one handles semantics, the other spatial structure. This is a useful result because it suggests that representation-first architectures for unified vision understanding and generation still have significant headroom that the field has not fully explored.

NVIDIA's Gated DeltaNet-2 is the most interesting linear attention work I have seen in a while. It decouples erase and write operations using channel-wise gates, and at 1.3 billion parameters it outperforms competing architectures on language modeling and commonsense reasoning while showing notable gains on long-context retrieval benchmarks. The hybrid attention direction is worth watching — not because transformers are going away, but because the architectural space between pure attention and pure linear recurrence is genuinely underexplored and there are likely efficiency wins available there.

The NousResearch tokenization study deserves more attention than it is getting. They built a controlled experiment inside a 1.7 billion parameter byte-level pipeline, testing seven different hypothesized reasons why subword tokenization helps. Only three of the seven actually moved validation loss at that scale. This is the kind of ablation that the field needs more of — not a new architecture, not a benchmark, but a careful experiment that tells you which of the folk beliefs about why things work are actually true. The implicit warning is that a lot of the accumulated intuitions about tokenization may be artifacts of specific scale regimes.

The SAE discourse got an interesting update from GoodfireAI, who pushed back on the common critique that sparse autoencoders fail because models think in curved manifolds while SAEs use linear features. Their point is that the critique is only partly right, and the fix is not to abandon sparse features but to interpret them as structured ensembles — clusters of features that fire together — rather than isolated atoms. This is a more nuanced position than either "SAEs work great" or "SAEs are fundamentally broken," and it is the kind of methodological update that actually advances interpretability research.

**Key takeaways:**
- RAEv2 achieves 10x faster convergence through multi-layer encoder averaging; representation-first vision has more headroom
- Gated DeltaNet-2 challenges Mamba-class architectures on language and long-context tasks at 1.3B parameters
- NousResearch's controlled study: only 3 of 7 hypothesized subword tokenization benefits show up at 1.7B scale
- SAE interpretation should shift from single features to structured feature ensembles, per GoodfireAI
- Data filtering result: at sufficient compute (around 1e30 FLOPs), the best filter for internet-scale data may be no filter

**Why do I care:** The tokenization result is the one I keep coming back to. We have built enormous intuitions about why our systems work the way they do, and careful ablation studies keep finding that many of those intuitions do not hold. For practitioners, this means you should be skeptical of any architectural decision justified primarily by folk wisdom rather than ablation evidence.

---

## Multimodal Frontiers: Video Editing, Biology Models, and Open Robotics

**TLDR:** Runway's Aleph 2.0 brings reference-guided edit propagation to video, Hugging Face Bio's Carbon DNA models are running on Trainium2 on day one, and the LeRobot Humanoid shows that open full-stack robotics is actually becoming buildable.

Runway's new Edit Studio with Aleph 2.0 is solving a real problem in video production. The capability to edit a single frame and propagate that edit through the rest of the video is not a flashy demo — it is the thing that makes AI video editing actually useful for people who are not starting from scratch every shot. The underlying technical problem, reference-guided edit propagation with temporal consistency, has been a hard one. Getting it into a product that editors can actually use is the step that matters.

The Biology story is one I think the developer community is underreacting to. Hugging Face Bio's Carbon DNA model family — at 500 million, 3 billion, and 8 billion parameters — is now running on Trainium2 hardware on day one. Applications include sequence design, variant effect prediction, and learned representations for genomic data. The fact that these models compile and run on specialized AI inference hardware without a lengthy porting process is a practical milestone, not just a benchmark achievement. The gap between frontier biology AI and accessible biology AI is closing faster than most people realize.

The LeRobot Humanoid from Hugging Face is genuinely worth stopping on. About $2,500 in materials, 3D-printed, with complete hardware designs and CAD files released alongside calibration tools, runtime software, simulation environments, identification tools, and training pipelines. The comparison that keeps coming up in robotics circles is not "how does this compare to Boston Dynamics" — it is "how fast can I iterate on real robot learning workflows." Repairability and iteration speed matter far more than polish when you are trying to do research. A robot you can fix and modify in an afternoon is infinitely more useful than a robot you ship back to a vendor.

OlmoEarth v1.1 is a smaller story but a technically clean one: changing the tokenization of multi-resolution Sentinel-2 satellite imagery to produce three times fewer tokens results in three times cheaper and faster geospatial foundation model inference. The quadratic compute savings from shorter sequences in attention is well understood theoretically; seeing it applied cleanly in a domain-specific foundation model is a useful reminder that tokenization choices have real economic consequences.

**Key takeaways:**
- Runway Edit Studio enables single-frame edits propagated through entire videos — practical for real production work
- Carbon DNA models (500M to 8B) run on Trainium2 day one; biology AI is becoming more accessible
- LeRobot Humanoid: $2,500, fully open hardware and software, designed for research iteration speed
- OlmoEarth v1.1 achieves 3x cost/speed improvement through better tokenization of satellite imagery inputs
- Alibaba's MIGA enables train-free infinite-frame video generation with two-stage temporal alignment

**Why do I care:** The LeRobot Humanoid is the story I will be watching most closely over the next year. Open, affordable, repairable robotics hardware combined with open training pipelines is how the research community breaks the expensive-hardware bottleneck that has kept real robot learning in a handful of well-funded labs. If the community adopts this the way it adopted the original LeRobot arm designs, the pace of embodied AI research is going to accelerate noticeably.

---

## Compute Economics: Memory Is Eating the AI Chip

**TLDR:** HBM memory grew from 52% to 63% of total AI chip component spending between Q1 2024 and Q4 2025, and the global compute hierarchy is sorting into distinct tiers. The compute buildout is still accelerating, but frontier labs use well under total global capacity.

The compute taxonomy that Epoch AI and others are sketching out is clarifying. US leaders — OpenAI, Anthropic, Google, with Meta and xAI joining — are operating or building toward multi-gigawatt compute clusters. Chinese players are scaling from hundreds of megawatts toward multi-gigawatt on increasingly domestic hardware stacks. European contenders like Mistral are at roughly 90 megawatts today, aiming for 1 gigawatt by 2029. These are not just interesting numbers — they are the infrastructure constraints that will determine which organizations can train frontier models in three years.

The memory economics story inside that buildout is the detail that gets less attention than it deserves. HBM — high bandwidth memory — grew from 52% to 63% of total AI chip component spending in the span of about 18 months. The computational demands of large models are increasingly bottlenecked not by raw compute throughput but by memory bandwidth and capacity. This is why memory suppliers have more pricing power in the AI chip market than the headlines about GPU shortages would suggest.

The bigger question that nobody has a clean answer to is how much further the buildout can accelerate. Epoch AI notes that even the biggest labs use well under total global compute capacity. There is no immediate physical ceiling. The constraints are economic — whether the returns on additional compute investment justify the capital — and organizational — whether there are enough trained people and built-out supply chains to move faster. Those constraints are real but they are not fixed.

**Key takeaways:**
- HBM memory is now 63% of AI chip component spending, up from 52% 18 months ago
- Global compute is sorting into multi-gigawatt US/China tier and a smaller European contender tier
- Frontier labs still use well under total global compute capacity — no physical ceiling yet
- vLLM's Elastic Expert Parallelism enables live MoE topology resizing without full restarts via NVLink/RDMA

**Why do I care:** If you are making infrastructure decisions about where to run serious AI workloads, the memory bandwidth story matters as much as raw FLOP counts. Models that are memory-bound behave very differently from compute-bound models under load, and most of the frontier models right now are memory-bound. Building intuition about that distinction will save you from a lot of confusing capacity planning surprises.
