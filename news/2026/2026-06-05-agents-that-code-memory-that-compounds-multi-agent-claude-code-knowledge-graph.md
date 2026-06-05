---
title: "Agents That Code and Memory That Compounds: Multi-Agent Claude Code and Knowledge Graph Memory Patterns"
excerpt: "A six-agent Claude Code setup that runs full feature lifecycles, plus knowledge graph memory patterns using Neo4j that actually scale without collapsing under their own weight."
publishedAt: "2026-06-04"
slug: "agents-that-code-memory-that-compounds-multi-agent-claude-code-knowledge-graph"
hashtags: "#decodingai #ai #agents #knowledgegraph #neo4j #claudecode #multiagent #memoryarchitecture #generated #en"
source_pattern: "Decoding AI"
---

## From Vibe Coding to a Real Engineering Team

**TLDR:** Paul Iusztin deleted a vibe-coded project and rebuilt it using a structured six-agent Claude Code team, then open-sourced the result. The setup separates code writing from code evaluation across different agents, which is the design principle that makes it actually work.

**Summary:** I have to admit, when I first heard "vibe coding," I wanted to like it. The idea that you could just describe what you want and have AI produce working software is genuinely appealing. But this piece makes a sharp observation: vibe coding at scale is just technical debt with extra steps. Paul rebuilt his project from scratch with a six-agent team, and the architecture is worth understanding in detail.

The six agents are a product manager, an engineer, a tester, a PR reviewer, an on-call agent, and a gated self-improvement agent. Each one has a distinct role and, more importantly, distinct authority. The PM specifies the feature. The engineer writes the code. The tester decides if it's correct. The PR reviewer decides if it merges. No single agent wears two hats. That design decision sounds obvious once you hear it, but it's actually the whole game.

The slash command called "/night" is what ties this together. It runs the full lifecycle from feature specification through a merged PR with green CI. That's the loop you'd expect from a real engineering process, not just "generate some code and hope." The self-improve agent is gated, which I appreciate. Ungated self-modification in an agent loop is the kind of thing that sounds cool until it isn't.

What I find worth challenging here is the assumption that more agents equals better separation of concerns. There's a real coordination overhead when you have six specialized agents. The article doesn't address what happens when agents disagree or when the PM spec is ambiguous. Still, the core insight, separating authorship from evaluation, is solid and something humans figured out decades ago through code review culture. The agents are just applying the same principle.

**Key takeaways:**
- Six-agent architecture assigns distinct roles: PM, engineer, tester, PR reviewer, on-call, and a gated self-improve agent
- The defining rule is that no single agent both writes the code and decides if it is correct
- The "/night" skill automates the full feature lifecycle from spec to merged PR with passing CI
- The project is open-sourced, so you can actually study and adapt the implementation

**Why do I care:** As someone who thinks deeply about developer tooling, this is the most concrete multi-agent coding setup I've seen documented. The separation between writing and evaluation is not a novelty, it's how mature engineering teams already work. The interesting question for architects is: when you build systems with these agent teams, what does your observability story look like? Who debugs the PM agent when it writes bad specs? That's the missing chapter, and it's the one that will determine whether this pattern survives contact with production.

**Link:** [From Vibe Coding to a Real Engineering Team](https://substack.com/redirect/2ae37c58-2fa0-4f45-8a5b-2680386e0007?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

---

## Inside Neo4j's Agent Memory

**TLDR:** Neo4j's agent-memory library implements a three-tier memory model with a structured ontology that gives agents something more durable and navigable than vector indexes or file systems. The POLE+O ontology and a SAME_AS deduplication pattern are the parts that make it actually useful.

**Summary:** The framing at the top of this piece is blunt and correct: file systems rot, vector indexes have no identity. If you've worked with retrieval-augmented systems for more than a few months, you've felt both of those problems. Files accumulate without any schema enforcing relationships. Vectors can find you semantically similar content, but they have no concept of whether two records refer to the same entity. This is where graphs earn their keep.

The neo4j-labs/agent-memory library organizes memory into three tiers: short-term, long-term, and reasoning. Short-term is what the agent is working with right now. Long-term is structured knowledge that persists across sessions. Reasoning is where inferences and derived facts live. This tiering isn't arbitrary, it maps to how humans actually think about context versus knowledge versus conclusions.

The POLE+O ontology deserves attention. POLE stands for Person, Object, Location, Event. The O is for Organization. This is borrowed from law enforcement intelligence analysis, where it proved effective for mapping complex relationship networks with sparse data. Using it for agent memory is a genuinely smart move because it gives you a minimal but extensible base that covers most real-world scenarios without forcing you to model everything up front.

The SAME_AS pattern is where I get genuinely interested. Deduplication in knowledge graphs is a notoriously hard problem. Two records might refer to the same person but have slightly different names, different identifiers, different relationships. SAME_AS lets you assert identity without merging, which means you preserve provenance and can resolve conflicts later. That's a much more honest approach than silently collapsing records and pretending the ambiguity never existed.

**Key takeaways:**
- Three-tier memory architecture separates short-term context, long-term structured knowledge, and reasoning/inference layers
- The POLE+O ontology (Person, Object, Location, Event, Organization) provides a minimal base that handles most real-world entity types
- SAME_AS relationships allow identity assertions without destructive merging, preserving data provenance
- This is presented as the clearest blueprint available for memory that grows more useful over time rather than degrading

**Why do I care:** Graph-based memory is the piece of agent infrastructure that most teams are getting wrong right now. Everyone reaches for vector databases because they're familiar, but you end up with a pile of embeddings and no way to ask "who worked with whom last quarter?" That's a traversal query, not a similarity search. For architects building agent systems that need to reason about relationships over time, this library is worth studying seriously. The ontology design choices here will ripple through your entire data model.

**Link:** [Inside Neo4j's Agent Memory](https://substack.com/redirect/901c8ead-7df4-43cf-acfd-e719af0b9307?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

---

## Stop Chasing the Perfect Ontology

**TLDR:** Most knowledge graph projects stall because teams try to model the entire domain before writing a single node. The practical fix is to start with POLE+O as a fixed base, extend with Preferences and Facts, and evolve through data exploration rather than committee design.

**Summary:** This is the article I want to hand to every enterprise architect who's been stuck in ontology meetings for three months. There's a psychological trap in knowledge graph design: the belief that you need a complete, correct model before you can do anything useful. This trap kills more projects than bad technology choices.

The proposed approach is to treat POLE+O as a stable foundation and then add two flexible extension points: Preferences and Facts. Preferences capture what agents learn about user behavior and goals. Facts capture domain-specific assertions that don't fit neatly into the base ontology. Both are first-class citizens in the graph but don't require you to redesign the schema every time the domain evolves.

The data-exploration loop is the practical part. You start collecting data with the minimal ontology, analyze what you've got, identify patterns that need richer representation, and add subtypes incrementally. This is how good data models actually evolve in production. The alternative, the frozen spec written by a committee, ages badly. Business requirements change. New entity types emerge. A rigid ontology becomes a liability.

I'd push back gently on one implicit assumption here: "ship in five minutes" is compelling marketing but it understates the discipline required to keep a graph clean as it grows. The five-minute ontology is easy. The ongoing governance is the hard part. Still, the principle is correct. Bias toward shipping a simple model over specifying a perfect one.

**Key takeaways:**
- POLE+O (Person, Object, Location, Event, Organization) provides the stable core that handles most agent memory needs out of the box
- Preferences and Facts serve as flexible extension buckets for domain-specific knowledge without requiring schema redesign
- Growing subtypes through a data-exploration loop prevents the frozen-spec problem that kills most knowledge graph projects
- The ontology should be treated as a living artifact that evolves with actual data, not a finished design document

**Why do I care:** For frontend architects building AI-powered features, the ontology question comes up the moment you need your agent to remember anything structured. The temptation is to hire a data architect and spend weeks modeling. What this article is telling you is: don't. Ship the minimal graph, observe what data actually flows through it, and evolve. That's good engineering advice regardless of whether graphs are involved.

**Link:** [Stop Chasing the Perfect Ontology](https://substack.com/redirect/c1e79ed3-6d5f-470f-b86f-d93335a9eea6?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)

---

## How to Keep Your Knowledge Graph Clean

**TLDR:** Knowledge graphs degrade when naming and identity resolution are treated as the same problem. Separating them, resolution for names and deduplication for identity, plus an overnight cleanup pipeline, keeps the graph accurate as data accumulates.

**Summary:** Graph rot is real and it's underappreciated. You build a clean knowledge graph, start feeding it data from multiple sources, and within a few months you have multiple nodes for the same person with slightly different names, partial duplicates from different ingestion pipelines, and relationships that point to dead records. The graph becomes less useful the more data you add. That's the failure mode this piece addresses.

The core distinction is between resolution and deduplication. Resolution is the problem of mapping a name or identifier to the correct node. If the same person appears as "J. Smith," "John Smith," and "John A. Smith" across different sources, resolution decides which canonical node they all refer to. Deduplication is the deeper problem: deciding whether two nodes that exist separately actually represent the same real-world entity. These are different operations that require different logic, and conflating them is where most implementations go wrong.

The "dream pipeline" runs overnight and catches what real-time ingestion misses. Some duplicates only become apparent when you look at the full graph, when you see that two nodes have identical relationship patterns, overlapping properties, and no meaningful distinguishing features. Overnight batch processing with graph-native queries can surface these patterns in a way that single-record ingestion cannot.

This matters more as graphs grow. A small graph with a few hundred nodes can be cleaned manually. A graph with millions of nodes and thousands of new records per day needs systematic hygiene built into the architecture from the start. The article is making the case for building that hygiene in early, before the rot sets in.

**Key takeaways:**
- Naming resolution and identity deduplication must be treated as separate operations with separate logic
- Resolution maps variant names to canonical nodes; deduplication determines whether two nodes represent the same real entity
- An overnight batch pipeline catches duplicates that real-time ingestion misses by analyzing full graph patterns
- Graph hygiene should be an architectural concern from day one, not a cleanup task added later

**Why do I care:** If you're building agent systems that accumulate knowledge over time, data quality in the graph is what determines whether the agent gets smarter or just noisier. A dirty graph produces confident-sounding but wrong answers. For architects, this means graph hygiene needs to be in your infrastructure from the start, not retrofitted when users start complaining that the agent is confusing two customers named "Sarah Johnson." That conversation is not fun to have.

**Link:** [How to Keep Your Knowledge Graph Clean](https://substack.com/redirect/74e48f52-0690-42a6-bb50-6705c2ddba3b?j=eyJ1IjoidGIyeHgifQ.cAeV0Wf58qGhizTnFG9XUT1f_ZzTflR8ugMcaWDmXpc)
