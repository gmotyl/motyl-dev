---
title: "Decoding AI: Parallel Code, czyli równoległa eksploracja i jedna implementacja zamiast trzech pełnych diffów"
excerpt: "Autor Super Productivity opisuje workflow z wieloma modelami, w którym równolegle bada się problem i recenzuje, ale implementuje tylko raz."
publishedAt: "2026-10-14"
slug: "decoding-ai-parallel-code-wielu-agentow-jedna-implementacja"
hashtags: "#decodingai #ai #agents #git #workflow #devtools #generated #pl"
source_pattern: "Decoding AI"
---

## Wielu agentów bez wielu pełnych diffów do przeglądu

**TLDR:** Johannes, twórca Super Productivity i aplikacji Parallel Code, argumentuje, że uruchamianie kilku agentów na tym samym zadaniu i wybieranie najlepszego wyniku tylko przenosi problem. Lepiej badać równolegle, implementować raz i recenzować równolegle.

**Summary:** Punkt wyjścia: jeden agent daje jedną interpretację, jeden pomysł i jeden zestaw ślepych plamek. Pewny siebie, przechodzący testy, czterystuliniowy diff może łatać objaw w złej warstwie, dublować helper i zmieniać zachowanie, o które nikt nie prosił. Uruchomienie trzech agentów oznacza przegląd trzech takich diffów, a wąskim gardłem jest uwaga programisty, nie generowanie kodu.

Proponowany proces ma cztery kroki. Najpierw kilka modeli niezależnie bada zadanie i repozytorium bez edycji, zwracając rozumienie problemu, dowody z plików i symboli, proponowane rozwiązanie, alternatywy, ryzyka i testy. Porównanie krótkich propozycji jest znacznie tańsze niż porównanie gotowych implementacji, a różne rodziny modeli sprawdzają różne ścieżki wykonania. Potem wybiera się podejście na podstawie dowodów: czy usuwa przyczynę, czy zmiana jest w odpowiedniej warstwie, czy jest mniejsze rozwiązanie. Następnie powstaje krótki plan z przyczyną, plikami, krokami i testami. Dopiero potem następuje jedna implementacja, a recenzje wykonuje równolegle kilka modeli.

Konkurencyjne implementacje autor zostawia na przypadki, gdy analiza nie rozstrzyga ważnej niepewności, na przykład przy dwóch algorytmach wymagających pomiaru.

**Key takeaways:**
- Przegląd krótkich propozycji kosztuje mniej uwagi niż przegląd pełnych implementacji.
- Różne modele patrzą na różne ścieżki w kodzie.
- Więcej wnioskowania, mniej pracy ludzkiej uwagi.

**Why do I care:** To zmienia, gdzie wydajesz budżet: na tokeny, nie na własny czas przeglądu. Autor sprzedaje własne narzędzie, więc warto pamiętać, że ten sam proces da się ręcznie odtworzyć z worktree i zwykłych sesji CLI, a koszt tokenów rośnie liniowo z liczbą modeli.

**Link:** [Parallel Code: Decoding AI](https://www.decodingai.com/p/the-future-of-ai-coding-is-multi-agent)
