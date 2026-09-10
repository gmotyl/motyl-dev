---
title: "This Week In React #296: React 19.3, kompilator na Ruście, agenci sprzątający backlog Next.js, cn i Vitest 5.0"
excerpt: "React 19.3 stabilizuje View Transitions, natywny kompilator na Ruście przyspiesza budowanie 17-krotnie, zespół Next.js zamyka 1500 zgłoszeń dzięki agentom AI, nowy silnik cn zastępuje tailwind-merge i clsx, a Vitest 5.0 skupia się na wydajności."
publishedAt: "2026-09-10"
slug: "this-week-in-react-296-react-193-rust-compiler-nextjs-agents-cn-vitest-5"
hashtags: "#thisweekinreact #react #rust #nextjs #ai #agents #tailwind #vitest #testing #generated #pl"
source_pattern: "This Week In React"
---

## React 19.3: stabilne View Transitions i Fragment Refs

**TLDR:** React 19.3 wychodzi na npm ze stabilnym komponentem `ViewTransition` oraz Fragment Refs, dwoma API eksperymentalnymi od zeszłego roku. Dokłada też `browser()` do wypisywania komponentów z SSR i pełne wsparcie dla Trusted Types.

**Summary:** `ViewTransition` animuje elementy wchodzące, wychodzące, przesuwające się i zmieniające rozmiar przez natywne View Transition API przeglądarki, z integracją Suspense pozwalającą skoordynować ładowanie obrazów, czcionek i fallbacków zamiast pozwalać im migotać niezależnie. Fragment Refs rozwiązują odwrotny problem: komponenty renderujące grupę rodzeństwa bez wspólnego rodzica albo niewystawiające propsa `ref` wcześniej wymagały opakowującego diva tylko po to, żeby coś zaobserwować albo sfokusować. Teraz wystarczy przekazać ref bezpośrednio do `Fragment`.

Do tego dochodzi `use(browser())`, pozwalające jawnie wypisać komponent z renderowania serwerowego, gdy zależy od API dostępnych tylko w przeglądarce, oraz zaprzestanie wymuszania konwersji wartości do stringów przed przekazaniem ich do API DOM, co włącza pełne wsparcie dla Trusted Types i ochronę przed atakami XSS opartymi na DOM.

**Key takeaways:**
- `ViewTransition` i Fragment Refs przechodzą ze statusu eksperymentalnego do stabilnego.
- `use(browser())` pozwala jawnie wypisać komponent z SSR, gdy zależy od API przeglądarki.
- React przestał wymuszać konwersję do stringów przed API DOM, co włącza pełne wsparcie dla Trusted Types.

**Why do I care:** Zespoły, które eksperymentowały z View Transitions w wersjach eksperymentalnych, mogą teraz bezpiecznie przenieść ten kod na stabilne API bez obawy o breaking changes w kolejnych minorach.

**Link:** [React 19.3](https://react.dev/blog/2026/09/09/react-19-3)

## React Now Rusted All The Way Out: 17-krotne przyspieszenie kompilatora

**TLDR:** Po wydaniu oficjalnego wsparcia dla React Compiler na Ruście przez zespół oxc, autor przełączył 1036-plikowy kodebase React Router na nowy kompilator i zaobserwował 17,6-krotne przyspieszenie samej fazy kompilacji, z 14,3 sekundy do 0,81 sekundy.

**Summary:** Przejście na natywny kompilator oznacza w praktyce uproszczenie konfiguracji Vite: zamiast Babela z presetem React Compiler wystarczy przekazać `{ compiler: true }` do wtyczki `@vitejs/plugin-react` na Vite 8+, albo skorzystać z `@acusti/vite-plugin-react-compiler` dla projektów na React Router w trybie framework. Poza samą prędkością, nowa wersja kompilatora naprawia realne ograniczenia obecne jeszcze w wersji 1.0 opartej na Babelu: obsługę dowolnej logiki warunkowej w blokach try/catch oraz przypisywanie zdestrukturyzowanego propsa komponentu, który potem trafia do zagnieżdżonego domknięcia, co wcześniej powodowało pominięcie komponentu przez kompilator bez żadnego ostrzeżenia.

Autor podkreśla też korzyść mniej oczywistą niż sama prędkość: spójność całego toolchaina. Wcześniej korzystał z Oxlint ze wsparciem dla React Compiler przy jednoczesnym pozostawaniu na starszej wersji samego kompilatora do builda, co doprowadziło do fałszywego zgłoszenia buga, bo linter i kompilator działały na różnych wersjach `oxc-transform-react` z różnym zakresem wspieranych wzorców. Po ujednoliceniu wersji linter i build używają dokładnie tego samego kompilatora, więc żaden nieskompilowany komponent nie prześlizguje się niezauważony do produkcji.

**Key takeaways:**
- Natywny kompilator na Ruście dał 17,6-krotne przyspieszenie samej fazy kompilacji w 1036-plikowym kodebase (2,4× szybszy cały build).
- Nowa wersja obsługuje dowolną logikę warunkową w try/catch oraz przypisywanie zdestrukturyzowanych propsów w zagnieżdżonych domknięciach, czego brakowało w wersji opartej na Babelu.
- Rzucanie wewnątrz try oraz operatory przypisania logicznego (`??=`, `&&=`, `||=`) wciąż powodują pominięcie komponentu przez kompilator.

**Why do I care:** Jeśli wasz zespół już korzysta z React Compiler przez Babel, migracja do natywnej wersji na Vite 8+ to głównie usunięcie zależności i jedna linijka konfiguracji, a nie przepisywanie czegokolwiek. Warto też sprawdzić, czy wasz linter i build używają tej samej wersji `oxc-transform-react`, bo rozjazd wersji, jak pokazuje ten przypadek, generuje mylące fałszywe alarmy.

**Link:** [React Now Rusted All The Way Out](https://blog.master.dev/react-now-rusted-all-the-way-out/)

## Jak Next.js zamknął 1500 zgłoszeń w miesiąc dzięki agentom AI

**TLDR:** Zespół Next.js zbudował agenta o nazwie closability, który bada zgłoszenia na GitHubie i ocenia, czy można je bezpiecznie zamknąć. W trzy tygodnie pomógł zamknąć 1462 zgłoszenia i sprowadzić backlog poniżej 1000, mimo że w tym samym czasie wpłynęło 218 nowych.

**Summary:** Backlog osiągnął szczyt 3109 otwartych zgłoszeń w styczniu 2025 roku, a agenci kodujący ułatwili zgłaszanie szczegółowych raportów, co tylko zwiększyło wolumen do przejrzenia. Wcześniejsze podejście oparte na automatycznym zamykaniu nieaktywnych zgłoszeń sprowadziło backlog do 2244 do sierpnia 2026, ale sama nieaktywność okazała się słabym wskaźnikiem relewancji, bo stare zgłoszenie mogło być już naprawione, duplikatem, oczekiwanym zachowaniem albo wciąż realnym bugiem, którego po prostu nikt nie wrócił, żeby sprawdzić. Zespół zbudował więc closability na bazie eve, otwartoźródłowego frameworka agentowego Vercela, który uruchamia badanie w świeżym sandboxie z repozytorium Next.js, Node.js, Playwright i Chromium: czyta rozmowę na GitHubie, sprawdza wspierane wersje, szuka powiązanych zgłoszeń i pull requestów, a w razie potrzeby próbuje odtworzyć błąd na zgłoszonej wersji, najnowszym stabilnym release i canary.

Agent działa wyłącznie do odczytu poza własnym sandboxem, może badać, ale nie może komentować, zamykać zgłoszeń, pushować kodu ani niczego wdrażać, a wyniki trafiają do kolejki, którą przegląda człowiek. Uruchomiony na GPT-5.6 Luna z maksymalnym poziomem wysiłku rozumowania na 200 równoległych sesjach eve, w trzy tygodnie zamknął 1462 zgłoszenia, z czego 37% jako już naprawione, 19% jako duplikaty, a 16% jako oczekiwane zachowanie. Dodane okno 14 dni na ponowne otwarcie zgłoszenia przez oryginalnego autora pokazało, że tylko 3 z 1462 zamkniętych zgłoszeń wróciły, co sugeruje, że zdecydowana większość decyzji była trafna. Zespół zaczyna teraz pozwalać agentom zamykać najbardziej oczywiste przypadki bez czekania na człowieka, ale wyłącznie gdy dwa niezależne agenty, jeden oceniający, drugi szukający kontrargumentów, zgadzają się co do decyzji.

**Key takeaways:**
- Agent closability zbadał cały backlog na GPT-5.6 Luna z maksymalnym wysiłkiem rozumowania, uruchamiając do 200 równoległych sesji jednocześnie.
- Z 1462 zamkniętych zgłoszeń tylko 3 zostały ponownie otwarte w 14-dniowym oknie odwoławczym, co sugeruje wysoką trafność decyzji.
- Agent działa wyłącznie do odczytu poza własnym sandboxem; zamykanie zgłoszeń i każda zmiana kodu wciąż wymaga akcji człowieka lub osobnej automatyzacji z podwójną weryfikacją.

**Why do I care:** Jeśli wasz projekt open source albo wewnętrzny tracker zgłoszeń ma podobny problem z rosnącym backlogiem, ten case study daje konkretny wzorzec do skopiowania: agent do badania plus okno na odwołanie, zamiast ślepego zaufania modelowi albo ślepego polegania na samej nieaktywności jako sygnale. Warto zwrócić uwagę na decyzję, żeby agent miał dostęp wyłącznie do odczytu poza sandboxem, bo to prosty, ale skuteczny sposób na ograniczenie ryzyka przy pierwszym wdrożeniu autonomicznych agentów do procesu, który wcześniej wymagał wyłącznie ludzkiej decyzji.

**Link:** [How we closed 1,500 GitHub issues in one month](https://nextjs.org/blog/how-we-closed-1500-github-issues)

## cn: nowy silnik do łączenia klas Tailwind, do 172 razy szybszy

**TLDR:** Zespół shadcn/ui wydał `cn`, drop-in zamiennik dla `tailwind-merge` i `clsx` z identycznym API, ale własnym silnikiem łączenia i rozwiązywania konfliktów klas, który w benchmarkach na 58 prawdziwych repozytoriach wypada średnio 37 razy szybciej.

**Summary:** Biblioteka jest bezzależnościowa i niezależna od frameworka, działa z Reactem, Vue, Svelte, Solid, Astro albo zwykłymi szablonami serwerowymi, w przeglądarce, Node, Bun, Denie i na edge'u, a migracja z istniejącego projektu shadcn/ui sprowadza się do jednej komendy `npx shadcn@latest migrate cn`. Zespół twierdzi zgodność wyjścia z `tailwind-merge` dla każdego wejścia, zweryfikowaną 356 tysiącami testów różnicowych, więc przejście nie powinno zmienić żadnego renderowanego wyniku, tylko czas jego wygenerowania.

Benchmarki są konkretne: wywołanie typowe dla większości komponentów spada z 320 nanosekund do 10 nanosekund, czyli 30 razy szybciej, a scenariusz z tysiącami powtarzających się stringów z realnego repozytorium przyspiesza aż 172-krotnie, bo `cn` uczy się powtarzających się sekwencji wywołań i weryfikuje je przez tożsamość zamiast liczyć od nowa. Geometryczna średnia z 58 open source'owych repozytoriów, 144 265 wywołań `cn()` przepuszczonych przez każdą bibliotekę, daje 37-krotne przyspieszenie, a sama biblioteka waży tylko 26 KB po minifikacji.

**Key takeaways:**
- `cn` jest drop-in zamiennikiem dla `tailwind-merge` i `clsx` z identycznym API i zgodnością wyjścia zweryfikowaną 356 tysiącami testów różnicowych.
- W benchmarku na 58 realnych repozytoriach biblioteka wypada średnio 37 razy szybciej, w skrajnym przypadku do 172 razy.
- Migracja z istniejącego projektu shadcn/ui sprowadza się do jednej komendy CLI.

**Why do I care:** Jeśli wasz projekt intensywnie korzysta z `cn()` w każdym komponencie, co w praktyce dotyczy niemal każdej aplikacji na shadcn/ui, migracja kosztuje jedną komendę i realnie skraca czas pierwszego renderu przy dużej liczbie komponentów. Warto potraktować to jako łatwą wygraną wydajnościową bez żadnego ryzyka zmiany zachowania, skoro autorzy tak mocno postawili na zgodność z dotychczasowym wyjściem.

**Link:** [cn: a new engine for Tailwind class merging](https://github.com/shadcn-ui/cn)

## effective-rsc: React Server Components spotykają Effect

**TLDR:** Nikhil Nayak wydał effective-rsc 0.1.0, eksperymentalny framework łączący React Server Components jako model aplikacji z Effect jako runtime, Rspack do natywnej integracji RSC, Bun jako serwer i przeglądarkowe Navigation API do nawigacji klienckiej.

**Summary:** Idea projektu polega na zastąpieniu `await` wewnątrz komponentu serwerowego przez `yield*` z Effect. Strony to Effecty z parametrami trasy dekodowanymi przez Schema, wymagania serwisowe pozostają widoczne w typie, a jeden `Layer` na poziomie aplikacji dostarcza wszystkie implementacje. Jeśli żądanie zostanie przerwane, powiązana z nim praca Effect jest automatycznie przerywana, a zasoby sprzątane, co eliminuje całą klasę wycieków związanych z niedokończonymi requestami w typowym modelu async/await. Server Functions działają jako Effecty z walidacją wejścia przez Schema, zachowując natywny protokół `"use server"` z Reacta.

Najbardziej opiniotwórczą częścią projektu jest router kliencki zbudowany bezpośrednio na przeglądarkowym Navigation API zamiast na warstwie kompatybilności z History API. Nawigacja jest uznawana za zakończoną, gdy cel osiąga pierwszy commit UI, a nie gdy cały strumień Flight się dokończy, co pozwala koordynować URL, UI, Suspense, scroll, fokus i View Transitions, podczas gdy niedokończona praca dalej streamuje się z serwera. Bez wsparcia Navigation API w przeglądarce linki po prostu wracają do pełnej nawigacji strony, więc hydracja i Server Functions wciąż działają.

**Key takeaways:**
- Strony w effective-rsc to Effecty z parametrami trasy dekodowanymi przez Schema, z automatycznym anulowaniem pracy przy przerwanym żądaniu.
- Router kliencki jest zbudowany bezpośrednio na przeglądarkowym Navigation API, bez warstwy kompatybilności z History API.
- Projekt jest eksperymentalny: wymaga React Canary, Effect v4 RC, TypeScript 7 i wspiera wyłącznie Bun jako runtime serwera.

**Why do I care:** To ciekawy eksperyment dla zespołów już zainwestowanych w Effect po stronie backendu, które chciałyby przenieść ten sam model obsługi błędów, współbieżności i cyklu życia zasobów na warstwę RSC, zamiast utrzymywać dwa różne mentalne modele w jednej aplikacji. Sam status eksperymentalny i zależność od React Canary oznaczają jednak, że to na razie projekt do zabawy i nauki, nie do produkcji.

**Link:** [Introducing effective-rsc](https://www.nikhilsnayak.dev/blog/introducing-effective-rsc)

## Vitest 5.0: wydajność, Trace View i vi.when

**TLDR:** Vitest 5.0 stawia na wydajność jako główny temat wydania, z redukcją czasu wykonania testów sięgającą 53% na dużych projektach, nowym trybem debugowania Trace View w Browser Mode oraz API `vi.when` do definiowania różnych zwracanych wartości dla różnych argumentów mocka.

**Summary:** Zespół zbudował dedykowane repozytorium referencyjnych aplikacji testowych, od pięciopilkowego pakietu narzędziowego po korporacyjny monolit z 1280 modułami, żeby mierzyć wydajność na realistycznych projektach zamiast mikrobenchmarków. Największe zyski widać w pulach vm, trybie przeglądarkowym i dużych izolowanych zestawach testów, na przykład konfiguracja z zależnościami ciężkimi w `vmThreads` przyspiesza o 53%, a korporacyjny monolit z 1280 modułami o 19%. Za tymi liczbami stoją konkretne zmiany: projekty inline współdzielą teraz serwer Vite, cache modułów na dysku jest stabilny i przetrwa między uruchomieniami, a pule vm ponownie wykorzystują skompilowany kod między kontekstami.

Nowy Trace View w Browser Mode nagrywa każdą interakcję, asercję i znacznik strony jako zrzut DOM i pozwala odtworzyć test krok po kroku po tym, jak przeglądarka już poszła dalej, co działa zarówno lokalnie, jak i przy debugowaniu awarii w CI. `vi.when` rozwiązuje odwieczny problem definiowania różnych zachowań mocka dla różnych argumentów bez ręcznego sprawdzania warunków wewnątrz `mockImplementation`, z dopasowaniem przez głęboką równość i wsparciem dla matcherów asymetrycznych jak `expect.any()`. Do tego dochodzi `clearMocks` włączony domyślnie, co usuwa jedno z najczęstszych źródeł testów zależnych od kolejności wykonania, oraz asercje asynchroniczne, które teraz faktycznie failują test, jeśli zapomnisz ich `await`, zamiast tylko wypisywać ostrzeżenie.

**Key takeaways:**
- Największe zyski wydajności dotyczą pul vm, trybu przeglądarkowego i dużych izolowanych zestawów testów, do 53% na pojedynczych konfiguracjach.
- `vi.when` pozwala definiować różne zachowania mocka dla różnych argumentów bez ręcznego sprawdzania warunków.
- `clearMocks` jest teraz włączony domyślnie, a niezaawaitowane asercje asynchroniczne failują test zamiast tylko ostrzegać.

**Why do I care:** Warto sprawdzić `vitest doctor`, nowe narzędzie diagnostyczne, które samo testuje wasz projekt z alternatywnymi konfiguracjami i podpowiada, co realnie przyspieszy wasz zestaw testów, zamiast zgadywać na podstawie ogólnych porad z internetu. Zmiana domyślnego zachowania `clearMocks` i asercji asynchronicznych to z kolei coś, na co warto zwrócić uwagę przy aktualizacji, bo może ujawnić testy, które dotąd przechodziły tylko przez przypadek.

**Link:** [Announcing Vitest 5.0](https://vitest.dev/blog/vitest-5)
