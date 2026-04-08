---
title: "Claude Mythos Preview: A Watershed Moment for Cybersecurity"
excerpt: "Anthropic's Claude Mythos Preview can find and exploit zero-day vulnerabilities in every major OS and browser — and Anthropic is using it defensively through Project Glasswing."
publishedAt: "2026-04-08"
slug: "claude-mythos-preview-cybersecurity-watershed"
hashtags: "#unicornclub #ai #security #claude #anthropic #zero-day #llm #generated #en"
source_pattern: "Unicorn Club"
---

## Claude Mythos Preview: The Model That's Too Dangerous to Release Publicly

**TLDR:** Anthropic announced Claude Mythos Preview, a model so capable at cybersecurity tasks that the company is not releasing it publicly. Instead, they launched Project Glasswing — a coalition of 40 companies using Mythos to find and patch vulnerabilities before attackers can exploit them. The model can find and exploit zero-days in every major OS and browser, including a 27-year-old bug in OpenBSD.

**Summary:**

Anthropic's Claude Mythos Preview represents what the company itself calls a "watershed moment" for cybersecurity. During testing, the model demonstrated the ability to identify and exploit zero-day vulnerabilities in every major operating system and every major web browser when directed to do so. These aren't trivial findings — the vulnerabilities are often subtle, many being ten or twenty years old. The oldest discovered so far was a 27-year-old bug in OpenBSD, an operating system renowned specifically for its security focus.

The exploits Mythos constructs go well beyond basic stack-smashing attacks. In one documented case, the model wrote a web browser exploit chaining together four separate vulnerabilities, including a complex JIT heap spray that escaped both renderer and OS sandboxes. It autonomously obtained local privilege escalation exploits by exploiting subtle race conditions and KASLR bypasses. It even wrote a remote code execution exploit against FreeBSD's NFS server by splitting a 20-gadget ROP chain across multiple packets — a technique that demonstrates genuine understanding of exploit mechanics rather than pattern matching on known vulnerabilities.

Perhaps most alarming is how accessible these capabilities are to non-experts. Engineers at Anthropic with no formal security training have asked Mythos to find remote code execution vulnerabilities overnight and woken up to complete, working exploits. This democratization of exploit capability is exactly why Anthropic has chosen not to release the model publicly. Over 99% of the vulnerabilities found have not yet been patched, making public disclosure irresponsible. Project Glasswing, the defensive coalition of 40 companies, is their attempt to ensure defenders get a head start before these capabilities inevitably become available to attackers through other means.

**Key takeaways:**
- Claude Mythos Preview can find and exploit zero-days in every major OS and browser, including decades-old vulnerabilities
- The model constructs sophisticated multi-stage exploits, not just basic vulnerability scanning
- Non-experts can leverage Mythos to produce working exploits overnight — democratizing capability that was previously the domain of nation-state actors
- Project Glasswing (40 companies) is Anthropic's defensive response — finding and patching vulnerabilities before attackers gain access to similar models
- Over 99% of found vulnerabilities remain unpatched, making public disclosure of the model irresponsible

**Why do I care:** This is the cybersecurity equivalent of nuclear enrichment technology — incredibly powerful, dual-use, and impossible to un-invent. The fact that Anthropic is withholding public release shows genuine responsibility, but the capability will exist in open-weight models soon enough. Every development team needs to assume that AI-assisted vulnerability discovery is about to become commoditized and harden their code accordingly. The era of "security through obscurity" is not just over — it's been cremated and scattered.

**Link:** [Claude Mythos Preview — red.anthropic.com](https://red.anthropic.com/2026/mythos-preview/)
