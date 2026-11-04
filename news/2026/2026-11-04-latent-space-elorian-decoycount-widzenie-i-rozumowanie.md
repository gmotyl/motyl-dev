---
title: "DecoyCount: czy modele naprawdę liczą obiekty, i co Elorian rozumie przez myślenie wizualne"
excerpt: "Nowy benchmark pokazuje, że modele frontier nie przekraczają 50 procent w liczeniu z pułapkami, a Glimpse od Elorian zgłasza 50,48 procent w teście wewnętrznym."
publishedAt: "2026-11-04"
slug: "latent-space-elorian-decoycount-widzenie-i-rozumowanie"
hashtags: "#latent #ai #ml #llm #benchmarks #generated #pl"
source_pattern: "Latent Space"
---

## DecoyCount i model Glimpse

**TLDR:** Elorian i Mercor wypuściły benchmark DecoyCount, który sprawdza, czy model liczy obiekty, czy tylko zgaduje na skróty. Żaden model frontier nie przekroczył 50 procent, najlepszy był GPT-6 Astra z 43,17.

**Summary:** Elorian wyszło z ukrycia w kwietniu z 55 milionami dolarów seedu. Teraz publikuje benchmark z 1660 elementami i towarzyszący artykuł. Pokazuje on siedem mechanizmów błędów w liczeniu. Wyniki z artykułu to Astra 43,17 procent, Gemini 3.8 flash 32,71, Qwen3.8 max 28,31 i Claude Fable 5.1 25,22. Własny model Glimpse, według CEO Andrew Daia, dostał 50,48 procent, choć w pojedynczym uruchomieniu i bez harnessu, podczas gdy pozostałe modele uśredniono z trzech przebiegów.

Sens benchmarku polega na rozdzieleniu dwóch błędów. Jeśli widzisz jabłko przed lustrem, możesz nie zauważyć jabłka (błąd widzenia) albo policzyć je z odbiciem jako dwa (błąd rozumowania). Zwykłe testy sprawdzają tylko końcową liczbę, więc oba wyglądają tak samo.

Dai, współautor pracy o pretrainingu i fine-tuningu z 2015 roku, opisuje myślenie wizualne. Człowiek wyobraża sobie sofę w salonie albo w głowie wykreśla osoby przy stole. Elorian chce, żeby generowanie i edycja obrazów były częścią toku rozumowania modelu. To odróżnia go od modeli świata, takich jak Atlas czy Genie 4, które umożliwiają działanie w symulowanym świecie. Zastosowania to robotyka, inżynieria, obronność i kontrola zgodności z przepisami budowlanymi.

**Key takeaways:**
- DecoyCount rozdziela błąd widzenia od błędu rozumowania.
- Najlepszy model frontier osiągnął 43,17 procent.
- Wynik Glimpse pochodzi od producenta i z innej metodyki niż reszta.

**Why do I care:** Benchmark współautorstwa firmy, która go wygrywa, trzeba czytać ostrożnie, a sam autor to przyznaje, wskazując różnicę w liczbie przebiegów. Przydaje się jednak jako ostrzeżenie, że modele multimodalne w pracy z obrazem, na przykład w testach wizualnych UI, mogą odpowiadać pewnie i źle.

**Link:** [Can Frontier Models See Past a Decoy? Elorian Tests Visual Reasoning](https://www.latent.space/)
