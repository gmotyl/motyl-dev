---
title: "Building Personal Software: MCP Servers for Claude Code"
excerpt: "A practical walkthrough on creating custom MCP servers that give Claude Code capabilities shaped exactly around your workflow, including security habits that most people skip."
publishedAt: "2026-05-11"
slug: "building-personal-software-mcp-servers-claude-code"
hashtags: "#thecircuit #mcp #claude-code #ai-agents #python #developer-tools #generated #en"
source_pattern: "TheCircuit"
---

## Building Personal Software: How to Create MCP Servers for Claude Code

**TLDR:** A custom MCP server is roughly sixty lines of Python that gives Claude Code a new capability shaped exactly around your workflow. You can build one in an afternoon by talking to Claude Code, and the article walks you through the whole thing, including the security habits you absolutely cannot skip.

**Summary:**

The article opens with a scenario that is both practical and a little theatrical: you are watching your kid's football match, you ask Claude Code on your phone to research EU AI regulation, and by the time you are back from the lemonade break, a formatted research report is in your inbox. Every piece of that is real today. The phone-to-laptop remote control, the custom research tool calling Perplexity, the email delivery. The author's point is not that the scenario is impressive. The point is that the piece making it personal, the piece that turns a generic assistant into one that actually knows your work, is a custom MCP server, and that server is smaller than you probably think.

The distinction the author draws between Skills, MCP servers, and plugins is genuinely useful, and worth internalizing before you start building. A Skill is a text file written in plain English that teaches Claude how to do something, encoding your process and preferences. An MCP server is actual software that gives Claude a new capability, something it can invoke against the outside world, like calling an API, reading your CRM, or sending an email. A plugin bundles both together. The author is blunt about the order of operations here: install official MCP servers from the companies that built your tools first, Granola, Notion, Slack, Stripe, and so on. Build your own only when no maintained server fits the shape of your actual workflow. Once you have done it once, he says, the next one is a twenty-minute job.

The build itself is deliberately minimal. You install uv, which is a Python toolchain that handles environment isolation without you thinking about it, create a project folder, and then paste a single prompt into Claude Code describing the tool you want. Claude Code writes four files: the project config, a server file with a single function that calls Perplexity's sonar-pro API, an example secrets file, and a gitignore that keeps your API key out of version control. The function itself is short, but the author correctly identifies the most important part of the entire file: the plain-English description attached to the function. That description is what Claude reads when deciding whether to use the tool at all. If the description is vague, Claude will not reach for it reliably.

The security section is where the article earns its keep. The author does not treat security as a disclaimer. He treats it as architecture. Four habits: run each server in its own uv virtual environment so dependencies stay isolated, scope every API key to the minimum permissions needed with usage caps where the service supports them, keep secrets in dot-env files that never enter git, and use stdio transport so the server only talks locally to Claude Code running on your machine and is never exposed to a port on the internet. The underlying logic is simple: once an MCP server is running, it has your permissions. It can read your shell history, your environment files, your browser cookies, everything. This is not theoretical. The TeamPCP supply-chain attack in March 2026 compromised legitimate packages on PyPI through stolen maintainer tokens, and PyPI tracked around twelve hundred unique malicious packages in December 2025 alone. AI credentials specifically jumped eighty-one percent year over year.

The article closes by connecting the MCP server to a broader philosophy the author calls N=1 disposable software. Built for one person, running on one machine, doing one job. The first version will be wrong in five small ways. You will see them the third time you reach for the tool. You go back to Claude Code, describe what you noticed, and the tool changes in two minutes. This is the loop. The author is not positioning this as a product or a platform. He is positioning it as a living system that you Kaizen continuously, the same way you tune everything else in your workflow.

**Key takeaways:**

- A Skill is plain-English instructions for Claude; an MCP server is runnable software that gives Claude a new ability. Know the difference before you start.
- Install official MCP servers from the companies that built your tools before building your own. Build only when no maintained server fits your specific workflow.
- The plain-English function description inside the server file is the most important part. It determines whether Claude reaches for the tool at all.
- Use uv for Python environment isolation, stdio transport to keep the server local, and dot-env files for secrets. These are not optional hardening steps; they are the baseline.
- Community MCP servers on GitHub or npm carry real supply-chain risk. The same attack patterns that hit PyPI in 2025 and 2026 apply directly to MCP servers, which travel through the same channels.
- Treat the server like a living system: version it in git, sample what it returns, and update it when you notice the output does not match what you actually need.

**Why do I care:**

This article gets something right that most AI tooling content avoids: it does not separate capability from risk. The security section is not at the end as a CYA paragraph. It is integrated into the reasoning for why you build your own server in the first place. The supply-chain angle is real and I think most developers working with MCP today are underestimating it. The part I would push back on is the framing around ease. "A thirty-minute job" is accurate if you already have Claude Code installed, have an API key ready, and are comfortable enough with a terminal to paste commands without panicking. For the knowledge workers and solopreneurs the author is targeting, that last condition is doing a lot of work. The article does try to address this with step-by-step terminal instructions, but the gap between "follow these steps" and "understand what you just built well enough to debug it at midnight" is wider than thirty minutes implies. The personal software philosophy is genuinely compelling. The idea that your tools should bend around your workflow rather than the other way around, that you are the architect of your own AI harness and not just a user of someone else's product roadmap, is the right framing. I just think the security bar for MCP servers running with your own permissions is high enough that the "talk to Claude Code and it writes it for you" pitch needs to be paired with a slower, more honest conversation about what you are actually running on your machine.

**Link:** [How to create MCP servers for Claude Code](https://metacircuits.substack.com/p/how-to-create-mcp-servers-for-claude)
