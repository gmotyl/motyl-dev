---
title: "Portent: A Convention-Over-Configuration Spec for Organizing Knowledge Bases"
excerpt: "Luca Rossi introduces Portent, an open spec for structuring knowledge bases around eight types, two relationships, and a three-stage lifecycle — built as the opinionated defaults layer for his Tolaria tool."
publishedAt: "2026-05-20"
slug: "portent-knowledge-base-spec-tolaria"
hashtags: "#architecture #productivity #dx #workflow #management #ai #agents #generated #en"
source_pattern: "🌀 Refactoring"
---

## Introducing Portent

**TLDR:** Portent is an open specification for organizing knowledge bases, built around eight named types, two relationship styles, and a capture-organize-archive lifecycle. Luca Rossi designed it as "Rails for knowledge bases" — strong defaults you can override rather than a rigid schema you're locked into.

**Summary:** Luca Rossi spent a month after releasing Tolaria talking to users, and the recurring question wasn't about the tool's features. It was about how to actually organize the information. People understood types and relationships as concepts but didn't know which types to create, how to connect them, or what the ongoing maintenance rhythm should look like. Portent is the answer to those questions: a named, documented convention that provides sane defaults while staying customizable.

The eight types spell out the name: Projects, Operations, Responsibilities, Tasks, Events, Notes, Topics, People — PORTENTP if you count the P at the end, which Rossi cheerfully acknowledges is awkward. The structure beneath the names is what matters. The first four types — PORT — are actionable. The remaining four — ENTP — are not. Actionable work gets further organized along two axes: whether it can be completed in one sitting, and whether it recurs. That gives you four clear categories. Responsibilities are recurring and can't be done in one sitting — think "maintain good product retention." Projects are one-and-done and multi-session — a specific feature with a clear definition of done. Operations are recurring procedures that fit in a single session, the kind of thing you'd write instructions for because it always happens the same way. Tasks are one-and-done, single-session work, and Rossi is openly skeptical of storing them in the knowledge base at all, preferring dedicated task tools for their specialized interaction needs like due dates and kanban boards.

The relationship layer is deliberately minimal. Portent recommends two: "belongs to" for strong ownership and composition relationships, and "related to" for loose many-to-many connections. Rossi's argument for this minimalism draws on where both relational databases and folder hierarchies fall short. Relational schemas require you to define relationships between every table pair, creating redundancy and rigidity. Folder hierarchies can only express exclusive ownership — a meeting note can live in the meeting notes folder or the project folder, not both. A graph-style approach with two reusable relationship types sidesteps both problems. And his specific claim is that AI changes the calculus: once agents can organize and traverse information, the consistency enforcement and folder traversal advantages of relational and hierarchical models matter much less. Less semantic surface means easier reasoning for both humans and AI. That's the actual argument, and it's worth engaging with seriously because it's not a given — AI agents do better with consistent schemas in many cases, and "the AI will figure it out" has a way of not surviving contact with production.

The lifecycle piece is practical and underrated. Capture means getting information in quickly without worrying about cleanliness. Organize means asking two questions: what is this, and what should I do with it. If you can't attach a note to any Project, Responsibility, Operation, or Topic, that's a signal it should be deleted. Archive means separating current from obsolete information so old projects and past meeting notes don't surface in everyday usage. Rossi organizes his captured notes weekly, and Tolaria implements this directly with an Inbox section showing unorganized notes and a keyboard shortcut to mark them as organized.

What Portent is really arguing for is that the right layer of abstraction for a personal knowledge base sits between the rigidity of a relational schema and the chaos of an unstructured folder tree. The eight types are just enough specificity to create useful filters and connections without forcing you to decide upfront whether a thing is a "deliverable" or an "initiative" or a "workstream." The extensibility section acknowledges that calendar types, team areas, and note subtypes are common additions, and Rossi recommends using tag properties for note type variations rather than creating new root types — which is the kind of opinionated-but-not-dogmatic design advice that makes specifications actually usable.

**Key takeaways:**
- Portent's eight types split into PORT (actionable) and ENTP (non-actionable), with actionable work organized by size and recurrence
- Two relationship types — "belongs to" and "related to" — replace complex schema definitions with a graph-style model that works consistently across all types
- The capture-organize-archive lifecycle addresses the common knowledge base failure mode of everything becoming stale and unmaintained
- Portent is tool-agnostic but has first-class support in Tolaria via templates, inbox sections, and keyboard shortcuts

**Why do I care:** The "Rails for knowledge bases" framing is doing a lot of work here, and whether you buy it depends on whether you've felt the pain it's solving. If you've built elaborate Notion setups or Obsidian vaults that eventually collapsed under their own complexity, the convention-over-configuration angle has real appeal. The AI angle is the part I'd pressure-test: claiming that graph relationships are superior specifically because agents can handle inconsistency might be optimistic. Agents tend to do better with predictable structure, not worse. But the core type system and lifecycle are well-reasoned and independent of that claim, and a week of trying Portent's defaults costs nothing.

**Link:** [Introducing Portent](https://refactoring.fm/p/introducing-portent?publication_id=64099&post_id=198376374&isFreemail=true&triedRedirect=true)
