---
title: "AWS Kiro AI IDE, TypeScript Discriminated Unions, and React Server Components with Parcel"
excerpt: "AWS launches Kiro with spec-driven AI development and property-based testing, TypeScript tricks for discriminated unions, RSC beyond Next.js, and why Markdown may not be enough for serious documentation."
publishedAt: "2025-11-26"
slug: "aws-kiro-typescript-unions-rsc-parcel-markdown-limits"
hashtags: "#generated #en #ai #typescript #react #react-server-components #parcel #aws #documentation #testing #tanstack #convex"
---

## AWS Kiro Reaches General Availability: Spec-Driven AI Development

**TLDR:** AWS has released Kiro, an AI-powered IDE and CLI that emphasizes spec-driven development, property-based testing to verify code matches specifications, and autonomous agents that run tasks on file changes.

Amazon Web Services has entered the AI coding tool space with Kiro, taking a notably different approach from competitors. Rather than focusing purely on code generation, Kiro structures the development process around specifications - written requirements that guide AI behavior and provide verification targets.

The most technically interesting feature is property-based testing for spec correctness. Traditional unit tests check specific examples that humans or AI must think of beforehand. Property-based testing extracts universal properties from specifications - statements like "for any authenticated user and any active listing, the user can view that listing" - then generates hundreds or thousands of random test cases to verify code behavior. When violations occur, the system employs "shrinking" to find minimal counter-examples, essentially red-teaming your implementation.

This addresses a fundamental problem with AI-generated code: knowing whether it actually does what you specified. Traditional tests can be gamed, and whoever writes them brings their own blind spots. Property-based testing provides evidence across scenarios you would never write manually.

Beyond specifications, Kiro introduces autonomous agents triggered by file saves - automatically generating tests, optimizing performance, and updating documentation. The new CLI brings these capabilities to terminals, with custom agents that can be specialized for specific domains like backend APIs or frontend components.

For teams evaluating AI development tools, Kiro represents a bet on structure and verification rather than raw generation speed. The spec-driven approach may appeal to organizations where requirements traceability and correctness verification matter. The property-based testing capability addresses real concerns about AI code quality that simpler tools ignore.

**Key takeaways:**
- Spec-driven development creates structured requirements that guide AI behavior
- Property-based testing verifies code matches specifications across thousands of generated cases
- Autonomous agents run on file changes for tests, documentation, and optimization
- CLI brings same capabilities to terminal with custom agent specialization

**Tradeoffs:**
- Specification overhead adds upfront work but improves verification and maintainability
- Property-based testing provides broader coverage but requires expressing requirements as universal properties

**Link:** [Kiro is generally available](https://kiro.dev/blog/general-availability/)

---

## Omit for Discriminated Unions in TypeScript: The Distributive Fix

**TLDR:** TypeScript's built-in Omit utility type destroys discriminated unions by flattening them, but a simple DistributiveOmit pattern using conditional types preserves union structure and improves type safety.

When building React components that wrap lower-level primitives, Omit provides a clean way to inherit props while excluding specific ones. Your UserSelect component can declare its props as Omit<SelectProps, 'options'>, automatically staying in sync with SelectProps changes. This works beautifully until SelectProps becomes a discriminated union.

Consider adding a clearable feature to Select where onChange receives null only when clearable is true. A discriminated union elegantly expresses this - ClearableSelectProps and UnclearableSelectProps with different onChange signatures, discriminated by the clearable flag. The type system can then enforce that non-clearable selects don't need to handle null values.

But applying Omit to this union produces unexpected results. Instead of preserving the union structure, Omit treats the union as a whole and expands everything. Your carefully crafted discrimination disappears, leaving a flattened type where clearable is boolean | undefined and onChange accepts both signatures simultaneously.

The fix leverages distributive conditional types. When a conditional type acts on a generic given a union, it becomes distributive - applying to each union member individually. The pattern is deceptively simple: wrap Omit in a fake conditional that always matches. The type T extends any ? Omit<T, K> : never looks pointless since everything extends any, but the conditional structure triggers distribution.

The resulting DistributiveOmit preserves your discriminated union, with Omit applied to each branch separately. As a bonus, using K extends keyof T instead of keyof any means TypeScript will flag attempts to omit keys that don't exist - catching dead code from past refactorings.

For teams using discriminated unions extensively, this pattern should become standard library code. The improvement in type safety is substantial when combined with modern component composition patterns.

**Key takeaways:**
- Built-in Omit flattens discriminated unions, losing type discrimination
- DistributiveOmit using T extends any ? Omit<T, K> : never preserves union structure
- The same pattern works for Pick and other utility types
- Using K extends keyof T catches omission of non-existent keys

**Link:** [Omit for Discriminated Unions in TypeScript](https://tkdodo.eu/blog/omit-for-discriminated-unions-in-type-script)

---

## React Server Components with Parcel: RSC Beyond Next.js

**TLDR:** Parcel 2.9.0 adds React Server Components support, enabling RSC patterns without Next.js - including server-side data fetching, server functions for mutations, and optimistic updates using useOptimistic.

React Server Components are no longer Next.js-exclusive. Parcel's implementation provides an instructive look at RSC fundamentals without framework-specific abstractions. The setup reveals what RSC actually requires: Express routes that call renderRequest with React components, server functions marked with "use server" directives, and client-side scripts for navigation.

The data fetching pattern demonstrates RSC's core value proposition. Server components can await data directly - no useEffect, no loading states for initial render. A TasksPage component calls getTasks and awaits the result inline, with the database query executing server-side. The browser receives HTML with data already rendered. Network payloads shrink dramatically since you're sending rendered HTML rather than JavaScript bundles plus JSON data.

Server functions blur the client-server boundary in interesting ways. A component imports addTask from a "use server" file and calls it in a form action. Under the hood, this becomes a fetch request, but the code reads as if client and server share the same module. This enables "full-stack components" - reusable units containing both frontend rendering and backend mutation logic.

The optimistic updates pattern using useOptimistic shows how RSC handles the gap between mutation initiation and server response. The hook maintains optimistic state that updates immediately while mutations run, with rollback on failure. Combined with useTransition for pending states, this produces responsive UIs despite server roundtrips.

For architects evaluating RSC adoption, Parcel's implementation provides clarity about what RSC actually requires versus what frameworks add. Teams can experiment without committing to Next.js's full opinion stack. The tradeoffs become visible: simpler mental models for data flow, but new complexity around navigation, caching, and routing that frameworks typically handle.

**Key takeaways:**
- Parcel 2.9.0 enables RSC without Next.js framework coupling
- Server components await data directly, eliminating client-side fetch complexity
- Server functions in "use server" files become transparent RPC calls
- useOptimistic provides immediate UI updates during server mutations

**Tradeoffs:**
- Simplified data fetching model but requires server infrastructure
- Full-stack components increase reusability but couple frontend to backend APIs

**Link:** [React Server Components With Parcel](https://marmelab.com/blog/2025/11/14/react-server-components-with-parcel.html)

---

## TanStack Start with Convex: Real-Time Data in the New React Framework

**TLDR:** Convex provides a quickstart integration with TanStack Start, combining TanStack's new React framework with Convex's real-time database through React Query integration.

TanStack Start, currently in Release Candidate status, represents Tanner Linsley's vision for a React meta-framework built on TanStack Router. The Convex integration demonstrates how third-party backend services fit into this new framework paradigm.

The setup wires Convex through React Query via ConvexQueryClient. This integration means Convex queries benefit from React Query's caching, deduplication, and background refetching while maintaining Convex's real-time subscription capabilities. The useSuspenseQuery hook renders API functions server-side initially, then updates live in the browser as data changes.

The pattern of defining backend queries in a convex/ folder with typed exports creates a clean separation. Query functions like api.tasks.get become strongly typed references usable throughout the frontend. Changes to the backend schema propagate to frontend types automatically.

For teams evaluating the emerging meta-framework landscape, TanStack Start offers an interesting alternative to Next.js and Remix. Its tight integration with TanStack Router and Query provides familiarity for teams already using those libraries. The Convex integration shows that the framework's architecture accommodates external backend services without friction.

**Key takeaways:**
- TanStack Start in RC status, providing new meta-framework option
- Convex integration through React Query maintains real-time updates
- useSuspenseQuery enables server-side rendering with live client updates
- Typed backend queries propagate types to frontend automatically

**Link:** [TanStack Start Quickstart with Convex](https://docs.convex.dev/quickstart/tanstack-start)

---

## Markdown Is Holding You Back: The Case for Semantic Markup

**TLDR:** Markdown's simplicity becomes a liability for serious documentation - it lacks semantic structure needed for machine consumption, content reuse, and multi-format publishing. AsciiDoc, reStructuredText, DocBook, and DITA offer alternatives with explicit typing.

Markdown's popularity stems from its approachability - human-readable with just enough syntax for GitHub and static sites. But this simplicity creates significant limitations when content must serve multiple purposes beyond human reading.

The fundamental problem is that Markdown is "implicit typing" for content. There's no schema, no enforced consistency. A heading might be a concept, a procedure step, or just a title - machines cannot distinguish. Different Markdown flavors (CommonMark, GitHub-Flavored, MyST, MultiMarkdown) compound the inconsistency. What renders in one tool breaks in another.

MDX attempts to extend Markdown with React components, but this creates custom, brittle, non-portable markup. A <Command> component works on your site because your build system implements it. Syndicate that content elsewhere and it breaks. You're reinventing semantic markup without standardization.

Semantic markup matters for two interconnected reasons. First, transformation and reuse: with semantic source, you can publish to HTML, PDF, ePub, or ironically even Markdown. You cannot easily add context that wasn't captured initially. Second, machine consumption: LLMs and AI agents perform better with structured content. A step marked as <step> is unambiguous; a bullet point might be anything.

The alternatives each occupy different points on the complexity spectrum. reStructuredText and AsciiDoc balance expressiveness with usability - directives, admonitions, cross-references, and document attributes without XML verbosity. DocBook provides industrial-grade XML with extensive transformation tooling. DITA adds topic-based architecture with content reuse and specialization capabilities.

For documentation architects, the principle is clear: start with the richest format you can manage and export downward. Markdown makes an excellent output format. Be careful not to lock into it as your source of truth.

**Key takeaways:**
- Markdown lacks semantic structure for machine consumption and content reuse
- Different Markdown flavors create inconsistency and portability issues
- AsciiDoc and reStructuredText offer semantic markup without XML complexity
- Start with rich source formats and export to simpler ones, not vice versa

**Tradeoffs:**
- Markdown's simplicity enables rapid authoring but limits transformation and machine processing
- Semantic markup requires more upfront structure but enables multi-channel publishing and AI comprehension

**Link:** [Markdown is Holding You Back](https://newsletter.bphogan.com/archive/issue-45-markdown-is-holding-you-back/)

---

## Set Theory Meets Computer Science: A Bridge Between Infinity and Algorithms

**TLDR:** A mathematician discovered that problems about infinite sets can be rewritten as problems about distributed algorithms on networks, creating a surprising bridge between descriptive set theory and computer science.

Anton Bernshteyn's 2023 discovery revealed an unexpected equivalence between two fields that seem to have nothing in common. Descriptive set theory studies infinite sets using the language of logic. Computer science deals with finite networks using algorithms. There's no apparent reason their problems should relate.

Descriptive set theorists study how sets can be measured and organized in hierarchies. At the top are "nice" sets that can be measured in many ways. At the bottom are "pathological" unmeasurable sets that behave counterintuitively. The field helps other mathematicians understand what tools they can apply to their problems based on where the required sets sit in this hierarchy.

The computer science connection emerged from distributed algorithms - instructions that run simultaneously on network nodes without central coordination. Consider Wi-Fi routers needing different frequency channels from neighbors. This becomes a graph coloring problem: nodes represent routers, edges connect nearby ones, colors represent channels. Find a coloring where no connected nodes share colors.

Both fields ask similar questions about graph coloring, but with different constraints. Computer scientists ask: how many communication rounds does a local algorithm need? Set theorists ask: can we color infinite graphs in measurable ways without using the axiom of choice (a logical assumption that leads to unmeasurable sets)?

Bernshteyn showed these questions are equivalent for important classes of problems. Every efficient local algorithm can be transformed into a measurable way of coloring corresponding infinite graphs. The two bookshelves - one organized by algorithmic efficiency, the other by measurability - turn out to contain the same problems in different languages.

For mathematicians, this opens new approaches to previously intractable problems. Computer science's more organized classifications now guide set theorists in placing problems they couldn't previously categorize. The fields can borrow techniques across the bridge.

**Key takeaways:**
- Distributed algorithm efficiency maps to set theory measurability for graph problems
- The connection reveals deep links between computation and definability
- Mathematicians can now attack problems from either side of the bridge
- Set theorists gain clearer organization from computer science's classification schemes

**Link:** [A New Bridge Links the Strange Math of Infinity to Computer Science](https://www.quantamagazine.org/a-new-bridge-links-the-strange-math-of-infinity-to-computer-science-20251121/)

---

*The content above was curated from the Bytes newsletter by ui.dev. While I have analyzed and synthesized these sources, readers should verify critical details from original sources before making significant decisions.*