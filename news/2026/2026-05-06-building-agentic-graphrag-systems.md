---
title: "Building Agentic GraphRAG Systems: Ontology-First Design for Agent Memory"
excerpt: "A deep technical guide to building GraphRAG systems using ontology-first design, property graphs, append-only data models, and hybrid RRF retrieval, exposing unified agent memory via MCP."
publishedAt: "2026-05-05"
slug: "building-agentic-graphrag-systems"
hashtags: "#ai #ml #generated #en #graphrag #knowledgegraph #rag #agents #mcp"
source_pattern: "Decoding AI"
---

## GraphRAG Is a Data Modeling Problem, Not a Retrieval Algorithm

**TLDR:** GraphRAG's real complexity lies in defining a proper ontology before touching any retrieval logic. Without schema discipline, LLM-extracted entities become unusable noise fast. This article walks through a production-grade architecture for agentic GraphRAG that connects to agents via an MCP server.

**Summary:** I gave this talk twice in one month, and after fielding the same questions from engineers at O'Reilly's Context Engineering Event and a Maven LLM inference course, the answer crystallized: everyone wants GraphRAG, but almost nobody knows where to start. The instinct is to reach for frameworks and let the LLM figure out the schema. That instinct is wrong.

There are three reasons you reach for GraphRAG over plain RAG. First, context rot: as the context window fills, signal-to-noise collapses and the model degrades in quality, speed, and cost. Second, data fragmentation: in the agent era, your data lives across documents, emails, notes, and messages, none of it conveniently in one database. Third, agent memory maps naturally to a knowledge graph, because people have preferences, experiences, locations, and relationships that evolve over time. Tracking that "Arthur told Felix his favorite coffee shop moved from Timisoara to Lisbon two months later" is a graph problem, not a vector search problem.

The lesson about ontology-first design came the hard way through LangChain's MongoDBGraphStore, which lets the LLM freely invent entity and relationship types. Five documents produced 17 node types and 34 relationship types, including "part_of", "Part Of", and "part of" as three separate concepts. A constrained ontology fixes this by letting the LLM only extract what you defined, and as a bonus, it means you can swap expensive frontier models for smaller fine-tuned extractors like Gemini Flash Lite or Claude Haiku on your specific schema.

The architecture described here builds a digital twin with two sub-ontologies: a Document Ontology (DOCUMENT, CHUNK nodes with PART_OF, NEXT, REFERENCED, MENTIONS edges) built deterministically without an LLM, and a Person Ontology (PERSON, TASK, EPISODE, PREFERENCE nodes with RELATED_TO, TODO, EXPERIENCED, HAS edges) extracted by an LLM constrained to that schema. Every part of the system depends on this schema decision being made upfront. Skip it and the rest is noise.

**Key takeaways:**
- GraphRAG is fundamentally a data modeling and schema design problem, not a retrieval algorithm choice
- Unconstrained LLM entity extraction degrades rapidly at scale, ontologies keep it manageable
- A constrained schema allows using smaller, cheaper extractor models instead of frontier models
- Agent memory maps naturally to a knowledge graph, particularly for personal assistants tracking preferences and temporal context

**Why do I care:** As a frontend architect building on top of AI systems, the memory layer is increasingly the bottleneck. The pattern of exposing a GraphRAG engine as an MCP server is directly relevant to how Claude Code and similar harnesses will evolve beyond filesystem-based memory. Understanding the trade-offs in ontology design upstream shapes everything downstream, including how reliably an agent retrieves context and how much you pay per query.

**Link:** [Building Agentic GraphRAG Systems](https://www.decodingai.com/p/agentic-graphrag)

---

## RDF vs. Property Graphs, and the Three Extraction Modes

**TLDR:** Property graphs beat RDF for GraphRAG and agent use cases. Extraction falls into three modes: structured (schema-guided LLM), semi-structured (metadata parsing), and unstructured (free-form LLM, useful only for schema discovery). Mixing them up introduces noise at production scale.

**Summary:** Every knowledge graph is a collection of (entity, relationship, entity) triplets, but there are two ways to attach metadata. RDF attaches each piece of metadata as another triplet, causing the graph to explode in size. Property graphs attach metadata as JSON directly on the entity or relationship node. In practice, every GraphRAG and agent system you encounter uses property graphs. RDF is interesting in academic contexts but impractical for anything that needs to be queryable at speed.

The three extraction modes map to very different scenarios. Structured extraction is schema-guided: the LLM outputs entities according to your ontology, producing clean, constrained output. Semi-structured extraction uses lineage and metadata without any LLM at all. You already know what document each chunk comes from, who authored it, and which other documents it references, so parsing that mechanically is both cheaper and more reliable. Unstructured extraction, where the LLM invents its own labels, is only defensible during exploratory phases when you're figuring out what ontology even makes sense for your data. Tools like GLiNER (a zero-shot Named Entity Recognition model) work well for this discovery phase and can run locally without heavy inference hardware.

The important nuance here is that unstructured extraction is a design tool, not a production tool. Using it in production is exactly the mistake that produces the 17 node type problem described earlier. Once your ontology is defined, switch immediately to structured or semi-structured extraction. Exploratory extraction at scale is just deferred technical debt.

**Key takeaways:**
- Property graphs are the practical standard for GraphRAG; RDF creates size and query complexity without proportionate benefit
- Semi-structured extraction (metadata parsing, no LLM) is underused and more reliable than LLM extraction for document lineage
- Unstructured extraction is valid for schema discovery, dangerous in production
- Smaller fine-tuned models (Gemini Flash Lite, Claude Haiku) are sufficient for constrained-schema extraction

**Why do I care:** The extraction mode decision directly impacts both cost and reliability. Semi-structured extraction for document structure is a free optimization that most teams overlook because they default to "throw the LLM at it." On a frontend codebase context, think of this as static analysis versus runtime inference: you use static analysis where you can.

---

## Append-Only Log vs. Single Mutable Collection: Choosing Your Data Model

**TLDR:** The two core data modeling choices for a knowledge graph are an append-only log with a materialized view, or a single mutable collection. The append-only approach gives you versioning and temporal audit trails at the cost of RAM and operational complexity. The single mutable collection is the materialized view without the log.

**Summary:** This is the decision most GraphRAG tutorials skip entirely, and it matters more than which graph database you pick. The append-only log approach uses two collections: an immutable event log where every extraction event is appended, and a materialized view that periodically squashes all events for the same entity ID into one canonical record. You get versioning, temporality, and the ability to replay or revert extractions. You pay in RAM and operational overhead. RAM is still the most expensive piece of database hardware, so this cost compounds quickly.

The single mutable collection approach drops the log entirely. Each extraction directly upserts into the queryable collection. Simpler operations, real-time visibility, no temporal audit trail. The key insight is that the single mutable collection is simply the materialized view without the log underneath it. If you genuinely need to know what the system believed about a person at a specific point in time, or need to soft-delete and revert bad extractions, you need the full append-only model. If operational simplicity and cost matter more than time-travel, take the single collection.

In the digital twin implementation described here, MongoDB's graphLookup traverses source_node_id to target_node_id recursively without joining across collections, with nodes and edges sharing a single collection separated by a kind discriminator. Entity normalization is the most critical step: the system assigns canonical IDs using deterministic composite keys so the same person doesn't spawn multiple graph nodes across different extraction runs.

**Key takeaways:**
- The single mutable collection is equivalent to the materialized view layer of the append-only model
- Append-only provides time-travel, soft-delete, and extraction reversibility at real RAM cost
- Entity normalization (canonical ID reuse across extractions) is more important than the choice of graph database
- Postgres and MongoDB handle hundreds of millions of small records and scale horizontally through sharding on entity and relationship IDs

**Why do I care:** The normalization step is where GraphRAG implementations quietly break. Duplicate entities compound retrieval errors downstream in ways that are hard to debug because everything "looks correct" in the graph. This is the same class of problem as inconsistent state management in frontend apps, and it deserves the same level of design attention upfront.

---

## Hybrid Retrieval With RRF and Multi-Hop Graph Traversal

**TLDR:** GraphRAG retrieval is a two-stage process: first, merge text and semantic search results using Reciprocal Rank Fusion to find entry points, then walk 2-3 hops across typed edges to expand the result set. The graph traversal step is the actual differentiator from standard RAG.

**Summary:** The retrieval algorithm in GraphRAG has two stages, and it's worth being clear about what GraphRAG actually adds over vanilla RAG. Standard RAG already uses hybrid retrieval, typically combining exact keyword text search with semantic embedding search, then merging results. Reciprocal Rank Fusion is the standard merge function here: it re-ranks results from multiple retrieval methods without requiring score normalization across systems. The first stage of GraphRAG does exactly this, producing a set of entry-point entities in the graph.

The second stage is what distinguishes GraphRAG. After finding those entry points, the system walks 2-3 hops across typed edges. If the query is about a person, the traversal expands to their tasks, preferences, and episodes they participated in. This multi-hop expansion retrieves information that no single document chunk contains, because the connections themselves carry meaning. There are two traversal directions: bottom-up, which expands entities for depth on a specific topic, and top-down, which hops across community clusters for a high-level overview. These trade context size and latency against retrieval quality.

The database recommendation is worth noting directly. For 2-3 hop traversals, Postgres or MongoDB handle documents, vectors, and graph lookup in a single infrastructure piece. Neo4j is the right call only when deep traversals or specialized graph algorithms are core to the product. Building for Google scale when processing thousands of documents is over-engineering that costs money and operational time without benefit.

**Key takeaways:**
- Reciprocal Rank Fusion merges text and semantic search results without requiring score normalization
- Multi-hop graph traversal after RRF is the actual addition GraphRAG provides over standard hybrid RAG
- Bottom-up traversal goes deep on specific entities; top-down traversal scans community clusters for overview
- Postgres and MongoDB are sufficient for 2-3 hop traversals; Neo4j is only needed for specialized graph algorithms

**Why do I care:** The framing of "GraphRAG as an addition to hybrid RAG, not a replacement" is useful because it clarifies where the complexity budget goes. The multi-hop traversal step is the expensive part, and understanding that it's optional and additive means you can introduce it incrementally rather than treating it as an all-or-nothing architectural choice.

---

## Agentic GraphRAG: Exposing Unified Memory via MCP

**TLDR:** GraphRAG becomes agentic when the agent reads from and writes to the knowledge graph autonomously through an MCP server. The search_memory tools bring only relevant graph slices into context. The write_memory tools run the full data and memory pipelines on demand, enabling continual learning from conversations.

**Summary:** The five-component architecture ties everything together: a data pipeline that normalizes heterogeneous inputs (URIs, notes, emails, Google Drive) into a document collection, a memory pipeline that transforms documents into knowledge graph triplets, the knowledge graph itself as the queryable artifact, an MCP server exposing search and write tools, and a harness like Claude Code that injects business logic through custom skills. Each layer has a single job, and the agent talks only to the MCP layer.

The search tools are designed to bring only the relevant slice of the knowledge graph into the context window, which directly addresses the context rot problem that motivated GraphRAG in the first place. The write tools are more interesting: they run the same data and memory pipelines on demand against the current conversation, not in batch mode. This means the agent can ingest what a user just said, extract entities and relationships per the ontology, normalize them against existing canonical IDs, and update the knowledge graph before the next query. That's continual learning without a separate training step.

The author notes that current harnesses like Claude Code use the filesystem for memory. This works at small scale, but as data grows in volume and complexity, or as cost and latency requirements tighten, a proper knowledge graph becomes necessary. The pattern here is a credible evolution path from filesystem-based agent memory to a structured, queryable, temporally-aware knowledge graph, served through a standard protocol that any agent harness can consume.

A forthcoming book co-authored with Maxime Labonne will build this stack from scratch, including RAG, GraphRAG, and an AI Evals layer to actually measure the performance gain from introducing graph retrieval. That measurement piece is often missing from GraphRAG discussions, where the benefits are asserted rather than demonstrated.

**Key takeaways:**
- MCP servers are the natural interface for exposing agent memory as a service, decoupling the knowledge graph from any specific harness
- Write tools that run pipelines on the current conversation enable continual learning without retraining
- Filesystem-based agent memory (as used in Claude Code) is a starting point, not a destination, as data grows
- Performance gains from GraphRAG over RAG should be measured with an evals layer, not assumed

**Why do I care:** The MCP server pattern for memory is the most practically actionable part of this architecture for frontend architects building on top of agent harnesses today. The ability to swap the memory backend without changing the agent's interface is exactly the kind of clean separation that makes systems maintainable. The call to measure GraphRAG's actual gain with evals, rather than take it on faith, is the right engineering instinct and one that gets glossed over in most of the GraphRAG content out there.
