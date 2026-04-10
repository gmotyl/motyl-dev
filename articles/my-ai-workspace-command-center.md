---
title: 'My AI Workspace Command Center: A Local Dashboard for Multi-Agent Work'
excerpt: 'When you run multiple AI agents across several projects simultaneously, you need a way to see everything at once. I built a local web dashboard — a command center for my AI workflow — using the tech I know best: React and Node.js.'
publishedAt: '2026-04-10'
slug: 'my-ai-workspace-command-center'
hashtags: '#AI #ClaudeCode #React #Vite #DeveloperTools #AIWorkflow #VibeCoding'
---

### TLDR:

I built a local web dashboard (Vite + React + Express) that gives me a unified view of all my projects, AI agents, notes, git changes, and progress — a command center for working across multiple concurrent workstreams with AI. It auto-discovers projects, shows agent status in real time, lets me review diffs and commit without leaving the browser, and keeps all my markdown notes one click away.

---

## The Problem: Too Many Windows, No Overview

Here's what my typical workday looks like right now. I have five or six projects running in parallel — a client e-commerce platform, a personal blog, a few side experiments, an AI agent infrastructure project. Each project has its own terminal. Most of those terminals are running Claude Code. Some are running in AFK mode via my Telegram bridge skill. A few are doing long-running tasks I kicked off and forgot about.

The problem is visibility. How do I know what state everything is in? I'd open a new terminal, `cd` into a project, check `git status`, open the notes folder, try to remember where I left off. Then do it again for the next project. It was friction — not insurmountable, but constant low-level cognitive overhead that adds up across a full day.

What I wanted was simple: one place to see everything. Not an IDE, not a project management tool, not another SaaS subscription. Just a local web page that knows about my projects and shows me what I need.

## The Command Center Idea

My workflow is built around terminal windows. I start agents with a `cc` script (a Claude Code wrapper), I write notes in markdown, I track progress in timestamped files. It's all files, all local. The missing piece was a way to **see across** all of it at once without context-switching into each directory.

The concept I landed on: a local web server, always running in the background, that scans my projects folder and gives me a unified UI. I called it the Projects Panel. It runs on port 3010. I open it in a browser tab and it stays there, like a dashboard on a second monitor.

The key insight was to build it with **technology I already know**: React, Vite, Express, WebSockets. No Electron, no native app, no new framework to learn. Web tech runs everywhere, it's easy to iterate, and it can become a desktop app later if I want — Electron wraps a web view anyway.

## How Project Discovery Works

The panel auto-discovers projects by scanning for `PROJECT.md` files. Any folder inside `projects/` that contains a `PROJECT.md` is a project. That's it. No config files, no registration step.

Each `PROJECT.md` serves a dual purpose: it's both the human-readable project overview (what it is, current status, active work) and the machine-readable signal that says "this is a project." The agent I work with also reads these files at session start to get context.

Beyond discovery, each project can have a `repos.json` that lists the git repositories associated with it. A single project often spans multiple repos — for example, my metro project has a Next.js frontend, a backend API, and infrastructure code all in separate repositories. The `repos.json` keeps these associations colocated with the project data.

## What the Dashboard Shows

The main view is a grid of project cards, one per project. Each card shows the project name, a brief description (pulled from `PROJECT.md`), and quick stats. Favorite projects — starred with a single click — sort to the top, just like Gmail. State persists in localStorage so my favorites survive a browser refresh.

The left sidebar is a file tree. It mirrors the folder structure of my projects directory, with git status indicators next to each file: `M` for modified, `U` for untracked, `D` for deleted. When I open a file in the main area, the tree automatically expands and scrolls to highlight it. This was important — without it, you're constantly lost trying to locate what you're looking at.

The right sidebar shows active AI agents. When I start a Claude Code session with my `cc` wrapper script, it registers itself in a central JSON file. When the session ends, it deregisters. The panel reads this file in real time and shows which agents are running, in which projects, for how long.

## Markdown-First Note Viewing

All my project notes, plans, and progress logs are markdown files. The panel has a built-in markdown viewer with syntax highlighting, auto-refresh via WebSocket (so if I'm editing in VS Code, the panel updates live), and a one-click "Open in VS Code" button per file.

Within a project view, notes are organized into tabs: Overview, Plans, Notes, Progress, Repos. Clicking a note opens it inline — the tabs stay visible, there's a Back button to return to the file list. No navigation back to a URL, no losing your place in the project context.

The Cmd+P shortcut opens a fuzzy file finder across all projects using fuse.js. Prefix the query with `?` and it switches to semantic search via `qmd`, a local semantic search tool I use for my notes.

## Git Without Leaving the Browser

Every project view has a Repos tab that shows git status for all associated repositories. I can see staged and unstaged changes, review diffs inline or in a side-by-side view, stage individual files, write a commit message (with templates for common patterns), and push — all from the browser.

The same git component is reused for the workspace-level git panel in the right sidebar, so I can also commit changes to the projects folder itself without touching the terminal. For quick commits — updating a progress file, tweaking a plan — this is genuinely faster than switching to a terminal.

## Image Optimization Built In

One small quality-of-life feature: any markdown file has a drag-drop zone. Drop an image onto it and the panel runs it through a sharp pipeline server-side — converts to WebP, resizes to max 1920px wide, compresses to under 100KB — then inserts the markdown image syntax at the right location. My blog articles need optimized images; this removes the manual step entirely.

## Building It With AI

The panel itself was built almost entirely by AI agents. I wrote a design doc and a list of 18 tasks. Then I ran them as parallel subagents where possible. The full build — from empty Vite scaffold to working panel with all features — happened in a single session.

This is the meta-level of the whole project: a tool for managing AI workflows, built with AI. The agents wrote the components, wired up the WebSocket, extracted the reusable git panel, fixed the bugs. I reviewed diffs (in the panel, ironically), approved commits, and directed the architecture.

What made this work was having clear task boundaries. Each subagent got a specific, well-scoped task: "build the file tree component," "add favorite projects with localStorage," "implement per-repo git status in the repos tab." Vague tasks produce vague results; specific tasks produce working code.

## The Stack

- **Frontend**: Vite + React 19, React Router, Tailwind CSS
- **Backend**: Express (Node.js), WebSocket (ws), chokidar for file watching
- **Search**: fuse.js (fuzzy), qmd (semantic)
- **Git**: simple-git library wrapping git CLI
- **Image processing**: sharp (WebP conversion, resize, compress)
- **Design**: DM Sans (UI), JetBrains Mono (code), warm dark theme with amber accents

The whole thing is under 2,000 lines of TypeScript across maybe 20 files. Not a large codebase. That was intentional — I wanted something I could understand and modify quickly, not a framework.

## What I Learned

Working across multiple concurrent AI agent sessions is a fundamentally different kind of work than single-session AI pairing. The bottleneck shifts from "can I figure out how to do this" to "can I keep track of what's happening across all the streams I have running."

The panel solved the visibility problem. Now I can glance at it and know: which agents are active, which projects have uncommitted changes, which notes I was editing yesterday, where a plan left off. The context-switching cost dropped noticeably.

The broader lesson: when you're building tooling for your own workflow, don't reach for the sophisticated solution first. A local web server and a React app is not glamorous. But it's something I can build in a day, modify in minutes, and own completely. Sometimes the boring tech is exactly right.

---

The Projects Panel is part of my [motyl-ai-workflow](https://github.com/gmotyl/motyl-ai-workflow) starter kit — an open-source template for this kind of multi-project AI workspace setup. If you're running multiple agents across multiple projects, it might save you the same overhead it saved me.
