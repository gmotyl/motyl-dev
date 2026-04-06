---
title: "Why Context, Functional Teams, and the Review Bottleneck Nobody Talks About"
excerpt: "Refactoring.fm on the underrated 'why' layer of AI context engineering, Doist's functional team structure, and why every layer of review makes your process exponentially slower."
publishedAt: "2026-04-06"
slug: "why-context-functional-teams-review-bottleneck"
hashtags: "#substack #architecture #engineering #teams #management #productivity #agents #dx #generated #en"
source_pattern: "Substac"
---

## "Why" Context, Functional Teams, and Weekly Readings

**TLDR:** Most AI context engineering focuses on what and how (PRDs, tech specs, conventions). Luca Rossi argues the underrated third layer is why — principles, business domain, quarter goals, past decisions — which is invaluable when you want AI to help with architecture improvements or strategic refactoring rather than just task execution.

**Summary:** The conversation around AI context for coding has been overwhelmingly tactical. People obsess over PRDs, tech specs, and dev process conventions — the what should be done and how. Luca Rossi from Refactoring.fm points out a critical gap: the why layer. When you want AI to help find architecture improvements, refactoring opportunities, or contribute to product strategy, the what is still undecided and the how is irrelevant. What you need is context about why something would be valuable.

Why context comes in three flavors: evergreen (your principles, values, business domain), forward-looking (quarter goals, strategic bets), and retrospective (past goals, architecture decision records). The practical test is simple: how much of this is written down? Does everyone have access to it? Do people think it is important? These questions matter regardless of AI — but AI makes the absence of documented why context painfully visible because the model cannot infer organizational motivation from code alone.

The issue also features an interview with Gonçalo Silva, CTO at Doist, who shared their unconventional team structure. Doist organizes engineering into functional teams (Android, iOS, Frontend, Backend) rather than cross-functional product teams. The reasoning is that when you hire passionate Android developers and put them in an Android team that owns the Android apps, you get taste and deep expertise. To ship features, they assemble temporary squads each quarter. The tradeoff is continuity — when interesting feedback arrives two months after launch, nobody may be actively working on that feature anymore. Their product team is remarkably lean: four people supporting thirty engineers, because engineers are expected to be autonomous and opinionated from daily dogfooding.

The weekly readings section includes a particularly sharp observation from Avery Pennarun: every layer of review makes your process exponentially slower. AI can speed up coding, but it does nothing against time spent waiting for others. Reducing reviews is less about AI and more about building a culture of quality and trust.

**Key takeaways:**
- "Why" context (principles, goals, ADRs) is the missing layer in AI context engineering
- Functional teams create deep expertise; temporary squads provide shipping flexibility
- Every review layer adds exponential slowdown — AI speeds coding but not waiting
- Annie Vella's "middle loop" model: AI shifts engineering from creation to verification

**Why do I care:** The why context gap resonates deeply with what I see in consulting. Teams pour effort into CLAUDE.md files with coding conventions but never document why their architecture looks the way it does. When AI suggests a refactoring, without why context it optimizes for the wrong things. The Doist functional team model is also worth studying — it is one of the few structures I have seen that genuinely produces deep platform expertise while maintaining shipping velocity.

**Link:** ["Why" context, functional teams, and weekly readings](https://refactoring.fm/p/why-context-functional-teams-and)