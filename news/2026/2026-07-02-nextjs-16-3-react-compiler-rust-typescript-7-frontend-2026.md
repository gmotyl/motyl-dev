---
title: "Next.js 16.3, React Compiler w Rust, TypeScript 7 i przyszłość renderowania"
excerpt: "Przegląd najważniejszych nowości ze świata React i frontendu: Next.js 16.3 z natychmiastową nawigacją, React Compiler portowany do Rust, TypeScript 7 siedmiokrotnie szybszy, Expo SDK 57 i wiele więcej."
publishedAt: "2026-07-02"
slug: "nextjs-16-3-react-compiler-rust-typescript-7-frontend-2026"
hashtags: "#react #typescript #frontend #javascript #nextjs #reactnative #expo #rspack #prettier #generated #pl"
source_pattern: "This Week In React"
---

## Next.js 16.3: Instant Navigations

**TLDR:** Next.js 16.3 wprowadza mechanizm natychmiastowej nawigacji, który łączy zalety SPA z architekturą serwerową. Zamiast prefetchować każdy link osobno, framework teraz pobiera jeden shell per route i cachuje go w przeglądarce. To fundamentalna zmiana w podejściu do renderowania.

**Summary:** Przez lata jednym z najczęstszych zarzutów wobec aplikacji opartych na Server Components był brak responsywności przy przejściach między stronami. Kliknięcie w link, chwila ciszy, potem dopiero nowa strona. W aplikacjach SPA użytkownik widzi natychmiast szkielet strony, dane doładowują się w tle. Next.js 16.3 próbuje zamknąć tę lukę przez zestaw mechanizmów działających razem pod wspólną nazwą Instant Navigations.

Pierwsza zmiana to Cache Components, nowy tryb renderowania aktywowany flagą w konfiguracji. Po jego włączeniu każde asynchroniczne operacja na serwerze wymaga podjęcia decyzji: dane można streamować przez Suspense, cachować przez dyrektywę use cache, albo jawnie zablokować nawigację przez export const instant = false. Trzecia opcja to świadomy wybór, że dany route ma zachowywać się jak klasyczna aplikacja serwerowa. Dwie pierwsze sprawiają, że nawigacja czuje się jak w SPA, bo użytkownik widzi coś natychmiast.

Druga zmiana to Partial Prefetching. Stary Next.js wysyłał osobne żądanie prefetch dla każdego linku w viewport, co wyglądało absurdalnie w zakładce sieciowej przeglądarki. Nowe podejście pobiera jeden shell per route, na wzór tego jak SPA pobiera bundle per route. Dwadzieścia linków do strony czatu generuje teraz jedno żądanie, nie dwadzieścia. Shell jest cache'owany przez całą sesję.

Trzecia zmiana to Instant Insights, czyli narzędzie deweloperskie wykrywające route'y, które nie spełniają kryterium natychmiastowości. W developmencie taki route generuje błąd z dokładną informacją, co go blokuje i jakie są opcje naprawy. Jest też helper do testów Playwright, który pozwala asertować, że konkretna zawartość jest widoczna zanim serwer odpowie. Do tego Navigation Inspector w DevTools, który pozwala "zamrozić" nawigację na etapie shella i sprawdzić, co jest dostępne statycznie.

Całość jest za flagą, z planem wprowadzenia jako domyślne zachowanie w przyszłej wersji major. Vercel testuje to u siebie na v0, gdzie czasy nawigacji wyraźnie spadły.

**Key takeaways:**
- Cache Components wymaga jawnej decyzji: Stream, Cache lub Block dla każdego asynchronicznego punktu
- Partial Prefetching pobiera jeden shell per route zamiast per link
- Instant Insights wykrywa regresje w czasie dewelopmentu i budowania
- instant() helper dla Playwright do testowania natychmiastowości
- Obie funkcje są za flag; domyślne w przyszłym major release

**Why do I care:** Natychmiastowa nawigacja to jeden z ostatnich argumentów, który skłaniał ludzi do wyboru SPA zamiast SSR. Jeśli Next.js rzeczywiście to zamknie, i to bez utraty wszystkich zalet serwera, to jest to fundamentalna zmiana propozycji wartości. Martwi mnie jednak to, że "instant" przestaje być właściwością domyślną i staje się czymś, co trzeba aktywnie utrzymywać. Każdy refaktor, który przeniesie cookies() poza granicę Suspense, cicho zmieni route w blokujący. Tooling to kompensuje, ale dług utrzymaniowy rośnie.

**Link:** [Next.js 16.3: Instant Navigations](https://nextjs.org/blog/next-16-3-instant-navigations)

---

## Next.js 16.3: AI Improvements

**TLDR:** Next.js 16.3 rozszerza integrację z agentami AI przez pierwsze oficjalne Skills, ulepszony agent-browser z React DevTools oraz mniejszy i bardziej skoncentrowany serwer MCP. Dokumentacja dostępna jako Markdown przez dołączanie .md do każdego URL.

**Summary:** Poprzednia wersja Next.js zaczęła bundlować dokumentację do projektu, żeby agenty AI czytały wersję pasującą do zainstalowanego frameworka zamiast polegać na danych treningowych. W 16.3 poszli krok dalej: next dev teraz automatycznie zapisuje i aktualizuje wskaźnik do tej dokumentacji w AGENTS.md, tak żeby istniejące projekty nie wymagały ręcznej konfiguracji.

Nowe Skills to gotowe przepisy na wieloetapowe zadania, których sama dokumentacja nie może poprowadzić. Skill next-dev-loop daje agentowi dostęp do pełnej pętli deweloperskiej, łącznie z możliwością inspekcji drzewa React przez agent-browser. Skill next-cache-components-adoption prowadzi przez proces włączania Cache Components w istniejącym projekcie, route po route, z możliwością wyboru między podejściem inkrementalnym a bezpośrednim. Skill next-cache-components-optimizer optymalizuje konkretny route pod kątem jak największej statycznej powłoki.

Agent-browser, który wcześniej był eksperymentalnym next-browser, teraz jest samodzielnym narzędziem wychodzącym poza Next.js. Wersja 0.27 dodaje React DevTools introspection, czyli możliwość listowania drzewa komponentów, inspekcji konkretnego komponentu po fiberId, profilowania re-renderów i sprawdzania co blokuje renderowanie przez granicę Suspense.

Serwer MCP stał się mniejszy. Zniknęły narzędzia bazy wiedzy, bo bundlowana dokumentacja je zastąpiła. Pojawiły się dwa nowe narzędzia kompilacyjne: get_compilation_issues dla całego projektu i compile_route dla pojedynczego route, działające na żywym dev serwerze zamiast wymagać pełnego buildu.

**Key takeaways:**
- next dev automatycznie aktualizuje AGENTS.md w istniejących projektach
- Trzy nowe Skills dla wieloetapowych zadań z Cache Components
- agent-browser 0.27 dodaje React DevTools introspection
- Każdy URL dokumentacji nextjs.org/docs przyjmuje .md na końcu i zwraca Markdown
- Serwer MCP uproszczony, dodane narzędzia kompilacyjne

**Why do I care:** Kierunek jest jasny: framework staje się platformą deweloperską dla agentów, nie tylko dla ludzi. Skills to coś pośredniego między dokumentacją a kodem, przepis który agent może wykonać krok po kroku. Ciekawe jest to, że Next.js jako pierwszy duży framework tak explicite projektuje API pod kątem agenckiej iteracji. Pytanie co to oznacza dla tych z nas, którzy wolą robić te rzeczy sami.

**Link:** [Next.js 16.3: AI Improvements](https://nextjs.org/blog/next-16-3-ai-improvements)

---

## Turbopack: Co nowego w Next.js 16.3

**TLDR:** Turbopack 16.3 przynosi do 90% redukcji zużycia pamięci w trybie dev, persistentny cache dla buildów produkcyjnych, eksperymentalny Rust React Compiler 20-50% szybszy i wsparcie dla import.meta.glob. Skupienie na wydajności jest wyraźne.

**Summary:** Turbopack od początku działał na zasadzie "cache wszystko w pamięci, żeby unikać rekompilacji". To działa dobrze dla CPU, ale przez rok zbierało skargi o wysokie zużycie pamięci. Szczególnie bolesne przy jednoczesnym uruchomieniu agentów AI, IDE, typecheckera i lintera, gdzie każdy z nich konsumuje sporą część systemu.

W 16.3 zaimplementowali mechanizm eviction cache w pamięci. Turbopack może teraz usuwać z RAM wyniki, które zostały już zapisane na dysk. Fileless cache na dysku istniał od 16.1, teraz jest domyślnie włączony razem z eviction. Nie ma jednej liczby procentowej, bo wyniki zależą od grafu route'ów i długości sesji, ale redukcje są opisywane jako znaczące.

Persistentny cache działał już dla dev, teraz jest dostępny dla next build. W konfiguracji CI można kopiować folder .next między runami i Turbopack przy starcie buildu odczyta to co zostało już przetworzone. Szczególnie przydatne dla dużych projektów, gdzie build jest kluczowym wąskim gardłem.

Eksperymentalny Rust React Compiler to osobna historia. React Compiler istniał do tej pory tylko jako transform Babelowy, który na dużych projektach spowalniał buildy przez konkurencję o zasoby JS. React team opublikował natywny port w Rust, Turbopack szybko go zintegrował. Benchmarki na dużych projektach jak v0 pokazują 20-50% przyspieszenia kompilacji. Udostępniają jako eksperymentalny za flagą turbopackRustReactCompiler.

Wsparcie dla import.meta.glob, czyli Vite-kompatybilnego API do dynamicznego importowania zestawów modułów po wzorcu glob. Już dostępne w Vite i w nowym Rspack 2.1, teraz i Turbopack dołącza do ekosystemu.

**Key takeaways:**
- Do 90% redukcji zużycia pamięci przez memory eviction połączony z filesystem cache
- Persistentny cache dla next build, można cachować w CI
- Eksperymentalny Rust React Compiler za flagą, 20-50% szybszej kompilacji
- import.meta.glob wspierany i kompatybilny z Vite
- HMR cold start zmniejszony o ponad 15% na złożonych aplikacjach

**Why do I care:** Redukcja zużycia pamięci to coś co bezpośrednio odczuwam w pracy. Kiedy mam w tle agenta AI, TypeScript Language Server, ESLint i dev server, komputer zaczyna szamotać. Jeśli Turbopack rzeczywiście oddaje pamięć zamiast trzymać wszystko w nieskończoność, to jest to praktyczna poprawa jakości życia. Rust React Compiler to ciekawe, ale eksperymentalne i ograniczone do Turbopacka, więc nie dosięgnie projektów opartych na Webpacku.

**Link:** [Turbopack: What's New in Next.js 16.3](https://nextjs.org/blog/next-16-3-turbopack)

---

## Rolldown wycofa integrację Rust React Compilera

**TLDR:** Rolldown i Vite wycofały integrację Rust React Compilera, bo zwiększał binarny rozmiar o 17%, co jest nie do zaakceptowania dla narzędzia używanego przez 12 milionów pobrań tygodniowo przez nieużytkowników Reacta. Kontrowersja ujawnia głębszy problem: jak framework-agnostyczne narzędzie ma obsługiwać funkcje specyficzne dla konkretnego frameworka.

**Summary:** Przez ponad rok trwały rozmowy o dodaniu React Compiler do Rolldown i Vite. W marcu 2025 React team otworzył issue w Oxc o wsparcie dla React Compiler jako plugin. Cel był jasny: aplikacje React miały móc porzucić pipeline Babelowy używany wyłącznie dla kompilatora. W czerwcu 2026 Boshen scal PR integrujący Rust port React Compilera do Oxc, a następny PR podpiął to do Rolldown za flagą transform.reactCompiler. Ten PR został zamknięty 9 czerwca.

Problem? Integracja zwiększała rozmiar binarny Oxc napi addon z 3.51 MiB do 8.66 MiB, a rozmiar całego Rolldown z 28.7 MB do 33.8 MB, czyli o 17%. Boshen zdecydował, że nie może to trafić do wszystkich użytkowników domyślnie. Evan You dodał kluczowy argument: Vite jest pobierany 12 milionów razy tygodniowo i jest framework-agnostyczny. Dodanie 5 MB dla React to precedens, który otwiera drzwi na 5 MB dla Vue, 5 MB dla Svelte, 5 MB dla Solid. Gdzie jest granica?

Jednocześnie Rspack 2.1 wydany tego samego dnia pochwalił się integracją Rust React Compilera z benchmarkami pokazującymi 7-13x przyspieszenie względem wersji Babelowej. Rspack jako narzędzie związane z ekosystemem Byteance i bez pretensji do bycia w pełni framework-agnostycznym, może sobie na to pozwolić. Dla Vite i Rolldown to inny rachunek.

Cała historia ujawnia coś niekomfortowego: narzędzia budowania stały się tak ekosystemowo skrzyżowane, że optymalizacja dla jednego frameworka zawsze obciąża innych. John-David Dalton zaproponował rozwiązanie przez opcjonalne kompresowanie napi addonów w czasie dystrybucji, co mogłoby zmniejszyć addon z 25 MB do 8 MB na darwin-arm64.

**Key takeaways:**
- Rust React Compiler wycofany z Rolldown i Vite z powodu 17% wzrostu rozmiaru binarnego
- Framework-agnostyczne narzędzia mają realny problem z obsługą React-specyficznych optymalizacji
- Rspack 2.1 zaimplementował to samo z benchmarkami 7-13x szybciej niż Babel
- Potencjalne rozwiązanie przez opcjonalną kompresję napi addonów
- Boshen eksperymentuje z mniejszą implementacją: 2x szybsza, tylko 1.4 MB więcej

**Why do I care:** To jest jeden z tych momentów, które pokazują że wybory architekturalne narzędzi mają konsekwencje dla całego ekosystemu. Vite nie jest "Vite dla Reacta", jest Vite dla wszystkich. Każda decyzja o domyślnym zachowaniu jest decyzją polityczną. Podejście "zapłać za React jeśli go używasz" przez opcjonalny plugin jest oczywiste dla developerów, ale komplikuje toolchain. Ciekawsze jest jednak to, że ta dyskusja ujawnia jak fundamentalne stało się pytanie: kto płaci za natywne narzędzia?

**Link:** [Rolldown Pulls Rust React Compiler Integration](https://socket.dev/blog/rolldown-pulls-rust-react-compiler-integration)

---

## Różne strategie hydracji i renderowania

**TLDR:** Kompleksowy przegląd wszystkich podejść do renderowania w 2026 roku: od SSG przez streaming SSR, Server Components, do islands architecture i resumability w Qwik. Artykuł jest porządnym materiałem edukacyjnym, ale zawiera kilka ważnych pominięć.

**Summary:** Artykuł przeprowadza przez całe spektrum strategii renderowania w nowoczesnym webdevelopmencie, zaczynając od podstawowego problemu: luki między "strona wygląda gotowo" a "strona faktycznie działa". Klasyczne SSR generuje HTML na serwerze, ale wymaga powtórnego uruchomienia całego kodu React na kliencie po to, żeby przypiąć obsługę zdarzeń. To się nazywa hydracją i jej koszt rośnie z rozmiarami aplikacji.

Streaming SSR z Suspense pozwala przesyłać HTML w kawałkach w miarę jak dane stają się dostępne, zamiast czekać na całość. Każda granica Suspense staje się niezależną jednostką, którą React hydruje osobno i może priorytetyzować zależnie od aktywności użytkownika. Użytkownik klika w element, który jeszcze nie jest hydrowany, a React hydruje go poza kolejnością. To lepiej, ale całość kodu JavaScript nadal trafia do przeglądarki.

React Server Components idą dalej: komponenty serwerowe w ogóle nie trafiają do bundla klienta. Ich kod pozostaje na serwerze, do przeglądarki idzie tylko Flight payload czyli serializowany opis UI, który klient rekonstruuje. Hydratować trzeba tylko interaktywne liście drzewa, nie całą aplikację. Artykuł trafnie pokazuje podejście TanStack Start jako alternatywę "client-first": RSC traktowane są tam jako typ danych, nie jako paradygmat, można je ładować przez TanStack Query jak każde inne dane.

Islands architecture, jak w Astro, odwraca logikę: strona jest statyczna, tylko wybrane fragmenty są interaktywne. Każda "wyspa" hydruje się niezależnie z własnym JavaScript. Dla blogów i stron dokumentacji to podejście daje świetny Lighthouse bez wysiłku.

Resumability w Qwik to inna filozofia: zamiast hydratować, serializować cały stan wykonania frameworka bezpośrednio do HTML. Klient nie musi nic rekonstruować, tylko przejąć gdzie serwer skończył. Koszt startowy jest niemal zerowy, ale model programowania ma ograniczenia wynikające z tego co można serializować.

**Key takeaways:**
- Streaming SSR zmienia kolejność i timing pracy, ale nie redukuje jej ilości
- RSC eliminują kod serwera z bundla klienta, ale wymagają frameworka i runtime
- TanStack Start traktuje RSC jako dane, nie jako paradygmat - client-first, opt-in
- Islands sprawdzają się dla stron głównie statycznych, nie dla bogatych aplikacji
- Resumability ma niski koszt startu, ale nie jest silver bullet dla aplikacji gdzie wszystko jest interaktywne

**Why do I care:** Ten artykuł jest dobry jako materiał edukacyjny, ale trochę mnie denerwuje, że zestawia technologie jakby były porównywalne. Qwik i Next.js App Router to różne odpowiedzi na różne pytania. Aplikacja handlowa z pełnoprawnym dashboardem ma inne potrzeby niż blog. Artykuł to sugeruje, ale mogłoby być mocniej: "wybierz strategię do problemu, nie odwrotnie". Najbardziej nieoczekiwana obserwacja: CVE-2025-55182 w deserializacji RSC, aktywnie eksploatowany. To jest coś, o czym za mało mówimy: przenoszenie renderowania na serwer zwiększa powierzchnię ataku.

**Link:** [Different hydration and rendering strategies](https://neciudan.dev/hydration-and-rendering-strategies)

---

## Rspack 2.1: Rust React Compiler i TypeScript 7

**TLDR:** Rspack 2.1 dostarcza to, o co Rolldown się kłócił: Rust React Compiler z 7-13x przyspieszeniem względem Babel, wsparcie dla TypeScript 7 z 60% redukcją czasu type-checkingu i import.meta.glob kompatybilny z Vite. To solidna aktualizacja produkcyjna.

**Summary:** Rspack 2.1 to bogata aktualizacja skupiona głównie na wydajności. Najważniejszy headline to integracja Rust React Compilera przez wbudowany loader SWC. Benchmarki mówią o 13.5x szybszym dev i 7.4x szybszym buildzie produkcyjnym w porównaniu do wersji Babel. Innymi słowy: jeśli React Compiler był zbyt wolny żeby go włączyć, teraz może nie być.

Wsparcie dla TypeScript 7 przez ts-checker-rspack-plugin to kolejna duża wiadomość. TypeScript 7 napisany w Go jest ponad 10x szybszy od klasycznego kompilatora JS. Plugin obsługuje type-checking z TypeScript 7 RC, co redukuje czas sprawdzania typów o około 60% w projektach z włączonym type-checkingiem w buildzie. Wystarczy zainstalować typescript@rc i plugin robi resztę.

Wsparcie dla import.meta.glob otwiera możliwość dynamicznego importowania zestawów modułów przez wzorce glob, analogicznie do Vite i nowego Turbopacka. Watcher plików automatycznie wyzwala rekompilację gdy pliki pasujące do wzorca są dodawane lub usuwane.

TanStack Start teraz oficjalnie wspiera Rsbuild jako bundler, co oznacza że można budować aplikacje TanStack Start na stosie Rspack i mieć dostęp do RSC przez plugin rsbuild-plugin-rsc. To konkretny krok ku unifikacji ekosystemu.

Nowy CircularCheckRspackPlugin zastępuje przestarzały CircularDependencyRspackPlugin z lepszym algorytmem grafowym do wykrywania cykli w jednym przebiegu. Automatyczne czyszczenie persistentnego cache przez maxAge i maxVersions rozwiązuje problem narastania starych wersji cache w CI.

**Key takeaways:**
- Rust React Compiler 7-13x szybszy niż Babel, włączany przez builtin:swc-loader
- TypeScript 7 support przez ts-checker-rspack-plugin, 60% szybszy type-checking
- import.meta.glob kompatybilne z Vite
- TanStack Start oficjalnie wspiera Rsbuild
- Automatyczne czyszczenie persistentnego cache w CI

**Why do I care:** Rspack regularnie dostarcza rzeczy, o których reszta ekosystemu dyskutuje. Rust React Compiler jest tu, działa, jest zmierzony. TypeScript 7 jest tu w formie użytecznej. import.meta.glob jest tu. Dla mnie to interesujące z perspektywy adopcji: jeśli projekt może przejść na Rspack bez pełnej migracji Webpack, a w zamian dostaje te rzeczy, to jest to konkretna propozycja wartości. Pytanie które mnie nurtuje: dlaczego "framework-agnostyczny" Vite ma problem z 5 MB dla React Compilera, a "ekosystem" Rspack go nie ma?

**Link:** [Announcing Rspack 2.1](https://rspack.rs/blog/announcing-2-1)

---

## shadcn/ui: Komponenty dla interfejsów czatowych

**TLDR:** shadcn/ui wydało zestaw komponentów do budowania interfejsów czatowych: MessageScroller, Message, Bubble, Attachment i Marker. Razem z nowym pakietem at shadcn/react dla headless komponentów, to pierwsza faza dużego projektu.

**Summary:** Budowanie dobrze działającego interfejsu czatowego jest zaskakująco skomplikowane. Nie chodzi o wygląd, chodzi o zachowanie: automatyczne scrollowanie do nowych wiadomości ale tylko kiedy użytkownik jest na dole, przywracanie pozycji po wczytaniu historii, obsługa strumieniowania z LLM, jump-to-message. Te rzeczy łatwo się psują i trudno je dobrze napisać od podstaw.

MessageScroller jest rdzeniem zestawu. Obsługuje anchoring, auto-follow, prepend preservation, scroll commands i visibility tracking bez powiązania z konkretnym stanem AI, transportem czy persistence. Dostarcza mechanizm, nie implementację. To podejście jest spójne z filozofią shadcn/ui: daj mi kod który mogę edytować, nie bibliotekę która mnie ogranicza.

Wokół MessageScroller: Message dla layoutu wiersza z awatarem i nagłówkiem, Bubble dla powierzchni wiadomości z wariantami i reakcjami, Attachment dla plików i obrazów z pełnym obsługą stanów uploadowania, Marker dla systemowych powiadomień i separatorów statusowych.

Nowe narzędzia CSS: scroll-fade dodaje fade na krawędziach kontenerów z przewijaniem bez JavaScript, shimmer dodaje animację do wskaźników statusu jak "Thinking..." czy "Generating response". Oba dostępne przez shadcn/tailwind.css.

Nowy pakiet at shadcn/react to headless komponenty bez stylów. Pierwszy jest message-scroller, który enkapsuluje logikę scrollowania. Wrapper komponentowy w shadcn/ui dostaje style, ale zachowanie żyje w pakiecie i jest testowane osobno. Dostępne dla Radix i Base UI.

**Key takeaways:**
- MessageScroller obsługuje złożone zachowania scrollowania bez powiązania ze stanem AI
- Komponenty są celowo małe i do kompozycji, nie monolityczne
- at shadcn/react jako nowy pakiet dla headless komponentów
- scroll-fade i shimmer jako nowe utility CSS
- To pierwsza faza, będą kolejne komponenty dla interfejsów czatowych

**Why do I care:** shadcn/ui konsekwentnie trafia w potrzeby developerów. Komponenty czatowe to coś, co każdy obecnie buduje na swój sposób i każdy je buguje w ten sam sposób. Mam pytanie o MessageScroller: jakie są rzeczywiste granice jego użycia poza prostymi przypadkami? Infinite scroll z historią, wyszukiwanie z highlight, wielowątkowe konwersacje? Headless komponenty przez at shadcn/react to ciekawy kierunek, bo oddziela zachowanie od stylu, ale sprawdza się tylko gdy granica jest dobrze zdefiniowana.

**Link:** [June 2026 - Components for Chat Interfaces](https://ui.shadcn.com/docs/changelog/2026-06-chat-components)

---

## Storybook dla TanStack React

**TLDR:** Ukazał się @storybook/tanstack-react, dedykowany framework Storybook dla TanStack Router i Start. Automatyczne wrapowanie w RouterProvider, type-safe parametry tras i automocking funkcji serwerowych z createServerFn. Zero-config na starcie.

**Summary:** TanStack Router i Start zrobiły sporą karierę w ciągu ostatnich miesięcy. Router daje type-safe routing z loaderami, Start dodaje server functions działające jak lokalne wywołania. Storybook dotychczas wymagał sporo konfiguracji żeby działać z aplikacjami opartymi na tym stosie: trzeba było ręcznie wrapować komponenty w RouterProvider z mock historią, obsługiwać loader data, radzić sobie z importami serwera w kontekście przeglądarki.

@storybook/tanstack-react eliminuje ten ból. Każda story automatycznie dostaje RouterProvider z in-memory historią, żeby nawigacja działała w preview bez zmiany URL przeglądarki. Parametry tras są type-safe: jeśli przekażesz zły klucz params albo zły typ searchParams, TypeScript wyłapie to w czasie kompilacji, nie w runtime.

Dla story potrzebujących konkretnych danych loaderowych jest routeOverrides, gdzie można podać własną implementację loadera per route. Dla funkcji serwerowych z TanStack Start framework automatycznie stub'uje createServerFn i zamienia handlery w mock functions dostępne przez bibliotekę test. Można konfigurować je per story dla stanów sukces, ładowania, pustych i błędów.

TanStack Query integruje się przez dekorator z QueryClientProvider w konfiguracji preview. Każda story może seedować dane przez setQueryData w beforeEach. To daje pełną kontrolę nad cyklem życia danych: loading, success, empty, error.

Trzy warstwy obsługi serwera-only dependencies: mocks na poziomie frameworka dla wewnętrznych pakietów TanStack Start, automatyczne stub'owanie entry pointów serwera, i standardowy moduł mocking Storybook dla zależności specyficznych dla aplikacji.

**Key takeaways:**
- Automatyczny RouterProvider z in-memory historią dla każdej story
- Type-safe parametry routes, params i search łapane w czasie kompilacji
- Automocking createServerFn handlery przez vi.mock/jest.mock automatycznie
- TanStack Query integracja przez dekorator
- CLI automatycznie wykrywa TanStack Router i Start przy inicjalizacji

**Why do I care:** Testowanie komponentów w izolacji zawsze wymaga mockowania kontekstu, który normalnie zapewnia framework. Każdy, kto próbował testować komponenty zależne od React Router albo TanStack Router wie jak frustrujące jest ręczne tworzenie wrapper utility. @storybook/tanstack-react to rozwiązanie tego problemu z automockingiem server functions jako bonus. Ciekawi mnie jak dobrze działa z bardziej złożonymi przypadkami: nested routes z multiple loaders, prefetching, route invalidation po mutacji.

**Link:** [Storybook for TanStack React](https://storybook.js.org/blog/storybook-for-tanstack-react/)

---

## Takumi: Renderowanie JSX do obrazów bez przeglądarki

**TLDR:** Takumi to nowe narzędzie do renderowania JSX do obrazów i animowanych WebP bez Chromium. Binarka Rust z Node.js bindings, WASM dla Cloudflare Workers i pełnym wsparciem CSS łącznie z CSS Grid, Tailwind i @keyframes.

**Summary:** Generowanie obrazów z kodu React to powszechna potrzeba, szczególnie dla Open Graph kart społecznościowych. Dominującym rozwiązaniem jest next/og oparte na satori i resvg, ale jest też podejście z headless Chromium, które zużywa 300 MB i ma długi cold start. Żadne z tych rozwiązań nie jest idealne dla edge i serverless.

Takumi to binarka Rust, która parsuje CSS, układa drzewo komponentów i koduje piksele bez przeglądarki. API jest kompatybilne z next/og przez ImageResponse, więc migracja istniejącego kodu jest minimalna. Poza tym Takumi obsługuje znacznie szerszy zestaw CSS niż typowe rozwiązania do generowania OG: CSS Grid, position absolute, calc(), z-index, pseudoelementy ::before i ::after, backdrop-filter, mix-blend-mode, conic-gradient(), clip-path, mask i background-clip: text.

Wyjście nie jest ograniczone do statycznych PNG. Renderer przyjmuje timestamp i może generować animowane WebP przez regularne próbkowanie drzewa przez czas. CSS @keyframes i Tailwind animate-* są rozwiązywane w czasie renderowania.

Dostępny jako natywny binding Node.js, build WASM dla Cloudflare Workers i przeglądarek, i crate Rust. Prebuilt dla macOS, Linux i Windows na x64 i ARM64. MIT i Apache-2.0.

**Key takeaways:**
- Brak Chromium, brak headless browser, jeden call funkcji
- Kompatybilne z next/og przez ImageResponse
- Znacznie szerszy zestaw CSS niż konkurencja
- Animowane WebP z @keyframes przez próbkowanie po czasie
- Node.js binding, WASM i crate Rust w jednym pakiecie

**Why do I care:** Generowanie obrazów na edge jest realnym problemem. Satori działa dobrze ale ma ograniczony CSS i nie obsługuje animacji. Chromium działa świetnie ale jest zbyt ciężki. Takumi wygląda jak coś pośredniego: natywna wydajność Rust z sensownym podzbiorem CSS. Muszę sprawdzić jak radzi sobie z bardziej skomplikowanymi layoutami zanim polecę klientom.

**Link:** [Takumi — Render JSX to images. Skip the browser.](https://takumi.kane.tw/)

---

## Expo SDK 57: React Native 0.86

**TLDR:** Expo SDK 57 to mały, skoncentrowany release z React Native 0.86 i bez breaking changes. Expo eksploruje nowy model wydań oparty na nieprzerywających upgrade'ach synchronizowanych z harmonogramem React Native.

**Summary:** Expo SDK 57 to pierwsza demonstracja nowego podejścia do cyklu wydań. Przez lata Expo wydawało major release trzy razy w roku, podczas gdy React Native sześć razy. Każdy release Expo targetował jedną wersję React Native. Teraz, gdy React Native przeszło przez największe zmiany architektury, nowy model zakłada "non-breaking release" co drugi release React Native.

React Native 0.86 jest właśnie takim nie-przerywającym wydaniem. Expo natychmiast publikuje SDK 57 jako opcjonalny upgrade, który można zainstalować przez npx expo install expo@latest --fix. Jeśli to działa tak jak deklarują, upgrade między SDK 56 a 57 powinien być trywialny.

Mimo że release jest mały, kilka rzeczy warto odnotować. expo-dev-client na iOS ma nowe ustawienie wyboru między auto-uruchamianiem ostatniego projektu a pokazaniem launchera. expo prebuild teraz domyślnie czyści i regeneruje katalogi android i ios. expo-image dostało writeToCacheAsync i readFromCacheAsync do zarządzania cache'em przez klucze. expo-router ma Stack.Toolbar.Badge w header left i right i na ikonach menu Android.

Ważne zastrzeżenie: importowanie react-native-reanimated na Android może zwiększyć zużycie pamięci o 25-30%, nawet bez aktywnego używania biblioteki. To bug w Hermes V1 i workaround jest dostępny przez worklets bundle mode.

**Key takeaways:**
- React Native 0.86, React 19.2 niezmieniony względem SDK 56
- Nowy model wydań: szybkie, non-breaking upgrade co drugi release RN
- Drobne poprawki w expo-dev-client, prebuild, expo-image i expo-router
- Uwaga: react-native-reanimated może zwiększyć zużycie pamięci na Android o 25-30%
- Migracja: npx expo install expo@latest --fix powinna wystarczyć

**Why do I care:** Nowy model wydań Expo to dobra wiadomość jeśli zadziała w praktyce. Rzadziej przerywające upgrady to mniej bólu dla zespołów z dużymi aplikacjami. Martwię się o drobnym druku: 601 commitów i 1552 plików między 0.85 i 0.86 to sporo kodu, nawet jeśli "nie ma breaking changes". Breaking changes i "nieoczekiwane zachowania po upgrade" to nie to samo.

**Link:** [Expo SDK 57](https://expo.dev/changelog/sdk-57)

---

## Iterowanie szybciej z TypeScript 7 w VS Code

**TLDR:** VS Code opisuje jak przez sześć miesięcy stopniowo adoptowali TypeScript 7, Go port kompilatora. Wynik: type-checking 7x szybszy, npm run watch 4x szybszy, i ładowanie language tooling z minuty do 10 sekund.

**Summary:** TypeScript 7 to pełny port kompilatora TypeScript w Go. Zapowiedziany w marcu 2025, w połowie 2026 trafił do VS Code jako domyślna wersja. Post VS Code Team opisuje sześciomiesięczny proces adopcji krok po kroku, który pokazuje jak dużą organizację przeprowadzić przez tak fundamentalną zmianę bez destabilizacji codziennej pracy.

Podejście było inkrementalne z kilku powodów. Po pierwsze, TypeScript 7 był w aktywnym rozwoju kiedy VS Code zaczął go testować, więc wersja wczesna miała braki i bugi. Po drugie, błędy formatowania między TypeScript 6 i 7 powodowały problemy z pre-commit hookami, więc każda niespójność blokowała PR. Testowanie wczesne i iteracyjne pozwoliło na stały feedback do zespołu TypeScript, który mógł priorytetyzować naprawę rzeczy blokujących VS Code.

TypeScript 6.0 był pomostem, dostosowując konfigurację domyślną do tego co TypeScript 7 przyjmuje: nowoczesny target ES, strict null checks domyślnie włączone. To był mały krok dla VS Code, ale ważna walidacja że codebase jest w dobrym stanie.

Liczby mówią same za siebie: type-checking głównego kodu VS Code z 36 sekund do 5 sekund. npm run watch z 80 sekund do 20 sekund. Ładowanie language tooling w edytorze z minuty do 10 sekund. Przy wielokrotnym reloadzie window przez deweloperów dziennie to dziesiątki minut oszczędności.

**Key takeaways:**
- Type-checking 7x szybszy, npm run watch 4x szybszy
- Language tooling w edytorze ładuje się w 10 sekund zamiast minuty
- Sześć miesięcy inkrementalnej migracji, zaczynając od najmniej ryzykownych obszarów
- Formatowanie musiało być spójne zanim mogli przełączyć deweloperów
- TypeScript 6.0 jako pomost ułatwił przejście

**Why do I care:** Liczby są imponujące i weryfikowalne na własnej skórze. Ale mnie interesuje meta-story: jak przeprowadzić dużą organizację przez migrację narzędzia, na którym opierają się setki deweloperów. Krok po kroku, zaczynając od niskiego ryzyka, używając CI żeby wyłapywać różnice. To nie jest rocket science, ale wiele zespołów tego nie robi i potem ma "big bang" migracje które kończą się katastrofą. Dobry case study.

**Link:** [Iterating faster with TypeScript 7](https://code.visualstudio.com/blogs/2026/06/26/iterating-faster-with-ts-7)

---

## Flow's OCaml to Rust Port

**TLDR:** Facebook Flow całkowicie przepisał swój type checker z OCaml do Rust i wydał go w produkcji jako flow-bin od v0.319. Wynik: 2x szybszy w większości faz type-checkingu, 30-100% szybszy w najbardziej intensywnej fazie. Przepisanie zajęło kilka miesięcy z masywnym wsparciem Claude jako narzędziem porting.

**Summary:** Flow przez lata był wewnętrznym type checkerem Mety dla JavaScript. OCaml dawał mu pewne zalety, ale izolował projekt od ekosystemu Rust-based toolingu jak SWC i oxlint. W 2025 trzy zdarzenia zmieniły kalkulację: Pyrefly (Rust przepisanie Pyre) dostarczyło 30x przyspieszenie, TypeScript ogłosił port w Go z 10x przyspieszeniem, a AI agenty pokazały że można znacząco skrócić czas tak kosztownych refaktorów.

Kluczowe decyzje: Rust zamiast Go czy Kotlin, bo chcieli skorzystać z ekosystemu Rust-based narzędzi i zrobić to tylko raz. Port linijka po linijce zamiast przepisania, żeby uniknąć zmiany zachowania i skomplikowanego rollout. Postęp zamiast w pełni idiomatycznego Rust, co dało szybki czas do produkcji.

Interesująca część to użycie AI. Parser portowano w sposób klasyczny: autor ręcznie uruchamiał prompty do Claude Sonnet 4.5, review i kontynuacja. Cały parser z wszystkimi testami, przez jedną osobę, w 4 tygodnie. Type checker portowano z Claude Opus 4.5/4.6 w trybie agentowym z agent teams gdzie reviewer agenty sprawdzały zgodność z guidelines i odrzucały złe zmiany. Cały checker w miesiąc.

Kluczowe zabezpieczenie: instrukcja żeby AI włączało oryginalny kod OCaml jako komentarze obok portowanego Rust, co uniemożliwiało odejście od port linijka po linijce. Te komentarze były usuwane przez ludzi przy review. Końcowy wynik: binarka w produkcji, 2x szybsza, zero bugs z serialną dezymmetrii między OCaml i Rust w zachowaniu.

**Key takeaways:**
- Flow przepisany z OCaml do Rust, 2x szybszy, 30-100% szybszy w intensywnych fazach
- Port linijka po linijce zamiast przepisania, żeby zachować spójność zachowania
- AI agenty (Claude) używane intensywnie: parser przez prompts, checker przez agent teams
- Trick: OCaml kod jako komentarze obok Rust żeby AI nie "ulepszało" zamiast portować
- Dostępne od flow-bin v0.319 od 17 czerwca 2026

**Why do I care:** To jest jeden z najbardziej szczerych opisów jak wygląda AI-assisted porting w praktyce, z wyszczególnieniem co zadziałało, co zawiodło i gdzie AI potrzebowało human oversight. Mnie szczególnie interesuje metoda: komentarze z oryginalnym kodem jako "guardrail" dla AI jest eleganckim rozwiązaniem problemu halucynacji w refaktoringu. Coś do przemyślenia przy naszych własnych dużych refaktorach.

**Link:** [Flow's OCaml to Rust Port](https://medium.com/flow-type/flows-ocaml-to-rust-port-78b95bcf49e9)

---

## Prettier 3.9: Ulepszenia parserów i formatowania

**TLDR:** Prettier 3.9 przechodzi na micromark v4 dla Markdown, yaml v2 dla YAML, nowy parser Flow oparty na Rust i wsparcie dla GraphQL.js v17. Dziesiątki poprawek formatowania JavaScript i TypeScript, szczególnie w trybie no-semi.

**Summary:** Prettier 3.9 to głównie upgrade parserów i naprawy regresji. Największa zmiana to przejście Markdown parsera z remark-parse v8 do micromark v4. To zmiana fundamentu: micromark jest nowoczesny, zgodny z CommonMark i GFM, i naprawia wiele długotrwałych bugów parsowania. Upgrade MDX parsera jeszcze nie jest ukończony.

Parser YAML przeszedł na yaml v2, naprawiając wiele długoletnich problemów parsowania. Parser Flow teraz używa nowego Rust-based parsera Flow (oxidized), co przekłada się na wyraźne przyspieszenie: 266ms zamiast 422ms dla fixtures Prettier, 1298ms zamiast 2269ms dla flow_parser.js. GraphQL.js v17 jest teraz wspierany ze wszystkimi nowymi składniami: dyrektywy na definicjach dyrektyw i argumenty fragmentów.

Po stronie JavaScript i TypeScript: dziesiątki poprawek dotyczących komentarzy w różnych kontekstach. Tryb no-semi dostał wiele napraw, gdzie zachowanie było niestabilne lub generowało podwójnie formatowanie. Poprawki dla JSX, TypeScript generics, non-null assertions, optional chaining i enum keys z quoteProps. Stary syntax "import assertions" z assert jest usuwany na rzecz aktualnego standardu z with.

Import attributes to coś, o czym warto wiedzieć: if you're still using assert { type: "json" } you need to migrate to with { type: "json" }. Babel 8 całkowicie usunął wsparcie dla starego syntax.

**Key takeaways:**
- Markdown parser przeszedł na micromark v4: lepsza zgodność z CommonMark
- YAML parser na yaml v2
- Flow parser Rust-based (oxidized): 1.6x szybszy
- GraphQL.js v17 wsparty
- Stary syntax "import assertions" z assert jest usunięty, wymagana migracja do with

**Why do I care:** Upgrade parsera Markdown to zmiana, której większość nie odczuje dopóki coś nie wysadzi formatowania w locie. Warto zaktualizować i przepuścić codebase przez prettier --write żeby sprawdzić czy nie ma nieoczekiwanych zmian w plikach Markdown. Szczególnie w monorepozytorium, gdzie Markdown jest w wielu miejscach. Zmiany no-semi naprawiają scenariusze, gdzie Prettier generował niestabilne formatowanie po dwóch rundach uruchomienia, co było irytującym bugiem w pre-commit hookach.

**Link:** [Prettier 3.9](https://prettier.io/blog/2026/06/27/3.9.0)
