---
title: "AI Wiring Wars, Quantum jBPM, and the Hidden Cost of Agent-Written Code"
excerpt: "HackerNoon's June 17 edition spans the companies building AI infrastructure at scale, a wild take on jBPM as a quantum orchestration layer, and a sharp look at what AI-generated code actually costs us."
publishedAt: "2026-06-17"
slug: "ai-wiring-wars-quantum-jbpm-agent-written-code-cost"
hashtags: "#HackerNoon #ai #agents #architecture #engineering #open-source #generated #en"
source_pattern: "HackerNoon"
---

## The Companies Rewiring the Future of AI

**TLDR:** Training a frontier AI model means convincing hundreds of thousands of chips to behave like one giant computer. The hard part is not the chips — it is the wiring. Meta, Google, Microsoft, and Oracle are all taking different approaches to the backend fabric problem, and the divergence is more interesting than the convergence.

**Summary:** There is a thing that does not get enough coverage in the AI gold rush: the network. Not the neural network — the literal cables and protocols connecting all those GPUs together. When you are running a training job across a hundred thousand accelerators, the interconnect becomes the constraint. And the hyperscalers are not all solving it the same way.

Meta went with Ethernet and RoCEv2, which is a notable bet. InfiniBand has dominated high-performance computing for years, and Meta's decision to build on commodity networking protocols says something about where they think the industry is going. Their signature moves — receiver-driven flow control, E-ECMP, a two-stage Clos topology, QP scaling — are real engineering choices with real tradeoffs. Ethernet is cheaper and more widely understood. It is also harder to get right for latency-sensitive collective operations.

Google, Oracle, and Microsoft each have their own signature approaches, and what the article surfaces is that this is not a solved problem with one right answer. It is an active arms race in systems infrastructure that happens to make AI training faster or slower by enormous margins. A few percentage points of interconnect efficiency at this scale can mean weeks of training time. That is not a rounding error.

What the article does not address directly is the feedback loop: the companies that get the fabric right get the models right, which funds the next generation of fabric research. The infrastructure choices made in 2025 and 2026 are going to shape which organizations can realistically train frontier models in 2028. This is not just interesting — it is the actual moat.

**Key takeaways:**
- Ethernet-based fabrics (RoCEv2) are a legitimate frontier choice, not a compromise
- Each hyperscaler is making meaningfully different architectural bets on backend interconnect
- The wiring problem — not the chips — may be the actual differentiator in large-scale AI training

**Why do I care:** As someone who thinks about system architecture, the backend fabric question is a proxy for a broader design principle: at sufficient scale, the coordination layer always becomes the bottleneck. We see the same thing in distributed frontend systems — the state synchronization and the network topology end up mattering more than the individual node performance. Understanding how Meta and Google are thinking about flow control and topology gives me a useful mental model for thinking about distributed systems problems in general.

**Link:** [The Companies Rewiring the Future of AI](https://hackernoon.com/the-companies-rewiring-the-future-of-ai)

---

## jBPM as a Quantum Orchestration Platform

**TLDR:** An author proposes extending jBPM — a Java-based business process management engine — to orchestrate quantum computations and fold the results back into business workflows. It builds on a previous article about using jBPM for AI orchestration. The idea is ambitious; the grounding is thin.

**Summary:** I want to be fair to this article because the ambition is real. The author is asking a genuinely interesting question: if you already have a workflow orchestration engine that can coordinate AI workloads, can you extend it to coordinate quantum computations? And the answer is probably yes, in the same way that you can extend anything to do anything if you write enough adapter code.

But there are a few things worth naming here. First, quantum computing in 2026 is still largely in the "useful for specific narrow problems" category. Error rates are falling, qubit counts are rising, but the gap between "we ran Shor's algorithm on a toy problem" and "we are orchestrating production quantum workloads through jBPM" is measured in years, possibly decades. The framing of this article somewhat elides that gap.

Second, jBPM is a legitimate piece of software with a real community, but it is not exactly the first thing I think of when I think about AI orchestration platforms. The author references an open-source project (C-NLTX) as supporting infrastructure, but the article in the newsletter body does not give enough detail to evaluate whether that project does what the author claims. That is a real gap.

What the author is not thinking about: the impedance mismatch between quantum computing's probabilistic outputs and the deterministic branching logic that workflow engines like jBPM are built around. Quantum results are not just another API response. They are probabilistic, measurement-dependent, and often require multiple circuit runs to converge on a useful answer. Plugging that into a BPMN process definition is not trivial, and the article does not grapple with that directly.

**Key takeaways:**
- The idea of a unified orchestration layer spanning classical, AI, and quantum compute is worth taking seriously even if the current tooling is not ready
- jBPM's process model may need significant extension to handle probabilistic, non-deterministic outputs from quantum circuits
- Open-source quantum-classical integration projects like C-NLTX are worth watching, with appropriate skepticism about maturity

**Why do I care:** Workflow orchestration is a problem I think about a lot in the context of frontend architecture — specifically around how AI agents and multi-step async processes get coordinated. The questions this article raises about integrating non-deterministic systems into process engines are directly relevant to anyone building agent-driven features. Even if quantum compute is not on your roadmap, the design challenges transfer.

**Link:** [jBPM as a Quantum Orchestration Platform](https://hackernoon.com/jbpm-as-a-quantum-orchestration-platform)

---

## The Real Cost of Agent-Written Software

**TLDR:** As AI agents write more and more code, the cost of software development has not disappeared — it has moved. The price relocated from writing code to finding bugs of omission: failures that exist because nobody specified what should happen in edge cases. That is harder to see and harder to fix.

**Summary:** This is the article I have been waiting for someone to write. The "AI writes code now so developers are free to do higher-level work" narrative has always glossed over a specific problem: AI agents write the code you asked for, not the code you needed. The delta is not syntax errors or logic bugs you can unit test. It is missing behavior — the guard clause nobody wrote, the error path nobody specified, the edge case nobody anticipated.

The author's framing is that the price of AI-generated code fell to near zero, and the cost relocated to the failure paths. I think that is exactly right, and it has a second-order effect that the article hints at but does not fully develop: the failure modes of agent-written code are systematically different from the failure modes of human-written code. Human developers fail in locally visible, often self-correcting ways. They forget things, but they also catch things they did not mean to catch because they were reading adjacent code. Agents do not do that. They optimize for the stated spec, full stop.

The other thing worth noting: as the volume of AI-written code in a codebase grows, the cost of review also changes character. You are no longer reviewing for "did the author understand the problem?" You are reviewing for "what did the author not understand that they thought they did?" That is a fundamentally different cognitive task, and most code review tooling and culture is not set up for it.

**Key takeaways:**
- The cost of AI-generated code shifted from writing to finding bugs of omission — missing behavior rather than wrong behavior
- Agent-written code optimizes for the stated spec and systematically misses unstated assumptions
- Code review practices need to adapt for a world where reviewers are looking for absence, not presence

**Why do I care:** This hits directly on my work. I am increasingly using AI agents for code generation, and the failure mode described here is exactly what I keep running into. The agent writes a component that does what I described, but it does not do the thing I assumed any reasonable developer would also include. Building better specification habits — writing more explicit acceptance criteria before the agent runs — is the practical response, but it requires discipline and a shift in how we think about requirements.

**Link:** [The Real Cost of Agent-Written Software](https://hackernoon.com/the-real-cost-of-agent-written-software)

---

## BGP-Based Congestion Signaling for Leaf-Spine Data Center Fabrics

**TLDR:** A proposal to use BGP as a fabric-wide congestion signaling mechanism in leaf-spine data center networks. The goal is to reduce tail latency for AI workloads and improve ECMP path balance by giving the routing layer real-time visibility into congestion state.

**Summary:** This is a technical deep-dive into a specific networking problem that matters a lot if you are running GPU clusters at scale. Leaf-spine is the dominant topology for modern data center networks because it provides predictable bandwidth and low latency. But ECMP — equal-cost multipath routing — can produce poor load balancing when traffic is not uniformly distributed, which is common in AI training workloads where collective operations create synchronized bursts.

The author's proposal is to use BGP, the internet's primary routing protocol, as a signaling layer for congestion information. Rather than each switch making local decisions based on local queue depth, the idea is to propagate congestion signals across the fabric so that path selection can be made with better global information. This is a real engineering problem and the BGP approach is not obvious — BGP is a slow-converging protocol designed for inter-domain routing, not sub-millisecond fabric response. Using it for congestion signaling requires either accepting some latency in signal propagation or extending BGP in ways that change its operational characteristics.

What I want to know more about: how this interacts with existing ECN (Explicit Congestion Notification) mechanisms that operate at the hardware level, and whether the BGP signaling overhead is acceptable in practice compared to alternatives like in-band telemetry. The article mentions FRRouting as the implementation vehicle, which is a solid open-source routing platform, but the practical deployment story for this in a production Clos fabric is not trivial.

**Key takeaways:**
- AI training workloads create synchronized traffic bursts that stress ECMP load balancing in ways that general-purpose web traffic does not
- BGP as a congestion signaling plane is an interesting architectural idea but carries inherent tension between protocol convergence speed and real-time fabric responsiveness
- FRRouting provides a practical open-source implementation path for experimenting with this approach

**Why do I care:** Most frontend and full-stack developers do not spend time thinking about leaf-spine fabric design, and honestly that is probably fine. But for anyone building systems that depend on large-scale distributed compute — and increasingly that means anyone integrating AI inference at scale — understanding where the latency comes from is useful. The tail latency problem described here is the same tail latency that shows up in AI API response time distributions. It is not a mystery; it is a consequence of network design choices.

**Link:** [BGP-Based Congestion Signaling for Leaf-Spine Data Center Fabrics](https://hackernoon.com/bgp-based-congestion-signaling-for-leaf-spine-data-center-fabrics)
