---
title: "TanStack Rising, TypeScript Winning, and CSS Getting Random"
excerpt: "The 2025 State of React and State of JavaScript surveys are in, and the community is sending clear signals: TanStack is gaining ground, Next.js faces scrutiny, TypeScript has effectively won, and CSS is quietly becoming more capable than most developers realize."
publishedAt: "2026-05-11"
slug: "tanstack-rising-typescript-winning-css-random-daily-dev-2026-05-11"
hashtags: "#dailydev #react #typescript #angular #css #tanstack #javascript #vite #generated #en"
source_pattern: "daily.dev"
---

## React Survey: TanStack Gains Ground, Server Components Still Controversial

**TLDR:** The 2025 State of React survey shows developers are warming up to TanStack while growing more skeptical of Next.js and React Server Components. The React Compiler, though, is getting a genuinely positive reception.

**Summary:** More than 3,700 developers responded to the Devographics State of React survey this year, and the results paint a picture of a community that loves the core ideas of React but is increasingly frustrated with where the ecosystem is being taken. TanStack Query sits at 68% usage with strong positive sentiment, which, honestly, tracks with what I see in day-to-day work. It solves real problems in a focused way without asking you to buy into a whole philosophy.

TanStack Start is the more interesting story here. It's still in release candidate, not even at a stable 1.0, and developers are already excited about it. That kind of anticipation for an unfinished product tells you something about the appetite for alternatives to Next.js. People are not just mildly curious; they are actively looking.

React Server Components remain divisive. A significant portion of respondents are skeptical, and this is not surprising when you think about the mental model shift required. RSC asks you to think about your component tree in two distinct execution contexts simultaneously. The cognitive overhead is real, and the benefits, while genuine, are not always visible to developers who are not working at scale. The survey reflects that tension honestly.

The React Compiler is the good news story. 62% express enthusiasm, which is a meaningful number. The compiler's promise is that it removes the need to manually reach for useMemo and useCallback, and that is a genuinely useful thing. The question is whether production usage at scale will match the enthusiasm from early adopters.

One angle the survey does not dig into: the growing role of AI coding tools in React development. The survey notes AI could entrench React as the default framework, but it does not ask whether that entrenchment is actually good. When AI tools default to React because React has the most training data, that is a feedback loop, not a quality signal.

**Key takeaways:**
- TanStack Query at 68% usage with strong positive sentiment
- TanStack Start gaining traction before stable release
- React Server Components remain controversial with significant developer skepticism
- React Compiler at 62% enthusiasm is a bright spot
- AI coding tools may further lock in React's dominance regardless of technical merit

**Why do I care:** The TanStack momentum is real and worth paying attention to. When developers are excited about a release candidate, it means the current solution (Next.js App Router with RSC) is not meeting their needs in ways they can articulate clearly. For a senior frontend dev, this is a signal to stay genuinely framework-agnostic in your architecture decisions and avoid betting the entire team on any single meta-framework's continued dominance.

**Link:** [React survey shows TanStack gains, doubts over server components](https://app.daily.dev/posts/react-survey-shows-tanstack-gains-doubts-over-server-components-asxj6fv7a)

---

## JavaScript Survey: TypeScript Has Won, and Webpack Is on Notice

**TLDR:** The 2025 State of JavaScript survey of 12,000 developers concludes that TypeScript has effectively won the type-checking debate, while Webpack remains ubiquitous but unloved, and Vite continues its satisfaction dominance.

**Summary:** Twelve thousand respondents is a lot of signal to ignore. The headline finding that 40% of developers now code exclusively in TypeScript, with that share still growing, represents a genuine shift in how the JavaScript community thinks about its own language. The survey's blunt conclusion, "TypeScript has won," is not hyperbole. It reflects a decade of gradual adoption reaching a tipping point.

The pain points reveal what developers actually struggle with. Poor date handling near the top of the list is a complaint as old as JavaScript itself. The fact that TC39's Temporal proposal now ships in Chrome 144 is genuinely good news here, though adoption across the full browser matrix will take time, and every project has that one user on an older browser that blocks adoption.

Webpack at 86% usage is a fascinating number in contrast to its 37% dislike rate. That combination means developers are stuck with Webpack not because they love it but because migrating is expensive. Vite's near-equal usage with dramatically higher satisfaction is the pressure valve. The migration costs are real, but the satisfaction gap is wide enough that teams are doing it anyway. The survey's recommendation to adopt the Vite toolchain including Vitest by 2026 is sensible, though it undersells how painful the migration is for large established codebases.

Next.js criticism continues a theme we saw in the React survey. Growing complexity and Vercel dependency concerns are appearing in multiple independent surveys now. This is not a vocal minority on social media; it is a consistent pattern across large sample sizes. The framework is not failing, but it is accumulating surface area faster than its documentation can explain the reasoning.

Bun at 21% usage and Cloudflare Workers jumping from 1% to 12% in a short period are the more surprising numbers. Bun's growth is partly driven by its speed story for local development tooling, but Cloudflare Workers' jump suggests that edge-first deployment is moving from experimental to mainstream faster than most expected. Node.js at 90% dominance is not going anywhere, but the runtime landscape is genuinely more interesting than it was two years ago.

What the survey avoids thinking about: the gap between what developers prefer and what their employers will let them adopt. Satisfaction scores and adoption scores diverge precisely because individual preference does not translate directly into team or organizational change. The survey measures what developers think, not what they ship.

**Key takeaways:**
- 40% of developers code exclusively in TypeScript, growing year over year
- Temporal proposal shipping in Chrome 144 addresses the long-standing date handling frustration
- Webpack at 86% usage but 37% dislike, migration friction keeps people stuck
- Vite's satisfaction scores dwarf Webpack's despite near-equal usage
- Cloudflare Workers grew from 1% to 12%, edge deployment going mainstream
- Survey recommends full Vite toolchain adoption by 2026

**Why do I care:** The TypeScript conclusion matters less than what comes next. If TypeScript has "won," the interesting question is what TypeScript's ongoing evolution looks like, and whether the language can absorb the performance and ergonomics improvements developers still want without fragmenting the ecosystem. The Vite recommendation is correct but operationally hard. If you're on a large Next.js app with Webpack, the path forward is real work, not just a config change.

**Link:** [JavaScript survey reveals gripes against date handling, Webpack and Next.js](https://app.daily.dev/posts/javascript-survey-reveals-gripes-against-date-handling-webpack-and-next-js---and-that-typescript-h-ymgpw8afr)

---

## Signal Forms in Angular: A Cleaner Way to Think About Form State

**TLDR:** Angular Signal Forms replace the old push-based reactive forms model with signals, computed values, and effects, offering deterministic updates and simpler debugging especially for complex enterprise forms.

**Summary:** If you have spent any time with Angular's reactive forms and a complex validation scenario, you know the particular frustration of valueChanges streams, timing issues with cross-field validation, and the subscription cleanup tax that comes with every form component you write. Signal Forms are a direct response to these pain points, and the approach is conceptually cleaner.

The old model worked, but it worked the way a Rube Goldberg machine works. You could get where you needed to go, but the path involved a lot of RxJS operators that each required understanding, and the mental model for "when does this validation run relative to that field change" was genuinely difficult to reason about. Duplicate emissions were a real problem, not a theoretical one.

Signal Forms treat form fields as signals and derive validation, errors, and cross-field logic as computed values. This maps well to how developers actually think about forms. A checkout form's total price field is derived from quantity and unit price. A password confirmation field's validity is derived from both password fields. Expressing these relationships as computed values is more natural than wiring up separate subscriptions.

The performance story is also real. Fine-grained reactivity means Angular only re-evaluates what actually changed. For forms with many fields and complex interdependencies, this matters at runtime, not just in theory. The debugging improvement is perhaps the most underrated benefit: with computed values, you can inspect exactly what state produced a given output, rather than tracing through an event chain.

The honest caveat: Signal Forms are currently experimental. APIs may change. For a new greenfield project starting today, the approach looks promising. For an existing enterprise application with hundreds of reactive forms, the migration story is unclear, and the article does not address that. Experimental features in Angular have historically stabilized, but timeline and final API shape are unknowns. What the article also does not address is the learning curve for teams deeply invested in RxJS patterns who would need to reframe their mental model significantly.

**Key takeaways:**
- Signal Forms replace valueChanges streams with signals and computed values
- Eliminates duplicate emissions, unpredictable validation timing, and subscription cleanup overhead
- Cross-field validation expressed as computed values is more readable and predictable
- Fine-grained reactivity improves performance for complex forms
- Currently experimental, APIs may change before stabilization

**Why do I care:** Angular's reactive model has been one of the framework's rougher edges for years. The signals-first approach in general is a thoughtful direction, and extending it to forms is the right call. For teams evaluating Angular for new projects, Signal Forms represent a genuine improvement in developer experience. For existing teams, the migration pressure will depend on how stable and well-documented the APIs become. Watch this space, but do not rewrite existing forms until stability is confirmed.

**Link:** [Signal Forms in Angular: The Missing Link in Modern Reactivity](https://app.daily.dev/posts/signal-forms-in-angular-the-missing-link-in-modern-reactivity-euvvctsmb)

---

## CSS math-random(): Native Randomness Without JavaScript

**TLDR:** CSS is getting a native random() function that lets the rendering engine inject per-element randomness without JavaScript, though no stable browser ships it yet and production use requires careful progressive enhancement.

**Summary:** CSS continues its steady march toward doing things that used to require JavaScript, and the random() function from CSS Values and Units Level 5 is one of the more interesting additions. The premise is simple: instead of writing JavaScript to generate random values and inject them as custom properties, the browser's rendering engine can produce per-element randomness directly in CSS. For generative backgrounds, staggered animations, and non-uniform layouts, this is genuinely useful.

The syntax includes options that matter practically. Per-element randomness means each instance of an element gets its own value, which is what you want for scattered visual effects. Named caching identifiers let you reuse the same random value across multiple properties on the same element, so a card's random rotation and random shadow offset can be consistently tied together. These are not afterthoughts; they suggest the spec authors thought carefully about real use cases.

The production readiness story is more nuanced than the article's enthusiasm suggests. No stable browser ships this as of mid-2025. The recommendation to build against it using progressive enhancement is sound in principle, but the implementation complexity is significant. You need @supports blocks everywhere, JavaScript fallbacks that inject CSS custom properties for unsupported browsers, and SSR strategies to avoid hydration mismatches in React. That is a lot of infrastructure for a feature that is not shipped yet.

The React integration section is the most practically useful part. Hydration mismatches are a real concern because server-rendered HTML and client-side JavaScript may disagree on random values. The article's approach of using CSS custom properties as the fallback mechanism, with the browser's native random() taking over when supported, is a reasonable pattern. Performance considerations around caching are also worth understanding: the browser can cache random values per element or per render depending on how you use the caching identifier.

What I would push back on: the article's "production checklist" framing implies this is ready to ship today. It is not. Calling it "production-ready progressive enhancement" for a feature with zero stable browser support is optimistic. This is genuinely interesting to learn and experiment with, and worth understanding so you are ready when browser support arrives. Shipping it in production today means carrying JavaScript fallbacks indefinitely for an unknown period.

**Key takeaways:**
- CSS random() function enables per-element randomness evaluated by the rendering engine without JavaScript
- No stable browser ships it yet as of mid-2025; spec is in CSS Values and Units Level 5
- Per-element vs. named caching identifiers control whether values are shared across properties
- Progressive enhancement requires @supports blocks and JavaScript fallback for unsupported browsers
- React integration must account for hydration mismatches between server and client
- prefers-reduced-motion handling is required for animations using random values

**Why do I care:** Native CSS capabilities that eliminate JavaScript dependencies are worth tracking closely. The principle is sound, the spec is mature, and browser implementation is a matter of when, not if. The practical advice here is to understand the API now, build small experiments, and have the progressive enhancement pattern ready to expand when browser support crosses your project's threshold. Do not ship it in production today, but absolutely do not ignore it either.

**Link:** [CSS math-random() in Production: Native Randomness Without JavaScript](https://app.daily.dev/posts/css-math-random-in-production-native-randomness-without-javascript-g9weud1hs)

---

## AI Agents and Stack Selection: The Bottleneck You Did Not Expect

**TLDR:** A developer rebuilt a viral multiplayer game using an AI coding agent in about two minutes for three dollars, and the key finding is that stack choice, not implementation effort, determines whether AI-assisted development is fast or slow.

**Summary:** Someone rebuilt Cursor Camp, a viral Hacker News multiplayer cursor-tracking game, using the Kilo CLI tool with Claude Opus in roughly two minutes at a cost of around three dollars. The rebuild used Cloudflare Workers and Durable Objects for real-time cursor state, which is a stack well-suited to what the agent knows how to assemble quickly.

The interesting observation is not the speed or the cost but the underlying principle: when AI agents are building apps, the bottleneck shifts from implementation to architectural decision-making. The agent can write the code. What it cannot do without your input is choose the right stack for the problem. Asking the agent upfront which stack enables the fastest build for this specific problem, and answering its clarifying questions before it starts, produces measurably better and cheaper results.

This reframes the role of the developer in AI-assisted workflows. You are not reviewing generated code line by line. You are making architectural decisions that constrain the solution space so the agent can execute efficiently. The better your stack knowledge, the faster and cheaper your AI builds become. That is a different skill than what we traditionally associate with software development speed, and it is worth thinking about directly.

The choice of Cloudflare Workers and Durable Objects is worth noting. Real-time shared state is exactly what Durable Objects were designed for. An agent with good training data on this stack can assemble the solution quickly because the primitives map directly to the problem. A different stack, even a technically capable one, might require more disambiguation, more back-and-forth, and more error recovery.

What the article does not address: this is a demo, and demos are designed to work well. A two-minute, three-dollar rebuild of a relatively simple real-time game is not a representative sample of production application complexity. The principle holds, but the numbers will not. The more important question is how stack selection skill compounds over time in teams that are adopting AI-assisted development, and whether teams that make good early architectural choices are building compounding advantages.

**Key takeaways:**
- Stack selection is the primary bottleneck in AI-assisted development, not code generation speed
- Answering the agent's clarifying questions upfront and asking "which stack builds this fastest" improves outcomes
- Cloudflare Workers and Durable Objects mapped well to real-time shared state problems
- Developer skill in AI-assisted workflows increasingly means architectural judgment, not implementation speed
- Demo conditions are favorable; production complexity will produce different numbers

**Why do I care:** The shift from implementation bottleneck to architectural bottleneck is real and accelerating. For senior frontend developers, this is actually good news: the skills that are hardest to acquire, knowing which stack solves which problem and why, become more valuable as AI handles more of the implementation. The risk is that teams underestimate the importance of architectural choices and attribute poor AI-assisted outcomes to the tools rather than the setup decisions that preceded them.

**Link:** [AI agents, stack selection, and rebuilding a viral game in two minutes](https://app.daily.dev/posts/as-ai-agents-get-better-and-better-at-one-shotting-apps-from-scratch-one-factor-that-will-determine-u6eabi8lp)
