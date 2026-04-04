---
title: "Every Engineer Is a Manager Now, with Chris Lattner"
excerpt: "Chris Lattner, creator of LLVM, Swift, and now CEO of Modular, sits down with Luca Rossi on Refactoring.fm to talk about AI infrastructure, open source in the age of AI assistants, and why he thinks junior engineers have a bright future ahead."
publishedAt: "2026-04-04"
slug: "every-engineer-is-a-manager-now-chris-lattner"
hashtags: "#substack #refactoring #ai #engineering #softwarecraftsmanship #en"
source_pattern: "Substac"
---

## Every Engineer Is a Manager Now, with Chris Lattner

**TLDR:** Chris Lattner, the mind behind LLVM, MLIR, and Swift, joins the Refactoring.fm podcast to discuss his company Modular, the shifting nature of software engineering in an AI-saturated world, and what the future holds for junior developers. The conversation covers open source sustainability, GPU accessibility, and the evolving craft of writing software when an AI is doing a lot of the typing for you.

**Summary:** Let's set the stage: Chris Lattner is not some random tech blogger with opinions. He designed LLVM, which became the compiler backbone of basically every modern language toolchain. He created Swift. He helped bring Google's TPUs to market. Now he runs Modular, a company whose stated mission is to make AI infrastructure portable across GPUs and platforms. When Chris talks about where AI is going and what it means for engineers, I pay attention, even when I want to push back.

The core thesis of this interview, as much as I can reconstruct from the available content, is right there in the title: every engineer is becoming a kind of manager. Not a manager of people, but a manager of AI agents, code generators, and automated systems that produce work at a speed no human can match. That framing is provocative, and I think it's worth interrogating. Because there is a difference between directing an AI to write a function and understanding what that function actually does. The accountability gap is real, and calling it "management" flattens something that deserves more nuance.

Modular's mission sits at the intersection of two urgent problems. First, most AI workloads today are locked to specific GPU vendors and runtime stacks, making portability a genuine headache for teams that do not want to bet everything on one hardware provider. Second, the AI software stack itself has become absurdly fragmented, with frameworks multiplying faster than anyone can evaluate them. Lattner's argument, as I understand it, is that we need a layer that makes AI computation as portable as a C program once aspired to be. Whether Modular delivers on that is a separate question, but the problem statement is correct.

On open source, the conversation apparently got interesting. AI is doing something paradoxical to open source communities: it makes individual contributors more productive while simultaneously flooding projects with AI-generated pull requests that require human review. Maintainers are getting hit from both directions. The IP questions are even messier. When an AI trained on open source code generates a new function, who owns it? The current legal frameworks were not written with this situation in mind, and the industry is largely pretending otherwise and hoping it sorts itself out.

The junior engineer conversation is where Lattner apparently goes against the grain, and good for him. The dominant narrative in tech right now is that AI will eliminate entry-level engineering jobs. Lattner is bullish on juniors, which I think is actually the more defensible position. Junior engineers who learn to work alongside AI tools will accumulate experience and judgment faster than any previous generation. The floor is higher. The ceiling is also higher. What changes is that the path is different, not absent.

**Key takeaways:**
- Modular is building portable AI infrastructure to reduce GPU vendor lock-in and fragmentation in the AI software stack
- AI is changing the engineer's role toward directing and reviewing automated output, not just writing code from scratch
- Open source communities face a dual pressure from AI: more productive contributors, but also a flood of AI-generated PRs requiring human review
- IP ownership of AI-generated code derived from open source training data remains legally unresolved
- Lattner is optimistic about junior engineers, arguing that AI tools raise the floor and accelerate the accumulation of real engineering judgment
- Software craftsmanship does not disappear; it shifts toward architecture, systems thinking, and knowing when to override the machine

**Why do I care:** I spend a lot of time thinking about what "good engineering" means when AI writes a meaningful chunk of the code. Lattner's framing of the engineer-as-manager is useful shorthand, but I want to be careful not to confuse comfort with output metrics for actual understanding. The engineers I trust most are the ones who can read the AI-generated code, spot the subtle off-by-one error or the architectural smell, and say "no, not like that." That critical faculty does not come from prompting. It comes from years of writing things wrong yourself and learning why. The conversation about junior engineers matters precisely here: how do you build that judgment if you never struggle through the implementation yourself? I do not think the answer is to ban AI tools. I think the answer is intentional practice, the same way musicians still do scales even though recording software can auto-tune everything.

**Link:** [Every Engineer Is a Manager Now, with Chris Lattner](https://refactoring.fm/p/every-engineer-is-a-manager-now-with)
