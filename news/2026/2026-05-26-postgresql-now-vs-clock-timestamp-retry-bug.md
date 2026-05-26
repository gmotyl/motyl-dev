---
title: "How now() in PostgreSQL Can Silently Break Your Retry Logic"
excerpt: "A subtle PostgreSQL gotcha where now() returns transaction start time, not wall clock time, causing retry loops inside transactions to spin forever."
publishedAt: "2026-05-25"
slug: "postgresql-now-vs-clock-timestamp-retry-bug"
hashtags: "#architecture #engineering #postgresql #distributedsystems #debugging #generated #en"
source_pattern: "OskarDudycz"
---

## When now() Is Not Now: A PostgreSQL Bug That Hid in Plain Sight

**TLDR:** PostgreSQL's `now()` function returns the timestamp at transaction start, not the actual wall clock time. If you wrap a retry loop inside a single database transaction and your stored procedure uses `now()` in a WHERE clause, every retry evaluates the exact same timestamp, making the predicate frozen and the retries useless.

Oskar Dudycz spent hours debugging a distributed locking bug in Emmett, his event-sourced framework, before finding a one-line fix. The root cause was a PostgreSQL behavior that is documented, even sensible in most contexts, but catastrophic in exactly the wrong scenario. `now()` is a synonym for `transaction_timestamp()`. It returns the moment the current transaction began, and that value does not change no matter how many statements execute inside that same transaction. You can sleep two seconds inside a transaction and call `now()` twice; both calls return the identical timestamp.

The problem surfaced in Emmett's distributed locking code, where two service instances competing for the same processor needed a reliable handoff mechanism. The design used PostgreSQL advisory locks combined with a row in the `emt_processors` table to track ownership, heartbeat time, and status. When a previous instance crashes without cleaning up, a new instance needs to eventually claim ownership by detecting that `last_updated` is older than a configurable timeout. The stored function did exactly that with a WHERE clause reading `emt_processors.last_updated < now() - (p_lock_timeout_seconds || ' seconds')::interval`. Looks right. Tests were green.

The consumer calling this function wrapped it in a retry policy inside a `withTransaction` block. Real time passed between retry attempts, hundreds of milliseconds each, but from PostgreSQL's perspective, every call to the stored procedure saw the same `now()` value: the moment the outer transaction opened. The timeout predicate evaluated identically on every retry. The new instance kept failing to claim ownership because, as far as the database was concerned, no time had passed at all.

The fix is one line: declare a local variable initialized from `clock_timestamp()` at the top of the PL/pgSQL function, then use that variable everywhere the function previously called `now()`. `clock_timestamp()` reads the actual system clock each time it is called, ignoring transaction boundaries. Every retry then sees a genuinely later timestamp, and after enough attempts, the takeover predicate flips correctly. Oskar also switched the `last_updated` write to use the same variable, so the read and write sides of the comparison stay consistent with each other.

The deeper lesson here is about the gap between test layers. The stored procedure tests exercised the logic in isolation, with a single call per transaction, so the bug was structurally unreachable. The end-to-end consumer tests went through the real retry wrapper, but none happened to combine all three necessary conditions: a crashed previous owner, a different new instance ID, and a timeout short enough that the retries would span it. Both layers had blind spots, and the bug lived exactly at their intersection. The fix includes a new test family that wires up all three conditions deliberately, inside the same transactional wrapper the production consumer uses.

**Key takeaways:**
- `now()` in PostgreSQL is `transaction_timestamp()` and never advances within a transaction; use `clock_timestamp()` when you genuinely need wall clock time
- Wrapping retry policies inside a single database transaction can cause time-dependent predicates to freeze, defeating the retry entirely
- The seam between unit tests and end-to-end tests is where production-vs-test driving mismatches tend to hide; write at least one test that mirrors how the real caller drives the code

**Why do I care:** This is the kind of bug that makes experienced engineers feel humbled, and that's exactly why it's worth writing about. I've seen similar timestamp confusion in other databases and ORMs, but the PostgreSQL case is particularly sneaky because the behavior is a feature in most contexts. Audit columns and write batches absolutely want that transaction-time stability. The dangerous part is that `now()` reads as "the current time" to anyone not already holding this particular piece of knowledge, and that intuition is wrong the moment you start retrying inside a transaction. If you are building distributed systems on PostgreSQL and using advisory locks or any kind of timeout-based ownership handoff, I would go audit your stored functions for this pattern today.

**Link:** [How soon is now in PostgreSQL?](https://www.architecture-weekly.com/p/how-soon-is-now-in-postgresql)
