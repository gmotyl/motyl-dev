---
title: "Code Security for Software Engineers: Quality, AI Risks, and Real-World Defense"
excerpt: "A security expert with 20 years experience explains how code quality relates to security, why AI-generated code introduces new vulnerabilities, and what developers should actually own in the security landscape."
publishedAt: "2025-11-26"
slug: "code-security-quality-ai-risks-developers"
hashtags: "#generated #en #security #ai #code-quality #devops #testing #owasp #sonarqube"
---

## Code Security for Software Engineers

**TLDR:** Code quality directly affects security - spaghetti code leads to overlooked vulnerabilities during review and longer exposure windows during fixes. AI-generated code accelerates production but creates verification bottlenecks, while LLM integration introduces prompt injection as a new attack vector.

Johannes Dahse, VP of Code Security at Sonar with 20 years of security experience, provides practical guidance on code security under real-world engineering constraints. The conversation covers dependency risks, software composition analysis, dynamic testing, and where AI both helps and introduces new failure modes.

The connection between code quality and security is underrated. Beyond obvious issues like null pointer exceptions or catastrophic regex patterns, consider how unreadable, unmaintainable code affects security outcomes. During pair programming and code reviews, spaghetti code makes it easier to overlook security problems. When vulnerabilities are discovered and reported, poor maintainability means slower fixes - the attacker window stays open longer. Quality becomes a security issue through these indirect paths.

AI-generated code amplifies these concerns. Writing code is no longer the bottleneck - verification is. If teams produce code faster without proportionally improving their verification processes, both quality and security issues compound. The rapid production capabilities of AI coding assistants require corresponding investment in review and testing infrastructure.

Architecture changes introduce new attack surfaces. Traditional backend/frontend splits had known vulnerability patterns - remove the database, eliminate SQL injection risk. Adding LLMs to backends introduces prompt injection vulnerabilities where attackers can modify system prompts or manipulate output through crafted inputs. Both attackers and defenders are still adjusting to these new patterns.

Software Composition Analysis (SCA) addresses dependency risk by checking manifest files against CVE databases. This maps specific library versions to known vulnerabilities - for example, flagging the Log4j version affected by Log4Shell. However, this only catches known vulnerabilities in dependencies, not logic flaws in your code.

For architects and team leads, the practical takeaway is that security investments compound with quality investments. Readable, maintainable code is easier to review, easier to fix when vulnerabilities emerge, and produces shorter attacker exposure windows. As AI accelerates code production, verification capacity becomes the limiting factor for security outcomes.

**Key takeaways:**
- Code quality directly affects security through review effectiveness and fix velocity
- AI coding assistance shifts the bottleneck from writing to verification
- LLM integration introduces prompt injection as a new vulnerability class
- Software Composition Analysis catches known CVEs in dependencies but not logic flaws
- Understanding the code you ship remains the most reliable defense

**Tradeoffs:**
- AI coding tools increase productivity but require proportional verification investment
- Faster code production without faster review extends attacker exposure windows

**Link:** [Code security for software engineers](https://newsletter.pragmaticengineer.com/p/code-security)

---

*The content above was curated from The Pragmatic Engineer newsletter. While I have analyzed and synthesized these sources, readers should verify critical details from original sources before making significant decisions.*