# The eval harness substitutes a fake MCP server by swapping `.mcp.json`, with a sibling backup file and a crash guard

`evals/run.ts` writes the real `.mcp.json` to `.mcp.json.eval-backup`, replaces `.mcp.json` with a configuration pointing at `evals/fake-mcp.ts`, spawns the **LLM Agent** unmodified, asserts on the markdown it writes, then restores from backup. SIGINT/SIGTERM handlers restore on interrupt; if a previous run crashed and left a backup behind, the runner refuses to start and instructs the operator to run `pnpm restore:mcp`. This keeps the agent under test on the exact code path that runs in production — no test-only branches, no DI seam, no env-driven adapter — at the cost of touching a config file that is otherwise sacred.

## Considered Options

- **Inject the fake MCP server via env or DI inside newsletter-ai** — rejected: requires production code to know about test mode, and the eval is supposed to validate the agent's behaviour, not newsletter-ai's.
- **Run the agent against a separate eval-only `.mcp.json` path** — rejected: most LLM Agents only look for `.mcp.json` at a fixed location relative to CWD, so we'd be testing a fork of the agent rather than the agent itself.

## Consequences

- `.mcp.json` is a stateful resource during eval runs; concurrent `pnpm eval` invocations are forbidden by the startup guard.
- Adding a new MCP-consuming agent (e.g. Gemini CLI) to the eval matrix requires only adding a CLI invocation, not a code change.
