---
title: "Event Sourcing Blind Spot: Race Condition in Rebuild Projections"
excerpt: "Oskar Dudycz discovers a critical race condition in event-driven read model rebuilds and challenges readers to solve it."
publishedAt: "2026-01-13"
slug: "event-sourcing-blind-spot-race-condition-rebuild-projections"
hashtags: "#architecture-weekly #event-sourcing #architecture #postgresql #backend #race-conditions #generated #en"
---

## Event Sourcing Blind Spot: Race Condition in Rebuild Projections

**TLDR:** Oskar Dudycz found a race condition in his previously published approach to rebuilding event-driven read models. When using advisory locks and inline projections in PostgreSQL, there's a window where events can be committed but their projections skipped, leading to data inconsistency. He's challenging readers to find a solution.

This is a fascinating design challenge from the Architecture Weekly newsletter. Oskar recently explained how to rebuild event-driven read models safely and resiliently, but then discovered a problematic edge case in his own design. Instead of just publishing the fix, he's turning it into a learning exercise for readers.

Here's the scenario: You're using PostgreSQL for both event storage and read models. You have inline projections that update the read model in the same transaction as the event append. When you need to rebuild these projections (say, because you've changed the projection logic), you truncate the read model and replay all events through the new projection.

The tricky part is handling concurrent writes during the rebuild. You don't want to stop incoming traffic, but you also don't want both the rebuild process and normal operations updating the read model simultaneously. Oskar's original solution used advisory locks and status checks to coordinate this.

But here's the race condition he discovered:

1. The rebuild process reads the last events in the log
2. It acquires an advisory lock for the inline projection
3. A new append operation starts but can't acquire the lock, so it skips the projection (as designed)
4. The rebuild process finishes processing - there are no new events because step 3 hasn't committed yet
5. The rebuild marks the projection as active and releases the lock
6. The append from step 3 finally commits, but its projection was already skipped
7. Result: the event is stored but never projected into the read model

This is a classic case where two concurrent operations interleave in an unexpected way. The append checked the lock status (locked), made a decision (skip projection), but by the time it committed, the world had changed (rebuild complete, projection active again).

For architects and teams dealing with event sourcing systems, this is a critical reminder: concurrent system design is full of subtle edge cases. Even experienced practitioners like Oskar can miss these scenarios on the first pass. The lesson isn't that advisory locks are bad, but that you need to carefully analyze all possible interleavings of concurrent operations.

Some approaches to consider: What if the rebuild process did a final check after releasing the lock? What if the append operation rechecked state before committing? What if there was a grace period or overlap in processing? Each approach has its own tradeoffs around consistency, performance, and complexity.

**Key takeaways:**
- Race conditions in concurrent systems often appear at state transition boundaries
- Even well-designed locking strategies can miss edge cases where operations interleave unexpectedly  
- The rebuild-while-writing pattern requires careful coordination between the catch-up process and normal operations
- PostgreSQL advisory locks are useful but don't automatically solve all coordination problems

**Tradeoffs:**
- Stopping traffic during rebuild guarantees consistency but sacrifices availability
- Skipping projections during rebuild improves throughput but risks this race condition
- More complex coordination logic increases correctness guarantees but adds system complexity

**Link:** [I found a blind spot in the rebuilding projections design](https://www.architecture-weekly.com/)

---

*This article summarizes content from the Architecture Weekly newsletter by Oskar Dudycz. The information presented here is based on newsletter content and may not reflect the complete original articles.*