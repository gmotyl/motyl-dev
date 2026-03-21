---
title: "Claude Desktop Goes Mobile With Dispatch and Turns Your Computer Into an Always-On AI Operations Center"
excerpt: "Anthropic's Claude Desktop introduces Dispatch for mobile-to-desktop orchestration, persistent Cowork sessions, and a local plugin system that transforms your machine into an autonomous productivity hub."
publishedAt: "2026-03-20"
slug: "claude-desktop-dispatch-mobile-orchestration-plugins"
hashtags: "#techtiff #ai #agents #productivity #workflow #dx #generated #en"
---

## Claude Gave Your Phone a Job: Dispatch, Cowork, and the Local-First AI Desktop

**TLDR:** Anthropic has shipped Dispatch, a feature that lets you control Claude Desktop from your phone, turning mobile into a remote orchestrator for local file operations, scheduled tasks, and multi-app workflows. Combined with Cowork sessions, Plugins, and a customizable local dashboard, Claude Desktop is positioning itself as a persistent, always-on AI employee that works directly on your machine.

**Summary:**

There is something genuinely interesting happening with Claude Desktop that goes beyond the usual "AI assistant" narrative. Anthropic has introduced Dispatch, which creates a persistent conversation bridge between the Claude mobile app and a Cowork session running on your desktop. The idea is straightforward but powerful: you prompt Claude from your phone, and it executes the task on your computer with full access to your local files, connected apps, and installed plugins. There is also a companion feature called Remote Control for Claude Code users, accessible via the /rc command, which lets you continue terminal sessions from your browser or phone.

The Cowork system itself is where the heavy lifting happens. Claude does not just suggest edits or generate text in isolation. It plans work, breaks it into subtasks, coordinates parallel workstreams, and writes finished output directly into your file system. Files stay local, code runs in a sandbox, and the output lands ready to use in the form of spreadsheets, presentations, organized folders, and formatted reports. A Chrome extension extends this to browser-based tasks like form filling, scrolling, and data extraction. Connectors for Gmail, Calendar, and Notion let Claude pull context from your most-used tools and sync everything back to your local machine.

The Plugin architecture is where the design philosophy becomes clear. A plugin bundles skills, connectors, sub-agents, and slash commands into a single installable package. The Productivity plugin, for example, creates a three-part system: a TASKS.md file for task management that Claude actively reads, writes, and updates; a CLAUDE.md file that serves as persistent local memory about your work context, clients, and preferences; and a dashboard.html file that renders everything into a browser-based Kanban board or list view. Because all of this lives on your local file system, Claude can edit the HTML directly to customize layouts, add data visualizations, or change themes on demand.

The scheduled tasks feature is perhaps the most ambitious piece. You can assign recurring work to Claude using the /schedule command, and because Keep Awake prevents your machine from sleeping, these tasks run automatically in the background. The practical example given is having Claude pull from your email and calendar, cross-reference with your task list, and draft a status report, all waiting for you when you check in from your phone. The system also supports custom Skills, which are essentially saved prompts with triggers that combine your tools and context to handle repetitive tasks with a single command.

What is notably missing from this announcement is any serious discussion of security implications. You are giving an AI agent persistent access to your local file system, email, calendar, and browser with the ability to execute tasks while you are away. The "files stay local" framing is doing a lot of heavy lifting here, but the context still flows through Anthropic's servers. There is also no mention of audit logging, permission scoping, or rollback capabilities for when Claude inevitably misfiles a report or overwrites the wrong spreadsheet. The dashboard customization prompts, while practical, reveal that the system is essentially generating and executing arbitrary HTML and JavaScript on your machine, which is a surface area worth thinking about.

**Key takeaways:**

- Dispatch connects Claude mobile to your desktop, enabling remote orchestration of local files and apps from your phone
- Cowork sessions provide persistent, multi-step task execution with parallel workstreams and direct file system output
- The Plugin architecture bundles skills, connectors, and memory into installable packages with local-first storage
- Scheduled tasks and Keep Awake create an always-on AI assistant that runs recurring work autonomously
- Custom Skills let you create one-word triggers for complex, context-aware workflows

**Why do I care:** As someone who spends most of the day in terminals and editors, the Remote Control feature for Claude Code is the most immediately interesting piece here. The broader Dispatch and Cowork system is essentially Anthropic building an operating-system-level agent layer, and that has real architectural implications for how we think about developer tooling. But let us be honest about what this is: it is an AI agent with persistent file system access, browser control, and background execution on your personal machine. Before you enable Keep Awake and walk away, you had better understand exactly what permissions you have granted. The local-first storage model is smart, but the lack of any discussed guardrails around permission scoping, audit trails, or destructive action prevention is a significant gap for anyone who would actually deploy this in a professional context. This is exciting technology wrapped in a trust model that has not been fully articulated yet.

**Link:** [Claude Gave Your Phone a Job](https://techtiff.substack.com/p/automate-claude-desktop)