---
title: "CSS Wrapped 2025, TanStack AI, and Oxlint Type-Aware Linting"
excerpt: "A review of the new CSS features in Chrome from 2025, a look at the new TanStack AI framework, and the alpha release of Oxlint's type-aware linting."
publishedAt: "2025-12-10"
slug: "css-wrapped-2025-tanstack-ai-oxlint"
hashtags: "#uidev #css #chrome #tanstack #ai #oxlint #typescript #generated #en"
---

## CSS Wrapped 2025

**TLDR:** A comprehensive overview of the new CSS features that landed in Chrome in 2025, including declarative popovers and dialogs, customizable select elements, and powerful new functions for dynamic styling.

**Summary:**
Chrome's 2025 CSS Wrapped is a deep dive into the latest and greatest features that have been added to the platform. A significant theme is the move towards more declarative and less JavaScript-heavy UI components. The new `commandfor` and `interestfor` attributes, for example, allow for the creation of popovers and dialogs that can be controlled without any JavaScript. The `<dialog>` element also gets a `closedby` attribute, which brings the convenient "light dismiss" behavior from the Popover API to dialogs.

Another major improvement is the ability to fully customize the `<select>` element with CSS. By applying `appearance: base-select`, developers can now style every part of the select element, including the dropdown list and options. This opens up a world of possibilities for creating visually rich and brand-aligned dropdown menus. The new scroll-marker and scroll-button pseudo-elements also make it much easier to create carousels and other scrolling experiences with native CSS.

For architects and teams, these new features represent a significant shift in how we build web UIs. The ability to create complex components like popovers, dialogs, and carousels with declarative HTML and CSS reduces the amount of JavaScript we need to write and maintain. This not only improves performance but also makes our codebases simpler and easier to reason about. The new `if()` and `@function` rules in CSS also bring more dynamic and reusable styling capabilities to the platform, further reducing the need for JavaScript for styling logic.

**Key takeaways:**
- New declarative APIs for popovers and dialogs reduce the need for JavaScript.
- The `<select>` element is now fully customizable with CSS.
- New CSS features for carousels and scrolling experiences.
- `if()` and `@function` bring more dynamic and reusable styling to CSS.

**Link:** [CSS Wrapped 2025](https://chrome.dev/css-wrapped-2025/)

## TanStack AI Alpha: Your AI, Your Way

**TLDR:** TanStack has released the alpha version of TanStack AI, a framework-agnostic AI toolkit that gives developers full control over their stack.

**Summary:**
The TanStack team has introduced TanStack AI, a new open-source toolkit for building AI applications. The core philosophy behind TanStack AI is to be framework-agnostic and work with the developer's existing stack, rather than locking them into a specific ecosystem. The alpha release includes server support for JavaScript/TypeScript, PHP, and Python, with adapters for popular AI providers like OpenAI, Anthropic, Gemini, and Ollama.

One of the key features of TanStack AI is its open protocol, which allows developers to use any language or transport layer to communicate between the client and server. The toolkit also provides isomorphic tool support, allowing developers to define their tools once and use them on both the client and server with full type safety. The alpha release also includes client libraries for Vanilla JS, React, and Solid, with more to come.

For development teams, TanStack AI offers a compelling alternative to the walled gardens of many AI frameworks. By providing a set of unopinionated, framework-agnostic tools, TanStack AI empowers developers to build AI applications with the technologies they already know and love. The focus on type safety and developer experience, with features like per-model type safety and isomorphic devtools, is also a huge plus. This is a project to watch for any team that is serious about building AI applications in a way that is both flexible and maintainable.

**Key takeaways:**
- TanStack AI is a framework-agnostic AI toolkit.
- It provides server support for multiple languages and adapters for popular AI providers.
- It features an open protocol and isomorphic tool support.
- Client libraries are available for popular JavaScript frameworks.

**Link:** [TanStack AI Alpha: Your AI, Your Way](https://tanstack.com/blog/tanstack-ai-alpha-your-ai-your-way)

## Announcing Oxlint Type-Aware Linting Alpha

**TLDR:** The alpha release of Oxlint's type-aware linting brings improved integration with tsgolint, manual rule configuration, in-line disable comments, and automatic fixes.

**Summary:**
Oxlint has announced the alpha release of its type-aware linting capabilities, which are powered by tsgolint, a high-performance linter backend built on top of typescript-go. This release focuses on better integration between Oxlint and tsgolint, bringing features like manual rule configuration, in-line disable comments, and automatic fixes to type-aware rules. This brings the experience of using type-aware rules much closer to that of non-type-aware rules in Oxlint.

The alpha release also includes several other improvements, such as type-checking while linting, support for more typescript-eslint rules, and the ability to report TypeScript diagnostics. The ability to type-check while linting is particularly interesting, as it could potentially eliminate the need for a separate `tsc --noEmit` command in CI, reducing the total time spent on linting and type-checking.

For frontend teams, the performance improvements offered by Oxlint and tsgolint are a huge win. The fact that Oxlint + tsgolint is significantly faster than ESLint + typescript-eslint on large codebases is a testament to the power of Rust and Go for building high-performance developer tools. The improved integration and new features in this alpha release make Oxlint an even more compelling choice for teams that are looking to speed up their linting and type-checking workflows.

**Key takeaways:**
- Oxlint's type-aware linting is now in alpha.
- It features better integration with tsgolint, with support for manual rule configuration, disable comments, and automatic fixes.
- It can now perform type-checking while linting, potentially reducing CI times.
- It offers significant performance improvements over ESLint + typescript-eslint.

**Link:** [Announcing Oxlint Type-Aware Linting Alpha](https://voidzero.dev/posts/announcing-oxlint-type-aware-linting-alpha)

## Eliminating N+1 Queries with Seer’s Automated Root Cause Analysis

**TLDR:** Sentry's Seer can automatically detect and help fix N+1 query issues in your application by analyzing transaction data and generating optimized code.

**Summary:**
N+1 query issues are a common performance bottleneck in many applications, and they can be notoriously difficult to track down. This article from Sentry describes how their new AI-powered tool, Seer, can automatically detect these issues, perform a root cause analysis, and even generate a fix. The article walks through a scenario where a new sales page is causing performance issues due to an N+1 query pattern.

Sentry automatically detects the issue and Seer is able to pinpoint the exact code that is causing the problem. It then generates an optimized version of the code that uses a single query with joins instead of multiple sequential queries. The entire process, from detecting the issue to deploying the fix, takes only a few minutes.

For engineering teams, tools like Seer represent a major step forward in the evolution of application performance monitoring. By combining automatic issue detection with AI-powered root cause analysis and code generation, Seer can significantly reduce the time it takes to debug and fix performance issues. This not only improves the user experience but also frees up developers to focus on building new features. The ability to automatically generate optimized code is particularly powerful, as it can help teams avoid common performance pitfalls and write more efficient code from the start.

**Key takeaways:**
- N+1 query issues are a common performance bottleneck.
- Sentry's Seer can automatically detect and fix N+1 query issues.
- Seer uses AI to perform root cause analysis and generate optimized code.
- Automated tools like Seer can significantly reduce the time it takes to debug and fix performance issues.

**Link:** [Eliminating N+1 Queries with Seer’s Automated Root Cause Analysis](https://blog.sentry.io/fix-n-plus-one-database-issues-with-sentry-seer/)
