---
title: "Building OpenCode: AI Coding Tools, Open Source Strategy, and the Reality of Engineering with AI"
excerpt: "Dax Raad, co-founder of OpenCode, shares candid thoughts on AI coding tools, open source positioning, tech debt, and why engineering is still as hard as ever."
publishedAt: "2026-05-28"
slug: "building-opencode-dax-raad-ai-coding-tools"
hashtags: "#pragmaticengineer #engineering #architecture #career #teams #leadership #generated #en"
source_pattern: "Pragmatic engineer"
---

## Building OpenCode with Dax Raad

**TLDR:** Dax Raad, co-founder of OpenCode, discusses how his AI coding tool went from 650,000 to nearly 8 million monthly active users in just a few months, why open source positioning mattered more than raw execution speed, and why he remains genuinely skeptical about confident AI predictions even while building one of the most popular AI coding harnesses around.

**Summary:** There is something refreshing about talking to someone who is building an AI product and still maintains a healthy dose of skepticism about what AI actually changes. Dax Raad is that person. OpenCode grew at a pace that looks absurd in retrospect: months, not years, to go from a niche terminal tool to one of the most-used AI coding harnesses on the market. And yet Dax's honest answer to the question "has AI made your job easier?" is something like "yes, but I still feel like I'm thinking just as hard as I ever did."

His framing for that is worth sitting with. Pre-AI, he estimates he spent roughly 95% of his energy on thinking and 5% on doing. Now it's maybe 96% thinking and 4% doing. A 20% improvement in execution, mathematically. But day to day it feels identical, because the thinking part is still the hard part. This is not a criticism of AI tools. It is an observation that the hardest part of engineering, figuring out what to build and why, does not get automated away.

OpenCode's growth story is also not primarily a technical story. The team noticed something obvious that others had apparently overlooked: every major developer tool is open source. Vim, VS Code, Git, Linux, the list goes on. And yet no AI coding agent had planted a flag in the open source category. Dax and his team focused on that positioning, and as he puts it, "get positioning right and the world just keeps handing you wins you didn't expect." That said, the early product was not perfect. OpenCode's harness was, by Dax's own admission, merely good enough for the first five months. Once they had market share, they went back and made it good. That sequence, position first then optimize, is worth remembering.

One of the sharpest observations from the conversation is about what happens to engineering culture when AI makes shipping features cheap and fast. Dax describes a pattern where some engineers just pump out AI-generated code without thinking critically about quality, while motivated engineers who care about craftsmanship end up drowning in slop PRs and mounting tech debt. He frames this as an engineering leadership problem. Most leadership doesn't notice it because the output numbers look fine. But the people who care are burning out, and the codebase is degrading in ways that don't show up on a velocity dashboard.

The flip side of that concern is Dax's surprisingly optimistic take on refactoring. AI makes dealing with tech debt cheaper than it has ever been. Asking an agent to apply a new pattern across an entire codebase, something that would have taken weeks before, can now happen in hours. His point is that teams should be doing far more refactoring than they currently are, and the excuse of "it takes too long" no longer holds. He also makes an interesting observation about older enterprise patterns, domain-driven design, verbose design patterns, and strict separation of concerns, coming back into fashion. These patterns fell out of favor partly because they were tedious to write by hand. But they work well when you have junior developers, or when you have agents that need clear guardrails and strong structure to work within.

**Key takeaways:**
- Open source positioning was the real growth driver for OpenCode, not technical superiority or faster execution
- AI has not changed the thinking-to-doing ratio in any meaningful way for experienced engineers, the hard work is still the thinking
- Motivated engineers who care about quality are at risk of burning out when teammates use AI to generate large volumes of low-quality code
- Tech debt cleanup has never been cheaper, and teams should be doing far more of it
- Confident predictions about AI often tell you more about the person making them than about the future
- Old-school enterprise patterns like domain-driven design are gaining relevance again now that agents need structured, explicit codebases to work effectively

**Why do I care:** This conversation hits close to home because it names something I have been noticing but struggling to articulate. AI tools are genuinely useful, but they have not reduced the cognitive load of building good software. What they have done is make it very easy to generate a lot of code fast, which turns out to be a double-edged thing. The teams that win with AI will be the ones that stay disciplined about what they build and invest in code quality even when speed is technically an option. The framing of "motivated engineers drowning in slop PRs" is not abstract to me. It is a real risk at any company that measures output by feature count rather than by code health. Dax's point about refactoring being cheap now is the practical antidote, and it deserves more attention than it usually gets.

**Link:** [Building OpenCode with Dax Raad](https://newsletter.pragmaticengineer.com/p/opencode?publication_id=458709&post_id=199350843&play_audio=true&triedRedirect=true)
