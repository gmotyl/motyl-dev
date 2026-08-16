# Newsletter-ai is consumed only via MCP, not as a library or HTTP API

The pipeline is orchestrated by an **LLM Agent** session (Claude Code, OpenCode, Gemini CLI, Qwen Code — whichever is convenient at the time); generation is an agentic workflow, not a request/response from motyl-dev. Exposing newsletter-ai as MCP tools makes the LLM Agent the integrator and keeps motyl-dev free of any newsletter-fetching concerns — motyl-dev only reads the markdown files the agent writes into `news/`. The MCP surface is held deliberately vendor-neutral so the agent can be swapped without code changes.

## Considered Options

- **Import newsletter-ai as an npm dependency** — rejected: couples a Vercel-deployed site to IMAP credentials + scraping infra it has no business holding.
- **Expose newsletter-ai over HTTP** — rejected: forces us to operate a long-running server; the workflow is bursty and human-triggered, not request/response.
