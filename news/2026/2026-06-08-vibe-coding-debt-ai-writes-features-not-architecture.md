---
title: "Vibe Coding Debt: Why AI Writes Features But Not Architecture"
excerpt: "A developer archives seven months of AI-generated Kubernetes tooling and explains why architectural context matters more than velocity."
publishedAt: "2026-06-08"
slug: "vibe-coding-debt-ai-writes-features-not-architecture"
hashtags: "#dailydev #ai #kubernetes #architecture #engineering #generated #en"
source_pattern: "daily.dev"
---

## I Archived Seven Months of AI-Generated Code and I'm Starting Over

**TLDR:** The developer behind k10s, a GPU-aware Kubernetes TUI, spent seven months vibe-coding with Claude and ended up with 1,690 lines of god-object he couldn't safely modify. He archived the whole thing and is rewriting it from scratch, this time with architecture documents and explicit constraints before a single line of AI-generated code gets written.

**Summary:** I've been watching the vibe-coding conversation with growing frustration, because the demo reel version, the one where someone goes from idea to shipped product in a weekend, leaves out the part where you're still paying for that weekend six months later. This post from the k10s developer is the most honest accounting I've seen of what actually happens when you let AI drive without guardrails. He built a GPU-aware Kubernetes dashboard in Go, roughly k9s with DCGM metrics and cluster cost visibility, and for the first couple of months it was genuinely fast. Three weekends to a working k9s clone. Real features shipping. That feeling of 10x productivity is not imaginary. The problem is that it compounds in the wrong direction.

The architecture debt didn't announce itself. It accumulated the way it always does with junior contributors who lack context: incrementally, across sessions, one reasonable-looking change at a time. A god-object called model.go started small and grew until it owned everything: state, keyboard dispatch, business logic, data fetching. The developer never felt a single moment where it crossed a line, because AI was adding to it in small increments and each increment looked fine in isolation. That's the part people aren't talking about enough. It's not that AI writes bad code. It's that AI optimizes for the task in front of it, not for the system it's modifying.

Three failures crystallized this. GPU view functionality broke silently when namespace filtering was added, because the AI "cleaned up" something adjacent while fixing the real task. A goroutine leak from streaming log support was invisible at the time it was introduced and only showed up as progressive slowdown, with the cause and effect separated by enough distance that diagnosis took forever. Keyboard handling became a mess because the AI understood each isolated fix but not Bubble Tea's event model as a whole. These aren't AI failures in isolation. They're predictable outcomes when any developer, human or model, works without architectural context.

What he's doing differently in the rewrite is the genuinely interesting part. He wrote an architecture document first. Not code. A document that explains what the application is, what data flows where, what belongs where, and what the invariants are. Then he's treating the AI like a fast new hire who needs that context before contributing. AGENTS.md and CLAUDE.md files with specific, enforceable rules: no new state in model.go without explicit permission, every goroutine needs a cleanup path registered before it's created, keyboard handlers live at the view level. The contrast with "write good code" instructions is sharp. Specific architectural guardrails change what the AI can do, not just what it's asked to do.

I think the em-dash comparison the author makes is the most quotable thing in the post: like em-dash is to AI writing, god-object is to AI coding. Once I read that I couldn't stop seeing it. There's a structural fingerprint to unguided AI output, and in codebases it's the gravitational pull toward putting everything in one place. The velocity is real, the debt is real, and the answer isn't to use AI less. It's to invest upfront in the context that changes what AI produces. That investment pays off only if you do it before the first session, not after the third month.

**Key takeaways:**
- AI writes features optimized for the immediate task, not for the long-term shape of the codebase. Architectural guidance has to come from the human before any code gets written.
- God-objects are the structural fingerprint of unguided AI coding, the same way em-dashes are the fingerprint of unguided AI writing. Learn to spot it early.
- AGENTS.md and CLAUDE.md files with specific, enforceable architectural rules change AI behavior in ways that general instructions like "write clean code" do not.
- The velocity win from vibe-coding is real, and so is the debt. The question is whether you invest in constraints upfront or pay for missing them later.
- A goroutine leak introduced during a feature session, undetected because its symptom is spatially distant from its cause, is a class of bug that AI can easily produce and cannot easily diagnose without full system context.

**Why do I care:** Every team I talk to is somewhere on the same arc: fast early shipping, growing confusion about why things keep breaking, nobody sure where state actually lives. The lesson here isn't specific to solo projects or Kubernetes tools. It applies to any codebase where AI is contributing across multiple sessions without a shared architectural memory. The AGENTS.md pattern, written constraints that travel with the repo and get referenced in every prompt, is the most practical thing I've seen come out of the vibe-coding era. If you're not doing this already, you're accumulating a debt you'll eventually have to pay.

**Link:** [I'm going back to writing code by hand](https://blog.k10s.dev/im-going-back-to-writing-code-by-hand/?ref=dailydev)
