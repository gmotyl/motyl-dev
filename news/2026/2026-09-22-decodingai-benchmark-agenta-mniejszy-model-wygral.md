---
title: "Decoding AI: zbudowałem benchmark dla swojego agenta i wygrał mniejszy model"
excerpt: "Model czterokrotnie mniejszy pokonał większy o 42 punkty procentowe na własnym, dopasowanym benchmarku, co pokazuje, że generyczne rankingi modeli mówią mniej o twoim agencie, niż mówi ci własny, dobrze zaprojektowany zestaw testów."
publishedAt: "2026-09-22"
slug: "decodingai-benchmark-agenta-mniejszy-model-wygral"
hashtags: "#ai #testing #architecture #llm #generated #pl"
source_pattern: "Decoding AI"
---

## Model 4x mniejszy wygrał 95% do 53% na benchmarku dopasowanym do agenta

**TLDR:** Autor porównał Qwen3.6-35B z GPT-OSS-120B na własnym benchmarku dla agenta kodującego Decode i mniejszy model wygrał 95% do 53% mimo czterokrotnej różnicy w liczbie parametrów. Wniosek: benchmark dopasowany do konkretnej harności agenta mówi więcej niż generyczny ranking modeli, bo harność, czyli prompty, opisy narzędzi i budżety kroków, była optymalizowana pod mniejszy model.

**Summary:** Artykuł zaczyna od rozróżnienia trzech pytań, na które odpowiadają różne rodzaje ewaluacji: benchmarki odpowiadają „czy to działa" i są uruchamiane podczas rozwoju funkcji, testy regresyjne odpowiadają „czy poprzednie funkcje wciąż działają" po zmianach w kodzie, a ewaluacje online odpowiadają „czy działa zgodnie z oczekiwaniami" na próbkach ruchu produkcyjnego. W agencie kodującym zamiana jednego modelu na inny może poprawić wynik benchmarku, a jednocześnie zepsuć test regresyjny sprawdzający, czy narzędzie odczytu pliku jest wywoływane poprawnie przy progresywnym ujawnianiu skilli, dlatego oba typy testów trzeba trzymać osobno i patrzeć na oba naraz.

Architektura harnessu ewaluacyjnego jest celowo odseparowana od pętli agenta: harness ewaluacyjny nigdy nie importuje kodu agenta, tylko uruchamia go jako osobny proces przez najwęższy dostępny interfejs, w tym przypadku komendę terminalową `decode run`. Agent oddaje swoją pracę jako gałąź gita, a weryfikator ocenia czysty klon tej gałęzi z ukrytymi testami dołożonymi na końcu, żeby uniknąć wycieku rozwiązania. To wzorzec zapożyczony wprost z frameworka Harbor, na którym oparte są benchmarki Terminal-Bench i DeepSWE, z regułą przewodnią: agent nigdy nie ocenia sam siebie i nigdy sam siebie nie prowizjonuje.

Kluczowy eksperyment porównuje dwa modele na tym samym zestawie 19 zadań: Qwen3.6-35B osiągnął 95% zdanych zadań przy jednej próbie na zadanie, GPT-OSS-120B tylko 53%, mimo że jest około czterokrotnie większy pod względem liczby parametrów. Wyjaśnienie autora jest konkretne: prompty, opisy narzędzi i budżety kroków harnessu były dostrojone pod mniejszy model, więc generyczny ranking modeli ułożyłby te dwa modele w odwrotnej kolejności, niż pokazuje test na realnym zadaniu tego konkretnego agenta.

Druga część artykułu dotyczy testów regresyjnych, rosnących organicznie z realnych awarii produkcyjnych, a nie projektowanych z góry. Autor opisuje proces analizy błędów w pięciu krokach: obserwuj każdą sesję, diagnozuj grupując złe przebiegi po sygnaturze błędu, napraw problem, przechwyć jeden przypadek pass/fail na grupę błędów, i bramkuj każdą kolejną zmianę tym przypadkiem. Przykład z tekstu: agent proszony o dodanie kota jako współautora do README wywoływał odczyt pliku o nazwie `README` w repozytorium, gdzie plik nazywał się faktycznie `README.md`, po zauważeniu, że błąd się powtarza, trafił do zestawu regresyjnego jako trwały test.

Rozróżnienie między benchmarkiem a testem regresyjnym jest subtelne, ale istotne: benchmark ocenia artefakt, czyli jak dobrze coś zostało zaimplementowane, a test regresyjny ocenia trajektorię, czyli jak agent się zachowywał po drodze, co oznacza patrzenie na wnętrze agenta, nie tylko na jego finalny wynik. W praktyce oznacza to dwa style metryk: oceny przez sędziego LLM (G-Eval) bez potrzeby złotej etykiety referencyjnej, oraz deterministyczne metryki sprawdzające konkretne zachowania, jak to, czy dane narzędzie zostało wywołane w danym scenariuszu.

Osobny eksperyment porównuje modele rozliczania: płatność za token (OpenRouter) kontra płatność za godzinę GPU (Modal), przy tym samym modelu Qwen3.6-35B. Przy jednym przebiegu na raz płatność za token wygrała wyraźnie: 1,2 miliona tokenów za około 18 centów, podczas gdy GPU stało w większości bezczynne, ale i tak było rozliczane za czas ściany zegara. Autor podsumowuje to regułą z Modal: płatność za obliczenia opłaca się dopiero, gdy utrzymujesz GPU przy pełnym obciążeniu przez ciągłe batchowanie, nie przy pojedynczym zadaniu na raz.

**Key takeaways:**
- Model czterokrotnie mniejszy (Qwen3.6-35B) osiągnął 95% skuteczności wobec 53% większego GPT-OSS-120B na benchmarku dopasowanym do konkretnej harności agenta, bo prompty i budżety kroków były optymalizowane pod mniejszy model
- Benchmark ocenia artefakt (wynik), test regresyjny ocenia trajektorię (zachowanie po drodze), oba są potrzebne i mierzą różne rzeczy przy tej samej zmianie w kodzie
- Testy regresyjne warto budować organicznie z realnych awarii produkcyjnych przez analizę błędów, nie projektować z góry, a płatność za token wygrywa z płatnością za GPU, dopóki nie utrzymujesz stałego, wysokiego obciążenia

**Why do I care:** Jeśli budujesz agenta i opierasz wybór modelu na generycznym leaderboardzie albo liczbie parametrów, ten artykuł jest konkretnym dowodem, że to może dać ci odwrotny ranking niż rzeczywista wydajność na twoim zadaniu. Warto zainwestować w mały, dopasowany benchmark własnej harności, zanim zaczniesz porównywać modele, bo dopiero wtedy porównanie mówi coś o twoim konkretnym przypadku użycia, a nie o abstrakcyjnej sile modelu w oderwaniu od promptów i narzędzi, z którymi faktycznie pracuje.

**Link:** [I Built a Benchmark for My Agent. The Smaller Model Won.](https://www.decodingai.com/p/evaluate-ai-agents-benchmarks-regression-tests)
