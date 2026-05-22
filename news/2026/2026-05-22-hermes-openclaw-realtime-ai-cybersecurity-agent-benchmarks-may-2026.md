---
title: "Hermes vs OpenClaw, Real-Time AI Conversations, Cybersecurity Threats, and Agent Benchmark Gaps"
excerpt: "This week's Batch covers a rising open-source agent challenging OpenClaw, a multimodal system that talks and listens simultaneously, LLMs enabling industrial-scale cyberattacks, and why AI agent benchmarks miss most of the economy."
publishedAt: "2026-05-22"
slug: "hermes-openclaw-realtime-ai-cybersecurity-agent-benchmarks-may-2026"
hashtags: "#thebatch #ai #ml #agents #cybersecurity #multimodal #benchmarks #generated #en"
source_pattern: "The Batch"
---

## Hermes Agent Takes On OpenClaw

**TLDR:** An open-source AI agent called Hermes Agent, built by Nous Research, has overtaken OpenClaw in daily token consumption on OpenRouter's leaderboard. What makes it interesting is not raw throughput but a design that lets the agent build and refine its own skills over time.

OpenClaw had a remarkable run as the default open-source personal agent, running tasks through WhatsApp, Telegram, and similar channels. Its creator ended up at OpenAI. That's a familiar story in this space. But Hermes Agent is doing something structurally different that deserves attention.

The core loop is similar to OpenClaw: assemble a prompt, compress context if needed, call the LLM, execute tool or skill calls, repeat until the model produces a user-facing response. What differs is what happens around that loop. When Hermes Agent finishes a task successfully after extended effort, or fixes an error, it automatically generates a skill file. That skill captures what it learned as a reusable instruction set. A background process called Curator then periodically reviews the growing library, merging overlapping skills and archiving ones that have not been used in 90 days. The agent is, in effect, accumulating and refining domain expertise across sessions.

Memory works similarly. Two persistent files capture user preferences and workflow lessons. Before adding anything, the agent checks whether a similar entry already exists, avoids vague generalizations, and merges related entries when the file would grow too long. It also maintains a searchable conversation database and can connect to external memory systems like Honcho, which builds a model of user identity from every message.

The complaints about token efficiency are fair. Generating and evaluating skills at runtime costs tokens. But I think critics are measuring the wrong thing. If Hermes Agent's skill accumulation means it handles a recurring task faster on the tenth attempt than the first, the per-task cost may drop significantly. The token consumption leaderboard captures short-term burn rate, not long-term utility.

What the architecture suggests is a shift in how we think about AI agents. Right now most agents are stateless by design: start fresh, do the work, forget everything. Hermes Agent is building toward something more like a continuously employed assistant that improves at your specific workflows. Whether that vision holds up at scale, with agents generating skills of varying quality, is the real question nobody is answering yet.

**Key takeaways:**
- Hermes Agent overtook OpenClaw in OpenRouter's daily token consumption ranking
- Its standout feature is automatic skill generation: successful task completions get encoded as reusable SKILL.md files
- A Curator process archives unused skills and merges duplicates to keep the library manageable
- Memory architecture tracks user preferences, workflow lessons, and conversation history with deduplication logic
- It runs locally or in the cloud and is not tied to any specific LLM or messaging platform

**Why do I care:** The agent skill library concept is genuinely interesting from an engineering standpoint. Most of us build systems where knowledge lives in prompts or code, not in agent-generated artifacts that accumulate and get curated over time. If this pattern proves reliable, it changes how you design agent persistence. The failure mode is equally obvious: uncurated skill libraries become noise, and a Curator that merges things incorrectly can corrupt behavior in subtle ways. I'd want to see benchmarks on skill quality degradation over long runs before I trusted this in production.

**Link:** [Hermes Agent](https://nousresearch.com/hermes-agent)

---

## TML-Interaction-Small: AI That Listens While It Talks

**TLDR:** Thinking Machines Lab, Mira Murati's company, has built a 276-billion-parameter multimodal model that processes audio, video, and text input while simultaneously generating audio and text output. It handles interruptions and interjections natively, without the awkward turn-taking that makes current voice models feel robotic.

Every voice AI system I've used treats conversation like a game of tennis: you hit the ball, wait, the AI hits it back. That works for simple queries but collapses under anything resembling natural conversation. Interruptions fail. Filler words get mishandled. The moment two things happen at once, the system either freezes or ignores the input. TML-Interaction-Small is designed to fix that at the architecture level.

The key idea is what Thinking Machines Lab calls micro-turns: 200-millisecond chunks of interleaved input processing and output generation. Instead of processing an entire utterance and then generating a response, the model processes audio, video, and text as parallel streams in small slices. Audio is discretized into tokens. Video frames are embedded using a hierarchical multilayer perceptron at 40x40 pixel patches. The model skips large pretrained encoders entirely, training the transformer, perceptron, and flow-matching decoder from scratch together. That encoder-free early fusion approach is where most of the architectural novelty lies.

A separate asynchronous background model handles reasoning, web browsing, and tool calls without interrupting the foreground conversation. Both models share context. The interaction model weaves background outputs into the conversation when appropriate. This is not entirely different from what Vocal Bridge does with API-level orchestration, but the joint training means the handoff is learned rather than scripted, which should handle edge cases more gracefully.

The benchmarks tell an interesting story. On latency and interruption handling, TML-Interaction-Small is clearly ahead: 0.40 seconds response time versus 1.18 for GPT-Realtime-2 in minimal reasoning mode, and a 77.8 average quality score on interruption benchmarks versus 47.8 for GPT-Realtime-2 at its highest reasoning setting. On intelligence tests, it trails GPT-Realtime-2's top reasoning mode. The company says it has larger pretrained interaction models but cannot yet serve them at real-time speeds. That's an honest disclosure, and it suggests the current release is a capability demonstration more than a finished product.

The use cases that interest me most are not consumer chat. Coaching scenarios, surgical monitoring, real-time translation, anything where the human cannot pause and wait for an AI response. Turn-based models are structurally unsuited to those applications. A model that has learned to handle overlapping speech, proactive visual interjections, and simultaneous input and output is a different class of tool.

**Key takeaways:**
- 276B parameter mixture-of-experts model processing audio, video, and text simultaneously with concurrent output
- Micro-turns (200ms slices) replace traditional input/output alternation
- Encoder-free early fusion: no Whisper, no vision transformers, all components trained together from scratch
- Separate asynchronous background model for reasoning and tool calls, sharing context with the foreground model
- Leads on interactivity benchmarks; trails GPT-Realtime-2's strongest reasoning mode on intelligence tests

**Why do I care:** The encoder-free joint training approach is worth understanding. Most multimodal systems bolt together pretrained components: a Whisper-based audio encoder, a vision transformer for images, and a separate language model. Each handoff between components introduces latency and potential misalignment. Training everything together from scratch is harder and requires more data, but it removes those seams. If TML-Interaction-Small can maintain real-time performance while the background model scales up, this architecture could matter a lot for the next generation of voice applications.

**Link:** [TML-Interaction-Small](https://thinkingmachines.ai/tml-interaction-small)

---

## LLMs Are Now Industrial-Scale Cyberattack Tools

**TLDR:** A Google security report documents how large language models are enabling a new category of automated, industrial-scale cyberattacks, including AI-generated exploits for previously unknown vulnerabilities. A criminal had already used an LLM to find a zero-day in a widely used web administration tool before Google researchers caught it.

This is not a theoretical risk or a researcher's demonstration. A criminal used an LLM to find a previously unknown vulnerability in a widely used web administration tool and built an exploit for it before being caught. Google security researchers believe a larger campaign was planned. That's the situation we're in now.

The Google report catalogs four specific attack patterns enabled by current LLMs. Morphing malware uses LLMs to generate code that rewrites its own decryption routines, swaps commands for equivalent alternatives, and adds nonfunctional subroutines on each replication. The payload stays intact; the signature changes. Traditional antivirus detection, which relies on recognizing known patterns, struggles with this. Logical flaw identification is more serious: unlike fuzzing tools that throw random inputs at code, LLMs can reason about what code is supposed to do and find logical errors that no pattern-matching tool would catch. Obfuscation network management lets AI route malicious traffic through compromised intermediaries while avoiding the patterns that trigger security alerts. And AI infrastructure itself is becoming a target, because compromising a model or its tooling provides a foothold into systems that now trust AI outputs.

The UK's AI Security Institute recently reported that Claude Mythos Preview and GPT-5.5 can reliably execute attacks expected to take human attackers three hours. When the token limit was relaxed, they managed longer-duration attacks. At Claude Opus 4.6's debut the equivalent number was 30 minutes. The capability is scaling with the models.

What bothers me about the framing of most cybersecurity coverage is the implicit assumption that defense and offense advance in parallel. They do not. Offense benefits from automation much earlier and more completely than defense does. A human attacker who finds a zero-day vulnerability spends days or weeks turning it into a working exploit. An LLM that can reason about code can compress that timeline dramatically. The defensive patch still requires human review, testing, and deployment cycles. That asymmetry is not going away.

The answer the Google report gestures at is proactive defensive research: find your own vulnerabilities before attackers do. That's correct but undersells the difficulty. Proactive research requires knowing where to look. An LLM that can systematically scan codebases for logical flaws at scale tips that balance further toward offense.

**Key takeaways:**
- A criminal used an LLM to discover a zero-day vulnerability in a widely used web admin tool; Google researchers intercepted the planned large-scale campaign
- LLMs enable morphing malware, logical flaw discovery, automated obfuscation networks, and attacks on AI infrastructure itself
- AISI reports Claude Mythos Preview and GPT-5.5 can execute attacks taking humans 3 hours; capability grows with more tokens
- The attack-defense asymmetry is structural: automation compresses offense timelines faster than it accelerates defensive patching
- AI systems themselves are now high-value targets for attackers seeking network footholds

**Why do I care:** The logical flaw detection capability is the one I watch most closely. Fuzzing and static analysis have known limitations that experienced developers can work around. A model that understands code intent and can reason about edge cases in the way a senior security engineer would is qualitatively different. The question is not whether this capability exists but how quickly it gets commoditized into attack tooling that less sophisticated actors can run. Based on the trajectory described in this report, we're probably closer to that point than most security teams are prepared for.

**Link:** [Google Threat Intelligence Report](https://cloud.google.com/blog/topics/threat-intelligence)

---

## Agent Benchmarks Are Missing Most of the Economy

**TLDR:** Researchers at Carnegie Mellon and Stanford mapped over 10,000 examples from 43 AI agent benchmarks to U.S. labor statistics and found a significant mismatch. Benchmarks are heavily weighted toward software engineering, while most employment and economic output sits in office administration, management, and other roles that benchmarks barely cover.

This is one of those papers that feels obvious in retrospect but is valuable because it makes the gap concrete with numbers. Everyone building AI agents knows they're primarily testing on coding tasks. What this research does is quantify how bad the mismatch actually is relative to where economic value lives.

The methodology is clever. Engineers describe benchmark tasks in technical language; economists describe work using standardized activity frameworks. Those vocabularies don't map directly, but an LLM can translate between them. The researchers used Claude 3.5 Sonnet to match benchmark examples from SWE-bench, WebArena, and 41 other benchmarks to the U.S. government's O*NET taxonomy of computer-based work activities and skills. They sampled batches of five examples at a time until coverage stopped increasing by more than 0.1 percent, which meant roughly 300 examples per benchmark for most datasets.

The numbers are stark. Agent benchmarks contain 8,622 examples focused on "computer and mathematical" occupations, versus 3,186 for "office and administrative support" and 676 for "management." The actual U.S. workforce has 5.2 million people in computer and mathematical roles, 18.2 million in office and administrative support, and 11 million in management. Total annual wages tell the same story: $563.6 billion for computer and mathematical workers versus $869.8 billion for office and administrative support and $1.3 trillion for management. The benchmarks are measuring AI capability in the sector that employs the fewest people and generates the least total compensation.

The benchmark coverage of work activities is also narrow. No single benchmark covered more than 50 percent of all work activities. All 43 benchmarks combined covered only 56.5 percent. The best individual performer was GDPval at 47.8 percent coverage.

I think the researchers are being generous when they attribute this to engineers naturally writing benchmarks about what they know. That's true, but there's also a selection effect: coding tasks are easier to evaluate objectively. An agent either implements bubble sort correctly or it doesn't. Evaluating whether an agent handled a management task appropriately requires judgment. The benchmark gap partly reflects a measurement difficulty, not just a blind spot.

Building useful benchmarks for administrative and managerial work is genuinely hard. The tasks are less discrete, success criteria are fuzzier, and ground truth is contested. But that difficulty is exactly why doing it matters. If we can only measure AI capability where it's easy to measure, we'll systematically underinvest in the capabilities that could automate the largest shares of economic activity.

**Key takeaways:**
- 43 agent benchmarks analyzed with 10,000+ examples mapped to U.S. labor statistics using Claude 3.5 Sonnet as translator
- Benchmarks overindex on software engineering by a factor of roughly 3.5x relative to actual employment share
- Office and administrative support (18.2M US workers, $870B wages) is barely covered; management (11M workers, $1.3T wages) even less so
- No single benchmark covers more than 50% of work activities; all combined cover only 56.5%
- The gap reflects both engineer bias and genuine measurement difficulty for less discrete tasks

**Why do I care:** The framing of "agentic coding is an incubator for other kinds of work" that the newsletter uses is optimistic but incomplete. Coding tasks have properties that make them tractable for agents: clear inputs, executable outputs, automated test suites for evaluation. Administrative and managerial tasks often lack all three. An agent that can draft a meeting summary or process an invoice needs to be evaluated differently than one that passes a unit test. Until the field develops rigorous evaluation frameworks for those domains, benchmark gaps will persist regardless of how capable the underlying models become.

**Link:** [Agent Benchmark Analysis (CMU/Stanford)](https://arxiv.org/abs/2506.01234)
