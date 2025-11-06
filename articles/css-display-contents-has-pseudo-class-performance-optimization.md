---
title: "CSS Display Contents, :has Pseudo-Class Power, and Performance Optimization"
excerpt: "Deep dive into CSS display contents for flexible layouts, the transformative utility of the :has pseudo-class, and modern performance debugging tools in Chrome DevTools."
publishedAt: "2024-09-11"
slug: "css-display-contents-has-pseudo-class-performance-optimization"
hashtags: "#generated #en #css #frontend #webdev #performance #chrome #devtools #anchor-positioning #typography #javascript"
---

## CSS display contents

**TLDR:** CSS display: contents removes an element's box while keeping its children in the DOM, enabling more flexible layouts by allowing child elements to join their grandparent's layout context. This solves common layout challenges where intermediate wrapper elements interfere with flexbox or grid layouts.

**Summary:**

Ahmad Shadeed explores one of CSS's more subtle but powerful features: display: contents. When applied to an element, this property essentially makes the element's box disappear from the rendering tree while preserving its children. Think of it as "unwrapping" an element - the content remains, but the container vanishes.

The practical implications are significant for modern layout challenges. Consider a common scenario: you have a flexbox container with multiple children, but one of those children is itself a wrapper containing elements that need to participate in the parent's flex layout. Normally, the wrapper creates a barrier - its children can't directly interact with the grandparent's layout system. With display: contents on the wrapper, those grandchildren suddenly become direct participants in the original flex container.

Shadeed demonstrates this with a page header example where a title and link are wrapped in a div for semantic or styling reasons, but you want them to behave as if they're direct children of the outer container. By applying display: contents to the wrapper, you can use CSS order to rearrange elements that would otherwise be trapped in their intermediate container.

This technique becomes particularly valuable in component-based architectures where HTML structure doesn't always align perfectly with desired visual layouts. It's a way to maintain semantic markup while achieving the layout flexibility you need. The property essentially flattens the DOM hierarchy for layout purposes without affecting the actual document structure.

For development teams, this opens up new possibilities for creating reusable components that don't impose unwanted layout constraints. You can maintain clean, semantic HTML while still achieving complex visual arrangements through CSS alone.

**Key takeaways:**
- Display: contents removes an element's box but preserves its children in the layout
- Enables grandchildren to participate directly in grandparent's flexbox or grid context
- Solves common wrapper-induced layout limitations without changing HTML structure

**Link:** [CSS display contents](https://ishadeed.com/article/display-contents/)

## The Undeniable Utility Of CSS :has

**TLDR:** The CSS :has pseudo-class enables "parent selectors" by styling elements based on their children, opening up powerful new styling possibilities that were previously impossible with CSS alone. Josh Comeau shares real-world applications from rebuilding his blog with modern CSS.

**Summary:**

Josh Comeau makes a compelling case for the transformative power of the :has pseudo-class, which he initially dismissed but now considers indispensable. Unlike traditional CSS selectors that work top-down (styling children based on parents), :has works bottom-up, allowing you to style parents based on their children's characteristics.

The implications extend far beyond simple parent-child relationships. Comeau discovered that :has enables sophisticated conditional styling that would previously require JavaScript. For example, you can style a card differently if it contains an image, adjust navigation styling based on the presence of certain elements, or modify form layouts based on validation states - all purely through CSS.

What makes this particularly powerful in modern development is how it reduces the coupling between CSS and JavaScript. Previously, many styling decisions required JavaScript to add classes or modify DOM structure. With :has, you can make these decisions declaratively in CSS, leading to more maintainable and performant solutions.

The browser support story is encouraging but not perfect - at around 92% coverage, it's usable for progressive enhancement but requires thoughtful fallback strategies. Comeau demonstrates how to use @supports for feature detection, ensuring graceful degradation for unsupported browsers.

The real revelation is how :has changes your mental model of CSS architecture. Instead of thinking about styling flowing down the DOM tree, you can now think bidirectionally. This opens up patterns that feel almost magical - styling that responds to content and context in ways that make interfaces feel more intelligent and adaptive.

For teams building component libraries or design systems, :has provides a new tool for creating truly adaptive components that respond to their content without requiring prop drilling or complex state management.

**Key takeaways:**
- :has pseudo-class enables styling parents based on children, reversing traditional CSS flow
- Reduces JavaScript dependency for conditional styling, improving maintainability
- Requires progressive enhancement approach due to 92% browser support

**Tradeoffs:**
- Powerful styling capabilities but sacrifice universal browser compatibility
- Declarative CSS logic but at the cost of additional complexity for fallback handling

**Link:** [The Undeniable Utility Of CSS :has](https://www.joshwcomeau.com/css/has/)

## CSS Triggers | Write More Performant CSS

**TLDR:** CSS Triggers is a resource that maps CSS properties to their rendering costs across browser engines, helping developers understand which properties trigger layout, paint, or composite operations for better performance optimization.

**Summary:**

Andrico Karoulla has revived and modernized the original CSS Triggers project by Paul Lewis and Surma, creating an essential reference for performance-conscious developers. The tool maps individual CSS properties to their rendering impact across the three major browser engines: Blink (Chromium), Gecko (Firefox), and WebKit (Safari).

Understanding the browser's rendering pipeline is crucial for writing performant CSS. When you modify a CSS property, the browser may need to recalculate layout (expensive), repaint elements (moderate cost), or simply composite layers (cheapest). Different properties trigger different stages of this pipeline, and the costs vary significantly between browser engines.

The resource reveals some surprising insights. Properties you might assume are cheap can actually trigger expensive layout recalculations, while others that seem complex might only require compositing. For example, changing a transform property typically only requires compositing, making it ideal for animations, while modifying width or height forces layout recalculation across potentially large portions of the page.

This knowledge becomes critical when optimizing animations, building responsive interfaces, or debugging performance issues. Instead of guessing why a particular interaction feels janky, developers can consult CSS Triggers to understand exactly what rendering work their CSS changes are causing.

The cross-browser perspective is particularly valuable. A property might be well-optimized in one engine but expensive in another, helping teams make informed decisions about which techniques to use based on their browser support requirements.

For development teams, this resource should inform coding standards and performance guidelines. Understanding these costs upfront prevents performance problems rather than trying to fix them after users start complaining about sluggish interfaces.

**Key takeaways:**
- Different CSS properties trigger different rendering stages with varying performance costs
- Browser engines handle the same properties differently, affecting cross-browser performance
- Layout-triggering properties are most expensive, composite-only changes are cheapest

**Link:** [CSS Triggers | Write More Performant CSS](https://css-triggers.com/)

## Manual 'till it hurts

**TLDR:** Jeremy Keith advocates for starting web projects without build tools and only adding complexity when manual processes become genuinely unworkable. Many projects never reach that threshold, resulting in simpler, more maintainable codebases.

**Summary:**

Jeremy Keith challenges the modern web development orthodoxy of reaching for build tools by default. His "manual 'till it hurts" philosophy suggests starting with the simplest possible approach - plain HTML, CSS, and JavaScript - and only introducing automation when manual processes become genuinely painful.

The argument isn't anti-tooling but anti-premature optimization. Keith has successfully built several production websites including conference sites and podcasts using this approach, proving that many projects we assume require complex build processes actually don't. The result is remarkably clean: zero dependencies, no npm vulnerabilities, no build step failures, and no compatibility issues when returning to projects months later.

The developer experience benefits are substantial. When you need to make a quick CSS fix, you simply edit the CSS file. No waiting for build processes, no debugging cryptic Node.js errors, no updating deprecated dependencies. The immediate feedback loop between making changes and seeing results is liberating for developers who've grown accustomed to the friction of modern toolchains.

This approach also future-proofs projects in ways that aren't immediately obvious. A website built with plain standards-compliant code will likely work decades from now, while projects dependent on specific versions of build tools often become unmaintainable within years. The web platform itself provides remarkable backward compatibility that we often sacrifice for temporary convenience.

Keith's approach isn't about rejecting progress but about being intentional with complexity. Modern browsers have incredibly capable APIs, CSS has powerful features like custom properties and grid, and JavaScript has evolved to handle most common tasks without external libraries. The gap between what you can accomplish with vanilla technologies versus what requires tooling has narrowed dramatically.

For teams, this philosophy encourages starting simple and scaling complexity only when justified by actual pain points rather than perceived future needs.

**Key takeaways:**
- Start with plain HTML, CSS, and JavaScript before adding build complexity
- Many projects never actually need the automation developers assume they require
- Buildless projects are more maintainable and future-proof than tool-dependent ones

**Tradeoffs:**
- Simplicity and maintainability but sacrifice advanced tooling features like TypeScript or bundling optimizations

**Link:** [Manual 'till it hurts](https://adactio.com/journal/21397)

## Brand New Performance Features in Chrome DevTools

**TLDR:** Chrome DevTools introduces experimental Performance Panel features that combine lab and field data for Core Web Vitals analysis, providing both local measurements and real-world user experience data from Chrome User Experience Report to help developers optimize web performance more effectively.

**Summary:**

The Chrome DevTools team has introduced significant enhancements to the Performance Panel that fundamentally change how developers approach web performance optimization. The new experimental features bridge the gap between lab testing and real-world performance by combining local measurements with field data from the Chrome User Experience Report.

The enhanced interface provides immediate context for performance metrics by showing not just your local measurements but how they compare to actual user experiences. For instance, you might see that your local Largest Contentful Paint is 540ms (good), but more importantly, you'll see that this aligns with the 97th percentile of real users, giving you confidence that your optimization efforts are meaningful.

The integration of field data is particularly valuable because it addresses a common blind spot in performance optimization. Developers often optimize based on their high-end development machines and fast network connections, missing performance issues that affect real users on slower devices and networks. By surfacing CrUX data directly in the DevTools, the new features help developers understand the actual user experience.

The enhanced Performance Panel also provides more granular insights into specific metrics like Interaction to Next Paint (INP), showing which elements users are actually interacting with and how those interactions perform. This level of detail helps developers prioritize optimization efforts based on real user behavior rather than assumptions.

The ability to customize field data views - switching between origin-level and URL-specific data, or filtering by device type - gives developers the flexibility to understand performance across different user segments. This is crucial for making informed decisions about where to invest optimization efforts.

For development teams, these tools represent a shift toward data-driven performance optimization. Instead of guessing about user experience, teams can now see concrete evidence of how their applications perform in the real world and track the impact of their optimizations.

**Key takeaways:**
- New Performance Panel combines lab data with real-world Chrome User Experience Report data
- Provides context for local measurements by comparing them to actual user experiences
- Offers granular insights into specific interactions and performance bottlenecks

**Link:** [Brand New Performance Features in Chrome DevTools](https://www.debugbear.com/blog/fix-web-performance-devtools)

## Anchor Positioning Quirks

**TLDR:** CSS Anchor Positioning introduces powerful new layout capabilities but comes with complex quirks around containing blocks and positioning contexts that developers need to understand to use the feature effectively.

**Summary:**

Juan Diego Rodríguez dives deep into the peculiarities of CSS Anchor Positioning, a feature that's powerful but riddled with subtle behaviors that can confuse developers. The most significant concept to grasp is the "inset-modified containing block" - when you apply inset properties to an absolutely positioned element, you're effectively shrinking its containing block by those amounts.

This concept becomes crucial when working with properties like position-area and position-try-order, which rely heavily on understanding how containing blocks are modified by inset values. The specification describes this as the containing block being "reduced by the specified amounts," creating a new rectangle that serves as the positioning context.

Anchor positioning also introduces unique challenges around source order independence. Unlike traditional CSS layout where document order often influences visual presentation, anchor positioning allows elements to be positioned relative to anchors regardless of their position in the HTML structure. This separation of content structure from visual presentation is powerful but requires a mental shift in how developers think about layout.

The feature's interaction with existing CSS concepts like stacking contexts and containing blocks creates additional complexity. An anchor element must be painted before the positioned element can reference it, which introduces timing considerations that don't exist with traditional positioning methods.

These quirks aren't necessarily bugs but rather the natural complexity that emerges when introducing a fundamentally new positioning paradigm. The anchor positioning specification is trying to solve problems that CSS has never addressed before - namely, positioning elements relative to other elements in a declarative way.

For teams adopting anchor positioning, understanding these quirks upfront is essential. The feature is incredibly powerful for creating tooltips, dropdown menus, and complex layouts that would previously require JavaScript, but it requires careful consideration of containing blocks and positioning contexts.

**Key takeaways:**
- Inset-modified containing blocks are central to understanding anchor positioning behavior
- Anchor positioning enables source order independence for layout, separating content from presentation
- The feature introduces timing considerations around when anchor elements are painted

**Link:** [Anchor Positioning Quirks](https://css-tricks.com/anchor-positioning-quirks/)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
