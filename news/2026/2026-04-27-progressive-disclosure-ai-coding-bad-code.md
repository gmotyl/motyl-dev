---
title: "Progressive Disclosure, Bad Code, and the AI Coding Revolution"
excerpt: "Luca explores how to use AI for coding while avoiding bad code, the concept of progressive disclosure of complexity, and why architecture still matters."
publishedAt: "2026-04-27"
slug: "progressive-disclosure-ai-coding-bad-code"
hashtags: "#refactoring #ai #coding #architecture #software-engineering #generated #en"
source_pattern: "🌀 Refactoring"
---

## Bad Code vs Misaligned Code

Luca makes an interesting distinction that's worth thinking about. He splits tech debt into two categories: bad code and misaligned code. Bad code is the stuff we all recognize, lack of tests, high complexity, tight coupling, duplication, outdated libraries. It's bad regardless of business context, and we know it increases lead time, outages, and maintenance cost.

Here's the provocative part: as of today, this kind of debt is largely avoidable if you choose to enforce quality. On his Tolaria project, AI-generated code must meet three gates: high test coverage, strong CodeScene health scores, and current library and docs usage. These rules live in both CLAUDE.md and CI, because agents still forget or ignore instructions. Once those checks are in place, the basics can be trusted without manually reviewing every line.

Misaligned code is harder and definitely not solved yet. Code may be clean, tested, and well-structured, but still wrong for the product direction you want. It's code that is a good circle when you really needed a square: a leaky abstraction, an old design assumption, or a model that no longer matches intent. Reviewing architecture and abstractions still feels supremely important, because they're the things that the AI model cannot figure out by itself, because they are about what you want to build in the future, and why.

## Progressive Disclosure of Complexity

Luca interviewed Guillermo Rauch, founder and CEO of Vercel, and one principle that stuck was what he called the progressive disclosure of complexity. A defining feature of great tech is that it's approachable for beginners but powerful enough for enterprise needs.

Guillermo draws inspiration from products like the iPhone, which can be used by both children and the elderly while still serving business professionals with complex needs. His approach to API design focuses on what he calls token minimization, requiring minimal code to get started, then gradually introducing more sophisticated features as needed.

A new Next.js project can be started with just a few lines of code. Complexity is only introduced when needed for specific requirements. And the technology that powers a beginner's first project is the same that can scale to handle millions of users. This principle applies to everything they build, and it's something worth keeping in mind when designing any system that might grow.

## Salesforce Agentforce at TDX

Conor Bronsdon covered TDX last week, and the big news was Agentforce, now Salesforce's fastest-growing product. There were 60 new MCP tools in Headless 360, Agent Script was open-sourced on GitHub, Agentforce Vibes 2.0 launched as their vibe coding tool, and new Slack agent capabilities were announced.

Salesforce went as far as publishing the full language spec, grammar, parser, and compiler for their agent-definition language. They're betting an open agent ecosystem wins developer adoption, while enterprise-grade upgrade paths let businesses actually ship reliable agents to production.

## Key Takeaways

- Bad code is largely avoidable with proper AI tooling, but misaligned code still requires human architecture decisions
- Progressive disclosure of complexity is a design principle worth borrowing for any system
- AI models can handle the mechanical aspects of coding, but strategic thinking about what to build remains a human domain

## Why Do I Care

The distinction between bad code and misaligned code resonates with my experience. I've been using AI coding tools for a few months now, and the quality of the mechanical code has been surprisingly good. What I still find myself doing is thinking hard about the architecture before I let the AI write anything substantial.

The progressive disclosure principle is something I try to apply when building APIs. It's easy to expose everything upfront and create a confusing interface, but starting simple and adding complexity only when needed creates a much better experience for consumers.

The Salesforce move toward open agent specifications is interesting. They're not just building a closed product; they're trying to create an ecosystem. That approach tends to win in the long run, even if it takes longer to get started.

**Link:** [Bad code, progressive complexity, and weekly readings](https://refactoring.fm/p/bad-code-progressive-complexity-and?publication_id=64099&post_id=195341968&isFreemail=true&triedRedirect=true)