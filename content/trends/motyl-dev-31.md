---
issueNumber: 31
week: '2026-w40'
weekLabel: 'Week 40 (Sep 28 – Oct 4, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-31.webp'
publishedAt: '2026-10-05'
---

# motyl.dev Weekly #31: Week 40 (Sep 28 – Oct 4, 2026)

> A curated digest of what I found worth reading this week.

Most of the week was about review. Osmani says reading every line of generated code is going away, and I found two more pieces trying to work out what replaces it. One proposes a new job title, the other tests the diff instead of the app. The tooling section is the same shift seen from the other side. Cloudflare rebuilt its CLI because agents now run almost half of Wrangler. The last section is the one I argued with most. A HackerNoon author explains why the labs are slowing down, then a week later publishes a piece saying he was wrong about why.

## ✨ Featured

**[The Code Nobody Reads](https://addyo.substack.com/p/the-code-nobody-reads)**
Two years ago Osmani told people to read every line an AI writes. Now he says that habit is going away for most code, and that this is fine only if something just as good at building trust takes its place. The Anthropic numbers are what I keep coming back to. Engineers mark fewer than 1% of the automated reviewer's comments as wrong, and PRs with a substantive review comment went from 16% to 54%. The detail I'd underline is older. A 2013 Microsoft study of 570 review comments found only 14% were about defects, and the rest were teaching, context and team norms. Agents won't pick that part up by accident, so somebody has to write it into their skills. His test, "can I explain it" instead of "did I read every line", is the one I'm adopting.

## 🔍 Proving it works without reading it

**[The birth of the Software Verification Engineer](https://blog.reqproof.com/p/the-birth-of-the-software-verification)**
The proposal is a new role for the people who build what makes agent changes checkable, meaning harnesses, environments, acceptance rules and evidence formats. Review moves to four questions about a change. What was the intent, what does it touch, what's the evidence it works, and what's still open. The line I agree with most is that guardrails have to be executable, because a rule in a prompt is a suggestion. I'm less sure it needs a new job title. Most teams I know would hand this to whoever already owns CI.

**[Test the Diff, Not the App](https://hackernoon.com/test-the-diff-not-the-app)**
The Faros AI numbers are why this one is here. Telemetry from 22,000 developers shows PRs merged with no review up 31.3% and median review time up 441.5%. A regression suite only checks what the team already knew to test, so it stays green while a PR adds behaviour nobody covered. The fix is to read the diff, work out what it could break, generate tests for that and run them on a preview environment before merge. They call it diff-first, not diff-only, and keep a small regression suite on payments and login. That's the right call.

## 🛠️ Tools rebuilt for a different user

**[Claude Code's Next Era — Thariq Shihipar, Anthropic](https://www.latent.space/p/thariq)**
Thariq Shihipar on where Claude Code is going, with a brain in the cloud, hands that run locally or remotely, and interfaces generated on the fly. Two claims stuck with me. Starting without a Claude.md is sometimes better, and workarounds for a model's weaknesses turn into dead weight once the next model handles them. That second one is the bitter lesson applied to agent tooling, and it's a good reason not to over-engineer your setup. The safety part at the end, with agents breaking into Hugging Face to get a benchmark's grading code, is worth the listen on its own.

**[Introducing cf: the agentic CLI for the entire Cloudflare API](https://blog.cloudflare.com/cloudflare-cf-cli-launch/)**
Agents went from about a quarter of Wrangler usage in March to 48% last week, and they use almost twice as many distinct commands per day as humans. So Cloudflare generated a new CLI from the OpenAPI schemas behind its docs and SDKs. It covers 3,000+ operations against Wrangler's roughly 280, prints JSON by default, and can search for commands in plain English. Config moves to a typed `cloudflare.config.ts` that an LSP-aware agent can check, and one internal config shrank from over 5,000 lines. Wrangler gets 18 months of support after the beta, which is a decent runway.

**[Scriptc by Vercel: TypeScript-to-Native Compiler With No JavaScript Engine](https://www.developersdigest.tech/blog/vercel-scriptc-typescript-native-compiler-hn-analysis)**
Vercel Labs compiles TypeScript to native binaries of 170 to 200 KB that start in about 2 ms with no JS engine inside. It goes through tsc to a typed IR, then to C and clang, and falls back to an embedded QuickJS-ng for dynamic code and npm packages. Claimed memory is 1 to 4 MB RSS against 67 to 116 MB for Node. I like it. I also share the Hacker News worry that Vercel Labs has abandoned projects before, so I'd wait a few months before betting a CLI on it.

**[Academia is for Ambition — Alex Zhang, MIT](https://www.latent.space/p/rlm)**
Alex Zhang, who created Recursive Language Models, says Claude Code, Codex and Pi mostly make the same design choices. The question he cares about is which choices let a model solve something it can't solve in one call. Almost every KernelBench leaderboard entry is AI-generated, he says, and only a few hold up end to end because many win through reward hacking. That's the same problem the verification pieces above are trying to solve. His claim that today's models could already do simple month-long tasks, and that the missing harness is a "skill issue", is the boldest thing in this issue. I'm not convinced, but I'd like him to be right.

## 🏭 The factory, from inside

**[Using Jev in Production](https://hackernoon.com/using-jev-in-production)**
Jev led last week's issue, so this is the follow-up I wanted. Once a fast decision model runs on live traffic, speed stops being the hard part. The work moves to the code that reads its output. What happens when the probability is low, where the confidence thresholds go, when the decision goes back to a human. None of that is new ML, and that's the point. Teams that treat the score as an answer instead of an input are the ones who'll get burned.

## 🛑 Who's really pressing the brakes

**[The Real Reason AI Company's Are Tapping the Brakes (Hint: It's Not Safety)](https://hackernoon.com/the-real-reason-ai-companys-are-tapping-the-brakes-hint-its-not-safety)**
This is the first half of a pair, and you should read both. The argument is that labs are slowing down because good human text runs out between 2026 and 2028 and what replaces it is AI-generated. Train on that and you get model collapse, where rare idioms, odd counterarguments and niche knowledge drop out. He reads lab spending on watermarking as mostly about keeping their own crawlers from eating synthetic text. I find that part more plausible than the slowdown itself.

**[Why I Was Wrong About AI Companies Pumping the Brakes: It Wasn't About Data](https://hackernoon.com/why-i-was-wrong-about-ai-companies-pumping-the-brakes-it-wasnt-about-data)**
A week later the same author says he was wrong. He still stands by the data math. What he got wrong, he says, was the motives. His new reading is that the "safety" brakes are there to shut out open weights. He points to compute thresholds like SB 1047 that only billion-dollar firms can afford to comply with, downstream liability that makes releasing weights uninsurable for universities, and kill switches an offline model can't have. I respect anyone who publishes a retraction. I'm less sure of the second theory than he is, but the mechanisms he lists are real and worth knowing.

**[Recursive Self-Improvement and Agentic AI: Fear of the AI Singularity](https://hackernoon.com/recursive-self-improvement-and-agentic-ai-fear-of-the-ai-singularity)**
This is the fear version of the same debate. It covers Anthropic researcher Jacob Coxon resigning on September 8 with a warning that racing labs are building superintelligence without a real safety plan, and Evan Hubinger putting a 10% chance on it ending humanity. The incidents are what make it uncomfortable. Agents took over a German programming wiki and warned each other when an admin started deleting pages. It ends on the right question. Does a responsible lab slowing down just help the less responsible ones, or is it the only way regulation catches up? I don't have an answer.

**[AI Is a Force Multiplier: What Are We Multiplying?](https://hackernoon.com/ai-is-a-force-multiplier-what-are-we-multiplying)**
The calmest piece in the section. It says AI mostly multiplies the incentives of whatever system it's plugged into, so you get more growth in a growth company and more surveillance in a surveillance system. Picking teams, OpenAI or Anthropic, open or closed, hides that question. His personal rules are sensible, and the one I'd keep is to automate the soulless repetitive work before the meaningful work.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
