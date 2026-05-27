---
title: "AI Infra Decacorns, Agent Harnesses, and the Inference Crunch of 2026"
excerpt: "Fireworks and Baseten reach decacorn status, OpenRouter raises $113M, and the AI community debates whether harness engineering is now more important than the model itself."
publishedAt: "2026-05-27"
slug: "ai-infra-decacorns-fireworks-baseten-openrouter-inference-crunch"
hashtags: "#aiinfra #inference #agents #codingagents #llm #openrouter #vllm #ai #generated #en"
source_pattern: "AINews"
---

## AI Infra Decacorns: Fireworks, Baseten, and the Inference Money Pile

**TLDR:** Fireworks AI is in talks for a $15B round (3.75x in 7 months), Baseten is raising at an $11B valuation (2.2x in 3 months), and OpenRouter closed a $113M Series B with weekly token volume jumping from 5 trillion to 25 trillion in six months. The inference layer of the AI stack is getting expensive, fast.

I keep thinking about what this funding pace actually signals. These are not model companies. Fireworks and Baseten are pure inference infrastructure. They run other people's models at scale. The fact that they're hitting decacorn territory without training a single frontier model says something pretty direct: the commodity everyone actually needs right now is fast, reliable, cheap inference, not more parameters. The model training race is real, but serving that compute to real applications is where the money is consolidating.

OpenRouter's story is even more telling. Five trillion tokens a week to twenty-five trillion in six months. That's not linear adoption, that's a stack becoming load-bearing for a large chunk of production AI. When your routing layer is growing that fast, raising $113M to build out the infrastructure makes complete sense. Multi-model routing isn't a nice-to-have anymore. If you're building a serious product and pinning to a single provider, you're making a risky architectural decision.

The broader pattern the newsletter calls out is what they named the "Inference Inflection." Demand is growing faster than capacity, particularly for long-context workloads. Epoch AI's rough modeling suggests that while current global Blackwell supply can technically serve today's demand under favorable assumptions, throughput degrades sharply as context lengths grow. We're about to hit a real supply constraint, not a theoretical one. Fireworks and Baseten are betting that constraint persists for years.

For anyone building on top of APIs right now, the practical takeaway is simple: cost and latency predictability are going to get harder, not easier. Diversifying your inference providers, building in routing logic, and thinking about caching strategies are no longer premature optimizations. They're basic reliability work.

**Key takeaways:**
- Fireworks AI at $15B and Baseten at $11B confirm inference infrastructure is now a major platform layer, not a commodity utility
- OpenRouter's 5x token growth in six months makes a $113M raise look conservative
- Long-context workloads are the pinch point for supply constraints, and demand growth is outrunning capacity additions

**Why do I care:** From an architecture perspective, this is the moment to stop treating your AI inference provider as a dumb HTTP endpoint and start treating it like a database. You'd never hardcode a single DB host with no failover. The same logic applies here. Build the routing abstraction now before the crunch forces your hand.

**Link:** [AINews - New AI Infra Decacorns](https://www.latent.space/p/ainews-new-ai-infra-decacorns-fireworks)

---

## Harness Engineering Is the New Model Racing

**TLDR:** Multiple converging signals from DeepSeek, Google, LangChain, and researchers point to the same conclusion: the winning stack for coding agents is model plus harness plus eval loop, not just a stronger base model. The harness, not the weights, is becoming the main differentiator.

Here's what gets me about this conversation. For two years the narrative was "wait for the next model." GPT-4 to GPT-4o to Claude 3 to Claude 3.5, each release reshuffled the leaderboards and everyone chased the new hotness. That narrative isn't wrong, but it's increasingly incomplete. DeepSeek is reportedly building a dedicated harness team focused on closing the loop between model output, runtime feedback, validation, and correction. That's a software engineering investment, not a training investment. Google's Gemini Managed Agents guide frames agent infrastructure as a single API call to a managed harness with sandboxing, persistence, and filesystem mounts. LangChain updated their agent creation docs around context governance, trustworthy memory, and dynamic skill routing.

The DeepSWE benchmark is worth paying attention to specifically because it's one of the first coding benchmarks that practitioners are calling genuinely representative of real development experience. The creator framed it as "the first code bench that actually aligns with how it feels to use these models coding." That's a high bar, and the fact that it creates more separation at the top than existing SWE leaderboards suggests the previous benchmarks were measuring something slightly adjacent to actual usefulness. Qwen3.7 Max debuting at fourth on Code Arena Frontend roughly on par with Claude Opus 4.6 on agentic web dev tasks is another data point worth filing away.

The Claude Code security plugin announcement is the most concrete product signal in this batch. Anthropic reported a 30 to 40 percent reduction in security-related PR comments from internal use. That's not a benchmark number, that's a production metric. It suggests that adding specialized scaffolding around a capable model produces measurable workflow improvement, which is exactly the harness thesis in miniature. The plugin isn't making Claude smarter. It's giving Claude a better context frame for a specific task category.

I think the practical implication for frontend engineers building with AI tooling is straightforward. Stop evaluating raw model capability in isolation and start evaluating the full stack. The harness matters as much as the model. Context governance, memory, recovery from stale state, reconnect handling — these are the things that separate a demo from a production agent.

**Key takeaways:**
- Harness engineering (context governance, memory, eval loops) is becoming the main differentiator for coding agent quality
- DeepSWE is the first coding benchmark practitioners broadly agree matches real development experience
- The Claude Code security plugin's 30-40% reduction in security PR comments is a concrete production metric for the harness thesis

**Why do I care:** As someone who thinks about architecture, the harness conversation is the most useful reframe I've seen in a while. It moves the question from "which model should I use" to "how do I build the scaffolding that gets the most out of any capable model." That's a much more durable engineering investment.

---

## Language Models Need Sleep, and Other Memory System Updates

**TLDR:** A paper called "Language Models Need Sleep" proposes a consolidation phase where recent context is converted into persistent fast weights before clearing the KV cache, moving compute offline while preserving wake-time latency. It's getting attention as a practical alternative to ever-growing context windows for long-running agents.

The sleep consolidation paper is interesting for a specific reason: it's not trying to make models smarter. It's trying to solve the operational problem of what you do when a long-running agent has accumulated so much context that the KV cache becomes a burden. The mechanism converts recent context into persistent fast weights in an offline pass, then clears the cache. The model wakes up with the knowledge integrated into weights rather than sitting in an expensive context window. This is a real engineering trade-off, not a toy idea.

The systems angle connects to a broader set of discussions happening around memory in agents. Anthropic's Dream feature and their memory talk were circulating in the same conversation. Omar Khattab and others have been thinking about this space seriously. The core tension is that context windows keep getting longer, which feels like a solution, but it's really just pushing the problem forward. At some point you hit throughput limits, latency limits, or cost limits. Sleep-style consolidation is one architectural answer to that ceiling.

For long-horizon research agents, this matters a lot. The QUEST family of open models (2B to 35B) released this week specifically targets long-horizon fact-seeking, citation grounding, and report synthesis. That workload generates long trajectories by definition. Whether sleep-style weight consolidation integrates well with that kind of agent loop is an open question, but the timing of both releases in the same news cycle suggests the research community is actively working this problem from multiple angles.

**Key takeaways:**
- The "Language Models Need Sleep" paper proposes offline context consolidation into fast weights as an alternative to growing KV caches
- This is a systems engineering approach to long-running agents, not a pure model improvement
- QUEST released open 2B-35B models specifically for long-horizon research tasks including citation grounding and report synthesis

**Why do I care:** For anyone building agents that run for more than a few turns, KV cache management is already a practical constraint. A sleep-style consolidation approach could become a useful architectural pattern once it matures. Worth watching, even if it's not production-ready today.

---

## vLLM Gets a Rust Frontend, MiniMax M3 Teases Sparse Attention Gains

**TLDR:** vLLM merged a Rust frontend as a drop-in alternative to its Python API server, showing roughly 837 requests per second versus 162 on a preprocess-heavy workload. MiniMax teased M3 as open source with reported 9.7x prefilling and 15.6x decoding speedups at 1M tokens compared to M2.

The vLLM Rust frontend number is the kind of concrete benchmark that actually matters for high-throughput serving. Going from 162 to 837 requests per second on a preprocess-heavy workload in a single process is a meaningful improvement. Python API servers are convenient, but they carry overhead that becomes visible at scale. This isn't a rewrite of the whole stack, it's a drop-in alternative, which means you can adopt it incrementally without rebuilding your serving infrastructure. For anyone hitting CPU or API server bottlenecks, this is worth testing immediately.

MiniMax's M3 announcement is more speculative but technically interesting. The reported speedups (9.7x prefilling and 15.6x decoding at 1M tokens versus M2) are eye-catching numbers. Technical commentary suggests M3 moves back to GQA-based sparse attention with block selection on real KV, which is meaningfully different from DeepSeek's compressed-attention variants. The distinction matters for understanding what trade-offs the design is making. GQA-based sparse attention with block selection is a more traditional path than DeepSeek's approach, but at those reported speedup numbers it would be a practical option for long-context serving if the numbers hold.

The optimizer research front is also active. AMUSE (Anytime MUon with Stable gradient Evaluation) combines the Muon optimizer with schedule-free-style gradient evaluation to achieve stable training without learning rate decay. Results at 124M, 720M, and 1B parameter scales plus ViT and ImageNet fine-tuning suggest this is a real advance for practitioners who want to remove another hyperparameter from their training runs.

**Key takeaways:**
- vLLM's Rust frontend is a drop-in swap that delivers roughly 5x throughput improvement on preprocess-heavy workloads
- MiniMax M3's claimed sparse attention speedups at 1M token context are large enough to matter for production long-context serving if validated
- AMUSE enables schedule-free stable training without LR decay, tested across multiple scales

**Why do I care:** The vLLM Rust frontend is the most immediately actionable item here. If you're running vLLM in production at any meaningful scale, benchmarking this should be on your list for this week.

---

## Datacenter Power, Huawei's Roadmap, and the Semiconductor Stack

**TLDR:** SemiAnalysis published a deep read on the 800VDC datacenter transition (endorsed by John Carmack), Epoch AI modeled inference supply constraints showing demand outrunning capacity, and Huawei's "tau scaling" paper is being read as a strategic manifesto rather than a validated engineering result.

The 800VDC story is one of those infrastructure shifts that seems boring until you realize it changes the economics of running AI at scale. The transition from traditional 48V datacenter power to 800VDC draws directly from EV power electronics, including silicon carbide components. The efficiency gains at that voltage level are real and compound across a large datacenter. John Carmack recommending the SemiAnalysis piece on this is a signal worth noting. He's careful about what he publicly endorses technically.

Huawei's tau scaling paper deserves some skepticism. The core proposal is treating time constant tau as the unifying metric across device, chip, and datacenter scales rather than process node. The concrete claims (plus 55 percent density, plus 41 percent energy efficiency, plus 13 percent frequency on a future Kirin design via LogicFolding) are specific enough to be interesting, but the detailed thread analyzing it was careful to note what's missing: die photos, SEM images, workload details, yield curves. The most useful frame is to read it as a strategic roadmap document from a company that knows it can't win on lithographic parity with TSMC, so it's betting on packaging, architecture, and optical interconnects like Hi-ONE.

The inference supply constraint analysis from Epoch AI is the most operationally relevant item in this cluster. The rough model says current global Blackwell supply could technically serve today's demand under favorable assumptions, but throughput degrades sharply with longer contexts, and demand growth may already be outrunning supply additions. This isn't an abstract concern. It connects directly to why Fireworks, Baseten, and OpenRouter are raising at these valuations.

**Key takeaways:**
- The 800VDC datacenter power transition is a real infrastructure shift with compounding efficiency benefits drawn from EV electronics
- Huawei's tau scaling paper is best read as a strategic manifesto rather than validated engineering, with key benchmarking artifacts missing
- Epoch AI's supply constraint model suggests inference capacity for long-context workloads is already tight and getting tighter

**Why do I care:** The supply constraint analysis is worth understanding at a strategic level. If you're planning infrastructure costs for AI-heavy applications over the next 12-18 months, assuming stable or decreasing inference pricing may be optimistic.

---

## Qwen 3.7 Max Benchmarks, Local LLM Hardware, and the Open-Weight Question

**TLDR:** Qwen 3.7 Max positions itself as competitive with or ahead of Claude Opus 4.6 on many agentic benchmarks, the LocalLlama community is actively running Qwen 3.6 35B A3B on 12GB VRAM hardware using ik_llama.cpp, and the debate about whether Alibaba will open-weight the Max series is unresolved.

The Qwen 3.7 Max benchmark slide is interesting context but needs the usual caveats. Any company's own benchmark comparison is a marketing document first and a technical document second. The slide positions Qwen 3.7 Max ahead of Claude Opus 4.6 Max on several tasks and roughly competitive on others. Claude Opus 4.6 Max still appears to lead on ClawEval and CoWorkBench. The more important nuance is that the LocalLlama community is correctly pointing out that Alibaba has not historically open-weighted the Max series. If a Qwen 3.7 open-weight release happens, it will likely be a smaller model with different architecture trade-offs, not the flagship Max that's being benchmarked here.

The local hardware numbers are genuinely interesting. ik_llama.cpp running Qwen 3.6 35B A3B with IQ4_XS quantization at 110 tokens per second on an RTX 4070 Super 12GB is a meaningful result. For context, that's a 35 billion parameter mixture-of-experts model running locally at practical speeds on consumer hardware. The 23 percent throughput improvement over upstream llama.cpp from better MTP speculative decoding behavior is the kind of optimization that compounds over a session. The VRAM-saving tricks being shared (using a CPU-rendered compositor session to drop KDE idle VRAM from over 1GB to 126MB) show how seriously this community is pushing hardware limits.

The workflow post about using Qwen 3.6 locally for real DevOps automation is worth reading in full if you're skeptical about local model usefulness. The pattern described, converting repeatable procedures into skills that a manager process dispatches to fresh-context sub-agents, is a concrete and reproducible architecture. The WhatsApp audio to landing page pipeline using local transcription, local generation, and git-based ticket management is the kind of thing that would have required cloud APIs six months ago.

**Key takeaways:**
- Qwen 3.7 Max benchmark claims are competitive with Claude Opus 4.6 but come from Alibaba's own marketing materials and the open-weight release is uncertain
- ik_llama.cpp achieves 110 tokens per second on Qwen 3.6 35B A3B with 12GB VRAM, a 23 percent improvement over upstream llama.cpp
- Local agent workflows using small Qwen MoE models are now practical for real DevOps and content automation tasks

**Why do I care:** The local hardware numbers matter for deciding whether to invest in local inference infrastructure. If you can run a 35B MoE model at 110 tok/s on a single consumer GPU, the cost math for private, offline, low-latency inference starts looking very different from the cloud-only calculation.
