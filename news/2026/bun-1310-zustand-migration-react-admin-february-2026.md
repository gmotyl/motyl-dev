---
title: "Bun 1.3.10 Mega Release, Context-to-Zustand Migration, and React-Admin's Winter Sprint"
excerpt: "Bun ships a massive 1.3.10 release with ES decorators and 25x faster structuredClone, Trendyol shares their painful React Context to Zustand migration story, react-admin drops three minor versions with TanStack Router support, and lessons from Software Engineering at Google remain timeless."
publishedAt: "2026-02-27"
slug: "bun-1310-zustand-migration-react-admin-february-2026"
hashtags: "#dailydev #frontend #webdev #bun #react #performance #state-management #typescript #generated #en"
---

## Bun v1.3.10: The Release That Just Keeps Going

**TLDR:** Bun 1.3.10 is one of those releases where you scroll through the changelog and wonder if someone accidentally merged three months of work into one tag. Highlights include a fully rewritten REPL in Zig, compile-to-browser HTML output, TC39 stage-3 ES decorators, up to 25x faster structuredClone, and a staggering list of bug fixes spanning security, performance, and Node.js compatibility.

**Summary:**

Let me start with what matters most here: the ES decorators story. Since 2023, people have been asking Bun for standard TC39 decorators instead of the legacy TypeScript experimental ones. This release delivers the full spec, including auto-accessors with the accessor keyword, decorator metadata via Symbol.metadata, and proper evaluation ordering. If you are building anything that touches signals, dependency injection, or class-based patterns, this unblocks a significant amount of modern TypeScript code that previously required workarounds or just would not parse correctly.

The compile-to-browser feature is surprisingly practical. You run bun build --compile --target=browser and get a self-contained HTML file with everything inlined: scripts become inline script tags, stylesheets become inline style tags, and assets become data URIs. It works over file:// URLs without a server. The use case here is distributing single-file tools, dashboards, or demos where you genuinely do not want to ship a server or worry about CORS. It is a narrow use case, but when you need it, you really need it.

The performance story in this release is almost absurd in its breadth. structuredClone for arrays of numbers is 25x faster. Buffer.slice is 1.8x faster. path.parse is up to 7x faster for edge cases. String.prototype.endsWith got a JIT intrinsic making it 10.5x faster when constant-folded. The barrel import optimization is particularly notable for anyone using large component libraries like Ant Design or MUI: Bun now detects pure re-export index files and only parses what you actually import. The claim is up to 2x faster builds for libraries like lucide-react.

What the release notes bury toward the bottom is arguably the most important section: the bug fixes. There is a fix for Python MCP servers spawned via Bun.spawn where asyncio-based servers would break because shutdown() calls sent premature FIN packets. There are multiple fuzzer-detected crash fixes, a path traversal vulnerability in tarball extraction, an HTTP response splitting vulnerability, header injection in the S3 client, and a memory leak of 260KB per request when cancelling streaming response bodies. If you are running Bun in production, this is less of an upgrade and more of a required patch.

The one thing missing from this release narrative is any discussion of stability guarantees. Bun is shipping remarkable features at remarkable speed, but the volume of security fixes and crash repairs in each release tells a story about the tradeoffs of that velocity. Users need to decide whether the performance benefits justify running a runtime that is still discovering new classes of bugs at this rate.

**Key takeaways:**
- TC39 stage-3 ES decorators are now fully supported, including auto-accessors and decorator metadata
- compile-to-browser produces self-contained HTML files with all assets inlined
- Barrel import optimization can halve build times for large component library consumers
- structuredClone is up to 25x faster for primitive arrays, with further gains for object arrays
- Multiple security vulnerabilities fixed including path traversal, HTTP header injection, and response splitting
- The Python MCP server stdio fix is critical for anyone using Bun to orchestrate AI agent tooling

**Link:** [Bun v1.3.10](https://bun.sh/blog/bun-v1.3.10)

---

## Breaking the Re-render Chain: Migrating from React Context to Zustand

**TLDR:** The Trendyol Affiliate Ads team discovered their complex Ads Editor was generating over 8,000 function calls per interaction due to cascading re-renders from React Context. They migrated to Zustand with a feature-based store architecture and saw dramatic performance improvements, but the real lesson is about knowing when your state management tool has hit its ceiling.

**Summary:**

This is a war story from the Trendyol engineering team, and it is exactly the kind of article that should make you pause before reaching for React Context as your primary state management solution. Their Ads Editor, a complex form-heavy application, was suffering visible UI lag because every context update triggered re-renders across the entire consumer tree. React Context has no built-in mechanism for granular subscriptions. When one value changes, every consumer re-renders, and if your context holds ten pieces of state, a change to any one of them invalidates all ten subscribers.

The migration to Zustand addressed this by leveraging its selector-based subscription model. Components only re-render when the specific slice of state they care about actually changes. The team adopted a feature-based store architecture, meaning they did not dump everything into a single global Zustand store. Instead, they created focused stores aligned with feature boundaries. This is a pattern worth highlighting because the most common Zustand antipattern is replicating the same "one giant context" problem in a "one giant store" shape.

What the article likely underexplores is the question of why Context was chosen in the first place, and whether the 8,000 function calls per interaction was partly a component architecture problem rather than purely a state management problem. Context re-renders are catastrophic when your component tree is deep and your context values are large compound objects. But if your components were already well-decomposed and memoized, the blast radius would have been smaller. Zustand solves the subscription problem elegantly, but it does not solve the "I put too much into one state container" problem that often accompanies Context misuse.

The practical takeaway is clear though: if you are building anything more complex than a theme toggle or auth context, React Context alone is going to cause you pain at scale. Zustand, Jotai, or any library with fine-grained subscriptions is not premature optimization for complex editors and form-heavy UIs. It is table stakes.

**Key takeaways:**
- React Context lacks granular subscriptions, causing full consumer tree re-renders on any value change
- Zustand selectors let components subscribe to specific state slices, eliminating unnecessary re-renders
- Feature-based store architecture prevents recreating the monolithic context problem inside Zustand
- Complex editor UIs with frequent state changes are the worst-case scenario for Context-based state management
- The migration story underscores the importance of load-testing your state management choice early

**Link:** [Breaking the Re-render Chain: Our Migration from Context to Zustand](https://app.daily.dev/posts/breaking-the-re-render-chain-our-migration-from-context-to-zustand-iens0uzws)

---

## React-Admin: February 2026 Update Across Three Minor Versions

**TLDR:** React-admin shipped versions 5.12, 5.13, and 5.14 in three months, introducing a TanStack Router adapter, dramatically faster ArrayInput performance, new components like RecordsIterator and DataTableInput, and a headless core extraction that enables the growing Shadcn Admin Kit. This is a framework that is quietly becoming more capable and more portable at the same time.

**Summary:**

The headline feature here is probably the router abstraction layer with TanStack Router support. React-admin has been married to react-router since its inception, and decoupling that dependency is architecturally significant. The new ra-router-tanstack package means you can now use react-admin inside TanStack Start applications, which opens up a different server-side rendering story than what react-router provides. The implementation is pleasingly clean: you just pass a routerProvider prop to the Admin component and everything works.

The ArrayInput performance fix in 5.13 deserves attention because it addresses a long-standing pain point. Arrays of more than a dozen elements with multiple inputs per element were causing visible lag because every change triggered a full re-render of the entire form array. The fix leverages fine-grained subscriptions from the latest react-hook-form, which is the same conceptual solution as the Zustand migration story above. The pattern is consistent: coarse-grained subscriptions are the enemy of form performance.

The new RecordsIterator component is a nice quality-of-life addition. It fills the gap between Datagrid, which is structured, and building a fully custom list iterator from scratch. You get a render prop or children pattern with automatic RecordContext creation, and it works in any ListContext including ReferenceManyField and ReferenceArrayField. DataTableInput is the enterprise edition highlight, providing a table-based selection dialog that solves the problem of choosing from large datasets where an autocomplete dropdown just does not provide enough information.

What is strategically interesting is the headless core extraction. React-admin is pulling more logic into ra-core and making the UI layer thinner. This directly enables the Shadcn Admin Kit, which reimplements the UI with Shadcn components while reusing the same headless hooks. It is a smart architectural play: instead of competing with the Material UI vs Tailwind debate, react-admin is positioning itself as the state management and data layer that works with whatever UI kit you choose. The question is whether the enterprise edition components will follow this pattern, or whether the headless story remains limited to the open-source core.

The modernized package exports targeting es2020 instead of es5 is a small change with real impact: five to fifteen percent bundle size reduction. It is the kind of change that framework authors should have made years ago, but backward compatibility anxiety kept everyone shipping polyfills for browsers that no one uses anymore.

**Key takeaways:**
- TanStack Router adapter makes react-admin usable with TanStack Start and decouples the react-router dependency
- ArrayInput performance fix leverages fine-grained react-hook-form subscriptions to eliminate full-array re-renders
- RecordsIterator fills the gap between Datagrid and fully custom list rendering
- Headless core extraction enables the Shadcn Admin Kit and makes ra-core the real product
- es2020 target reduces bundle size by 5-15 percent with no practical browser compatibility loss
- Atomic CRM now supports SSO, offline mobile, MCP server, and has migrated from MUI to Shadcn

**Link:** [React-Admin: February 2026 Update](https://marmelab.com/blog/2026/02/26/react-admin-february-2026-update.html)

---

## Lessons from Software Engineering at Google: What Holds Up and What Doesn't

**TLDR:** A detailed breakdown of the book "Software Engineering at Google" covers Hyrum's Law, the Beyonce Rule, why Google prefers fakes over mocking frameworks, shift-left testing, and the case for small frequent releases. The lessons are timeless, but the context of a monorepo at Google scale means not everything translates directly.

**Summary:**

The distinction the book draws between programming and software engineering is the foundation everything else builds on. Programming is writing code that works. Software engineering is writing code that works over time, across a team, with changing requirements. That distinction changes how you think about testing, code review, dependency management, and release cadences. It is the difference between solving a puzzle once and maintaining a machine that needs to keep running.

Hyrum's Law, the idea that any observable behavior of your system will eventually be depended upon by somebody, is perhaps the most practically useful concept in the book. It explains why seemingly safe refactors break things, why API versioning is so hard, and why deprecation timelines always slip. The Beyonce Rule complements it: if you liked it, you should have put a test on it. If a behavior is not covered by automated tests, you have implicitly accepted that it can change without warning. Together, these two concepts form a pragmatic framework for understanding why software systems calcify.

The book's stance on mocking frameworks is provocative and worth challenging. Google prefers fakes, lightweight in-memory implementations of real interfaces, over mock objects because mocks couple tests to implementation details rather than behavior. This is sound advice for large organizations where tests outlive the code they were written for. But it is also advice that comes from a company with the engineering capacity to build and maintain high-quality fakes for every internal service. Most teams do not have that luxury, and a well-written mock with clear expectations is often more practical than building a fake datastore.

The shift-left testing philosophy, finding bugs earlier in the development cycle where they are cheaper to fix, is uncontroversial in principle but harder to execute than the book suggests. It requires investment in fast local test suites, good CI infrastructure, and a culture that treats test failures as blocking. Many organizations adopt the language of shift-left without investing in the infrastructure that makes it possible, resulting in slow test suites that developers skip locally and only discover failures in CI thirty minutes later.

What the article and likely the review miss is the degree to which Google's engineering practices are shaped by their monorepo and custom tooling. Small frequent releases, extensive automated testing, and the Beyonce Rule all work differently when you have a single repository with unified build tooling and a culture that has been practicing trunk-based development for two decades. The lessons are directionally correct for everyone, but the implementation details require significant adaptation for organizations using polyrepo setups with different CI systems and dependency management approaches.

**Key takeaways:**
- Hyrum's Law: any observable behavior will be depended upon, making safe changes harder than they appear
- The Beyonce Rule: if it is not tested, it can change without notice
- Google prefers fakes over mocks to keep tests coupled to behavior rather than implementation
- Shift-left testing requires infrastructure investment, not just cultural aspiration
- Small frequent releases reduce risk per deployment but require automated quality gates
- The monorepo context means not all Google practices translate directly to polyrepo organizations

**Link:** [What I learned from the book Software Engineering at Google](https://app.daily.dev/posts/what-i-learned-from-the-book-software-engineering-at-google-i6xedpxus)

---

## From npm to a Single Binary: Migrating the Tigris CLI to Bun

**TLDR:** The Tigris team migrated their TypeScript CLI from Node.js with npm distribution to a Bun-compiled standalone binary. The migration required reworking dynamic imports and lazy-loaded command handlers into static equivalents to accommodate Bun's bundling constraints, but the result is a single binary that eliminates the npm installation dependency entirely.

**Summary:**

This is a practical companion piece to the Bun 1.3.10 release notes because it shows what actually happens when you try to use bun build --compile for a real-world CLI tool. The Tigris CLI was originally a TypeScript project distributed via npm, meaning users needed Node.js installed and had to run npm install to get the tool. The migration goal was to produce a standalone binary that users could download and run without any runtime dependencies.

The interesting friction points were all around Bun's static bundling model. CLI frameworks like oclif and yargs often use dynamic imports and lazy loading to keep startup fast: you only parse the code for the subcommand the user actually invoked. Bun's compile step needs to resolve all imports at build time, which means dynamic imports using variables do not work. The Tigris team had to create a parallel entry point that statically imports everything, and they wrote code generation scripts to automatically produce these static equivalents from their existing lazy-loaded command structure.

The YAML import problem is another telling detail. If your CLI reads YAML configuration files using dynamic paths, those files are not available inside the compiled binary. The team had to either embed the YAML content at build time or restructure how configuration was loaded. These are the kinds of issues that do not show up in the bun build --compile tutorial but immediately surface in any real project with runtime file dependencies.

What the article should push harder on is the tradeoff analysis. A single binary is great for distribution, but you lose the ability to patch individual files, you lose the npm ecosystem's version resolution for transitive dependencies, and you take on the responsibility of building and distributing binaries for every target platform. For a CLI tool from a company that controls its own distribution, this makes sense. For an open-source tool where contributors expect to clone and run npm install, the development experience becomes more complex. The article presents the migration as a clear win, but the ongoing maintenance costs of maintaining both the development-time npm workflow and the production-time Bun compile pipeline deserve more scrutiny.

**Key takeaways:**
- Bun's compile step requires all imports to be statically resolvable, breaking lazy-loaded CLI patterns
- Dynamic file reads like YAML configs must be embedded at build time or restructured for compiled binaries
- Code generation bridges the gap between development-time dynamic imports and build-time static requirements
- Single binary distribution eliminates the Node.js and npm dependency for end users
- The tradeoff is increased build complexity and the need to maintain platform-specific binary distribution

**Link:** [From npm to a Single Binary: Adopting Bun for the Tigris CLI](https://app.daily.dev/posts/from-npm-to-a-single-binary-adopting-bun-for-the-tigris-cli-qwg3sye2x)