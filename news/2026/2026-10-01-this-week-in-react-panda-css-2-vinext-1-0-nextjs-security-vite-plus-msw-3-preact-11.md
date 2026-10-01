---
title: "Panda CSS 2.0 przechodzi na Rust, Vinext dochodzi do 1.0, a Next.js łata pięć dziur bezpieczeństwa naraz"
excerpt: "Przegląd tygodnia w ekosystemie React: silnik Pandy przepisany w Rust jest do 360 razy szybszy w watch mode, Vinext pozwala uruchamiać Next.js na Vite wszędzie, a Claude Code pomógł Anthropicowi przyspieszyć claude.ai trzykrotnie w dwa tygodnie."
publishedAt: "2026-09-30"
slug: "this-week-in-react-panda-css-2-vinext-1-0-nextjs-security-vite-plus-msw-3-preact-11"
hashtags: "#thisweekinreact #react #css-in-js #vite #nextjs #performance #ai #testing #generated #pl"
source_pattern: "This Week In React"
---

## Panda CSS 2.0 przepisuje silnik w Rust i przyspiesza ekstrakcję nawet 37-krotnie

**TLDR:** Panda CSS 2.0 zastępuje kompilator oparty na ts-morph i interpreterze JavaScriptu nowym silnikiem w Rust na bazie Oxc, co daje 15-37-krotnie szybszą ekstrakcję stylów, a watch mode przyspiesza nawet 360-krotnie, przy czym sposób pisania stylów w Pandzie się nie zmienia.

**Streszczenie:** To jedna z tych rzadkich sytuacji, gdzie przepisanie silnika na niższym poziomie nie wymaga zmiany API na górze. Dalej używasz tej samej funkcji `css()`, tych samych recipes, patterns, tokenów i warunków, ale pod spodem cała ekstrakcja, enkodowanie i generowanie CSS przechodzi przez dedykowane crate'y Rust, każdy odpowiedzialny tylko za swój etap. Oxc parsuje każdy plik raz, a nie kilka razy przez różne narzędzia jak wcześniej, i od razu pomija pliki, które nie używają Pandy, co przyspiesza cold build zwłaszcza w `node_modules`. Rozwiązywanie wartości stałych (importy, operatory, ternary, referencje do tokenów) dzieje się teraz bezpośrednio w Rust zamiast przez interpreter JavaScriptu, włącznie z rozwiązywaniem wartości zaimportowanych z innych plików.

Liczby robią wrażenie: staticCss na konfiguracji generującej 29 000 reguł spadł z 25,7 sekundy do 0,3 sekundy, czyli około 85 razy szybciej. Watch mode re-parsuje plik w mniej niż 2 mikrosekundy zamiast około 650, a w projekcie Next.js krok parsowania spadł z 762ms do 31ms. Generowane typy TypeScript też są lżejsze: około 99% mniej instancjacji typów i 40-60% krótszy czas type-checkingu. Do tego dochodzi możliwość publikowania design systemu jako paczkę npm (`panda lib` do autorstwa, `designSystem` do konsumpcji) bez re-ekstrakcji stylów w projekcie, który go używa, nowa funkcja `viewTransition()` do View Transitions API, `firstThatWorks()` do wartości z fallbackiem w kolejności CSS, oraz oficjalny plugin ESLint działający na tym samym silniku ekstrakcji co build.

Panda 2.0 jest ESM-only i wymaga Node 22+, a migracja z v1 wymaga przejścia przez listę świadomych zmian w output CSS (m.in. zniknięcie uniwersalnego resetu zmiennych na rzecz `@property`).

**Kluczowe wnioski:**
- Nowy silnik w Rust na bazie Oxc daje 15-37x szybszą ekstrakcję i do 360x szybszy watch mode.
- Generowane typy TypeScript są lżejsze o ok. 99% instancjacji i 40-60% czasu type-checkingu.
- Design systemy można teraz publikować jako paczkę npm bez re-ekstrakcji stylów w konsumującym projekcie.
- Panda 2.0 jest ESM-only, wymaga Node 22+ i ma kilka świadomych zmian w output CSS wobec v1.

**Dlaczego mi na tym zależy:** Jeśli duży projekt na Pandzie cierpiał na wolne buildy albo ciężki type-checking, to konkretna, mierzalna poprawa, a nie marketingowa obietnica. Możliwość publikowania współdzielonego design systemu bez re-ekstrakcji w każdym konsumującym repo to też realne ułatwienie dla firm z wieloma frontendami na jednym systemie projektowym.

**Link:** [Panda CSS 2.0](https://panda-css.com/blog/panda-css-v2)

## Vinext 1.0: Next.js uruchomiony na Vite, z cache warmingiem zamiast długich buildów

**TLDR:** Cloudflare wypuszcza stabilną wersję 1.0 Vinexta, frameworka odtwarzającego zachowanie Next.js na silniku Vite, z ponad 99% zgodnością testów dla obu routerów (App i Pages) oraz nowym mechanizmem cache warming, który przenosi prerendering stron z maszyny budującej na sieć Cloudflare.

**Streszczenie:** Vinext wystartował w lutym jako tygodniowy eksperyment jednego inżyniera wspieranego przez AI, a dziś jest frameworkiem produkcyjnym używanym przez klientów Cloudflare do aplikacji o dużym ruchu. Największym wyzwaniem nie było odtworzenie nazw funkcji z Next.js (np. `revalidatePath`), tylko odtworzenie ich faktycznego zachowania: wpływu na wyrenderowane strony, wpisy cache i przyszłe żądania. Zespół zbudował tysiące testów pokrywających oba routery, serwer deweloperski i produkcyjny, oraz cele deploymentu Node.js i Cloudflare Workers, a do tego codziennie w nocy uruchamia pełny zestaw testów end-to-end Next.js przeciwko Vinextowi, żeby natychmiast wyłapywać regresje.

Najciekawszą częścią 1.0 jest cache warming. Zamiast renderować dziesiątki czy setki tysięcy stron podczas builda, co marnuje godziny na strony o niskim ruchu, Vinext wgrywa nową wersję Workera przy 0% ruchu produkcyjnego, a potem sam odpytuje strony o wysokim ruchu z tej wersji, zanim ją faktycznie przełączy na 100%. To odwraca kolejność: zamiast budować wszystko z góry na wszelki wypadek, prerendering dzieje się w tle, równolegle z normalnym działaniem systemu, a promocja do produkcji następuje dopiero, gdy cache jest już ciepły. Proces utrzymania frameworka też jest zautomatyzowany: codzienny agent przegląda nowe commity z Next.js canary i otwiera issue śledzące dla wszystkiego, co może wpłynąć na Vinexta, a gdy test wykryje lukę, agent potrafi zbudować reprodukcję i zaproponować fix.

**Kluczowe wnioski:**
- Zgodność testów Vinexta z Next.js przekracza 99% dla obu routerów, App i Pages (z wyjątkiem Cache Components).
- Cache warming przenosi prerendering stron z maszyny budującej na sieć Cloudflare, renderując wersję Workera przy 0% ruchu przed jej promocją.
- Migracja istniejącego projektu Next.js to dwie komendy: `npx vinext check` i `npx vinext init`.
- Codzienny agent śledzi zmiany w Next.js canary i sam proponuje poprawki zgodności.

**Dlaczego mi na tym zależy:** Dla zespołów, które utknęły z Next.js na platformach innych niż Vercel, Vinext to realna droga ucieczki bez przepisywania aplikacji. Mechanizm cache warming jest też ciekawym wzorcem architektonicznym samym w sobie, niezależnie od Next.js: rozdzielenie "zbuduj" od "rozgrzej cache" pozwala skalować strony z długim ogonem URL-i bez wydłużania pipeline'u CI.

**Link:** [Next.js applications, powered by Vite: introducing Vinext 1.0](https://blog.cloudflare.com/vinext-nextjs-on-vite/)

## Next.js łata pięć luk bezpieczeństwa, w tym SSRF i zatruwanie cache

**TLDR:** Wrześniowe wydanie bezpieczeństwa Next.js (v16.3.8 i v15.5.27) naprawia krytyczną lukę SSRF w optymalizacji obrazów oraz cztery luki średniej wagi związane z zatruwaniem cache SSG/ISR i wyciekiem treści z Draft Mode, plus jedną niskiej wagi w endpoincie MCP serwera deweloperskiego.

**Streszczenie:** Najpoważniejsza luka (CVE-2026-94483) pozwala na Server-Side Request Forgery przez zaufany, dopuszczony na allow-liście URL podczas Image Optimization, co w praktyce może oznaczać dostęp do prywatnych zakresów IP, jeśli `images.remotePatterns` jest skonfigurowane. Dwie kolejne luki dotyczą zatruwania cache na self-hostowanych instalacjach z SSG lub ISR: jedna pozwala podmienić wpis cache jednej strony treścią z innej trasy, druga robi to samo przez catch-all page na poziomie roota, obie przez pojedyncze, niezautoryzowane żądanie. Aplikacje na Vercelu nie są dotknięte żadną z nich.

Osobna luka w App Routerze (webpack, nie Turbopack) pozwala obejść `dynamicParams` w trasach metadanych typu `opengraph-image`, ujawniając obrazy dla segmentów dynamicznych świadomie wykluczonych z `generateStaticParams()`. Przy włączonych Cache Components dochodzą dwie subtelne luki: zagnieżdżone funkcje `use cache` mogą źle kluczować cache po parametrze roota, przez co treść jednego parametru wycieka do innego, a oczekujące wypełnienia `use cache` mogą pomieszać żądania Draft Mode ze zwykłymi, co w skrajnym przypadku utrwala niepublikowaną treść w wygenerowanej stronie serwowanej wszystkim. Na koniec endpoint MCP w `next dev` nie weryfikuje pochodzenia żądania, więc złośliwa strona odwiedzona przez developera może odczytać ścieżkę projektu na dysku, fragmenty kodu z raportów błędów i logi deweloperskie, ale dotyczy to wyłącznie `next dev`, nie produkcji.

**Kluczowe wnioski:**
- Krytyczna luka SSRF w Image Optimization dotyczy aplikacji z skonfigurowanym `images.remotePatterns`.
- Dwie luki zatruwania cache SSG/ISR dotyczą tylko self-hostowanych wdrożeń, nie Vercela.
- Luka w `dynamicParams` dla metadata image routes dotyczy tylko builda przez webpack, nie Turbopack.
- Endpoint MCP w `next dev` ujawniał ścieżki projektu i logi deweloperskie przez brak weryfikacji pochodzenia żądania.

**Dlaczego mi na tym zależy:** Jeśli self-hostujesz Next.js poza Vercelem, te łatki są priorytetowe, bo dwie z luk wprost omijają Vercela jako platformę i uderzają tylko w самodzielne wdrożenia. Warto też zwrócić uwagę na lukę MCP w `next dev`: to pierwszy sygnał, że endpointy budowane pod narzędzia AI-agentowe stają się nowym wektorem ataku, o którym trzeba myśleć już na etapie projektowania dev serwera.

**Link:** [September 2026 Security Release](https://nextjs.org/blog/september-2026-security-release)

## Preact 11 domyka sześć lat planowania breaking changes

**TLDR:** Preact 11 to pierwsza duża wersja od Preact X, zbierająca breaking changes odkładane przez ponad sześć lat, z Hydration 2.0, automatycznym przekazywaniem refów i porównaniami `Object.is` w argumentach hooków, przy czym większość paczek pierwszoplanowych wspiera już nową wersję.

**Streszczenie:** Ticket "The Road to Preact 11" wisiał w projekcie ponad sześć lat, bo zespół konsekwentnie starał się dociągać funkcje do Preact X bez łamania kompatybilności, nawet kosztem sporego nakładu pracy, żeby nie odbić się na wydajności i rozmiarze biblioteki. W końcu zespół zdecydował zebrać wszystkie odłożone zmiany naraz i wydać nową wersję major, zamiast dalej rozciągać życie X-ki. Dla większości projektów migracja ma być szybka, bo większość zmian dotyczy typów, które stały się bardziej restrykcyjne i są eksportowane z lepszej lokalizacji. Wszystkie pierwszoplanowe paczki (`@preact/signals`, `preact-render-to-string`, `preact-iso`, `prefresh`, `@preact/preset-vite`) wspierały Preact 11 już od miesięcy prereleasów, więc duża część zależności prawdopodobnie jest już kompatybilna.

**Kluczowe wnioski:**
- Preact 11 zbiera breaking changes odkładane od ponad sześciu lat w jednej dużej wersji.
- Nowości obejmują Hydration 2.0, automatyczne przekazywanie refów i porównania `Object.is` w argumentach hooków.
- Większość zmian migracyjnych dotyczy typów TypeScript, nie logiki runtime.
- Pierwszoplanowe paczki ekosystemu wspierają Preact 11 od miesięcy prereleasów.

**Dlaczego mi na tym zależy:** Dla zespołów na Preact X to sygnał, żeby zaplanować upgrade zanim ekosystem zacznie wymagać 11 jako minimum. Fakt, że większość zmian jest typowa, a nie runtime'owa, oznacza, że CI powinno wyłapać większość problemów jeszcze przed deploymentem.

**Link:** [Preact 11](https://preactjs.com/blog/preact-11/)

## Vite+ 1.0: jedna komenda zamiast całego własnoręcznie sklejanego toolchaina

**TLDR:** Vite+ 1.0 od zespołu stojącego za Vite, Vitest, Rolldown i Oxc to jeden spójny toolchain z dziewięcioma komendami (`vp create`, `vp dev`, `vp test`, `vp build` i inne) zastępującymi klaster osobnych narzędzi, zbliżający się do dwóch milionów pobrań tygodniowo.

**Streszczenie:** Problem, który Vite+ adresuje, jest znajomy każdemu, kto prowadził projekt dłużej niż rok: runtime, package manager, linter, formatter, test runner i bundler to osobne decyzje, osobne configi i osobne cykle wydawnicze, a to wszystko rozjeżdża się z czasem, nawet w ramach jednego zespołu. Linter przestaje się zgadzać z formatterem, CI uruchamia inne komendy niż lokalny dev, jedno repo zostaje dwie wersje major w tyle za drugim, a osoba, która to ustawiała, jest akurat na urlopie. Vite+ nie jest frameworkiem ani menedżerem pakietów, tylko warstwą spinającą istniejące narzędzia w jeden przetestowany stack z jednym plikiem konfiguracyjnym.

Komendy są narzędziowo niezależne od frameworka: `vp dev` korzysta z Vite 8 i Rolldown, `vp check` formatuje i lintuje przez Oxfmt i Oxlint (50-100x szybsze od ESLint, do 30x szybsze od Prettiera), `vp test` uruchamia Vitest, a `vp run` to świadomy monorepo task runner z cache'owaniem, które nagrywa, jakie pliki, argumenty i zmienne środowiskowe faktycznie użył dany task, żeby przy niezmienionym wejściu odtworzyć wynik natychmiast. Projekt jest już używany produkcyjnie przez ponad 2600 publicznych repozytoriów, w tym Tiptap, który zastąpił osobne konfiguracje Vite, Vitest, tsup i Oxc jednym Vite+.

**Kluczowe wnioski:**
- Dziewięć komend (`vp create`, `vp dev`, `vp check`, `vp test`, `vp build`, `vp pack`, `vp run`, `vp env`, `vp install`) zastępuje osobny zestaw narzędzi i configów.
- Oxlint jest 50-100x szybszy od ESLint, Oxfmt do 30x szybszy od Prettiera.
- `vp run` cache'uje taski na podstawie realnie użytych plików, argumentów i zmiennych środowiskowych.
- Ponad 2600 publicznych repozytoriów już zależy od `vite-plus`, w tym Tiptap i vinext.

**Dlaczego mi na tym zależy:** Dla zespołów utrzymujących wiele repozytoriów z podobnym stackiem frontendowym to szansa na realne zmniejszenie kosztu utrzymania tooling, zwłaszcza że upgrade staje się jednym bumpem wersji przetestowanym jako całość, zamiast osobnym ryzykiem przy każdej z pięciu czy sześciu zależności.

**Link:** [Announcing Vite+ 1.0](https://voidzero.dev/posts/announcing-vite-plus-1-0)

## MSW 3.0 rozwiązuje w końcu przechwytywanie sieci w Node.js

**TLDR:** MSW 3.0 jest ESM-only, dodaje granularne entrypointy importu, kompletne wsparcie subskrypcji GraphQL i nową architekturę przechwytywania sieci opartą na poziomie socketów TCP/TLS zamiast patchowania klientów HTTP, co otwiera drogę do przechwytywania innych protokołów, jak SMTP.

**Streszczenie:** Najciekawszy wątek to historia dochodzenia do rozwiązania problemu, który autor opisuje jako prawie dekadę badań i siedem podejść. Pierwsze wersje przechwytywania w Node.js patchowały `node:http` bezpośrednio, potem augmentowały `ClientRequest`, potem przeniosły przechwytywanie na poziom agentów i socketów HTTP. W wersji 3.0 architektura schodzi jeszcze niżej, do wraperów TCP i TLS, czyli bindingów JavaScriptu do sieciowego kodu Node.js napisanego w C. Niżej zejść się już nie da bez rekompilacji samego Node.js. Dzięki temu MSW przechwytuje dowolne połączenia socketowe niezależnie od protokołu, przepuszczając pakiety przez odpowiedni parser (np. `llhttp` dla HTTP), a interceptor włącza się dopiero, gdy parser potwierdzi oczekiwany typ wiadomości sieciowej.

Poza tym duże zmiany organizacyjne: paczka jest teraz ESM-only, ale z granularnymi entrypointami (`msw/http`, `msw/graphql`, `msw/sse`, `msw/ws`) zamiast jednego importu ciągnącego megabajty grafu zależności, co ma znaczenie zwłaszcza w środowiskach bez tree-shakingu, jak przeglądarka bez bundlera. Nowe `defineNetwork` API zastępuje docelowo dychotomię `setupServer`/`setupWorker`, oddzielając źródła ruchu sieciowego od handlerów, co pozwala np. odtwarzać sesję z pliku `.har` przeciwko twoim handlerom albo podpiąć własny zestaw interceptorów. Tarball biblioteki skurczył się o 43%, a definicje typów o 50%.

**Kluczowe wnioski:**
- Nowa architektura przechwytuje ruch na poziomie socketów TCP/TLS, co otwiera drogę do protokołów poza HTTP, jak SMTP.
- MSW jest teraz ESM-only, z granularnymi entrypointami zamiast jednego importu ciągnącego cały graf zależności.
- Subskrypcje GraphQL domykają pełne wsparcie mockowania GraphQL obok query i mutation.
- `defineNetwork` to nowe, eksperymentalne API docelowo zastępujące `setupServer`/`setupWorker`.

**Dlaczego mi na tym zależy:** Jeśli kiedykolwiek walczyłeś z mockowaniem sieci w testach Node.js, zwłaszcza czegoś poza zwykłym `fetch`, ta zmiana architektury realnie poszerza, co w ogóle da się przetestować bez prawdziwego serwera. Granularne entrypointy to też konkretna oszczędność w bundlu, jeśli używasz MSW w kodzie dostarczanym do przeglądarki, nie tylko w testach.

**Link:** [Introducing MSW 3.0](https://mswjs.io/blog/introducing-msw-3.0)

## Jak Anthropic przyspieszył claude.ai trzykrotnie w dwa tygodnie, pozwalając Claude samemu to zmierzyć

**TLDR:** Zespół Anthropic uruchomił jeden kanał Slacka z Claude w każdym wątku, znalazł sposób na mierzenie wydajności przez liczbę instrukcji procesora zamiast niestabilnego czasu zegarowego, i w dwa tygodnie scalił ponad trzy tysiące zmian bez ani jednego incydentu na produkcji, redukując czas do pierwszego, wpisywalnego ekranu z 3,1 sekundy do 0,55 sekundy.

**Streszczenie:** Punktem startowym była lista dwudziestu ręcznie wybranych projektów wydajnościowych, ale zespół trafił dwanaście z trzynastu celów już trzeciego dnia, więc zaczął szukać dalej, pytając Claude wprost, gdzie jeszcze jest potencjał, włącznie z "szalonymi pomysłami". Kluczowy przełom dotyczył pomiaru: wall-clock jest tym, co czuje użytkownik, ale jest zbyt szumiący, żeby stanowić bramkę w CI. Zespół zaczął liczyć instrukcje procesora pod Valgrindem dla ścieżek czysto JS-owych, licznik commitów React, wywołania funkcji z precyzyjnego pokrycia V8, przeliczenia layoutu i mutacje DOM dla ścieżek przeglądarkowych, ale każdą z tych metryk kazał sobie najpierw udowodnić: jeśli redukcja danej liczby nie przekładała się mierzalnie na czas zegarowy, benchmark był wyrzucany.

To zaowocowało konkretnymi znaleziskami: ścieżka składania drzewa wiadomości traciła jedną czwartą instrukcji na trzykrotne, megamorficzne wyszukiwanie tego samego ID w słowniku, co po naprawie dało 78% spadek czasu zegarowego. Innym razem podświetlanie skończonego bloku kodu zawieszało stronę na sekundę z powodu em-dasha: jeśli odpowiedź zawierała dowolny znak spoza Latin-1, V8 przechowywał cały string jako UTF-16, co spychało wszystkie regexy podświetlania składni na wolniejszą dwubajtową ścieżkę. Dwudziestolinijkowa poprawka kopiująca blok kodu do stringa jednobajtowego przed podświetleniem rozwiązała problem. W jednym wątku dotyczącym płynności streamowania długich odpowiedzi wylądowało blisko sześćdziesiąt pull requestów, docelowo trzymając 120 klatek na sekundę na monitorze 120Hz przez cały czas streamowania.

Cała operacja działała na zasadzie nazwanego właściciela dla każdego wątku, obowiązkowych testów jednostkowych przed optymalizacją, i feature flagów dla wszystkiego, co mogło być widoczne dla użytkownika. Flagi klasyfikowano jako kill switch albo ramp i usuwano, jak tylko było to bezpieczne: z blisko dwustu wprowadzonych w te dwa tygodnie, ponad połowa była już sprzątnięta do końca sprintu.

**Kluczowe wnioski:**
- Liczba instrukcji procesora pod Valgrindem okazała się bardziej wiarygodnym sygnałem CI niż niestabilny czas zegarowy, ale każdą metrykę trzeba było udowodnić, że koreluje z realnym czasem.
- Jedna poprawka (kopiowanie bloku kodu do stringa jednobajtowego przed podświetleniem składni) rozwiązała sekundowe zawieszenia strony spowodowane przez em-dashe wymuszające UTF-16 w V8.
- Ponad 3000 zmian scalono w dwa tygodnie bez ani jednego incydentu widocznego dla klienta, dzięki testom jednostkowym z góry i feature flagom dla wszystkiego widocznego.
- Czas do wpisywalnego ekranu na świeżym ładowaniu claude.ai spadł z 3,1s do 0,55s (p75).

**Dlaczego mi na tym zależy:** To rzadki przypadek, gdzie firma AI opisuje nie demo, tylko proces: jak zbudować pętlę pomiar-hipoteza-fix-walidacja na dużą skalę bez tracenia kontroli nad ryzykiem. Lekcja o konieczności dowodzenia korelacji między metryką proxy a realnym doświadczeniem użytkownika jest uniwersalna, niezależnie od tego, czy optymalizujesz z agentem, czy bez niego.

**Link:** [How we made claude.ai 3x faster in two weeks](https://claude.dev/blog/how-we-made-claude-ai-faster/)
