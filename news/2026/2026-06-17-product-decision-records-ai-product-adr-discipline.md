---
title: "Product Decision Records: Bringing ADR Discipline to AI-Assisted Product Work"
excerpt: "If ADRs transformed how AI agents maintain technical consistency, a similar approach to product decisions could finally bring AI-assisted specs up to the quality level teams actually need."
publishedAt: "2026-06-17"
slug: "product-decision-records-ai-product-adr-discipline"
hashtags: "#refactoring #ai #product #adr #specs #agentworkflows #generated #en"
source_pattern: "🌀 Refactoring"
---

## How to Make AI Better at Product

**TLDR:** Luca argues that product work is structurally harder for AI than coding because it lacks deterministic correctness signals, and proposes Product Decision Records (PDRs) and a shared Glossary as the product-layer equivalent of ADRs, which have already proven effective at maintaining consistency in AI-assisted codebases.

**Summary:** The framing here starts from a provocative premise: product is harder than coding, at least from an AI assistance standpoint. Coding is downstream of product direction, has a narrower design space, and its outputs can be tested for correctness in ways that product decisions simply cannot. Static analysis, test-driven development, code health tooling — these work as gates for coding agents even with relatively little context about the product being built. There is no equivalent of a compiler that tells you whether a UX decision is right. That structural asymmetry explains why, in a survey across product teams, only 9% used AI to help write product specs while over 90% used it for coding. The 60% rework rate on AI-generated specs is what keeps PMs writing everything by hand.

The ADR analogy is the essay's central contribution. Luca runs Tolaria, a note-taking application he builds in the open, and has accumulated 137 Architecture Decision Records that the AI refers to constantly during development. ADRs record not just what was decided but what alternatives were weighed and why they were discarded. The AI uses them to make decisions consistent with past choices without requiring the author to re-explain the reasoning every time. The insight is that ADRs work entirely through example rather than rules, which is exactly what makes them applicable to product decisions that resist codification into hard rules. A Product Decision Record, modeled on the same structure, would capture intent, design choice, and tradeoffs. Anything genuinely new added to the product gets a PDR; re-applications of established patterns do not.

The Glossary concept, proposed by Doug Peete from Atono, sits alongside PDRs as the product-layer equivalent of an ARCHITECTURE.md file. Where PDRs record discrete decisions, the Glossary maps the living vocabulary of the product: what the Sidebar is for, how the Breadcrumb Bar relates to the Note organization workflow, what the Git integration means in this specific application. This is domain language, and it differs from a list of features. It evolves as the product evolves. The argument is that AI-generated specs fail largely because the model has no grounding in your specific product's vocabulary and past choices. Glossary-backed specs in Atono's testing reduced rework from 60% to 20%. That is a significant result, though it deserves the caveat that Atono has a commercial interest in this framing.

The proposed workflow is deliberately human-led on intent and progressively more AI-assisted on execution. A human defines what the user needs to accomplish and why. The AI drafts specs grounded in the Glossary and existing PDRs. The human reviews, possibly allows a prototype before committing to the spec, and iterates on implementation. New PDRs and Glossary entries get written as the product evolves. The thing the author is somewhat underplaying is the bootstrap problem: building a Glossary and a useful set of PDRs from scratch is real work, and teams who already struggle with spec quality may lack the discipline to maintain these artifacts consistently over time. The ADR success story is partly a story about one unusually disciplined builder. Whether it scales to a team of ten PMs with different writing habits is an open question this essay does not fully answer.

**Key takeaways:**
- Product work resists AI assistance because it lacks deterministic correctness signals; ADRs offer a model for injecting judgment through examples rather than rules.
- Product Decision Records should capture intent, design choice, and discarded alternatives, mirroring the structure that makes ADRs effective.
- A Glossary mapping product abstractions and domain vocabulary grounds AI-generated specs in the specific product rather than generic patterns.
- Atono's testing shows Glossary-backed specs reduce rework from 60% to 20%, though vendor interest in this framing warrants some skepticism.
- The proposed workflow keeps human ownership of intent while progressively delegating spec drafting and implementation to AI.

**Why do I care:** I've been thinking about the ADR-to-product analogy for a while, and this essay articulates the gap more cleanly than anything I've read. What I find most useful is the distinction between the Glossary and PDRs: one is a living map of what things mean, the other is a record of decisions made. Both serve different purposes for an AI agent trying to make consistent product choices. The thing I'm less sure about is whether this scales to teams rather than individual builders. Luca has deep context on Tolaria because he built every part of it. A shared Glossary only works if the whole team agrees on the vocabulary and keeps it current. That's a coordination problem that the essay doesn't fully solve, and it's exactly the kind of thing that collapses under pressure. Worth trying, but I'd treat the 60% to 20% rework reduction as a ceiling you'd see in ideal conditions, not a floor.

**Link:** [How to make AI better at product](https://refactoring.fm/p/how-to-make-ai-better-at-product?publication_id=64099&post_id=202099950&play_audio=true&triedRedirect=true)
