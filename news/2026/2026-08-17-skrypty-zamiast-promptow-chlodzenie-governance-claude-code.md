---
title: "Skrypty zamiast promptów, klimatyzacja bez planety w tle i dlaczego Claude Code to warstwy, nie sztuczki"
excerpt: "Przegląd czterech tekstów z HackerNoon: od zamiany powtarzalnych kroków AI na testowane skrypty, przez rewolucję w chłodzeniu budynków, po ład decyzyjny w transformacji cyfrowej i domknięcie serii o pełnym workflow Claude Code."
publishedAt: "2026-08-17"
slug: "skrypty-zamiast-promptow-chlodzenie-governance-claude-code"
hashtags: "#hackernoon #ai #claudecode #architecture #devtools #generated #pl"
source_pattern: "HackerNoon"
---

## Zamień powtarzalne kroki skilla na testowany skrypt, nie na kolejny prompt

**TLDR:** Artykuł pokazuje prosty, ale często ignorowany podział pracy między modelem a kodem: to, co zawsze działa tak samo, powinno być skryptem z testami, a nie kolejnym akapitem instrukcji w prompcie. Autor pokazuje konkretny przykład z API rozliczeniowym, retry i sekretami trzymanymi w .env, zamiast w treści promptu.

**Summary:** Punkt wyjścia jest prozaiczny: masz skilla, który za każdym razem wykonuje ten sam krok, na przykład wywołanie API albo parsowanie configu, i za każdym razem prosisz o to model od nowa, w wolnej formie. Problem w tym, że model interpretuje instrukcję na nowo przy każdym uruchomieniu, więc coś, co działało w poniedziałek, w piątek może się zachowywać inaczej. Do tego dochodzi realne ryzyko bezpieczeństwa, bo w pośpiechu klucz API ląduje wprost w treści prompta, a stamtąd trafia do logów i transkryptów rozmowy.

Rozwiązanie jest równie proste co skuteczne. Krok, który zawsze bierze to samo wejście i zawsze zwraca to samo wyjście, zasługuje na prawdziwy skrypt w języku z frameworkiem testowym, a nie na kolejną wersję instrukcji. Sekrety wędrują do pliku .env i są odczytywane w runtime, wywołania API dostają retry z exponential backoff, a całość jest pokryta testami jednostkowymi i przechodzi przez code review jak każdy inny fragment produkcyjnego kodu. Model zostaje odpowiedzialny tylko za to, czego skrypt nie potrafi, czyli za decyzję, który skrypt odpalić.

Ciekawe jest rozróżnienie między skryptem a serwerem MCP. MCP ma sens tam, gdzie potrzebny jest żywy stan, na przykład sesja bazodanowa albo długo trwająca subskrypcja. Dla pojedynczego wywołania API albo reguły formatowania stawianie całego serwera MCP to przerost formy nad treścią, bo dochodzi własna autoryzacja, protokół i proces, który trzeba utrzymywać, mimo że w praktyce jest wywoływany rzadko. Skrypt się uruchamia, robi swoje i kończy działanie, bez śladu w postaci procesu do monitorowania.

Autor dorzuca też przykład złego i dobrego prompta, który dobrze pokazuje różnicę w praktyce: zamiast wklejać klucz sk_live wprost do requestu i liczyć na "kilka prób, aż zadziała", dobry prompt każe napisać skrypt, czytać klucz z BILLING_API_KEY, dodać retry z backoffem na 429 i 5xx oraz pokryć logikę testem. To małe przesunięcie w formułowaniu prośby, ale robi ogromną różnicę w tym, co dostajesz na wyjściu.

Tekst kończy się przestrogą, którą łatwo zignorować: nie każdy krok zasługuje na skrypt, jednorazowe zadania albo rozumowanie po nieustrukturyzowanym wejściu wciąż lepiej zostawić modelowi. Warto też domknąć to na poziomie harnessu, blokując swobodne odpalanie skryptów ad hoc przez bash czy PowerShell i wymuszając, żeby skille korzystały z już zaakceptowanych, przetestowanych skryptów.

**Key takeaways:**
- Krok, który zawsze daje to samo wyjście dla tego samego wejścia, powinien być skryptem z testami, nie promptem powtarzanym za każdym razem
- Sekrety należy trzymać w .env i czytać w runtime, nigdy wpisywać wprost do prompta czy kodu
- Retry z exponential backoff wokół wywołań API to często pomijany, ale krytyczny element
- MCP ma sens dla żywego stanu (baza danych, subskrypcja), skrypt wystarcza dla pojedynczego wywołania API
- Warto zablokować w harnessie swobodne odpalanie skryptów ad hoc i wymusić korzystanie z przejrzanych, zatwierdzonych skryptów

**Why do I care:** To jest dokładnie ten rodzaj higieny, którą sam wprowadzam w projektach z agentami kodującymi i który regularnie trzeba tłumaczyć zespołowi od nowa. Różnica między "skill, który za każdym razem improwizuje" a "skill, który woła przetestowany skrypt" to różnica między czymś, co da się utrzymać produkcyjnie, a czymś, co jest fajne w demie i katastrofalne po trzech tygodniach w rękach innego zespołu. Podoba mi się zwłaszcza argument kosztowy, bo re-eksplikowanie tych samych reguł w każdym prompcie to realne tokeny, które można wydać gdzie indziej, a rozróżnienie skrypt kontra MCP powinno wisieć na ścianie w każdym zespole, który właśnie odkrył MCP i chce nim rozwiązać wszystko.

**Link:** [AI Coding Tip 030 - Turn Repeatable Skill Steps Into Tested Scripts Instead of Prompts](https://hackernoon.com/ai-coding-tip-030-turn-repeatable-skill-steps-into-tested-scripts-instead-of-prompts)

## Rewolucja w chłodzeniu, czyli dlaczego klimatyzacja przestaje być gadżetem

**TLDR:** Latem 2026 Europa masowo kupowała przenośne klimatyzatory typu Midea PortaSplit, płacąc za nie wielokrotność ceny sklepowej, co obnażyło, jak nieprzygotowany jest kontynent na upały. Artykuł przechodzi od tego jednego produktu do przeglądu technologii, które mają zastąpić stuletnią zasadę działania klimatyzacji, od chłodzenia radiacyjnego w kosmos po sieci chłodu miejskiego.

**Summary:** Scena otwierająca jest wymowna: box na kółkach za 800 euro sprzedawany na czarnym rynku za 5000, bo niemieckie i brytyjskie mieszkania praktycznie nie mają klimatyzacji, a przepisy konserwatorskie zabraniają wiercenia w elewacjach. PortaSplit rozwiązuje to sprytnie, bo dzieli jednostkę na część zewnętrzną i wewnętrzną połączoną cienkim wężem, który mieści się w uchylonym oknie, więc omija regulacje zamiast z nimi walczyć. To jednak plaster na ranę, nie lekarstwo, bo wciąż zużywa prąd i wciąż zawiera freon o dużym potencjale cieplarnianym.

Dalsza część tekstu to przegląd technologii, które faktycznie zmieniają fizykę problemu. Najciekawsze są systemy z ciekłym desykantem, jak Blue Frontier, gdzie słona solanka wysysa wilgoć z powietrza chemicznie, zamiast przechładzać powietrze poniżej punktu rosy i potem je dogrzewać, co robi klasyczna klimatyzacja. Solanka działa jednocześnie jak bateria termiczna, bo można ją regenerować w południe, gdy prąd słoneczny jest tani, i zużywać zgromadzoną pojemność chłodniczą wieczorem, w szczycie zapotrzebowania na sieć. Cykl Maisotsenko w urządzeniach Seeley idzie w podobnym kierunku, chłodząc powietrze do punktu rosy bez dodawania wilgoci, wyłącznie wodą jako czynnikiem chłodniczym.

Bardziej egzotyczne rozwiązania obejmują materiały barokaloryczne, jak kryształy neopentyloglikolu od Barocal, które oddają ciepło pod naciskiem mechanicznym zamiast przez sprężanie gazu, oraz panele SkyCool, które wypromieniowują ciepło budynku wprost w zimną przestrzeń kosmiczną, wykorzystując wąskie okno przezroczystości atmosfery. Obie technologie obiecują chłodzenie bez gazów cieplarnianych, co przy skali globalnego rynku HVAC wartego setki miliardów dolarów robi realną różnicę.

Artykuł kończy hierarchią zaleceń z raportu UNEP: najpierw rozwiązania pasywne jak zacienienie i lepsze przeszklenia, potem tanie i hybrydowe jak wentylatory z odparowaniem, dopiero na końcu maszyny mechaniczne z czystszymi czynnikami. Sieci chłodu miejskiego w Paryżu, Singapurze i Chicago pokazują, że traktowanie chłodzenia jak wspólnej infrastruktury, zamiast tysięcy prywatnych urządzeń na dachach, daje oszczędności rzędu 50 procent energii i drastyczny spadek emisji czynników chłodniczych.

**Key takeaways:**
- Panika zakupowa na PortaSplit obnażyła, że Europa Zachodnia praktycznie nie ma infrastruktury chłodzenia (penetracja AC na poziomie 3-5 procent w Niemczech i Wielkiej Brytanii)
- Systemy z ciekłym desykantem rozdzielają osuszanie i chłodzenie, eliminując marnotrawstwo klasycznej klimatyzacji, i mogą działać jako bateria termiczna
- Materiały barokaloryczne i panele chłodzenia radiacyjnego to technologie stałe, bez gazów cieplarnianych w cyklu chłodniczym
- Sieci chłodu miejskiego (Paryż, Singapur, Chicago) traktują chłodzenie jak wspólną infrastrukturę i dają oszczędności rzędu 50 procent energii
- UNEP rekomenduje hierarchię: najpierw pasywne rozwiązania budowlane, potem hybrydy niskoenergetyczne, na końcu efektywne maszyny z czystymi czynnikami

**Why do I care:** To nie jest tekst o frontendzie, ale zostawiam go w podsumowaniu, bo pokazuje coś, co widzę też w inżynierii oprogramowania: skalowanie łatki (PortaSplit) w nieskończoność zamiast zmiany architektury (nowe fizyczne zasady chłodzenia) daje krótkoterminową ulgę i długoterminowy problem. Ciekawy jest też wątek infrastruktury współdzielonej kontra tysiące prywatnych instancji, bo to ten sam argument, który słyszę przy dyskusjach o mikroserwisach kontra platformach współdzielonych. Chłodzenie jako "infrastruktura publiczna XXI wieku" to niezła metafora dla wielu systemów, które budujemy jako indywidualne rozwiązania, zamiast jako wspólną usługę.

**Link:** [The Cooling Revolution That Could Save a Warming World](https://hackernoon.com/the-cooling-revolution-that-could-save-a-warming-world)

## Governance jako system operacyjny transformacji cyfrowej

**TLDR:** Autor argumentuje, że porażki wdrożeń AI, ERP czy chmury rzadko wynikają z jakości technologii, a niemal zawsze z braku jasnej struktury decyzyjnej: kto decyduje, kto jest właścicielem, kto płaci, kto ponosi ryzyko i kto odpowiada, gdy coś pójdzie nie tak. Proponuje czteropoziomowy model governance i konkretne praktyki, jak decision records i funding gates, które robią z governance przyspieszacz, a nie hamulec.

**Summary:** Punkt wyjścia jest znajomy każdemu, kto pracował przy większym wdrożeniu: dwie firmy kupują ten sam system ERP, ten sam zespół konsultantów, ten sam playbook, a jedna transformuje się skutecznie, druga dwa lata spiera się o zakres i budżet, po czym cicho odpisuje inwestycję w straty. Domyślne założenie kadry zarządzającej brzmi "kupimy dobrą technologię, transformacja przyjdzie sama", ale w praktyce technologia przechodzi przez filtr jakości decyzji, jakość decyzji determinuje egzekucję, a egzekucja determinuje wynik. Pominięcie środkowych kroków sprawia, że nawet najlepsza platforma prowadzona przez organizację niezdolną do szybkich, jednoznacznie przypisanych decyzji, produkuje ten sam powolny, sporny, niedokończony rezultat.

Autor rozbija governance na cztery warstwy. Strategiczna decyduje, które inicjatywy w ogóle powinny istnieć i kiedy projekt należy zatrzymać zamiast trzymać go przy życiu z powodu sunk cost. Platformowa przypisuje jednego właściciela biznesowego do każdego dużego systemu, kogoś, kto potrafi powiedzieć, po co dana platforma istnieje. Finansowa tłumaczy, dlaczego budżety IT rosną rok do roku bez wyraźnego powodu, i wymusza funding gates, czyli ponowne uzasadnienie wydatku na każdym etapie zamiast automatycznego przedłużania zeszłorocznej linii budżetowej. Operacyjna zajmuje się codzienną mechaniką: jak zatwierdzane są zmiany, jak dokumentowane są decyzje architektoniczne, jak śledzone jest ryzyko po tym, jak minie początkowy entuzjazm projektu.

Najciekawszy jest fragment o tym, że dobrze zaprojektowany governance nie spowalnia organizacji, tylko daje jej opcjonalność. Firma z jasną własnością platform i udokumentowanymi decyzjami może zmienić dostawcę bez sześciomiesięcznej archeologii ustaleń, może wycofać linię produktową albo przyjąć nową zdolność AI bez ponownego ustalania własności od zera. To jest właśnie odwrotność powszechnego wyobrażenia o governance jako komitetach i binderach, których nikt nie czyta.

Praktyczny model, który proponuje autor, składa się z pięciu elementów: cyklicznego forum decyzyjnego, którego jedynym zadaniem jest podejmowanie decyzji, decision records opisujących co, przez kogo i dlaczego zostało zdecydowane, jednoznacznej własności każdej platformy, funding gates wymuszających uzasadnienie kolejnej transzy budżetu, oraz governance dostawców, gdzie dostawca wspiera strategię, ale nigdy nie staje się strategią. Porównanie do lotnictwa i energetyki jądrowej, gdzie dobry proces od dekad wygrywa z dobrym sprzętem, jest trafne i dobrze osadza cały argument.

**Key takeaways:**
- Porażki transformacji cyfrowej wynikają zwykle z braku jasnej struktury decyzyjnej, nie z jakości samej technologii
- Pięć pytań governance: kto decyduje, kto jest właścicielem, kto finansuje, kto ponosi ryzyko, kto jest odpowiedzialny w razie porażki
- Cztery warstwy: strategiczna, platformowa, finansowa i operacyjna, każda odpowiada na inny typ pytania
- Dobry governance zwiększa opcjonalność organizacji (łatwiejsza zmiana dostawcy, wycofanie platformy) zamiast ją spowalniać
- Decision records i funding gates to konkretne, wdrażalne praktyki, nie abstrakcyjne hasła

**Why do I care:** Ten tekst rezonuje z tym, co widzę w projektach architektonicznych: najlepszy design system czy najlepsza platforma frontendowa nic nie da, jeśli nikt nie jest jednoznacznie odpowiedzialny za jej rozwój i nikt nie potrafi szybko zdecydować, czy dany komponent wchodzi do biblioteki wspólnej, czy zostaje lokalnym rozwiązaniem. Decision records to praktyka, którą powinien mieć każdy zespół pracujący z architekturą rozproszoną albo mikrofrontendami, bo pytanie "dlaczego to tak zrobiliśmy" wraca regularnie, a odpowiedź "nikt już nie pamięta" kosztuje więcej niż jakikolwiek dług techniczny w kodzie.

**Link:** [Why Governance Determines Digital Transformation Success](https://hackernoon.com/why-governance-determines-digital-transformation-success)

## Claude Code jako warstwowy system, nie zbiór osobnych funkcji

**TLDR:** Dziesiąty i domykający tekst serii pokazuje, jak CLAUDE.md, modele, hooki, serwery MCP, skille, subagenty i zespoły agentów łączą się w jeden workflow w realnej sesji, zamiast działać jako osobne, niepowiązane funkcje. Artykuł opisuje konkretne sygnały degradacji sesji, kolejność interwencji i jeden pełny przykład wdrożenia feature'a z całym stackiem złożonym w praktyce.

**Summary:** Główna teza jest prosta i dobrze uzasadniona: każda warstwa wpływa na każdą inną. Przeładowany CLAUDE.md chowa ważne reguły pod szumem, serwer MCP z pięćdziesięcioma narzędziami napompowuje budżet każdego wywołania narzędzia, a subagent, który zwraca gadatliwy raport, i tak ląduje z pełnym kosztem z powrotem w głównej sesji. Autor układa te warstwy w tabelę: pamięć to CLAUDE.md, model to ustawienie tieru i effort, egzekwowanie to hooki, integracja to MCP, wiedza to skille, izolacja to subagenty, koordynacja to zespoły agentów. Każda odpowiada za inny wymiar sesji, ale żadna nie działa w oderwaniu od pozostałych.

Bardzo konkretny jest fragment o scopingu przed eksploracją. Nieograniczone polecenie w stylu "zbadaj, dlaczego autentykacja jest wolna" wysyła model przez setki plików, middleware, zapytania do bazy, warstwy cache, logi, a kiedy w końcu wraca z odpowiedzią, kontekst wchłonął całą podróż, nie tylko cel. Alternatywa to precyzyjne wskazanie, co sprawdzić, w jakiej kolejności i z jakim maksymalnym zakresem, a dla naprawdę szerokich dochodzeń, delegacja do subagenta z jawnie zdefiniowanym formatem wyjścia, na przykład maksymalnie dwadzieścia pozycji ze ścieżką pliku, nazwą funkcji i typem zapytania.

Rozróżnienie hooków od instrukcji w CLAUDE.md jest chyba najbardziej praktyczną częścią artykułu. CLAUDE.md jest doradczy, hook jest deterministyczny, bo instrukcję można przeoczyć, kontekst można skompresować, a model może uzasadnić sobie wyjątek od reguły, którą uważa za nietrafioną w danym przypadku. Hook uruchamia się niezależnie od tego wszystkiego. Autor wyróżnia trzy zdarzenia hooków pokrywające większość zastosowań produkcyjnych: PreToolUse do blokowania przed wykonaniem narzędzia, PostToolUse do lintowania czy testów po edycji, i Stop do weryfikacji builda po zakończeniu tury. Dorzuca też ostrzeżenie, które sam bym docenił wcześniej: hooki formatujące uruchamiane po każdym zapisie pliku potrafią pochłonąć znaczące ilości tokenów w długiej sesji, więc przy wolnym formatterze lepiej uruchamiać go między sesjami niż po każdym zapisie.

Sekcja o typowych błędach czyta się jak lista rzeczy, które sam widziałem w praktyce: przeładowany CLAUDE.md, gdzie model zaczyna ignorować część instrukcji nie z premedytacją, tylko dlatego, że ważne reguły giną w szumie; nieoskopowana eksploracja, która powinna trafić do subagenta, a zamiast tego zjada kontekst w głównej sesji; subagent, który zwraca sześć tysięcy tokenów raportu, negując cały sens izolacji; oraz luka między zaufaniem a weryfikacją, gdzie implementacja wygląda wiarygodnie i trafia na produkcję bez realnego sprawdzenia brzegowych przypadków. Przykład pełnej sesji z researchem przez subagenta, blokadą hooka na migracjach i code review z ograniczonym formatem odpowiedzi spina wszystko w jeden spójny obraz tego, jak to ma wyglądać w praktyce.

**Key takeaways:**
- CLAUDE.md, model, hooki, MCP, skille, subagenty i zespoły agentów to warstwy jednego systemu, nie osobne funkcje do włączania według uznania
- Scoping eksploracji przed jej rozpoczęciem to najskuteczniejszy sposób na wydłużenie użytecznego czasu życia sesji
- Hooki są deterministyczne i egzekwują reguły, których instrukcja w CLAUDE.md może nie dopilnować
- Format wyjścia subagenta jest częścią jego definicji, gadatliwy raport neguje sens izolacji kontekstu
- Serwery MCP warto skopować per-projekt w .mcp.json, zamiast trzymać wszystko globalnie i marnować budżet tokenów na nieużywane narzędzia

**Why do I care:** To domknięcie serii jest lepsze niż większość materiałów "best practices", bo zamiast listy porad w próżni, pokazuje jak te elementy zawodzą razem, w konkretnej sesji, na konkretnym przykładzie. Rozróżnienie hook kontra instrukcja to coś, co powinien zrozumieć każdy, kto konfiguruje agentów kodujących w swoim zespole, bo póki nie masz deterministycznego egzekwowania reguł krytycznych, jesteś tylko jedną skompresowaną sesją od tego, żeby ktoś scommitował coś prosto do main. Doceniam też szczerość co do kosztu hooków formatujących, bo to dokładnie ten rodzaj detalu, który wychodzi dopiero po tygodniach realnego użycia, nie w pierwszym tygodniu configu.

**Link:** [Navigating Claude Code: The Full Workflow](https://hackernoon.com/navigating-claude-code-the-full-workflow)
