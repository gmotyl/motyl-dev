# Live `TrendsVotes` rows share the literal week key `'current'`; ISO-week labels exist only in `TrendsArchive`

The publication runs one curation cycle at a time: readers vote, then on cycle close the **Maintainer** runs `/generate-trends` followed by `scripts/trends-reset.ts`, which archives every row into `TrendsArchive` (with a real ISO-week label) and truncates `TrendsVotes`. Keeping live rows under a single sentinel key removes the need for "current week" lookups in every read path and makes the **Cycle Reset** a single `DELETE`. `getCurrentWeek()` is retained for the archive label only.

## Considered Options

- **Partition live votes by real ISO-week from the start** — rejected: complicates every read with a "what's the current week" question and forces logic for cycles that don't align to ISO weeks (a cycle can run long if the **Maintainer** is busy).

## Consequences

- A `TrendsVotes` row's `week` field is *not* a timestamp; treat it as a status enum (`'current'` today, possibly more states later).
- If we ever support multiple in-flight cycles, this ADR is superseded.
