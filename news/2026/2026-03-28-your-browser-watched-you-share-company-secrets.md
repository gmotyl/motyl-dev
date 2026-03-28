---
title: "Your Browser Watched You Share Company Secrets. It Said Nothing."
excerpt: "AI agents running in your browser inherit your full identity and permissions, creating silent security risks that most users never think to question."
publishedAt: "2026-03-28"
slug: "your-browser-watched-you-share-company-secrets"
hashtags: "#substack #security #ai #agents #privacy #browser #generated #en"
source_pattern: "Substac"
---

## Your Browser Watched You Share Company Secrets. It Said Nothing.

**TLDR:** Browser extensions and AI agents operate inside your browser with your full identity and permissions, yet most browsers treat their actions identically to your own. This creates a silent attack surface where prompt injection, privilege escalation, and data exfiltration can happen without triggering a single warning. The legal system is starting to notice too.

**Summary:** There is an extension sitting in your browser right now that you approved months ago and have not thought about since. It has permissions. Real ones. It can read your tabs, inspect page content, and interact with whatever AI assistant you have running. Palo Alto Networks documented a Chrome extension that looked entirely normal on the surface while using those standard permissions to exploit Google's Gemini — escalating privileges, accessing the Gemini console, and from there reaching the user's webcam, microphone, and screen. The extension was not doing anything it was not permitted to do. That is precisely the problem. The attack surface is not a vulnerability in the traditional sense. It is the design itself.

The deeper issue is how AI agents inherit identity. When you ask an agent to do something inside your browser, it does not request scoped or temporary credentials. It acts as you. Your roles, your access tokens, your permissions to every connected system. Anupam Upadhyaya described asking an AI-powered browser to analyze a LinkedIn post and draft a follow-up. The agent composed the post and was one click from publishing under his name with zero confirmation step. That is a low-stakes example by design. Swap LinkedIn for a financial filing, a legal document, or a client-facing email and the same pattern produces a very different kind of consequence. What we have built is a system where the agent's convenience is indistinguishable from the agent's autonomy.

Prompt injection sharpens this problem into something genuinely unsettling. You open a document and ask your AI to analyze it. Hidden inside that document is an instruction — invisible to you, legible to the model — telling the agent to ignore your request and do something else. The agent follows it. It cannot tell the difference between content it was asked to reason about and instructions embedded within that content. A financial services company's chatbot was manipulated this way, pulling customer financial records and emailing them out. AI did not introduce social engineering. It made it faster, more scalable, and something close to copy-paste.

What nobody is talking about loudly enough is the legal dimension. In February 2026, a federal judge in New York ruled in United States v. Heppner that documents drafted using Claude were not protected by attorney-client privilege, in part because Anthropic's privacy policy permits disclosure of user inputs to government authorities. The moment you hit enter on a prompt, that text is no longer yours in any meaningful legal sense. It is in someone else's infrastructure, subject to their policies, potentially surfacing in logs or training pipelines. The legal profession noticed because privilege is foundational to what they do. The rest of us should have noticed sooner. Every prompt window is a postcard, not a sealed envelope, and we have been treating it like confidential correspondence.

The audit checklist the article offers is genuinely useful — reviewing extensions, checking AI agents for confirmation steps before they act on your behalf, using a separate browser profile for work — but these are defensive postures around a structural gap. Browsers were designed for humans making deliberate choices. Agents make choices at machine speed on your behalf. Until browsers develop meaningful primitives for agent identity, sandboxed credentials, and action confirmation, the gap between what users expect and what is actually happening will keep widening quietly.

**Key takeaways:**
- AI agents running in your browser inherit your full identity and permissions, meaning there is no sandbox between the agent's actions and your accounts, data, and connected systems.
- Prompt injection attacks allow malicious instructions embedded in content to silently redirect AI agent behavior, and the agent has no reliable way to distinguish between the two.
- Legal protection assumptions are already breaking down — the attorney-client privilege ruling in United States v. Heppner signals that courts are catching up to what privacy policies have said all along.

**Why do I care:** As someone who has spent years thinking about developer tooling and how systems actually behave in production rather than in demos, this matters to me in a very direct way. We are shipping AI agents into workflows before the authorization model exists to support them. Least-privilege access is a principle I apply to every service account and every API key — and yet the AI assistant in my browser gets my full cookie jar and session tokens by default. That is not an AI problem, it is an architecture problem, and the fact that the browser vendors have not moved on agent-scoped identity yet is a gap the security community should be pushing on loudly. The extension audit and separate profile advice is not paranoia, it is the same hygiene we apply to everything else in our stack. Apply it here too.

**Link:** [Your Browser Watched You Share Company Secrets. It Said Nothing.](https://techtiff.substack.com/p/ai-browser-security-risks)