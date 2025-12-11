---
title: "Wrapping up the year in CSS"
excerpt: "A look at the latest in web performance, accessibility, and new browser features, including a recap of the year in CSS."
publishedAt: "2025-12-10"
slug: "wrapping-up-the-year-in-css"
hashtags: "#frontendfocus #css #html #performance #accessibility #generated #en"
---

## Making complex web apps faster

**TLDR:** Microsoft is proposing a new Delayed Message Timing API to help developers diagnose and fix performance bottlenecks in complex web applications that use multiple windows, iframes, or worker threads.

**Summary:**
This article from the Microsoft Edge team introduces the Delayed Message Timing API, a new proposal aimed at helping developers understand and debug performance issues in complex web apps. The API is designed to provide insights into the delays that can occur when different parts of an application, such as the main window, worker threads, and iframes, communicate with each other using `postMessage()`. These delays can be caused by a busy receiving context, a congested task queue, or the overhead of serialization and deserialization.

The Delayed Message Timing API introduces several new properties to the `Performance` entry for a message, including `blockedDuration`, `taskCount`, and `scriptTaskCount`. These properties provide detailed information about how long a message was blocked in the queue, how many tasks were in the queue, and how much time was spent on script execution. This information can help developers pinpoint the root cause of performance issues and optimize their code accordingly.

For frontend architects and teams building complex web applications, this new API could be a valuable tool for performance debugging. The ability to get detailed timing information about cross-context communication can help identify and eliminate bottlenecks that would otherwise be difficult to diagnose. While the API is still in its early stages, it's a promising development that could help us build faster and more responsive web applications.

**Key takeaways:**
- The Delayed Message Timing API is a new proposal from Microsoft to help debug performance issues in complex web apps.
- It provides detailed timing information about cross-context communication using `postMessage()`.
- The API can help identify bottlenecks caused by a busy receiving context, a congested task queue, or serialization/deserialization overhead.

**Link:** [Making complex web apps faster](https://blogs.windows.com/msedgedev/2025/12/09/making-complex-web-apps-faster/)

## Did you know your browser has two accessibility trees?

**TLDR:** Chrome uses two separate accessibility trees to manage and expose accessibility information to assistive technologies: a hidden internal tree in Blink and a public-facing platform-neutral tree.

**Summary:**
This article from Max Design takes a deep dive into the inner workings of Chrome's accessibility pipeline, revealing that the browser actually uses two accessibility trees. The first is an internal tree within Blink, the browser's rendering engine. This tree is used to detect accessibility-relevant changes in the DOM and generate a platform-neutral representation of the accessibility information. The second is a public-facing tree in the browser process, which is what assistive technologies like screen readers interact with.

The article provides a detailed, step-by-step overview of the entire accessibility event lifecycle, from the moment a DOM mutation occurs to the moment a screen reader announces the change. It explains how Blink's internal tree is used to create `AXEvent` and `AXNodeData` objects, which are then sent to the browser process. The `BrowserAccessibilityManager` in the browser process then uses this information to update the public-facing accessibility tree and fire the appropriate platform-specific accessibility events.

For developers who are serious about accessibility, this article provides a fascinating look under the hood of the browser. Understanding how the accessibility tree is constructed and how events are propagated can help you write more robust and accessible code. It also highlights the complexity of the accessibility pipeline and the importance of testing with real assistive technologies to ensure that your users are getting the best possible experience.

**Key takeaways:**
- Chrome uses two accessibility trees: an internal tree in Blink and a public-facing tree in the browser process.
- The internal tree is used to detect accessibility-relevant changes and generate platform-neutral accessibility data.
- The public-facing tree is what assistive technologies interact with.
- Understanding the accessibility event lifecycle can help you write more accessible code.

**Link:** [Did you know your browser has two accessibility trees?](https://www.maxdesign.com.au/articles/two-trees.html)

## NoLoJS: Reducing the JS Workload with HTML and CSS

**TLDR:** This article from PerfPlanet explores several new HTML and CSS features that allow developers to create common UI patterns with little or no JavaScript, improving performance and reducing complexity.

**Summary:**
For years, JavaScript has been the go-to solution for creating interactive UI components on the web. However, as HTML and CSS have become more powerful, it's now possible to create many of these components with little or no JavaScript. This article highlights several of these "NoLoJS" (No or Low JavaScript) patterns, including accordions, expanding form fields, autofilter dropdowns, modals, and offscreen navigation.

The article provides code examples for each pattern, demonstrating how to use new HTML elements like `<details>` and `<summary>`, and new CSS properties like `field-sizing` and `scroll-behavior`. It also shows how to use the new Popover API to create modals and offscreen navigation menus without any JavaScript. The author argues that by offloading functionality to native HTML and CSS, we can reduce the amount of JavaScript that users have to download and execute, leading to faster and more performant websites.

This is a must-read for any frontend developer who is interested in building fast and efficient websites. The NoLoJS approach is a powerful way to reduce the complexity of your codebase and improve the user experience. By leveraging the power of modern HTML and CSS, you can create rich, interactive experiences with less code and better performance. As the web platform continues to evolve, we can expect to see even more opportunities to reduce our reliance on JavaScript for common UI patterns.

**Key takeaways:**
- New HTML and CSS features allow for the creation of common UI patterns with little or no JavaScript.
- The `<details>` and `<summary>` elements can be used to create accordions.
- The `field-sizing` property can be used to create expanding form fields.
- The Popover API can be used to create modals and offscreen navigation menus.

**Link:** [NoLoJS: Reducing the JS Workload with HTML and CSS](https://calendar.perfplanet.com/2025/nolojs-reducing-js-workload-html-css/)
