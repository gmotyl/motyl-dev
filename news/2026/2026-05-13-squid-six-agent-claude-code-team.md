---
title: "Squid and the Move from Vibe Coding to a Six-Agent Claude Code Team"
excerpt: "Paul Iusztin's Squid setup runs six specialized Claude Code agents through a night-long lifecycle that ships pull requests with green CI."
publishedAt: "2026-05-13"
slug: "squid-six-agent-claude-code-team"
hashtags: "#ai #decoding-ai #agents #claude #tdd #ddd #generated #en"
source_pattern: "Decoding AI"
---

## From Vibe Coding to a Real Engineering Team

**TLDR:** Paul Iusztin tried to vibe code a TypeScript harness, watched it collapse on the rough edges, and rebuilt the workflow as a six-agent Claude Code setup called Squid. The system splits product management, engineering, testing, review, and on-call into separate agents that run an end-to-end lifecycle from feature spec to merged PR with green CI.

**Summary:** The piece opens with a confession I appreciate. Iusztin needed a TUI plus an agent loop with MCP, skills, and slash commands, and he tried to one-shot it with a single agent driving the keyboard. The code looked done. Then the rough edges showed up. Only the first 20 characters rendered in the TUI, skills never fired through the agent loop, and the debt accumulated faster than the next feature could ship. So he deleted the codebase and started again, this time treating the agent not as a coworker but as a team that needs structure around it.

The new approach is what he calls agentic coding rather than vibe coding. You still aim for the agent to write the whole codebase, but you scope features into tasks, you run them through a real engineering process, and you do not let one agent both write the code and judge whether the code is correct. Squid bakes this into six roles. A product manager agent writes ADRs and maintains a Domain-Driven Design glossary so vocabulary stays consistent. A software engineer agent runs red-green TDD using direct CLIs like git, mongosh, and gh instead of MCP wrappers, on the theory that LLMs have seen far more bash than wrapper APIs. A tester agent runs only the adversarial edge-case pass, accepting the engineer's reports on formatting and happy-path tests to avoid paying for everything twice.

A PR reviewer agent does a diff-only pass for dead code, duplication, missing coverage, and documentation drift, with explicit instructions not to micro-optimize one-off scripts. An on-call agent loops on CI until it goes green, after Iusztin found that embedding the CI check inside the engineer-tester loop made the step get skipped constantly. A self-improve meta agent can propose edits to CLAUDE.md, skills, and subagents after a run, but only with a human gate, because that loop can degrade your workflow as easily as it can improve it.

The lifecycle is called the /night skill. It takes a written spec and produces a merged pull request with green CI, with two human gates and five retry caps along the way. The first gate is plan approval, optionally sharpened by a /grill-me skill inspired by Matt Pocock that forces the agent to ask sharp questions about anything fuzzy. The inner loop is engineer plus tester, capped at five attempts. Then PM acceptance review at three attempts. Then PR reviewer at three. Then on-call watching CI at five. A leaner /day skill runs only the engineer and tester loop for surgical edits to already-merged code.

Iusztin closes with a strong opinion on scaffolding. He argues that Jinja-style cookiecutter templates are a maintenance tax disguised as productivity, especially across multiple language stacks. His /scaffold skill replaces them with markdown specifications, a decision tree the agent navigates interactively, and a structure organized by bounded context rather than by file type. He has open-sourced Squid as a Claude Code plugin at iusztinpaul/squid.

**Key takeaways:**
- Separate the agent that writes code from the agent that judges it, with explicit retry caps on every judgment loop
- Anchor every agent in shared documentation: ADRs for non-obvious decisions and a DDD glossary for canonical names across code, schemas, and customer-facing copy
- Use a long-running /night lifecycle for full features and a lean /day loop for surgical edits inside already-merged code
- Prefer direct CLIs over MCP wrappers in the engineer agent because LLMs have seen more bash, and trim duplicate work between engineer and tester to keep the pipeline fast
- Replace cookiecutter templates with markdown skills and a decision-tree scaffold, organized by bounded context rather than by file type

**Why do I care:** As a senior frontend dev, I have been on both sides of the vibe-coding line and I recognize the failure mode. The PR looks fine, the demo works, and then a week later the rough edges eat the team. What I want to steal from Squid is not the six agents specifically but the discipline around them. Treating ADRs and a glossary as the agent's spine forces me to write down the things I usually carry in my head, which pays off whether or not Claude is in the loop. The split between an engineer agent that uses CLIs and a tester agent that only runs the adversarial pass maps cleanly onto how I already think about a PR author versus a reviewer, and the retry caps are the kind of guardrail I would not have added on my own. The /day versus /night split also matches how I actually work, surgical edits during the day and long-running feature work overnight, so the pattern is portable even if I never touch Squid itself.

**Link:** [From Vibe Coding to a Real Engineering Team](https://www.decodingai.com/p/squid-my-agentic-coding-setup-may-2026)
