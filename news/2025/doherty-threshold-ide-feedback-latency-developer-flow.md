---
title: "The 400ms Threshold: Why Modern IDEs Sacrifice Developer Flow for Completeness"
excerpt: "Kent Beck argues that developer tools have drifted toward complete-but-slow feedback, ignoring the Doherty Threshold that shows human attention starts slipping at 400 milliseconds."
publishedAt: "2025-12-29"
slug: "doherty-threshold-ide-feedback-latency-developer-flow"
hashtags: "#dx #performance #testing #ide #vscode #architecture #generated #en"
---

## The Precious Eyeblink

**TLDR:** Kent Beck revisits the 1982 Doherty Threshold research showing that computer response times above 400 milliseconds break user flow. Modern IDEs have unconsciously chosen completeness over speed, and Beck argues we should optimize test runners and tools for latency—showing partial results fast rather than complete results slowly.

**Summary:**

The Doherty Threshold, established by IBM researchers in 1982, revealed something that contradicted prevailing assumptions about acceptable computer response times. While everyone assumed 2 seconds was fine, Doherty and Thadani found that 400 milliseconds is the critical boundary. Below that threshold, users stay engaged. Above it, they drift into a waiting state. This aligns with Jakob Nielsen's broader framework: 0.1 seconds feels instantaneous, 1 second maintains thought flow, and 10 seconds risks losing users entirely.

Modern development tools have made an implicit choice without acknowledging the tradeoff. VSCode wants to show you everything—every type error, every lint warning, every possible issue. Theorem provers represent the extreme end of this spectrum: perfect feedback that takes an indefinite amount of time. The spectrum runs from "fast but incomplete" to "complete but slow," and most tools have drifted rightward without measuring the cost.

The question Beck raises is architectural: what is feedback actually for? Two things—confirming you did what you intended, and revealing if you broke anything. Quick feedback maintains flow. What if you could learn about most errors in 400 milliseconds rather than all errors in 30 seconds? The first keeps you in the zone; the second kicks you out.

Beck proposes concrete principles for tool designers. Prioritize ruthlessly—run recently-failed tests first since they're more likely to fail again. Degrade gracefully—if complete feedback takes longer than 400ms, show something partial. Let developers choose their tradeoff consciously between quick feedback and thorough reassurance. And critically, measure what matters: mean time to first feedback should be on every IDE team's dashboard.

The article references JUnit Max, a test runner Beck built around 2000 that optimized for exactly this. Tests ran on every save in priority order: new tests, recently failed tests, then everything else. A test failure appeared in code like a syntax error. Because context-switching between coding and testing happened so frequently, the tool minimized the cognitive cost of each switch. Beck notes he hasn't seen modern test runners optimized for latency this way—either it's not a good idea, or the industry has collectively failed to optimize for a crucial factor for 25 years.

For architects and team leads, this challenges how we evaluate developer tooling. We tend to compare feature completeness rather than feedback latency. The Doherty Threshold isn't a bug to be fixed—it's a specification to design around. The best tools respect human constraints rather than demanding humans adapt to tool preferences.

**Key takeaways:**
- The 400ms Doherty Threshold marks where user engagement degrades; modern IDEs routinely exceed it
- Tools have drifted toward complete-but-slow feedback without measuring the productivity cost
- Test runners should prioritize recently-failed tests and show partial results fast
- Mean time to first feedback should be a primary metric for developer tool evaluation

**Tradeoffs:**
- Faster partial feedback gains flow state but sacrifices completeness of error detection
- Prioritizing recent failures reduces wait time but may miss regressions in stable code

**Link:** [The Precious Eyeblink](https://tidyfirst.substack.com/p/the-precious-eyeblink)
