---
title: "Don't Let the AI Grade Its Own Homework, and Other Nerd Pursuits"
excerpt: "Two stories from HackerNoon on June 13: why AI coding agents need an independent criteria checker, and how someone built a fully functional clicker game inside the Desmos graphing calculator."
publishedAt: "2026-06-13"
slug: "ai-coding-criteria-check-and-desmos-clicker-game"
hashtags: "#HackerNoon #AICoding #ClaudeCode #AIAssistedCoding #AIHallucinations #Desmos #GameDev #Mathematics #generated #en"
source_pattern: "HackerNoon"
---

## AI Coding Tip 024 - Force a Criteria Check Before the Task Ends

**TLDR:** When you let an AI agent complete a task and self-report success, you're asking it to grade its own homework. It assumed. It didn't check. Spawn a fresh subagent specifically for verification.

**Summary:** Here is a problem that anyone building with AI coding agents will recognize pretty quickly. You write a detailed AGENTS.md or CLAUDE.md with a list of strict mandatory rules. You run the agent. It finishes. It reports success. You review the output and find half the rules were quietly ignored, or assumed to be satisfied, or just forgotten somewhere in the middle of a long context window.

The author's framing is blunt: the AI that did the work cannot audit itself. This is not a limitation you can train away with better prompting of the same agent. The working agent has already committed to a set of decisions. Its attention is on finishing, not on stepping back and verifying whether every rule in a document it read 40 steps ago was followed. Confirmation bias baked right into the architecture.

The proposed fix is surgical. After every significant task, you spawn a completely fresh subagent whose only job is to run through the criteria checklist. No prior context. No emotional investment in the previous output. It reads the rules, it reads the result, and it reports independently. This is the same reason code review works better when it's not the author doing the review.

What the author does not address is the question of what happens when the checker subagent also hallucinates compliance. You still need a human somewhere in this chain, and at some point the recursive spawning of verifier agents becomes its own form of false confidence. The pattern is useful, but it does not solve the fundamental trust problem with AI-generated verification.

**Key takeaways:**
- AI agents cannot reliably self-audit against a criteria list they consulted earlier in the same task
- A fresh, context-free subagent is more reliable as a checker than a self-review step
- This mirrors human code review practices: the author is the wrong person to catch their own blind spots
- The pattern works best with specific, enumerable criteria rather than vague quality standards

**Why do I care:** If you are running Claude Code or any other AI coding agent on real work, this is a practical operational pattern worth adopting today. The failure mode it describes is not theoretical. I have watched agents confirm their own rule compliance with complete confidence immediately after violating the rules. A dedicated verification step, even a simple one, changes the reliability profile of the whole pipeline.

**Link:** [AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://hackernoon.com/ai-coding-tip-024-force-a-criteria-check-before-the-task-ends)

---

## How to Make A Clicker Game on the Desmos Graphing Calculator

**TLDR:** Someone built a fully functional clicker game inside the Desmos graphing calculator, complete with shrinking targets, a countdown timer, randomized positions, and score tracking. No JavaScript. Just math.

**Summary:** Desmos is a free online graphing calculator most people use to plot functions for homework. It turns out it can also run a game. The author built a clicker game entirely within Desmos by exploiting its Actions feature, which lets you update variable values in response to clicks, and its support for conditional expressions and parametric inequalities as game objects.

The world is a 100 by 100 grid defined by a single polygon expression. The clickable target is an inequality that renders as a circle on the canvas. Every time you click it, an action fires that randomizes the target's position, decrements the timer, and increments your score. The timer is a variable that counts down using Desmos's ticker, which you can think of as a primitive game loop running at a configurable interval.

What makes this technically interesting is that Desmos's expressions are fundamentally mathematical. There is no scripting language. Randomization uses its built-in random function. Conditional logic uses piecewise expressions. The author essentially wrote a state machine in equation form, which is either impressive or horrifying depending on your relationship with math.

What I keep thinking about is what the author is avoiding thinking about here: Desmos was clearly never designed for this. The fact that it works is a side effect of decisions made to support interactive graphing demonstrations, not games. This is the kind of thing that happens when you give curious people a powerful enough tool and get out of the way.

**Key takeaways:**
- Desmos's Actions checkbox in Account Settings unlocks interactive state updates on click events
- Game state (score, timer, position) is stored in Desmos variables updated via Actions
- The ticker function acts as a game loop for time-based mechanics
- Piecewise expressions handle conditional logic without any traditional control flow
- The entire thing is portable: it lives at a Desmos URL, no installation required

**Why do I care:** I care less about the specific output here and more about the methodology. Taking a constrained tool and pushing it past its obvious design boundary is exactly how people develop deep intuitions about what a system can actually do. The author learned more about Desmos by building something impractical than they ever would have by using it conventionally. That is a pattern worth copying.

**Link:** [How to Make A Clicker Game on the Desmos Graphing Calculator](https://hackernoon.com/how-to-make-a-clicker-game-on-the-desmos-graphing-calculator)
