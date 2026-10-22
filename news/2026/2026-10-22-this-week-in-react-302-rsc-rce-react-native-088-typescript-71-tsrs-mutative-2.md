---
title: "This Week In React #302: luki RCE w React Server Components, React Native 0.88, TypeScript 7.1 beta, tsrs i Mutative 2.0"
excerpt: "Krytyczna luka w React Server Components i aktualizacja Next.js, DevTools dla agentów, React Native 0.88 bez zmian łamiących, beta TypeScript 7.1, port TypeScripta do Rusta i Mutative 2.0."
publishedAt: "2026-10-22"
slug: "this-week-in-react-302-rsc-rce-react-native-088-typescript-71-tsrs-mutative-2"
hashtags: "#thisweekinreact #react #reactnative #nextjs #typescript #security #server-components #agents #generated #pl"
source_pattern: "This Week In React"
---

## Zdalne wykonanie kodu w React Server Components i poprawka Next.js

**TLDR:** Opublikowano poradnik bezpieczeństwa o nieuwierzytelnionym zdalnym wykonaniu kodu w pakietach react-server-dom. Next.js wydał wersje 16.4.1 i 15.5.28, które łatają tę i dwie inne luki.

**Summary:** Zagrożone są pakiety react-server-dom-webpack, -parcel i -turbopack w wersjach od 19.0.0 do 19.0.8, od 19.1.0 do 19.1.9, od 19.2.0 do 19.2.8 oraz 19.3.0. Poprawki wyszły w 19.0.9, 19.1.10, 19.2.9 i 19.3.1. Autorzy zaznaczają, że to dotyczy skrajnie rzadkich przypadków, gdy odpowiedź przenosi kilka tablic typowanych razem z wartością kontrolowaną przez atakującego. Aplikacje bez serwera albo bez frameworka obsługującego RSC nie są dotknięte.

Next.js opisuje trzy problemy. Pierwszy to krytyczne RCE, gdy funkcja z dyrektywą use cache zwraca kilka tablic typowanych w App Routerze z Cache Components, i nie ma obejścia. Drugi to krytyczne RCE w API optymalizacji obrazów dla SVG na Linuksie z glibc, gdzie obejściem jest sharp w wersji 0.35.5 lub nowszej. Trzeci to wysokiej wagi odmowa usługi w App Routerze, gdy istnieje choć jedna akcja serwerowa. Pages Router i aplikacje bez akcji serwerowych są bezpieczne.

**Key takeaways:**
- Zaktualizuj React do 19.0.9, 19.1.10, 19.2.9 lub 19.3.1, jeśli używasz RSC.
- Zaktualizuj Next.js do 16.4.1 lub 15.5.28, nawet jeśli nie widzisz użycia use cache.
- Sprawdź wersję sharp przy generowaniu obrazów SVG.

**Why do I care:** Tu nie ma dyskusji, to aktualizacja na dziś. Mnie bardziej niepokoi powtarzalność, bo to kolejny rok, w którym warstwa serializacji RSC dostarcza krytycznych luk. Jeśli aplikacja ma publiczny endpoint z Server Actions, wpisz sprawdzanie poradników bezpieczeństwa do rutyny zespołu.

**Link:** [Unauthenticated Remote Code Execution in React Server Components](https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3)

**Link:** [Next.js Security Update for Upstream Vulnerabilities](https://nextjs.org/blog/nextjs-security-update-october-14-2026)

## React DevTools dla agentów

**TLDR:** Pakiet react-devtools-cdt-mcp daje agentom kodującym ten sam widok aplikacji co React DevTools, czyli drzewo komponentów, propsy, hooki i czasy renderowania.

**Summary:** Agent sterujący przeglądarką przez Chrome DevTools MCP widzi DOM, ale nie wie, który komponent wyrenderował przycisk, jaki ma stan ani dlaczego interakcja była wolna. Pakiet importuje się na samym początku pliku wejściowego, przed react-dom, i rejestruje grupę narzędzi, które Chrome DevTools MCP odkrywa automatycznie. To nie jest serwer MCP, tylko biblioteka działająca wewnątrz strony.

Narzędzia pozwalają znaleźć komponenty po nazwie, pobrać propsy i hooki, sprawdzić stos właścicieli i miejsce definicji oraz nagrać profil renderowania z raportem dla każdego commita. Dokumentacja ostrzega, że pakiet każe Reactowi raportować każdy commit, więc należy go dołączać wyłącznie do buildów deweloperskich. Identyfikatory komponentów nie przetrwają przeładowania strony.

**Key takeaways:**
- Import musi być przed Reactem, inaczej drzewo będzie puste.
- Tylko wersje deweloperskie.
- Dane o źródłach i stosach właścicieli istnieją tylko w devie.

**Why do I care:** To praktyczny krok w stronę agentów, którzy debugują wydajność, a nie tylko piszą kod. Zanim jednak dasz agentowi dostęp do profilera, zdecyduj, czy chcesz, żeby widział propsy z danymi użytkowników na środowisku testowym.

**Link:** [React DevTools for agents](https://react.dev/reference/dev-tools/react-devtools-cdt-mcp)

## React Native 0.88

**TLDR:** Trzecie wydanie React Native bez zmian łamiących. Zdarzenia idą domyślnie ścieżką zgodną z siecią, jest wsparcie dla fontów zmiennych i SceneDelegate na iOS.

**Summary:** Największa zmiana runtime'u to wysyłanie zdarzeń przez API EventTarget z W3C zamiast starego systemu wtyczek. Zdarzenia mają prawdziwą fazę przechwytywania i bąbelkowania, a w kanale Canary natywne referencje dostają addEventListener i dispatchEvent. Dla zwykłego kodu nic się nie ma zmienić, ale ryzykują biblioteki sięgające do wnętrza systemu zdarzeń.

Fonty zmienne działają w Text i TextInput dzięki fontVariationSettings. Moduły Java TurboModules przyjmują ArrayBuffer, więc binarne dane nie muszą być kodowane jako tekst. Od iOS 27 Apple wymaga cyklu życia UIScene, więc aplikacje budowane w Xcode 27 bez niego się nie uruchomią. React Native dodaje obsługę SceneDelegate, na razie dla jednej sceny. Swift Package Manager pozostaje eksperymentalny, a plan jest taki, że w 0.89 stanie się domyślny, z opcją powrotu do CocoaPods. Wersja podbija React do 19.3.0 i Metro do 0.87.

**Key takeaways:**
- Aktualizacja z 0.87 nie powinna wymagać zmian w kodzie aplikacji.
- Migracja do SceneDelegate jest konieczna przed Xcode 27.
- CocoaPods ma zniknąć w jednym z kolejnych wydań.

**Why do I care:** Jeśli utrzymujesz aplikację na iOS, termin Xcode 27 jest realnym ryzykiem, a nie ciekawostką. Zaplanuj migrację na SceneDelegate teraz, bo template społeczności już ją ma, więc masz wzór do porównania.

**Link:** [React Native 0.88](https://reactnative.dev/blog/2026/10/19/react-native-0.88)

## TypeScript 7.1 beta i tsrs

**TLDR:** TypeScript 7.1 beta dodaje atrybuty importu w deklaracjach ambient, API dla narzędzi i content mappers, a do tego jest do 2,5 raza szybszy od 7.0. Cloudflare i VoidZero równolegle rozwijają port do Rusta o nazwie tsrs.

**Summary:** Atrybuty importu pozwalają teraz poprawnie typować importy plików CSS, tekstowych i bajtowych, a brak wymaganego atrybutu daje błąd. Dojdzie import źródłowy dla WebAssembly, stabilny cel es2026 oraz nowe metody biblioteczne. Najważniejsze są nowe punkty wejścia API, jak typescript/sync i typescript/async, oraz migawki, które pozwalają przeliczać program po zmianach plików bez budowania wszystkiego od zera. Do tego dochodzą content mappers, czyli wtyczki, które pokazują TypeScriptowi pliki Vue, Svelte czy Astro, uruchamiane tylko z flagą wymuszającą zgodę, bo to wykonywalny kod zewnętrzny.

Liczby są konkretne. Na projekcie mui-docs czas spadł z 22,2 do 11,9 sekundy, a pamięć z 8093 do 4079 MiB. Na vscode zysk to około 18 procent. Wydanie finalne ma pojawić się mniej więcej za miesiąc po kandydacie.

Cloudflare twierdzi, że tsrs jest do 8 razy szybszy i zużywa około 70 procent mniej pamięci niż TypeScript 7.0 przy tej samej liczbie wątków. Zastrzega, że to nie fork i że definicję języka ma wyznaczać zespół TypeScripta. Uzasadnienie dla Rusta to głównie WebAssembly, bo Go musi dołączać odśmiecacz pamięci. Utrzymanie ma opierać się na agentach, którzy codziennie śledzą zmiany upstreamu, jak przy Vinext.

**Key takeaways:**
- 7.1 beta jest szybszy o 13 do 47 procent czasu i do 50 procent pamięci.
- API i content mappers to krok dla narzędzi, nie dla zwykłego kodu.
- tsrs jest eksperymentalny i opiera się na synchronizacji z upstreamem przez agentów.

**Why do I care:** Dla większości zespołów istotny jest czas sprawdzania typów w CI, i tu 7.1 daje realny zysk bez zmian. Z tsrs bym się nie spieszył. Benchmarki pochodzą od autorów, a model utrzymania "agent śledzi upstream" to zakład, że rozjazdy zachowań będą wychwytywane przez testy, których nikt jeszcze nie zweryfikował na zewnątrz.

**Link:** [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/)

**Link:** [Introducing tsrs: a Port of TypeScript to Rust](https://blog.cloudflare.com/typescript-rust-port/)

## Mutative 2.0

**TLDR:** Mutative utrzymuje API z wersji 1.x, ale przyspiesza aktualizacje tablic i kolekcji. Według autorów jest średnio 3,6 raza szybszy niż Immer 11.1.18 w zestawie 97 scenariuszy.

**Summary:** Największy zysk daje natywne wykonywanie metod przesuwających elementy, jak shift, unshift, splice i reverse, bezpośrednio na kopii szkicu. Usunięcie pierwszego z 10 000 elementów zajmuje 7 mikrosekund zamiast 8,2 milisekundy. Większość zadań zyskuje znacznie mniej, a przy kopiowaniu jednego dużego obiektu czas jest zbliżony do poprzedniego.

To wydanie główne, bo zmienia obserwowalne zachowanie. Kolejność łatek jest zgodna z Immerem, zamrożone są instancje Map i Set, a wybór builda zależy od zmiennej NODE_ENV. Budowanie celuje w ES2018. Cena to rozmiar. Samo create zajmuje 7,9 kB, czyli o 2,1 kB więcej niż wcześniej i ponad dwa razy tyle co produce z Immera. Autorzy uczciwie podają też przypadki, w których Mutative jest wolniejszy, na przykład przy aktualizacji obiektów klasowych z tysiącem pól i włączonym automatycznym zamrażaniem.

**Key takeaways:**
- Przy migracji przetestuj oba buildy, deweloperski i produkcyjny.
- Zdefiniuj NODE_ENV w każdym bundlu, także dla Node.js.
- Ręcznie pisany reducer nadal jest szybszy w większości przypadków.

**Why do I care:** Rzadko widzę wydanie z tak szczerą sekcją "gdzie jest wolniej". Zanim jednak zmienisz bibliotekę stanu dla milisekund, zmierz własny przypadek, bo średnia z 97 scenariuszy nie mówi nic o twojej aplikacji.

**Link:** [Announcing Mutative 2.0](https://mutative.js.org/blog/releases/2.0)
