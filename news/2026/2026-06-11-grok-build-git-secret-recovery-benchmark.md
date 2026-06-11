---
title: "How Grok Build 0.1 Recovered a Git-Buried Secret in 41 Seconds"
excerpt: "Kilo's team benchmarked Grok Build 0.1 on a real agentic task: find a secret hidden in Git's unreachable object store, save it, then scrub every trace."
publishedAt: "2026-06-10"
slug: "grok-build-git-secret-recovery-benchmark"
hashtags: "#ai #productivity #tools #agentic #git #benchmark #generated #en"
source_pattern: "Kilo"
---

## Grok Build 0.1 Digs Into Git History to Recover a Hidden Secret

**TLDR:** Kilo ran Grok Build 0.1 against a Terminal-Bench task that hides a secret in Git's unreachable object store, then expects the agent to recover it and fully purge it. Grok nailed all three requirements in 27 steps and 41 seconds, for nine cents. That's fast, but the interesting part is *how* it got there.

**Summary:**

The setup is deceptively simple. A small repository has a secret committed, then erased from the visible history via a hard reset. The files look clean. The log looks clean. A surface-level text search finds nothing. A human expert is estimated to take about 30 minutes on this task; a junior engineer, closer to an hour. What Kilo wanted to know was whether Grok could reason through the layers of Git's internal data model without being told where to look.

What I find worth paying attention to here is that Grok did not start by cleaning. It started by looking. It ran the basics first, listing files, reading the commit log, pulling full patches. That is the right instinct. Any developer who has debugged a messy repo knows that touching things before understanding the state is how you create new problems. Only after reading the visible history did Grok reach for the less obvious tool: git fsck with the unreachable flag. That command surfaces Git objects that exist in storage but are no longer reachable from any branch or tag. An unreachable blob, tree, or commit is the ghost of a change someone thought they deleted. Grok found the ghost.

From there, the sequence mattered as much as the knowledge. The agent had to save the secret *before* cleaning the repo, not after. If it pruned Git's garbage first, the only remaining copy of the secret would be gone before it could be written to the output file. Grok got the order right. It wrote to the output file, confirmed the write, then started cleanup. That ordering is not obvious. It is the kind of thing that separates a working agentic workflow from one that technically runs all the right commands but produces the wrong result.

The verification loop is the part I find most telling about where agentic coding tools actually stand. After expiring the reflog, Grok ran the unreachable-object check again before declaring success. The objects were still there. Expiring the reflog alone is not enough because the objects themselves are still in the object store until garbage collection prunes them. A lot of agents would have stopped at the reflog step, checked a box, and moved on. Grok caught the gap because it checked its own work mid-task rather than only at the end. That is a meaningful difference.

The benchmark also checked that unrelated files and commit messages were left alone. This is a constraint that is easy to miss when you are focused on the main goal. Deleting the whole .git directory would have removed the secret, but it would also have destroyed the project history. Rewriting commit messages would have changed content the task explicitly protected. Grok avoided both failure modes. The README was untouched, the expected commits were still there, and an integrity check against a known-good checksum came back clean.

**Key takeaways:**

- Grok Build 0.1 completed a benchmark git-secret-recovery task in 41 seconds at a cost of $0.09, within the time range estimated for a human expert
- The agent correctly used git fsck --unreachable to find objects not visible in normal history, which is the non-obvious move the task requires
- Operation order mattered: save the secret first, then clean, not the reverse
- Mid-task verification caught a partial cleanup that would have left the secret recoverable
- The model left unrelated files and commit messages untouched, satisfying a constraint many agents overlook
- Kilo Bench is a fork of Terminal-Bench 2.0; results are on a controlled, artificial repository, not a messy production codebase

**Why do I care:** From an architecture standpoint, this benchmark is a better signal than most AI coding demos because the evaluation is binary and concrete. Either the secret is in the output file and gone from the repo, or it is not. That objectivity is rare. What I want to see next is how the same agent handles repos with remote copies, CI environment logs, and package caches, because that is where real secret leaks live. The controlled lab result is promising, but the gap between a tiny test repo and a real monorepo with a decade of history is not small. If your team is evaluating agentic tools for security-adjacent tasks, this benchmark methodology is worth stealing.

**Link:** [We Asked Grok Build 0.1 to Recover a Secret Hidden in Git History](https://blog.kilo.ai/p/we-asked-grok-build-01-to-recover)
