---
title: "Evaluation-Driven Development: jak testować agenty AI zanim zmiana trafi na produkcję"
excerpt: "EDD to metodyka offline walidacji agentów AI, która pozwala udowodnić, że nowa funkcja działa i niczego nie regreses, zanim zmergujesz pull request."
publishedAt: "2026-06-23"
slug: "evaluation-driven-development-agenty-ai"
hashtags: "#decodingai #ai #evals #agentai #llm #testing #generated #pl"
source_pattern: "Decoding AI"
---

## Evaluation-Driven Development: offline bramka przed mergem

**TLDR:** EDD (Evaluation-Driven Development) to podejście do testowania agentów AI, które Alejandro Aboy stosuje w Workpath do walidacji każdej zmiany w AI Companion przed mergem. Zamiast sprawdzać, czy agent "wygląda dobrze", generuje się realistyczne trace'y, ocenia je sędziami i porównuje eksperymenty. Regresja widoczna w jednym wymiarze zatrzymuje PR.

Najgorsze awarie systemów AI nie krzyczą. Zmieniasz prompt, refaktorujesz narzędzie, dodajesz feature -- i wszystko "wygląda dobrze". Żadnych błędów w logach, żadnych skarg od użytkowników. A tymczasem coś, co działało w zeszłym tygodniu, po cichu przestało działać.

Alejandro Aboy, senior data & AI engineer w Workpath, trafił dokładnie w ten problem. Posprzątał instrukcje w systemowym prompcie swojego agenta -- słuszna rzecz, "higiena przed" -- i po zmianie agent zaczął wymyślać identyfikatory, które wcześniej poprawnie pobierał z API. Gdyby nie uruchomił ewaluacji porównawczej przed mergem, ta regresja trafiłaby na produkcję niezauważona.

Stąd pochodzi EDD: to offline bramka walidacyjna między gałęzią a mergem. Nie zastępuje monitorowania na produkcji, ale sprawia, że nie wchodzisz na produkcję z błędem, który można było wykryć lokanie za darmo.

Workpath to SaaS do zarządzania strategią i OKR-ami dla dużych firm. AI Companion to agent wbudowany w ten produkt, który skanuje dane organizacji i pomaga utrzymać spójność między celami a inicjatywami. Alejandro buduje ten agent codziennie i na nim testuje każdą taktykę EDD.

**Key takeaways:**
- EDD działa jako offline bramka walidacyjna: każda zmiana na gałęzi musi przejść przez symulację trace'y i ewaluację, zanim trafi do maina
- Dwa tryby: Mode 1 (szybki, manualny, ~30 trace'y) dla małych zmian, Mode 2 (automatyczne eksperymenty z datasetu) dla nowych funkcji
- Najgroźniejszy błąd w online evals to brak limitu wydatków -- Alejandro doliczył się hipotetycznego rachunku rzędu $2k/miesiąc

**Why do I care:** Dla mnie EDD to odpowiedź na pytanie, które zadaje sobie każdy, kto pisze cokolwiek więcej niż proof-of-concept z LLM: jak właściwie testować agenty? Unit testy na poziomie funkcji nie mają tu sensu, bo output jest probabilistyczny. End-to-end testy są drogie i powolne. EDD zajmuje środek -- symulowane wejścia, prawdziwy agent, prawdziwe trace'y, ocena sędziami. To jest coś, co można wdrożyć w realnym projekcie bez przepisywania całej infrastruktury.

**Link:** [How Evaluation-Driven Development (EDD) Works](https://www.decodingai.com/p/how-evaluation-driven-development-works?publication_id=1526003&post_id=202437173&action=share&triggerShare=true&isFreemail=true&triedRedirect=true)

---

## Dwa tryby EDD i parametr Aggression

**TLDR:** Skill `/edd` zaimplementowany przez Alejandro ma dwa tryby pracy i suwak Aggression. Mode 1 to szybki, manualny przegląd ~30 trace'y bez automatycznych ewaluacji. Mode 2 to pełny eksperyment w Opik z porównaniem wyników między uruchomieniami. Aggression kontroluje, jak bardzo adversarialne są generowane trace'y.

EDD nie ma jednego przepływu dla wszystkich zmian. Małe korekty -- np. agent pytał przy każdym uruchomieniu o URL publikacji, zamiast go zapamiętać -- nie wymagają pełnego eksperymentu. Mode 1 daje ci 30 świeżych trace'y, możesz przejrzeć je ręcznie i uruchomić sędziego tylko jeśli widzisz coś podejrzanego. Szybko, tanio, wystarczająco.

Kiedy dotykasz większej funkcjonalności lub dodajesz coś nowego, Mode 2 zamienia te trace'y w dataset w Opik, odpalasz eksperyment i porównujesz go z poprzednim uruchomieniem. Regresja widoczna w jednym wymiarze -- np. agent "gubi się i wymyśla ID" zamiast je pobierać -- nie schowa się przed wykresem porównawczym.

Parametr Aggression to suwak od happy path do pełnych ataków adversarialnych. Wysoka aggresja to wymuszanie błędów API, prośby o dane, których nie ma w systemie, niespójne opisy narzędzi. To brzmi kusząco, żeby od razu skalować do maksimum, ale Alejandro ostrzega przed pułapką: nie chcesz overoptimizować pod scenariusze, które nigdy się nie zdarzą. Trace'y powinny odzwierciedlać rzeczywisty rozkład zachowań użytkowników, więc punkt startowy to istniejące trace'y z produkcji, nie wymyślone edge case'y.

Każdy tryb zaczyna się od hipotezy na gałęzi. Hipoteza jest jawna: "po tej zmianie agent powinien przestać pytać o URL przy każdym uruchomieniu". Jeśli eksperymenty tego nie potwierdzają, zmiana nie idzie na main. Proste.

**Key takeaways:**
- Mode 1: ~30 trace'y, manualna inspekcja, brak automatycznych ewaluacji -- wystarczający dla małych poprawek
- Mode 2: pełny dataset + eksperyment w Opik, automatyczne ocenianie przez sędziów, porównanie z poprzednim eksperymentem
- Suwak Aggression kontroluje trudność trace'y, ale nie warto skalować do max -- zakotwicz generację w istniejących trace'ach z produkcji

**Why do I care:** Podział na dwa tryby to ważna decyzja projektowa, która sprawia, że EDD nie jest zawsze "all-in". Widzę tu analogię do unit testów vs. integracyjnych: nie każda zmiana wymaga pełnego suite'u. Możliwość szybkiego sprawdzenia małej poprawki bez odpalania całego eksperymentu to różnica między "używamy tego codziennie" a "używamy tego raz na sprint, bo jest zbyt ciężkie".

**Link:** [How Evaluation-Driven Development (EDD) Works](https://www.decodingai.com/p/how-evaluation-driven-development-works?publication_id=1526003&post_id=202437173&action=share&triggerShare=true&isFreemail=true&triedRedirect=true)

---

## Jak generować trace'y, które mają znaczenie

**TLDR:** Sekret EDD tkwi w sposobie generowania trace'y: Claude Code analizuje kod agenta i istniejące trace'y z Opik, generuje tylko wejścia (nie wyjścia), a następnie uruchamia prawdziwego agenta na staging backendzie. Dzięki temu trace zawiera prawdziwe wartości -- tool calle, pośrednie stany, rzeczywiste odpowiedzi.

To jest technicznie najtrudniejsza część EDD i jednocześnie ta, która odróżnia to podejście od syntetycznych datasetów, które Alejandro wcześniej próbował bez powodzenia. Syntetyczne datasety, gdzie generujesz zarówno wejścia jak i wyjścia, tracą wszystko, co agent robi poza ostateczną odpowiedzią. Ukryty błąd w tool calli jest niewidoczny, jeśli oceniasz tylko końcowy output.

Tutaj wchodzi kluczowy podział: symulujemy wejścia, ale nie wyjścia. Każde wygenerowane wejście trafia do headless kopii agenta, który działa tak jak na produkcji -- wybiera narzędzia, wywołuje staging backend, obsługuje odpowiedzi API. Agno (framework agencyjny używany przez Alejandro) zapisuje całą historię wywołań narzędzi w trace OpenTelemetry i wysyła ją do Opik.

Najtrudniejszy element to stan. Trace wygenerowany ze złego stanu jest bezużytecznym trace'em. W przypadku Workpath około 90% narzędzi agenta to wywołania API, więc Claude Code pobiera token i uderza w prawdziwy staging backend ze zmockowanym kontem, które ma już dane. Przed startem agenta Claude Code wstrzykuje kontekst użytkownika bezpośrednio do sekcji systemowego promptu. Agent wita się "Cześć Paul, chcesz sprawdzić cele dla zespołu coding AI?" -- działa jak na produkcji, bez odtwarzania całego backendu.

To jest sprytny skrót: nie potrzebujesz replikować całego środowiska. Z perspektywy LLM prompt to jedyne, co widzi. Wierny mock na poziomie systemowego promptu to wystarczający proxy produkcji.

**Key takeaways:**
- Symuluj tylko wejścia, nie wyjścia -- agent musi sam wyprodukować trace z prawdziwymi wartościami
- Stan agenta przed uruchomieniem determinuje jakość trace'a -- zły stan, bezużyteczny trace
- Wstrzyknięcie kontekstu bezpośrednio do systemowego promptu to prostszy i skuteczniejszy mock niż odtwarzanie backendu

**Why do I care:** Ta technika rozwiązuje problem, który sam napotykałem próbując pisać testy dla kodu z LLM: jak sprawdzić, że tool call jest poprawny, a nie tylko końcowa odpowiedź? Wstrzykiwanie stanu na poziomie systemowego promptu zamiast konfigurowania całego backendu to podejście, które można wdrożyć bez tygodni pracy infrastrukturalnej. Praktyczne i realistyczne.

**Link:** [How Evaluation-Driven Development (EDD) Works](https://www.decodingai.com/p/how-evaluation-driven-development-works?publication_id=1526003&post_id=202437173&action=share&triggerShare=true&isFreemail=true&triedRedirect=true)

---

## Sędziowie w EDD: binarne etykiety zamiast skali Likerta

**TLDR:** Evaluatory w EDD dzielą się na metryki kodu (deterministyczne, bez LLM) i sędziów LLM. Obydwa typy używają binarnych etykiet: poprawne lub nie. Skale 1-5 brzmią kuszącco, ale w praktyce są niespójne nawet między ludzkimi annotatorami. Binarność ułatwia zadanie modelowi i daje czytelne wyniki.

Alejandro używa w swoich eksperymentach siedmiu wymiarów oceny: Content Completeness, Metric Accuracy, Ranking Quality, Relative Grounding, Response Directness, Semantic Search Accuracy, Skill Selection. Każdy wymiar to osobny sędzia, każdy sędzia ocenia binarnie.

Pierwsze pytanie przy implementacji nowej metryki powinno brzmieć: czy da się to zmierzyć kodem? Czy agent wywołał właściwe narzędzie, czy format odpowiedzi jest zgodny ze schematem -- to są pytania, na które można odpowiedzieć deterministycznie, bez wydawania tokenów. Dopiero gdy pytanie jest subiektywne -- jak kompletna jest odpowiedź, czy dobrze uszeregowała wyniki -- wchodzi sędzia LLM.

Sędzia celowo pochodzi z innego modelu niż agent. Gdy agent i sędzia to ten sam model, sędzia ma tendencję do zatwierdzania odpowiedzi z własnej rodziny, nawet gdy są błędne. Różne modele, różne "martwe punkty".

Do binarnej etykiety dokładana jest krótka krytyka: 2-3 zdania wyjaśniające dlaczego output jest poprawny lub nie. To daje wystarczający kontekst do debugowania bez otwierania pełnego trace'a przy każdym wyniku.

Ważna zasada architektury: evaluatory są statyczne i kalibrowane raz przy budowie, w porozumieniu z ekspertem domenowym. Pętla EDD regeneruje trace'y i datasety, nie metryki. Gdy sędziowie są gotowi, można używać ich wielokrotnie na różnych dynamicznych datasetach bez ponownej kalibracji.

**Key takeaways:**
- Metryki kodu pierwsze -- LLM sędzia tylko gdy pytanie jest naprawdę subiektywne
- Binarne etykiety (tak/nie) zamiast skali 1-5 -- prostsze dla modelu, czytelniejsze dla dewelopera
- Sędzia pochodzi z innego modelu niż agent -- eliminuje stronniczość "własnej rodziny"

**Why do I care:** Binarność etykiet to kontrintuitywna, ale praktyczna decyzja. Sam miałem odruch, żeby dawać "częściowe zaliczenie" -- 3/5 zamiast 0/1 -- i teraz rozumiem dlaczego to prowadzi do niespójnych danych. Zero/jeden to decyzja, którą można podjąć, i to jest dokładnie to, czego potrzeba, żeby trenować lub kalibrować sędziego.

**Link:** [How Evaluation-Driven Development (EDD) Works](https://www.decodingai.com/p/how-evaluation-driven-development-works?publication_id=1526003&post_id=202437173&action=share&triggerShare=true&isFreemail=true&triedRedirect=true)

---

## Pułapka online evals i gdzie naprawdę leży koszt

**TLDR:** Domyślnym odruchem jest uruchamianie ewaluacji online na wszystkich trace'ach z produkcji. Alejandro wpadł w tę pułapkę: hipotetyczny rachunek wynosił $2k miesięcznie za kilka ewaluacji. EDD offline rozwiązuje większość problemów przed mergem, a online evals powinny być próbkowane i ograniczone do przypadków wysokiego ryzyka.

Logika wydaje się prosta: więcej danych, lepsza ewaluacja. Jeśli możemy oceniać każdy trace z produkcji, będziemy wiedzieć dokładnie, gdzie agent się myli. Alejandro myślał tak samo -- do momentu, kiedy zobaczył rachunek.

Kredyty, nie gotówka, ale $2k miesięcznie to kwota, która szybko zabija projekt, zanim przyniesie korzyści. Problem z online evals nie jest techniczny, jest ekonomiczny. Uruchamianie ciężkiego sędziego LLM na każdym trace'u to mnożenie kosztu przez liczbę aktywnych użytkowników.

Rozwiązanie jest pragmatyczne: zanim włączysz ewaluację online dla danej metryki, zapytaj o ryzyko. Czy naprawdę potrzebujesz sprawdzać na każdym trace'u, że agent nie wycieka ID użytkownika? Jeśli ryzyko jest niskie, próbkuj lub szukaj wzorców, zamiast oceniać każdy request. Ciężkie sędziowie zostają offline, na gałęzi, zanim zmiana trafi na main.

To jest podział, który ma sens: offline evals to inwestycja czasu dewelopera przed mergem, online evals to bieżące koszty operacyjne. EDD minimalizuje te drugie przez to, że problemy wychwytuje na etapie pierwszego.

Context rot to osobna kategoria problemów, którą trudno wychwycić bez długich trace'y. Około 10-tej wiadomości agent wchodzi w "strefę zgniłego kontekstu": prośba, która wcześniej dostała kooperatywną odpowiedź, teraz spotyka się z pytaniem "co masz na myśli?". Przy 20-wiadomościowej rozmowie i 200k tokenów łącznych, bez cache'owania, koszty infrastruktury eksplodują z dnia na dzień. EDD z adversarialnymi trace'ami o dużej długości może to wykryć zanim trafi na produkcję.

**Key takeaways:**
- Online evals na wszystkich trace'ach to kosztowna pułapka -- zakłada rachunek $2k+/miesiąc za kilka metryk
- Offline EDD wychwytuje większość problemów przed mergem -- online powinny być próbkowane i ograniczone do wysokiego ryzyka
- Context rot pojawia się przy ~10-tej wiadomości i wymaga długich adversarialnych trace'y, żeby go wykryć w testach

**Why do I care:** To jest problem, który widzę u każdego, kto zaczyna z AI w produkcie: pierwsze co przychodzi do głowy to "włączmy monitoring wszystkiego". Tak samo w obserwowalności aplikacji webowych: logowanie wszystkiego jest drogie i rzadko potrzebne. Ten sam schemat działa tutaj. Selektywność i progi ryzyka to umiejętność, którą trzeba zbudować, zanim rachunek zmusi cię do tego nauczenia.

**Link:** [How Evaluation-Driven Development (EDD) Works](https://www.decodingai.com/p/how-evaluation-driven-development-works?publication_id=1526003&post_id=202437173&action=share&triggerShare=true&isFreemail=true&triedRedirect=true)
