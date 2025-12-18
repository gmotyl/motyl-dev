---
title: "Bun's New Terminal API, AI for UI Design, and Modern CSS Colors"
excerpt: "This week, we look at Bun's new Terminal API, a 4-step process for UI design with Gemini 3.0 Pro, why AI won't replace junior developers, and the modern CSS color syntax."
publishedAt: "2025-12-18"
slug: "bun-terminal-api-ai-ui-design-modern-css-colors"
hashtags: "#dailydev #bun #terminal #ai #gemini #ui #css #color #generated #en"
---

## Bun v1.3.5 Release

**TLDR:** Bun v1.3.5 ships with a new `Bun.Terminal` API for pseudo-terminal (PTY) support. It also includes compile-time feature flags, better Unicode support, and V8 C++ value type checking APIs.

**Summary:**
The latest release of Bun, version 1.3.5, introduces a significant new feature: the `Bun.Terminal` API. This provides pseudo-terminal (PTY) support, which is a foundational element for building interactive terminal applications. For developers building command-line tools, this is a welcome addition, as it allows for more complex and interactive experiences, similar to what you might find in native terminal applications.

Beyond the new Terminal API, the release also brings compile-time feature flags to the bundler. This is a powerful feature for optimizing builds by enabling dead-code elimination. By flagging features at compile time, you can ensure that unused code is stripped out, leading to smaller and more efficient bundles.

The release also includes improvements to `Bun.stringWidth` for more accurate handling of Unicode and emoji characters, and implements V8 C++ value type checking APIs. These may seem like small changes, but they contribute to the overall robustness and reliability of the Bun runtime.

For architects and teams, the introduction of a built-in Terminal API in Bun could simplify the development of complex CLI tools and internal development utilities. It reduces the need for external dependencies and provides a more integrated experience. The compile-time feature flags offer a practical way to manage different build configurations and optimize for production environments.

**Key takeaways:**
- Bun v1.3.5 introduces the `Bun.Terminal` API for PTY support.
- Compile-time feature flags allow for dead-code elimination in the bundler.
- Improved accuracy for Unicode and emoji string width calculation.
- Implementation of V8 C++ value type checking APIs.

**Link:** [Bun v1.3.5 | daily.dev](https://app.daily.dev/posts/bun-v1-3-5-1kprmpe2g)

## 4-Step Gemini 3.0 Pro System For Beautiful UI Designs

**TLDR:** A structured four-step workflow can be used with Gemini 3.0 Pro to generate UI designs before writing any code. The process involves creating a PRD, extracting core features, building a design system, and generating screen-by-screen designs.

**Summary:**
This article presents a systematic approach to using Gemini 3.0 Pro for UI design, moving from requirements to a full set of screen designs. The process begins with the creation of a Product Requirements Document (PRD). This foundational step ensures that the design process is grounded in clear goals and user needs.

The second step is to extract the core features and UX considerations from the PRD. This involves identifying the key user flows and interactions that the application must support. This step is critical for ensuring that the generated designs are not just aesthetically pleasing but also functional and user-friendly.

The third step is to build a design system based on visual inspiration. This involves providing Gemini with examples of visual styles and components that you want to emulate. By creating a design system upfront, you can ensure consistency across all the generated screens.

The final step is to generate the screen-by-screen designs. With the PRD, core features, and design system in place, you can then prompt Gemini to generate each screen of the application. This iterative process allows you to quickly create a complete set of UI designs that are ready for implementation.

For design and development teams, this workflow offers a way to rapidly prototype and visualize an application before committing to code. It can help to bridge the gap between product requirements and visual design, and can facilitate a more collaborative and iterative design process. However, it's important to remember that AI-generated designs are a starting point, and will likely require refinement and adjustment by human designers.

**Key takeaways:**
- A four-step process for generating UI designs with Gemini 3.0 Pro.
- The process starts with a PRD and moves to feature extraction, design system creation, and screen generation.
- This workflow can help to accelerate the design process and facilitate collaboration.
- AI-generated designs should be seen as a starting point for further refinement.

**Link:** [4-Step Gemini 3.0 Pro System For Beautiful UI Designs | daily.dev](https://app.daily.dev/posts/4-step-gemini-3-0-pro-system-for-beautiful-ui-designs-0zvtmk8te)

## AWS CEO Explains 3 Reasons AI Can’t Replace Junior Devs

**TLDR:** AWS CEO Matt Garman argues that AI will not replace junior developers because they are often more adept with AI tools, they represent a small cost saving, and they are essential for the future talent pipeline.

**Summary:**
In a recent statement, AWS CEO Matt Garman pushed back against the idea that AI will make junior developers obsolete. He outlined three main reasons why he believes junior developers will remain a crucial part of the software development landscape.

First, Garman argues that junior developers are often more proficient with AI tools than their senior counterparts. Having grown up with these technologies, they are often quicker to adopt and master them, and can bring new skills and perspectives to a team.

Second, he points out that junior developers are the lowest-paid employees, so replacing them with AI would result in minimal cost savings. The real costs in software development are often associated with senior engineers and architectural decisions, not with the salaries of junior team members.

Finally, and perhaps most importantly, Garman emphasizes that eliminating junior developers would break the talent pipeline. Companies need a steady stream of new talent to grow and innovate, and junior developers are the future senior engineers, architects, and leaders.

This perspective is a valuable counterpoint to the often-hyped narrative of AI replacing developers. For organizations, it's a reminder that building a strong and sustainable team requires investing in talent at all levels. It also suggests that the role of a junior developer may evolve to include a strong focus on leveraging AI tools to enhance their productivity and contribution.

**Key takeaways:**
- AI is unlikely to replace junior developers.
- Junior developers are often more skilled with AI tools than senior developers.
- Replacing junior developers offers minimal cost savings.
- Eliminating junior developers would break the talent pipeline.

**Link:** [AWS CEO Explains 3 Reasons AI Can’t Replace Junior Devs | daily.dev](https://app.daily.dev/posts/aws-ceo-explains-3-reasons-ai-can-t-replace-junior-devs-gg4mlsv3w)

## Stop using the legacy color syntax

**TLDR:** Modern CSS has a new, cleaner color syntax that doesn't require the 'A' suffix in RGBA/HSLA or comma separators. This new syntax is required for modern color functions like OKLCH, LAB, and `color()`.

**Summary:**
The way we define colors in CSS is changing. The legacy syntax for `rgba()` and `hsla()` with comma separators and an explicit 'A' for the alpha channel is being superseded by a more modern, space-separated syntax.

The new syntax is simpler and more consistent with other CSS functions. For example, `rgba(255, 0, 0, 0.5)` can now be written as `rgb(255 0 0 / 0.5)`. The forward slash is used to separate the color components from the alpha value.

This new syntax is not just a matter of style. It is a requirement for using the new, more powerful color functions that have been introduced in CSS, such as `oklch()`, `lab()`, and `color()`. These functions allow for working with wider color gamuts, beyond the sRGB space that has been the standard for the web for so long.

For developers, this is a good time to start adopting the new syntax. It will make your CSS more future-proof and will open the door to using the exciting new color features that are now available in modern browsers. While the legacy syntax is still supported, the new syntax is the way forward.

**Key takeaways:**
- Modern CSS has a new space-separated color syntax.
- The new syntax is required for modern color functions like `oklch()`, `lab()`, and `color()`.
- The new syntax is simpler and more consistent.
- Adopting the new syntax will make your CSS more future-proof.

**Link:** [Stop using the legacy color syntax | daily.dev](https://app.daily.dev/posts/stop-using-the-legacy-color-syntax-q80zgvmf6)
