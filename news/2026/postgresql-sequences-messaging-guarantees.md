---
title: "How PostgreSQL Sequences Can Break Your Messaging Guarantees"
excerpt: "Oskar Dudycz highlights a subtle PostgreSQL sequence behavior that can silently break message ordering in outbox patterns — a trap that catches both homebrew and OSS solutions."
publishedAt: "2026-01-27"
slug: "postgresql-sequences-messaging-guarantees"
hashtags: "#substack #architecture-weekly #postgresql #architecture #backend #database #generated #en"
---

## How PostgreSQL Sequences Can Impact Your Messaging Guarantees

**TLDR:** PostgreSQL sequences can create subtle ordering issues in transactional outbox implementations. Sequence values are allocated outside of transactions, meaning committed rows may not appear in sequence order — a trap that breaks message delivery guarantees in both homebrew and established OSS solutions.

Oskar Dudycz's newsletter highlights one of those database behaviors that developers typically learn about the hard way: PostgreSQL sequences don't guarantee that rows appear in the table in sequence order. This sounds like a minor implementation detail, but it has serious implications for anyone implementing the transactional outbox pattern.

Here's the core problem. When you insert rows into a PostgreSQL table with a sequence-based ID, the sequence value is allocated at the start of the transaction, not when the transaction commits. If two concurrent transactions allocate sequence values 1 and 2, but transaction 2 commits before transaction 1, a poller reading "all rows with ID greater than my last processed ID" will see row 2 first, process it, advance its pointer to 2, and then never see row 1 when transaction 1 finally commits. You've silently lost a message.

This is exactly the kind of issue that separates production-grade messaging infrastructure from working prototypes. The outbox pattern is widely recommended for ensuring reliable message delivery alongside database writes — it's a cornerstone of event-driven architecture. But the implementation details matter enormously, and sequence ordering is one of the least obvious failure modes.

What makes this particularly insidious is that it doesn't show up in testing. With low concurrency, transactions commit quickly and in order. The problem only manifests under load, when transaction durations vary and concurrent inserts create gaps in the visible sequence. By the time you discover it, you've been silently dropping messages in production.

For architects and teams implementing event-driven systems, this is a critical consideration. If you're building a custom outbox, you need to account for sequence gaps — either by using a different ordering mechanism, introducing a delay before processing, or implementing gap detection. If you're using an OSS outbox library, verify whether it handles this case. As Dudycz notes, he's been tagged on multiple OSS project issues precisely because established tools were unaware of this behavior.

The broader lesson applies beyond PostgreSQL: never assume database implementation details align with your mental model. Sequences guarantee uniqueness, not ordering. Timestamps guarantee approximate ordering, not precision. Auto-incrementing IDs guarantee monotonicity within a single connection, not across concurrent ones. Building reliable distributed systems requires understanding these distinctions.

**Key takeaways:**
- PostgreSQL sequences allocate values outside transactions, creating potential ordering gaps
- This directly impacts transactional outbox patterns that rely on sequential polling
- The issue is invisible under low concurrency and only manifests under production load
- Both homebrew and established OSS outbox implementations have been affected
- Verify your outbox strategy accounts for sequence gaps before relying on it for delivery guarantees

**Tradeoffs:**
- Sequence-based ordering is simple and fast but sacrifices strict ordering guarantees under concurrency
- Adding gap detection or commit-time ordering improves correctness but adds complexity and latency to message processing

**Link:** [How Postgres sequences issues can impact your messaging guarantees](https://www.architecture-weekly.com/p/how-postgres-sequences-issues-can)
