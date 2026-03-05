---
title: "Setting Up Claude Memory: A Practical Migration Guide from ChatGPT"
excerpt: "A step-by-step walkthrough for configuring Claude's memory, profiles, and projects when switching from ChatGPT, now that long-term memory is free on all plans."
publishedAt: "2026-03-04"
slug: "setting-up-claude-memory-migration-guide-from-chatgpt"
hashtags: "#ai-adopters-club #ai #llm #productivity #dx #workflow #generated #en"
---

## How I Set Up My Claude Properly in Less Than 15 Minutes (Switching from ChatGPT)

**TLDR:** Anthropic made Claude's long-term memory free for all users and shipped a ChatGPT history import tool. The article walks through a four-step setup process covering memory, data migration, user preferences, and project workspaces that transforms Claude from a generic assistant into something that actually knows how you work.

**Summary:**

Anthropic recently unlocked Claude's long-term memory feature for free-tier users, a move that coincides with Claude hitting number one on the App Store. Meanwhile, ChatGPT started showing ads to free users. The competitive dynamics are shifting fast, and this article from the AI Adopters Club newsletter by Kamil lays out a practical migration path for anyone ready to make the jump. The core argument is simple: switching without configuring is pointless. You will get the same generic, middle-of-the-road outputs that frustrate everyone.

The setup process is broken into four steps, each taking just a few minutes. First, enable memory in Settings so Claude retains context across conversations. Without it, every chat starts cold and you are constantly re-explaining yourself. Second, export your ChatGPT history using a structured prompt that organizes your data into categories like instructions, identity, career, projects, and preferences. The article provides an enhanced export prompt that is significantly more organized than the default one Anthropic suggests, with dated entries sorted by category. This is actually a clever approach because it front-loads the professional data that Claude is most likely to retain and act on.

Third, and this is where it gets genuinely useful, is configuring Claude's three personalization layers. The profile bio tells Claude who you are and what you do. The preferences box controls how Claude communicates with you, its tone, directness, and formatting rules. And the Styles feature lets you switch output formats per conversation. The article includes a meta-prompt you can paste into Claude that walks you through a series of questions to generate your ideal preference block. That is a nice touch because most people stare at an empty text box and give up.

The fourth step is creating Projects, which are contained workspaces with their own instructions and reference files. This is where things get powerful for teams and architects. If you are managing a team or working across multiple domains, having separate project contexts means Claude already understands the constraints, stakeholders, and priorities of each work stream before you type a single question. For architects in particular, you could have one project for your system design work with architecture decision records uploaded, another for code reviews with your team's style guides, and another for planning with your roadmap documents.

What the article does not address, and this is a significant gap, is the privacy and data retention implications. When you dump your entire ChatGPT history into Claude, you are handing Anthropic a comprehensive profile of your professional life, your projects, your preferences, your team structure. The article treats this as purely mechanical, but anyone working under compliance constraints or handling sensitive client data should think carefully about what they are importing. The article also skips over the fact that Claude's memory is not deterministic. It "may not retain every personal detail," which means you cannot rely on it as a system of record. It is a convenience layer, not a contract.

**Key takeaways:**
- Claude's long-term memory is now free on all plans, removing the main barrier to switching from ChatGPT
- A structured export prompt with categories and dates produces far better migration results than the default export approach
- Three distinct personalization layers (profile, preferences, styles) each serve different purposes and all three need configuration for best results
- Projects with uploaded reference documents are the highest-leverage setup step for teams and recurring workflows
- Memory is probabilistic, not deterministic. Do not treat it as a reliable system of record for critical information

**Link:** [How I set up my Claude properly in less than 15 minutes (switching from ChatGPT)](https://aiadopters.club/p/set-up-my-claude-memory)