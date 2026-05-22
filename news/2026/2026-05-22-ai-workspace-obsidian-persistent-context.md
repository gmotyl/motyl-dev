---
title: "I Gave My AI an Office: Building a Persistent AI Workspace with Obsidian"
excerpt: "How setting up a shared markdown vault in Obsidian can give your AI tools the persistent context they desperately lack."
publishedAt: "2026-05-21"
slug: "ai-workspace-obsidian-persistent-context"
hashtags: "#webdev #ai #obsidian #productivity #pkm #generated #en"
source_pattern: "TechTiff"
---

## Build an AI Workspace That Remembers Everything (Obsidian Setup Guide)

**TLDR:** Every AI session starts from zero — ChatGPT doesn't know what you told Claude, and Claude has no idea what happened in Codex. This post describes building a shared Obsidian vault of markdown files that any AI tool can read, so context actually persists across sessions and tools.

Here is a problem that I think most of us have quietly accepted as just the cost of doing business with AI: the context amnesia. You spend twenty minutes explaining your project setup, your team structure, your naming conventions — and then tomorrow, in a new session, you start all over again. Every AI assistant you use is essentially a contractor who shows up on day one every single day. You are the onboarding document, every time.

The setup described here takes that frustration seriously and proposes something I find genuinely practical: a folder of plain markdown files on your computer, opened as an Obsidian vault, that acts as a persistent "office" for your AI. Inside this folder you keep operational notes about active projects, context files that explain who you work with and what your priorities are, reusable templates for consistent outputs, and an archive of completed work. Any AI tool that can read files — Claude with filesystem access, Codex, ChatGPT with file uploads — can walk into that workspace and be immediately oriented, rather than starting cold.

The key design decision here is the choice of plain markdown. It is not a proprietary format, not tied to any single AI tool, and not locked inside a chat interface. You can open those files in any text editor, sync them with whatever system you use, and hand them to any AI that gets file access. The "office" metaphor is apt: you are creating a place where work is tracked, not a record of conversations. There is a meaningful difference between a chat thread that disappears and a project note that persists and grows.

What I appreciate about this framing is that it shifts the mental model from "chatting with AI" to "working with AI." When you bring a new team member on board, you give them access to the team wiki, introduce them to active projects, explain the context of ongoing decisions. This system attempts to give AI tools that same kind of structured onboarding, except the onboarding document lives on your machine and gets updated as work evolves.

That said, there is something this approach is quietly skating past: the maintenance burden. A workspace that "remembers everything" is only as good as your discipline in updating it. If you forget to log last Tuesday's call or the project that shifted priorities, the AI's context is stale and now confidently wrong — which is arguably worse than starting fresh. The post frames this as a solved problem, but the real question is whether the overhead of keeping those markdown files current is actually lower than re-explaining context on demand. For some workflows and some people, it absolutely will be. For others, this could easily become another organizational system that starts clean and slowly drifts into noise.

**Key takeaways:**
- AI tools lack cross-session and cross-tool memory, which creates repeated context-setting overhead for every user
- A shared folder of markdown files opened as an Obsidian vault gives multiple AI tools a common, portable workspace to read from
- Plain markdown ensures portability — no vendor lock-in, works with any text editor or sync solution
- The system shifts the model from ephemeral chat threads to persistent, structured project work
- The real maintenance cost of keeping context files current is not addressed and deserves honest evaluation before committing to the setup

**Why do I care:** As someone thinking about how AI fits into real developer workflows, the statelesness problem is one of the most underrated friction points. Tool integrations are improving, but the fundamental issue — that context lives in closed silos per session and per product — is a genuine architectural limitation. A file-based approach like this is pragmatic and honest about that limitation. It does not pretend the tools will magically sync; it builds a layer you control. Whether it scales to a team or remains a personal productivity hack is a different question, but for solo developers or freelancers juggling multiple AI tools, this is worth trying. The Obsidian angle also means you get a decent UI for browsing and linking your notes as a side benefit.

**Link:** [Build an AI Workspace That Remembers Everything (Obsidian Setup Guide)](https://techtiff.substack.com/p/ai-workspace-obsidian?publication_id=4799331&post_id=198330240&isFreemail=true&triedRedirect=true)
