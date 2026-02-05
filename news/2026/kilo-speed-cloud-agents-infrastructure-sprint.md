---
title: "Building Cloud Agents at Kilo Speed: One Engineer's Week-Long Infrastructure Sprint"
excerpt: "How Florian Hines shipped Kilo's Cloud Agent platform in seven days using parallel workflows, AI-assisted onboarding, and a pragmatic MVP mindset."
publishedAt: "2026-02-04"
slug: "kilo-speed-cloud-agents-infrastructure-sprint"
hashtags: "#substack #ai #cloud #devops #productivity #architecture #generated #en"
---

## Inside Kilo Speed: How One Engineer Built Cloud Agents in a Week

**TLDR:** Florian Hines joined Kilo and shipped their Cloud Agent platform in a single focus week by using AI agents to onboard himself, working in parallel threads, and embracing a "no rage-quit" MVP philosophy that prioritizes functional over perfect.

**Summary:**

What if infrastructure projects did not require months of architectural review and committee meetings? This article profiles Florian Hines, a platform engineer at Kilo who built the foundation for their Cloud Agents—the sandbox environment powering features like App Builder and Slackbot—during his very first focus week at the company. The story is compelling, but let me be direct: it also glosses over some important considerations.

Florian came from Replicated, where he had already adopted an "agent-driven model" for feature proposals and bug triaging. His background is interesting because he describes himself as a power user rather than an AI expert. He did not care how the models worked internally—he just wanted them to execute tasks while he focused elsewhere. This pragmatic stance is refreshing in a field often dominated by technical deep-dives, but it also raises questions about debugging when things go wrong in that black box.

The onboarding approach is genuinely clever. Florian had Kilo itself generate research documents about its own codebase, then used his flight to Amsterdam as a study session. By the time he landed, he had enough context to start architecting rather than just learning how to run the build. This is a legitimate productivity multiplier, though the article conveniently does not mention what happens when AI-generated documentation contains errors or outdated information.

For the technical stack, Florian chose Cloudflare Sandbox SDK specifically because of their documentation quality. This is sound reasoning—when working with bleeding-edge tech that is not in LLM training data, you need to "teach the agent" by providing code alongside your work. The dual learning process he describes, where both human and agent are figuring out new APIs together, is an honest portrayal of current AI limitations that many promotional pieces avoid.

The three strategies for high-velocity delivery deserve scrutiny. First, the "no rage-quit MVP" philosophy means shipping something functional enough that users want more, even if it is janky. Fair enough—the first Cloud Agent version lacked session persistence and was "one and done" only. Second, the "real-life jump cuts" approach involves firing off tasks to agents and returning hours later. This parallelization is powerful but the article does not discuss the cognitive cost of context-switching or how often those background tasks come back with unusable results. Third, choosing the right medium—using CLI and separate browser tabs for planning, keeping the IDE for implementation—is a thoughtful attention management technique.

The tooling section mentions custom modes like TypeScript Reviewer and Code Simplifier, plus a "deviations log" that tracks where agents went off-script from the original plan. This is actually the most valuable insight: acknowledging that agents deviate and building systems to capture those deviations. He also uses Repomix to distill external repositories into single documents for agent consumption—practical advice for anyone working across microservices.

**Key takeaways:**

- Use AI agents to generate onboarding documentation about unfamiliar codebases, but verify the output
- Choose tech stacks with excellent documentation when working on AI-assisted projects—agents need teachable references
- Define "done" as "users want more" rather than "everything works perfectly"
- Build deviation logs to track where agents went off-script from plans—this saves review time
- Use different interfaces (CLI vs IDE) to manage cognitive load during planning versus implementation phases
- Tools like Repomix can help give agents context on dependencies in separate repositories

**Tradeoffs:**

The article presents Kilo Speed as pure upside, but there are unspoken tradeoffs. What about technical debt accumulated by shipping in a week? How do you debug a system built partly by AI when neither you nor the agent fully understands every decision made? The "amplified engineer" model assumes agents produce quality output consistently—what happens when they do not? The piece also does not address team dynamics: does everyone need to adopt this parallel, fragmented workflow, or can some engineers still work linearly? These are the questions the author avoids, perhaps because they complicate the narrative of AI-augmented velocity.

**Link:** [Inside Kilo Speed: How One Engineer Built Cloud Agents in a Week](https://blog.kilo.ai/p/inside-kilo-speed-how-one-engineer-dcb)