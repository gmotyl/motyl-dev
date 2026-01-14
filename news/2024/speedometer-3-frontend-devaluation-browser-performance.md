---
title: "Browser Performance Revolution: Speedometer 3.0 and the Devaluation of Frontend Craft"
excerpt: "Major browser vendors collaborate on Speedometer 3.0 benchmark while the frontend community grapples with the systematic undervaluation of CSS and HTML expertise."
publishedAt: "2024-03-13"
slug: "speedometer-3-frontend-devaluation-browser-performance"
hashtags: "#generated #en #frontend #css #html #javascript #performance #browser #webkit #chrome #firefox #speedometer #react #vue #angular #svelte #inp"
---

## Speedometer 3.0: A Collaborative Benchmark Revolution

**TLDR:** Browser vendors Chrome, Firefox, and Safari collaborated to create Speedometer 3.0, a comprehensive performance benchmark that better reflects modern web applications through real-world testing scenarios including React, Vue, Angular, and complex DOM interactions.

**Summary:**

This is genuinely historic - for the first time, all major browser vendors have worked together under a shared governance model to create a performance benchmark. Speedometer 3.0 represents a fundamental shift from the old days when each browser vendor pushed their own performance metrics.

The technical improvements are substantial. Previous versions of Speedometer only measured synchronous JavaScript execution time, missing critical aspects like painting, layout, and asynchronous work that browsers perform to optimize user experience. Version 3.0 captures the full picture of what happens when users interact with web applications - from the moment they click a button until they see the visual response.

The test scenarios have expanded dramatically beyond simple TodoMVC applications. The new benchmark includes canvas and SVG chart rendering through libraries like Chart.js and Observable Plot, code editing with CodeMirror, WYSIWYG editing with TipTap, and realistic news sites built with Next.js and Nuxt.js. These aren't toy examples - they represent the complex, heavy applications users actually encounter on the modern web.

What's particularly clever is how they've enhanced the TodoMVC tests. Rather than just testing frameworks in isolation, they now embed these applications within complex DOM trees with heavy CSS rules, mimicking the real-world conditions where your React component might be buried deep within a design system with thousands of CSS rules affecting layout and rendering performance.

For architects and teams, this benchmark provides a shared vocabulary for discussing performance across different technology choices. Instead of arguing whether React or Vue is faster based on synthetic micro-benchmarks, you can now reference a standardized, industry-agreed measurement that reflects actual user experience patterns.

**Key takeaways:**
- First cross-browser collaboration on performance benchmarking under shared governance
- Measures complete user interaction cycles including painting and asynchronous work
- Tests realistic applications beyond simple TodoMVC scenarios
- Provides standardized performance vocabulary for technology decision-making

**Link:** [Speedometer 3.0 Announcement](https://frontendfoc.us/link/152454/a71990f509)

## Interaction to Next Paint Becomes Core Web Vital

**TLDR:** Google officially promoted Interaction to Next Paint (INP) to replace First Input Delay (FID) as a Core Web Vital, providing more comprehensive measurement of user interaction responsiveness with a September 2024 deprecation deadline for FID.

**Summary:**

This change addresses a fundamental flaw in how we've been measuring user experience. First Input Delay only captured the delay before the browser started processing an interaction - essentially measuring "time to start thinking" rather than "time to complete the thought." INP measures the entire journey from user input to visual feedback, which is what users actually experience.

The timing is critical for teams. Google has set September 9, 2024 as the hard deadline when FID will be removed from Chrome User Experience Report and PageSpeed Insights APIs. This isn't just a gentle transition - it's a breaking change that will disrupt any tooling or monitoring systems that rely on FID data. Teams need to audit their performance monitoring stack now, not later.

What makes INP particularly challenging is that it exposes performance problems that FID would miss entirely. A button that responds instantly to the first click but then takes two seconds to show visual feedback would score well on FID but terribly on INP. This means teams might discover they have responsiveness problems they didn't know existed.

The measurement methodology is more sophisticated than FID's simple delay calculation. INP considers the 75th percentile of all interactions during a page visit, weighted by duration. This means occasional slow interactions can significantly impact your score, making performance optimization more nuanced than just fixing the worst outliers.

For architects, this represents a shift toward measuring user-perceived performance rather than technical implementation details. It forces teams to think holistically about the entire interaction pipeline - from event handling through DOM manipulation to layout and paint cycles.

**Key takeaways:**
- INP measures complete interaction cycles, not just input delay
- Hard deadline of September 9, 2024 for FID removal from APIs
- May reveal hidden responsiveness issues in existing applications
- Requires holistic optimization of the entire interaction pipeline

**Link:** [INP Core Web Vital Announcement](https://frontendfoc.us/link/152457/a71990f509)

## The Quiet, Pervasive Devaluation of Frontend

**TLDR:** A thoughtful analysis argues that frontend development, particularly CSS and HTML expertise, faces systematic devaluation despite its critical impact on user experience, with these languages dismissed as "not real programming" while simultaneously being criticized as too complex.

**Summary:**

This piece captures something many experienced frontend developers feel but struggle to articulate - the bizarre cognitive dissonance where CSS is simultaneously dismissed as "not real programming" yet criticized as unmaintainable, unpredictable, and overly complex. It's like existing in a quantum state of being both too simple and too complicated at the same time.

The author makes a crucial distinction that many miss: CSS is a programming language for presentation logic, and HTML is a programming interface for user interfaces. The absence of loops and conditionals doesn't invalidate their status as programming tools any more than SQL stops being a programming language because it's declarative rather than imperative.

What's particularly insightful is the observation about language shaping reality. When we consistently describe CSS as "not real programming," we create a culture where CSS expertise is undervalued, leading to poor hiring decisions, inadequate compensation, and ultimately worse user experiences. The language we use to describe frontend work directly influences how organizations prioritize and resource it.

The economic implications are significant. CSS has arguably the most direct impact on user experience of any technology in the web stack. A poorly implemented CSS architecture can make an application completely unusable regardless of how elegant the backend systems are. Yet organizations consistently treat CSS skills as less valuable than backend programming skills.

What the author doesn't fully explore is how this devaluation might be self-reinforcing. When CSS expertise is undervalued, fewer experienced developers specialize in it, leading to more poorly written CSS in the wild, which then reinforces the perception that CSS is inherently problematic rather than just poorly understood.

For teams and architects, this analysis should prompt serious reflection about how frontend skills are valued, compensated, and prioritized in hiring and project planning. The quality of your CSS architecture will determine whether users can actually accomplish their goals in your application.

**Key takeaways:**
- CSS and HTML face systematic devaluation despite critical impact on user experience
- Frontend languages exist in a paradox of being "too simple" yet "too complex"
- Language used to describe frontend work directly influences organizational priorities
- CSS expertise shortage may be self-reinforcing due to undervaluation

**Tradeoffs:**
- Treating CSS as "not real programming" reduces hiring costs but sacrifices user experience quality
- Dismissing frontend complexity speeds initial development but creates long-term maintenance burdens

**Link:** [The Quiet, Pervasive Devaluation of Frontend](https://frontendfoc.us/link/152458/a71990f509)

## Streaming HTML Out of Order Without JavaScript

**TLDR:** A clever technique using Declarative Shadow DOM enables streaming HTML content out of order while maintaining proper visual layout, allowing faster perceived performance without requiring JavaScript frameworks or client-side rendering.

**Summary:**

This is genuinely innovative - a way to achieve what modern frameworks like React and Next.js do for streaming content, but using only HTML and browser primitives. The technique leverages Declarative Shadow DOM with slots to create "portals" where content can be rendered regardless of when it arrives from the server.

The mechanics are elegant in their simplicity. You define shadow DOM templates with named slots, then later in the HTML stream, you can fill those slots with content even though it arrives out of order. The browser handles the complexity of rendering content in the correct visual location regardless of its position in the HTML source.

What makes this particularly powerful is the progressive enhancement aspect. The technique works without JavaScript, degrades gracefully in older browsers, and doesn't require buy-in to any specific framework or build system. It's pure HTML and CSS leveraging modern browser capabilities.

The performance implications are significant. Instead of waiting for slow database queries or API calls to complete before sending any HTML, servers can immediately stream the application shell and then fill in content as it becomes available. Users see something immediately rather than staring at a blank screen.

However, the browser support story reveals the limitations. This relies on Declarative Shadow DOM, which only recently gained support in Firefox and still has some gaps in older browser versions. Teams need to consider their browser support requirements carefully.

What the author doesn't fully address is the debugging complexity this introduces. When HTML source order doesn't match visual rendering order, troubleshooting layout issues becomes significantly more challenging. Developer tools aren't optimized for this pattern yet.

For architects, this represents an interesting middle ground between traditional server-side rendering and modern JavaScript-heavy solutions. It offers some benefits of both approaches while avoiding the complexity overhead of framework buy-in.

**Key takeaways:**
- Enables out-of-order HTML streaming using only browser primitives
- Works without JavaScript and degrades gracefully
- Provides immediate visual feedback while content loads asynchronously
- Requires modern browser support for Declarative Shadow DOM

**Tradeoffs:**
- Achieve faster perceived performance but sacrifice debugging simplicity
- Gain framework independence but lose tooling ecosystem support

**Link:** [Streaming HTML Out of Order](https://frontendfoc.us/link/152471/a71990f509)

## CSS Variable Groups Proposal

**TLDR:** A new CSS proposal aims to solve design system pain points by allowing developers to define and pass around groups of related CSS variables under shared namespaces, addressing common issues with design tokens and component theming.

**Summary:**

This proposal tackles one of the most frustrating aspects of working with design systems at scale - the explosion of individual CSS variables and the difficulty of aliasing them across different contexts. Currently, if you want to alias a color palette from one namespace to another, you need to manually declare dozens or hundreds of individual variable assignments.

The technical approach is sophisticated. Instead of just grouping variables, the proposal enables treating variable groups as first-class values that can be passed around, interpolated, and manipulated as units. This means you could define a color palette once and then easily adapt it for different themes, components, or contexts without massive amounts of repetitive CSS.

The aliasing capability addresses a real architectural problem. Modern design systems often need the same semantic color (like "primary") to map to different actual colors in different contexts - perhaps blue in the main application but green in an embedded widget. Currently, this requires either massive CSS duplication or complex build-time processing.

What's particularly thoughtful is the "pave the cowpaths" requirement. The proposal is designed so that individual parties - page authors, design system creators, or component authors - can adopt it independently without requiring coordination across all stakeholders. This kind of incremental adoptability is crucial for new CSS features to gain traction.

However, the proposal doesn't fully address the debugging implications. When variables are grouped and aliased, tracing the source of a particular computed value becomes significantly more complex. Developer tools would need substantial updates to make this debuggable in practice.

The interpolation capabilities could be powerful but also dangerous. Being able to programmatically generate color variations sounds appealing, but it could easily lead to accessibility issues if developers generate colors that don't meet contrast requirements.

For teams working with large design systems, this could dramatically reduce CSS bloat and maintenance overhead while making theming and customization much more manageable.

**Key takeaways:**
- Enables grouping and aliasing sets of CSS variables as single units
- Addresses design system scalability and theming challenges
- Allows incremental adoption without requiring stakeholder coordination
- Could significantly reduce CSS duplication in large design systems

**Tradeoffs:**
- Reduce CSS maintenance burden but increase debugging complexity
- Enable powerful programmatic color generation but risk accessibility violations

**Link:** [CSS Variable Groups Proposal](https://frontendfoc.us/link/152515/a71990f509)

## Apple's EU App Distribution: 15 Clicks to Install

**TLDR:** Apple's new EU-mandated web app installation process requires 15 steps including multiple warnings, Face ID verification, and navigation through settings, highlighting the friction Apple introduces for non-App Store distribution.

**Summary:**

This is malicious compliance at its finest. Apple has technically met the EU's Digital Markets Act requirements by allowing web app installation, but has designed the user experience to be so cumbersome that few users will complete it successfully. The 15-step process includes multiple scare screens, redundant confirmations, and confusing navigation patterns.

The requirements for developers are equally restrictive. You need two continuous years in the Apple Developer Program, over one million first installs in the EU, and ongoing compliance commitments. These barriers effectively limit web distribution to large, established companies while excluding smaller developers and startups.

What's particularly clever about Apple's approach is how it makes the alternative distribution method feel dangerous and unreliable even when it's technically functional. By requiring multiple Face ID verifications and presenting numerous warning screens, Apple creates the impression that installing apps from the web is inherently risky.

The comparison to Android's "Unknown Sources" installation process is apt, but Android's friction serves a legitimate security purpose - warning users about genuinely unvetted applications. Apple's process applies the same friction to applications that have passed their notarization requirements and come from verified developers.

The user experience implications extend beyond individual app installations. This level of friction will likely prevent web-based app distribution from gaining meaningful traction, which may have been Apple's goal all along. Few users will persist through 15 steps to install an app when the App Store version requires just a few taps.

For developers, this creates a strategic dilemma. The web distribution option exists but is practically unusable for most scenarios. Teams need to decide whether to invest in alternative distribution channels that users are unlikely to use successfully.

What Apple isn't acknowledging is how this friction undermines the entire premise of digital market competition. If alternative distribution channels are technically available but practically unusable, the competitive benefits the regulation intended to create don't materialize.

**Key takeaways:**
- 15-step installation process creates significant user friction
- Developer requirements limit eligibility to large, established companies
- Multiple warnings and confirmations make web installation feel dangerous
- Practically undermines competitive benefits of alternative distribution

**Tradeoffs:**
- Apple maintains App Store revenue but faces regulatory scrutiny
- Developers gain theoretical distribution options but lose practical usability

**Link:** [Apple EU App Distribution](https://frontendfoc.us/link/152460/a71990f509)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
