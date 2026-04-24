---
title: "Building Software Factories with AI Agents"
excerpt: "A week in the life of an AI-driven software factory: 130+ PRs, autonomous code review, and what it means for developers"
publishedAt: "2026-04-24"
slug: "software-factory-ai-agents"
hashtags: "#ona #ai #agents #software-engineering #automation #generated #en"
source_pattern: "Ona newsletter"
---

## Building a Software Factory: Week 1, Zero to Product

**TLDR:** Ona spent a week building a fully autonomous software factory, documenting the entire process in public. They took an empty GitHub repo and shipped a working Notion-like app called Memo with 130+ PRs merged, 12,202 lines of code, and 14 automations running the factory. The key insight: speed is not the bottleneck anymore, the quality layer is what separates "agents writing code" from a true production line.

**Summary:**

Ona is doing something nobody else has done before: they are building a software factory in public and showing every step of the process. An empty repo to a self-shipping product, live, every day, with no human-written code. The product is Memo, a Notion-like note-taking app, but this is really about the processes that cover each stage of the software development lifecycle autonomously. Humans steer intent, Ona does the heavy lifting and maintains the codebase.

The factory works in five layers. Planning breaks a spec into issues. Build picks up issues and writes code. Review checks every PR before it merges. Verification smoke-tests after deployment. Operations monitors production errors and triages them back into the build loop. Each stage hands off to the next without human intervention. The stack is Next.js 16, Supabase for auth and Postgres, Sentry for error monitoring, Vercel for deployment, all orchestrated through Ona.

Day 3 is where it gets interesting. They fed the factory a detailed product spec and by stream time, over 50 PRs had merged autonomously. The app was live with workspaces, pages, a Lexical block editor, full-text search, markdown import/export, and member invites. Detailed spec to working product in under a day. No human touched the code. Chris, Ona's CTO, walked through the two-loop automation pattern: one set of automations creates work, another does the work. Progressive escalation means low-risk changes auto-merge, high-risk changes get flagged for human review.

But here is what the week revealed about the limits of this approach. Ona COO Philipp joined for the finale and found 12 bugs through manual testing: drag-and-drop issues, invisible checkboxes, broken hyperlinks, a slash menu that jumped when scrolling. Meanwhile, the factory had been catching and fixing runtime errors through Sentry that no human reported. The factory sees what crashes. It does not see what looks wrong. The quality layer grades what you can measure in code, not what you can only see by using the product.

**Key takeaways:**

- 130+ PRs merged in five days, with the initial feature set shipped in under 24 hours
- 14 automations organized in five layers: Planning, Build, Quality, Verification, Operations
- The quality layer is what makes it a factory rather than just "agents writing code"
- The factory catches runtime errors automatically but misses UX bugs that require human use to discover
- The human role shifts from writing code to designing the factory and deciding what good looks like

**Why do I care:** This is the most concrete demonstration of what autonomous software development looks like in practice. The numbers are staggering, but what matters is the pattern: speed is no longer the bottleneck. What we need to figure out is the quality layer. The gap Philipp found is not a factory failure, it is a spec gap. The more precise the input, the less you rely on a human to catch what is wrong on the other end. This is going to change how we think about product specs, acceptance criteria, and what human reviewers should focus on.

**Link:** [Building a software factory: Week 1, zero to product](https://ona.com/stories/building-a-software-factory-week-1)

---

## Veto: Blocking Executables by What They Are, Not Where They Live

**TLDR:** Veto, a tool from Ona, now uses bare executable names in its deny list instead of specific paths. A BPF discovery agent scans the devcontainer and all nested Docker-in-Docker containers, finds every executable matching that name, hashes each one, and blocks them automatically. Same enforcement layer, but now it covers the full filesystem hierarchy without manual path hunting.

**Summary:**

Ona already proved the enforcement layer works. Veto computes a SHA-256 hash of an executable's content at the BPF LSM layer and blocks execve before the process starts. Rename it, copy it to a new path, symlink it: the content has not changed, the hash matches, the block holds. That layer is unchanged.

What changed is the discovery layer above it. Previously, you had to know every path, in every layer, ahead of time. Block /usr/local/bin/npx and Veto hashes it, blocks it, blocks every copy regardless of where it is renamed. But /usr/local/bin/npx is the devcontainer's npx. Inside a Docker-in-Docker container, npx lives at /usr/bin/npx. Different path, different build, different bytes, different hash. Veto never saw it. It was never hashed. It runs.

And AI agents do not just use executables, they introduce new ones. npm install drops npx-cli.js in node_modules. A venv brings its own pip. A container pull brings another variant. Even installing a VS Code extension can pull in its own npx. The discovery problem was that you had to manually enumerate every path.

The solution is a BPF-based discovery agent that scans the devcontainer and every Docker-in-Docker container, however deeply nested. It finds every executable matching a bare name in the deny list, hashes each one, and adds them to the enforcement map. The scan runs continuously, watching the filesystem in real time. Install a package, create a venv, pull a container image. A new npx appears, gets hashed, gets blocked. Automatically.

**Key takeaways:**

- Content-addressable enforcement at the BPF LSM layer is unchanged
- A discovery agent now finds all instances of a named executable across all filesystem layers
- Bare names replace specific paths in the deny list
- Real-time filesystem watching catches new executables as they appear
- Particularly relevant for AI agent environments that constantly introduce new tools

**Why do I care:** This is kernel-level enforcement for containerized environments without the filesystem homework. If you run AI agents in production, you need to think about what executables they can run and where those executables come from. Veto handles the enforcement, the discovery agent handles the coverage. The naming is the input, the content hash is the identity. Clean separation.

**Link:** [Veto finds the executables. You just name them.](https://ona.com/stories/veto-discovers-what-to-block)