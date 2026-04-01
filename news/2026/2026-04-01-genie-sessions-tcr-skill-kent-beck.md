---
title: "Teaching AI to Code Like Kent Beck: TCR Skills and the Future of TDD"
excerpt: "Kent Beck explores blending TCR with AI 'Genie' skills to create a self-resetting, auto-committing coding assistant that works test-first."
publishedAt: "2026-04-01"
slug: "genie-sessions-tcr-skill-kent-beck"
hashtags: "#substack #tdd #tcr #kentbeck #testing #ai #programming #generated #en"
source_pattern: "Substac"
---

## Genie Sessions: TCR Skill

**TLDR:** Kent Beck is experimenting with giving AI assistants a TCR-style skill, where failing tests trigger an automatic reset to the last known good state and passing tests trigger an automatic commit. It is a fascinating blend of two already powerful ideas, and the implications for AI-assisted development deserve some real thought.

**Summary:** TCR stands for "test and commit or revert," and it is one of those ideas that sounds almost too extreme when you first hear it. You write some code, you run the tests, and if they fail, everything you just wrote disappears. Poof. You are back to the last state that actually worked. If the tests pass, you commit immediately. No lingering broken state, no "I'll fix it later," no accumulating mess. The discipline it forces is real, and for humans it can feel brutal but clarifying.

Now Kent Beck is asking a sharper question: can we give this behavior to an AI coding assistant as a learned skill? He calls these assistants "genies," and the idea of a Genie that natively operates TCR-style is genuinely interesting. The AI would write code, run the tests, and if things break, it resets automatically rather than trying to patch its way out of a failing state. If things pass, it commits. Small, verified steps, every single time.

What Beck points out, and this is worth sitting with, is that the best ideas tend to be blends. TCR alone is a strict workflow discipline. AI coding assistance alone is a productivity amplifier. But TCR as a built-in constraint on an AI agent changes something more fundamental: it means the agent cannot accumulate technical debt through half-working changes. The feedback loop tightens to the smallest possible unit.

There is a fair critique hiding here too. TCR works for humans partly because the reset is a psychological signal, a real cost that changes behavior. For an AI, "losing" uncommitted work carries no psychological weight. Whether the constraint produces better outputs or just different ones is an open empirical question. Beck's live session format suggests he is exploring this in real time rather than presenting a finished answer, which I respect. This is how useful ideas get worked out.

**Key takeaways:**
- TCR (test and commit or revert) automatically resets code to the last good state when tests fail, and commits immediately when they pass
- Kent Beck is experimenting with encoding TCR as a "skill" that an AI coding assistant (a "genie") can use natively
- The combination is an attempt to give AI agents a built-in discipline around test-first, verified progress
- The best new ideas often come from blending two existing ideas that work independently
- Open questions remain around whether the TCR constraint changes AI output quality, not just workflow shape

**Why do I care:** From an architecture and senior dev perspective, the interesting thing here is not the specific TCR mechanic but the broader pattern of encoding workflow constraints as agent skills. If you can give an AI assistant a skill that enforces a specific development discipline, you start to get something more interesting than autocomplete. You get an agent that embodies a methodology. That has real implications for teams: it means you can potentially enforce code review norms, testing requirements, or commit hygiene through the agent's skill set rather than through process documentation that nobody reads. Whether TCR specifically is the right constraint for AI agents is worth debating, but the framing of "skills as encoded workflow discipline" is a lens I will be thinking about for a while.

**Link:** [Genie Sessions: TCR Skill](https://tidyfirst.substack.com/p/genie-sessions-tcr-skill?publication_id=256838&post_id=192641476&play_audio=true&triedRedirect=true)
