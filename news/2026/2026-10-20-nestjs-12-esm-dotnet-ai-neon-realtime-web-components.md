---
title: "NestJS 12 na ESM, AI w zadaniach .NET, Neon Realtime pod lupą i przyszłość web components"
excerpt: "NestJS 12 przechodzi na ESM, Claude Code robi w .NET pracę mechaniczną, Neon Realtime zastępuje ręczne LISTEN/NOTIFY, a web components tracą rację bytu w świecie agentów."
publishedAt: "2026-10-20"
slug: "nestjs-12-esm-dotnet-ai-neon-realtime-web-components"
hashtags: "#dailydev #nestjs #nodejs #typescript #zod #dotnet #claude-code #postgresql #neon #web-components #ai #agents #generated #pl"
source_pattern: "daily.dev"
---

## NestJS 12: pakiety ESM, walidacja Standard Schema i natywna obserwowalność

**TLDR:** NestJS 12 przenosi pakiety rdzenia na ESM, a aplikacje CommonJS dalej działają dzięki require(esm) w Node.js. Dekoratory tras przyjmują teraz walidatory zgodne ze Standard Schema, na przykład Zod, Valibot i ArkType.

**Summary:** NestJS 12 wyszedł i największa zmiana jest w pakietowaniu. Rdzeń frameworka przechodzi na moduły ESM, ale stare aplikacje CommonJS nie muszą się przepisywać, bo korzystają z mechanizmu require(esm) w Node.js. Cena jest taka, że potrzebujesz Node.js w wersji co najmniej 20.19 albo 22.12. Polecenie nest new pozwala teraz wybrać projekt CJS albo ESM, a ten drugi domyślnie dostaje Vitest i oxlint. W monorepo webpacka zastąpił Rspack.

Druga rzecz to walidacja. Dekoratory od body, query i parametrów przyjmują opcję schema z dowolnym walidatorem zgodnym ze Standard Schema. Zod, Valibot i ArkType działają więc bez żadnych opakowań, wystarczy zarejestrować nowy pipe walidacyjny. class-validator zostaje domyślnym, opisanym w dokumentacji wyborem, więc nikt nie jest zmuszany do migracji.

Do tego dochodzi nowe SDK do obserwowalności, związane z cyklem życia Nesta. Pojawiła się krytyka, bo działa tylko z NestJS i pachnie uzależnieniem od jednego dostawcy. Polecenie nest upgrade załatwia większość mechanicznych zmian, ale nie przerobi projektu na ESM, Vitest ani oxlint. Znane problemy to flagi runtime'u w AWS Lambda, zepsute aliasy ścieżek i wyjątki w middleware Fastify, które wieszają aplikację. Wstępne benchmarki nie pokazały też zysku w czasie startu ani w pamięci, więc to głównie sprzątanie długu w konfiguracji.

**Key takeaways:**
- Wymagane Node.js 20.19+ lub 22.12+.
- Walidacja przez Standard Schema działa z Zod, Valibot i ArkType, class-validator zostaje domyślny.
- Migracja do ESM nie dzieje się automatycznie, trzeba ją zrobić ręcznie.

**Why do I care:** Nie spodziewałbym się po tym wydaniu przyspieszenia, więc nie ma sensu migrować w pośpiechu. Prawdziwa wartość to Standard Schema, bo jeden schemat Zod może wreszcie obsłużyć front i back bez klejenia. Natywne SDK obserwowalności omijałbym tak długo, jak długo opiera się na OpenTelemetry tylko w połowie.

**Link:** [NestJS 12: ESM Packages, Standard Schema Validation and Native Observability](https://daily.dev/posts/4J1tuxbXd)

## Zadania w .NET, w których AI jest lepsze od programistów

**TLDR:** Autor pokazuje, jak Claude Code ze specyfikacją w markdownie stawia projekt ASP.NET Core w kilka minut, pisze testy i debuguje wyjątek. Wniosek jest taki, że rola programisty .NET przesuwa się w stronę decyzji architektonicznych.

**Summary:** Autor daje Claude Code plik specyfikacji z wersją frameworka, architekturą, strukturą folderów, regułami kodowania i pakietami NuGet. Potem uruchamia agenta w trybie planowania. Pełne rozwiązanie w stylu Clean Architecture, z projektami Api, Application i Infrastructure, powstaje w niecałe pięć minut. Ręcznie zajęłoby to około godziny.

Z testami jest podobnie. Specyfikacja opisuje konwencje, na przykład xUnit v3, mocki tworzone w konstruktorze i przekazywanie tokenu anulowania. Agent robi osobne projekty testowe dla każdej warstwy, z bazą EF Core w pamięci, i wszystkie testy przechodzą po nieco ponad pięciu minutach. Debugowanie błędu 500 trwa około czterech minut, bo przyczyną był brak migracji EF Core, a nie zły connection string.

Autor idzie dalej i twierdzi, że to są zadania mechaniczne, w których AI wygrywa, a programiści .NET staną się architektami. Na poparcie cytuje ankietę z LinkedIna, według której tylko 6 procent deweloperów straciło pracę przez AI. Ankieta na LinkedInie to słaby dowód i autor sam o tym nie wspomina.

**Key takeaways:**
- Dobra specyfikacja w markdownie robi większość pracy przy scaffoldingu.
- Testy i dokumentacja XML to zadania, które agent robi szybko i poprawnie.
- Wniosek o zmianie roli opiera się na bardzo wątłych danych.

**Why do I care:** Trik ze specyfikacją działa tak samo w TypeScripcie i warto go przenieść do własnych repozytoriów. Zastanawia mnie coś innego. Skoro scaffolding trwa pięć minut, to kto potem utrzymuje tę wygenerowaną architekturę, skoro nikt jej nie projektował?

**Link:** [.NET tasks AI is better at than developers](https://daily.dev/posts/0UZchSVK9)

## Neon Realtime pod lupą: żywe zapytania SQL zamiast ręcznego LISTEN/NOTIFY

**TLDR:** Benchmark publicznej bety Neon Realtime pokazuje, że żywe zapytania śledzą opóźnienie zapisu prawie idealnie. Większość nietrywialnych zapytań jest jednak wysyłana w całości przy każdym zapisie, co kosztuje klienta i rachunek za transfer.

**Summary:** Neon Realtime zamienia subskrybowane zapytanie SQL w strumień aktualizacji. Autorzy testu mieli własną warstwę opartą na LISTEN/NOTIFY w Postgresie z SSE albo WebSocketami i sprawdzili, czy da się ją wyrzucić. Test robili na tablicy zamówień zbudowanej z Drizzle w regionie aws-eu-central-1.

Proste zapytania na żywo nadążają za zapisem, mediana opóźnienia to 35 do 43 milisekund, a wszystkie 48 600 zapisów w całej macierzy testów dotarło poprawnie. Problem pojawia się przy joinach, EXISTS, IN, agregatach i ORDER BY. Takie zapytania nie są aktualizowane przyrostowo, tylko wysyłane od nowa po każdym zapisie. Przy tysiącu wierszy to do 134 KB na jeden zapis, co obciąża procesor klienta i rachunek za egress.

Zapieczętowane zapytania, czyli zaszyfrowane uprawnienia, wytrzymały wszystkie 14 prób manipulacji, fałszerstwa i dostępu między branchami. Otwarte subskrypcje pozwalają zejść obliczeniom do zera, o ile odnawianie nie odpytuje Postgresa. Wskazówki projektowe brzmią tak. Używaj filtrów na jednej tabeli albo joinów z przypiętym wierszem, sortuj po stronie klienta i nie wołaj bazy w ścieżce odnowienia.

**Key takeaways:**
- Proste żywe zapytania mają opóźnienie bliskie zapisowi.
- Joiny i agregaty są ponownie wysyłane w całości.
- Sortowanie lepiej zostawić klientowi.

**Why do I care:** Zanim wyrzucisz swój LISTEN/NOTIFY, policz, ile ważą twoje odpowiedzi. Na ekranie z tablicą zamówień wszystko wygląda świetnie, ale panel z agregatami może cię zjeść na transferze. Cieszy mnie, że ktoś zmierzył to uczciwie, a nie przepisał materiałów marketingowych.

**Link:** [Neon Realtime, Measured: Live SQL Queries Replace the LISTEN/NOTIFY Layer We Built by Hand](https://daily.dev/posts/W82SpGphI)

## Czy web components mają przyszłość, jeśli nikt ich nie pisze?

**TLDR:** Autor argumentuje, że kodowanie z agentami podcięło sens web components, bo kod jest tani do wygenerowania na nowo. Zostają dwa słabsze przypadki użycia, a wpływ na standardy platformy i tak już się liczy.

**Summary:** Punkt wyjścia to projekt Google Modern Web Guidance, czyli wskazówki dla agentów kodujących. Autor sprawdził go i znalazł web components jako temat dodatkowy. Przez pierwsze pół roku prawie ich tam nie było, a jedna z sekcji nazywa się wprost, żeby najpierw zdecydować, czy w ogóle potrzebujesz elementu własnego. Jedyny wyjątek to rozszerzenia Chrome wstrzykujące interfejs do stron.

Argument jest taki. Uzasadnienie przez ponowne użycie słabnie, gdy LLM wygeneruje komponent od nowa w kilka sekund. Widać to po popularności bibliotek typu shadcn, które się kopiuje, a nie instaluje. Zostają dwa przypadki. Pierwszy to piaskownica w stylu mikrofrontendów, jako alternatywa dla iframe. Drugi to samodzielne widgety z bogatym stanem wewnętrznym, na przykład wybierak emoji, którego złożoność siedzi w danych i IndexedDB, a nie w renderowaniu.

Autor kończy tezą, że web components już wygrały, bo ukształtowały standardy. Chodzi o części, sloty, popovery i dostosowywalny select z Open UI. Wspomina też o zespołach, które przepisują cały frontend na inny framework, bo ten lepiej współpracuje z agentami. Robią to na podstawie wrażeń, a nie liczb o tokenach czy wydajności.

**Key takeaways:**
- Wytyczne Google dla agentów traktują web components po macoszemu.
- Sensowne zostają piaskownice i samodzielne widgety.
- Przepisywanie frameworka dla agentów powinno mieć twarde metryki.

**Why do I care:** Zgadzam się w połowie. Teza o taniości kodu jest prawdziwa, ale pomija koszt utrzymania stu wygenerowanych kopii tego samego komponentu. Przepisywanie aplikacji, bo agent lubi inny framework, to najgłupszy powód do migracji, jaki słyszałem w tym roku.

**Link:** [Do web components have a future if nobody is writing them?](https://daily.dev/posts/5ppLisewy)
