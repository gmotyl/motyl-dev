---
title: 'Bytes: Zed 1.0, Remix 3, and the npm Supply Chain Attack'
excerpt: 'Zed hits 1.0 with a Rust-based GPUI framework, Remix 3 goes full stack, and Intercom gets hit by another npm attack. Plus: Meticulous, Agentspan, and the week in links.'
publishedAt: '2026-05-01'
slug: 'uidev-bytes-483-zed-not-dead'
hashtags: '#uidev #zed #remix #npm #security'
---

## TLDR

- Zed finally hit 1.0 after five years and 1,000+ releases, built on a custom Rust UI framework called GPUI instead of Electron
- Remix 3 beta preview rethinks the full stack — routes are Fetch API routes, controllers return responses, middleware owns the request lifecycle
- Intercom npm package was compromised in a supply chain attack that harvested Kubernetes and Vault credentials
- Meticulous automates e2e testing without writing tests. Agentspan adds durable execution to AI agents.

## Zed Is Not Dead

After five years and more than 1,000 releases, Zed hit 1.0. Let that sink in — a code editor that spent half a decade in development, built by the creators of Atom and Electron, finally ready for production.

The irony is thick. Zed's biggest competitors (VS Code, Cursor) are built on Electron, the cross-platform framework Zed's creators built at GitHub and then rejected. The Zed team felt that building on a browser engine put a ceiling on what they could build, so they spent years constructing something closer to a video game architecture.

What makes Zed different:

- GPUI, an in-house Rust UI framework that makes editing across buffers extremely fast
- AI-native: runs multiple agents in parallel without choking, integrates with Claude Code, Codex, and OpenCode via their Agent Client Protocol (ACP)
- DeltaDB, a CRDT-based sync engine that gives operation-level version control — roll back a single character insertion, not a whole commit

Was it worth it? Financially, maybe not — Cursor is reportedly being bought for $60 billion. But Zed opens faster. Whether that matters when you have a $60 billion editor is a question worth asking.

## Remix 3: The Full Stack Rethink

The Remix team dropped the beta preview, and it is a significant departure from prior versions.

Remix 3 is "full stack" in a way that prior versions were not. Not just routing and rendering — routes, request handlers, responses, middleware, sessions, auth, forms, uploads, assets, data and database management, UI components, theming, networking, tests. All under one umbrella.

The architectural shifts are worth understanding:

- Routes are Fetch API routes. Controllers return responses. This is closer to the metal than React Server Components.
- Frames are server-rendered UI with a src — the client loads, navigates, or reloads independently while the server keeps rendering HTML.
- "Unbundling" means the runtime is the source of truth, not the bundler. The app model does not depend on pre-runtime analysis.

The framing on AI is explicit: "AI rewards frameworks with clear shapes." Routes in one place, controllers that return responses, middleware that owns lifecycle concerns, tables for data, forms that submit to URLs. These are durable concepts that give agents solid building blocks.

I have mixed feelings about this. On one hand, the simplicity argument is compelling — you should be able to install Remix and start building without stitching together a dozen dependencies. On the other hand, there is something to the idea that the "full stack" framing might close doors that other approaches keep open.

But the direction is clear: Remix wants to be the framework for building with AI agents, not just for humans.

## The Intercom npm Attack

Another week, another npm supply chain attack.

The intercom-client package was compromised in what looks like the same "Mini Shai-Hulud" campaign that hit several packages this week. Version 7.0.4 contained malicious files:

- setup.mjs runs during installation and downloads an unverified Bun binary from GitHub
- router_runtime.js is an 11.7 MB heavily obfuscated file that harvests Kubernetes and Vault credentials from environment variables and local files

The attack exfiltrates credentials through GitHub API. If you installed intercom-client@7.0.4, rotate your credentials immediately. The malicious code runs during installation, so you do not even need to import the package to be affected.

The pattern is consistent with the broader Shai-Hulud campaign: compromised GitHub accounts pushing workflow changes that access secrets and exfiltrate them through GitHub Actions artifacts.

## The Rest

- **Meticulous** — Automated e2e testing without writing tests. Records your interactions, generates tests that cover every line of your codebase, runs in parallel. Used by Dropbox, Notion, LaunchDarkly. Built by ex-Palantir engineers.
- **Agentspan** — Adds durable execution to AI agents. If your process dies, the agent resumes from the exact step. Open source, built on Conductor (the orchestration engine used at Netflix, LinkedIn, Tesla).
- **Resend chart component** — Now you can embed bar, line, and area charts in emails. Rendered as images to ensure consistency across email clients.
- **Astro 6.20** — Shipped with an SVG optimizer and experimental new logger.
- **Cursor TypeScript SDK** — Lets you invoke coding agents programmatically from CI pipelines or backend services.

## Key Takeaways

- Zed 1.0 uses GPUI, a Rust-based UI framework instead of Electron. It opens fast.
- Remix 3 beta: full stack means full stack — all the pieces under one roof, routes as Fetch API routes
- Intercom npm was compromised — check your dependencies, rotate credentials if affected
- Meticulous and Agentspan are two tools worth watching for teams shipping AI agents

**Link:** [Bytes #483 - Zed's not dead](https://bytes.dev/archives/483)
**Link:** [Remix 3 Beta Preview](https://remix.run/blog/remix-3-beta-preview)
**Link:** [Intercom's npm Package Compromised](https://socket.dev/blog/intercom-s-npm-package-compromised-in-supply-chain-attack)