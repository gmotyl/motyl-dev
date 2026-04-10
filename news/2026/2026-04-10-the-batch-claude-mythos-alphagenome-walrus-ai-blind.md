---
title: "Claude Mythos Preview's Security Bombshell, AlphaGenome Decodes Dark DNA, AI as a Mirror for the Blind, and Walrus Simulates Fluids"
excerpt: "Anthropic drops a 244-page model card for a model it won't sell, Google DeepMind opens up non-coding genome interpretation, researchers ask hard questions about AI vision apps for blind users, and a transformer learns to simulate fluid dynamics across 19 physical domains."
publishedAt: "2026-04-10"
slug: "the-batch-claude-mythos-alphagenome-walrus-ai-blind"
hashtags: "#thebatch #ai #security #llm #ml #accessibility #genomics #physics #agents #generated #en"
source_pattern: "The Batch"
---

## Claude Mythos Preview: Anthropic's Security Warning Without a Product Launch

**TLDR:** Anthropic published a 244-page model card for Claude Mythos Preview, a model so capable at finding real-world vulnerabilities that they assembled a 40+ organization security consortium before disclosing it. The model is not commercially available.

**Summary:** This is a genuinely unusual move from Anthropic. Publishing a model card without releasing the model is not how this industry normally operates. The card documents a system that autonomously discovered thousands of high-severity vulnerabilities in production operating systems and browsers over a single month of testing, 99% of which remain unpatched. One of them was a 27-year-old flaw in OpenBSD's TCP handling that could crash any OpenBSD host over the network. Another was a Linux kernel bug chain that achieved root access. Both have since been patched.

The benchmark numbers are what you'd expect from a frontier model leapfrog: 83.1% on CyberGym versus the previous Claude Opus 4.6 at 66.6%, 82% on Terminal-Bench 2.0 for agentic coding, 94.5% on GPQA Diamond, and a particularly stark 80% versus 38.7% on GraphWalks for long-context search. These aren't incremental improvements. The cybersecurity capability didn't come from deliberate training on security tasks either — it emerged from coding, reasoning, and autonomous behavior training. That's the part I find worth sitting with.

To manage the rollout, Anthropic formed Project Glasswing with AWS, Apple, CrowdStrike, Google, JPMorganChase, the Linux Foundation, Microsoft, and Nvidia alongside over 40 other organizations. They're funding $100 million in access credits for Glasswing members and $4 million in donations to open source maintainers. The framing is clear: defenders get first access, the broader world finds out what's coming, and Anthropic gets to be seen as responsible stewards of a very powerful system.

I'll be honest — the comparison to OpenAI's 2019 GPT-2 rollout is fair. Anthropic is using the safety narrative to control the announcement cycle. That doesn't mean the concern is fake; the vulnerability discoveries are real and verifiable. But the PR architecture here is deliberate. The long-term picture is actually encouraging: LLMs getting better at code means they get better at finding bugs too, and eventually defenders with access to these tools will have an advantage. The transition period is the uncomfortable part.

**Key takeaways:**
- Claude Mythos Preview autonomously found thousands of real high-severity vulnerabilities including a 27-year-old OpenBSD flaw and a Linux kernel root escalation chain
- Anthropic published a 244-page model card with no commercial release date
- Project Glasswing gives 40+ orgs early access; $100M in credits, $4M to open source projects
- Capability emerged from general coding and reasoning training, not security-specific fine-tuning
- Benchmarks show substantial jumps over Claude Opus 4.6 across cybersecurity, agentic coding, and long-context tasks

**Why do I care:** Every application I've ever shipped runs on Linux or BSD, uses web browsers, and depends on open source libraries. The fact that a model can autonomously discover root escalation paths in the Linux kernel is not abstract to me. The Glasswing model — give defenders priority access, fund the maintainers who have to patch things — is the right instinct even if the rollout has elements of a press strategy. What I want to know is: what does "99% remain unpatched" look like in three months?

**Link:** [The Batch — deeplearning.ai](https://www.deeplearning.ai/the-batch/)

---

## AlphaGenome Makes the "Junk DNA" Problem Tractable

**TLDR:** Google DeepMind released AlphaGenome, an open-weights model that interprets the 98% of the human and mouse genomes that don't code for proteins, predicting gene expression properties and mutation effects with state-of-the-art results across 50 evaluations.

**Summary:** For a long time, the 98% of the genome that doesn't directly code for proteins was colloquially called "junk DNA." We now know it regulates gene expression, controls splicing, and plays roles in a wide range of diseases — we just haven't had great tools for working with it computationally. AlphaGenome is the most capable open attempt to change that.

You feed it up to one million DNA base pairs along with an organism type (human or mouse), and it outputs roughly 6,000 human gene properties or 1,000 mouse properties: where genes begin and end, RNA production levels, splice site information, and related regulatory signals. The architecture is a CNN encoder going into a transformer going into a CNN decoder, which makes sense — you want local sequence feature extraction on either end with global context in the middle. The team pretrained 64 models with identical architecture and distilled them into a single model, which is a solid approach for capturing ensemble diversity without the inference cost.

Across 50 evaluations, AlphaGenome matched or exceeded earlier models in 47. More specifically, it outperformed on 22 of 24 gene property detection tasks and matched or exceeded on 24 of 26 mutation effect prediction tasks. The T-cell acute lymphoblastic leukemia validation is worth noting specifically: the model's predicted changes in protein expression matched the known biological mechanism of the disease. That's the kind of result that bridges the gap between benchmark performance and actual scientific utility.

The licensing here matters too. The API, weights, and inference code are freely available for noncommercial use. For academic researchers and smaller biotech labs, that's the difference between being able to work with this and not.

**Key takeaways:**
- AlphaGenome processes up to 1M DNA base pairs and predicts gene expression properties and mutation effects
- Matched or exceeded prior models in 47 of 50 evaluations; validated on T-ALL leukemia mechanism
- Architecture: CNN encoder + transformer + CNN decoder, distilled from 64 pretrained models
- Available for noncommercial use: API, weights, and inference code
- Covers both human and mouse genomes

**Why do I care:** I'm not a bioinformatician, but I care about the tools that researchers use to answer hard questions about disease. The pattern here is familiar from software: a previously manual, expert-intensive process gets a capable model applied to it, the throughput for hypothesis generation goes up dramatically, and the bottleneck moves to validation and experimental design. AlphaGenome doing that for non-coding genome interpretation feels like a meaningful inflection point for the field.

**Link:** [The Batch — deeplearning.ai](https://www.deeplearning.ai/the-batch/)

---

## The AI Mirror Problem: When Vision Models Judge Blind Users

**TLDR:** A blind journalist's account of using GPT-4 Vision as a mirror raises substantive questions about what AI vision apps designed for blind users are actually optimizing for — and whose aesthetic standards they encode.

**Summary:** Milagros Costabel's piece for the BBC is worth reading carefully. She's a blind freelance journalist using Be My Eyes with GPT-4 Vision, and the app told her that her skin "definitely doesn't look like the almost perfect example of reflective skin" — unprompted. That's not a vision assistance failure in the narrow technical sense; the model correctly described what it saw. But it's a design failure, because nobody building a tool for a blind person to check their appearance asked the user what kind of feedback they actually wanted.

The CEO of Envision AI shared that he was surprised customers primarily use the product to do makeup and coordinate outfits. That surprise tells you something important about the gap between what developers imagined and what users actually need. A 20-year-old blind man used AI to help select dating profile photos and ended up feeling insecure because the descriptions didn't match his own self-understanding. Psychologists note that blind users can't independently verify visual judgments — they have to trust what the model says, which makes calibration and framing far more consequential than in sighted use cases.

The product landscape here includes Microsoft Seeing AI, Aira Explorer, Oko, Envision Glasses, and Ray-Ban Meta Smart Glasses. These tools are genuinely useful and provide meaningful independence for visually impaired users. That's real. But the current generation of vision models was trained on data that reflects conventional and often narrow beauty standards, and deploying those models as mirrors without extensive user research creates real psychological harm.

This is the kind of problem that doesn't show up in standard capability benchmarks. The model is performing correctly on the task as measured. The task as defined is just wrong.

**Key takeaways:**
- Vision models like GPT-4 Vision encode beauty standards that can cause psychological harm when used as assistive mirrors
- Blind users cannot independently verify or reject AI visual judgments, raising the stakes for how models frame appearance descriptions
- The gap between what developers anticipated and what users actually use these apps for is significant
- Products in this space: Be My Eyes, Envision AI, Microsoft Seeing AI, Aira Explorer, Oko, Ray-Ban Meta
- Building for visually impaired users requires user research and empathy that pure capability evaluation misses

**Why do I care:** I've built accessible interfaces, and the gap between WCAG compliance and genuinely accessible experiences is significant. This story is the same gap, one layer deeper. Technical correctness and appropriate user experience are different problems. The fact that a vision model can describe an image accurately does not mean it knows how to help a blind person feel confident before leaving the house. That requires a different design conversation entirely — one that starts with the user, not the model.

**Link:** [The Batch — deeplearning.ai](https://www.deeplearning.ai/the-batch/)

---

## Walrus: A General Transformer for Fluid Dynamics Across 19 Physical Domains

**TLDR:** Polymathic AI released Walrus, a 1.3B-parameter transformer that simulates liquids, gases, and plasmas across 19 physical domains including acoustics, astrophysics, and non-Newtonian fluids. It matches or exceeds specialized physics models and is MIT licensed.

**Summary:** Fluid dynamics simulation has historically been a domain where you pick a specialized numerical method for your specific problem — finite element for structural analysis, finite volume for CFD, particle methods for free-surface flows. Each approach is tuned for a narrow regime and they don't generalize. Walrus is an attempt to build the general-purpose version: one model pretrained across enough physical scenarios to transfer competently to new ones.

The architecture is cleaner than it might sound. Two encoders (one for 2D, one for 3D) compress previous system snapshots into tokens. A split attention block generates tokens for the next time step. Two decoders reconstruct the next state. The pretraining corpus is about 8 million 2D examples and 4 million 3D samples spanning 19 physical domains, followed by fine-tuning on 500,000 fluid dynamics examples. The key technical contribution is the handling of chaos: in physical systems with chaotic behavior, small prediction errors compound quickly. The team identified that transformers fail here due to aliasing artifacts and addressed this by randomly jittering the time steps during training, which reduces those artifacts meaningfully.

The results hold up: Walrus matches or exceeds prior specialized models across their evaluation suite. The applications the authors call out are aerospace engineering, climate modeling, and pharmaceutical development — all domains where the cost of traditional high-fidelity simulation is a significant constraint on how much design space you can explore.

The MIT license makes this practically usable by anyone. That matters for the research community building on top of it.

**Key takeaways:**
- Walrus is a 1.3B-parameter model that predicts next states of physical systems across liquids, gases, and plasmas
- Pretrained on ~12M examples across 19 physical domains; fine-tuned on 500K fluid dynamics examples
- Random time-step jittering during training reduces aliasing artifacts that cause error compounding in chaotic systems
- Architecture: 2D + 3D encoders, split attention block, two decoders
- MIT licensed; matches or exceeds specialized physics models in evaluation

**Why do I care:** I'm less likely to be simulating plasma dynamics than I am to be working with teams that need to run physical simulations as part of design validation loops. The story here is the same one we see in every domain where ML models can approximate expensive numerical methods: the cost per simulation drops by orders of magnitude, which changes what questions are economically feasible to ask. For climate modeling specifically, being able to run more simulation runs at lower cost is directly relevant to uncertainty quantification. That's worth paying attention to even if fluid dynamics isn't your primary domain.

**Link:** [The Batch — deeplearning.ai](https://www.deeplearning.ai/the-batch/)
