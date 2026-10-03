---
title: "Pantry Pilot: jak zbudować Claude Skill, który planuje tygodniowe posiłki i robi listę zakupów"
excerpt: "The AI Break pokazuje krok po kroku, jak złożyć Claude Skill planujący posiłki wokół alergii, budżetu i zapracowanych wieczorów, z gotowymi promptami do skopiowania."
publishedAt: "2026-10-02"
slug: "pantry-pilot-claude-skill-meal-planner"
hashtags: "#theaibreak #ai #claude #agents #productivity #generated #pl"
source_pattern: "The AI Break"
---

## Pantry Pilot: Claude Skill, który zna twoją kuchnię i planuje tydzień w dwie minuty

**TLDR:** Artykuł prowadzi przez budowę Pantry Pilot, Claude Skill planującego posiłki na podstawie profilu domowników, banku ulubionych dań i budżetu, kończąc gotową listą zakupów pogrupowaną po alejkach sklepowych.

**Streszczenie:** Punktem wyjścia jest typowy problem: nikt nie wie, co na kolację, w lodówce gnije warzywo, a aplikacja do dostawy jedzenia już się otwiera. Autor szacuje, że przeciętna czteroosobowa rodzina wyrzuca rocznie jedzenie warte około 1500 dolarów, a licząc dodatkowo wieczory "zamówmy coś, bo nic nie zaplanowaliśmy", strata bywa znacznie wyższa. Rozwiązanie budowane jest w trzech krokach, każdy z gotowym promptem do wklejenia.

Pierwszy prompt to wywiad budujący "Kitchen Profile": jedenaście pytań zadawanych jedno po drugim, o liczbę i wiek domowników, alergie z poziomem powagi dla każdej osoby osobno, diety, twarde "nie", budżet tygodniowy, czas na gotowanie w tygodniu i w weekend, poziom umiejętności, sprzęt kuchenny, dni chaosu w tygodniu i sklepy, w których się robi zakupy. Drugi prompt bierze ten profil plus listę dziesięciu do dwudziestu dań, które gospodarstwo już lubi, czyści je, usuwa albo modyfikuje te łamiące alergie, i taguje każde czasem przygotowania, kosztem i tym, czy nadaje się na lunch następnego dnia, dorzucając osiem nowych propozycji dopasowanych do profilu, z czego co najmniej trzy fast na 15 minut dla wieczorów chaosu.

Trzeci element to już sam skill, plik `pantry-pilot/SKILL.md` z czterema trybami: planowanie tygodnia, "użyj tego, co jest" na podstawie zdjęcia lodówki, podmiana posiłku i wyciąganie pełnego przepisu. Całość ma działać tak, żeby raz w tygodniu zająć około dwóch minut, w przeciwieństwie do typowych 45 minut niedzielnego scrollowania, które i tak kończy się zapomnianym składnikiem do środy.

**Kluczowe wnioski:**
- Kitchen Profile traktuje alergie jako twardą zasadę, więc skill chroni tylko to, co dostanie w wywiadzie, łącznie z łagodnymi nietolerancjami.
- Bank posiłków zaczyna od tego, co rodzina już je, nie od losowych przepisów z internetu, co ma zmniejszyć opór przed wdrożeniem.
- Każdy posiłek jest otagowany czasem, kosztem i przydatnością na lunch następnego dnia, co pozwala planerowi układać tydzień pod konkretne ograniczenia.

**Dlaczego mi na tym zależy:** To dobry przykład wzorca, który przenosi się wprost na produkty firmowe: trwały, ustrukturyzowany profil użytkownika plus bank znanych, zaakceptowanych opcji, które agent miesza zamiast zgadywać od zera za każdym razem. Ten sam szkielet, profil plus bank wiedzy plus skill z trybami, równie dobrze posłuży do budowy wewnętrznego asystenta do planowania sprintów czy przeglądu PR-ów.

**Link:** [Tutorial: Save $1,500/year on Groceries With a Meal Planner Skill](https://theaibreak.substack.com/p/tutorial-save-1500year-on-groceries)
