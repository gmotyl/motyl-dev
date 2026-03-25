---
title: "Emotional Design, Messy Docs, and the AI Design-to-Code Gap"
excerpt: "From anime-inspired UX patterns to generative UI checkboxes, this week's Unicorn Club covers the emotional craft of product design and the tools reshaping how we build."
publishedAt: "2026-03-25"
slug: "emotional-design-messy-docs-ai-design-to-code-gap"
hashtags: "#unicorn-club #design #ux #ai #css #frontend #three-js #architecture #generative-ui #design-systems #productivity #generated #en"
---

Hey friends, welcome back. Grab your coffee, settle in, and let me walk you through what landed in the Unicorn Club newsletter this week. We have got a genuinely fascinating mix: anime as a UX design framework, the beautiful chaos of team documentation, CSS getting some wild new tricks, generative UI showing up in the real world, the frustrating gap between design tools and code, Brad Frost redesigning his website while literally painting a wall, stunning 3D page transitions, and a talk about scroll customization. Let us get into it.

## Anime vs. Marvel/DC: Designing Digital Products With Emotion In Flow

**TLDR:** This Smashing Magazine piece argues that anime handles emotional transitions far better than Marvel and DC films, and those same principles apply directly to product design. The core idea is that well-paced emotional shifts keep users immersed, while jarring tonal clashes break trust.

**Summary:**

Alan Cohen has written something genuinely refreshing here. He introduces two concepts that I think every product designer needs in their vocabulary: Emotion in Flow and Emotion in Conflict. The premise is deceptively simple. When you watch an anime like Dan Da Dan, the show swings wildly between horror, comedy, and heartbreak, yet it all feels coherent. That is Emotion in Flow. When you watch a scene in James Gunn's Superman where a heartfelt conversation gets undercut by a background gag, the moment falls flat. That is Emotion in Conflict.

The translation to UX is surprisingly direct. Emotion in Conflict is what happens when your app throws confetti before the payment has actually confirmed. It is the cheeky error message in a money transfer flow when the user is stressed. It is the promotional modal that hijacks you mid-checkout. These are not just annoying design choices, they spike cognitive load because the user has to process two competing emotional signals at once.

Cohen maps this onto Don Norman's three layers of emotional design: visceral, behavioral, and reflective. He proposes an emotional beat sheet for product flows that goes uncertainty, clarity, anticipation, achievement, calm. What I appreciate most is that he does not treat errors and failure states as exceptions to this arc. He treats them as part of the hero's journey. A well-designed recovery state acknowledges the setback and guides the next step without introducing new emotional noise.

The practical toolkit here is solid: write emotional beat sheets for your core flows, create a tone matrix that maps risk level to communication style, design your peak moment and ending deliberately, and use microinteractions as bridges between emotional states rather than as decoration. The fast checklist at the end for avoiding Emotion in Conflict is something I could see taped to a monitor in every design studio.

**Key takeaways:**
- Emotion in Flow means emotional shifts feel earned, telegraphed, and properly timed
- Emotion in Conflict happens when competing tonal signals break user immersion
- Map an emotional beat sheet for every core user flow
- Match your communication tone to task risk level
- Microinteractions should bridge feelings, not spotlight the interface

**Why do I care:** As someone who has shipped plenty of checkout flows and error states, this framework is immediately useful. We spend so much time debating copy tone and animation timing in isolation, but this gives you a coherent model for evaluating the entire emotional arc of a flow. The next time someone wants to add a playful animation to an error state in a payment flow, I have a name for why that is a bad idea.

**Link:** [Anime vs. Marvel/DC: Designing Digital Products With Emotion In Flow](https://www.smashingmagazine.com/2026/03/anime-marvel-dc-designing-digital-products-emotion-flow/)

## TBM 411: Messy Docs As Helpful Pattern

**TLDR:** John Cutler observes that high-performing product teams frequently rely on messy, freeform documents with manual copy-paste migration rather than structured project management tools. The messiness is not a bug, it is an essential part of how teams externalize working memory and make sense of complex work.

**Summary:**

This one really resonated with me. Cutler has noticed a pattern across many high-performing teams he works with at Dotwork: they maintain these chaotic, living documents full of random status pills, links going everywhere, strikethroughs, comments, checklists, and manually copied data. It looks like a mess from the outside, but it works. The consistent habit is copy-paste migration and reflection. Teams snapshot reality, copy it forward, talk about it, and repeat.

The deeper insight is about externalizing working memory. Product work overwhelms what any individual or small group can hold in their heads. There are too many partial insights from customer calls, shifting hypotheses, dependencies, half-formed ideas, and metrics that may or may not matter. These messy docs push that cognitive load out of people's heads and into a shared environment. The repetition of copying things forward is not wasted effort; it reinforces shared understanding.

Cutler is honest about survivorship bias here. Maybe these documents do not create high-performing teams. Maybe the teams capable of performing well are also the ones patient enough to sustain this kind of reflective practice. He also raises the tension between messy frontline reality and organizational legibility. Leaders need visibility, but forcing teams into clean artifacts can destroy the very sense-making that makes them effective. His most compelling resolution is what he calls the Intentional Interface View: do not eliminate the messy emergence, but design minimal shared routines and objects that help others understand what teams are doing without forcing them to stop doing it that way.

He also drops an intriguing aside about how many Claude workflows people are experimenting with seem to mimic this exact pattern of messy, iterative document evolution. That connection between AI-assisted workflows and organic team practices is worth watching.

**Key takeaways:**
- High-performing teams often rely on messy freeform documents rather than rigid ticketing systems
- These documents externalize working memory and reduce cognitive load
- The practice requires patience and repetition to become a sustainable habit
- There is a real tension between messy frontline work and organizational need for legibility
- The best solution is designing intentional interfaces between messy reality and the broader organization

**Why do I care:** Every team I have been on has had some version of this. The Google Doc that is the real source of truth while Jira is the official one. What Cutler articulates is why forcing everything into tickets actually makes teams worse. For architects and tech leads, the takeaway is to protect these organic sense-making spaces and resist the urge to over-formalize. The manager who says "everything must be a ticket" is actively harming their best people.

**Link:** [TBM 411: Messy Docs As Helpful Pattern](https://cutlefish.substack.com/p/tbm-411-messy-docs-as-helpful-pattern)

## What's !important #7: random(), Folded Corners, Anchored Container Queries, and More

**TLDR:** CSS-Tricks rounds up a batch of new and underappreciated CSS features including random functions, clip-path folded corners, backdrop-filter, the Popover API, anchored container queries, and someone literally built DOOM in CSS.

**Summary:**

This is one of those roundups that makes you realize how fast CSS is evolving. The headline features are the new random() and random-item() CSS functions, which turn out to be more complex than you might expect. You can scope randomness to elements, share random values across components, and pick from predefined lists. Alvaro Montoro's explainer apparently gets into the nuances.

The folded corner technique using clip-path from Kitty Giraudel is a nice evolution. We have gone from using actual images in the 2000s to box-shadow hacks to now having a clean CSS-only solution with clip-path. Stuart Robson highlights backdrop-filter, which is more versatile than most people realize, it is not just for the backdrop pseudo-element but can create background effects on any element. And font-variant-numeric with tabular-nums is one of those properties that solves a specific annoyance, preventing layout shift when numbers change dynamically in clocks, counters, and financial tables.

The anchored container queries piece is particularly interesting for anyone building tooltip-like UI. Anchor positioning continues to have quirks that are not bugs but rather behaviors that are not commonly understood, which Chris Coyier digs into. Safari is shipping customizable select elements and the open pseudo-class. Chrome 146 brings scroll-triggered animations and will move to a two-week release cycle starting September. And yes, someone built the entire DOOM game rendered purely in CSS using divs with background images and clipping paths with 3D transforms. Because of course they did.

**Key takeaways:**
- CSS random() and random-item() functions bring native randomness to stylesheets
- Anchor positioning has non-obvious behaviors that are worth studying
- Chrome is moving to two-week release cycles starting September
- Scroll-triggered animations are shipping in Chrome 146
- Customizable select elements and the open pseudo-class are coming to Safari

**Why do I care:** The random() functions and scroll-triggered animations are the ones to pay attention to from a practical standpoint. Random values in CSS open up generative design patterns without JavaScript. Scroll-triggered animations finally becoming native means we can start retiring some animation library dependencies. And if you are building any kind of dropdown or select component, the customizable select element is going to simplify a lot of painful workaround code.

**Link:** [What's !important #7: random(), Folded Corners, Anchored Container Queries, and More](https://css-tricks.com/whats-important-7/)

## GenUI In Real Life: Buttons and Checkboxes

**TLDR:** Nielsen Norman Group examines how simple generative UI elements like checkboxes and buttons are appearing in AI chat interfaces from Google and Claude, reducing friction and making conversations more productive. The humble form field turns out to be a major UX upgrade.

**Summary:**

Two years after Sarah Gibbons and the author published one of the first formal definitions of generative UI, the concept is showing up in real products, and it is not the flashy science-fiction interfaces you might expect. The most meaningful progress is happening with simple interactive elements appearing contextually within AI chat conversations.

The Google AI Mode example is elegant. When you search for hotels in London, the results come back with checkboxes next to each option. Select the ones you like, and they appear as chips above the chat input, ready for follow-up questions. No retyping hotel names, no copying and pasting. It is the same reason checkboxes have always been useful in traditional interfaces: they let you select directly rather than translating your intent into text.

Claude's AskUserQuestion widget takes it further. Instead of dumping five follow-up questions as text and expecting the user to type numbered responses, it walks you through structured form fields one at a time. There is a limit of four questions, which the author praises as an excellent example of providing guardrails around AI-generated design. Without those limits, a model might decide to ask thirty-five questions in one sitting. The contrast with Perplexity's approach, which presents follow-up questions as plain text requiring typed responses, highlights just how much friction simple UI elements remove.

The broader argument is that it was never realistic to expect consumers to become perfect prompt engineers. We have trained people for years to use short keyword phrases, and that carries over to how they prompt AI. These simple genUI elements bridge the gap between what users naturally provide and what the AI needs to give personalized results.

**Key takeaways:**
- Generative UI is showing up as simple checkboxes and buttons in AI chat, not futuristic interfaces
- These elements reduce the cognitive load of providing context to AI systems
- Guardrails around AI-generated UI elements are essential for consistent experiences
- Most users are not prompt engineers, and genUI bridges that gap
- Small interaction improvements in chat have outsized impact because chat is where most people interact with AI

**Why do I care:** This is the pragmatic side of the AI interface conversation. While everyone debates autonomous agents and multimodal experiences, the biggest real-world improvement is checkboxes in chat. As frontend architects, we should be thinking about how to build these contextual UI generation patterns into our own products. The constraint design, limiting AI to four questions at a time, is a pattern worth stealing for any AI-powered feature.

**Link:** [GenUI In Real Life: Buttons and Checkboxes](https://www.nngroup.com/articles/genui-buttons-and-checkboxes/)

## The Design-to-Code AI Workflow You're Looking For Doesn't Exist (Yet)

**TLDR:** Phil Morton argues that no single tool currently provides a complete loop between a production code-based design system and a visual design canvas. The fundamental problem is that design tools render vector graphics while code renders in a browser, and bridging those two models is genuinely hard engineering.

**Summary:**

Every design team right now is trying to figure out the same thing: what should our process look like now that AI can write production-ready code? Morton lays out the uncomfortable truth that there is no satisfying answer yet. Teams are gravitating toward one of two ends. Some start in Figma, using tools like Make for interactive prototypes that are not production code. Others start in code, using Claude Code or Cursor to build production UI directly, like Intercom where all designers now ship pull requests to production.

Morton defines ten requirements for what a solved workflow would look like, including importing a code-based design system, rendering real components visually on a canvas, two-way sync between visual changes and code, and AI-assisted design. No single tool meets all ten. UXPin Merge, Plasmic, and Builder.io can import React component libraries and render them, but the push-back from visual changes to code does not work reliably. Figma's MCP server combined with Code Connect and an AI coding tool looks promising on paper, but the pieces do not add up to a seamless flow. Code to Canvas produces editable Figma layers, but it is a visual capture rather than a real component mapping.

The reason this is so hard is architectural. Figma renders 2D graphics on a WebGL canvas compiled to WebAssembly. A real coded component is HTML and CSS rendered by a browser. These are completely different rendering models. You cannot drop a React button onto a vector canvas because the canvas does not understand browser layout. And you cannot reliably turn vector shapes into components because shapes do not carry semantic code structure. This is why every tool makes the same trade-off: real component rendering requires embedding a browser, which makes freeform canvas exploration difficult, while great canvases are drawing pictures of components rather than running them.

Morton's practical advice while waiting: get your design system into code as the prerequisite for everything, map out your ideal workflow with engineering, and experiment with current tools to build transferable skills. He predicts this gap will close by the end of the year, and whoever cracks it captures an enormous market.

**Key takeaways:**
- No tool currently provides a complete design-to-code round-trip workflow
- The core problem is two incompatible rendering models: vector canvas versus browser layout
- Teams are split between Figma-first and code-first approaches with nothing connecting them properly
- Getting your design system into code is the prerequisite for any future workflow
- This gap will likely close by end of 2026, creating a massive market opportunity

**Why do I care:** This is the most clear-headed analysis I have seen of the design-to-code tooling landscape. If you are an architect or lead evaluating tools for your team, stop feeling bad that you cannot find the perfect solution, it does not exist. The actionable advice is spot on: invest in your coded design system now, because that is the foundation every emerging workflow depends on. And start experimenting with the imperfect tools to build muscle memory for when the real solution arrives.

**Link:** [The design-to-code AI workflow you're looking for doesn't exist (yet)](https://www.philmorton.co/the-design-to-code-ai-workflow-youre-looking-for-doesnt-exist-yet/)

## I Redesigned My Website Without Touching My Keyboard While Painting a Mural

**TLDR:** Brad Frost voice-controlled a complete redesign of his website using AI tools while simultaneously painting a bathroom mural, and calls it the most fun he has had in thirty years of making websites. He frames it as a genuine paradigm shift in creative work.

**Summary:**

This is one of those stories that sounds like hyperbole until you watch the nearly three-hour video. Brad Frost needed a break from screens on a Friday night, so he decided to work on a bathroom mural his family has been painting for four years. But he also had a long-overdue website redesign on his mind. So he did both at the same time, using voice to direct AI tools to redesign his site while his hands were busy with paintbrushes.

Frost describes the experience as a genuine paradigm shift. The flow state he gets from playing music or making art never fully transferred to digital work because the mechanics of typing introduce lag between speed of thought and creative output. He would hit the limits of his backend configuration skills, get stuck, and give up. Those limitations, he says, no longer exist. The keyboard was always the bottleneck between intention and creation, and removing it unlocked something fundamentally different about how he relates to his craft.

He is careful to note that his foundational knowledge of design systems, technical language, and core concepts is what makes this possible. The means of production are transforming, but understanding design materials and creative opportunities matters more than ever. He ties this into his courses on AI and design systems, design tokens, and atomic design. While there is a promotional element here, the core observation is genuine and worth sitting with. He closes with a call to the web community's values of quality, thoughtfulness, craft, and responsibility, arguing that we need to infuse those values into this new technological era rather than just pumping out whatever AI can generate fastest.

**Key takeaways:**
- Voice-directed AI design removes the keyboard bottleneck between creative intent and output
- Foundational design knowledge becomes more important, not less, when AI handles execution
- The flow state of creative work can finally extend to digital design and development
- Design systems and design tokens provide critical structure for AI-assisted creation
- The web community's values of quality and craft need to be carried forward into AI-powered workflows

**Why do I care:** Look, I am a bit skeptical of the "I did it all with AI while doing something else" genre of content. But Frost has credibility here. The real insight is not that AI can redesign a website. It is that removing the mechanical friction of typing fundamentally changes the creative relationship with digital work. For those of us who have spent decades at keyboards, that is worth reflecting on. The caution is that his deep expertise in design systems is doing a lot of the heavy lifting in those voice prompts, so do not expect the same results without that foundation.

**Link:** [I redesigned my website without touching my keyboard...all while painting a mural](https://bradfrost.com/blog/post/i-redesigned-my-website-without-touching-my-keyboard-all-while-painting-a-mural/)

## Building Seamless 3D Transitions with Webflow, GSAP, and Three.js

**TLDR:** A detailed Codrops tutorial walks through building a gallery-style web experience with a persistent Three.js 3D scene, Barba.js page transitions, and GSAP animations, all running on a Webflow site. The result feels like moving through a single space rather than jumping between pages.

**Summary:**

This is a beautifully crafted tutorial that takes you from creating hand-drawn 3D models in Blender all the way to polished page transitions. The core concept is a Webflow site transformed into a gallery experience where a Three.js scene persists across all page navigations. Instead of reloading, the camera slides between 3D models as you move between pages, and GSAP handles the text and UI animations.

The technical architecture is clever. The canvas element sits outside the Barba container so it never gets swapped during navigation. Three.js models are positioned along the X axis, and when you navigate, the camera simply tweens to the next position. The Experience class is a singleton created once on initial load that survives the entire session, meaning no re-initialization, no flickering, and no repeated network requests for models. Barba.js orchestrates the DOM swapping while GSAP's SplitText breaks headings and paragraphs into individual lines for staggered animations that feel organic.

The hand-drawn aesthetic is achieved through a combination of rough Blender geometry with hand-painted Photoshop textures applied via UV mapping, a ShadowMaterial plane that is invisible except where shadows fall, and a paper texture behind the canvas with multiply blending. The models respond subtly to cursor movement through a lerp-based system that smoothly interpolates between current and target rotation values. The attention to accessibility is notable too: button hover animations are wrapped in a matchMedia check that respects prefers-reduced-motion, and the author recommends extending the same approach to page transitions.

The tutorial also covers practical production concerns like using ResizeObserver instead of window resize events, capping pixel ratio at two for performance, and using DRACO compression for GLB model files. Every architectural decision is explained with the reasoning behind it, which makes this valuable not just as a recipe but as a learning resource for understanding how these libraries compose together.

**Key takeaways:**
- A persistent Three.js scene across page navigations creates a seamless spatial experience
- Barba.js handles DOM swapping while the canvas remains untouched
- SplitText line-by-line animation creates more organic transitions than block animation
- ShadowMaterial renders transparent except where shadows fall, perfect for blending 3D with page backgrounds
- Always respect prefers-reduced-motion for animation-heavy experiences

**Why do I care:** Even if you are not building 3D gallery sites, the architectural patterns here are transferable. The singleton experience pattern, persistent canvas outside the router, and camera-based navigation are applicable to any project combining WebGL with page-based navigation. The accessibility-first approach to animation, checking reduced motion preferences before enabling effects, should be standard practice. And the performance considerations around pixel ratio capping and DRACO compression are the kind of production details that separate demos from real products.

**Link:** [Building Seamless 3D Transitions with Webflow, GSAP, and Three.js](https://tympanus.net/codrops/2026/03/18/building-seamless-3d-transitions-with-webflow-gsap-and-three-js/)

## Everything You Need To Know About Customizing Scroll UX With CSS

**TLDR:** Adam Argyle's CSS Day 2025 talk on customizing scroll experiences with CSS is now free to watch. The talk covers the latest CSS scroll customization capabilities and has been generating enthusiastic community response.

**Summary:**

Adam Argyle has released his CSS Day 2025 talk, and the community response tells you everything you need to know about the quality. The talk covers everything about customizing scroll user experience with CSS, which has become an increasingly rich area of the platform. Scroll-driven animations, scroll snapping, and the various scroll-related properties have evolved significantly, and Argyle is one of the Chrome team members who has been driving many of these specifications forward.

The post itself is light on detail since it is primarily a link to the YouTube video along with slides and demo links, but the community reactions in the replies suggest this is a comprehensive and well-delivered overview. If you are working on any scroll-heavy interfaces, carousels, parallax effects, or scroll-linked animations, this is worth the time investment. Argyle has a talent for making complex CSS specifications accessible, and given that scroll-triggered animations are shipping in Chrome 146, the timing is perfect for getting up to speed.

**Key takeaways:**
- Adam Argyle's comprehensive CSS scroll customization talk from CSS Day 2025 is now freely available
- Scroll-triggered animations are shipping in Chrome 146, making this immediately practical
- The talk covers the full spectrum of CSS scroll capabilities
- Slides and demo links are provided alongside the video

**Why do I care:** Scroll interactions are one of those areas where we have historically reached for JavaScript libraries immediately. With native CSS scroll-triggered animations arriving in Chrome and the broader scroll customization API maturing, we can start removing dependencies and getting better performance for free. If you have not kept up with what CSS can do with scroll now, this talk is the most efficient way to get current.

**Link:** [Everything You Need To Know About Customizing Scroll UX With CSS](https://nerdy.dev/everything-you-need-to-know-about-customizing-scroll-ux-with-CSS-from-css-day-2025)