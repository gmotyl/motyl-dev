---
title: "Frontend Focus: 3D Carousels, The Underused <time> Element, and Gesture Controls"
excerpt: "This week, we explore a detailed guide on creating a 3D carousel with Three.js, the missed opportunities of the HTML <time> element, a gesture-controlled flight tracker, the relationship between JSDoc and TypeScript, and a collection of animated button styles."
publishedAt: "2025-12-16"
slug: "frontend-focus-3d-carousels-time-element-gesture-controls"
hashtags: "#dailydev #frontend #threejs #javascript #html #typescript #ai #generated #en"
---

## The Mechanics Behind a Scroll-Driven Circular 3D Carousel with Three.js and Post-Processing

**TLDR:** A deep-dive into creating a scroll-driven 3D carousel using Three.js. The article covers everything from the basic math of circular layouts to advanced post-processing effects for a polished result.

**Summary:**
This article provides a comprehensive tutorial on building a scroll-driven 3D carousel with Three.js. The author, Michelle Barker, breaks down the process into manageable steps. The foundation is laid with the mathematics of arranging items in a circle, using sine and cosine functions. A key challenge addressed is ensuring the images in the carousel correctly face the camera, which is solved by using a dual-plane rendering technique.

The physics of the scroll interaction are handled with `lerp` (linear interpolation) to create a smooth, momentum-based feel. User interaction is enhanced with raycasting to detect which item the cursor is hovering over, allowing for proximity-based effects. The article also delves into post-processing shaders, specifically a chromatic aberration effect, to add a final layer of visual polish. For architects and teams, this article is a valuable resource for understanding the complexities of creating advanced, interactive 3D web experiences. It highlights the importance of a solid mathematical foundation and attention to detail in achieving a high-quality result.

**Key takeaways:**
-   Circular layouts in 3D can be achieved with basic trigonometry.
-   Dual-plane rendering is a clever solution for orienting 2D images in a 3D space.
-   `lerp` is a powerful tool for creating smooth, physics-based animations.
-   Post-processing shaders can significantly enhance the visual appeal of a 3D scene.

**Link:** [The Mechanics Behind a Scroll-Driven Circular 3D Carousel with Three.js and Post-Processing](https://app.daily.dev/posts/sWyRRjRsw)

## The <time> element should actually do something

**TLDR:** The HTML `<time>` element, despite its semantic potential, is largely ignored by browsers and assistive technologies. The author argues that this is a missed opportunity for creating richer user experiences.

**Summary:**
Nolan Lawson laments the underutilization of the HTML `<time>` element. Designed to provide a machine-readable format for dates and times, it's used on about 8% of web pages, yet it offers no real functionality out of the box. Browsers don't provide any special features for it, and screen readers don't announce it differently from a `<span>`.

Lawson suggests several potential uses, such as automatically converting times to the user's local timezone, adding an event to a calendar, or calculating the duration between two times. He argues that the lack of browser support is a classic chicken-and-egg problem: developers don't use it because it doesn't do anything, and browser vendors don't add features because it's not widely used. For architects, this is a reminder that even well-intentioned semantic HTML can fail to gain traction without a clear and compelling use case that is supported by the ecosystem.

**Key takeaways:**
-   The `<time>` element is semantically useful but functionally inert.
-   There are many potential features that could be built around the `<time>` element.
-   The lack of browser support is a major barrier to adoption.

**Link:** [The <time> element should actually do something](https://app.daily.dev/posts/tblw84sXt)

## Advent of AI 2025 - Day 5: I Built a Touchless Flight Tracker You Control With Hand Gestures

**TLDR:** A developer created a touchless flight tracker that uses hand gestures to control the interface. The project uses MediaPipe for hand tracking and the OpenSky Network API for flight data.

**Summary:**
Nick Taylor details his project for the "Advent of AI 2025" challenge: a flight tracker that you can control with hand gestures. The application is built with React, TypeScript, and TanStack Start. The core of the project is Google's MediaPipe, which is used for real-time hand tracking from the user's webcam.

The app recognizes four gestures: a closed fist, an open palm, a thumbs-up, and a thumbs-down. These gestures are used to navigate through the flight data, which is fetched from the OpenSky Network API. This project is a great example of how AI, specifically computer vision, can be used to create novel and engaging user interfaces. For teams looking to innovate, this demonstrates a low-barrier entry to incorporating gesture controls into web applications.

**Key takeaways:**
-   MediaPipe is a powerful and accessible tool for hand tracking in the browser.
-   Gesture-based interfaces can provide a unique and compelling user experience.
-   The combination of AI and web technologies opens up a world of creative possibilities.

**Link:** [Advent of AI 2025 - Day 5: I Built a Touchless Flight Tracker You Control With Hand Gestures](https://app.daily.dev/posts/YrEd2fRLT)

## JSDoc *is* TypeScript

**TLDR:** The author argues that JSDoc is not an alternative to TypeScript, but rather a way of using TypeScript. The TypeScript language service is what powers the type-checking and IntelliSense for JSDoc.

**Summary:**
This article challenges the notion that using JSDoc for type-checking is a move away from TypeScript. The author points out that the TypeScript compiler and language service are the tools that actually interpret JSDoc comments to provide type information. Therefore, when you're using JSDoc, you're still using TypeScript, just without the build step.

The Svelte team's decision to switch from `.ts` files to JSDoc is used as an example. This was not a rejection of TypeScript, but rather a choice to leverage TypeScript's power in a different way. The author argues that this approach can lead to a simpler development workflow, as it eliminates the need for a separate compilation step. For development teams, this article presents a compelling case for considering JSDoc as a "mode" of TypeScript, which can be particularly beneficial for libraries or projects where a zero-build setup is desirable.

**Key takeaways:**
-   JSDoc's type-checking capabilities are powered by TypeScript.
-   Using JSDoc is a way of using TypeScript without a build step.
-   This approach can simplify the development workflow.

**Link:** [JSDoc *is* TypeScript](https://app.daily.dev/posts/GRcwGvXzB)

## Buttony

**TLDR:** A curated collection of 20 animated button styles for web projects. The collection showcases a variety of hover and click effects.

**Summary:**
"Buttony" is a resource for web developers looking for inspiration for animated buttons. The collection features 20 different button styles, each with a unique animation. The effects range from simple scaling and stretching to more complex 3D transformations, shine effects, and even a glitch effect.

The buttons demonstrate various interaction patterns, triggered by either hover or click events. This collection is a great starting point for developers who want to add some visual flair to their projects. For design-focused teams, this can be a source of inspiration for creating more engaging and interactive user interfaces.

**Key takeaways:**
-   A collection of 20 animated button styles.
-   Showcases a variety of hover and click effects.
-   A great resource for inspiration for web developers.

**Link:** [Buttony](https://app.daily.dev/posts/EkdoyqnhG)
