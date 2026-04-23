---
title: "TypeScript 7 Beta Drops, Rspack 2.0 Ships, and React Native Gets Seriously Fast"
excerpt: "A week packed with major releases: TypeScript 7.0 beta on Go, Rspack 2.0 with RSC support, React Email 6's open-source editor, a Vercel security incident, and a wave of React Native tooling advances."
publishedAt: "2026-04-23"
slug: "typescript-7-beta-rspack-2-react-native-performance-this-week-in-react-278"
hashtags: "#thisweekinreact #react #reactnative #typescript #nextjs #server-components #performance #architecture #testing #generated #en"
source_pattern: "This Week In React"
---

## TypeScript 7.0 Beta: The Go Port Is Here and It's Fast

**TLDR:** Microsoft shipped the TypeScript 7.0 beta, built on a complete port from TypeScript-as-TypeScript to Go. The compiler is roughly ten times faster than TypeScript 6.0, runs type-checking in parallel across multiple workers, and is available today via the `@typescript/native-preview` package.

**Summary:** This is not a rewrite. The team was deliberate about porting the existing codebase rather than rethinking it from scratch, which means the type-checking semantics are structurally identical to TypeScript 6.0. If your code compiles cleanly under 6.0, it should compile identically under 7.0. That's an important distinction because it means the ten-times speedup comes from the Go runtime and shared memory parallelism, not from shortcuts in analysis.

The beta introduces a `--checkers` flag that controls how many parallel type-checking workers run. The default is four, but you can tune it up or down depending on your machine and CI environment. There's also `--builders` for parallelizing project reference builds in monorepos, and a `--singleThreaded` flag for debugging or constrained environments. The multiplicative effect of checkers times builders means you need to find the right balance rather than just cranking both to maximum.

TypeScript 7.0 adopts 6.0's new defaults and turns previously deprecated behaviors into hard errors. The most notable changes: `strict` is true by default, `module` defaults to `esnext`, and `target: es5` is no longer supported. The `rootDir` change and the `types` defaulting to an empty array are likely to catch people off guard. The blog post walks through the mitigations, but teams should read the 6.0 release notes carefully before jumping to 7.0 if they haven't already upgraded.

The VS Code extension is described as rock-solid and has been in use at Bloomberg, Canva, Figma, Google, Slack, Vercel, and others for months. The stable programmatic API won't land until TypeScript 7.1, which matters for tooling authors. The stable release is expected within two months.

I want to be clear: this is a genuinely significant moment. The TypeScript team spent a year porting millions of lines to Go, and the result is a compiler that shaves off a majority of build times in large codebases. The "beta" label shouldn't stop most teams from trying it.

**Key takeaways:**
- Ten times faster than TypeScript 6.0 thanks to Go runtime and parallelism
- Porting, not rewrite: semantics identical to TS 6.0
- Available now via `@typescript/native-preview` and `tsgo` executable
- New `--checkers`, `--builders`, and `--singleThreaded` flags for tuning
- Hard errors on deprecated behaviors from TS 6.0
- Stable programmatic API won't arrive until TS 7.1
- Stable release expected within two months

**Why do I care:** I have been waiting for this since the Go port was first announced. Build time is not an abstract metric — it is the difference between a fast feedback loop and a slow one, between developers staying in flow and context-switching while they wait. Ten times faster is not a marginal improvement. Teams running TypeScript on monorepos with millions of lines of code are about to get back hours of CI time per week. The fact that the semantics are identical means adoption risk is low. I'd argue the risk of not trying it is higher.

**Link:** [Announcing TypeScript 7.0 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/)

---

## Vercel April 2026 Security Incident: What Happened and What to Do

**TLDR:** Vercel disclosed a security incident involving unauthorized access to internal systems through a compromised third-party AI tool. Non-sensitive environment variables stored on Vercel were exposed for a subset of customers, and Vercel has published a detailed incident timeline and remediation guidance.

**Summary:** The attack originated through Context.ai, a third-party AI tool used by a Vercel employee. The attacker used that access to take over the employee's Google Workspace account, which enabled pivot into Vercel systems, and from there they enumerated and decrypted non-sensitive environment variables. Vercel describes the attacker as highly sophisticated based on their operational velocity and familiarity with Vercel's product API surface.

The investigation, conducted with Google Mandiant and other cybersecurity firms, confirmed that no npm packages published by Vercel were compromised. The supply chain appears safe. Vercel also identified a small number of accounts with evidence of prior compromise unrelated to this incident, pointing to social engineering or malware.

The practical guidance from Vercel is concrete: rotate any environment variables not marked as sensitive, enable two-factor authentication with an authenticator app, review your activity logs, and check for unexpected deployments. Deleting your project does not eliminate risk if compromised secrets still provide access to production systems. Vercel has also published an OAuth app identifier as an IOC for Google Workspace admins to check.

In response, Vercel is shipping better environment variable management with stronger defaults, team-wide security overviews, and a more useful activity log.

The bigger picture here is uncomfortable but important: the attack vector was a third-party AI tool with Google Workspace OAuth access. Many organizations are rapidly expanding their attack surface by connecting AI tools to corporate accounts. This incident is a reminder that each OAuth grant is a potential entry point.

**Key takeaways:**
- Attack originated via compromised third-party AI tool (Context.ai) connected to a Vercel employee's Google Workspace
- Non-sensitive environment variables were exposed for a subset of customers
- npm packages published by Vercel confirmed not compromised
- Immediate action: rotate non-sensitive env vars, enable MFA, review activity logs
- Deleting Vercel projects does not eliminate risk if secrets are already exposed
- Vercel published OAuth app IOC for Google Workspace admins

**Why do I care:** The mechanics of this attack — OAuth grant to an AI tool, lateral movement through employee accounts into infrastructure — is a pattern we should expect to see more of. The era of connecting AI assistants to everything is creating a much larger and less-audited OAuth surface area than most security teams have had to manage before. Regularly auditing which apps have access to your corporate accounts, and marking secrets as sensitive by default, should be standard practice now. This incident is a useful forcing function for teams that haven't done that audit yet.

**Link:** [Vercel April 2026 security incident](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)

---

## React Email 6.0: Open-Source Visual Editor and a Unified Package

**TLDR:** React Email 6.0 ships with a new open-source visual editor available as a standalone package, a unified `react-email` package consolidating all components, and a fresh set of templates from Character Studio. The project has reached two million weekly npm downloads, up 108% in five months.

**Summary:** The centerpiece of this release is the visual editor. You embed it directly in your app with a few lines of code, it outputs semantically correct email-ready HTML that renders across major inbox providers, and the architecture is split into two layers: a core that works without configuration and an extensions API built on an `EmailNode` primitive. That second layer is where it gets interesting — you can build custom blocks for CDN image uploads, embedded social posts, or inline charts. The editor outputs React Email template code, not just HTML, which means it stays integrated with the rest of your workflow.

The unified package change is a cleaner developer experience. Previously you juggled multiple `@react-email/*` packages. Now a single `react-email` import handles everything except the editor, which is installed separately. The migration path is documented and looks relatively mechanical.

Two million weekly downloads is a real number. Email rendering has historically been a miserable part of frontend work, with inconsistent HTML support across clients and no good way to build visually without fighting markup. React Email has been steadily making this better since version one.

**Key takeaways:**
- New open-source visual editor embeddable in your own app
- Editor uses a composable extensions API via `EmailNode`
- All components unified into a single `react-email` package
- New templates from Character Studio for auth flows and e-commerce
- 2M weekly npm downloads, up 108% since version 5
- Editor output is React Email template code, not just HTML

**Why do I care:** Embedded email editors are something SaaS products have historically had to build from scratch or pay dearly for. Making this composable and open-source changes the calculus for any product that needs to let users customize transactional email. The extension API is the right architectural choice — it keeps the core lean while allowing the complex cases. I'd want to see how it handles dark mode and Outlook before recommending it unconditionally, but the direction is very good.

**Link:** [React Email 6.0](https://resend.com/blog/react-email-6)

---

## Rspack 2.0: RSC Support, ESM-Only Core, and Better Static Analysis

**TLDR:** Rspack 2.0 is out, bringing React Server Components experimental support, a pure ESM distribution, significant dependency reductions, and improved tree shaking including Module Federation tree shaking. Build performance improved another 10% over 1.7, and 100% over 1.0.

**Summary:** The 2.0 release is framed as a shift in direction. Rspack 1.x deliberately aligned with webpack 5 APIs to make migration cheap. Starting with 2.0, the team is willing to introduce better defaults and API designs that diverge from webpack where the JavaScript ecosystem has moved on. They're rolling this out in stages to avoid packing too many breaking changes into a single release.

The RSC support is experimental but covers directive handling for "use client" and "use server", compile-time checks for RSC rule violations, CSS collection from server and client components, and HMR for both. The team is working with TanStack on supporting TanStack Start's RSC usage in a future release. Modern.js already ships RSC support built on Rspack.

The dependency reduction is notable. `@rspack/dev-server` went from 192 dependencies to 1, cutting install size from 15 MB to 1.4 MB. The team replaced Express with Connect, bundled some dependencies directly for better supply chain control, and dropped some non-core packages to optional. `@rspack/cli` now has zero dependencies.

The static analysis improvements for tree shaking now handle CommonJS require destructuring, property access patterns, and inline access on dynamic import results. The new `#__NO_SIDE_EFFECTS__` compiler annotation support lets you mark functions as pure for tree shaking purposes. Module Federation now supports export-level tree shaking for shared dependencies, which matters a lot for large shared libraries.

**Key takeaways:**
- Experimental React Server Components support with directive handling, compile-time checks, and HMR
- Pure ESM packages for core Rspack packages
- `@rspack/dev-server` dependencies reduced from 192 to 1 (15 MB to 1.4 MB)
- Improved tree shaking: CJS destructuring, inline dynamic import access, `#__NO_SIDE_EFFECTS__` annotations
- Module Federation tree shaking for shared dependencies
- `detectSyntax: 'auto'` in swc-loader simplifies multi-extension rules
- Migration agent skill available: `npx skills add rstackjs/agent-skills --skill rspack-v2-upgrade`

**Why do I care:** Rspack has been on a steady trajectory from "fast webpack replacement" toward something genuinely better than what it replaces. The RSC support moving into the bundler layer is important because full-stack frameworks need build-level understanding of server/client boundaries. The dependency reduction is underrated — 15 MB to 1.4 MB for a dev server is a meaningful improvement for CI cold starts and developer machine setups. Teams on large webpack codebases should be evaluating Rspack now if they haven't already.

**Link:** [Announcing Rspack 2.0](https://rspack.rs/blog/announcing-2-0)

---

## eslint-plugin-react-hooks 7.1.0: ESLint v10 and Better Hook Validation

**TLDR:** The React Hooks ESLint plugin released version 7.1.0 with ESLint v10 support, performance improvements by skipping compilation for non-React files, and a series of compiler and lint improvements including better set-state-in-effect detection and improved ref validation.

**Summary:** The performance change is practical: the plugin now skips compilation entirely for files that don't use React, which matters in mixed codebases where a significant percentage of files have nothing to do with components or hooks. The set-state-in-effect improvements cover previously undetected patterns with fewer false negatives. The ref validation improvements handle non-mutating functions and event handler props more correctly. The compiler now reports all errors rather than stopping at the first one, which makes it much more useful in CI where you want to see the full picture before fixing anything.

**Key takeaways:**
- ESLint v10 support added
- Non-React files now skipped during compilation for better performance
- Improved set-state-in-effect validation with fewer false negatives
- Better ref validation for non-mutating functions and event handler props
- Compiler now reports all errors instead of stopping at first

**Why do I care:** Incremental improvements to the hooks lint plugin matter more than they look on paper. The rules of hooks aren't going away, and the more accurately the plugin catches violations without generating noise, the more teams will actually trust and enable it at the error level. The ESLint v10 support unblocks teams that have been waiting to upgrade their linting infrastructure.

**Link:** [eslint-plugin-react-hooks@7.1.0](https://github.com/facebook/react/releases/tag/eslint-plugin-react-hooks%407.1.0)

---

## TSRX: A TypeScript Language Extension for Declarative UI

**TLDR:** TSRX (TypeScript Ripple Extensions) is a new TypeScript language extension that lets you write declarative UI components with co-located control flow, scoped styles, and inlined locals — fully backwards compatible with TypeScript and compiling to React, Preact, Solid, or Ripple.

**Summary:** TSRX is positioned as a spiritual successor to JSX. The core idea is that structure, control flow, styling, and derived values should live together in the same block rather than being squeezed through expression slots or hoisted to the top of a component. The syntax allows native `for` loops and `if` blocks directly inside the template rather than requiring `.map()` chains and ternaries. Scoped `<style>` blocks live alongside the markup they style. Local variables can be declared mid-template, scoped to their surrounding block.

The practical ergonomics benefit: the compiler handles framework-specific footguns automatically. For React, hooks called conditionally get lifted into separate components so the rules of hooks are satisfied at compile time. For Solid, destructured props get compiled to lazy getters so reactivity is preserved without forcing `props.count` everywhere.

The project ships with a language server, Prettier plugin, ESLint plugin, and support for VS Code, Zed, Neovim, IntelliJ, and Sublime. It interoperates with existing TypeScript and TSX codebases, so adoption can be incremental.

The motivation also leans into AI: co-located information is easier for language models to reason about than scattered references across a component file. This is a real consideration — LLMs do perform better when related information is physically adjacent in the context window.

**Key takeaways:**
- New TypeScript language extension for UI components with co-located structure, control flow, and styles
- Compiles to React, Preact, Solid, and Ripple
- Native `for`/`if` syntax replaces `.map()` chains and ternaries
- Compiler handles framework footguns automatically (conditional hooks, Solid prop reactivity)
- Language server, Prettier plugin, ESLint plugin, and multi-editor support
- Incremental adoption — interoperates with existing TS/TSX codebases

**Why do I care:** I'm skeptical of language extensions that require tooling buy-in for every editor and CI pipeline. The history of JSX itself shows this can work, but it's a high bar. What I find genuinely interesting here is the compiler-managed footgun elimination — automatically lifting conditional hooks into components is solving a real pain point that catches experienced React developers too. Whether TSRX gains enough adoption to be worth the tooling investment is an open question, but the ideas are worth watching.

**Link:** [TSRX - TypeScript Language Extension for Declarative UI](https://tsrx.dev/)

---

## Salesforce Multi-Framework: Build React Apps on the Salesforce Platform

**TLDR:** Salesforce has launched Multi-Framework in open beta, allowing developers to build native Salesforce apps using React — with authentication, security, GraphQL data access, and Apex method invocation all built in, running alongside existing Lightning Web Components.

**Summary:** Until now, building on Salesforce meant adopting Lightning Web Components or Aura. Multi-Framework eliminates that constraint. React apps deploy to the Agentforce 360 Platform with full access to Salesforce data via GraphQL and Apex, using the `@salesforce/sdk-data` package. The generated project template comes pre-configured with Vite, Vitest, shadcn/ui, and Tailwind CSS, which is a notably modern stack for enterprise platform tooling.

The coexistence story is important: Multi-Framework doesn't replace LWC, it runs alongside it. Existing Lightning Web Components continue to work. React components can be embedded as micro-frontends on Lightning pages, though that micro-frontend support is currently in developer preview. The comparison table in the announcement is honest about the current gaps: no Lightning App Builder drag-and-drop, not available in production orgs during beta, and LWC retains advantages in declarative data access and base component coverage.

The addition of Agentforce Vibes 2.0, which generates Multi-Framework React apps from natural language prompts, is a sign of where Salesforce sees this going. The combination of a large enterprise platform and React's ecosystem reach is potentially significant for enterprise developers who have had to make hard choices between platform features and modern tooling.

**Key takeaways:**
- React apps can now run natively on Salesforce via Multi-Framework (open beta, scratch orgs and sandboxes only)
- `@salesforce/sdk-data` provides GraphQL queries and Apex invocations with automatic auth
- Generated project template: Vite, Vitest, shadcn/ui, Tailwind CSS
- React coexists with LWC — existing components unaffected
- Micro-frontend embedding into Lightning pages in developer preview
- Not available in production orgs during beta; Lightning App Builder drag-and-drop not yet supported

**Why do I care:** There are a lot of developers who have been writing enterprise apps on Salesforce and would much rather use React tooling than LWC. This is a real unlock for that audience. The caveat is that enterprise adoption of beta features is slow, and the gaps — production orgs, App Builder support, declarative data access — are exactly what enterprise teams care about. This is worth tracking for teams building custom Salesforce experiences, but I'd wait for GA before planning anything around it.

**Link:** [Build with React, Run on Salesforce: Introducing Salesforce Multi-Framework](https://developer.salesforce.com/blogs/2026/04/build-with-react-run-on-salesforce-introducing-salesforce-multi-framework)

---

## AI-Generated UI Is Inaccessible by Default: A Five-Layer Enforcement System

**TLDR:** A detailed analysis of why AI code generation tools consistently produce inaccessible React components — and a practical five-layer enforcement system combining prompt constraints, ESLint, runtime testing with axe-core, CI integration, and accessible component library abstractions.

**Summary:** The article opens with a demonstration that should be uncomfortable reading: a sidebar component generated by a general-purpose AI tool can have ten distinct accessibility failures in twenty-nine lines of code. Wrong roles, no keyboard interaction, no ARIA state attributes, no landmark, fake links. The argument for why this happens is worth taking seriously — training data skews heavily toward visual-first code, feedback loops during RLHF reward visual fidelity, and the compact syntax of `<div onClick>` represents fewer tokens than a properly attributed `<button>` with `aria-expanded` and `aria-controls`.

The five-layer system works from the outermost prevention to the innermost enforcement: workspace-level prompt constraints (baked into `.cursorrules` or `.github/copilot-instructions.md`), ESLint with `eslint-plugin-jsx-a11y` set to error, runtime testing with `jest-axe`, CI integration requiring all accessibility tests to pass before merge, and architectural defaults using Headless UI, Radix UI, or React Aria for interactive components.

The architectural layer is the most powerful because it works regardless of which AI tool generated the code. Using Radix's Disclosure component instead of letting AI generate a `<div onClick>` toggle means `aria-expanded`, keyboard activation, and panel association are handled automatically. The AI's job shrinks to visual composition.

The author is honest about the limits of automated tooling: axe-core covers 70-85% of real-world issues. Color contrast, structural ARIA, and missing form labels are detectable. Whether labels are meaningful, whether focus moves correctly, whether reading order makes sense — that still requires manual testing with actual assistive technologies.

**Key takeaways:**
- AI tools consistently generate inaccessible React components due to training data bias and visual-first feedback signals
- Five-layer enforcement: prompt constraints, ESLint jsx-a11y, jest-axe runtime tests, CI enforcement, accessible component abstractions
- Headless UI, Radix UI, and React Aria eliminate accessibility failures at the architectural level
- `<div onClick>` is never acceptable — use `<button>` or `<a>`
- axe-core covers roughly 70-85% of real-world accessibility violations; manual testing with screen readers remains necessary
- v0's approach of defaulting to Radix-based components is the right architectural pattern

**Why do I care:** This article is doing important work. Accessibility failures accumulate quietly and compound over time, and AI-assisted development is currently making the problem worse at scale. The five-layer system is actionable and the priority ordering is right — architectural choices beat prompt engineering every time because they don't depend on any particular model or tool remembering the constraints. Setting `eslint-plugin-jsx-a11y` to error in CI takes thirty minutes and prevents an entire class of failures permanently. Every frontend team should do this today, AI usage or not.

**Link:** [AI-Generated UI Is Inaccessible by Default](https://frontendmasters.com/blog/ai-generated-ui-is-inaccessible-by-default/)

---

## Lingui 6.0: ESM-Only, Smaller Packages, and Named JSX Placeholders

**TLDR:** Lingui 6.0 ships as ESM-only, cuts combined install size by 44% and dependency count from 146 to 104 packages, adds configurable named JSX placeholder labels in `<Trans>`, and introduces CLI multithreading. Node.js v22.19+ or v24+ is now required.

**Summary:** The ESM-only move is a meaningful simplification. Dual builds nearly doubled package sizes, added maintenance complexity, and occasionally introduced subtle bugs from module duplication. With Node.js supporting `require(esm)` in recent versions, the practical impact on most projects is minimal, though the requirement for Node.js 22.19+ or 24+ will be a blocker for teams still running older Node versions.

The named JSX placeholder feature addresses a real translator pain point. Numeric placeholders like `<0>...</0>` provide no context to translators, and renumbering after a JSX refactor can silently invalidate existing translations. Named placeholders like `<link>...</link>` and `<bold>...</bold>` are more stable and more meaningful. You can configure project-wide defaults by element type, or override per-element with the `_t` attribute.

CLI multithreading is enabled across all commands, defaulting to `CPU cores - 1` workers capped at 8. The `--workers 1` flag disables it for debugging.

The `ph()` macro for naming interpolated values — turning positional `{0}` placeholders into named `{name}` ones — is another translator-friendly change that helps catch grammar and word order issues in target languages.

**Key takeaways:**
- ESM-only distribution; Node.js v22.19+ or v24+ required
- Combined install footprint reduced from 62 MB to 35 MB
- Dependencies reduced from 146 to 104 packages
- Named JSX placeholders in `<Trans>` via `jsxPlaceholderAttribute` and `jsxPlaceholderDefaults` config
- `ph()` macro for named interpolated value placeholders
- CLI multithreading with configurable worker count via `--workers` flag
- TanStack Start example added

**Why do I care:** i18n tooling is easy to set up wrong and expensive to fix later. The named placeholder feature is the kind of quality-of-life improvement that seems minor until you've had a translator return a message that doesn't make grammatical sense because they didn't know what `<0>` referred to. The package size reduction is straightforward win. Teams maintaining multilingual React apps who haven't looked at Lingui recently should check this release.

**Link:** [Announcing Lingui 6.0](https://lingui.dev/blog/2026/04/22/announcing-lingui-6.0)

---

## How Margelo Fixed Discord's React Native New Architecture Animation Performance

**TLDR:** Margelo engineers dug into React Native's Reanimated internals and Fabric Shadow Tree to diagnose why Discord's Android app animations felt broken after migrating to the New Architecture. The fix — syncing settled animations back to React and removing nodes from the animated props registry — reduced janky frames by 26%.

**Summary:** The diagnosis required understanding three systems simultaneously: how Reanimated advances animations on the UI thread, how Fabric's immutable Shadow Tree works, and how `shadowTree.commit()` and commit hooks interact. The performance problem was not a slow algorithm — it was the wrong scope. When only one view was animating, Reanimated's `cloneShadowTreeWithNewProps` was still traversing and cloning hundreds of shadow nodes for every view that had ever been animated on that screen, because they remained in the animated props registry even after their animations completed.

The fix had two parts: syncing settled animation state back to React (via `FORCE_REACT_RENDER_FOR_SETTLED_ANIMATIONS`, now on by default since Reanimated 4.3.0), and re-enabling the fast path for non-layout props (via `ANDROID_SYNCHRONOUSLY_UPDATE_UI_PROPS` and `IOS_SYNCHRONOUSLY_UPDATE_UI_PROPS` feature flags). The fast path bypasses the Shadow Tree for non-layout props like opacity, avoiding a full layout pass at 60 frames per second for updates that don't affect layout. The safety issue that previously required disabling this path is mitigated by the state sync fix.

The article is one of the better deep dives into React Native internals I've seen. The explanation of why all updates go through `shadowTree.commit()` — including the commit hook that prevents React from overwriting Reanimated's updates — is genuinely educational.

**Key takeaways:**
- Discord's animation regressions on New Architecture traced to accumulation in the animated props registry
- `cloneShadowTreeWithNewProps` was cloning hundreds of nodes even when only one view was animating
- Fix: sync settled animations back to React to evict nodes from the registry
- `FORCE_REACT_RENDER_FOR_SETTLED_ANIMATIONS` is on by default since Reanimated 4.3.0
- Fast path for non-layout props (opacity etc.) re-enabled via `ANDROID_SYNCHRONOUSLY_UPDATE_UI_PROPS` and `IOS_SYNCHRONOUSLY_UPDATE_UI_PROPS` flags
- Jank frame rate on Discord's Android app reduced by 26%

**Why do I care:** This write-up demystifies a part of React Native that very few developers have had to think about. Animation performance regressions during architecture migrations are common, and the root cause is almost never obvious. The practical takeaway for teams that have migrated to New Architecture: check whether `FORCE_REACT_RENDER_FOR_SETTLED_ANIMATIONS` is enabled and benchmark before enabling the synchronous UI prop update flags. The shared animation backend landing in React Native core is the longer-term fix that should make this unnecessary.

**Link:** [How Margelo Helped Discord Improve React Native's New Architecture Performance](https://blog.margelo.com/margelo-discord-react-native-performance)

---

## Expo Raises $45M Series B and Bets on React Native's Agentic Future

**TLDR:** Expo raised a $45 million Series B led by Georgian, launched Expo Agent in public beta — an agentic system powered by Claude Code for going from prompt to production-ready React Native app — and hired Seth Webster, former Meta React organization lead and React Foundation executive director, as chief developer evangelist.

**Summary:** The Seth Webster hire is the most interesting signal here. Webster spent six years leading the React organization at Meta, helped move React to the Linux Foundation, and is now at Expo. His argument for why React Native makes sense in an agentic era is worth hearing: declarative systems are easier for LLMs to reason about, and maintaining a single codebase across iOS, Android, Windows, and macOS reduces the tokens an AI needs to spend compared to maintaining five separate codebases. As model pricing normalizes, cross-platform efficiency becomes a cost argument, not just a developer experience argument.

Expo Agent runs in the browser, generates and modifies apps from prompts, produces native applications for iOS and Android with platform-specific code where needed, and ties into Expo's build system to produce installable binaries and handle app store submissions. Under the hood it's Claude Code, tuned around Expo's ecosystem. The differentiation from generic coding agents is production-readiness: handling configuration, dependencies, and native integrations through to actual deployment.

Webster was direct in the interview about the criticisms of React — tooling gaps, inconsistent developer experience, React Native moving faster at the expense of reliability — and didn't deflect them. That kind of honesty from someone now advocating for the platform is more credible than boosterism.

**Key takeaways:**
- Expo raised $45M Series B led by Georgian
- Expo Agent (public beta): Claude Code-powered system for prompting your way to a production React Native app
- Seth Webster (former Meta React org lead, React Foundation executive director) joins as chief developer evangelist
- Cross-platform single codebase reduces AI token costs as model pricing normalizes
- Expo Agent handles configuration, native integrations, and app store submissions, not just code generation

**Why do I care:** The combination of production-readiness tooling and agentic development is the right place to compete. Everyone can generate code. Few tools can reliably take that generated code to a deployed binary on the App Store. If Expo Agent actually closes that gap, it changes the economics of mobile app development meaningfully. The $45M gives them runway to build out what they're describing. I'll be watching whether the agent can handle real-world native integration complexity — that's where these tools have historically fallen apart.

**Link:** [Expo bets big on React Native's agentic future](https://thenewstack.io/expo-bets-big-on-react-nativess-agentic-future/)

---

## Rebuilding Doctolib's Homepage from WebView to Native React Native

**TLDR:** Doctolib rebuilt their app homepage from a WebView wrapping a web page to a fully native React Native implementation using a BFF-driven section model, cutting time-to-interactive by ~50% and time-to-booking from 4m03s to 3m30s — after a humbling A/B test that revealed a missing close button as the biggest conversion driver.

**Summary:** The engineering story here is careful and honest, which makes it worth reading. Doctolib didn't rewrite the homepage because they wanted to — they did it because they were building a new product (Doctolib Parents) that needed native-only features and genuine animations, and the WebView couldn't support either. They took a deliberate two-phase approach: first reproduce the existing experience natively without design changes to validate the technology in isolation, then layer in new design and features once the foundation was proven.

The architecture they landed on is clean. A BFF endpoint returns an ordered list of section types for each user based on their country, app version, feature flags, and profile. The homepage package is an orchestrator that maps those types to React Native components registered in a section registry. Each section component is owned by the team responsible for that product area. Adding a new segment or reordering for a specific user group becomes a single team decision without touching the core homepage.

The A/B test section is the most educational part. Cookie synchronization between the WebView and native layer corrupted initial results. Once fixed, the conversion data pointed at a missing close button on a bottom sheet that only appeared once in the entire onboarding flow. On Android, users could dismiss it with the hardware back button. On iOS they could not, so some users simply closed the app. Weeks of investigating synchronization and network edge cases, and the fix was a single UI element.

**Key takeaways:**
- BFF-driven section model: server returns ordered section types per user context; homepage orchestrates rendering
- Each section owned by responsible team, registered in a central section registry
- A/B test corrupted initially by cookie sync issue between WebView and RN; always validate experiment infrastructure first
- Missing close button on a bottom sheet was the biggest single conversion driver
- Time to interactive reduced ~50% on both platforms
- Median time to booking reduced from 4m03s to 3m30s
- Homepage package stayed lightweight despite 3x more sections than before

**Why do I care:** The section registry pattern is one I'd use again. The BFF-driven ordering with team-owned section components is a clean way to solve the ownership and extensibility problems that accumulate on high-traffic surfaces. The A/B test cautionary tale about experiment infrastructure being wrong before the product is wrong is practical wisdom that saves months of misdirected investigation. And the missing close button story is a useful reminder that real users on real devices find failure modes that internal testing misses, especially around platform-specific interaction patterns like iOS's lack of a hardware back button.

**Link:** [Rebuilding the Doctolib Homepage from Webview to Native](https://medium.com/doctolib/rebuilding-the-doctolib-homepage-from-webview-to-native-27937ea71801)

---

## Building a Blog in TanStack Start (Part 1 of 2)

**TLDR:** A hands-on walkthrough of building a Markdown-powered blog using TanStack Start, covering server functions for file system access, dynamic route parameters, and Markdown-to-HTML conversion with Shiki syntax highlighting.

**Summary:** TanStack Start is a thin server-side layer over TanStack Router that provides server functions, API endpoints, and SSR. This post uses it for a blog to explore practical patterns rather than toy demos, including a pattern that catches developers who expect loaders to be server-only: in TanStack Start, loaders are isomorphic and run on the client for subsequent navigations. Reading files from disk requires wrapping the logic in a `createServerFn()` which always runs on the server regardless of where the caller executes.

The route structure follows TanStack Router's file-based conventions: a `$slug.tsx` file creates a dynamic segment, and the `$` prefix signals a route parameter that populates the `params` object in both the loader and the `head` function for per-page metadata. The static generation aspect — deploying as a pre-rendered static site — is deferred to Part 2.

The Markdown-to-HTML pipeline uses `markdown-it` with Shiki for code highlighting, including a custom transformer that adds a `data-linenumbers` attribute to pre-elements based on a `line-numbers` keyword in the fenced code block, then uses CSS counters to render actual line numbers. The CSS counter technique is clean and has no JavaScript dependency at render time.

**Key takeaways:**
- TanStack Start loaders are isomorphic — file system access requires `createServerFn()` to guarantee server execution
- `$slug.tsx` filename creates a dynamic route segment; params available in loader and `head` function
- `import.meta.glob` with `{ eager: true }` scans all Markdown files at build time
- `gray-matter` handles frontmatter parsing for metadata extraction
- Shiki via `@shikijs/markdown-it` for syntax highlighting with custom transformer for line numbers
- Part 2 will cover static generation and deployment

**Why do I care:** The server function distinction is something TanStack Start developers will trip over early and often. Making it explicit through a concrete example is useful. The broader point — that TanStack Start gives you the full-stack mental model of Next.js with a routing layer that many developers prefer — is landing through practical demonstration here rather than marketing copy. The blog format is cliche but it works.

**Link:** [Building a Blog in TanStack (Part 1 of 2)](https://frontendmasters.com/blog/building-a-blog-in-tanstack-part-1-of-2/)

---

## React Native Nano Icons: Build-Time SVG-to-Font for Fast Icon Rendering

**TLDR:** Software Mansion Labs released `react-native-nano-icons`, a library that converts SVGs to icon fonts at build time and renders them as native text glyphs, bypassing React's component tree entirely for dramatically faster rendering of large icon sets — especially in scrollable lists and tab bars.

**Summary:** The performance case is straightforward: native text engines render glyphs synchronously and memory-efficiently. `react-native-svg` spins up a full React subtree for each icon, which compounds in screens with fifty or more repeated symbols. `react-native-nano-icons` converts your SVG folder to a `.ttf` font at build time and renders each icon as a stacked text glyph call — one `drawGlyphs` call per color layer via CoreText on iOS and Canvas on Android.

Multicolor support is handled by splitting SVGs by distinct fill color at build time and stacking glyph layers at render time. An icon with three color regions becomes three glyph layers. Icons with dozens of colors are better served by expo-image.

The library requires New Architecture only (React Native 0.74+), supports Expo via a config plugin, and bare React Native via a CLI. The build pipeline uses a WebAssembly build of Skia for geometry flattening and clip path resolution before font compilation. Known limitations: `<filter>` and `<mask>` SVG elements are not supported.

**Key takeaways:**
- Build-time SVG-to-font conversion; runtime rendering via native text glyph APIs
- Bypasses React's component tree entirely — no reconciliation overhead per icon
- Multicolor support via stacked glyph layers
- New Architecture only (RN 0.74+, iOS 15.1+, Android API 24+)
- Expo config plugin for prebuild; CLI for bare React Native
- `<filter>` and `<mask>` SVG elements not supported

**Why do I care:** Icon rendering in lists is a real performance cost that's easy to underestimate when you're developing on a fast device. The approach here is principled — use the OS's most optimized rendering primitive for something that fundamentally is a glyph. The New Architecture requirement limits the addressable audience today, but that audience is growing. Worth evaluating for any app that renders large icon-heavy lists.

**Link:** [react-native-nano-icons on GitHub](https://github.com/software-mansion-labs/react-native-nano-icons)

---

## Argent: An Agentic Toolkit for iOS Simulator Control and Profiling

**TLDR:** Software Mansion released Argent, an MCP-based toolkit that gives AI coding assistants direct access to iOS Simulators for autonomous interaction, profiling, debugging, and React Native development — without switching context out of your CLI.

**Summary:** Argent exposes iOS Simulator control to any AI assistant that supports MCP, including Claude Code, Cursor, VS Code, Windsurf, Zed, Gemini CLI, and Codex CLI. It installs via `npx @swmansion/argent init`, which auto-detects your editor and registers the MCP server in the appropriate config location. From there, you can ask your assistant to tap buttons, run Instruments profiling sessions, inspect logs, capture crash reports, and reproduce failing states — all without leaving the agent loop.

The React Native integration is first-class. The agent can build, launch, and iterate on RN projects through the same workflow it would use for any iOS app. The profiling capability includes both React Native-specific profiling and Xcode Instruments sessions, with comprehensive summaries.

The privacy model is worth noting: no telemetry, no analytics, no crash reporting. The only outbound network call is a version check against npm, which sends no user data. The source code is Apache 2.0, though the simulator-server and ax-service binaries are proprietary to Software Mansion.

This is an early example of what giving AI agents real access to running applications looks like in practice. The gap between "generate code" and "verify the code works in the actual environment" is where a lot of agentic development loops currently break down.

**Key takeaways:**
- MCP-based toolkit for AI assistant control of iOS Simulators
- Supports Claude Code, Cursor, VS Code, Windsurf, Zed, Gemini CLI, Codex CLI
- Capabilities: UI interaction, React Native profiling, Xcode Instruments, crash report inspection
- No telemetry; local MCP over stdio only
- Source code Apache 2.0; simulator binaries proprietary
- React Native out of the box — build, launch, and iterate without extra setup

**Why do I care:** The debugging and test loop for mobile development is meaningfully slower than web development, and giving AI agents the ability to actually interact with a running simulator — rather than just generating code and hoping — is addressing the right problem. I'd want to understand how the proprietary binary components fit into team security policies before deploying this in an enterprise context, but for individual developers and smaller teams, this looks genuinely useful. The MCP pattern for agent tool exposure is clearly the right direction.

**Link:** [Argent on GitHub](https://github.com/software-mansion/argent)
