---
title: "AI tworzy miejsca pracy, ale rachunek za compute zbliża się nieubłaganie"
excerpt: "Dane pokazują, że firmy intensywnie korzystające z AI zwiększają zatrudnienie, a nie je redukują. Ale hiperskalerzy stracili 90% cash flow w 18 miesięcy, co wkrótce przełoży się na wyższe ceny dla wszystkich."
publishedAt: "2026-07-07"
slug: "2026-07-07-ai-tworzy-prace-rachunek-compute-hiperskaler"
hashtags: "#kilo #ai #llm #engineering #architecture #generated #pl"
source_pattern: "Kilo"
---

## AI tworzy miejsca pracy, wbrew temu co piszą nagłówki

**TLDR:** Badanie 21 tysięcy firm w USA pokazuje, że te, które zainwestowały najwięcej w AI, zwiększyły zatrudnienie o 10% w ciągu dwóch lat, a nie je ograniczyły. Jednocześnie pięciu hiperskalerów finansujących tę rewolucję zanotowało 90-procentowy spadek forward free cash flow w 18 miesięcy.

Dane zaskakują. Ramp i Revelio Labs połączyły dane o wydatkach z rejestrami pracowniczymi dla 21 559 firm w USA i odkryły, że firmy z największymi inwestycjami w AI zwiększyły zatrudnienie o 10% w ciągu dwóch lat po adopcji. Zatrudnienie na stanowiskach entry-level rosło jeszcze szybciej, o 12%. Firmy, które przyjęły AI tylko marginalnie, nie zanotowały żadnej istotnej zmiany w żadnym kierunku.

Mechanizm jest prosty. Firma, która może obsłużyć więcej klientów, bo AI przejęła account research, zatrudnia więcej sprzedawców do zamykania tych kontraktów. Zespół, który może dostarczać więcej oprogramowania, bierze na siebie większe projekty i potrzebuje więcej inżynierów do ich obsługi. AI rozszerza to, co firmy wierzą, że są w stanie osiągnąć, a potem rzeczywiście to osiągają.

Box przeprowadził osobne badanie 1640 firm i doszedł do podobnego wniosku. 58% respondentów spodziewa się wzrostu zatrudnienia w ciągu trzech lat. Wśród firm najdojrzalszych pod kątem adopcji AI, ten odsetek wynosi 79%. Tylko 9% mówi, że agenty AI dziś przede wszystkim eliminują role.

**Key takeaways:**
- Firmy z największymi inwestycjami w AI zwiększyły zatrudnienie o 10% w ciągu dwóch lat
- AI skaluje ambicje firm, a nie redukuje potrzebę ludzkiego wykonania tych ambicji
- Zatrudnienie entry-level rośnie szybciej (12%) niż średnia, co przeczy narracji o automatyzacji niższych szczebli

**Why do I care:** Dane te są ważne dla planowania kariery i architektury team'ów. Jeśli AI faktycznie zwiększa produktywność, ale firmy rozszerzają zakres projektów zamiast redukować zatrudnienie, to developer, który efektywnie używa AI, staje się bardziej wartościowy, a nie mniej potrzebny. Warto to uwzględniać przy rozmowach o ścieżkach kariery i strategii rekrutacji.

**Link:** [AI creates jobs. The compute bill is not your problem (yet).](https://blog.kilo.ai/p/ai-creates-jobs-compute-bill?publication_id=4363009&post_id=204925812&isFreemail=true&triedRedirect=true)

## Hiperskalerzy tracą cash flow, Ty zapłacisz rachunek

**TLDR:** Microsoft, Amazon, Alphabet, Meta i Oracle razem zanotowały spadek forward free cash flow z około 300 miliardów dolarów pod koniec 2024 roku do około 40 miliardów dziś. Ten nacisk musi gdzieś trafić, a jednym z naturalnych mechanizmów jest zmiana modeli cenowych.

Apollo's chief economist śledzi twelve-month forward free cash flow dla pięciu firm finansujących większość infrastruktury AI. Liczba ta osiągnęła szczyt bliski 300 miliardów dolarów pod koniec 2024 i od tego czasu spadła do mniej więcej 40 miliardów. Większość tego spadku nastąpiła w zaledwie kilku ostatnich miesiącach.

GitHub pokazał, jak ten nacisk cenowy wygląda w praktyce. Copilot przeszedł z modelu seat-based na usage-based billing. Nagle liderzy inżynierscy przestali płacić stały koszt na developera i zaczęli dostawać rachunki, gdzie pojedynczy programista mógł kosztować od dziesiątek do tysięcy dolarów miesięcznie w zależności od intensywności użycia.

Historyczna analogia jest niepokojąca. Koleje żelazne w XIX wieku i światłowody pod koniec lat 90. działały na tej samej logice: masowe inwestycje teraz, nieproporcjonalne zwroty później. W obu przypadkach technologia sprawdziła się doskonale. Ale kto uchwycił wartość? Nie zawsze budowniczy infrastruktury.

Coinbase pokazało inną drogę: obcięło wydatki na AI prawie o połowę przy jednoczesnym wzroście zużycia tokenów. Sekret to routing między modelami i dostawcami, kierowanie każdego zadania do modelu, który najlepiej do niego pasuje, a nie do jednego flagowego modelu premium.

**Key takeaways:**
- Hiperskalerzy stracili 90% forward free cash flow w 18 miesięcy przy rekordowych inwestycjach w compute
- GitHub Copilot przeszedł na usage-based, co dla niektórych team'ów oznacza rachunki z dziesiątek do tysięcy dolarów
- Coinbase obciął wydatki na AI prawie o połowę przy rosnącym zużyciu tokenów przez routing multi-model

**Why do I care:** Jeśli Twoje plany techniczne zakładają, że dzisiejsze ceny modeli, dostępność i warunki vendorów po prostu się utrzymają, budujesz na cienkim lodzie. Nie możesz przewidzieć kto uchwyt wartość, ale możesz zadbać, żeby Twoje systemy nie były przykute do jednego dostawcy. Abstrakcja nad wywołaniami LLM i routing między modelami to dziś inwestycja w odporność, nie overengineering.

**Link:** [AI creates jobs. The compute bill is not your problem (yet).](https://blog.kilo.ai/p/ai-creates-jobs-compute-bill?publication_id=4363009&post_id=204925812&isFreemail=true&triedRedirect=true)
