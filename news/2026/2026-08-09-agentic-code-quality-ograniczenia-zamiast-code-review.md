---
title: "Jakość kodu, gdy piszą go agenci: ograniczenia ważniejsze niż code review"
excerpt: "Addy Osmani tłumaczy, dlaczego przy kodzie pisanym przez agentów jakość trzeba wymuszać przez constrainty i bramki jakości, a nie przez klasyczne przeglądy kodu."
publishedAt: "2026-08-09"
slug: "agentic-code-quality-ograniczenia-zamiast-code-review"
hashtags: "#addyosmani #agenticcoding #codequality #softwareengineering #devtools #cicd #generated #pl"
source_pattern: "Addy Osmani"
---

## Jakość kodu, gdy piszą go agenci

**TLDR:** Osmani twierdzi, że klasyczny code review nie skaluje się do tempa, w jakim agenci generują kod, więc jakość trzeba przenieść do środowiska: testy, bramki jakości, statyczna analiza, reguły architektoniczne. Człowiek ma wkraczać tylko tam, gdzie automatyczne ograniczenia faktycznie się przełamią, a nie czytać każdy diff z osobna.

**Summary:** Punkt wyjścia jest prosty i chyba każdy, kto ostatnio pracował z agentowym coding assistantem, czuł to na własnej skórze: ktoś, kto ma przejrzeć każdą linijkę kodu wygenerowanego przez agenta, po prostu nie istnieje, a jak istnieje, to szybko się wypali. Osmani nie próbuje ratować code review kosmetycznymi poprawkami, tylko mówi wprost, że trzeba zmienić miejsce, w którym dzieje się weryfikacja. Zamiast człowieka czytającego diff, mamy system ograniczeń wokół agenta, testy jednostkowe, testy właściwości, testy akceptacyjne, mutation testing, metryki typu cyclomatic complexity czy reguły lintera pilnujące architektury. To wszystko razem tworzy coś, co nazywa bramkami jakości, czyli mechanizm, który decyduje, czy dana propozycja zmiany w ogóle ma prawo trafić dalej w pipeline.

Ciekawy jest fragment o zaufaniu, bo Osmani nie ukrywa, że sam testował ten problem empirycznie. Kazał jednemu agentowi zbudować aplikację, a drugiemu ją zrecenzować, dwa razy, i za każdym razem dostał inną odpowiedź. Trzeci przebieg dał trzeci wynik. To nie jest tylko anegdota, to konkretny argument przeciwko poleganiu na recenzji jednego agenta jako źródle prawdy o jakości kodu drugiego agenta. Skoro sama ocena jest niedeterministyczna, to nie można na niej oprzeć bramki merge'a, bo w praktyce byłby to rzut monetą z ładnym interfejsem. Stąd wniosek, że potrzeba czegoś, co daje ten sam, powtarzalny wynik na każdym commicie, niezależnie od tego, który agent czy człowiek go napisał.

Osmani rozkłada jakość na wiele wymiarów, nie tylko poprawność. Mówi o utrzymywalności, wydajności, bezpieczeństwie, czytelności, i słusznie zaznacza, że to wszystko trzeba traktować jako zestaw sygnałów o różnej wadze, a nie jedną liczbę na dashboardzie. To jest coś, co wielu zespołów ignoruje, bo łatwiej powiedzieć "testy przechodzą" niż usiąść i zdecydować, które z tych wymiarów są dla danego projektu krytyczne, a które można poluzować. W tekście pojawia się też pojęcie back-pressure, czyli presji zwrotnej wywieranej przez kompilator, testy, polityki bezpieczeństwa czy CI, która powinna działać na każdym etapie pipeline'u, a nie tylko jako ostatnia bramka przed produkcją. To jest chyba najbardziej praktyczna część całego wywodu, bo mówi wprost: jeśli czekasz z weryfikacją do samego końca, to już jest za późno, agent zdążył wygenerować kolejne sto zmian na bazie błędnej.

Najbardziej realistyczny jest fragment o skalowaniu, gdzie Osmani przyznaje, że kiedy wolumen zmian przerasta możliwości weryfikacji, są w zasadzie trzy wyjścia: rozbudować system weryfikacji, zwolnić tempo generowania zmian przez agentów, albo obniżyć poprzeczkę jakości. Żadna z tych opcji nie jest przyjemna, ale przynajmniej nazywa problem po imieniu zamiast udawać, że więcej agentów zawsze znaczy więcej dobrego kodu. Ostatnia myśl, że różnicujemy poziom ograniczeń w zależności od tego, na czym nam zależy, czyli mocniej tam gdzie ryzyko jest wysokie, luźniej tam gdzie eksperymentujemy, brzmi jak coś, co dobre zespoły robiły już wcześniej z ludzkim code review, tylko teraz trzeba to sformalizować i zautomatyzować, bo skala już nie pozwala na intuicję jednego seniora czytającego PR-y.

**Key takeaways:**
- Code review w dotychczasowej formie nie skaluje się do wolumenu zmian generowanych przez agentów, więc jakość trzeba przenieść do testów, bramek jakości i reguł w CI
- Recenzja kodu przez innego agenta jest niedeterministyczna, ten sam kod oceniony kilka razy może dać różne wyniki, więc nie nadaje się jako jedyne kryterium merge'a
- Back-pressure, czyli presja zwrotna z kompilatora, testów i polityk bezpieczeństwa, powinna działać na każdym etapie pipeline'u, nie tylko na końcu
- Jakość to nie jedna metryka, tylko zestaw sygnałów: poprawność, utrzymywalność, wydajność, bezpieczeństwo, czytelność, o różnej wadze dla różnych projektów
- Przy przeciążeniu systemu weryfikacji trzeba świadomie wybrać: rozbudować weryfikację, zwolnić tempo agentów albo obniżyć poprzeczkę jakości, i różnicować siłę ograniczeń zależnie od ryzyka danego obszaru kodu

**Why do I care:** Z perspektywy kogoś, kto odpowiada za architekturę i jakość w zespole, to jest dokładnie ten moment, w którym trzeba przestać traktować code review jako świętą krowę i zacząć inwestować w infrastrukturę wokół niego, bo inaczej agenci zaleją nas zmianami, których fizycznie nie da się przeczytać. Sam mam już takie doświadczenia, że recenzja jednego agenta nad kodem drugiego bywa niespójna między przebiegami, więc jedyne, co naprawdę działa, to twarde bramki: typechecking, testy mutacyjne, reguły architektoniczne w ESLincie, skanowanie bezpieczeństwa na późnym etapie. To nie jest argument za rezygnacją z ludzkiego osądu, tylko za tym, żeby ludzką uwagę kierować tam, gdzie faktycznie jest potrzebna, czyli tam gdzie automatyczne ograniczenia się wywrócą, a nie marnować ją na czytanie linijka po linijce kodu, który i tak przeszedł już dziesięć innych filtrów.

**Link:** [Agentic Code Quality](https://addyo.substack.com/p/agentic-code-quality?publication_id=2115638&post_id=210128469&isFreemail=true&triedRedirect=true)
