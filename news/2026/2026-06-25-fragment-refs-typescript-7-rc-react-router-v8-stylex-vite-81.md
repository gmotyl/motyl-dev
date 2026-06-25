---
title: "Fragment refs, TypeScript 7.0 RC, React Router v8 i wielkie tygodnie dla toolingu"
excerpt: "Przegląd najważniejszych nowości ze świata React i frontendu: od Fragment refs w Canary, przez migrację Linear do StyleX, aż po TypeScript przepisany w Go i Vite 8.1 z bundled dev mode."
publishedAt: "2026-06-24"
slug: "fragment-refs-typescript-7-rc-react-router-v8-stylex-vite-81"
hashtags: "#thisweekinreact #react #reactnative #typescript #vite #astro #tanstack #stylex #generated #pl"
source_pattern: "This Week In React"
---

## Fragment refs trafiają do Canary

**TLDR:** React oficjalnie wypuścił Fragment refs do kanału Canary. Fragmenty mogą teraz przyjmować atrybut `ref`, który zwraca obiekt `FragmentInstance` z bogatym zestawem metod do operowania na węzłach DOM zawartych w grupie bez dodawania wrappera.

To nie jest kosmetyczna zmiana. Przez lata React programiści musieli owijać grupy elementów w dodatkowe `<div>`, `<span>` czy inne kontenery tylko po to, żeby móc przypiąć do nich ref i np. zarządzać fokusem, podpiąć event listenery lub uruchomić `IntersectionObserver`. Fragment refs eliminują ten kompromis.

`FragmentInstance` dostarcza metody takie jak `addEventListener`, `focus`, `focusLast`, `blur`, `observeUsing`, `scrollIntoView`, `getClientRects` czy `compareDocumentPosition`. Metody eventowe i observerowe operują na węzłach DOM pierwszego poziomu fragmentu, natomiast `focus` i `focusLast` przeszukują dzieci rekurencyjnie depth-first. Nie są to metody tanie w zrozumieniu, ale rozwiązują realne problemy.

Ograniczenie warte zapamiętania: żeby przekazać `ref` do Fragmentu, nie można używać skrótu `<>...</>`. Trzeba zaimportować `Fragment` explicite i napisać `<Fragment ref={yourRef}>`. Takie samo ograniczenie działa dla atrybutu `key`. Jest jeszcze ciekawa właściwość `reactFragments` na węzłach DOM, która przechowuje `Set<FragmentInstance>` zawierający wszystkie fragmenty, które "posiadają" dany element, co otwiera drogę do współdzielenia jednej instancji `IntersectionObserver` między wieloma fragmentami.

**Key takeaways:**
- Fragment może teraz przyjmować `ref`, który zwraca `FragmentInstance` z metodami do DOM
- Metody takie jak `addEventListener` i `observeUsing` operują na bezpośrednich dzieciach DOM fragmentu
- `focus` i `focusLast` szukają rekurencyjnie przez całe drzewo
- Do użycia wymagana jest jawna składnia `<Fragment ref={ref}>`, nie `<></>`
- Każde dziecko DOM fragmentu z refem dostaje właściwość `reactFragments`

**Why do I care:** Fragment refs to jedna z tych zmian, które po wdrożeniu staną się niewidoczne, bo po prostu zaczną działać tam, gdzie wcześniej wstawiałem wrapper. Zarządzanie fokusem w złożonych formularzach, viewport tracking bez dodatkowych elementów, event delegation bez kontenera, to wszystko zyska na czystości. Canary to nie produkcja, ale kierunek jest wyraźny i nie budzi wątpliwości.

**Link:** [Fragment refs w dokumentacji React](https://react.dev/reference/react/Fragment)

---

## Linear migruje ze styled-components do StyleX

**TLDR:** Inżynier z Linea opisał kilkumiesięczną migrację aplikacji Reactowej ze styled-components do StyleX. Migracja jest w 58% ukończona i przynosi około 30% szybsze renderowanie przy nawigacji między stronami.

Artykuł to rzadki, szczery raport z produkcji. Motywacja była dwojaka: po pierwsze, styled-components weszło w maintenance mode i nigdy nie przyjęło `useInsertionEffect` z React 18, co przekłada się na realne problemy z wydajnością przy generowaniu CSS w runtime. Po drugie, model stylu oparty na `styled(Button)` robi ze stylowania z zewnątrz normę, a nie wyjątek. Przy skali Linea, gdzie chęć spójności UI nie wystarcza do utrzymania porządku, potrzebne są twarde granice architektoniczne.

Wybór padł na StyleX, a nie vanilla-extract, ze względu na API trzymające style blisko komponentów, determinizm rozwiązywania konfliktów oraz silne encapsulation. Alternatywa z vanilla-extract wymagałaby osobnych plików ze stylami i bardziej złożonego API. StyleX ma za sobą Metę, Figmę i Cursora, co daje pewne gwarancje długowieczności.

Sam proces był wspomagany przez agenty AI z własnym codemodem. Kodemod ma już ponad 500 pull requestów i 100 tys. linii kodu narzędzi migracyjnych, ale nadal wymaga ludzkiego oka przy weryfikacji hover states i stanach tematycznych. Autor wprost pisze: "agenty mogą wykonać niesamowitą ilość pracy, ale ludzie wciąż są potrzebni, żeby zauważyć zepsute hover states i budować systemy, które agenty czynią produktywnymi".

Approach: migracja inkrementalna od liści drzewa komponentów, lint rules blokujące powrót do starych wzorców, CSS Modules jako świadomy escape hatch dla globalnych selektorów.

**Key takeaways:**
- styled-components w maintenance mode nigdy nie przyjęło `useInsertionEffect` z React 18
- StyleX eliminuje runtime CSS generation, co daje ok. 30% szybsze renderowanie stron
- Migracja wymaga definicji StyleX variables i primitives zanim kodemod może działać
- Agenty AI pomagają w mechanicznej pracy, ale weryfikacja wizualna nadal wymaga człowieka
- CSS Modules jako escape hatch dla globalnych selektorów i restyling third-party DOM

**Why do I care:** Każdy projekt z CSS-in-JS w stylu styled-components ma w sobie tę samą bombę z opóźnionym zapłonem, styl nakładany z zewnątrz jako domyślny wzorzec. Linear robi to publicznie i metodycznie. Sam kodemod jako open-source projekt jest znacznie ciekawszy niż większość tutoriali o StyleX. Warto obserwować.

**Link:** [Moving Linear from styled-components to StyleX](https://www.skovhus.dev/blog/moving-linear-from-styled-components-to-stylex)

---

## TanStack Table V9 redukuje zużycie pamięci o 90%

**TLDR:** TanStack Table V9 używa do 90% mniej pamięci niż V8 przy dużych tabelach. Zmiana pochodzi z jednego refaktoru: metody wierszy, kolumn, komórek i nagłówków zostały przeniesione ze instancji obiektów na współdzielony prototyp.

Liczby są konkretne. Przy 100 tys. wierszy i 8 kolumnach V8 zajmował 272 MB, V9 zajmuje 27 MB. Przy milion wierszach różnica to 2,45 GB. Limit praktyczny wzrósł z około 1,5 mln do 10-16 mln wierszy zanim przeglądarka dobije do 4 GB. Brzmi jak akademicki przykład, ale TanStack dokumentuje realne przypadki użycia.

Mechanizm: w V8 każda instancja wiersza miała własne kopie wszystkich metod jako arrow functions. Arrow function niesie za sobą scope closure, a closure trzyma referencje do tabeli, cache, opcji. Przy milionie wierszy oznaczało to milion prawie identycznych zestawów funkcji w pamięci. V9 tworzy metody raz na prototypie i przypisuje prototyp do obiektu wiersza, metody używają `this` zamiast domknięcia.

Dlaczego nie klasy? TanStack Table ma dynamicznie komponowany system feature/pluginów. Wiersz może mieć `getVisibleCells()` tylko jeśli feature column visibility jest aktywny. Klasy z dziedziczeniem nie obsługują tego wzorca wystarczająco elastycznie, warunkowe wielokrotne dziedziczenie przez mixiny jest bardziej kruche. Manualne przypisanie do prototypu daje to samo co klasy, zachowując dynamiczność.

Istnieje jedna cena: destrukturyzacja metod przestaje działać. `const { getValue } = row` i późniejsze wywołanie `getValue()` zakończy się błędem, bo `this` będzie `undefined`. Metoda musi być wywoływana jako `row.getValue()`. To breaking change, ale akceptowalny w wydaniu major.

**Key takeaways:**
- V9 przenosi metody wierszy/kolumn/komórek z instancji na wspólny prototyp
- Redukcja pamięci o ~90% dla dużych zestawów danych (100k+ wierszy)
- Arrow functions w instancjach tworzyły miliony prawie identycznych closure z refami do stanu
- Destrukturyzacja metod obiektów tabeli przestała działać, metody muszą być wywoływane z kontekstem
- Nie użyto klas ze względu na potrzebę dynamicznej kompozycji feature-ów

**Why do I care:** Ten refaktor to klasyczny przykład "oczywistego" rozwiązania, które wymaga odpowiedniego momentu (breaking change release) i odpowiedniej motywacji (realne problemy produkcyjne). Wzorzec shared prototype zamiast per-instance closures jest wart zapamiętania dla każdego, kto buduje biblioteki generujące wiele obiektów tego samego kształtu.

**Link:** [How an Underrated Refactor Saved 90% Memory Usage](https://tanstack.com/blog/tanstack-table-v9-memory-performance)

---

## React Router v8 i roczny cykl wydań

**TLDR:** React Router v8 to kolejne "nudne" wydanie major. Podnosi minimum do Node 22.22+, React 19.2.7+, Vite 7+, przechodzi na ESM-only i usuwa `react-router-dom`. Zmieniają się też domyślne zachowania przełączonych flagami future z v7.

Ciekawszy kontekst niż same breaking changes: Shopify ogłosił roczny cykl wydań major dla React Router. Oznacza to przewidywalne, przeważnie nudne upgrady. W v7 pojawiło się Framework Mode, v8 to jego stabilizacja i normalizacja. W ciągu roku między v7 a v8 wypuszczono ponad 40 wydań z middleware, split route modules, type-safe href, link masking i dziesiątkami innych funkcji.

Z perspektywy migracji: usunięto `react-router-dom` (był tylko warstwą kompatybilności dla v6→v7), zmieniono parametr `data` na `loaderData` w meta API, usunięto proxy Cloudflare na rzecz oficjalnego pluginu Cloudflare do Vite. `splitRouteModules` stało się domyślnym zachowaniem bez flagi.

Kwestia Remixa: Remix 3 beta idzie w kierunku full-stack frameworka bez zależności od React, podczas gdy React Router zostaje routerem i frameworkiem dla aplikacji Reactowych. Dwa projekty, jeden team, różne cele.

**Key takeaways:**
- React Router v8 wymaga Node 22.22+, React 19.2.7+, Vite 7+, jest ESM-only
- Przyjęty roczny cykl wydań major dla przewidywalności upgradów
- `react-router-dom` usunięty, wystarczy `react-router` i `react-router/dom`
- v6 i Remix v2 wchodzą w EOL bez dalszych aktualizacji bezpieczeństwa
- RSC support jest wciąż unstable, ale aktywnie rozwijany

**Why do I care:** Roczny cykl to dobra wiadomość dla każdego, kto ma React Router w produkcji i musi planować upgrady. "Nudne" upgrady to w rzeczywistości dowód dojrzałości projektu, nie brak ambicji.

**Link:** [React Router v8](https://remix.run/blog/react-router-v8)

---

## TypeScript 7.0 RC: przepisany w Go, 10x szybszy

**TLDR:** TypeScript 7.0 Release Candidate jest dostępny. Kompilator został przepisany z TypeScriptu (kompilującego się do JavaScript) na Go. Efekt: około 10x szybszy od TypeScript 6.0, z paralelizacją parsowania, type-checkingu i emitowania.

To nie jest rewrite from scratch. Codebase Go był metodycznie portowany z istniejącej implementacji TypeScript, z zachowaniem identycznej logiki type-checkingu. Autorzy podkreślają, że "parity architektoniczna zapewnia, że kompilator nadal wymusza te same semantyki". Używają identycznej nazwy pakietu npm `typescript`, więc `npm install -D typescript@rc` wystarczy.

Paralelizacja działa na wielu poziomach. Parsowanie i emitowanie plików jest naturalne do równoległości. Type-checking jest bardziej złożony: każdy worker ma własny widok świata i może duplikować część wspólnej pracy, ale przy tych samych plikach wejściowych zawsze dzieli je identycznie. Domyślnie 4 workery type-checkingu, konfigurowalne przez `--checkers`. Nowy `--builders` dla równoległych project reference builds w monorepo.

Kilka rzeczy wartych uwagi dla tych, którzy używają JavaScriptu z JSDoc: TypeScript 7.0 zmienia zachowanie dla plików `.js`, m.in. `@enum` nie jest już specjalnie traktowany, `@class` nie robi z funkcji konstruktora, wartości nie mogą być używane tam, gdzie oczekiwane są typy. Breaking changes dla tych, którzy traktowali typowanie JS jako "bonus".

Nowa opcja do użytku równoległego z TypeScript 6.0: pakiet `@typescript/typescript6` udostępnia binarny `tsc6`, żeby oba mogły współistnieć bez konfliktów nazw.

**Key takeaways:**
- TypeScript 7.0 RC przepisany w Go, ~10x szybszy od 6.0 w codziennych workflowach
- Paralelizacja parsowania, type-checkingu (4 workery domyślnie) i emitowania
- Identyczna logika type-checkingu z TypeScript 6.0, minimalne breaking changes dla TS
- Nowy `--watch` mode oparty na watcherze z Parcela, przeniesiony z C++ do Go
- Obsługa JavaScriptu z JSDoc zmieniona na bardziej spójną z TypeScript

**Why do I care:** Dziesięciokrotny wzrost wydajności kompilatora to jedna z tych zmian, które robią rzeczywistą różnicę w codziennej pracy. Projekty z kilkuset tysiącami linii TypeScriptu mogą stracić minuty z czasu buildu. Editor support przez LSP działa na każdym edytorze, nie tylko VS Code. Stabilna wersja ma pojawić się w ciągu miesiąca.

**Link:** [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/)

---

## Vite 8.1: bundled dev mode i chunk import maps

**TLDR:** Vite 8.1 wprowadza eksperymentalny "bundled dev mode", który serwuje zbundlowane pliki podczas developmentu, zachowując szybkie HMR. Linear notuje do 3x szybsze cold start, 40% szybsze full reload i 10x mniej żądań sieciowych.

Unbundled dev server był punktem sprzedaży Vite od pierwszego wydania: każdy moduł pobierany osobno, zero bundlowania. Przy dużych aplikacjach ten model zaczyna się sypać, bo przeglądarka musi obsłużyć dziesiątki tysięcy osobnych żądań. Bundled dev mode łączy Rolldowna (Vite 8 zastąpił nim Rollup i esbuild) z potrzebami developmentu.

Włączenie: `experimental.bundledDev: true` w konfiguracji lub `--experimental-bundle`. HMR pozostaje natychmiastowy niezależnie od rozmiaru aplikacji. Autorzy testowali na aplikacji z 10 tys. komponentami React: 15x szybszy startup, 10x szybszy full reload.

Drugie istotne novum: eksperymentalny chunk import map. Normalnie zmiana jednego modułu kaskaduje zmiany hashy przez całe drzewo importów, co niszczy cache przeglądarki. Import map rozdziela identyfikację pliku od jego hashu w importach, co eliminuje kaskadowy efekt na chunki które się nie zmieniły.

Inne nowości: wsparcie dla Wasm ESM integration proposal (import pliku `.wasm` bezpośrednio), `caseSensitive` dla `import.meta.glob`, `html.additionalAssetSources` dla odkrywania assetów w custom HTML elementach.

**Key takeaways:**
- Bundled dev mode (experimental): 15x szybszy startup dla dużych aplikacji, HMR bez zmian
- Chunk import maps (experimental): eliminacja kaskadowego invalidowania cache przeglądarki
- Wasm ESM integration: bezpośredni import plików `.wasm` z eksportowanymi funkcjami
- Lightning CSS coraz bliżej bycia domyślnym, dwa brakujące features dodane
- 41.6 mln tygodniowych pobrań Vite 8

**Why do I care:** Bundled dev mode to odpowiedź na realne problemy projektów enterprise, gdzie unbundled dev server zaczyna przypominać production build z powodu liczby żądań. Jeśli pracujesz na aplikacji z setkami modułów i notorycznym opóźnieniem przy każdym reload, warto to przetestować.

**Link:** [Vite 8.1 is out!](https://vite.dev/blog/announcing-vite8-1)

---

## Astro 7.0: Rust w kompilatorze, Sätteri dla Markdown, Advanced Routing

**TLDR:** Astro 7.0 przepisuje kompilator `.astro` w Rust (poprzednio Go), wprowadza Sätteri jako domyślny procesor Markdown i MDX, stabilizuje queued rendering oraz dodaje route caching z CDN providers dla Netlify, Vercel i Cloudflare.

Buildy przyspieszyły o 15-61% w benchmarkach. Astro docs (6313 stron): ze 114 sekund do 73. Strona astro.build (308 stron): z 62 do 24 sekund. Cloudflare docs (8431 stron): z 386 do 261. To nie jest marginalny zysk, to zmiana odczuwalna przy każdym deployu.

Sätteri to Rust-powered procesor Markdown autorstwa Eriki z Astro core team. Zastępuje pipeline oparty o unified/remark/rehype. Klucz: wiele popularnych pluginów (GFM, smart punctuation, footnotes, container directives, math, wikilinks) jest teraz wbudowanych. Pluginy Sätteri deklarują, które typy węzłów ich interesują i pomijają resztę, co jest znacznie wydajniejsze niż unified gdzie każdy plugin chodzi przez całe AST.

Advanced Routing to możliwość dodania pliku `src/fetch.ts` z pełną kontrolą nad request pipeline. API zgodne ze standardem Cloudflare Workers/Deno/Bun (`fetch(request)`) i z Hono, co umożliwia kompozycję middleware bez obecnych ograniczeń.

Dla agentów AI: nowy `astro dev --background` zarządza serwerem developerskim jako procesem tłowym z lockfilem zapobiegającym duplikatom, health endpointem `/_astro/status` i JSON logging dla toolingu.

**Key takeaways:**
- Kompilator `.astro` przepisany z Go na Rust, Markdown/MDX przez nową Rust pipeline
- Sätteri zastępuje unified jako domyślny procesor Markdown, GFM i więcej wbudowanych
- Route caching z CDN providers: Netlify, Vercel, Cloudflare (experimental)
- `src/fetch.ts` daje pełną kontrolę nad request pipeline, kompatybilny z Hono
- `astro dev --background` dla agent-driven development z idempotent CLI commands

**Why do I care:** Astro stało się poważnym graczem w SSG i SSR. Migracja z Go na Rust w kompilatorze to konsekwentna decyzja architektoniczna, którą widać coraz częściej w narzędziach JS. Route caching z CDN integration to funkcja, która w Next.js wymaga Vercel-specific wiedzy, a tu działa jako standardowe API niezależne od providera.

**Link:** [Astro 7.0](https://astro.build/blog/astro-7/)

---

## Nub: wszystko w jednym dla Node.js

**TLDR:** Nub to binarny Rust, który transpiluje TypeScript, uruchamia skrypty, zarządza binariami z `node_modules/.bin` i instaluje paczki, wszystko na standardowym Node.js. Nie jest alternatywnym runtimem jak Bun czy Deno, tylko nakładką na stock `node`.

Filozofia jest wyraźna i odróżnia Nub od konkurencji: "Bun i Deno próbują zastąpić Node.js. Nub go obejmuje". Jako runner TypeScriptu jest 2.9x szybszy od `tsx` przy podobnym startup. Jako script runner jest 30x szybszy od `pnpm run`. Jako bin runner (`nubx`) jest 17-20x szybszy od `npx`/`pnpm exec` przez bezpośredni exec bez bootstrapu Node.

Praktyczne detale: automatyczne ładowanie `.env` z precedence rules kompatybilnymi z Vite/Bun, zarządzanie wersjami Node z `.node-version`/`.nvmrc` bez shell hooks, polyfille dla `Temporal`, `Worker`, `URLPattern`, `WebSocket`, YAML/TOML imports bezpośrednio. Wszystko bez żadnych Nub-specific APIs, co oznacza, że kod działa bez Nuba po jego usunięciu.

Package manager Nub (aube engine od jdx) z lifecycle scripts deny-by-default: `postinstall` transitive dependency nie uruchomi się bez jawnej zgody. Nowe wydania mają domyślne opóźnienie 24 godzin (minimumReleaseAge) jako ochrona przed atakami "publish malicious patch, hijack installs for an hour".

**Key takeaways:**
- Nub transpiluje TypeScript na stock Node.js, nie jest alternatywnym runtimem
- 2.9x szybszy od `tsx`, 30x od `pnpm run`, 17-20x od `npx`
- Automatyczne .env loading, zarządzanie wersjami Node, polyfille dla nowych API
- Package manager z lifecycle scripts deny-by-default i 24h minimumReleaseAge
- Brak Nub-specific APIs: kod działa po usunięciu Nuba bez zmian

**Why do I care:** Podejście "embracing Node" zamiast "replacing Node" jest interesujące z pragmatycznego punktu widzenia. Bun i Deno mają swoje nisze, ale produkcyjna infrastruktura (AWS Lambda, Cloud Run, container-based deploys) domyślnie zakłada Node. Jeśli jesteś w tym świecie i męczysz się z czasem startu `npx` czy `pnpm run`, Nub rozwiązuje realne bolączki.

**Link:** [Introducing Nub: an all-in-one toolkit for Node.js](https://nubjs.com/blog/introducing-nub)

---

## Subito: -80% wolnych odpowiedzi po migracji do Next.js App Router

**TLDR:** Subito, włoski serwis ogłoszeń, przeniósł stronę szczegółów ogłoszenia z Pages Router do App Router. Odsetek odpowiedzi powyżej 250ms spadł z 25-40% do zera. Migrację prowadził głównie jeden developer.

Podejście: inkrementalna migracja bez zamrażania feature developmentu. Kluczowy insight: nowe Server Components były wrapperami wokół tych samych Client Components, których używał Pages Router. Zero duplikacji kodu, jedno fixes, oba routery skorzystały.

Dwa nieoczywiste problemy. Pierwszy: App Router nie miał wbudowanego API dla HTTP 410 Gone, które jest niezbędne dla wygasłych ogłoszeń (SEO-critical, nie wystarczy 404). Rozwiązanie: interceptor w warstwie Express, który przepisuje status code na 410 gdy strona sygnalizuje gone state. Drugi: streaming przez Nginx i Akamai CDN nie działał out of the box. Nginx: `proxy_buffering off`. Akamai wymagał custom metadata zachowań niemożliwych do konfiguracji przez standardowe Property Manager rules.

Rollout w dwóch fazach: najpierw App Router bez streamingu (monitoring stabilności), potem streaming jeden zakres URL na raz z 2-tygodniowym oknem obserwacji SEO między kategoriami. Zachowanie: cache MISS daje streaming HTML, cache HIT zwraca pełny HTML z Content-Length, co jest poprawnym zachowaniem.

**Key takeaways:**
- Migracja Pages Router do App Router inkrementalnie przez wrapper pattern bez duplikacji
- HTTP 410 Gone wymaga obejść w App Router, rozwiązane przez interceptor Express
- HTML streaming wymaga wyłączenia buforowania w Nginx i niestandardowej konfiguracji Akamai
- SEO monitoring między kategoriami przez 2 tygodnie przed włączeniem streamingu
- Jeden developer, praca inkrement entre feature deliveries, wsparcie przez Claude Code

**Why do I care:** To jeden z rzadkich, konkretnych case studies migracji Pages Router do App Router z realnymi danymi wydajnościowymi. Problemy z CDN buffering i HTTP 410 to rzeczy, które każdy spotkałby przy podobnej migracji, a tutaj są udokumentowane z rozwiązaniami.

**Link:** [How We Cut Slow Responses by 80% Migrating to Next.js App Router](https://dev.to/subito/how-we-cut-slow-responses-by-80-migrating-to-nextjs-app-router-37da)

---

## cnfast: zamiennik cn z 3.8x lepszą wydajnością

**TLDR:** `cnfast` to drop-in replacement dla kombinacji `clsx + tailwind-merge` z identycznym output i 3.8x lepszą wydajnością średnio, do 7x w komponentach renderowanych wielokrotnie. Migracja przez jedno polecenie.

Mechanizm przyspieszenia: cache przy call-site identity. Gdy te same argumenty klas pojawiają się przy tym samym wywołaniu (typowe przy re-renderach), cnfast trafia w cache i pomija join i obliczenia hash. Jako tagged template literal: `cn\`px-2 px-4 ${condition && 'bg-blue-500'}\`` daje 4.3x szybszy wynik przy stabilnym call site.

Liczby na konkretnych workloadach: cached re-render 4.3x, cold merge engine 3.8x, component corpus 4.1x, live data grid 4.4x. Bundle 9.43 KB gzip vs 8.45 KB dla baseline. Migracja: `npx cnfast migrate` dla dowolnego projektu, `npx shadcn@latest add aidenybai/cnfast/cn` dla shadcn/ui.

**Key takeaways:**
- Drop-in replacement z identycznym output, 3.8x szybszy średnio, do 7x przy re-renderach
- Cache call-site identity eliminuje powtarzające się obliczenia w hot paths
- Bundle o 1 KB większy od baseline
- Migracja jednym poleceniem dla shadcn/ui i ogólnych projektów

**Why do I care:** `cn` wywołuje się raz na każdy element w drzewie. Na server-rendered stronach z setkami elementów i na klienckich aplikacjach z wirtualizowanymi listami i live data grids ta operacja zaczyna być widoczna. 3.8x to wystarczające uzasadnienie dla zero-ryzykownej zamiany.

**Link:** [cnfast na GitHub](https://github.com/aidenybai/cnfast)
