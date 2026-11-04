---
title: "Technology Radar Vol. 35 i teza Thoughtworks, że harness agenta jest produktem"
excerpt: "117 blipów w nowym Radarze i krótki tekst o tym, dlaczego harness agenta potrzebuje strategii testowej, właściciela i zasady, że bez ewaluacji nie ma zmiany."
publishedAt: "2026-11-04"
slug: "technology-radar-vol-35-harness-jako-produkt"
hashtags: "#techradar #ai #agents #architecture #testing #engineering #generated #pl"
source_pattern: "techradar"
---

## Technology Radar Vol. 35

**TLDR:** Thoughtworks wydało 35. edycję Radaru z 117 blipami i czterema tematami. Towarzyszy jej tekst, który mówi, że harness agenta trzeba testować i utrzymywać jak produkt.

**Summary:** Sam mail jest krótką zapowiedzią od CTO Rachel Laycock. Tematy edycji to harness engineering na dużą skalę, wyjście poza modele frontier, wprowadzanie większej liczby agentów do pracy oraz budowa fabryki AI. Do tego dochodzą wpis o trendach w branży z listopada, odcinek podcastu i transmisja na LinkedIn 5 listopada. Samych blipów mail nie opisuje, więc nie mam podstaw, by je streszczać.

Konkretniejszy jest tekst The harness is a product, z którego przeczytałem fragment o testowaniu. Autorzy twierdzą, że większość zespołów jest tu niedojrzała. Zachowanie agenta jest niedeterministyczne, zadania się zmieniają, a zestaw testowy reprezentatywny w marcu może wprowadzać w błąd w czerwcu. Dlatego zespoły mierzą to, co tanie, czyli tokeny, zaakceptowane sugestie i zdane testy. To metryki aktywności, mówią, że system jest zajęty, nie że jest lepszy.

Proponują zaczynać od złotego zestawu zadań z prawdziwej pracy, na przykład dwudziestu, trzydziestu zadań z punktacją, wersjonowanego razem z harnessem. Regresję warto puszczać przy każdej istotnej zmianie. Koszt i opóźnienie to metryki pierwszej klasy, bo lepszy wynik za podwójną cenę nie jest poprawą. Zestaw ewaluacyjny potrzebuje właściciela i rytmu przeglądów, inaczej zamienia się w teatr human-in-the-loop, który jest zielony, ale oderwany od doświadczenia klientów.

**Key takeaways:**
- Radar Vol. 35 ma 117 blipów i cztery tematy.
- Tokeny i zaakceptowane sugestie to metryki aktywności, nie jakości.
- Zasada z tekstu brzmi, że bez ewaluacji nie ma zmiany.

**Why do I care:** Zgadzam się z główną myślą i zarazem zauważam, że to dokładnie ta rada, którą dostajemy od roku. Nowością jest dopiero propozycja właściciela zestawu i wersjonowania go razem z harnessem. Dla architekta to argument w rozmowie z zarządem o budżecie na ewaluacje, nie tylko na licencje.

**Link:** [The harness is a product](https://www.thoughtworks.com/insights/blog/generative-ai/harness-is-a-product)
