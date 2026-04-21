---
title: "Building an LLM Knowledge Base on Personal Notes: A Hands-On Approach"
excerpt: "How to create a personal deep research agent using Obsidian, Readwise, and NotebookLM to turn your private notes into actionable knowledge bases."
publishedAt: "2026-04-21"
slug: "building-llm-knowledge-base-personal-notes"
hashtags: "#substack #ai #llm #obsidian #readwise #notebooklm #architecture #agents #generated #en"
---

## Karpathy Named It. I Built One on My Notes.

**TLDR:** Andrej Karpathy coined the term "LLM Knowledge Base" for building deep research agents on personal data. This developer created a three-skill system using Obsidian, Readwise, and NotebookLM to query private notes, highlights, and research transcripts, producing grounded articles instead of generic web searches.

**Summary:** The author has been building an LLM-powered knowledge base on their personal data for months, inspired by Andrej Karpathy's concept. They use Obsidian for notes, Readwise for reading highlights, and NotebookLM for research transcripts. While each tool is great individually, no AI could connect them all. Public research tools like Perplexity give everyone the same generic results. What matters is leveraging your own curated thinking - the books you've highlighted, notes you've written, research you've collected. That's the real edge.

To solve this, they built a deep research agent with three Claude Code skills: research_create, research_search, and research_distill. These skills work through command-line interfaces for Obsidian, Readwise, and NotebookLM. The system uses multi-round query expansion with gap analysis to ensure comprehensive coverage. It outputs a memory folder with an index.yaml that acts as a progressive-disclosure wiki over the source files. Post-processing includes deduplication and re-ranking to keep results focused.

Importantly, there's no vector database or RAG pipeline here. They use the filesystem as state, with Markdown, YAML, and JSON as formats. If you already use Obsidian, Readwise, or NotebookLM, this approach could work for you. By the end of the article, you'll understand how it works, see it demonstrated, and have a blueprint for your own system.

The system consists of three skills and a memory folder. Research_create builds the memory folder from scratch for a topic. Research_search lets you query existing memory folders. Research_distill extracts only the sources actually used in a finished piece.

The memory folder centers on index.yaml, which holds metadata for each source including highlights, full content, original paths, and origins. The LLM reads the index first, then selects relevant files based on summaries. No embeddings or chunking means references stay perfectly traceable. Raw data remains immutable - humans edit it manually, the pipeline only reads.

They chose CLIs over MCP servers for token efficiency, composability with bash, and because Markdown is native to LLMs. Skills load at about 100 tokens each, while MCP servers dump 20,000 tokens upfront.

The research_create skill is the most complex. It starts with a brain dump, then through multi-round expansion: generate queries, dispatch researchers in parallel, deduplicate, analyze gaps, repeat. Finally rerank and build the YAML index.

Context isolation is key - orchestrator only sees metadata, subagents handle content. This keeps the main context light while allowing deep reads.

Once built, research_search lets any agent query the memory without loading sources. Three layers: summaries in index, key highlights, full documents. Progressive disclosure prevents information overload.

The system scales well for personal research. No fancy retrieval needed when corpus fits in context.

**Key takeaways:**
- Personal curated data provides unique research advantage over public web searches
- CLIs offer better token efficiency than MCP servers
- Filesystem-based memory with YAML index enables traceable, portable knowledge bases
- Multi-round query expansion with gap analysis ensures comprehensive coverage
- Progressive disclosure keeps agents focused without drowning in information

**Why do I care:** As a frontend architect, I've been watching how AI agents could transform how we build and maintain complex applications. This approach to building knowledge bases on personal data reminds me of how we structure component libraries or design systems - it's about creating reusable, queryable assets that compound over time. While I'm not building research agents daily, the pattern of separating orchestration from heavy computation is exactly what we need for scalable frontend tooling. The emphasis on traceability and progressive disclosure could apply directly to how we manage component documentation or API references in large teams.

**Link:** [Karpathy Named It. I Built One on My Notes.](https://www.decodingai.com/p/llm-knowledge-base-obsidian-readwise-notebooklm?publication_id=1526003&post_id=194537609&isFreemail=true&triedRedirect=true)