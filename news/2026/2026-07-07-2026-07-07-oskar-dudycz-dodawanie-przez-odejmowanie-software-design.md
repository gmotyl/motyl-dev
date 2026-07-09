---
title: "Dodawanie przez odejmowanie, czyli jak uprościć software design"
excerpt: "Oskar Dudycz opisuje pułapkę nadmiernej generalizacji na przykładzie własnej biblioteki i dochodzi do wniosku, że subtrahowanie niepotrzebnych funkcji faktycznie dodaje wartości."
publishedAt: "2026-07-07"
slug: "2026-07-07-oskar-dudycz-dodawanie-przez-odejmowanie-software-design"
hashtags: "#OskarDudycz #architecture #refactoring #open-source #engineering #generated #pl"
source_pattern: "OskarDudycz"
---

## Addition by subtraction w software design

**TLDR:** Oskar Dudycz opisuje, jak podczas budowania biblioteki Strictland do testowania kontraktów wpadł w klasyczną pułapkę nadmiernej generalizacji, i dlaczego zatrzymanie się i odjęcie zbędnych funkcji dało mu nie tylko prostsze rozwiązanie, ale też lepsze.

Strictland to biblioteka do wykrywania dryftu schematu wiadomości w testach. Prosty pomysł: serializuj wiadomość, zapisz payload obok testu w repozytorium, a przy każdym PR zmiana w pliku snapshot'u ujawni zmianę kontraktu. Eleganckie, konkretne, użyteczne.

Oskar jednak szybko trafił na klasyczny problem twórców open source: "a co jeśli ktoś chce inaczej?" I tak w głowie zrodziły się "selectable storage layout strategies" z trzema wariantami rozmieszczenia plików, plus "various grouping strategies" z kilkoma metodami grupowania po typie wiadomości lub pliku testowym. Brzmi rozsądnie, prawda? W praktyce permutacje zaczęły się na siebie nakładać, konflikty między strategiami mnożyć, a część kombinacji okazała się technicznie niewykonalna lub bezużyteczna.

W pewnym momencie Oskar zatrzymał się i zadał sobie kilka prostych pytań. Jaki jest właściwie cel tej biblioteki? Wykrywanie dryftu schematu. Czy potrzebuję do tego obsługiwać wszystkie możliwe układy plików jak generyczna biblioteka snapshot'ów? Nie. Kim są moi docelowi użytkownicy na tym etapie? Osobami, które dopiero zaczynają. To znaczy, że powinienem pomóc im, ustawić sensowny domyślny układ i zebrać feedback, zamiast budować konfigurowalny kombajn dla zaawansowanych.

Kiedy Oskar wybrał jedną jedyną strategię i przestał kombinować z permutacjami, coś nieoczekiwanego się stało. Narzucona struktura folderów naturalnie stworzyła Contract Registry, czyli rejestr kontraktów wiadomości z pełną ścieżką jako kluczem. Z tego nagle wynikały nowe, naprawdę wartościowe funkcje: dokumentacja schematów, sprawdzanie zależności, wykrywanie kto używa danego kontraktu. Rzeczy, których Oskar nie planował, pojawiły się same jako konsekwencja prostszego podejścia.

Stąd dwie reguły, do których Oskar dochodzi: dodawanie wyobrażonych funkcji odejmuje realną wartość, a odejmowanie wyobrażonych funkcji dodaje realną wartość. Dodatkowy argument brzmi znajomo dla każdego, kto pracował z LLM do kodowania: dziś z GenAI implementacja zajmuje ułamek dawnego czasu, przez co kusi, żeby po prostu dodać wszystko, co przyjdzie do głowy. To nigdy nie było darmowe, a teraz jest jeszcze bardziej kuszące niż kiedyś.

Oskar zaleca konkretny cykl: najpierw generuj pomysły, przemyśl tradeoffs i koszty dodawania, zmieniania i usuwania, zdefiniuj potencjalne rozwiązania, a potem zatrzymaj fazę dodawania i zacznij fazę odejmowania. Zostaw tylko to, co naprawdę rozwiązuje główny cel, wyślij w świat i zbieraj feedback.

**Key takeaways:**
- Nadmierna generalizacja od początku blokuje dostrzeżenie lepszych rozwiązań prostszych architektur
- GenAI obniżył koszt implementacji, przez co pokusa dodawania wszystkiego wzrosła, ale to nie jest darmowe
- Odjęcie zbędnych strategii w Strictland ujawniło naturalną strukturę Contract Registry jako bonus

**Why do I care:** Ten artykuł trafia wprost w jeden z najbardziej powszechnych błędów w architekturze, który widzę u klientów. Zanim jeszcze zbudujemy pierwsze użycie, projektujemy "extensible, configurable, strategy-based" rozwiązanie dla użytkowników, których jeszcze nie mamy, z wymaganiami, których jeszcze nie znamy. LLM-y to problem potęgują, bo implementacja jest teraz tania, ale koszt złożoności kognitywnej dla użytkowników biblioteki czy systemu pozostaje taki sam. Warto wracać do tego artykułu za każdym razem, gdy zaczynamy rozmowę od "a co jeśli ktoś będzie chciał inaczej".

**Link:** [Addition by subtraction in software design](https://www.architecture-weekly.com/p/addition-by-subtraction-in-software?publication_id=579466&post_id=205490597&isFreemail=true&triedRedirect=true)
