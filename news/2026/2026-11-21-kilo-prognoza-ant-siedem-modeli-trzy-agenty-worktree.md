---
title: "Kilo: siedem modeli przewiduje pierwszy kurs akcji Anthropic i test, czy trzy agenty kończą szybciej"
excerpt: "Eksperyment z prognozą zamknięcia ANT przez siedem modeli oraz sposób na uczciwy pomiar zysku z równoległych agentów w osobnych worktree."
publishedAt: "2026-11-21"
slug: "kilo-prognoza-ant-siedem-modeli-trzy-agenty-worktree"
hashtags: "#kilo #ai #llm #agents #testing #git #productivity #generated #pl"
source_pattern: "Kilo"
---

## Siedem modeli przewiduje debiut giełdowy Anthropic

**TLDR:** Autor zapytał siedem modeli o kurs zamknięcia ANT pierwszego dnia notowań. Najbliżej były Gemini 4 Neon i Claude Fable 5.2, ale większość modeli nie pobiła zwykłego skopiowania ceny z kontraktu podanego w danych.

**Summary:** Anthropic wycenił ofertę na 83 dolary za akcję, powyżej zakładanego przedziału 70 do 78. Autor dał siedmiu modelom ten sam krótki plik z faktami: cenę emisji, kontrakt wieczysty notowany po 96 do 100 dolarów, free float około 7,5 procent i daty wejścia do indeksów. Modele to Claude Fable 5.2, Gemini 4 Neon, GLM 5.3, Kimi K3.1 Pro, DeepSeek V4.1 Flash 1017, Nemotron 3.5 Super VL i Qwen 3.8 Max, każdy na najwyższym dostępnym poziomie wysiłku, po dwa uruchomienia, z medianą jako odpowiedzią. Zasada oceny została ustalona przed debiutem: odchylenie w procentach i to, czy zamknięcie mieści się w 80-procentowym przedziale.

Pierwsza transakcja wyniosła 111,50 dolara, a zamknięcie 97,17, czyli 17,1 procent powyżej ceny emisji i 12,9 procent poniżej pierwszego kursu. Gemini i Fable pomyliły się o 33 centy, a wszystkie 14 przedziałów zawierało zamknięcie. Każdy model był trochę zbyt optymistyczny. Środek kontraktu, czyli 98 dolarów, pomyliłby się o 0,85 procent, więc tylko dwa modele pobiły prostą kopię. Najdokładniejsze pary były też najdroższe, 6,92 dolara dla Fable i 1,70 dla Gemini, a trzycentowa para DeepSeeka pomyliła się o około 5 procent.

Autor przyznaje błąd: modele uruchomiono w dwóch partiach, a sesje Fable z drugiej partii zatrzymały się po sześciu sekundach bez zapisu wyniku. W drugiej rundzie zmienił zasady, wysyłając uruchomienia po kolei, podając fakty w prompcie i blokując narzędzia. Rozrzut prognoz na piątek spadł z 12,75 do 2,63 dolara, a koszt 14 uruchomień wyniósł 1,38 dolara zamiast 9,66. Wniosek: dwa uruchomienia jednego dnia nie wystarczą do rankingu, ale to dobry punkt wyjścia do powtarzalnego pomiaru.

**Key takeaways:**
- Większość modeli nie pobiła kopii ceny kontraktu podanej w danych wejściowych.
- Zasada oceny musi być ustalona przed zdarzeniem, a odpowiedzi zapisane przed wynikiem.
- Zawężenie pytania i zablokowanie narzędzi obniżyło koszt siedmiokrotnie.

**Why do I care:** Wniosek jest ostrzejszy, niż autor go stawia: to test zakotwiczenia, a nie przewidywania, bo podpowiedź była w danych. Dwa uruchomienia jednego dnia to anegdota, nie benchmark. Wartościowy jest sam schemat, czyli zapisać prognozę, ustalić metrykę i porównać z naiwną linią bazową, który możecie użyć do własnych pytań, na przykład czy build przejdzie.

**Link:** [We asked AI models to predict Anthropic's first close](https://blog.kilo.ai/p/we-asked-ai-models-to-predict-anthropics)

## Czy trzy agenty kończą szybciej

**TLDR:** Aby ocenić zysk z równoległych agentów, trzeba mierzyć czas do zintegrowanej i sprawdzonej aplikacji, a nie do momentu, gdy agenci skończą pracę. Porównanie robi się w osobnych worktree Gita.

**Summary:** Jeśli trzy agenty kończą łatki w dziesięć minut, ale scalanie i naprawa zajmują kolejne dwadzieścia, to całość trwa trzydzieści minut i dopiero to porównuje się z uruchomieniem sekwencyjnym. Kilo Desktop pozwala prowadzić osobne sesje w nowych lub istniejących worktree, więc każdy agent ma własne pliki robocze od wybranej bazy.

Ćwiczenie opiera się na aplikacji demonstracyjnej ze stroną pomocy, stroną raportów i oknem wyszukiwania. Jeden agent robi rozwijane FAQ, drugi eksport CSV, trzeci skrót wyszukiwania, który nie może działać podczas pisania w polu formularza. Każdy dostaje ten sam commit startowy, dozwolone pliki, komponenty do ponownego użycia i wymagane testy. Jeśli wszystkie zadania wymagają zmiany tego samego komponentu, trzeba najpierw ustalić jego interfejs, bo osobne worktree nie rozwiążą wspólnej decyzji projektowej.

Pomiar rozbija czas na przygotowanie, oczekiwanie, aktywny nadzór, integrację i weryfikację. Należy też ustalić osobne porty serwerów i osobne bazy testowe, żeby sesje sobie nie przeszkadzały. Przyspieszenie to czas sekwencyjny podzielony przez równoległy, na przykład 30 do 20 minut daje 1,5 raza. Jeśli równoległa wersja kosztowała jeszcze 15 minut waszej uwagi, trzeba zdecydować, czy skrócenie o 10 minut jest tego warte. Najdłuższe zadanie wyznacza dolną granicę czasu fazy równoległej.

**Key takeaways:**
- Mierz czas do zintegrowanego, zweryfikowanego wyniku, razem z naprawami po scaleniu.
- Dziel pracę według zależności i ustal wspólne interfejsy przed startem.
- Jeśli trzy sesje wymuszają ciągłe odpowiedzi, spróbuj dwóch agentów.

**Why do I care:** To rzadki przykład, w którym ktoś liczy koszt koordynacji, a nie tylko czas generowania. Autor słusznie zwraca uwagę, że łatki mogą scalić się bez konfliktu i mimo to zachowywać się niezgodnie. Pominięto jednak koszt tokenów jako osobną oś decyzji, choć przy trzech agentach rośnie on liniowo.

**Link:** [Do three agents finish sooner? Count the integration](https://blog.kilo.ai/p/do-three-agents-finish-sooner-count)
