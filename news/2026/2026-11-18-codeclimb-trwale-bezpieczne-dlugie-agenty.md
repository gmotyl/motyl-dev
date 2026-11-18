---
title: "CodeClimb: jak zbudować trwałe i bezpieczne agenty pracujące przez całą noc"
excerpt: "Decoding AI pokazuje na przykładzie CodeClimb, jak limity kosztów, proxy z poświadczeniami i silnik trwałości chronią długo działające agenty."
publishedAt: "2026-11-17"
slug: "codeclimb-trwale-bezpieczne-dlugie-agenty"
hashtags: "#decodingai #ai #agents #llm #security #architecture #testing #generated #pl"
source_pattern: "Decoding AI"
---

## Trwałe i bezpieczne długo działające agenty

**TLDR:** Autor zbudował CodeClimb, nocną pętlę wyszukiwania kodu sterowaną ewaluacjami, i pokazuje trzy rzeczy, które agent powinien dostać z zewnątrz: limity kosztów, poświadczenia za proxy i odporność na awarie.

**Summary:** Punkt wyjścia to bolesna historia. W pierwszej wersji autor wpłacił dziesięć dolarów na OpenRouter, nie wiedząc, ile kosztuje przebieg, i po sześciu rundach kredyty się skończyły, a praca przepadła. Około stu inżynierów, których zapytał, miało ten sam problem i chciało limitu wydatków, którego agent nie może obejść, poświadczeń, których nie widzi, i awarii kosztującej jedną rundę, a nie całą noc.

Pętla działa tak: agent kodujący pisze eksperyment, w osobnym sandboxie Dockera drugi agent ocenia go na zbiorze deweloperskim, a na końcu liczone są metryki na zbiorze testowym, żeby wykryć przeuczenie. Jako przykład posłużył GraphRAG zbudowany od zera na dwudziestu dwóch artykułach, podzielonych na 6 treningowych, 8 deweloperskich i 8 testowych. Metryki to F1 dla ekstrakcji encji i relacji, recall scalania i recall oraz MRR dla wyszukiwania. Kod jest oceniany liczbami, a nie testami pisanymi przez samego agenta, a kodowanie jest oddzielone od oceniania, bo agenci potrafią oszukiwać. Eksperyment jest zachowywany tylko wtedy, gdy wynik przewyższa najlepszy punkt o poziom szumu pomiarowego.

Zabezpieczenia siedzą w orkiestratorze napisanym w TypeScripcie, a nie w instrukcjach dla agenta. Noc kończy się, gdy zostaną osiągnięte progi metryk, limit 26 rund, termin 24 godzin, budżet 120 dolarów albo plateau przez dziewięć rund. Pojedynczy eksperyment ma limit 2,50 dolara i 30 minut. Wszystkie wywołania modeli przechodzą przez proxy z pomiarem kosztów, które trzyma prawdziwe klucze i działa jak zapora decydująca, do jakich modeli wolno dotrzeć. Sandbox dostaje tylko jednorazowy token. Do tego dochodzi silnik trwałości Inngest do ponawiania kroków i wznawiania przerwanych przebiegów oraz kanał dla człowieka. Zwycięska noc zużyła większość z 71 dolarów na Opus 5.5, a łącznie eksperymenty kosztowały 168 dolarów u Anthropic i 44 na OpenRouter. Wyniki na teście przekroczyły 0,9 dla recallu scalania, wyszukiwania i MRR, ale F1 ekstrakcji nie dobiło do progów.

**Key takeaways:**
- Limity kosztów i czasu muszą żyć poza agentem.
- Proxy z kluczami i listą dozwolonych modeli chroni budżet i sekrety.
- Rozdziel kodowanie i ocenianie, bo agenci oszukują.
- Silnik trwałości zamienia awarię w stratę jednej rundy.

**Why do I care:** To podręcznikowy przykład dyscypliny, którą trzeba mieć przy każdym agencie z dostępem do płatnego API. Podejście z metrykami zamiast przeglądu 23 tysięcy linii diffa jest rozsądne tylko tam, gdzie da się zmierzyć jakość, a w typowym frontendzie często się nie da. Autor ma też luki: gold dataset sam przyznaje, że wymaga poprawek, a koszt rzędu setek dolarów za jeden udany eksperyment nie wszędzie się obroni.

**Link:** [Build Durable, Secure Long-Running Agents](https://www.decodingai.com/p/build-durable-secure-long-running-agents)
