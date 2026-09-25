# A section handoff extends the MSE timeline instead of rebuilding it

On the MSE carrier a speech unit is a range on one continuous `SourceBuffer`, not a file assigned to `element.src`. The reader could therefore treat a **section** boundary either way: tear the timeline down and open a fresh `MediaSource` for the next section, or append the next section's units onto the timeline already playing. It appends.

The reason is that the empty element at a join is what the OS acts on. The carrier spike measured this directly: a `src`-swap control died at boundary 3, **38 seconds** in, with the screen off, while the MSE bench survived 9:48. Rebuilding per section would not remove that boundary — it would move it from every ~18 s (a unit) to every ~2 min (a section), roughly five boundaries per ten-minute session. That is not plausibly safe; it makes the failure *rarer and harder to reproduce*, which is a worse position than the one we started from, because it converts a reliable bug into an intermittent one.

So a continuation is claimed **only** on the auto-advance path in `onComplete` — the one section transition that happens without the user present. Every other transition rebuilds: play-from-here, an explicit stop, and a queue re-seat after mark-as-read or DOM eviction. Each of those follows a user action taken with the page visible, where a boundary is safe. (A voice change rebuilds only incidentally: it does not restart playback at all, so there is nothing to rebuild until the next stop.)

Three consequences follow from the timeline outliving a section, and each is load-bearing:

- **`endOfStream()` can never be called at a section boundary**, because an ended `MediaSource` will not accept the next section's appends. Combined with the boundary tracker never reporting the final unit — past the last append there is no next range to cross into — nothing in the media pipeline can say "the article finished". The reader decides it instead, from two facts that must hold together: every unit from the one being read through the last is on the timeline, **and** the playhead has reached the end of the buffered media. Either alone is an ordinary state: a stall, or normal mid-article playback.
- **Carrier unit indices must be absolute across the continued timeline.** Each section numbers its units from zero, the carrier deduplicates appends by index, and the timeline resolves an index to its first matching span. Without an absolute base the next section's unit 0 is dropped as already-present, and every seek to it lands in the previous section's media.
- **The buffer needs a retention window.** A three-month "Read All News" session appends indefinitely, so media older than 600 s behind the playhead is removed. Before this decision the timeline never outlived one section (~2 min), so retention was effectively dead code.

## Considered Options

- **Rebuild the `MediaSource` at each section boundary** — rejected: keeps a boundary roughly every two minutes, which the spike's control result gives no reason to believe is safe. It would also make the remaining failures intermittent and therefore much more expensive to diagnose.
- **Signal `endOfStream()` per section and reopen** — rejected: this *is* rebuilding, with an extra state transition. An ended `MediaSource` cannot accept appends, so it forecloses the continuation entirely.
- **One `MediaSource` for the whole queue, appended eagerly ahead of playback** — rejected: unbounded memory on a long session, and it couples synthesis throughput to buffer health. The retention window plus the existing prefetch depth bounds both.
- **Keep per-unit `src` swaps and rely on the screen wake lock** — rejected: that is the status quo the change exists to replace. The wake lock keeps the screen on, which is a workaround for background playback, not background playback.

## Consequences

- Sections are no longer independent: a bug in the index translation shows up as *cross-section* symptoms — the listener hearing the previous section from its start while the UI shows the new one, or the article completing the instant a handoff begins. Any new timeline lookup must translate.
- A carrier release cannot be performed synchronously inside `onComplete`. Two teardowns race there (the hook's own completion branch and the reader's `stop()`), both before any `setState` made there can commit, so a continuation flag read from a render snapshot is always stale at the moment of teardown. The release is recorded and flushed after the commit, which is what lets the continuing path skip it entirely.
- The screen-off claim for a **section handoff while hidden** rests on this argument rather than on a bench measurement: the spike's rig had eight fixed fragments and no sections. Device verification of the reader is the only thing that closes that gap.
