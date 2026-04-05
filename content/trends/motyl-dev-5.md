---
issueNumber: 5
week: '2026-w13'
weekLabel: 'Week 13 (Mar 23 – Mar 29, 2026)'
publishedAt: '2026-04-05'
---

# motyl.dev Weekly #5: Week 13 (Mar 23 – Mar 29, 2026)

> A curated digest of what the community found worth reading this week.

Supply chain security dominated the conversation this week — two separate takes on the Axios npm compromise and a cautionary tale about Claude Code's source leaking through npm source maps. Meanwhile, TypeScript 7.0's Go rewrite is no longer a rumor but a migration guide, Kent Beck is applying TCR discipline to AI-assisted coding, and the community is debating whether GitHub still earns its crown in the age of AI-native development. Plenty to dig into.

## AI

**[The Complete Guide to AI Agent Memory Files (CLAUDE.md, AGENTS.md, and Beyond)](https://hackernoon.com/the-complete-guide-to-ai-agent-memory-files-claudemd-agentsmd-and-beyond)**
A thorough walkthrough of the memory file conventions that have emerged across AI coding agents — from Anthropic's CLAUDE.md to the broader AGENTS.md pattern. If you're setting up agent workflows in your repo and want to understand what each file does and how they interact, this is the reference to bookmark.

**[Introducing the Vercel plugin for coding agents](https://vercel.com/changelog/introducing-vercel-plugin-for-coding-agents)**
Vercel now ships a plugin that gives AI coding agents direct access to deployments, logs, and project configuration. The goal is to close the feedback loop — agents can deploy, inspect the result, and iterate without leaving the coding session.

## Coding

**[TypeScript 7.0 Project Corsa: Go Rewrite Migration Guide](https://app.daily.dev/posts/n3Zhhh85X)**
The long-rumored Go rewrite of the TypeScript compiler is happening. This migration guide covers what teams need to know: what changes, what breaks, and how to prepare your codebase. The performance gains are dramatic — 10x faster type-checking in benchmarks — but the transition path has sharp edges that are worth understanding before you upgrade.

**[Genie Sessions: TCR Skill](https://tidyfirst.substack.com/p/genie-sessions-tcr-skill?publication_id=256838&post_id=192641476&play_audio=true&triedRedirect=true)**
Kent Beck explores applying TCR (test && commit || revert) as a discipline for working with AI coding assistants. The constraint forces smaller, verifiable steps — exactly the kind of workflow that keeps agents honest.

**[Welcome To Instructor](https://python.useinstructor.com/)**
Instructor is a Python library for getting structured output from LLMs using Pydantic models. If you've been hand-rolling JSON parsing from model responses, this handles validation, retries, and streaming out of the box.

## Frontend

**[What's New on the Web Platform — March 2026](https://web.dev/blog/web-platform-03-2026)**
The monthly roundup from web.dev covering new browser APIs and platform changes that landed in March. A good way to stay current without tracking individual browser release notes.

**[No AI in Node.js Core](https://github.com/indutny/no-ai-in-nodejs-core)**
A community-driven position against bundling AI capabilities into Node.js core. The argument: keep the runtime lean and let the ecosystem handle AI integrations through packages. The discussion in the issues is as interesting as the proposal itself.

## Tools

**[Does GitHub still merit "top git platform for AI-native development" status?](https://newsletter.pragmaticengineer.com/p/does-github-still-merit-top-git-platform)**
Gergely Orosz examines whether GitHub's dominance holds up in a world where AI-native development workflows are reshaping how teams interact with source control. The piece weighs Copilot's head start against emerging alternatives and asks hard questions about lock-in, pricing, and whether the moat is as deep as it looks.

## Architecture

**[We built an org-wide AI agent in 4 days. Here's what broke in the weeks after.](https://app.daily.dev/posts/tdNgi1Q4D)**
A refreshingly honest post-mortem of deploying an AI agent across an entire organization. The build was fast; the real work started when edge cases, permission boundaries, and user expectations collided with reality. Required reading if you're planning a similar rollout.

**[The Site-Search Paradox: Why The Big Box Always Wins](https://www.smashingmagazine.com/2026/03/site-search-paradox-why-big-box-always-wins/)**
Smashing Magazine digs into why site search on most e-commerce platforms underperforms compared to general-purpose search engines. The paradox: the more products you have, the worse your internal search tends to get — and the solutions are more about information architecture than search algorithms.

## General

**[The Axios Supply Chain Attack: What DevOps Teams Need to Know](https://app.daily.dev/posts/9Bs0jITq3)**
A breakdown of the Axios npm package compromise that injected a remote access trojan. Covers the attack vector, detection timeline, and what your team should check in their dependency tree right now.

**[Axios npm Package Compromised With Remote Access Trojan](https://laravel-news.com/axios-npm-package-compromised-with-remote-access-trojan)**
A complementary take on the same Axios incident, with a focus on the Laravel ecosystem's exposure. Two perspectives on the same supply chain attack — worth reading both if your stack depends on Axios.

**[Claude Code Source Leaked via npm Source Maps: Lessons for Every DevOps Team](https://app.daily.dev/posts/nOFJ29Zgp)**
Anthropic's Claude Code CLI had its source exposed through npm source maps — an unintentional leak, not a breach. The takeaway is broader: if you're publishing compiled packages to npm, check what your source maps reveal.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
