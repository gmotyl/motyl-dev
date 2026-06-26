---
title: "Kilo Cloud Agents Get Personalized Identities, Smarter Profiles, and Device-Agnostic Sessions"
excerpt: "Kilo's Cloud Agents update brings GitHub authorship attribution, per-repo environment profiles, inline PR status, and remote session sync to make agentic coding feel less like automation and more like collaboration."
publishedAt: "2026-06-25"
slug: "kilo-cloud-agents-upgrade-github-authorship-profiles-remote-sessions"
hashtags: "#kilo #agents #devtools #github #developer-experience #ci-cd #remote-development #generated #en"
source_pattern: "Kilo"
---

## Cloud Agents Just Got a Major Upgrade

**TLDR:** Kilo's Cloud Agents now author commits under your GitHub identity, support per-repository environment profiles with custom MCP servers and skills, and sync live sessions between your local machine and the web dashboard. These changes close the gap between "bot running on your behalf" and "collaborator that does the heavy lifting."

**Summary:**

If you've ever looked at a PR and seen a generic bot commit message where your name should be, you know how jarring that feels. Kilo's latest Cloud Agents update fixes exactly that. When you connect your personal GitHub account through your own integration, every commit and PR the agent creates now shows up as authored by you, with Kilo listed as co-author. Your contribution graph fills in, code owners get pinged correctly, and reviewers can trace a change back to the person who directed it without archeological git digs. That's a small change with a big social surface, because code review is a human process and identity matters.

The environment profile improvements are where things get genuinely interesting for anyone running complex setups. Before this update, profiles were global blobs of env vars and secrets. Now you can pack in custom agents, skills, MCP servers, and slash commands, and you can assign a default profile per repository. When a session boots against a specific repo, it automatically loads the right tooling for that project. No manual selection, no "why is this MCP server not available" debugging at the start of a session. The agent already knows how this particular codebase likes to work. This is the kind of configuration detail that separates a tool you use occasionally from one you trust with serious work.

PR status visibility is a quality-of-life addition that matters more than it sounds. Previously you'd spin up a Cloud Agent, it would open a PR, and then you'd bounce over to GitHub to figure out whether CI passed or the branch was ready to merge. Now that status is surfaced directly in the Kilo dashboard, alongside the session that created the PR. At a glance you know whether something needs your attention or whether the agent already got it across the finish line. That's one fewer context switch per agent run, and context switches add up.

The remote sessions feature is arguably the most ambitious piece of this release. Enable remote mode in the Kilo CLI, and your active local sessions appear in the web dashboard right next to your cloud sessions. Messages and responses sync in real time. If the agent asks a clarifying question, that question routes to whatever device you're on. You can start something on your laptop, check in from your phone, close the laptop, and pick up the same session from a cloud environment without losing state or starting over. The compute is still on your machine, but the session is genuinely device-agnostic. I've spent a fair amount of time thinking about what "agentic" actually means in practice, and this is a concrete answer: the agent's work persists across your physical context, not just the task's logical context.

What I'd push back on is the framing that this makes Cloud Agents "fully-equipped and personalized from the start." The profile system is clearly better than before, but the interesting failure mode is still the one where the agent confidently does the wrong thing with the right tools loaded. Authorship attribution is meaningful, but it does create a subtle accountability question: if the commit is under your name and the agent wrote bad code, the signal in the git log is now misleading. That's a tradeoff worth being clear-eyed about. Kilo is solving the workflow friction, which is real, but the judgment problem is still yours.

**Key takeaways:**
- Cloud Agent commits now carry your GitHub identity rather than a generic bot attribution, which matters for code review, contribution graphs, and code ownership signals.
- Environment profiles now support MCP servers, custom agents, and slash commands, and can be scoped per repository so each project session boots with the right tooling already loaded.
- Remote sessions bridge local and cloud: start a session locally, access it from anywhere via the web dashboard with real-time message sync, no restart required.

**Why do I care:** As someone who works across multiple machines and treats agentic tools as first-class collaborators, the remote session sync is the feature I'd actually use daily. The per-repo profile support with MCP servers is genuinely useful for projects that have specific tooling requirements. The GitHub authorship piece is a double-edged sword: it reduces friction in team workflows, but it also means you're now the named author of whatever the agent produces, which is a reason to keep your review process tight rather than a reason to stop reviewing. Any tool that makes it easier to ship code faster also makes it easier to ship problems faster.

**Link:** [Cloud Agents Just Got a Major Upgrade](https://blog.kilo.ai/p/cloud-agents-upgrade)
