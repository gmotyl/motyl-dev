---
title: "Gas Town by Kilo Goes Live With Federated AI Work Coordination via the Wasteland"
excerpt: "Kilo launches Gas Town as a managed cloud service for multi-agent orchestration, paired with the Wasteland — a federated reputation system for distributed AI-powered software development."
publishedAt: "2026-05-20"
slug: "gas-town-kilo-wasteland-federated-ai-orchestration"
hashtags: "#kilo #ai #agents #architecture #open-source #engineering #generated #en"
source_pattern: "Kilo"
---

## Gas Town by Kilo is Here, With Wasteland Built In

**TLDR:** Kilo has made Gas Town generally available as the only cloud-hosted version of Steve Yegge's multi-agent orchestration framework. It launches alongside the Wasteland, a federated system for distributing AI-powered development work across independent developers and teams.

**Summary:** Steve Yegge built Gas Town as a multi-agent orchestrator. The idea was to give a single developer the output of a small engineering team by coordinating specialized AI agents — polecats, in Gas Town's terminology — under a central coordinating agent called the Mayor. The self-hosting requirement was real friction: tmux wrangling, CLI tools, Dolt, DoltHub, the whole stack assembled by hand. Kilo took that stack and put managed infrastructure around it, giving you Gas Town over a browser dashboard backed by their gateway of 500-plus models.

That's the Gas Town part. The new piece is the Wasteland, which is where things get genuinely interesting. Think of the Wasteland as a federated task marketplace with a reputation layer built in. There's a shared Wanted Board where tasks are posted. A developer's Gas Town claims a task, spins up the appropriate agents to work on it, and submits the output as evidence on DoltHub. Validators review the work and issue stamps — and these stamps are multi-dimensional, not binary pass/fail. They score quality, reliability, and creativity separately, each with a confidence level attached. Your reputation is assembled from evidence, not self-report. Yegge's framing is simple: you can't stamp your own work. What other people write about what you did is your professional record.

The federation part means anyone can run their own Wasteland instance. A company can have its own fork. An open-source project can have one. Your identity and reputation travel with you across all of them. The technical foundation is Dolt, a SQL database with Git semantics — so every completion, every PR, every stamp is a traceable artifact in a database you can fork, merge, and audit. Kilo wraps all the protocol details: claiming work, submitting evidence, managing the DoltHub PR lifecycle — all of it is handled conversationally through the Mayor rather than through manual CLI operations.

The pitch here is that the combination of Gas Town's orchestration, the Wasteland's coordination layer, and Kilo's model gateway creates a path for independent developers to participate in large-scale collaborative engineering without the organizational scaffolding that usually makes that impossible. The Kilo Gateway routes model selection per task — different work benefits from different models — without requiring you to manage separate API keys or billing relationships. What's worth watching is whether the reputation system actually develops the gravity Yegge is describing, or whether it becomes another graph of credentials that looks meaningful but doesn't move actual work.

**Key takeaways:**
- Gas Town is now generally available as a managed cloud service — no CLI setup, no self-hosting required
- The Wasteland adds a federated task marketplace with multi-dimensional, evidence-backed reputation stamps
- Federation means identity and reputation are portable across Wasteland instances run by different organizations
- The underlying protocol doesn't require Gas Town specifically — it works with any Dolt-compatible agent setup

**Why do I care:** For solo developers and small teams, the interesting bet here is whether the Wasteland's reputation system can replace organizational credentialing. If stamps accumulate real trust because validators have skin in the game and the evidence is inspectable, that's a meaningful new primitive. The risk is that it follows the path of other reputation graphs: high initial enthusiasm, low validator participation, reputation scores that end up meaning nothing. Worth watching because Dolt's Git semantics at least give you a tamper-evident audit trail, which is more than most systems offer.

**Link:** [Gas Town by Kilo is Here, With Wasteland Built In](https://blog.kilo.ai/p/gas-town-ga?publication_id=4363009&post_id=198409684&isFreemail=true&triedRedirect=true)
