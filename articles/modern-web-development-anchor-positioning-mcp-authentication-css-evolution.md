---
title: "Modern Web Development: Anchor Positioning, MCP Authentication, and CSS Evolution"
excerpt: "Exploring advanced tooltip positioning with CSS, secure authentication for AI agents, and the latest web platform updates from Safari and Chrome."
publishedAt: "2025-11-05"
slug: "modern-web-development-anchor-positioning-mcp-authentication-css-evolution"
hashtags: "#generated #en #css #javascript #frontend #anchor-positioning #oauth #authentication #webkit #safari #chrome #tooltips #security #ai #mcp #field-sizing #view-transitions #source-maps #xslt #accessibility #performance"
---

## A Developer's Guide to MCP Auth

**TLDR:** WorkOS explains how to secure Model Context Protocol (MCP) servers using OAuth 2.1 with PKCE, addressing the critical security needs as AI agents gain more system access and capabilities.

**Summary:**

As AI agents become more powerful and gain access to critical systems - moving money, changing account states, approving refunds, or deploying builds - authentication and authorization have moved from being checklist items to core design concerns. The Model Context Protocol, which enables AI systems to interact with external tools and data sources, presents unique security challenges that require careful consideration.

The MCP architecture follows a clean three-party model: the host (AI-powered applications like Claude Desktop), the client (handling MCP protocol communication), and the server (where actual logic and actions occur). This one-to-one connection between client and server keeps the design simple while allowing precise control over configuration, state, and logging. However, every request crossing the boundary between client and server must be authenticated and authorized.

The guide walks through implementing OAuth 2.1 with PKCE (Proof Key for Code Exchange) for MCP servers, covering discovery mechanisms using Protected Resource Metadata and Authorization Server Metadata RFCs, Dynamic Client Registration, proper JWT validation, and role-based access control enforcement. The emphasis is on designing least-privilege scopes and building auditable integrations that scale.

What's particularly interesting is how MCP builds on existing OAuth patterns rather than inventing new security mechanisms. This pragmatic approach means developers can leverage familiar authentication flows while addressing the specific challenges of AI agent authorization. The article provides concrete implementation details for token validation, scope enforcement, and audit logging.

For development teams, this represents a shift in thinking about API security. Traditional web applications typically authenticate users; MCP requires authenticating AI agents that may be acting on behalf of users or operating autonomously. The security model must account for both the agent's identity and the context of its actions, making proper authorization design critical for safe AI system integration.

**Key takeaways:**
- MCP security requires OAuth 2.1 with PKCE for robust authentication and authorization
- The three-party architecture (host, client, server) enables precise security control
- Least-privilege scopes and proper JWT validation are essential for safe AI agent interactions

**Link:** [A developer's guide to MCP auth](https://workos.com/blog/mcp-auth-developer-guide)

## Perfectly Pointed Tooltips with Anchor Positioning

**TLDR:** Temani Afif demonstrates how CSS Anchor Positioning API eliminates JavaScript complexity in tooltip positioning, automatically handling edge detection and overflow prevention with pure CSS.

**Summary:**

Tooltip positioning has traditionally been a JavaScript-heavy endeavor, requiring complex calculations to determine optimal placement, handle edge cases, and prevent content cutoff. The new CSS Anchor Positioning API fundamentally changes this landscape by moving positioning logic entirely into CSS, eliminating performance concerns and reducing code complexity.

The foundation is elegantly simple: define an anchor using `anchor-name`, link the tooltip with `position-anchor`, and specify placement with `position-area`. The real power emerges with `position-try-fallbacks`, which allows defining multiple positioning strategies. The browser automatically selects the best position based on available space, switching between top, bottom, left, and right placements as needed.

The articles explore advanced techniques like using "flip" values (`flip-block`, `flip-start`, `flip-inline`) to create sophisticated fallback chains. Instead of manually defining each position, these flip values mirror positions across different axes, creating natural transitions from top to bottom, left to right, or diagonal movements. This approach maintains consistent spacing and visual relationships while adapting to viewport constraints.

What's particularly clever is how the API handles edge cases that typically require extensive JavaScript logic. The browser natively understands containing block boundaries, scroll positions, and available space calculations. This means tooltips automatically avoid cutoff, maintain appropriate distances from their anchors, and gracefully degrade when space is limited.

However, there's a significant caveat: browser support is currently limited to Chrome and Edge. This creates an interesting architectural decision for teams - whether to implement progressive enhancement with anchor positioning for supported browsers while maintaining JavaScript fallbacks, or wait for broader support. The performance and maintainability benefits are substantial, but the support limitations require careful consideration.

**Key takeaways:**
- CSS Anchor Positioning eliminates JavaScript complexity for tooltip positioning
- `position-try-fallbacks` with flip values creates sophisticated positioning strategies
- Browser support is currently limited to Chrome and Edge, requiring progressive enhancement

**Tradeoffs:**
- Gain significant performance improvements and code simplification but sacrifice universal browser support
- Modern CSS approach provides better maintainability but requires fallback strategies for unsupported browsers

**Link:** [Perfectly Pointed Tooltips: A Foundation](https://frontendmasters.com/blog/perfectly-pointed-tooltips-a-foundation/)

## Field Sizing: Dynamic Input Width Based on Content

**TLDR:** Ahmad Shadeed explores the `field-sizing: content` CSS property, which automatically sizes input fields and select elements based on their content, eliminating the need for JavaScript solutions.

**Summary:**

The `field-sizing` property addresses a long-standing web development challenge: making form inputs dynamically size themselves based on their content. Traditionally, this required JavaScript to measure text width and adjust input dimensions, creating performance overhead and complexity. The new CSS property handles this natively, with `field-sizing: content` making inputs and select elements size themselves to match their content.

The property shines in conversational UI patterns, where form inputs should feel like filling in blanks rather than completing traditional forms. Ahmad demonstrates how this creates more natural, letter-like interfaces where inputs seamlessly integrate with surrounding text. The property respects placeholder text as a minimum width, providing sensible defaults while adapting to user input.

Practical applications extend beyond conversational forms. Select menus can now dynamically adjust to show the full text of the currently selected option, rather than being constrained to accommodate the longest possible choice. This is particularly valuable for navigation selects, filter controls, and any interface where the selected value's length varies significantly.

The property works excellently for URL inputs, subdomain fields, and user handle inputs where content length is unpredictable. Combined with `max-width` constraints, it provides flexible sizing that respects layout boundaries while optimizing for content readability.

Browser support is currently limited to Chrome and Edge, but Ahmad emphasizes the progressive enhancement aspect - unsupported browsers simply use standard input sizing, maintaining functionality while missing the enhanced experience. This makes it safe to implement today as an enhancement rather than a dependency.

**Key takeaways:**
- `field-sizing: content` eliminates JavaScript for dynamic input sizing
- Particularly effective for conversational UI and variable-content selects
- Works as progressive enhancement with graceful degradation

**Link:** [Use Cases for Field Sizing](https://ishadeed.com/article/field-sizing/)

## Your URL Is Your State

**TLDR:** Ahmad Alfy argues that URLs are underutilized as state containers in modern web applications, offering shareability, bookmarkability, and browser history management that many state management solutions overlook.

**Summary:**

The article makes a compelling case that frontend developers have overlooked one of the web's most elegant state management solutions: the URL itself. URLs provide shareability, bookmarkability, browser history integration, and deep linking capabilities for free - features that complex state management libraries struggle to replicate. The PrismJS example perfectly illustrates this: a single URL encodes an entire configuration, making it shareable and recoverable without databases, cookies, or localStorage.

Ahmad breaks down how different URL components can encode different types of state: the path for primary navigation, query parameters for filters and options, fragments for page sections, and the emerging text fragments for precise content targeting. Each component serves a specific purpose in the state management hierarchy, from coarse-grained navigation to fine-grained content positioning.

The article provides practical examples of URL state management: e-commerce filters maintaining their state across page refreshes, dashboard configurations being shareable via URL, and form states being recoverable through browser history. These patterns demonstrate how URLs can replace complex client-side state management while providing better user experience.

However, the piece doesn't adequately address the limitations and tradeoffs of URL-based state management. What about sensitive data that shouldn't appear in URLs? How do you handle complex nested state that would create unwieldy query strings? The article also doesn't discuss the performance implications of frequently updating URLs or the challenges of managing URL state in single-page applications with client-side routing.

The emphasis on shareability and bookmarkability is valuable, but the article misses discussing the security implications of encoding state in URLs, the challenges of maintaining URL backwards compatibility, and how to handle state that shouldn't persist across sessions. These considerations are crucial for production applications where URL state management must coexist with other state management strategies.

**Key takeaways:**
- URLs provide built-in shareability, bookmarkability, and browser history integration
- Different URL components can encode different types of application state
- URL state management can reduce complexity compared to client-side state libraries

**Link:** [Your URL Is Your State](https://alfy.blog/2025/10/31/your-url-is-your-state.html)

## WebKit Features for Safari 26.1

**TLDR:** Safari 26.1 introduces relative units support in SVG and numerous improvements to CSS Anchor Positioning, along with accessibility fixes and performance enhancements.

**Summary:**

Safari 26.1 represents a significant step forward in CSS capabilities, particularly with the addition of relative units support within SVG files. This includes rem units, viewport units (vh, vw, vmin, vmax), typography-relative units (rlh, ic, cap), and container query units (cqw, cqi, cqmin, cqmax). This change stems from a broader refactoring of how WebKit handles CSS units, giving the SVG engine better access to relative measurements for the first time.

The anchor positioning improvements are substantial, with a dozen specific enhancements that address real-world usage scenarios. WebKit now remembers the last successful position-try fallback to reduce layout jumps when styles change, handles fragmented multicolumn flows correctly, and properly accounts for left-hand scrollbars in right-to-left layouts. These improvements suggest that anchor positioning is maturing rapidly and becoming more robust for production use.

The accessibility improvements focus on practical issues that affect real users: fixing hit testing for scrolled iframe content, correcting VoiceOver radio button counting with dynamic content, and properly exposing dynamically expanded details elements. These fixes demonstrate Apple's continued commitment to accessibility, addressing edge cases that can significantly impact assistive technology users.

The CSS improvements extend beyond anchor positioning, with fixes for @media print styles in nested rules and performance optimizations for :has() selectors. The performance work is particularly interesting - creating separate RuleSets for attribute selectors like :has([attr=value]) to avoid universal invalidation shows sophisticated optimization work happening at the engine level.

For development teams, this release signals that Safari is rapidly catching up with Chrome and Edge in terms of modern CSS features. The anchor positioning improvements in particular suggest that cross-browser support for this powerful positioning system is becoming more viable for production use.

**Key takeaways:**
- SVG now supports relative units including rem, viewport units, and container query units
- Anchor positioning receives dozen of improvements for production readiness
- Accessibility fixes address real-world assistive technology compatibility issues

**Link:** [WebKit Features for Safari 26.1](https://webkit.org/blog/17541/webkit-features-for-safari-26-1/)

## The Inner Workings of JavaScript Source Maps

**TLDR:** Polar Signals provides a deep dive into source map internals, explaining how VLQ encoding and mapping structures bridge the gap between minified production code and original source files.

**Summary:**

Source maps are the invisible infrastructure that makes modern JavaScript debugging possible, translating cryptic minified code locations back to readable source files. The article excellently breaks down the multi-stage build pipeline - TypeScript transpilation, module bundling, and minification - showing how source maps maintain connections at each transformation step.

The technical deep dive into Variable Length Quantity (VLQ) encoding is particularly valuable. VLQ allows source maps to compress position mappings efficiently, encoding relative offsets between consecutive mappings rather than absolute positions. This compression is crucial given that source maps can contain thousands of position mappings for large applications. The Base64 VLQ encoding further reduces file size while maintaining human readability.

The article explains the source map JSON structure clearly: version information, file references, source arrays, name arrays, and the crucial mappings field. The mappings field uses a sophisticated encoding scheme where each segment contains up to five values: generated column, source file index, original line, original column, and original name index. This structure allows precise mapping of every token in the generated code back to its original location.

What's missing is discussion of the performance implications of source maps in production. While the article mentions that sourcesContent is usually disabled in production builds, it doesn't address the broader question of whether to serve source maps to end users at all. There's also limited coverage of source map security considerations - source maps can expose original source code and file structures that might reveal sensitive information about application architecture.

The article also doesn't explore the debugging workflow implications. How do different development tools consume source maps? What happens when source maps are outdated or corrupted? These practical considerations are crucial for teams implementing source map strategies in production environments.

**Key takeaways:**
- VLQ encoding efficiently compresses position mappings using relative offsets
- Source maps maintain precise token-level mappings through multi-stage build processes
- The mappings field uses sophisticated encoding to minimize file size while preserving accuracy

**Link:** [The Inner Workings of JavaScript Source Maps](https://www.polarsignals.com/blog/posts/2025/11/04/javascript-source-maps-internals)

## New Web Platform Features in October 2025

**TLDR:** Rachel Andrew summarizes Chrome 142 and Firefox 144 releases, highlighting same-document view transitions becoming Baseline, new command attributes, and enhanced CSS style queries.

**Summary:**

October 2025 marked significant progress for web platform capabilities, with Firefox 144 bringing same-document view transitions to Baseline status. This means the View Transitions API now has sufficient browser support for production use, enabling smooth animated transitions between page states without requiring JavaScript animation libraries. The API includes comprehensive pseudo-element support for fine-grained transition control.

Firefox also introduced the `command` and `commandfor` attributes for buttons, along with the `moveBefore()` method for DOM manipulation that preserves element state. These additions represent continued evolution toward more declarative HTML patterns, reducing the need for JavaScript in common interaction scenarios.

Chrome 142's enhancements to style container queries with range syntax represent a significant expansion of CSS querying capabilities. Instead of exact value matching, developers can now use comparison operators with custom properties, enabling more flexible responsive design patterns. This works with numeric types including lengths, percentages, angles, and time values.

The Interest Invokers feature (interestfor attribute) introduces a new interaction pattern where buttons and links can trigger actions on hover or other "interest" indicators. This could enable more responsive interfaces that react to user intent before explicit clicks, though the accessibility implications need careful consideration.

The `:target-before` and `:target-after` pseudo-classes for scroll markers provide new styling capabilities for scroll-based navigation, enabling more sophisticated scroll indicator designs. These additions show continued investment in scroll-based user interface patterns.

However, the article doesn't discuss the practical implications of these features for real-world development. How do teams evaluate when new features have sufficient support for production use? What are the performance implications of view transitions at scale? These implementation considerations are crucial for development teams making technology adoption decisions.

**Key takeaways:**
- Same-document view transitions achieve Baseline status with Firefox 144 support
- CSS style queries gain range syntax for flexible responsive design patterns
- New declarative HTML patterns reduce JavaScript requirements for common interactions

**Link:** [New to the web platform in October](https://web.dev/blog/web-platform-10-2025)

## Chrome Removes XSLT for Enhanced Security

**TLDR:** Google announces XSLT deprecation and removal from Chrome by November 2026, citing security concerns while providing migration guidance and enterprise transition options.

**Summary:**

Chrome's decision to remove XSLT represents a significant shift in browser security priorities, with all major browser vendors (Chrome, Firefox, Safari) coordinating this removal. XSLT, which transforms XML documents into other formats like HTML, has been a web platform feature since the early 2000s but poses ongoing security risks that outweigh its utility in modern web development.

The removal timeline is carefully planned: early warnings began in October 2025, official deprecation starts December 2025, and complete removal happens November 2026. This 13-month timeline provides substantial notice for affected sites, with enterprise policies and origin trials available to ease the transition for organizations that need additional time.

The security rationale makes sense - XSLT processors have historically been sources of vulnerabilities, and the feature sees limited use in modern web applications. Most XSLT use cases can be replaced with server-side transformation, JavaScript templating, or modern build-time processing. The article provides clear migration paths for different scenarios.

However, the article doesn't adequately address the impact on legacy enterprise applications that may rely heavily on XSLT for document processing workflows. While enterprise policies provide temporary relief, organizations with complex XSLT-dependent systems face significant migration challenges. The article also doesn't discuss the broader implications of browser vendors removing established web platform features - what precedent does this set for other deprecated technologies?

The coordination between browser vendors is noteworthy, suggesting this represents a fundamental shift in how the web platform evolves. Rather than maintaining indefinite backwards compatibility, browsers are willing to remove features that pose security risks, even when they break existing sites. This approach prioritizes security over backwards compatibility, which may become more common as the web platform matures.

**Key takeaways:**
- All major browsers are removing XSLT due to security concerns by late 2026
- Migration options include server-side transformation and JavaScript templating
- Enterprise policies and origin trials provide transition assistance for complex deployments

**Link:** [Removing XSLT for a more secure browser](https://developer.chrome.com/docs/web-platform/deprecating-xslt)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
