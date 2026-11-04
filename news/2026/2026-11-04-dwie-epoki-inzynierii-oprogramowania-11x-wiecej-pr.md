---
title: "Dwie epoki inżynierii oprogramowania: 11 razy więcej PR-ów i cena, jaką za to płaci człowiek"
excerpt: "Zwycięski esej konkursu Pragmatic Engineer: Neil Kakkar porównuje swoją pracę w Bloomberg, PostHog i startupie AI-native, gdzie merguje ponad 200 PR-ów miesięcznie bez ludzkich code review."
publishedAt: "2026-11-04"
slug: "dwie-epoki-inzynierii-oprogramowania-11x-wiecej-pr"
hashtags: "#pragmaticengineer #ai #agents #productivity #engineering #teams #code-review #culture #generated #pl"
source_pattern: "Pragmatic engineer"
---

## How software engineering is changing: a tale of two eras

**TLDR:** Neil Kakkar, zwycięzca eseju konkursowego Pragmatic Engineer, mierzy własną pracę w trzech firmach. W startupie AI-native merguje około 11 razy więcej PR-ów niż w PostHog sprzed ery AI, bo zniknęły code review, narzut komunikacyjny i czekanie na product managera. Zapłacił za to rozproszeniem, utratą wspólnego kontekstu i zmęczeniem.

**Summary:** Punktem wyjścia są liczby z własnego repozytorium autora. W Bloomberg mergował od ośmiu do dwudziestu PR-ów miesięcznie, w PostHog około 2,4 raza więcej, a w Tano, gdzie jest pierwszym inżynierem, ponad dwieście. Pracuje z Claude Code Desktop, prowadzi jednocześnie trzy do pięciu zadań, a agent potrzebuje godziny lub dwóch na całą funkcję. Do każdego PR-a dostaje wygenerowane podsumowanie w HTML. Autor jest uczciwy w jednej sprawie. PR-y łatwo ugrać jako miarę, więc rozpisuje, co faktycznie robił, a PostHog traktuje jako punkt odniesienia z czasów sprzed AI.

Najciekawsze są ograniczenia, które zniknęły. Jedna osoba zajmuje się całym stosem od projektu po backend, więc nie ma narzutu komunikacyjnego. Code review są opcjonalne, gdy ktoś już zna bazę kodu, a standardem jest agent uruchamiany na każdym PR-ze w CI, często jedyny recenzent. Błędy się zdarzają. Agent potraktował drobne jednostki waluty jako setne części, choć dinar bahrajski dzieli się na tysiąc, a w repozytorium istniał już do tego pomocnik. Blokująca migracja na tabeli z sześcioma milionami wierszy zatrzymała zapis nowych postów. Po każdej takiej wpadce autor dopisuje regułę do agenta recenzującego. Współczynnik cofnięć jest sześć razy niższy, bo poprawki idą do przodu, a mediana czasu do mergea to poniżej godziny. Duże migracje, które w PostHog trwały rok, w Tano zajęły tygodnie, choć w jednej z nich zabrakło zabezpieczeń i twórcy dostali podwójne wypłaty.

Druga połowa eseju to koszty. Wąskie gardło przesunęło się na człowieka. Autor opisuje thrashing, czyli przełączanie się między zadaniami zamiast ich robienia, bo skoro naprawa błędu zajmuje godzinę bez wysiłku, odpala agenta na każde zgłoszenie. Przestał czytać cudzy kod, więc traci wiedzę o tym, co robią koledzy, a współczynnik busa jest coraz gorszy. Wprowadził sobie zasady. Zostawia laptop w pracy i pozwala agentom działać wieczorem, a o szóstej kończy dzień. Zwraca też uwagę na dwie rzeczy, które łatwo przeoczyć. Projekty graficzne generowane przez AI wyglądają podobnie do innych, a limit planu Claude Max, w jego przypadku 8000 dolarów miesięcznie w stawkach API, wymusza wybór priorytetów.

W podsumowaniu autor twierdzi, że AI to mnożnik prędkości, ale potrzebuje kultury, która usuwa kolejne ograniczenia. Gergely Orosz dodaje od siebie, że w branży średni wzrost liczby PR-ów to mniej więcej dwukrotność od stycznia, a szybkość iteracji sama w sobie nic nie mówi bez dopasowania produktu do rynku i zdrowej ekonomii jednostkowej.

**Key takeaways:**

- Z około 8 do 20 PR-ów miesięcznie do ponad 200, ale przy braku ludzkich code review i bez product managera.
- Zautomatyzowany recenzent uczy się na wpadkach, a poprawki idą do przodu zamiast cofania zmian.
- Cena to thrashing, rozproszony kontekst, gorszy współczynnik busa i zmęczenie, które autor leczy sztywnymi granicami dnia pracy.

**Why do I care:** To najuczciwszy tekst o AI w zespołach, jaki ostatnio czytałem, właśnie dlatego, że zawiera koszty. Jednocześnie podważyłbym wniosek. Autor porównuje siebie sprzed roku z sobą dziś w innej firmie, więc nie wiemy, ile z tego daje AI, a ile to, że w pięcioosobowym startupie nikt nie ma na ciebie weta. Czego esej nie bierze pod uwagę, to produkty z klientami, którzy płacą i nie wybaczają podwójnych wypłat. Dla architekta pożyteczne jest co innego. Jeśli review znika, kontrole muszą przenieść się do CI, do testów kontraktowych i do reguł, które zapamiętują każdą poprzednią wpadkę. Bez tego dostajesz szybkość, ale też coraz większy dług, którego nikt nie czyta.

**Link:** [How software engineering is changing: a tale of two eras](https://newsletter.pragmaticengineer.com/p/how-software-engineering-is-changing)
