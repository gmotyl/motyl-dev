---
title: "React ViewTransition, Next.js Migration Drama, and the Rise of Agentic Coding"
excerpt: "This week covers React's new ViewTransition element, Inngest's dramatic 83% dev time reduction by leaving Next.js, Tamagui 2.0, and Apple's agentic coding in Xcode 26.3."
publishedAt: "2026-02-04"
slug: "react-viewtransition-nextjs-migration-agentic-coding"
hashtags: "#this-week-in-react #react #react-native #viewtransition #nextjs #tanstack #tamagui #ai #xcode #bun #babel #temporal #mcp #generated #en"
---

## React's ViewTransition Element

**TLDR:** React now ships a native ViewTransition element in its Canary build, providing a more declarative way to handle View Transitions while integrating properly with React's rendering lifecycle.

**Summary:**

So here is something that caught my attention this week. View Transitions are a web platform feature, not a React-specific thing. You can already use them in React the "classic" way by calling document.startViewTransition and wrapping state changes inside that callback. It works fine. But React has now introduced its own ViewTransition element, and I have mixed feelings about it.

The React way requires you to install the canary build, import ViewTransition along with startTransition, wrap your transitioning elements in the ViewTransition component, and call startTransition when triggering state changes. The framework then handles the view-transition-name automatically for you, coordinates with Suspense boundaries, and manages concurrent features.

Here is where I get a bit cranky. Part of me dislikes this because React is not really giving us that much here. It is making us do things in a way that does not disrupt the framework rather than making things genuinely easier. If you spend time learning this API, that knowledge does not transfer anywhere else.

But the pragmatic part of me acknowledges that React has always wanted to handle the DOM for you. That is the deal you make. Using ViewTransition presumably helps with batching updates, preventing conflicts, and managing nested UI states. The enter and exit attributes on the ViewTransition element are actually quite nice - they map to CSS view transition classes in a more straightforward way than figuring out the only-child technique yourself.

What the author is not addressing is the long-term maintenance burden. As View Transitions mature on the web platform, will React's abstraction keep pace? Will developers end up fighting the framework when they need fine-grained control?

**Key takeaways:**
- ViewTransition is available in React Canary builds
- It automatically applies view-transition-name to wrapped elements
- Works with React's Suspense and concurrent features
- Classic document.startViewTransition still works in React if you prefer
- Both approaches can coexist on the same page

**Link:** [React's ViewTransition Element](https://frontendmasters.com/blog/reacts-viewtransition-element/)

---

## Reducing Local Dev Time by 83%: Why Inngest Migrated Off Next.js

**TLDR:** Inngest migrated from Next.js to TanStack Start, reducing local page load times from 10-12 seconds to 2-3 seconds, and shares detailed reasoning about when such a migration makes sense.

**Summary:**

This is the kind of post that makes other developers either pump their fists in solidarity or roll their eyes at another "we left X framework" hot take. But Inngest actually did the work here, and the details matter.

Their problem was real and specific: a small team where engineers wear many hats, not a dedicated frontend team living in Next.js full-time. The use client and use server directives, the layered cache APIs, the boundaries between RSC and client components - all of it added friction that compounded over time. Initial local page loads pushed 10-12 seconds. The team Slack was filled with complaints.

They tried everything: upgrading Next.js, using Vercel's profiling tools, migrating to Turbopack twice. Turbopack shaved off only a couple seconds. That is when they looked outside Next.js entirely.

Here is what I find most valuable about this post: they prototyped three alternatives (TanStack Start, Deno Fresh, React Router v7) and evaluated them systematically. They chose TanStack Start despite it still being in release candidate status. Why? The team was already using TanStack's other offerings and was optimistic about its direction. When developer experience matters, having excited developers matters.

The migration itself took a few weeks with one engineer, using AI to help with conversion grunt work while keeping architecture decisions human-driven. Post-migration, they rarely see page loads beyond 2-3 seconds, and all routes after the first load almost instantly.

What is missing from this analysis? Long-term maintenance considerations. TanStack Start is still in RC. What happens when they hit an edge case that is not documented? What is the support ecosystem like? These are real tradeoffs that enthusiasm alone cannot solve.

**Key takeaways:**
- Local dev time dropped from 10-12 seconds to 2-3 seconds
- TanStack's explicit route configuration replaced Next.js's magical directives
- AI helped with conversion grunt work but humans made architectural decisions
- Brute-force migration over incremental approach worked for their risk tolerance
- Fresh and React Router v7 were also considered but TanStack won on team excitement

**Tradeoffs:**
- TanStack Start is still in RC - less ecosystem support
- Different local dev vs production behavior requires careful testing
- Large PRs during migration made traditional code review impractical

**Link:** [Reducing local dev time by 83%: Why we migrated off Next.js](https://www.inngest.com/blog/migrating-off-nextjs-tanstack-start)

---

## Ahead-of-Time Compilation for next-intl

**TLDR:** next-intl now supports precompilation that drops 9KB of JavaScript from your bundle by eliminating the ICU parser at runtime, with performance gains from optimized AST evaluation.

**Summary:**

Jan Amann has been playing what he calls "the floor is lava" with client-side translations ever since React Server Components arrived. Trying to avoid shipping an ICU parser to the client through donut components and other fancy patterns. This new precompilation feature finally solves that problem elegantly.

The approach is clever. Instead of parsing ICU messages at runtime, next-intl now compiles them at build time into minified ASTs. A simple message like "Hello, {name}!" becomes a compact array structure rather than a verbose object tree. The runtime that evaluates these optimized ASTs weighs in at just 650 bytes compressed.

The practical impact: flipping a single flag in your configuration immediately drops about 9KB of compressed JavaScript from both server and client bundles. The cost of adding next-intl with a single client-side translation now amounts to roughly 4KB compressed.

There is a gotcha though: t.raw() is not supported with precompilation since messages are parsed at build time. If you rely heavily on raw HTML in messages, you might need to reconsider your approach. The author argues there are better alternatives anyway - MDX for local content, CMS portable text formats for remote content.

What is not addressed is the migration path for teams heavily invested in t.raw() patterns. Some codebases have years of content structured around that API. A deprecation without a clear migration story could be painful.

**Key takeaways:**
- Enable with a single flag in your configuration
- Drops 9KB of compressed JavaScript from bundles
- Runtime evaluator is just 650 bytes
- Plain strings (majority of typical messages) have zero overhead
- t.raw() is not supported - consider MDX or CMS alternatives

**Link:** [Ahead-of-time compilation for next-intl](https://next-intl.dev/blog/precompilation)

---

## Bun v1.3.8: Built-in Markdown Parser

**TLDR:** Bun now includes a native Markdown parser written in Zig with three rendering modes: HTML, custom callbacks, and direct React elements.

**Summary:**

Bun continues its strategy of absorbing commonly needed functionality into the runtime itself. This time it is Markdown parsing, and the implementation is surprisingly comprehensive.

The new Bun.markdown API offers three approaches. Bun.markdown.html() gives you straightforward HTML output with options like heading IDs. Bun.markdown.render() accepts callbacks for each element type, perfect for custom HTML, ANSI terminal output, or stripping formatting. And Bun.markdown.react() returns a React Fragment directly usable as a component return value.

The React integration is particularly nice. You can customize components inline, and it handles both React 18 and 19 element formats. Server-side rendering works seamlessly with renderToString.

GitHub Flavored Markdown extensions are enabled by default: tables, strikethrough, task lists, and permissive autolinks. Additional options include wiki links, LaTeX math, and auto-linked headings.

There is also a new --metafile-md option for bun build that generates a Markdown visualization of your bundle's module graph. The documentation specifically mentions this is useful for analyzing bundles with LLMs - paste the output into a chat to identify bloat and understand dependency chains. We are truly living in the AI tooling era.

The release also includes various bug fixes: Updated mimalloc, fixes for napi_typeof returning incorrect types, crashes during heap snapshot generation, HTTP/2 stream state handling issues affecting gRPC, and Windows npm global install problems.

**Key takeaways:**
- Bun.markdown.html() for simple HTML output
- Bun.markdown.render() for custom callbacks and ANSI output
- Bun.markdown.react() returns React-ready fragments
- GFM extensions enabled by default
- New --metafile-md for LLM-friendly bundle analysis

**Link:** [Bun v1.3.8](https://bun.com/blog/bun-v1.3.8)

---

## Debugging with AI: Can It Replace an Experienced Developer?

**TLDR:** A detailed investigation of three real React/Next.js bugs shows AI excels at pattern recognition for common issues but fails when problems require deep understanding of system behavior.

**Summary:**

Nadia Makarevich ran an experiment I wish more people would do: actually testing AI debugging capabilities against real bugs with verifiable root causes. The results are illuminating and should calibrate your expectations.

For Investigation 1, a Zod schema validation error, Claude nailed it. It identified the missing fields, explained the root cause correctly, and proposed a fix. The fix was technically correct but not quite right for the context - adding mock data instead of relaxing the schema. Half credit.

Investigation 2, the double loading skeletons problem, is where things get interesting. Claude gave different root causes on different attempts: sometimes claiming the root-level loading.tsx, sometimes the route-level one, sometimes suggesting useSuspenseQuery. The actual root cause involved understanding how Next.js prefetching works differently for dynamic routes during SPA navigation versus direct page refresh. Claude's useSuspenseQuery fix technically worked but introduced hydration mismatch errors.

Investigation 3, the weird redirect error, was a complete failure. Claude kept going in circles with confident but wrong explanations. The actual root cause turned out to be a Server Action in a useEffect combined with Suspense and redirects - a specific combination that confuses Next.js. No amount of prompting got Claude to identify this.

The verdict: AI is very good at pattern recognition for standard issues. But when problems require understanding why a system behaves the way it does, or how it should behave from a future or user perspective, AI falls short. The skill is knowing when to stop prompting and start thinking.

**Key takeaways:**
- AI excels at common issues: schema validation, null checks, runtime errors
- AI struggles with framework-specific interactions and edge cases
- Always verify the root cause manually, even when AI fixes work
- Do not iterate with LLMs on complex problems - they confidently hallucinate
- The skill is knowing when to stop prompting and start investigating

**Link:** [Debugging with AI: Can It Replace an Experienced Developer?](https://www.developerway.com/posts/debugging-with-ai)

---

## React Design System Library MCP

**TLDR:** Mintel built an MCP server that exposes their React design system documentation to AI agents, distributing it as a CLI with their npm package.

**Summary:**

This is a practical example of how teams are starting to integrate AI into their development workflows in meaningful ways. Mintel maintains an internal React component library with Storybook documentation. They wanted AI agents to access this documentation programmatically.

The approach leverages the new @storybook/addon-mcp which exposes Storybook documentation via Model Context Protocol servers. They upgraded to Storybook 10, enabled the experimentalComponentsManifest feature, and the addon starts an MCP server when Storybook runs locally.

But here is the clever part: they extended their library build process to also build Storybook, copy the generated manifests to the published package, and added a CLI entry point. Now other teams can run the design system MCP server with a single command: pnpm dlx package-name@latest.

The integration uses tmcp for the server, the Valibot adapter for schema validation, and StdioTransport for communication. Teams configure their IDEs to run the MCP server either globally or per-project using the specific library version.

Practical prompts they are using: "Evaluate if any components can be swapped for Mintel Design System components" and "Create a plan for migrating to the new Button component."

What is not discussed is the maintenance burden of keeping the MCP server in sync with component changes, or how they handle versioning when the AI needs to know about breaking changes between versions.

**Key takeaways:**
- Storybook 10 addon-mcp exposes documentation via MCP servers
- Manifest files generated at build time contain component metadata
- CLI entry point allows easy distribution with npm packages
- Works per-project with specific library versions
- Useful for migration planning and component discovery prompts

**Link:** [React design system library MCP](https://alexocallaghan.com/react-design-system-library-mcp)

---

## Reverse-Engineering Figma Make: Extracting React Apps from Binary Files

**TLDR:** A developer reverse-engineered Figma Make's .make file format to extract complete React applications, discovering it uses ZIP archives containing Kiwi binary schema format with Zstandard compression.

**Summary:**

This is the kind of deep dive that makes you appreciate how much modern tooling hides from us. A client had a beautiful UI built in Figma Make but the Figma API returns "File type not supported" for Make files. Corporate lock-in at its finest.

The investigation started with the basics: the .make extension is just a ZIP archive (504b or "PK" in the header bytes). Inside: a canvas.fig binary, metadata JSON, a massive 34MB AI chat history, images, and blob storage.

The canvas.fig file is where things get interesting. It uses a different magic header than standard Figma files (fig-makee instead of fig-kiwi). Two chunks with different compression: the first is deflate-compressed schema data, the second is Zstandard-compressed content. Three npm packages made decoding possible: pako, fzstd, and kiwi-schema.

The Kiwi schema had 534 type definitions. Decoding revealed a tree structure with nodes, and CODE_FILE nodes contained actual source code. 96 files extracted: React components, TypeScript utilities, CSS, data files, hooks.

But raw files are not a running app. Figma Make has quirks: versioned package imports (radix-ui@1.1.6), custom asset imports (figma:asset/hash.png), missing file extensions on images, Tailwind v4 PostCSS changes, and React StrictMode breaking Framer Motion animations.

The author built scripts to handle all of this automatically and open-sourced the extractor. A three-hour reverse engineering session turned into a working React/Vite project.

**Key takeaways:**
- .make files are ZIP archives with canvas.fig binary inside
- Uses Kiwi binary schema format with Zstandard compression
- 534 type definitions in the schema including CODE_FILE for source
- Import paths need fixing: versioned packages, asset references
- Open source extractor available on GitHub

**Link:** [Reverse-Engineering Figma Make](https://albertsikkema.com/ai/development/tools/reverse-engineering/2026/01/23/reverse-engineering-figma-make-files.html)

---

## Tamagui 2: Stability, Performance, and New Components

**TLDR:** Tamagui 2.0 brings 32% smaller bundles, new Menu and ContextMenu components with native platform rendering, Motion animation driver support, and a focus on long-term stability.

**Summary:**

Tamagui 2.0 is a significant release that reflects a maturing project. The maintainer explicitly apologizes for pushing releases too fast in v1 and burning users with regressions. This version prioritizes stability, with 289 test files and kitchen-sink tests running across all four animation drivers.

The new features are substantial. Menu and ContextMenu components provide dropdown menus with full keyboard navigation, submenus, and checkbox items. On iOS and Android, they automatically render using native platform menus. Input and TextArea have been rewritten with a web-first approach - you write standard HTML attributes and Tamagui converts them to React Native equivalents.

The Motion animation driver integration is exciting. Combined with a new avoidReRenders path that moves group, media, pseudo, and theme styles out of React, plus Motion's Web Animations API support, animations feel significantly smoother. The Reanimated driver also returns with worklet support for UI thread animations.

New style properties include backgroundImage with gradient support, full box-shadow with multiple shadows and inset, filters, mix-blend-mode, and cursor support. A scope prop for Dialog, Popover, Sheet, and Tooltip lets you mount a single instance at the root while placing triggers anywhere, eliminating portal overhead in data-heavy views.

The breaking changes are numerous but mostly involve removing deprecated APIs and aligning with web standards. React Native 0.81+, React 19+, and TypeScript 5+ are required. The old accessibility props are replaced with web-standard aria attributes.

**Key takeaways:**
- 32% smaller core bundle (37KB to 25KB gzipped)
- New Menu and ContextMenu with native platform rendering
- Motion animation driver with avoidReRenders for smoother animations
- Scope prop eliminates portal overhead for tooltips and popovers
- Requires React Native 0.81+, React 19+, TypeScript 5+

**Tradeoffs:**
- Significant breaking changes require careful migration
- React Native version requirement may block some teams
- Motion driver still experimental with occasional enter style issues

**Link:** [Tamagui 2](https://tamagui.dev/blog/version-two)

---

## React Aria v1.15.0: Render Props and Agent Skills

**TLDR:** React Aria Components adds DOM customization via render props for routing and animation library integration, plus fixes the most upvoted issue around date input constraints.

**Summary:**

This release addresses a long-standing pain point with React Aria Components: the inability to customize the underlying DOM elements for scenarios like Router Link components or animation libraries. The new render prop approach provides that flexibility.

The most upvoted issue fix is significant for real-world usage: date fields now constrain dates on blur instead of as you type. Previously, the strict validation made entering dates frustrating. Now users have more input flexibility with validation happening when they leave the field.

Agent Skills have been added, joining the broader trend of AI-assisted development tooling. The release also includes improved search experience in their new documentation website.

Notable fixes include: ComboBox preventing popover close when section headers are clicked, Modal no longer closing when dismissing DateRangePicker via outside click, NumberField increment/decrement buttons working properly with Android TalkBack, and RangeSlider allowing dragging regardless of usePreventScroll on iOS.

For Tables, cell column index is now available in render props. Tabs filtering DOM props properly and excluding disabledKeys from TabPanel. Tree focusing the first available item when previously focused item becomes disabled.

The release touches an impressive number of packages - essentially the entire React Aria ecosystem received updates. The attention to accessibility details like TalkBack support and keyboard navigation fixes reflects the library's core mission.

**Key takeaways:**
- Render prop allows DOM customization for Router Links and animation libraries
- Date fields constrain on blur, not as you type - major UX improvement
- Agent Skills added for AI-assisted development
- ComboBox, DateRangePicker, NumberField accessibility fixes
- Table cells now expose column index in render props

**Link:** [React Aria v1.15.0](https://react-aria.adobe.com/releases/v1-15-0.html)

---

## Xcode 26.3: Agentic Coding Arrives

**TLDR:** Apple introduces agentic coding in Xcode with built-in support for Anthropic Claude Agent and OpenAI Codex, plus Model Context Protocol support for any compatible agent.

**Summary:**

Apple making a major move in the AI development tools space is significant. Xcode 26.3 introduces agentic coding, allowing Claude Agent and Codex to work with greater autonomy toward development goals - breaking down tasks, making decisions based on project architecture, and using built-in tools.

The agents can now search documentation, explore file structures, update project settings, and verify their work visually by capturing Xcode Previews and iterating through builds and fixes. This goes beyond simple code completion into actual development workflow automation.

What catches my attention is the Model Context Protocol support. By adopting this open standard, Apple is not locking developers into just Claude and Codex. Any compatible agent can integrate with Xcode's capabilities. This is a surprisingly open approach from Apple.

The timing is notable too. We are seeing convergence across the industry toward agent-based development workflows. GitHub Copilot CLI, Cursor, Claude Code, and now Xcode are all moving in this direction. The terminal and IDE are becoming interfaces for AI collaboration rather than just text editors with autocomplete.

What is missing from the announcement is pricing, data privacy implications, and how this affects enterprise customers who cannot send code to external AI services. These details matter for adoption in regulated industries.

**Key takeaways:**
- Built-in support for Anthropic Claude Agent and OpenAI Codex
- Agents can search docs, explore files, update settings, capture Previews
- Model Context Protocol support for any compatible agent
- Available as release candidate now, App Store release coming soon
- Expands on Xcode 26 Swift coding assistant features

**Link:** [Xcode 26.3 unlocks the power of agentic coding](https://www.apple.com/newsroom/2026/02/xcode-26-point-3-unlocks-the-power-of-agentic-coding)

---

## Agent Skills for React Router

**TLDR:** The Remix team released Agent Skills - documentation packages that teach AI coding agents how to use React Router correctly with up-to-date patterns.

**Summary:**

This is a clever approach to the AI training data staleness problem. Instead of hoping AI models have accurate knowledge of framework APIs (they often do not), you install skills that provide current, verified patterns directly into your project.

Three skills are available: react-router-framework-mode for full-stack apps with loaders, actions, and middleware; react-router-data-mode for createBrowserRouter and RouterProvider setups; and react-router-declarative-mode for simpler JSX-based routing with BrowserRouter.

Each skill contains a SKILL.md main entry point with quick patterns and a references directory with detailed topic documentation. When your AI agent encounters a relevant task, it loads these files to generate accurate code.

The installation is straightforward: npx skills add remix-run/agent-skills. You can add specific skills with the --skill flag.

What strikes me is how this approach could scale. Imagine a future where every major library ships its own agent skills, and AI coding assistants automatically load relevant skills based on your project dependencies. The skills become living documentation that both humans and AI can consume.

The practical benefit today: less time fixing AI-generated React Router code that uses deprecated patterns or incorrect API signatures.

**Key takeaways:**
- Skills teach AI agents current framework patterns
- Three modes: framework, data, declarative
- Install with npx skills add remix-run/agent-skills
- Each skill has SKILL.md entry point and reference docs
- Agents load skills when encountering relevant tasks

**Link:** [Agent Skills for React Router](https://github.com/remix-run/agent-skills)

---

## Babel 7.29.0: The Last Babel 7 Minor Release

**TLDR:** Babel 7.29.0 is the final minor release before Babel 8, adding data-targets attribute support in @babel/standalone and shipping Babel 8.0.0-rc.1.

**Summary:**

End of an era vibes here. Babel 7.29.0 closes out the 7.x line as the team prepares for Babel 8.0.0. The release candidate is out today, marking years of work coming to fruition.

The practical changes in this release focus on easing migration. @babel/standalone now supports a data-targets attribute on script elements, letting you specify transpilation targets explicitly. This matters because Babel 8 changes the default behavior - instead of transforming down to ES5, it will use Browserslist's defaults query.

The guiding principle for Babel 8's breaking changes is that upgrading should be easy. Most breaking changes have been available behind options in Babel 7, so you can adapt your code before actually performing the update. Migration guides are available for both users and API consumers like plugin authors.

One exciting technical detail: Babel 8 ships as an ESM-only package. They have been trying to figure out how to make this work for a very long time, and the require(esm) support in Node.js 20 finally made it comfortable to drop CommonJS.

The migration resources include dedicated guides for users and developers, plus a preview documentation site at next.babeljs.io. If you are already using Babel 8 beta, the 7.29.0 features are included in v8.0.0-rc.1.

**Key takeaways:**
- Final Babel 7 minor release - 8.0.0-rc.1 now available
- data-targets attribute in @babel/standalone for explicit targets
- Babel 8 defaults to Browserslist defaults instead of ES5
- ESM-only package in Babel 8 thanks to require(esm) in Node 20
- Migration guides available for users and API consumers

**Link:** [Babel 7.29.0 Released](https://babeljs.io/blog/2026/01/31/7.29.0)

---

## Implementing Temporal in JavaScriptCore

**TLDR:** Igalia shares progress on implementing the Temporal proposal in JavaScriptCore, covering duration precision challenges, new date types, and the relativeTo parameter.

**Summary:**

Temporal is one of those proposals that has been "coming soon" for what feels like forever. This update from Igalia on their JavaScriptCore implementation shows the complexity involved in doing dates and times correctly.

The duration precision section is fascinating. A duration can represent differences between dates, so totaling days, hours, minutes, seconds, milliseconds, microseconds, and nanoseconds in nanoseconds can produce numbers as large as 10 to the 9th times 2 to the 53rd. That is too large for 32-bit integers or 64-bit doubles. The specification handles this with Internal Duration Records that pair date components with a single time duration integer.

New date types PlainMonthDay and PlainYearMonth represent partial dates - better solutions than full dates with default values when not all fields are known. ZonedDateTime is fully implemented with support for named time zones and numeric UTC offsets.

The relativeTo parameter addresses a fundamental date math problem: converting years to days depends on leap years, converting months to days depends on month lengths. Without a starting point, these conversions cannot be computed. The parameter enables computations like finding there are 365 nanoseconds in a year starting from 2025-01-01 versus 366 from 2024-01-01.

100% of non-intl402 test262 tests for Temporal now pass based on the implemented code. The work is behind a flag in JSC Technology Preview with more PRs expected to complete ZonedDateTime and relativeTo support.

**Key takeaways:**
- Duration totals can exceed 64-bit double precision
- PlainMonthDay and PlainYearMonth for partial dates
- ZonedDateTime fully implemented with time zone support
- relativeTo parameter enables calendar-aware date math
- 100% non-intl402 test262 tests passing, behind --useTemporal=1 flag

**Link:** [Implementing the Temporal proposal in JavaScriptCore](https://blogs.igalia.com/compilers/2026/01/31/implementing-the-temporal-proposal-in-javascriptcore/)

---

## GitHub Copilot CLI's Animated ASCII Banner

**TLDR:** GitHub details the engineering complexity behind a three-second ASCII animation, requiring 6,000+ lines of TypeScript to handle terminal inconsistencies, ANSI color mapping, and accessibility constraints.

**Summary:**

This article is a masterclass in why "simple" things in constrained environments are never simple. Animating a Copilot mascot for three seconds in a terminal required over 6,000 lines of TypeScript. Most of that code handles terminal inconsistencies, accessibility constraints, and maintainable rendering logic.

Terminals do not have a canvas. There are no frames, sprites, z-index, or animation tick rates. Every frame has to be manually repainted using cursor movements and ANSI control sequences. Different terminals interpret ANSI color codes differently. Screen readers treat fast-changing characters as noise.

The color mapping challenge is particularly interesting. They used a minimal 4-bit ANSI palette because it is one of the few color modes most terminals allow users to customize. Rather than encoding brand colors directly, the animation maps semantic roles (borders, eyes, highlights) to ANSI color slots that terminals can reinterpret safely.

Cameron Foxly, a brand designer, built his own ASCII animation editor from scratch using Copilot for scaffolding. Within an hour he had a working monochrome prototype. Then Andy Feller, a longtime CLI engineer, partnered with him to make it production-worthy across wildly different terminals.

The architecture separates frames as plain text from themes as simple role-to-color mappings, with runtime colorization. This enables maintainable animation updates and support for both light and dark modes. The animation is behind an opt-in flag, and screen-reader mode skips it entirely.

Cameron has since open-sourced his ASCII animation tool at ascii-motion.app. The irony of a "nostalgic" ASCII animation requiring cutting-edge engineering is not lost on me.

**Key takeaways:**
- 6,000+ lines of TypeScript for three seconds of animation
- Semantic color roles map to ANSI slots terminals can override
- No canvas in terminals - everything is stdout writes plus escape codes
- Animation opt-in, automatically skipped in screen-reader mode
- Frame content separated from themes for maintainability

**Link:** [From pixels to characters: The engineering behind GitHub Copilot CLI's animated ASCII banner](https://github.blog/engineering/from-pixels-to-characters-the-engineering-behind-github-copilot-clis-animated-ascii-banner/)

---

## AI SDK Profiler for React Native

**TLDR:** Callstack released a DevTools plugin that captures OpenTelemetry spans from Vercel AI SDK calls and renders them in Rozenite DevTools for local debugging.

**Summary:**

If you are building AI features in React Native apps, debugging what the AI SDK is actually doing has been a black box. This new plugin captures OpenTelemetry spans from Vercel AI SDK calls and visualizes them locally.

The implementation hooks into the AI SDK's existing telemetry support. When you enable telemetry on SDK calls, the plugin's tracer records spans and forwards them through the Rozenite plugin bridge. DevTools renders them live in a dedicated AI SDK Profiler panel.

The setup is straightforward: install @react-native-ai/dev-tools-plugin, call useAiSdkDevTools() in your app, and enable experimental_telemetry on your AI SDK calls. You get a tracer from getAiSdkTracer() that you pass to the telemetry configuration.

What you can see: request timeline, inputs and outputs, provider metadata, and latency. Whether profiling text generation, embeddings, speech, or transcription, the plugin shows where time is spent. It is runtime agnostic, so spans from on-device and cloud providers both show up in the same UI.

Rozenite itself is a DevTools plugin framework for React Native. Install a plugin and it appears inside React Native DevTools without extra windows or servers. It supports Expo and bare React Native, works with Metro or Re.Pack, and keeps plugin code out of production builds.

**Key takeaways:**
- Captures OpenTelemetry spans from Vercel AI SDK
- Visualizes prompts, responses, metadata, and latency
- Works with text generation, embeddings, speech, transcription
- Runtime agnostic - on-device and cloud providers in same UI
- Rozenite framework keeps DevTools plugins out of production

**Link:** [Announcing AI SDK Profiler for React Native](https://www.callstack.com/blog/announcing-ai-sdk-profiler-for-react-native)

---

## agent-device: CLI for AI Agents to Control Mobile Devices

**TLDR:** Callstack released a CLI tool that lets AI agents control iOS simulators and Android emulators through commands like click, fill, scroll, and screenshot.

**Summary:**

This is the kind of tooling that makes agentic mobile development practical. agent-device provides a CLI for AI agents (or humans) to control iOS and Android devices programmatically. Think of it as a bridge between AI coding assistants and actual device interaction.

Core commands include: open, back, home, app-switcher, press, long-press, focus, type, fill, scroll, scrollintoview, wait, alert, screenshot, and close. Inspection commands like snapshot return the accessibility tree. The CLI works with iOS simulators (limited device support) and Android emulators and devices.

The workflow is simple: agent-device open Contacts --platform ios creates a session, agent-device snapshot captures the accessibility tree, then you interact with elements by reference (agent-device click @e5) or fill forms (agent-device fill @e6 "John"). Sessions persist until you close them.

On iOS, the default backend is XCTest which does not require Accessibility permission. Input commands like press, type, and scroll are simulator-only in v1. Real device support is on the roadmap.

Settings helpers let you toggle wifi, airplane mode, and location (with caveats - iOS wifi/airplane just toggle status bar indicators, not actual network state). App state commands show the foreground app and list installed apps with metadata.

The project is experimental but actively developed. Influened by Vercel's agent-browser, it fills a gap in the mobile AI tooling ecosystem.

**Key takeaways:**
- CLI commands for open, click, fill, scroll, screenshot
- Snapshot returns accessibility tree with element references
- iOS simulator and Android emulator/device support
- XCTest backend for iOS does not require Accessibility permission
- Session-based workflow with trace logging for debugging

**Link:** [agent-device](https://github.com/callstackincubator/agent-device)
