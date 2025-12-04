---
title: "Frontend Focus: Performance Gaps, CSS Debates, and Addy Osmani's Chrome Farewell"
excerpt: "A look at the growing performance inequality gap, the case against CSS-in-JS, a tribute to Addy Osmani's 14 years on the Chrome team, and the latest on native web components like Masonry and Dialog."
publishedAt: "2025-12-04"
slug: "frontend-focus-performance-gaps-css-debates-and-addy-osmanis-farewell"
hashtags: "#frontendfocus #css #html #performance #css-in-js #chrome #baseline #masonry #dialog #generated #en"
---

## The Performance Inequality Gap in 2026

**TLDR:** Alex Russell's annual analysis reveals that while the web gets faster for those with high-end devices, the performance inequality gap is widening. He argues that developers' focus on expensive JavaScript frameworks and their ignorance of real-world device and network constraints are creating a web that increasingly punishes the less affluent and undermines business goals.

**Summary:**
Alex Russell is back with his much-anticipated 2026 update on the "Performance Inequality Gap," and the diagnosis remains grim. The core of his argument is that the web development community, particularly in the frontend space, continues to build for a privileged minority, ignoring the reality of the global device and network landscape. The median mobile page is now a staggering 2.6 MB, bloated primarily by JavaScript, which has more than doubled since 2015. This ever-increasing payload is devastating for the majority of the world's users who are on older, slower Android devices and less-than-ideal network connections. Russell establishes a 2026 performance budget of around 2.0 MB for a 3-second load on a 75th percentile connection (9 Mbps down, 100ms RTT), a budget that the median site already exceeds.

A chilling new piece of data from the RUM Archive further undermines the case for heavy JavaScript frameworks. It shows that Single Page Applications (SPAs) are, on average, only generating one soft navigation per hard navigation. This completely erodes the primary justification for shipping large upfront JavaScript bundles—that they will pay for themselves over longer, more interactive sessions. If the average session is this shallow, the performance cost of the initial load is almost never recuperated. Russell argues this should "shake our industry to the bone," yet the trend of growing JS bundles continues unabated.

For architects and engineering leaders, this is a stark call to action. The data strongly suggests that the dominant frontend culture is not just failing users but is actively "business-undermining." The obsession with complex, JS-heavy frameworks is creating slow, bloated experiences that drive users away, particularly in growth markets. Russell's advice is clear: build with restraint. He urges teams to test on realistic, low-end devices (like a Samsung Galaxy A24 or a cheap Celeron laptop) and to adopt performance budgets that reflect the P75 or even P90 user experience. The article is a powerful, data-backed indictment of an ecosystem that has, in his view, prioritized developer experience and hype over the fundamental goal of building a fast, accessible web for everyone.

**Key takeaways:**
- The performance gap between high-end and low-end devices continues to grow.
- The median mobile page weight is now 2.6 MB, far exceeding a reasonable performance budget for most users.
- New data shows SPAs generate only one soft navigation per hard navigation on average, questioning their fundamental premise.
- Developers should test on low-end hardware and slow networks to understand the real user experience.
- The dominant culture of JS-heavy frontend development is detrimental to both users and business outcomes.

**Link:** [The Performance Inequality Gap, 2026 - Infrequently Noted](https://infrequently.org/2025/11/performance-inequality-gap-2026/)

## Addy Osmani Bids Farewell to the Chrome Team

**TLDR:** After nearly 14 years, Addy Osmani, a prominent figure in the web development community and a key engineering manager on the Google Chrome team, is moving to a new role within Google. In a heartfelt farewell post, he reflects on the incredible evolution of the web platform and the collaborative efforts that shaped it.

**Summary:**
Addy Osmani, a name synonymous with Chrome DevTools, web performance, and modern web development, has announced his departure from the Chrome team after an influential 14-year tenure. His farewell blog post is a gracious and humble reflection on the journey of the web from simple desktop apps to a powerful, multi-device platform. He recounts the development of pivotal technologies like Service Workers and PWAs, which brought offline capabilities and installable experiences to the web, and the creation of Core Web Vitals, which successfully shifted the industry's focus toward user-centric performance metrics.

Osmani celebrates the success of Chrome DevTools, which became the primary debugging tool for the web, and the establishment of industry-wide benchmarks like Speedometer. He also highlights the importance of collaboration, from the Interop project that aligned browser vendors on key features, to the Baseline initiative that brought clarity to cross-browser compatibility. His post is a testament to a career spent listening to developers, sweating the details, and working to make the web faster, safer, and more joyful to build on.

This is more than just a personal announcement; it's a history lesson in modern web development from someone who was in the room where it happened. For architects and developers, it’s a reminder of how much the platform has evolved through intentional, collaborative effort. Osmani’s work has had a profound impact on how we build for the web, from the tools we use to the metrics we track. His departure marks the end of an era for the Chrome team, but his legacy—a faster, more capable, and more developer-friendly web—will endure.

**Key takeaways:**
- Addy Osmani is leaving the Chrome team after almost 14 years.
- He played a key role in developing Service Workers, PWAs, Core Web Vitals, and Chrome DevTools.
- His work emphasized user-centric performance, developer experience, and cross-browser collaboration.
- The post serves as a history of the web's evolution over the past decade.

**Link:** [Farewell for now, Chrome.](https://addyosmani.com/blog/farewell-chrome/)

## CSS-in-JS: The Great Betrayal of Frontend Sanity

**TLDR:** In a fiery op-ed, Alexander T. Williams argues that CSS-in-JS, once seen as a solution to styling woes, has become a performance-draining, over-engineered "ticking time bomb." He makes a compelling case for returning to native CSS solutions, which are now more powerful and capable than ever.

**Summary:**
This polemic from The New Stack takes a flamethrower to the concept of CSS-in-JS. The author argues that what was promised as a revolution in modularity and component-based styling has devolved into a "bureaucratic mess." The core sin of CSS-in-JS, according to the article, is that it ties styling to the JavaScript runtime. This introduces a significant performance tax, as the browser must parse and execute JavaScript to generate and inject styles, a process that is inherently slower than its own highly-optimized CSS engine. This overhead might be negligible on a developer's high-end machine, but it creates a real bottleneck for users on low-end devices.

The author also attacks the "developer experience" argument often used to defend CSS-in-JS. While acknowledging the initial appeal of co-locating styles, he claims the dream quickly sours as codebases scale. Debugging becomes a nightmare of cryptic, auto-generated class names, and simple style overrides can require complex refactoring of component logic. The obsession with developer experience, he argues, has become a "smokescreen for architectural debt," trading long-term maintainability and performance for short-term convenience.

The solution, Williams contends, is a return to sanity: embracing modern, native CSS. With features like CSS variables, container queries, and native nesting, the platform itself now solves most of the problems that CSS-in-JS was created to address, but without the runtime overhead or debugging headaches. For architects and developers who have felt the pain of wrestling with complex CSS-in-JS libraries, this article will feel like a vindication. It's a powerful and persuasive argument that the pendulum is swinging back toward the separation of concerns, not because of nostalgia, but because the browser's native capabilities have finally caught up, making many JavaScript-based abstractions an unnecessary and harmful burden.

**Key takeaways:**
- CSS-in-JS introduces a significant runtime performance cost by tying styling to JavaScript execution.
- The "developer experience" benefits of CSS-in-JS often break down at scale, leading to debugging and maintenance nightmares.
- Modern native CSS features like variables, container queries, and nesting solve the original problems that CSS-in-JS aimed to fix.
- The industry is seeing a trend back toward static CSS and separation of concerns for better performance and maintainability.

**Link:** [CSS-in-JS: The Great Betrayal of Frontend Sanity](https://thenewstack.io/css-in-js-the-great-betrayal-of-frontend-sanity/)

## The Platform Push: Native Replacements for JS Libraries

**TLDR:** A wave of new and upcoming browser features like CSS Masonry, the Popover API, and View Transitions are set to replace common JavaScript libraries. This shift promises better performance, improved accessibility, and simpler codebases by leveraging the power of the native web platform.

**Summary:**
Patrick Brosset from Smashing Magazine makes a compelling case that the web platform is evolving at a rate that makes many common JavaScript libraries and frameworks increasingly redundant. He walks through a host of features, now widely available in browsers (part of the "Baseline" feature set), that provide native solutions for what was once the exclusive domain of JavaScript. Popovers and the `<dialog>` element handle modals and tooltips with built-in accessibility and focus management. Container queries allow for truly reusable components that respond to their own size, not just the viewport. Modern array methods in JavaScript itself reduce the need for utility libraries like Lodash.

The most exciting part of the article is the deep dive into the upcoming CSS Masonry layout. For years, developers have relied on JavaScript libraries (most famously, Masonry.js) to create the "Pinterest-style" layouts where items of varying heights pack together neatly. This is finally coming to CSS as a native layout primitive, `display: grid-lanes`. Brosset, whose team at Microsoft is implementing this in Chromium, demonstrates how the native version will be far simpler to use and dramatically more performant. Because it's a native CSS feature, it avoids the render-blocking JavaScript execution and complex setup required by current libraries, leading to faster page loads and smoother resizing.

For architects and developers, this article is a crucial look at the future of frontend development. It signals a major trend: the platform is catching up. The need to "pull in a library for that" is diminishing as powerful features are baked directly into the browser. This doesn't mean all libraries are obsolete, but it does mean that a deep understanding of the modern web platform is more valuable than ever. By learning and adopting these new native features as they become available, teams can ship less code, achieve better performance, and write simpler, more maintainable applications. It's a shift from working *around* the browser to working *with* it.

**Key takeaways:**
- Native browser features like `<dialog>`, Popover API, and container queries can now replace common JavaScript libraries.
- CSS Masonry is coming to the platform, offering a performant, CSS-only solution for complex grid layouts.
- Relying on native platform features leads to less code, better performance, and simpler, more maintainable projects.
- Staying informed about what the web platform can do is crucial for making responsible engineering decisions.

**Link:** [Masonry: Things You Won’t Need A Library For Anymore — Smashing Magazine](https://www.smashingmagazine.com/2025/12/masonry-things-you-wont-need-library-anymore/)

## In Brief: Certificate Lifetimes, Dialog Scrolling, and More

- **Let's Encrypt will be reducing certificate lifetimes from 90 days to 45 days** over the next two years. This industry-wide change aims to improve security by limiting the scope of a potential compromise. Most users with automated renewal scripts won't need to do anything, but it's a good time to ensure your renewal logic isn't hardcoded and that you have proper monitoring in place.
- **A new CSS trick can eliminate scrollbar layout shifts.** By using `scrollbar-gutter: stable;`, you can reserve space for the scrollbar, preventing the page content from jumping when the scrollbar appears or disappears. This is now supported in all major browsers.
- **You can finally prevent page scrolling when a `<dialog>` is open with just CSS.** A recent change to `overscroll-behavior` in Chrome 144 allows you to apply `overscroll-behavior: contain` to a dialog (with `overflow: hidden`) to stop the underlying page from scrolling, solving a long-standing annoyance.
- **Framework7 v9.0 has been released**, updating its themes to the latest iOS 26 and Material You styles and upgrading its component APIs to support Svelte 5 and React 19.

**Links:**
- [Decreasing Certificate Lifetimes to 45 Days](https://letsencrypt.org/2025/12/02/from-90-to-45.html)
- [One CSS Trick to Eliminate Scrollbar Layout Shifts](https://www.amitmerchant.com/one-css-trick-to-eliminate-scrollbar-layout-shifts/)
- [Prevent a page from scrolling while a dialog is open](https://css-tricks.com/prevent-a-page-from-scrolling-while-a-dialog-is-open/)
- [Release v9.0.0 · framework7io/framework7](https://github.com/framework7io/framework7/releases/tag/v9.0.0)
