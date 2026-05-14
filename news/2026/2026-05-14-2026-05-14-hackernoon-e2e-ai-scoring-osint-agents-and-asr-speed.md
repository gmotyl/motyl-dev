---
title: "E2E suites with AI scoring, OSINT agents that don't lie, and Nvidia's ASR speed trick"
excerpt: "HackerNoon's May 14 picks: extending Cucumber suites with local LLM quality scoring and email verification, building an OSINT agent on Anthropic's tool use that actually grounds its answers, and Nvidia's Token-and-Duration Transducer story."
publishedAt: 2026-05-14
slug: 2026-05-14-hackernoon-e2e-ai-scoring-osint-agents-and-asr-speed
hashtags:
  - "#hackernoon"
  - "#tech"
  - "#generated"
  - "#en"
  - "#ai"
  - "#testing"
  - "#agents"
  - "#llm"
  - "#architecture"
source_pattern: "HackerNoon"
---

## How to Add AI Scoring and Email Verification to Your E2E Suite

**TLDR:** Daniel Cawen extends a Cucumber BDD suite with three new layers, chat coverage, AI quality scoring via a local LLM, and signup flows with real email verification, all reusing the same World and hooks. Ollama runs locally, and CI falls back to any OpenAI-compatible API through Doppler-managed secrets.

**Summary:** The piece is a tidy followup to a Part 1 setup, and that matters because most E2E "AI testing" posts I read skip the boring scaffolding and jump straight to the LLM call. Cawen does the opposite. He keeps the BDD layer stable, reuses the Cucumber World object, and treats the LLM as just another driver alongside Playwright. That separation is the whole game when test suites grow.

The AI scoring layer is interesting because it does not try to assert exact strings. It scores responses against a rubric, which is the only sane way to evaluate chat output that has legitimate variance. Running it on Ollama locally keeps developer feedback loops fast, and the CI fallback to an OpenAI-compatible endpoint means you do not pay model fees on every commit unless you want to.

Email verification is where most teams cheat. They mock the inbox or skip the round trip entirely. Cawen wires in a real verification step so the signup profile actually exercises what users hit in production. The pattern is straightforward once you stop trying to make E2E tests feel like unit tests.

**Key takeaways:**
- BDD suites can absorb AI quality scoring without rewriting the framework, just add a step type
- Local Ollama in dev, hosted LLM in CI is a sensible cost and latency split
- Rubric scoring beats string matching for any non-deterministic response
- Real email verification belongs in a smoke profile, not a unit test
- Doppler or similar secret managers keep model API keys out of repo config

**Why do I care:** As a senior frontend dev moving into agent-heavy products, this is the kind of test architecture I want my teams reading. We have a lot of "AI features" shipping with zero meaningful test coverage because the team thinks LLM output cannot be tested. It can. You just stop expecting determinism and start scoring. The Cucumber-plus-LLM split also gives QA folks who already know Gherkin a path into AI quality without learning a whole new toolchain.

**Link:** [How to Add AI Scoring and Email Verification to Your E2E Suite](https://hackernoon.com/how-to-add-ai-scoring-and-email-verification-to-your-e2e-suite)

## Why Every AI+Security Tool I Tried Was Lying to Me (And What I Built Instead)

**TLDR:** SonoTommy, a 21-year-old engineering student, built an open source AI agent that runs OSINT investigations from a terminal after watching every commercial AI+security tool hallucinate findings. The fix was the Anthropic tool use API, wrapping real tools like holehe instead of asking a model to invent data.

**Summary:** This is the post I keep wanting to find when someone tells me "we built an AI security tool". The author's complaint is the right one. Models trained on the open web will happily generate a plausible looking OSINT report that has no relationship to the actual target. That is not a security tool, that is a creative writing tool with a black hoodie skin.

The interesting move is wrapping holehe and other real OSINT primitives as Anthropic tool calls. The model decides which tool to use and how to chain results, but the facts come from grounded sources. This is the pattern I want every "agentic" startup to adopt before they ship anything that claims to find data. Tool use is the only way to keep an LLM honest in a domain where wrong answers do real damage.

The CLI form factor is also a smart choice for an OSINT workflow. Investigators already live in terminals, and a chat UI would slow them down. Running locally also means sensitive queries do not leak through a third-party SaaS log.

**Key takeaways:**
- Hallucinated OSINT is worse than no OSINT because it looks authoritative
- Anthropic tool use API forces grounding through real tool calls
- CLI fits investigator workflow better than a chat UI
- Open source matters when the alternative is trusting a vendor's claims about hallucination rates
- Young engineers writing open agents are often ahead of the commercial market

**Why do I care:** I keep getting asked "how do we make our agent not lie" by teams whose entire architecture is "prompt the model harder". The answer is tool use plus grounded data sources, exactly the pattern here. Worth bookmarking for the next time a security vendor demos their AI assistant and refuses to show the tool-use trace.

**Link:** [Why Every AI+Security Tool I Tried Was Lying to Me](https://hackernoon.com/why-every-aisecurity-tool-i-tried-was-lying-to-me-and-what-i-built-instead)

## How Nvidia Made Its ASR Models 3x Faster Than the Competition

**TLDR:** Speechmatics walks through Nvidia's Token-and-Duration Transducer architecture, the design choice behind the Parakeet family's speed advantage over competing ASR models. The trick is predicting token duration alongside the token itself, which collapses redundant frame-level work.

**Summary:** Speech recognition has been incrementally improving for years, but the 3x throughput claim is worth paying attention to. Traditional transducer models predict one token per audio frame and emit a lot of blank symbols. TDT predicts how many frames a token spans, so the decoder can skip ahead instead of grinding through silence and repeated states.

For frontend folks shipping voice agents, the practical takeaway is that real-time STT is finally cheap enough to put in front of users without grimacing at the GPU bill. Parakeet on Hugging Face means a small team can self-host instead of paying per-minute API fees, which changes the calculus for voice-first product features.

The accuracy story is competitive without being best-in-class, but the speed-accuracy tradeoff is right for product use cases where latency dominates user perception. A 100ms voice response that gets one word wrong feels better than a 600ms perfect transcript.

**Key takeaways:**
- TDT predicts token duration to skip redundant frames in decoding
- Parakeet is available on Hugging Face for self-hosting
- Latency often matters more than the last 1% of word accuracy for product UX
- Self-hosted ASR changes the cost model for voice features
- Architecture choices, not just model size, drive the meaningful gains now

**Why do I care:** Voice as an input modality has been on the "almost ready" list for a decade. With ASR this fast and this cheap, I want my product teams to stop treating voice as an accessibility checkbox and start designing real voice-first flows. The architecture detail also matters for hiring conversations, anyone who can talk about TDT vs vanilla transducers actually understands the field.

**Link:** [How Nvidia Made Its ASR Models 3x Faster Than the Competition](https://hackernoon.com/how-nvidia-made-its-asr-models-3x-faster-than-the-competition)

## Why Internet Communities Struggle to Publish Quality Over Quantity

**TLDR:** David argues that the internet solved the problem of who gets to publish but scaled the problem of deciding what is worth reading. Publishing got cheap, attention did not, and community-driven platforms have not figured out how to bridge that gap.

**Summary:** This one resonates if you have ever tried to run an engineering blog with multiple contributors. The economics of writing flipped years ago. Anyone can publish, distribution is free, and the marginal cost of one more post is essentially zero. That pushed volume up and average quality down because the curation layer never scaled with the publishing layer.

The community angle is the interesting part. Reddit, Hacker News, dev.to and HackerNoon itself all rely on some mix of voting, editorial picks and algorithmic ranking. Each one has the same failure mode, the loudest content wins, not the most useful content. David's point is that publishing infrastructure outpaced reading infrastructure, and nobody has invented a community that solves it.

I would push back a little. Some niche Discord servers and small Substack rings have actually solved this through aggressive scope and trusted curators. The open community problem might just be unsolvable at scale, and the answer is to stop trying to scale.

**Key takeaways:**
- Cheap publishing plus expensive attention is a structural mismatch
- Voting systems reward visibility, not utility
- Editorial curation does not scale linearly with contributor count
- Small trusted communities outperform large open ones for signal-to-noise
- The "next HN" problem may be unsolvable without breaking openness

**Why do I care:** I read a lot of frontend content and the signal has gotten worse. Anyone who runs a tech newsletter or internal engineering wiki is dealing with the same problem at smaller scale. The takeaway for my own work is that human curation, even unfashionable as it is, beats algorithmic ranking for any audience under a few thousand readers.

**Link:** [Why Internet Communities Struggle to Publish Quality Over Quantity](https://hackernoon.com/why-internet-communities-struggle-to-publish-quality-over-quantity)

## Developers: The Why and How to Writing Technical Articles

**TLDR:** Goodness Kayode's classic 2017 piece on why developers should write, and how to start. The advice has held up because the reasons did not change, writing forces clarity, builds reputation, and creates serendipity in your career.

**Summary:** This is one of those evergreen pieces HackerNoon resurfaces every few years, and I am happy they did. Most developers I work with say they "should write more" and never start. Kayode's framing is that writing is not about traffic or fame, it is a thinking tool. You learn what you actually understand the moment you have to explain it.

The how section is practical. Pick something you struggled with last week, write the post you wish you had found when you were stuck, and ship it before it feels finished. The bar most engineers set for themselves is too high because they compare draft one to polished published posts they admired. Bad first drafts beat unwritten posts every time.

What I would add for 2026 readers is that LLMs have changed the editing loop but not the thinking loop. You still need to do the hard work of structuring your argument. The model is a fine copy editor and a terrible substitute for understanding.

**Key takeaways:**
- Writing forces you to discover what you do not actually understand
- Pick the post you wish existed last week when you were stuck
- Ship before it feels finished, polish later
- Career serendipity often comes from one post finding the right reader
- LLMs help with editing but not with thinking

**Why do I care:** Every senior engineer I respect writes. Not all of them publish, but they all write internal docs, ADRs, design proposals. The act of writing is the technical skill, the publishing is optional. I keep recommending this post to mids who want to grow.

**Link:** [Developers: The Why and How to Writing Technical Articles](https://hackernoon.com/developers-the-why-and-how-to-writing-technical-articles-54e824789ef6)

## 7 Pro Writing Tips for Devs, Founders and Other Non-Writers

**TLDR:** Amit Sharma's seven tips for technical and founder writers who do not consider themselves writers. The list covers headlines, structure, voice, and shipping habits, with a bias toward action over perfection.

**Summary:** The companion piece to the Kayode post above, this one is more tactical. Sharma's bias is right, write the headline last, write the conclusion first, and stop revising past the point of diminishing returns. Most non-writers spend their effort on the wrong parts of the draft.

The voice tip is the one I would put first. Write the way you talk in code reviews. Stop trying to sound like a textbook. Engineering audiences are exhausted by formal prose pretending to be authoritative when a conversational tone would land harder.

The structure advice is solid but generic. The headline advice is genuinely useful because most engineers write headlines like commit messages, accurate but unclickable. A good headline is a promise about the value the reader gets, not a label for the content.

**Key takeaways:**
- Write the headline last, after you know what the post is actually about
- Conversational voice outperforms textbook tone for engineering audiences
- Conclusion-first drafting helps you know what to cut
- Stop revising past diminishing returns and ship
- Headlines are promises, not labels

**Why do I care:** I edit a lot of internal engineering posts and the same pattern keeps appearing. Strong technical content buried under weak headlines and meandering intros. Tips like these would save my reviewers half their time. Worth sharing with anyone on your team who keeps "meaning to start a blog".

**Link:** [7 Pro Writing Tips for Devs, Founders and Other Non-Writers](https://hackernoon.com/how-can-non-writers-become-effective-bloggers-1pq32wd)

## Adversarial Machine Learning and Its Role in Fooling AI

**TLDR:** Sidra Ijaz's 2020 explainer on adversarial machine learning, the discipline of crafting inputs that trick ML models into wrong predictions. Old post, but the concepts are more relevant in 2026 than when it was written.

**Summary:** The piece predates the LLM hype cycle and reads better for it. Adversarial ML used to be a niche academic topic about adding pixel noise to fool image classifiers. Now every production LLM gets jailbroken weekly by prompt injection, which is the same family of attack with a friendlier name.

The taxonomy still holds up. White-box attacks where you know the model weights, black-box attacks where you only see outputs, and transferability where an attack crafted for one model often works on another. Anyone shipping AI features in 2026 should know all three because your users include people who treat the model as an attack surface.

What is missing from the 2020 framing is the prompt injection angle. The same theoretical foundation applies, but the practical playbook has moved on. Pair this article with any recent OWASP LLM top 10 writeup for the modern view.

**Key takeaways:**
- Adversarial ML and prompt injection share the same theoretical roots
- White-box, black-box, and transferable attacks all show up in production today
- Knowing the taxonomy helps you reason about defenses
- 2020 ML security writing is still the foundation under 2026 LLM security
- Treat any model output that touches a user as untrusted, every time

**Why do I care:** If you ship anything with an LLM in the loop, you have an adversarial ML problem whether you call it that or not. Users will craft inputs that break your system. I want frontend engineers to internalize this because the validation logic between the model output and the DOM is now load-bearing security code.

**Link:** [Adversarial Machine Learning and Its Role in Fooling AI](https://hackernoon.com/adversarial-machine-learning-and-its-role-in-fooling-ai-3z4k3447)
