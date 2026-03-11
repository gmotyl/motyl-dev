---
title: "Building a Personal AI Content Writer with Claude Code"
excerpt: "A step-by-step tutorial on turning Claude Code into a brand-aware content writing system using voice profiles, business context files, and slash commands."
publishedAt: "2026-03-10"
slug: "building-personal-ai-content-writer-claude-code"
hashtags: "#theaibreak #ai #claude #content-writing #generated #en"
---

## How To Turn Claude Code Into Your Personal Content Writer

**TLDR:** This tutorial walks through building a complete AI Brand Writer workspace inside Claude Code that remembers your voice, business context, and content style across sessions. The core idea is structuring your project with voice profiles, reference posts, and a routing file so Claude Code writes on-brand content every time without copy-pasting between tools.

**Summary:**

The fundamental problem this tutorial tackles is one that plagues every AI-generated piece of content: it sounds generic because the model does not know you. The solution proposed here is not another prompt hack or wrapper tool. Instead, it is an architectural approach -- you build a workspace inside Claude Code composed of several interconnected files that collectively teach the model who you are, how you write, and what your business does. The key insight is that Claude Code reads a CLAUDE.md file automatically at the start of every session, which becomes the routing hub for everything else.

The workspace structure is elegantly simple. You create a business-info.md file containing your company overview, target audience, products, and content focus. You build a content-structure.md file with your voice rules and platform-specific formats for LinkedIn, X, newsletters, and other channels. You populate a reference folder with your five to ten best-performing posts organized by platform. And you tie it all together with CLAUDE.md, which tells Claude Code to read these files before writing anything. When you ask it to write a LinkedIn post, it automatically loads business context, checks voice rules, reviews reference posts, and writes in your style.

What is particularly interesting -- and what the author somewhat glosses over -- is the voice extraction step. Before doing anything in Claude Code, you are supposed to feed three to five of your best content samples into ChatGPT or Claude and have it analyze your sentence length patterns, paragraph structure, opening and closing styles, tone markers, vocabulary habits, and structural preferences. The output is a Voice Profile written as clear rules, not descriptions. Things like "Use short sentences. Max 2 sentences per paragraph. Never say 'utilize' -- say 'use'." This is actually the hardest and most important part of the entire setup, yet the tutorial treats it as a preliminary step rather than the foundation it truly is.

The final piece is a slash command -- a skill file that lets you generate content with a single line command like "/generate-content." This is where the workflow becomes genuinely powerful. Instead of pasting prompts and context every time, you just invoke the command with a topic and platform, and Claude Code handles the rest. The tutorial makes this look effortless, but there is a hidden assumption here: your reference content and voice profile need to be genuinely good and representative, or the system will faithfully reproduce mediocre patterns at scale.

What the tutorial does not address is the maintenance problem. Voice evolves. Business context changes. Your best posts from six months ago may not represent how you want to sound today. There is no mention of a review cycle or how to update these files as your brand evolves. There is also no discussion of the limitations -- Claude Code's context window still has boundaries, and loading five reference posts plus business context plus voice rules plus content structure eats into the space available for actual generation. The tradeoff between thoroughness of context and quality of output is real and unexamined here.

**Key takeaways:**

- Claude Code's CLAUDE.md file serves as an automatic routing hub that loads context at the start of every session, making it ideal for persistent brand-aware workflows
- Voice extraction should be done separately first, producing concrete rules rather than vague descriptions of tone
- The workspace architecture (business-info.md, content-structure.md, reference folder, CLAUDE.md) creates a reusable system that eliminates repetitive prompt engineering
- Slash commands (skills) turn the entire setup into a one-line content generation workflow
- The approach works best when reference content is genuinely high-quality and representative of your current voice

**Tradeoffs:**

- Loading extensive context (voice profile, business info, reference posts, structure rules) consumes a significant portion of the available context window, potentially affecting output quality for longer pieces
- The system faithfully reproduces whatever patterns it finds in your reference material -- if those samples are mediocre, you get consistently mediocre output at scale
- No maintenance or update cycle is discussed; voice and business context drift over time and stale files will produce increasingly off-brand content
- The voice extraction step is treated as a quick preliminary task when it is arguably the most critical and difficult part of the entire setup
- Platform-specific formatting rules may become outdated as social media platforms change their algorithms and optimal content formats

**Link:** [How To Turn Claude Code Into Your Personal Content Writer](https://theaibreak.substack.com/p/tutorial-how-to-turn-claude-code)
