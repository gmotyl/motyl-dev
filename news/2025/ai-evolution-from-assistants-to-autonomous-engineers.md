---
title: "AI's Evolution from Assistants to Autonomous Engineers"
excerpt: "Exploring the shift from AI code assistants to autonomous AI software engineers, and the impact on enterprise software development."
publishedAt: "2025-12-13"
slug: "ai-evolution-from-assistants-to-autonomous-engineers"
hashtags: "#ona #ai #ai-engineering #software-development #llm #generated #en"
---

## 2025: The State of Generative AI in the Enterprise
**TLDR:** Enterprise AI spending has surged to $37 billion, growing faster than any software category in history. Startups are outcompeting incumbents in the application layer, and Anthropic has overtaken OpenAI as the enterprise LLM leader, driven by its dominance in coding.

**Summary:**
A new report from Menlo Ventures reveals that the generative AI market in the enterprise has exploded, reaching $37 billion in 2025. This growth is unprecedented. The report highlights a significant trend: enterprises are now preferring to buy off-the-shelf AI solutions rather than building them in-house, with 76% of AI use cases being purchased. This is a stark reversal from previous years. AI-native startups are capturing the majority of the application layer market, earning nearly $2 for every $1 incumbents make. This is particularly evident in product and engineering, where startups have a 71% market share.

In the foundation model space, Anthropic has become the new leader in the enterprise, capturing 40% of the LLM spend, largely due to the success of its Claude series in the coding domain. OpenAI's market share has dropped to 27%. The report also notes that while open-source models are popular in the broader ecosystem, their adoption in the enterprise remains low at 11%. The infrastructure layer is still dominated by incumbents like Databricks and Snowflake. The report concludes with predictions for 2026, including that AI will exceed human performance in daily programming tasks.

**Key takeaways:**
*   Enterprise AI spending has hit $37B, with applications taking the largest share.
*   Startups are winning the AI application race against incumbents.
*   Anthropic is now the leading LLM provider for enterprises, thanks to its coding capabilities.
*   The path to production for AI is now more defined, with a strong preference for buying over building.

**Link:** [2025: The State of Generative AI in the Enterprise | Menlo Ventures](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/)

## Beyond code assistants to AI software engineers
**TLDR:** Code assistants are a transitional technology. The future belongs to autonomous AI software engineers that can handle legacy code, work 24/7, and operate across an entire organization.

**Summary:**
This article argues that code assistants like Copilot are just a stepping stone. The real value of AI in software development lies in autonomous AI software engineers that can tackle the unglamorous but critical work of maintaining and modernizing legacy systems. While code assistants make individual developers more productive, they don't solve the large-scale, organizational challenges of managing hundreds or thousands of repositories.

The author proposes a "hybrid workforce" where human engineers focus on high-level tasks like architecture and strategy, while AI software engineers handle the toil of code maintenance, migrations, and security patching. Unlike code assistants, these AI engineers can work autonomously, in parallel across all repositories, and within the security perimeter of an organization. The key enabler for this is an infrastructure that provides isolated, automated environments for each AI engineer, along with centralized orchestration and governance.

**Key takeaways:**
*   Code assistants are limited to individual productivity and don't address organizational-scale problems.
*   The majority of software development work is in maintaining and modernizing legacy systems, not greenfield projects.
*   AI software engineers can work autonomously to handle large-scale tasks like migrations and security patching.
*   A hybrid workforce of human and AI engineers is the future of software development.

**Link:** [Beyond code assistants to AI software engineers | Ona (formerly Gitpod) - AI software engineers](https.ona.com/stories/beyond-code-assistants-to-ai-software-engineers)

## Designing Automations: a new operating model for engineering at scale
**TLDR:** Ona's Automations feature provides a new operating model for orchestrating engineering work at scale, turning cross-repository chaos into a manageable and trustworthy system.

**Summary:**
The author describes the design philosophy behind Ona's Automations, a feature built to solve the challenge of scaling engineering work across hundreds or thousands of repositories. While AI makes individual tasks easier, orchestrating these tasks at scale creates a new set of problems. The article introduces a simple interaction model for automations: Trigger -> Context -> Steps -> Report. This model provides a consistent way to think about and manage automated work, regardless of its scale.

The design of Automations focuses on building trust and confidence. Instead of overwhelming users with information, it uses summaries, samples, and funnel patterns to provide clarity. Safety is a core design constraint, with features like execution limits, rollback paths, and clear ownership to ensure that automations are safe to run at scale. The article highlights how customers are already using Automations for tasks like CI migrations, CVE patching, and standardizing development environments.

**Key takeaways:**
*   Scaling engineering work across many repositories is an orchestration challenge.
*   A simple and predictable interaction model is key to managing automation at scale.
*   Designing for trust and safety is crucial when building tools that can make changes across an entire organization.
*   Automations can transform large-scale, repetitive engineering work from a quarterly project into a daily task.

**Link:** [Designing Automations: a new operating model for engineering at scale | Ona (formerly Gitpod) - AI software engineers](https.ona.com/stories/designing-automations)

## Fundamentals of Building Autonomous LLM Agents
**TLDR:** This paper provides a review of the architecture and implementation methods for building autonomous agents powered by large language models.

**Summary:**
This academic paper delves into the core components required to build autonomous LLM agents. The authors break down the architecture of an agent into four key systems: a perception system for interpreting the environment, a reasoning system for planning and decision-making, a memory system for retaining knowledge, and an execution system for taking actions. The paper explores various techniques within each of these systems, such as Chain-of-Thought and Tree-of-Thought for reasoning, and short-term and long-term memory mechanisms.

The paper's goal is to provide a foundational understanding of how to create "agentic" LLMs that can automate complex tasks and operate with a higher degree of autonomy than traditional LLMs. By integrating these four systems, developers can create more capable and generalized software bots that mimic human cognitive processes.

**Key takeaways:**
*   Autonomous LLM agents are composed of four key systems: perception, reasoning, memory, and execution.
*   Various techniques like Chain-of-Thought and Tree-of-Thought can be used to enhance an agent's reasoning capabilities.
*   Integrating these systems is crucial for building agents that can perform complex tasks autonomously.

**Link:** [Fundamentals of Building Autonomous LLM Agents](https://arxiv.org/abs/2510.09244)
