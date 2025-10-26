---
title: 'Server Actions Are Here Waku Introducing Pages Router Waku Stripes Monorepo Developer Environment'
excerpt: 'Przegląd 6 artykułów z ui.dev'
publishedAt: '2024-08-23'
slug: 'server-actions-are-here-waku-introducing-pages-router-waku-stripes-monorepo-developer-environment'
hashtags: '#generated #pl #react #ai #performance'
---

## Server actions are here! — Waku

Waku właśnie wypuściło wersję 0.21 z pełnym wsparciem dla React Server Actions API. To nie jest kolejna zabawka - to prawdziwa zmiana w sposobie, w jaki myślimy o komunikacji między klientem a serwerem.

Zapomnijcie o ręcznym setupie API endpoints, POST requestach z fetch czy zarządzaniu pending states. Server actions pozwalają definiować server-side logikę bezpośrednio w React componentach. Używacie dyrektywy 'use server' i magia się dzieje - Waku automatycznie tworzy referencję do akcji, którą możecie przekazać jako props do client componentów.

Co ciekawe, możecie tworzyć inline server actions w server componentach albo wynosić je do osobnych plików. Ale uwaga - każda funkcja z 'use server' na topie pliku staje się API endpointem, więc nie róbcie tego bezmyślnie. To nie jest 'use client' - to coś zupełnie innego.

**Key takeaways:**
- Pełne wsparcie dla React 19 Server Actions API
- Automatyczne tworzenie API endpoints bez ręcznego setupu
- Możliwość inline actions w server componentach
- Bezpieczeństwo wymaga własnej logiki auth/authorization

**Link:** [link](https://waku.gg/blog/server-actions-are-here)

## Introducing "pages router" — Waku

Waku wprowadza też pages router, który brzmi znajomo dla każdego, kto używał Next.js. File-based routing z minimalnym API, zaprojektowany dla startupów i agencji budujących małe do średnie projekty React.

Tworzenie strony to teraz kwestia stworzenia pliku w katalogu ./src/pages. Chcecie home page? Robicie index.tsx. Blog? blog/index.tsx i blog/[slug].tsx. Layout dla całej strony? _layout.tsx. Proste jak budowa cepa.

Każda strona eksportuje default komponent i funkcję getConfig, która określa metodę renderowania - 'static' dla SSG albo 'dynamic' dla SSR. Możecie mieć statyczny header i footer, ale dynamiczną zawartość dla personalizacji. To elastyczność, której potrzebujecie.

**Key takeaways:**
- File-based routing podobny do Next.js
- Wsparcie dla SSG i SSR w jednej aplikacji
- Segment routes z nawiasami kwadratowymi
- Minimalne API dla szybkiego developmentu

**Link:** [link](https://waku.gg/blog/introducing-pages-router)

## Stripe's monorepo developer environment

To jest kawał historii. Ktoś, kto pracował w Stripe przez 7 lat, opisuje jak wyglądało ich developer environment. Ruby monorepo z narzędziami, które były naprawdę przemyślane.

Najważniejsza lekcja? Stripe wcześnie zainwestowało w dedykowany team do developer productivity. Nie była to myśl poboczna - to był priorytet z prawdziwymi seniorami i budżetem. To team budował i utrzymywał narzędzia, które pozwalały inżynierom skupić się na biznesie, a nie na walce z toolingiem.

Mieli wspólny codebase dla wielu serwisów, które dzieliły kod ekstensywnie. Stripe API było prawie w całości jednym Ruby serwisem w monorepo. To pokazuje, że monorepo może działać nawet w skali Stripe, jeśli macie odpowiednie narzędzia i ludzi do ich utrzymania.

**Key takeaways:**
- Inwestycja w developer productivity team była kluczowa
- Ruby monorepo z ekstensywnym code sharing
- Narzędzia były budowane przez doświadczonych inżynierów
- Tooling może być competitive advantage

**Link:** [link](https://blog.nelhage.com/post/stripe-dev-environment/)

## spatial compute

To jest interesująca wizja przyszłości. Autor opisuje koncepcję "spatial compute" - pisania kodu w jednym pliku, gdzie różne części wykonują się w różnych częściach świata, zależnie od tego, co jest najlepsze dla użytkownika.

Wyobraźcie sobie serwer, gdzie część kodu wykonuje się blisko użytkownika dla niskiej latencji, inna część blisko bazy danych dla szybkiego dostępu do danych, a jeszcze inna w miejscu z najtańszym compute. Wszystko w jednym pliku, ale rozproszone geograficznie.

To buduje na Cloudflare Durable Objects, które pozwalają na przypisanie obiektu per session per user. To alternatywa między centralizowanym key-value store a kodowaniem wszystkiego w cookies. Brzmi jak science fiction, ale technologia już istnieje.

**Key takeaways:**
- Kod w jednym pliku, wykonanie w wielu lokalizacjach
- Optymalizacja based on latency, cost, reliability
- Wykorzystanie Cloudflare Durable Objects
- Przyszłość może być bardziej rozproszona niż myślimy

**Link:** [link](https://sunilpai.dev/posts/spatial-compute/)

## pkg.pr.new - Continuous Preview Releases

StackBlitz Labs wypuściło pkg.pr.new - narzędzie do continuous preview releases dla bibliotek. Każdy commit i pull request triggeruje instant preview release bez publikowania do NPM.

To rozwiązuje prawdziwy problem - czekanie na release cycles żeby przetestować fix czy nową feature. Teraz możecie zainstalować package bezpośrednio z commita: npm i https://pkg.pr.new/owner/repo/package@commit. To npm-compatible URLs, które działają od razu.

Cloudflare wspiera infrastructure, więc to nie jest kolejny side project, który zniknie za rok. GitHub App instalujecie raz, potem npx pkg-pr-new publish w workflow i macie continuous releases.

**Key takeaways:**
- Preview releases bez publikowania do NPM
- Instant builds z każdego commita
- Wsparcie dla monorepos i workspaces
- Backed by Cloudflare infrastructure

**Link:** [link](https://github.com/stackblitz-labs/pkg.pr.new)

## Nuxt Scripts - Better Third-Party Script Management

Nuxt team z Google Chrome Aurora wypuścił public beta Nuxt Scripts. To próba rozwiązania problemu third-party scripts, które spowalniają web, powodują privacy i security issues.

94% stron używa przynajmniej jednego third-party provider, średnia to pięć providerów. Te skrypty są użyteczne, ale problematyczne. Nuxt Scripts ma poprawić performance, privacy, security i developer experience.

Developer experience jest obecnie nightmare - wszystko musi być wrapped dla SSR safety, flaky checks czy skrypt się załadował, augmentowanie window object dla types. Nuxt Scripts ma to wszystko uprościć.

**Key takeaways:**
- Collaboration między Nuxt team a Google Chrome Aurora
- 94% stron używa third-party scripts
- Focus na performance, privacy, security, DX
- Public beta już dostępna

**Link:** [link](https://nuxt.com/blog/nuxt-scripts)