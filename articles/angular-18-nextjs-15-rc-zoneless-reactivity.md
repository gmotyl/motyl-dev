---
title: "Angular 18, Next.js 15 RC i nowa era reactywności bez Zone.js"
excerpt: "Przegląd najważniejszych aktualizacji w świecie frontend-u: Angular 18 z eksperymentalnym wsparciem dla zoneless change detection oraz Next.js 15 RC z React 19."
publishedAt: "2024-05-27"
slug: "angular-18-nextjs-15-rc-zoneless-reactivity"
hashtags: "#generated #pl #frontend #angular #nextjs #react #typescript #zoneless #react-compiler #speakeasy #caching #ux-system"
---

## Angular v18 - Dorosłość bez Zone.js

**TLDR:** Angular 18 wprowadza eksperymentalne wsparcie dla zoneless change detection, porzucając zone.js na rzecz nowego modelu reaktywności opartego na sygnałach, co obiecuje lepszą wydajność i prostsze debugowanie.

**Summary:**

To jest naprawdę duży krok dla Angulara. Przez lata zone.js był sercem mechanizmu wykrywania zmian w Angularze, ale przynosił ze sobą sporo problemów wydajnościowych i utrudniał debugowanie. Teraz Angular team zdecydował się na radykalną zmianę - wprowadzenie zoneless change detection jako eksperymentalnej funkcji.

Nowy model reaktywności opiera się na sygnałach, które poznaliśmy w poprzednich wersjach. To znacznie bardziej precyzyjny sposób śledzenia zmian w aplikacji. Zamiast sprawdzać wszystko za każdym razem, gdy coś się może zmienić, Angular teraz wie dokładnie, co się zmieniło i aktualizuje tylko te części UI, które tego potrzebują.

Korzyści są naprawdę imponujące: szybszy initial render, mniejsze bundle size, czytelniejsze stack traces i prostsze debugowanie. Plus lepsza kompozycyjność z innymi frameworkami, co jest szczególnie ważne w świecie mikrofrontendów. Angular team obiecuje też silną kompatybilność wsteczną, więc nie musisz od razu migrować wszystkich aplikacji.

Żeby włączyć zoneless mode, wystarczy dodać `provideExperimentalZonelessChangeDetection` do bootstrapu aplikacji i usunąć zone.js z polyfills. Komponenty najlepiej pisać z sygnałami - wtedy wszystko działa magicznie samo. Kliknięcie przycisku aktualizuje sygnał, sygnał informuje Angular o zmianie, Angular aktualizuje UI. Proste i eleganckie.

**Key takeaways:**
- Angular 18 wprowadza eksperymentalne wsparcie dla zoneless change detection
- Nowy model oparty na sygnałach zapewnia lepszą wydajność i prostsze debugowanie
- Migracja powinna być bezbolesna dzięki silnej kompatybilności wstecznej

**Link:** [Angular v18 is now available!](https://blog.angular.dev/angular-v18-is-now-available-e79d5ac0affe)

## Next.js 15 RC - React 19 i nowe podejście do cachowania

**TLDR:** Next.js 15 RC wprowadza wsparcie dla React 19 RC, eksperymentalny React Compiler oraz radykalnie zmienia domyślne zachowanie cachowania - fetch requesty, GET Route Handlers i nawigacja kliencka nie są już domyślnie cachowane.

**Summary:**

Next.js 15 RC to naprawdę ciekawa aktualizacja, która pokazuje, jak zespół Vercel reaguje na feedback społeczności. Największą zmianą jest wsparcie dla React 19 RC, które przynosi Actions i inne nowe funkcje. Ale uwaga - niektóre biblioteki third-party mogą jeszcze nie być kompatybilne.

Bardzo interesującym dodatkiem jest eksperymentalne wsparcie dla React Compiler. To nowy kompilator stworzony przez zespół React w Meta, który automatycznie optymalizuje kod, redukując potrzebę ręcznego używania `useMemo` i `useCallback`. Kompilator rozumie semantykę JavaScript i Rules of React, dzięki czemu może dodawać optymalizacje automatycznie. Kod staje się prostszy i mniej podatny na błędy.

Ale największą zmianą jest nowe podejście do cachowania. Next.js App Router był krytykowany za zbyt agresywne domyślne cachowanie, które często było mylące dla developerów. Teraz fetch requesty, GET Route Handlers i nawigacja kliencka nie są domyślnie cachowane. To znacznie bardziej przewidywalne zachowanie, choć może wymagać dostrojenia wydajności w niektórych aplikacjach.

Poprawiono też hydration errors - teraz pokazują kod źródłowy błędu z sugestiami, jak go naprawić. To ogromna pomoc w debugowaniu, bo wcześniej te błędy były często bardzo zagadkowe. Plus Partial Prerendering staje się bardziej dostępne z nowymi opcjami konfiguracji na poziomie Layout i Page.

**Key takeaways:**
- Wsparcie dla React 19 RC i eksperymentalnego React Compiler
- Radykalna zmiana domyślnego cachowania dla lepszej przewidywalności
- Znacznie ulepszone komunikaty błędów hydration

**Link:** [Next.js 15 RC](https://nextjs.org/blog/next-15-rc)

## Speakeasy - Automatyzacja generowania SDK

**TLDR:** Speakeasy to platforma do automatycznego generowania production-ready SDK w wielu językach z specyfikacji OpenAPI, oferująca zaawansowane funkcje jak OAuth 2.0, retry logic, paginację i automatyczne publikowanie.

**Summary:**

Speakeasy to bardzo ciekawe rozwiązanie problemu, z którym boryka się wiele zespołów API - jak dostarczyć high-quality SDK dla swoich API bez spędzania miesięcy na ręcznym kodowaniu i utrzymywaniu bibliotek w różnych językach.

Platforma automatycznie generuje SDK z specyfikacji OpenAPI w językach takich jak TypeScript, Python, Go, Java, C#, PHP i innych. Ale to nie jest kolejny basic generator - Speakeasy koncentruje się na tworzeniu idiomatycznych SDK, które naprawdę przypominają handwritten code. Obsługuje zaawansowane funkcje jak OAuth 2.0, retry logic, paginację, server-sent events, a nawet generuje dokumentację z przykładami.

Szczególnie imponujące jest wsparcie dla TypeScript - używają Zod do walidacji schematów, obsługują union types i polymorphism, generują React Hooks z TanStack Query, i zapewniają end-to-end type safety. To znacznie więcej niż oferują standardowe open-source generatory.

Platforma integruje się też z CI/CD pipeline, automatycznie aktualizując i publikując SDK do package managerów za każdym razem, gdy API się zmienia. To eliminuje jeden z największych problemów z SDK - keeping them in sync z API. Plus oferują overlays i hooks do customizacji bez modyfikowania core generation process.

**Key takeaways:**
- Automatyczne generowanie production-ready SDK w wielu językach z OpenAPI
- Zaawansowane funkcje jak OAuth 2.0, retry logic, type safety z Zod
- Pełna integracja z CI/CD i automatyczne publikowanie do package managerów

**Link:** [Generate MCP servers & SDKs from OpenAPI | Speakeasy](https://www.speakeasyapi.dev/?utm_source=bytes_newsletter)

## Remix i React Router - Wielka konsolidacja

**TLDR:** Remix v3 staje się React Router v7 w ramach non-breaking upgrade, podczas gdy prawdziwy Remix wraca w przyszłości z nowym API opartym na React Server Components i incremental adoption strategy.

**Summary:**

To jedna z najbardziej zaskakujących decyzji w React ecosystem w tym roku. Ryan Florence ogłosił, że to co miało być Remix v3, stanie się React Router v7, a prawdziwy Remix wróci później z kompletnie nowym API.

Powód jest bardzo pragmatyczny - przez ostatni rok Remix stał się w zasadzie wrapperem wokół React Router. Wszystkie nowe funkcje zaczynają w React Router, a Remix po prostu je re-exportuje. Poza Vite pluginem, Remix nie dodaje już prawie nic własnego. Utrzymywanie dwóch oddzielnych projektów z osobną dokumentacją, issues i discussions nie ma sensu technicznego.

Ale prawdziwa historia jest jeszcze ciekawsza. React 19 z Server Components zmienia fundamentalnie sposób, w jaki budujemy aplikacje React. Ryan i jego zespół eksperymentowali z RSC i stworzyli kompletnie nowe API dla Remix, które wewnętrznie nazywają "Reverb". Podobno jeden z inżynierów Shopify powiedział po prezentacji: "Wow, to naprawdę piękne".

Nowe API jest na tyle różne, że zasługuje na osobną nazwę i strategię incremental adoption. Gdy aplikacje Remix przejdą na React Router v7, zwolni to miejsce w package.json na uruchomienie obu wersji równolegle podczas migracji. To bardzo przemyślane podejście do tak dużej zmiany.

React Router v7 przynosi też nowe funkcje, których nie ma ani w Remix, ani w obecnym React Router: RSC, server actions, static pre-rendering i enhanced type safety. To pokazuje, jak bardzo ekosystem React ewoluuje.

**Key takeaways:**
- Remix v3 staje się React Router v7 w ramach non-breaking upgrade
- Prawdziwy Remix wraca z nowym API opartym na React Server Components
- Strategia incremental adoption umożliwi płynną migrację

**Link:** [Incremental Path to React 19: React Conf Follow-Up](https://remix.run/blog/incremental-path-to-react-19)

## Caching - Definicja, warstwy i optymalizacja

**TLDR:** Cache to non-authoritative representation of data maintained for performance - artykuł wyjaśnia wszystkie aspekty cachowania, od podstawowych definicji przez invalidation strategies po różne warstwy cache w nowoczesnych aplikacjach.

**Summary:**

Ten artykuł to prawdziwa perełka dla każdego, kto chce głęboko zrozumieć caching. Definicja "cache to non-authoritative representation of data maintained for performance" brzmi prosto, ale kryje w sobie masę złożoności.

Kluczowe jest zrozumienie, że cache nigdy nie jest source of truth. Zawsze istnieje jeden autorytatywny source - na przykład baza danych Postgres, gdzie zapisujemy username użytkownika. Cache, jak Redis, przechowuje kopię dla wydajności, ale jeśli server się crashuje, możemy odtworzyć dane z authoritative source.

Performance benefits pochodzą z różnych źródeł. Czasem to faster hardware - RAM vs disk. Czasem to physical distance - browser cache na twoim laptopie vs server na drugim kontynencie. Czasem to pre-computation - zamiast obliczać complex query za każdym razem, cache przechowuje wynik.

Artykuł świetnie wyjaśnia też invalidation strategies. To jeden z najtrudniejszych problemów w computer science - jak wiedzieć, kiedy cached data jest już nieaktualne? Są różne podejścia: time-based expiration, event-based invalidation, czy manual purging. Każde ma swoje trade-offy między freshness a performance.

Bardzo praktyczne są też przykłady różnych warstw cache - od CPU cache przez browser cache, CDN, application-level cache, aż po database query cache. Każda warstwa ma swoje charakterystyki i use cases.

**Key takeaways:**
- Cache to non-authoritative copy of data przechowywana dla wydajności
- Performance benefits mogą pochodzić z faster hardware, shorter distance lub pre-computation
- Invalidation strategies to kluczowy element effective caching

**Link:** [The Ultimate Caching Definition: Invalidation, Optimization, and Layers](https://stack.convex.dev/caching-in?ref=bytes)
---

**Disclaimer:** This article was generated using [newsletter-ai](https://github.com/gmotyl/newsletter-ai) powered by claude-sonnet-4-20250514 LLM. While we strive for accuracy, please verify critical information independently.
