---
title: "Design Decisions Need 5x More Justification"
excerpt: "From the justification tax on design decisions to lazy-loading video in HTML, the Navigation API going Baseline, and why checking an LLM's work is everyone's problem — this week's Unicorn Club is packed with ideas that matter."
publishedAt: 2026-03-11
slug: design-decisions-need-5x-more-justification
hashtags: ["#unicornclub", "#frontend", "#css", "#accessibility", "#ai", "#architecture", "#performance", "#javascript", "#generated", "#en"]
---

# Design Decisions Need 5x More Justification

## TLDR

This edition covers the "justification tax" that designers pay every time they propose a change, why your browser already has text-to-speech built in, the difference between statistical and practical significance in UX research, accessibility testing beyond automated scans, a deep dive into CSS list customization, lazy-loading coming to HTML video and audio, why checking an LLM's output is a systemic problem, the Popover API versus Dialog API, Brad Frost's "Real-Time UI" concept, minimally viable consistency in organizations, the Navigation API reaching Baseline status, and why native HTML components do not guarantee good UX.

---

## The Justification Tax on Design Decisions

Here is something that will resonate with every designer who has ever walked into a meeting with a well-researched proposal. Vlad Derdeicea at UX Collective writes about what he calls "the justification tax" — the structural surcharge that design decisions carry compared to engineering or finance decisions.

The pattern is painfully familiar. An engineer says "we need to refactor the authentication module" and gets a thumbs-up. A designer says "we need to simplify the onboarding flow" and suddenly needs user research, competitive analysis, a prototype, and a business case showing projected impact on conversion. Same meeting, wildly different burdens of proof.

Vlad traces this to three structural realities. First, design is visible — everyone can see a redesigned onboarding flow and have an opinion, while a refactored auth module is invisible. Second, design outcomes feel subjective even when they are data-driven. Third, most organizations evaluate design as a cost center rather than as strategy. The measurement infrastructure simply does not exist the way it does for engineering or finance.

The article includes a fascinating case study from Kantar, where Vlad designed a tablet-first experience that landed a multi-million euro deal with Barilla — only to watch it get bolted onto legacy infrastructure until it was unrecognizable. The concept car got strapped to a horse carriage. And then the person who built the concept car left. That is the hidden cost nobody puts in the quarterly report.

His advice for reducing the tax is practical: stop speaking design language and start speaking consequence. "We should simplify this flow" gets questioned. "We are losing 34 percent of users between step 2 and step 3, and here is what that costs us per quarter" gets funded. Same problem, different language — one carries tax, the other does not.

### Key Takeaways
- Design decisions carry a structural "justification tax" that engineering and finance decisions do not
- The tax comes from visibility, perceived subjectivity, and lack of measurement infrastructure
- Speak in consequences and business impact, not design language
- Pre-align with stakeholders before meetings rather than presenting cold
- Build your own measurement infrastructure — do not wait for permission

**Link:** [The justification tax](https://uxdesign.cc/the-justification-tax-e5ea3df72bd5)

---

## Your Browser Already Has Text-to-Speech Built In

Adrian Roselli has a wonderfully direct message for anyone being pitched an AI-powered or overlay-based solution for reading web pages aloud: you do not need it. Your users' browsers already do this, and they do it well.

Firefox has reader view with read-aloud functionality. Chrome desktop has reading mode with a play button. Edge offers Read Aloud with a keyboard shortcut. Safari on both iOS and macOS has "Listen to Page" built right in. In most cases, users can choose reading speed, voice, pause and restart, and jump between paragraphs — more control than third-party products typically offer.

The kicker is that if these built-in features do not appear for your pages, that is a signal your HTML needs work. Pages that lack a main region, or are nothing but div soup, will not trigger reader features. Fixing that underlying HTML would improve the experience for everyone.

Adrian also points out the downsides of third-party alternatives: AI-powered audio generation contributes to environmental costs, overlay vendors add legal risk and user tracking, and users who actually benefit from spoken content already know about their browser's built-in features.

### Key Takeaways
- All major browsers already offer built-in text-to-speech functionality
- Users get more control through browser features than through most third-party tools
- If browser reader features do not work on your pages, your HTML structure needs fixing
- Third-party solutions add risk, cost, and tracking with minimal user benefit

**Link:** [Your Browser Can Already Speak a Page](https://adrianroselli.com/2026/03/your-browser-can-already-speak-a-page.html)

---

## Statistical Significance Is Not the Same as Practical Significance

The Nielsen Norman Group published an important primer on a mistake that UX researchers and product teams make all the time: conflating statistical significance with practical significance. These are two fundamentally different questions.

Statistical significance asks "is this result likely due to chance?" Practical significance asks "is this result big enough to matter in real life?" You can have a statistically significant result — say, a checkout flow that improves completion rates from 85.0 percent to 85.2 percent with a p-value of 0.03 — that is completely meaningless in practice. The pattern is real, but nobody would notice it, and the engineering effort to implement it would not be justified.

The article highlights how sample size creates traps in both directions. Large datasets can make trivially small differences look significant. An error rate dropping by 0.03 percent with millions of sessions will produce a gorgeous p-value, but no human would perceive the difference. Conversely, small samples can hide meaningful patterns. If 10 out of 12 users fail a task on dashboard A while only 1 out of 12 fails on dashboard B, that may not reach statistical significance, but it is hard to dismiss from a practical standpoint.

The NN/g team recommends evaluating practical significance through three lenses: user perception (would users actually notice this change?), business value (does this matter at scale?), and effect size (how large is the difference, formally measured?). The best UX researchers look at both statistical and practical significance together.

### Key Takeaways
- Statistical significance tells you a result is not random; practical significance tells you it is worth acting on
- Large sample sizes can make trivial differences appear significant
- Small sample sizes can hide meaningful patterns
- Evaluate through user perception, business value, and formal effect size
- Not everything that matters in UX can or should be reduced to a p-value

**Link:** [Statistical Significance Isn't the Same as Practical Significance](https://www.nngroup.com/articles/practical-significance/)

---

## Accessibility Testing Takes More Than a Scan

Allie Paschal at UX Collective makes a compelling case for why automated accessibility scanners, while useful, only catch an estimated 40 percent of issues. The other 60 percent requires manual and experiential testing tools that involve human judgment.

The article walks through three categories of tools. Automated scanners like Silktide and WAVE catch code-level violations — missing form labels, color contrast failures, empty links, skipped heading levels. But they cannot evaluate whether alt text is actually helpful, or whether the reading order makes logical sense.

Manual tools like HeadingsMap and Web Developer let you inspect heading hierarchy, landmark structure, and how a page behaves with CSS disabled. This matters because some users turn off CSS entirely, and content that appears visually correct might be logically out of order in the DOM.

Experiential tools like Web Disability Simulator and Zoom for Chrome simulate how users with visual or cognitive disabilities perceive a page. These do not replace actual assistive technology testing, but they build empathy and surface barriers that automated scans miss entirely — like error states that rely solely on color, or layouts that break at 200 percent zoom.

The takeaway is that accessibility is not about passing a score. It is about whether real users can understand, navigate, and interact with your content effectively.

### Key Takeaways
- Automated scanners catch roughly 40 percent of accessibility issues
- Manual tools are needed to evaluate structure, hierarchy, and semantic correctness
- Experiential tools simulate disabilities and reveal barriers invisible to scanners
- Combine all three categories for meaningful accessibility evaluation
- Accessibility is about usability, not compliance scores

**Link:** [Accessibility testing takes more than a scan](https://uxdesign.cc/accessibility-testing-takes-more-than-a-scan-9984faf40985)

---

## Lazy-Loading for HTML Video and Audio Is Coming

Scott Jehl at Squarespace has been working on standardizing lazy-loading for HTML video and audio elements, and the news is very encouraging. The feature just landed behind a flag in Chrome Canary, and HTML spec proposals, platform tests, and browser patches for Firefox and WebKit are all in review.

The API is beautifully simple — exactly like lazy-loading for images and iframes. You add `loading="lazy"` to a video or audio element, and the browser defers loading assets like video files, audio files, and poster images until the element is visible in the viewport. Autoplay is also delayed until visibility.

This matters because video and audio files are some of the heaviest resources on web pages. The HTTP Archive reminds us of this constantly. A simple declarative attribute that defers their loading could dramatically reduce page weight, especially for pages with media below the fold, inside tabs, or within carousels.

One best practice is already clear: do not use lazy-loading on videos that will be visible when the page first loads. The feature naturally delays resource requests, so it is best reserved for media that is unlikely to be in the initial viewport. The attribute is safely ignored in browsers that do not yet support it, so you can start using it today as a progressive enhancement.

### Key Takeaways
- Native lazy-loading for video and audio elements is being standardized
- Works with a simple `loading="lazy"` attribute, just like images and iframes
- Already available behind a flag in Chrome Canary
- Dramatically reduces page weight for media-heavy pages
- Reserve for below-the-fold media; do not lazy-load hero videos

**Link:** [Standard HTML Video & Audio Lazy-loading is Coming!](https://scottjehl.com//posts/lazy-media/)

---

## Checking an LLM's Work Is a Systemic Problem

Pavel at Product Picnic wrote a sharp piece that pushes back against the idea that vibe coding is fine as long as you "check the AI's work." The argument is that this checking is not an individual discipline problem — it is a systemic one.

The core insight is that AI turns quality assurance into burnout. When you do the work yourself, you get into a flow state. When you have to continuously verify the outputs of an artificial brain before proceeding, you burn out. The volume of outputs that makes you feel productive keeps you going long past your natural stopping point. And after a dozen cases of the AI giving a good-enough answer, your determination to keep checking erodes.

Pavel draws on an important distinction: code can be ontological truth — what is — but it can never be normative truth — what must be. For that, you need specifications. And when the people writing the requirements are the ones vibe coding, you have lost the source of truth entirely.

The deeper argument is about conceptual fidelity. Having AI generate a prototype robs you of the opportunity to interrogate decisions throughout the process. Understanding whether an artifact is fit for purpose is part of a feedback loop with understanding the purpose itself. Both evolve in parallel as you work on the problem, and that evolution does not occur when the work is skipped. Drawing is seeing; machines only record.

### Key Takeaways
- Checking AI output is a systemic organizational problem, not just an individual skill
- AI turns quality assurance into burnout by breaking flow states
- Code cannot be the source of normative truth — specifications are required
- Generating prototypes with AI skips the conceptual understanding that emerges through the design process
- Never ship vibe-coded prototypes in a professional capacity without rigorous refactoring

**Link:** [Checking an LLM's work is a systemic, not an individual, problem](https://productpicnic.beehiiv.com/p/checking-an-llm-s-work-is-a-systemic-not-an-individual-problem)

---

## Popover API or Dialog API: Which to Choose?

Zell Liew at CSS-Tricks breaks down a choice that confuses many developers: when to use the Popover API versus the Dialog API. The answer turns out to be mostly about accessibility.

The Popover API comes with automatic focus management, automatic ARIA connections (no need for aria-expanded, aria-popup, or aria-controls), and automatic light dismiss. Two lines of HTML and you have a working, accessible popover. The Dialog API, by contrast, has none of these built-in — you have to wire up focus management, ARIA attributes, and dismiss behavior yourself with JavaScript.

The Dialog API earns its place for exactly one use case: modal dialogs. Its `showModal` method automatically inerts other elements, prevents tabbing into background content, and blocks screen readers from reaching anything outside the modal. This is functionality the Popover API does not provide.

The practical recommendation is straightforward: use the Popover API for most popovers, and use the Dialog API only when you need a true modal with a backdrop. And never style a popover's `::backdrop` pseudo-element — that visual pattern signals a modal, which creates accessibility confusion.

### Tradeoffs
- The Popover API gives you more built-in accessibility for less code, but cannot create true modals
- The Dialog API requires more JavaScript wiring but is the only correct choice for modals that need to inert background content

### Key Takeaways
- Use the Popover API as your default for popover-like UI
- Reserve the Dialog API for modal dialogs specifically
- The Popover API handles focus, ARIA, and light dismiss automatically
- A future invoker commands proposal may simplify the Dialog API further

**Link:** [Popover API or Dialog API: Which to Choose?](https://css-tricks.com/popover-api-or-dialog-api-which-to-choose/)

---

## Real-Time UI: When the Meeting Becomes the Prototype

Brad Frost introduces a concept he calls "Real-Time UI" — the idea that AI and design systems together now make it possible to generate UI during a conversation, turning meetings into collaborative prototyping sessions.

The premise is that historically, it has been prohibitive for non-designers and non-developers to participate directly in creating digital interfaces. Half of our meetings get spent talking people out of pursuing ideas because of the effort involved. Real-time UI flips that by visualizing design system components as they are referenced in conversation, turning abstract ideas into working prototypes as soon as the words leave your mouth.

The key differentiator from generic AI prototyping is the design system integration. The goal is not to let AI randomly generate whatever it wants, but to wield your organization's specific infrastructure — your tokens, your components, your best practices — to create realistic artifacts tuned to your team's context.

Brad sees this as opening the door to more participatory, democratic design processes. Diversity of perspective is critical to good products, and when the mechanical barrier of creating designs and code is removed, more disciplines can contribute directly to shaping what gets built.

### Key Takeaways
- AI plus design systems can enable real-time UI generation during meetings
- Design system integration ensures prototypes reflect organizational standards, not random AI output
- Lowering the mechanical barrier to creating UI opens design to more diverse contributors
- Professional designers and developers remain essential but can now collaborate more broadly

**Link:** [Real-Time UI](https://bradfrost.com/blog/post/real-time-ui/)

---

## The Navigation API Is Now Baseline

The Navigation API has reached Baseline Newly Available status across all major browsers as of early 2026, and this is a big deal for anyone building single-page applications.

For over a decade, we have relied on `window.history` and the History API to build SPAs, and for over a decade, we have complained about it. The History API was never designed for SPAs. You had to listen for link clicks globally, call `preventDefault`, manually call `history.pushState`, update the DOM, and separately handle `popstate` for back and forward buttons. Miss one edge case and users end up at the wrong view.

The Navigation API replaces all of that with a single `navigate` event that fires for every navigation — link clicks, form submissions, back button, forward button, and programmatic calls. The `event.intercept()` method handles URL updates, focus management, and accessibility automatically. One listener, one handler, all navigation types covered.

The API also plays beautifully with View Transitions, allowing you to wrap DOM updates in `document.startViewTransition()` for app-like animated transitions. And it handles form submissions natively through `NavigateEvent.formData`, eliminating the need for JavaScript `onsubmit` handlers.

### Key Takeaways
- The Navigation API is now supported across all major browsers
- Replaces the fragile History API with a single centralized navigate event
- Handles URL updates, accessibility, and focus management automatically
- Works seamlessly with View Transitions for animated page changes
- Handles form submissions natively without separate event listeners

**Link:** [Navigation API - a better way to navigate, is now Baseline Newly Available](https://web.dev/blog/baseline-navigation-api)

---

## Native HTML Components Do Not Guarantee Good UX

Adam Silver pushes back on the instinct to always prefer native HTML elements over custom implementations. While he shares the spirit of using what browsers provide for free, he points out that many native HTML elements deliver terrible user experience.

The catalyst was a post recommending the native `<input type="reset">` button. The problem? Most users never need to reset a form — they fix mistakes and move on. Including a reset button means some users will click it by accident, losing everything they filled out with no undo. And for the use case where reset might seem useful, like clearing filters, `type="reset"` does not actually work — it resets to the form's initial state when the page loaded, not to an empty state.

Adam lists several other native HTML elements that are poor UX: date inputs that are hard to use and inaccessible, the `maxlength` attribute that makes textareas feel broken and silently truncates pasted values, and the `title` attribute that shows tooltips on hover but does not work for keyboard users.

The broader lesson is nuanced. Yes, over-engineering is a real problem and custom code carries cost. But "native" and "good UX" are not synonyms. Some native elements cannot just be scrapped — they need to be replaced with something better.

### Key Takeaways
- Native HTML elements are not automatically good UX
- The `<input type="reset">` button is harmful in practice — users accidentally lose form data
- Date inputs, maxlength, and title attributes all have significant usability problems
- Evaluate native elements on their actual user experience, not their nativeness
- Some native elements need replacement, not just adoption

**Link:** [Native HTML components don't guarantee good UX](https://adamsilver.io/blog/native-html-components-dont-guarantee-good-ux/)
