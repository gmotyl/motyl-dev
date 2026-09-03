---
title: "Jak Linear migrowało 1000+ PR-ów do StyleX, nowe browser() w React i Rust w pnpm 12"
excerpt: "This Week In React #295: Linear opisuje migrację ze styled-components do StyleX wspieraną przez agentów, React dostaje nowe API browser(), Next.js łata dwie krytyczne luki RCE, a pnpm, Zod, Remix i Rspack wypuszczają duże wersje."
publishedAt: "2026-09-02"
slug: "this-week-in-react-295-stylex-linear-browser-api-pnpm-12-zod-45"
hashtags: "#thisweekinreact #react #reactnative #generated #pl"
source_pattern: "This Week In React"
---

## Jak Linear zmigrowało ponad 1000 PR-ów ze styled-components do StyleX

**TLDR:** Linear opisuje wieloletnią migrację swojej aplikacji React ze styled-components do StyleX, łączącą deterministyczny codemod, agenty kodujące i ręczną walidację, kończącą się redukcją głównego wątku CPU o 20-35% na widokach intensywnych w UI.

**Summary:** Punktem wyjścia był ten sam problem, który zna każdy zespół siedzący na CSS-in-JS od lat: styled-components dawało pełną elastyczność, ale ta elastyczność stała się z czasem ciężarem. Wzorce takie jak `styled(Button)` normalizowały "otwieranie" komponentu z zewnątrz zamiast jawnego kontraktu stylowania, co po redanie Lineara zostawiło zespół z długim ogonem regresji UI. Drugim powodem migracji była wydajność: CSS-in-JS generuje i wstrzykuje reguły stylów podczas renderowania, a regresja wydajności po przejściu na React 18 z concurrent renderingiem, w połączeniu z wejściem styled-components w tryb utrzymaniowy, przelała czarę goryczy.

Wybór padł na StyleX od Mety, głównie dlatego że generuje style w czasie budowania zamiast w czasie renderowania, celowo utrudnia stylowanie na odległość, i daje deterministyczne łączenie stylów bez gier ze specyficznością. Alternatywa w postaci vanilla-extract dawała podobną statyczną ekstrakcję, ale rozdzielenie plików komponentu i stylów nie pasowało do sposobu pracy zespołu. Zespół zaczął od deterministycznego codemoda o nazwie styled-components-to-stylex-codemod, budowanego wokół dużego zestawu testów, a agenty kodujące otrzymywały wąski zakres pracy: runner codemoda, przykłady, skrypty walidacyjne i jasną checklistę. W praktyce agenty często utykały przy walidacji subtelnych różnic wizualnych, takich jak złożone stany hover czy warianty motywu, dopóki nie pojawiły się modele Fable i Sol w trakcie trwania projektu, co zauważalnie przyspieszyło tę część pracy.

Żeby zminimalizować ryzyko podczas współistnienia obu bibliotek, zespół zaczynał migrację od liścia drzewa komponentów, czyli komponentów niewrappujących innych styled-components, co ograniczało powierzchnię interakcji z kaskadą. Do napędzania adopcji dodano licznik pozostałych plików ze styled-components w pasku narzędziowym deweloperskim oraz bota oznaczającego nowe użycia styled-components w PR-ach. Wykres postępu pokazuje systematyczny wzrost udziału plików czysto StyleX-owych z 0% w marcu do 100% na początku sierpnia 2026.

Po migracji zespół zbudował rozbudowany zestaw reguł lintujących, częściowo w Oxlint, częściowo we własnym, świadomym typów sprawdzaczu repozytorium, obejmujących cztery grupy: sprzątanie po migracji, propagację API stylowania między plikami przez wspólny prop `sx`, precedencję kompozycji stylów oraz spójność designu i bezpieczeństwo runtime. Tam gdzie problem był fundamentalnie kwestią CSS, na przykład globalne selektory albo restylowanie DOM firm trzecich, zespół świadomie zostawił CSS Modules jako jawny fallback, zamiast na siłę eliminować wszystkie ucieczki z systemu.

**Key takeaways:**
- Migracja objęła ponad 1000 PR-ów i trwała od marca do sierpnia 2026, łącząc deterministyczny codemod, agenty kodujące o wąskim zakresie i ręczną walidację.
- Usunięcie wstrzykiwania stylów w czasie renderowania zredukowało pracę głównego wątku CPU o 20-35% na widokach intensywnych w UI, co przełożyło się na około 30% szybsze działanie na średniej klasy maszynie.
- Zespół nie eliminował ucieczek z systemu całkowicie, tylko świadomie zostawił CSS Modules jako fallback dla przypadków fundamentalnie wymagających globalnych selektorów.

**Why do I care:** To jeden z najbardziej konkretnych opisów migracji CSS-in-JS wspieranej przez agenty, jaki widziałem, i warto z niego wyciągnąć wniosek inny niż "użyj StyleX": kluczem do sukcesu było wąskie skopowanie zadań dla agentów i deterministyczny codemod jako fundament, a nie oddanie im całej migracji naraz. Zespoły planujące podobne przejście powinny najpierw zainwestować w testy regresyjne i jasne kontrakty stylowania, zanim w ogóle rozważą włączenie agentów do pomocy.

**Link:** [Styling Linear for the future with StyleX](https://linear.app/now/styling-linear-for-the-future-stylex)

## Nowe API browser() pozwala oznaczyć komponent jako dostępny tylko w przeglądarce

**TLDR:** React wprowadza `browser()`, wywoływane wewnątrz `use`, które podczas renderowania po stronie serwera zatrzymuje renderowanie komponentu i pokazuje fallback najbliższego `<Suspense>`, a w przeglądarce zwraca `undefined`, pozwalając komponentowi renderować się normalnie.

**Summary:** Do tej pory oznaczenie komponentu jako "tylko dla przeglądarki" wymagało sprawdzania `typeof window`, czekania na efekt ustawiający stan zamontowania albo używania opcji frameworka wyłączającej renderowanie po stronie serwera dla danego fragmentu. `browser()` rozwiązuje to natywnie: wywołane wewnątrz `use(browser(powod))` zatrzymuje renderowanie na serwerze i zostawia fallback najbliższego `<Suspense>` w jego miejscu, natomiast w przeglądarce zwraca `undefined`, więc komponent po prostu renderuje się dalej. Opcjonalny argument `reason`, string albo funkcja, trafia jako `cause` błędu przekazanego do callbacku `onBrowserBailout`, co pozwala raportować, gdzie i dlaczego doszło do przejścia w tryb przeglądarkowy.

Wywołanie `browser()` można umieścić warunkowo, na przykład w customowym hooku `useBrowserQuery`, który renderuje się na serwerze tylko wtedy, gdy dostarczono `initialData`, a w przeciwnym razie zawiesza renderowanie do czasu, aż dane będą dostępne w przeglądarce. To samo API służy też do przerywania oczekującego renderowania serwerowego: `abort(browser('Serwer renderował zbyt długo'))` pozwala zostawić fallbacki Suspense w stanie oczekującym i dokończyć ich renderowanie w przeglądarce, zamiast blokować całą odpowiedź na wolno ładujące się dane.

Ograniczenie jest jasne: `use(browser())` musi znajdować się wewnątrz granicy `<Suspense>` podczas renderowania serwerowego, inaczej cały render serwerowy zawiedzie, a w aplikacjach z React Server Components musi być wywoływane z Client Component, nie z Server Component.

**Key takeaways:**
- `browser()` używane z `use()` zastępuje ręczne sprawdzanie `typeof window` czy efekty ustawiające stan zamontowania dla treści dostępnych tylko w przeglądarce.
- Callback `onBrowserBailout` pozwala raportować z serwera, gdzie i dlaczego komponent przeszedł w tryb przeglądarkowy, niezależnie od zwykłych callbacków błędów.
- Tę samą wartość zwracaną przez `browser()` można przekazać jako powód przerwania renderowania serwerowego przez `abort()`.

**Why do I care:** To dokładnie ten rodzaj małego, ale często potrzebnego API, które eliminuje jeden z najbardziej irytujących hacków w kodzie SSR: warunkowe renderowanie oparte na dostępności `window`. Jeśli twój zespół walczy z błędami hydratacji przez treści zależne od localStorage czy innych API dostępnych wyłącznie w przeglądarce, warto już teraz zaplanować migrację tych miejsc na `browser()`, zamiast czekać, aż nazbiera się ich jeszcze więcej.

**Link:** [browser – React](https://react.dev/reference/react-dom/browser)

## Next.js łata dwie krytyczne luki, w tym RCE przez optymalizację obrazów AVIF

**TLDR:** Vercel przyspieszył zapowiedziane wcześniej wydanie bezpieczeństwa po znalezieniu dodatkowej krytycznej podatności, łatając w wersjach 16.3.3 i 15.5.24 dwie luki umożliwiające zdalne wykonanie kodu bez uwierzytelnienia.

**Summary:** Pierwsza luka dotyczy biblioteki libheif używanej przez sharp do optymalizacji obrazów: podatność pozwala na zdalne wykonanie kodu bez uwierzytelnienia, gdy Next.js optymalizuje kontrolowany przez atakującego obraz AVIF, a łatane wersje po prostu wyłączają optymalizację AVIF do czasu propagacji poprawki w bibliotece nadrzędnej. Druga luka jest równie poważna, ale węższa w zasięgu: aplikacje korzystające jednocześnie z Pages Router i App Router bez Cache Components mogą zostać zdalnie zaatakowane bez uwierzytelnienia, gdy serwer Next.js działa na systemie plików Windows. Linux i macOS nie są dotknięte tą podatnością, a dla aplikacji hostowanych na Windowsie nie ma obecnie znanego obejścia poza aktualizacją.

**Key takeaways:**
- Wersje 16.3.3 (Active LTS) i 15.5.24 (Maintenance LTS) łatają krytyczną lukę RCE w optymalizacji obrazów AVIF przez wyłączenie tej optymalizacji do czasu poprawki w libheif.
- Druga luka dotyczy wyłącznie serwerów Next.js działających na Windowsie, korzystających jednocześnie z Pages Router i App Router bez Cache Components, i nie ma dla niej obejścia poza aktualizacją.

**Why do I care:** Jeśli twoja aplikacja korzysta z wbudowanej optymalizacji obrazów Next.js i przyjmuje obrazy od użytkowników albo z zewnętrznych źródeł, aktualizacja do 16.3.3 lub 15.5.24 nie jest opcjonalna, tylko pilna, niezależnie od tego, czy hostujesz na Windowsie czy nie.

**Link:** [August 2026 Security Release](https://nextjs.org/blog/august-2026-security-release)

## pnpm 12: przepisany w Rust, z globalnymi binarkami świadomymi projektu

**TLDR:** pnpm 12 to przepisanie menedżera pakietów w Rust, zachowujące zgodność komend, flag i formatu lockfile z wersją 11, ale wprowadzające szybsze rozwiązywanie zależności cyklicznych, globalne binarki dopasowujące się do wersji przypiętej w projekcie oraz możliwość instalowania innych menedżerów pakietów wprost przez pnpm.

**Summary:** Zespół podkreśla, że aktualizacja nie ma być odczuwana jak migracja: komendy, flagi, ustawienia i format lockfile z wersji 11 działają dalej, a dokumentacja obejmuje obie wersje. Największą zmianą pod maską jest deterministyczne rozwiązywanie cykli w grafie zależności peer, które teraz zawsze przecina ten sam krawędź grafu niezależnie od kolejności instalacji, dzięki czemu ten sam projekt zawsze generuje bajt w bajt identyczny lockfile. W dużych workspace'ach z wieloma cyklami peer dependencies to przekłada się na 2-3 razy szybsze rozwiązywanie zależności i około 25% mniejsze zużycie pamięci.

Praktycznie najbardziej odczuwalną nowością są "project-aware global bins": globalnie zainstalowany node, deno czy bun uruchamia teraz wersję przypiętą w bieżącym projekcie, bez shell hooków ani komend w stylu `use`. Ustawienie `globalShims` decyduje, które pakiety globalne dostają takie zachowanie, domyślnie obejmując node, deno i bun. Kolejna nowość to możliwość instalowania przez pnpm innych menedżerów pakietów, npm, Yarn Classic, Yarn Berry, Yarn 6 czy Bun, każdego z zaufanego źródła, co oznacza, że zależność hostowana w git i wymagająca konkretnego menedżera zainstaluje się poprawnie nawet na maszynie mającej tylko pnpm.

Zmiana zachowania, na którą trzeba zwrócić uwagę, dotyczy identyfikacji zależności git: dla repozytoriów na GitHub, GitLab i Bitbucket specyfikator teraz mówi wyłącznie, które repozytorium chcesz, a lockfile nigdy nie zapisuje URL-a SSH dla tych hostów, niezależnie od tego, jak zależność została podana. Kto potrzebuje SSH do prywatnych repozytoriów, musi przekierować URL na poziomie konfiguracji gita, a nie pnpm.

**Key takeaways:**
- pnpm 12 zachowuje pełną kompatybilność komend i formatu lockfile z wersją 11, mimo przepisania rdzenia w Rust.
- Rozwiązywanie zależności cyklicznych jest teraz deterministyczne, co daje identyczne lockfile niezależnie od kolejności instalacji oraz 2-3x szybsze rozwiązywanie w dużych workspace'ach.
- Globalnie zainstalowany node, deno czy bun automatycznie uruchamia wersję przypiętą w bieżącym projekcie, bez dodatkowych shell hooków.

**Why do I care:** Zespoły zarządzające dużymi monorepo z wieloma workspace'ami i skomplikowanym grafem peer dependencies odczują różnicę w czasie instalacji od razu, a deterministyczny lockfile kończy z frustrującym zjawiskiem, w którym `pnpm install` uruchomiony dwa razy z rzędu generował różny diff bez żadnej zmiany w kodzie.

**Link:** [pnpm 12.0](https://pnpm.io/blog/releases/12.0)

## Zod 4.5: kompilacja schematów na start i 9x mniejszy ślad pamięciowy

**TLDR:** Zod 4.5 wprowadza `z.compile()`, przyspieszające parsowanie 3-9 razy przez wcześniejsze skompilowanie schematu, oraz redukuje retencję pamięci pojedynczego schematu z 7,5 KB do 784 bajtów dzięki zmianie sposobu przechowywania metod na instancji.

**Summary:** Flagowa funkcja tej wersji, `z.compile(schema)`, pozwala wstępnie skompilować dowolny schemat Zod, a skompilowany schemat używa się dokładnie tak samo jak zwykły, bez żadnych specjalnych zasad, po prostu działa szybciej. Na obiektach, tablicach i unionach przyspiesza to parsowanie o czynnik 3-9x, a bardziej złożone schematy zyskują więcej niż proste. Import `zod/compile` raz na wejściu aplikacji automatycznie kompiluje każdy schemat skonstruowany po tym imporcie przy pierwszym użyciu do parsowania danych, działając też jako flaga CLI Node.js, gwarantująca uruchomienie przed zdefiniowaniem jakiegokolwiek schematu.

Redukcja pamięci jest równie imponująca: w Zod 4.4 pusty `z.string()` zajmował 7,5 KB retencji na stercie, a w 4.5 to zaledwie 784 bajty, dzięki nowemu wzorcowi memoizacji metod, który przestaje alokować powiązane metody, dopóki nie zostaną faktycznie użyte, zamiast robić to automatycznie dla każdej instancji jak wcześniej. Nowa funkcja `z.validate()` daje szybką ścieżkę sprawdzania samej poprawności danych bez budowania pełnego `ZodError`, co na nieprawidłowych danych jest do 16 razy szybsze niż `.safeParse().success`, bo pomija kosztowne przechwytywanie stack trace błędu.

Kilka zmian łamiących kompatybilność wstecz wymaga uwagi: `z.iso.datetime()` teraz wymaga sekund zgodnie z RFC 3339, długość stringa liczy punkty kodowe Unicode zamiast jednostek UTF-16 (co dotyczy stringów z emoji), a klucz `__proto__` jest teraz zawsze usuwany z parsowanych obiektów i rekordów niezależnie od źródła, co zamyka potencjalną furtkę do zanieczyszczenia prototypu.

**Key takeaways:**
- `z.compile()` przyspiesza parsowanie o 3-9x na złożonych schematach, a `import "zod/compile"` na wejściu aplikacji kompiluje automatycznie wszystkie kolejne schematy.
- Retencja pamięci pojedynczego schematu spadła z 7,5 KB do 784 bajtów dzięki nowemu wzorcowi memoizacji metod.
- Kilka zmian łamiących kompatybilność dotyczy bezpieczeństwa: klucz `__proto__` jest zawsze usuwany z parsowanych danych, a `z.iso.datetime()` wymaga teraz sekund zgodnie z RFC 3339.

**Why do I care:** Jeśli Zod jest już fundamentem walidacji w twojej aplikacji, ta aktualizacja to rzadki przypadek, gdzie można dostać realny zysk wydajnościowy praktycznie za darmo, jednym importem, bez zmiany ani jednej linijki logiki walidacji. Warto tylko przejrzeć changelog pod kątem zmian łamiących kompatybilność dotyczących długości stringów i formatu ISO, zanim zaktualizujesz produkcyjny kod.

**Link:** [Zod 4.5](https://zod.dev/blog/zod-4-5)

## Remix 3 wchodzi w fazę release candidate

**TLDR:** Remix opublikował pierwszy release candidate Remix 3, pełnoprawnego frameworka full-stack w jednym pakiecie, obejmującego zarządzanie bazą danych, walidację schematów, router i nowy runtime UI, z planowanym stabilnym wydaniem 2 października na konferencji Remix Jam.

**Summary:** Zespół Remixa opisuje ostatnie miesiące jako fazę, w której framework "nagle przyspieszył wzrost" po długim okresie budowania fundamentów od pierwszej bety. Od tamtego czasu doszedł kompletny workflow bazodanowy z migracjami, seedowaniem, sprawdzaniem statusu i rollbackami wbudowanymi w CLI, pełnostackowy HMR odświeżający moduły serwerowe i aktualizujący kompatybilne komponenty UI w miejscu, oraz bezpieczniejsze i szybsze dopasowywanie tras z kompozycyjnym routingiem przez `router.mount()`. Doszło też wsparcie dla SPA, przenoszące ten sam router, middleware i model Request-to-Response do aplikacji renderowanych po stronie klienta.

Kluczowy argument zespołu za Remixem 3 nie dotyczy jednak konkretnej funkcji, tylko filozofii budowania dla agentów. Autorzy przyznają wprost, że sami intensywnie korzystają z agentów kodujących i zauważają, że radzą sobie one z Remixem lepiej właśnie dlatego, że framework jest zbudowany na prymitywach webowych, jest bezpieczny typowo, a stan UI to po prostu zwykły zasięg JavaScriptu. Cały framework mieści się w jednym pakiecie `remix`, co zespół argumentuje jako mniejszą powierzchnię ataku na łańcuch dostaw npm i mniej churnu wynikającego ze składania różnych bibliotek razem, jednocześnie zachowując możliwość podmiany poszczególnych elementów, na przykład Zoda zamiast wbudowanej walidacji schematów.

Release candidate oznacza koniec dodawania nowych funkcji przed oficjalnym wydaniem, a kolejne tygodnie mają być poświęcone na sprzątanie znanych błędów, audyty bezpieczeństwa i zbieranie feedbacku od wczesnych adopterów przed premierą na Remix Jam 2 października.

**Key takeaways:**
- Remix 3 RC obejmuje pełny workflow bazodanowy, pełnostackowy HMR i wsparcie dla SPA w tym samym modelu routingu co aplikacje serwerowe.
- Cały framework mieści się w jednym pakiecie `remix`, co zespół przedstawia jako mniejszą powierzchnię ataku na supply chain i mniej fragmentacji.
- Stabilne wydanie zaplanowano na 2 października podczas konferencji Remix Jam.

**Why do I care:** Warto śledzić Remixa 3 nie tyle jako alternatywę dla React Routera, ile jako eksperyment nad tym, jak framework webowy powinien wyglądać w świecie, w którym duża część kodu jest pisana i czytana przez agenty, a nie tylko przez ludzi. Jeśli rozważasz nowy projekt full-stack pod koniec roku, warto poczekać na stabilne wydanie w październiku, zamiast budować teraz na release candidate.

**Link:** [Remix 3 Release Candidate](https://remix.run/blog/remix-3-release-candidate)

## Rspack 2.2: szybszy HMR, krótsze ID modułów i Rslint z ponad 500 regułami

**TLDR:** Rspack 2.2 przynosi ponad 30 optymalizacji wydajnościowych, w tym trzykrotnie szybsze parsowanie CSS i HMR, który przestaje niepotrzebnie odpytywać arkusze stylów przy zmianach czysto JavaScriptowych, a cały ekosystem Rstack (Rsbuild, Rstest, Rslint) dostaje równoległe aktualizacje.

**Summary:** Zespół Rspacka podaje konkretne liczby: ponad 30 optymalizacji wydajnościowych skróciło czas builda produkcyjnego w ich benchmarku z 1822 do 1725 milisekund, a wbudowane parsowanie CSS jest teraz około 3 razy szybsze zarówno w trybie deweloperskim, jak i produkcyjnym. Największa zmiana w codziennym użyciu dotyczy jednak HMR: wcześniej nawet czysto JavaScriptowa zmiana zmuszała przeglądarkę do żądania i porównywania powiązanych plików CSS w poszukiwaniu aktualizacji stylów, a ten narzut rósł wraz z rozmiarem arkusza stylów. Teraz Rspack sprawdza zmiany CSS już podczas builda, więc przeglądarka żąda zasobów CSS tylko wtedy, gdy faktycznie są potrzebne, co przy arkuszu 4,1 MB skraca czas gorącej aktualizacji JavaScriptu z około 385 ms do 6 ms.

Nowa strategia `compact-hashed` dla ID modułów i chunków wybiera najkrótszy dostępny prefiks ze stabilnego hasza, redukując rozmiar wyjściowy przy zachowaniu stabilnych identyfikatorów. Rsbuild 2.2, wydany równolegle, domyślnie włącza dzielenie chunków dla buildów Node.js, co w realnym projekcie z 300 trasami i 400 współdzielonymi komponentami zredukowało rozmiar wyjścia serwera z 298 MB do 4,1 MB i zużycie pamięci po odwiedzeniu wszystkich tras z 486 MB do 129 MB. Rsbuild dostaje też wsparcie dla Solid v2 z nowym kompilatorem w Rust, ponad 20 razy szybszym od poprzedniej implementacji w Babel.

Rslint, część ekosystemu odpowiedzialna za lintowanie, przekroczyła 500 wbudowanych reguł i implementuje teraz wszystkie reguły i presety z `@typescript-eslint`, łącznie z pełnym presetem `recommendedTypeChecked`. Dostaje też nowe JavaScript API zgodne z ESLint v10, umożliwiające lintowanie kodu w pamięci, co jest przydatne dla integracji edytorów i playgroundów działających bez bezpośredniego dostępu do systemu plików.

**Key takeaways:**
- HMR w Rspack 2.2 sprawdza zmiany CSS już podczas builda, co przy dużych arkuszach stylów skraca czas gorącej aktualizacji JavaScriptu z setek milisekund do pojedynczych milisekund.
- Rsbuild 2.2 domyślnie dzieli chunki dla buildów Node.js, redukując rozmiar wyjścia serwera i zużycie pamięci nawet o 98% i 73% w realnym projekcie testowym.
- Rslint przekroczył 500 reguł i implementuje pełny zestaw reguł `@typescript-eslint`, wraz z nowym JavaScript API zgodnym z ESLint v10.

**Why do I care:** Dla zespołów pracujących na dużych monorepo z Rspackiem czy Rsbuildem, poprawki HMR są tego rodzaju zmianą, która realnie skraca pętlę zwrotną programisty każdego dnia, a nie tylko poprawia liczby w benchmarku. Warto też zwrócić uwagę na upgrade SWC do wersji 77, który łamie kompatybilność ze starszymi wtyczkami Wasm, więc przed aktualizacją sprawdź, czy używane przez ciebie wtyczki SWC mają już wersję zgodną z Rspackiem 2.2.

**Link:** [Announcing Rspack 2.2](https://rspack.rs/blog/announcing-2-2)

## Margelo dołącza do Callstacka, wzmacniając inżynierię wydajnościową w React Native

**TLDR:** Margelo, twórca Nitro Modules, VisionCamera i react-native-mmkv, dołącza do Callstacka w transakcji wycenionej na ponad 20 milionów euro, łącząc podejście performance-first Margelo z wieloletnim doświadczeniem Callstacka we wdrażaniu React Native na skalę enterprise.

**Summary:** Założyciel Margelo argumentuje, że w miarę jak AI przyspiesza samą implementację, architektura, wydajność, integracja natywna, walidacja i bezpieczeństwo wydań liczą się bardziej niż kiedykolwiek, bo to właśnie te obszary decydują, czy oprogramowanie faktycznie działa w produkcji, a nie tylko czy szybko powstało. Połączenie ma dać klientom dostęp zarówno do technologii Margelo, jak i do dekady doświadczenia Callstacka w skalowaniu React Native w dużych organizacjach, a wszystkie dotychczasowe biblioteki open source Margelo pozostają otwarte, z tym samym twórcą kontynuującym ich rozwój.

**Key takeaways:**
- Margelo, twórca Nitro Modules i VisionCamera, dołącza do Callstacka w transakcji wycenionej na ponad 20 milionów euro.
- Biblioteki open source Margelo pozostają otwarte i rozwijane przez tego samego twórcę po połączeniu.

**Why do I care:** To konsolidacja w ekosystemie React Native, którą warto śledzić, jeśli twój zespół polega na Nitro Modules albo VisionCamera, bo połączenie dwóch mocnych firm konsultingowych zwykle oznacza lepsze wsparcie długoterminowe dla kluczowych bibliotek, ale też warto obserwować, czy nie doprowadzi to do konsolidacji cenowej usług konsultingowych w tej niszy.

**Link:** [Margelo Joins Callstack to Advance High-Performance React Native Engineering](https://margelo.com/blog/margelo-joins-callstack)
