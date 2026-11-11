---
title: "Latent Space: NaiveAI obiecuje 2100 tokenów na sekundę, a jak koduje?"
excerpt: "Test modelu Naive-N0.5-Flash przeciwko DeepSeek V4.1 Flash i GLM 5.3 Flash na pytaniach z benchmarków i trzech aplikacjach 3D."
publishedAt: "2026-11-10"
slug: "latent-space-naiveai-n0-5-flash-szybkosc-kodowanie-test"
hashtags: "#latent-space #ai #llm #ml #performance #devtools #generated #pl"
source_pattern: "Latent Space"
---

## Naive-N0.5-Flash: szybkość kontra koszt rozumowania

**TLDR:** Naive-N0.5-Flash to otwarty model od chińskiej firmy NaiveAI, zoptymalizowany pod maksymalną liczbę tokenów na sekundę. W teście Latent Space jest zwykle najszybszy, ale na trudnych pytaniach rozumuje bardzo długo.

**Summary:** Model wywodzi się z Xiaomi MiMo-V2.5, rzadkiego modelu MoE o 310 miliardach parametrów, z których 15 miliardów jest aktywnych. NaiveAI dotrenowało go na około 3,25 biliona dodatkowych tokenów z warstwami rzadkiej uwagi znanymi z DeepSeeka i połączyło z własnym silnikiem inferencji. Cel długoterminowy jest ambitny: model budowany w dużej mierze przez AI, który ma sam prowadzić badania i się ulepszać.

Test porównuje go z DeepSeek V4.1 Flash 1017 i GLM 5.3 Flash na trzydziestu pytaniach z MATH-500, GPQA-Diamond i HLE-Diamond. Mediana odpowiedzi w trybie myślenia trwała 3,1 sekundy wobec 5,3 i 10,1 sekundy u konkurentów, ale średnie są zbliżone do DeepSeeka, a na najtrudniejszych pytaniach Naive był wolniejszy: 89,8 sekundy wobec 79,7. Na pytaniach HLE zużywał przeciętnie około 108 tysięcy tokenów, czyli dziewięć do jedenastu razy więcej niż rywale. Szybkość pochodzi z dekodowania spekulatywnego: szczytowo około 2100 tokenów na sekundę, w trakcie myślenia około 984, ale akceptacja szkiców spada z 70 do 43 procent, gdy myślenie jest włączone.

W trzech aplikacjach, układzie słonecznym, drzewie 3D i porcie ray tracera z książki, Naive z włączonym myśleniem był najlepszy w pierwszej, dorównał DeepSeekowi w drugiej i był nieco gorszy w trzeciej. Bez myślenia nie wygenerował używalnej aplikacji z drzewem. Cena docelowa to 0,10 dolara za milion tokenów wejściowych i 0,40 za wyjściowe. Autorzy uczciwie wskazują braki: próbka to dziesięć pytań na poziom, nie oceniali poprawności odpowiedzi, a prędkości pochodzą z różnych źródeł, więc nie podają dokładnego mnożnika.

**Key takeaways:**
- Mediana czasu odpowiedzi jest kilka razy krótsza, ale średnia przy trudnych pytaniach jest podobna lub gorsza.
- Szybkość zależy od dekodowania spekulatywnego i własnego silnika, a nie tylko od modelu.
- Bez trybu myślenia model słabo radzi sobie z większymi aplikacjami.

**Why do I care:** Jeśli zależy ci na szybkiej iteracji, na przykład przy generowaniu komponentów w pętli, ten model jest wart próby. Przy zadaniach wymagających dłuższego rozumowania koszt tokenów i czas mogą jednak zjeść przewagę. Sam pomiar własnych zadań da ci więcej niż tabela z cudzymi.

**Link:** [NaiveAI Promises 2,100 Tokens per Second. How Well Does It Code?](https://www.latent.space/)
