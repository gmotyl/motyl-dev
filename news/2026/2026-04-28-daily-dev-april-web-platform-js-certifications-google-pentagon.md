---
title: "New Web Platform Features, JS Certifications, and Google's Pentagon Dilemma"
excerpt: "A roundup covering Chrome and Firefox's new web platform features, JavaScript certifications for career growth, church projection software, Google's classified AI controversy, and vibe coding best practices."
publishedAt: "2026-04-28"
slug: "daily-dev-april-web-platform-js-certifications-google-pentagon"
hashtags: "#dailydev #frontend #css #javascript #react #ai #google #ethical-ai #testing #generated #en"
source_pattern: "daily.dev"
---

## New to the web platform in April

**TLDR:** Chrome 147 and Firefox 150 shipped in April 2026, bringing several new web platform features to Baseline including the contrast-color() CSS function, scroll-driven animation ranges, and ariaNotify() for screen reader announcements.

**Summary:** The latest browser releases have delivered some genuinely useful additions to the web platform. The contrast-color() function is particularly noteworthy because it solves a real accessibility problem - it returns either black or white depending on which provides maximum contrast against a given background color. This means developers can now dynamically choose text colors that meet WCAG contrast requirements without manually calculating ratios.

Scroll-driven animations have also reached Baseline, which is a big deal for anyone building rich scrolling interactions. Instead of relying on JavaScript to drive animations based on scroll position, you can now do this entirely in CSS. The scroll-driven animation range properties let you control exactly when animations start and stop relative to scroll position.

Firefox also implemented the ariaNotify() method, which allows developers to announce content changes to screen readers without moving focus. This is huge for single-page applications where you want to notify users about updates without interrupting their workflow.

Beta releases are previewing some exciting features too. Name-only container queries are coming in Chrome 148 and Firefox 151, which will finally let you create responsive components without needing inline size constraints. Container style queries are also in beta, allowing CSS to respond to custom properties set on parent containers.

**Key takeaways:**
- contrast-color() is now Baseline and returns black or white for maximum contrast
- Scroll-driven animations no longer need JavaScript
- ariaNotify() enables focus-free announcements to screen readers
- Container queries will support name-only syntax in upcoming releases

**Why do I care:** As someone who builds web applications, these features will gradually become standard tools in my toolkit. The contrast-color() function alone will reduce accessibility-related support tickets. Container queries arriving in beta means I should start thinking about component architectures that don't require inline constraints. These are practical improvements, not theoretical ones.

**Link:** [New to the web platform in April](https://app.daily.dev/posts/CrM1I78TM)

## The best JavaScript certifications for getting hired

**TLDR:** JavaScript certifications can serve as a credibility anchor in hiring pipelines, especially for early-career developers, but strong portfolios with real projects still outweigh certifications in most hiring decisions.

**Summary:** JavaScript remains the most in-demand programming language, and certifications have existed in various forms for years. The landscape includes options like the CIW JavaScript Specialist, FreeCodeCamp's JS Algorithms and Data Structures certification, W3Schools JavaScript Developer Certificate, and the JS Institute's JSA and JSE certifications.

The reality is more nuanced than the certification marketing suggests. Hiring managers typically view certifications as a secondary signal at best. For early-career developers or those making career switches, a certification can provide initial credibility and structure learning. But for experienced developers, a strong portfolio demonstrating real projects far exceeds any certification's value.

Experts note that certifications matter most in high-volume hiring pipelines where recruiters need quick filters, or in compliance-driven roles where certifications are formally required. For most positions, what you can actually build and demonstrate matters more than what credentials you hold.

The now-retired OpenJS JSNAD was one of the more respected options, and Certificates.dev offers a Senior JavaScript Developer certification for those seeking something more rigorous. But ultimately, the industry values demonstrated ability over credentials.

**Key takeaways:**
- Certifications work best as credibility anchors for early-career developers
- Strong portfolios outweigh certifications in most hiring decisions
- FreeCodeCamp offers solid free options for structured learning
- Most hiring managers treat certifications as secondary signals

**Why do I care:** I've hired developers before, and I can confirm that what people can actually build speaks louder than what certifications they hold. A certification might get your resume past an ATS filter, but it'll be the portfolio that gets you the interview. If you're considering certification, treat it as structured learning, not a golden ticket.

**Link:** [The best JavaScript certifications for getting hired](https://app.daily.dev/posts/Fc3kCIhgy)

## 580+ Google employees urge Pichai to refuse classified Pentagon AI deal

**TLDR:** Over 580 Google employees, including DeepMind researchers, have signed a letter urging CEO Sundar Pichai to reject classified military AI work, citing concerns about losing oversight of AI tools deployed on air-gapped networks.

**Summary:** This situation mirrors Google's 2018 Project Maven protest, but with significantly higher stakes. Google has since deployed Gemini to 3 million Pentagon personnel and removed weapons language from its AI principles. The company is now negotiating "all lawful uses" classified access, which would expand military AI capabilities dramatically.

The core issue is oversight. When AI systems are deployed on air-gapped classified networks, Google loses all ability to monitor or limit how those tools are used. The Pentagon's assurances become the only guardrail against autonomous weapons or mass surveillance applications.

The Pentagon's AI budget has surged to $54.6 billion for FY2027, and the current administration has shown willingness to blacklist companies like Anthropic that resist unconstrained military use. The petition's signatories include over 20 directors and senior DeepMind researchers, representing unusual seniority for internal dissent.

The gap between internal ethics concerns and corporate decision-making has widened significantly since 2018. This time, the company's AI principles no longer provide any language to resist military applications.

**Key takeaways:**
- 580+ employees, including DeepMind researchers, signed the petition
- Air-gapped networks remove all oversight over AI tool usage
- Pentagon AI budget reached $54.6 billion for FY2027
- Company has removed weapons language from AI principles since 2018

**Why do I care:** This is primarily a business and ethics story, but developers should be aware because the tools we build may end up in contexts we never intended. There's a difference between building technology and controlling its use. Companies need to set clearer boundaries, and employees need to understand what they're actually building.

**Link:** [580+ Google employees urge Pichai](https://app.daily.dev/posts/KlSGnKdEy)

## Vibing, Harness and OODA loop

**TLDR:** LLMs accelerate the Act phase of development but don't speed up Observation. Building proper test harnesses and automated feedback mechanisms is essential for sustainable fast iteration.

**Summary:** Vibe coding and LLM-assisted development have become mainstream, but they mirror an old problem. Skipping the Observe and Orient phases creates an illusion of speed while accumulating technical debt. The OODA loop - Observe, Orient, Decide, Act - provides a useful framework for understanding where LLMs help and where they don't.

LLMs are excellent at accelerating the Act phase. They can generate code quickly, refactor existing code, and produce functional implementations. But they don't help with Observation - understanding what's actually happening in your system, identifying edge cases, or building proper verification.

The practical example shown involves adding OpenTelemetry observability to the Emmett framework. The author uses Node.js native test tools, execa, and Docker Compose to build a reproducible, automated verification harness. This allows teams to iterate quickly while maintaining confidence that the system works correctly.

The core message is that fast iteration only works sustainably when paired with automated feedback mechanisms. Without a harness, you're generating unverified output faster. The quality of your feedback loop determines the ceiling of your iteration speed.

**Key takeaways:**
- LLMs accelerate Act but not Observe or Orient phases
- Test harnesses provide automated feedback loops
- OpenTelemetry enables observability but needs verification
- Sustainable speed requires proper feedback mechanisms

**Why do I care:** I've seen teams burn out chasing velocity that wasn't sustainable. The allure of fast generation is seductive until you realize you've built something unmaintainable. A proper harness isn't bureaucracy - it's enabling faster iteration without crashing.

**Link:** [Vibing, Harness and OODA loop](https://app.daily.dev/posts/fLVUSMhCC)