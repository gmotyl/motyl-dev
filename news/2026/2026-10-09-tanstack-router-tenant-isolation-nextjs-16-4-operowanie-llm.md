---
title: "TanStack Router od zera, tenant isolation w SaaS, Next.js 16.4 i operowanie systemami LLM"
excerpt: "Kurs TanStack Router, siedem błędów izolacji tenantów, Cache Components jako domyślny model w Next.js 16.4 i piąta część serii o produkcyjnych systemach LLM."
publishedAt: "2026-10-09"
slug: "tanstack-router-tenant-isolation-nextjs-16-4-operowanie-llm"
hashtags: "#dailydev #react #typescript #tanstack-router #nextjs #react-compiler #security #architecture #observability #generated #pl"
source_pattern: "daily.dev"
---

## TanStack Router: kurs od instalacji po autoryzację

**TLDR:** Dwa kursy video pokazują budowę aplikacji do śledzenia spotkań na TanStack Router. Główny argument to pełne wnioskowanie typów dla tras, czego nie dają ani React Router, ani App Router z Next.js.

**Summary:** Oba materiały przechodzą przez ten sam scenariusz, czyli małą aplikację do zarządzania spotkaniami. Zaczynają od instalacji przez CLI, drzewa tras i trasy głównej, potem idą przez routing oparty na plikach, trasy zagnieżdżone, statyczne i dynamiczne oraz nawigację przez linki i programową. Dalej jest leniwe ładowanie tras z podziałem kodu, a to, co mnie interesuje najbardziej, czyli ładowanie danych przez loadery zamiast przez useEffect.

Loader to funkcja przypięta do trasy. Robi asynchroniczne zapytanie, zwraca dane, a komponent czyta je przez dedykowany hook. Parametry dynamiczne, jak identyfikator spotkania, trafiają do loadera wprost. Do tego dochodzą komponenty stanu oczekiwania i błędu. Autor ostrzega, że bez komponentu błędu na trasie padnięcie API potrafi wywrócić całą aplikację, i to jest uczciwe ostrzeżenie, bo wiele zespołów odkrywa to dopiero na produkcji.

Drugi kurs, od freeCodeCamp, idzie dalej. Pokazuje parametry wyszukiwania walidowane schematem Zod, kontekst routera z guardami w beforeLoad do chronienia tras oraz mutacje z unieważnianiem cache'u. Typy dla tras generuje plik routeTree.gen.ts, więc literówka w ścieżce wywala kompilację. Brakuje mi w obu materiałach rozmowy o kosztach. Jak wygląda migracja istniejącej aplikacji na React Routerze? Co z zespołem, który zna tylko stare API? Kursy sprzedają zalety, a koszty przejścia zostawiają widzowi.

**Key takeaways:**
- Loader zastępuje useEffect do pobierania danych i dostaje parametry trasy.
- Bez komponentu błędu na trasie awaria API może zabić całą aplikację.
- Guardy w beforeLoad przekierowują niezalogowanych, zanim komponent się zamontuje.
- Parametry wyszukiwania walidowane Zodem dają typy bez ręcznego parsowania.

**Why do I care:** Jeśli utrzymujesz duże SPA na React Routerze, typowanie tras to konkretny zysk, bo największe koszty routingu w dużych aplikacjach to ciche błędy w ścieżkach i parametrach. Ale to decyzja architektoniczna dla całego zespołu, nie zabawka na weekend. Zanim ktoś zacznie migrację, niech najpierw sprawdzi, ile ma dziś tras z dynamicznymi parametrami i ile razy to się już wysypało.

**Link:** [TanStack Router Course – Loaders, Auth & Type-Safe Routes](https://daily.dev/posts/r9mXOI9Eg)

**Link:** [Master Modern React Routing: TanStack Router Crash Course](https://daily.dev/posts/fN3znnQ8d)

## Siedem błędów izolacji tenantów, które nadal gryzą

**TLDR:** Programista z szesnastoletnim stażem w multi-tenant SaaS wymienia siedem błędów, które po cichu przeciekają dane między klientami. Żaden nie rzuca wyjątku i żaden nie wywala testów.

**Summary:** Lista jest konkretna. Brakująca kolumna z identyfikatorem tenanta, ominięty globalny scope, JOIN bez filtra tenanta, recyklingowane identyfikatory po soft delete, tokeny JWT bez sprawdzania identyfikatora aplikacji, pliki zapisywane pod samą nazwą oraz współdzielony cache uprawnień. Przy każdym autor podaje poprawkę, na przykład scope globalny, klucze storage'u z tenantem albo klucze cache'u złożone z kilku części.

To, co działa w tym tekście, to fakt, że to są błędy cichego działania. Wszystko wygląda poprawnie, dopóki klient A nie zobaczy rekordu klienta B. Najbardziej podstępny jest dla mnie współdzielony cache uprawnień, bo przechodzi każdy test jednostkowy, który odpala się w jednym kontekście. Autor kończy wzmianką o własnym skanerze statycznym i ofertą darmowych raportów, więc część tekstu to lekka reklama.

**Key takeaways:**
- Izolacja tenanta musi być wymuszana w jednym miejscu, nie pamiętana w każdym zapytaniu.
- Klucze cache'u i storage'u zawsze powinny zawierać tenanta.
- Testy jednostkowe w jednym kontekście nie złapią przecieku między tenantami.

**Why do I care:** Pracując nad platformami e-commerce z wieloma sklepami, widziałem dokładnie ten typ błędu w warstwie cache. Frontendowiec rzadko o tym myśli, bo to "backend", ale klucz w cache BFF to też klucz tenanta. Jeśli budujesz warstwę pośrednią, sprawdź dziś, czy każdy klucz ma tenanta, zanim zrobi to za ciebie klient.

**Link:** [I Shipped 40+ Multi-Tenant SaaS Apps. These 7 Tenant-Isolation Bugs Still Bite Indie Devs](https://daily.dev/posts/XV9c7KiS0)

## Next.js 16.4 i Cache Components jako domyślny model

**TLDR:** Next.js 16.4 zaleca Cache Components jako domyślny model programowania. W nowych projektach jest włączony od razu, a w Next.js 17 stanie się twardym ustawieniem domyślnym.

**Summary:** Cache Components pozwala mieszać statyczną treść z elementami zależnymi od użytkownika na jednej stronie, na przykład koszykiem, bez nieoczekiwanych kosztów po stronie serwera. Wersja 16.4 dodaje trzy nowe API, czyli ensureStatic, navigation oraz prefetch, które dają dokładniejszą kontrolę nad statycznymi gwarancjami i prefetchowaniem.

Jest też eksperymentalny kompilator React napisany w Ruście. Według zapowiedzi zużywa o trzydzieści procent mniej pamięci i kompiluje o piętnaście procent szybciej niż poprzednia implementacja. Obok są inne eksperymentalne rzeczy, jak odśmiecanie cache'u na dysku, leniwe importy dynamiczne i wątki robocze.

Zastanawia mnie ton komunikatu. "Zalecany" w wersji 16.4 i "twardy default" w siedemnastce to jasny sygnał, że zespoły mają kilka miesięcy na przemyślenie swoich strategii cache'owania. Nikt nie mówi tu o kosztach migracji aplikacji, które już mają własne rozwiązania z poprzednich modeli renderowania.

**Key takeaways:**
- Cache Components jest włączony domyślnie w nowych projektach create-next-app.
- W Next.js 17 stanie się obowiązującym modelem.
- Kompilator React w Ruście: minus 30 procent pamięci, plus 15 procent szybkości kompilacji.

**Why do I care:** To jest ten rodzaj zmiany, który trzeba zaplanować z wyprzedzeniem, bo dotyka modelu mentalnego całego zespołu. Jeśli masz aplikację na starszym modelu cache'owania, zrób teraz spike na jednej trasie i zobacz, co się psuje. Lepiej odkryć to w październiku niż w dniu premiery siedemnastki.

**Link:** [Next.js 16.4 recommends Cache Components as the default model](https://daily.dev/posts/xiCHsu5rs)

## Operowanie systemem LLM: obserwowalność, koszty i routing

**TLDR:** Piąta część serii o dojrzałości systemów LLM opisuje warstwę operacyjną. Obserwuje się decyzje, nie tylko usługi, koszty kontroluje w jednym miejscu, a fallback modeli opiera na circuit breakerach.

**Summary:** Autor zaczyna od obserwowalności zorientowanej na decyzje. Metryki w stylu RED to za mało, bo agent może zwrócić poprawny status i podjąć fatalną decyzję, więc potrzebne są też sygnały bezpieczeństwa, kosztu i jakości, logi warstwowe oraz tracing decyzji. Koszty egzekwuje się w jednej bramce wywołań modeli, gdzie siedzą limity, budżety, dobór rozmiaru modelu, cache i zabezpieczenia przed pętlami ponowień.

Najciekawsze są konkretne pułapki. Limiter per tenant na lokalnych licznikach w pamięci nie działa przy wielu replikach, bo każda wpuszcza własny pełny ułamek limitu, więc stan trzeba dzielić, na przykład w Redisie. Stały timeout na każdy model w łańcuchu fallbacków daje w najgorszym przypadku wielokrotność tego timeoutu, więc lepiej ustawić jeden deadline na cały łańcuch i liczyć czas każdej próby jako resztę. Circuit breaker trzeba sprawdzać przed wywołaniem, a nie tylko w bloku obsługi wyjątku, bo inaczej nigdy nie pominie martwego dostawcy.

Całość uzupełniają przełącznik awaryjny z bezpiecznymi domyślnymi ustawieniami, chaos testing, architektura heksagonalna trzymająca SDK dostawców poza domeną oraz wzorce autoryzacji przeciw pomyłkom między tenantami. Seria jest poziomem piątym z sześciu, więc nie wszystko jest tu rozwiązane. Brakuje mi liczb. Ile kosztuje taka platforma w utrzymaniu i od jakiej skali się opłaca?

**Key takeaways:**
- Obserwuj decyzje agenta, nie tylko zdrowie usługi.
- Limity i budżety egzekwuj w jednej bramce, ze współdzielonym stanem.
- Jeden deadline na cały łańcuch fallbacków zamiast stałego timeoutu na model.
- Circuit breaker sprawdzaj przed wywołaniem.

**Why do I care:** Dla frontendowca to wygląda daleko, dopóki jego aplikacja nie zaczyna wołać agentów przez BFF. Wtedy to właśnie on odpowiada za timeouty i stan ładowania, które widzi użytkownik. Jeśli nie ma jednego deadline'u na cały łańcuch, użytkownik patrzy na spinner, aż ostatni fallback się podda.

**Link:** [Part 5: Operating an LLM system: observability, cost, routing, and the platform underneath](https://daily.dev/posts/d03CHOmnF)
