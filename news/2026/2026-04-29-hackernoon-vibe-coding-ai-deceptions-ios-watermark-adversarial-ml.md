---
title: "Vibe Coding Fever, AI Smoke and Mirrors, and the iOS Screenshot Watermark Hack"
excerpt: "Four sharp takes from HackerNoon: why vibe coding is both garbage and inevitable, how AI companies rig benchmarks and stage demos, the iOS screenshot watermark trick, and how spam filters invented adversarial ML."
publishedAt: "2026-04-29"
slug: "hackernoon-vibe-coding-ai-deceptions-ios-watermark-adversarial-ml"
hashtags: "#hackernoon #ai #machinelearning #ios #vibecoding #adversarialml #en"
source_pattern: "HackerNoon"
---

## Vibe Coding is Garbage, But the Fever Dream Has Just Begun

**TLDR:** Vibe coding produces low-quality output by design, but the author argues that democratizing code generation will evolve faster than anyone expects. It's garbage in, garbage out, and also somehow the future.

**Summary:** Benny Doda opens with a provocation that I find honest in a way most AI boosters refuse to be: vibe coding, the practice of prompting an AI to generate entire applications with minimal developer oversight, is garbage. The output is often messy, brittle, and architecturally incoherent. The author isn't wrong. Anyone who has tried to build something real with a vibe-coded codebase knows the feeling of staring at generated code that technically runs but is impossible to maintain, test, or extend.

But here's where Doda pivots, and where I think the argument gets genuinely interesting. He doesn't conclude that vibe coding is therefore dead on arrival. Instead, he argues that the velocity of improvement in this space is absurd. He references Google's Veo 3 producing a convincing Will Smith eating spaghetti video, drawing a line between the laughable 2023 version of that meme and the near-photorealistic 2026 version. The implication is that vibe coding will undergo a similar compression of quality over time.

What the author is skirting around, though, is the nature of the garbage. The concern isn't just output quality in a surface sense. A generated video being more photorealistic is a closed-loop problem. Code generation is not. Generated code interacts with databases, financial systems, medical records, and authentication layers. "Better looking" code that is still architecturally unsound carries compounding risk. Doda doesn't spend much time on this distinction, and I think that's the weak spot.

There's also a missing conversation about who benefits from democratized coding. The article implies it's everyone, but in practice, the people most likely to ship vibe-coded software without understanding its consequences are the same people least equipped to handle the fallout when it breaks. Vibe coding doesn't eliminate the need for engineering judgment, it just creates a large population of people who don't know they're missing it.

Still, the core observation holds: the fever dream is not going away, and dismissing it entirely is its own kind of intellectual laziness.

**Key takeaways:**
- Vibe coding produces poor output structurally, but dismissing its trajectory is a mistake
- The improvement curve in AI code generation is steep and accelerating
- Democratizing code creation doesn't eliminate the need for engineering judgment, it hides the need
- The bigger risk isn't bad-looking code, it's bad-looking code that ships to production

**Why do I care:** As someone who writes and reviews production code, vibe coding is the thing I think about most when onboarding new developers. The tooling is seductive. The output compiles. The tests sometimes even pass. The question of what junior developers learn when AI writes their first thousand lines of code is one the industry hasn't answered honestly yet. This article doesn't answer it either, but at least it frames the tension correctly.

**Link:** [Vibe Coding is Garbage, But the Fever Dream Has Just Begun](https://hackernoon.com/vibe-coding-is-garbage-but-the-fever-dream-has-just-begun)

---

## The Smoke, Mirrors, and Billion-Dollar Deceptions Behind the AI Revolution

**TLDR:** The AI industry systematically misrepresents its products through rigged benchmarks, staged demos, and manufactured panic about rogue AI. Michal Kadak, a product manager with an engineering background, walks through each category of deception in detail.

**Summary:** Michal Kadak writes with the measured frustration of someone who has sat in enough product meetings to recognize a pattern. The AI industry, he argues, is not just overhyped in the usual startup sense. It has developed specific, repeatable techniques for misrepresentation that have become structurally normalized.

The first category he examines is benchmark manipulation. AI companies compete on published benchmarks, and over time those benchmarks get gamed. Models are trained on data that overlaps with test sets. Evaluation conditions are tuned to favor specific architectures. Benchmarks that show unflattering results are quietly deprioritized in press releases. The author puts it plainly: if benchmarks are the quantitative deception, demos are the qualitative one.

That pivot to demos is where the article sharpens. Companies have learned that a viral demo can move market cap by billions, even when the demo doesn't represent the shipped product. The examples here are well-documented at this point, from cherry-picked voice interaction latency to selective editing of agent task completion. Kadak points out that the gap between demo conditions and real-world conditions is rarely disclosed, and almost never penalized.

The third element he covers is the manufactured narrative of rogue AI panic. There is a peculiar dynamic where AI companies simultaneously lobby against AI regulation and fund safety theater. Talking loudly about existential risk from superintelligence has a convenient effect: it shifts attention away from the boring, immediate harms of current systems and positions the companies doing the most damage as the responsible actors.

What Kadak is perhaps too polite to say directly is that this behavior is rational under current incentive structures. There are no meaningful penalties for overstating AI capabilities, and the financial rewards are enormous. Until that changes, the smoke and mirrors aren't a bug. They're the product strategy.

**Key takeaways:**
- AI benchmark manipulation is systematic, not accidental, and includes training-test data overlap
- Viral demos routinely misrepresent shipped product behavior and face no meaningful accountability
- The rogue AI safety narrative conveniently distracts from immediate harms of current systems
- Current incentive structures reward capability exaggeration with no downside

**Why do I care:** Evaluating AI tools for production use is part of my job now. The benchmark problem is real and practical. When a vendor claims their model outperforms competitors on coding tasks, the benchmark they're citing was almost certainly constructed to flatter their architecture. I've started treating AI capability claims the way I treat marketing copy for any other software product: assume the demo conditions will never match production, and test accordingly.

**Link:** [The Smoke, Mirrors, and Billion-Dollar Deceptions Behind the AI Revolution](https://hackernoon.com/the-smoke-mirrors-and-billion-dollar-deceptions-behind-the-ai-revolution)

---

## I Hid a Watermark in Screenshots, and iOS Thought It Was a Password

**TLDR:** A developer exploited iOS's secure text entry rendering behavior to embed invisible watermarks that only appear in screenshots, then discovered the technique accidentally triggered iOS password autofill detection.

**Summary:** Tammo Ronke opens with a design problem that anyone who has shipped a consumer app has encountered: you want screenshots to carry attribution, but you don't want the watermark to visually pollute the product. The standard solutions, overlaid text or logo stamps, are cosmetically intrusive and trivially cropped out.

The approach he landed on is genuinely clever and starts from an underappreciated corner of UIKit behavior. iOS has a rendering mode for secure text fields, the kind used for passwords, where the actual text pixels are replaced with dots in screenshots. This is a privacy feature. Ronke realized that if you could trigger this rendering path for a custom view, you could make a visual element that displays normally during use but appears differently in a screenshot capture. The watermark exists in the screenshot. It doesn't exist in the live UI.

The implementation involves rendering text at a layer level that UIKit identifies as sensitive content. The specific mechanism interacts with how iOS handles its screenshot interception layer. This is not documented behavior. It's reverse-engineered from observation, which is the part the author is most careful about. He's using a system behavior that Apple hasn't promised will remain stable across iOS versions.

The unintended side effect is the most interesting part of the story. Because the technique was applying secure-entry rendering properties, iOS's autofill heuristics started treating the marked views as password fields. Users began getting password suggestions over elements that had nothing to do with authentication. This is a clean example of how exploiting undocumented system behavior creates unpredictable interactions with other system features, and it's a useful reminder that the iOS rendering stack is not a collection of isolated modules.

The author resolved the password autofill issue, but the watermark technique itself remains a bit of a platform contract violation. It works, it's creative, and it will probably break on a future iOS update with no warning.

**Key takeaways:**
- iOS secure text entry rendering can be exploited to create screenshot-only visible watermarks
- The technique relies on undocumented UIKit behavior, not a stable API contract
- Triggering secure-entry rendering inadvertently activated iOS password autofill heuristics
- Using undocumented system behavior creates fragile integrations that break silently on OS updates

**Why do I care:** Attribution in screenshots is a genuine product problem. I've worked on tools where viral sharing was important, and the question of how to make screenshots attributable without being ugly comes up constantly. This technique is creative engineering, but the fragility is the thing I'd need to think hard about before shipping it. Any feature that depends on undocumented OS behavior is a time bomb in a long-lived product. Interesting as a concept, risky as a dependency.

**Link:** [I Hid a Watermark in Screenshots, and iOS Thought It Was a Password](https://hackernoon.com/i-hid-a-watermark-in-screenshots-and-ios-thought-it-was-a-password)

---

## How Spam Filters Shaped the Field of Adversarial ML

**TLDR:** Early-2000s email spam filters became an accidental training ground for adversarial machine learning. Spammers reverse-engineered Bayesian classifiers through trial and error, developing evasion and poisoning techniques that researchers later formalized into an entire field.

**Summary:** Gautham Koorma makes a historical argument that I find underappreciated: adversarial machine learning as a discipline didn't start in academic labs. It started in the inboxes of people getting Nigerian prince emails. The spammers who reverse-engineered Bayesian spam filters in the early 2000s were, without knowing it, running some of the first systematic adversarial ML experiments at scale.

The core dynamic was simple. Bayesian filters built probabilistic models of spam based on word frequency. Spammers responded by manipulating word distributions, inserting dictionary words to shift probability scores, misspelling flagged terms, and embedding text in images to defeat text-based classifiers. Each technique was a direct response to an observable filter behavior, and each filter update prompted a new evasion strategy. This iterated over years before the research community had formal names for what was happening.

The technical concepts that emerged from this back-and-forth map directly onto what we now call adversarial examples and data poisoning. Evasion attacks, where an attacker modifies input at inference time to fool a classifier, were invented by spammers who learned which words triggered filters and avoided them. Poisoning attacks, where training data is corrupted to degrade model performance, showed up in coordinated campaigns to flood filter training sets with misclassified examples.

What Koorma is less explicit about is the institutional knowledge that was lost. The engineers building spam filters in 2002 had empirical knowledge about adversarial behavior that wasn't systematically published or preserved. The formal adversarial ML literature had to rediscover techniques that spammers had been using for a decade. This is a recurring problem in security research, where practitioner knowledge and academic research run in separate tracks and rarely transfer efficiently.

The article also doesn't fully engage with the modern continuation of this dynamic. Large language models are the new spam filters. Jailbreaks, prompt injections, and adversarial suffixes are the new dictionary stuffing. The same cat-and-mouse structure is playing out at a much higher level of capability on both sides.

**Key takeaways:**
- Spam filter evasion in the early 2000s was informal adversarial ML before the field had a name
- Bayesian classifier evasion and training data poisoning were both independently invented by spammers
- Practitioner knowledge about adversarial behavior was not preserved and had to be rediscovered academically
- LLM jailbreaks and prompt injections are the direct modern equivalent of 2002 spam evasion

**Why do I care:** Understanding the history of adversarial ML matters for anyone building systems that process untrusted input, which is essentially every web application. The pattern of evasion-response-evasion is structural, not accidental. If you're building a content moderation system, an AI-powered form validator, or anything that classifies user-generated input, you are building a spam filter in the 2002 sense. The adversarial dynamic will find you eventually.

**Link:** [How Spam Filters Shaped the Field of Adversarial ML](https://hackernoon.com/how-spam-filters-shaped-the-field-of-adversarial-ml)
