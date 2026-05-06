---
title: "Turning 1,000 Podcast Clips Into a Living Knowledge Base with Claude Code"
excerpt: "Wyndo is hosting a live session on May 6 showing how to transform a large library of podcast clips into a searchable, evolving knowledge base using Claude Code."
publishedAt: "2026-05-06"
slug: "podcast-clips-knowledge-base-claude-code-wyndo-live"
hashtags: "#aimaker #ai #agents #llm #nodejs #architecture #generated #en"
source_pattern: "AI Maker"
---

## Wyndo Live: How to Turn 1,000 Podcast Clips Into a Living Knowledge Base with Claude Code

**TLDR:** Wyndo is going live on May 6, 2026 at 4:00 PM GMT+2 to walk through building a knowledge base from a large collection of podcast clips using Claude Code. This is a hands-on session focused on practical implementation, not theory.

**Summary:** I find this kind of session more interesting than it might first appear, and here is why. The title sounds like a simple search or transcription project. Dump your clips in, transcribe them, search the text. Done. But the word "living" in the title is the part worth paying attention to. A static index of transcripts is easy enough to build today with any number of tools. A knowledge base that stays current as you add more clips, surfaces connections across episodes, and can be queried in meaningful ways is a different problem. That is the harder problem, and it is exactly the kind of thing where Claude Code, running as an agent with file system access and the ability to write and modify its own outputs, has a genuine advantage over a simple chat prompt.

Think about what this actually involves. You have a thousand clips. Each one has context: who was speaking, when it was recorded, what topic it belongs to, whether it was a follow-up to something said in a different episode. Transcription alone gets you text. Getting from raw text to something you can actually query for insight, something that knows "this clip from March connects to that argument made in November," requires a layer of organization that has to be designed and maintained. Claude Code can write the scaffolding, process batches of files, generate structured metadata, maintain indexes, and then update those indexes as new content arrives. That is the workflow worth watching demonstrated in real time.

What I would be watching for in this session is specifically how they handle the "living" part. Anyone can batch-process a static corpus. The interesting question is what happens when clip number 1,001 arrives. Does the agent know how to integrate it without reprocessing everything from scratch? Does the knowledge base maintain relationships between clips intelligently? Those are the architectural decisions that determine whether this is a clever demo or something you would actually maintain over months. Wyndo's approach of doing this live with Claude Code, rather than showing a finished product, is the right format for this kind of technically dense topic.

The One Shot Show format of live building sessions has been consistent through this season. Episode 9 continuing that pattern with a knowledge management problem feels well-timed given how much attention is being paid to retrieval-augmented generation and memory systems in the broader AI tooling conversation right now.

**Key takeaways:**
- The session is live on May 6, 2026 at 4:00 PM GMT+2 via Substack
- The focus is on transforming a large, static collection of podcast clips into a dynamic, searchable knowledge base using Claude Code
- The meaningful challenge is maintaining and updating the knowledge base as new content arrives, not just the initial processing pass
- This follows the One Shot Show format of live building sessions that have covered agents, workflows, and AI tooling throughout season one

**Why do I care:** Knowledge management from unstructured media is a real problem I run into regularly. Podcast content especially tends to age poorly as a format because episodes are hard to search and cross-reference. A system that can extract structured knowledge from audio, maintain relationships across a large clip library, and stay queryable over time would be genuinely useful. I am curious to see how Claude Code handles the operational side of this, specifically the incremental update problem and how the agent is prompted to maintain consistency in its indexing decisions across runs.

**Link:** [Wyndo Live: How to Turn 1,000 Podcast Clips Into a Living Knowledge Base with Claude Code](https://open.substack.com/live-stream/189945)
