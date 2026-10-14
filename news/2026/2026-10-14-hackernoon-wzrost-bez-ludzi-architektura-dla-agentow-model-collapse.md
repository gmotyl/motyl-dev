---
title: "HackerNoon: wzrost bez ludzi, architektura przyjazna agentom i prawdziwy powód hamowania laboratoriów AI"
excerpt: "Trzy eseje: o juniorach i outsourcingu w dobie AI, o monorepo i warstwowych regułach dla agentów oraz o kolapsie modeli i braku danych."
publishedAt: "2026-10-14"
slug: "hackernoon-wzrost-bez-ludzi-architektura-dla-agentow-model-collapse"
hashtags: "#hackernoon #ai #agents #architecture #career #llm #generated #pl"
source_pattern: "HackerNoon"
---

## Co się stanie, gdy wzrost gospodarczy nie potrzebuje ludzi

**TLDR:** Autor z Wietnamu opisuje, jak narzędzia AI u zleceniodawców odbierają outsourcingowi stanowiska juniorskie. Największy problem to nie zwolnienia, lecz oferty pracy, które nigdy nie powstają, i wiedza, która przestaje przechodzić ze starszych na młodszych.

**Summary:** Narracja opiera się na wyimaginowanej programistce Linh, która pracuje w firmie outsourcingowej w Ho Chi Minh. Klient wprowadza AI u siebie i przy odnowieniu kontraktu prosi o pięciu inżynierów zamiast dwunastu. Nikt nie zawinił, a na wszystkich wykresach to sukces. Firma outsourcingowa po cichu rezygnuje z naboru absolwentów.

Autor przywołuje dane Stanford Digital Economy Lab: zatrudnienie osób w wieku 22 do 25 lat w zawodach narażonych na AI jest o 19 procent niższe niż trajektoria mniej narażonych rówieśników, a starsi pracownicy nie wykazują podobnej luki. W Wietnamie liczba ofert IT wzrosła w pierwszej połowie 2026 roku o 2,58 procent, a liczba aplikacji o 21,3 procent.

Druga teza dotyczy uczenia się. Juniorzy uczyli się w tarciu wokół drobnych zadań, na rozmowie ze starszym o tym, dlaczego logika ponawiania jest zbudowana tak, a nie inaczej. AI skraca tę pętlę z obu stron: junior dostaje wynik bez zmagań, a senior woli wpisać prompt niż tłumaczyć. Trzecia teza: subskrypcja u dostawcy z USA przenosi wartość tam, gdzie leży własność technologii, a eksport usług z kraju spada.

**Key takeaways:**
- Ryzyko to brakujące oferty dla juniorów, a nie masowe zwolnienia.
- Wiedza milcząca przekazywana w pracy znika, gdy AI przejmuje drobne zadania.
- Używanie narzędzia nie jest posiadaniem wartości, którą ono tworzy.

**Why do I care:** Jako konsultant widzę ten sam mechanizm w zespołach produktowych: seniorzy przestają mentorować, bo szybciej wygenerować kod. Autor przyznaje, że jego liczby są ilustracyjne, i omija pytanie, czy tańsze oprogramowanie nie otworzy nowych rynków, ale pytanie o to, kto wychowa następnych seniorów, jest uczciwe.

**Link:** [What Happens When Economic Growth No Longer Needs People?](https://hackernoon.com/what-happens-when-economic-growth-no-longer-needs-people)

## Twoja architektura jest powodem, dla którego agent pisze zły kod

**TLDR:** Autor przekonuje, że problemem nie jest model, tylko niejasna struktura repozytorium. Proponuje monorepo, izolowane mikrofrontendy i warstwowe pliki z regułami dla agentów.

**Summary:** Zaczyna od obserwacji: prosta zmiana zlecona Cursorowi lub Claude Code kończyła się inaczej obsłużonym stanem, zduplikowanymi helperami, losową zewnętrzną paczką i zignorowaną konfiguracją designu. Wniosek jest taki, że agent nie zna konwencji, a próba przeczytania całego kodu rozdyma kontekst.

Pierwsze rozwiązanie to monorepo z Turborepo i pnpm, gdzie agent pracujący nad jednym modułem sięga tylko do wspólnych pakietów przez lokalne referencje. Drugie to ścisłe granice: moduły nie łączą się ze sobą poziomo, tylko przez powłokę i wspólne pakiety, a wersje pakietów wewnętrznych są rozprzęgnięte, więc zmiana w jednym helperze nie psuje wszystkich modułów naraz. Trzecie to warstwowy zestaw reguł: zawsze obowiązujące konwencje oraz osobne pliki dla modułów i pakietów, ładowane tylko przy edycji danego obszaru, bo po około trzech tysiącach tokenów kontekstu jakość rozumowania wyraźnie spada.

Prompty stają się wtedy krótkie: zakres, moduł docelowy i ścieżka do reguł. Autor radzi też zapisywać regułę w chwili wprowadzenia wzorca i łączyć to z surowymi linterami.

**Key takeaways:**
- Granice modułów, które fizycznie uniemożliwiają import, są najtańszą ochroną przed agentem.
- Nie wszystkie reguły powinny być ładowane zawsze.
- Reguła zapisana od razu jest warta więcej niż reguła zapisana po pół roku.

**Why do I care:** To rozsądne i zgodne z moim doświadczeniem, ale argument o twardym limicie trzech tysięcy tokenów jest słabo udokumentowany, a monorepo z wieloma mikrofrontendami przynosi własne koszty utrzymania, o których autor nie wspomina.

**Link:** [Your Architecture Is Why Your Coding Agent Keeps Writing Bad Code](https://hackernoon.com/your-architecture-is-why-your-coding-agent-keeps-writing-bad-code)

## Prawdziwy powód, dla którego firmy AI hamują

**TLDR:** Autor twierdzi, że spowolnienie nie wynika z troski o bezpieczeństwo, tylko z wyczerpania oryginalnych danych i zalewu treści syntetycznych, które grożą kolapsem modeli.

**Summary:** Epoch AI ostrzega, że zasoby wysokiej jakości publicznego tekstu napisanego przez ludzi wyczerpią się między 2026 a 2028 rokiem. Jednocześnie sieć wypełnia się tekstem generowanym przez modele, więc scrapery nowych modeli pobierają produkty poprzednich. Badania z Oksfordu i Cambridge pokazały, że trenowanie rekurencyjne na własnym wyniku prowadzi do rozpadu, bo model traci rzadkie krańce rozkładu.

Autor interpretuje też znaki wodne inaczej niż zwykle. Łatwo je usunąć, więc nie służą do wykrywania oszustw. Mają chronić własne scrapery laboratoriów przed zatruciem, bo zautomatyzowane farmy treści nie czyszczą znaków wodnych. Przewiduje zamknięcie otwartej sieci i umowy na prywatne archiwa, syntetyczne dane tylko tam, gdzie istnieje obiektywna weryfikacja jak kompilator, płaskowyż możliwości i droższą oryginalną myśl ludzką.

**Key takeaways:**
- Dane z weryfikacją, jak uruchamialny kod, nie powodują kolapsu.
- Znaki wodne to etykieta ostrzegawcza dla scraperów, a nie ochrona praw autorskich.
- Dane proprietarne stają się cenniejsze niż otwarta sieć.

**Why do I care:** Tytuł obiecuje ujawnienie jedynego prawdziwego powodu, a to teza, nie fakt. Nie ma tu żadnych danych o tym, ile treści w zbiorach treningowych jest syntetyczne, a rozwój modeli opiera się dziś w dużej mierze na uczeniu ze wzmocnieniem, nie tylko na scrapowaniu.

**Link:** [The Real Reason AI Companies Are Tapping the Brakes](https://hackernoon.com/the-real-reason-ai-companys-are-tapping-the-brakes-hint-its-not-safety)
