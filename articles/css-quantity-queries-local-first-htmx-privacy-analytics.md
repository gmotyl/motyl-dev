---
title: "CSS Quantity Queries, Local-First HTMX, and Privacy-Focused Analytics"
excerpt: "Advanced CSS techniques, innovative HTMX architectures, and privacy-conscious alternatives to Google Analytics"
publishedAt: "2024-11-10"
slug: "css-quantity-queries-local-first-htmx-privacy-analytics"
hashtags: "#generated #en #css #htmx #webassembly #analytics #privacy #frontend #architecture #performance #nodejs #postgresql"
---

## CSS Quantity Queries: The Technique That Helps You Become 1% Better as a Developer

**TLDR:** CSS quantity queries use pseudo-selectors like `:nth-last-child()` to automatically adapt layouts based on the number of elements in a container. Navigation menus can switch from horizontal to vertical, and photo grids can adjust column counts without JavaScript.

**Summary:**

This article presents CSS quantity queries as an advanced technique that allows developers to create truly responsive layouts that adapt not just to screen size, but to content quantity. The core concept revolves around using CSS pseudo-selectors to count siblings and apply different styles based on those counts.

The technique leverages selectors like `:nth-last-child()` and `:first-child` to detect how many items exist in a container. For example, you can style navigation items differently when there are more than five links, automatically switching from a horizontal layout to a vertical dropdown. Similarly, photo galleries can dynamically adjust their grid structure - showing three columns for up to six photos, but switching to two columns when there are more items to prevent overcrowding.

What makes this particularly powerful is that it eliminates the need for JavaScript-based layout adjustments in many scenarios. The CSS itself becomes intelligent enough to respond to content changes, which is especially valuable in content management systems where the number of items can vary unpredictably. This approach also performs better than JavaScript solutions since the browser handles the logic natively during the layout phase.

For development teams, this technique represents a shift toward more declarative UI patterns. Instead of writing imperative code that checks element counts and applies classes, you're defining rules that the browser executes automatically. This reduces maintenance burden and creates more predictable behavior across different scenarios. It's particularly useful for component libraries where you want consistent behavior regardless of how many items are passed in.

The broader implication is that CSS is becoming increasingly capable of handling logic traditionally relegated to JavaScript, which aligns with the industry trend toward simpler, more performant web applications.

**Key takeaways:**
- CSS quantity queries enable automatic layout adaptation based on element count, not just screen size
- Technique uses pseudo-selectors to count siblings and apply conditional styling
- Eliminates JavaScript for many responsive layout scenarios, improving performance

**Tradeoffs:**
- Gain automatic content-aware layouts but sacrifice some fine-grained control over exact breakpoints
- Achieve better performance but limit flexibility compared to JavaScript-based solutions

**Link:** [CSS Quantity Queries: The Technique That Helps You Become 1% Better as a Developer](https://app.daily.dev/posts/jD293pcTh)

## Local First HTMX

**TLDR:** An experimental approach combining local-first architecture with HTMX by compiling server-side rendering code to WebAssembly and running it in a service worker. This aims to achieve local-first performance while maintaining HTMX's server-driven simplicity.

**Summary:**

This article explores a fascinating architectural experiment that attempts to bridge two seemingly incompatible paradigms: local-first applications and server-centric HTMX development. The core innovation involves compiling traditional server-side rendering code to WebAssembly and executing it within a service worker, essentially moving the "server" into the browser.

The approach works by intercepting fetch requests in the service worker, rendering HTML locally using the WebAssembly-compiled server code, and serving the results back to the HTMX frontend. This creates an illusion of server-side rendering while actually running everything locally. The service worker acts as a local server, maintaining the familiar HTMX request-response cycle but with the performance characteristics of a local-first application.

What's particularly intriguing is how this maintains HTMX's mental model - developers still write server-side templates and handlers, but they execute locally. This could solve one of HTMX's main criticisms: network latency making interactions feel sluggish compared to single-page applications. By running the rendering logic locally, you get instant responses while keeping the simplicity of server-side thinking.

However, the article doesn't deeply address the elephant in the room: data synchronization. Local-first applications are primarily about offline capability and eventual consistency, but this approach seems focused mainly on performance. Without a robust sync strategy, you're not really achieving local-first principles - you're just doing client-side rendering with extra steps.

For architecture teams, this represents an interesting middle ground between traditional server-rendered applications and complex client-side state management. It could be particularly valuable for applications where HTMX's simplicity is desired but network performance is critical. However, the complexity of the build pipeline and deployment story might outweigh the benefits for most use cases.

**Key takeaways:**
- Combines HTMX simplicity with local-first performance by running server code in WebAssembly
- Service worker intercepts requests and renders HTML locally while maintaining HTMX patterns
- Addresses HTMX's network latency issues without abandoning server-side mental models

**Tradeoffs:**
- Gain local performance while maintaining HTMX simplicity but sacrifice traditional deployment patterns
- Achieve instant interactions but increase build complexity and bundle size significantly

**Link:** [Local First HTMX](https://app.daily.dev/posts/oIpRXdTfU)

## Umami: Privacy-Focused Alternative to Google Analytics

**TLDR:** Umami is an open-source, privacy-focused web analytics platform that provides Google Analytics functionality without tracking users. It supports Node.js with MySQL, PostgreSQL, or MariaDB backends and offers simple Docker deployment.

**Summary:**

Umami represents the growing movement toward privacy-respecting analytics solutions as organizations seek alternatives to Google Analytics in response to GDPR concerns and increasing privacy awareness. The platform provides essential web analytics functionality - page views, user sessions, traffic sources, and device information - without storing personally identifiable information or using tracking cookies.

The technical architecture is straightforward: a Node.js application with support for major SQL databases including PostgreSQL, MySQL, and MariaDB. This makes it accessible to most development teams since these are common components in existing stacks. The Docker deployment option further simplifies adoption by eliminating environment-specific configuration issues.

What makes Umami particularly appealing is its focus on simplicity without sacrificing essential functionality. Unlike Google Analytics, which has become increasingly complex with its Universal Analytics to GA4 migration, Umami provides a clean, focused interface that displays the metrics most teams actually need. This aligns with the broader industry trend toward specialized tools rather than monolithic platforms.

The self-hosted nature addresses several concerns simultaneously: data sovereignty, privacy compliance, and vendor independence. Organizations can maintain complete control over their analytics data while ensuring compliance with various privacy regulations. This is particularly valuable for European companies dealing with GDPR requirements or any organization handling sensitive user data.

For development teams, Umami offers a pragmatic solution to the analytics dilemma. You get actionable insights without the complexity of Google Analytics or the privacy concerns of third-party tracking. The open-source nature also means you can customize the platform to meet specific requirements or integrate it with existing monitoring and business intelligence systems.

**Key takeaways:**
- Self-hosted analytics platform that provides essential metrics without user tracking
- Simple Node.js architecture with SQL database support and Docker deployment options
- Addresses privacy compliance while maintaining analytical capabilities

**Link:** [Umami: Privacy-Focused Alternative to Google Analytics](https://app.daily.dev/posts/l0OcSOco0)

## Why I Implemented a Custom Serializer/Deserializer for JJWT Instead of Using jjwt-jackson

**TLDR:** A developer explains building a custom JSON serializer/deserializer for JWT handling rather than using Jackson library. The custom implementation reduces security vulnerabilities from external dependencies while providing better control and framework consistency.

**Summary:**

This article addresses a common architectural decision in Java applications: whether to use established libraries like Jackson for JSON processing or implement custom solutions. The author's choice to build a custom serializer for JWT handling reflects deeper concerns about dependency management, security surface area, and system predictability.

The security argument is particularly compelling. Every external dependency represents a potential attack vector, and Jackson has had its share of security vulnerabilities, particularly around deserialization attacks. By implementing a focused, minimal JSON handler specifically for JWT payloads, the author reduces the attack surface while maintaining precise control over what data gets processed and how.

The framework consistency argument also resonates with many development teams. When you're already using specific tooling or have established patterns for JSON handling, introducing Jackson solely for JWT processing can create inconsistencies in your codebase. This fragmentation makes the system harder to understand and maintain, especially for developers who need to work across different parts of the application.

However, the article seems to gloss over the significant tradeoffs involved. Custom implementations mean taking on the maintenance burden that would otherwise be handled by the Jackson community. You're also losing the extensive testing, edge case handling, and performance optimizations that come with mature libraries. The "not invented here" syndrome is real, and this decision could easily backfire if the custom implementation introduces bugs or performance issues.

What's missing from the discussion is a proper risk assessment. While reducing dependencies has security benefits, it also means your JWT handling is now only as robust as your custom implementation. For most applications, the security benefits of a well-maintained library like Jackson likely outweigh the risks, especially when properly configured to prevent deserialization attacks.

**Key takeaways:**
- Custom JSON serialization reduces external dependencies and potential security vulnerabilities
- Framework consistency can be more important than using "standard" libraries in some contexts
- Security surface area reduction comes at the cost of community testing and maintenance

**Tradeoffs:**
- Gain precise control and reduced attack surface but sacrifice community testing and maintenance
- Achieve framework consistency but increase long-term maintenance burden

**Link:** [Why I Implemented a Custom Serializer/Deserializer for JJWT Instead of Using jjwt-jackson](https://app.daily.dev/posts/7tnoLBGB0)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
