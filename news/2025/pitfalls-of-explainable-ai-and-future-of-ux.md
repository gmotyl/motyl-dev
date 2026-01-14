---
title: "The Pitfalls of Explainable AI and the Future of UX"
excerpt: "This week, we dive into the misleading nature of explainable AI in chat interfaces, the importance of precise prompts in AI-prototyping, the latest in CSS, and the ongoing debate about the role of UX in a product-driven world."
publishedAt: "2025-12-17"
slug: "pitfalls-of-explainable-ai-and-future-of-ux"
hashtags: "#unicornclub #ux #ai #css #product #generated #en"
---

## Explainable AI is (often) misleading in chat UX

**TLDR:** Most AI chat explanations are misleading, overconfident, or encourage misplaced trust. If users don’t spot limitations or false citations, your interface can amplify errors and undermine trust.

**Summary:**
As AI chat interfaces become more prevalent, the explanations they provide for their outputs are often falling short. A recent analysis from the Nielsen Norman Group highlights that these explanations can be inaccurate, hidden, or confusing, leading users to place undeserved trust in the AI's answers. The technical complexity of modern AI models means that even engineers cannot always trace the reasoning behind an output, yet chatbots present their answers with a confidence that can mislead users.

The article points out several issues with current explainable AI practices. Source citations are often hallucinated, pointing to non-existent URLs or irrelevant articles. Step-by-step reasoning, which gives the impression of a logical process, is often a rationalization generated after the fact. Disclaimers about the limitations of AI are frequently ignored by users. To combat this, the article suggests several UX improvements, such as styling citations differently, placing them next to the claims they support, using clear language in disclaimers, and avoiding anthropomorphic language that can inflate user trust.

**Key takeaways:**
- AI chat explanations are often inaccurate and can mislead users.
- Source citations, step-by-step reasoning, and disclaimers are often ineffective.
- UX can play a crucial role in mitigating the risks of over-trusting AI.

**Link:** [Explainable AI in Chat Interfaces](https://www.nngroup.com/articles/explainable-ai/)

## Prompt to Design Interfaces: Why Vague Prompts Fail and How to Fix Them

**TLDR:** AI-prototyping tools promise instant design, but vague prompts lead to disorderly, cluttered outputs and "Frankenstein" layouts. Precision is key to getting usable results.

**Summary:**
The rise of generative AI tools for prototyping has introduced a new way of designing interfaces, but the quality of the output is highly dependent on the specificity of the prompt. A Nielsen Norman Group study found that vague prompts given to AI-prototyping tools result in "Frankenstein layouts" that are cluttered, repetitive, and lack a logical flow. These tools can understand individual UI components, but they struggle to assemble them into a coherent and usable interface without clear instructions.

The article offers five strategies for improving the output of AI-prototyping tools:
1.  **Use Precise Visual Keywords:** Instead of generic terms like "modern," use specific design styles like "neobrutalist."
2.  **Attach Lightweight Visual References:** Use mood boards or screenshots to guide the AI's visual direction.
3.  **Conduct a Visual Analysis with AI:** Use a chatbot to analyze an existing design and generate a descriptive prompt.
4.  **Generate Mock Data:** Provide the AI with realistic content to guide the layout and structure of the design.
5.  **Attach Code Snippets:** For the highest precision, provide the AI with code for existing components.

**Key takeaways:**
- Vague prompts in AI-prototyping tools lead to poor design outcomes.
- Specificity in prompts is crucial for generating high-quality interfaces.
- A combination of precise language, visual references, and data can significantly improve AI-generated designs.

**Link:** [Prompt to Design Interfaces: Why Vague Prompts Fail and How to Fix Them](https://www.nngroup.com/articles/vague-prototyping/)

## CSS Wrapped 2025

**TLDR:** 2025 was a huge year for CSS, with 22 new features landing in browsers. Highlights include customizable `select` elements, native CSS mixins, and powerful new ways to handle scroll-based animations and interactions.

**Summary:**
The Chrome Developers blog has published its annual "CSS Wrapped" for 2025, and it's a big one. This year saw the introduction of 22 new CSS and HTML features, many of which have been long-awaited by developers. One of the most exciting updates is the ability to fully customize the HTML `<select>` element with CSS. This has been a major pain point for developers for years, and the new `appearance: base-select` property finally provides a solution.

Other notable additions include the `interestfor` attribute for declarative, interest-triggered UI, `::scroll-marker` and `::scroll-button` for native carousels, and the `if()` function for conditional styling. Native CSS mixins are also on the horizon, which will allow for more reusable and maintainable CSS. These new features, along with many others, are making it easier than ever to create beautiful, interactive, and accessible web experiences with less JavaScript.

**Key takeaways:**
- CSS gained 22 new features in 2025.
- Customizable `<select>` elements are now a reality.
- Native CSS mixins, scroll-based interaction features, and conditional styling are making CSS more powerful than ever.

**Link:** [CSS Wrapped 2025](https://chrome.dev/css-wrapped-2025/)
