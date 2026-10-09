---
title: "Agenci pod nadzorem: Jev w hookach, Skillpack, Canny, Bugpatrol i wizja Cloudflare"
excerpt: "Własny harness na Pi SDK z modelem Jev, hub na skille, efekt rozbitych szyb w kodzie agentów, hooki blokujące „gotowe” bez testów, agentowy zespół QA i Agent Development Lifecycle od Cloudflare."
publishedAt: "2026-10-09"
slug: "agenci-pod-nadzorem-jev-skillpack-canny-bugpatrol-cloudflare-adlc"
hashtags: "#matg-big6 #agents #ai #llm #security #testing #cicd #cloudflare #claude-code #open-source #dx #generated #pl"
source_pattern: "MatG Big6"
---

## Własna pętla agenta na Pi SDK, z Jevem w hookach

**TLDR:** Tutorial pokazuje, jak zbudować własny harness agenta na Pi SDK i wpiąć w niego Jeva, mały model, który odpowiada na pytania liczbami, nie tekstem. Odpowiedź zajmuje 200 do 400 milisekund, więc kontrole da się puszczać przy każdym wywołaniu narzędzia, a nie tylko przy tych, które wyglądają groźnie.

**Summary:** Agent to model językowy w pętli: czyta zadanie, woła narzędzie, patrzy na wynik i idzie dalej. Kod, który tę pętlę prowadzi, nazywa się harness, i to on decyduje, na co model może sobie pozwolić. Problem w tym, że większość harnessów podejmuje te małe decyzje, pytając zwykły model czatowy, a to kosztuje pełne wywołanie. W praktyce więc większość kontroli się po prostu pomija.

Jev od TypeSafe AI jest odpowiedzią na ten problem. To model zbudowany wyłącznie do szybkich osądów. Opisujesz sytuację, zadajesz kilka pytań, a on zwraca prawdopodobieństwa od zera do jedynki. Nigdy nie pisze tekstu. Autor tutorialu, korzystając z Pi SDK, czyli toolkitu w TypeScripcie, wpina Jeva w trzy miejsca. Pierwsze to bramka przed każdym wywołaniem narzędzia, która pyta, czy ta operacja niszczy dane niepochodzące z bieżącego uruchomienia. Skasowanie notatki dostaje około 0,83, odczyt około 0,01. Drugie miejsce to router, który przed startem zadania wybiera tańszy albo mocniejszy model i robi to tylko raz, bo zmiana modelu w połowie sesji unieważnia cache promptów. Według założyciela Jeva przełączenie z Opusa na Sonneta i z powrotem kosztowało w jednej długiej sesji o połowę więcej niż zostanie przy Opusie. Trzecie to weryfikator, który ocenia gotową odpowiedź i sprawdza, czy twierdzenia mają pokrycie w plikach, które agent faktycznie przeczytał. Agent dostaje najwyżej dwie próby.

Najbardziej podobają mi się drobiazgi inżynierskie. Progi lądują w jednej funkcji polityki, którą można testować zwykłymi liczbami, bez żywego modelu. Są dwa progi, więc powstaje środek: „zapytaj człowieka”. Gdy Jev nie odpowiada, bramka zamyka się (blokuje wywołanie), a router otwiera się (wybiera mocny model). Każdą decyzję zapisuje się do logu razem z liczbami, z zamaskowanymi adresami i kluczami. Autor uczciwie zaznacza też, że ścieżki poza katalogiem projektu odrzuca zwykły kod, bo prawdopodobieństwo może się mylić.

**Key takeaways:**
- Szybki, tani model do osądów pozwala kontrolować każdy krok agenta, nie tylko podejrzane.
- Fail closed dla bramki bezpieczeństwa, fail open dla routera: każda część potrzebuje własnej decyzji na wypadek awarii.
- Wybór modelu raz na początku zadania chroni cache promptów i budżet.
- Progi i polityka powinny siedzieć w jednej, testowalnej funkcji.

**Why do I care:** Jeśli robisz cokolwiek agentowego ponad gotowym Claude Code, ten podział na „model robi robotę, mały model osądza, kod decyduje” to porządny wzorzec architektoniczny. Jedno zastrzeżenie: gate o progu 0,65 blokuje też zapis nowego pliku (około 0,70), więc przed produkcją trzeba kalibrować na własnych logach. Autor sam pisze, że progi są przykładowe, a benchmarki kosztu i jakości dopiero się pojawią. Do tego dochodzi zależność od jednego zewnętrznego API przy każdym wywołaniu narzędzia.

**Link:** [Jev decisions in a Pi SDK harness](https://academy.dair.ai/resources/jev-decisions-in-a-pi-sdk-harness)

## Skillpack: hub na skille z niezmiennymi wersjami

**TLDR:** Skillpack to open-source'owy hub, który można postawić u siebie, do pisania, wersjonowania i współdzielenia skilli w formacie SKILL.md. Każdy release jest niezmienny i przypięty sumą kontrolną, a sekrety agent dostaje tylko przez krótkotrwałe granty.

**Summary:** Dziś najlepsze skille leżą po gistach, Slackach i prywatnych repo. Jedna osoba ma checklistę do review w gistcie, skill do deployu wklejono kiedyś na kanale, a każdy agent używa innej kopii i nikt nie wie, która jest aktualna. Skillpack próbuje to uporządkować. Piszesz SKILL.md albo wgrywasz paczkę, narzędzie sprawdza archiwum, manifest, zależności i deklarowane sekrety, a potem publikujesz niezmienną wersję. Jedną komendą instalujesz ją w Claude Code, Codex, OpenCode albo dowolnym kliencie MCP.

Z punktu widzenia bezpieczeństwa najciekawsze są dwie rzeczy. Sekrety są tylko do zapisu, szyfrowane kopertowo, wskazywane przez identyfikator i nigdy nie pokazywane ponownie, a agent dostaje je przez krótkotrwałe granty. Poza tym agenci łączą się jako delegowani klienci i działają z uprawnieniami osoby, która wyraziła zgodę, w obrębie jednego workspace'u. Skillpack nie uruchamia agentów ani skryptów z paczek skilli. Osobiste skille są domyślnie prywatne, bez admin override. Całość na licencji MIT, z lustrem na GitHubie.

**Key takeaways:**
- Skille traktowane jak artefakty z wersjami i checksumami, a nie jak wklejki ze Slacka.
- Sekrety są write-only i wydawane agentowi na krótko.
- Hub można hostować samemu, a format SKILL.md pozostaje przenośny.

**Why do I care:** Odpalanie w ciemno skilla z gistu to dokładnie ten sam problem, który mieliśmy z paczkami npm, tylko że skill ma wpływ na zachowanie agenta z dostępem do repo. Pinowanie wersji i checksum to rozwiązanie, które znamy z lockfile'ów. Pytanie, na które strona nie odpowiada: kto recenzuje treść skilla przed publikacją. Niezmienna wersja z błędem albo złośliwą instrukcją pozostaje niezmienna.

**Link:** [Skillpack](https://skillpack.app/)

## Teoria wybitych szyb w świecie agentów kodujących

**TLDR:** Agenci traktują istniejący kod jako wzór, więc jeden „tymczasowy” workaround rozlewa się po codebase w dni, nie w lata. Autor widział, jak odsetek PR-ów z code review spadł u niego ze 100% do 2% w pięć miesięcy, a lekarstwem ma być review planu zamiast kodu.

**Summary:** Tekst zaczyna się od wiadomości najbardziej doświadczonego inżyniera w zespole autora. Przy sprzątaniu zauważył on powtarzalny schemat: jeden agent zrobił „przejściowo przyzwoitą” implementację tam, gdzie nie było dobrego wzorca, a potem kolejni agenci traktowali ją jak złoty standard. Takie jednorazowe rozwiązania replikują się błyskawicznie i produkują błędy, od kumulujących się problemów z wydajnością po race condition. Jego reguła brzmi: każda linia musi przejść test „co, jeśli sto osób zrobi dokładnie to samo wszędzie”.

Autor opisuje, jak zespół do tego doszedł. Do kwietnia każdy PR miał co najmniej dwie pary oczu. Przy nowym produkcie bez produkcji review zrobiono opcjonalne, żeby przyspieszyć. Najpierw większość PR-ów nadal przeglądano, ale dojście do produkcji w minuty zamiast godzin uzależnia i liczba review stopniowo spadała. Agentowe review z trzema agentami też stało się wąskim gardłem. Zespół próbował rozdzielić zadania na „walidacyjne” (jednorazowe UI) i „infrastrukturalne”, ale to też nie przetrwało. Review było mechanizmem, który zmuszał ludzi do prawdziwego zrozumienia kodu. Gdy zniknęło, wszyscy zaczęli ucinać drogę na skróty. Liczby: z czterech PR-ów dziennie do dwudziestu ośmiu w sierpniu, wolumen kodu około ośmiokrotnie większy, review ze 100% do 2%.

Wniosek autora jest taki, że nie da się dalej recenzować wszystkiego ręcznie, ale niczego nie recenzować też się nie da. Najlepszą radą, jaką słyszał, jest opcjonalne review, ale na około 5% PR-ów, plus mnóstwo review planów, czyli drugi inżynier przegląda szczegółowy plan agenta. Sam przyznaje, że dobrego procesu dla plan review jeszcze nie sprawdził, a nikt, nawet Anthropic, nie znalazł dobrego rozwiązania.

**Key takeaways:**
- Rozbita szyba w repo staje się wzorcem dla agentów, więc degradacja przyspiesza z lat do dni.
- Code review było przede wszystkim wymuszaniem zrozumienia kodu, a dopiero potem wyłapywaniem błędów.
- Proponowane remedium to review planu i próbkowanie około 5% PR-ów, jeszcze niesprawdzone przez autora.

**Why do I care:** To jest najbardziej praktyczny tekst w tym zestawie, bo każdy zespół z agentami zmierza w tę stronę. Brakuje mi jednak jednego: dowodu, że zespół ma problem z jakością, a nie tylko anegdoty o jednym seniorze i jednym sprzątaniu. Liczba PR-ów rośnie, ale czy rośnie liczba defektów na produkcji, tego w tekście nie ma, bo produktu jeszcze nie ma na produkcji. A review planu ma ten sam kłopot co review kodu: ktoś musi to czytać uważnie. Z perspektywy architekta najtańsza obrona to dobre wzorce w repo i usuwanie rozbitych szyb od razu, bo agent kopiuje to, co widzi.

**Link:** [The broken windows theory of coding agents](https://www.manager.dev/newsletter/the-broken-windows-theory-of-coding-agents)

## Canny: hooki, które nie pozwolą agentowi skończyć bez przechodzącego testu

**TLDR:** Canny to zestaw hooków do Claude Code i Codexa, który blokuje zakończenie sesji, dopóki po ostatniej edycji kodu nie przejdzie test, build albo lint. Zasada projektu: fakty idą do kodu, osądy do Jeva, i tylko fakty mogą blokować.

**Summary:** Punktem wyjścia jest cytat z pierwszego uruchomienia: agent napisał funkcję przez heredoc w shellu, niczego nie odpalił i zakończył słowami „Done. Skipped tests”. Żaden plik z regułami nic tu nie zdziała, bo prosi model, żeby pamiętał, a nic nie sprawdza, czy pamięta. Canny prowadzi dopisywany tylko w jedną stronę ledger tego, co agent faktycznie zrobił, i przy próbie zakończenia sesji sprawdza, czy po ostatniej edycji kodu przeszła jakaś komenda będąca testem, buildem, lintem albo type-checkiem. Jeśli nie, odmawia i podaje powód z nazwami plików i ostatnią komendą. W opisanym przebiegu agent został zablokowany dwa razy, a potem uruchomił npm test i dostał zielone światło.

Podział odpowiedzialności jest tu świadomy. Fakt to coś, co ledger potrafi udowodnić: plik się zmienił, komenda zwróciła kod 1, ten sam błąd pojawił się trzy razy, tekst do zapisu zawiera klucz AWS. To rozstrzyga kod, offline, bez klucza API. Osąd, na przykład „czy ta wiadomość twierdzi, że praca jest skończona”, idzie do Jeva i może tylko poluzować bramkę, nigdy ją zacisnąć. Canny dodatkowo odmawia zapisu sekretów, pyta o zgodę przy usuwaniu testów albo dodawaniu skipów, i przepisuje komendę z pipe do taila tak, żeby zachować kod wyjścia testu. Przy każdym hooku koszt to około 40 milisekund, a komenda replay odtwarza wszystkie werdykty z ledgera.

Autor jest uczciwy w kwestii efektów. Benchmark na pięciu zadaniach z Opusem 5 i Sonnetem 5 pokazał, że wyniki z Cannym i bez niego są takie same, bo zadania były dla tych modeli za łatwe. Projekt na razie zatrzymuje konkretną awarię, ale nie udowodnił poprawy jakości na całym projekcie.

**Key takeaways:**
- „Done” bez przechodzącego testu po ostatniej edycji jest odrzucane deterministycznie, na podstawie ledgera.
- Model osądzający nie blokuje, tylko dopisuje notatki lub rozluźnia bramkę.
- Wpływ na jakość pracy agenta całego projektu nie został jeszcze zmierzony.

**Why do I care:** Podoba mi się zasada „tylko fakty blokują”, bo każdy, kto próbował bramkować pipeline probabilistycznym modelem, zna flaky decyzje, które psują zaufanie do narzędzia. To po prostu sprawdzenie, że CI-podobny krok został uruchomiony, przeniesione do pętli agenta. Słabość widać w samym opisie: lista komend uznawanych za check jest konfigurowalna, a agent z dostępem do shella może uruchomić canny trust sam, co autor otwarcie przyznaje. To speed bump, nie sandbox. Dla zespołu, który już ma pewne reguły w AGENTS.md, jest to tani sposób na zamianę „proszę pamiętać” w „nie przejdziesz”.

**Link:** [Canny](https://github.com/qkal/Canny)

## Bugpatrol (dawniej Bughunters): agenci robiący QA za ciebie

**TLDR:** Trzech agentów robi QA: Explorer klika po aplikacji jak tester, Judge wybiera prawdziwe bugi, a Fixer pisze poprawkę w osobnym worktree, którą dwaj pierwsi testują jeszcze raz. Patrol sprawdza origin/main co 30 minut, a PR-y otwiera dopiero po włączeniu tej opcji.

**Summary:** Bugpatrol, wcześniej znany jako Bughunters, to otwartoźródłowe narzędzie zespołu Nebula, którego używają codziennie do testowania własnych aplikacji desktopowych i mobilnych. Explorer uruchamia aplikację, mapuje ekrany i widzi też błędy z konsoli oraz nieudane requesty. Judge decyduje, które zgłoszenia są prawdziwymi błędami, i pisze issues. Fixer pracuje w osobnym git worktree, a poprawkę ponownie testują Explorer i Judge w działającej aplikacji. Potem następuje publikacja: PR dla każdej poprawki i issue dla poważnych błędów bez fixa.

Narzędzie testuje aplikacje webowe, Electrona, desktopowe, iOS i Androida, API po HTTP oraz CLI. Pętla nie kończy się sama: co 30 minut ściąga najnowszy origin/main, a eksploruje i ocenia tylko wtedy, gdy są nowe commity. Dzięki temu całodzienny patrol kosztuje mało, gdy nikt nic nie merguje. Fixer i integracja z GitHubem są domyślnie wyłączone. Po włączeniu PR-y i issues otwierają się automatycznie, bez kroku akceptacji, choć PR-y są domyślnie draftami. Zamknięcie PR-a uczy patrol, żeby go nie otwierał ponownie. Sekrety w instrukcjach to placeholdery, prawdziwe wartości nigdy nie trafiają do modelu. Autorzy radzą dać Judge'owi najmocniejszy model, a Explorerowi szybki i tani. Jest też akcja GitHub do review PR-ów w CI i dashboard.

**Key takeaways:**
- Rozdzielenie ról (eksploracja, ocena, naprawa) i ponowny test poprawki w działającej aplikacji.
- Patrol skanuje tylko nowe commity, więc koszt idzie za aktywnością repo.
- Fixer i publikacja na GitHubie są opt-in, a patrol należy puszczać na osobnej maszynie, nie w swoim checkoucie.

**Why do I care:** Ciekawe jest to, że poprawka nie jest uznawana za dobrą tylko dlatego, że jej autor tak twierdzi: sprawdza ją osobny agent w żywej aplikacji. To dobra odpowiedź na problem z poprzedniego tekstu, bo pomaga wyłapać to, co przechodzi obok mniej uważnego review. Wątpliwości mam dwie. Po pierwsze, wiarygodność zależy od jakości instrukcji i konta testowego, które trzeba przygotować samemu. Po drugie, w tekście nie ma danych o odsetku fałszywych alarmów, a to w takich systemach decyduje, czy zespół w ogóle czyta wygenerowane issues.

**Link:** [Bugpatrol (Bughunters)](https://github.com/agent-labs-dev/bughunters)

## Cloudflare i Agent Development Lifecycle jako następca SDLC

**TLDR:** Cloudflare proponuje Agent Development Lifecycle jako następcę SDLC: „fabryki oprogramowania”, w których agenci sami prowadzą zmianę przez CI aż po deploy. Najciekawszy element to Trust Ratchet, który odbiera agentowi uprawnienia, gdy tylko dotknie on chronionych zasobów. To na razie wizja, twardych danych w tekście brak.

**Summary:** Argument Cloudflare jest taki, że modele przyspieszyły generowanie kodu, ale testowanie, deployment i utrzymanie nadal stoją w kolejce do ludzkich pipeline'ów CI. Platforma dla ADLC ma być programowalna, skalowalna poziomo i sterowana zdarzeniami, z podglądowym deploymentem dla każdego agenta, który pozwala testować równolegle na środowisku zbliżonym do produkcji, bez wąskiego gardła w stagingu. Zmiany mają być atomowe, a pętle zwrotne oparte na danych z produkcji.

Rdzeniem jest produkt Workflows, który może dynamicznie uruchamiać kontenery, headless browsery i subagentów. Na nim Cloudflare zbudował @cloudflare/ci, system CI/CD pozwalający agentom reagować na awarie, naprawiać błędy i triażować zgłoszenia. Dochodzi dashboard obserwowalności ze śladami zgodnymi z OpenTelemetry, pokazujący wywołania modeli, narzędzi i zużycie tokenów, oraz Agent Access Model. Agenci dostają krótkotrwałe poświadczenia związane z zadaniem, z pułapem możliwości. Trust Ratchet obniża te możliwości po dotknięciu chronionych zasobów, co ma ograniczać ruch boczny, gdy agent przetworzy złośliwe dane wejściowe.

**Key takeaways:**
- Cloudflare przedstawia CI/CD jako szczególny przypadek Workflow, z agentami jako pełnoprawnymi uczestnikami.
- Uprawnienia agenta mają maleć w trakcie pracy, a nie tylko być ograniczone na starcie.
- Artykuł opisuje architekturę i produkty, ale nie podaje żadnych wyników ani pomiarów.

**Why do I care:** Trust Ratchet to dobry pomysł i widać, że ta sama myśl przewija się przez cały dzisiejszy zestaw: zaufanie do agenta powinno wynikać z tego, co zrobił, a nie z tego, co obiecał. Sama „fabryka oprogramowania” brzmi jak opis produktu dostawcy, który sprzedaje platformę do jej budowy. Pytania bez odpowiedzi: kto odpowiada za zmianę, którą agent przeprowadził od pomysłu do deployu, i co z regulacjami wymagającymi człowieka w pętli. Traktowałbym to jako kierunek do obserwowania, nie plan na ten kwartał.

**Link:** [Cloudflare Introduces the Agent Development Lifecycle Stack to Replace Traditional SDLC](https://www.infoq.com/news/2026/09/cloudflare-adlc-agents/)
