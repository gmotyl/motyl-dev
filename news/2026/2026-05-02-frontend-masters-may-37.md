---
title: 'npm Supply Chain Attack, Claude Opus 4.7, TypeScript 7.0 Beta, and More'
excerpt: 'This week: SAP npm packages compromised in credential-stealing supply chain attack, Claude Opus 4.7 tops SWE-bench, TypeScript 7.0 Beta written in Go is 10x faster, pnpm 11.0 requires Node.js 22+, and new JavaScript features shipping in ES2025/ES2026.'
publishedAt: '2026-05-02'
slug: 'frontend-masters-may-37'
hashtags: '#frontendmasters #frontend #typescript #javascript #ai'
---

## TLDR

- SAP-related npm packages compromised in supply chain attack, stealing GitHub and npm tokens
- Claude Opus 4.7 is the new coding champion, topping SWE-bench
- TypeScript 7.0 Beta is 10x faster, rewritten in Go
- pnpm 11.0 drops Node.js 21 support, requires Node 22+
- JavaScript ES2025 and ES2026 bring iterator helpers, Set methods, Map.getOrInsert, and more

## Summary

### SAP npm Packages Compromised in Credential-Stealing Attack

A new supply chain attack campaign called "Mini Shai-Hulud" has compromised SAP-related npm packages (@cap-js/db-service, @cap-js/postgres, @cap-js/sqlite, and mbt). The malicious packages, published on April 29, 2026, added a preinstall script that downloads and executes a Bun binary to steal credentials from developers.

The malware harvests GitHub and npm tokens, GitHub Actions secrets, and cloud credentials from AWS, Azure, GCP, and Kubernetes. It also injects malicious Claude Code and VS Code settings into every accessible GitHub repository, making this one of the first supply chain attacks to target AI coding agent configurations.

Safe versions have been released: @cap-js/sqlite v2.4.0, @cap-js/postgres v2.3.0, and mbt v1.2.49.

### Claude Opus 4.7 Tops SWE-bench

Anthropic has released Claude Opus 4.7, which scores 0.715 on internal research-agent benchmarks and resolves 3x more production tasks than Opus 4.6 on Rakuten-SWE-Bench. It's now available across all Claude products and APIs at the same pricing as Opus 4.6.

### TypeScript 7.0 Beta Is 10x Faster

Microsoft has ported TypeScript from JavaScript to Go, resulting in a TypeScript 7.0 Beta that's approximately 10 times faster than TypeScript 6.0. The new compiler uses shared memory parallelism and is highly compatible with existing TypeScript 6.0 behavior. Install via `npm install -D @typescript/native-preview@beta` and run with `npx tsgo`.

### pnpm 11.0 Requires Node.js 22+

pnpm 11.0 drops support for Node.js 18-21, requires Node 22+, and is now pure ESM. It introduces stricter security defaults (minimumReleaseAge: 1440, blockExoticSubdeps: true), replaces the JSON-per-package store with SQLite, and removes the npm CLI fallback for publishing.

### What's New in JavaScript (ES2025/ES2026)

ES2025 and ES2026 bring significant improvements: iterator helpers (`.map()`, `.filter()`, `.take()`, `.toArray()` on iterators), Set methods (`.union()`, `.intersection()`, `.difference()`), `Map.getOrInsert()`, `Math.sumPrecise()`, JSON modules, `Promise.try()`, and `Error.isError()`. The using keyword for automatic resource cleanup is also shipping in Chrome 134+ and Node 24+.

## Key Takeaways

1. **Supply chain attacks are evolving** — attackers now target AI coding agent configurations, not just npm packages
2. **TypeScript is no longer JavaScript-based** — the Go rewrite delivers 10x performance gains
3. **JavaScript is catching up** — features like iterator helpers, Set operations, and Map.getOrInsert eliminate common pain points
4. **Resource cleanup is being standardized** — the using keyword provides Python-like automatic cleanup

## Why I Care

As a senior frontend dev, I'm paying close attention to the supply chain attack evolution. The fact that attackers are now injecting malicious settings into `.claude/settings.json` and `.vscode/tasks.json` is concerning — it means even developers using AI assistants aren't safe.

On the positive side, TypeScript 7.0 Beta's performance improvements could meaningfully speed up our build pipelines. The Go rewrite has been in the works for over a year, and testing with major companies like Vercel, Notion, and Linear shows real-worldbenefits.

And the JavaScript improvements? They're long overdue. I've written countless manual Set intersection loops and Map.getOrInsert patterns over the years. Having these in the language will clean up a lot of utility code.

**Link:** [SAP-Related npm Packages Compromised](https://thehackernews.com/2026/04/sap-npm-packages-compromised-by-mini.html)

**Link:** [Introducing Claude Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7)

**Link:** [Announcing TypeScript 7.0 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/)

**Link:** [pnpm 11.0](https://pnpm.io/blog/releases/11.0)

**Link:** [What's actually new in JavaScript](https://neciudan.dev/whats-new-in-javascript)