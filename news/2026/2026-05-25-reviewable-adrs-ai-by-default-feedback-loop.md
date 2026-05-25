---
title: "Reviewable ADRs, AI by Default, and the Feedback Loop That Actually Works"
excerpt: "How Architecture Decision Records give engineers a better control point over AI-generated code, and why teams learn more by using AI by default than by waiting for the perfect use case."
publishedAt: "2026-05-25"
slug: "reviewable-adrs-ai-by-default-feedback-loop"
hashtags: "#refactoring #engineering #architecture #ai #adr #agents #decision-records #generated #en"
source_pattern: "🌀 Refactoring"
---

## Reviewable ADRs, AI by Default, and the Feedback Loop That Actually Works

**TLDR:** Architecture Decision Records turn design judgment into reviewable artifacts that give engineers a better control point over AI agents than reviewing raw code. Teams that use AI by default, even when it's slower, build the feedback loops that actually make them better at it over time.

**Summary:** There's a pattern I keep seeing with engineers who are genuinely getting value out of AI coding tools, and it comes down to one word: reviewability. Luca from Refactoring FM makes a point that clicked for me immediately. He doesn't want to inspect every line of code an AI agent writes, but he absolutely can review a short decision record that explains the chosen approach, what alternatives were considered, what the consequences are, and what would trigger reconsideration. That's a fundamentally different and better control point than staring at generated code trying to reverse-engineer the reasoning behind it.

His project Tolaria has over 120 Architecture Decision Records now, and he's quick to say they're not perfect. That's the thing about ADRs done right — they don't need to be perfect. They need to be good enough that a human can understand the key design choices and that future agent runs can read past decisions, reuse existing principles, and avoid relitigating settled debates. There's also something elegant about treating them as immutable. When a decision changes, you write a new record that supersedes the old one. No rewriting history, no confusion about what was decided when.

The second idea in this issue comes from an interview with Stuart Caborn, a Distinguished Engineer at loveholidays, and it's one I find genuinely worth sitting with. His team uses AI by default, meaning they reach for it even in situations where a developer could type the code faster themselves. The local inefficiency is the point. Every failed AI attempt surfaces something: a missing instruction, an unclear doc, an invisible convention, a place where the agent needs guardrails. If you only use AI when it's obviously the right tool, you never build that feedback loop.

What makes this practical rather than just inspirational is that Stuart made failures public. The team ran showcases, shared patterns, and at one point the platform engineering team flat out told developers they wouldn't get human support on a Terraform problem unless they'd asked Claude about it first. That's a bold move, and it worked because the goal wasn't to humiliate people, it was to generate the feedback that the team desperately needed in order to improve their AI workflows. You can't improve what you can't see.

The issue also links to a few shorter pieces worth noting. One covers using ESLint rules and static analysis as sensory feedback loops for coding agents, which is a genuinely useful framing. Another makes the numbers-backed case that running LLMs locally makes no sense for the vast majority of developers. And a third from Simon Willison points out that LLMs are making whole-codebase language migrations feasible, which changes how you think about tech lock-in and the risks you can take on a stack choice.

**Key takeaways:**
- ADRs give you a reviewable artifact that captures design reasoning, alternatives, and triggers for reconsideration, which is a much better AI control point than code review alone
- Using AI by default, even when slower, builds the team feedback loop that improves AI workflows over time
- Making AI failures visible and shared, rather than private, is what actually drives systemic improvement
- Immutable ADRs that supersede rather than overwrite each other preserve the history of how decisions evolved
- LLMs are eroding programming language lock-in, which should change how teams evaluate technology risk

**Why do I care:** The ADR-as-control-point idea is one of those things that sounds obvious once you hear it but takes real discipline to implement. Most teams reviewing AI output are doing it at the wrong level, staring at code instead of asking "did the agent make the right structural choices?" ADRs force that question to be answered explicitly, before the code exists. And the "AI by default" approach from loveholidays is the kind of organizational forcing function that I think separates teams that will actually get good at this from teams that will still be arguing about when to use AI in two years. The feedback loop doesn't build itself.

**Link:** [Reviewable ADRs, AI by default, and weekly readings! 💡](https://refactoring.fm/p/reviewable-adrs-ai-by-default-and?publication_id=64099&post_id=198859305&isFreemail=true&triedRedirect=true)
