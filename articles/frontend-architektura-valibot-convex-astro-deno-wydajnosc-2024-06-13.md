---
title: "Frontend i architektura: Valibot, Convex, Astro, Deno i praktyki wydajności — przegląd z 13 czerwca 2024"
excerpt: "Przegląd ważnych materiałów dla frontendowców i architektów: nowe Valibot, Convex i jego typowanie end-to-end, aktualizacja Deno, zero-JS view transitions w Astro oraz praktyczne analizy wydajności Reacta i DOM."
publishedAt: "2025-10-27"
slug: "frontend-architektura-valibot-convex-astro-deno-wydajnosc-2024-06-13"
hashtags: "#generated #pl #frontend #react #typescript #architecture #web-performance #valibot #zod #convex #astro #deno #trpc #expo #view-transitions #dom #inp"
---

## Bytes #297 - Valibot and the circle of life
**TLDR:** Krótkie, celne spojrzenie na to, jak biblioteki w ekosystemie JavaScript podlegają „kręgowi życia”: coś przejmuje rolę lidera, rośnie, a pojawiają się lżejsze albo bardziej modularne alternatywy. W tym numerze uwaga skupiona na Valibot jako potencjalnym konkurencie Zoda oraz zapowiedzi kilku innych istotnych ruchów w ekosystemie frontendowym.

**Summary:**
W tym krótkim wydaniu autorzy zwracają uwagę na powtarzający się wzorzec w świecie bibliotek JavaScript: upraszczanie, specjalizacja i migracje między narzędziami — od Underscore do Lodash, od Moment do date-fns. Ta dynamika jest o tyle interesująca, że wymusza przemyślenia na poziomie architektury aplikacji: jak bardzo powinniśmy polegać na pojedynczym, szeroko rozpowszechnionym narzędziu, kiedy jego decyzje projektowe mogą nas przywiązać do pewnych kompromisów.

Centralnym punktem numeru jest Valibot, narzędzie do walidacji i transformacji danych inspirowane Zod. Autor sugeruje, że kluczowa przewaga Valibot to modularny design i mniejszy rozmiar pakietu wynikowy dzięki funkcjonalnemu podejściu do kompozycji. To czyni go atrakcyjnym w kontekstach, gdzie bundle size i tree-shaking mają realne znaczenie — na przykład walidacja po stronie klienta w aplikacjach React/TypeScript.

Jednak tekst jest też realistyczny: Zod jest mocno osadzony w ekosystemie i integracjach (tRPC, Astro content collections itp.), więc Valibot musi zaoferować coś więcej niż tylko mniejszy rozmiar, żeby istotnie odebrać dominację. To typowa ewolucja ekosystemu: nowe biblioteki zajmują nisze tam, gdzie wcześniejsze rozwiązania zaczynają być zbyt ciężkie albo zbyt restrykcyjne.

Warto czytać ten newsletter nie jako jedynie przegląd narzędzi, ale jako przypomnienie strategii przy wyborze zależności: zrób równowagę między wygodą integracji a kosztami utrzymania, rozmiarem i elastycznością. Pojawienie się Valibot to sygnał, że modularność i mentalny model API znowu zyskują cenę rynkową.

**Key takeaways:**
- Ekosystem ewoluuje: mniejsze, modularne biblioteki często pojawiają się tam, gdzie starsze stają się „za duże”.
- Valibot inwestuje w modularność i mniejsze bundle size — to kluczowa przewaga w klient-side validation.
- Zależność od popularnego narzędzia wymaga oceny kompromisów: integracja vs. elastyczność.

**Link:** [Bytes #297 - Valibot and the circle of life](https://bytes.dev/archives/297)

## Valibot v0.31.0 is finally available
**TLDR:** Valibot 0.31 to przepisanie biblioteki od zera — nowy mentalny model, funkcjonalne API oparte na eksportach zamiast łańcuchów oraz znaczące zmniejszenie rozmiaru schematów. To krok w stronę narzędzia lżejszego i bardziej przyjaznego do tree-shakingu.

**Summary:**
Autor wydania opisuje gruntowną przebudowę Valibot: zmiana paradygmatu projektowego z łańcuchowego API na eksportowane funkcje i kompozycję. W praktyce oznacza to, że każda funkcjonalność jest osobnym eksportem, co ułatwia tree-shaking i minimalizuje kod ładowany do klienta. Takie podejście kładzie nacisk na czytelność mentalnego modelu: mamy schematy, metody i akcje — to prosty i przewidywalny układ.

Nowe elementy, jak metoda pipe, umożliwiają przekształcenia w pipeline’ach bez potrzeby zagnieżdżania wielu funkcji. To ważne z punktu widzenia ergonomii: łatwiej myśleć o przepływie danych i transformacjach niż o konfiguracji łańcucha metod. Autorzy podkreślają, że migracja była przygotowana — dostępne są codemody i szczegółowy przewodnik — co zmniejsza koszt przejścia dla projektów już stosujących Valibot.

Z punktu widzenia rozmiaru: deklarowane redukcje są wyraźne — przykładowo schema stringu spadła z 800 do 560 bajtów. To nie tylko fajny wynik w benchmarku, to realny wpływ na start aplikacji, szczególnie jeśli walidacja odbywa się na edge lub w środowiskach o ograniczonych zasobach. Ponadto podejście zoptymalizowane pod kompresję sugeruje, że kolejne schematy będą dodawać niewiele nadmiarowych bajtów.

Dla architektów ważne jest tu pytanie adopcji: czy takie narzędzie może przesunąć poważne projekty z Zod? Krótka odpowiedź: możliwe w nowych projektach albo tam, gdzie rozmiar i modularność mają wysoki priorytet; trudniej będzie przekonać duże, istniejące ekosystemy. Niemniej Valibot pokazuje, że konkurencja wymusza innowacje — i to jest zdrowe dla całego stacku.

**Key takeaways:**
- Przepisanie na model modularny daje mniejsze schematy i lepsze tree-shaking.
- Pipe i rozbicie na schematy/metody/akcje poprawiają mentalny model.
- Migracja jest wspierana (przewodnik, codemody), co zmniejsza ryzyko adopcji.

**Link:** [Valibot v0.31.0 is finally available](https://valibot.dev/blog/valibot-v0.31.0-is-finally-available/)

## Content collections (Astro)
**TLDR:** Astro wprowadza Content Layer API i koncepcję kolekcji treści, które zapewniają typowanie TypeScript, walidację schematów (Zod) i zintegrowane loadery — ułatwia to zarządzanie lokalną i zdalną zawartością w aplikacjach statycznych i hybrydowych.

**Summary:**
Artykuł dokumentacyjny Astro opisuje Content Collections jako system organizacji dokumentów lub wpisów (Markdown, MDX, JSON, YAML, itp.) z założeniem ścisłej integracji z TypeScript. Kluczowym elementem jest defineCollection() w pliku src/content.config.ts, gdzie definiujemy loader (lokalny glob lub ładowanie zdalne) oraz opcjonalny schemat walidacyjny, zwykle oparty na Zod.

To podejście daje kilka praktycznych korzyści: lepsze intellisense w edytorze, automatyczne typy TypeScript dla zawartości, i centralne miejsce konfiguracji. Dla zespołów, które chcą trzymać treści blisko kodu, ale jednocześnie zachować gwarancje kształtu danych, Content Collections są eleganckim kompromisem między CMS a raw file system.

Ważne jest także wsparcie dla zdalnych loaderów: Astro umożliwia tworzenie własnych loaderów, więc treści mogą pochodzić z dowolnego API lub headless CMS, zachowując jednak tę samą warstwę typów i walidacji. To pomaga w utrzymaniu spójności między źródłami danych i konsumentami w aplikacji.

Dla architektury projektów frontendowych to krok w stronę większej formalizacji treści — przynosi korzyści zwłaszcza w zespołach, które pracują z dużą ilością treści i potrzebują pewności, że struktura danych nie ulegnie degradacji w miarę rozwoju projektu.

**Key takeaways:**
- Content Collections integrują treści z TypeScript i (często) Zod, poprawiając typowanie i walidację.
- Loadery pozwalają łączyć lokalne pliki i zdalne źródła przy zachowaniu tej samej warstwy API.
- Przydatne w projektach, gdzie treść i aplikacja rosną razem i potrzebna jest spójność danych.

**Link:** [Content collections](https://docs.astro.build/en/guides/content-collections/)

## Input & Output Validators | tRPC
**TLDR:** tRPC wspiera walidację wejścia i wyjścia procedur, domyślnie z Zod, ale projekt pozwala podłączyć inne walidatory. Walidatory służą nie tylko do sprawdzenia danych wejściowych, lecz także do bezpieczeństwa odpowiedzi i kontroli kształtu zwracanych danych.

**Summary:**
Dokumentacja tRPC omawia jak zdefiniować walidatory dla procedur — przede wszystkim po stronie wejścia. Procedura .input() pozwala opisać, jakie dane są oczekiwane, a tRPC zajmie się ich walidacją i inferencją typów po obu stronach połączenia. To ważna cecha: walidator służy zarówno runtimeowej ochronie, jak i statycznemu typowaniu w TypeScript.

Interesującym aspektem jest mechanizm "input merging", czyli możliwość nakładania kilku .input() na jedną procedurę lub middleware. To użyteczna praktyka przy budowie bazowych procedur z wspólnymi częściami wejścia — np. dane sesji, parametry lokalizacji — które można rozszerzać w poszczególnych endpointach bez duplikacji definiowania struktur.

Wyjściowe walidatory nie są zawsze obowiązkowe, ale mają zastosowania praktyczne: kontrola tego, co schodzi do klienta, zabezpieczenie przed zwracaniem danych pochodzących z niepewnych źródeł, oraz ograniczenie powierzchni API. Dla firm dbających o bezpieczeństwo i prywatność jest to istotne.

Z punktu widzenia architektury, tRPC łączy mocne typowanie z prostotą RPC-like API; walidatory są tu elementem pozwalającym zachować kontrakty między klientem a serwerem. Warto jednak planować, jakie części modelu będą walidowane runtime'owo, a które pozostaną w sferze typów kompilatora.

**Key takeaways:**
- Walidacja wejścia w tRPC umożliwia runtimeową ochronę i automatyczną inferencję typów.
- Input merging pozwala reużywać i rozszerzać wspólne części wejścia bez duplikacji.
- Walidacja wyjścia pomaga w kontroli danych wysyłanych do klienta i wzmocnieniu bezpieczeństwa API.

**Link:** [Input & Output Validators | tRPC](https://trpc.io/docs/server/validators)

## End-to-end TypeScript with Convex
**TLDR:** Convex oferuje model „end-to-end TypeScript”, gdzie schemat bazy, funkcje serwera i hooki Reactowe współdzielą typy bez ręcznej regeneracji kodu — opiera się to na koncepcji „types as data structures” i przekazywaniu typów jako nośników metadanych.

**Summary:**
Convex reklamuje się jako backend, w którym wszystkie warstwy — schema.ts, funkcje query/mutation oraz frontend — są opisane w TypeScript. Kluczowym pomysłem jest traktowanie typów jako struktur danych zawierających metainformacje o modelu: typy przekazywane jako parametry generyczne pozwalają narzędziom wyciągać informacje o tabelach i dokumentach bez konieczności generowania plików pośrednich za każdym razem.

Praktyczne efekty są korzystne: gdy zmienisz schemat bazy (dodasz pole do dokumentu), typy w hookach Reactowych aktualizują się automatycznie, co redukuje ilość manualnej pracy przy refaktorach i minimalizuje błędy spowodowane niespójnymi kontraktami. To ułatwia prototypowanie i iterację, zwłaszcza w małych i średnich zespołach.

Jednak podejście ma swoje ograniczenia i koszty. Silne poleganie na skomplikowanych typach TypeScript może podnieść barierę wejścia i sprawić, że debugowanie staje się trudniejsze, gdy pojawiają się błędy typów. Również w większych, heterogenicznych zespołach, gdzie część kodu jest w innych językach, takie podejście może wymagać dodatkowych mostów integracyjnych.

Mimo to Convex dobrze ilustruje trend: przenoszenie kontraktów schema <-> api <-> client do warstwy typów, redukując potrzebę generacji i synchronizacji. Dla architektów to interesująca propozycja — szczególnie tam, gdzie szybkość iteracji i bezpieczeństwo typów są priorytetem.

**Key takeaways:**
- „Types as data structures” pozwala na automatyczną synchronizację typów między schematem, funkcjami i frontendem.
- Automatyczne aktualizacje typów upraszczają iterację, ale podnoszą wymagania poznawcze zespołu.
- To podejście dobrze sprawdza się w jednorodnych TypeScriptowych stackach, mniej w heterogenicznych środowiskach.

**Link:** [End-to-end TypeScript with Convex](https://stack.convex.dev/end-to-end-ts/)

## Deno 1.44: Private npm registries, improved Node.js compat, and performance boosts
**TLDR:** Deno 1.44 wprowadza obsługę prywatnych rejestrów npm, wsparcie dla gRPC, poprawki kompatybilności z Node.js i optymalizacje wydajności (m.in. ponowne włączenie kompresji wskaźników V8).

**Summary:**
Aktualizacja Deno jest ważna z punktu widzenia projektów, które rozważają migrację z Node albo chcą korzystać z paczek npm bez utraty modelu bezpieczeństwa Deno. Obsługa .npmrc umożliwia korzystanie z prywatnych scentralizowanych rejestrów, co jest krytyczne w korporacyjnych środowiskach z wewnętrznymi pakietami.

Dodanie wsparcia dla gRPC poprzez @grpc/grpc-js rozszerza zestaw możliwości Deno w kontekście komunikacji między usługami i integracji z usługami chmurowymi, np. Google Cloud. To wpływa zarówno na projekty microservices, jak i na natywne integracje z istniejącymi systemami.

Poprawki kompatybilności z Node i ponowne włączenie V8 pointer compression przekładają się na lepszą zgodność ekosystemu oraz wymierne korzyści wydajnościowe. Dodatkowo zmiany w API (np. Request.bytes, Response.bytes) i w narzędziach deweloperskich czynią Deno coraz bardziej praktycznym wyborem dla produkcyjnych aplikacji serwerowych.

Dla architektów to sygnał, że Deno się „dojrzewa”: z eksperymentalnego runtime staje się realną alternatywą dla Node w wielu scenariuszach — zwłaszcza tam, gdzie ważne są izolacja, bezpieczeństwo importów i prostota deploymentu.

**Key takeaways:**
- Prywatne rejestry npm w Deno pozwalają na bezpieczne użycie wewnętrznych pakietów.
- gRPC i lepsza kompatybilność z Node zwiększają praktyczność Deno w systemach rozproszonych.
- Optymalizacje V8 i nowe API poprawiają wydajność i ergonomię deweloperską.

**Link:** [Deno 1.44: Private npm registries, improved Node.js compat, and performance boosts](https://deno.com/blog/v1.44)

## Zero-JavaScript View Transitions (Astro)
**TLDR:** Astro wykorzystuje nowe możliwości View Transition API w przeglądarkach (Chrome/Edge 126) do osiągnięcia natywnych, animowanych przejść między stronami bez dodatkowego JavaScriptu po stronie klienta.

**Summary:**
View Transition API to istotna ewolucja platformy webowej: dotychczas animowane, „app-like” przejścia między stronami wymagały routera po stronie klienta. Astro, który dotychczas oferował shim z JS, teraz eksponuje sposób na użycie natywnych, cross-document transitions bez wysyłania własnego JavaScriptu — o ile przeglądarka użytkownika ją wspiera.

Implementacja polega głównie na deklaracji CSS z regułą @view-transition i ustawieniu navigation: auto. Jeśli przeglądarka obsługuje cross-document view transitions, kliknięcie linku uruchamia animację w ramach natywnego procesu nawigacji, mimo że faktycznie następuje pełne ładowanie strony. Dla użytkownika oznacza to płynniejsze przejścia bez kosztu utrzymania SPA.

To rozwiązanie ma duże implikacje dla architektury stron: umożliwia zachowanie modelu multi-page (pełne odświeżenia, prostota SEO, prostota serwowania statycznych treści) przy zachowaniu wrażeń aplikacyjnych. Dla zespołów to szansa na uproszczenie stacku — mniej JS do utrzymania, mniej okazji do błędów rutingu.

Oczywiście, to zależy od przyjęcia przez przeglądarki. Astro zachowuje kompatybilność — jeśli przeglądarka nie wspiera API, strona działa normalnie bez animacji. Dla architektów to przykład dobrego stopniowego przyjęcia nowych API platformy webowej: korzystać tam, gdzie dostępne, a nie tracić kompatybilności tam, gdzie ich brak.

**Key takeaways:**
- View Transition API pozwala na animowane przejścia między stronami bez mechaniki SPA.
- Astro wspiera zero-JS transitions; wystarczy deklaracja CSS, a fallback działa bez animacji.
- To szansa na lepszy UX przy utrzymaniu zalet multi-page architecture.

**Link:** [Zero-JavaScript View Transitions | Astro](https://astro.build/blog/future-of-astro-zero-js-view-transitions/)

## feat(cli): Add experimental react-compiler support — expo/expo (Pull Request #29168)
**TLDR:** Expo dodało eksperymentalne wsparcie dla React Compiler (przez PR do repozytorium), co sugeruje kierunek, w którym ecosystem mobilny i webowy eksploruje kompilację komponentów dla lepszej optymalizacji.

**Summary:**
Pull request w repozytorium Expo wprowadza eksperymentalne wsparcie dla react-compiler — elementu, który może umożliwić przetwarzanie komponentów React na etapie builda w bardziej zaawansowany sposób. Tego typu kompilatory mogą redukować runtimeową pracę, eliminować nadmiarowe warstwy abstrakcji i tworzyć bardziej predykcyjne, zoptymalizowane wyjścia builda.

Dla twórców Expo i aplikacji cross-platformowych to duża rzecz: web i natywny kod mogą skorzystać z tego samego procesu kompilacji, co może poprawić wydajność i zmniejszyć overhead. PR pokazuje także praktyczne wyzwania: testy, zgodność z różnymi modułami (CJS/ESM), i integracja z toolchainami jak Metro.

Warto traktować ten PR jako wczesny sygnał trendu — kolejne warstwy narzędzi zaczynają przenosić pracę z runtime do build-time. To przesunięcie konsekwentnie podnosi wydajność, ale także zmienia proces debugowania i model mentalny deweloperów. W praktyce wymaga dobrze zaprojektowanych narzędzi diagnostycznych i jasnych migracji.

Dla zespołów budujących na Expo należy obserwować rozwój tej funkcji i testować ją eksperymentalnie na mniejszych komponentach, zanim wprowadzimy do krytycznych ścieżek produkcyjnych.

**Key takeaways:**
- Expo eksperymentuje z react-compiler, co może przenieść więcej pracy do build-time i poprawić wydajność.
- Integracja kompilatorów wymaga ostrożności: testy, zgodność modułów i narzędzia diagnostyczne są kluczowe.
- To część większego trendu: przenoszenie kosztów z runtime do build-time w ekosystemie React.

**Link:** [feat(cli): Add experimental react-compiler support — expo/expo · Pull Request #29168](https://github.com/expo/expo/pull/29168)

## Optimizing INP for a React App & Performance Learnings
**TLDR:** Głęboka, praktyczna analiza optymalizacji metryki INP (Interaction to Next Paint) dla aplikacji React — od sposobów pomiaru i profilowania po konkretne strategie łagodzenia opóźnień w event handlers i prezentacji.

**Summary:**
Autor opisuje swoją pracę nad poprawą INP na stronie wyników wyszukiwania, która ma wiele elementów interaktywnych. INP mierzy najgorszą istotną interakcję z sesji użytkownika, więc skupia się na tym, co daje największy negatywny wpływ na UX. Artykuł dzieli interakcję na trzy fazy: delay wejściowy (czas przed uruchomieniem handlera), czas przetwarzania (wykonywanie handlerów) i prezentację (render/paint).

Metody debugowania obejmują użycie DevTools Performance, React Profiler i gromadzenie metryk z realnych użytkowników poprzez web-vitals. Autor opisuje konkretne wzory problemów: długie operacje synchronizowane w handlerach, nieoptymalne aktualizacje stanu, blokujące zadania drenujące główny wątek. Przyczyną może być także zbyt duże drzewo DOM lub kosztowne style/layouty — to powiązane tematy.

Rozwiązania, które przyniosły efekty, to przesunięcie pracy do Web Workers lub do asynchronous tasks, dekompozycja dużych handlerów, throttling/debouncing tam, gdzie to sensowne, a także optymalizacje renderowania Reacta: granularne dzielenie komponentów, useTransition / startTransition gdzie ma to sens, i ograniczanie rerenderów przez memoizację selektorów. Autor podkreśla, że każda optymalizacja musi być zweryfikowana danymi — lokalne micro-optimizations bez pomiaru mogą być strata czasu.

To praktyczny tekst dla inżynierów frontendu: pokazuje narzędzia i strategie, które można zastosować natychmiast oraz jak mierzyć wpływ zmian na realnych użytkowników.

**Key takeaways:**
- INP koncentruje się na najgorszej istotnej interakcji i wymaga analizy trzech faz interakcji.
- Profilowanie (DevTools + React Profiler) i RUM (web-vitals) to kombinacja, która pozwala zidentyfikować prawdziwe bottlenecks.
- Przesuwanie pracy poza main thread, dekompozycja handlerów i ograniczanie rerenderów Reacta przynosi największe korzyści.

**Link:** [Optimizing INP for a React App & Performance Learnings](https://www.iamtk.co/optimizing-inp-for-a-react-app-and-performance-learnings/)

## How Deep is Your DOM? | Frontend at Scale
**TLDR:** Eksperymenty i analiza pokazują, że głębokość DOM (maksymalna zagnieżdżenie elementów) wpływa na koszty przeszukiwania drzewa, style calculations i pamięć — warto dbać nie tylko o liczbę elementów, ale też o ich strukturę.

**Summary:**
Autorski eksperyment porównuje płytkie i głębokie drzewa DOM o tej samej liczbie elementów, mierząc koszt przeglądarkowych operacji. Intuicyjnie, głębsze drzewo wymaga więcej „skoków” aby dostać się do konkretnego elementu, co przekłada się na wyższe koszty czasowe przy operacjach traversingu. W praktyce autor pokazuje, że różnice w czasie i pamięci są zauważalne przy skali i przy ograniczonych zasobach (np. urządzenia mobilne).

Wnioski są praktyczne: design DOM powinien dążyć do równowagi — nie zawsze minimalna liczba elementów wystarczy; struktura ma znaczenie. Głębokie komponenty wynikają często z nieprzemyślanej kompozycji UI, zbyt wielu wrapperów, lub z bibliotek, które nie dbają o flattening. To również wpływa na style recalculation i layout, bo zmiana wysoko w drzewie może wymusić przepłynięcie zmian przez wiele poziomów.

Autor proponuje konkretne techniki: redukcja zbędnych wrapperów, użycie CSS zamiast dodatkowych elementów dla stylizacji, zwracanie uwagi na biblioteki komponentów i ich efekty na strukturę DOM. Przy projektowaniu skalowalnych interfejsów warto profilować DOM i nie polegać wyłącznie na heurystykach.

To ważny przypomnienie architektoniczne: struktura drzewa to nie tylko estetyka DOM — to realny czynnik wpływający na wydajność i pamięć, szczególnie przy złożonych aplikacjach frontendowych.

**Key takeaways:**
- Maksymalna głębokość DOM wpływa na koszty traversingu, style calculations i użycie pamięci.
- Redukcja nadmiernych wrapperów i użycie CSS zamiast elementów może znacznie poprawić wydajność.
- Profilowanie DOM jest niezbędne przy optymalizacji dużych aplikacji frontendowych.

**Link:** [How Deep is Your DOM? | Frontend at Scale](https://frontendatscale.com/blog/how-deep-is-your-dom/)

