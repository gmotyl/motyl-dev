---
title: "Bytes #526: Pi 1.0 od Earendil, WebMCP w React, Git 2.56, Preact 11, MSW 3.0 i Effect 4.0"
excerpt: "Przegląd najciekawszych linków z Bytes #526: nowy harness agentowy Pi 1.0 i jego durable odmiana, React hooki do WebMCP, usprawnienia Gita, Preact 11, MSW 3.0 i Effect 4.0."
publishedAt: "2026-10-02"
slug: "bytes-526-pi-1-0-webmcp-react-git-256-effect-40"
hashtags: "#uidev #ai #agents #react #nodejs #performance #architecture #git #generated #pl"
source_pattern: "ui.dev"
---

## Pi 1.0: Earendil hartuje minimalny harness agentowy

**TLDR:** Earendil wydał Pi 1.0, stabilną wersję swojego minimalnego harnessu agentowego, i dorzucił do niego Codemode, obsługę modeli niejęzykowych takich jak Jev, oraz nowy TUI. Firma deklaruje, że trzyma się zasady: nic nowego nie wchodzi do Pi, dopóki nie udowodni swojej wartości.

**Streszczenie:** Pi zbierało przez wiele miesięcy poprawki i zgłoszenia od społeczności, zanim Earendil zdecydował się nazwać je gotowym na produkcję. Zespół opisuje swój proces selekcji wprost: każda nowa funkcja czeka, aż okaże się trwała, a potem jest ważona względem złożoności, którą wnosi do kodu. W Pi 1.0 ten proces dał Codemode z natywnym wsparciem dla MCP i modeli niejęzykowych jak Jev czy modele obrazu, rozszerzenia dla modeli wirtualnych, leniwe ładowanie narzędzi, cache warming dla modeli Anthropic, komunikaty systemowe wysyłane w trakcie trwającej rozmowy, oraz nowy motyw terminala z trybem pełnoekranowym jako domyślnym.

Ciekawszy z punktu widzenia architektury jest sam Codemode: Pi potrafi teraz napisać sobie skrypt, który np. streszcza tydzień commitów, albo zbudować wirtualny model, który planuje na Claude Opusie, a implementuje na GPT, przełączając się między nimi w locie w zależności od tego, co robi Jev. To pokazuje, dokąd zmierza ten typ narzędzi: mniej jako czat z modelem, więcej jako środowisko, które samo sobie dopisuje nowe możliwości.

Instalacja to jedna linijka z curl albo PowerShell, a cały kod jest MIT i leży na GitHubie. Earendil zapowiada, że kolejne miesiące poświęci na dalsze różnicowanie między Pi jako narzędziem programisty a nowym, bardziej ogólnym substratem, o którym piszą osobno w Pi Durable.

**Kluczowe wnioski:**
- Pi 1.0 to stabilizacja, nie rewolucja: zespół świadomie odrzucił więcej funkcji niż przyjął.
- Codemode dostał natywne wsparcie dla MCP i modeli niejęzykowych, co pozwala agentowi pisać własne skrypty automatyzujące.
- Instalacja jednym poleceniem, licencja MIT, kod otwarty na GitHubie.

**Dlaczego mi na tym zależy:** Jeśli budujesz cokolwiek na bazie harnessu agentowego, warto zwrócić uwagę na to, jak Earendil podchodzi do dodawania funkcji: nie goni za każdym trendem, tylko czeka, aż coś udowodni swoją wartość w realnym użyciu. To przeciwieństwo tego, co widać w wielu konkurencyjnych narzędziach, gdzie nowa funkcja pojawia się w każdej kolejnej wersji, niezależnie od tego, czy ktoś jej faktycznie używa.

**Link:** [Pi 1.0 | Earendil](https://earendil.com/posts/pi-1-0/)

## Pi Durable: ten sam minimalizm, ale dla agentów, które żyją tygodniami

**TLDR:** Razem z Pi 1.0 Earendil wypuścił eksperymentalny pakiet Pi Durable, osobny substrat do budowy długotrwałych aplikacji agentowych, które przetrwają restart procesu, obsłużą wielu klientów naraz i pozwolą na podmianę kodu w locie.

**Streszczenie:** Pi jako agent kodujący działa w terminalu, prowadzony przez jedną osobę, i jeśli proces padnie, trzeba mu kazać kontynuować ręcznie. Pi Durable rozwiązuje inny problem: agentów, którzy muszą działać gdziekolwiek, znosić długie rozmowy i przetrwać awarię procesu, restart kontenera czy brak pamięci. Harness to w tym ujęciu magazyn danych plus maszyneria do prowadzenia wielu rozmów naraz, z narzędziami, które model może wywoływać, i środowiskami wykonawczymi, w których te narzędzia faktycznie działają.

Każdy krok działania agenta to zadanie, które zapisuje punkt kontrolny, zanim przejdzie dalej. Jeśli proces padnie w trakcie wywołania narzędzia, nowy proces otwiera ten sam magazyn, znajduje niedokończone zadania i kontynuuje każde od ostatniego checkpointu. Żądanie do modelu, które zostało przerwane, jest wysyłane ponownie, a częściowa odpowiedź zostaje w transkrypcie oznaczona jako przerwana. Magazyn danych to SQLite, JSONL albo pamięć, a kod magazynu nie korzysta z API specyficznych dla Node, więc działa też na Bun czy wewnątrz Cloudflare Durable Object.

Drugim filarem jest wiele rozmów naraz w jednym harnessie, każda z własnym modelem, poziomem myślenia i zestawem narzędzi, plus możliwość forkowania rozmowy w dowolnym punkcie transkryptu bez kopiowania historii. Rozszerzenia można podmieniać w locie, instalując nową wersję pod tą samą nazwą, a trwające wywołanie narzędzia kończy się na starym kodzie, podczas gdy kolejne już korzysta z nowego. Dokumentacja pokazuje to na przykładzie planera wakacji, w którym subagent uruchamia trzy wyszukiwania równolegle jako osobne zadania, proces pada w połowie, a po restarcie tylko niedokończone zadanie uruchamia się ponownie.

**Kluczowe wnioski:**
- Pi Durable nie zastępuje Pi jako agenta kodującego, to osobny framework do budowy dowolnej aplikacji agentowej.
- Każdy krok działania to zadanie z checkpointem, co pozwala przetrwać awarię procesu bez utraty postępu.
- Rozszerzenia, narzędzia i haki można podmieniać w działającym systemie bez przerywania rozmów.
- Pakiet jest eksperymentalny i jego API może się jeszcze zmienić.

**Dlaczego mi na tym zależy:** To jest dokładnie ten typ infrastruktury, którego brakowało, żeby budować agentów działających poza terminalem jednego dewelopera, na przykład bota Slackowego czy automatyczne triage zgłoszeń w GitHubie. Model checkpointów i zadań jako podstawowej jednostki pracy przypomina silniki workflowów typu Temporal, tylko dopasowany specyficznie pod agentów LLM, z ich długimi, nieprzewidywalnymi czasami odpowiedzi.

**Link:** [Pi Durable | Earendil](https://earendil.com/posts/pi-durable/)

## WebMCP dociera do Reacta: webmcp-react wystawia UI jako narzędzia dla agentów

**TLDR:** Biblioteka webmcp-react dodaje hooki Reactowe do rejestrowania funkcji aplikacji jako narzędzi WebMCP na `document.modelContext`, z polyfillem dla przeglądarek bez natywnego wsparcia i mostkiem do Claude Code czy Cursora przez rozszerzenie Chrome.

**Streszczenie:** WebMCP to propozycja standardu z grupy roboczej W3C Web Machine Learning, która dodaje do przeglądarki `document.modelContext`, API pozwalające dowolnej stronie wystawić typowane, wywoływalne narzędzia dla agentów AI. Chrome ma już wczesny podgląd tego API. Webmcp-react dostarcza do tego Reactowe bindingi: owijasz aplikację w `WebMCPProvider`, a hookiem `useMcpTool` rejestrujesz narzędzie z opisem, schematem wejścia w Zodzie albo czystym JSON Schema, i handlerem. Tool znika z rejestru, gdy komponent się odmontowuje, więc dostępność narzędzi można sterować zwykłym warunkowym renderowaniem.

Biblioteka jest zgodna z SSR, więc działa z Next.js i Remixem, i jest bezpieczna pod Strict Mode, co oznacza, że nie rejestruje tego samego narzędzia dwa razy i nie zostawia osieroconych wpisów po podwójnym montowaniu komponentu w trybie deweloperskim. Każde wywołanie narzędzia dostaje własny `AbortSignal`, który Chrome 153 i nowszy przerywa, gdy agent anuluje wywołanie, a starsze przeglądarki dostają sygnał, który nigdy się nie przerywa, więc kod zawsze może bezpiecznie go przekazać do `fetch`.

Agenci z wbudowaną obsługą WebMCP w przeglądarce, jak Codex, odkrywają i wywołują narzędzia strony bezpośrednio. Klienci bez dostępu do `document.modelContext`, czyli Claude Code czy Cursor, łączą się przez rozszerzenie WebMCP Bridge, które wystawia zarejestrowane narzędzia dowolnemu klientowi MCP. Repozytorium dorzuca też gotowe agent skills instalujące bibliotekę i generujące szkielet narzędzi.

**Kluczowe wnioski:**
- `document.modelContext` to propozycja W3C, Chrome ma już jej wczesny podgląd, reszta przeglądarek dostaje polyfill.
- `useMcpTool` rejestruje narzędzie z Zod albo JSON Schema i zwraca stan wykonania do budowy UI wokół akcji agenta.
- Klienci bez natywnego WebMCP łączą się przez rozszerzenie WebMCP Bridge w Chrome.

**Dlaczego mi na tym zależy:** To pierwsza biblioteka, którą widziałem, traktująca wystawianie funkcji aplikacji agentom jako zwykłą część cyklu życia komponentu, a nie osobną warstwę API do utrzymania. Jeśli WebMCP faktycznie się przyjmie, to różnica między "stroną do klikania" a "stroną, z którą rozmawia agent" zniknie w sposób podobny do tego, jak kiedyś zniknęła różnica między stroną statyczną a interaktywną aplikacją SPA.

**Link:** [GitHub - agentcathq/webmcp-react](https://github.com/agentcathq/webmcp-react)

## OpenAI DevDay 2026: agenci z ciągłymi obowiązkami i ChatGPT jako wspólna powierzchnia

**TLDR:** Na DevDay 2026 OpenAI ogłosiło ponad 20 nowości w ChatGPT, Codex i swoich modelach, w tym agentów przejmujących stałe obowiązki oraz otwarcie ChatGPT jako platformy, na której deweloperzy mogą uruchamiać własne natywne doświadczenia dla 1,2 miliarda użytkowników tygodniowo.

**Streszczenie:** Krótki wpis podsumowujący to w zasadzie lista ogłoszeń bez szczegółów technicznych, ale kierunek jest jasny: OpenAI chce, żeby ChatGPT był miejscem, w którym ludzie i agenci pracują razem, a deweloperzy dystrybuują aplikacje bezpośrednio do tej samej bazy użytkowników, zamiast budować osobny produkt. Firma pozycjonuje to jako rozszerzenie otwartego ekosystemu, nie zamknięcie go.

**Kluczowe wnioski:**
- Ponad 20 ogłoszeń dotyczących ChatGPT, Codex i modeli OpenAI.
- Nowy nacisk na agentów przejmujących długoterminowe, powtarzalne obowiązki zamiast jednorazowych zadań.
- ChatGPT otwiera się jako platforma dystrybucji dla natywnych aplikacji deweloperskich, z zasięgiem 1,2 miliarda użytkowników tygodniowo.

**Dlaczego mi na tym zależy:** Skala dystrybucji, o której mówi OpenAI, 1,2 miliarda użytkowników tygodniowo, to argument biznesowy bardziej niż techniczny, ale dla frontendowców oznacza nową kategorię integracji do rozważenia przy projektowaniu produktu: czy warto budować natywną aplikację wewnątrz ChatGPT, zamiast kolejnej samodzielnej strony z logowaniem przez OAuth.

**Link:** [DevDay 2026 Recap](https://openai.com/index/devday-2026-recap/)

## Git 2.56: bezpieczniejsze stage'owanie konfliktów i dużo szybsze wyszukiwanie merge-base

**TLDR:** Git 2.56 dodaje `git add --resolved` do bezpiecznego stage'owania rozwiązanych konfliktów bez ruszania innych plików, przyspiesza wyszukiwanie wspólnych przodków commitów nawet kilkadziesiąt razy, i poprawia kompatybilność path-walk repackingu z bitmapami oraz delta islands używanymi przez hosty repozytoriów.

**Streszczenie:** Rozwiązywanie konfliktu mergowania to dwa kroki: edycja plików, aż znikną znaczniki konfliktu, i oznaczenie Gitowi, że konflikt jest rozwiązany. Problem w tym, że `git add -u` stage'uje wszystkie zmodyfikowane śledzone ścieżki, nie tylko te związane z konfliktem, więc łatwo przypadkiem dodać niezwiązaną lokalną zmianę albo plik, w którym ktoś zapomniał usunąć znaczniki. `git add --resolved` bierze pod uwagę wyłącznie ścieżki aktualnie nierozwiązane w indeksie, skanuje je pod kątem pozostawionych znaczników konfliktu, i jeśli coś znajdzie, nie stage'uje niczego, tylko zgłasza, które pliki trzeba jeszcze poprawić.

Drugą dużą zmianą jest szybsze znajdywanie wspólnego przodka (merge-base) dwóch commitów. Git szuka go, malując wstecz commity osiągalne z obu gałęzi: commit pomalowany oboma kolorami to kandydat na merge-base. Stara reguła stopu potrafiła jednak długo przetwarzać stary, wspólny już ogon historii, nawet gdy kolejny merge-base nie mógł się już pojawić. Git 2.56 śledzi, ile kolejkowanych commitów zostało pomalowanych wyłącznie przez jedną stronę, i zatrzymuje się, gdy jedna z nich się wyczerpie. W jednym rzeczywistym monorepo czas przeszukiwania spadł z 0,68 do 0,01 sekundy, a na jądrze Linuksa `git merge-base --all v4.8 v4.9` spadło z 167 441 kroków i 0,29 sekundy do 3887 kroków i 0,01 sekundy.

Path-walk repacking, czyli grupowanie obiektów po ścieżce w drzewie zamiast po hashu nazwy, potrafi dać znacznie mniejsze paczki, w benchmarku na repozytorium Fluent UI o 71% mniejsze niż zwykły repack z bitmapami. Dotąd nie dało się go jednak łączyć z bitmapami reachability ani z delta islands, co ograniczało jego użycie na dużych hostach. Git 2.56 usuwa obie te blokady, więc hosty mogą teraz testować oszczędności path-walk bez rezygnacji z szybkiego serwowania przez bitmapy czy z izolacji referencji.

Poza tym dorzucono sporo mniejszych rzeczy: eksperymentalny `git history drop` do usuwania commitu z automatycznym przerzutem potomków, konsolidację niskopoziomowych operacji na referencjach w `git refs`, masowe czyszczenie zmergowanych gałęzi przez `git branch --delete-merged`, opcję `--reset-when-found` w `git bisect run`, flagę `--linearize` w eksperymentalnym `git replay`, oraz poprawki wydajności w reftable i ładowaniu paczek, które w jednym przypadku skróciły operację z ośmiu minut do 0,07 sekundy.

**Kluczowe wnioski:**
- `git add --resolved` stage'uje tylko ścieżki faktycznie rozwiązane po konflikcie i odmawia, jeśli znajdzie pozostawione znaczniki.
- Nowa reguła zatrzymania przy szukaniu merge-base daje przyspieszenia rzędu 20 do 70 razy w dużych repozytoriach.
- Path-walk repacking współpracuje teraz z bitmapami i delta islands, co otwiera drogę do jego użycia na dużych hostach.

**Dlaczego mi na tym zależy:** `git add --resolved` to dokładnie ta drobna rzecz, która zapobiega wkradnięciu się przypadkowej zmiany do commitu rozwiązującego konflikt, a to jest klasyczny sposób na wprowadzenie regresji, której nikt nie zauważy na code review. Przyspieszenia w merge-base i repackingu dotyczą głównie dużych monorepo i hostów Gita, ale jeśli pracujesz w takim repozytorium, różnica między sekundami a milisekundami w codziennych operacjach realnie wpływa na komfort pracy całego zespołu.

**Link:** [Highlights from Git 2.56](https://github.blog/open-source/git/highlights-from-git-2-56/)

## Preact 11 łączy sześć lat doświadczeń z Preact X w jedną wersję major

**TLDR:** Po ponad sześciu latach od otwarcia ticketu "The Road to Preact 11" zespół Preact wydał nową wersję major, z Hydration 2.0, automatycznym przekazywaniem refów i porównaniami Object.is w argumentach hooków, a większość pierwszopartyjnych pakietów ekosystemu jest już z nią kompatybilna.

**Streszczenie:** Preact X żyło dłużej, niż zespół się spodziewał, bo udawało się dodawać funkcje i refaktoryzacje bez łamania kompatybilności, kosztem sporej pracy nad utrzymaniem rozmiaru i wydajności biblioteki. Preact 11 to moment, w którym zespół zebrał zmiany łamiące kompatybilność, które odkładał przez lata, w jedną wersję, żeby móc dalej budować pod nowoczesny web bez dalszego naginania starego API. Większość zmian dla typowego użytkownika to drobne poprawki typów, bo duża część pracy poszła właśnie w to, żeby typy były bardziej precyzyjne i eksportowane z lepszych miejsc.

Pakiety pierwszopartyjne, `@preact/signals`, `preact-render-to-string`, `preact-iso`, `prefresh` i `@preact/preset-vite`, wspierają Preact 11 od miesięcy, od pierwszych wersji przedpremierowych, więc spora część zależności w typowym projekcie najprawdopodobniej jest już gotowa.

**Kluczowe wnioski:**
- Preact 11 zamyka sześcioletni backlog zmian łamiących kompatybilność z Preact X.
- Nowości to Hydration 2.0, automatyczne przekazywanie refów i porównania Object.is w argumentach hooków.
- Większość pierwszopartyjnych pakietów ekosystemu jest kompatybilna od miesięcy.

**Dlaczego mi na tym zależy:** Dla zespołów na Preact to prawdopodobnie najmniej bolesna duża migracja, jaką można sobie wyobrazić, skoro autorzy sami mówią, że większość zmian to poprawki typów. Warto jednak sprawdzić zależności spoza pierwszopartyjnego ekosystemu przed aktualizacją, bo to one najczęściej psują się przy wersjach major takich bibliotek.

**Link:** [Preact 11 – Preact](https://preactjs.com/blog/preact-11/)

## MSW 3.0: przechwytywanie sieci w Node.js przez gniazda TCP i TLS

**TLDR:** MSW 3.0 jest ESM-only, dodaje granularne punkty wejścia i eksperymentalne API `defineNetwork`, ale najważniejszą zmianą jest nowa architektura biblioteki Interceptors, która przechwytuje ruch sieciowy w Node.js na poziomie gniazd TCP i TLS zamiast łatać moduł `http`.

**Streszczenie:** MSW od ośmiu lat mierzy się z problemem, którego w Node.js nie ma jak łatwo obejść: nie istnieje tam Service Worker ani wbudowane API, które powiedziałoby, że żądanie się wydarzyło albo odpowiedź dotarła. Historia biblioteki Interceptors to historia przesuwania warstwy przechwytywania coraz niżej w kodzie sieciowym: najpierw łatanie `node:http`, potem nadpisywanie `ClientRequest`, potem przechwytywanie na poziomie agentów i socketów. W wersji 3.0 ta warstwa trafia jeszcze niżej, do wiązań JavaScriptowych dla kodu sieciowego Node.js napisanego w C, czyli gniazd TCP i TLS. Niżej zejść już się nie da bez rekompilowania samego Node.js.

Dzięki temu interceptor podpina się pod dowolne połączenie socketowe, przepuszcza pakiety danych przez odpowiedni parser, na przykład llhttp, i dopiero gdy parser potwierdzi oczekiwany typ wiadomości sieciowej, jak żądanie HTTP, uruchamia się właściwa logika przechwytywania. To podejście działa niezależnie od protokołu, co autor podkreśla konkretnym przykładem: MSW zyskuje w ten sposób wsparcie dla SMTP.

Reszta zmian jest bardziej kosmetyczna, choć praktyczna: biblioteka jest teraz tylko ESM, ma osobne punkty wejścia takie jak `msw/http` czy `msw/graphql` zamiast jednego ciężkiego importu `msw`, traci wsparcie dla Node 18 i 20 na rzecz 22, 24 i 26, i chudnie z 416 do 234 kilobajtów w spakowanej paczce. Dochodzą subskrypcje GraphQL przez WebSocket i eksperymentalne API `defineNetwork`, które ma docelowo zastąpić dotychczasowy podział na `setupServer` i `setupWorker`.

**Kluczowe wnioski:**
- Nowa architektura Interceptors przechwytuje ruch na poziomie gniazd TCP/TLS, nie na poziomie modułu `http`, co otwiera wsparcie dla protokołów innych niż HTTP, w tym SMTP.
- MSW 3.0 jest ESM-only i wspiera Node 22, 24, 26, tracąc wsparcie dla 18 i 20.
- Spakowana biblioteka jest o 43% mniejsza, definicje typów o 50% mniejsze.

**Dlaczego mi na tym zależy:** Jeśli kiedykolwiek frustrowało cię mockowanie żądań w testach integracyjnych Node.js, ta zmiana architektoniczna to nie kosmetyka, tylko rozwiązanie fundamentalnego ograniczenia, z którym MSW mierzyło się od początku. Dla zespołów utrzymujących duże zestawy testów e2e czy integracyjnych w Node warto zaplanować migrację do 3.0 raczej wcześniej niż później, bo deprecjacje w tej wersji są realne, nie kosmetyczne.

**Link:** [Introducing MSW 3.0](https://mswjs.io/blog/introducing-msw-3.0)

## Effect 4.0: przepisany od zera, pięć razy mniejszy, sześć razy szybszy w konkurencji

**TLDR:** Effect 4.0 to przepisanie frameworka od podstaw: mniejszy bundle, większa przepustowość zadań współbieżnych, mniej pamięci na fiber, zero zależności runtime w rdzeniu i pierwsza oficjalna polityka długoterminowego wsparcia.

**Streszczenie:** Autorzy nazywają to najambitniejszym wydaniem w historii projektu, i liczby to potwierdzają: minimalny program skurczył się z 35,6 do 7,1 kilobajta, przepustowość zadań współbieżnych wzrosła z 0,71 do 4,57 miliona na sekundę, a pamięć zużywana przez 50 tysięcy fiberów spadła ze 157,5 do 21,8 megabajta. Rdzeń pakietu `effect` nie ma teraz żadnych zależności runtime, co autorzy wprost wiążą z bezpieczeństwem: kontrolują każdą linijkę kodu, który wysyłają, bez łańcucha zależności stron trzecich i mniejszą ekspozycją na ataki supply chain.

Wiele wcześniej osobnych pakietów ekosystemu trafiło teraz do samego `effect` i dzieli z nim jedną wersję oraz cykl wydawniczy. Zakres projektu też się zmienił: zaczynał jako system efektów z typowanymi błędami, wstrzykiwaniem zależności i zarządzaniem zasobami, a dziś obejmuje całą drabinę, od pojedynczej funkcji po systemy rozproszone z trwałymi workflow i clusteringiem, zbudowane na tym samym modelu programowania.

Cotygodniowe pobrania z npm sięgnęły 43,9 miliona, 179 razy więcej niż przy wersji 3.x, a w ostatnim tygodniu 56% pobrań dotyczyło już wersji 4.x. Od tego wydania każda wersja major Effect ma formalną politykę wsparcia długoterminowego: poprawki błędów do września 2029 albo rok po wydaniu 5.0, w zależności od tego, co nastąpi później, a poprawki bezpieczeństwa jeszcze dłużej.

**Kluczowe wnioski:**
- Minimalny bundle jest pięć razy mniejszy, przepustowość współbieżna sześć razy wyższa, zużycie pamięci na fiber niższe o 86%.
- Rdzeń `effect` nie ma zależności runtime, co ogranicza ekspozycję na ataki na łańcuch dostaw.
- Projekt formalizuje politykę długoterminowego wsparcia, zaczynając od tej wersji.

**Dlaczego mi na tym zależy:** Liczby w rodzaju "179 razy więcej pobrań" i "56% ruchu już na nowej wersji w pierwszym tygodniu" to sygnał, że Effect przestaje być niszowym wyborem dla zespołów lubiących czyste programowanie funkcyjne, a staje się realną alternatywą do rozważenia przy projektowaniu nowego backendu. Formalna polityka LTS dodatkowo obniża ryzyko związane z postawieniem na framework, który wcześniej bywał krytykowany za szybkie tempo zmian.

**Link:** [Effect 4.0 | Effect Blog](https://effect.website/blog/releases/effect/40)
