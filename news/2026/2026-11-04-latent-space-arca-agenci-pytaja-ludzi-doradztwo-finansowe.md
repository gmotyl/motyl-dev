---
title: "Arca: agenci bardziej podpowiadają ludziom niż ludzie agentom w doradztwie finansowym"
excerpt: "Szef AI w Arca opowiada o agentach pracujących do dziesięciu dni, własnym harnessie i deterministycznych zabezpieczeniach, które odbierają agentowi decyzje o pieniądzach."
publishedAt: "2026-11-04"
slug: "latent-space-arca-agenci-pytaja-ludzi-doradztwo-finansowe"
hashtags: "#latent #ai #agents #security #architecture #llm #generated #pl"
source_pattern: "Latent Space"
---

## Arca i agenci do długich zadań finansowych

**TLDR:** Arca, firma zarządzająca majątkiem zbudowana wokół AI, daje agentom analizę i propozycje, a decyzje i przepływ pieniędzy zostawia doradcom. Zadania agentów trwają nawet dziesięć dni.

**Summary:** Aman Singh, lead AI engineer w Arca, mówił na AI Engineer w Nowym Jorku, że agenci wykonują większość pracy w tle, ale ostatnie słowo ma doradca. Firma zebrała 48,5 miliona dolarów w rundzie prowadzonej przez General Catalyst. Zadania finansowe są długie, choć nie długo trwające. Jest dużo przerw, uczestników i przekazań, więc Arca zbudowała wewnętrzny system pamięci dla każdego klienta. Zapisuje, co się wydarzyło, co jest śledzone, co trzeba zrobić w ciągu kilku dni i kto za co odpowiada.

Głównym dostawcą modeli jest Claude, ale firma ma własny harness, który wybiera model do zadania na podstawie wewnętrznych benchmarków. Singh podaje też powód, dla którego go nie wynajmuje. Własna infrastruktura pozwala zmienić dostawcę, gdy trzeba.

Zabezpieczenia są w całości deterministyczne i odbierają agentowi decyzje o ryzyku. Handel i ruchy pieniędzy robi człowiek. Agent nie siedzi w piaskownicy, ale obliczenia tak, a kod z piaskownicy jest tłumaczony na ścisły format, kod jest wyrzucany, a na formacie działają zabezpieczenia przed dotarciem do backendu. Opinie doradców i ślady agentów trafiają do meta-agenta, który proponuje zmiany w harnessie.

**Key takeaways:**
- Agent proponuje i analizuje, człowiek wykonuje transakcje.
- Zabezpieczenia są deterministyczne, a kod agenta jest tłumaczony na ścisły format.
- Meta-agent analizuje opinie doradców i ślady, żeby poprawiać harness.

**Why do I care:** Wzorzec z tłumaczeniem kodu na format kontrolowany jest ciekawy i warto go znać. Zadajmy jednak pytanie, którego rozmowa nie rusza. Kto odpowiada, gdy doradca odruchowo klika zgodę na propozycje agenta, bo agent prosi o to dziesiąty raz w tygodniu.

**Link:** [Using Agents for Long-Horizon Financial Work, Aman Singh, Arca](https://www.latent.space/)
