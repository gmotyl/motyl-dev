---
title: "Refactoring: parking na pomysły, nazywanie wzorców i czy agenci zastąpią ludzi w code review"
excerpt: "Poniedziałkowe pomysły Luki Rossi o backlogu z poczekalnią, nazywaniu wzorców zespołowych oraz trzy lektury o jakości kodu, AI i code review."
publishedAt: "2026-11-23"
slug: "refactoring-backlogi-nazywanie-wzorcow-code-review-ai"
hashtags: "#refactoring #management #productivity #ai #teams #generated #pl"
source_pattern: "Refactoring"
---

## Parking na pomysły zamiast backlogu, do którego wpada wszystko

**TLDR:** Pomysły na funkcje, usprawnienia i błędy mogą przychodzić od każdego, ale nie powinny od razu trafiać do backlogu, do którego zobowiązują się inżynierowie. Autor proponuje osobny parking z minimalną strukturą i regularne doprecyzowywanie.

Luca Rossi zaczyna od własnych notatek. Największa poprawa przyszła, gdy oddzielił moment zapisania notatki od momentu jej uporządkowania, na przykład podczas cotygodniowego przeglądu. Tę samą zasadę stosuje do backlogów. Nowy pomysł ląduje na parkingu z trzema informacjami: jaki to problem, kto go zgłosił i jedno zdanie kontekstu.

Potem pomysły są regularnie przerabiane na prawdziwe historie lub zadania. Częstotliwość zależy od cyklu pracy i liczby zgłoszeń, a kto to robi, zależy od umiejętności i obciążenia ludzi. Kierunek jest taki, żeby product managerowie dawali inżynierom dobry kontekst, inżynierowie uczyli się podejmować taktyczne decyzje produktowe, a PM-owie przesuwali się ku strategii. To podróż i zajmuje czas.

Czego tu brakuje? Parking może stać się cmentarzem pomysłów, jeśli nikt nie jest właścicielem przeglądu. Autor nie mówi też, jak postępować z presją osób zgłaszających, które chcą widzieć swój pomysł od razu w planie.

**Key takeaways:**
- Rozdziel zapisywanie pomysłu od jego doprecyzowania.
- Na parkingu zapisuj problem, zgłaszającego i jedno zdanie kontekstu.
- Regularny przegląd zamienia pomysły w zadania do backlogu.

**Why do I care:** W zespołach frontendowych backlog szybko pęcznieje od drobnych próśb, a to zjada uwagę przy planowaniu. Parking daje uczciwą odpowiedź "zapisane, ale jeszcze nie zobowiązujemy się" i chroni zespół przed rozmywaniem priorytetów.

**Link:** [Backlogs, naming things, and readings!](https://refactoring.fm/p/backlogs-naming-things-and-readings?publication_id=64099&post_id=225613265&isFreemail=true&triedRedirect=true)

## Nazywaj wzorce, które widzisz w zespole

**TLDR:** Michael Lopp, znany jako Rands, zasłynął nadawaniem nazw zjawiskom, które wszyscy widzą, ale nikt ich nie nazywa. Nazwa daje zespołowi wspólny słownik.

W rozmowie na konferencji LDX3 w czerwcu Rossi wrócił do tej cechy autora książki Managing Humans. Przykłady to wolny elektron, czyli inżynier skaczący między zespołami i naprawiający rzeczy, oraz inkrementaliści kontra kompletyści. Pierwsi chętnie posuwają sprawę o krok, drudzy chcą pełnego rozwiązania od razu. Każdy z nas pracował z jednymi i drugimi.

Według Rossiego nazwa staje się zalążkiem frameworków i opowieści, bo zespół ma wokół czego się zebrać. Lopp zwraca uwagę, że wiele książek o zarządzaniu jest nieprzystępnych dla inżynierów, a jego język działa, bo pochodzi od inżyniera, a inżynierowie uwielbiają nazywać rzeczy. W kodzie robimy to codziennie.

Trzeba jednak uważać, żeby nazwa nie stała się etykietą, którą przyklejamy ludziom. "Kompletysta" użyte w retrospektywie może zabrzmieć jak zarzut.

**Key takeaways:**
- Nazwany wzorzec łatwiej omawiać i naprawiać.
- Język zarządzania działa lepiej, gdy mówi głosem inżyniera.
- Nazwy opisują zachowania, nie ludzi.

**Why do I care:** Jako architekt często widzę, że spór techniczny to w istocie brak wspólnych słów. Nazwanie wzorca, na przykład "ukryty monolit" albo "przecieki abstrakcji", skraca dyskusję na review i w ADR-ach. Warto prowadzić mały słownik zespołu.

**Link:** [Backlogs, naming things, and readings!](https://refactoring.fm/p/backlogs-naming-things-and-readings?publication_id=64099&post_id=225613265&isFreemail=true&triedRedirect=true)

## Lektury tygodnia: jakość kodu, merkantylizm poznawczy i agenci w code review

**TLDR:** Trzy teksty: inżynieria nadal ma znaczenie, panika wokół AI jako merkantylizm poznawczy oraz nowy benchmark agentów do code review, w którym ludzie i agenci razem wychwytują 82 procent błędów.

Francisco Trindade pisze, że AI ułatwiło dowiezienie bieżącej funkcji, ale nie przygotowanie gruntu pod następną. Niechlujna baza kodu zużywa więcej tokenów przy każdej zmianie, więc jakość widać wprost w czasie i pieniądzach. Skoro code review się sypie, to inżynierowie muszą zbudować nowe zabezpieczenia. Rossi dodaje, że dlatego trzyma na swoim projekcie Tolaria bramkę zdrowia kodu na poziomie 10 na 10.

Venkatesh Rao w długim eseju porównuje lęk przed AI do merkantylizmu: inteligencję traktujemy jak złoto, zasób rzadki, który elity muszą kontrolować. Zestawia to z rewolucją rolniczą, która uwolniła większość ludzi od pracy na roli, i pyta, co zrobią umysły, gdy nie będą musiały produkować inteligencji, żeby przeżyć. Rossi uznał tekst za gęsty, ale świetny.

Lizzie Matusov opisuje benchmark zbudowany na realnych błędach potwierdzonych przez ludzi. Najlepszy agent do review wyłapał 72 procent, ludzie około połowy, a razem 82 procent, bo łapią różne typy błędów. To wartościowe, bo mamy twarde dane. Warto jednak pytać o to, jak dobrany był zestaw błędów i czy mierzy się też fałszywe alarmy oraz koszt uwagi reviewerów.

**Key takeaways:**
- Jakość kodu ma teraz bezpośredni koszt w tokenach i czasie.
- Merkantylizm poznawczy to ciekawa rama dla paniki wokół AI.
- Agent i człowiek razem wychwytują więcej błędów niż każde z osobna.

**Why do I care:** Ostatni wynik jest dla mnie najważniejszy praktycznie: nie zastępuj review agentem, tylko dołóż go jako drugą parę oczu. Dla frontendu, gdzie błędy to często regresje wizualne i dostępność, ludzki przegląd nadal łapie to, co agent pomija.

**Link:** [Backlogs, naming things, and readings!](https://refactoring.fm/p/backlogs-naming-things-and-readings?publication_id=64099&post_id=225613265&isFreemail=true&triedRedirect=true)
