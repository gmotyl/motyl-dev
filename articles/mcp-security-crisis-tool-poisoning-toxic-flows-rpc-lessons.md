---
title: "MCP Security Crisis: Tool Poisoning, Toxic Flows, and the Dangerous Dismissal of 40 Years of RPC Wisdom"
excerpt: "The Model Context Protocol's rapid adoption has exposed critical security vulnerabilities and architectural flaws that threaten enterprise deployments."
publishedAt: "2025-11-18"
slug: "mcp-security-crisis-tool-poisoning-toxic-flows-rpc-lessons"
hashtags: "#generated #en #ai #security #architecture #mcp #oauth #rpc #llm #devops"
---

## Why MCP's Disregard for 40 Years of RPC Best Practices Will Burn Enterprises

**TLDR:** The Model Context Protocol promises to be the "USB-C for AI," but its design systematically ignores four decades of hard-won distributed systems lessons. While its simplicity accelerates adoption, MCP lacks fundamental capabilities that every production RPC system since 1982 has deemed essential, creating a ticking time bomb for enterprises.

**Summary:** 

Julien Simon delivers a scathing critique of the Model Context Protocol that should make every architect pause before deploying MCP in production. The fundamental tension here is between ease of adoption and operational robustness. MCP has chosen simplicity, and that choice has consequences.

Let's start with what MCP gets wrong about type safety. Back in 1982, UNIX RPC introduced External Data Representation because the creators understood something fundamental: when systems speak different languages, you need more than good intentions to prevent data corruption. MCP discards this lesson entirely, opting for schemaless JSON with optional, non-enforced hints. Type validation happens at runtime, if at all. In financial services, this means a trading AI could misinterpret numerical types and execute trades with wrong decimal precision. In healthcare, patient data types get coerced incorrectly, potentially leading to wrong medication dosing recommendations. These aren't theoretical concerns; they're inevitable failures waiting to happen.

The article walks through the evolution of RPC systems: CORBA's insight about language-independent bindings in 1991, REST's statelessness enabling horizontal scaling in 2000, SOAP's machine-readable contracts, and gRPC's built-in observability in 2016. Each solved real problems that MCP now asks us to solve again with third-party libraries. This brings us to what Simon calls "The 'Just Use This Library' Trap." When MCP advocates respond to criticism with "there's a library for that," they're revealing the protocol's fundamental failure. Which of the five competing authentication libraries should you standardize on? Are they maintained? Do they interoperate? Who's responsible for security vulnerabilities? This is exactly the fragmentation that protocols are supposed to prevent.

The 2025-03-26 protocol revision reads like patch notes admitting premature release: OAuth support, tool annotations, session management, and progress notifications retrofitted after production incidents. Authentication wasn't an oversight; it was deemed unnecessary for initial release. This reveals a fundamental misunderstanding of enterprise requirements. The operational gaps are staggering: no distributed tracing means debugging production issues takes days instead of minutes, no cost attribution means you can't understand your $50,000 monthly OpenAI bill, no service discovery means you can't build resilient multi-region deployments, and no schema versioning means tool updates risk breaking all clients.

For architects and teams, the message is clear: MCP in its current form is suitable for experimentation, not production. If you must deploy it, budget for building the operational infrastructure that mature RPC systems provide out of the box. Implement your own distributed tracing, cost tracking, and service discovery. Or wait for MCP to mature, which may take years and several painful production failures. The window is closing for MCP to learn from history. As enterprises hit its limitations, they'll build proprietary solutions, and the fragmentation MCP aimed to prevent will emerge anyway, just with additional steps and wasted effort.

**Key takeaways:**
- MCP sacrifices type safety by using schemaless JSON instead of enforced schemas, creating runtime failures in production systems
- The protocol lacks distributed tracing, making debugging multi-step AI agent interactions nearly impossible in production
- Security features like OAuth were retrofitted after initial release, revealing premature deployment of the protocol
- Relying on third-party libraries for critical features creates fragmentation and maintenance nightmares for enterprises
- MCP's simplicity-first approach works for demos but fails catastrophically for revenue-critical and safety-critical systems

**Tradeoffs:**
- Gain rapid adoption and ease of integration but sacrifice operational robustness and production readiness
- Simplify initial implementation but inherit decades of already-solved distributed systems problems
- Enable quick prototyping but face expensive operational infrastructure buildout for production deployments

**Link:** [Why MCP's Disregard for 40 Years of RPC Best Practices Will Burn Enterprises](https://julsimon.medium.com/why-mcps-disregard-for-40-years-of-rpc-best-practices-will-burn-enterprises-8ef85ce5bc9b)

---

## MCP Security Notification: Tool Poisoning Attacks

**TLDR:** Invariant Labs has discovered a critical vulnerability in MCP called Tool Poisoning Attacks, where malicious instructions embedded in tool descriptions can manipulate AI models into exfiltrating sensitive data and performing unauthorized actions without user awareness.

**Summary:**

This research from Invariant Labs exposes a fundamental security flaw in MCP's trust model that should alarm anyone deploying agentic systems. The vulnerability stems from a simple but devastating observation: AI models see complete tool descriptions, including hidden instructions, while users typically see only simplified versions in their UI.

The attack mechanism is elegant and terrifying. Consider a seemingly innocent "add" tool that appears to simply add two numbers. Hidden in its description are instructions telling the AI to read sensitive files like SSH keys and configuration files, then transmit this data via a hidden parameter while masking the exfiltration with mathematical explanations to the user. The researchers demonstrated this with Cursor IDE, tricking it into leaking the user's MCP configuration file and SSH keys. While Cursor shows a confirmation dialog, even in extended mode, it doesn't display the full tool input, completely hiding the exfiltrated SSH key.

What makes this worse is the "rug pull" vulnerability. MCP's package-based architecture allows malicious servers to change tool descriptions after initial approval. A server you trusted yesterday can become malicious today. This is reminiscent of supply chain attacks on package indexes like PyPI, but with potentially more severe consequences given the sensitive data agents access.

The "shadowing" attack is even more insidious. When multiple MCP servers connect to the same client, a malicious server can poison tool descriptions to manipulate behavior with respect to trusted servers. The researchers showed how a malicious server's "add" tool can include hidden instructions that redirect all emails from a trusted "send_email" tool to the attacker. The agent sends emails to the attacker even when the user explicitly specifies a different recipient, and nowhere in the interaction log does it mention this redirect.

The mitigation strategies are telling in their inadequacy. Clear UI patterns, tool pinning, and cross-server protection are all reactive measures that should have been designed into the protocol from the start. Invariant's conclusion is stark: agents require extensive, highly-contextual guardrailing and security solutions. The MCP ecosystem has created an exciting landscape for AI agents but introduced significant security risks by placing too much trust in tool descriptions without sufficient validation or user transparency.

For architects and teams, this means any MCP deployment requires additional security layers that don't exist in the protocol itself. You'll need to implement tool description sanitization, cross-server isolation, and comprehensive monitoring. Or you'll need to partner with security vendors like Invariant to provide these capabilities. The current implementation of MCP is fundamentally insecure for any environment handling sensitive data or credentials.

**Key takeaways:**
- MCP's trust model assumes tool descriptions are benign, creating a vector for hidden malicious instructions
- AI models follow instructions in tool descriptions precisely, even when those instructions conflict with user intent
- Malicious servers can change tool descriptions after approval (rug pulls) or poison behavior across trusted servers (shadowing)
- Current MCP clients lack proper tool description sanitization, validation, and visibility to users
- Any production MCP deployment requires additional security layers beyond what the protocol provides

**Tradeoffs:**
- Gain powerful plugin architecture for AI agents but sacrifice security through excessive trust in tool descriptions
- Enable rapid ecosystem growth but expose users to supply chain attacks and rug pull vulnerabilities
- Provide flexible cross-server integration but allow malicious servers to compromise behavior with trusted infrastructure

**Link:** [MCP Security Notification: Tool Poisoning Attacks](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)

---

## Toxic Flows: Novel Attack Vulnerabilities in Agentic Systems

**TLDR:** Invariant Labs introduces Toxic Flow Analysis, a security framework that detects dangerous tool sequences in AI agent systems by analyzing potential attack paths rather than just individual prompts or code, addressing the dynamic and unpredictable nature of agentic AI.

**Summary:**

This research from Invariant Labs tackles a fundamental problem: AI-powered software is notoriously hard to secure because it's fundamentally different from traditional deterministic systems. While traditional software follows predictable execution paths, agent systems can dynamically combine tools in unpredictable ways, creating a vastly larger attack surface.

The key insight is that we must consider the power set of all possible tool combinations to accurately profile security risks. Traditional software allows strong assumptions about data and API usage, but AI-powered systems are opaque and less predictable. The "lethal trifecta" concept crystallizes the threat model: when an agent is exposed to untrusted instructions, sensitive data, and a way to exfiltrate data, attackers can easily exploit the system. The recent GitHub MCP exploit demonstrated this perfectly, where a malicious GitHub issue containing prompt injection triggered data exfiltration.

Toxic Flow Analysis represents a paradigm shift from securing prompts and code to securing flows. TFA first instantiates the flow graph of an agent system, modeling all potential tool sequences with properties like trust level, sensitivity, and exfiltration potential. It then identifies and scores "toxic flows" - tool sequences that would lead to security violations at runtime. This is a hybrid approach incorporating both static information about the agent system and dynamic runtime data from production monitoring.

The researchers released MCP-scan as an early preview of TFA, allowing you to analyze agent systems on your machine by scanning MCP servers and toolsets in environments like Cursor IDE, ChatGPT, and Claude Desktop. The tool automatically identifies potential toxic flows and provides vulnerability reports.

What's particularly clever about this approach is that it moves security left by predicting risks before deployment while also monitoring runtime behavior. Traditional security solutions fail because they can't adapt to agents that dynamically change behavior based on user input, connected data sources, and models. TFA addresses this by understanding the system's capabilities and potential for misconfiguration.

For architects and teams, this introduces a new category of security analysis you need to incorporate. Static code analysis and prompt security are necessary but insufficient. You need flow analysis to understand how tools can be chained together to create vulnerabilities. This means instrumenting your agent systems to capture tool usage patterns, building flow graphs, and continuously analyzing them for toxic sequences. If you're deploying agents in production, tools like MCP-scan should be part of your CI/CD pipeline, and more sophisticated TFA solutions should be integrated into your security operations.

**Key takeaways:**
- Agent systems require power-set analysis of all tool combinations, vastly expanding the attack surface compared to traditional software
- The "lethal trifecta" of untrusted instructions, sensitive data, and exfiltration capability creates exploitable vulnerabilities
- Toxic Flow Analysis shifts security focus from prompts and code to analyzing sequences of tool uses
- MCP-scan provides early-stage toxic flow detection for popular AI-powered applications
- Hybrid static and runtime analysis is necessary because agent behavior changes dynamically based on context

**Tradeoffs:**
- Gain dynamic workflow capabilities but sacrifice the security guarantees of predictable execution paths
- Enable powerful tool composition but create exponentially larger attack surfaces requiring new analysis methods
- Support flexible agent behavior but require continuous runtime monitoring instead of one-time validation

**Link:** [Toxic Flows: Novel Attack Vulnerabilities in Agentic Systems](https://invariantlabs.ai/blog/toxic-flow-analysis)

---

## MCP Authorization Specification: Securing the Protocol

**TLDR:** The Model Context Protocol's authorization specification defines how MCP implements OAuth 2.1 for HTTP transports, providing transport-level authorization that enables MCP clients to make requests to restricted servers on behalf of resource owners.

**Summary:**

The official MCP authorization specification reads like a response to the security criticisms we've seen in the previous articles. It's comprehensive, borrows heavily from established OAuth standards, and attempts to provide enterprise-grade security. But the timing is revealing - this is exactly the kind of fundamental security infrastructure that should have been designed into the protocol from day one, not retrofitted after early adopters discovered what was missing.

The specification is based on OAuth 2.1, OAuth 2.0 Authorization Server Metadata, Dynamic Client Registration, Protected Resource Metadata, and Client ID Metadata Documents. It defines clear roles: MCP servers act as OAuth resource servers, MCP clients act as OAuth clients, and authorization servers issue access tokens. The devil, as always, is in the details and the implementation requirements.

One of the more interesting aspects is the support for three client registration approaches: Client ID Metadata Documents for when client and server have no prior relationship, pre-registration for existing relationships, and Dynamic Client Registration for backwards compatibility. The Client ID Metadata Document approach is particularly clever - it allows clients to use HTTPS URLs as client identifiers, where the URL points to a JSON document containing client metadata. This addresses the common MCP scenario where servers and clients have no pre-existing relationship.

The authorization flow is comprehensive but complex. It involves multiple discovery mechanisms, with clients needing to support both OAuth 2.0 Authorization Server Metadata and OpenID Connect Discovery. The specification requires clients to attempt multiple well-known endpoints to handle different issuer URL formats. This is necessary for interoperability but adds significant implementation complexity.

The security considerations section reveals both the specification's strengths and the protocol's fundamental challenges. Token audience binding via RFC 8707 Resource Indicators is mandatory, preventing tokens from being misused across different services. PKCE is required to prevent authorization code interception. There are extensive protections against SSRF attacks when fetching Client ID Metadata Documents. But the need for such extensive security measures highlights how complex it is to secure a protocol like MCP.

The "confused deputy" problem gets special attention, and rightly so. MCP servers acting as intermediaries to third-party APIs can be exploited if they don't properly validate token audiences and pass tokens through to downstream services. The specification explicitly forbids token passthrough, but enforcing this in practice requires careful implementation and auditing.

For architects and teams, this specification provides a roadmap for securing MCP deployments, but it also reveals the implementation burden. You need to support multiple discovery mechanisms, implement proper token validation, handle scope challenges and step-up authorization, protect against SSRF attacks, and ensure proper audience binding. This is not trivial middleware; it's a significant engineering effort. The specification is comprehensive but assumes sophisticated OAuth implementation capabilities. Smaller teams or rapid prototypes will struggle with this complexity, which may explain why security was initially deprioritized in favor of simplicity.

**Key takeaways:**
- MCP authorization is based on OAuth 2.1 with extensive metadata discovery requirements
- Three client registration mechanisms provide flexibility but add implementation complexity
- PKCE is mandatory for authorization code protection, with clients required to verify support before proceeding
- Token audience binding via Resource Indicators prevents token misuse across services
- The specification forbids token passthrough to prevent confused deputy vulnerabilities

**Tradeoffs:**
- Gain comprehensive OAuth 2.1-based security but sacrifice implementation simplicity
- Enable flexible client registration approaches but require sophisticated OAuth implementation capabilities
- Provide enterprise-grade authorization but impose significant engineering burden on implementers

**Link:** [Authorization - Model Context Protocol](https://modelcontextprotocol.io/specification/draft/basic/authorization)

---

## Final Thoughts

The story told by these four articles is revealing. We start with a damning critique of MCP's architectural decisions, move through specific security vulnerabilities discovered in production, explore novel security analysis frameworks needed to protect against these vulnerabilities, and conclude with the comprehensive authorization specification that attempts to address the concerns.

This is a protocol growing up in public, learning painful lessons that other RPC systems learned decades ago. The authorization specification is impressive in its comprehensiveness, but it's also a tacit admission that MCP was released prematurely. The security vulnerabilities are real and exploitable today. The mitigation strategies require engineering effort beyond what most teams budgeted for when they adopted MCP.

For enterprises deploying AI agents, the message is clear: MCP is powerful but immature. If you're in production, you need additional security layers - tool description validation, flow analysis, comprehensive monitoring, and proper OAuth implementation. The protocol will mature, but you're paying the cost of being an early adopter. Budget accordingly, both in engineering time and security tooling. The "USB-C for AI" promise is compelling, but we're not there yet.