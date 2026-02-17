---
title: "Cheating on Transactions: Building a Multi-Database Abstraction"
excerpt: "How to handle transactions across different databases including cloud services that don't support traditional transactions using sessions and batching."
publishedAt: "2026-02-16"
slug: "cheating-transactions-multi-database-abstraction"
hashtags: "#substack #architecture #database #nodejs #typescript #transactions #prisma #drizzle #cloudflare #d1 #generated #en"
---

## How I Cheated on Transactions

**TLDR:** Building a multi-database abstraction layer requires navigating tradeoffs when supporting cloud databases like Cloudflare D1 that don't support traditional transactions. The author shares how they approximated transaction behavior using sessions and SQL batching while maintaining a clean API.

**Summary:**

Oskar Dudycz, author of Dumbo (a lightweight database abstraction library), walks us through the architectural decisions behind supporting multiple databases with a focus on handling transactions. The fundamental challenge is that software design is about making intelligent tradeoffs, but these tradeoffs are often context-dependent and don't apply universally. Rather than adopting existing solutions like Knex, Kysely, or Drizzle that bring their own conventions and limitations, Oskar chose to build his own minimal abstraction. This decision comes from his experience building storage tools like Emmett and Pongo, where he needed fine-grained control over how databases are accessed without being constrained by higher-level abstractions.

The real problem emerged when supporting cloud-first databases like Cloudflare D1. Traditional relational databases offer transactions as a core feature, but D1 exposes the database through an HTTP API rather than direct connections. This fundamental architectural difference means D1 cannot support traditional transactions because they require keeping a connection open across multiple operations. Allowing this in a shared resource environment would be a resource management nightmare for SaaS platforms.

To work around this limitation while maintaining API consistency, Oskar implemented a clever solution using two D1-specific capabilities: sessions and SQL batches. Sessions ensure sequential consistency within a logical operation, while batches allow multiple SQL statements to execute atomically within a single request. Instead of pretending D1 supports full transactions, the implementation now requires users to explicitly opt into session-based mode and clearly documents the limitations. This approach trades off the full flexibility of traditional transactions for guaranteed atomic execution of a single batch of statements.

For teams building multi-database systems, this demonstrates how to handle capability mismatches between different database backends. Rather than trying to hide differences or restrict to the lowest common denominator, exposing the tradeoffs through explicit API modes helps developers understand what guarantees they actually have. This is particularly important when dealing with event sourcing patterns or document operations where transaction atomicity matters significantly.

**Key takeaways:**

- Cloud databases like Cloudflare D1 expose limitations in traditional transaction handling because they optimize for distributed, shared resource scenarios
- When supporting multiple databases with different capabilities, explicit modes and clear documentation are better than attempting to hide differences
- Sessions and SQL batching can provide atomic execution guarantees without requiring persistent connections
- Building minimal, focused abstractions can give more control than adopting heavy frameworks, though it requires careful design to maintain consistency across database types
- Transaction limitations should be clearly surfaced in the API design to prevent silent failures and incorrect assumptions

**Tradeoffs:**

- Gain control over architecture and reduced dependency lock-in but sacrifice the breadth of features and conventions provided by established ORMs
- Gain support for multiple databases including cloud services but sacrifice full transaction semantics across all platforms
- Gain explicit awareness of limitations through session-based modes but sacrifice the simplicity of uniform transaction handling

**Link:** [How I cheated on transactions](https://www.architecture-weekly.com/p/how-i-cheated-on-transactions)