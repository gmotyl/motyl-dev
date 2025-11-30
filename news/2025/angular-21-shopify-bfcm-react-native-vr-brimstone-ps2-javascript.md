---
title: "Angular 21, Shopify BFCM Engineering, React Native VR, Brimstone JS Engine, and PS2 Game Development"
excerpt: "Deep dive into Angular 21 release, Shopify's massive BFCM infrastructure preparation, React Native on Meta Quest VR platform, new Brimstone JavaScript engine in Rust, and making PS2 games with JavaScript using AthenaEnv"
publishedAt: "2025-11-22"
slug: "angular-21-shopify-bfcm-react-native-vr-brimstone-ps2-javascript"
hashtags: "#generated #en #angular #frontend #shopify #performance #scalability #react-native #vr #javascript #rust #gamedev"
---

## Shopify's BFCM Infrastructure Readiness: Nine Months of Preparation

**TLDR:** Shopify spent nine months preparing for Black Friday Cyber Monday with five massive scale tests simulating 150% of last year's peak load. They ran tests so large they coordinated with YouTube and executed them at night, using chaos engineering, regional failovers, and continuous resilience documentation to handle millions of concurrent shoppers.

Shopify's preparation for BFCM represents one of the most sophisticated infrastructure readiness programs in e-commerce. Their 2024 performance numbers set the bar impossibly high: 57.3 petabytes of data processed, 10.5 trillion database queries, 1.19 trillion edge requests, and peak traffic hitting 284 million requests per minute. What's remarkable is that this level of traffic has become Shopify's baseline for regular operations.

The preparation strategy revolves around three parallel workstreams running simultaneously from March onward. First, capacity planning uses historical data and merchant growth projections to model traffic patterns and submit infrastructure requirements to cloud providers months in advance. Second, the infrastructure roadmap evaluates architectural changes and sequences migrations well before the critical BFCM window. Third, risk assessments through "What Could Go Wrong" exercises document failure scenarios and feed into their Game Day simulations.

Game Days deserve special attention. These chaos engineering exercises simulate production failures at BFCM scale, testing critical user journeys like checkout, payment processing, and order fulfillment. Teams inject network faults, introduce latency, randomize navigation patterns, and cache-bust to create realistic load. The exercises build muscle memory for incident response and expose gaps in monitoring and playbooks. All findings feed into their Resiliency Matrix, a living document that tracks vulnerabilities, recovery procedures, operational playbooks, and on-call coverage across the entire platform.

The scale testing program pushes beyond component-level tests to validate the entire platform working together at peak volumes. Five major tests from April through October ramped from baseline validation to 146 million requests per minute and 80,000+ checkouts per minute. The final test hit 200 million RPM at p99 load. Tests simulate real user behavior including storefront browsing, admin API traffic, analytics loads, and backend webhook processing. They also execute regional failovers, evacuating traffic from core US and EU regions to validate disaster recovery capabilities.

What stands out is how they handle newly rebuilt systems with no historical BFCM data. Their analytics platform was completely rebuilt in 2024 with new ETL pipelines, persistence layers, and APIs. The ETL had one season of production data, but the API layer launched after peak season, creating an asymmetry. Game Days revealed that Kafka partitions needed increases to maintain data freshness, API memory usage required optimization through profiling, and connection timeouts needed tuning to prevent pool exhaustion. This systematic approach to unknown capacity limits shows mature engineering discipline.

For architects and teams, Shopify's approach offers several key insights. The Resiliency Matrix provides a template for documenting system health across large organizations. Their bimonthly fire drills create institutional knowledge rather than relying on heroic individual efforts during incidents. The decision to avoid using BFCM as a release deadline eliminates pressure-driven mistakes. Most importantly, their testing infrastructure isn't temporary scaffolding—tools like Critical Journey Game Days and real-time adaptive forecasting become permanent improvements that make the platform more resilient year-round.

**Key takeaways:**
- Nine months of preparation with five major scale tests simulating 150% of previous peak load
- Resiliency Matrix documents vulnerabilities, recovery procedures, and incident response across all services
- Game Days use chaos engineering to build incident response muscle memory and expose monitoring gaps
- No BFCM release deadlines—all architectural changes complete months before peak season
- Testing infrastructure becomes permanent platform improvements rather than temporary scaffolding

**Tradeoffs:**
- Massive scale testing provides confidence but requires coordinating with CDN providers and running tests at night
- Year-round resilience program catches issues early but demands significant engineering resources
- Multi-region failover capability increases availability but adds operational complexity

**Link:** [How we prepare Shopify for BFCM (2025)](https://shopify.engineering/bfcm-readiness-2025)

## React Native on Meta Quest: Building VR Experiences with JavaScript

**TLDR:** Meta announced a Developer Competition with $1.5 million in prizes for React Native VR apps on Quest. You can build meditation apps, interactive games, mixed reality experiences, and social experiments using React Three Fiber, expo-audio, react-native-vision-camera, and PartyKit for multiplayer functionality.

The Meta Quest platform opening up to React Native creates an interesting opportunity for web and mobile developers to enter VR development without learning entirely new toolchains. The competition offers $25,000 for standout submissions across multiple categories, lowering the barrier for experimentation.

What makes VR compelling from a development perspective is the unique feature set you can leverage: full 3D space manipulation, camera passthrough for augmented reality overlays, spatial audio that responds to head position, and controllers with haptic feedback or hand tracking. The key insight here is taking familiar concepts and reimagining them for the medium rather than directly porting mobile experiences.

Meditation and relaxation apps represent a natural fit for VR. The platform gives you complete control over the user's environment, eliminating distractions that plague mobile meditation apps. Reanimated and Skia provide the animation primitives for guiding users through breathing exercises with performant, beautiful visualizations. The challenge lies in syncing audio tracks with visual elements using expo-audio, creating that immersive multisensory experience. Will Candillon's recreation of the Apple Watch breathing exercise demonstrates how React Native can handle these smooth, organic animations.

Interactive games push React Native into territory traditionally dominated by Unity and Unreal Engine. The recommendation to focus on a single mechanic and build the gameplay loop around it echoes the Super Hot approach—created during a 7-day game jam, yet refined into a compelling experience. React Three Fiber enables 3D scene rendering directly in React Native, opening doors to spatial puzzle games like Sudoku or Nonogram. For developers willing to experiment, the newly released Godot integration with React Native offers another path, though it remains largely untested in production.

Mixed reality applications using camera passthrough create AR-like experiences that blend digital elements with physical surroundings. react-native-vision-camera's Frame Processors enable real-time camera feed modification, allowing you to overlay 2D and 3D elements in 3D space. Combining this with object detection—identifying food, plants, or faces—and integrating with AI services opens up practical use cases: nutritional information overlays, plant identification, interactive art gallery guides, or furniture placement visualization. First Encounters on Meta Quest and Face Raiders on Nintendo 3DS provide reference points for how to blend real and virtual worlds effectively.

Social experiments in VR tap into the medium's ability to make digital spaces feel physically present. Voice, gestures, and spatial presence translate real-life interaction dynamics into code in ways mobile and desktop cannot match. Concepts like digital gardens—living, evolving spaces that grow with user interaction—or shared drawing boards where people co-create and remix collaboratively become feasible. PartyKit simplifies the multiplayer infrastructure challenge by providing server-side presence, WebSocket synchronization, and state-sharing without requiring custom backend development. The idea of bringing back Digital Touch from iMessage—short, expressive signals sent in real time—could make VR social spaces feel more human and less like video game lobbies.

For architects and teams, this represents an opportunity to prototype VR experiences using existing JavaScript expertise rather than investing in Unity/C# training. The abstraction level remains relatively low—you'll still implement collision detection and scene management yourself—but the familiarity of React patterns and npm ecosystem reduces cognitive overhead. Teams should consider VR prototyping for industries like real estate (property tours), education (immersive learning), retail (virtual try-on), and remote collaboration (spatial meetings).

**Key takeaways:**
- Meta Developer Competition offers $1.5 million total prizes for React Native VR apps
- React Three Fiber enables 3D rendering while maintaining React patterns and component model
- Camera passthrough with react-native-vision-camera opens AR use cases: object detection, spatial overlays
- PartyKit simplifies multiplayer VR development with WebSocket sync and server-side presence
- Focus on single mechanics and VR-native interactions rather than porting existing mobile apps

**Tradeoffs:**
- JavaScript in VR provides familiar tooling but sacrifices performance compared to native engines like Unity
- Lower abstraction level means implementing collision detection and scene management yourself
- React Native on Quest is unproven at scale compared to established VR development pipelines

**Link:** [What You Can Build With React Native on Meta Quest](https://www.callstack.com/blog/what-you-can-build-with-react-native-on-meta-quest)

## Brimstone: A New JavaScript Engine Written in Rust

**TLDR:** Brimstone is a new JavaScript engine written from scratch in Rust, achieving over 97% ECMAScript language support on test262. It features a bytecode VM inspired by V8's Ignition, a compacting garbage collector, custom RegExp engine, and custom parser—all implemented with minimal dependencies except ICU4X.

Building a JavaScript engine from scratch in 2025 might seem quixotic given V8's dominance and the massive engineering effort browsers pour into their engines. Yet Brimstone demonstrates that modern systems programming languages like Rust make this undertaking tractable for determined individuals or small teams.

The architecture choices reveal careful study of existing engines. The bytecode VM takes heavy inspiration from V8's Ignition interpreter, which replaced V8's previous Full-codegen compiler in 2016. Ignition compiles JavaScript to compact bytecode rather than machine code, reducing memory overhead and enabling faster startup times. Brimstone adopts this model, suggesting the developer prioritizes reasonable performance and maintainability over bleeding-edge optimization.

The garbage collector warrants attention. Writing a compacting GC in Rust requires extensive use of unsafe code, as Rust's ownership system fundamentally conflicts with garbage collection's need to move objects in memory and update all references. This tension between Rust's safety guarantees and the requirements of high-performance runtime systems represents one of the language's known pain points. The fact that Brimstone ships with a working compacting collector suggests significant engineering sophistication.

Test262 compliance over 97% puts Brimstone ahead of many hobbyist engines. Test262 is the official ECMAScript conformance test suite, currently containing over 45,000 tests covering language semantics, built-in objects, and edge cases. Reaching this level of compliance requires implementing not just the happy paths but the obscure corners of the specification. The missing features—SharedArrayBuffer and Atomics—relate to concurrent JavaScript execution across threads, which adds substantial complexity for relatively niche use cases.

The decision to implement almost everything from scratch with minimal dependencies reflects a philosophy common in systems programming communities: understanding through implementation. The custom RegExp engine means implementing NFA or DFA-based pattern matching, backtracking, lookahead assertions, and Unicode property escapes. The custom parser means handling automatic semicolon insertion, context-sensitive grammar rules, and early error detection. These components represent months of work individually.

For architects and teams, Brimstone's existence signals that Rust has matured sufficiently as a systems language to support JavaScript engine development outside of browser vendor teams. This has implications for embedded JavaScript scenarios: game scripting, plugin systems, edge computing, and IoT devices. While V8 and SpiderMonkey will dominate production use cases, alternative engines with different performance characteristics or security profiles create options for specialized deployment scenarios.

The "not ready for production" disclaimer is honest and expected. JavaScript engines require years of fuzzing, security hardening, performance optimization, and real-world usage before reaching production readiness. What Brimstone demonstrates is that the fundamental engineering challenges are tractable, and Rust's safety features reduce the attack surface compared to C++-based engines.

**Key takeaways:**
- Over 97% ECMAScript language support on test262 conformance suite
- Bytecode VM architecture inspired by V8's Ignition interpreter for reasonable performance
- Compacting garbage collector implemented in unsafe Rust demonstrates language sophistication
- Custom RegExp engine and parser built from scratch with minimal external dependencies
- Missing only SharedArrayBuffer and Atomics from full ES2024 and stage 4 proposal support

**Tradeoffs:**
- Building from scratch provides deep understanding but sacrifices years of optimization work in mature engines
- Rust safety features reduce attack surface but compacting GC requires extensive unsafe code
- 97% test262 compliance shows strong fundamentals but remaining 3% includes tricky edge cases

**Link:** [Brimstone JavaScript Engine](https://github.com/Hans-Halverson/brimstone)

## Making PlayStation 2 Games in JavaScript with AthenaEnv

**TLDR:** AthenaEnv is an environment that runs JavaScript on PS2 hardware using an embedded QuickJS engine. It provides a p5.js-like API for rendering sprites, handling input, loading assets, and playing audio, enabling developers to create PS2 games in JavaScript and distribute them as ISO files.

The PlayStation 2 has a well-deserved reputation as a difficult platform to develop for, traditionally requiring C or C++ and intimate knowledge of the console's unusual architecture. AthenaEnv subverts this entirely by embedding QuickJS—a small, embeddable JavaScript engine—and exposing a game development API that JavaScript developers can use.

The architecture is straightforward: Athena is the PS2 native program written in C that takes your JavaScript code, passes it through QuickJS for interpretation, and runs the resulting logic on the system. The API abstraction level sits somewhere between p5.js, the HTML Canvas API, and Raylib. You get sprite rendering, text display, shape drawing, asset loading for images and sounds, input handling for controllers and even mouse/keyboard, file handling for save games, and sound playback. What you don't get is higher-level game engine features like built-in collision detection, scene management, or physics simulation—you implement those yourself.

The development workflow proves surprisingly ergonomic. Open the project folder in VS Code, open athena.elf in PCSX2 emulator, make changes to your JavaScript, then reset the emulator to see updates. While not as seamless as web development's hot reloading, the iteration cycle remains fast enough for productive development. The athena.ini configuration file sets your entry point and boot preferences, keeping project setup minimal.

The sprite animation implementation reveals both the API's capabilities and limitations. To animate a spritesheet, you manually define frame boundaries using startx, endx, starty, endy properties, then cycle through frames based on a timer. This low-level approach gives you complete control but requires more boilerplate than modern game engines. Sprite flipping for directional facing demonstrates another manual technique: providing negative width/height values with position offsets to compensate for the top-left origin point. These patterns will be familiar to anyone who's worked with Canvas API or legacy 2D game frameworks.

Input handling through the Pads module provides straightforward button state checking. The decision to handle frame rate independence internally when using the Screen.display() method eliminates the need for manual deltaTime calculations, simplifying movement code. This design choice trades flexibility for ease of use, appropriate for the target audience of JavaScript developers experimenting with retro game development.

Distribution as ISO files solves the accessibility problem. End users don't need to understand the development setup—they just open the ISO in their emulator or burn it to a disc for real hardware. The conversion process from zip to ISO using web services isn't elegant, but it works. The requirement to select files individually rather than zipping a folder hints at boot sector or file table quirks in the ISO generation process.

The 3D capabilities remain unexplored in the article, with version 4 currently in development focusing on 3D. This makes sense given that 2D game development has a lower knowledge barrier and the PS2's 3D capabilities require understanding 3D graphics pipelines, model loading, texturing, and lighting. The existing 3D demos suggest the functionality exists for those willing to dive deeper.

For architects and teams, AthenaEnv represents an interesting case study in language runtime portability. QuickJS's small footprint makes it suitable for embedded scenarios where V8 would be overkill. The API design choices—favoring simplicity over features—create a tight learning curve. The broader lesson is that retro hardware can serve as a testing ground for embedded JavaScript applications without the complexity of modern web platform APIs.

**Key takeaways:**
- AthenaEnv embeds QuickJS JavaScript engine to run JS code on PlayStation 2 hardware
- API similar to p5.js or Canvas API: sprite rendering, input handling, asset loading, sound playback
- Development workflow uses VS Code for editing and PCSX2 emulator with reset cycle for testing
- Distribution as ISO files makes games accessible to end users without development setup
- Low-level API provides control but requires manual implementation of collision detection and scene management

**Tradeoffs:**
- JavaScript on PS2 lowers barrier to entry but sacrifices performance compared to native C/C++ development
- Simple API is easy to learn but lacks modern game engine features like built-in physics
- Distribution as ISO works but conversion process from zip is clunky and requires web services

**Link:** [You Can Now Make PS2 Games in JavaScript](https://jslegenddev.substack.com/p/you-can-now-make-ps2-games-in-javascript)

---

*This summary aims to provide insights and context for software professionals. Always verify technical details and test implementations in your specific environment before making architectural decisions.*