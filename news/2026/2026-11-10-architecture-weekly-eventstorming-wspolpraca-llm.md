---
title: "Architecture Weekly: EventStorming, współpraca i LLM-y, czyli jak to skleić"
excerpt: "Oskar Dudycz argumentuje, że LLM-y nie zastępują warsztatów modelowania, i pokazuje wtyczkę do Miro, która deterministycznie eksportuje diagramy EventStorming do ESML i szkieletu kodu."
publishedAt: "2026-11-10"
slug: "architecture-weekly-eventstorming-wspolpraca-llm"
hashtags: "#oskardudycz #architecture #ai #agents #eventstorming #llm #generated #pl"
source_pattern: "OskarDudycz"
---

## EventStorming, współpraca i LLM-y

**TLDR:** Autor twierdzi, że rozmowa z modelem to nie współpraca, tylko siedzenie we własnej głowie. Proponuje zostawić warsztaty z ludźmi i przerzucić na agenta tę część, która jest powtarzalna, czyli przejście od modelu zdarzeń do projektu technicznego.

**Summary:** Punkt wyjścia jest zgrabny. Przez lata mówiono, że najlepszy zdalny EventStorming to bilet na samolot, potem przyszła pandemia, a teraz LLM-y, i zamiast unikać współpracy zdalnej, próbujemy unikać współpracy z ludźmi w ogóle. Dudycz przypomina, że różnorodność perspektyw i pętla zwrotna dają lepsze rozwiązania niż samotne myślenie, nawet bardzo mądre, które kończy w lokalnym maksimum. Współpraca jest męcząca, wymaga synchronizacji i facylitacji, ale dostarcza narzędzi do rozstrzygania sporów, których agent nie da.

Druga część tekstu dotyczy luki między modelem procesu a modelem technicznym. Zespoły potrafią narysować sensowny diagram, a potem na pytanie "i co dalej" patrzą pusto, bo model nie jest celem. EventStorming ma tu zaletę, bo jest semantyczny i powtarzalny. Command handler przyjmuje komendę i zwraca zdarzenie, event handler reaguje na zdarzenie, read model buduje się ze zdarzeń. Takie archetypy łatwo składać, i właśnie na tej powtarzalności dobrze pracują agenci jako maszyny do dopasowywania wzorców.

Problem polega na tym, że Miro i Excalidraw widzą tylko kolorowe prostokąty. Autor próbował eksportu obrazu i JSON-a do LLM-a, co działało w połowie i zjadało tokeny. Zbudował więc wtyczkę do Miro, która eksportuje tablicę deterministycznie, na podstawie położenia i koloru prostokątów, do formatu ESML, czyli YAML-a, oraz generuje struktury kodu. Wynik można dać agentowi z prośbą o uzupełnienie luk. Wtyczka jest darmowa i autor sam nazywa ją pierwszym krokiem. Dalej rozważa serwer MCP podłączony do Miro, który znałby notację i pomagał moderować Example Mapping albo wyciągał zarys z transkrypcji.

Czego tu brakuje? Autor nie mówi, jak wtyczka radzi sobie z tablicą, na której ludzie nie trzymają się kolorów, a na prawdziwych warsztatach to norma. Heurystyka oparta na kolorach i pozycji jest krucha dokładnie tam, gdzie warsztat jest chaotyczny.

**Key takeaways:**
- Rozmowa z LLM-em nie zastępuje konfrontacji perspektyw ludzi.
- Archetypy EventStorming dają powtarzalny język, który agenci dobrze wykorzystują.
- Deterministyczny eksport tablicy do ESML oszczędza tokeny i daje przewidywalny wynik.

**Why do I care:** Jako konsultant widzę tu rozsądny podział. Ludzie decydują i się spierają, a agent robi nudne przejście od diagramu do szkieletu. Warto wypróbować wtyczkę na własnej tablicy, zanim uwierzysz, że to działa poza przykładami autora.

**Link:** [On EventStorming, collaboration, LLMs and how to glue that](https://www.architecture-weekly.com/p/on-eventstorming-collaboration-llms)
