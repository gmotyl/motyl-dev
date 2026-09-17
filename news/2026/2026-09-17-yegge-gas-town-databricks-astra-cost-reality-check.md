---
title: "Reality check na AI: Yegge zamyka Gas Town, a Astra podnosi koszty kodowania w Databricks o 60%"
excerpt: "AINews: twórca jednego z najgłośniejszych orkiestratorów agentów przyznaje, że nigdy nic nim nie zbudował, a Databricks pokazuje, że lepszy model wcale nie znaczy tańsze kodowanie."
publishedAt: "2026-09-17"
slug: "yegge-gas-town-databricks-astra-cost-reality-check"
hashtags: "#ainews #ai #agents #llm #generated #pl"
source_pattern: "AINews"
---

## Steve Yegge zamyka Gas Town i przyznaje, że nigdy nic nim nie zbudował

**TLDR:** Steve Yegge, głośny i entuzjastyczny promotor maksymalnego zużycia tokenów w kodowaniu agentowym, zamknął swój projekt Gas Town i przyznał, że mimo wydawania tysięcy dolarów miesięcznie na subskrypcje agentów kodujących, jedyną rzeczą, jaką kiedykolwiek zbudował tym narzędziem, był sam Gas Town.

**Summary:** Gas Town było jednym z najbardziej rozpoznawalnych orkiestratorów agentów kodujących, więc przyznanie się jego twórcy, że nigdy nie udało mu się nim niczego realnie dostarczyć, odbiło się szerokim echem. Dan Luu, autor wcześniejszego eseju o niezawodności "ultra-vibed" orkiestratorów, zauważył, że dokładnie to samo zjawisko opisywał wcześniej z zewnątrz: te narzędzia zawodzą nie na etapie generowania kodu, tylko na etapie faktycznego kończenia zadań w sposób, któremu można zaufać. To, że problem potwierdza sam twórca najgłośniejszego przykładu tej kategorii narzędzi, zamienia wcześniejszą krytykę z zewnętrznej opinii w coś bliższego oficjalnemu podsumowaniu.

**Key takeaways:**
- Twórca Gas Town, jednego z najgłośniejszych orkiestratorów wieloagentowych, przyznaje, że narzędziem nigdy nic realnie nie zbudował, mimo tysięcy dolarów miesięcznie na subskrypcje
- Problem dotyczy niezawodności dokańczania zadań, nie samej jakości generowanego kodu
- Zewnętrzna krytyka "ultra-vibed" orkiestratorów (Dan Luu) potwierdza się od strony twórcy najbardziej znanego przykładu tej kategorii

**Why do I care:** To ważny kontrapunkt do fali entuzjazmu wokół złożonych, wieloagentowych systemów orkiestracji: jeśli nie działa to u autora najgłośniejszego takiego narzędzia, warto z dużą rezerwą podchodzić do obietnic podobnych frameworków we własnym zespole. Prostsze, węziej zakresowe użycie agentów wciąż wygrywa z ambitnymi orkiestratorami, dopóki problem niezawodności kończenia zadań nie zostanie realnie rozwiązany.

**Link:** [AINews: Reality Checks on AI News](https://www.latent.space/p/ainews-reality-checks-on-ai-news?publication_id=1084089&post_id=216098341&isFreemail=true&triedRedirect=true)

## Databricks wdrożył GPT-6 Astrę dla 3500 inżynierów: lepsze wyniki, ale wydatki na kodowanie wyższe o 60%

**TLDR:** Databricks udostępnił GPT-6 Astrę wszystkim swoim inżynierom (około 3500 osób) po wcześniejszym pilotażu na 200 użytkownikach. Model jednoznacznie wygrywa z poprzednimi topowymi modelami przy złożonych zadaniach projektowych, ale całkowite wydatki na kodowanie wzrosły o około 60 procent, co zmusiło firmę do wydzielenia osobnego budżetu na Astrę.

**Summary:** Patrick Wendell z Databricks opisał to jako wyraźny kontrast: Astra bezapelacyjnie przewyższa Opus 5 i Sol 5.6 przy zadaniach wysokiego poziomu, jak projektowanie architektury systemu i zadania długoterminowe, ale niekoniecznie poprawia wyniki przy zadaniach kodowania średniej i niskiej złożoności. Mimo to sam dostęp do lepszego modelu podniósł całkowite wydatki na kodowanie o 60 procent, więc firma stworzyła dedykowany subbudżet na Astrę, żeby zachęcić do selektywnego, świadomego użycia zamiast domyślnego sięgania po najdroższy model do każdego zadania. To potwierdzają też inne benchmarki z tego samego okresu: Astra prowadzi w ogólnym indeksie możliwości Epoch, ale kosztuje wyraźnie więcej za zadanie niż tańsze alternatywy, podczas gdy Claude Fable 5.1 pozostaje najsilniejszy akurat w inżynierii oprogramowania.

**Key takeaways:**
- Astra "bezapelacyjnie" wygrywa z Opus 5 i Sol 5.6 przy złożonych zadaniach projektowych i długoterminowych, ale niekoniecznie przy prostszym kodowaniu
- Sam dostęp do lepszego modelu podniósł całkowite wydatki Databricks na kodowanie o ~60%, mimo lepszej wydajności per zadanie
- Databricks stworzył osobny subbudżet na Astrę, żeby wymusić selektywne użycie najdroższego modelu tylko tam, gdzie realnie się opłaca

**Why do I care:** To konkretny, policzalny dowód na to, że "lepszy model" i "tańsze developerstwo" to dwie różne osie, które łatwo pomylić. Zanim zespół włączy najdroższy dostępny model wszystkim domyślnie, warto rozważyć rozwiązanie podobne do Databricks: osobny budżet lub politykę routingu, która kieruje proste zadania do tańszych modeli, a Astrę rezerwuje dla realnie złożonych problemów architektonicznych.

**Link:** [AINews: Reality Checks on AI News](https://www.latent.space/p/ainews-reality-checks-on-ai-news?publication_id=1084089&post_id=216098341&isFreemail=true&triedRedirect=true)
