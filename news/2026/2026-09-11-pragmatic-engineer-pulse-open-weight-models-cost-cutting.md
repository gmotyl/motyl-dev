---
title: "The Pulse: firmy technologiczne masowo przechodzą na otwarte modele AI, żeby ratować budżety"
excerpt: "Uber obcina koszt sesji AI o 52%, Pinterest płaci mniej niż 8% ceny modeli zamkniętych, a AT&T tnie rachunek za AI o 56% tracąc tylko 2% jakości — wszystko dzięki przejściu na modele open weight."
publishedAt: "2026-09-11"
slug: "pragmatic-engineer-pulse-open-weight-models-cost-cutting"
hashtags: "#pragmaticengineer #ai #llm #architecture #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Firmy technologiczne masowo przechodzą na otwarte modele AI

**TLDR:** Po miesiącach eksperymentowania z cięciem kosztów AI, Uber, Pinterest i AT&T pokazują konkretne liczby: przejście na modele open weight na własnej lub wynajętej infrastrukturze inferencyjnej daje oszczędności rzędu kilkudziesięciu procent przy minimalnym spadku jakości.

**Summary:** Punktem wyjścia jest historia Ubera, który w pierwszym kwartale roku przepalił cały roczny budżet na AI, co skłoniło COO firmy do publicznego pytania, czy da się jeszcze uzasadnić wydatki na narzędzia takie jak Claude Code bez wyraźnych korzyści z najlepszych modeli. Zespoły inżynieryjne wzięły się do roboty i obniżyły koszt pojedynczego zapytania o 34%, a koszt całej sesji AI o 52%, jednocześnie zwiększając ogólne zużycie tokenów, bo koszt utrzymał się na stałym poziomie mimo rosnącego wolumenu. Kluczowym elementem układanki było przejście na modele open weight uruchamiane u dostawców inferencji, znacznie tańszych niż modele frontierowe, w połączeniu z ciągłym benchmarkowaniem na realnej pracy, tańszymi modelami dla subagentów wykonujących mniejsze zadania, domyślnym poziomem wysiłku „medium” zamiast maksymalnego oraz automatyczną kompaktacją kontekstu powyżej 400 tysięcy tokenów.

Pinterest idzie jeszcze dalej: CEO William Ready ujawnił na telekonferencji wynikowej, że po doszkoleniu otwartych modeli na własnych, unikalnych danych firmy w bezpiecznej infrastrukturze chmurowej, osiągają lepszą wydajność niż zamknięte modele firm trzecich, płacąc przy tym mniej niż 8% kosztu porównywalnego modelu zamkniętego. To, co kosztowałoby Pinterest 100 dolarów na modelu frontierowym, kosztuje ich teraz 8 dolarów na doszkolonym modelu otwartym. AT&T, firma zatrudniająca 100 tysięcy osób, obniżyła rachunek za AI o 56%, tracąc przy tym zaledwie 2 punkty procentowe jakości wyników, po wdrożeniu routera modeli LiteLLM kierującego prostsze zadania jak podsumowania kodu do tańszych modeli otwartych, a złożone zadania jak generowanie kodu do modeli frontierowych.

Autor wskazuje na jeszcze jeden czynnik napędzający ten trend: Opus 5 od Anthropic jest według niego stukrotnie droższy niż modele takie jak GPT-5.6 Luna w trybie xhigh czy DeepSeek, przy podobnych zdolnościach do wielu zadań. Databricks przeprowadził wywiady z inżynierami ze Stripe, Coinbase, Ubera i Ramp i doszedł do podobnego wniosku: modele otwarte dają największe oszczędności, tuż za nimi plasuje się inteligentne routowanie modeli, a kontrola wydatków i optymalizacja kontekstu, choć pomocne, nie zbliżają się nawet do skali tych dwóch technik. Dane Ramp z sierpnia potwierdzają trend liczbowo: wydatki na AI wśród 1% największych firm spadły o 10%.

**Key takeaways:**
- Uber obniżył koszt na sesję AI o 52% dzięki modelom open weight, tańszym subagentom i domyślnemu poziomowi wysiłku „medium”.
- Pinterest płaci mniej niż 8% ceny modelu zamkniętego za doszkolony na własnych danych model otwarty, osiągając lepszą wydajność.
- AT&T obcięło rachunek za AI o 56% przy spadku jakości zaledwie o 2 punkty procentowe, korzystając z routera modeli LiteLLM.

**Why do I care:** To konkretny, liczbowy kontrapunkt do narracji, że najdroższy model frontierowy jest zawsze najlepszym wyborem architektonicznym. Jeśli twój zespół nie ma jeszcze strategii routowania modeli według złożoności zadania, te liczby (52%, 56%, mniej niż 8% kosztu) to dobry argument do rozmowy z biznesem o tym, dlaczego warto zainwestować w tę infrastrukturę teraz, zanim rachunek za AI przestanie się w ogóle mieścić w budżecie.

**Link:** [The Pulse: tech companies move to open AI models](https://newsletter.pragmaticengineer.com/p/the-pulse-tech-companies-move-to-888)