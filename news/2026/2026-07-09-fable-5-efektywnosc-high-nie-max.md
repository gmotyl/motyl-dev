---
title: "Fable 5 na maxa i żałowałem. Jak naprawdę z niego korzystam"
excerpt: "Autor sprawdził, co się stanie, gdy poda modelowi AI maksymalne zasoby do myślenia. Wynik: wyższe rachunki, gorszy kod i pliki zmienione bez pytania. W artykule opisuje swoją metodę na efektywne i tanie korzystanie z Fable 5 w codziennej pracy."
publishedAt: "2026-07-09"
slug: "fable-5-efektywnosc-high-nie-max"
hashtags: "#frontend #javascript #programming #ai #llm #agenci #joozio #pl"
source_pattern: "PawelJozefiak"
---

## I Maxed Out Fable 5 and Regretted It. Here's How I Actually Run It Now

**TLDR:** Autor przez tygodnie eksperymentował z ustawieniami Fable 5, zaczynając od maksymalnego trybu myślenia. Okazało się, że wyższy effort nie oznacza lepszego kodu, a jedynie wyższe koszty i nadmierne zmiany w plikach. Artykuł to praktyczny poradnik: jak ustawić effort, jak routować zadania między modelami i jak bezpiecznie prowadzić długie, autonomiczne sesje.

**Summary:**

Pierwszego dnia z Fable 5 autor zrobił to, co zrobiłby każdy rozsądny deweloper: ustawił reasoning effort na max i pozwolił modelowi działać. Logika była prosta, skoro model jest tak inteligentny, daj mu przestrzeń do myślenia. Efekt? Przerażający rachunek i kod, który przepisał pliki, których nikt nie ruszał, dodał abstrakcje, których nikt nie potrzebował, i zamienił poprawkę na dwie linijki w opinionowany refactor.

Fable 5 pozwala wybrać intensywność myślenia modelu: low, medium, high, xhigh i max. Większość ludzi rozumie ten suwak opacznie. Wyższy effort nie oznacza, że model robi więcej kroków ani rozwiązuje trudniejsze problemy. Oznacza, że model myśli intensywniej na każdym pojedynczym kroku. Problem w tym, że większość kroków w realnej pracy jest nudna i nie wymaga filozoficznego namysłu. Reasoning komplikuje sprawę geometrycznie: każdy token myślenia z kroku pierwszego trafia do historii, którą model czyta na kroku drugim, trzecim i wszystkich kolejnych. Na długim agentic run gruby nawyk myślenia nie dodaje kosztów liniowo, lecz mnoży je.

Autor zauważa, że na najtrudniejszych benchmarkach wyższy effort rzeczywiście daje lepsze wyniki: od 11% na low do 31% na max. Ale codzienna praca to nie najtrudniejszy benchmark, to setki małych edycji. Na teście FrontierCode od Cognition, który sprawdza, czy model zalicza trudne zadania przy jednoczesnym utrzymaniu standardów prawdziwej produkcyjnej bazy kodu, Fable osiąga najlepsze wyniki spośród wszystkich frontier modeli już przy medium effort. Nie trzeba wykrzywiać modelu do granic, żeby dostać jego najlepszą pracę.

Drugi nawyk, który najbardziej obniżył koszty: autor przestał używać najdroższego modelu do wszystkiego. Fable jest drogi i słusznie, więc powinien robić to, do czego jest unikalnie zdolny: oceniać, projektować architekturę, dbać o spójność API, robić finalne review. Robota na piechotę trafia do tańszego modelu. Reguły routingu trafiają prosto do instrukcji agenta, dzięki czemu smart model czyta je i sam deleguje pracę, bez ręcznego przełączania przy każdym zadaniu.

Przy vibe codingu dyscyplina jest jeszcze ważniejsza, bo sens polega na tym, że nie czyta się diffa. Max effort nad-edytuje, a gdy nie czyta się kodu, nie wyłapuje się bloatu. Autor trzyma się czterech zasad: mały effort, małe zlecenia; tańszy model robi review przed akceptacją; wszystkie ryzykowne zmiany idą na osobną gałąź; a czas trwania run jest sygnałem o stanie codebase'u. Jedno ostrzeżenie, które podkreśla osobno: vibe-coded apps lubią przeciekać. Przed wypuszczeniem czegokolwiek do prawdziwych użytkowników warto puścić tani model na security pass.

**Key takeaways:**

- Effort high to optymalny wybór na co dzień; xhigh i max są pułapką, nie ulepszeniem
- Sygnał za wysokiego effort: mała prośba wraca z ogromnym diffem pełnym nieproszonych zmian
- Routing: smart model robi judgment i architekturę, tani model robi bulk i mechanikę
- Subagenty służą do fan-out reads, workflow do pracy etapowej gdzie krok B zależy od kroku A
- W vibe codingu każda ryzykowna zmiana idzie na branch; gałąź jest jednorazowa
- Jeden nieprzekraczalny zakaz dla autonomicznego agenta: never touch production

**Why do I care:**

Z perspektywy senior dewelopera ten artykuł dotyka czegoś, co zbyt łatwo się ignoruje: jakość narzędzia nie zastępuje jakości decyzji o jego użyciu. To, co autor opisuje z Fable 5, to w istocie stara prawda o każdym potężnym narzędziu, zbyt duże możliwości bez dyscypliny generują entropię, nie wartość. Konkretna rada o routingu modeli przez instrukcje w CLAUDE.md zamiast ręcznego przełączania jest warta wdrożenia od razu. Podobnie zasada o autonomicznych agentach: dawaj dużo swobody, ale definiuj jedno twarde ograniczenie, które chroni przed nieodwracalną zmianą. To nie jest paranoja, to inżynieria.

**Link:** [I Maxed Out Fable 5 and Regretted It. Here's How I Actually Run It Now](https://thoughts.jock.pl/p/fable-5-efficiency-high-not-max-2026?publication_id=1540552&post_id=206194124&isFreemail=true&triedRedirect=true)
