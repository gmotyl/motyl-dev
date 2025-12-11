---
title: "This Week In React #262: React2Shell, Fate, TanStack AI, and more"
excerpt: "A look at the critical React2Shell vulnerability, new libraries like Fate and TanStack AI, and updates to React and React Native."
publishedAt: "2025-12-10"
slug: "this-week-in-react-262"
hashtags: "#thisweekinreact #react #react-native #security #nextjs #tanstack #generated #en"
---

## React2Shell: A Critical Vulnerability in React Server Components

**TLDR:** A critical 10.0 severity vulnerability, dubbed React2Shell (CVE-2025-55182), was discovered in React Server Components, allowing for unauthenticated remote code execution. The vulnerability affects several versions of React and frameworks like Next.js. Immediate upgrades are required.

**Summary:**
The React ecosystem was shaken by the disclosure of a critical remote code execution (RCE) vulnerability in React Server Components. The vulnerability, discovered by Lachlan Davidson, allows an attacker to craft a malicious HTTP request that, when deserialized by React, can lead to RCE on the server. The issue is present in several versions of `react-server-dom-webpack`, `react-server-dom-parcel`, and `react-server-dom-turbopack`, and affects frameworks like Next.js that use React Server Components.

The React team and framework vendors have released patches and are urging all users to upgrade immediately. The vulnerability is particularly dangerous because it can be exploited even if an app does not implement any React Server Function endpoints. The fact that the vulnerability has a CVSS score of 10.0 underscores its severity. The incident also led to a brief Cloudflare outage as they were rolling out mitigations.

For developers and architects, this is a stark reminder of the security risks associated with modern web development. The complexity of the React Server Components protocol, combined with the power it gives to the client, created an attack vector that was not immediately obvious. The incident also highlights the importance of keeping dependencies up to date and being aware of the security implications of the technologies we use. The coordinated disclosure and patching process by the React team and framework vendors is a positive example of how the open-source community can respond to critical security threats.

**Key takeaways:**
- A critical RCE vulnerability (React2Shell) was found in React Server Components.
- The vulnerability affects several React packages and frameworks like Next.js.
- Immediate upgrades to patched versions are required.
- The incident highlights the security risks of complex web technologies and the importance of timely updates.

**Link:** [Critical Security Vulnerability in React Server Components](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)

## TanStack's Open. AI. SDK.

**TLDR:** TanStack has released TanStack AI, a new framework-agnostic AI SDK that offers a type-safe, composable, and platform-independent alternative to existing AI SDKs.

**Summary:**
TanStack, the team behind popular libraries like TanStack Query and TanStack Router, has entered the AI space with the alpha release of TanStack AI. The new SDK is designed to be a framework-agnostic toolkit for building AI-powered applications, with a focus on type safety, composability, and developer experience. The architecture is split into several independent layers, including a core AI interaction engine, a headless client, and framework-specific bindings for React, Solid, and Vue.

One of the key differentiators of TanStack AI is its per-model type safety, which ensures that developers can only use options that are valid for the specific model they are using. The SDK also features isomorphic tool definitions, built-in approval workflows for tool calls, and support for multi-language backends (Python and PHP). The streaming UX is also highly configurable, with several chunking strategies available to prevent janky UI updates.

For developers who are looking for a more flexible and type-safe way to build AI applications, TanStack AI is a very promising new option. The framework-agnostic approach is a refreshing change from the more opinionated AI SDKs that are currently available. The deep integration with the rest of the TanStack ecosystem also opens up a lot of interesting possibilities for building powerful and performant AI-powered applications. While the SDK is still in alpha, it's definitely one to watch.

**Key takeaways:**
- TanStack AI is a new framework-agnostic AI SDK.
- It features per-model type safety, isomorphic tool definitions, and multi-language backend support.
- The SDK is highly composable and designed to be integrated with the rest of the TanStack ecosystem.

**Link:** [TanStack's Open. AI. SDK.](https://oscargabriel.dev/blog/tanstacks-open-ai-sdk)

## React Native 0.83

**TLDR:** React Native 0.83 is out, bringing React 19.2, new DevTools features, and stable Web Performance and Intersection Observer APIs. This is also the first release with no user-facing breaking changes.

**Summary:**
The React Native team has released version 0.83, which includes several new features and improvements. The headline feature is the inclusion of React 19.2, which brings the new `<Activity>` component and the `useEffectEvent` hook to React Native. The release also includes significant new features for React Native DevTools, including a network inspector and a performance tracing panel.

The Web Performance and Intersection Observer APIs are now stable in this release, providing developers with more tools for measuring and improving the performance of their apps. The release also includes experimental support for Hermes V1, the next-generation JavaScript engine for React Native, which promises significant performance improvements. In an effort to make upgrades more predictable, this is the first React Native release with no user-facing breaking changes.

This is a solid release for the React Native community, with a good mix of new features, performance improvements, and developer experience enhancements. The new DevTools features are particularly welcome, as they will make it much easier to debug and optimize React Native apps. The move to a more predictable release cycle with no breaking changes is also a positive development that will be appreciated by the community.

**Key takeaways:**
- React Native 0.83 includes React 19.2, with the new `<Activity>` component and `useEffectEvent` hook.
- New DevTools features include a network inspector and performance tracing panel.
- The Web Performance and Intersection Observer APIs are now stable.
- This is the first release with no user-facing breaking changes.

**Link:** [React Native 0.83 - React 19.2, New DevTools features, no breaking changes](https://reactnative.dev/blog/2025/12/10/react-native-0.83)
