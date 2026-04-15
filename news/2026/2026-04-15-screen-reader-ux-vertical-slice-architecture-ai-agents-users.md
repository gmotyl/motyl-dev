---
title: "Screen Reader UX, Vertical Slice Architecture, and AI Agents as Users"
excerpt: "Designing for screen readers, Node.js architecture patterns, AI agents interacting with interfaces, and the reality of MVPs"
publishedAt: "2026-04-15"
slug: "screen-reader-ux-vertical-slice-architecture-ai-agents-users"
hashtags: "#unicornclub #frontend #ux #architecture #accessibility #nodejs #typescript #ai #agents #generated #en"
source_pattern: "Unicorn Club"
---

## The Invisible Layer of UX Most Designers Ignore

**TLDR:** Screen readers translate your UI into a linear stream of announced roles, names, and states. Designers who only think visually are shipping broken experiences to assistive technology users. The fix doesn't require learning to code — it requires thinking in "role, name, state" while you design.

**Summary:**

Most designers spend their time pushing pixels, tweaking color palettes and layout grids until everything looks right on screen. But there's a completely different version of that same interface — how it sounds when announced by a screen reader — that most designers never experience. Users of VoiceOver or NVDA don't care about your visual polish. They need an interface structure that their assistive technology can interpret.

Screen readers reduce your UI to a linear stream of information. Every element gets communicated through three pieces: role (what it is), name (what it's called), and state (what's happening to it). A beautifully designed card component with a bold title, description, "Learn more" link, and bookmark icon might announce as nothing more than "Learn more, link. Icon, button." The visual relationships are completely lost.

The common failure patterns aren't born from bad intentions. They come from gaps between visual design and semantic meaning. Vague labels like "Click here" become meaningless when pulled out of context. Icon-only buttons with no programmatic labels announce as just "Button." Large, bold text that looks like a heading doesn't get announced as a heading unless you use proper heading tags.

The practical fix is simpler than most designers expect. You don't need to memorize ARIA specs. Think "role, name, state" for every interactive element. Write labels that make sense in isolation. Use real HTML headings, not just styled text. Bring accessibility notes into your design files before handoff. And actually try using a screen reader on your own work — the experience is jarring but it builds empathy fast.

**Key takeaways:**
- Screen readers interpret structure, not visual intent
- Every element communicates through role, name, and state
- Vague labels and icon-only buttons fail without accessible names
- Real semantic structure matters more than visual hierarchy
- Testing with actual screen readers reveals problems designs can't show

**Why do I care:**

This is a design newsletter piece, but the implications for frontend developers are direct. The markup we write is the screen reader experience. Designers can annotate Figma files all day, but if we ship a `div` styled to look like a heading instead of an actual `h2`, the screen reader user gets nothing. I keep thinking about how many times I've seen `div` buttons with `onClick` handlers instead of actual `button` elements. It's not a design problem — it's a code problem. Accessibility needs to be part of the conversation before either design or code ships.

**Link:** [The invisible layer of UX most designers ignore](https://uxdesign.cc/the-invisible-layer-of-ux-most-designers-ignore-69272cda4468)

## Minimum Viable Product: Definition

**TLDR:** An MVP is a structured experiment, not a stripped-down product. The usability of your MVP matters just as much as its functionality — if the interface is confusing, you're testing the wrong thing. Define clear hypotheses before you build anything.

**Summary:**

Low-code platforms and AI coding tools have made it trivially fast to build something. Speed of creation obscures the critical question: are we building the right thing? MVPs exist to answer that before you commit to a full build. The term comes from Eric Ries and The Lean Startup, but the original definition of "viable" focused narrowly on whether something functioned at all. Today, usability matters equally. If an MVP is hard to use, people might abandon it because the design obscures the value, not because the idea lacks merit.

The framework splits into two hypotheses. First, the value-proposition hypothesis: do users see value in the offering? This gets tested with minimal effort — paper prototypes, clickable mockups, or Wizard of Oz setups where a human performs tasks behind the scenes. Second, the solution hypothesis: will this specific implementation deliver value successfully? This requires a live-code MVP released to a real audience, measuring engagement, retention, and conversion metrics.

The risk-reward matrix determines which format to use. High-risk, high-reward ideas start as prototype MVPs. Low-risk, high-reward ideas can jump to live-code. But there's a real danger with live-code MVPs — they can damage brand perception if poorly executed. Limiting exposure to specific user segments, labeling experiences as beta, and monitoring in real time are essential safeguards.

**Key takeaways:**
- MVPs are learning tools, not rushed product launches
- Value-proposition and solution hypotheses require different testing approaches
- Usability matters as much as functionality in MVPs
- Risk-reward framework guides prototype vs. code decisions
- Cross-functional alignment on learning goals is essential

**Why do I care:**

This isn't a frontend story directly, but it hits close to home for anyone who's been asked to "just ship an MVP" without clear learning criteria. As developers, we get handed requirements and told to build fast. But if nobody defined what "supported" or "unsupported" looks like for the hypothesis, we're just building random features fast. I've been on teams where the MVP shipped, the data came in, and nobody had agreed on what the data meant. That's not lean — that's just wasteful. Push for the hypothesis before you write the first line of code.

**Link:** [Minimum Viable Product (MVP): Definition](https://www.nngroup.com/articles/mvp-definition/)

## Commercial vs Internal Products

**TLDR:** Internal products are hard, but commercial products are harder because you have to win in an open marketplace. With an internal product, users can't choose a competitor. With a commercial product, you need to be so much better that people will actively switch from whatever they use today.

**Summary:**

There's a fundamental difference between building tools for your own employees and building products that compete in the open market. Internal products have inherent advantages — users don't have the choice of switching to a competitor, the usability bar is lower because training is acceptable, and scale demands are typically minor. That doesn't make them easy, but the bar is undeniably lower.

Commercial products face the opposite dynamic. The product needs to be good enough that customers will pay for the value and actively switch from their current solution. The product manager role looks completely different too. For internal products, the "CEO of the product" framing feels tone-deaf. For commercial products, the PM needs deep immersion in marketing, sales, monetization, legal, and compliance. Product discovery becomes the difference between success and failure.

The AI era intensifies this. Competitors are emerging faster than ever, and users can increasingly vibe-code their own internal tools. The article makes a pointed observation: so many people with the title "product manager" have never been to battle in the open marketplace. That's not an insult — it's a description of fundamentally different challenges.

**Key takeaways:**
- Internal products have captive audiences; commercial products must earn every user
- Commercial PMs need deep involvement in business, not just product features
- Product discovery is critical for commercial products, optional for internal ones
- AI is lowering the barrier for internal tool creation but raising competition for commercial products

**Why do I care:**

This is primarily a product and business story, but developers should pay attention because it explains why your team feels different pressure depending on what you're building. Working on internal tools? You can ship rougher edges. Working on a customer-facing product? Every detail matters because your users have a dozen alternatives one click away. If you're a senior dev making architecture decisions, this context matters — the technical debt you can tolerate on an internal tool would kill a commercial product.

**Link:** [Commercial vs Internal Products](https://www.svpg.com/commercial-vs-internal-products/)

## Vertical Slice Architecture in Node.js

**TLDR:** Organize code by use case, not by technical layer. Each feature gets its own folder containing handler, validation, types, and tests. Adding a feature means adding a folder, not touching five different directories.

**Summary:**

The traditional layered architecture — controllers, services, models, validators, tests all in separate directories — makes understanding any single feature a scavenger hunt. Want to know how "create order" works? Open five folders. Want to delete it? Good luck finding every piece. Vertical Slice Architecture flips the organization axis entirely.

Each slice is a single use case, fully self-contained. The create-order folder holds its handler, business logic, validation schemas, TypeScript types, and tests. Everything you need to understand the feature is in one place. The split between handler (HTTP concerns) and use case (pure business logic) keeps things testable without framework dependencies. The handler is three lines: parse the request, call the use case, send the response.

Slices import from a small shared directory for cross-cutting concerns like database connections and authentication, but never from each other. When two slices need the same business logic and it must change in sync, extract it to shared. Otherwise, duplication between independent slices is cheaper than coupling. The architecture shines for apps with 15+ endpoints, multiple teams, or distinct features. Skip it for small prototypes.

**Key takeaways:**
- Group code by use case, not technical concern
- Each slice contains handler, business logic, validation, types, and tests
- Handler and use case split keeps business logic testable without HTTP mocks
- Slices import from shared but never from each other
- Enforce boundaries with linting rules, not just conventions

**Why do I care:**

This is the most directly frontend-relevant piece in this newsletter, even though the examples use Node.js. The same pattern works beautifully for Next.js API routes or any feature-driven frontend architecture. I've worked on codebases where understanding a single user flow meant jumping between six directories. Vertical slices fix that cognitive overhead. The duplication objection always comes up — people hate seeing similar validation logic in two places. But the blast radius of changing shared validation across fifteen features is genuinely scary. A little duplication between independent features is a feature, not a bug.

**Link:** [Vertical Slice Architecture in Node.js](https://thetshaped.dev/p/vertical-slice-architecture-in-nodejs-typescript-one-folder-per-use-case)

## AI Agents as Users

**TLDR:** AI agents now interact with digital interfaces alongside humans. They have goals, encounter interfaces, and succeed or fail based on how those interfaces are built. Accessibility fundamentals — semantic HTML, clear labels, logical hierarchy — are exactly what agents need too.

**Summary:**

The design community has spent decades refining what it means to design for human users. AI agents — systems that pursue goals by iteratively taking actions and evaluating progress — are now functional users of our interfaces too. They navigate websites, fill forms, compare options, and execute transactions. The conceptual shift required is simple but uncomfortable: "user" is no longer synonymous with "human."

Agents interact with interfaces in three ways. Vision-based interaction — screenshotting pages and using vision models to interpret them — is slow, expensive, and error-prone. Accessibility-tree parsing is far more efficient, using the same structured representation that screen readers rely on. Direct API access through protocols like MCP bypasses the interface entirely, but isn't widespread yet.

What breaks when agents try to use our products is revealing. A parent asking an agent to check a school website for events, cross-reference family calendars, and flag conflicts seems mundane. For the agent, every piece of information must be inferred from pixel clusters. Events spread across web pages, PDFs, and parent portals. Each step compounds error probability and token cost.

The organizations that invested in accessibility are already ahead. Clear descriptive labels, predictable interaction patterns, semantic HTML — these are the same fundamentals that make interfaces usable for people with disabilities. But there's a strategic question too: what if you don't want agents in your product? Ad-supported content, streaming discovery, financial services with regulatory friction, competitive pricing intelligence — all have legitimate reasons to resist agent access. The risk is what happens when a competitor doesn't block them.

**Key takeaways:**
- AI agents are functional users of digital interfaces today
- Accessibility-tree parsing is far more efficient than vision-based interaction
- Accessibility investments already make interfaces more agent-friendly
- Some products have legitimate reasons to resist agent access
- Blocking agents carries competitive risk if competitors opt in

**Why do I care:**

Here's where this gets interesting for frontend developers. The NN/g article is making a design case for accessibility, but the technical reality is that agents parse the same accessibility tree that screen readers use. If your app works with VoiceOver, it works with agents. If it doesn't, neither will work. I keep thinking about how many production apps I've seen with unlabeled buttons, missing heading hierarchy, and `div` soup. Those aren't just accessibility failures anymore — they're future-proofing failures. The business case for semantic HTML just got a lot stronger.

**Link:** [AI Agents as Users](https://www.nngroup.com/articles/ai-agents-as-users/)

## Designers Will Never Have Influence Without Understanding How Organizations Learn

**TLDR:** What teams are shipping via vibe coding aren't prototypes — they're demos. Demos test whether stakeholders like what they see. Prototypes test something you don't know yet. Confusing the two means nothing gets learned.

**Summary:**

The double diamond describes one dimension of the design process — how an idea moves from inception to execution. But there's a vertical slice to consider: two feedback loops, one with external customers and one with internal stakeholders. The distinction between prototypes and demos matters enormously. Demos help you show a concept to stakeholders. Prototypes test something you don't know until you build and test it.

When teams ship demos disguised as prototypes, they're testing the first feedback loop — does the stakeholder say yes? Once they do, it gets productionized and shifts into maintenance territory, where it eats up more than half the team's bandwidth while getting ignored. Nothing ends up being learned because nothing gets integrated into decision-making.

The piece lands hardest on qualitative research as a competitive advantage. Quantitative data is always downstream of the qualitative work of choosing what to measure. Data gathering is politics — the process of creating and distributing power. Good qualitative research is fundamentally different from good quantitative research, and scale actually defeats qualitative work by drowning out outliers with statistically average responses.

**Key takeaways:**
- Demos test stakeholder approval; prototypes test unknowns
- Maintenance bandwidth exceeds delivery bandwidth but gets less attention
- Data gathering is inherently political, not neutral
- Qualitative research makes sense of numbers; scale defeats it
- Content-first prototyping beats visual-first every time

**Why do I care:**

This one hits hard for anyone who's watched a vibe-coded demo ship to production without anyone defining what they were trying to learn. As developers, we get handed "prototypes" that are really just stakeholder demos and told to productionize them. The article's right — nobody tracks that second feedback loop after shipping. I've seen dashboards full of metrics that nobody uses to make decisions. That's not data-driven development; that's data-theater. The cognitive estrangement technique — starting with content instead of visuals — is actually practical advice worth trying on your next feature spike.

**Link:** [Designers will never have influence without understanding how organizations learn](https://productpicnic.beehiiv.com/p/designers-will-never-have-influence-without-understanding-how-organizations-learn)
