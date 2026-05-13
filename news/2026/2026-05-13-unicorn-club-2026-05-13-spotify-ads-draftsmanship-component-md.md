---
title: "Spotify Ads by Voice, Draftsmanship in the AI Age, and the Component.md Proposal"
excerpt: "Three articles worth your time: a Claude Code plugin that turns plain English into Spotify ad campaigns, a defense of drafting by hand before prompting, and a new markdown format that wants to be the source of truth for design systems."
publishedAt: "2026-05-13"
slug: "unicorn-club-2026-05-13-spotify-ads-draftsmanship-component-md"
hashtags: "#unicornclub #ai #design #developer #generated #en"
source_pattern: "Unicorn Club"
---

## Building a Natural Language Interface to the Spotify Ads API with Claude Code Plugins

**TLDR:** Spotify engineering built an open-source Claude Code plugin that lets you describe an ad campaign in plain English and get a correct, sequenced set of Spotify Ads API calls in return. The trick is using OpenAPI Links as a navigation graph, not static tool definitions.

Advertising APIs are a special kind of difficult. They are powerful by design, and that power comes bundled with complexity: the Spotify Ads API v3 has over 30 resource types, nested targeting structures, and a strict entity hierarchy where campaigns contain ad sets that contain ads. If you want to run an audio campaign targeting listeners in Connecticut with a $100/day budget, you need to look up geo-targeting IDs, convert dollar amounts to micro-units, validate audience size, create three separate entities in the right order, and pass IDs between each step. That is a lot of steps to hold in your head before you have bought a single impression.

The plugin the Spotify engineering team built collapses that cognitive distance. You say "Create an audio campaign called Back to School Promo targeting 25-44 year olds in the US with $100/day budget" and the agent decomposes that sentence into the correct sequence of API calls. Every call is surfaced as a curl command you can see and audit. The whole thing is built from markdown files, a bash script, and two small Python helpers. No build step, no package manager, no bundler. It ships as a Claude Code plugin available on GitHub and through Anthropic's marketplace.

The team made a deliberate choice to use Claude Code plugins rather than MCP, and the reasoning is worth understanding. The Spotify Ads API surface is too large for static tool definitions. With MCP you would need to enumerate every endpoint upfront. With Claude Code plugins, the agent loads only the reference documentation relevant to a given request, on demand. The OpenAPI spec ships inside the plugin; the agent reads it when it needs it. That approach scales in a way that static definitions do not.

The architectural detail I find most interesting is their use of OpenAPI Links. Links are a relatively underused part of the OpenAPI spec. They define relationships between operations, specifically how the response from one operation feeds into the parameters of the next. In this plugin, that mechanism is what tells the agent to call campaign first, then ad set, then ad, passing the campaign ID into the ad set creation and the ad set ID into the ad creation. The agent is not guessing the sequence. It is reading a graph.

What is next on the team's roadmap: idempotency key support, exploration of other platforms like Codex and Gemini CLI, and image generation with GPT-5.5 for creative asset production.

**Key takeaways:**
- Claude Code plugins let the agent load documentation on demand, which is a better fit for large API surfaces than static MCP tool definitions
- OpenAPI Links, not just schemas, are what give the agent the correct call sequence without hardcoding it
- The entire plugin is human-readable: markdown, bash, and two small Python files with no build toolchain

**Why do I care:** Any team that owns a large or complex API should be looking at this pattern. The hard part of building AI integrations for APIs is not the model call, it is the context management. Loading only what you need, when you need it, is a real architectural win. The OpenAPI Links angle is something I plan to revisit in my own projects.

**Link:** [Building a Natural Language Interface to the Spotify Ads API with Claude Code Plugins](https://engineering.atspotify.com/2026/5/spotify-ads-api-claude-plugins)

---

## Draftsmanship

**TLDR:** The act of drafting by hand before reaching for an AI tool is not nostalgia. It is how you develop taste, resolve ambiguity, and give the model something worth working with. The prompt you write after drafting is better than the prompt you write instead of drafting.

There is a version of the "AI is replacing design" narrative that I find genuinely annoying, not because it is wrong about AI's capabilities but because it misunderstands what draftsmanship is for. The word comes from "draught," the skill of producing drawings and plans. The argument is usually that AI can now produce those artifacts faster, so the skill is obsolete. But the skill was never really about the artifact.

Drafting develops three things that a tool cannot give you. First, diagnostic capability: you cannot catch problems in someone else's output if you have never worked through the problem yourself. Second, taste and judgment: these are forged by the practice of critiquing and evaluating work over time, not by selecting from a dropdown. Third, what the author calls serendipity, which I would describe as the thinking that happens during the doing. If you start from a prompt, you are curating the model's recombination of existing output. If you start from a sketch, you are resolving ambiguity before the tool ever sees the problem.

The practical implication is concrete. When you photograph a hand-drawn wireframe and drop it into Claude or v0 or Cursor, the sketch carries spatial information that a paragraph of description almost never achieves. Game designers who draw flow diagrams before writing rules get cleaner output. Engineers who draft data models by hand before prompting consistently produce better results because the drawing resolved the ambiguity the model would have otherwise guessed at. The draft is not separate from the prompt, it is the prompt spec.

There is also a team alignment argument here that I think is underappreciated. Before a building goes up, everyone looks at the same drawing. That drawing is alignment. Teams that skip the draft skip that alignment step and end up with different assumptions inside different heads. AI accelerates individual output but has no native mechanism for producing shared understanding when people gather around a problem together.

The framing I keep coming back to: "The best use of AI is as a collaborator after you have drafted. Your thinking goes in, sharper output comes out." That is not a limitation of AI. That is just how good collaboration works.

**Key takeaways:**
- Drafting develops diagnostic capability and taste that cannot be transferred by a tool
- A hand-drawn sketch carries spatial intent that prose prompts rarely match, making it a better prompt spec
- AI accelerates individual output but does not replace the shared alignment that comes from a team working around a drawing

**Why do I care:** I have noticed that my own AI-assisted output is better on days when I have sketched something first. This article gave me language for why. The prompt you write after thinking is a fundamentally different artifact from the prompt you write instead of thinking, and the model can tell the difference even if you cannot always articulate it.

**Link:** [Draftsmanship](https://www.proofofconcept.pub/p/draftsmanship)

---

## Component.md

**TLDR:** Design systems were built for human engineers who could fill in what the file did not say. AI tools cannot fill in what the file does not say, and Figma is not the source of truth everyone assumed it was. Component.md is a proposed markdown format that puts everything in one place so any model can read it.

For about a decade, "design system" and "component library" have been used as if they meant the same thing. That conflation worked because the reader was a human engineer who brought context to the artifact: they knew the token naming conventions, they remembered the Slack thread about focus behavior, they had seen the component in production. The moment the reader is a tool, that implicit knowledge vanishes.

Ian Guisard tested a set of AI tools including Figma Make, Claude Code, Lovable, and Claude Design against real Figma files. The output was consistently wrong: optical alignment off, wrong font weights, spacing wrong by pixels, micro-interactions guessed, token assignments invented. The important observation is that this is not a problem with any individual tool. Every tool in the category produces the same category of errors, and the source of the problem is upstream of the model. The model is not failing, it is working with incomplete information.

The incomplete information is scattered across places that tools cannot read. Part of it is in the Figma file. Part is in the designer's head. The rest lives in Slack threads, code review comments, and tribal knowledge that has never been written down. Figma tells the tool dimensions, colors, and variants. It does not tell it which token governs which state, how focus moves through the component, or what the component announces to a screen reader. That gap is structural, not accidental.

Component.md is the proposed solution: one markdown file per component, platform-agnostic, meant to be the canonical source of truth. The schema covers the API spec with properties and configuration examples, structural spec with dimensions and spacing, color assignment with tokens mapped to elements and states, voice and screen-reader spec with focus order and ARIA roles, and behavioral spec covering dismiss rules, error states, and empty states. Because it is markdown, any LLM can read it. Expose it through MCP and hand it to Claude Design, Claude Code, or Figma Make and you get back an implementation that matches intent.

The workflow for producing these files is two-stage: the uSpec Figma plugin walks through sub-components and outputs a structured JSON, then a create-component-md skill runs specialist agents for structure, color, and screen reader in parallel and converges them into a single file. uSpec 2.0 ships both, free and open source at uspec.design.

**Key takeaways:**
- Figma is a source of information, not the source of truth: it does not capture tokens, accessibility behavior, or interaction logic
- Component.md proposes a single markdown file per component that contains everything a model or a human needs to implement correctly
- The two-stage workflow combines deterministic extraction from Figma with parallel specialist agents converging into one file

**Why do I care:** This is the most actionable thing I have read about design systems in a while. The "design system for humans and tools" framing is exactly right. If you maintain a component library and you are not thinking about what a model sees when it reads your documentation, you are about to find out the hard way what it guesses. Component.md is a concrete answer to a concrete problem, and the fact that it is plain markdown means adoption cost is low.

**Link:** [Component.md](https://ianguisard.substack.com/p/componentmd)
