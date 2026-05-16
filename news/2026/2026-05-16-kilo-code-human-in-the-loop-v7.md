---
title: "Human in the Loop is Back: How Kilo Code v7 Is Getting Control Right"
excerpt: "Kilo Code's v7 VS Code extension rewrite pushed hard on agentic capability, but at the cost of developer visibility and control, and the team has been systematically shipping improvements to restore the balance."
publishedAt: "2026-05-15"
slug: "kilo-code-human-in-the-loop-v7"
hashtags: "#kilo #ai #generated #en #vscode #agentic #developer-tools #ai-agents"
source_pattern: "Kilo"
---

## We Are So Back: Human in the Loop in Kilo Code

**TLDR:** Kilo Code's v7 extension rewrote almost everything, and the community pushed back on one thing consistently: they wanted to see what the agent was doing before it did it. The team has been shipping steady improvements to bring that oversight back, and if you downgraded to v5.x because v7 felt too autonomous, it is worth checking in again.

**Summary:**

The v7 rewrite of Kilo Code's VS Code extension was genuinely ambitious. A new architecture built on the OpenCode server, a redesigned UI, Agent Manager for running parallel sessions, and tighter model integration all shipped together. That is a lot of change at once, and it shipped rough. The feedback that came through loudest was not about bugs in the traditional sense. Developers wanted more visibility into what the agent was about to do, not just what it had already done. That distinction matters more than it sounds.

The first set of improvements is about readability of the agent's work. Reasoning blocks now stay expanded by default, so you can actually follow what the model was thinking rather than hunting for the collapsed summary. Terminal command blocks can collapse to just a header bar when you do not need them. A context usage graph landed in the task header showing token consumption turn by turn. These feel like small things until you are reviewing an agent's reasoning and you realize you have been skimming past it because it was visually overwhelming. The layout changes make it easier to read the work rather than approve it blindly.

The bigger shift is on the diff and review side. The v7 extension originally showed diffs after you had already approved changes, which is basically the wrong order. Patch operations now surface diffs inside the permission prompt, before you commit to anything. The Edit tool defaults to side-by-side diff mode. The Agent Manager auto-expands files that are worth reviewing while keeping generated or enormous files collapsed. A unified Changes panel replaced the two separate views for workspace and session changes, with a source dropdown and a sidebar badge showing session additions and deletions. Shell command output now has syntax highlighting, copy buttons, and an option to open full untruncated output in the editor. These are the kinds of details that determine whether you actually trust the tool or just hope it did the right thing.

There is also a category of fixes that I would call "friction that erodes confidence." The auto-approve toggle now persists across VS Code restarts, and it shows in the session prompt controls so you always know what mode you are in. Permissions that were getting stuck when multiple panels showed the same prompt, or when a subagent's request got routed to the wrong worktree, now surface clear errors instead of leaving buttons disabled with no explanation. Custom agents can have per-agent tool permissions, so you can build a read-only reviewer or an agent that cannot touch bash. Session recovery is more reliable after restoring checkpoints.

Not everything is done. The full review-then-approve workflow with accurate side-by-side diffs is still in progress, tracked in issue 8264. Step-level checkpoint restore would let you recover to a specific agent step within a turn rather than just at the user-prompt level. Diff code blocks still take too much vertical space. But the direction is clear, and the shipped improvements are real. The team's framing resonates with me: you can outsource some of the work of software authoring to an AI, but you cannot outsource the thinking behind software engineering. The best agent tools are the ones that make your oversight easy, not the ones that make it optional.

**Key takeaways:**
- Kilo Code v7 pushed hard on agentic capability and Agent Manager features, but visibility and control suffered
- Reasoning blocks now expand by default; context usage is visible turn by turn in the task header
- Diffs now appear in permission prompts before approval, not after, which is the correct order
- A unified Changes panel replaces the split workspace/session views
- Custom agents support per-agent tool permissions for read-only or restricted configurations
- Auto-approve state persists across VS Code restarts and is always visible in session controls
- Session recovery and checkpoint restore are more reliable after the recent fixes
- The full side-by-side diff review workflow (issue 8264) and step-level checkpoint restore (issue 8378) are still in progress

**Why do I care:** From an architect's perspective, the interesting question here is not whether AI agents can write code, it is whether you can maintain meaningful oversight of what they are doing at scale, especially when you are running parallel sessions. The pattern Kilo Code is converging on, review before approve, diff before commit, reasoning visible not hidden, is actually the right mental model for integrating agentic tools into a professional workflow. The per-agent tool permissions for custom agents are particularly useful for teams that want to introduce AI assistance incrementally, letting a read-only reviewer run alongside manual work before granting write access. If you are evaluating AI coding assistants for a team, the maturity of the human-in-the-loop controls matters at least as much as raw capability.

**Link:** [We are so back: Human in the Loop in Kilo Code](https://blog.kilo.ai/p/we-are-so-back-human-in-the-loop?publication_id=4363009&post_id=197895360&isFreemail=true&triedRedirect=true)
