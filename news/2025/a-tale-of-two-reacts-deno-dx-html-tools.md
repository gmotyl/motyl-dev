---
title: "A Tale of Two Reacts, Deno's dx, and HTML Tools"
excerpt: "This week, React sees new vulnerabilities and a new React Native release, Deno gets a new command runner, and we explore useful patterns for building HTML tools."
publishedAt: "2025-12-13"
slug: "a-tale-of-two-reacts-deno-dx-html-tools"
hashtags: "#uidev #react #react-native #deno #html #security #generated #en"
---

## Denial of Service and Source Code Exposure in React Server Components
**TLDR:** Two new vulnerabilities have been discovered in React Server Components: a high-severity Denial of Service and a medium-severity Source Code Exposure. The React team recommends immediate upgrades, even if you patched for last week's critical vulnerability.

**Summary:**
Following last week's critical "React2Shell" vulnerability, security researchers have uncovered two more security flaws in React Server Components. The first is a high-severity Denial of Service (DoS) vulnerability (CVE-2025-55184 and CVE-2025-67779), which allows a malicious HTTP request to cause an infinite loop and hang the server. The second is a medium-severity Source Code Exposure vulnerability (CVE-2025-55183), where a crafted request could cause a Server Function to leak its own source code, potentially exposing secrets hardcoded within it. The React team has released patches and urges everyone using the affected `react-server-dom-*` packages to upgrade immediately. These vulnerabilities affect several popular frameworks and bundlers, including Next.js.

**Key takeaways:**
*   New DoS and Source Code Exposure vulnerabilities found in React Server Components.
*   Immediate upgrade to patched versions is required.
*   The original React2Shell patch is not sufficient to protect against these new vulnerabilities.
*   Secrets in environment variables are not affected, but hardcoded secrets in Server Functions could be exposed.

**Link:** [Denial of Service and Source Code Exposure in React Server Components – React](https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components)

## React Native 0.83
**TLDR:** React Native 0.83 is here, shipping with React 19.2, new DevTools features for network and performance inspection, and no user-facing breaking changes.

**Summary:**
The React Native team has released version 0.83, a significant update that brings React 19.2 and its new `<Activity>` component and `useEffectEvent` hook to the mobile world. This release also introduces a brand new desktop app for React Native DevTools, which now includes powerful network inspection and performance tracing panels. For the first time, developers can see where network requests originate in their code and get a detailed performance timeline.

Other notable additions include the stabilization of the Web Performance APIs, and experimental support for IntersectionObserver, Hermes V1 (a faster JavaScript engine), and the ability to compile out the legacy architecture on iOS to reduce build times and app size. In a welcome move, this is the first React Native release with zero user-facing breaking changes, making the upgrade process smoother for developers.

**Key takeaways:**
*   React Native 0.83 includes React 19.2 with `<Activity>` and `useEffectEvent`.
*   New DevTools provide network inspection and performance tracing.
*   No user-facing breaking changes in this release.
*   Experimental support for IntersectionObserver and Hermes V1.

**Link:** [React Native 0.83 - React 19.2, New DevTools features, no breaking changes · React Native](https://reactnative.dev/blog/2025/12/10/react-native-0.83)

## Deno 2.6: dx is the new npx
**TLDR:** Deno 2.6 introduces `dx`, a new command runner equivalent to `npx`, along with more granular permissions, faster type-checking with `tsgo`, and a new `deno audit` command for checking security vulnerabilities.

**Summary:**
Deno continues its rapid pace of innovation with the release of version 2.6. The headline feature is `dx`, a new tool that provides an `npx`-like experience for running binaries from npm and JSR packages, but with Deno's security model. The release also enhances security with more granular permissions, allowing users to ignore specific file reads or environment variable access.

For performance, Deno 2.6 integrates `tsgo`, an experimental type checker for TypeScript written in Go that promises significant speed improvements. The new `deno audit` command helps developers identify security vulnerabilities in their dependencies. Other improvements include source phase imports for WebAssembly, a `--require` flag for running CommonJS modules, and numerous enhancements to Node.js compatibility.

**Key takeaways:**
*   `dx` provides a convenient and secure way to run package binaries.
*   More granular permissions give users finer control over script execution.
*   `tsgo` offers a faster type-checking experience.
*   `deno audit` helps identify security vulnerabilities in dependencies.

**Link:** [Deno 2.6: dx is the new npx | Deno](https://deno.com/blog/v2.6)

## Useful patterns for building HTML tools
**TLDR:** A collection of useful patterns for building single-file HTML applications with JavaScript and CSS, leveraging LLMs for rapid development.

**Summary:**
This article presents a comprehensive guide to building "HTML tools" - simple, single-file web applications that can be quickly created with the help of LLMs. The author advocates for avoiding complex build steps and frameworks like React, instead opting for vanilla JavaScript, inline CSS, and loading dependencies from CDNs. The post is packed with practical examples and patterns, such as using `localStorage` for secrets, persisting state in the URL, and taking advantage of CORS-enabled APIs.

The author also shares their workflow, which often starts with prototyping in an LLM's canvas or artifact feature and then moving to a coding agent for more complex projects. The article is a treasure trove of ideas and techniques for anyone interested in building small, useful web applications quickly and efficiently.

**Key takeaways:**
*   Single-file HTML, JS, and CSS applications are easy to build, host, and maintain.
*   Avoid build steps and complex frameworks for simple tools.
*   Leverage browser features like `localStorage`, URL state, and the File API.
*   CORS-enabled APIs are a powerful resource for building data-driven tools.

**Link:** [Useful patterns for building HTML tools](https://simonwillison.net/2025/Dec/10/html-tools/)
