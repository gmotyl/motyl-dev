---
title: "Mock Everything, Measure the Right Thing: aimock, Rust-to-TypeScript Parser Rewrite, and a CSS Percentage WTF"
excerpt: "Three stories from the daily.dev feed: a unified AI app mock infrastructure, a counterintuitive WASM performance lesson, and a charmingly absurd CSS padding value."
publishedAt: "2026-04-10"
slug: "dailydev-aimock-rust-wasm-typescript-css-percentage-wtf"
hashtags: "#dailydev #typescript #rust #wasm #frontend #css #ai #testing #devtools #open-source #generated #en"
source_pattern: "daily.dev"
---

## aimock: Mock Everything Your AI App Talks To

**TLDR:** CopilotKit released aimock, an open-source TypeScript library that mocks the full stack of external services an AI app communicates with. LLM providers, MCP tools, agent-to-agent protocols, vector databases, and search APIs -- all on a single port, zero external dependencies.

**Summary:**

Testing AI applications has an infrastructure problem. You have a dozen external dependencies, each with their own behavior, pricing, latency profile, and occasional unavailability. In a traditional app you mock a database or an HTTP client and you're done. An AI app calls an LLM, which might call a tool over MCP, which might retrieve from a vector DB, which might rerank with a separate model. Mocking any one of those in isolation doesn't give you the full picture.

aimock covers the whole surface in one package. It handles eleven LLM providers including OpenAI, Claude, Gemini, Bedrock, and Azure with full streaming support. It includes MCP mocking with session management, agent-to-agent protocol support with server-sent events, and drop-in compatible mocks for Pinecone, Qdrant, and ChromaDB. There's also Tavily search and Cohere reranking if your pipeline uses those.

What I find genuinely interesting is the record-and-replay approach. You run your app against real APIs once, save the interactions as fixtures, and then replay them deterministically forever after. No network calls in CI, no API costs during development, no flaky tests because the model returned something slightly different today than yesterday. That determinism is exactly what you need to write reliable tests for AI pipelines.

The chaos testing angle is also worth paying attention to. You can configure any mock to throw 500 errors, emit malformed JSON, or disconnect mid-stream at configurable probabilities. Testing whether your app handles a mid-stream disconnect from an LLM is the kind of thing that's almost impossible to test against a real API. It happens just rarely enough that you'd never want to wait for it in a test suite.

The whole thing is TypeScript, built with only Node.js builtins, and ships as both an npm package and a Docker container. The MIT license means you can use it freely and audit exactly what it does. For anything touching AI infrastructure in a production context, being able to read the mock implementation and know it isn't silently doing something unexpected is worth a lot.

**Key takeaways:**
- Mocks eleven LLM providers, MCP, A2A, AG-UI, vector databases, and search APIs from a single port
- Record-and-replay lets you capture real API interactions and replay them deterministically in CI
- Chaos testing simulates 500 errors, malformed JSON, and mid-stream disconnects at configurable rates
- Built in TypeScript with zero external dependencies, available on npm and Docker
- MIT licensed, open source, auditable

**Why do I care:** AI app testing is a mess right now. Most teams either run tests against real APIs (expensive, flaky, nondeterministic) or skip integration-level testing entirely (dangerous). aimock gives you a third option that's actually practical. The record-and-replay feature alone makes this worth trying on any project that talks to LLMs. The streaming support is what separates it from the half-dozen simpler mocking tools I've seen -- handling mid-stream disconnects and streaming latency simulation is where real-world AI app failures actually happen.

**Link:** [GitHub - CopilotKit/aimock: Mock everything your AI app talks to](https://github.com/CopilotKit/aimock)

---

## Rewriting a Rust WASM Parser in TypeScript Was the Right Call

**TLDR:** The OpenUI team rewrote their Rust-compiled-to-WebAssembly parser in TypeScript and got 2.2x to 4.6x faster per-call performance. The bottleneck was never the parsing logic -- it was the JavaScript-to-WASM boundary overhead every time they crossed it.

**Summary:**

This is one of those posts that deserves wide circulation because it confirms something a lot of people suspect but rarely see measured carefully. Rust compiled to WASM is not automatically faster. It depends entirely on where the bottleneck actually is.

The OpenUI team built a six-stage parsing pipeline in Rust -- lexer, parser, AST transformation, the works -- that ran on every streaming chunk coming out of an LLM. The idea was that a performance-critical parser deserved a performance-focused language. Reasonable assumption on paper. Wrong in practice.

The actual bottleneck was boundary crossing. Every time the JavaScript side called into the WASM module, the string had to be copied in, the result serialized to JSON in Rust, the JSON string copied out, and then V8 had to deserialize it back into a JavaScript object. The Rust parsing itself was fast. The moving of data in and out was not. You're paying that overhead on every streaming chunk, which in an LLM streaming context means hundreds of times per second.

They tried the obvious optimization first: serde-wasm-bindgen for direct object passing instead of JSON round-trips. It was actually nine to twenty-nine percent slower. The reason is counterintuitive but makes sense when you understand how V8 works. Passing objects field-by-field across the runtime boundary means hundreds of tiny internal conversions. JSON serialization, by contrast, happens entirely in Rust in one pass, and V8's JSON deserialization is a single highly optimized C++ operation. One big copy beats many small copies.

The TypeScript rewrite, combined with changing from O(N-squared) re-parsing of the full buffer on each chunk to O(N) incremental caching of completed statements, gave them 2.6x to 3.3x improvement in streaming performance. The algorithmic fix and the language switch contributed roughly equally. That's the part that deserves emphasis: getting the algorithm right mattered as much as the language choice.

The conclusion isn't "WASM is bad." It's that WASM helps when you have a compute-bound operation with minimal data marshaling -- cryptography, image processing, heavy numerical work. It hurts when you have a frequently-called function on small inputs where the boundary overhead dominates. Profile before you decide.

**Key takeaways:**
- The JS-to-WASM boundary overhead, not the parsing logic, was the bottleneck
- serde-wasm-bindgen direct object passing was 9-29% slower than JSON due to per-field conversion costs
- TypeScript rewrite achieved 2.2x to 4.6x per-call speedup
- Streaming performance improved 2.6x to 3.3x through statement-level incremental caching
- WASM helps with compute-bound work with minimal marshaling; hurts for frequently-called functions on small inputs

**Why do I care:** Every few months I see a team reach for WASM because they have "a performance-critical piece" and assume native-speed parsing is the answer. This article gives you the language to push back on that assumption. Measure the boundary crossing cost first. For any parser or text-processing pipeline that runs inside a JavaScript environment with streaming input, the data marshaling is almost always the bottleneck. The algorithmic improvement from incremental caching being as impactful as the language change is also a useful reminder that O-complexity often matters more than language selection.

**Link:** [Rewriting our Rust WASM Parser in TypeScript](https://www.openui.com/blog/rust-wasm-parser)

---

## Take a Percentage

**TLDR:** A major news site's CSS contains the padding value `57.14285714285714%` derived from a 560:320 video aspect ratio. It is technically correct. It is also delightfully absurd.

**Summary:**

The Daily WTF is one of those sites where the article is almost always shorter than the laugh. This one is essentially a single CSS property: `padding-bottom: 57.14285714285714%`.

The origin story is straightforward. A video player with a 560 by 320 pixel aspect ratio produces that exact ratio when you divide 320 by 560 and multiply by 100. Whoever wrote that CSS either let their calculator output spill directly into the stylesheet, or a code generator did it for them and nobody thought to round. The video player class, delightfully, is called `VHS`.

The editor's take -- that there's nothing technically wrong with it, that future displays with quadrillions of pixels will appreciate the precision -- is the exactly right way to look at it. The code works. The value is correct. It will render the same as `57.14%` in every browser that has ever existed and every browser that will ever exist. The sub-pixel precision is completely irrelevant to the visual output.

What makes this worth two minutes of your time is that it captures something real about how codebases accumulate quirks. Nobody wrote `57.14285714285714%` on purpose with some considered rationale. It got there through a sequence of reasonable individual steps that produced an unreasonable result. That's most legacy code, really.

**Key takeaways:**
- The value `57.14285714285714%` is the mathematically exact result of 320/560 as a percentage
- It is functionally identical to `57.14%` in every real-world browser scenario
- The video player container element is named `VHS`
- There is nothing wrong with it, which is the whole joke

**Why do I care:** It's a Wednesday, this made me smile, and sometimes that's enough. More seriously, it's a reminder to have a rounding step in any automated CSS generation pipeline. If you're computing layout values programmatically, round to two or three decimal places before emitting. Your stylesheet doesn't need floating-point precision to lay out a video player.

**Link:** [Take a Percentage](https://thedailywtf.com/articles/take-a-percentage)
