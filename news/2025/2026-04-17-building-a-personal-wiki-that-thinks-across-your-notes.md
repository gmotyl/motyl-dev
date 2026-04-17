---
title: "Building a Personal Wiki That Thinks Across Your Notes"
excerpt: "This walkthrough turns Andrej Karpathy's LLM wiki idea into a practical Obsidian setup where Claude organizes sources, writes summary pages, and maintains cross-links for you."
publishedAt: "2026-04-17"
slug: "building-a-personal-wiki-that-thinks-across-your-notes"
hashtags: "#substack #ai #llm #agents #workflow #obsidian #generated #en"
source_pattern: "Substac"
---

## How I Took Karpathy's LLM Wiki and Built an AI-Powered Second Brain in Obsidian

**TLDR:** The core idea is refreshing because it drops the fantasy that humans will manually maintain beautiful note networks forever. Instead, the LLM does the cross-linking, synthesis, and upkeep while Obsidian acts as the local interface and storage layer.

**Summary:** The author starts from a problem that anyone with a long reading list will recognize. Saving material is easy. Returning to it with context is hard. Articles, podcast notes, and stray ideas end up in separate tools or in one vault that still behaves like a junk drawer. The friction is not collection, it is maintenance. Most knowledge systems collapse under the weight of manual curation.

Karpathy's framing changes the center of gravity. Instead of treating the LLM like a search box attached to your notes, the model becomes the maintainer of the knowledge base itself. Raw source material goes into one layer, the generated wiki lives in another, and a schema file tells Claude how to behave consistently. That is a much more interesting architecture than the usual "chat with your notes" demo because it treats knowledge work as an ongoing build process.

I also like that this setup stays local-first in spirit. Obsidian provides markdown files, structure, and a familiar workspace. Claude Code acts as the operator. Obsidian skills teach the model how to write native wiki links, callouts, canvases, and other constructs without turning the vault into AI sludge. That combination matters. The difference between a pile of generated notes and a usable knowledge system is the discipline of the conventions.

The most convincing argument is the compounding effect. Once the system can continuously ingest articles and connect them to prior material, the knowledge base gets denser without asking the user to become a full-time librarian. That is where these workflows stop feeling like life hacks and start feeling like durable leverage.

**Key takeaways:**
- Manual note linking does not scale, so the maintenance work has to move to the model.
- A layered setup with sources, wiki pages, and schema gives the agent enough structure to stay useful.
- Obsidian becomes much more compelling when the LLM understands its native conventions instead of dumping generic markdown.

**Why do I care:** I care because this is one of the rare AI workflows that respects both architecture and human laziness. Frontend engineers, consultants, and researchers all accumulate fragmented context faster than they can organize it. A system that turns that sprawl into a living map is much closer to real leverage than yet another chatbot bolted onto a database.

**Link:** [How I Took Karpathy's LLM Wiki and Built an AI-Powered Second Brain in Obsidian](https://aimaker.substack.com/p/llm-wiki-obsidian-knowledge-base-andrej-karphaty)