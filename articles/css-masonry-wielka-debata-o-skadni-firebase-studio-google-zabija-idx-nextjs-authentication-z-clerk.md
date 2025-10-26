---
title: 'Css Masonry Wielka Debata O Skadni Firebase Studio Google Zabija Idx Nextjs Authentication Z Clerk'
excerpt: 'Przegląd 5 artykułów z ui.dev'
publishedAt: '2024-11-11'
slug: 'css-masonry-wielka-debata-o-skadni-firebase-studio-google-zabija-idx-nextjs-authentication-z-clerk'
hashtags: '#generated #pl #react #typescript #ai #performance #css'
---

## CSS Masonry - Wielka Debata o Składni

No i mamy to! CSS Working Group nadal nie może się dogadać jak ma wyglądać składnia dla Masonry layoutu. WebKit i Chrome toczą prawdziwą wojnę o to, czy masonry powinno być częścią CSS Grid czy osobnym modułem layoutu.

WebKit twierdzi że powinniśmy wykorzystać pełną moc CSS Grid - wszystkie te subgridy, spanning, explicit placement. Ich inżynierowie udowodnili że performance nie będzie problemem. Chrome z kolei uważa że to powinien być kompletnie osobny moduł z `display: masonry`.

Rachel Andrew, która uczy CSS od 25 lat, ma bardzo mocną opinię - masonry jako część grid to błąd. Jej argument? Dobre defaulty są kluczowe dla nauczania. Gdy robisz `display: flex`, od razu dostajesz sensowne zachowanie. Z gridem też. Ale żeby zrobić masonry przez grid, musisz pisać `display: grid`, potem `grid-template-columns` z jakąś liczbą kolumn, a potem `grid-template-rows: masonry`. To nie jest intuicyjne.

**Key takeaways:**
- Performance concerns zostały rozwiązane - masonry z CSS Grid jest możliwe
- Debata sprowadza się do składni i filozofii designu
- Rachel Andrew mocno forsuje `display: masonry` z powodu lepszych defaultów
- Responsive design będzie łatwiejszy z osobną składnią

**Link:** [link](https://webkit.org/blog/16026/css-masonry-syntax/)

## Firebase Studio - Google Zabija IDX

Google właśnie ogłosił że Project IDX zostaje wchłonięty przez Firebase i przekształcony w Firebase Studio. To ma być "full-stack AI workspace" z agentami AI, które pomogą ci budować backendy, frontendy i mobile apps w jednym miejscu.

Brzmi znajomo? Tak, to kolejna próba Google'a na stworzenie cloud IDE. Tym razem z AI na pokładzie. Masz Gemini Code Assist, który ma ci pomagać z kodowaniem, debugowaniem, testowaniem. Możesz importować repozytoria z GitHuba, GitLaba, Bitbucketa. Jest App Prototyping agent, który ma tworzyć aplikacje z natural language.

Najlepsze w tym wszystkim? "3 workspaces za darmo w preview". Google Developer Program members dostają 30. Klasyczny Google - dają za darmo, wszyscy się przyzwyczajają, potem płacisz.

**Key takeaways:**
- Project IDX oficjalnie martwy, długo żył Firebase Studio
- AI agents mają pomagać w całym development lifecycle
- Integracja z Firebase ekosystemem
- Znów Google próbuje konkurować z VS Code w chmurze

**Link:** [link](https://idx.dev/)

## Next.js Authentication z Clerk

Clerk dalej pcha swoje auth rozwiązanie dla Next.js. Mają middleware, prebuilt komponenty, RBAC, multi-tenancy. Setup ma trwać kilka minut - `npm install @clerk/nextjs`, dodaj API keys, wrap app w ClerkProvider i ready.

Najciekawsze to "keyless mode" - możesz zacząć bez tworzenia konta i API keys, aż będziesz gotowy na production. To actually smart approach.

Mają też unlimited SSO connections na wyższych planach, support dla wszystkich major protokołów - SAML, OAuth, OpenID Connect. Plus social logins - Google, GitHub, Discord, LinkedIn, TikTok i inne.

**Key takeaways:**
- Keyless mode to dobry developer experience
- Full Next.js integration z middleware
- Unlimited SSO na paid plans
- Prebuilt UI components dla szybkiego developmentu

**Link:** [link](https://go.clerk.com/JMuEojS)

## Pinia Colada - Data Fetching dla Vue

Vue ecosystem dostaje nowy data fetching layer. Pinia Colada to odpowiedź Vue na React Query. Automatic caching, request deduplication, optimistic updates, plugin system.

2kb bundle size, zero dependencies poza Pinia, full TypeScript support, SSR out of the box. Ma też official support dla Vue Router Data Loaders.

Honestly, Vue ecosystem potrzebował czegoś takiego. React ma React Query, SWR, Apollo. Vue miał... co? Teraz mają Pinia Colada.

**Key takeaways:**
- Vue wreszcie ma porządny data fetching layer
- Mały bundle size i zero dependencies
- Plugin system dla extensibility
- SSR support od początku

**Link:** [link](https://pinia-colada.esm.dev/)

## Advanced Search Params w Next.js App Router

Aurora Scharff napisała świetny artykuł o zarządzaniu search params w Next.js App Router. Problem: chcesz mieć filtering, pagination, sorting w URL, ale koordinacja między URL state a component state to pain.

Rozwiązanie: URL jako single source of truth. Lifting state up, classic React pattern. Ale z React Server Components to becomes tricky.

Artykuł pokazuje jak wykorzystać `useOptimistic()` z React 19 dla instant user feedback, i w końcu przechodzi na bibliotekę `nuqs` która robi to wszystko za ciebie.

**Key takeaways:**
- URL jako single source of truth dla search params
- `useOptimistic()` dla instant feedback
- `nuqs` library rozwiązuje większość problemów
- React Server Components komplikują state management

**Link:** [link](https://aurorascharff.no/posts/managing-advanced-search-param-filtering-next-app-router/)