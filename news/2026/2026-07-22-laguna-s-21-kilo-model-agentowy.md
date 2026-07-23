---
title: "Laguna S 2.1 w Kilo: model do długich zadań bez nadzoru"
excerpt: "Poolside wypuściło Laguna S 2.1, model 118B z aktywacją zaledwie 8B parametrów na token, który jest już dostępny w Kilo i potrafi pracować autonomicznie nawet przez 24 godziny."
publishedAt: "2026-07-21"
slug: "laguna-s-21-kilo-model-agentowy"
hashtags: "#kilo #llm #ai #poolside #agenci #generated #pl"
source_pattern: "Kilo"
---

## Laguna S 2.1 trafia do Kilo i chce pracować za ciebie przez dobę

**TLDR:** Poolside wypuściło Laguna S 2.1, model o rozmiarze 118B parametrów, który aktywuje tylko 8B na każdy token, co pozwala mu działać lokalnie na jednej karcie NVIDIA DGX Spark. Na benchmarkach SWE-bench Multilingual osiąga 78,5%, stając w szranki z modelami wielokrotnie większymi. W Kilo jest dostępny natychmiast i bezpłatnie przez ograniczony czas.

Kiedy firma Poolside ogłosiła swój nowy model, pierwszą rzeczą, na którą zwróciłem uwagę, były liczby: 118B parametrów, ale tylko 8B aktywnych przy każdym tokenie. To architektura MoE (Mixture of Experts) w praktycznym wydaniu, czyli duże możliwości przy rozsądnym zużyciu zasobów. Na SWE-bench Multilingual Laguna S 2.1 uzyskuje 78,5%, co plasuje go obok Tencent Hy3 (295B-A21B) i DeepSeek-V4-Pro Max (1,6T-A49B). Biorąc pod uwagę różnicę w aktywnych parametrach, to wynik, który trzeba traktować poważnie. Na Toolathlon Verified model bije Nemotron 3 Ultra oraz DeepSeek-V4-Flash Max z wynikiem 49,7%.

Ale benchmarki to jedna strona medalu. To, co naprawdę wyróżnia Laguna S 2.1, to jego zachowanie w warunkach długich, autonomicznych zadań. Poolside opisuje przypadki, w których model pracował nieprzerwanie nawet przez 24 godziny, używając narzędzi, sprawdzając własną pracę i próbując alternatywnych podejść po napotkaniu błędów. To nie jest model, który zatrzymuje się przy pierwszej przeszkodzie i czeka na instrukje. Zbudował kompletny silnik renderowania HTML i CSS w 181 turach rozumowania, porównując piksel po pikselu swój output z prawdziwą przeglądarką, aż osiągnął dokładność na poziomie 3 pikseli od wzorca.

Jeden z przykładów z wewnętrznych testów Poolside przykuwa szczególną uwagę: w odizolowanym środowisku bez dostępu do internetu model samodzielnie odkrył znane rozwiązanie problemu Erdősa nr 397. Gdy Python okazał się niedostępny, przestawił się na Perl i wyprowadził własną rodzinę parametrycznych rozwiązań. To nie jest skrypt demonstracyjny, to model, który po prostu dostał zadanie i zaczął pracować. Przez noc ulepszał też wyniki DeepMind AlphaEvolve w problemie pakowania kół, nie zatrzymując się po pierwszej poprawie.

W Kilo dostępność Laguna S 2.1 ma praktyczne znaczenie, ponieważ platforma opiera się na otwartym modelu cenowym: płacisz dokładnie tyle, ile Poolside pobiera za token, bez narzutów za plan czy integrację. Dla modelu zoptymalizowanego pod długie, agentowe zadania to istotne. KiloClaw może pracować w tle bez nadzoru, Cloud Agents i Parallel Agents pozwalają oddelegować ciężkie obliczenia, a niski koszt aktywnych parametrów sprawia, że długie przebiegi nie rujnują budżetu.

**Key takeaways:**
- Laguna S 2.1 to 118B model z zaledwie 8B aktywnymi parametrami na token, dzięki czemu można go uruchomić lokalnie na jednej NVIDIA DGX Spark
- Na SWE-bench Multilingual osiąga 78,5%, konkurując z modelami wielokrotnie większymi
- Model udokumentowanie potrafi pracować autonomicznie do 24 godzin, odzyskiwać się po błędach i próbować alternatywnych rozwiązań bez ingerencji człowieka
- W Kilo jest dostępny od razu w rozszerzeniu IDE, CLI i Cloud Agents z otwartym, przejrzystym cennikiem

**Why do I care:** Z perspektywy architekta frontendowego i osoby pracującej z agentami AI od dłuższego czasu, Laguna S 2.1 jest interesujący z jednego konkretnego powodu: długi horyzont bez babysittingu. Większość modeli, które testowałem, wymaga regularnego pchania naprzód, poprawiania kursu, przypominania kontekstu. Model, który buduje renderer HTML w 181 turach i sam weryfikuje output piksel po pikselu, to zupełnie inna kategoria przydatności w realnych projektach. Jeśli Poolside nie przesadza w swoich opisach, to właśnie ten typ autonomii zmieni sposób, w jaki będziemy rozdzielać zadania między developerów a modele.

**Link:** [Laguna S 2.1 is live on Kilo](https://blog.kilo.ai/p/laguna-s-21?publication_id=4363009&post_id=207936320&isFreemail=true&triedRedirect=true)
