---
title: "React Query, Next.js 15, GraphQL i narzędzia developerskie - przegląd najważniejszych nowości"
excerpt: "Omówienie zmian w cachowaniu Next.js 15, problemów z GraphQL oraz optymalizacji narzędzi buildowych"
publishedAt: "2024-12-19"
slug: "nextjs-15-graphql-narzedzia-developerskie-przeglad"
hashtags: "#generated #pl #frontend #react #typescript #nextjs #graphql #esbuild #gleam #codesandbox #fusionauth #apryse"
---

## Next.js 15 - Zmiany w Cachowaniu

**TLDR:** Next.js 15 RC wprowadza znaczące zmiany w strategii cachowania - fetch requesty, GET Route Handlers i nawigacja po stronie klienta nie są już domyślnie cache'owane. To odpowiedź zespołu Next.js na feedback społeczności o zbyt agresywnych domyślnych ustawieniach.

**Summary:**

To jest naprawdę interesujący moment w ewolucji Next.js. Pamiętam, jak gdy po raz pierwszy App Router został wprowadzony, zespół Vercel bardzo mocno promował ideę "domyślnie najwydajniejszych opcji". Brzmiało to świetnie w teorii - kto nie chciałby mieć super szybkiej aplikacji out of the box? Ale rzeczywistość okazała się bardziej skomplikowana.

Problem z agresywnym cachowaniem polega na tym, że działa świetnie w bardzo specyficznych scenariuszach, ale staje się prawdziwym koszmarem, gdy próbujesz zintegrować się z zewnętrznymi API czy bibliotekami, które mają własne mechanizmy zarządzania danymi. Wyobraźcie sobie sytuację, gdzie wasza aplikacja używa fetch'a wewnątrz jakiejś biblioteki third-party, a wy nawet nie wiecie, że te requesty są cache'owane. Debugowanie takich problemów to była prawdziwa mordęga.

Co mi się podoba w tej zmianie, to że Next.js nie próbuje nas "edukować" o tym, dlaczego się myliliśmy. Zamiast tego słuchają feedbacku i dostosowują się do rzeczywistych potrzeb developerów. To pokazuje dojrzałość frameworka i zespołu za nim stojącego. Oczywiście, możliwość opt-in do cachowania nadal istnieje, więc jeśli wiecie, co robicie i chcecie tej wydajności, możecie ją mieć.

Wsparcie dla React 19 RC i eksperymentalnego React Compiler to również ważne sygnały. React Compiler to technologia, która może całkowicie zmienić sposób, w jaki myślimy o optymalizacjach w React - automatyczne memoization bez konieczności używania useMemo i useCallback wszędzie. Partial Prerendering to z kolei próba pogodzenia zalet static generation z dynamicznym contentem.

Nowy design create-next-app i flaga --turbo pokazują, że zespół pracuje nad całym developer experience, nie tylko nad samym frameworkiem. Turbopack w development mode to ogromny boost dla produktywności, szczególnie w większych projektach.

**Key takeaways:**

- Next.js staje się mniej opiniotwórczy w kwestii cachowania, dając developerom większą kontrolę
- Wsparcie dla React 19 i eksperymentalnego React Compiler otwiera nowe możliwości optymalizacji
- Zmiany pokazują, że zespół Next.js słucha feedbacku społeczności i dostosowuje się do rzeczywistych potrzeb

**Link:** [Bytes #294 - The Vercel Homophone](https://click.convertkit-mail4.com/4zunmg0drgbeh5dm32whqu30rvv77t5/48hvh7urv62gl2sx/aHR0cHM6Ly9ieXRlcy5kZXYvYXJjaGl2ZXMvMjk0)

## Dlaczego po 6 latach rezygnuję z GraphQL

**TLDR:** Doświadczony developer wyjaśnia, dlaczego po latach pracy z GraphQL w produkcji nie poleca już tej technologii większości projektów, wskazując na problemy z bezpieczeństwem, performance'em i maintainability.

**Summary:**

Ten artykuł to naprawdę szczera i przemyślana analiza GraphQL z perspektywy kogoś, kto nie jest hejterem tej technologii, ale po prostu przeszedł przez pełny cykl - od entuzjazmu, przez implementację w produkcji, aż do rozczarowania. I to jest właśnie ten typ refleksji, którego potrzebujemy więcej w naszej branży.

Autor bardzo dobrze opisuje początkową fascynację GraphQL. Pamiętam te czasy - po latach pracy z nieotypowanymi REST API, GraphQL rzeczywiście wydawał się jak zbawienie. Jedna końcówka, silne typowanie, możliwość pobrania dokładnie tych danych, których potrzebujesz. Brzmiało jak rozwiązanie wszystkich problemów.

Ale prawdziwe problemy pojawiają się dopiero w produkcji, szczególnie gdy zaczynasz myśleć o bezpieczeństwie i performance'ie. Kwestia autoryzacji to prawdziwy koszmar - w REST masz kilkadziesiąt endpointów do zabezpieczenia, w GraphQL masz potencjalnie tysiące kombinacji pól i relacji. Każde pole może wymagać innej logiki autoryzacji w zależności od kontekstu, w jakim jest pobierane.

Rate limiting to kolejny problem, o którym mało kto myśli na początku. W REST można założyć, że każdy request ma mniej więcej podobny koszt. W GraphQL jeden query może być trywialny, a drugi może zrobić join'a na pięciu tabelach i zwrócić megabajty danych. Jak to ograniczać? Query complexity analysis, depth limiting, timeout'y - to wszystko to dodatkowa złożożność, którą musisz implementować i maintainować.

Introspection to kolejny problem bezpieczeństwa. W REST twoje API jest "ukryte" - atakujący musi zgadywać endpointy. W GraphQL z włączoną introspection dostajesz kompletną mapę wszystkich dostępnych danych. Oczywiście można ją wyłączyć w produkcji, ale wtedy tracisz jedną z głównych zalet GraphQL - samodokumentację.

Co mi się podoba w tym artykule, to że autor nie mówi "GraphQL is bad", tylko "GraphQL może nie być najlepszym wyborem dla większości projektów". To jest ważne rozróżnienie. GraphQL nadal ma swoje miejsce - w dużych organizacjach z wieloma zespołami, gdzie korzyści przeważają nad kosztami złożożości. Ale dla typowego web app'a? REST z dobrym typingiem (np. OpenAPI + generowane typy) może być znacznie prostszym rozwiązaniem.

**Key takeaways:**

- GraphQL wprowadza znaczną złożożość w obszarach bezpieczeństwa, autoryzacji i rate limiting'u
- Korzyści GraphQL mogą nie przeważać nad kosztami maintainability w większości projektów
- REST z dobrym typingiem może być prostszą alternatywą dla typowych aplikacji webowych

**Link:** [Why, after 6 years, I'm over GraphQL](https://click.convertkit-mail4.com/4zunmg0drgbeh5dm32whqu30rvv77t5/kkhmh2ulr69mwpal/aHR0cHM6Ly9iZXNzZXkuZGV2L2Jsb2cvMjAyNC8wNS8yNC93aHktaW0tb3Zlci1ncmFwaHFsLw==)

## O ograniczeniach i wolności w projektowaniu API

**TLDR:** Zespół Canvas Kit dzieli się lekcjami o tym, jak zbyt duża swoboda w API może prowadzić do chaosu, i dlaczego przemyślane ograniczenia często zwiększają produktywność developerów zamiast ją hamować.

**Summary:**

To jest fascynujący case study o tym, jak dobre intencje mogą prowadzić do nieoczekiwanych problemów w projektowaniu API. Historia Canvas Kit pokazuje klasyczny błąd, który popełniają zespoły tworzące biblioteki komponentów - mylenie wolności wyboru z produktywnością.

Na początku zespół Canvas Kit miał bardzo szlachetne założenie: "chcemy pomagać wam być produktywnymi, nie mówić wam, jak być produktywnymi". Brzmi świetnie, prawda? Kto nie chciałby mieć wyboru między różnymi sposobami stylowania - styled functions, object styles, style props. Każdy zespół może wybrać to, co mu najbardziej odpowiada.

Ale rzeczywistość okazała się zupełnie inna. Po kilku latach mieli kompletny chaos - zespoły mieszały różne wzorce stylowania bez zrozumienia dlaczego, kombinowały je w nielogiczny sposób, a cognitive load związany z podejmowaniem decyzji o tym, którego API użyć, był ogromny.

To jest świetny przykład tego, co nazywam "paradoksem wyboru" w kontekście developer experience. Zbyt wiele opcji nie zwiększa produktywności - przeciwnie, paraliżuje. Każda decyzja, nawet tak prosta jak "jakiego API użyć do stylowania", zabiera mentalną energię, którą można by przeznaczyć na rozwiązywanie rzeczywistych problemów biznesowych.

Rozwiązanie w postaci Stencils to doskonały przykład przemyślanych ograniczeń. Jeden sposób stylowania, ale na tyle elastyczny, żeby pokryć większość use case'ów. Plus bonus w postaci unikania runtime cost Emotion i przygotowania na bardziej CSS-first approach. Co ciekawe, zespoły same zaczęły wybierać Stencils, mimo że stare API nadal były dostępne - bo redukcja cognitive load okazała się ważniejsza niż wolność wyboru.

Ta historia przypomina mi ewolucję React Hooks. Na początku mieliśmy class components i function components, różne lifecycle methods, różne sposoby zarządzania stanem. Hooks uprościły to wszystko do jednego, spójnego modelu mentalnego. Czy ograniczyło to naszą wolność? Technicznie tak. Czy zwiększyło produktywność? Absolutnie.

Kluczowa lekcja z tej historii to "sztuka tego zawodu polega na znalezieniu właściwych ograniczeń". Nie chodzi o blokowanie produktywności, ale o kanalizowanie jej w coś potężnego. To jest właśnie różnica między dobrym a świetnym developer experience.

**Key takeaways:**

- Zbyt duża swoboda wyboru w API może prowadzić do chaosu i obniżenia produktywności
- Przemyślane ograniczenia często zwiększają produktywność, redukując cognitive load
- Najlepsze narzędzia developerskie pozwalają zapomnieć o sobie i skupić się na tworzeniu

**Link:** [On Constraints and Freedom](https://click.convertkit-mail4.com/4zunmg0drgbeh5dm32whqu30rvv77t5/25h2h9u264odwri3/aHR0cHM6Ly93d3cuYWxhbmJzbWl0aC5kZXYvd3JpdGluZy9vbi1jb25zdHJhaW50cy1hbmQtZnJlZWRvbQ==)

## Jak esbuild zredukował nasze czasy buildowania o 90%

**TLDR:** Zespół 1Password przeprowadził migrację systemu budowania swojego rozszerzenia przeglądarki z rozwiązania opartego na make na esbuild, redukując czas warm build z 70 sekund do kilku sekund dzięki hackathon'owi i systematycznemu profilowaniu.

**Summary:**

To jest świetny przykład tego, jak technical debt może się kumulować przez lata i jak czasem potrzeba radykalnego podejścia, żeby go spłacić. Historia 1Password pokazuje klasyczny problem - system budowania, który był tworzony iteracyjnie przez pięć lat, stał się tak wolny, że blokował produktywność całego zespołu.

70 sekund na warm build to naprawdę dużo. To wystarczająco długo, żeby developer stracił focus, sprawdził Twittera, może poszedł po kawę. A gdy mnożysz to przez dziesiątki developerów i setki buildów dziennie, to ogromna strata produktywności. Plus frustracja - nie ma nic gorszego niż czekanie na build, żeby przetestować małą zmianę.

Co mi się podoba w tym podejściu, to jak systematycznie podeszli do problemu. Zamiast zgadywać, gdzie jest bottleneck, zbudowali system profilowania oparty na make SHELL. To sprytne rozwiązanie - wykorzystanie mechanizmu make'a do uruchamiania custom shell'a, który loguje każdą komendę z timestampem. Proste, ale skuteczne.

Hackathon jako format do tego typu projektów to również świetny pomysł. Przepisanie systemu budowania to nie jest coś, co robi się w międzyczasie - to wymaga skupienia i czasu na eksperymentowanie. Hackathon daje legitymację do odłożenia feature'ów na bok i skupienia się na developer experience.

esbuild jako wybór to też nie przypadek. To narzędzie zostało zaprojektowane od podstaw z myślą o performance'ie - napisane w Go, masywnie zrównoleglone, z inteligentnym bundling'iem. Ale co ważniejsze, ma dobre API do programatycznego użycia, co pozwala na integrację z istniejącymi workflow'ami.

Rezultat - 90% redukcja czasu buildowania - to nie tylko liczba. To zmiana jakościowa w developer experience. Gdy build trwa kilka sekund zamiast minuty, można wejść w flow state. Można eksperymentować z kodem bez frustracji. Onboarding nowych developerów staje się prostszy.

Ta historia to również reminder o tym, jak ważne jest regularne inwestowanie w tooling i developer experience. Technical debt w systemach budowania jest często ignorowany, bo "działa", ale koszt w postaci straconej produktywności może być ogromny.

**Key takeaways:**

- Długie czasy buildowania znacząco wpływają na produktywność i satisfaction developerów
- Systematyczne profilowanie jest kluczowe dla identyfikacji rzeczywistych bottleneck'ów
- Inwestowanie w developer experience i tooling ma bezpośredni wpływ na produktywność zespołu

**Link:** [How we used esbuild to reduce our browser extension build times by 90%](https://click.convertkit-mail4.com/4zunmg0drgbeh5dm32whqu30rvv77t5/qvh8h8urzo6np7al/aHR0cHM6Ly9ibG9nLjFwYXNzd29yZC5jb20vbmV3LWV4dGVuc2lvbi1idWlsZC1zeXN0ZW0v)

## Skalowanie infrastruktury microVM z low-latency dekompresją pamięci

**TLDR:** CodeSandbox opracował system hibernacji i wznawiania mikroVM w czasie poniżej sekundy, używając zaawansowanych technik kompresji pamięci i lazy loading'u, co pozwala na obsługę 150,000 nowych VM miesięcznie przy kontrolowanych kosztach.

**Summary:**

To jest naprawdę imponujący engineering feat. CodeSandbox rozwiązuje problem, który jest fundamentalny dla każdej platformy cloud computing - jak szybko i tanio skalować środowiska developerskie. 150,000 nowych mikroVM miesięcznie to ogromna skala, a konieczność utrzymania kosztów w ryzach przy jednoczesnym zapewnieniu świetnego user experience to prawdziwe wyzwanie.

Koncepcja hibernacji VM zamiast ich wyłączania to brilliant. Podobnie jak z laptopem - gdy zamykasz MacBook'a, nie wyłącza się, tylko idzie w sleep mode. Wszystkie procesy, otwarte aplikacje, stan pamięci - wszystko zostaje zachowane. W kontekście środowisk developerskich to ogromna wartość, bo dev server, Language Server Protocol, wszystkie te narzędzia, które potrzebują czasu na inicjalizację, pozostają gotowe do pracy.

Techniczne rozwiązanie z userfaultfd to naprawdę smart approach. Zamiast ładować całą pamięć VM na start, ładują tylko te strony, których VM rzeczywiście potrzebuje. To lazy loading na poziomie pamięci systemowej. Gdy VM próbuje dostać się do jakiejś strony pamięci, kernel generuje page fault, a ich system go przechwytuje i dostarcza odpowiednią stronę z compressed snapshot'u.

Kompresja pamięci to kolejny ciekawy aspekt. Pamięć VM zawiera dużo redundantnych danych - zero pages, podobne struktury danych, powtarzające się wzorce. Dobry algorytm kompresji może zredukować rozmiar snapshot'u o 70-80%. A gdy dodasz do tego lazy loading, nie musisz dekompresować całego snapshot'u - tylko te części, których VM aktualnie potrzebuje.

Co mi się szczególnie podoba w tym rozwiązaniu, to jak dobrze skaluje się ekonomicznie. Możesz być agresywny z hibernacją - 5 minut nieaktywności dla darmowych użytkowników to bardzo krótko. Ale gdy wznowienie trwa sekundę, użytkownik praktycznie nie zauważa różnicy. To pozwala na dramatyczne zmniejszenie kosztów infrastruktury przy minimalnym wpływie na UX.

Ta technologia ma również szersze implikacje. Podobne podejście można zastosować do serverless functions, container'ów, a nawet tradycyjnych aplikacji. Każde miejsce, gdzie masz trade-off między czasem startu a kosztami utrzymania, może skorzystać z tego typu optymalizacji.

**Key takeaways:**

- Hibernacja VM zamiast wyłączania pozwala na zachowanie stanu środowiska developerskiego przy dramatycznej redukcji kosztów
- Lazy loading pamięci z userfaultfd umożliwia szybkie wznowienie bez konieczności ładowania całego snapshot'u
- Kombinacja kompresji pamięci i lazy loading'u pozwala na agresywne skalowanie przy kontrolowanych kosztach

**Link:** [How we scale our microVM infrastructure using low-latency memory decompression](https://click.convertkit-mail4.com/4zunmg0drgbeh5dm32whqu30rvv77t5/9qhzhdup0z29rxu9/aHR0cHM6Ly9jb2Rlc2FuZGJveC5pby9ibG9nL2hvdy13ZS1zY2FsZS1vdXItbWljcm92bS1pbmZyYXN0cnVjdHVyZS11c2luZy1sb3ctbGF0ZW5jeS1tZW1vcnktZGVjb21wcmVzc2lvbg==)

## Fault Tolerant Gleam - Gleam v1.2.0

**TLDR:** Gleam v1.2.0 wprowadza fault tolerant compilation, który pozwala kompilerowi kontynuować analizę mimo błędów, dramatycznie poprawiając experience language server'a i umożliwiając developerom widzenie wielu błędów jednocześnie.

**Summary:**

Gleam to jeden z tych języków, które pokazują, jak można świeżo podejść do znanych problemów. Type safe, funkcyjny język, który działa na Erlang VM i JavaScript runtime'ach - to już samo w sobie brzmi interesująco. Ale to, co robi v1.2.0 z fault tolerant compilation, to naprawdę przemyślana ewolucja developer experience.

Tradycyjne podejście kompilerów - "stop at first error" - ma swoje zalety. Dostajesz pierwszy, najważniejszy błąd, bez cascade'owych błędów, które mogą mylić. Ale ma też ogromne wady, szczególnie w kontekście language server'ów. Gdy language server używa kompilatora do analizy kodu, a kompiler się zatrzymuje na pierwszym błędzie, language server zostaje bez aktualnych informacji o projekcie.

To jest szczególnie problematyczne podczas dużych refaktoringów. Wyobraźcie sobie, że zmieniasz sygnaturę funkcji, która jest używana w dziesiątkach miejsc. Kompiler zatrzymuje się na pierwszym użyciu, language server traci synchronizację z kodem, a wy nie macie feedback'u o pozostałych miejscach, które trzeba poprawić. To frustrujące i nieproduktywne.

Fault tolerant compilation w Gleam rozwiązuje ten problem elegancko. Gdy kompiler napotka błąd podczas analizy, przechodzi do następnej definicji w module, zbiera wszystkie błędy, i zwraca je razem z zaktualizowanymi informacjami o kodzie. Language server pozostaje responsywny i dokładny, nawet gdy kod ma błędy.

Co ciekawe, zespół Gleam planuje rozszerzenie tego podejścia na fault tolerant parsing. To kolejny krok w kierunku jeszcze lepszego developer experience. Gdy parser potrafi "naprawić" syntaktyczne błędy i kontynuować parsowanie, language server może dostarczać użyteczne informacje nawet w kodzie z błędami składniowymi.

Usprawnienia w language server'ze dla import'ów to również ważna zmiana. Autocompletowanie typów i wartości w unqualified imports, hover documentation, go-to definition - to wszystko to funkcje, które sprawiają, że praca z językiem staje się płynniejsza i przyjemniejsza.

Single line pipelines to może wydawać się małą zmianą, ale dla języka, który mocno polega na pipe operator, to może mieć duży wpływ na readability kodu. Czasem krótki pipeline lepiej wygląda w jednej linii, a automatyczne formatowanie na wiele linii może być zbyt agresywne.

Gleam pokazuje, jak można budować język z myślą o developer experience od samego początku. To nie są afterthought'y - to fundamentalne decyzje designowe, które wpływają na codzienną pracę z językiem.

**Key takeaways:**

- Fault tolerant compilation dramatycznie poprawia experience language server'a, szczególnie podczas refaktoringów
- Możliwość widzenia wielu błędów jednocześnie zwiększa produktywność w porównaniu do "stop at first error"
- Gleam pokazuje, jak można projektować język z myślą o developer experience od podstaw

**Link:** [Fault tolerant Gleam | Gleam programming language](https://click.convertkit-mail4.com/4zunmg0drgbeh5dm32whqu30rvv77t5/3ohphdu704dzg9hr/aHR0cHM6Ly9nbGVhbS5ydW4vbmV3cy9mYXVsdC10b2xlcmFudC1nbGVhbS8=)
