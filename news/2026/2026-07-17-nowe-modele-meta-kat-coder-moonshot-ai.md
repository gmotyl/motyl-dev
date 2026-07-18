---
title: "Nowe modele od Meta, Kat Coder i Moonshot AI - rynek się nie zatrzymuje"
excerpt: "Trzy nowe modele AI od Meta, KwaiPilot i Moonshot AI zmieniają układ sił w obszarze agentów i długiego kontekstu."
publishedAt: "2026-07-17"
slug: "nowe-modele-meta-kat-coder-moonshot-ai"
hashtags: "#kilo #ai #llm #agents #ml #generated #pl"
source_pattern: "Kilo"
---

## Nowe modele od Meta, Kat Coder i Moonshot AI

**TLDR:** KwaiPilot wypuścił Kat Coder v2.5 z innowacyjnym podejściem do trenowania agentów kodowania, Moonshot AI zaprezentował Kimi K3 z oknem kontekstu na milion tokenów i architekturą roju agentów, a Meta wydała Muse Spark 1.1 - multimodalny model do automatyzacji złożonych przepływów pracy. Wszystkie trzy wyceniają się znacznie poniżej czołówki, co robi wrażenie.

**Summary:**

Kilka dni po premierze GPT-5.6 i powrocie Claude Fable rynek znów się ruszył, tym razem w stronę laboratoriów, które rzadziej pojawiają się w nagłówkach. KwaiPilot, Moonshot AI i Meta wypuścili modele, które warto omówić razem, bo łącznie rysują pewien obraz tego, gdzie zmierza branża.

Zacznijmy od Kat Coder v2.5 - modelu, który mnie najbardziej zaskoczył od strony technicznej. KwaiPilot nie poszło drogą "więcej parametrów = lepszy wynik", tylko skupiło się na tym, jak model rozumuje podczas eksploracji repozytoriów. AutoBuilder Engine potrafi zbudować izolowane, wykonywalne środowisko z prawdziwego repozytorium z GitHub - skuteczność wzrosła z 16.5% do 57.2%, a wynikiem jest ponad sto tysięcy zweryfikowanych środowisk dla dwunastu języków. To solidna liczba. Do tego Process-Aware Trajectory Filtering, czyli trening nie na tym, czy test przeszedł, ale na jakości eksploracji plików i odporności na błędy w trakcie działania agenta. Randomizacja konfiguracji przestrzeni roboczej podczas treningu RL to z kolei sposób na to, żeby model nie był wrażliwy na konkretny układ projektu. Dwa warianty: Pro v2.5 do złożonych zadań repozytoryjnych i Air v2.5 do szybkich, codziennych rzeczy.

Kimi K3 od Moonshot AI to inna liga pod względem skali. Architektura Mixture of Experts z szacowanymi 2-3 bilionami parametrów, okno kontekstu na milion tokenów - cztery razy więcej niż w serii K2 - i Agent Swarm Technology koordynujące do 300 sub-agentów równolegle. Pierwsi testerzy porównują to do momentu DeepSeek R1. Nie wiem, czy tak patetyczne porównanie jest uzasadnione, ale widać, że model robi na ludziach wrażenie. Dostępny już w Kilo, Kimi.com, Kimi Work i przez API.

Meta Muse Spark 1.1 to natywnie multimodalny model z milionem tokenów kontekstu, zbudowany do planowania i wykonywania złożonych przepływów pracy w zewnętrznych aplikacjach. Orkiestracja projektów wieloagentowych, bezpośrednia obsługa interfejsów komputerowych - brzmi jak model do automatyzacji na poziomie systemowym. Dostępny na OpenRouter w cenie $1.25/$4.25 za milion tokenów wejście/wyjście. Dla porównania: Claude Opus 4.8 to $5.00/$25.00, Kimi K3 to $3.00/$15.00, a Kat Coder Pro v2.5 to $0.74/$2.96 i jest darmowy w Kilo przez ten tydzień.

To, co łączy te trzy premiery, to agresywna wycena wobec topowych modeli przy zachowaniu dużych okien kontekstu. Rynek coraz wyraźniej pokazuje, że milion tokenów staje się standardem, a $5 i więcej za milion tokenów to już wyjątek, nie norma.

**Key takeaways:**
- Kat Coder v2.5 wprowadza Process-Aware Trajectory Filtering - model trenowany na jakości rozumowania agenta, nie tylko na wyniku testów
- Kimi K3 to największy model AI z Chin: MoE, 1M tokenów kontekstu, 300 sub-agentów równolegle
- Muse Spark 1.1 od Meta obsługuje złożone przepływy wieloagentowe i interfejsy komputerowe w cenie $1.25 wejście / $4.25 wyjście
- Okno kontekstu na 1M tokenów przestaje być wyróżnikiem - staje się wymogiem przy tej klasie modeli

**Why do I care:** Z perspektywy pracy z kodem to Kat Coder interesuje mnie najbardziej. To, że model jest trenowany na jakości eksploracji repozytorium, a nie tylko na przechodzeniu testów, ma sens w praktyce - agent który umie się zorientować w nieznanym projekcie jest więcej wart niż taki, który przechodzi testy na datasecie z treningu. AutoBuilder z 57% skutecznością budowania środowisk to konkretna liczba, nie marketingowy slogan. Kimi K3 z oknem kontekstu na milion tokenów i architekturą roju agentów brzmi ciekawie do zadań, gdzie chcemy zrównoleglić analizę dużego projektu lub dokumentacji. Muse Spark 1.1 w tej cenie to coś, co warto przetestować do automatyzacji na poziomie systemu operacyjnego - bezpośrednia obsługa interfejsów komputerowych przy $1.25/M tokenów daje sporo miejsca do eksperymentowania bez dużego kosztu.

**Link:** [New Models from Meta, Kat Coder and Moonshot AI](https://blog.kilo.ai/p/new-models-from-meta-kat-coder-and)
