---
title: "Biome 2.3 Expands Framework Support While TypeScript Enums Face Obsolescence"
excerpt: "Biome adds Vue, Svelte, and Astro support while TypeScript enums become incompatible with Node.js native type-stripping"
publishedAt: "2024-11-05"
slug: "biome-v23-framework-support-typescript-enums-obsolete"
hashtags: "#generated #en #biome #typescript #vue #svelte #astro #nodejs #frontend #tooling #linting #formatting"
---

## Biome v2.3: Full support for Vue, Svelte, and Astro

**TLDR:** Biome 2.3 introduces experimental formatting and linting support for Vue, Svelte, and Astro files, including JavaScript/TypeScript in script tags and CSS in style tags, plus refined ignore syntax for better file indexing control.

**Summary:**

This release represents a significant expansion of Biome's reach beyond its traditional React and vanilla JavaScript/TypeScript roots. The tooling ecosystem has long struggled with the fragmentation between different framework-specific formatters and linters—Prettier for formatting, ESLint for linting, with various plugins for each framework. Biome's approach of being a unified toolchain becomes more compelling when it can handle the polyglot nature of modern component files.

The technical challenge here is non-trivial. Vue single-file components, Svelte files, and Astro components all embed multiple languages within a single file—template syntax, JavaScript or TypeScript in script blocks, and CSS in style blocks. Each requires different parsing strategies and rule applications. What's particularly interesting is Biome's approach to the ignore syntax with single and double exclamation marks, which suggests they're thinking deeply about developer experience and the granular control needed in complex projects.

However, there's something the announcement glosses over—the "experimental" nature of this support. In production environments, teams need stability and predictable behavior from their toolchain. The question becomes whether teams will adopt this experimental support or stick with their existing, battle-tested combinations of tools. The promise of speed and unified configuration is appealing, but the risk of encountering edge cases in framework-specific syntax parsing could be costly.

For architecture teams, this represents a consolidation opportunity. Instead of maintaining separate configuration files for Prettier, ESLint, and various framework-specific plugins, a single Biome configuration could simplify the developer experience. But the transition cost and potential for regressions during the experimental phase needs careful evaluation. Teams should consider running Biome alongside their existing tools initially, comparing outputs before making the switch.

**Key takeaways:**
- Biome now supports Vue, Svelte, and Astro files with embedded JavaScript/TypeScript and CSS
- New ignore syntax provides granular control over file indexing for type inference
- Represents a move toward unified toolchain consolidation in the frontend ecosystem

**Link:** [Biome v2.3: Full support for Vue, Svelte, and Astro](https://app.daily.dev/posts/cdEAfUvXz)

## Some software bloat is OK

**TLDR:** Modern software bloat is often a deliberate tradeoff for security, accessibility, and developer productivity rather than pure inefficiency, though the pendulum may have swung too far in some cases.

**Summary:**

This article challenges the common narrative that all software bloat is inherently bad, making the case that resource consumption has grown for legitimate reasons. The comparison between Windows 95 running on 4MB RAM and Super Mario Bros fitting in 31KB versus today's applications is striking, but it misses crucial context about what we're actually getting for that resource usage.

Modern applications handle Unicode properly, support accessibility standards, include comprehensive error handling, provide security features, and work across diverse hardware configurations. The "bloat" often represents the accumulated wisdom of decades of software engineering—proper input validation, memory safety, internationalization support, and graceful degradation. These aren't luxuries; they're necessities for software that serves a global, diverse user base.

However, the article seems to avoid grappling with the more nuanced question: where's the line between justified complexity and genuine waste? There's a difference between bloat that serves users—like accessibility features or security measures—and bloat that serves developers at users' expense, such as shipping entire framework libraries for simple interactions or including debugging tools in production builds.

The real issue isn't whether bloat is acceptable, but whether teams have the discipline and tools to distinguish between necessary complexity and lazy engineering. Modern build tools and bundlers exist precisely to help with this distinction, yet many teams don't invest in optimizing their delivery. The conversation should focus on intentional resource usage rather than blanket acceptance or rejection of larger software footprints.

For development teams, this perspective should inform architectural decisions. Don't optimize prematurely, but do measure and understand what you're shipping. The resources you consume should map to user value, not just developer convenience.

**Key takeaways:**
- Modern software bloat often represents legitimate features like security, accessibility, and internationalization
- The comparison to legacy software ignores the expanded requirements and user expectations of today
- The key is distinguishing between bloat that serves users versus bloat that serves developer convenience

**Link:** [Some software bloat is OK](https://app.daily.dev/posts/wCBfvP49Z)

## Why TypeScript Enums Are Dead

**TLDR:** Node.js v22.6.0+ native TypeScript support breaks traditional enums because they require code transformation, making 'as const' objects and type unions the preferred alternatives.

**Summary:**

This is a perfect example of how ecosystem evolution can obsolete language features overnight. TypeScript enums have always been somewhat controversial—they're one of the few TypeScript features that emit runtime JavaScript code rather than just providing compile-time type checking. This runtime emission is exactly what makes them incompatible with Node.js's new type-stripping approach.

Node.js's native TypeScript support works by literally stripping type annotations while leaving the JavaScript intact. It's a brilliant approach for performance and simplicity, but it assumes that TypeScript code can run as JavaScript with only types removed. Enums break this assumption because they require actual code transformation—the enum declaration needs to become an object with reverse mappings.

The recommended alternatives—'as const' objects and type unions—provide the same developer experience without the runtime overhead. A const assertion gives you the same autocompletion and type safety, while union types provide exhaustive checking in switch statements. These approaches align with TypeScript's philosophy of being a type layer over JavaScript rather than a different language.

What's fascinating is how this technical constraint forces better architectural choices. Runtime enums were always a leaky abstraction—they created JavaScript objects that could be modified at runtime despite appearing to be immutable constants in TypeScript. The new approach makes the type-only nature explicit and eliminates a class of potential bugs.

For teams, this represents a migration challenge but also an opportunity to clean up codebases. The transition from enums to const objects or unions is mechanical and can be automated, but it requires coordination across teams and careful consideration of any code that depends on the runtime enum behavior.

**Key takeaways:**
- Node.js native TypeScript support breaks traditional enums due to their runtime code transformation requirements
- 'As const' objects and type unions provide the same functionality without runtime overhead
- This change aligns TypeScript more closely with its philosophy of being a type layer over JavaScript

**Tradeoffs:**
- Gain compatibility with Node.js native TypeScript support but sacrifice the familiar enum syntax
- Type-only approaches improve performance but require migration effort for existing enum-heavy codebases

**Link:** [Why TypeScript Enums Are Dead](https://app.daily.dev/posts/GEV3gojxj)

## Termdock: Terminal-centric AI development environment

**TLDR:** Termdock unifies terminal management, Git visualization, and AI tools in a single interface with multi-workspace layouts and AST-based symbol search using Tree-sitter.

**Summary:**

The terminal-centric development approach is experiencing a renaissance, partly driven by the rise of AI coding assistants that work better with text-based interfaces. Termdock appears to be positioning itself at the intersection of these trends, combining traditional terminal multiplexing with modern developer experience expectations.

The multi-workspace layout with up to 4 windows plus picture-in-picture mode addresses a real pain point in modern development—context switching between different views of your system. Monitoring Docker containers, Redis instances, logs, and test outputs simultaneously is something developers cobble together with tmux sessions or multiple terminal windows. A unified interface could reduce cognitive overhead.

The AST-based symbol search using Tree-sitter is particularly interesting. Tree-sitter has become the standard for syntax highlighting and code analysis in modern editors, and leveraging it for navigation makes sense. However, the article doesn't address how this compares to Language Server Protocol implementations, which provide similar functionality with deeper semantic understanding.

What's missing from this description is how Termdock handles the complexity of different project types and toolchains. Modern development involves not just code but infrastructure as code, CI/CD pipelines, database migrations, and deployment scripts. A terminal-centric environment needs to handle this polyglot reality gracefully, not just provide a prettier interface for basic terminal operations.

The AI integration aspect is mentioned but not detailed. Given that many developers are already using AI coding assistants in their existing editors, Termdock would need to provide compelling advantages over established workflows. The terminal-centric approach might actually be a limitation here, as AI assistants increasingly provide visual diff interfaces and multi-file editing capabilities.

**Key takeaways:**
- Combines terminal multiplexing with Git visualization and AI tools in a unified interface
- Uses Tree-sitter for AST-based symbol search and navigation
- Addresses the context-switching problem in modern development workflows

**Link:** [Termdock: Terminal-centric AI development environment](https://app.daily.dev/posts/WDlrVwEcN)

## This Month in Ladybird

**TLDR:** Ladybird browser engine achieved over 90% Web Platform Tests pass rate and merged 217 PRs in October, reaching iOS alternative browser eligibility milestone with major improvements to HTTP caching, media synchronization, and web standards support.

**Summary:**

Ladybird reaching 90% Web Platform Tests pass rate is genuinely significant—this metric represents compatibility with the real web, not just theoretical standards compliance. The Web Platform Tests suite covers the intricate edge cases and interactions between web standards that determine whether a browser can actually render modern websites correctly.

The timing is particularly relevant given the regulatory pressure on browser engine diversity. Apple's iOS restrictions have created a monoculture where WebKit is the only real option, and alternative engines like Ladybird could provide genuine competition. However, the technical challenge of building a modern browser engine from scratch cannot be overstated—it's one of the most complex software projects imaginable.

The HTTP disk caching implementation is crucial for real-world performance. Modern web applications depend heavily on caching strategies, and a browser without sophisticated caching will feel sluggish regardless of how fast it can parse HTML or execute JavaScript. The audio/video synchronization with multi-track support addresses another fundamental expectation—media playback is table stakes for any browser claiming to be web-compatible.

The Trusted Types DOM integration is particularly noteworthy from a security perspective. This is a relatively new web standard designed to prevent DOM-based cross-site scripting attacks, and implementing it shows Ladybird is taking security seriously rather than just focusing on compatibility. XPath support via libxml2 suggests they're not reinventing every wheel—leveraging proven libraries where appropriate.

What the update doesn't address is the enormous challenge ahead: JavaScript performance. Modern web applications are JavaScript-heavy, and users expect near-native performance. V8 and SpiderMonkey represent decades of optimization work, and Ladybird's JavaScript engine will need to compete with that level of sophistication. The 90% Web Platform Tests pass rate is impressive, but real-world adoption will depend on performance characteristics.

For the web development community, Ladybird represents both an opportunity and a risk. More browser engine diversity could drive innovation and prevent stagnation, but it also means another engine to test against and potentially another set of quirks to work around.

**Key takeaways:**
- Achieved 90% Web Platform Tests pass rate, qualifying for iOS alternative browser consideration
- Major infrastructure improvements including HTTP disk caching and media synchronization
- Implementation of modern security standards like Trusted Types shows commitment to real-world web compatibility

**Link:** [This Month in Ladybird](https://app.daily.dev/posts/jPOCWrcJv)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
