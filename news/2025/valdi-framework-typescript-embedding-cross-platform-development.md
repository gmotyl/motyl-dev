---
title: "Snapchat's Valdi Framework, TypeScript Embedding, and Cross-Platform Development Evolution"
excerpt: "Exploring Snapchat's 8-year-old cross-platform UI framework, TypeScript runtime embedding solutions, and the latest developments in React Native tooling."
publishedAt: "2025-11-12"
slug: "valdi-framework-typescript-embedding-cross-platform-development"
hashtags: "#generated #en #typescript #react-native #cross-platform #valdi #javascript #webassembly #tailwind #storybook #vr #meta-quest #mobile #performance #architecture"
---

## Snapchat's Valdi: The 8-Year-Old Cross-Platform Secret Finally Goes Open Source

**TLDR:** Snapchat has open-sourced Valdi, a cross-platform UI framework that's been powering their production apps for 8 years, compiling TypeScript directly to native views without web views or JavaScript bridges.

**Summary:**

This is fascinating - Snapchat has been quietly running a massive portion of their production applications on a framework that nobody outside the company knew existed. Valdi represents a fundamentally different approach to cross-platform development, one that sidesteps the traditional performance versus velocity tradeoff that has plagued the space for years.

The technical architecture is particularly interesting. Unlike React Native, Flutter, or Xamarin, Valdi compiles declarative TypeScript components directly into platform-native views. There's no JavaScript bridge overhead, no web view rendering, and no virtual machine sitting between your code and the native platform. This is more akin to what SwiftUI or Jetpack Compose do, but with the added benefit of true cross-platform code sharing.

What sets Valdi apart is its performance optimizations that go beyond just compilation. The automatic view recycling system creates a global pool of native views that get reused across all screens, dramatically reducing the inflation latency that typically kills scroll performance. The component rendering system is designed so that individual components can re-render independently without triggering cascading parent updates - this is a sophisticated approach that many frameworks struggle with.

The developer experience story is compelling too. Hot reload works across iOS, Android, and desktop in milliseconds, and you get full VSCode debugging with breakpoints, variable inspection, and heap dumps. This eliminates the traditional compile-test-debug cycle that makes native development so painful. The flexible adoption model means you can embed Valdi components in existing native apps or embed native views within Valdi layouts, which is crucial for real-world adoption.

For architects and teams, this represents a potential paradigm shift. If you're building applications that need true native performance but want to maintain development velocity, Valdi offers a path that doesn't require choosing between the two. The fact that it's been battle-tested in Snapchat's high-performance, consumer-facing applications for nearly a decade gives it credibility that most cross-platform solutions lack.

**Key takeaways:**
- Compiles TypeScript directly to native views without bridges or web views
- Global view recycling and independent component rendering for superior performance  
- Instant hot reload with full debugging support across all platforms
- Flexible adoption allows mixing with existing native codebases

**Tradeoffs:**
- Gain proven production stability but sacrifice ecosystem maturity and community support
- Achieve native performance but increase complexity compared to simpler web-based solutions
- Get true cross-platform development but depend on Snapchat's long-term open source commitment

**Link:** [Snapchat/Valdi](https://github.com/Snapchat/Valdi)

## Embedding TypeScript: WebAssembly Sandboxing for Safer Runtime Extensions

**TLDR:** A new approach to embedding JavaScript/TypeScript in native applications using Hako, a WebAssembly-compiled JavaScript engine that provides memory safety and granular sandboxing for untrusted code execution.

**Summary:**

This article tackles a genuinely important problem that most developers don't think about until it's too late: how do you safely run untrusted code in your application? The traditional approach of embedding JavaScript engines like V8 or JavaScriptCore is fraught with maintenance nightmares and security risks. The author correctly identifies that the state of platform-specific bindings for these engines is abysmal - repositories abandoned for years, breaking API changes, and massive maintenance overhead.

The proposed solution using Hako is clever. By compiling QuickJS to WebAssembly, you get the memory safety guarantees of WASM while still being able to run JavaScript/TypeScript. When a security vulnerability in the JavaScript engine gets exploited, instead of compromising your entire process, it crashes the sandboxed WASM instance. This transforms what would be arbitrary code execution into a denial of service attack at worst.

The granular sandboxing capabilities are particularly interesting for the current AI agent era. You can disable memory allocation entirely, remove specific language features, or restrict what the execution context can access. This is crucial when you're running code generated by large language models that might hallucinate dangerous APIs or when you're building systems where AI agents execute arbitrary code.

However, the article glosses over some significant considerations. WebAssembly performance, while improving, still has overhead compared to native execution. The debugging experience is likely to be more complex when you're debugging through multiple abstraction layers. And there's an implicit dependency on the WebAssembly runtime implementation being secure itself.

For teams building extensible applications, this approach offers a compelling middle ground. You get the familiar JavaScript/TypeScript ecosystem for extensions while maintaining security boundaries. This is particularly valuable for applications like code editors, build tools, or any system where third-party plugins are essential but trust is limited.

**Key takeaways:**
- WebAssembly compilation transforms security vulnerabilities into denial of service attacks
- Granular sandboxing allows precise control over JavaScript execution capabilities
- Eliminates maintenance burden of platform-specific JavaScript engine bindings

**Tradeoffs:**
- Gain memory safety and sandboxing but sacrifice some runtime performance through WebAssembly overhead
- Achieve easier maintenance but increase debugging complexity through additional abstraction layers

**Link:** [Embedding TypeScript](https://andrews.substack.com/p/embedding-typescript)

## Uniwind: High-Performance Tailwind Bindings for React Native

**TLDR:** Uniwind is a new Tailwind CSS implementation for React Native that claims to be 2.5x faster than Nativewind while supporting both Tailwind classes and regular CSS parsing.

**Summary:**

The cross-platform styling story in React Native has always been messy, and the team behind Unistyles is taking another swing at solving it with Uniwind. The fundamental tension they're addressing is real: StyleSheet is great for mobile performance, but sharing styles across web, Android, and iOS often requires writing duplicate code. Tailwind offers a unified approach, but previous implementations have struggled with performance.

The performance claims are interesting - 2.5x faster than Nativewind is significant if true, though the article doesn't dive into the technical details of how this is achieved. What's more intriguing is the custom CSS parser that goes beyond Tailwind syntax to handle regular CSS files. This opens up styling patterns that haven't been possible in React Native before, like the gradient button example they show.

The multi-theme support looks well-designed, with a simple metro plugin configuration and CSS variant blocks. This is often where cross-platform styling solutions break down - theming becomes an afterthought that requires significant architectural changes to implement properly.

However, there are some concerning gaps in the presentation. The article doesn't address how this handles the fundamental differences between web CSS and React Native's styling model. CSS properties that don't have React Native equivalents, box model differences, and layout engine variations are all glossed over. The migration guide from Nativewind suggests these issues have been considered, but without seeing the technical details, it's hard to evaluate the completeness of the solution.

For teams already using Tailwind on the web who want to extend to mobile, Uniwind could significantly reduce the context switching and duplicate effort. The ability to use actual CSS files alongside Tailwind classes provides a migration path and escape hatch that could be valuable for complex styling requirements.

**Key takeaways:**
- Custom CSS parser supports both Tailwind syntax and regular CSS files
- Claims 2.5x performance improvement over existing Nativewind
- Simplified theming setup through metro plugin configuration

**Link:** [Introducing Uniwind](https://www.reactnativecrossroads.com/posts/introducing-uniwind-the-fastest-tailwind-bindings-for-react-native/)

## React Native on Meta Quest: VR Development Opportunities

**TLDR:** Meta is running a $1.5 million developer competition for React Native apps on Meta Quest, with ideas ranging from meditation apps to interactive games that leverage VR's unique capabilities.

**Summary:**

The convergence of React Native and VR development represents an intriguing frontier, though one that requires careful consideration of what makes VR applications compelling. The article correctly emphasizes that successful VR apps need to leverage the unique aspects of the medium - 3D space, camera passthrough for AR, spatial audio, and haptic feedback - rather than simply porting mobile interfaces.

The meditation app concept makes a lot of sense for VR. The ability to control the entire environment and eliminate external distractions is a genuine advantage over traditional mobile apps. Using Reanimated and Skia for visualizations synchronized with audio could create genuinely immersive experiences that aren't possible on other platforms.

The gaming suggestions are more challenging. While puzzle games like Sudoku or Nonogram could work, they don't really justify the VR hardware - you're essentially using an expensive headset to do something that works better on a phone or tablet. The motion-controlled games like Beat Saber clones are more compelling but also significantly more complex to implement well.

What's missing from this discussion is the fundamental question of input methods. VR interfaces require completely different interaction patterns than touch-based mobile apps. Hand tracking, controller input, and gaze-based selection all have different affordances and limitations. React Native's component model, designed around touch interactions, may not map cleanly to these paradigms.

For development teams, this represents both an opportunity and a significant challenge. The $1.5 million prize pool is substantial, but VR development requires specialized knowledge about 3D interfaces, motion sickness prevention, and performance optimization that most React Native developers don't have. The learning curve is steep, and the market is still relatively small compared to mobile.

**Key takeaways:**
- VR apps must leverage unique capabilities like 3D space and spatial audio to justify the platform
- Meditation and relaxation apps are well-suited to VR's immersive environment control
- React Native's touch-based component model may need adaptation for VR interaction patterns

**Link:** [React Native on Meta Quest](https://www.callstack.com/blog/what-you-can-build-with-react-native-on-meta-quest)

## Storybook 10: ESM-Only and Enhanced Developer Experience

**TLDR:** Storybook 10 drops CommonJS support to become ESM-only, reducing install size by 29% while adding module automocking, typesafe CSF factories, and improved testing workflows.

**Summary:**

The move to ESM-only is bold and necessary, even though it will cause migration pain for some teams. The 29% reduction in install size on top of the previous 50% savings in Storybook 9 is substantial - dependency bloat has been a persistent complaint about Storybook adoption. More importantly, this pushes the JavaScript ecosystem forward toward a cleaner future, though it requires Node 20.16+ which might be a barrier for some organizations.

The module automocking collaboration with Vitest addresses a real pain point. Previous mocking approaches in Storybook were notoriously difficult to work with, and the new sb.mock inspired by vi.mock should provide a much better developer experience. The fact that it works with both Vite and Webpack builders and is available in both development and production builds is significant for testing workflows.

CSF Factories represent a thoughtful evolution of Component Story Format. The TypeScript ergonomics improvements are welcome - the current CSF 3 syntax requires a lot of boilerplate and type gymnastics that make story creation feel heavyweight. The new syntax is cleaner and should reduce the friction of writing stories, which is crucial for adoption.

However, there's a concerning pattern here where Storybook continues to add features and complexity while the core value proposition - component documentation and testing - sometimes gets lost. The experimental features like Test syntax and Component testing for RSCs suggest even more complexity coming. For teams already struggling with Storybook's learning curve and maintenance overhead, this might not be the direction they're hoping for.

The ESM-only migration will likely be the biggest hurdle for adoption. While the Node version requirements are reasonable for new projects, existing codebases with legacy dependencies might find this transition painful. Teams need to weigh the benefits of the latest Storybook features against the migration effort required.

**Key takeaways:**
- ESM-only requirement reduces install size by 29% but requires modern Node versions
- New module automocking system simplifies testing workflows with Vitest integration
- CSF Factories reduce TypeScript boilerplate and improve story authoring experience

**Tradeoffs:**
- Gain simplified distribution and reduced bundle size but sacrifice compatibility with legacy Node versions and CommonJS codebases
- Achieve better testing ergonomics but increase dependency on Vitest ecosystem

**Link:** [Storybook 10](https://storybook.js.org/blog/storybook-10/)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
