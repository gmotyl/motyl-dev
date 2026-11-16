---
issueNumber: 37
week: '2026-w47'
weekLabel: 'Week 47 (Nov 16 – Nov 22, 2026)'
image: 'https://img.motyl.dev/blog/motyl-dev-37.webp'
publishedAt: '2026-11-16'
---

# motyl.dev Weekly #37: Week 47 (Nov 16 – Nov 22, 2026)

> A curated digest of what I found worth reading this week.

Five links this week, and four of them ask what a person still has to know once an agent writes the code. A Stanford course dropped homework that students can now finish with one prompt and sends them to open-source maintainers instead. Chrome packages web platform knowledge as something you install into your agent. Mainmatter runs screenshot diffs locally, so the agent catches its own visual bugs before a reviewer does. The Dreamforce recap lists the jobs that show up around an agent once it's in production: defining success, maintaining the data, checking the output. I close with a pixel-art DevOps town, because learning by fixing broken things still works.

## ✨ Featured

**[How Stanford Teaches AI-Native Engineering — Mihail Eric, Monaco](https://www.latent.space/p/cs146s)**
Mihail Eric teaches CS146S at Stanford and leads AI at Monaco. Before the course's second run he figured students could one-shot many of last year's nine assignments, and every student he asked already coded with an agent. So part of the homework is now a patch to a real open-source project, and the repo's maintainer reviews it. I think that's the right fix. An agent can write the feature in an afternoon, but you still have to find out whether the maintainer wants it and what your change might break. The line I'm keeping from the Monaco half is his rule for tooling: "You buy to learn, and you build to keep."

## 🛠️ Showing the agent its mistakes

**[Modern Web Guidance 1.0: The web platform expertise your coding agent is missing](https://developer.chrome.com/blog/modern-web-guidance-v1)**
Chrome's skill set for coding agents is now stable, and Firefox and Edge joined the project. It gives the agent web platform knowledge and browser compatibility data. New in 1.0 is a scan that finds code you can safely replace with newer platform features. Google says Note went from 61% to 94% on modern-practice tests, and MetaMask's review bot commented on 64 of about 480 PRs in five weeks, with engineers fixing 43 of those comments. The numbers come from Google and its partners, so I read them as a pitch. The gaps it targets are real, though. Focus management, reduced motion, main-thread scheduling and HTML sanitization are what I keep finding in agent-written frontend code.

**[Local visual regression testing](https://mainmatter.com/blog/2026/11/03/local-visual-regression-testing/)**
Paolo Ricciuti says Percy and Chromatic come too late in an agent's loop. You finish, open a PR, wait for the diff, and only then does anyone see the broken button. They also charge per screenshot. Using Actual Budget's PR history, he estimates that doubling PR volume takes Chromatic from about $490 to $1,600 and Percy from about $3,300 to $8,300. His setup runs Playwright's `toHaveScreenshot` in a pinned Docker image, so a Mac and a GitHub runner render the same pixels, behind one `test:visual` script the agent can call. He admits committed PNGs bloat Git history and is testing S3 for baselines. I'd use it next to Modern Web Guidance. One tells the agent what good code looks like, the other shows it what it broke.

## 👥 The jobs around the agent

**[Dreamforce 2026: Skills Teams Need to Work With AI Agents](https://techtiff.substack.com/p/dreamforce-2026-ai-agents-work)**
TechTiff's Dreamforce recap covers the work that appears once an agent has a real job. In one session, an email outreach agent did badly because nobody had defined its context, data and idea of success up front. Sales, marketing, product and engineering then started reviewing subject lines together, against one shared dashboard. In HR, people moved from answering employee questions to maintaining the policies, content and permissions behind the agent's answers. It's a Salesforce view of the world, but it lands where the Stanford episode does. Someone still has to know what good output looks like.

**[Opsville: A Free Pixel-Art DevOps Town in Your Browser](https://devops-daily.com/posts/opsville-free-devops-town-game?via=dailydev)**
A free browser game where you repair eight broken districts, each one a DevOps topic: Linux, Docker, Git, CI/CD, Kubernetes, observability, security and data. There are 34 tasks, each a simulator challenge followed by a three-question quiz. It's built with Phaser 3, TypeScript and Vite on Cloudflare Pages, and the server validates XP with a daily cap of 24 tasks. That's more anti-cheat thinking than most hobby projects get. I'd hand it to a junior before another video course. It fits the week, too. Someone has to understand the systems the agent is changing.

---

_Curated by [Grzegorz Motyl](https://motyl.dev). [Subscribe for weekly updates.](https://motyl.dev/#newsletter)_
