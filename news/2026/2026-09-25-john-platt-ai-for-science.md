---
title: "John Platt: naukowiec, który był dwadzieścia lat za wcześnie"
excerpt: "John Platt z Google opowiada o ERA, systemie, w którym Gemini samodzielnie prowadzi eksperymenty naukowe, oraz o walce z efektem smug kondensacyjnych samolotów."
publishedAt: "2026-09-22"
slug: "john-platt-ai-for-science"
hashtags: "#latent #ai #llm #ml #agents #science #climate #generated #pl"
source_pattern: "Latent.Space"
---

## John Platt: naukowiec, który był dwadzieścia lat za wcześnie

**TLDR:** John Platt, naukowiec Google z Oscarem, dwiema nazwanymi asteroidami i współautorstwem klasycznych algorytmów uczenia maszynowego, opowiada o Empirical Research Assistance, systemie, w którym Gemini samodzielnie prowadzi eksperymenty naukowe metodą przypominającą Monte Carlo Tree Search. Rozmowa schodzi też na smugi kondensacyjne, klimat i to, dlaczego czasem warto iść pod górę pieszo zamiast jechać samochodem.

**Summary:** Kolega Platta z Google, Dave Bacon, żartuje, że cała kariera Johna polega na tym, że jest dwadzieścia lat przed swoim czasem, czy to przy sieciach konwolucyjnych, fuzji jądrowej, czy komputerach kwantowych. Ten wątek stał się punktem wyjścia do rozmowy o tym, jak jego zespół w Google doszedł do wniosku, że wiele problemów naukowych da się sprowadzić do jednej wspólnej postaci: zadania, które da się ocenić liczbową punktacją. Skoro istnieje funkcja oceny, cały problem sprowadza się do znalezienia kodu, który tę ocenę maksymalizuje. Trudność leży w sformułowaniu samej punktacji, nie w optymalizacji.

Z tej obserwacji powstało ERA, system, który Platt opisuje jako bliskiego kuzyna Monte Carlo Tree Search. Gemini trzyma drzewo dotychczasowych eksperymentów zapisanych jako notatniki i w każdej iteracji reguła Upper Confidence Bound wybiera, które gałęzie warto zmutować. Czasem wybiera nawet tę piątą najlepszą, bo strategia jest optymistyczna, nie zachłanna. Model proponuje około dziesięciu mutacji na gałąź i dzieli historię każdej z nich między liśćmi drzewa, więc różne ścieżki eksperymentu uczą się od siebie nawzajem. Same algorytmy ewolucyjne istnieją od lat siedemdziesiątych, ale przełom pojawił się dopiero między Gemini 2.0 a 2.5. Nagle model faktycznie wiedział, gdzie szukać.

Skuteczność ERA rodzi oczywiste pytanie o to, jak nie oszukać samego siebie, kiedy ma się do dyspozycji tak potężne narzędzie optymalizacyjne. Platt przywołuje konkurs Kaggle na wykrywanie smug kondensacyjnych, który wygrali uczestnicy dostrzegający pół-pikselowy błąd w etykietach danych, zamiast realnie rozwiązać problem. To dobra ilustracja prawa Goodharta: każda miara, która staje się celem, przestaje być dobrą miarą. Jego rada na start jest uparcie prosta: dopasować zwykłą regresję liniową albo SVM, zanim sięgnie się po coś bardziej wyrafinowanego.

Największym namacalnym efektem pracy zespołu Platta jest model redukujący smugi kondensacyjne samolotów, które odpowiadają podobno za około jeden procent globalnego ocieplenia wywołanego przez człowieka. Rozwiązanie fizyczne jest banalne, samoloty mają zmienić poziom lotu w rejonach nasyconych lodem, ale policzenie, ile ocieplenia faktycznie się w ten sposób unika, blokowało zespół przez dwa lata, bo brakowało modelu dla odbitego światła słonecznego. ERA znalazło prosty model uwzględniający czynniki zakłócające, których zespół wcześniej nie brał pod uwagę.

Rozmowa kończy się osobistą refleksją Platta, że najważniejszą umiejętnością pozostaje głęboka wiedza domenowa, a gustu naukowego nie da się rozwinąć inaczej niż przez mierzenie się z trudnymi problemami. Zachęca nawet do świadomego wybierania trudniejszej drogi, czyli zaimplementowania czegoś samodzielnie zamiast sięgania po gotowe narzędzie, bo hiperoptymalizacja pracy prowadzi do przeuczenia się w tym, co się robi, tak samo jak przeuczony bywa model.

**Key takeaways:**
- Wiele problemów naukowych sprowadza się do zadania punktowalnego: gdy istnieje funkcja oceny, cały problem staje się poszukiwaniem kodu maksymalizującego wynik.
- ERA działa jak Monte Carlo Tree Search nad notatnikami eksperymentów, z regułą Upper Confidence Bound wybierającą, które gałęzie mutować, a przełom nastąpił dopiero przy przejściu z Gemini 2.0 na 2.5.
- Konkurs Kaggle o wykrywanie smug kondensacyjnych pokazał, jak łatwo zoptymalizować pod błąd w etykietach zamiast pod rzeczywisty problem, czysta ilustracja prawa Goodharta.
- Model pomógł rozwiązać dwuletni impas w liczeniu efektu smug kondensacyjnych samolotów na klimat, znajdując czynnik zakłócający dla odbitego światła słonecznego.
- Platt uważa, że najważniejszą kompetencją pozostaje głęboka wiedza domenowa, a jej nie da się zdobyć bez ręcznej, powolnej pracy nad trudnymi problemami.

**Why do I care:** To rzadki przypadek treści z newslettera AI, w którym warto usiąść i pomyśleć o architekturze eksperymentu, a nie o architekturze systemu. Mechanizm ERA, czyli drzewo wariantów z oceną i optymistyczną eksploracją, to w gruncie rzeczy ten sam wzorzec co dobrze zaprojektowany pipeline CI/CD albo system feature flag, tylko zastosowany do nauki zamiast do kodu produkcyjnego. Dla mnie jako dla kogoś, kto projektuje systemy, ciekawszy niż sam ERA jest komentarz o Kaggle: ludzie sami zaczynają zachowywać się jak modele nagradzane za złą metrykę, co jest ostrzeżeniem przed każdym KPI, który zespół produktowy ustawi sobie bez zastanowienia nad tym, co naprawdę mierzy.

**Link:** [John Platt on AI for Science](https://www.latent.space/p/john-platt)
