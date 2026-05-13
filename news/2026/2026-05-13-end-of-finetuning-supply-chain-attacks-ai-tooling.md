---
title: "The End of Finetuning, Supply Chain Attacks Targeting AI Tools, and Tiny Models Running Everywhere"
excerpt: "OpenAI deprecates finetuning APIs as the AI industry pivots away from model customization toward long prompts and agentic reasoning, while a supply chain attack targets AI developer tooling and a 26M-parameter model beats models 10x its size at tool calling."
publishedAt: "2026-05-13"
slug: "end-of-finetuning-supply-chain-attacks-ai-tooling"
hashtags: "#ai #llm #ml #generated #en #finetuning #security #localai #agents"
source_pattern: "AINews"
---

## The End of Finetuning: OpenAI Pulls the APIs

**TLDR:** OpenAI is deprecating its finetuning APIs, a move that's being read as a signal about the broader direction of AI engineering. The industry was already drifting this way, but now it's official.

**Summary:** So OpenAI is killing finetuning. Not "making it harder to access" or "moving it behind a new pricing tier." Actually deprecating the APIs. And I think this is worth sitting with for a minute, because for years this was the thing. You could get o1-level quality at 4o prices, people said. Finetuning was the difference between a demo and a product, they said. There were entire conference talks, blog posts, and Twitter threads dedicated to making it work.

Now the tide went out. And what's actually interesting here isn't that OpenAI made a business decision, it's that the decision was probably coming no matter what. Jeremy Howard was calling this out as far back as 2023 on his podcast. The pattern became clear: for 80% of what AI engineers actually need, prompt engineering, retrieval, and good context windows get you further than finetuning does. Long prompts, good retrieval, clear instructions. That's the actual workflow.

But here's what the narrative gets wrong: the death of finetuning for average API users is not the death of finetuning period. Cursor and Cognition, two of the serious players in agentic coding, have both increased their use of open model reinforcement learning from human feedback and fine-tuning, not decreased it. The top tier is doing more, not less. The difference is that they're doing it on open models where they control the training infrastructure, not paying OpenAI to do it via API.

There's a compelling thesis emerging here about custom ASICs too. If you're running your own fine-tuned open weights on your own silicon, that's a different value chain entirely. At the same time, the argument from the other direction, that very long prompts with something like Claude's Constitutional AI approach might just be "enough," is also gaining traction, particularly as prefill/decode disaggregation continues to improve inference economics. The real question isn't whether to finetune. It's whether you're in the 80% who never needed it or the 20% who are doing it at a scale and depth that makes building your own training stack worthwhile.

**Key takeaways:**
- OpenAI deprecated finetuning APIs, confirming a broader industry trend
- For most engineers, long context windows plus retrieval outperform finetuning in practice
- Top-tier companies like Cursor and Cognition are actually increasing fine-tuning usage on open models
- Open model fine-tuning may be central to the custom ASIC / vertical AI stack thesis
- Very long prompts with structured instructions may be sufficient for most behavioral customization

**Why do I care:** As a senior frontend dev or architect building on top of AI APIs, this changes the economics of how you build differentiation. If you thought finetuning was your moat, time to rethink. The real leverage is now in how well you structure context, design retrieval, and orchestrate agents. The tools for doing that are maturing fast, and that's actually where it gets interesting.

**Link:** [AINews: The End of Finetuning](https://www.latent.space/p/ainews-the-end-of-finetuning)

---

## A Supply Chain Attack Is Targeting AI Developer Tooling Right Now

**TLDR:** A campaign called Mini Shai-Hulud expanded from TanStack to hit OpenSearch, Mistral AI, Guardrails AI, UiPath, and others across npm and PyPI. The scary part is the persistence mechanism: it hooks into Claude Code and VS Code configs so it can re-execute even after you remove the infected package.

**Summary:** This one is genuinely alarming, and I don't say that lightly. The Mini Shai-Hulud supply chain attack isn't just another "malicious npm package" story. It's specifically targeting AI developer tooling, and the persistence mechanism is clever enough that removing the infected package isn't enough to clean it up.

Here's the technical detail that should get your attention: the attack writes hooks into Claude Code's `.claude/settings.json` and VS Code's `.vscode/tasks.json`. So even if you yank the compromised package, those config files remain, and the next time you use your editor or AI coding assistant, the malicious code re-executes. Guardrails AI confirmed their `0.10.1` package was compromised and quarantined it within about two hours, which is actually a pretty good response time, but the two-hour window is still two hours.

The mitigations that surfaced quickly are worth knowing. Beyond the standard advice about `minimumReleaseAge` in Renovate or Dependabot configs, you should look at enabling `blockExoticSubdeps` to prevent remote GitHub references from sneaking into your dependency graphs. The `pull_request_target` pattern in GitHub Actions is also getting called out again as one of the sharpest footguns in CI/CD for fork-based PR automation. And the old advice about keeping secrets in `.env` files is getting another look, with the recommendation to move to a proper secrets manager.

What's missing from most of the discussion around this is the broader implication: AI coding assistants now have privileged positions in developer workflows, with access to configs, environment variables, and sometimes even production credentials. Attackers know this. The attack surface is not just your npm dependencies anymore, it's anything your AI tooling touches. Sandboxing your AI coding tools, auditing their config files, and treating those settings with the same skepticism you'd apply to any other configuration with network access. That conversation isn't happening loudly enough yet.

**Key takeaways:**
- Campaign hit AI tooling across npm and PyPI including Guardrails AI, Mistral AI, OpenSearch, and UiPath
- Persistence mechanism hooks into Claude Code and VS Code configs to survive package removal
- Mitigations: enable `blockExoticSubdeps`, audit dependency managers, avoid GitHub `pull_request_target` in fork-based PRs
- Secrets in `.env` files are a real risk and should be moved to a dedicated secrets manager
- AI coding assistants are now a first-class attack surface due to their access to dev environments

**Why do I care:** This hits the dev environment directly. If your team uses Claude Code, GitHub Copilot, or any AI coding assistant, you need to treat the config files for those tools as part of your security posture. Audit `.claude/settings.json` and `.vscode/tasks.json` regularly. Add them to your security review process. This is not theoretical.

**Link:** [AINews: The End of Finetuning](https://www.latent.space/p/ainews-the-end-of-finetuning)

---

## A 26-Million-Parameter Model Beats Models 10x Its Size at Tool Calling

**TLDR:** Cactus Compute's Needle is a 26M parameter model distilled from Gemini-synthesized data that beats FunctionGemma-270M and Qwen-0.6B on single-shot function calling at 6000 tokens per second prefill on consumer hardware. The architecture drops the FFN entirely.

**Summary:** I love a good "do you actually need that" story. Needle is a 26-million-parameter tool-calling model that Cactus Compute released under MIT license, and it beats models that are ten times its size at single-shot function calling. The architecture choice is the interesting part: they dropped the feed-forward network layers entirely. No MLP, no FFN. Just attention plus gating.

Their argument is straightforward: function calling isn't about memorized knowledge. It's mostly retrieval and assembly over provided tool schemas. If the relevant context is already in the prompt, you don't need the weights to store facts. You need a model that's good at reading a schema and mapping a user request onto it. That's a very different problem, and apparently a much smaller model can solve it well enough.

The throughput numbers are remarkable for consumer hardware: 6000 tokens per second on prefill, 1200 on decode. That opens up a real use case as a lightweight router, a gating model that decides whether a query needs a big expensive LLM or can be dispatched directly with a tool call. That's a meaningful cost reduction for agentic pipelines that spend a lot of time on tool dispatch.

What I'd push back on is the assumption that this generalizes cleanly. The training data was synthesized from Gemini, and at least one commenter noticed that Gemini has visible tool-calling quirks, including reasoning artifacts that seem to prefer certain tools or avoid certain patterns. If those biases got baked into the distillation data, they're now baked into Needle too. Also, the pickle file distribution is a security concern that's real and unaddressed. But as a proof of concept for the "you can distill a specialist this small" thesis, it's a strong result.

**Key takeaways:**
- 26M parameter model with no FFN layers beats models 10x larger on single-shot function calling
- Architecture uses attention plus gating only, arguing function calling is retrieval not memorization
- 6000 tok/s prefill on consumer hardware, usable as a lightweight router/dispatcher in agentic pipelines
- Training used Gemini-synthesized data, which may introduce provider-specific tool-use biases
- MIT-licensed, weights on Hugging Face

**Why do I care:** The router pattern is the practical takeaway here. If you're building agents that make lots of tool calls, putting a 26M model in front of your expensive LLM to handle dispatch and escalation only when needed could substantially cut your inference bill. Worth experimenting with, especially now that the weights are open.

**Link:** [AINews: The End of Finetuning](https://www.latent.space/p/ainews-the-end-of-finetuning)

---

## Running a Trillion-Parameter Model at Home on Intel Optane

**TLDR:** A user ran Kimi K2.5, a roughly trillion-parameter MoE model, locally at about 4 tokens per second using Intel Optane Persistent Memory as system RAM, an RTX 3060, and a used-market build costing around $2,000.

**Summary:** There is something deeply satisfying about the "run a trillion-parameter model at home" story, even when the throughput numbers are humble. This particular build uses Intel Optane DC Persistent Memory DIMMs as 768GB of addressable system RAM, with 192GB of DDR4 ECC DRAM acting as a transparent cache in Memory Mode. The sparse expert weights from Kimi K2.5 live in Optane, while the attention layers, dense components, and routing tensors fit on an RTX 3060 12GB.

Four tokens per second generation speed is the result. That's not fast. For interactive use cases, you'd need a lot of patience or very short prompts. The commenters were quick to point out that prefill is going to be substantially worse than generation speed on this kind of memory hierarchy, so loading a long context document is going to be painful.

What's interesting here is the cost argument. The full build comes in at roughly $2,000 to $2,500 using used-market parts. That's a Xeon Gold 6246, a TYAN server board, an RTX 3060, 192GB DDR4 ECC RDIMM, and 768GB of Optane DCPMMs. For that price, you're getting local inference on a model that would cost you real money per token at any hosted provider. The privacy argument alone may justify it for certain workloads.

The technical discussion around Optane compatibility is worth noting: first-gen Optane NMA runs at 2666 MT/s on LGA3647 Cascade Lake platforms, and mixing Optane with DRAM can downclock affected channels. Many of these Xeons also have a 1TB total memory ceiling. These are real constraints to plan around, but the platform exists and the build works.

**Key takeaways:**
- Trillion-parameter MoE model runs locally at ~4 tok/s using 768GB Intel Optane PMem as system RAM
- Build cost approximately $2,000-$2,500 using used-market Cascade Lake Xeon + RTX 3060 + Optane DCPMMs
- Memory Mode means Optane appears as RAM with DRAM acting as cache, not standard RAM latency
- Prefill/prompt processing will be significantly slower than decode on this memory hierarchy
- Optane platform compatibility matters: channel downclocking and 1TB memory limits apply on many SKUs

**Why do I care:** If you're thinking about private, local inference for sensitive workloads, this build shows the current floor. Four tokens per second is marginal for interactive use but workable for batch processing. The bigger story is that the hardware path to running frontier-scale models locally is getting cheaper, which changes the privacy calculus for anyone who can't send data to external APIs.

**Link:** [AINews: The End of Finetuning](https://www.latent.space/p/ainews-the-end-of-finetuning)

---

## Someone Ran a Transformer on a Game Boy Color

**TLDR:** A developer ported Andrej Karpathy's TinyStories-260K transformer to a stock Game Boy Color using INT8 fixed-point math and bank-switched cartridge ROM for weights. It runs fully on-device with no network connection, though it's slow and produces mostly gibberish.

**Summary:** This is the most fun story in the issue, and I think it's actually saying something important underneath the silliness. Someone took a real transformer language model, converted it to INT8 fixed-point arithmetic, stored the weights in bank-switched cartridge ROM, put the KV cache in cartridge SRAM because the Game Boy Color's work RAM is tiny, and got the full prefill and autoregressive generation loop running on hardware from 1998.

The outputs are mostly gibberish. The speed is extremely slow. And none of that matters for the point it's making, which is this: the autoregressive transformer inference loop is simple enough that you can implement it from scratch on hardware with no GPU, no CUDA, no ML framework. A sufficiently small model with aggressive quantization will run anywhere you can do integer math.

The practical implication is not "run your LLM on a Game Boy." The practical implication is that tiny specialized models can be deployed to hardware we don't usually think of as compute devices. Think microcontrollers, embedded sensors, IoT hardware, consumer devices with very constrained processors. The Game Boy Color is a demonstration of the lower bound. If it works there, it works anywhere.

The GitHub repository is at maddiedreese/gbc-transformer for anyone who wants to look at the implementation. The INT8 fixed-point approach and the bank-switching technique for weight storage are the two ideas worth taking away for anyone thinking seriously about on-device inference on constrained hardware.

**Key takeaways:**
- TinyStories-260K transformer ported to Game Boy Color using INT8 fixed-point math and bank-switched ROM
- KV cache lives in cartridge SRAM; weights in bank-switched ROM; computation on the original Z80-compatible CPU
- Fully on-device with no network, no cloud, no modern hardware dependencies
- Output quality is poor due to aggressive quantization but the inference loop works correctly
- Demonstrates that transformer inference is portable to any hardware that can do integer math

**Why do I care:** The line between "compute device" and "not a compute device" is blurring fast. For anyone building edge applications or thinking about privacy-preserving on-device inference, the takeaway is that the engineering problem is solved in principle. What remains is building the right tiny specialist model for the task at hand and fitting it to the target hardware. The Game Boy Color is a proof that the barrier is lower than most people assume.

**Link:** [AINews: The End of Finetuning](https://www.latent.space/p/ainews-the-end-of-finetuning)
