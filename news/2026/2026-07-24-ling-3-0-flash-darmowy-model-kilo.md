---
title: "Ling 3.0 Flash: darmowy model MoE dla agentów kodujących w Kilo"
excerpt: "Kilo udostępnia za darmo Ling 3.0 Flash, nowy model open-weight od inclusionAI zbudowany pod szybkie, autonomiczne agenty programistyczne."
publishedAt: "2026-07-23"
slug: "ling-3-0-flash-darmowy-model-kilo"
hashtags: "#kilo #llm #opensource #moe #agentycoding #generated #pl"
---

## TLDR
Kilo ogłosiło darmowy, czasowo ograniczony dostęp do Ling 3.0 Flash, nowego modelu open-weight od inclusionAI (Ant Group). Model łączy szybkość rodziny Ling z trybem rozumowania zapożyczonym z rodziny Ring, ma 124 miliardy parametrów łącznie, ale aktywuje z nich tylko około 5,1 miliarda na token. Ma też natywne okno kontekstu 256K, rozszerzalne do 1M, co czyni go kandydatem do długich, wieloetapowych zadań agentowych.

## Ling 3.0 Flash bridguje szybkość i rozumowanie w jednym modelu
**TLDR:** Ling 3.0 Flash to nowy model open-weight od inclusionAI, dostępny za darmo w Kilo CLI i wtyczkach IDE. Wykorzystuje architekturę sparse Mixture-of-Experts, dzięki czemu przy 124B parametrów łącznych aktywuje jedynie ułamek tego przy każdym tokenie, zachowując przy tym wysoką jakość i duży kontekst.

**Podsumowanie:** Ogłoszenie Kilo dotyczy modelu, który wpisuje się w trend, jaki obserwuję od dobrych paru miesięcy: branża przestała ścigać się wyłącznie w liczbie parametrów i przesuwa uwagę w stronę architektonicznej efektywności. Ling 3.0 Flash jest tego dobrym przykładem, bo dzięki architekturze sparse MoE oraz hybrydowemu stackowi atencji osiąga wyniki zbliżone do znacznie cięższych modeli dense, a jednocześnie aktywuje przy każdym tokenie zaledwie około 5,1 miliarda z 124 miliardów parametrów. To ten sam kierunek, w którym poszły ostatnio Gemini czy modele StepFun, tyle że tutaj dochodzi jeszcze mocniejszy nacisk na autonomię i podejmowanie kolejnych kroków w wieloturowych zadaniach.

Ciekawa jest też historia rodowodowa modelu. InclusionAI rozwijało dotąd dwie osobne linie: Ling, czyli szybkie modele bazowe nastawione na wysoką przepustowość bez trybu myślenia, oraz Ring, dedykowaną głębokiemu rozumowaniu krok po kroku. Ling 3.0 Flash łączy obie te ścieżki w jednym modelu, oferując hybrydowy tryb rozumowania, który dynamicznie skaluje wysiłek obliczeniowy w zależności od trudności zadania. W praktyce oznacza to, że przy prostym poleceniu model nie marnuje tokenów na zbędne dywagacje, a przy trudniejszym problemie potrafi przejść w tryb głębszej analizy.

Do tego dochodzi natywne okno kontekstu 256K, rozszerzalne do 1M, co przy pracy z całymi repozytoriami czy długimi sesjami agentowymi ma realne znaczenie. Kilo podkreśla, że model jest zoptymalizowany pod niską latencję i wysoką przepustowość, co razem z niskim kosztem inferencji ma umożliwiać uruchamianie produkcyjnych zadań agentowych bez comiesięcznego szoku rachunkowego. Model jest na razie darmowy w ramach promocji, docelowa cena ma być bardzo niska, a wagi modelu nie zostały jeszcze opublikowane, choć inclusionAI zapowiada, że zwykle udostępnia je później na Hugging Face.

Kilo od razu wpina nowość w swój szerszy przekaz o kontroli kosztów: limity użycia, cache promptów i inteligentne routowanie modeli mają pozwolić łączyć tanie modele takie jak Ling 3.0 Flash z cięższymi modelami frontierowymi tam, gdzie to naprawdę potrzebne. To dość typowy dla Kilo sposób prezentowania nowości, czyli nie tylko "mamy nowy model", ale też "oto jak wpasować go w waszą strategię wydatków na AI".

**Kluczowe wnioski:**
- Ling 3.0 Flash ma 124B parametrów łącznych, ale aktywuje tylko około 5,1B na token dzięki architekturze sparse MoE
- Model łączy szybkość rodziny Ling z hybrydowym trybem rozumowania inspirowanym rodziną Ring, skalując wysiłek obliczeniowy do trudności zadania
- Natywny kontekst 256K (rozszerzalny do 1M) wspiera długie, wieloetapowe zadania agentowe i pracę na całych repozytoriach
- Dostęp darmowy w Kilo CLI i IDE jest czasowo ograniczony, a docelowa cena ma być bardzo niska; wagi modelu jeszcze nie zostały opublikowane

**Dlaczego mnie to obchodzi:** Z perspektywy kogoś, kto na co dzień musi liczyć koszty tokenów w projektach klienckich, ten trend w stronę architektonicznej efektywności zamiast gigantomanii parametrycznej jest znacznie ciekawszy niż kolejny rekord liczby parametrów w prasówce. Model, który realnie działa dobrze przy aktywacji ułamka swojej pojemności, to dokładnie to, czego potrzeba do stawiania agentów kodujących na produkcji bez comiesięcznego szoku na fakturze. Sceptyczny jestem natomiast wobec marketingowego zestawienia "łączy najlepsze cechy dwóch rodzin modeli", bo tego typu deklaracje słyszałem już wielokrotnie i zwykle warto poczekać na niezależne benchmarki, a nie tylko na wpis na blogu dostawcy. Brak opublikowanych wag na start też każe patrzeć na tę zapowiedź trochę ostrożniej, dopóki społeczność nie będzie mogła sama zweryfikować, co dokładnie siedzi pod maską.

**Link:** [Announcing Ling 3.0 Flash: Free on Kilo for a Limited Time](https://blog.kilo.ai/p/announcing-ling-30-flash-free-on?publication_id=4363009&post_id=208237857&isFreemail=true&triedRedirect=true)
