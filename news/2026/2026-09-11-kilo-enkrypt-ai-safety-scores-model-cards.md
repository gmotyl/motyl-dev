---
title: "Kilo: oceny bezpieczeństwa Enkrypt AI trafiają na karty modeli obok ceny i completion rate"
excerpt: "Kilo dodaje do każdej karty modelu wynik ryzyka Enkrypt AI (0-100, im niżej tym bezpieczniej) obok ceny i completion rate, żeby decyzję o bezpieczeństwie modelu podejmować przed wdrożeniem, a nie po fakcie."
publishedAt: "2026-09-11"
slug: "kilo-enkrypt-ai-safety-scores-model-cards"
hashtags: "#kilo #ai #security #llm #generated #pl"
source_pattern: "Kilo"
---

## Oceny bezpieczeństwa Enkrypt AI trafiają na karty modeli w Kilo

**TLDR:** Kilo dodało do kart modeli wynik ryzyka Enkrypt AI w skali 0-100 (im niżej, tym bezpieczniej), oceniający jailbreak resistance, bias, toksyczność pod presją i generowanie niebezpiecznego kodu, dostępny od razu bez dodatkowego logowania czy osobnego dashboardu.

**Summary:** Wybór modelu do zadania kodowego zwykle sprowadzał się do dwóch pytań: czy jest wystarczająco szybki i tani, oraz czy jego output jest wystarczająco bezpieczny, żeby wdrożyć bez obaw. Kilo od dawna odpowiadało na pierwsze pytanie dzięki otwartemu cennikowi, w którym płaci się stawkę dostawcy za token i można przełączać się między ponad 500 modelami zależnie od zadania. Drugie pytanie żyło dotąd w zupełnie innym miejscu, zwykle w raporcie, który sprawdzało się już po tym, jak model był wpięty w produkcyjny workflow, czyli za późno, żeby cokolwiek zmienić bez kosztów.

To opóźnienie ma większe znaczenie teraz, gdy więcej pisania kodu robi agent niż człowiek. Model działający w trybie Code albo przekazany subagentowi jako część zorkiestrowanego zadania może commitować kod przy znacznie mniejszym nadzorze niż zwykły proces code review zakłada. Umieszczenie wyniku bezpieczeństwa na tej samej karcie co cena i completion rate oznacza, że tę zmienną ważysz przed wyborem modelu, a nie po tym, jak coś już trafiło do repozytorium. Ocena Enkrypt AI jest przeprowadzana niezależnie od czegokolwiek, co śledzi samo Kilo, na ponad 200 modelach w ramach ich publicznego AI Safety Leaderboard, i rolluje cztery testy w jeden wynik.

Dane pokazują, że cena, completion rate i bezpieczeństwo nie poruszają się razem: Claude Sonnet 5 ma obecnie najniższy wynik ryzyka na tablicy (9,2) przy 36,19 dolara za próbę, podczas gdy GPT-5.5 kończy więcej zadań (74,2% wobec 59,6%), ale kosztuje mniej więcej dwa razy tyle i niesie mniej więcej dwukrotnie wyższe ryzyko. Żadna z tych trzech liczb nie przewiduje pozostałych, więc niska cena albo wysoki completion rate nic nie mówią o tym, jak bezpiecznie model pisze kod. To ma też znaczenie dla routerów Auto Model: jeśli korzystasz z Auto Frontier czy Auto Efficient zamiast ręcznie wybierać model, wynik ryzyka pozwala sprawdzić, co router faktycznie wybiera dla danego zadania, a nie tylko ile to kosztuje.

**Key takeaways:**
- Wynik ryzyka (0-100, niżej = bezpieczniej) obejmuje jailbreak resistance, bias, toksyczność i generowanie niebezpiecznego kodu.
- Cena, completion rate i bezpieczeństwo poruszają się niezależnie od siebie, więc żadna z tych metryk nie zastępuje pozostałych.
- Ranking modeli w Kilo nadal opiera się na realnym użyciu i completion rate, wynik ryzyka to osobna kolumna, nie czynnik rankingowy.

**Why do I care:** Dla każdego, kto wdraża kod pisany przez agenta działającego bez nadzoru na poziomie zwykłego code review, generowanie niebezpiecznego kodu (twarde poświadczenia, brak walidacji wejścia, konkatenowane zapytania SQL) to dokładnie ten rodzaj błędu, który łatwo przeoczyć, bo model może dobrze wypadać w completion rate i brzmieć składnie w konwersacji, a i tak wpuszczać takie luki do PR-a. Warto sprawdzić, gdzie na tej skali plasuje się model, którego już używasz w chmurowym agencie czy subagencie, zanim zrobi to za ciebie ktoś inny, po fakcie.

**Link:** [New in Kilo: Enkrypt AI Safety Scores for Every Model](https://blog.kilo.ai/p/safety-scores)