---
title: "Figma Sites Sparks Controversy, Safari Advances with P3 Colors and CSS Enhancements"
excerpt: "Figma's new website builder faces harsh criticism over code quality and accessibility, while Safari pushes forward with advanced color features and CSS improvements."
publishedAt: "2025-05-14"
slug: "figma-sites-controversy-safari-color-advances"
hashtags: "#generated #en #figma #css #safari #webkit #accessibility #color #web-standards #html #frontend"
---

## Figma Sites: The Design Tool's Bold Move Into Web Publishing

**TLDR:** Figma launched Sites, allowing designers to publish websites directly from their designs without coding, but early reviews reveal serious accessibility issues and poor code quality reminiscent of early WYSIWYG editors.

**Summary:**

Figma has introduced Sites, positioning itself as an all-in-one solution for designing and publishing websites without leaving their design workflow. The tool promises responsive layouts, interactive prototypes, and built-in features like custom cursors and parallax effects. Users can leverage their existing design systems by linking published libraries directly into sites, and there's even a chat-to-code feature powered by AI coming soon.

The announcement also includes Figma Make, a companion tool focused on prototyping web applications through AI prompts. Both products share underlying technology but serve different purposes - Sites for marketing teams who know exactly how their site should look, and Make for high-fidelity prototyping and ideation.

However, the launch has triggered intense criticism from web accessibility and standards experts. Multiple accessibility audits of Figma's own demo sites revealed hundreds of WCAG violations. The generated code shows deeply nested div structures with role attributes instead of semantic HTML elements, making it inaccessible to screen readers and keyboard users. Critics point out that this represents a fundamental misunderstanding of web development principles that have been established for decades.

The controversy highlights a deeper tension in the design industry. Figma is essentially a tool for drawing pictures of websites, not designing actual web experiences. When it generates code, it lacks understanding of semantic structure, accessibility requirements, and modern web standards. This creates a concerning trend where "website-shaped outputs" might replace actual functional websites.

For architects and teams, this represents a critical decision point. While the promise of faster design-to-production workflows is appealing, the technical debt and accessibility risks could create significant long-term problems. Teams need to weigh the immediate productivity gains against potential legal compliance issues, user exclusion, and maintenance challenges.

**Key takeaways:**
- Figma Sites enables direct publishing from designs but generates poor-quality, inaccessible code
- Demo sites fail basic accessibility tests with hundreds of WCAG violations
- The tool reflects a broader industry tension between design speed and web standards compliance

**Tradeoffs:**
- Gain rapid design-to-web publishing but sacrifice code quality and accessibility compliance
- Enable non-technical teams to create websites but risk excluding users with disabilities
- Achieve visual design fidelity but lose semantic meaning and web standards adherence

**Link:** [Figma Sites Blog Post](https://www.figma.com/blog/introducing-figma-sites/)

## CSS Height Mysteries Finally Explained

**TLDR:** Josh Comeau demystifies why CSS height percentages often don't work, explaining the fundamental difference between width and height calculations in CSS layout systems.

**Summary:**

The height property in CSS has long puzzled developers because it behaves fundamentally differently from width. Josh Comeau breaks down this mystery by explaining that width and height are calculated in opposite directions within the DOM tree. When calculating width, browsers look up to the parent element, but for height, they look down to the children.

This creates a circular dependency problem when you try to use percentage heights. The child element says "I want to be 50% of my parent's height" while the parent says "I want to be just tall enough to contain my children." Since neither can determine their size without the other, browsers ignore the percentage height declaration.

The solution requires giving the parent an explicit height that doesn't depend on its children. This breaks the circular dependency and allows percentage heights to work as expected. The article provides practical examples and demonstrates how this principle applies across different layout scenarios.

Understanding this concept is crucial for frontend developers who need to create layouts that work reliably across different screen sizes and content variations. It explains why certain layout techniques work while others fail mysteriously, removing the guesswork from CSS height management.

For development teams, this knowledge helps prevent common layout bugs and reduces debugging time. It's particularly valuable when creating responsive designs or working with dynamic content where height calculations become critical to the user experience.

**Key takeaways:**
- Width calculations look up the DOM tree to parents, height calculations look down to children
- Percentage heights fail when they create circular dependencies between parent and child
- Explicit parent heights are required to make percentage heights work reliably

**Link:** [The Height Enigma](https://www.joshwcomeau.com/css/height-enigma/)

## Safari 18.5 Brings Declarative Web Push and Enhanced Color Support

**TLDR:** Safari's latest update introduces battery-efficient push notifications without Service Workers and expands support for wide-gamut P3 colors in form controls.

**Summary:**

Safari 18.5 delivers Declarative Web Push on macOS, representing a significant shift in how web applications handle notifications. Unlike traditional web push that requires Service Workers and JavaScript, this new approach uses a standardized JSON format that's simpler to implement and more energy-efficient. The declarative nature eliminates potential misuse scenarios and removes the need for complex limitation systems.

The update also advances color capabilities with enhanced support for P3 wide-gamut colors and alpha transparency in HTML color pickers. This brings web form controls in line with modern display technology that has supported wider color gamuts for years. The new colorspace and alpha attributes allow users to select from the full P3 color range and include opacity values directly in native browser controls.

Additionally, Safari introduces the contrast-color() CSS function, which automatically selects black or white text based on which provides better contrast with a given background color. This solves a common design system challenge where maintaining proper contrast ratios across multiple color combinations becomes complex to manage manually.

The release includes numerous bug fixes across editing, JavaScript processing, networking, and rendering systems. These improvements focus on edge cases and specific scenarios that affect real-world web application performance and reliability.

For development teams, these features reduce implementation complexity while improving user experience. The declarative push notifications eliminate a common source of battery drain, while the enhanced color support enables richer visual designs that work properly across different display technologies. The contrast-color function particularly benefits design systems and component libraries where maintaining accessibility compliance across color variations is critical.

**Key takeaways:**
- Declarative Web Push eliminates Service Worker complexity while improving battery life
- P3 wide-gamut color support brings HTML form controls up to modern display standards
- CSS contrast-color() function automatically ensures accessible text-background combinations

**Link:** [WebKit Features in Safari 18.5](https://webkit.org/blog/16923/webkit-features-in-safari-18-5/)

## CSS Anchor Positioning Specification Reaches Stability

**TLDR:** The CSS Anchor Positioning Module has evolved significantly since 2023, with major syntax changes and new features making it more powerful and easier to use as it approaches final standardization.

**Summary:**

The CSS Working Group has provided an update on the CSS Anchor Positioning specification, highlighting substantial evolution since its initial draft in 2023. The specification has undergone significant changes including syntax modifications to the anchor() function, introduction of the position-area property, and redesign of position-fallback systems into the more intuitive position-try property and at-rule.

Key additions include anchor-scope for managing anchor relationships and position-visibility for controlling element visibility based on anchor positioning. These features address real-world use cases where complex positioning relationships need to be managed across component boundaries and viewport changes.

The collaborative effort involved Google spearheading initial specification work and prototyping, Apple contributing usability improvements and system integration enhancements, and Roman Komarov providing creative experimentation that pushed the boundaries of what's possible. This multi-stakeholder approach mirrors the successful development process used for CSS Grid Layout.

The specification is becoming increasingly stable, with recent drafts incorporating only minor changes. The working group is particularly seeking feedback on accessibility guidance and best practices that could be incorporated into the final specification. This focus on accessibility from the specification level demonstrates lessons learned from past CSS features where accessibility considerations were added as afterthoughts.

For frontend teams, CSS Anchor Positioning will solve complex layout challenges around tooltips, dropdown menus, and contextual overlays that currently require JavaScript positioning libraries. The declarative nature means these interactions can be handled entirely in CSS, reducing JavaScript bundle sizes and improving performance. However, teams should prepare for the learning curve as this introduces new mental models for positioning that differ from existing CSS layout systems.

**Key takeaways:**
- Major syntax and feature changes since 2023 make the specification more powerful and user-friendly
- Multi-vendor collaboration and early author feedback driving improvements similar to CSS Grid development
- Specification approaching stability with focus on accessibility guidance and best practices

**Link:** [Update on CSS Anchor Positioning](https://www.w3.org/blog/CSS/2025/05/12/update-on-css-anchor-positioning/)

## Opera Air: The Browser That Wants to Meditate With You

**TLDR:** Opera launched Air, a browser focused on mindfulness and well-being, featuring guided meditations, breathing exercises, and stress-reduction tools built directly into the browsing experience.

**Summary:**

Opera has introduced Air, positioning it as the world's first browser with mindfulness at its core. The browser integrates features typically found in wellness apps, including guided meditations, breathing exercises, mindful breaks, and even 3D-guided physical exercises using your camera. It also includes binaural beats and sound therapy designed to stimulate different brain waves for creativity, stress relief, and focus.

The browser maintains Opera's traditional features like built-in ad blocking, free VPN, and AI assistance through Aria, but presents them within a minimalist, adaptive UI that conforms to wallpapers and themes. The design philosophy emphasizes reducing distractions and creating a soothing environment for users who feel overwhelmed by typical browsing experiences.

This represents an interesting approach to addressing digital wellness concerns that have become increasingly prominent. Rather than expecting users to manage their digital habits through external tools or willpower, Opera is building wellness features directly into the browsing experience. The browser includes reminders to take breaks and provides immediate access to stress-reduction tools.

However, this approach raises questions about the fundamental relationship between browsers and user behavior. While the intention to promote digital wellness is admirable, there's something paradoxical about a web browser trying to reduce the stress caused by web browsing. It suggests that the problem might be deeper than what browser-level solutions can address.

For teams and organizations, this represents an interesting case study in product positioning and feature differentiation. Opera is betting that there's a market segment specifically concerned about digital wellness who would choose a browser based on these features. Whether this resonates with users or feels like feature creep remains to be seen.

**Key takeaways:**
- First browser to integrate mindfulness and wellness features as core functionality
- Includes meditation, breathing exercises, and binaural beats alongside traditional browser features
- Represents a unique approach to addressing digital wellness concerns at the platform level

**Link:** [Opera Air](https://www.opera.com/air)

---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
