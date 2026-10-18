---
title: "HackerNoon: dlaczego laboratoria AI zwalniają, uniwersalny AGENTS.md, koszt zespołów agentów i geometria zamiast skali"
excerpt: "Kończące się dane treningowe i model collapse, stackowo-neutralny AGENTS.md, porównanie ośmiu platform do orkiestracji agentów oraz pięć mitów o AI obalanych matematyką."
publishedAt: "2026-10-18"
slug: "hackernoon-dane-treningowe-agents-md-orkiestracja-agentow-geometria-ai"
hashtags: "#hackernoon #ai #llm #agents #ml #claude #prompt-engineering #generated #pl"
source_pattern: "HackerNoon"
---

## Prawdziwy powód, dla którego firmy AI hamują

**TLDR:** Autor twierdzi, że laboratoria nie zwalniają z troski o bezpieczeństwo, tylko dlatego, że kończą im się oryginalne dane. Do tego sieć zalewa tekst generowany przez modele, co grozi zjawiskiem model collapse.

**Summary:** Teza jest taka, że przez siedem lat skalowanie LLM-ów polegało na dorzucaniu GPU i zeskrobanego tekstu, a ta studnia jest już na dnie. Autor powołuje się na Epoch AI, który szacuje, że zasób publicznego tekstu pisanego przez ludzi skończy się między 2026 a 2028 rokiem. W tym samym czasie sieć wypełniają farmy SEO, syntetyczne wpisy na LinkedInie i boty kłócące się z botami.

Model collapse tłumaczy jako kopię kopii. Modele regresują do średniej i tracą długi ogon rozkładu, czyli idiomy, rzadkie kontrargumenty i wiedzę niszową. Gdy model B uczy się na wyjściu modelu A, ten ogon znika. Autor opisuje badania z Oksfordu i Cambridge, w których rekurencyjnie trenowane modele się rozpadały.

Ciekawy jest wątek znaków wodnych. Wiadomo, że każdy je usunie parafrazą albo tłumaczeniem przez dwa języki. Autor odpowiada, że firmom nie chodzi o złośliwego użytkownika, tylko o automaty, które wrzucają surowe wyjście API do bazy. Znak wodny ma więc działać jak etykieta na toksycznym materiale, chroniąca własne scrapery przed trucizną w pretrainingu.

Na końcu cztery prognozy. Otwarta sieć przestaje być paliwem dla otwartego AI, bo labs kupują zamknięte archiwa. Dane syntetyczne działają tylko tam, gdzie jest weryfikator, na przykład kompilator. Pojawi się plateau, bo modele uczą się na własnej średniej prozie. A autentyczna ludzka praca drożeje.

**Key takeaways:**
- Epoch AI szacuje wyczerpanie publicznego tekstu ludzkiego na lata 2026 do 2028.
- Model collapse polega na utracie długiego ogona rozkładu przy trenowaniu na wyjściu poprzednich modeli.
- Dane syntetyczne działają, gdy istnieje weryfikator, a nie dla prozy i filozofii.
- Znaki wodne to według autora ochrona przed własnym zanieczyszczeniem, a nie ochrona praw autorskich.

**Why do I care:** Dla frontendowca to dość odległa historia, ale wniosek praktyczny jest bliski. Jeśli kod i dokumentację coraz częściej pisze model, a potem inny model się na nich uczy, jakość tego, co leży w repozytoriach, ma znaczenie. Autor nie podaje własnych liczb, ten zakres 40 do 60 procent syntetycznej sieci jest zgadywaniem. I pomija pytanie, czy firmy naprawdę hamują. Wątek, że to nie bezpieczeństwo, jest chwytliwym tytułem bez dowodu.

**Link:** [The Real Reason AI Companies Are Tapping the Brakes (Hint: It's Not Safety)](https://hackernoon.com/the-real-reason-ai-companys-are-tapping-the-brakes-hint-its-not-safety)

## Uniwersalny AGENTS.md dla każdego agenta i stacku

**TLDR:** Autor rozebrał popularne repozytoria z instrukcjami dla agentów kodujących i złożył z nich neutralny wobec stacku AGENTS.md. Rdzeń ma poniżej 200 linii, a moduły w katalogu rules ładują się tylko wtedy, gdy zadanie ich wymaga.

**Summary:** Rdzeń pliku obejmuje to, co się nie zmienia między technologiami. Agent ma zrozumieć zadanie, trzymać zmianę małą i skupioną, uważać na dane wrażliwe, debugować porażki i sprawdzać wynik. Bez wyraźnej prośby nie kasuje plików, nie przepisuje historii Gita i nie robi force-pusha. Nie osłabia też testu, żeby go przepuścić. Zamiast commitować, proponuje komunikat commita.

Autor zaznacza uczciwie, że to są instrukcje dla agenta. Czynności, które mają być zablokowane bez wyjątku, nadal wymagają uprawnień, hooków albo CI. Kolejna reguła dotyczy weryfikacji. Zanim agent napisze, że coś działa, uruchamia sprawdzenie, czyta wynik i go raportuje. Komunikat 34 na 34 testów przeszło mówi coś użytecznego, a zdanie "powinno działać" znaczy, że trzeba samemu sprawdzić.

Moduły w rules mają warunek "przeczytaj to, gdy" i dotyczą baz danych, bezpieczeństwa backendu, cache'owania, wdrożeń, płatności czy automatyzacji przeglądarki. CI pilnuje, żeby rdzeń nie przekroczył 200 linii ani 32 KiB. Wymusza to pytanie przy każdej nowej regule, czy agent bez niej by się pomylił.

**Key takeaways:**
- Rdzeń trzyma się poniżej 200 linii i 32 KiB, a CI to sprawdza.
- Zakazy typu force-push są instrukcją, a twardy zakaz wymaga uprawnień lub hooków.
- Agent ma raportować wynik uruchomionego sprawdzenia, a nie deklarować sukces.
- Specjalistyczne zasady ładują się warunkowo, żeby nie zapychać kontekstu.

**Why do I care:** U nas AGENTS.md też urósł do rozmiaru, w którym nikt nie pamięta, co w nim jest. Limit linii egzekwowany w CI to najlepszy pomysł z tego wpisu, bo zmusza do usuwania. Autor sam jednak mówi, że reguły "poprawiał przez wiele iteracji", a nie pokazuje żadnego pomiaru, czy agent po nich robi mniej błędów. Bez takiego pomiaru to zbiór dobrych praktyk, a nie dowód.

**Link:** [Awesome AGENTS.md That Can Be Used on Any Agent and Any Stack](https://hackernoon.com/awesome-agentsmd-that-can-be-used-on-any-agent-and-any-stack)

## Osiem platform, dziesięć zespołów agentów i ile to kosztuje

**TLDR:** Długi poradnik porównuje osiem platform do orkiestracji agentów kodujących, każdą na jednym zadaniu, z szacowanym rachunkiem. Wniosek autora to jeden agent lead, tani pracownicy i lokalne LLM-y na 64 GB pamięci, gdy liczy się koszt.

**Summary:** Autor zaczyna od liczb o kosztach, które bierze z publikacji Anthropic. Pojedynczy agent zużywa około czterokrotnie więcej tokenów niż zwykła rozmowa, a system wieloagentowy około piętnastokrotnie. Zespół agentów w trybie planu to około siedmiokrotność zwykłej sesji. Zużycie tokenów tłumaczyło około 80 procent różnicy wyników w ewaluacji przeglądania.

Każda platforma dostaje zadanie dopasowane do swojej mocy. Claude Code buduje funkcję full-stack z pięcioma agentami za około 5,10 dolara. Codex robi równoległe pokrycie testami przez git worktrees, Grok trzy konkurujące prototypy landing page, a Antigravity mapuje monorepo. Copilot aktualizuje zależności w dwunastu pakietach, OpenCode pisze dokumentację API za 1,85 dolara, a Pi lokalizuje aplikację na cztery języki za około 1,20. DeepSeek robi nocną migrację 200 plików z typami za 1,70 w cenach pozaszczytowych. Autor od razu zaznacza, że rachunki to jego założenia dla średniego repo, a nie zmierzone zużycie.

Reguły oszczędzania są konkretne. Kieruj zadania według trudności, czyść kontekst między niezwiązanymi zadaniami, trzymaj CLAUDE.md poniżej 200 linii, wypychaj hałaśliwą robotę do subagentów lub hooków i wybieraj narzędzia CLI zamiast bezczynnych serwerów MCP. Zasada ogólna to dodać drugiego agenta tylko wtedy, gdy umiesz nazwać powód, czyli izolację, równoległość albo niezależny przegląd.

W rankingu harnessów wygrywa Claude Code, potem Codex CLI, OpenCode, Copilot CLI i Pi. Najmniej przekonująca jest część o lokalnych modelach. Autor obiecuje koszt zerowy, ale pomija cenę sprzętu z 64 GB pamięci i jakość, którą sam przyznaje, że nie będzie optymalna.

**Key takeaways:**
- Mnożniki zużycia tokenów to około 4 razy dla agenta, 7 dla zespołu i 15 dla systemu wieloagentowego.
- Wiele agentów opłaca się przy pracy szerokiej, niezależnej i łatwej do zweryfikowania.
- Przy ciasno sprzężonych zmianach jeden agent wygrywa z zespołem.
- Rachunki z artykułu są szacunkami autora, a nie pomiarami.

**Why do I care:** Zasada "nazwij powód dla drugiego agenta" jest warta zapamiętania, bo w zespołach widzę odwrotny odruch. Dokładam agenta, bo mogę. Zastrzegam, że sporo tekstu to ranking i opinie, a liczby kosztów są wyssane z założeń. Pominąłbym też obietnicę, że orkiestracji uczy się w miesiąc. Git i bash to wstęp, a prawdziwa umiejętność to dekompozycja zadań i weryfikacja wyniku.

**Link:** [I Compared 8 AI Agent Platforms. Here's What Running a Team Actually Costs](https://hackernoon.com/i-compared-8-ai-agent-platforms-heres-what-running-a-team-actually-costs)

## Matematyka, która obala największe mity o AI

**TLDR:** Autor przedstawia pięć mitów o AI i pokazuje, jak geometria, symetria i topologia mogłyby je obejść zamiast skalowania. Tekst jest też reklamą jego platformy z animacjami.

**Summary:** Pierwszy mit to "więcej przykładów oznacza więcej wiedzy". Gdy obrót obiektu nie zmienia jego tożsamości, wszystkie obrócone kopie tworzą orbitę, a przestrzeń ilorazowa traktuje je jako jeden przypadek. Autor pokazuje animację, w której 900 stanów brute force sprowadza się do 12 prawdziwych przypadków, i nazywa koszt ignorowania niezmienniczości długiem niezmienniczości.

Drugi mit to "większe okno kontekstu daje lepszą pamięć". Autor odróżnia możliwość przeczytania przeszłości od tego, jak przeszłość zmienia stan modelu. Używa przykładu z pizzą z pieczarkami po tym, jak ktoś powiedział, że ich nie znosi, i wprowadza pojęcie holonomii. Trzeci mit dotyczy kolejności promptu, a kandydatem na miarę jest torsja, choć autor zastrzega, że wrażliwość na prompt nią nie jest.

Czwarty mit to "więcej wymiarów daje lepszą reprezentację". Przestrzeń euklidesowa rośnie wielomianowo, a hiperboliczna wykładniczo, tak jak drzewo hierarchii. Piąty dotyczy nieznanych kątów obiektu, gdzie grupa obrotów SO(3) pozwala wbudować regułę zamiast ją próbkować. Autor wskazuje trzy strategie, czyli próbkować symetrię, zakodować ją albo ją odkryć.

**Key takeaways:**
- Orbity i przestrzenie ilorazowe pozwalają nie uczyć się wielokrotnie tego samego obiektu pod różnymi kątami.
- Przestrzeń hiperboliczna pasuje do danych o strukturze drzewa, bo rośnie wykładniczo jak one.
- Większy kontekst nie jest tym samym co lepsza pamięć o tym, jak przeszłość wpływa na stan modelu.

**Why do I care:** Jako architekt czytam to ostrożnie. Pomysły z równoważnością i geometrią mają prawdziwe uzasadnienie w badaniach, ale ten tekst nie podaje żadnego wyniku na realnym modelu, tylko animacje ilustracyjne. Liczby typu 900 i 12 to ilustracja, a nie pomiar. Autor omija pytanie, dlaczego skalowanie wygrywało do tej pory, mimo że te rozwiązania są znane od lat. Dla pracy frontendowca to na razie ciekawostka, a nie narzędzie.

**Link:** [The Mathematics That Breaks the Biggest Myths About AI](https://hackernoon.com/the-mathematics-that-breaks-the-biggest-myths-about-ai)
