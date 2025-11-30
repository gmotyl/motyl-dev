---
title: "htmx 4.0 Alpha, React Performance, and Modern Web Testing"
excerpt: "htmx surprises with v4 alpha, React performance insights with atomic state, and AI-driven testing tools reshape development workflows"
publishedAt: "2025-11-08"
slug: "htmx-4-alpha-react-performance-web-testing"
hashtags: "#generated #en #htmx #react #typescript #frontend #testing #ai #performance #jotai #playwright #fetch #architecture"
---

## htmx 4.0 Alpha - The fetch()ening

**TLDR:** htmx skips v3 entirely and releases v4 alpha, switching from XMLHttpRequest to fetch API while making attribute inheritance explicit and simplifying history management.

Carson Gross pulled a classic developer move - he promised no htmx v3, then delivered v4 alpha instead. This isn't just semantic versioning games; it's a fundamental rewrite that addresses years of accumulated technical debt. The biggest change is migrating from XMLHttpRequest to the modern fetch API, which enables streaming responses and simplifies the codebase significantly.

The most controversial change will be making attribute inheritance explicit through the `:inherited` modifier. Previously, htmx would implicitly inherit attributes from parent elements, similar to CSS cascading. Now you must explicitly declare `hx-target:inherited="#output"` on parent elements. This breaks the "it just works" magic that many developers loved, but eliminates the debugging nightmares that came with implicit behavior.

History management gets a complete overhaul too. Instead of caching snapshots in localStorage, htmx 4 will issue full page refresh requests on navigation. This trades some performance for reliability - no more mysterious state corruption or cache invalidation bugs. The team is essentially admitting that local caching was more trouble than it was worth.

What's fascinating is how this mirrors broader industry trends. We're seeing similar moves toward explicitness over magic in React Server Components, TypeScript's strict mode defaults, and even CSS with container queries replacing magic breakpoints. The pendulum swings from "convention over configuration" back to "explicit is better than implicit."

For teams considering htmx, this represents a maturation moment. Version 4 will be more predictable and debuggable, but requires more intentional coding. The streaming capabilities open up real-time features that were previously awkward to implement. However, the breaking changes mean migration won't be trivial - especially the inheritance changes will require auditing every component hierarchy.

**Key takeaways:**
- Fetch API adoption enables streaming and simplifies internals
- Explicit inheritance improves debugging but breaks existing code
- History management prioritizes reliability over performance
- Represents industry-wide shift toward explicitness over magic

**Tradeoffs:**
- Gain streaming capabilities and debugging clarity but sacrifice backward compatibility and some developer convenience
- Explicit inheritance improves maintainability but increases verbosity in component hierarchies

**Link:** [The fetch()ening](https://htmx.org/essays/the-fetchening/)

## Using Atomic State to Improve React Performance

**TLDR:** Harbor's clinical trial app moved from React Context to atomic state management (Jotai) to solve performance issues in deeply nested component trees, enabling controlled inputs without expensive rerenders.

This article tackles one of React's most persistent architectural challenges - how to manage complex state in deeply nested component trees without triggering cascade rerenders. Harbor's clinical trial data capture application represents a perfect storm scenario: four-level hierarchies (event → form → field group → field), conditional visibility logic, dynamic validation rules, and repeating sections.

The core dilemma they faced is fundamental to React architecture: controlled inputs give you the "view as a function of state" paradigm that enables complex UI logic, but at the cost of potentially expensive rerenders. Uncontrolled inputs avoid rerenders but force you into imperative, non-idiomatic workarounds for features like conditional visibility and cross-field validation.

Atomic state management through Jotai solves this by granularizing state at the component level. Instead of one large Context that triggers tree-wide rerenders, each form field becomes its own atom. Components only rerender when their specific atoms change, not when sibling or parent state updates. This enables the team to use controlled inputs everywhere while maintaining performance.

What's particularly clever is how this approach handles the clinical trial domain's complexity. Medical forms often have intricate dependencies - showing certain fields only when specific conditions are met, validating ranges based on patient demographics, or repeating sections for multiple medications. Atomic state makes these relationships explicit and performant.

The broader lesson here extends beyond React. Any state management system needs to balance granularity with complexity. Too coarse (single global state) and you get unnecessary updates. Too granular (every variable is separate) and you lose coherent data flow. Atomic state hits a sweet spot by making the component the unit of state ownership.

For teams building complex forms or data-heavy applications, this pattern is worth studying. The key insight isn't just "use Jotai" but rather "match your state granularity to your component update requirements." Similar patterns exist in other frameworks - Vue's composition API, Solid's signals, or even plain JavaScript with fine-grained subscriptions.

**Key takeaways:**
- Atomic state enables controlled inputs without cascade rerenders
- Component-level state ownership matches React's mental model
- Complex form logic becomes performant and maintainable
- Pattern applicable beyond React to any component-based architecture

**Tradeoffs:**
- Gain fine-grained performance control but sacrifice simple mental model of single state tree
- Controlled inputs everywhere improve developer experience but require more sophisticated state management

**Link:** [Using Atomic State to Improve React Performance](https://runharbor.com/blog/2025-10-26-improving-deeply-nested-react-render-performance-with-jotai-atomic-state)

## AI-Powered Testing Revolution

**TLDR:** Multiple companies are leveraging AI to automate test creation and maintenance, with Sentry's AI Code Review catching 30,000 bugs and QA Wolf providing full test coverage without writing tests.

The testing landscape is experiencing a fundamental shift as AI moves from buzzword to practical tool. Sentry's AI Code Review has caught over 30,000 bugs in its first month, including subtle logic errors that would have impacted real users. More importantly, they've improved performance by 50% through model optimization and "thinking budgets" that prevent AI overthinking.

QA Wolf represents an even more radical approach - they promise 80% automated test coverage without writing a single test. Their process involves AI analyzing your application, creating test outlines in plain English for human approval, then generating Playwright tests that run in parallel. The key insight is combining AI efficiency with human oversight for accuracy and accountability.

What's particularly interesting is how these tools handle the maintenance problem that has plagued automated testing for years. Traditional test suites become brittle as applications evolve, requiring constant updates that slow down development. AI-powered tools can automatically adapt tests when UI changes, distinguishing between actual bugs and expected changes.

However, there's a crucial gap in the current AI testing narrative. These tools excel at catching regressions and obvious bugs, but they struggle with the deeper architectural issues that experienced developers catch in code review. They might miss performance implications of algorithmic choices, security vulnerabilities in business logic, or maintainability concerns that will cause problems months later.

The real value proposition isn't replacing human testing but augmenting it. AI can handle the tedious work of regression testing and basic bug catching, freeing developers to focus on architectural review, security analysis, and user experience validation. This mirrors the broader trend of AI taking over routine tasks while humans focus on creative and strategic work.

For teams evaluating these tools, the key question isn't whether AI can replace your testing process, but how it can complement your existing practices. The most successful implementations will likely combine AI-generated coverage with human-designed test strategies, using AI for breadth and humans for depth.

**Key takeaways:**
- AI testing tools provide broad coverage without manual test writing
- Automatic test maintenance solves traditional brittleness problems
- Human oversight remains crucial for accuracy and strategic testing
- Best results come from AI handling routine tasks while humans focus on complex scenarios

**Tradeoffs:**
- Gain comprehensive automated coverage but sacrifice deep architectural testing insights
- Eliminate test maintenance overhead but depend on AI accuracy for critical bug detection

**Link:** [AI Code Review: 30K Bugs Lighter, 50% faster](https://blog.sentry.io/ai-code-review-30k-bugs-lighter-50-faster/)

## React Dominates Startup Funding Despite Ecosystem Challenges

**TLDR:** React captured 88.6% of startup funding ($2.52B) in 2024-2025, but 85% of projects across all frameworks are abandoned, raising questions about ecosystem health versus raw numbers.

Evil Martians' analysis of 334 funded startups reveals React's overwhelming dominance in the startup ecosystem, but the data tells a more nuanced story than simple market share numbers suggest. While React secured nearly 90% of funding, the broader ecosystem analysis shows that roughly 85% of projects across all frameworks are abandoned - a sobering reminder that popularity doesn't equal sustainability.

The key insight isn't React's dominance itself, but why it persists despite having "more enjoyable" alternatives. The answer lies in risk mitigation for funded companies. Startups need to hire quickly, find libraries for edge cases, and convince investors they're using "proven" technology. React's massive ecosystem - even with 83% abandonment rate - still provides 1.1 million active projects versus Vue's 114K or Angular's 128K.

What's particularly telling is the funding distribution. Vue, despite having passionate developers and elegant APIs, only captured 6.6% of funding. This suggests that technical merit alone doesn't drive adoption at scale. Network effects, hiring pools, and ecosystem maturity matter more for companies with investor pressure and growth targets.

The 85% abandonment rate across frameworks reveals something deeper about open source sustainability. Most projects start as experiments or solutions to specific problems, then get abandoned when those problems are solved or circumstances change. This isn't necessarily bad - it's how innovation works. The problem arises when teams depend on these projects for critical functionality.

For architects making framework decisions, this data suggests looking beyond GitHub stars and developer satisfaction surveys. Consider your hiring pipeline, long-term support needs, and risk tolerance. A smaller, more focused ecosystem might actually be healthier than a massive one with high abandonment rates.

The real question isn't whether React deserves its dominance, but whether the factors driving that dominance (hiring, ecosystem size, investor comfort) align with your project's actual needs. Sometimes the "boring" choice is boring for good reasons.

**Key takeaways:**
- React's funding dominance driven by ecosystem size and hiring advantages
- 85% project abandonment rate affects all frameworks equally
- Technical merit doesn't directly correlate with business adoption
- Risk mitigation often trumps developer experience in startup decisions

**Tradeoffs:**
- Choose React for ecosystem safety but sacrifice potential developer productivity gains from newer frameworks
- Large ecosystems provide more options but include more abandoned projects requiring careful library selection

**Link:** [Why startups choose React (and when you shouldn't)](https://evilmartians.com/chronicles/why-startups-choose-react-and-when-you-should-not)

## Modern Web Security with setHTML() and Sanitizer API

**TLDR:** New browser APIs like setHTML() and the Sanitizer API provide built-in XSS protection, offering configurable HTML sanitization without external libraries.

The web platform is finally addressing one of its oldest security problems with native APIs for safe HTML insertion. The setHTML() method provides XSS protection by default, automatically filtering out dangerous elements like script tags and inline event handlers. This represents a significant shift from the current landscape where developers must remember to use libraries like DOMPurify or risk security vulnerabilities.

What's particularly well-designed about this API is its configurability. The default behavior is restrictively safe - removing not just obvious dangers but also images, forms, and custom elements. Developers can then explicitly allow elements and attributes they need, following the security principle of "deny by default, allow by exception." This inverts the current pattern where developers often forget to sanitize until after a security audit.

The Sanitizer API extends this concept with more sophisticated configuration options. You can create reusable sanitizer instances with specific allowlists or blocklists, enabling consistent security policies across applications. The ability to specify allowed attributes per element type provides fine-grained control without complexity explosion.

However, there's a concerning gap in the current browser support story. While these APIs are landing in modern browsers, they're not universally available yet. This creates a challenging transition period where teams need polyfills or feature detection, potentially negating the simplicity benefits. The Safari team's "positive position" without actual implementation timeline is particularly frustrating for developers wanting to adopt these standards.

The broader implications extend beyond just HTML sanitization. These APIs represent the platform taking responsibility for security primitives that have historically been left to userland libraries. This trend - seen also in APIs like the Web Crypto API and Trusted Types - suggests browsers are maturing from document viewers to application platforms with proper security foundations.

For teams dealing with user-generated content or rich text editing, these APIs offer a path toward simpler, more secure applications. The key is planning for the transition period with appropriate polyfills and progressive enhancement strategies.

**Key takeaways:**
- Native HTML sanitization eliminates dependency on external security libraries
- Configurable security policies enable fine-grained control over allowed content
- Browser support is improving but requires careful transition planning
- Represents broader trend of platform-provided security primitives

**Tradeoffs:**
- Gain native security features but sacrifice immediate cross-browser compatibility
- Simplified API surface but limited to browsers supporting modern web standards

**Link:** [setHTML(), Trusted Types and the Sanitizer API](https://olliewilliams.xyz/blog/sanitizer/)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
