---
issueNumber: 35
week: '2026-w45'
weekLabel: 'Week 45 (Nov 2 – Nov 8, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-35.webp'
publishedAt: '2026-11-03'
---

# motyl.dev Weekly #35: Week 45 (Nov 2 – Nov 8, 2026)

> A curated digest of what I found worth reading this week.

Execution got cheap this week, and every piece I saved asks what's still expensive. One writer says it's his attention, after months running dozens of agent threads at once. The harness posts say it's control: who decides a task is done, who holds the keys, who can say stop. The security pieces add that attackers get the same cheap execution we do. Then the engineers. A Stanford study shows junior hiring falling where AI automates the work, and a large company found its reviewers rubber-stamping code they can't follow. I end with the tools underneath, including a benchmark that finally puts a dollar figure on framework choice.

## ✨ Featured

**[I Have Unlimited Execution Now. My Attention Ran Out First.](https://thoughts.jock.pl/p/ai-agents-attention-bottleneck-decisions-2026)**
For three or four months the author ran agents and subagents on almost everything, sometimes more than fifty threads at once. By Friday he was drained, not physically, but the way you are after a hundred small decisions a day: send this agent there, check that, approve, switch context. He's building a Decision Layer that puts pending decisions in one place. I lead with it because it names the real limit, but I'd ask a question he skips. Is fifty parallel threads a skill to support with tooling, or just bad work organization?

## 🛑 Who gets to say stop

**[4 Key Decisions to Solidify Your Harness](https://www.decodingai.com/p/4-key-decisions-to-solidify-your?publication_id=1526003&post_id=219063871&action=share&triggerShare=true&isFreemail=true&triedRedirect=true)**
Four ownership questions: who decides the task is finished, who holds the keys, who says stop, and who answers for a failure. The answer for the first three is the harness, in code, while the model only proposes. What I like is that the author debugs his own demo in public. His `maxMessages: 50` budget could never fire, because the loop trimmed context to 20 messages before the check, and his login detection would have typed a password on the wrong site. The rule I'm keeping is to write the verifier from the task, not from the trace.

**[How Claude Code mods change the agent loop](https://daily.dev/posts/DoQr1tzdO)**
A walkthrough of a mod that asks for approval before every Bash call. The useful part is the failure case. By default, a handler that throws before calling `next` gets skipped and the chain carries on, so a broken guard lets the command through. The fix is to deny when `next` was never called, plus a test for exactly that branch. I'd make every guardrail I write fail closed. The author also admits a mod is not a sandbox.

**[Enterprise AI Has a Safety Problem That Better Models Alone Can't Fix](https://hackernoon.com/enterprise-ai-has-a-safety-problem-that-better-models-alone-cant-fix)**
A model can pass every safety benchmark and still sit in a system with admin rights on the production database and no record of what it did last Tuesday. The author wants four properties: observable, boundable, reversible, accountable, plus a five-question test. I agree, and I see the wide token with no undo story on real projects. He doesn't say what reversibility costs for actions that can't be undone, like a sent email or a payment, and there's no deployment data behind it.

## 🔓 Security at agent speed

**[Welcome to cybersecurity awareness rest-of-the-decade](https://metacircuits.substack.com/p/welcome-to-cybersecurity-awareness)**
Disclosed vulnerabilities tripled in half a year, and attackers now have agents for the patience part. The advice is concrete. Give agents their own identities, because the LiteLLM breach started with an agent platform running on the org owner's personal GitHub token. Keep kill switches and monitoring where no agent can write, and measure whether you can revoke every agent credential within an hour. That last check is the one I'd actually schedule.

**[Is Software Really Dead? The Rise of AI-Powered Reverse Engineering](https://hackernoon.com/is-software-really-dead-the-rise-of-ai-powered-reverse-engineering)**
REA is an MCP server that hooks Claude Code or Codex up to Ghidra, IDA, Hopper and Chrome DevTools. The author's point is that it lowers the barrier rather than inventing anything, and the famous Rust rewrites of Adobe apps matched Photoshop on five of thirty filter tests. The best detail is a test where the app rebuilt from screenshots alone came out faster than the one rebuilt with REA. The legal question about clean-room rewrites when the model has read half of GitHub stays open.

## 🎓 Where the engineers go

**[Not the End, but a Shift: How AI Is Pushing Computer Science Toward Deeper Engineering](https://daily.dev/posts/XKlK79NAu)**
Stanford data shows employment for 22 to 25 year olds in the most AI-exposed jobs down about 13% relative to other groups. The cuts land on boilerplate, CRUD endpoints and form wiring. The author says graduates will move toward systems design and failure diagnosis. I'd push back on how easy that sounds, because people learn deep engineering on the routine work we're handing away. If you run a team, the question is how you'll grow your next seniors.

**[Architecting AI-SDLC: Five Lessons For DevSecFinOps Teams](https://hackernoon.com/architecting-ai-sdlc-five-lessons-for-devsecfinops-teams)**
The lesson that matches the Stanford piece is cognitive debt replacing technical debt. The agent writes hundreds of lines, tests pass, and the reviewer approves because tracing the logic is tiring. The company's answer is that a PR without an architectural "why" doesn't merge, and that tokens get budgets and hard limits like any other cost. I'd take both. The rest is reasonable but unverified, with no numbers and no word on what it did to delivery speed.

## 🛠️ The tools underneath

**[Running Claude Code and Codex at the same time on one repo](https://dev.to/offrun/running-claude-code-and-codex-in-parallel-on-one-repo-git-worktree-gotchas-and-cross-review-41eg)**
A worktree per agent fixes file collisions, and then the git gotchas start. One branch can't be checked out in two worktrees, new worktrees get no `.env` or `node_modules`, the stash is shared across all of them, and a manually deleted directory stays registered until you prune. The part I'd keep is cross-review. Send the uncommitted diff to the other model, because each one misses different bugs. It skips the cost, and two agents plus a review run is three token bills.

**[The AI cost of JavaScript frameworks](https://nolanlawson.com/2026/10/28/the-ai-cost-of-javascript-frameworks/)**
Nolan Lawson had Opus 5.5 build the same Pokémon app in twelve frameworks and measured cost, tokens and output. Median cost ran from $2.67 for Hono with htmx to $4.97 for Angular, and Angular failed to produce a working app on two attempts. Astro shipped 0 KB of JavaScript against 142 KB for Next.js. He lists the limits himself: one simple content app and noisy results. The finding I keep thinking about is that agents often ignored the framework's official MCP server or skill.

**[Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/)**
Content mappers let a plugin translate any file type into a virtual TypeScript file, with errors, hover and go-to-definition mapped back to the original. That's the official version of what `vue-tsc` and Volar have been doing around the compiler for years. For framework authors it's a big deal. For most teams it's a beta to watch, though typed SQL files without a custom tool are tempting.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
