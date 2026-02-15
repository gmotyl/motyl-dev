---
title: "Kent Beck's Genie Session: Exploring Codex for Mac and GPUSortedMap"
excerpt: "Kent Beck demonstrates AI-assisted coding with Codex for Mac while working on GPUSortedMap in a live genie session."
publishedAt: "2026-02-13"
slug: "kent-beck-genie-session-codex-mac-gpusortedmap"
hashtags: "#ai #codex #software-design #architecture #coding-assistants #llm #kent-beck #tidy-first #gpu #data-structures #substack #generated #en"
---

## Genie Session: Codex for Mac/GPUSortedMap

**TLDR:** Kent Beck hosted a live 48-minute video session exploring OpenAI's Codex for Mac while working on a GPUSortedMap implementation. This is a hands-on "genie session" where Beck works with an AI coding assistant in real-time, demonstrating the practical workflow of pairing with AI tools on a non-trivial data structure problem.

**Summary:**

Kent Beck, the creator of Extreme Programming and Test-Driven Development, continues his series of "genie sessions" -- live coding sessions where he works alongside AI assistants to tackle real engineering problems. In this installment, he turns his attention to Codex for Mac, OpenAI's desktop coding assistant, and applies it to GPUSortedMap, a data structure that leverages GPU acceleration for sorted map operations.

The concept of a "genie session" is itself worth unpacking. Beck treats AI coding tools not as autonomous agents but as genies -- powerful assistants that require careful prompting and direction. This framing matters because it positions the developer as the one maintaining architectural intent and design direction, while the AI handles the mechanical aspects of code generation. It is an important distinction that many in the AI-assisted coding space gloss over. The developer who abdicates design thinking to the AI is not pairing -- they are delegating without oversight.

What is conspicuously absent from this newsletter is the actual substance of the session. This was distributed as a video-only post, which means the deep technical insights about GPUSortedMap implementation, the specific interactions with Codex for Mac, and any friction points Beck encountered are locked behind a 48-minute video. For a community that values written, searchable, skimmable knowledge -- this is a missed opportunity. Video content is fantastic for demonstration but terrible for reference. If you hit a specific issue with Codex six months from now, good luck finding the relevant 30-second segment in a 48-minute recording.

The GPUSortedMap angle is intriguing and underexplored in the newsletter itself. GPU-accelerated data structures represent a fascinating intersection of hardware awareness and software design. The question Beck is likely wrestling with -- and that the audience should be thinking about -- is whether AI coding assistants can effectively help with code that requires deep understanding of hardware execution models, memory hierarchies, and parallel computation patterns. This is a much harder test case than the typical "build me a CRUD endpoint" demo.

One thing Beck is not directly addressing in this format: the reproducibility and shareability of AI-assisted coding sessions. When you pair with a human, both developers walk away with shared context. When you pair with an AI, the session is ephemeral unless deliberately captured. The video format partially solves this, but it raises questions about how teams should document and share the design decisions made during AI-assisted development.

**Key takeaways:**

- Kent Beck's "genie sessions" frame AI coding tools as assistants requiring human design direction, not autonomous replacements
- GPUSortedMap represents a meaningfully harder test case for AI coding assistants than typical web development tasks
- Video-only technical content creates discoverability and reference problems that the community has not solved well
- The intersection of GPU-accelerated data structures and AI-assisted development is an underexplored area worth watching
- Codex for Mac is being tested against non-trivial systems programming challenges, which tells us more about its capabilities than typical demos

**Link:** [Genie Session: Codex for Mac/GPUSortedMap](https://tidyfirst.substack.com/p/genie-session-codex-for-macgpusortedmap)