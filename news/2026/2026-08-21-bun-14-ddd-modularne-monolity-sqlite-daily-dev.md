---
title: "Bun 1.4, DDD pod AI i koniec mikroserwisowej gorączki: przegląd daily.dev"
excerpt: "Bun 1.4 wreszcie wychodzi mimo dramatu z przepisaniem na Rust, Domain-Driven Design zyskuje nowe życie w erze agentów kodujących, a społeczność wraca do modularnych monolitów i SQLite jako fundamentu zamiast stosu mikroserwisów."
publishedAt: "2026-08-21"
slug: "bun-14-ddd-modularne-monolity-sqlite-daily-dev"
hashtags: "#dailydev #bun #nodejs #ddd #architecture #ai-agents #microservices #sqlite #database #generated #pl"
source_pattern: "daily.dev"
---

## Bun 1.4 wreszcie wychodzi, ale spór o przepisanie na Rust nie ucichł

**TLDR:** Bun 1.4 dowozi największy skok kompatybilności z Node.js w historii projektu i realne poprawki wydajności, ale kontrowersje wokół przepisania runtime'u z Zig na Rust nadal ciążą nad reputacją zespołu.

**Summary:** Nowa wersja Buna dodaje 1517 nowo przechodzących testów zgodności z Node.js, co samo w sobie jest największym skokiem od premiery 1.0. Do tego dochodzi pięciokrotnie niższe zużycie CPU w bezczynności, 48 procent mniej pamięci przy serwerach HTTP i 50 procent szybszy start na Linuksie. Zestaw nowych API robi wrażenie: Bun.Image, Bun.WebView, Bun.cron, natywne streamy, wsparcie dla HTTP/2 i HTTP/3. To jest lista rzeczy, które faktycznie ułatwiają życie, a nie kolejny marketingowy checklist.

Problem w tym, że te liczby idą w parze z historią, która nie wygląda dobrze z zewnątrz. Jarred Sumner, twórca Buna, zabrał się za przepisanie runtime'u z Zig na Rust w imię bezpieczeństwa pamięci, ale harmonogram tego przepisania rozjeżdżał się miesiąc po miesiącu, co sam publicznie potwierdzał. Krytycy pytają, czy to przepisanie było w ogóle konieczne i czy faktycznie przyniosło obiecane korzyści w zakresie memory safety. Licznik otwartych pull requestów przekroczył pięć tysięcy, znacznie ponad to, co GitHub uznaje za zdrowe dla repozytorium, a ponad piętnaście tysięcy commitów pochodzi z konta zautomatyzowanego bota. To budzi pytania o to, jak faktycznie wygląda proces review w tym projekcie.

**Key takeaways:**
- Bun 1.4 to największy skok zgodności z Node.js od wersji 1.0, plus wymierne poprawki wydajności i nowe API.
- Przepisanie runtime'u z Zig na Rust ciągnie się od miesięcy i budzi pytania o realną potrzebę tej zmiany.
- Ponad 5000 otwartych PR-ów i 15000+ commitów od bota sugerują problemy z governance projektu.

**Why do I care:** Jako ktoś, kto ocenia runtime'y pod kątem stabilności produkcyjnej, patrzę na te liczby wydajnościowe z uznaniem, ale governance projektu niepokoi mnie bardziej niż sam wybór języka implementacji. Runtime, który ma tysiące niezamkniętych PR-ów i tysiące commitów od bota, to sygnał, że proces przeglądu kodu może nie nadążać za tempem rozwoju. Zanim wsadzę Buna do czegoś krytycznego, chcę zobaczyć, jak ten dług techniczny zostanie rozliczony, a nie tylko czytać o kolejnych rekordach wydajności.

**Link:** [Bun 1.4 finally ships. The Rust rewrite drama isn't over.](https://daily.dev/posts/FDy7oP2Yl)

## Domain-Driven Design nabiera znaczenia, gdy kod pisze agent

**TLDR:** Artykuł argumentuje, że fundamenty DDD, czyli wspólny język i dobrze zrozumiany model domeny, stają się ważniejsze, a nie mniej ważne, gdy większość implementacji przejmują agenci AI.

**Summary:** Cała wartość modelu domenowego leży w zrozumieniu, jakie budzi w zespole, a nie w samym artefakcie. Specyfikacja wygenerowana przez AI, której nikt nie czyta, nie rozwiązuje żadnego problemu. Precyzyjne, konsekwentne nazewnictwo, czyli Ubiquitous Language i Bounded Contexts, ostrzy prompty i zapobiega sytuacjom, w których agent myli ze sobą różne pojęcia. Zamiast luźnego promptu w stylu "dodaj użytkownika do CRM i supportu po utworzeniu", precyzyjne rozdzielenie na "utwórz wpis klienta w CRM" i "profil w systemie supportu" daje agentowi jednoznaczny, domenowo poprawny cel.

Ciekawy jest też przykład z optymalizacją pod złą metrykę. Jeden inżynier poprosił agenta o redukcję zużycia pamięci w serwisie napisanym w Go i zadanie się udało, ale realna oszczędność kosztów w chmurze wyniosła około dolara miesięcznie, bo zużycie pamięci nigdy nie było prawdziwym driverem kosztów, a prawdziwy cel nigdy nie został agentowi jasno przekazany. To dobra ilustracja tego, że agent zrobi dokładnie to, o co go poprosisz, nawet jeśli to, o co poprosisz, nie ma sensu biznesowego.

**Key takeaways:**
- Wartość modelu domenowego to wspólne zrozumienie w zespole, nie sam dokument czy diagram.
- Precyzyjny Ubiquitous Language sprawia, że prompty do agentów są mniej ambiwalentne.
- Zespoły powinny projektować i dyskutować rozwiązanie przed generowaniem kodu, bo lepszy kontekst daje lepszy output agenta.
- Deweloperzy, którzy głęboko rozumieją domenę, są tymi, którzy mogą ocenić poprawność wyniku agenta.

**Why do I care:** To jest jeden z tych artykułów, które trafiają w sedno bez owijania w bawełnę. Widziałem zespoły, które próbowały zrekompensować słabe zrozumienie domeny większą ilością promptów albo dłuższym kontekstem, i to nigdy nie działa tak dobrze jak zwykła rozmowa nad tablicą przed napisaniem pierwszej linii kodu. Im więcej pracy przejmują agenci, tym bardziej kompetencja architektoniczna zespołu staje się bramką jakości, a nie umiejętność klikania w konkretny framework.

**Link:** [Domain-Driven Design matters more when AI writes your code](https://daily.dev/posts/mAzbsxiUg)

## Systemy wieloagentowe projektowane od złej strony

**TLDR:** Autor przekonuje, że systemy wieloagentowe trzeba projektować od modelu domeny, jego reguł i stanu, a nie od workflow agentów, bo logika biznesowa zaszyta w promptach jest z natury zawodna.

**Summary:** Reguła w stylu "nigdy nie zatwierdzaj roszczeń powyżej 10 tysięcy euro" wpisana w prompt jest krucha, bo model może ją źle zinterpretować albo po prostu zignorować. Kodowanie takich ograniczeń jako błędów domenowych, a nie instrukcji tekstowych, daje agentowi realną pętlę zwrotną: kiedy akcja zostaje odrzucona, agent może rozumować, spróbować ponownie albo poprosić o zgodę człowieka. To jest kierunek stojący za kolejną wersją frameworka Mozaik, który wprowadza współdzielony stan runtime, na którym agenci mogą działać równolegle, podczas gdy model domeny wymusza reguły.

**Key takeaways:**
- Logika biznesowa zaszyta w promptach jest fragile, bo modele mogą ją zignorować lub źle zinterpretować.
- Błędy domenowe dają agentowi pętlę zwrotną: retry, reasoning albo eskalacja do człowieka.
- Mozaik idzie w stronę współdzielonego stanu runtime, na którym wielu agentów działa równolegle pod kontrolą modelu domeny.

**Why do I care:** To jest architektonicznie zdrowa intuicja, którą sam podpisuję pod wieloma projektami: reguły biznesowe należą do warstwy domenowej, nie do warstwy promptów. Natomiast warto pamiętać, że artykuł kończy się wzmianką o hackathonie i promocją własnego frameworka, więc czytam to bardziej jako manifest produktowy niż neutralną analizę architektoniczną.

**Link:** [Why AI Engineers Are Building Multi-Agent Systems From the Wrong Direction](https://daily.dev/posts/rIeHAsuY5)

## Modularne monolity zamiast pochopnych mikroserwisów

**TLDR:** Zanim sięgniesz po mikroserwisy, zbuduj prawdziwe granice wewnątrz monolitu: jawne API modułów, osobne schematy baz danych i testy architektoniczne, które wyłapują naruszenia tych granic.

**Summary:** Modularny monolit wymusza realne granice wewnętrzne. Każdy moduł wystawia jawne API, zamiast pozwalać innym modułom grzebać w swoich wnętrznościach, ma własny schemat bazy danych, zamiast swobodnie współdzielić tabele, i komunikuje się z innymi modułami przez zdefiniowane kontrakty lub zdarzenia, a nie bezpośrednie wywołania współdzielonego kodu. Testy architektoniczne automatycznie wychwytują naruszenia tych granic, gdy kodowa baza rośnie.

Decyzja o przejściu z modularnego monolitu na mikroserwisy powinna wynikać z konkretnych sygnałów, nie z trendów: różne potrzeby skalowania między modułami, odmienne cykle wdrożeń wymagane przez różne zespoły, granice organizacyjne, które czysto mapują się na granice modułów, albo obciążenie bazy danych jednego modułu kolidujące z innymi. Jeśli moduł ma czyste, wymuszone granice i własny schemat w modularnym monolicie, wyciągnięcie go do osobnego serwisu staje się mechaniczną migracją, a nie przepisywaniem od zera.

**Key takeaways:**
- Modularny monolit wymaga jawnych API modułów, osobnych schematów bazy i testów architektonicznych.
- Decyzja o wydzieleniu mikroserwisu powinna wynikać z konkretnych sygnałów skalowania i organizacji, nie z mody.
- Dobrze odizolowany moduł w monolicie da się wydzielić mechanicznie, bez przepisywania od zera.

**Why do I care:** To jest jedna z tych rad architektonicznych, którą powtarzam klientom regularnie, bo widziałem zbyt wiele zespołów, które rozbiły monolit na mikroserwisy zanim w ogóle nauczyły się utrzymywać granice modułów. Testy architektoniczne wymuszające te granice to praktyczny, mierzalny krok, który można wdrożyć dziś, bez podpisywania się pod wielomiesięczną migracją infrastruktury.

**Link:** [Modular Monoliths: Creating Real Boundaries Before Reaching for Microservices](https://daily.dev/posts/EStSOW3rS)

## SQLite jako fundament pod (prawie) wszystko

**TLDR:** Żartobliwa odpowiedź na modę "PostgreSQL do wszystkiego" argumentuje, że SQLite może zastąpić całą półkę infrastruktury: od wyszukiwania pełnotekstowego po kolejki, cache i nawet wektorowe wyszukiwanie pod AI.

**Summary:** Zamiast Solr czy Elasticsearch autor proponuje FTS5 do wyszukiwania pełnotekstowego, zamiast MongoDB przechowywanie dokumentów JSON, zamiast Kafki czy RabbitMQ prostą kolejkę oparta na tabeli, zamiast ClickHouse pliki partycjonowane pod time series, a do wektorowego wyszukiwania w workflow AI rozszerzenie sqlite-vec. Do tego dochodzi cache w pamięci zamiast Redisa, przechowywanie BLOB-ów zamiast systemu plików, rekurencyjne CTE zamiast bazy grafowej i wywołania funkcji w procesie zamiast mikroserwisów.

Argumentacja opiera się na licencji public domain, ekstremalnym pokryciu testami, zobowiązaniu do wsparcia do 2050 roku i tym, że SQLite jest praktycznie wszędzie, wbudowany w systemy operacyjne i języki programowania. Autor nie owija w bawełnę i uczciwie przyznaje, że pojedynczy writer to realny sufit tego podejścia.

**Key takeaways:**
- SQLite z odpowiednimi rozszerzeniami może zastąpić search engine, kolejkę, cache i bazę dokumentową w jednym pliku.
- Kluczowe atuty to licencja public domain, ekstremalne pokrycie testami i deklarowane wsparcie do 2050 roku.
- Ograniczenie jednego writera na raz to szczery i realny sufit tego podejścia, nie ukrywany w tekście.

**Why do I care:** Ten tekst jest przesadzony z założenia, ale to przesadzenie robi dobrą robotę: pokazuje, ile infrastruktury projekty dodają zanim faktycznie osiągną skalę, która ją usprawiedliwia. Dla małych i średnich projektów SQLite jako jeden plik, jedna zależność, zero sieciowych round-tripów, to realna redukcja powierzchni operacyjnej. Sufit z jednym writerem trzeba znać na pamięć, zanim wpakujesz się w architekturę, którą trudno będzie później rozplątać.

**Link:** [SQLite for Everything](https://daily.dev/posts/skgjZLV1N)
