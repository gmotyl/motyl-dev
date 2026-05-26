---
title: "now() Is Not Now: A PostgreSQL Timestamp Trap in Distributed Locking"
excerpt: "Oskar Dudycz shares a subtle but painful bug where PostgreSQL's now() function returning the transaction start time, not wall clock time, broke distributed lock takeover logic inside a retry loop."
publishedAt: "2026-05-25"
slug: "postgresql-now-vs-clock-timestamp-distributed-locking"
hashtags: "#architecture #engineering #postgresql #distributedsystems #eventdriven #generated #en"
source_pattern: "OskarDudycz"
---

## How soon is now in PostgreSQL?

**TLDR:** PostgreSQL's `now()` returns the transaction start time, not the current wall clock time. When you wrap a retry loop inside a single database transaction and use `now()` in a WHERE clause to check if a timeout has elapsed, the predicate is frozen for the entire transaction, making the retries functionally useless. Switching to `clock_timestamp()` fixes the problem in one line.

Oskar Dudycz hit this bug while working on distributed locking in Emmett, his event-driven framework. The scenario is one I find genuinely interesting: when you scale a message processor horizontally, two instances can race to own the same projection. Emmett uses PostgreSQL advisory locks plus a row in an `emt_processors` table to guarantee that exactly one instance is active at a time. The table tracks which instance owns the processor, when it last checked in via a heartbeat, and what state it's in. If an instance crashes, its advisory lock is released automatically, but the database row still shows `status = 'running'` because there was no graceful shutdown to clean it up.

The takeover logic is elegant in principle. A new instance waits until the crashed owner's `last_updated` timestamp is older than a configurable timeout, then claims the lock. This lives in a PostgreSQL stored function as an `ON CONFLICT DO UPDATE ... WHERE` clause. The WHERE condition checks whether the previous owner has gone quiet long enough: `emt_processors.last_updated < now() - (p_lock_timeout_seconds || ' seconds')::interval`. Reads naturally. Tests were green. And then a user named Martin filed a bug report.

The root cause is that `now()` in PostgreSQL is a synonym for `transaction_timestamp()`. It captures the moment the transaction began and returns that same value for every statement inside the transaction, no matter how much real time has passed. The consumer code that calls the lock function wraps a retry policy inside a `pool.withTransaction` call. Every retry fires the stored procedure on the same database connection, inside the same open transaction. From the database's perspective, time was standing still. The takeover predicate evaluated identically on every retry, because the timestamp it was comparing against never moved. Ten retries spread across real seconds, all checking the same frozen moment.

The fix is exactly one line added to the function's `DECLARE` block: `v_current_time TIMESTAMPTZ := clock_timestamp();`. Then replace every `now()` in the function body with `v_current_time`. Unlike `now()`, `clock_timestamp()` reads the actual wall clock each time it's invoked, ignoring transaction boundaries. Each new call to the stored procedure, even inside the same wrapping transaction, gets a fresh timestamp. After enough retries, the takeover predicate actually flips, and the new instance wins. Oskar also notes that both places where the timestamp is used (writing `last_updated` for the new owner and comparing against the old owner's `last_updated`) should use the same source, otherwise you introduce a subtler variant of the same bug.

What makes this story worth reading past the fix itself is Oskar's honest post-mortem on the test suite. He had integration tests for the stored procedure covering two instances racing, reconnects after crashes, and custom timeout scenarios. They all passed. The problem is those tests called `tryAcquire` once per test, and a single call works perfectly fine with `now()`. The bug only surfaces when multiple calls share a transaction, which is exactly what the production retry wrapper does. The end-to-end tests did exercise the retry path, but none of them combined all three necessary conditions at once: a stale `status = 'running'` row from a crash, a new instance ID, and a retry timeout short enough to expose the frozen predicate. Both test layers had a blind spot, and the bug lived in the gap between them.

**Key takeaways:**
- `now()` in PostgreSQL returns the transaction start time and never changes within a transaction; use `clock_timestamp()` when you need wall clock time that advances during a transaction
- Retry loops wrapped inside a single database transaction interact with timestamp-based WHERE clauses in non-obvious ways that can make retries completely ineffective
- Test seams matter: when your stored procedure tests and end-to-end tests drive the code through different wrappers, bugs can live exactly at that boundary without being reachable from either side

**Why do I care:** This is one of those bugs I find particularly instructive because it isn't a logic error, it's a semantic mismatch between what a function name implies and what it actually does. I've seen teams burn hours on `now()` vs `clock_timestamp()` confusion in PostgreSQL, and it tends to happen precisely in the places where correctness matters most: distributed coordination, timeouts, lock management. The testing insight is equally valuable. Writing tests at the stored procedure level gives you speed and precision, but if your test harness drives the code differently from how production drives it, you're testing a different system. Oskar's rule of thumb, look at the seam where the inner test invokes the code differently from the real caller, is worth writing on a sticky note.

**Link:** [How soon is now in PostgreSQL?](https://www.architecture-weekly.com/p/how-soon-is-now-in-postgresql?publication_id=579466&post_id=199180926&isFreemail=true&triedRedirect=true)
