---
title: "CSS Evolution and Web Performance: State of CSS 2024, Render Blocking, and Mobile Browser Competition"
excerpt: "Exploring the rapid evolution of CSS capabilities, web performance optimization strategies, and mobile browser market dynamics from this week's frontend developments."
publishedAt: "2024-08-28"
slug: "css-evolution-web-performance-mobile-browsers-2024"
hashtags: "#generated #en #css #frontend #webdev #performance #safari #mobile #accessibility #survey #blocking #render"
---

## State of CSS 2024 Survey is Now Open

**TLDR:** The annual State of CSS survey launches, highlighting CSS's rapid evolution from basic layout hacks to advanced mathematical functions, scroll-triggered animations, and scoped styling capabilities.

**Summary:**

The CSS landscape has transformed dramatically from the days when mastering CSS meant knowing float properties and browser hacks. Today's CSS offers hundreds of properties covering layout, typography, animation, and accessibility, with browser vendors making concerted efforts for cross-platform compatibility.

The 2024 State of CSS survey serves three critical purposes: it provides developers with an overview of new CSS features through its reading list functionality, helps the community identify which features are generating the most interest, and gives browser vendors data to prioritize cross-browser compatibility efforts. This year's survey includes new features tagged with "2024" and was developed through collaboration between browser vendors and the broader developer community.

The shift from dealing with limited capabilities to managing an abundance of possibilities represents a fundamental change in how we approach CSS. Features like CSS math functions for calculating square roots and cosines, scroll-triggered animations, and scoped styling are pushing the boundaries of what we thought possible with stylesheets alone.

For development teams, participating in this survey isn't just about tracking personal progress—it's about influencing the future direction of web standards. The data collected directly impacts which features get prioritized for implementation and standardization across browsers.

**Key takeaways:**
- CSS has evolved from basic layout tool to a comprehensive styling and animation platform
- Browser vendors use survey data to prioritize feature development and compatibility efforts
- New 2024 features include advanced math functions, scroll animations, and scoping capabilities

**Link:** [State of CSS 2024 Survey](https://survey.devographics.com/en-US/survey/state-of-css/2024)

## Making Web Pages Faster Before They Even Load

**TLDR:** Web performance optimization extends beyond traditional metrics like Core Web Vitals to include pre-TTFB events that can be measured and optimized using the Performance API.

**Summary:**

Most web performance discussions focus on what happens after content starts appearing in the browser—metrics like First Contentful Paint, Largest Contentful Paint, and Interaction to Next Paint. However, significant optimization opportunities exist before the first byte of a web page even reaches the browser.

The Performance API, specifically the Navigation Timing API, captures six chronological events before Time to First Byte: cache, DNS, connect, TLS/SSL, request, and response. These events are automatically recorded for any web page without additional setup, accessible through `window.performance` in the browser console. This data provides high-precision timestamps for each performance entry, enabling developers to identify bottlenecks in the pre-rendering phase.

Understanding these pre-TTFB events is crucial because they represent the foundation upon which all other performance metrics build. A slow DNS lookup or TLS handshake will impact every subsequent performance measurement. Tools like Sentry's Trace View visualize these events as browser spans, making it easier to identify where optimization efforts should be focused.

The real power lies in recognizing that performance optimization is a holistic process. While we can't control all aspects of network infrastructure, we can make informed decisions about CDN usage, DNS providers, and server configurations based on this data. For architecture teams, this represents an opportunity to establish performance budgets that account for the complete user experience timeline, not just the visible portions.

**Key takeaways:**
- Performance optimization opportunities exist before any content is rendered
- Navigation Timing API provides detailed metrics for DNS, connection, and request phases
- Pre-TTFB optimization forms the foundation for all subsequent performance improvements

**Link:** [How to make your web page faster before it even loads](https://blog.sentry.io/how-to-make-your-web-page-faster-before-it-even-loads/)

## Converting Videos to Pure CSS Animations

**TLDR:** An experimental project demonstrates converting video frames into CSS keyframe animations, showcasing the creative potential of modern CSS features like scroll-driven animations.

**Summary:**

This creative experiment explores the boundaries of CSS capabilities by converting video files into pure CSS keyframe animations. The project builds upon CSS scroll-driven animations, which allow animation playback to be controlled by scroll position rather than time, creating video-like experiences without JavaScript.

The implementation uses two approaches: the newer `scroll-timeline-name` property for supporting browsers, and a JavaScript-assisted method that sets CSS variables based on scroll position for broader compatibility. The JavaScript approach uses negative animation delays to "scrub" through keyframes, effectively pausing the animation and controlling playback position through scroll.

While this is clearly an experimental technique with limited practical applications, it demonstrates the expanding possibilities of CSS. The project includes a tool that processes video files, extracts frames, and generates the necessary CSS keyframes. The scale and frame rate can be adjusted to balance visual quality with performance considerations.

The broader implication is that CSS is evolving into a platform capable of sophisticated interactive experiences traditionally requiring JavaScript libraries. However, the author's exploration also reveals the practical limitations—browser compatibility issues, performance considerations with large numbers of keyframes, and the complexity of managing such animations at scale.

For teams considering advanced CSS techniques, this represents both inspiration and caution. While pushing the boundaries of what's possible with CSS can lead to innovative solutions, practical considerations around maintainability, performance, and accessibility should guide implementation decisions.

**Key takeaways:**
- CSS scroll-driven animations enable video-like experiences without JavaScript
- Browser compatibility varies significantly for advanced CSS features
- Experimental techniques can inspire practical applications while revealing platform limitations

**Link:** [Can you convert a video to pure css?](https://dgerrells.com/blog/can-you-convert-a-video-to-pure-css)

## Understanding the blocking=render Attribute

**TLDR:** The new `blocking=render` attribute allows developers to explicitly mark resources as render-blocking, useful for specific scenarios like web fonts, A/B testing, and critical resources that must load before page presentation.

**Summary:**

WebKit's recent announcement of intent to implement the `blocking=render` attribute brings them in line with existing Blink support, but the use case isn't immediately obvious. Why would developers want to explicitly block rendering when performance best practices typically focus on reducing blocking resources?

The attribute addresses specific scenarios where render-blocking behavior is actually desirable. Web fonts represent a prime example—without render-blocking, users experience a flash of unstyled text (FOUT) or invisible text (FOIT) before the correct fonts load. By explicitly marking font resources as render-blocking, developers can ensure the page doesn't display until typography is properly loaded.

A/B testing and experimentation tools also benefit from this control. These scripts often need to modify page content before it's visible to users to avoid flickering between different test variants. Making these scripts render-blocking ensures consistent user experiences across test groups.

The three blocking states—non-blocking, render-blocking, and parser-blocking—each serve different purposes. Non-blocking is optimal for performance but may cause visual instability. Parser-blocking is the worst case, preventing both page construction and presentation. Render-blocking strikes a middle ground, allowing page construction while preventing premature display.

For architecture decisions, this attribute provides more granular control over the critical rendering path. Teams can make explicit decisions about which resources justify blocking rendering, rather than relying on browser defaults that may not align with user experience priorities.

**Key takeaways:**
- Explicit render-blocking control helps prevent visual instability and flickering
- Web fonts and A/B testing scripts are primary use cases for blocking=render
- The attribute provides middle ground between non-blocking and parser-blocking resources

**Link:** [blocking=render: Why would you do that?!](https://csswizardry.com/2024/08/blocking-render-why-whould-you-do-that/)

## UK Mobile Browser Competition Investigation

**TLDR:** The UK's Competition and Markets Authority is investigating mobile browser competition, with concerns that Apple could comply with proposed remedies while still limiting browser functionality to protect App Store interests.

**Summary:**

The UK's Competition and Markets Authority has published its final report on mobile browser competition, finding significant competition concerns and issuing recommendations. The investigation timeline spans from November 2022 through March 2025, with the final decision confirming recommendations for addressing mobile browser market issues.

A particularly insightful response from web developer Alistair Shepherd highlights a critical flaw in the proposed remedies. While the CMA recommends that Apple provide equivalent access to other browsers equal to Safari, Shepherd argues this creates a loophole. Apple could comply by degrading Safari's functionality rather than improving third-party browser access.

This concern is based on Apple's demonstrated willingness to limit Safari capabilities when they conflict with App Store interests. The example of Apple initially disabling Progressive Web App installation for EU users illustrates this pattern—the company was willing to harm web platform capabilities to maintain app store control.

The fundamental issue is Apple's dual role as both browser vendor and app store operator. By limiting web platform capabilities in Safari, Apple encourages developers to build native iOS apps distributed through the App Store, where fees can be collected. If browser functionality is pegged to Safari's capabilities, Apple could effectively kill Progressive Web Apps by hampering Safari rather than allowing genuine browser competition.

For web developers and businesses, this investigation represents a critical moment for the future of web platform capabilities on mobile devices. The outcome will determine whether the web can compete effectively with native app platforms or remain artificially constrained by platform holder interests.

**Key takeaways:**
- UK investigation finds competition concerns in mobile browser market
- Proposed remedies may allow Apple to comply while still limiting browser functionality
- Apple's dual role as browser vendor and app store operator creates inherent conflicts of interest

**Link:** [Mobile browsers and cloud gaming](https://www.gov.uk/cma-cases/mobile-browsers-and-cloud-gaming)

## Advanced CSS Range Slider with Anchor Positioning

**TLDR:** A sophisticated range slider implementation using CSS anchor positioning and scroll-driven animations demonstrates how modern CSS features can replace JavaScript for complex UI interactions.

**Summary:**

This demonstration showcases a fully functional range slider built entirely with CSS, using anchor positioning to place tooltips and scroll-driven animations for motion effects. The implementation challenges assumptions about what requires JavaScript in modern web development.

The technique relies on CSS anchor positioning to dynamically position tooltip elements relative to the slider thumb. The slider thumb is assigned an anchor name using `anchor-name: --thumb`, while the tooltip uses `position-anchor: --thumb` and `position-area: top` to maintain positioning. This creates a relationship that automatically updates as the slider value changes.

The motion effects use scroll-driven animations to create realistic physics-like behavior, including rotation and traction effects that would typically require JavaScript animation libraries. The combination of these modern CSS features creates an experience that feels interactive and responsive without any scripting.

However, the implementation reveals the current state of CSS feature adoption. Full support exists only in Chrome and Edge, with Safari and Firefox lacking complete support for these features. This creates a tension between showcasing cutting-edge capabilities and delivering production-ready solutions.

For development teams, this represents both opportunity and challenge. Modern CSS features are expanding the realm of what's possible without JavaScript, potentially reducing bundle sizes and improving performance. However, the uneven browser support requires careful consideration of fallback strategies and progressive enhancement approaches.

The broader implication is that the line between CSS and JavaScript capabilities continues to blur, requiring developers to stay current with evolving standards while maintaining practical deployment strategies.

**Key takeaways:**
- CSS anchor positioning and scroll-driven animations can replace JavaScript for complex interactions
- Browser support remains uneven, requiring careful consideration of fallback strategies
- Modern CSS features are expanding the possibilities for script-free interactive experiences

**Link:** [Custom Range Slider Using Anchor Positioning & Scroll-Driven Animations](https://frontendmasters.com/blog/custom-range-slider-using-anchor-positioning-scroll-driven-animations/)

## Building Accessible Spoiler Components

**TLDR:** Accessible spoiler components require semantic containers, keyboard navigation support, and proper screen reader announcements, going far beyond simple click-to-reveal functionality.

**Summary:**

Creating truly accessible spoiler components involves much more than hiding and revealing content on click. The implementation must consider screen reader users, keyboard navigation, and semantic markup to provide an inclusive experience.

The foundation requires a semantic container element that clearly delineates spoiler boundaries for assistive technology users. Since no standardized spoiler element exists, a custom element with appropriate ARIA attributes becomes necessary. The suggested approach uses `role="group"` with an `aria-label="Spoiler"` to establish clear content boundaries that screen readers can announce.

Keyboard accessibility presents significant challenges beyond simple click interactions. The component must support various keyboard shortcuts and interaction patterns that users expect from focusable elements. This includes handling Enter, Space, and potentially other key combinations while maintaining consistent behavior across different input methods.

The author emphasizes that spoiler components are essentially disclosure widgets with additional complexity. Unlike simple details/summary elements, spoilers often need to handle inline content within paragraphs or complex structured content spanning multiple elements, requiring flexible implementation approaches.

The accessibility requirements extend to announcing state changes, providing clear focus indicators, and ensuring that revealed content is properly associated with the trigger mechanism. These considerations multiply the complexity beyond what many developers initially anticipate.

For teams building content-heavy applications, especially those dealing with user-generated content, understanding these accessibility requirements is crucial. The temptation to implement quick solutions often leads to exclusionary experiences that fail to serve all users effectively.

**Key takeaways:**
- Accessible spoiler components require semantic containers with proper ARIA attributes
- Keyboard navigation support extends far beyond simple click interactions
- Screen reader compatibility demands careful consideration of content boundaries and state changes

**Link:** [Spoiler Alert: it needs to be accessible](https://www.scottohara.me/blog/2024/08/22/spoiler.html)

## Comprehensive Keyboard Shortcut Support for Links

**TLDR:** A detailed documentation of keyboard shortcuts for focused links reveals the complexity of recreating semantic HTML behavior and the importance of using proper anchor elements.

**Summary:**

This comprehensive documentation captures the various keyboard interactions available when anchor elements have focus, revealing the sophisticated behavior that browsers provide automatically. The research was necessitated by the need to create "synthetic" links via JavaScript, highlighting how complex it becomes to replicate native HTML functionality.

The findings show significant variation across operating systems and browsers. Windows users can use Shift+Enter to open links in new windows, Ctrl+Enter for new tabs, and Alt+Enter for downloads. macOS users have similar but not identical shortcuts, with Command+Enter opening new tabs and Option+Enter handling downloads. The behavior varies further across different browser engines.

Mobile platforms add another layer of complexity, with iOS WebKit requiring full keyboard access to be enabled and Android providing its own set of keyboard shortcuts. The testing revealed that seemingly simple actions like opening a link in a new tab require different key combinations depending on the platform and browser combination.

The documentation serves as both a practical reference and a cautionary tale about the hidden complexity of semantic HTML elements. When developers choose to create custom link-like components using div elements or other non-semantic markup, they inherit the responsibility of implementing all this functionality manually.

For development teams, this research underscores the importance of using semantic HTML whenever possible. The browser's native implementation of link behavior represents years of accessibility testing, user experience research, and cross-platform compatibility work that would be nearly impossible to replicate perfectly in custom implementations.

The broader implication is that semantic HTML provides far more value than many developers realize, and the cost of replacing it with custom solutions is often underestimated during planning phases.

**Key takeaways:**
- Native link behavior includes dozens of keyboard shortcuts varying by platform and browser
- Creating synthetic links requires implementing complex accessibility and interaction patterns
- Semantic HTML provides sophisticated functionality that's difficult to replicate with custom components

**Link:** [Basic keyboard shortcut support for focused links](https://ericwbailey.website/published/basic-keyboard-shortcut-support-for-focused-links/)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
