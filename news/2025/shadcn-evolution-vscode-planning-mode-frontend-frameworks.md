---
title: "Shadcn's Evolution, VS Code's Planning Mode, and Modern Frontend Frameworks"
excerpt: "Exploring the latest updates in the frontend world, including Shadcn's new customization focus, VS Code's AI-powered Planning Mode, a performance comparison of Angular, React, and Vue, and Tanstack's new AI library."
publishedAt: "2025-12-17"
slug: "shadcn-evolution-vscode-planning-mode-frontend-frameworks"
hashtags: "#dailydev #frontend #react #angular #vue #vscode #ai #shadcn #tanstack #generated #en"
---

## Shadcn Just Changed Forever

**TLDR:** Shadcn UI's new "Shadcn Create" feature shifts the focus from default components to deep customization, allowing developers to configure everything from colors and fonts to icon sets before project generation.

**Summary:**
Shadcn UI has rolled out a significant update named "Shadcn Create," which marks a pivotal change in its philosophy. The primary goal is to move away from the "Shadcn look" that has become prevalent across many websites. Instead of providing default components that lead to a uniform appearance, Shadcn Create empowers developers with extensive customization options from the very beginning.

Before generating a project, developers can now define presets, select color palettes, choose fonts, and even specify icon sets. This upfront configuration ensures that the resulting components are tailored to the specific design requirements of the project. The system is built on top of Radix UI, but the new tooling abstracts away much of the complexity, making it easier to create a unique and consistent design system. This is a big step for architects and teams who want to maintain a unique brand identity while leveraging the power and accessibility of Shadcn's components.

**Key takeaways:**
-   Shadcn Create allows for deep customization of components before project generation.
-   The update aims to solve the problem of websites built with Shadcn looking too similar.
-   Developers can configure colors, fonts, icon sets, and other style properties.

**Link:** [Shadcn just changed forever | daily.dev](https://app.daily.dev/posts/Uy2wff1tE)

## VS Code Planning mode

**TLDR:** VS Code has introduced "Planning mode" (or "Hannibal mode"), an extension of GitHub Copilot's Agent Mode designed to handle complex, multi-step coding tasks with a structured, agent-based approach.

**Summary:**
VS Code's new Planning mode enhances GitHub Copilot by providing a dedicated agent for tackling multi-step programming challenges. Also known as "Hannibal mode," this feature allows developers to break down large tasks into smaller, manageable steps, which the AI agent can then execute. Unlike the implementation in Visual Studio, VS Code’s Planning mode is a distinct chat agent, which means developers have to explicitly choose to activate it.

This separation gives developers more control over when to use the powerful, multi-step capabilities of the agent. It's particularly useful for architectural refactoring, implementing complex features, or any task that requires a series of dependent changes. For development teams, this can be a powerful tool for ensuring that complex changes are made consistently and correctly, as the AI can follow a predefined plan.

**Key takeaways:**
-   VS Code's Planning mode is a new agent for handling multi-step coding tasks.
-   It is an extension of GitHub Copilot's Agent Mode.
-   Unlike Visual Studio, it is a separate agent that must be explicitly activated.

**Link:** [VS Code Planning mode | daily.dev](https://app.daily.dev/posts/kRD5yvuKR)

## Angular vs. React vs. Vue.js: A performance guide for 2026

**TLDR:** By 2026, Angular, React, and Vue are expected to converge in performance, with all three leveraging signals-based reactivity and compiler optimizations. The choice between them will depend more on ecosystem and project structure than on raw performance.

**Summary:**
A forward-looking analysis of Angular 20, React 19.2, and Vue 3.5 suggests that the performance differences between these three major frameworks are becoming less significant. All three are adopting similar strategies for optimization, including signals-based reactivity, which allows for more granular and efficient state management. Additionally, compiler-driven optimizations are becoming standard, reducing the amount of runtime work the browser has to do.

Angular is making strides with its zoneless architecture, which is projected to provide a 20-30% runtime performance boost and is well-suited for enterprise-level applications. React, with its massive ecosystem, is focusing on automatic batching and compiler-assisted memoization. Vue continues to excel with its progressive adoption model and a strong focus on developer experience. For architects, the decision of which framework to use will likely be based on factors like team expertise, the size of the ecosystem, and the specific structural needs of the project, rather than marginal performance gains.

**Key takeaways:**
-   Angular, React, and Vue are converging on similar performance optimization strategies.
-   Signals-based reactivity and compiler optimizations are becoming standard across all three.
-   The choice of framework will depend more on ecosystem and project structure than on raw performance.

**Link:** [Angular vs. React vs. Vue.js: A performance guide for 2026 | daily.dev](https://app.daily.dev/posts/njg0otZUB)

## I Love This NEW Tanstack AI Library

**TLDR:** Tanstack has launched a new framework-agnostic AI library that simplifies the integration of AI features into applications, supporting both server-side and client-side tool execution, and providing React hooks for easy use.

**Summary:**
Tanstack has once again delivered a powerful tool for developers with its new AI library. This library is designed to be framework-agnostic, meaning you can use it with React, Vue, Svelte, or any other framework. It provides a unified API for interacting with various AI providers, abstracting away the differences between their SDKs.

The library supports both server-side and client-side tool execution, giving developers flexibility in how they build their AI-powered features. For React developers, it includes a `useChat` hook that simplifies the management of conversational interfaces. The library also has built-in support for streaming responses, which is essential for creating a responsive user experience in AI applications. With its built-in dev tools, developers can easily inspect the state of their AI interactions, making debugging much more manageable.

**Key takeaways:**
-   Tanstack's new AI library is framework-agnostic.
-   It supports both server-side and client-side tool execution.
-   It includes a `useChat` hook for React and has built-in support for streaming.

**Link:** [I Love This NEW Tanstack AI Library | daily.dev](https://app.daily.dev/posts/IOpEjp4pM)
