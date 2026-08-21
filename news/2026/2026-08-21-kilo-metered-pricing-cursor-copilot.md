---
title: "Wszystkie drogi prowadzą do rozliczania za token"
excerpt: "Cursor, GitHub Copilot i Kilo pokazują, że branża narzędzi kodujących AI zbiega w jednym punkcie: płacisz za realne zużycie tokenów, nie za płaski abonament, a jedyna pozostała różnica to ile masz opcji, gdy koszt się zmieni."
publishedAt: "2026-08-20"
slug: "kilo-metered-pricing-cursor-copilot"
hashtags: "#kilo #pricing #ai #cursor #github-copilot #saas #generated #pl"
source_pattern: "Kilo"
---

## Wszystkie drogi prowadzą do rozliczania za token

**TLDR:** Cursor po raz kolejny zmienia model cenowy i wycofuje plany roczne, GitHub Copilot ogranicza limity zamiast podnosić ceny, a autor argumentuje, że pytanie nie brzmi już "czy będziesz rozliczany za token", tylko "ile będzie kosztować odejście, gdy ci się to nie spodoba".

**Summary:** Zmiana w Cursorze z 24 sierpnia jest znana tylko z maila wysłanego do subskrybentów, nie ma żadnego wpisu na blogu ani w changelogu, a dokumentacja cenowa wciąż pokazuje Auto Cost jako płaską stawkę. Wszystko, co wiadomo o tej zmianie, pochodzi od odbiorców, którzy wklejają treść maila na Reddicie i X. Historia cenowa Cursora to najpierw nielimitowany dostęp na bazowym modelu, potem premium requests od czerwca 2025 z mnożnikiem sprawiającym, że jedno zapytanie mogło kosztować pięćdziesiąt razy więcej niż inne, a od 1 czerwca 2026 rozliczanie tokenowe według stawek API, liczone od tokenów wejściowych, wyjściowych i cache'owanych. Plany roczne są właśnie wycofywane.

GitHub Copilot idzie inną drogą: nie zmienia cen, tylko wprowadza limity. Subskrypcje dostają rate limity zamiast wyższych stawek, tygodniowe pułapy trafiły do Claude Code w sierpniu 2025. Enterprise nie ma tej poduszki bezpieczeństwa, płaci cenę za miejsce plus zużycie według stawek API, licznik startuje od pierwszego tokena. Autor zwraca uwagę na fundamentalny problem: procurement działa w cyklach rocznych, a modele cenowe zmieniają się teraz kwartalnie. Wycofanie planów rocznych przez Copilota to ten zderzenie ujęte w jednym konkretnym ruchu: kontrakt przeżył model cenowy, pod którym został podpisany. Budżet zatwierdzony w pierwszym kwartale 2026 pod matematykę premium requests był przestarzały już w czerwcu.

Kilo, jako gateway, też nie ucieka od tego problemu, bo przepuszcza ceny providerów bez narzutu, czyli jeśli Anthropic podniesie stawki za Opusa, użytkownicy Kilo płacą różnicę. Różnica jest w tym, co Kilo robi ponad to: 500-plus modeli przez jeden gateway w cenach providera, możliwość przełączenia modelu, kiedy ekonomia się zmienia, bez zmiany edytora.

**Key takeaways:**
- Cursor wycofuje plany roczne i przechodzi na rozliczanie tokenowe od 1 czerwca 2026, znane tylko z maila do subskrybentów.
- GitHub Copilot reguluje koszty limitami zamiast cenami, z tygodniowymi pułapami na Claude Code od sierpnia 2025.
- Procurement roczny i kwartalne zmiany cenowe to zderzenie, które robi kontrakty przestarzałymi zanim się skończą.
- Pytania do zadania sobie: czy możesz przełączyć model lub providera bez narzutu, czy BYOK faktycznie was chroni, i czy wasze reguły, skille i konfiguracje MCP żyją w repo czy w marketplace vendora.

**Why do I care:** Ten artykuł jest bardziej przydatny jako checklist ryzyka niż jako reklama Kilo, mimo że w oczywisty sposób jest też reklamą Kilo. Pytania o to, czy twoje reguły i konfiguracje MCP żyją w repo czy w zamkniętym marketplace vendora, czy wciąż płacisz per token nawet z własnym kluczem API, i co się dzieje z przedpłaconym kredytem, jeśli zdecydujesz się odejść, to realne pytania, które warto sobie zadać przed podpisaniem rocznego kontraktu na narzędzie AI, którego model cenowy może się zmienić za kwartał.

**Link:** [All roads lead to metered pricing](https://blog.kilo.ai/p/all-roads-lead-to-metered-pricing)
