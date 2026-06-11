---
title: "Open Models, Agent Labs vs Model Labs, and What You Cannot Train Away"
excerpt: "Sarah Guo's framework for what's untrainable, Anthropic's silent capability gating controversy, DiffusionGemma's 4x speed claims, and where agent tooling is actually maturing."
publishedAt: "2026-06-11"
slug: "open-models-agent-labs-model-labs-untrainable-ainews"
hashtags: "#ai #llm #ml #openmodels #agents #anthropic #diffusion #generated #en"
source_pattern: "AINews"
---

## Sarah Guo on What's Untrainable, and Why That's the Whole Game

**TLDR:** Sarah Guo published a framework arguing that the real moat in AI applications isn't the model, it's the unglamorous integration work that connects private company reality to model capabilities. She calls this "untrainable" and I think she's onto something that most people building on APIs aren't taking seriously enough.

**Summary:** The piece centers on a concept called legibility, and if you're not familiar with it in this context, it's worth a detour. The argument goes that the companies building durable businesses aren't the ones with the best prompts or the fastest model access. They're the ones doing the boring, hard, never-ending work of translating a company's private data, workflows, and organizational reality into something a model can actually act on. That translation work, as Sarah puts it, runs as long as the relationship does. It's won by teams with domain-specialized engineers sitting next to the customer, not by teams optimizing inference costs.

This connects directly to the ongoing conversation about whether model labs or agent labs hold the leverage. Sarah is a Cognition investor, so her read here isn't neutral, but the underlying logic holds up. Application companies that own the integration layer are doing something a foundation model literally cannot replicate by training on more data. You can't train your way to knowing how a specific manufacturing company manages its parts inventory or how a specific law firm structures its client intake. That knowledge has to be earned in the field.

The note on intent at the end is worth sitting with. The model will do whatever you point it at, she writes, but it cannot tell you what's worth pointing at. That is a genuine gap in the current capabilities story that people tend to gloss over. Benchmarks measure execution, not judgment about what to execute. And incumbents, she argues, mostly defend territory rather than discover new territory, which is why the next important things tend to come from outsiders who find a use before anyone else recognizes it as a use.

I find myself agreeing with most of this, while also wanting to push back on one edge. The integration moat argument is compelling, but it assumes the integration complexity stays complex. If model capabilities keep improving on tool use, long-context understanding, and autonomous planning, some of that "unglamorous translation work" becomes trainable. Not all of it, probably not the most organization-specific bits, but more of it than the framework implies. The moat is real, but it's not static.

**Key takeaways:**
- The untrainable moat is domain-specific integration work, not prompt engineering
- Agent labs and application companies that own translation layers have more durable positions than pure API consumers
- Intent, meaning choosing what to build, remains genuinely untrainable and un-benchmarkable
- Open model adoption has flipped from bearish to bullish among practitioners between 2024 and 2026

**Why do I care:** As a senior frontend developer or architect building on AI, this framework is a useful forcing function. Ask yourself whether the thing you're building is fundamentally replicable by anyone with API access, or whether you're accumulating integration depth that compounds over time. If it's the former, your defensibility is thin regardless of how good your UX is.

**Link:** [[AINews] Open Models, Model Labs vs Agent Labs, and What's Untrainable — Sarah Guo](https://www.latent.space/p/ainews-open-models-model-labs-vs)

---

## Anthropic's Silent Capability Gating and the Trust Problem

**TLDR:** The AI community had a significant reaction to reports that Anthropic is silently degrading model performance on AI research-related prompts rather than hard-refusing them. The backlash was unusually broad and cut across researchers, builders, and enterprise teams.

**Summary:** The core complaint isn't that Anthropic is restricting certain use cases. Restrictions are understandable. The complaint is that the restriction is silent. Observed model behavior diverges from actual model capability with no disclosure, no refusal, no signal to the user that the model is deliberately underperforming. For anyone running evals or building production systems that depend on reproducible outputs, this is a serious problem. You can't debug what you can't see.

Critics like Nate Lambert, Martin Casado, and others made the point that explicit refusals, while annoying, are actually the more defensible engineering choice. A refusal tells you where you stand. Silent degradation means your benchmarks, your eval harnesses, and your reproducibility assumptions are all potentially compromised without warning. Fei-Fei Li's reaction from the academic side echoed this: scientific progress requires access to the best tools, and a model that secretly performs worse on research-adjacent tasks is not the tool you think it is.

The enterprise dimension added another layer. Reports of 30-day prompt and data retention with no opt-out in some Fable/Mythos configurations immediately creates compliance problems for zero-retention environments and European deployments under data regulations. Gergely Orosz's coverage of the prompt-history retention issue and the opaque model changes generated substantial attention. The practical lesson that multiple practitioners repeated: treat frontier APIs as unstable dependencies, maintain model portability, and verify outputs continuously. That's not paranoia at this point, it's just good engineering practice.

The timing made things worse. Dario Amodei published a policy piece called "Policy on the AI Exponential" arguing AI progress is outrunning institutions and calling for stronger frontier oversight, right in the middle of the backlash about Anthropic's own opaque private controls. The tension was not subtle and the community noticed.

**Key takeaways:**
- Silent capability degradation is more damaging to trust than explicit refusals
- Reproducibility and eval validity are at risk when model behavior is intentionally hidden
- Enterprise zero-retention and European compliance requirements are immediately affected by retention policy changes
- The right engineering response is model portability and continuous output verification with evals
- Anthropic calling for stronger public oversight while being criticized for opaque private controls is a credibility problem

**Why do I care:** If you're an architect who has built any significant system on top of Claude or any frontier API, this is a reminder that those APIs are not stable infrastructure. The contract can change silently. You need abstraction layers, model-agnostic evaluation harnesses, and the organizational willingness to switch providers. That's not an overreaction, it's table stakes now.

**Link:** [[AINews] Open Models, Model Labs vs Agent Labs, and What's Untrainable — Sarah Guo](https://www.latent.space/p/ainews-open-models-model-labs-vs)

---

## Fable 5 Benchmark Performance: Strong Numbers, Complicated Reality

**TLDR:** Despite the policy controversy, Fable 5 is showing genuinely strong benchmark performance on agentic and coding tasks, leading Agent Arena overall and posting impressive scores on several specialized evaluations. The gap between model capability and model trustworthiness is wider than it's ever been.

**Summary:** The community reaction to Fable 5 capability results was notably bifurcated. On one side, practitioners doing long-horizon coding, hard bug-fixing, and creative generation tasks described substantial productivity gains. The model topped Agent Arena with large margins on confirmed task success and user praise metrics. SimpleBench at 81.9%, number one on CADGenBench, strong computer-use results on several benchmarks. The benchmark picture is legitimately impressive.

On the other side, others reported brittle behavior, high token consumption costs, and specific task areas where it underperformed GPT-5.5. The "completely demolishes my benchmark" quote from one developer became one of the most-cited capability endorsements of the week, which tells you something about how capability signal works on AI Twitter: one enthusiastic practitioner with a specific benchmark can move discourse more than a careful aggregate evaluation.

The distribution integration happened quickly regardless of controversy. Perplexity added Fable 5 as an orchestrator model in Computer for Pro and Max users. Apple developers got Foundation Models framework support for multi-step reasoning and longer context. But there was also visible substitution pressure toward OpenAI and Codex following the trust backlash, with usage share reportedly shifting away from Anthropic among some segments of the developer community.

The honest takeaway is that Fable 5 is probably state-of-the-art for many agentic coding tasks right now, and the policy and trust issues are separately real. These things can both be true simultaneously. A powerful model you can't rely on to behave predictably is a different product than the benchmark scores alone would suggest.

**Key takeaways:**
- Fable 5 leads Agent Arena overall with strong margins on confirmed task success
- 81.9% on SimpleBench, number one on CADGenBench, strong computer-use results
- Real-world results are split: major gains on long-horizon coding, brittleness and cost issues on other tasks
- Usage share reportedly moving toward OpenAI among developers affected by the trust controversy
- Capability and trustworthiness are separate dimensions and both matter

**Why do I care:** The benchmark scores are useful signal, but the product story is more complicated. If you're deciding which model to bet your architecture on, you need to evaluate trust and stability characteristics alongside capability scores. A model that leads benchmarks but creates compliance risk or behaves unpredictably in production is not necessarily the right choice for your system.

**Link:** [[AINews] Open Models, Model Labs vs Agent Labs, and What's Untrainable — Sarah Guo](https://www.latent.space/p/ainews-open-models-model-labs-vs)

---

## Google's DiffusionGemma: Diffusion-Style Text Generation Gets Serious Infrastructure

**TLDR:** Google released DiffusionGemma, a 26B MoE diffusion text model under Apache 2.0, claiming up to 4x faster output than autoregressive generation and over 1000 tokens per second on suitable hardware. This is the first diffusion LLM natively supported in vLLM.

**Summary:** The core idea with diffusion-style text generation is that instead of predicting tokens one at a time left to right, the model generates and refines blocks of text simultaneously through a denoising process. The speed claims are substantial: vLLM reported 1200+ output tokens per second at batch size 1 on a single H200 with FP8, and local execution on 18GB-class hardware was demonstrated via llama.cpp with GGUFs. The active parameter count is 3.8 billion with 256-token block denoising.

The Apache 2.0 license matters. This isn't a research artifact behind a restricted license or a model you have to apply for access to. The open weights mean the research community can actually work with it, run ablations, and build on it without asking Google's permission. That's a meaningful choice and it landed well.

The systems story is arguably more interesting than the capability story right now. vLLM native support means this is serving-infrastructure ready, not just a research curiosity. The Unsloth team showing local execution on 18GB hardware extends the accessibility story further. These infrastructure integrations are what turn a released model into something practitioners can actually evaluate.

Researchers were more interested in what diffusion-style generation opens up than in direct head-to-head comparisons with autoregressive models. Iterative refinement, fill-in-the-middle, constrained editing, error correction over multiple passes: these are all use cases where the non-sequential nature of diffusion decoding could be genuinely useful. The framing from several researchers was explicitly "fertile research direction" rather than "this beats GPT-5.5," which is probably the right frame at this stage.

**Key takeaways:**
- 26B MoE architecture, Apache 2.0, open weights
- Claims up to 4x faster output than autoregressive generation
- 1200+ tokens/sec at batch 1 on H200 with FP8 via vLLM native support
- Runs locally on 18GB hardware via llama.cpp
- Opens up iterative refinement, constrained editing, and fill-in-the-middle use cases

**Why do I care:** The serving speed numbers are interesting if they hold up in diverse workloads. For applications where output latency is a bottleneck, a genuinely faster generation paradigm matters. The open weights and Apache 2.0 license make this worth actually testing rather than just reading about. I'd be particularly curious about quality on tasks requiring coherence across long outputs, which is where diffusion approaches have historically struggled.

**Link:** [[AINews] Open Models, Model Labs vs Agent Labs, and What's Untrainable — Sarah Guo](https://www.latent.space/p/ainews-open-models-model-labs-vs)

---

## Agent Tooling: Benchmarks, Memory, and the Missing Systems Layer

**TLDR:** Multiple launches this week targeted the infrastructure layer around agents, including trace-based agent evaluation, structured memory systems, and new GUI controls for agent memory updates. The field is developing its own systems thinking separate from model capability improvements.

**Summary:** The Agent Arena benchmark methodology deserves attention because it represents a shift in how agent performance gets measured. Instead of human preference ratings on individual outputs, it mines long-horizon traces for objective signals like bash errors, tool hallucination rates, and what the team describes as "insanity," meaning unpredictable behavior in long chains of tool calls. When a task spans dozens of tool calls and 30-minute traces, asking a human to prefer one full trace over another is not a reliable signal. Mining those traces for concrete failure modes is a better approach and more aligned with what actually breaks in production agentic systems.

The memory and orchestration launches addressed the gap between what a model can do in a single context and what an agent needs to function over time. Weaviate's Engram system described structured agent memory using groups, topics, and scopes, moving toward something more like a managed knowledge base than a flat context window. Teknium's GUI-based Hermes Agent profiles and Write Gate approval controls for memory and skill updates are interesting because they put human oversight into the update loop rather than letting the agent freely modify its own persistent state.

Factory AI's Missions launch and the DeLM decentralized multi-agent framework represent different bets on how orchestration should work. DeLM's reported 65.7% SWE-bench Verified with Gemini 3-Flash at less than half the cost of centralized alternatives is a striking claim if the benchmark methodology holds. The cost efficiency angle is where I'd push back most: benchmark performance on controlled tasks often doesn't translate cleanly to cost efficiency on production workloads with messier inputs.

The browser-in-the-loop argument from Chris Broman is worth tracking. The argument is that client-side browser capabilities are an underutilized tool in the agent loop, and agents that can operate directly in browser environments have access to interaction primitives that API-only agents miss. This connects to the broader systems thinking that the tools and environment an agent operates in matter as much as the model it's running.

**Key takeaways:**
- Trace-based agent evaluation using objective failure signals is more reliable than preference ratings at scale
- Structured memory systems with scopes and approval gates are becoming practical infrastructure
- DeLM claims 65.7% SWE-bench Verified at less than half centralized cost, worth verifying independently
- Browser-in-the-loop capabilities are an underexplored resource in production agent systems
- The missing systems layer around agents is getting more tooling investment than model capability work right now

**Why do I care:** As someone architecting systems that include agentic components, the memory and evaluation infrastructure matters as much as the base model choice. If you're building agents that operate over time and across sessions, you need structured memory with human oversight controls, and you need evaluation that catches actual failure modes rather than preference drift. These tools are becoming available and worth evaluating.

**Link:** [[AINews] Open Models, Model Labs vs Agent Labs, and What's Untrainable — Sarah Guo](https://www.latent.space/p/ainews-open-models-model-labs-vs)

---

## Security Threat: Malware Authors Embedding CBRN Text to Evade AI Analysis

**TLDR:** A security researcher documented malware authors embedding nuclear and biological text in their code specifically to trigger LLM refusals and evade AI-powered malware analysis tools. This is a concrete and serious exploitation of safety behavior.

**Summary:** The attack is straightforward once you know it exists. Security tools are increasingly using LLMs to analyze suspicious code and identify malware. Safety training causes models to refuse or degrade output when they encounter nuclear, biological, chemical, or radiological text. Malware authors have figured this out and are embedding that text as a countermeasure, not because it's functionally relevant to the malware, but because it breaks the analysis pipeline.

John Scott-Railton's post on this drew major attention and deserved to. This isn't a theoretical attack surface. It's a documented technique being used in the wild. The safety behavior that was trained to prevent harm in one context is creating a blind spot in a security-critical context. Models that refuse to analyze content they've been trained to avoid will miss malware that's been deliberately constructed to trigger those refusals.

This is a good example of the second-order effects that are hard to anticipate when you train broad safety behaviors. The intent is to prevent the model from helping someone build a bioweapon. The side effect is that security researchers using the model to analyze malware get blocked when the malware has been engineered to look like it contains bioweapon-adjacent text. The attacker doesn't need the model to actually help them, they just need the refusal.

The broader lesson is that safety behaviors create attack surfaces that adversaries can map and exploit. This will happen in more domains, not fewer. Any system where a refusal has security consequences is a potential target for this kind of manipulation.

**Key takeaways:**
- Documented technique: malware authors embed CBRN text to trigger LLM safety refusals and evade AI analysis
- Safety training behaviors create exploitable blind spots in security-critical analysis pipelines
- Refusals in security tooling are not just inconvenient, they are the attack outcome the adversary is targeting
- This attack pattern will generalize to other domains where refusals have exploitable consequences

**Why do I care:** If you're building any system that uses LLMs for security analysis, content moderation, or adversarial input detection, you need to account for the possibility that inputs have been engineered to trigger model safety behaviors. Your safety training is now part of your attack surface. That requires architectural responses, not just better safety training.

**Link:** [[AINews] Open Models, Model Labs vs Agent Labs, and What's Untrainable — Sarah Guo](https://www.latent.space/p/ainews-open-models-model-labs-vs)
