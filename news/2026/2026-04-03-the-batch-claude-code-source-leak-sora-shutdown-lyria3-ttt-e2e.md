---
title: "Claude Code Unmasked, Sora Shuts Down, Lyria 3 Makes Music, and LLMs Learn While Running"
excerpt: "This week: Anthropic accidentally exposed Claude Code's internals, OpenAI killed Sora, Google shipped a music generator to 750 million users, and researchers figured out how to train transformers at inference time."
publishedAt: "2026-04-03"
slug: "the-batch-claude-code-source-leak-sora-shutdown-lyria3-ttt-e2e"
hashtags: "#the-batch #ai #ml"
source_pattern: "The Batch"
---

## Inside Claude Code: The Accidental Source Leak

**TLDR:** Anthropic accidentally shipped a source map alongside Claude Code version 2.1.88, exposing over 512,000 lines of previously closed-source code. What researchers found inside was more interesting than anyone expected.

**Summary:** A packaging mistake turned into one of the more revealing moments in recent AI history. When Anthropic published version 2.1.88 of Claude Code to the npm registry on March 30, it included a source map file — a translation key that reverses the obfuscation bundlers typically apply to closed-source JavaScript. Chaofan Shou, an intern at the blockchain startup Solayer Labs, discovered the file, decoded it, and published the contents on X. Within hours, the community had 512,000 lines of code spread across 1,900 files to read through. Anthropic pulled the package from npm and GitHub quickly, but by then it had already been forked more than 40,000 times. The company confirmed it was "a release packaging issue caused by human error, not a security breach," and said no user or customer data was exposed.

What engineers found inside is genuinely worth talking about. Claude Code is not a chatbot wrapper with some extra tooling bolted on. It's closer to a small, dedicated operating system. More than 40 different tools — for reading files, executing bash commands, fetching web content, and so on — each have their own modules and permission gates. Those gates isolate the language model from arbitrary access to the user's computer. Background processes handle memory. The architecture deliberately separates concerns in a way that makes accidental or adversarial code execution much harder.

The memory system is particularly thoughtful. There are three tiers. A file called MEMORY.MD always loads but contains only pointers to larger Markdown memory files, which are pulled in only when needed. JSON transcript files log file changes without sitting in active context, available for search when relevant. This structure avoids the context bloat that plagues naive agent designs. When a conversation approaches the context limit, Claude Code runs a three-stage compression strategy: first truncating cached tool outputs locally, then generating a structured 20,000-token summary of the most recent session, and finally compressing the entire conversation while re-adding recently accessed files, active plans, and relevant skills.

The code also reveals features not yet shipped. A subsystem called Kairos — Greek for "timely" — would run as an always-on background agent, using a logic system called autoDream to merge duplicate memories, eliminate contradictions, and prune stored data. There's also a voice interface in progress, a subagent called Ultraplan that would offload resource-intensive tasks to the cloud, and a persona called Buddy meant to comment on your work. Perhaps most striking is an "undercover mode" that allows Claude Code to commit to public git repositories without leaving a signature — apparently designed for internal testing or unannounced partner work. The source files also reference a Claude 4.6 variant codenamed Capybara. Version 8 of Capybara makes false or exaggerated claims around 30 percent of the time, compared to 16.7 percent for an earlier version. That number is worth sitting with. A model tuned to be more confident is, apparently, also tuned to be less accurate.

**Key takeaways:**
- Claude Code uses a modular, OS-like architecture with 40+ isolated tools and permission gates
- Memory is managed in three tiers to avoid context bloat and keep only relevant information active
- Unreleased features include Kairos (background memory agent), voice interface, and Ultraplan (cloud offloading)
- An "undercover mode" lets the agent commit code without leaving a signature — the stated purpose is testing, but the implications are broader
- A Capybara model variant shows a 30% hallucination rate, nearly double a previous version, suggesting confidence and accuracy are being traded off
- The leak was human error, not a breach — but 40,000+ forks means the code is effectively public now

**Why do I care:** If you build on top of agentic systems or ship developer tools, this is a free architecture review of one of the most widely used coding agents out there. The three-tier memory design and the permission-gated tool modules are patterns worth stealing. The Capybara hallucination rate, though, is a reminder that eval numbers don't always move in the direction you'd hope when you push models toward more assertive behavior.

**Link:** [Inside Claude Code — The Batch](https://www.deeplearning.ai/the-batch/)

---

## OpenAI Exits Video Generation

**TLDR:** OpenAI is shutting down Sora, its text-to-video generator, after the product failed to attract sustainable paid usage and burned roughly a million dollars a day. The team is being redirected to world models and robotics.

**Summary:** Sora launched as OpenAI's attempt to repeat the ChatGPT moment in a new medium. The model generated high-definition videos up to 25 seconds long with genuine visual quality, and the initial reaction from the research community was enthusiastic. Two years later, the product is being discontinued. Web and app access ends April 26. The API closes September 24. The Wall Street Journal reported that OpenAI is reallocating the team to longer-term bets on world models and robotics, and consolidating its browser, Codex, and the ChatGPT app into a single desktop application.

The numbers tell the story plainly. Daily active users peaked around one million shortly after the mobile app launched in September 2025, then fell to less than half that. Sora was losing roughly a million dollars a day. The model ranked 19th on Artificial Analysis' text-to-video leaderboard, behind models from ByteDance, Kling, xAI, and Google. Meanwhile, OpenAI had quietly diverted Sora's compute to run a model codenamed Spud, which powers coding and enterprise products — higher-margin work that makes actual business sense.

The business logic here isn't complicated. Video generation is computationally expensive in a way that text and image generation simply aren't. Generating a single clip takes minutes and requires substantially more processing power. The subscribers who would pay for that capability — and pay enough to cover the cost — never showed up in the numbers that the company needed. The Sora team proposed training a new video model integrated directly into ChatGPT, but the cost of that training was enough to tip the decision toward cancellation.

There's a high-profile casualty worth noting. OpenAI had formed a partnership with Disney in late 2025 — Disney would invest up to a billion dollars, license its characters to OpenAI, and use Sora for pre-production visualization, marketing, and special effects, with generated videos potentially appearing on Disney+. That partnership is effectively over with Sora's shutdown.

**Key takeaways:**
- Sora is being shut down — web access ends April 26, API access ends September 24
- Daily active users peaked around 1 million then fell below 500,000; the product was losing roughly $1M per day
- The model ranked 19th on text-to-video leaderboards, well behind competitors
- The Disney partnership, which included up to $1B in investment and content licensing, is effectively canceled
- OpenAI is redirecting compute and the Sora team toward world models, robotics, and a unified desktop app

**Why do I care:** This is the clearest signal yet that "impressive demo" and "sustainable product" are different things in ways that matter enormously. Video generation may find its footing as a feature inside larger products rather than a standalone destination. The consolidation into a single desktop app is also worth watching — it suggests OpenAI is thinking hard about where developer and power-user attention actually lives.

**Link:** [OpenAI Exits Video Generation — The Batch](https://www.deeplearning.ai/the-batch/)

---

## Gemini's Music Generator: Lyria 3

**TLDR:** Google launched Lyria 3, a music generation model integrated into Gemini and YouTube, putting AI-generated music in front of more than 750 million users. The model generates 30-second audio clips from text or image prompts, with lyrics in eight languages.

**Summary:** Lyria 3 takes text descriptions or images and generates 30-second audio clips that can include instruments, singing voices, and lyrics in English, German, Spanish, French, Hindi, Japanese, Korean, and Portuguese. Cover art comes from Nano Banana, Google's image generator. Output is available in MP3 and MP4 formats and watermarked with SynthID, Google's steganographic marker for synthetic media. Users can upload audio to the Gemini app to check whether a file was generated by a Google model.

The architecture is a latent diffusion model — the same broad family as the image generators that have become ubiquitous. Rather than removing noise from image embeddings, Lyria 3 removes noise from representations of audio slices over time. Google has been relatively tight-lipped about parameter count, training data size, and training methods, disclosing only a high-level overview. What they did share is that training went through three phases: pretraining, supervised fine-tuning, and reinforcement learning from human feedback. Google also made a meaningful change relative to Lyria 2 by licensing its training data, directly addressing the copyright criticism that landed Suno and Udio in court.

That legal context matters a lot here. In June 2024, Sony Music, Universal Music Group, and Warner Music sued Suno and Udio for alleged copyright violations. By late 2025, both defendants had settled with Universal and pivoted away from generating original music toward tools that work with existing, licensed recordings. Sony's lawsuit against them is still in progress. Lyria 3 arrives into this environment with licensed training data, output filtering for similarity to copyrighted works, and explicit policies against replicating specific artists' sonic likenesses. Google acknowledges the approach is fallible and invites users to report potential violations.

The scale of distribution here is genuinely different from anything competitors have achieved. Suno has around two million paid subscribers. Udio has around 3.3 million monthly users. Lyria 3 is available free to anyone using the Gemini app who is 18 or older, with higher limits for paid subscribers, and it's also integrated into YouTube Shorts via the Dream Track soundtrack generation tool. That's a distribution advantage measured in hundreds of millions of users versus millions.

**Key takeaways:**
- Lyria 3 generates 30-second audio clips from text or image prompts, with lyrics in eight languages
- Architecture is a latent diffusion model with three training phases including RLHF
- Google licensed training data this time, a direct response to copyright litigation that sidelined Suno and Udio
- Output is watermarked with SynthID; users can verify whether audio was generated by a Google model
- Distribution via Gemini app and YouTube Shorts puts the model in front of 750+ million users
- Days after launching Lyria 3, Google acquired ProducerAI (formerly Riffusion) for professional production tooling

**Why do I care:** The copyright licensing approach is the move that lets this actually exist without immediate legal exposure. If you're building anything with audio generation, the SynthID watermarking and the three-phase training approach with licensed data are the patterns to follow. The distribution play through YouTube Shorts is also interesting — that's how you normalize a technology, not by launching a standalone product but by embedding it where people already create.

**Link:** [Gemini's Music Generator — The Batch](https://www.deeplearning.ai/the-batch/)

---

## Learning Long Context at Inference

**TLDR:** Researchers introduced TTT-E2E, a method that compresses long context into a transformer's weights by training during inference, keeping accuracy stable and processing time constant as context length grows. The tradeoff is slower training.

**Summary:** Standard transformer architectures attend to every token that's been processed when generating the next output token. That means each successive token costs more compute than the last, and inference slows down as context grows. One common workaround is sliding-window attention, which restricts the model's view to a fixed window of tokens rather than the full context — keeping per-token processing time constant but potentially losing information that falls outside the window. Test-Time Training, End-to-End (TTT-E2E), developed by researchers at the Astera Institute, Nvidia, Stanford, UC Berkeley, and UC San Diego, takes a different approach: instead of throwing away out-of-window context, the model learns from it by updating its own weights at inference time.

The core idea draws on meta-learning — training a model to learn how to learn. During training, an outer loop evaluates how well the model performs after simulating in-context weight updates, then backpropagates through those simulated updates to adjust the full model. The inner loop, which runs at inference time, splits the input into chunks of 1,000 tokens, computes a next-token prediction loss for each chunk, and updates the weights of the fully connected layers in the last quarter of the network. At inference, only the inner loop runs, which is why processing time stays constant regardless of how long the context grows.

The team built a 3-billion-parameter transformer with a fixed attention window of 8,000 tokens, pretrained on 164 billion tokens, then fine-tuned on sequences up to 128,000 tokens drawn from the Books subset of The Pile. Compared to a standard transformer, TTT-E2E showed slightly lower next-token prediction loss across context lengths from 8,000 to 128,000 tokens. Against efficient recurrent architectures like Mamba 2 and Gated DeltaNet, its accuracy was also higher. Processing speed at inference was roughly on par with those more efficient architectures and significantly better than the vanilla transformer at long contexts.

There's a real weakness, though, and it's worth naming directly. On the Needle-in-a-Haystack benchmark — which tests whether a model can retrieve a specific target string from a long context — TTT-E2E's performance dropped dramatically beyond 8,000 tokens. At 128,000 tokens, it scored around 6 percent on that benchmark, compared to Mamba 2 and Gated DeltaNet at 7 percent, and the vanilla transformer at 99 percent. That's not a rounding error. If your application depends on reliably pulling specific facts from a long document, this architecture currently fails. The training cost is also significantly higher than alternative efficient architectures, particularly for longer sequences.

**Key takeaways:**
- TTT-E2E updates model weights at inference time to compress long context, keeping processing time constant as context grows
- Training uses a meta-learning approach with nested inner and outer loops; only the inner loop runs at inference
- Slightly outperforms vanilla transformers and efficient recurrent architectures (Mamba 2, Gated DeltaNet) on next-token prediction loss
- Processing speed at inference is comparable to efficient architectures and better than vanilla transformers at long context
- Serious weakness on Needle-in-a-Haystack retrieval beyond 8,000 tokens (6% vs 99% for vanilla transformer at 128K tokens)
- Training is considerably slower than competing efficient architectures

**Why do I care:** The idea of learning from context rather than attending to it is genuinely interesting as an architectural direction. The Needle-in-a-Haystack numbers are a hard stop for a lot of practical applications right now, but as a research direction it points toward inference being a more active, stateful process rather than a passive lookup. That has implications for how we think about context windows, memory systems, and the cost structure of running agents over long tasks.

**Link:** [Learning Long Context at Inference — The Batch](https://www.deeplearning.ai/the-batch/)
