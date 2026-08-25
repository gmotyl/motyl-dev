---
title: "Kilo wprowadza polityki AI per sub-org: jedno konto, różne zasady dla różnych zespołów"
excerpt: "Kilo pozwala teraz administratorom tworzyć sub-organizacje z osobnymi regułami doboru modeli, regionami inferencji i budżetem, przy zachowaniu wspólnego zarządzania i rozliczeń na poziomie całej firmy."
publishedAt: "2026-08-25"
slug: "kilo-sub-org-ai-policy-model-routing"
hashtags: "#kilo #ai #llm #devtools #architecture #generated #pl"
source_pattern: "Kilo"
---

## Jedna polityka AI nie pasuje do całej firmy, więc Kilo dzieli konto na sub-organizacje

**TLDR:** Kilo wprowadził sub-organizacje: administrator jednym kliknięciem tworzy jednostkę z własnymi regułami doboru modeli, regionem inferencji i budżetem, przy czym zarządzanie użytkownikami i rozliczenia zostają scentralizowane na poziomie głównej organizacji.

**Summary:** Problem, który Kilo opisuje, jest znajomy każdemu, kto próbował ustawić jedną politykę bezpieczeństwa AI dla firmy złożonej z kilku zespołów o różnym apetycie na ryzyko. Ustawienie reguł wystarczająco surowych dla najbardziej regulowanej jednostki oznacza, że reszta firmy pracuje pod niepotrzebnymi ograniczeniami. Ustawienie reguł wystarczająco luźnych dla najszybszego zespołu oznacza, że to właśnie tam zacznie się kolejny incydent bezpieczeństwa. Sub-organizacje rozwiązują to przez rozdzielenie dwóch warstw: governance i budżet zostają na górze, a wybór modeli i narzędzi trafia do zespołu, który faktycznie wykonuje pracę.

Techniczna elastyczność jest tu interesująca: sub-org może korzystać ze wspólnej bramki Kilo, podłączyć własne klucze bezpośrednio do Anthropic, OpenAI, Google czy Azure, albo zostać całkowicie lokalnym z Ollamą lub Anaconda Desktop, bez utraty centralnego przeglądu użytkowników i uprawnień. Praktyczny przykład z artykułu dobrze to ilustruje: jedna spółka zależna musi trzymać dane w Europie, więc jej sub-org zostaje zablokowany do europejskich opcji inferencji, podczas gdy reszta firmy zachowuje pełny katalog modeli na bramce Kilo. Auto Efficient, funkcja routująca zadania kodowania do najtańszego modelu radzącego sobie z danym zadaniem, nadal działa wewnątrz puli modeli dozwolonej dla konkretnego sub-orga, więc zawężenie polityki nie oznacza utraty optymalizacji kosztowej.

**Key takeaways:**
- Sub-organizacje tworzy się jednym kliknięciem, z osobnym właścicielem, regułami modeli i regionem inferencji.
- Governance i budżet zostają scentralizowane; wybór modeli, providerów i regionu ustawia się per sub-org, z możliwością nadpisania domyślnej polityki firmy.
- Finansowanie sub-orga (saldo elastyczne, alokacja Kilo Pass, lub oba) nie omija ustawionych dla niego ograniczeń modeli.
- Auto Efficient nadal szuka najtańszej opcji, ale tylko w puli modeli dozwolonej dla danego sub-orga.

**Why do I care:** Ten problem trafiał mi się w praktyce częściej, niż bym chciał: firma z kilkoma zespołami inżynierskimi o różnym profilu ryzyka próbuje wymusić jedną politykę AI z centrali, co kończy się albo obchodzeniem zasad przez najszybszy zespół, albo frustracją zespołów pracujących pod niepotrzebnie ciasnymi ograniczeniami. Rozdzielenie warstwy governance od warstwy wykonawczej to wzorzec architektoniczny, który znamy skądinąd (multi-tenant systemy uprawnień), więc dobrze widzieć go zaaplikowanego konkretnie do polityki modeli AI, gdzie stawka (dane, koszty, zgodność regulacyjna) jest wysoka, a większość narzędzi na rynku wciąż traktuje firmę jako jeden monolityczny zestaw ustawień.

**Link:** [One AI policy doesn't fit your whole company. Now it doesn't have to.](https://blog.kilo.ai/p/one-ai-policy-doesnt-fit-your-whole-org)
