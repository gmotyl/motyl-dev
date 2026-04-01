---
title: "Site Search, AI Design Decisions, and CSS Deep Dives"
excerpt: "A roundup covering why internal site search keeps losing to Google, how GenUI differs from vibe coding, Stripe's adaptive pricing results, sneaky accessibility wins, and modern CSS techniques for lists and sprites."
publishedAt: "2026-04-01"
slug: "site-search-ai-design-css-unicorn-club-2026-04-01"
hashtags: "#unicornclub #startup #product #frontend #css #ai #ux #design #accessibility #engineering #javascript #generated #en"
source_pattern: "Unicorn Club"
---

## The Site-Search Paradox: Why The Big Box Always Wins

**TLDR:** Internal site search consistently loses to Google because it demands users speak the company's language rather than their own. The fix is less about algorithms and more about empathetic information architecture. This piece walks through a practical audit framework for reclaiming your search box.

**Summary:** Here's something that should bother every product person: your users are leaving your site, going to Google, typing "site:yourwebsite.com" followed by their query, and finding what they need. The internal search you built failed them. I keep thinking about this because it's so avoidable, and yet it's everywhere.

The author calls the root cause the "Syntax Tax" — that invisible cognitive toll you charge users when you force them to guess the exact vocabulary your database uses. A furniture site that categorizes everything as "couches" but whose customers search for "sofa" is charging that tax. The user doesn't conclude they used the wrong word. They conclude the site doesn't have what they want, and they leave. Baymard Institute data suggests 41% of e-commerce sites can't even handle basic plurals or abbreviations, which means millions of searches dead-ending unnecessarily every day.

What makes Google win isn't raw engineering firepower. It's contextual understanding. Stemming, lemmatization, semantic matching — these are information architecture techniques before they're engineering ones. The good news is you don't need Google's infrastructure to implement them. A financial institution in this piece was hemorrhaging support calls because users searched "loan payoff" while the IA team had labeled everything "Loan Release." Adding a hidden metadata keyword solved what amounted to a multi-million dollar support problem. No new server, no ML model — just an empathetic taxonomy.

The article proposes a four-phase audit: pull your zero-result queries from the last 90 days and bucket them into true gaps, synonym gaps, and format gaps; map query intent to distinguish navigational from informational from transactional searches; run a fuzzy matching test by intentionally misspelling your top products; and audit whether your filters actually make sense given the query context. This is solid, practical stuff.

What I'd push back on is the implied assumption that this is primarily a technical problem waiting for a technical solution. The harder work is the organizational one. The "curse of knowledge" the author describes — teams so immersed in corporate vocabulary they forget users don't speak it — doesn't get fixed by a semantic search engine upgrade. It gets fixed by regularly reading your search logs and treating them as a direct line to what your customers actually want. That discipline is rarer than you'd think.

The article also takes a firm stance against Google-powered search bars on business sites. I agree. Delegating your search to Google means you surrender your ability to promote specific content, you expose users to third-party ads, and you train customers to leave your ecosystem whenever they need help. For a business, search should be a curated conversation, not a redirect to the open web.

**Key takeaways:**
- Roughly 50% of users head straight to the search bar on landing; failing them once often means losing them permanently
- The "Syntax Tax" is the gap between your internal vocabulary and how customers actually talk about what they want
- Search logs are one of the most underutilized resources in UX — they tell you exactly what users want in their own words
- "Did you mean?" states and fuzzy matching matter more than a polished no-results page
- Google-powered search on business sites is an admission of organizational failure, not a technical solution

**Why do I care:** From a frontend architecture perspective, this is a reminder that the search experience is a system — not a component. How you structure metadata, how your CMS exposes content, how your design system surfaces results — it all compounds. Building a great search result UI on top of a broken information architecture is like optimizing the wrong function. The audit framework here is worth running even if you're not the one who controls the search engine; it generates the evidence you need to make the case to whoever does.

**Link:** [The Site-Search Paradox: Why The Big Box Always Wins](https://www.smashingmagazine.com/2026/03/site-search-paradox-why-big-box-always-wins/)

---

## GenUI vs. Vibe Coding: Who's Designing?

**TLDR:** Vibe coding and generative UI are not the same thing — the distinction is who decides to create the interface. When the user asks for it, that's vibe coding. When the AI decides an interactive element would serve better than text, that's GenUI. The difference matters enormously for how we evaluate quality and assign accountability.

**Summary:** Andrej Karpathy coined "vibe coding" in early 2025, and since then the term has been used to describe everything from fully AI-generated apps to any development that involves an LLM. Nielsen Norman Group is doing the useful work of drawing a sharper line, and I think it's a distinction worth sitting with.

The core question is: who made the decision to create a user interface? If a user types "build me a London trip planner app" and the AI builds it, that's vibe coding — the user initiated and directed the construction, and the AI's job is execution. If a user asks "help me plan my trip" and the AI responds not with text but with an interactive itinerary widget, that's generative UI — the system decided, unprompted, that an interface was the right response. Same underlying technology. Entirely different accountability structure.

The vibe coding spectrum is interesting. A vague prompt like "build me a trip planner" leaves enormous latitude for the AI to make structural and strategic choices. A detailed prompt that specifies a three-column layout with a Mapbox integration, drag-and-drop itinerary items, and local storage persistence is really a designer executing a vision through a new medium. Most people can't and wouldn't write that second prompt, which is exactly the article's key insight about GenUI's potential: it serves users who wouldn't know to ask for an interface in the first place.

I keep coming back to the article's pushback on "build your own everything" vibe-coding enthusiasm. The institutional knowledge baked into mature software products — from years of user research, iterative refinement, observing behavior across thousands of organizational contexts — isn't something an ad hoc prompt replicates. Every team vibing its own Slack replacement isn't agile, it's wasteful. The real value of dedicated software often comes from design maturity that took years to accumulate.

The failure modes section is the sharpest part of the piece. Vibe coding fails when execution doesn't match intent — broken features, misinterpreted layouts. GenUI fails when judgment is poor — the wrong element was generated, or it shouldn't have been generated at all. An unsolicited interactive dashboard nobody needed is a design failure even if it renders flawlessly. These are fundamentally different problems requiring different evaluation methods. GenUI needs to be tested like traditional UI: user research, task completion metrics, satisfaction signals — not just "did it render."

What the article tactfully avoids saying directly is that current GenUI output is mostly generic and visually incoherent. Random layout choices, content errors, complexity without purpose. The promise of invisible AI — where the system adapts interfaces based on behavior without the user noticing — is genuinely exciting. But we're not there yet, and pretending otherwise does a disservice to the evaluation discipline we actually need right now.

**Key takeaways:**
- GenUI: AI decides to create an interface. Vibe coding: user asks for one. The distinction determines what the AI is accountable for
- Most users can't articulate what interface they want — GenUI serves them; vibe coding serves people who can think in terms of apps and interaction patterns
- Current GenUI tends to produce generic outputs; its success will be measured by design judgment, not rendering quality
- Vibe coding and GenUI fail in different ways and require different evaluation frameworks
- Invisible AI — unannounced interface adaptation based on behavior — is where GenUI's real potential lives

**Why do I care:** This taxonomy matters for anyone building AI-powered products. If you're designing a system where the AI makes UI decisions, you own the design quality of those decisions — not just the execution. That's a different design burden than traditional product work, and it demands different research infrastructure. The question "was this the right interface to generate?" is harder to answer than "does this match the spec?" and we should be building the tooling to answer it.

**Link:** [GenUI vs. Vibe Coding: Who's Designing?](https://www.nngroup.com/articles/genui-vs-vibe/)

---

## Testing the Impact of Adaptive Pricing Across 1.5M Subscription Checkout Sessions

**TLDR:** Stripe tested localized currency pricing across 1.5 million subscription checkout sessions and found a 4.7% increase in conversion rate and a 5.4% increase in lifetime value per session. Charging customers in their own currency turns out to matter more than most subscription businesses assume.

**Summary:** The headline number here is clean and concrete: showing customers prices in their local currency increased subscription conversion by 4.7% on average. For subscription businesses, that's not a rounding error. That's compounding revenue over the lifetime of every subscriber.

Stripe's Adaptive Pricing handles the operational complexity that has historically made currency localization painful for subscription businesses — FX risk, renewal consistency, accounting reconciliation. The stability buffer is a smart design choice: a Brazilian customer who signs up at R$49.60/month continues to see R$49.60 each month rather than a fluctuating amount tied to USD exchange rates. That predictability is worth something psychologically for recurring purchases in a way it isn't for one-time transactions.

The authorization rate improvement of 1.9% is arguably more interesting than the conversion number. Cross-border transactions fail at higher rates because card issuers flag them differently. Presenting and charging in a customer's local currency removes a friction point that most businesses don't even know exists in their funnel. You can have a beautifully designed checkout that a customer completes willingly, and still lose the sale at the payment processing layer because the issuing bank flagged it.

The retention data is where the long-term argument gets made. Customers who paid in their local currency showed higher retention across the first three months. Runway saw a 14% increase in LTV per session and 17.7% more LTV per subscription. These are not marginal gains. They suggest that currency mismatch isn't just a checkout friction problem — it may erode the ongoing trust that keeps subscribers renewing month after month.

What the article doesn't explore is whether these gains are uniform across markets or concentrated in specific regions where cross-border payment friction is highest. The "on average across sessions" framing smooths over what might be dramatic variation. A startup entering Brazil or India is probably seeing outsized impact. A US company with mostly European customers might see more modest returns. The "results varied across businesses, with some seeing increases of more than 30%" line does the work of acknowledging this, but a breakdown by region would have been genuinely useful.

**Key takeaways:**
- 4.7% conversion lift and 5.4% LTV lift per session from showing local currency pricing
- Authorization rates improved 1.9% — cross-border declines are an invisible revenue leak many businesses don't track
- Renewal consistency matters: customers seeing the same local price each cycle retain better than those seeing fluctuating converted amounts
- 80% of subscription transactions in 2025 were still priced in the business's default currency — significant room for improvement
- The operational burden of FX infrastructure, localized price lists, and renewal logic is what historically blocked localization at scale

**Why do I care:** If you're building or advising subscription products with any international audience, this data should immediately prompt a conversation about your checkout flow. The frontend implications are real — displaying the right currency, handling the UX around pricing transparency, and making sure renewal communications match what customers see at signup. The engineering complexity Stripe is absorbing here used to fall on product teams, and most just didn't do it. Now there's less excuse.

**Link:** [Testing the impact of Adaptive Pricing across 1.5M subscription checkout sessions](https://stripe.com/blog/adaptive-pricing-for-subscriptions)

---

## Applying Accessibility Fixes with Stealth for the Greater Good

**TLDR:** When organizational culture actively resists accessibility work, front-end developers can still make meaningful progress by finding allies, understanding how power flows through their organization, and taking on different "roles" depending on where they sit in a project's lifecycle. This piece is less a technical guide and more a survival manual.

**Summary:** This article deserves to be read by anyone who has ever tried to improve accessibility in a workplace that didn't ask for it. The author is candid about something most accessibility writing sidesteps: the organizational and cultural resistance is often the harder problem, and it's rooted in ableism — not ignorance, not budget constraints, not technical complexity.

The framing around the medical model versus the social model of disability is worth pausing on. The medical model treats disability as a property of the person, so barriers exist because disabled people are using the product. The social model recognizes that barriers are created by design choices, attitudes, and exclusion. The difference isn't academic — it determines whether your team frames an accessibility problem as "we need to accommodate these users" or "we created an obstacle and we need to remove it." Most tech teams, often unknowingly, operate from the medical model.

The practical content in the second half is solid. The author describes four roles an accessibility-minded developer can play depending on their position in the project lifecycle. The Adviser shapes decisions before they're made. The Mediator works at the handoff point between design and development. The Smuggler is my favorite — borrowing budget or time from related work like SEO or performance to fix accessibility issues without making them a formal line item. The Hacker operates at the code level, integrating linters and pre-commit hooks to catch problems before they ship. These aren't mutually exclusive, and a developer who can move between them fluidly is genuinely valuable.

The ally-finding section is honest about its own limitations — the author admits there's no universal playbook because it depends too much on individual personality, organizational climate, and luck. What they offer instead is a useful distinction between organizational culture (formal, driven by leadership) and organizational climate (informal, the actual day-to-day vibe). Culture can push down on climate, but climate can push up on culture. Finding even one or two colleagues who care is enough to start shifting the climate, even when culture is hostile.

What I think the article avoids thinking about directly is the psychological cost of this kind of work. Being "the accessibility person" who operates in stealth, documents problems that sit in backlogs forever, and advocates against institutional indifference is exhausting. The piece mentions it briefly — "reduce the potential psychological pressure" — but that pressure is real and it compounds. The call to action at the end ("the most important tool is the community you have around you") is correct, but building that community takes years when you're starting from zero.

**Key takeaways:**
- The medical model of disability frames barriers as a user problem; the social model frames them as a design problem — which framing your team uses determines everything
- Zero-result accessibility work can still accumulate through stealth fixes during related work (SEO, performance audits, code reviews)
- Understanding cultural vs. climate dynamics in your organization helps you find the right lever points for change
- Automated accessibility tests catch maybe 30-40% of issues; a high Lighthouse score is not a guarantee of real accessibility
- The adviser, mediator, smuggler, and hacker roles give developers a vocabulary for how they can contribute depending on project stage

**Why do I care:** Accessibility in component libraries and design systems is one of those things that either gets baked in at the foundation or retrofitted at enormous cost later. As someone who thinks about architecture, the "smuggler" and "hacker" roles in this piece align closely with how I'd approach this: treat accessibility as a quality constraint, not a feature, and make it structurally impossible to skip by embedding it into the definition of done and the CI pipeline. The organizational piece is harder, but the technical infrastructure creates the conditions for cultural change.

**Link:** [Applying accessibility fixes with stealth for the greater good](https://piccalil.li/blog/applying-accessibility-fixes-with-stealth-for-the-greater-good/)

---

## When All You Can Do Is All or Nothing, Do Nothing

**TLDR:** When a design system or CMS can't determine whether an image is above or below the fold, the safest choice for performance attributes like lazy loading and fetch priority is to omit them entirely. Incorrect hints are worse than no hints.

**Summary:** This is a short, precise piece of advice from Harry Roberts, and it's the kind of thing I wish someone had written down for me years ago. The argument is elegant: browser performance hints like lazy loading and fetch priority only help when they're specific and contextual. Apply them indiscriminately and you've added noise, not signal.

The scenario he's working from is a design system sitting on top of a permissive CMS where editors have significant layout freedom. The system doesn't know whether a card component will render as a hero above the fold or in a grid halfway down the page. In that situation, hardcoding lazy loading into the component is a gamble — if the image is an LCP candidate, you've actively degraded the page's most important performance metric by delaying its load. Similarly, marking multiple images as high priority cancels them all out, since the browser's prioritization logic depends on signals being meaningful and selective.

The counterintuitive insight is that browser defaults are actually quite good. Browsers have heuristics for image prioritization. They're not perfect, but "slightly suboptimal" is a much better outcome than "actively wrong." Leaving a small performance gain on the table by not lazy-loading a below-fold image costs you almost nothing. Lazy-loading an LCP candidate costs you real, measurable Largest Contentful Paint regression.

Roberts frames this with a clear decision rule: if your system has enough context to be certain, use the hints precisely. If it doesn't, use them nowhere. The middle path — guessing — is the dangerous one. This is a genuine lesson in system design beyond just web performance: tools that require context to be useful should not be deployed without that context, even if the intent is good.

What the article doesn't address is the intermediate case where you do have partial context — say, you know the first image in a component will always be visible but subsequent ones may not be. That's a common real-world scenario where the answer requires more nuance than "do nothing." But the core principle holds, and for the many teams who've cargo-culted lazy loading onto every image "for performance," this is a necessary correction.

**Key takeaways:**
- Lazy loading and fetch priority are contextual hints, not performance magic — they require knowledge of where content renders
- When a design system can't determine an image's position, omitting hints is safer than guessing wrong
- Lazy-loading an LCP candidate is an active performance regression, worse than not using the attribute at all
- Marking multiple images as high priority neutralizes the hint entirely
- Browser defaults are a reasonable fallback — they're not optimal but they're not harmful

**Why do I care:** This directly affects how component libraries should handle image attributes. The temptation to bake in "best practice" settings at the component level is understandable, but it assumes a context the component can't have. The right architecture is to make these attributes configurable inputs that consumers supply with actual context, not defaults the system guesses at. Roberts's advice maps cleanly onto the principle that components should be ignorant of their deployment context by default.

**Link:** [When All You Can Do Is All or Nothing, Do Nothing](https://csswizardry.com/2026/03/when-all-you-can-do-is-all-or-nothing-do-nothing/)

---

## What's New on the Web Platform — March 2026

**TLDR:** Chrome 146, Firefox 149, and Safari 26.4 all shipped in March, bringing scroll-driven animations, optional container query conditions, masonry layout, and several JavaScript iterator improvements to stable browsers. The platform keeps moving.

**Summary:** March was a genuinely good month for browser feature parity. Three major releases landed with meaningful additions, and several long-awaited capabilities crossed the threshold into stable support.

Chrome 146's scroll-driven animations are the headline feature. The ability to control animations based on scroll position declaratively in CSS, with the work offloaded to a worker thread, is significant for performance-conscious animation work. Moving scroll-linked effects off the main thread has been a pain point for years — the alternative was JavaScript scroll listeners that blocked rendering. CSS-based scroll animations change the calculus entirely. Alongside this, Chrome 146 ships the trigger-scope property, which limits the visibility of animation trigger names and prevents global name conflicts — a thoughtful solution to a predictable composability problem.

Firefox 149 adds popover hint support, which is a smaller but useful addition. Hint popovers don't dismiss auto popovers when shown, giving more granular control over popover layering — useful for tooltip-like patterns that need to coexist with modal-style popovers. Firefox 149 also ships the CloseWatcher interface, enabling custom components to respond to native device close gestures like Escape on desktop or the back button on Android, aligning custom UI with platform conventions without JavaScript hacks.

Safari 26.4 brings masonry layout via display: grid-lanes, which has been discussed in CSS working groups for years and has finally landed somewhere stable. It also adds optional container query conditions — querying containers by name without requiring size or style constraints — and math functions in the sizes attribute for images. That last one sounds minor but it's genuinely useful for responsive image loading where you want to express sizes as calculations rather than fixed values.

On the beta front, Chrome 147 introduces contrast-color(), which returns black or white based on which offers better contrast against a given color. This is a real accessibility utility baked directly into CSS. Firefox 150 beta adds revert-rule for cascading control and light-dark() for images.

The pace here is worth appreciating. Container queries, scroll animations, masonry, popover control, CloseWatcher — these were either missing or fragmented across browsers for years. The convergence in March 2026 represents genuine platform maturity.

**Key takeaways:**
- Scroll-driven animations land in Chrome 146 with off-main-thread performance — a long-awaited capability for scroll-linked effects
- Safari 26.4 ships masonry layout (display: grid-lanes) and optional container query conditions
- Firefox 149 adds CloseWatcher, enabling custom components to respond to native device close gestures
- Chrome 147 beta introduces contrast-color(), a CSS function that returns black or white based on contrast — built-in accessibility tooling
- Math functions in the sizes attribute now work in Safari, improving responsive image sizing expressiveness

**Why do I care:** The scroll-driven animations specification in particular opens up interaction patterns that were previously either JavaScript-heavy or simply impractical. From a design systems perspective, being able to implement scroll-triggered animations as CSS declarations means they're portable, composable, and don't require JavaScript initialization. The trigger-scope addition is the kind of thoughtful scoping mechanism that prevents design system conflicts at scale. March moved the platform forward in several places that matter.

**Link:** [What's New on the Web Platform — March 2026](https://web.dev/blog/web-platform-03-2026)

---

## Design Debt Is Now as Dangerous as Technical Debt

**TLDR:** Design debt accumulates silently, lacks the tracking infrastructure technical debt has, and becomes especially dangerous in AI products where poor interface decisions shape what users believe rather than just how they interact. The author argues design decisions need the same organizational rigor as engineering audits.

**Summary:** Technical debt has a vocabulary, tooling, and established processes for tracking and remediation. Design debt has none of these things, and yet it compounds just as relentlessly. This piece names something I've observed for years and rarely seen articulated clearly.

The framing I find most useful here is the concept of "reciprocal awareness" in design — the idea that in a coherent product, every element is conscious of the elements around it. The navigation understands the CTA. The CTA understands the content below it. When you start optimizing locally, running experiments piecemeal, patching flows without rethinking adjacent ones, that coherence erodes. Individual decisions are defensible. The accumulated drift is indefensible and largely invisible to the data you're tracking.

AI products make this worse in a specific way. In a traditional product, design decisions affect how easy the product is to use. In an AI product, they affect what users believe. Presenting a probabilistic output as a definitive answer because someone decided the UX would be "cleaner" without uncertainty markers isn't a cosmetic choice — it trains users to make decisions based on false certainty. Burying feedback mechanisms because they add friction means the model never gets corrected. The interface isn't just a skin on the product; it's shaping the epistemic relationship between the user and the AI system.

The ownerless syndrome is real and worth naming. AI products are assembled across teams, each owning a slice, none owning the whole. Problems appear at the seams. Iteration slows because changing one pattern requires auditing a chain of others. Bias accumulates through decisions about what gets surfaced and what stays hidden, made by people who've since moved on. The author's suggestion — treat design decisions with the rigor of engineering audits, make design leadership present when those decisions happen — is correct, if somewhat easier to prescribe than to operationalize.

The exercise at the end is genuinely worth doing: pick an AI feature shipped several months ago and walk through it as a first-time user. The drift from original intent is almost always visible, and almost never captured in your dashboards. Your metrics track engagement, not comprehension. That gap is where design debt lives.

**Key takeaways:**
- Design debt has no equivalent tracking infrastructure to technical debt despite accumulating on the same timeline
- In AI products, design debt affects user beliefs and trust, not just usability — the stakes are higher
- "Ownerless syndrome" in multi-team AI products means drift accumulates at the seams between teams with no clear accountability
- Dashboards track engagement and don't capture comprehension drift — you have to look at products from a first-time user perspective
- Addressing design debt requires executive-level commitment; it can't be solved at the component or team level alone

**Why do I care:** Design systems are one of the few organizational mechanisms that can enforce coherent design decisions at scale. When design debt accumulates in a design system — inconsistent component semantics, conflicting patterns, undocumented overrides — it propagates everywhere that system is used. The argument in this piece for treating design decisions with engineering rigor maps directly onto the case for investing in design system governance, not just design system tooling.

**Link:** [Design debt is now as dangerous as technical debt](https://uxdesign.cc/design-debt-is-now-as-dangerous-as-technical-debt-4b4166b9bc63)

---

## Grammarly Shows How Prototyping Turned Into an Excuse for Not Thinking

**TLDR:** Grammarly's AI impersonation feature — pulled after a week of backlash and a class action lawsuit — is a case study in what happens when teams optimize for velocity without direction. The author argues vibe prototyping tools are actively undermining designers' ability to think before they build.

**Summary:** The Grammarly story is well-chosen as a lens for the broader argument here. The company added a feature that created AI impersonations of famous writers without their permission, faced immediate and intense backlash, pulled it within a week, and then the CEO gave an interview that — when read carefully — reveals a culture where features are conceived and shipped without meaningful critical evaluation. The CEO was comfortable calling it a mistake in retrospect. The question the author asks is why that critical thinking didn't happen before it shipped.

The concept the piece turns on is the distinction between empowerment and direction. Lara Hogan's framing is useful: empowerment is appropriate in low-stakes exploration contexts; direction is what teams need under time pressure or when risk is involved. The AI coding tool conversation is almost entirely about empowerment — you can move faster, ship more, do more — with virtually no accompanying clarity about where to move or what "more" should accomplish. Teams are being told to run faster without being told where to run.

The "code as credence good" argument is the sharpest thing in the piece. A credence good is something whose quality isn't apparent at the moment of delivery — you can't evaluate it without extended use or specialized knowledge. The example is legal advice: you often can't tell if it was good advice until much later, and sometimes not even then. Code increasingly has this property when generated at scale: it can pass unit tests, look correct, and still be wrong in ways that only surface when embedded in a real decision or workflow. This is why measuring engineering output in lines of code or pull requests is not just unhelpful — it's misleading.

The section on vibe prototyping cuts close. The argument isn't that code is the wrong design material — it's that using it as the first and only design material skips the theory-building that gives code its meaning. If you don't know what you're trying to learn when you ship a prototype, you shouldn't be shipping a prototype. Having an LLM generate code immediately collapses the distance between "I had an idea" and "it's in production," which feels like acceleration but is actually the removal of the thinking time that determines whether the idea was worth having.

What the article doesn't fully grapple with is that this isn't a new problem that LLMs created — it's an old problem that LLMs have turbocharged. Ship first, think later was a cultural value in tech well before vibe coding existed. The tools have changed the speed and scale, not the underlying incentive structure.

**Key takeaways:**
- Grammarly's AI writer impersonation feature is an example of shipping without direction — conceiving and building without pausing to evaluate whether it should exist
- Empowerment and direction are opposites: empowerment suits low-stakes exploration; direction is needed under pressure and risk
- Code is increasingly a credence good — quality isn't apparent at delivery and only surfaces later in real-world use
- Vibe prototyping collapses the theory-building phase that gives code meaning; you end up with outputs without understanding what you wanted to learn
- Design's role is to provide direction, not to demonstrate value through velocity metrics

**Why do I care:** The argument that designers abdicate their purpose when they optimize for velocity metrics resonates. Architecture and design work is fundamentally about making decisions that constrain the solution space in productive ways. When we skip to implementation to show measurable output, we're removing the decisions that make implementation meaningful. The Grammarly story is a reminder that the fastest path to "shipped" and the right path to "good" are often not the same road.

**Link:** [Grammarly shows how prototyping turned into an excuse for not thinking](https://productpicnic.beehiiv.com/p/grammarly-shows-how-prototyping-turned-into-an-excuse-for-not-thinking)

---

## An In-Depth Guide to Customising Lists with CSS

**TLDR:** Modern CSS gives you extensive control over list styling through list-style-type, the marker pseudo-element, the symbols() function, the @counter-style rule, and custom pseudo-elements. Browser support is mostly good but has specific gaps worth knowing before you reach for a given technique.

**Summary:** Lists are one of those HTML elements where the gap between "what browsers give you by default" and "what designers actually want" has historically required a lot of ugly workarounds. This guide is comprehensive and current, and it's the kind of reference I'd bookmark and return to.

The progression from basic to advanced is well-structured. At the simple end, list-style-type covers the usual suspects — disc, circle, square, custom Unicode characters, images. The marker pseudo-element opened up direct styling of bullets and numbers in a meaningful way, though the styling options remain limited: you can change color and font properties, but not positioning or layout. That limitation is frustrating when you want to make markers significantly larger than the list text, because they'll always align to the baseline of the first line — and you can't fix that with positioning properties.

The @counter-style rule is where things get genuinely interesting. It became Baseline Newly Available in September 2023 and has broad browser support now. It lets you define custom sequences of symbols, specify cycling behavior, set prefixes and suffixes, and even define how screen readers should announce the markers. The extend system is elegant — rather than reimplementing decimal counting from scratch, you can extend an existing counter style and override just the suffix. This is good API design.

The full custom marker approach — removing the default marker and building your own with pseudo-elements and counters — gives complete control over positioning and size, but requires explicit ARIA roles because Safari will stop announcing the list to assistive technology when list-style: none is applied. That gotcha trips people up regularly, and the piece addresses it directly.

The symbols() function is worth knowing about but Firefox-only, so @counter-style is the practical cross-browser choice for the same capabilities. Browser support notes throughout the article are accurate and specific, which is more useful than the vague "most browsers" language you often see.

**Key takeaways:**
- The marker pseudo-element supports color and font properties but not positioning — use pseudo-elements for full control
- @counter-style has broad browser support since late 2023 and covers custom sequences, cycling, prefixes, suffixes, and accessibility labels
- Safari stops announcing lists as lists when list-style: none is applied — add role="list" to fix this
- The steps function in keyframe animations for sprites uses jump-none for looping animations, jump-end for non-looping — the distinction matters
- symbols() and @counter-style cover the same capabilities; @counter-style is the cross-browser choice

**Why do I care:** List styling comes up more than you'd think in design system work. Navigation menus, breadcrumbs, step indicators, tag lists — these are often semantically lists even when they don't look like the default bullet lists we associate with the element. Having clear mental models for how to control markers without losing semantic meaning or accessibility is foundational. The @counter-style rule in particular is underused relative to how much it can do.

**Link:** [An in-depth guide to customising lists with CSS](https://piccalil.li/blog/an-in-depth-guide-to-customising-lists-with-css/)

---

## Sprites on the Web

**TLDR:** CSS sprites — displaying individual animation frames from a single image using object-position and the steps() timing function — are a technique worth knowing even in 2026, particularly for pixel-art style animations where procedural generation doesn't fit the aesthetic. Josh Comeau walks through a complete implementation.

**Summary:** The Twitter heart animation from 2015 is a good anchor for this piece. The dev team needed a complex multi-element animation running on low-end mobile devices and reached for a video game technique — sprites — rather than DOM manipulation. The approach: one image containing every animation frame, displayed one at a time using CSS, cycling through them fast enough to create the illusion of motion.

The modern implementation the article demonstrates is clever. Rather than the classic background-position trick from the early 2000s, the approach uses the object-fit and object-position properties on an img element. Setting object-fit to cover makes the img element a window into the spritesheet, and object-position slides which portion of the underlying image is visible. The animation cycles through positions using a keyframe animation.

The critical piece is the steps() timing function. A smooth CSS transition slides between positions gradually, which ruins the frame-by-frame effect. Steps() forces the value to jump between discrete positions — a staircase rather than a ramp. The jump-none parameter is necessary for looping animations: without it, steps() uses jump-end by default, which skips the final frame at the end of each cycle. For non-looping animations, jump-end makes sense because the final keyframe value is applied when the animation expires. For looping sprites, you want every frame to get equal time.

The use case section is honest in a way I appreciate. Comeau explicitly walks back the performance argument that was valid in 2015 — modern devices and browsers handle multiple animating DOM elements well, and procedural animation gives you variation that sprite-based approaches can't. A sprite "Like" button plays the same video every time; procedural particles are different each time. For pixel-art aesthetics and game-style characters, sprites are the right choice. For most other animations, procedural is more expressive.

What the article is really doing, beyond the technical explanation, is demonstrating how game development techniques translate into web contexts. The enormous library of available spritesheets online represents a design resource most web developers never think to reach for. The technique is seldom-used precisely because it's associated with a different medium.

**Key takeaways:**
- Sprites use a single image with all animation frames; object-fit and object-position create the frame-by-frame window effect in CSS
- steps() with jump-none is the correct timing function for looping sprite animations; jump-end (the default) skips the final frame
- Sprites are best suited for pixel-art aesthetics where procedural variation isn't the goal
- Procedural animation is more expressive for most UI animations — sprites replay identically every time
- The enormous library of game spritesheets available online is an underutilized resource for web developers wanting this aesthetic

**Why do I care:** Understanding how the steps() timing function works is useful beyond sprites — it comes up in any animation where you want discrete rather than continuous progression. The object-fit and object-position approach is also a useful mental model for controlled cropping and display of images more generally. And honestly, being able to drop a pixel-art character onto a page for a playful interaction or easter egg is just a fun tool to have in the kit.

**Link:** [Sprites on the Web](https://www.joshwcomeau.com/animation/sprites/)
