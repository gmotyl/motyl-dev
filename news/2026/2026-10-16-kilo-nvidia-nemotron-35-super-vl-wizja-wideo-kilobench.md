---
title: "Kilo: NVIDIA Nemotron 3.5 Super VL widzi obrazy i wideo"
excerpt: "Model 120B z 12B aktywnych parametrów dostał wizję, kontekst 1M tokenów i wynik 53 procent w KiloBench."
publishedAt: "2026-10-16"
slug: "kilo-nvidia-nemotron-35-super-vl-wizja-wideo-kilobench"
hashtags: "#kilo #ai #llm #agents #devtools #generated #pl"
source_pattern: "Kilo"
---

## Nemotron 3.5 Super VL w Kilo

**TLDR:** NVIDIA dodała wizję do Nemotron 3 Super. Nowy model Super VL ma 120 miliardów parametrów, z czego aktywnych jest 12 miliardów, i w KiloBench osiągnął 53 procent, tyle co GLM 5.2.

**Summary:** Nemotron 3.5 Super VL łączy dekoder Nemotron-H z kodowaniem obrazu RADIO, projektorem wizyjnym i osobnym modułem czasowym do wideo. Zachowuje wagi Multi-Token Prediction. Architektura bazuje na tym, co NVIDIA pokazała w Nemotron 3 Super, czyli warstwach Mamba odpowiadających za pamięć i wydajność oraz warstwach transformera odpowiadających za rozumowanie.

W praktyce dostajemy okno kontekstu 1 miliona tokenów i do 131 072 tokenów odpowiedzi. Model przyjmuje zrzuty ekranu, makiety, wykresy, diagramy i klipy MP4. Rozumowanie można włączać i wyłączać, ustawiać poziom wysiłku albo ograniczać twardym budżetem. Obsługuje wywoływanie narzędzi i ustrukturyzowane wyjście zgodne ze schematem JSON.

Autorzy bloga Kilo, który należy do Anaconda, opisują wczesne testy w trzech środowiskach, czyli Kilo Desktop, CLI oraz rozszerzeniach VS Code i JetBrains. Najlepiej wypadały poprawki frontendu na podstawie zrzutu ekranu, analiza wykresów w notebookach, długie sesje agentowe i zadania z wyjściem w JSON. Wynik 53 procent w KiloBench zrównuje model z GLM 5.2, jednym z najpopularniejszych modeli w Kilo. To benchmark prowadzony przez sprzedawcę narzędzia, więc traktowałbym go jako wskazówkę, nie wyrok.

Tekst wraca też do tezy o swobodzie wyboru modelu. Pytanie brzmi dziś, który model jest najlepszy do tego zadania, a nie który jest najlepszy w ogóle. Nemotron 3 Ultra może orkiestrować, a Super VL i Lightning wykonywać. NVIDIA według Wired planowała wydać około 26 miliardów dolarów w pięć lat na modele open-weight.

**Key takeaways:**
- 120B parametrów łącznie, 12B aktywnych, kontekst 1M tokenów.
- Obsługa obrazów i wideo oraz przełączane rozumowanie.
- 53 procent w KiloBench, tyle co GLM 5.2.
- Model jest już dostępny w Kilo Desktop, CLI i rozszerzeniach IDE.

**Why do I care:** Zrzut ekranu zepsutego layoutu wklejony do agenta to codzienność we frontendzie, więc model z wizją i otwartymi wagami jest tu praktyczny. Zaznaczam, że to tekst sprzedażowy firmy, która ma w tym interes, i brakuje w nim opisu porażek. Sprawdziłbym go na własnych screenshotach, bo na cudzym benchmarku nie dowiesz się, jak poradzi sobie z twoim CSS.

**Link:** [NVIDIA Nemotron 3.5 Super VL Is a Builder Just Like You](https://blog.kilo.ai/p/nvidia-nemotron-35-super-vl)
