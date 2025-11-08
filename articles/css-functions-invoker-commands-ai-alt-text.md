---
title: "CSS Functions, Invoker Commands, and AI-Generated Alt Text: Major Web Platform Advances"
excerpt: "CSS custom functions are coming to browsers, HTML invoker commands ship in Chrome, and practical AI applications for web accessibility emerge."
publishedAt: "2025-03-05"
slug: "css-functions-invoker-commands-ai-alt-text"
hashtags: "#generated #en #css #html #ai #accessibility #chrome #frontend #webdev #functions #alt-text #invoker-commands"
---

## CSS Custom Functions: A Game-Changing Addition to the Web Platform

**TLDR:** CSS is getting custom functions with arguments, default values, and type checking - currently prototyped in Chrome Canary behind experimental flags. This goes far beyond CSS mixins to enable true parameterized styling logic.

**Summary:**

The web platform is about to receive one of its most significant styling enhancements in years. CSS custom functions represent a fundamental shift from simple value substitution to actual computational logic within stylesheets. Unlike Sass mixins which are compile-time text replacement, these functions execute at runtime with proper argument handling and type safety.

The syntax follows CSS conventions with the `@function` at-rule and dashed identifiers. Functions can accept typed parameters with default values and return computed results based on those inputs. For example, a `--negate()` function that takes a value and returns its mathematical inverse, or a custom `--light-dark()` that works with any CSS value type, not just colors like the built-in version.

What makes this particularly powerful is the integration with existing CSS features. Functions can contain media queries, allowing them to return different values based on viewport conditions or user preferences. They support type checking through syntax descriptors, enabling better error handling and IDE support. The implementation also works with custom properties and CSS calculations, creating a cohesive system for dynamic styling.

For development teams, this opens entirely new approaches to design systems and component libraries. Instead of maintaining separate utility classes for every variation, teams can create parameterized functions that generate appropriate styles based on context. The performance implications are also significant - computations happen in the browser's optimized CSS engine rather than requiring JavaScript intervention.

However, the current Chrome Canary implementation is incomplete and experimental. There's no shipping timeline, and the specification is still evolving. The real test will be how other browser vendors respond and whether the feature maintains performance at scale.

**Key takeaways:**
- CSS functions enable runtime parameterization with arguments, defaults, and type checking
- Functions can contain media queries and integrate with existing CSS features
- This goes far beyond preprocessor capabilities by executing in the browser's CSS engine
- Currently experimental in Chrome Canary with no confirmed shipping date

**Tradeoffs:**
- Gain powerful runtime styling logic but sacrifice simplicity of static CSS
- Enable complex design systems but increase cognitive overhead for developers
- Provide type safety and better tooling but require learning new syntax patterns

**Link:** [Functions in CSS?! | CSS-Tricks](https://css-tricks.com/functions-in-css/)

## HTML Invoker Commands: Native Declarative Interactions Ship to Browsers

**TLDR:** The `command` and `commandfor` attributes enable declarative interactions like opening dialogs without JavaScript. Chrome has shipped support, with Firefox following soon.

**Summary:**

After years of developers reaching for JavaScript to handle basic UI interactions, HTML is finally getting native declarative commands. The invoker commands specification introduces two new attributes that fundamentally change how we think about interactive elements on the web.

The `commandfor` attribute identifies the target element, while `command` specifies the action to perform. A button with `commandfor="my-dialog"` and `command="showModal"` will open that dialog when clicked - no JavaScript required. The browser handles the interaction, event dispatching, and state management automatically.

The event model is particularly sophisticated. When a command button is activated, the browser first dispatches the normal click event. If that's not prevented, it then dispatches a `command` event on the target element. This allows developers to intercept and customize behavior while maintaining the declarative benefits for common cases.

Browser support is rolling out rapidly. Chrome has shipped the feature, Firefox has implemented it, and Safari has it in Technology Preview. The specification was literally merged on the day of the conference talk referenced in the newsletter, showing how quickly standards can move when there's broad consensus.

For web applications, this represents a significant reduction in boilerplate code. Common patterns like modal dialogs, disclosure widgets, and form interactions can now be handled declaratively. This improves accessibility by default, reduces bundle sizes, and makes interfaces more resilient to JavaScript failures.

The feature also integrates well with existing HTML semantics. Commands work with form submission, keyboard navigation, and screen reader announcements without additional configuration. For teams building component libraries, this provides a solid foundation for interactive elements that work consistently across different frameworks and implementations.

**Key takeaways:**
- Declarative HTML commands eliminate JavaScript boilerplate for common interactions
- Sophisticated event model allows customization while maintaining declarative benefits
- Broad browser support is arriving rapidly across Chrome, Firefox, and Safari
- Improves accessibility and reduces dependency on JavaScript for basic UI patterns

**Link:** [Everything you need to know about Invoker Commands | London Web Standards](https://londonwebstandards.org/talks/everything-you-need-to-know-about-invoker-commands/)

## Redefining "Web Page" for Modern Multi-Context Applications

**TLDR:** WCAG 3 is considering replacing "web page" with "view" as the unit of conformance to better accommodate native apps, XR environments, and embedded web content.

**Summary:**

The web has evolved far beyond traditional page-based navigation, but our accessibility standards haven't kept pace. The current WCAG definition of "web page" as "a non-embedded resource obtained from a single URI" works perfectly for traditional websites but breaks down when applied to single-page applications, native apps with embedded web content, or extended reality environments.

This definitional challenge isn't just academic - it has real consequences for accessibility compliance and testing. Sixteen success criteria in WCAG 2.2 explicitly reference "web pages," creating confusion when evaluating modern applications that don't fit the traditional page model. How do you assess "consistent navigation" in a native app? What constitutes a "page title" in a VR environment?

The proposed solution is to adopt "view" as a more flexible unit of conformance. A view could be a traditional web page, a screen in a native application, a modal dialog, or a spatial interface in virtual reality. This abstraction maintains the practical benefits of having a clear boundary for accessibility evaluation while accommodating the diverse contexts where web technologies now operate.

However, this flexibility comes with a cost. The current "web page" definition is unambiguous - two evaluators will always agree on page boundaries. Views, by necessity, will be more subjective. What one person considers a single view, another might see as multiple related views. This ambiguity could complicate compliance claims and audit processes.

The change also reflects a broader shift in how we think about web technology. As HTML, CSS, and JavaScript become the foundation for applications across platforms, accessibility standards must evolve to remain relevant. The success of this transition will depend on providing clear guidance for drawing view boundaries in different contexts.

**Key takeaways:**
- Current WCAG "web page" definition doesn't fit modern applications and multi-platform contexts
- "View" offers flexibility for native apps, SPAs, and XR environments
- Change would affect sixteen success criteria and evaluation methodologies
- Trade-off between broader applicability and definitional clarity

**Link:** [Views on views](https://hidde.blog/views/)

## AI-Powered Alt Text Generation: Practical Accessibility at Scale

**TLDR:** After testing 12 LLMs on 9,000 images, cloud models like GPT-4 and Claude significantly outperformed local alternatives and often generated better alt text than human authors, completing the task for under $50.

**Summary:**

The accessibility backlog problem is real and massive. Websites with thousands of images lacking alt text represent a significant barrier for users who depend on screen readers. Traditional approaches of manual alt text creation simply don't scale, but recent advances in multimodal AI models are changing the economics and feasibility of addressing these backlogs.

The comprehensive evaluation revealed stark differences between model categories. Cloud-based services like GPT-4 and Claude Sonnet 3.5 achieved A-grade performance, accurately describing complex scenes, reading text in multiple languages, and capturing contextual details that human authors often missed. Local models like Llama variants and MiniCPM-V earned B grades - reliable for basic descriptions but sometimes missing important details.

What's particularly striking is the cost-effectiveness. Processing 9,000 images through GPT-4 cost less than $50, making it economically viable even for large-scale retroactive improvements. The AI demonstrated cultural awareness, technical knowledge, and attention to detail that often exceeded human-generated descriptions from the same author years earlier.

However, the trust factor remains significant. Allowing automated systems to generate accessibility content requires careful consideration of failure modes and quality assurance processes. The author's approach of gradually increasing confidence through sample validation provides a practical model for others facing similar challenges.

For organizations with accessibility backlogs, this represents a paradigm shift. Instead of viewing missing alt text as an insurmountable technical debt, teams can now address these issues systematically and affordably. The key is choosing appropriate models for the use case and implementing proper validation workflows.

The broader implications extend beyond alt text to other accessibility challenges that could benefit from AI assistance, such as heading structure analysis, color contrast evaluation, and content summarization for cognitive accessibility.

**Key takeaways:**
- Cloud AI models significantly outperform local alternatives for alt text generation
- Cost-effective scaling enables addressing massive accessibility backlogs (9,000 images for $50)
- AI often generates more detailed and accurate descriptions than human authors
- Trust and validation workflows are crucial for automated accessibility improvements

**Tradeoffs:**
- Achieve massive scale and cost savings but sacrifice complete human oversight and control
- Gain consistent quality and multilingual capabilities but depend on external AI services
- Enable rapid accessibility improvements but require careful validation of automated outputs

**Link:** [Trusting AI with my images wasn't easy](https://dri.es/trusting-ai-with-my-images-was-not-easy)

## Mozilla's Privacy Policy Misstep and Recovery

**TLDR:** Mozilla updated Firefox's Terms of Use twice in one week after backlash over broad language that appeared to grant rights to all user data, including passwords and banking information.

**Summary:**

Mozilla's handling of its first-ever Firefox Terms of Use demonstrates how even privacy-focused organizations can stumble when implementing legal frameworks around data usage. The original language granted Mozilla "a nonexclusive, royalty-free, worldwide license to use" any information users input through Firefox - terminology so broad it technically covered passwords, banking details, and private communications.

The community reaction was swift and harsh, with users interpreting this as Mozilla abandoning its privacy principles for commercial gain. While Mozilla's intent was to clarify how Firefox processes data for basic functionality, the legal language created the impression of sweeping data collection rights that contradicted the organization's stated values.

The rapid revision process reveals both the problem and a reasonable solution. The updated terms now explicitly state that the license is "for the purpose of doing as you request" and clarifies that Mozilla gains no ownership rights in user content. This more limited scope aligns with user expectations while still providing the legal framework Mozilla needs to operate the browser.

However, the incident highlights a deeper challenge in privacy communication. Legal precision often conflicts with user comprehension, and organizations must balance comprehensive coverage with clear communication. Mozilla's explanation of why these terms were needed - certain jurisdictions define "sell" more broadly than users expect - illustrates how legal compliance can create unintended perception problems.

For development teams, this serves as a cautionary tale about privacy policy rollouts. Technical accuracy isn't sufficient if the language creates user distrust. The solution involves early community engagement, clear explanations of intent, and willingness to iterate quickly when problems arise.

The incident also demonstrates Mozilla's commitment to transparency and responsiveness. Rather than defending problematic language or implementing changes slowly, the organization acknowledged concerns and revised the policy within days.

**Key takeaways:**
- Legal precision in privacy policies can create unintended user perception problems
- Community feedback is crucial for identifying problematic policy language
- Quick iteration and clear communication help rebuild trust after policy missteps
- Privacy-focused organizations must balance legal requirements with user expectations

**Link:** [Mozilla Updates Firefox Terms Again After Backlash Over Broad Data License Language](https://thehackernews.com/2025/03/mozilla-updates-firefox-terms-again.html)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
