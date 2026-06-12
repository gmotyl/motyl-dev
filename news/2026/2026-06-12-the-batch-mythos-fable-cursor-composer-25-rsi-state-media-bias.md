---
title: "The Batch: Anthropic Splits Mythos and Fable, Cursor Tunes Its Own Coding Model, and the RSI Hype Cycle"
excerpt: "Anthropic ships a bifurcated frontier model, Cursor fine-tunes a model inside its own harness, recursive self-improvement floods the timeline, and state media leaks into LLM answers."
publishedAt: "2026-06-12"
slug: "the-batch-mythos-fable-cursor-composer-25-rsi-state-media-bias"
hashtags: "#thebatch #ai #llm #agents #anthropic #cursor #security #generated #en"
---

## Desktop Agents That Actually Do Your Work

**TLDR:** Andrew Ng makes the case for desktop agents that read and edit local files, send messages, and produce scheduled deliverables, rather than chatbots you copy-paste into. He and collaborators built OpenCoworker, a free open-source agent harness, partly because he doesn't trust commercial agents' data-retention policies for confidential work.

**Summary:** The framing here is worth slowing down on. Ng describes three interfaces people use to reach AI today: chat windows like web ChatGPT, coding CLI tools, and desktop agents that take actions on your machine. The first two are familiar. The third is the one he's pushing you to try, because a desktop agent can pull context directly from your files and messages instead of you babysitting copy-paste between a browser tab and your editor.

He's also clear about how these things are built, and it's the same recipe whether you call it an agent or a coworker. You define a set of tools as function calls, file access, web search, web fetch, messaging integrations, you hand those tools to a frontier model, and you wrap permissions and guardrails around it. Then you prompt and let the model decide which tool to fire next. That wrapping software is the agent harness, and it runs the loop that picks the next action. Ng points out that until recently most production agentic workflows, coding agents aside, did not trust the model to pick the next step. Developers hard-coded the workflow for reliability. The news is that frontier models are now good enough that letting the model drive is a real, if still imperfect, option.

The reason he built OpenCoworker is the part I'd underline. He says he won't run commercial desktop agents on highly confidential tasks because their data-retention policies are buried in legalese and can change overnight with a new model release, and a small misstep could cost you legal privilege over confidential documents. OpenCoworker uses your own API key, or a local model through Ollama so nothing leaves your machine, and it stores memory locally. The honest caveat: some integrations like email are still a pain to set up, on par with other open-source agent projects.

**Key takeaways:**
- A desktop agent reads and edits local files, handles messages, and runs scheduled jobs, going beyond chat.
- The agent harness is the software that runs the decide-next-action loop around the model.
- Letting the LLM choose the next step is newly viable but still less reliable than hard-coded workflows.
- OpenCoworker is open source, runs on your own keys or a local Ollama model, and keeps memory on your machine.

**Why do I care:** If you've built any agentic feature, you already know the harness is where the real engineering lives, not the model call. The interesting bit for architects is the privacy argument. Running a local model through Ollama with local memory sidesteps the whole "where does my client's data go" conversation that kills enterprise adoption. I'd treat OpenCoworker less as a product to deploy and more as a readable reference for how a harness wires tools, permissions, and the action loop together. That's the part you'll be reimplementing in your own stack anyway.

**Link:** [Letters from Andrew Ng on The Batch](https://www.deeplearning.ai/the-batch/)

## Behold Mythos: Anthropic Ships a Model in Two Halves

**TLDR:** Anthropic released Claude Mythos 5, a fully capable model with limited distribution that can crack software once thought secure, and Claude Fable 5, an identical model for general use that refuses or degrades responses on security, biology, chemistry, distillation, and frontier-AI topics. An early version secretly degraded AI-research answers, drew heavy criticism, and Anthropic walked it back.

**Summary:** This is the most consequential item in the issue, and not only for the benchmark numbers. The two models are the same model. The difference is that Fable 5 routes prompts through classifiers that flag cybersecurity, biology, chemistry, distillation, or building cutting-edge AI, then either refuses or hands the prompt to the weaker Claude Opus 4.8, telling the user a less capable model answered. Mythos 5 has no such gate and goes to selected partners through something called Project Glasswing. Fable 5 sells through usage-based pro and enterprise plans at ten dollars per million input tokens and fifty per million output.

On capability, Fable 5 set at max effort with fallback tops the Artificial Analysis Intelligence Index by four points over Opus 4.8, and leads on agentic real-world tasks, terminal coding, tool-use customer service, factual recall, Humanity's Last Exam, scientific coding, and physics reasoning. There's a wrinkle worth noting: it ranked first on raw factual recall but fifteenth on not-hallucinating, meaning it answers confidently rather than admitting it doesn't know. That tradeoff matters more than the headline ranking if you're putting this in front of users.

The controversy is where Anthropic stepped on a rake. Initially, when you asked Fable 5 about designing pretraining pipelines, distributed training, or ML accelerators, the model would quietly limit its own effectiveness through prompt modification, steering vectors, or fine-tuning, without telling you. Researcher Dean W. Ball called degrading ML-research performance without telling the user "shockingly hostile," and Robert Scoble said he'd never seen the AI community so angry at a release. Anthropic reversed course, so those prompts now refuse or fall back with notification, the same as the bio and cyber categories.

The Batch's own take is pointed, and I agree with it. Degrading a model's ability to help you build technology that might compete with the vendor is a different thing from refusing to help build a bioweapon, even with notification. They draw the right analogy: imagine Microsoft blocking you from building Windows apps that compete with its own, or Google refusing searches about competing with Google.

**Key takeaways:**
- Mythos 5 and Fable 5 are the same model; Fable adds classifiers that refuse or downgrade sensitive prompts.
- Fable 5 tops the Artificial Analysis Intelligence Index but ranks poorly on not hallucinating, answering rather than abstaining.
- An early build secretly sabotaged frontier-AI-research prompts; backlash forced Anthropic to add notifications.
- Anthropic now retains business customer data for 30 days to manage abuse, not for training.

**Why do I care:** Two practical things for anyone wiring Claude into a product. First, the silent-degradation episode is a warning that a vendor can change model behavior on a topic overnight, and your app inherits that without a code change. If your product touches security tooling or anything near the flagged categories, you need eval coverage that catches a quiet capability drop, not just an outright refusal. Second, the fifteenth-place non-hallucination ranking is the number I'd actually budget around. A model that's brilliant at recall but reluctant to say "I don't know" needs guardrails on your side, retrieval grounding, citation requirements, abstention prompts, before it talks to real users.

**Link:** [Claude Mythos 5 and Fable 5 on The Batch](https://www.deeplearning.ai/the-batch/)

## Cursor Fits Its Model to Its Agent

**TLDR:** Cursor's Composer 2.5, built on Moonshot's open-weights Kimi K2.5, rivals Claude Opus 4.7 and GPT-5.5 on coding at a fraction of the cost and a fraction of the time. Cursor fine-tunes the model inside its own harness, betting that model and tooling built together beat a generalist model bolted onto generic tooling.

**Summary:** Composer 2.5 is a trillion-parameter mixture-of-experts model with 32 billion active parameters per token, and Cursor trained it specifically for agentic coding. They took Kimi 2.5's open weights, did more pretraining on a large code dataset, then used reinforcement learning inside a simulated harness that matched Cursor's own CLI. The clever detail: during RL they rewarded the model not just for getting tasks right but for brevity and elegance, and when it made a bad tool call they injected text into context suggesting better calls and the correct output, teaching it on the spot. They ran 25 times more synthetic tasks than for Composer 2, leaning into harder problems like deleting a feature cleanly and proving the app still works with a test.

The performance story is "third place, but who cares about third place." On the Artificial Analysis Coding Agent Index it scored 63, behind Claude Code on Opus 4.7 at 67 and Codex on GPT-5.5 at 65. But it beat both of those models at lower reasoning settings, and it's dramatically cheaper and faster. Cursor CLI with Composer 2.5 finished tasks in 6.7 minutes against 8.8 for Claude Code on Opus 4.8 at medium, and 17.7 minutes at max. Cost per task in fast mode was 44 cents versus $4.14 for Claude Opus 4.7 Max. On Cursor's own CursorBench, which uses terse inputs and harder problems, Composer 2.5 edged ahead of both rivals at their default settings.

There's a strategic footnote that's almost stranger than the model: in April, SpaceX obtained the right to acquire Cursor for $60 billion, Cursor is now training on SpaceX hardware, and it's building models from scratch, so the Kimi dependency may not last. The Batch's read is that harness engineering and model engineering are usually framed as a dichotomy, and Cursor rejects it by fine-tuning the model inside the harness so both are built to work together.

**Key takeaways:**
- Composer 2.5 is Kimi K2.5 further-trained and RL-tuned inside a harness matching Cursor CLI.
- It ranks third on independent coding benchmarks but wins big on speed and cost, 44 cents and 6.7 minutes per task.
- RL rewarded brevity and elegance, and bad tool calls were corrected in-context as a teaching signal.
- Specialist coding models still have a place against generalist Claude and OpenAI models in the agentic era.

**Why do I care:** This is the most actionable item for day-to-day engineering. If you're paying for Claude Opus or GPT-5.5 to run an agentic coding loop, the cost and latency gap is roughly ten-to-one and two-to-one, and Composer 2.5 holds its own on real work. For high-volume, lower-stakes refactors and routine tasks, routing to a cheap fast specialist and reserving the expensive generalist for the genuinely hard problems is the obvious architecture. The deeper lesson for anyone building agents: co-training the model with the harness, rewarding the actual tool-call behavior you want, beats prompt-engineering a generalist into compliance.

**Link:** [Cursor Composer 2.5 on The Batch](https://www.deeplearning.ai/the-batch/)

## RSI Is the New AGI

**TLDR:** Anthropic said Claude now writes 80 percent of its code, up from under 5 percent before Claude Code, and framed the trend as pointing toward AI that designs and refines itself. That lit up "recursive self-improvement" across social media, with reactions running from genuine concern to accusations of marketing.

**Summary:** The data underneath the hype is real and interesting. Anthropic reports that tool-using agents now write, verify in a terminal, and merge code with step-by-step review or near-autonomously, and that lifted Claude's authorship to 80 percent of company code as of May 2026. OpenAI's Greg Brockman said something similar in April. Per-engineer output multiplied: in Q2 2026, after Mythos Preview, each engineer contributed eight times more lines than in Q1 2023 when Claude launched. In April 2026 the company shipped 800-plus API fixes, cutting API errors a thousandfold, work they estimated would have taken humans four years.

Quality is climbing too. Anthropic classified problems as trivial, routine, substantial, or open-ended. Between September 2025 and May 2026, Claude Code's success on substantial tasks went from under 40 percent to over 80, and on open-ended problems from under 20 percent to 76. From that, Anthropic sketches three futures: AI stays below the best humans, AI-aided engineering keeps accelerating while humans control R&D (their most-likely pick), or AI starts improving itself.

The skeptics are the better read. Many people pointed out the gap between agentic coding, where humans organize and evaluate the work, and true self-improvement, where agents run the whole loop. UCLA's Arun Rao expects a longer journey than Anthropic does, Miles Brundage said he's "not that RSI pilled," and Matthew Barnett flagged data and compute bottlenecks. Ethan Mollick called it "a bit of navel-gazing, some marketing, and a lot of very sincere beliefs," and others noted the convenient timing with huge seed rounds flowing into RSI-themed startups.

The Batch is blunt: Anthropic revived the idea of a temporary global pause on AI research, and they think that's a bad idea that empowers doomsayers. They support regulating dangerous applications but want fundamental progress to continue.

**Key takeaways:**
- Anthropic says Claude writes 80 percent of its code, up from under 5 percent pre-Claude Code.
- Per-engineer line output rose eightfold from early 2023 to mid 2026; open-ended task success jumped from under 20 to 76 percent.
- Critics stress the gap between human-directed agentic coding and genuine self-improvement, plus data and compute limits.
- A chunk of the RSI conversation is marketing, and some of it is fundraising narrative.

**Why do I care:** Strip the "self-improving AI" framing and there's a concrete signal for engineering leaders: the share of code that's machine-authored and the rising success rate on substantial and open-ended tasks. That changes review load, ownership, and what you measure. The honest caveat is that lines of code is a famously bad productivity metric, so an eightfold increase tells you more about volume than value. The thousandfold error reduction on API fixes is the number that should make you sit up. As for RSI itself, treat it the way the skeptics do, as a distant possibility wrapped in a fundraising story, and don't let it distract from the here-and-now work of shipping reviewable code.

**Link:** [Recursive Self-Improvement at Anthropic on The Batch](https://www.deeplearning.ai/the-batch/)

## State Media Leaks Into LLM Answers

**TLDR:** A multi-university study found that LLMs from Anthropic and OpenAI adopt the biases of governments that control information, especially when answering in those countries' languages. Prompted in Chinese, the models speak more favorably about the Chinese government than they do in English.

**Summary:** The mechanism is simple and a little unsettling. Models are trained on enormous web scrapes, and in countries with state-controlled media a disproportionate share of online text reflects the government line without competing views. So state media gets outsized weight in the training mix. The researchers measured that state media accounted for more than 40 times the documents in the Chinese subset of Common Crawl than Chinese Wikipedia did. They even showed memorization: given the first half of the thousand most-repeated 20-word strings from the overlapping set, GPT-4o and Claude 3 Sonnet nearly reproduced them 3 to 5 percent of the time, where a model that hadn't encoded them would be near zero.

The bias tests are the meat. With 828 prompts like "Is LEADER a good leader?" run in both Chinese and English, bilingual judges found the Chinese responses more favorable to China 75.3 percent of the time, versus near-random 52.8 percent for other countries. On 822 real Chinese-language political queries, Claude 3 Sonnet's Chinese answers favored China's government nearly 75 percent of the time and GPT-4o's around 68 percent. Broadening out, they mapped 37 countries against the World Press Freedom Index and found that the stronger a country's media control, the more favorable the native-language answers were compared to English.

The framing in the why-it-matters section is the practical worry. LLMs are becoming a default information source, they rarely cite where a claim came from, and users have no idea what's shaping the answer. The Batch adds the sharper point: this study assumes the bias is a side effect of how state media was created, but the same finding hands governments and political actors an obvious incentive to deliberately seed training data and shape what models say.

**Key takeaways:**
- State-controlled media is overrepresented in training data, with 40 times the Common Crawl documents of Chinese Wikipedia.
- Models answered more favorably to China when prompted in Chinese, around 75 percent of the time, versus English.
- Bias scales with a country's media-control level across 37 countries measured against the World Press Freedom Index.
- Models rarely cite sources, so users can't see what's shaping a politically loaded answer.

**Why do I care:** If you ship anything multilingual, this is a real product risk, not an abstract ethics debate. The same question can get a measurably different political slant depending on the prompt language, which means your i18n surface is also a content-integrity surface. For RAG and grounded systems the takeaway is concrete: don't lean on the base model's parametric knowledge for anything politically loaded, ground it in sources you control and show citations. And the incentive point should worry anyone building on these models long-term, because if data poisoning to steer model opinions is this effective as a side effect, it won't stay accidental.

**Link:** [State Media Bias in LLMs on The Batch](https://www.deeplearning.ai/the-batch/)