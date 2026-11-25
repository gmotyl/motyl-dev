---
title: "Trwałe wykonanie dla agentów AI: każdy krok musi dać się odzyskać"
excerpt: "Zadania agentów rosną z godzin do dni, więc potrzebny jest durable execution: kroki z punktami kontrolnymi, stan poza sandboxem i jasny podział odpowiedzialności."
publishedAt: "2026-11-25"
slug: "refactoring-durable-execution-dla-agentow-ai"
hashtags: "#refactoring #ai #agents #architecture #devops #generated #pl"
source_pattern: "Refactoring"
---

## Durable execution dla agentów AI

**TLDR:** Wraz z wydłużaniem się zadań agentów potrzebna jest warstwa trwałego wykonania z punktami kontrolnymi. W mailu jest tylko początek: agenda i pierwsza z pięciu części, o odzyskiwaniu kroków.

**Summary:** Punkt wyjścia to pomiar METR: horyzont czasowy 50 procent, czyli długość zadania programistycznego, które model kończy z sukcesem w połowie prób. Wynosił około 50 minut dla Claude 3.7 Sonnet i podwajał się co siedem miesięcy, ale według aktualizacji z 20 listopada podwaja się teraz co 3,6 miesiąca, a obecna czołówka, GPT-6 Astra i Claude Opus 5.5, jest na poziomie około 40 godzin pracy człowieka. Autor ma własne długie zadania, na przykład renderowanie animacji, które trwa godzinami, albo potoki ilustracji do 3D trwające około 20 godzin i produkujące ponad gigabajt plików. Do tematu zaprosił Tony'ego Holdstocka-Browna z Inngest, który jest partnerem tego wydania.

Pierwsza zasada: każdy krok powinien być do odzyskania. Wykonanie agenta w chmurze to pętla zawodnych wywołań modelu, narzędzi i podagentów. Trwałe wykonanie traktuje każde wywołanie jako osobny krok z zapisanym wynikiem, więc po awarii nowe wykonanie kontynuuje od ostatniego udanego kroku bez powtarzania skończonych.

Nie znaczy to, że wszystko trzeba ponawiać. Firma Featured wypuszcza około 2500 artykułów miesięcznie w siedmioosobowym zespole, a każdy to jeden przebieg z 60 do 150 kroków. Większość ich funkcji celowo nie ponawia prób, bo najbardziej boją się źle wygenerowanego artykułu opublikowanego automatycznie u klienta. Zły przebieg oznacza się więc jako nieudany i zatrzymuje. Najważniejsze sprawdzenia trzymają poza workflow, w ograniczeniu unikalności w Postgresie.

Autor proponuje trójpodział odpowiedzialności. Runtime odpowiada za awarie przejściowe, takie jak timeouty, limity i błędy 5xx, więc ponawia z odstępem. Agent odpowiada za awarie semantyczne, na przykład nieoczekiwany wynik narzędzia czy nieprzechodzący test, i dostaje je jako informację. Baza danych odpowiada za niezmienniki, czyli rzeczy, które nie mogą zdarzyć się dwa razy, jak wysyłka, obciążenie czy publikacja, przez ograniczenia unikalności lub klucze idempotencji. Kolejne części, o stanie poza sandboxem, budzeniu agentów, ewaluacji z zapisu przebiegów i o tym, kiedy wystarczy cron, w tym mailu nie dotarły.

Trzeba pamiętać o układzie: to tekst z partnerem, który sprzedaje narzędzie do durable execution, choć autor deklaruje niezależność opinii.

**Key takeaways:**
- Horyzont zadań agentów podwaja się co 3,6 miesiąca, więc długie przebiegi są normą.
- Durable execution zapisuje wynik każdego kroku i wznawia od ostatniego udanego.
- Nie wszystko należy ponawiać, bo ślepe ponowienie może opublikować błąd.
- Niezmienniki egzekwuj w bazie, nie w workflow.

**Why do I care:** Podział na runtime, agenta i bazę to dobra reguła projektowa, która przyda się też poza AI, w każdym systemie kolejek i płatności. Idempotencja w bazie jest tańsza niż jakikolwiek mądry retry.

**Link:** [Durable execution for AI agents](https://refactoring.fm)
