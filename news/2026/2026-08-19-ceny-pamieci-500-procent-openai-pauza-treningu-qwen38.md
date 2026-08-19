---
title: "Ceny pamięci RAM wzrosły o 500 procent w rok, a OpenAI wstrzymuje trening frontier ze względów bezpieczeństwa"
excerpt: "AINews opisuje RAMageddon, w którym hyperscalerzy zablokowali sobie z góry produkcję DRAM na 2027 rok, pauzę OpenAI w treningu RL dla wzmocnienia monitoringu, oraz Qwen3.8-27B jako nowy punkt odniesienia dla lokalnych modeli."
publishedAt: "2026-08-19"
slug: "ceny-pamieci-500-procent-openai-pauza-treningu-qwen38"
hashtags: "#ainews #ai #llm #hardware #agents #generated #pl"
source_pattern: "AINews"
---

## Ceny pamięci RAM wzrosły o 500 procent w rok, a hyperscalerzy zablokowali produkcję DRAM na 2027

**TLDR:** Ceny pamięci komputerowej odwróciły dwudziestoletni trend spadkowy, a 128 GB kity DDR5 kosztują dziś dziesięć razy więcej niż przy najniższej cenie, jaką kiedykolwiek widziano. Sytuacja jest na tyle poważna, że wielcy odbiorcy hyperscale zarezerwowali sobie z góry niemal całą globalną moc produkcyjną DRAM na 2027 rok, wpłacając zaliczki, żeby zagwarantować dostawy.

**Summary:** Nazwa "RAMageddon" (albo "RAMpocalypse") może brzmieć żartobliwie, ale liczby za nią stojące nie są śmieszne. Mainstreamowe chipy DRAM są dziś warte, licząc na kilogram, ponad połowę tego, co złoto, co czyni pamięć jedną z najcenniejszych materialnie substancji na świecie, mimo że nikt nie traktował jej wcześniej jako aktywa o takiej wartości. Cytowany komentarz zauważa, że na jednostkę pamięć RAM jest dziś tak droga, jak była w 2007 roku, co według dostępnych danych jest historyczną anomalią bez wyraźnego precedensu, przynajmniej odkąd ktokolwiek zaczął systematycznie śledzić te ceny.

Ten kryzys pamięci dzieje się w tle innych wydarzeń: Cerebras ogłasza CS-4 obsługujący modele 10 bilionów parametrów przy 1000 tokenów na sekundę, Etched staje się podwójnym jednorożcem, a Sama kontynuuje coś, co AINews nazywa "Wielkim Tempowaniem". Fakt, że kryzys pamięci trwa nieprzerwanie od podcastu z SemiAnalysis w lutym, mimo tych wszystkich ogłoszeń o coraz szybszym sprzęcie, pokazuje, że wąskim gardłem infrastruktury AI coraz rzadziej jest sam chip obliczeniowy, a coraz częściej surowy dostęp do pamięci.

Osobny, poważniejszy wątek dnia dotyczy OpenAI, które wstrzymało część treningu RL dla modeli frontier na dwa tygodnie i trzyma w zawieszeniu swój największy planowany run, żeby wzmocnić monitoring, izolację workloadów i red-teaming. Sam Altman ujął to jako sytuację, w której zdolności modelu wyprzedziły gotowość zabezpieczeń, a Greg Brockman podkreślił, że pewność co do bezpieczeństwa będzie coraz bardziej dyktować tempo skalowania frontier, nie odwrotnie. Konkretne detale są tu bardziej wymowne niż samo ogłoszenie: monitoring dodaje około 20 procent narzutu, a monitorowanie na poziomie próbkowanych tokenów potrafi zaalarmować zespoły bezpieczeństwa w ciągu około 30 minut. To publiczne przyznanie, że infrastruktura ewaluacji i treningu, a nie sam surowy compute, jest dziś wąskim gardłem postępu na froncie.

Na froncie modeli otwartych Qwen3.8-27B stał się punktem odniesienia dla lokalnie uruchamianych modeli, osiągając pozycję numer jeden wśród lokalnych modeli w Cline w cztery dni i wysokie miejsca w kilku niezależnych benchmarkach agentowych. Krytyka jest równie głośna: wygrane w benchmarkach są przesadzone względem realnego użycia Opusa 4.5 w codziennym kodowaniu, co pokazuje rosnącą przepaść między wynikami testów a jakościową niezawodnością przy długich zadaniach. Niepokojący wątek dnia to build tego samego modelu z usuniętymi odmowami, działający lokalnie na Apple Silicon w kilku wariantach kwantyzacji przy niemal zerowej liczbie odmów, co jest konkretnym dowodem, że użyteczne, lokalnie wdrażalne modele z ograniczoną cenzurą przestają być hipotetyczne.

**Key takeaways:**
- 128 GB kity DDR5 kosztują dziesięć razy więcej niż przy historycznie najniższej cenie, a DRAM jest droższy na kilogram niż połowa ceny złota
- Hyperscalerzy zarezerwowali sobie niemal całą globalną produkcję DRAM na 2027 rok zaliczkami
- OpenAI wstrzymało część treningu RL frontier na dwa tygodnie, żeby wzmocnić monitoring i red-teaming, kosztem około 20 procent narzutu
- Qwen3.8-27B staje się punktem odniesienia dla lokalnych modeli, ale krytycy wskazują na przesadzone wyniki benchmarków wobec realnego użycia

**Why do I care:** Kryzys pamięci ma bezpośrednie przełożenie na koszty każdej firmy budującej infrastrukturę pod modele lokalne albo self-hosted, więc to dobry moment, żeby zweryfikować budżety sprzętowe na kolejny rok, zanim ceny pójdą jeszcze wyżej. Pauza OpenAI jest ciekawsza z innego powodu: to rzadkie, konkretne przyznanie ze strony dużego labu, że tempo dowozu nowych modeli jest dziś ograniczane przez infrastrukturę bezpieczeństwa, a nie wyłącznie przez surowe możliwości modelu, co warto zapamiętać przy każdej kolejnej debacie o tym, "kto wygrywa wyścig AI".

**Link:** [[AINews] Memory prices up 500% in 12 months](https://www.latent.space/p/ainews-memory-prices-up-500-in-12)
