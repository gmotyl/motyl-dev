---
title: "Kilo Code Weekly: CLI Bounties, Free Autocomplete, and Platform Updates"
excerpt: "This week's Kilo updates include $500 CLI contribution bounties, free autocomplete via Mistral, JetBrains improvements, and new Cloud Agent demos."
publishedAt: "2026-01-15"
slug: "kilo-code-weekly-cli-bounties-autocomplete"
hashtags: "#kilocode #ai #devtools #vscode #jetbrains #cli #open-source #generated #en"
---

## CLI Contribution Bounty: Earn Up to $500

**TLDR:** Kilo is offering $500 for the top merged PR to their CLI and $150 for any merged PR. They're paying contributors to ship meaningful improvements to the command-line interface.

Open source contribution bounties are an interesting model for accelerating development while rewarding the community. Kilo is putting real money behind their CLI development—$500 for the best contribution, $150 for any merged PR. This signals that they're serious about CLI as a first-class interface, not just an afterthought to the VS Code extension.

For developers looking to contribute to open source while earning something tangible, this is a concrete opportunity. The CLI is where power users often spend their time, and improvements there can have outsized impact on workflows.

**Link:** [CONTRIBUTING.md](https://github.com/Kilo-Org/kilocode/blob/main/CONTRIBUTING.md)

---

## Free Autocomplete with Mistral's Codestral

**TLDR:** Mistral's free tier provides autocomplete at zero cost. Setup takes minutes and gives you inline suggestions without spending anything.

The barrier to trying AI-powered autocomplete just dropped to zero. By leveraging Mistral's Codestral model through their free tier, Kilo users can get inline code suggestions without any cost. The setup process is straightforward: create a profile in Kilo settings, select Mistral as the provider, generate an API key from Mistral AI Studio, and paste it in.

For teams evaluating AI coding tools, this removes the "I need budget approval" blocker. Developers can experiment with autocomplete on personal projects or evaluate the quality before committing to paid tiers. The documentation includes both written guides and video walkthroughs for different learning preferences.

**Link:** [Setting Up Mistral for Free Autocomplete](https://kilo.ai/docs/basic-usage/autocomplete/mistral-setup)

---

## VS Code & JetBrains Extension Updates

**TLDR:** New features include skills notifications, better proxy support, and QR code-based device authorization for faster gateway connections.

The IDE extensions received several quality-of-life improvements:

**Skills Notifications** let you know when skills are added or removed from your configuration. This is useful when working in teams where configuration might change, or when troubleshooting why something isn't behaving as expected.

**Better Proxy Support** improves handling of VSCode's HTTP proxy settings. For developers in corporate environments where everything goes through a proxy, this removes friction that previously caused connection issues.

**Device Authorization Flow** introduces QR code-based authentication for connecting to Kilo Gateway. Instead of copying tokens back and forth, scan a code and you're connected. Faster onboarding means less time fighting authentication and more time coding.

---

## Autocomplete Improvements

**TLDR:** JetBrains autocomplete now works out of the box, unhelpful suggestions are filtered automatically, and duplicate suggestions are eliminated.

Three autocomplete improvements ship this week:

**JetBrains Enabled by Default** means IntelliJ, PyCharm, and other JetBrains IDEs get autocomplete working immediately without configuration. The previous opt-in model created friction—now it just works.

**Smarter Filtering** automatically removes unhelpful suggestions. AI autocomplete can be noisy when it suggests obvious completions or irrelevant code. Filtering reduces the cognitive load of evaluating each suggestion.

**Duplicate Prevention** fixes an annoying bug where the same suggestion appeared multiple times in menus. Small polish, but these details matter for the moment-to-moment experience of using the tool.

---

## CLI Updates: Attachments, Condense, and Performance

**TLDR:** New `--attach` flag for file attachments, `/condense` and `/compact` commands for conversation cleanup, and performance improvements by skipping VSCode diagnostics.

The CLI continues to mature with practical improvements:

**File Attachments** via the `--attach` flag let you include files directly from the command line. Useful for providing context without copy-pasting file contents into prompts.

**Condense & Compact** commands clean up conversation history without losing context. Long sessions accumulate cruft, and these commands let you trim it down while preserving the important state.

**Performance Boost** from skipping VSCode diagnostics speeds up CLI operations. When running from the terminal, you don't need the IDE's diagnostic feedback, so eliminating that overhead makes everything snappier.

---

## App Builder Updates: Database Migrations and Admin Dashboard

**TLDR:** App Builder now supports database migrations with automatic credential injection, plus a new admin dashboard for managing projects and deployments.

Two infrastructure improvements for App Builder users:

**Database Migrations** support means deployments can now handle schema changes properly. The DB Proxy client handles automatic credential injection, so you don't have to manage connection strings manually across environments. This is the kind of unsexy infrastructure work that makes the difference between a toy and a production tool.

**Admin Dashboard** provides a new interface for managing projects and deployments. As App Builder usage grows, having centralized visibility becomes essential for teams.

---

## Open Source Sponsorship Program

**TLDR:** Kilo offers Enterprise access, Code Reviews, and credits to qualifying open source projects.

Open source maintainers can apply for Kilo Enterprise, Code Reviews, and credits at no cost. This is a smart way to get the tool into influential hands while supporting the ecosystem that makes modern development possible.

For maintainers, the proposition is straightforward: you get access to enterprise features, Kilo gets exposure in projects that developers trust. Worth investigating if you maintain an OSS project.

**Link:** [Open Source Sponsorship](https://kilo.ai/oss)

---

## Community Contributors

This week's contributors include **@mcowger** who worked on restoring and adding providers to the modelCache endpoint for background refresh, and **@Drilmo** who contributed local CLI build improvements, Cmd+V image paste support, and paste truncation fixes in the VSCode terminal.

**Link:** [Kilo Code GitHub](https://github.com/Kilo-Org/kilocode)

---

*This article was generated from newsletter content. For the original source and to subscribe, visit the links above.*