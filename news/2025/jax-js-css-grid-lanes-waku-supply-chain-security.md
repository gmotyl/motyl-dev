---
title: "jax-js ML Framework, CSS Grid Lanes, Waku React Framework, and Supply Chain Security"
excerpt: "A JavaScript ML framework brings JAX to the browser with WebGPU, Safari introduces CSS Grid Lanes for masonry layouts, Waku offers minimal React 19 support, and a 16-year-old discovers critical supply chain vulnerabilities."
publishedAt: "2025-12-31"
slug: "jax-js-css-grid-lanes-waku-supply-chain-security"
hashtags: "#uidev #javascript #ml #ai #webgpu #css #react #nextjs #waku #security #supply-chain #generated #en"
---

## jax-js: JAX Machine Learning Framework for the Browser

**TLDR:** A new open-source library brings Google's JAX machine learning framework to JavaScript, running entirely in the browser via WebGPU and WebAssembly with zero dependencies and near-native performance.

**Summary:**

This is genuinely exciting work. Eric Zhang has built jax-js, a complete reimplementation of JAX in pure JavaScript that runs entirely client-side. The library translates array operations into WebAssembly and WebGPU kernels, achieving performance that rivals native implementations - around 3000 GFLOP/s for matrix multiplication on an M4 Pro chip.

The technical approach is fascinating. Rather than wrapping an existing ML runtime, jax-js generates kernels from scratch using an ML compiler approach. It maintains close API compatibility with NumPy and JAX, so Python developers will feel immediately at home. The signature JAX features are all present: automatic differentiation with `grad()`, vectorization with `vmap()`, and JIT compilation that fuses operations into optimized GPU kernels.

What makes this particularly interesting from an architectural standpoint is the memory management story. JavaScript lacks Python's `__del__` method for running destructors, so jax-js implements reference counting with move semantics similar to Rust. You use `.ref` to increment reference counts and `.dispose()` to free memory. It's an unusual pattern for JavaScript, but necessary for managing large tensor allocations.

The practical implications are significant. You can now run ML inference entirely in the browser without server calls, train neural networks on MNIST with hot module reloading, and build semantic search applications that process embeddings client-side. The author demonstrates a CLIP-based book search running at 500 GFLOP/s on a 4-year-old laptop.

For architects considering where to run ML workloads: this opens up a genuine alternative to server-side inference for many use cases. Privacy-sensitive applications, offline-capable tools, and latency-critical features can now leverage ML without network round trips.

**Key takeaways:**
- jax-js runs JAX-compatible ML code entirely in the browser via WebGPU and WebAssembly
- Zero external dependencies with performance matching TensorFlow.js and ONNX Runtime
- Reference counting memory model addresses JavaScript's lack of destructors for large allocations
- Supports grad, vmap, and jit transformations for automatic differentiation and optimization

**Tradeoffs:**
- Gain client-side ML capability but require modern browser with WebGPU support
- Reference counting adds developer overhead but prevents memory leaks in long-running applications

**Link:** [jax-js: JAX in JavaScript](https://github.com/ekzhang/jax-js)

---

## Introducing CSS Grid Lanes: Native Masonry Layouts

**TLDR:** Safari Technology Preview 234 introduces CSS Grid Lanes, a new display mode that finally brings native masonry layouts to CSS with the full power of CSS Grid for defining lanes.

**Summary:**

After years of debate at the CSS Working Group and groundwork by Mozilla and Apple's WebKit team, we finally have a clear specification for masonry layouts. The new `display: grid-lanes` property creates layouts where items flow into whichever column gets them closest to the top - exactly like the Masonry JavaScript library, but native to CSS.

The syntax is remarkably elegant. Three lines of CSS create a flexible, responsive layout with zero media queries:

```css
.container {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
```

What makes this powerful is that it inherits the full expressiveness of CSS Grid. You can create alternating narrow and wide columns, span items across multiple lanes, and explicitly place items at specific positions. The highway traffic metaphor is apt - items "change lanes" to end up in whichever position gets them "furthest ahead."

The specification introduces a new concept called "tolerance" via the `item-tolerance` property. This controls how picky the layout algorithm is when placing items. With zero tolerance, tiny differences in item heights cause items to shuffle unexpectedly. The default 1em tolerance means only differences greater than 1em matter for placement decisions.

For accessibility, this is thoughtful design. Users tabbing through the page will see items highlighted in a sensible order, and the tolerance setting helps prevent jarring jumps up and down the layout. The article explicitly addresses screen reader considerations.

For teams that have been using JavaScript-based masonry solutions: this is the beginning of the end for those libraries. Native CSS performance, no JavaScript required, infinite scroll without layout recalculation. The main caveat is browser support - currently only Safari Technology Preview.

**Key takeaways:**
- `display: grid-lanes` creates native masonry layouts with CSS Grid's full power
- Works in both column ("waterfall") and row ("brick") orientations
- Item tolerance controls placement sensitivity for predictable ordering
- No JavaScript required, works with infinite scroll out of the box

**Tradeoffs:**
- Gain native performance and simpler code but currently limited to Safari Technology Preview
- Tolerance setting balances visual optimization against predictable tab order

**Link:** [Introducing CSS Grid Lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/)

---

## Waku: The Minimal React Framework

**TLDR:** Waku is a lightweight React framework designed for marketing sites and web apps, supporting all React 19 features including server components and actions with minimal complexity.

**Summary:**

The React meta-framework space has been dominated by Next.js, but Waku offers an interesting alternative for projects that don't need Next's full feature set. It's explicitly designed for marketing sites, headless commerce, and smaller web apps - the team even recommends heavier frameworks for large enterprise applications.

What stands out is the simplicity of the mental model. The routing is file-based with clear conventions: pages export a default component and a `getConfig` function specifying render mode. You get two options - 'static' for SSG and 'dynamic' for SSR. Layouts work as you'd expect, wrapping routes and their descendants.

The React Server Components story is well-documented. Server components can be async and access databases directly; client components use the 'use client' directive. The "weaving pattern" where client components accept server components as children is explicitly covered. This is the kind of clear documentation that helps teams understand the new React architecture.

Waku introduces an interesting concept called "slices" - reusable components defined in a special directory that can be composed into pages with different rendering patterns. Lazy slices act like Astro's server islands, loading independently from the page.

The deployment story is comprehensive: Node.js, Vercel, Netlify, Cloudflare, Deno Deploy, and AWS Lambda are all supported with specific adapters. Pure SSG output is also available for static hosting.

For architects evaluating React frameworks: Waku fills a specific niche. If Next.js feels like overkill for your marketing site or small app, and you want proper React 19 support with server components, Waku is worth considering. The tradeoff is ecosystem - you're getting a smaller community and fewer third-party integrations.

**Key takeaways:**
- Lightweight React 19 framework for marketing sites and smaller web apps
- Clear separation between static (SSG) and dynamic (SSR) rendering modes
- Slices provide component-level rendering control similar to Astro's server islands
- Multi-platform deployment including Vercel, Netlify, Cloudflare, and AWS Lambda

**Tradeoffs:**
- Gain simplicity and smaller bundle but sacrifice enterprise-scale features
- Smaller ecosystem compared to Next.js but cleaner mental model

**Link:** [Waku, the minimal React framework](https://waku.gg/)

---

## Scaling LLMs to Larger Codebases: Guidance and Oversight

**TLDR:** Successfully scaling LLM-assisted development requires investment in two areas: guidance (context and environment) and oversight (the skills to validate and verify LLM choices).

**Summary:**

This article provides a thoughtful framework for thinking about LLM-assisted development beyond the hype. The core insight is that LLM productivity depends on two investments: guidance (making the environment easy for LLMs to navigate) and oversight (maintaining human ability to evaluate LLM decisions).

The "one-shotting" versus "rework" distinction is useful. One-shotting is when the LLM produces working code on the first try - the most efficient mode. Rework is when you fail to get usable output and must manually intervene, often taking longer than doing it yourself. Better guidance increases one-shotting rates.

The Meta anecdote is telling. Technical debt doesn't just slow down human developers - it degrades LLM performance. The garbage in, garbage out principle applies directly. A clean codebase with clear module boundaries, good naming, and encapsulated logic is easier for both humans and models to navigate.

The article proposes an interesting "LLM literacy dipstick": have a peer engineer read unfamiliar code. If they struggle, the LLM will too. Another test: ask an LLM to explain functionality you already understand, then follow its trail to see where it gets confused.

For oversight, the emphasis on design capabilities is important. LLMs are choice generators - they make decisions about naming, organization, technology selection. Someone needs to evaluate whether those choices are good for the long-term health of the codebase. That requires architectural judgment that comes from experience.

What's missing here is concrete guidance on prompt libraries. The article mentions them but doesn't provide examples of effective prompt library structures. Teams considering this approach would benefit from seeing real implementations.

**Key takeaways:**
- One-shotting (working output on first try) is the most efficient LLM development mode
- Codebase quality directly affects LLM performance - technical debt is doubly costly
- Prompt libraries should evolve iteratively, capturing lessons from near-misses
- Oversight requires design skills that are built through experience and practice

**Tradeoffs:**
- Investment in prompt libraries pays off for larger projects but adds maintenance overhead
- Automating design checks catches some issues but misses context-dependent decisions

**Link:** [Scaling LLMs to larger codebases](https://blog.kierangill.xyz/oversight-and-guidance)

---

## Shipping at Inference Speed: A Deep Dive into Agentic Development

**TLDR:** Peter Steinberger shares his evolved workflow for building software with LLM agents, emphasizing GPT 5.2's capabilities, minimal tool switching, and designing codebases for agent navigation rather than human convenience.

**Summary:**

This is one of the most detailed practitioner accounts of serious agentic development I've seen. Steinberger has clearly spent enormous time with these tools and developed strong opinions backed by experience.

The core workflow insight: he runs 3-8 projects simultaneously, queueing prompts for later processing, and almost never reverts. When something isn't right, he prompts the model to change it rather than using checkpoints. Building software is like "walking up a mountain" - you don't go straight up, you circle around.

The model comparison is valuable. GPT 5.2 codex reads extensively before writing - sometimes 10-15 minutes of silent file reads. This feels slow but dramatically increases first-try success. Opus 4 is more eager, great for small edits but misses context on larger refactors. The author claims 4x longer execution time with codex often results in faster overall completion because there's less rework.

The "oracle" pattern is clever. When agents get stuck, they can call GPT 5 Pro with full context and get unstuck. With GPT 5.2's improvements, this is now rarely needed - going from multiple times per day to a few times per week.

Practical tips worth noting: start everything as a CLI (agents can verify output directly), design codebases so agents can navigate efficiently (not for human convenience), commit directly to main (for solo work), and cross-reference projects by pointing to directories ("look at ../vibetunnel and do the same").

The knowledge cutoff observation is astute. GPT 5.2's August cutoff versus Opus's March cutoff means 5 months of newer documentation, which matters when using latest tools.

For teams considering this approach: there's a clear warning that this workflow assumes solo development. The "commit to main" approach wouldn't work for teams. But the broader insights about designing for LLM navigation and investing in tooling automation apply broadly.

**Key takeaways:**
- GPT 5.2 codex reads extensively before writing, increasing first-try success
- Design codebases for agent navigation, not human convenience
- Start with CLI interfaces - agents can verify output directly
- Cross-reference projects by pointing to directories for knowledge transfer

**Tradeoffs:**
- Longer agent execution times often result in faster overall completion due to less rework
- Solo workflows don't translate directly to team settings

**Link:** [Shipping at Inference-Speed](https://steipete.me/posts/2025/shipping-at-inference-speed)

---

## Supply Chain Attack: How a 16-Year-Old Pwned Twitter, Vercel, and Discord

**TLDR:** A critical cross-site scripting vulnerability in Mintlify's documentation platform allowed potential account takeover on hundreds of companies including Twitter, Vercel, Cursor, and Discord through a single malicious link.

**Summary:**

This is a masterclass in security research methodology and a sobering reminder about supply chain risks. A 16-year-old high school student, investigating Discord's switch to Mintlify for their developer documentation, discovered a critical XSS vulnerability affecting hundreds of major companies.

The attack chain is elegant in its simplicity. Mintlify hosts documentation on subdomains or custom domains, with internal routes at `/_mintlify/*`. The researcher discovered an endpoint `/_mintlify/static/[subdomain]/[...route]` that could fetch static files from any Mintlify documentation - without verifying that the subdomain matched the current host.

SVG files were in the whitelist. SVGs can embed JavaScript. Game over.

By uploading a malicious SVG to their own Mintlify documentation and accessing it through Discord's domain (`discord.com/_mintlify/_static/hackerone-a00f3c6c/lmao.svg`), scripts would execute in the context of discord.com. The same attack worked against Twitter, Vercel, Cursor, and every other Mintlify customer using custom domains.

The response was professional on all sides. Discord took the documentation offline within hours, reverted to their old platform, and paid a $4,000 bounty. Mintlify set up a Slack channel with their engineering team for immediate remediation. Total bounties paid: approximately $11,000.

For architects and security teams: this is a textbook example of why supply chain security matters. A single third-party documentation tool, integrated into primary domains, became an attack surface for account takeover on hundreds of companies. The technical vulnerability was simple - a missing host verification check - but the blast radius was enormous.

**Key takeaways:**
- Supply chain vulnerabilities can affect hundreds of companies through a single compromised service
- Hosting third-party services on primary domains expands attack surface significantly
- SVG files can embed executable JavaScript - be careful with file type whitelists
- Responsible disclosure and rapid response limited the damage

**Tradeoffs:**
- Third-party documentation platforms reduce development burden but increase supply chain risk
- Custom domain integration improves branding but expands the attack surface

**Link:** [How we pwned X (Twitter), Vercel, Cursor, Discord, and hundreds of companies](https://gist.github.com/hackermondev/5e2cdc32849405fff6b46957747a2d28)

---

*This article was generated from newsletter content. Topics covered may reflect the source material's focus and editorial perspective.*
