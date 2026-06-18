---
title: "Midjourney Goes Medical, Noam Shazeer Joins OpenAI, and the AI Agent Verification Gap"
excerpt: "Midjourney announces a full-body ultrasound CT scanner and spa concept, Noam Shazeer moves to OpenAI, and researchers push on reasoning models, agent efficiency, and open-weight benchmarks."
publishedAt: "2026-06-18"
slug: "midjourney-medical-scanner-noam-shazeer-openai-ai-agents"
hashtags: "#ainews #ai #llm #agents #openweights #imaging #inference #rl #generated #en"
source_pattern: "AINews"
---

## Midjourney Medical: A Full-Body Ultrasound Scanner and a Very Ambitious Bet

**TLDR:** Midjourney announced a full-body ultrasonic CT scanner called the Midjourney Scanner, along with plans for a San Francisco spa as its first deployment site. The device uses water immersion and 358,000 ultrasonic elements to image the entire body, but it is still a Gen 1 prototype with no AI processing yet and significant clinical questions unresolved.

**Summary:** So Midjourney, the image generation company you know from diffusion models and subscription art tools, has decided to build medical hardware. I was at the livestream. The energy in the room was genuinely electric, the kind of thing where you look around and think something unusual might actually be happening. David Holz framed this as the first new whole-body imaging modality in fifty years. That is a big claim and worth examining carefully, but the hardware they showed is real, not vaporware.

The scanner works by surrounding a person in a water-filled ring, about 70 centimeters in diameter, studded with 358,000 ultrasonic elements across 40 systems. Sound travels through water at roughly 1,481 meters per second, and the system captures around 17 gigabytes per second of raw acoustic data, producing about 40 gigabytes per body slice reconstructed on 21 servers. Current scans take around 20 minutes because the system is bottlenecked by bandwidth and early prototype infrastructure, but the target is several hundred slices in 60 seconds. The claimed resolution is down to about half a millimeter for internal tissue.

What Holz is really pitching here is longitudinal body tracking at scale. Not one MRI a year as a sick person, but weekly or monthly scans as a healthy person trying to understand what their body is actually doing. That vision is coherent and I find myself genuinely interested in it. The comparison he makes is to daily step counts or glucose monitors, where cheap, frequent data changes behavior. If you could see your muscle composition change week over week, you would train differently. If you could see inflammation patterns shift after dietary changes, you would eat differently. The feedback loop is the product.

The spa concept is where it gets weird in a useful way. Holz does not want the scanner to feel clinical. He wants it to feel like a luxury wellness visit, which is why the first location near Union Square in San Francisco will have hot tubs, saunas, cold plunges, and a gym alongside nine or ten scanners across 25,000 square feet. The goal is to learn whether people want scan-only visits, spa-plus-scan memberships, or something else entirely. This is actually smart product research disguised as a business.

What the transcript does not address, and what I think matters enormously, is the clinical workflow. Who reads these scans? What happens when the AI finds something ambiguous? Holz mentions detecting weird changes as if that is straightforwardly good, but frequent full-body imaging generates incidentalomas at a remarkable rate. Unexpected findings create anxiety, prompt followups, cost money, and sometimes cause harm. The regulatory path for body composition is apparently manageable, but the jump from body composition to thousands of diagnoses is where the entire clinical and legal machinery of medicine sits, unresolved. Holz was careful not to overclaim on FDA status, but the gap between a cool ultrasound image and a reimbursable, clinically validated diagnostic product is not a detail. It is the whole thing.

**Key takeaways:**
- The scanner is a real prototype with 358,000 ultrasonic elements and sub-millimeter resolution targets, but current scans take 20 minutes and no AI processing is used yet in shown images.
- The spa deployment is a deliberate learning lab to understand consumer behavior before scaling, with a Gen 2 scanner expected by end of 2026.
- Clinical validation, FDA clearance beyond body composition, and the operational challenge of frequent false positives remain open and largely unaddressed.

**Why do I care:** As someone who thinks about developer tooling and platform architecture, the interesting question here is the data infrastructure play. Midjourney says it generates around 806 terabytes of raw data per scan session and reconstructs using 21 servers and 2 petaflops of compute. If this scales, they are building one of the most unusual health data platforms ever attempted, and the AI opportunity on top of that data is genuinely different from anything current medical AI companies are working with. The recurring scan model means longitudinal diffs, not one-shot diagnosis. That is a harder and more interesting machine learning problem, and I would watch what they build on top of the scanner more than the scanner itself.

**Link:** [AINews: Midjourney Medical — scan your organs like you step on a scale](https://www.latent.space/p/ainews-midjourney-medical-scan-your?publication_id=1084089&post_id=202529490&isFreemail=true&triedRedirect=true)

---

## Noam Shazeer Joins OpenAI in the Most Significant AI Talent Move of the Year

**TLDR:** Noam Shazeer, co-author of the original Transformer paper and pioneer of sparse mixture-of-experts systems, announced he is leaving Google to join OpenAI. Sam Altman called it a long-sought collaboration. The move is being read as both a talent and strategic signal.

**Summary:** This one matters. Noam Shazeer is not a famous AI figure in the pop-tech sense, but inside the field his contributions are foundational. He is a co-author of Attention Is All You Need, the Transformer paper that sits underneath almost everything we are talking about in 2026. He also co-authored T5 and Switch Transformer, and his early work on sparse mixture-of-experts architectures informed much of the efficiency engineering in modern large models. When Sam Altman says Shazeer is one of the people he most wanted to work with since OpenAI's beginning, that is not PR language. It is accurate.

Shazeer said the decision was difficult, which I believe, and praised his former team at Google, which is the right thing to say but also likely genuine given how long he spent there. The irony is that the DeepMind and Google Brain merger, which was supposed to concentrate ML talent inside Google, may have contributed to conditions that made leaving feel like the right move. Speculation is rampant about internal culture and prioritization at Google, and I have no special insight into that, but the pattern of departures is notable.

The reactions broke into roughly two camps. One camp treated this as OpenAI pulling further ahead, with someone noting that Anthropic got Karpathy while OpenAI got Shazeer. The other camp read it as a statement about Google: that joining OpenAI says as much about frustration as it does about excitement. Both readings are probably partially true. What is unambiguously true is that OpenAI just added someone whose architectural intuitions shaped the infrastructure the entire field runs on.

What the coverage avoids thinking about is what Shazeer will actually work on at OpenAI. Joining a lab with enormous deployment scale is different from joining one earlier in its lifecycle. The bottlenecks at OpenAI's current size are not the same as the bottlenecks that produced the Transformer. It will be interesting to see whether his contributions in this context are fundamental architecture or applied systems work, and whether the environment at a company this large gives him the freedom that produced his earlier output.

**Key takeaways:**
- Shazeer is co-author of the Transformer paper, T5, and Switch Transformer, making this a significant hire by any measure.
- The Google Brain/DeepMind merger may have inadvertently encouraged departures to competitors including both Anthropic and OpenAI.
- What Shazeer builds at OpenAI and whether a large deployed lab is the right environment for foundational contributions remains to be seen.

**Why do I care:** From a platform perspective, the people who understand architecture at the level Shazeer does are the ones who determine whether the next generation of models is ten times more efficient or just ten times more expensive. The sparse MoE work he pioneered is directly relevant to serving costs, which directly affects what products developers can afford to build on top of these APIs. Talent moves at this level are infrastructure decisions in slow motion.

**Link:** [AINews: Midjourney Medical — scan your organs like you step on a scale](https://www.latent.space/p/ainews-midjourney-medical-scan-your?publication_id=1084089&post_id=202529490&isFreemail=true&triedRedirect=true)

---

## PreAct: Making AI Agents 13x Faster by Compiling Successful Runs

**TLDR:** A new paper called PreAct compiles successful agent runs into a guarded, replayable state machine, eliminating the need to call the language model on every step during replay. Reported speedups are between 8.5x and 13x.

**Summary:** This is one of those ideas that sounds obvious after you hear it but apparently took a while to land as a paper. If your agent has successfully completed a task, you now have a ground-truth execution trace. PreAct takes that trace and compiles it into a state machine where the guards check whether current conditions match the conditions that were true during the successful run. If they match, you replay the cached action without making an LLM call. If they do not match, you fall back to the model. The result is dramatically faster execution on tasks the agent has already figured out.

The 8.5x to 13x speedup range is meaningful. At current inference costs and latencies, agent loops are expensive and slow. Tasks that take 30 seconds of wall-clock time because of sequential LLM calls are genuinely annoying to use. If you can compress common successful paths down to lookup-and-execute, you change the economics of deployed agents substantially. The comparison is roughly to how a JIT compiler works: you observe hot paths and compile them, then revert to interpretation when the hot path breaks.

The limitation that the coverage does not dwell on is the fragility of guard conditions. State machines compiled from successful runs encode the world as it was during that run. If the environment changes in ways the guards do not anticipate, you either catch it and fall back correctly, or you do not catch it and replay an action that is now wrong. The quality of the guard design determines whether this is a reliable optimization or a subtle source of silent failures. The paper apparently addresses this with guarded transitions, but the robustness in real-world messy environments is the unanswered question.

Omar Sarosh's point lands alongside this neatly: coding agents need verifiers and guardrails, not blind autonomous loops. PreAct is structurally a form of verification, which is probably why the results are credible. You are only replaying paths you know worked, under conditions you can check. That discipline is what makes it actually faster rather than just optimistically faster.

**Key takeaways:**
- PreAct compiles verified successful agent trajectories into replayable state machines, bypassing LLM calls on known-good paths.
- Speedups of 8.5x to 13x were reported, which materially changes the cost and latency profile of deployed agents.
- Guard condition quality and environmental robustness are the open questions for real-world deployment.

**Why do I care:** Any technique that reduces the number of LLM calls per task without sacrificing correctness is directly relevant to building products on top of agent frameworks. The compilation metaphor is useful here because it matches how I think about optimization: you profile, you find the hot path, you specialize. PreAct is that, applied to agent execution. I would expect to see this or something like it integrated into major agent frameworks within six months.

**Link:** [AINews: Midjourney Medical — scan your organs like you step on a scale](https://www.latent.space/p/ainews-midjourney-medical-scan-your?publication_id=1084089&post_id=202529490&isFreemail=true&triedRedirect=true)

---

## GitHub Copilot Gets a Routing Model for Smarter Auto Mode

**TLDR:** GitHub Copilot's Auto mode now uses a custom-built routing model to select among underlying language models based on task characteristics including reasoning depth, code complexity, debugging difficulty, and tool orchestration needs.

**Summary:** Routing between models is not a new idea, but GitHub Copilot doing it with a purpose-built routing model rather than simple heuristics is worth paying attention to. The basic problem is that frontier models are expensive and slower, while smaller models are cheap and fast, and many tasks do not need the larger model. A routing layer that correctly identifies which tasks need heavy reasoning and which do not can meaningfully reduce cost and latency without the user noticing a quality difference.

What makes Copilot's version interesting is the reported routing dimensions. They are not routing on task length or a simple keyword match. They are routing on reasoning depth required, code complexity, debugging difficulty, and tool orchestration needs. Those are harder signals to extract but they are the right signals. A simple docstring completion and a debugging session involving multiple file edits across a large codebase have completely different compute requirements, and treating them the same is wasteful.

GitHub published both a blog post and a research paper, which is relatively unusual for a product announcement. That suggests there is methodological substance here worth evaluating independently of the marketing. I would want to see the routing accuracy numbers, the false-positive rate where the router sends a hard task to a weak model, and how the system degrades gracefully when the router is wrong.

The thing the announcement sidesteps is the user experience of model switching. When Auto mode routes you to a smaller model and the answer is noticeably worse, does the user understand why? Copilot's brand promise is that Auto just works. If routing errors become a pattern, the explanation "the router thought this was easy" is not a satisfying one. The gap between a good routing model and a routing model that never visibly fails in production is where the real engineering challenge sits.

**Key takeaways:**
- Copilot Auto mode now routes across models based on reasoning depth, code complexity, debugging difficulty, and tool orchestration requirements.
- A research paper accompanies the announcement, suggesting the routing methodology has substance beyond marketing copy.
- Routing failure modes and graceful degradation are the unaddressed user-experience challenge.

**Why do I care:** As a developer who uses coding assistants daily, routing matters because I want the right tool for the job without having to manually select it. The dream version of this is invisible: faster for simple completions, smarter for complex refactors, and I never have to think about which model I am talking to. If Copilot's routing model is actually good, it is a genuine quality-of-life improvement. If it is mediocre, it introduces a new class of frustrating failures where a task you expected to work well gets silently downgraded.

**Link:** [AINews: Midjourney Medical — scan your organs like you step on a scale](https://www.latent.space/p/ainews-midjourney-medical-scan-your?publication_id=1084089&post_id=202529490&isFreemail=true&triedRedirect=true)

---

## GLM-5.2 Crosses 80% on Terminal-Bench, but the Benchmark Itself Is Being Contested

**TLDR:** GLM-5.2 is the first open-weights model to score above 80% on Terminal-Bench 2.1, beating all other open models. However, commenters immediately pointed out that Terminal-Bench 2.1 is a relaxed revision of Terminal-Bench 2, making cross-version comparisons unreliable.

**Summary:** GLM-5.2 hitting 81% on Terminal-Bench 2.1 is genuinely good news for open-weights models. The score puts it ahead of every other open model and, interestingly, ahead of some closed models like Gemini 3.1 Pro, though Claude Opus 4.8 at 85% and GPT-5.5 at 84% are still ahead overall. Terminal-Bench is a practical benchmark focused on actual terminal task execution, which makes it more meaningful to me than many academic benchmarks that test narrow capabilities under unrealistic conditions.

The benchmark validity question is legitimate, though. A commenter with apparent knowledge of the benchmark's construction pointed out that Terminal-Bench 2.1 changed timeout thresholds and relaxed problem rules relative to Terminal-Bench 2. The practical implication is that a model scoring 81% on 2.1 is not necessarily stronger than a model that scored 75% on 2. The benchmark moved under the comparison. This is a recurring problem in AI evaluation and it does not mean GLM-5.2 is not good, but it does mean the headline number is less clean than it looks.

The Chinese open-source research ecosystem has been producing unusually strong work over the past year, and GLM is part of that pattern. The tweet calling the GLM team heroic is probably not overclaiming. Building competitive open-weights models at this capability level requires sustained infrastructure investment and research execution that is genuinely hard, and the progress has been consistent rather than one-off.

The local-versus-download debate in the comments is a recurring frustration. Saying a model is open weights when the hardware required to run it at useful speeds is accessible to approximately nobody is technically accurate and practically misleading. The interesting version of open weights for most developers is a model they can run on a workstation or a modest GPU cluster without specialized hardware. GLM-5.2 at current sizes is not that, whatever the download policy says.

**Key takeaways:**
- GLM-5.2 scores 81% on Terminal-Bench 2.1, the first open-weights model above 80%, but Terminal-Bench 2.1 is a relaxed version of Terminal-Bench 2 that makes cross-version comparisons unreliable.
- Chinese open-source labs continue producing competitive frontier-level models at a pace that should be tracked closely.
- "Open weights" without hardware accessibility is a meaningful but limited form of openness for most developers.

**Why do I care:** The open-weights ecosystem matters for developers because it is the path toward self-hosted inference, private data processing, and cost control at scale. GLM-5.2 being competitive with frontier closed models is meaningful even with the benchmark caveat. But the hardware accessibility gap is a genuine problem for the ecosystem, and until open models can run usefully on commodity infrastructure, the practical impact for most teams is limited to organizations with serious GPU budgets.

**Link:** [AINews: Midjourney Medical — scan your organs like you step on a scale](https://www.latent.space/p/ainews-midjourney-medical-scan-your?publication_id=1084089&post_id=202529490&isFreemail=true&triedRedirect=true)

---

## John Schulman on Why PPO Works in LLM Training, and Why Nobody Knew at the Time

**TLDR:** John Schulman posted a detailed reflection on PPO's resurgence in language model training, explaining that the mechanisms making it effective in this context, including importance-ratio bias correction, async training resilience, and a specific entropy effect from clipping, were not understood when PPO was originally designed.

**Summary:** This is the kind of post that makes you appreciate the gap between engineering that works and engineering you understand. PPO was designed for RL in game environments and interactive simulations. It works extremely well for RLHF and reasoning model training in LLMs. Schulman's post is essentially an explanation of why, after the fact, and the answer involves mechanisms the original paper did not anticipate.

The importance-ratio objective, which is central to PPO, turns out to correct biases from numerical errors, asynchronous training pipelines, and forward-pass noise in ways that were not the design intent. The clipping mechanism alters entropy through a specific pathway that was only understood later through the DAPO work. These are not small details. They are load-bearing parts of why the algorithm succeeds in practice, and they were not in the original reasoning.

This matters for how we should think about algorithm selection in AI training generally. A lot of the current discussion about GRPO, DAPO, and related methods is focused on empirical results with post-hoc explanations. Schulman is suggesting that PPO's case should make us humble about those explanations. The algorithm that won in practice was right for reasons nobody fully understood, and the analysis came years later. The same is probably true of whatever wins next.

Chris Wolfe's point is well taken here: the analysis work being done on GRPO variants is valuable precisely because it could eventually tell us what PPO's analysis now tells us. The risk is that labs optimize against understood mechanisms while missing the unintuitive ones that actually carry the load. In a field moving this fast, that gap between what works and what we understand is likely wider than anyone admits.

**Key takeaways:**
- PPO's effectiveness in LLM training relies on mechanisms including importance-ratio bias correction and entropy effects from clipping that were not in its original design rationale.
- The analysis of why PPO works arrived years after the empirical success, which should inform how we interpret post-hoc explanations for current methods like GRPO and DAPO.
- The DAPO paper is cited as the source that clarified the entropy mechanism from clipping.

**Why do I care:** I care because developers building on top of these models inherit the consequences of training choices they cannot inspect. When a model reasons poorly or refuses unexpectedly, the cause often traces back to RL training dynamics that are poorly understood even by the people who ran the training. Schulman's post is a reminder that the explanations we get for model behavior are often incomplete, and that calibrated skepticism about those explanations is warranted.

**Link:** [AINews: Midjourney Medical — scan your organs like you step on a scale](https://www.latent.space/p/ainews-midjourney-medical-scan-your?publication_id=1084089&post_id=202529490&isFreemail=true&triedRedirect=true)

---

## Gemma 4 at 255 Tokens Per Second in the Browser via WebGPU

**TLDR:** Xenova released demo code and kernels from the now-shut-down Fable 5 project, claiming to have pushed Gemma 4 to 255 tokens per second on WebGPU through agentic kernel optimization.

**Summary:** Browser-based inference has been a promising-but-slow area for years. The constraint has always been that WebGPU is a general-purpose GPU API rather than a compute API optimized for matrix multiplication and attention operations, which means kernel quality matters enormously. Getting 255 tokens per second out of Gemma 4 in a browser environment is a number that, if reproducible, represents a meaningful jump in what browser-based AI can do.

The framing around agentic kernel optimization is interesting. The implication is that the kernel tuning was done partly through automated processes rather than purely by hand, which is a reasonable direction. Hand-tuning WebGPU shaders is expensive and slow, and if you can automate the optimization search across kernel configurations, you decouple performance from engineering time.

The fact that this came from a shut-down project, Fable 5, is worth noting. Good technical work that gets canned as a business is fairly common and releasing it to the community is the right call. But it also means there is no ongoing team maintaining and improving the kernels, and the documentation and support around them will reflect that. For developers who want to use this, the barrier is higher than a well-maintained library.

The broader implication is that on-device and in-browser inference is becoming more viable at model sizes that are actually useful. Gemma 4 is not a toy model. Running it at interactive speeds in a browser changes what you can build for users who cannot or will not install native applications, and it changes the privacy calculus because inference stays on the device.

**Key takeaways:**
- Xenova published WebGPU kernels achieving 255 tokens per second with Gemma 4 in browser environments through agentic kernel optimization.
- The work originates from the shut-down Fable 5 project, meaning ongoing maintenance is uncertain.
- Browser-speed inference at this level opens practical use cases that were not feasible at previous performance levels.

**Why do I care:** Web developers building AI features deal with a frustrating tradeoff between server-side inference costs and on-device inference limitations. If WebGPU inference at these speeds is reproducible across common hardware configurations, it changes what you can ship without a backend. That is a real architectural shift worth tracking, and I would spend time reproducing these benchmarks on realistic hardware before betting a product on them.

**Link:** [AINews: Midjourney Medical — scan your organs like you step on a scale](https://www.latent.space/p/ainews-midjourney-medical-scan-your?publication_id=1084089&post_id=202529490&isFreemail=true&triedRedirect=true)
