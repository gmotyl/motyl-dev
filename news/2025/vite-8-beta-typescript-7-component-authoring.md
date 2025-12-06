---
title: "Vite 8 Beta, TypeScript 7 Progress, and Component Authoring"
excerpt: "This week's newsletter covers the Vite 8 beta with Rolldown, progress on TypeScript 7, Convex component authoring, and more."
publishedAt: "2025-12-06"
slug: "vite-8-beta-typescript-7-component-authoring"
hashtags: "#uidev #frontend #vite #typescript #rolldown #convex #react-native #zig #nix #css #generated #en"
---

## Vite 8 Beta: The Rolldown-powered Vite

**TLDR:** Vite 8 Beta is here, powered by a new Rust-based bundler called Rolldown. This promises significant performance improvements for production builds, unifying the previously separate dev (esbuild) and prod (Rollup) bundlers.

**Summary:** The Vite team has released the first beta for Vite 8, a major update that replaces the dual-bundler setup of esbuild and Rollup with a single, high-performance bundler: Rolldown. Written in Rust, Rolldown aims to match esbuild's speed while being compatible with Rollup's plugin API. This unification is a foundational shift for Vite, aiming to resolve inconsistencies between development and production environments. The move to Rolldown, which uses Oxc for parsing and transforming, creates a cohesive, Rust-based toolchain from end to end.

For development teams, this is a significant step forward. The promise of 10-30x faster production builds is a huge win for CI/CD pipelines and developer productivity. The migration path has been designed to be smooth, with a compatibility layer for existing Rollup and esbuild configurations. Large projects like Linear and Beehiiv have already reported massive build time reductions. Architects should note that this isn't just a performance boost; it's a strategic move to a more consistent and maintainable build tooling ecosystem, which will unlock more advanced features like Module Federation and better chunk splitting in the future.

While the beta is promising, it's important to test thoroughly. The migration guide details how to handle specific Rollup or esbuild options. Frameworks that depend on Vite will need dependency overrides to use the beta. The long-term vision is a Vite that is not only faster but also more powerful, with features like a "Full Bundle Mode" on the horizon, promising even faster dev server startups.

**Key takeaways:**
- Vite 8 Beta replaces esbuild and Rollup with a single Rust-based bundler, Rolldown.
- Expect significant production build performance improvements (10-30x faster than Rollup).
- Most Vite plugins are compatible out-of-the-box.
- The new architecture aims to eliminate inconsistencies between dev and prod.
- Migration should be relatively smooth, but requires testing, especially for complex configs.

**Link:** [Vite 8 Beta: The Rolldown-powered Vite](https://vite.dev/blog/announcing-vite8-beta)

---

## Progress on TypeScript 7 - December 2025

**TLDR:** The TypeScript team is making major strides on the native-code port of the compiler and language service, codenamed "Project Corsa" or TypeScript 7.0. It's already fast, stable, and usable in VS Code, with significant features like auto-imports and find-all-references now implemented.

**Summary:** TypeScript 7.0 is shaping up to be a game-changer, with the team reporting near-complete type-checking parity with TypeScript 6.0. The new native compiler, available as `@typescript/native-preview`, is delivering on its promise of dramatic speed improvements, with some full builds being up to 10x faster. This performance gain comes from both the move to native code (Rust) and the use of shared-memory parallelism, enabling multi-threaded builds across single or multiple projects.

For developers, the immediate benefit is a much faster and more responsive editor experience. The new language service for VS Code is available as a marketplace extension and is already stable enough for daily use. While some features like downlevel JS emit and a fully-fledged watch mode are still works-in-progress, the core type-checking and many essential language service features are ready to go. Teams can confidently use `tsgo` (the new CLI) for type-checking their builds today.

Architects and team leads should be aware of the planned deprecations and changes. TypeScript 6.0 will be the last JavaScript-based release, acting as a bridge to 7.0. It will introduce deprecations for features like `--baseUrl` and older `--target` versions, and `--strict` will become the default in 7.0. The team is focusing all new development on the native codebase, so the JavaScript-based compiler will only receive critical patches. This is a clear signal to start planning for the migration and testing the native previews.

**Key takeaways:**
- TypeScript 7.0 (native port) is showing up to 10x faster build times.
- The new language service for VS Code is stable and ready for daily use.
- TypeScript 6.0 will be the final JavaScript-based release.
- Several older configuration flags will be deprecated or removed in 7.0.
- The native compiler has near-complete type-checking parity with the current version.

**Link:** [Progress on TypeScript 7 - December 2025 - TypeScript](https://devblogs.microsoft.com/typescript/progress-on-typescript-7-december-2025/)

---

## Introducing Components Authoring in Convex

**TLDR:** Convex has launched a component authoring guide, allowing any developer to build, publish, and share reusable backend modules. These components are more than just libraries; they have their own database tables and isolated functions, enabling sophisticated, transactional backend solutions.

**Summary:** Convex is doubling down on its "Components" feature, which allows developers to drop in pre-built backend logic that acts like a service but executes transactionally. After seeing strong adoption of their own components (like Workpool and Agent), they've now opened up the authoring process to the entire community. This is a powerful concept that moves beyond simple code reuse, enabling developers to package up stateful, isolated backend functionality.

For teams building on Convex, this is a huge productivity booster. Instead of reinventing the wheel for common backend problems, they can now leverage a growing ecosystem of community-built components. The authoring guide provides templates and a clear process for creating local or packaged (NPM) components. A key architectural aspect is that components have their own isolated database tables and functions, providing a strong API boundary and preventing data conflicts. This is a more robust way to modularize a backend compared to just sharing library code.

The article also dives into the technical details of component development, covering the component API, how `Id` types are handled at the boundary (they become strings), and the isolated nature of environment variables. While components can't expose HTTP actions directly, they can define handlers that the main app can mount. This is a well-thought-out model for creating a secure and scalable backend architecture based on composition.

**Key takeaways:**
- Convex now allows any developer to author and publish backend components.
- Components are stateful modules with their own database tables and isolated functions.
- This enables building complex, reusable backend logic that can be shared across projects.
- Convex provides a component authoring guide, template, and a directory for discovery.
- The architecture promotes modularity and strong API boundaries.

**Link:** [Introducing Components Authoring](https://news.convex.dev/components-authoring/)

---

## Other Interesting Finds

- **React Native on Meta Quest:** An exploration of how standard React Native tools and patterns can be used to build for VR on the Meta Quest. It highlights the surprisingly low barrier to entry, as the Quest is an Android-powered system. [Read more](https://www.callstack.com/events/react-native-on-meta-quest-a-developers-guide-to-building-for-vr).
- **Zig Programming Language:** The official repository for Zig, a general-purpose language focused on robust, optimal, and reusable software. This is the source of truth for anyone looking to get started with or contribute to Zig. [Explore the repo](https://codeberg.org/ziglang/zig).
- **Nixtml:** A static site generator written in Nix, inspired by Hugo. It allows you to define your website declaratively in a Nix flake, offering a powerful and reproducible way to build static sites. [Check it out on GitHub](https://github.com/arnarg/nixtml).
- **Anchor Positioning (IMCB):** A great visual explanation of CSS Anchor Positioning, focusing on the concept of the "Inset-Modified Containing Block" (IMCB). This is a must-read if you've found anchor positioning to be a bit magical at times. [Learn more](https://www.bram.us/2025/12/02/anchor-positioning-and-the-inset-modified-containing-block-imcb/).
