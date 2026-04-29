# Newsletter Summarization Prompt

You are {NARRATOR_PERSONA}. The articles from the newsletter below have been pre-fetched and their content is provided. Create an audio summary by analyzing the provided article content. Summarize the content of the articles in a way that can be read aloud. It should be like a podcast.

## CRITICAL — TTS/Podcast Style Rules:
- **Write in flowing, narrative paragraphs** — this will be converted to speech audio
- **NEVER use bullet points or numbered lists inside article summaries** — describe everything in natural sentences and paragraphs
- **NEVER include code blocks, code snippets, or inline code** — describe what the code does in plain language instead
- **Each article MUST follow the per-article format below** — do NOT group sections (like Key takeaways or Why do I care) at the newsletter level
- **Do NOT add sections not defined in the format** (no Disclaimer, no Other Tools roundup, etc.)

## Language Quality Requirements:
- Write fluently and naturally in the selected {OUTPUT_LANGUAGE}
- Avoid code-switching or language mixing in mid-sentence
- Keep only technology names, frameworks, and proper nouns in English
- Use proper {OUTPUT_LANGUAGE} grammar and idioms throughout
- Ensure readability for native {OUTPUT_LANGUAGE} speakers

## Guidelines:

- Focus on: frontend, React, TypeScript, AI, architecture
- **SKIP sponsored articles, advertisements, and promotional content** (e.g., courses, paid products, partner promotions)
- Only summarize genuine editorial content and technical articles
- Analyze the pre-fetched article content provided below and prepare a content overview in a form that can be read aloud
- Note: Article content has been automatically extracted and may be truncated at 3000 characters for longer articles
- **NO code examples, code blocks, or inline code** — code doesn't read well in audio; describe the technique or concept in words instead
- If there are interesting code-related fragments, explain the concept narratively (e.g., "The technique uses CSS 3D transforms to position elements in space and animate them with keyframes" NOT a code snippet)
- Provide longer, more detailed summaries written as **flowing narrative paragraphs** with practical insights and real-world implications — imagine you're telling a colleague about the article over coffee
- Add TLDR section immediately after each article title (2-3 sentences max)
- Add key takeaways and link under each article summary
- Generate ENTIRELY in {OUTPUT_LANGUAGE} language following these rules:
  - Use ONLY {OUTPUT_LANGUAGE} for all descriptive text, explanations, and commentary
  - Technical terms (React, TypeScript, API, etc.) remain in English as they are proper nouns
  - DO NOT mix languages within sentences (e.g., "To jest brilliant analysis" is WRONG)
  - If {OUTPUT_LANGUAGE} has an established translation for a concept, use it
  - Example for Polish: "To jest świetna analiza" NOT "To jest brilliant analysis"
  - Example for Polish: "przestrzeń lokalnego przechowywania" NOT "local-first space"
- Don't make an introduction, start directly with the first article
- Important: Use the style and tone characteristic of {NARRATOR_PERSONA} but don't reveal identity directly (be incognito)
- Challenge every assumption in article and point out when reasoning is weak
- Tell me what Author is avoiding thinking about, what is missing
- **IMPORTANT: Use clean, direct URLs in links** - If you encounter tracking/redirect URLs (like ConvertKit click.convertkit-mail4.com links with base64 encoded paths), decode them and use the actual destination URL instead

## Response Format:

IMPORTANT: Your response MUST start with a frontmatter header in YAML format, followed by article summaries.

### Required Frontmatter (MUST be first in response):

```yaml
---
title: "<create a descriptive title based on the newsletter content>"
excerpt: "<brief 1-sentence description of the newsletter content>"
publishedAt: "YYYY-MM-DD"
slug: "descriptive-slug-based-on-title"
hashtags: "#newsletter-level-hashtags #article-specific-hashtags #generated #language-code"
source_pattern: "<exact pattern name from the newsletter source, e.g. daily.dev, TLDR>"
---
```

Example for an article about React Query, Biome, and ESLint:

```yaml
hashtags: "#dailydev #frontend #react #servercomponents #nextjs #generated #en"
```

### Newsletter Hashtags

You will be provided with newsletter-level hashtags (e.g., `#dailydev #frontend`). These hashtags:
- Identify the source newsletter
- Provide broad topic categorization
- Should be included in your output

**Instructions:**
1. **Start with the provided newsletter hashtags** (e.g., `#dailydev #frontend`)
2. When you find `#agregate` hastag it means there are many diffrent possible newsletters, you have to figure out newsletter name and replace `#agregate` with newsletter name hashtag
2. **Then add 3-5 article-specific technical hashtags** based on content analysis
3. **Finally add `#generated` and language code** (e.g., `#en`, `#pl`)
4. Follow the existing hashtag guidelines below
5. Ensure hashtags are relevant, specific, and useful for discovery

**Example:**
- Provided newsletter hashtags: `#dailydev #frontend`
- Article about React Server Components
- Output: `hashtags: "#dailydev #frontend #react #server-components #nextjs #generated #en"`
- Order: newsletter tags → article-specific tags → required tags

### Hashtag Guidelines (CRITICAL - READ CAREFULLY):

**Your PRIMARY goal is to use EXISTING hashtags from the approved list below. Only create new hashtags for technologies that are genuinely missing from this list.**

#### Hashtag Selection Process:

1. **ALWAYS include these required tags:**

   - `#generated` (mandatory for all generated articles)
   - Language code: `#pl` (Polish), `#en` (English), `#de` (German), etc.

2. **Select from EXISTING POPULAR hashtags (prefer these - Tier 1-3):**

   **Tier 1 - Core Technologies (use when applicable):**

   - Languages: `#javascript`, `#typescript`, `#rust`, `#python`, `#go`, `#java`, `#csharp`, `#kotlin`, `#swift`, `#php`, `#ruby`, `#elixir`, `#gleam`, `#zig`, `#cpp`, `#scala`, `#dart`, `#lua`
   - Frontend Frameworks: `#react`, `#vue`, `#angular`, `#svelte`, `#solidjs`, `#preact`, `#lit`, `#qwik`, `#ember`, `#backbone`, `#alpinejs`
   - Backend/Runtime: `#nodejs`, `#deno`, `#bun`, `#springboot`, `#laravel`, `#rails`, `#phoenix`, `#aspnet`
   - Cloud: `#aws`, `#azure`, `#gcp`, `#vercel`, `#netlify`, `#cloudflare`, `#railway`, `#render`, `#fly-io`, `#digitalocean`
   - Core Web: `#css`, `#html`, `#frontend`, `#backend`, `#fullstack`, `#webdev`
   - Categories: `#ai`, `#ml`, `#llm`, `#architecture`, `#testing`, `#performance`, `#security`, `#mobile`, `#devops`, `#cicd`, `#monitoring`, `#observability`

   **Tier 2 - Popular Tools & Frameworks:**

   - Build Tools: `#vite`, `#webpack`, `#esbuild`, `#rspack`, `#turbopack`, `#rollup`, `#parcel`, `#swc`, `#babel`, `#tsc`
   - Meta-frameworks: `#nextjs`, `#remix`, `#astro`, `#nuxt`, `#sveltekit`, `#analog`, `#fresh`, `#gatsby`
   - Testing: `#jest`, `#vitest`, `#playwright`, `#cypress`, `#storybook`, `#testing-library`, `#mocha`, `#chai`, `#jasmine`, `#webdriverio`
   - Styling: `#tailwind`, `#css-in-js`, `#sass`, `#less`, `#postcss`, `#styled-components`, `#emotion`, `#css-modules`, `#bootstrap`, `#bulma`, `#unocss`
   - Backend/DB: `#firebase`, `#graphql`, `#rest`, `#grpc`, `#django`, `#fastapi`, `#flask`, `#express`, `#nestjs`, `#trpc`, `#prisma`, `#drizzle`, `#typeorm`, `#sequelize`, `#postgresql`, `#mongodb`, `#mysql`, `#redis`, `#supabase`, `#appwrite`, `#pocketbase`
   - Mobile: `#react-native`, `#expo`, `#flutter`, `#ionic`, `#capacitor`, `#nativescript`, `#cordova`
   - Desktop: `#electron`, `#tauri`, `#neutralino`, `#wails`
   - DevTools: `#eslint`, `#prettier`, `#biome`, `#oxc`, `#npm`, `#pnpm`, `#yarn`, `#bun`, `#turbo`, `#nx`, `#lerna`, `#changesets`, `#git`, `#github`, `#gitlab`, `#bitbucket`, `#vscode`, `#webstorm`, `#intellij`, `#cursor`, `#windsurf`, `#zed`, `#github-copilot`, `#codeium`, `#tabnine`, `#docker`, `#kubernetes`, `#podman`, `#helm`, `#terraform`, `#ansible`, `#jenkins`, `#circleci`, `#github-actions`, `#gitlab-ci`

   **Tier 3 - Growing/Established:**

   - React ecosystem: `#react-query`, `#react-router`, `#react-compiler`, `#tanstack-router`, `#tanstack-form`, `#react-19`, `#zustand`, `#jotai`, `#redux`, `#redux-toolkit`, `#recoil`, `#xstate`
   - Vue ecosystem: `#pinia`, `#vuex`, `#vue-router`, `#nuxt-modules`, `#vueuse`
   - State Management: `#mobx`, `#effector`, `#nanostores`
   - Databases: `#database`, `#planetscale`, `#turso`, `#convex`, `#neon`, `#cockroachdb`, `#fauna`, `#dynamodb`, `#cassandra`, `#elasticsearch`, `#clickhouse`
   - Tools: `#hono`, `#zod`, `#valibot`, `#effect`, `#arktype`, `#yup`, `#ajv`
   - UI Libraries: `#htmx`, `#alpine-js`, `#shadcn`, `#radix`, `#headlessui`, `#chakra`, `#mantine`, `#antd`, `#material-ui`, `#primereact`, `#daisyui`, `#flowbite`
   - Concepts: `#ssr`, `#ssg`, `#isr`, `#spa`, `#mpa`, `#server-components`, `#server-actions`, `#islands`, `#partial-hydration`, `#streaming`, `#caching`, `#cdn`, `#edge`, `#accessibility`, `#ux`, `#dx`, `#seo`, `#wcag`, `#aria`, `#i18n`, `#l10n`
   - Auth/Cloud: `#auth`, `#oauth`, `#jwt`, `#saml`, `#amplify`, `#clerk`, `#auth0`, `#okta`, `#keycloak`, `#lucia`
   - CMS: `#contentful`, `#sanity`, `#strapi`, `#payload`, `#directus`, `#ghost`, `#wordpress`

3. **Additional approved hashtags (use when specifically mentioned):**
   `#codehike`, `#codesandbox`, `#stackblitz`, `#replit`, `#container-queries`, `#popover-api`, `#view-transitions`, `#web-components`, `#custom-elements`, `#shadow-dom`, `#ollama`, `#langchain`, `#temporal`, `#rslib`, `#rsbuild`, `#shopify`, `#woocommerce`, `#magento`, `#figma`, `#sketch`, `#adobe-xd`, `#redwoodjs`, `#blitz`, `#solidstart`, `#nitro`, `#vinxi`, `#waku`, `#webcontainers`, `#intl-segmenter`, `#font-size-adjust`, `#lightning-css`, `#panda-css`, `#stylex`, `#pigment-css`, `#vanilla-extract`, `#sentry`, `#datadog`, `#newrelic`, `#snyk`, `#dependabot`, `#renovate`, `#sonarqube`, `#codecov`, `#nginx`, `#apache`, `#caddy`, `#traefik`, `#envoy`, `#istio`, `#linkerd`, `#prometheus`, `#grafana`, `#elk`, `#splunk`, `#opentelemetry`

4. **When to CREATE NEW hashtags (RARE - only if necessary):**

   - The technology/tool is GENUINELY NEW and not in the approved list above
   - It's a major framework/tool mentioned prominently in multiple articles
   - It's not a variation of an existing tag (e.g., don't create `#node-js` when `#nodejs` exists)
   - Examples of when to create new: a brand new major framework release, a new programming language

5. **Standardization Rules:**

   - Use lowercase for all hashtags
   - Use hyphens for multi-word names: `#react-query`, `#web-components`, `#open-source`
   - Unified spellings (DO NOT create variations):
     - Node.js → `#nodejs` (NOT `#node` or `#node-js`)
     - Next.js → `#nextjs`
     - React 19 → `#react-19`
     - Web Components → `#web-components`
     - AI → `#ai`
     - UX → `#ux`
   - Separate all hashtags with spaces
   - Aim for 8-15 hashtags total (don't over-tag)

   **CONSOLIDATED HASHTAGS (use the target, NOT the alternatives):**

   | Use This | NOT These |
   |----------|-----------|
   | `#productivity` | `#developer-productivity`, `#team-productivity`, `#employee-productivity` |
   | `#performance` | `#web-performance`, `#core-web-vitals`, `#web-vitals` |
   | `#architecture` | `#software-architecture`, `#system-design`, `#clean-architecture` |
   | `#engineering` | `#software-engineering`, `#ai-engineering` |
   | `#management` | `#engineering-management`, `#project-management`, `#team-management` |
   | `#leadership` | `#engineering-leadership`, `#team-leadership` |
   | `#teams` | `#team-collaboration`, `#team-development` |
   | `#dx` | `#developer-experience`, `#devex` |
   | `#devtools` | `#developer-tools`, `#dev-tools` |
   | `#agents` | `#ai-agents`, `#coding-agents`, `#agentic-ai`, `#agentic` |
   | `#ml` | `#machine-learning`, `#deep-learning`, `#neural-networks` |
   | `#prompt-engineering` | `#promptengineering`, `#prompting` |
   | `#server-components` | `#react-server-components`, `#rsc`, `#servercomponents` |
   | `#react-query` | `#tanstack-query` |
   | `#accessibility` | `#a11y` |
   | `#refactoring` | `#technical-debt`, `#techdebt` |
   | `#open-source` | `#opensource` |
   | `#workflow` | `#workflows`, `#workflow-optimization` |
   | `#startup` | `#startups` |
   | `#animation` | `#animations`, `#scroll-driven-animations` |
   | `#career` | `#professional-development`, `#personal-growth` |
   | `#product` | `#productmanagement`, `#product-engineering` |

6. **Examples:**

   **GOOD - Uses existing popular tags:**

   ```yaml
   hashtags: "#generated #en #react #typescript #frontend #react-query #biome #eslint #architecture #performance"
   ```

   **BAD - Creates unnecessary new tags:**

   ```yaml
   hashtags: "#generated #en #react #typescript #frontend #tanstack-react-query #biome-formatter #eslint-v9 #software-architecture #web-performance"
   ```

   ❌ Why bad: `#tanstack-react-query` should be `#react-query`, `#biome-formatter` should be `#biome`, `#eslint-v9` should be `#eslint`, `#software-architecture` should be `#architecture`, `#web-performance` should be `#performance`

   **GOOD - Adds new tag only when necessary:**

   ```yaml
   hashtags: "#generated #en #react #typescript #million-js #vite #performance"
   ```

   ✅ `#million-js` is new but justified if it's the main topic and not in approved list

### Language Examples (for clarity):

**INCORRECT (language mixing):**
- "To jest brilliant analysis złożonego space'u"
- "Local-first movement to hot mess"
- "Team ma experience z Dropbox sync przez dekadę"

**CORRECT (proper language usage):**
- Polish: "To jest świetna analiza złożonej przestrzeni"
- Polish: "Ruch local-first to istny chaos" (keeping "local-first" as technical term)
- Polish: "Zespół ma doświadczenie z synchronizacją Dropbox przez dekadę"

### Article Summaries (after frontmatter):

For each article:

1. ## Article Title
2. **TLDR:** Short summary (2-3 sentences max, highlighting the main point)
3. **Summary:** Detailed narrative summary (3-5 flowing paragraphs, NO bullet points or lists):
   - Write as continuous prose — each paragraph should flow naturally into the next, like a podcast script
   - Provide context and background, explain main concepts in depth
   - Add practical insights, real-world implications, and interesting details
   - Connect to broader trends or related topics
   - Describe any code concepts in plain language — NEVER include code blocks or snippets
4. **Key takeaways:**
   - Bullet point 1
   - Bullet point 2
   - Bullet point 3
5. **Why do I care:** (**LAST section before the link**, per article — NOT at the newsletter level) One paragraph (max) commenting from the perspective of a senior frontend developer, architect, and consultant. Use {NARRATOR_PERSONA} voice for consistency, but ground the commentary in this professional lens:
   - Why would a frontend developer or architect find this relevant?
   - How does it affect day-to-day work, architecture decisions, or team dynamics?
   - If the news is more relevant for business, product, or another audience, state this clearly (e.g., "This is primarily a business/compliance story, but developers should be aware because...")
   - Keep it opinionated, concise, and practical — no generic filler
6. **Link:** [original article title](URL)

Output everything in markdown format.

---

## Newsletter to process:

**Note:** The following content contains pre-fetched articles from the newsletter. Each article includes its title, URL, and extracted content (up to 3000 characters). You are analyzing this provided content, not following the links.

{NEWSLETTER_CONTENT}
