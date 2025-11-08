---
title: "Safari 26 Beta Brings Major Web Platform Updates and Apple's New Liquid Glass Design"
excerpt: "Apple's WWDC 2025 introduces Safari 26 beta with 67 new features including WebGPU, scroll-driven animations, and SVG icons, alongside a comprehensive new design system called Liquid Glass."
publishedAt: "2025-06-11"
slug: "safari-26-beta-web-platform-updates-liquid-glass-design"
hashtags: "#generated #en #safari #webkit #css #webgpu #svg #scroll-driven-animations #anchor-positioning #web-components #ios #macos #visionos #declarative-web-push #digital-credentials #accessibility #performance"
---

## Safari 26 Beta: A Massive Web Platform Update

**TLDR:** Apple releases Safari 26 beta with 67 new features and 107 improvements, including WebGPU support, scroll-driven animations, anchor positioning, SVG icons, and a new unified versioning scheme aligned with Apple's operating systems.

**Summary:**

Apple has delivered one of the most significant Safari updates in years with Safari 26 beta, marking a major shift in both features and versioning strategy. The jump from Safari 18 to 26 aligns with Apple's decision to unify version numbers across all platforms for 2026, creating consistency between Safari, iOS, macOS, and other Apple operating systems.

The technical improvements are substantial and address many long-standing developer requests. WebGPU support finally arrives in Safari, providing safe access to GPU devices for both graphics and general-purpose computation. This positions Safari competitively with Chrome and Firefox while opening new possibilities for web-based gaming, machine learning inference, and computationally intensive applications. The implementation includes support for the WGSL shading language and focuses on optimal performance across both desktop and mobile devices.

CSS capabilities receive major enhancements with scroll-driven animations, allowing developers to create timeline-based animations without JavaScript. This performance-oriented approach reduces battery usage and provides smoother experiences, particularly on mobile devices. Anchor positioning becomes available, solving complex layout challenges that previously required JavaScript workarounds. Cross-document view transitions enable seamless navigation experiences between pages, bringing native app-like transitions to the web.

The introduction of SVG icon support represents a practical improvement for modern web development. Developers can now use infinitely scalable vector icons for favicons and web app icons, eliminating the need for multiple PNG files at different resolutions. This change acknowledges how icons now appear across numerous contexts - from browser tabs to home screens to reading lists - each requiring different sizes.

For development teams, these updates reduce the JavaScript burden while improving performance and user experience. The emphasis on standards compliance and interoperability means features work consistently across browsers, reducing testing overhead and development complexity.

**Key takeaways:**
- WebGPU support opens new possibilities for web-based GPU computing and graphics
- CSS scroll-driven animations eliminate JavaScript dependencies for scroll-based effects
- SVG icon support provides scalable, efficient icons across all contexts
- Unified versioning creates clearer communication about Safari capabilities

**Tradeoffs:**
- New CSS features increase learning curve for developers but provide better performance than JavaScript alternatives
- WebGPU enables powerful graphics capabilities but requires understanding of GPU programming concepts
- Unified versioning improves clarity but creates a significant version number jump that might confuse tracking

**Link:** [News from WWDC25: WebKit in Safari 26 beta](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)

## Apple's Liquid Glass: A New Design Language for All Platforms

**TLDR:** Apple introduces Liquid Glass, a translucent material system that creates depth and vitality across all Apple platforms, using real-time rendering and dynamic reactions to movement for a more expressive user experience.

**Summary:**

Apple has unveiled its most comprehensive design system update in years with Liquid Glass, a new material that extends across iOS, iPadOS, macOS, watchOS, and tvOS. This represents a rare platform-wide design transformation, inspired by the depth and dimensionality of visionOS but adapted for traditional interfaces.

Liquid Glass behaves like real glass, featuring translucency that reflects and refracts surrounding content while intelligently adapting between light and dark environments. The material uses real-time rendering and dynamically reacts to movement with specular highlights, creating what Apple describes as a "lively experience." This isn't just aesthetic polish - it's a fundamental shift in how interface elements communicate their interactive nature and relationship to surrounding content.

The technical implementation leverages Apple's advances in hardware, silicon, and graphics technologies. The close collaboration between design and engineering teams has produced a material system that scales from the smallest interactive elements like buttons and switches to larger navigational components like tab bars and sidebars. System experiences including the Lock Screen, Home Screen, notifications, and Control Center all receive the Liquid Glass treatment.

This design evolution reflects Apple's broader strategy of creating harmony across platforms while maintaining each platform's distinct qualities. The translucent material creates visual continuity whether you're using an iPhone, iPad, Mac, Apple Watch, or Apple TV, potentially reducing cognitive load as users switch between devices.

For developers and designers, this represents both an opportunity and a challenge. The new design language will likely influence user expectations across all digital interfaces, not just Apple's. Teams will need to consider how their applications and websites align with these new visual standards, particularly for iOS and macOS applications.

**Key takeaways:**
- Liquid Glass creates visual harmony across all Apple platforms while maintaining distinct platform characteristics
- Real-time rendering and dynamic reactions provide immediate visual feedback for user interactions
- The design system scales from micro-interactions to full-screen experiences
- Technical implementation leverages Apple's hardware and graphics capabilities

**Link:** [Apple introduces a delightful and elegant new software design](https://www.apple.com/uk/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)

## Declarative Web Push: Simplifying Notification Delivery

**TLDR:** Apple introduces Declarative Web Push to improve notification reliability by allowing push messages to contain standardized notification descriptions, eliminating the need for JavaScript execution and improving privacy.

**Summary:**

Apple has addressed fundamental limitations in web push notifications with Declarative Web Push, a evolution of the existing Web Push standard that prioritizes efficiency, reliability, and privacy. The current Web Push implementation requires JavaScript execution through Service Workers to display notifications, creating potential points of failure and privacy concerns.

The traditional approach forces websites to write and maintain JavaScript code that often performs simple translations from JSON payloads to notification API calls. This creates unnecessary complexity and potential for bugs while consuming device resources. Declarative Web Push eliminates this overhead by allowing push messages to contain standardized notification descriptions that the browser can display directly, without executing any website-specific code.

This approach draws from Apple's extensive experience with native push notifications on iOS, macOS, and Safari, where notifications display reliably even when applications aren't running or have been offloaded from the device. The declarative model ensures notifications appear consistently regardless of JavaScript execution contexts or Service Worker availability.

Privacy improvements are significant under this new model. Intelligent Tracking Prevention currently limits the lifetime of JavaScript required for original Web Push, but declarative notifications don't rely on persistent JavaScript execution. This reduces tracking vectors while maintaining notification functionality, aligning with Apple's broader privacy-focused approach to web technologies.

The implementation maintains backwards compatibility with existing Web Push infrastructure, allowing developers to adopt declarative notifications incrementally. Websites can send the same JSON payloads they currently use, but the browser handles notification display without requiring custom JavaScript processing.

For development teams, this simplifies notification implementation while improving reliability. The reduced JavaScript requirements mean fewer potential failure points and better performance, particularly on resource-constrained devices. However, teams lose some flexibility in notification processing and customization that JavaScript-based approaches provide.

**Key takeaways:**
- Eliminates JavaScript execution requirements for displaying push notifications
- Improves notification reliability by removing Service Worker dependencies
- Enhances privacy by reducing tracking vectors in notification processing
- Maintains backwards compatibility with existing Web Push infrastructure

**Tradeoffs:**
- Improved reliability and performance but reduced flexibility in notification customization
- Better privacy protection but less control over notification processing logic
- Simplified implementation but potential limitations for complex notification workflows

**Link:** [Learn more about Declarative Web Push - WWDC25](https://developer.apple.com/videos/play/wwdc2025/235/)

## Partial Keyframes: Dynamic CSS Animations

**TLDR:** CSS keyframe animations can omit starting values to inherit from context, creating dynamic and composable animations that adapt to different element states without JavaScript.

**Summary:**

Josh Comeau reveals a powerful CSS animation technique that transforms static keyframes into dynamic, context-aware animations. By omitting the `from` block in keyframe definitions, animations inherit starting values from the element's current state, creating animations that adapt intelligently to different scenarios.

Traditional keyframe animations define explicit starting and ending points, which works well for elements in predictable states but fails when elements have varying initial conditions. For example, a fade-out animation that starts from full opacity breaks when applied to elements that are already partially transparent. The conventional approach forces all elements to snap to full opacity before fading out, creating jarring visual discontinuities.

Partial keyframes solve this by allowing animations to start from whatever state the element currently occupies. An element with 60% opacity will fade from 60% to 0%, while a fully opaque element fades from 100% to 0%. This creates smooth, natural-feeling animations regardless of the element's initial state, without requiring JavaScript to calculate starting values.

The technique extends beyond opacity to any CSS property, enabling sophisticated animation systems that respond to dynamic content. Elements can animate from their current transform state, color, size, or position to a target value, making animations feel more integrated with the overall interface state. This approach particularly shines in interactive interfaces where element states change based on user actions or application data.

The composability aspect is crucial for modern web development. Partial keyframes can be combined with CSS custom properties to create animation systems that respond to design tokens or user preferences. Teams can define animation endpoints while allowing starting points to adapt to context, reducing the need for multiple animation variants.

However, this technique requires careful consideration of animation timing and easing functions. Since starting values vary, the visual impact of the same duration and easing curve will differ between elements. Designers and developers need to test animations across different starting states to ensure consistent user experience.

**Key takeaways:**
- Omitting `from` values in keyframes creates context-aware animations
- Animations adapt to element's current state without JavaScript calculation
- Technique works with any CSS property, not just opacity
- Enables composable animation systems that respond to dynamic content

**Tradeoffs:**
- Dynamic adaptation improves user experience but requires testing across different starting states
- Simplified animation code but potential inconsistency in visual timing across elements
- Reduced JavaScript dependency but less explicit control over animation behavior

**Link:** [Partial Keyframes • Josh W. Comeau](https://www.joshwcomeau.com/animation/partial-keyframes/)

## CSS contrast-color() Function: Automated Accessibility

**TLDR:** The upcoming `contrast-color()` function automatically resolves to either black or white based on which provides better contrast with a given background color, but current limitations restrict its practical use.

**Summary:**

The CSS `contrast-color()` function represents an attempt to automate color accessibility by automatically selecting either black or white text based on which provides better contrast against a specified background. This function evolved from the earlier `color-contrast()` proposal and aims to simplify compliance with Web Content Accessibility Guidelines (WCAG) contrast requirements.

The function's operation is straightforward: provide a background color, and `contrast-color()` determines whether black or white text would be more readable against that background. This eliminates manual contrast checking and reduces the cognitive load of ensuring accessible color combinations, particularly useful for dynamic themes or user-customizable interfaces.

However, significant limitations prevent practical adoption. The function only resolves to pure black or pure white, offering no flexibility for brand colors or design requirements that need specific text colors. More critically, the function can resolve to colors that still don't meet WCAG accessibility standards. There are color combinations where neither black nor white provides sufficient contrast, yet `contrast-color()` will still choose one of them.

Browser support remains minimal, with only Safari Technology Preview implementing the feature since 2021. The lack of widespread adoption suggests either technical implementation challenges or insufficient developer demand for the current functionality. The specification acknowledges these limitations and hints at future improvements, including support for custom color ranges and better accessibility compliance.

The current implementation also restricts usage to solid colors, making it incompatible with gradients, images, or other complex backgrounds where contrast calculations become more nuanced. This limitation significantly reduces the function's utility in modern web design, where background complexity is common.

For teams prioritizing accessibility, existing color contrast checkers and manual testing remain more reliable than `contrast-color()` in its current form. The function's promise of automated accessibility is undermined by its inability to guarantee WCAG compliance, potentially creating false confidence in color choices that remain inaccessible.

**Key takeaways:**
- Automatically selects black or white text for optimal contrast against backgrounds
- Currently limited to pure black and white outputs with no customization
- Cannot guarantee WCAG compliance in all color combinations
- Browser support remains limited to Safari Technology Preview

**Tradeoffs:**
- Automated contrast selection reduces manual testing but provides no guarantee of accessibility compliance
- Simplified implementation but severely limited color options for design requirements
- Potential time savings but unreliable results for critical accessibility needs

**Link:** [Exploring the CSS contrast-color() Function… a Second Time | CSS-Tricks](https://css-tricks.com/exploring-the-css-contrast-color-function-a-second-time/)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
