---
'title': 'Frontend Masters Newsletter: AI, CSS, and Modern Web Development Trends'
'excerpt': 'Exploring the latest developments in web development, from AI advancements and CSS innovations to database trends and TypeScript evolution.'
'publishedAt': '2026-01-09'
'slug': 'frontend-masters-newsletter-ai-css-modern-web-development'
'hashtags': '#frontendmasters #frontend #typescript #css #ai #webdev #javascript #development #programming #tech'
---

# Frontend Masters Newsletter: AI, CSS, and Modern Web Development Trends

## The Next Two Years of Software Engineering

**TLDR:** The software industry is at an inflection point with AI coding evolving from autocomplete to autonomous agents. Economic efficiency mandates are changing hiring patterns and development approaches, with experienced hires favored over fresh graduates and smaller teams with better tools.

The landscape of software engineering is rapidly evolving as AI tools become more sophisticated. The traditional pathway of "learn to code, get junior job, grow into senior" is wobbling as companies adopt generative AI, which has led to a 9-10% drop in junior developer employment within six quarters. However, AI may also unlock massive demand for developers across industries as healthcare, agriculture, manufacturing, and finance embed software and automation.

For junior developers, the key is to become AI-proficient and versatile, demonstrating that one junior plus AI can match a small team's output. Focus on skills AI can't easily replace: communication, problem decomposition, and domain knowledge. For senior developers, fewer juniors means more grunt work landing on your plate, so lean on automation for routine tasks and mentor unofficially through open source or coaching.

What to do about it:
- Junior developers: Use AI as a learning tool, not a crutch. Occasionally disable your AI helper and write key algorithms from scratch. Prioritize CS fundamentals: data structures, algorithms, complexity, memory management.
- Senior developers: Position yourself as the guardian of quality and complexity. Sharpen your core expertise: architecture, security, scaling, domain knowledge. Embrace your role as mentor and reviewer.

**Key takeaways:**
- AI is reshaping the developer role from maker to checker/orchestrator
- T-shaped developers with broad adaptability and one or two deep skills are favored
- Traditional CS degrees may be supplemented by bootcamps, online platforms, and employer training

**Tradeoffs:** Gain efficiency through AI assistance but sacrifice hands-on learning and foundational understanding if relying too heavily on AI-generated code.

**Link:** [The Next Two Years of Software Engineering](https://addyosmani.com/blog/next-two-years/)

## CSS Wrapped 2025: Revolutionary New Features

**TLDR:** CSS Wrapped 2025 introduces groundbreaking features like Invoker Commands for declarative element interactions, Dialog Light Dismiss for better accessibility, customizable select elements, and CSS anchor positioning improvements.

The CSS landscape is experiencing a renaissance with new features that make complex UI patterns declarative and accessible. Invoker Commands allow buttons to perform actions on other elements without JavaScript, using attributes like `commandfor` and `command`. The new `closedby` attribute brings Popover API's light dismiss behavior to `<dialog>` elements.

Customizable select elements are now possible with `appearance: base-select`, allowing full CSS customization of dropdowns, including HTML content within options. The new `::scroll-marker/button()` pseudo-elements enable native carousel implementations with CSS-only navigation buttons and position markers.

What to do about it:
- Start using Invoker Commands for simple UI interactions to reduce JavaScript dependencies
- Implement Dialog Light Dismiss for better accessibility in modal experiences
- Explore customizable select elements for improved user experience

**Key takeaways:**
- CSS is becoming more declarative with features like Invoker Commands
- Accessibility is improving with Dialog Light Dismiss behavior
- Carousel implementations can now be purely CSS-based

**Tradeoffs:** Gain declarative UI patterns but sacrifice some fine-grained control that JavaScript provides.

**Link:** [CSS Wrapped 2025](https://chrome.dev/css-wrapped-2025/)

## Introducing CSS Grid Lanes: The Future of Masonry Layouts

**TLDR:** CSS Grid Lanes (`display: grid-lanes`) brings masonry layouts to the web with the full power of CSS Grid, allowing for flexible, responsive layouts without JavaScript.

Grid Lanes enables classic masonry layouts with three lines of CSS: `display: grid-lanes`, `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))`, and `gap: 16px`. The algorithm places items in whichever column gets it closest to the top of the window, similar to traffic in bumper-to-bumper traffic changing lanes to get ahead.

The feature includes "tolerance" controls that determine how picky the layout algorithm is when deciding where to place items. The default `flow-tolerance: 1em` means only differences in content length greater than 1em will matter when figuring out where the next item goes.

What to do about it:
- Try Grid Lanes in Safari Technology Preview 234 for masonry layouts
- Experiment with varying lane sizes using `grid-template-columns`
- Use spanning items with `grid-column: span n` for dynamic designs

**Key takeaways:**
- Masonry layouts are now possible with native CSS
- Grid Lanes uses the full power of CSS Grid for lane definitions
- Tolerance settings control layout algorithm sensitivity

**Tradeoffs:** Gain native masonry layouts but sacrifice some control over exact item placement compared to JavaScript solutions.

**Link:** [Introducing CSS Grid Lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/)

## Progress on TypeScript 7 - Native Port and Performance Improvements

**TLDR:** TypeScript 7.0 introduces a native port codenamed "Project Corsa" that dramatically improves performance, memory usage, and parallelism. The new compiler shows up to 10x speed improvements over TypeScript 6.0.

The native port of TypeScript brings significant performance improvements with builds showing 7.5x to 10.2x speedups. The new compiler, available as `@typescript/native-preview`, includes a new language service with features like auto-imports, find-all-references, and rename that now work in any TypeScript or JavaScript codebase.

TypeScript 7.0 will remove behaviors and flags planned for deprecation in TypeScript 6.0, including `--strict` becoming the default, `--target` defaulting to the latest ECMAScript target, and removal of `--target es5`.

What to do about it:
- Try the native preview extension for VS Code today
- Install `@typescript/native-preview` for command-line builds
- Prepare for TypeScript 7.0 by updating configurations for deprecated features

**Key takeaways:**
- TypeScript 7.0 offers dramatic performance improvements
- Native port enables shared-memory parallelism
- Deprecation of older behaviors prepares for future standards

**Tradeoffs:** Gain performance improvements but sacrifice compatibility with older TypeScript configurations and require migration to new defaults.

**Link:** [Progress on TypeScript 7 - December 2025](https://devblogs.microsoft.com/typescript/progress-on-typescript-7-december-2025/)

## Bun Joins Anthropic: AI Coding Infrastructure Bet

**TLDR:** Bun has been acquired by Anthropic to power Claude Code, Claude Agent SDK, and future AI coding products. Bun remains open-source and MIT-licensed while focusing on high-performance JavaScript tooling.

The acquisition positions Bun as the infrastructure layer for AI coding tools. Bun's single-file executables are perfect for distributing CLI tools that can compile any JavaScript project into a self-contained binary that runs anywhere, even without Bun or Node installed. Claude Code, FactoryAI, OpenCode, and others are already built with Bun.

The acquisition allows Bun to skip the traditional VC-backed startup monetization path and focus on building the best JavaScript tooling. The same team continues working on Bun with access to Anthropic's resources.

What to do about it:
- Continue using Bun as before - it remains open-source and actively maintained
- Leverage Bun's single-file executables for distributing CLI tools
- Expect continued focus on performance and Node.js compatibility

**Key takeaways:**
- Bun acquisition strengthens its position as AI coding infrastructure
- Open-source commitment remains unchanged
- Performance focus continues with additional resources

**Tradeoffs:** Gain additional resources and stability but potentially sacrifice some independence in roadmap decisions.

**Link:** [Bun is joining Anthropic](https://bun.com/blog/bun-joins-anthropic)

## Databases in 2025: PostgreSQL Dominance and AI Integration

**TLDR:** PostgreSQL continues its dominance with major acquisitions and new distributed systems. AI Model Context Protocol (MCP) becomes standard for LLM-database interactions, and database branching proves valuable for AI agents.

PostgreSQL's ecosystem exploded in 2025 with Databricks acquiring Neon for $1B and Snowflake acquiring CrunchyData for $250M. Distributed PostgreSQL projects like Multigres, Neki, and PgDog emerged to create sharding middleware similar to how Vitess shards MySQL.

Every DBMS added support for Anthropic's Model Context Protocol (MCP), a standardized client-server JSON-RPC interface that lets LLMs interact with databases without custom glue code. Database branching, pioneered by Neon, proved especially valuable as agents create 80% of their databases.

What to do about it:
- Consider PostgreSQL for new projects given its ecosystem momentum
- Evaluate MCP servers for AI integration needs
- Leverage database branching for AI agent development

**Key takeaways:**
- PostgreSQL ecosystem consolidation continues with major acquisitions
- AI-database integration through MCP becomes standard
- Database branching valuable for AI agent workflows

**Tradeoffs:** Gain AI integration capabilities but potentially add complexity to database architectures.

**Link:** [Databases in 2025: A Year in Review](https://www.cs.cmu.edu/~pavlo/blog/2026/01/2025-databases-retrospective.html)

## Deno 2.6: dx Command and Enhanced Security

**TLDR:** Deno 2.6 introduces `dx` as the equivalent to `npx` for running package binaries, adds granular permissions with `--ignore-read` and `--ignore-env`, and integrates faster type checking with tsgo.

The new `dx` command provides a convenient way to run binaries from npm and JSR packages with default `--allow-all` permissions. The command prompts before downloading packages and runs lifecycle scripts automatically, making it easier to run package binaries with the convenience of npx while leveraging Deno's security model.

Enhanced permission controls include `--ignore-read` and `--ignore-env` flags that allow selectively ignoring certain file reads or environment variable access, returning `NotFound` error and `undefined` respectively instead of throwing `NotCapable` errors.

What to do about it:
- Use `dx` for running package binaries with Deno's security model
- Leverage granular permissions for running untrusted code
- Enable `--unstable-tsgo` for faster type checking

**Key takeaways:**
- `dx` provides npx-like functionality with Deno's security
- Granular permissions offer more flexibility for untrusted code
- TSGO integration dramatically improves type checking speed

**Tradeoffs:** Gain security and convenience but potentially sacrifice some performance in permission-heavy applications.

**Link:** [Deno 2.6: dx is the new npx](https://deno.com/blog/v2.6)

## Go 1.26: New Garbage Collector and Language Improvements

**TLDR:** Go 1.26 introduces the Green Tea garbage collector by default, improves cgo call performance by 30%, and adds new language features including enhanced `new` function usage.

The Green Tea garbage collector improves performance of marking and scanning small objects through better locality and CPU scalability, with benchmarks showing 10-40% reduction in garbage collection overhead. The new collector leverages vector instructions on newer CPUs for additional 10% improvements.

Go 1.26 enhances the `new` function to allow expressions as operands, making it easier to work with optional values in serialization packages. The compiler now generates calls to size-specialized memory allocation routines, reducing costs of small memory allocations by up to 30%.

What to do about it:
- Upgrade to Go 1.26 to benefit from new garbage collector
- Use enhanced `new` function for optional value initialization
- Monitor performance improvements in allocation-heavy applications

**Key takeaways:**
- New garbage collector significantly improves performance
- Enhanced `new` function simplifies optional value handling
- Memory allocation optimizations benefit allocation-heavy code

**Tradeoffs:** Gain performance improvements but potentially face compatibility issues with older Go versions.

**Link:** [Go 1.26 Release Notes - The Go Programming Language](https://tip.golang.org/doc/go1.26)

## Ruby 4.0.0: Ruby Box and ZJIT Compiler

**TLDR:** Ruby 4.0.0 introduces Ruby Box for definition isolation and ZJIT as the next-generation just-in-time compiler, along with significant Ractor improvements and language enhancements.

Ruby Box provides separation about definitions, isolating monkey patches, changes of global/class variables, and loaded libraries from other boxes. This enables safer testing and parallel execution scenarios. ZJIT is a new JIT compiler developed as the successor to YJIT, requiring Rust 1.85.0+ to build.

Ractor improvements include new `Ractor::Port` class for message passing, reduced global lock contention, and better parallelism. The new compiler raises performance ceilings with larger compilation units and SSA IR.

What to do about it:
- Experiment with Ruby Box for safer testing environments
- Try ZJIT for performance improvements (though not yet as fast as YJIT)
- Leverage improved Ractor capabilities for parallel execution

**Key takeaways:**
- Ruby Box provides definition isolation capabilities
- ZJIT offers next-generation compilation technology
- Ractor improvements enhance parallel execution

**Tradeoffs:** Gain isolation and performance but potentially face stability issues with new ZJIT compiler.

**Link:** [Ruby 4.0.0 Released](https://www.ruby-lang.org/en/news/2025/12/25/ruby-4-0-0-released/)

## The Performance Inequality Gap 2026

**TLDR:** Updated performance budgets for 2026 recommend 9 Mbps downlink, 3 Mbps uplink, and 100ms RTT. Sites are ballooning in size while performance is plateauing, with median mobile pages now larger than the original DOOM game.

The updated network test parameters for 2026 are 9 Mbps downlink, 3 Mbps uplink, and 100ms RTT, representing a 600+ KiB improvement in budgets compared to 2024. However, sites continue to balloon in size, with median mobile pages now at 2.6 MiB, exceeding the size of DOOM (2.48 MiB).

SPA architectures are underperforming expectations, with sites designed as SPAs generating only one soft navigation per hard navigation on average. This undermines the case for SPA-based stacks, as the upfront JavaScript investment isn't justified by navigation patterns.

What to do about it:
- Target Samsung Galaxy A24 4G as the recommended test device
- Use 9/3/100 network parameters for testing
- Focus on reducing JavaScript payload sizes

**Key takeaways:**
- Performance budgets improved but payload sizes continue growing
- SPA assumptions about navigation patterns are incorrect
- Mobile performance remains critical for user experience

**Tradeoffs:** Gain feature richness but sacrifice performance and user experience on slower devices/networks.

**Link:** [The Performance Inequality Gap, 2026](https://infrequently.org/2025/11/performance-inequality-gap-2026/)

## 7 Steps of a Web Performance Journey

**TLDR:** The web performance journey progresses from misunderstanding business impact to comparing distributions and correlating with business metrics, emphasizing the importance of percentiles and user-focused visualization.

The 7-step journey begins with organizations that don't understand web performance's business impact and progresses through stages of recognizing UX speed impact, setting measurement thresholds, understanding percentiles, tracking over time, visualizing distributions, and correlating with business metrics.

Level 7 emphasizes comparing distributions and using histograms to represent all users, where each pixel represents a user. This visualization helps decision-makers understand the impact of performance on actual users rather than abstract metrics.

What to do about it:
- Progress through the 7 levels systematically
- Focus on percentiles rather than averages
- Visualize performance distributions to understand user impact

**Key takeaways:**
- Performance journey has distinct progression levels
- Percentiles better represent user experience than averages
- Histograms help visualize user impact

**Tradeoffs:** Gain deeper performance insights but require more sophisticated measurement and analysis tools.

**Link:** [7 Steps of a Web Performance Journey](https://calendar.perfplanet.com/2025/7-steps-of-a-web-performance-journey/)

## How To Design For (And With) Deaf People

**TLDR:** Deafness exists on a spectrum from slight to profound hearing loss, affecting 466 million people. Design should accommodate various levels of hearing loss and communication preferences rather than making assumptions.

Deafness spans a broad continuum from slight hearing loss (16-25 dB) to profound hearing loss (91+ dB). Around 90-95% of deaf people come from hearing families, and deafness often occurs due to exposure to loud noises, age, disease, and accidents rather than being a congenital condition.

Sign languages are 4-dimensional spatial languages with their own grammar and syntax, separate from spoken languages, and they don't have written forms. There is no universal sign language - each country has its own sign language and dialects.

What to do about it:
- Don't make phone the only method of contact
- Provide text alternatives for audible alerts
- Include descriptions of non-spoken sounds in content
- Always test products with the actual community

**Key takeaways:**
- Deafness exists on a spectrum with varying degrees of hearing loss
- Sign languages are complex, spatial languages with own grammar
- Accommodation should consider various communication preferences

**Tradeoffs:** Gain accessibility for deaf users but require additional design and development resources.

**Link:** [How To Design For (And With) Deaf People](https://www.smashingmagazine.com/2025/12/how-design-for-with-deaf-people/)

## Useful Patterns for Building HTML Tools

**TLDR:** HTML tools combine HTML, JavaScript, and CSS in single files to provide useful functionality. Key patterns include avoiding React, loading dependencies from CDNs, and leveraging copy/paste for input/output.

HTML tools are single-file applications that combine HTML, JavaScript, and CSS to provide specific functionality. Examples include SVG renderers, JSON-to-YAML converters, and API explorers. These tools avoid build steps and React, instead using inline JavaScript and CSS in a single HTML file.

The approach emphasizes prototyping with AI tools like Claude Artifacts or ChatGPT Canvas, loading dependencies from CDNs, and taking advantage of copy/paste for input/output operations. Tools can leverage localStorage for secrets or larger state, and CORS-enabled APIs for data access.

What to do about it:
- Prototype with Claude Artifacts or ChatGPT Canvas
- Load dependencies from CDNs like CDNjs or jsDelivr
- Use localStorage for secrets and larger state persistence

**Key takeaways:**
- Single-file HTML tools avoid build complexity
- AI tools facilitate rapid prototyping
- CORS-enabled APIs enable data access without servers

**Tradeoffs:** Gain simplicity and rapid development but sacrifice some performance and security compared to traditional applications.

**Link:** [Useful patterns for building HTML tools](https://simonwillison.net/2025/Dec/10/html-tools/)

## I ported JustHTML from Python to JavaScript with Codex CLI and GPT-5.2 in 4.5 hours

**TLDR:** A JavaScript port of the JustHTML Python HTML5 parser was created using AI agents, passing 9,200 tests from the html5lib-tests suite in just 4.5 hours of AI work.

The project demonstrated the power of AI agents for complex code porting tasks. Using Codex CLI with GPT-5.2, the entire JavaScript port was completed in 4.5 hours, producing 9,000 lines of fully tested JavaScript across 43 commits. The resulting library passes 9,200 tests from the html5lib-tests suite.

The process involved creating a specification, implementing milestone-based development, and running comprehensive test suites. The AI agent worked autonomously for several hours, committing and pushing changes regularly.

What to do about it:
- Consider AI agents for complex code porting tasks
- Use comprehensive test suites to validate AI-generated code
- Implement milestone-based development for large AI projects

**Key takeaways:**
- AI agents can perform complex, multi-hour coding tasks
- Comprehensive test suites enable reliable AI code generation
- Milestone-based development works well with AI agents

**Tradeoffs:** Gain rapid development but potentially sacrifice code quality and maintainability compared to human-written code.

**Link:** [I ported JustHTML from Python to JavaScript with Codex CLI and GPT-5.2 in 4.5 hours](https://simonwillison.net/2025/Dec/15/porting-justhtml/)

## The Deep Card Conundrum: 3D CSS Effects

**TLDR:** Creating 3D cards with depth that stay clipped within boundaries requires using perspective-origin to counteract rotation effects, overcoming CSS specification limitations.

Creating truly 3D cards that maintain depth while staying clipped within boundaries hits a CSS specification limitation: applying overflow clipping forces the element to flatten, ignoring preserve-3d transformations. The solution involves using perspective-origin to counteract the rotation effects mathematically.

The breakthrough solution uses trigonometric calculations with cosine and sine functions to dynamically adjust perspective and perspective-origin based on the card's tilt angles, effectively projection-mapping the 3D scene onto the 2D surface while maintaining the illusion of depth.

What to do about it:
- Use the mathematical approach with cosine/sine calculations
- Apply perspective-origin to counteract rotation effects
- Implement overflow clipping while maintaining 3D illusions

**Key takeaways:**
- CSS specification creates challenges for 3D effects with clipping
- Mathematical approach overcomes specification limitations
- Perspective-origin has practical applications beyond distortion

**Tradeoffs:** Gain sophisticated 3D effects but require complex mathematical calculations and browser compatibility considerations.

**Link:** [The Deep Card Conundrum](https://frontendmasters.com/blog/the-deep-card-conundrum/)

## Different Page Transitions For Different Circumstances

**TLDR:** DOM events for page transitions allow setting custom transition types conditionally, enabling different animations for specific pages or circumstances using JavaScript and CSS.

The `pageswap` and `pagereveal` events enable setting view transition types conditionally. By checking the document location pathname, specific transition animations can be applied to particular pages. The custom types can then be targeted in CSS using the `:active-view-transition-type()` selector.

This approach provides granular control over page transitions based on context, allowing for more intentional and user-appropriate animations rather than a one-size-fits-all approach.

What to do about it:
- Listen to `pagereveal` events to detect page loads
- Set custom transition types conditionally based on URL
- Use CSS `:active-view-transition-type()` to apply custom animations

**Key takeaways:**
- DOM events enable conditional page transition types
- Custom transition types allow contextual animations
- JavaScript-CSS interplay provides granular control

**Tradeoffs:** Gain contextual animations but require additional JavaScript and CSS complexity.

**Link:** [Different Page Transitions For Different Circumstances](https://frontendmasters.com/blog/different-page-transitions-for-different-circumstances/)

## Non-Square Image Blur Extensions

**TLDR:** Creating blur extensions for non-square images requires CSS techniques like aspect-ratio manipulation, object-fit containment, and background filtering to achieve the effect with minimal markup.

The technique involves setting a width constraint, applying aspect-ratio: 1 to create a square container, using object-fit: contain to properly display the non-square image, and setting a filtered background with blur effects. The background uses the same image source but with blur and brightness adjustments.

For cross-browser compatibility, the approach may require wrapping the image in a container and using backdrop-filter instead of the more advanced filter() function which has limited browser support.

What to do about it:
- Use aspect-ratio: 1 with object-fit: contain for non-square images
- Apply filtered backgrounds with blur effects
- Consider cross-browser alternatives using backdrop-filter

**Key takeaways:**
- CSS aspect-ratio enables square containers for non-square images
- Background filtering creates blur extension effects
- Cross-browser compatibility may require alternative approaches

**Tradeoffs:** Gain sophisticated blur effects but require complex CSS techniques and browser compatibility workarounds.

**Link:** [Non-Square Image Blur Extensions](https://frontendmasters.com/blog/non-square-image-blur-extensions/)

## Exploring Multi-Brand Systems with Tokens and Composability

**TLDR:** Design systems for multiple brands should use tokens for theming, composition with slots for content flexibility, and configuration through props for layout variations.

Effective multi-brand systems require three key approaches: tokens for theming (CSS custom properties), composition through slots for flexible content, and configuration via props for layout variations. This allows a single component to support diverse brands and use cases without breaking from the system.

Tokens enable theme switching by changing variable values, composition with slots allows custom content insertion, and configuration through props enables layout variations without creating new components.

What to do about it:
- Implement design tokens for theming flexibility
- Use slots for composable content areas
- Expose configuration options through component props

**Key takeaways:**
- Tokens enable flexible theming across brands
- Composition with slots provides content flexibility
- Configuration through props enables layout variations

**Tradeoffs:** Gain flexibility and reusability but require more complex component architecture.

**Link:** [Exploring Multi-Brand Systems with Tokens and Composability](https://frontendmasters.com/blog/exploring-multi-brand-systems-with-tokens-and-composability/)

## How I Write Custom Elements with lit-html

**TLDR:** lit-html provides a lightweight alternative to full frameworks for creating custom elements, offering template syntax similar to JSX without build steps or shadow DOM requirements.

Using lit-html for custom elements provides JSX-like syntax without requiring full frameworks like React or Lit. The approach offers performance benefits through efficient updates of only changed template parts, while maintaining cleaner syntax than raw DOM manipulation.

Two approaches are possible: stateless renders for static content that only renders once, and stateful renders that update when state changes. The syntax includes event handling with @event syntax and automatic cleanup of event listeners.

What to do about it:
- Use lit-html for lightweight custom element creation
- Choose between stateless and stateful rendering approaches
- Leverage @event syntax for cleaner event handling

**Key takeaways:**
- lit-html provides JSX-like syntax without heavy frameworks
- Efficient updates only modify changed template parts
- Clean event handling syntax with automatic cleanup

**Tradeoffs:** Gain lightweight templating but sacrifice some framework features and ecosystem.

**Link:** [How I Write Custom Elements with lit-html](https://frontendmasters.com/blog/custom-elements-with-lit-html/)

## Google Sans Evolution: Global Language Support and Open Source

**TLDR:** Google Sans has evolved to include global language support across 20+ writing systems, new variants for different use cases, and has been open-sourced for broader adoption.

Google Sans began as a geometric typeface for display text but evolved to include Google Sans Text for smaller sizes with better readability. The family now supports over 20 writing systems including Arabic, Chinese, and Thai, making it one of the world's largest typeface families.

The addition of Google Sans Code specifically addresses developer needs with improved legibility for coding, distinguishing similar characters like 'a' and 'o'. Google has now open-sourced the entire family to foster more consistent digital experiences.

What to do about it:
- Consider Google Sans Flex for multilingual projects
- Use Google Sans Code for development environments
- Leverage open-source availability for broader adoption

**Key takeaways:**
- Google Sans now supports global languages across 20+ writing systems
- Specialized variants address specific use cases
- Open-sourcing enables broader ecosystem adoption

**Tradeoffs:** Gain extensive language support but potentially face performance considerations with large font files.

**Link:** [Google Sans: Evolving Google's Typeface](https://design.google/library/google-sans-flex-font)

## Fun with the Web: Learning Through Play

**TLDR:** Playful experimentation with web technologies leads to deeper learning and understanding, encouraging developers to explore new features through creative projects.

The web platform's accessibility makes it ideal for playful experimentation. Creating fun projects like flying math equations using MathML, whack-a-dialog games with HTML dialog elements, and CSS grid-based games helps developers learn new features in engaging ways.

Playful experimentation reveals hidden capabilities in familiar technologies, such as the full syntax of box-shadow, the stacking behavior of multiple shadows, and the creative potential of mix-blend-mode for visual effects.

What to do about it:
- Create playful experiments with new web features
- Build small demos to learn complex concepts
- Share creative projects with the community

**Key takeaways:**
- Playful experimentation leads to deeper learning
- Creative projects reveal hidden capabilities
- Fun projects maintain passion for web development

**Tradeoffs:** Gain learning and creativity but potentially sacrifice time that could be spent on production work.

**Link:** [Fun with the web](https://patrickbrosset.com/articles/2026-01-06-fun-with-the-web/)