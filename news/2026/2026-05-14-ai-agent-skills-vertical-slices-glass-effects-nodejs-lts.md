---
title: "AI Agent Skills, Vertical Slices, Glass Effects, and a Node.js LTS Patch"
excerpt: "A mixed bag from daily.dev: Claude Code skills for Kubernetes mirroring, a .NET dev walking back old best practices, a WebGL glass component for Framer, and the latest Node.js 22 LTS."
publishedAt: "2026-05-14"
slug: "ai-agent-skills-vertical-slices-glass-effects-nodejs-lts"
hashtags: "#dailydev #ai-agents #claude-code #kubernetes #dotnet #architecture #testing #framer #webgl #nodejs #javascript #generated #en"
source_pattern: "daily.dev"
---

## Six Claude Code Skills That Close the AI Agent Feedback Loop

**TLDR:** MetalBear shipped six Agent Skills that teach Claude Code, Cursor, and friends how to drive mirrord, the tool that runs your local process as if it were a real pod inside Kubernetes. The pitch is straightforward: stop letting the agent guess at cluster state from log fragments and give it the real network, DNS, and database connections instead.

**Summary:** The six skills cover the obvious lifecycle of working with mirrord. You get a quickstart, a config generator, an operator install path for teams, CI integration testing, per-developer database branching, and Kafka queue splitting. The whole bundle installs with one command, which matters because the friction of wiring up agent tooling is usually where these things die.

The interesting bit is the framing. We have been treating AI coding agents like junior developers who only get to read logs after the fact. That works for syntax fixes and small refactors, but it falls apart the moment your bug only reproduces against a real Postgres replica with a specific row in it, or a Kafka topic with a particular consumer lag. mirrord plus skills means the agent is reading the same env vars, hitting the same DNS, and talking to the same services your app does in staging.

I am a little cautious about the security model here, because once your agent has cluster credentials it has cluster credentials. The db-branching and Kafka splitting skills mitigate that by isolating per-developer state, but you still want to think about what happens when the agent decides to be helpful and DROP something. Worth reading before you install for the whole team.

**Key takeaways:**
- Agent productivity is bottlenecked by feedback quality, not model quality
- Local-runs-as-pod is a real pattern, not just a demo, when the tooling is this packaged
- Per-developer database branches finally make sense when AI agents are in the loop

**Why do I care:** As a frontend dev who also lives in BFFs and edge functions, I rarely touch a real Kubernetes cluster, but the principle here applies one layer up. If I want an AI agent to debug a hydration mismatch or a cache invalidation bug, it needs the actual response, the actual headers, the actual CDN behavior, not a sanitized log. This kind of skill-based tooling is the pattern I want to see for Vercel, Cloudflare, and the rest. Whoever builds it first wins the agent-developer market.

**Link:** [Six Claude Code Skills That Close the AI Agent Feedback Loop](https://app.daily.dev/posts/six-claude-code-skills-that-close-the-ai-agent-feedback-loop-rswuyruvh)

## Best Practices in .NET I Don't Like Anymore

**TLDR:** A .NET dev with seven years in the trenches publicly walks back a stack of patterns he used to evangelize: clean architecture, the testing pyramid, AutoMapper, MediatR, and aggressive repository layers over EF Core. He swaps each one for something flatter and more direct.

**Summary:** The replacements are interesting on their own. Clean architecture becomes vertical slice architecture. The testing pyramid becomes a testing diamond, with the bulk of confidence sitting in integration tests. AutoMapper becomes a hand-written extension method. MediatR becomes a direct service call. The repository-over-EF-Core layer just goes away. None of these are wild ideas in 2026, but seeing someone publicly inventory the patterns they used to defend is rare.

The most honest line is the one about EF Core. He says he was wrong to write it off as too slow, and it turns out to be fast enough for almost everything. That is the kind of correction you do not see often enough in tech writing. People defend their old positions for a decade past the expiration date.

The AI angle is what makes this current. He argues that flatter code with fewer indirection layers is easier for AI coding agents to work with, because the agent does not have to chase a request through five abstractions to figure out where the bug lives. I think this is a real shift in how we should evaluate architecture choices. If your code is hard for a model to follow, it is probably also hard for the human who joined the team last month.

One pushback: vertical slice architecture is great until your slices start sharing logic, and then you need a story for that shared layer. The article does not engage with that much. Be careful about copying the pattern without thinking about your domain.

**Key takeaways:**
- AI agent navigability is becoming a legitimate architectural concern
- Integration tests give more confidence per minute of test runtime than deep unit pyramids
- Public reversals on tech opinions are healthy and we need more of them

**Why do I care:** I see the same pattern in the React world. We piled on abstractions for years, custom hooks wrapping hooks wrapping context, and now I watch agents and new hires get lost in the same code I wrote with good intentions. Flatter is faster to read, faster to change, and faster to grep. I am not throwing away every pattern, but I am much more skeptical of any layer whose only job is to make the next layer testable.

**Link:** [Best Practices in .NET I Don't Like Anymore](https://app.daily.dev/posts/best-practices-in-net-i-don-t-like-anymore-sonxqdcwh)

## Glass: Free Interactions Component for Framer

**TLDR:** Jay Ji released a free Framer Marketplace component called Glass that simulates a glass prism bending light, using WebGL. You get striped distortion, color dispersion, and shimmer on top of images or video, with scroll-based animation hooks.

**Summary:** The component supports custom images and videos as the source, plays nicely with Framer Variants and the native Transition controller, and includes mobile optimization settings so you do not melt phones with shader work. There is precise control over where the animation starts and ends, which is the part that usually trips up scroll-driven effects.

This is the kind of polish that used to require a dedicated WebGL developer and a week of tuning. Seeing it land as a drop-in Framer component is a sign of where the boundary between design tools and code is moving. Designers can ship genuinely advanced visual effects without writing a shader, and developers can crib the technique by inspecting the output.

I am not sure I would put a glass-prism shimmer on a production marketing site, because it is one of those effects that looks amazing once and tired by the third visit. But for a launch page, a portfolio hero, or a press moment, it is exactly the differentiator you want. The free price point also makes it easy to experiment without committing.

**Key takeaways:**
- WebGL effects are getting packaged for design tools, not just code
- Scroll-driven animation is now expected to include start and end controls, not just a trigger
- Mobile shader budgets matter, and good components surface them as settings

**Why do I care:** Most of the marketing-site work I review uses CSS filters and blur to fake depth. Real WebGL distortion looks different in a way that users register without being able to name. If you ship product pages, this is the kind of detail that can move conversion. Just be honest about whether your audience cares, because shipping a shader to people on a 3G connection is not a flex.

**Link:** [Glass: Free Interactions Component by Jay Ji on Framer Marketplace](https://app.daily.dev/posts/04enqUR4r)

## Node.js 22.22.3 LTS Released

**TLDR:** A maintenance release for the Jod LTS line with a long list of bug fixes and dependency bumps. Nothing flashy, but several of the fixes are the kind you want in production sooner rather than later.

**Summary:** The notable fixes include a potential null pointer dereference in crypto, a use-after-free in zlib when reset is called during a write, a FileHandle leak in http2 respondWithFile, a keep-alive socket reuse race in plain HTTP, and a process crash from a malformed UNC hostname in pathToFileURL. If you run high-volume HTTP services on Node, the keep-alive race and the http2 leak are the ones to read about. Both are the kind of issue that hides for months under normal load and then bites you during a traffic spike.

There are also several ESM and CJS module resolution fixes, which always make me nervous because they are the changes most likely to break a perfectly working build in subtle ways. Read the changelog before you upgrade if your project does anything clever with conditional exports.

Dependency updates are substantial. OpenSSL goes to 3.5.6, SQLite to 3.52.0, npm to 10.9.8, llhttp to 9.3.1, simdjson to 4.5.0, and root certificates are refreshed to NSS 3.121. The OpenSSL bump alone is worth taking promptly if you handle TLS termination in Node.

**Key takeaways:**
- HTTP keep-alive socket reuse race is the headline fix for high-traffic services
- OpenSSL and root cert updates make this a quiet but important security bump
- ESM and CJS resolution changes deserve a careful read before you ship

**Why do I care:** I run enough Node services to have been bitten by an http2 file handle leak at exactly the wrong moment, and I have written more pathToFileURL workarounds than I want to admit. Patch releases like this are unglamorous and they are the reason your service stays up over the weekend. Schedule the upgrade for next week, do not let it sit until next quarter.

**Link:** [Node.js 22.22.3 LTS Release Notes](https://app.daily.dev/posts/tGSCDOwZt)
