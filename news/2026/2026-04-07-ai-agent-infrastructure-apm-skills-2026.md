---
title: "AI Agent Infrastructure: APM, Skills, and Context Optimization"
excerpt: "Curated insights on agent package management, practical skills implementation, and context window optimization for AI coding agents."
publishedAt: "2026-04-07"
slug: "ai-agent-infrastructure-apm-skills-2026"
hashtags: "#motyldev #curated #ai-agents #agents #architecture #developer-tools #performance #generated #en"
source_pattern: "Motyl.dev"
---

## GitHub - microsoft/apm: Agent Package Manager

**TLDR:** APM is an open-source dependency manager for AI agents—think package.json but for agent configuration, skills, plugins, and MCP servers with transitive dependency resolution and reproducible setups.

**Summary:** Agent Package Manager solves a real portability problem. Every developer setting up an AI agent manually configures skills, instructions, prompts, and plugins. When you clone that developer's repo, you get none of that—you start from scratch. APM fixes this by declaring agent dependencies in a manifest file and letting every developer on the team bootstrap a fully configured agent in seconds.

The apm.yml file works like npm's package.json. You declare which skills your project needs, which plugins, which MCP servers, even which agent primitives matter for your workflow. Then any developer who clones your repo runs apm install and gets a completely configured environment in seconds. It handles transitive dependencies, so if Skill A depends on Skill B, APM resolves the whole tree.

The security model is thoughtful. APM includes content scanning to catch hidden Unicode characters, and you can pin versions in apm-lock.yml to ensure reproducibility. You can install from anywhere—GitHub, GitLab, Bitbucket, any git host, even your internal infrastructure. The tool is built for teams where consistency matters.

**Key takeaways:**
- Agent configuration should be reproducible and portable across the team
- One manifest for everything—instructions, skills, plugins, MCP servers—beats manual setup
- Transitive dependency resolution prevents the "works on my machine" problem with agent setup

**Why do I care:** As someone building agent-powered workflows, reproducible setup is critical. APM lets you codify your agent intelligence and share it reliably with teammates.

**Link:** [GitHub - microsoft/apm: Agent Package Manager](https://github.com/microsoft/apm)

---

## Agent Skills 101: a practical guide for engineers

**TLDR:** Skills are executable procedure packages—YAML metadata plus markdown instructions plus optional scripts and templates—that teach AI agents how to do your team's work the way you do it, following an open SKILL.md standard across 20+ platforms.

**Summary:** Skills solve knowledge loss. Every time someone explains "how we do our linting" or "how to generate a migration for our ORM," that knowledge evaporates when the conversation ends. Skills package that procedural knowledge into version-controlled files that agents load on demand.

A skill isn't a configuration file or a prompt template. It's a procedure—actual instructions describing how your team accomplishes a specific task. The open standard uses a simple structure: a directory with SKILL.md as the entry point. SKILL.md contains YAML frontmatter (name, description, dependencies) and markdown body (the actual how-to instructions).

The description field is the trigger mechanism. Claude reads every skill's description to decide if it should load for your request. A good description tells Claude not just what the skill does but when to use it. The body explains the why behind each step, includes examples of good output, and structures the work in imperative form—"do this," not "you might consider."

Skills load efficiently in three tiers. Metadata (name and description) is always loaded. The full SKILL.md body loads only when the skill triggers. Scripts and reference materials load on demand. This keeps your context efficient while giving you room to bundle complex workflows.

**Key takeaways:**
- Skills capture procedural knowledge that would otherwise be lost when conversations end
- The description field is the primary trigger—invest time making it specific and include context clues
- Skills 2.0 moved from saved prompts to executable workflows with scripts, templates, and dynamic loading

**Why do I care:** Building reusable skills is how you scale your AI workflows across teams. Without them, you're re-explaining the same processes constantly.

**Link:** [Agent Skills 101: a practical guide for engineers](https://blog.serghei.pl/posts/agent-skills-101/)

---

## GitHub - mksglu/context-mode: Context window optimization for AI coding agents

**TLDR:** Context Mode sandboxes tool output (98% reduction), tracks session continuity via SQLite with FTS5 indexing, and enforces sandbox-first execution across 12+ platforms.

**Summary:** Every MCP tool call dumps raw data into your context. A Playwright snapshot costs 56 KB. Twenty GitHub issues cost 59 KB. After 30 minutes, 40% of your context is gone. Context Mode solves all three sides of this problem with sandboxing, session continuity, and code-first analysis.

Sandboxing keeps raw data out of context. Instead of reading a 56 KB Playwright snapshot, you write code that analyzes the snapshot and logs only the result. Instead of reading 50 files into context to understand structure, you write a script that counts functions and outputs the answer. One script replaces ten tool calls and saves 100x context. This is the paradigm shift: stop treating the LLM as a data processor, start treating it as a code generator.

Session continuity is the second layer. Every file edit, git operation, task, error, and user decision gets tracked in SQLite with FTS5 full-text search. When the conversation compacts and would normally lose context, Context Mode doesn't dump the data back into context—it indexes events and retrieves only what's relevant via BM25 search. The model picks up exactly where you left off.

The tool sandboxes execution across JavaScript, TypeScript, Python, Shell, Ruby, Go, Rust, PHP, Perl, R, and Elixir. Commands are permission-controlled—the same permission rules you set for Claude Code apply inside the sandbox. If you block sudo, it's blocked in the sandbox too.

**Key takeaways:**
- Sandbox tool output to avoid context bloat—let the LLM analyze data, not read raw data
- Session tracking lets agents resume work across compaction without losing state
- Multi-language execution support means you can analyze codebases and systems in their native languages

**Why do I care:** Long-running agent tasks require session continuity. Context Mode makes it possible to have conversations that span hours without forgetting working state.

**Link:** [GitHub - mksglu/context-mode: Context window optimization for AI coding agents](https://github.com/mksglu/context-mode)
