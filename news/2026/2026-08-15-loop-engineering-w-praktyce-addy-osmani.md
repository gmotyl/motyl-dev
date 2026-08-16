---
title: "Loop engineering w praktyce: jak Addy Osmani zarządza dziesięcioma agentami dziennie"
excerpt: "Addy Osmani opisuje, jak w codziennej pracy łączy prymitywy /goal i /loop z Claude Code, żeby delegować agentom zadania bez oddawania im własnego osądu."
publishedAt: "2026-08-15"
slug: "loop-engineering-w-praktyce-addy-osmani"
hashtags: "#AddyOsmani #agents #ai #productivity #architecture #github #generated #pl"
---

## Loop engineering w praktyce: jak zarządzać wieloma agentami naraz

**TLDR:** Addy Osmani opowiada, jak na co dzień pracuje z pięcioma do dziesięciu agentami równolegle, korzystając z dwóch prymitywów Claude Code: `/goal`, który prowadzi zadanie do zdefiniowanego warunku końcowego, oraz `/loop`, który uruchamia polecenie cyklicznie na zadanym interwale. Pokazuje konkretne przykłady z własnego repozytorium open source oraz przestrzega przed najczęstszym błędem: oddaniem agentowi nie tylko zadania, ale też oceny, czy wynik jest wystarczająco dobry.

**Podsumowanie:** Osmani zaczyna od opisu swojego typowego dnia pracy: pięć do dziesięciu agentów działających w tym samym czasie, z czego część zadań deleguje w pełni, a przy części siedzi i sprawdza kod na bieżąco. To rozróżnienie jest kluczowe dla całego tekstu, bo pokazuje, że loop engineering nie oznacza włączenia autopilota i odejścia od klawiatury. Chodzi o świadomy wybór, które zadania mają jasno określony warunek zakończenia i można je bezpiecznie zostawić agentowi, a które wymagają stałego nadzoru, bo dotykają czegoś wrażliwego, na przykład autoryzacji albo płatności.

Dalej Osmani pokazuje, skąd w ogóle wzięło się pojęcie loop engineering. Jeszcze niedawno, zanim Claude Code i Codex dostały wbudowane mechanizmy do tego celu, ludzie sami pisali pętle w bashu. Wspomina Ralph loop od Geoffa Huntleya, eksperyment, który wielu z nas testowało na prywatnych projektach, bo tam koszt porażki był niski. Teraz, jego zdaniem, te wzorce dojrzały na tyle, że można polegać na wbudowanych prymitywach, choć wciąż trzeba pilnować, czy cel i ograniczenia zostały dobrze zdefiniowane, bo inaczej pętla zostawiona bez nadzoru potrafi wpędzić projekt w kłopoty, szczególnie w starszym kodzie bankowym, a nie na świeżym projekcie bez użytkowników.

Sporo miejsca zajmuje wyjaśnienie samego `/goal`. To polecenie definiuje, jak wygląda ukończone zadanie, a osobny model ewaluujący sprawdza po każdej próbie, czy warunek został spełniony, zamiast zostawiać tę decyzję samemu agentowi wykonującemu pracę. Przykład z artykułu, w którym cel brzmi: podnieś wynik Lighthouse na stronie głównej do 90 lub więcej i przestań po pięciu próbach, dobrze pokazuje, dlaczego warunki deterministyczne, liczba przechodzących testów, konkretny próg wyniku, działają dużo lepiej niż coś w stylu „zrób to dobrze”. Osmani używa tego mechanizmu na przykład do przeglądania i domykania listy zgłoszeń na GitHubie albo do przyspieszania ładowania strony o określony procent, czasem to działa świetnie, czasem nie, ale traktuje to jako eksperyment, a nie gwarancję.

Drugi prymityw, `/loop`, działa bardziej jak cron, powtarza to samo polecenie na stałym interwale i najlepiej sprawdza się przy monitorowaniu czegoś zewnętrznego, na przykład logów albo statusu pull requesta. Osmani łączy oba mechanizmy w swoim repozytorium Agent Skills, które ma ponad 80 tysięcy gwiazdek i dostaje 80 do 90 pull requestów dziennie. Ustawia loop co godzinę do sprawdzania nowych zgłoszeń i przygotowania podsumowania ich pilności, a przy zgłoszeniach z etykietą bug używa dodatkowo goala do wdrożenia poprawki, dopóki lokalne testy nie przejdą. Jedna z jego reguł stopu jest zresztą bardzo prozaiczna: jeśli agent trzeci raz z rzędu próbuje tego samego polecenia bez żadnej zmiany wyniku, to znak, że pętla kręci się w miejscu i czas ją zatrzymać.

Najciekawszy fragment tekstu to jednak osobista historia Osmaniego o tym, jak niemal wypchnął zmiany, których nie sprawdził wystarczająco dokładnie. Poprosił agenta o przegląd konkurencji i przygotowanie lokalnych, niewypchniętych jeszcze PR-ów z propozycjami brakujących funkcji. Przeczytał research, ale nie przyjrzał się implementacji na tyle uważnie, a gdy w końcu to zrobił, okazało się, że rozwiązanie wprowadzało sporo dodatkowej złożoności dla użytkowników za stosunkowo niewielki zysk. Sam przyznaje, że deleguje zadanie, ale musi pilnować, żeby nie oddać razem z nim własnego smaku i osądu. Dlatego jedną z zasad, które stosuje, jest rozdzielenie ról: jeden agent przygotowuje zmianę, drugi ją weryfikuje, bo agent, który coś napisał, ma naturalną skłonność do uznania własnej pracy za skończoną.

**Kluczowe wnioski:**
- `/goal` prowadzi zadanie do mierzalnego warunku końcowego sprawdzanego przez osobny model ewaluujący, a nie przez agenta wykonującego pracę.
- `/loop` powtarza polecenie na interwale i najlepiej nadaje się do monitorowania czegoś zewnętrznego, na przykład stanu pull requesta czy logów, `/schedule` przenosi taki proces do chmury.
- Loop engineering wymaga jasno zdefiniowanego stanu końcowego, zadania oparte na subiektywnym guście albo otwartej twórczości się do tego nie nadają.
- Rozdzielenie roli agenta wykonującego pracę od agenta weryfikującego chroni przed sytuacją, w której agent sam ocenia jakość własnej roboty.

**Dlaczego mnie to obchodzi:** Jako ktoś, kto na co dzień decyduje, co w projekcie da się bezpiecznie zautomatyzować, doceniam, że Osmani nie sprzedaje tego jako magicznego rozwiązania, tylko pokazuje realne ograniczenia, łącznie z własną wpadką z niedopilnowanym PR-em. Rozdzielenie agenta piszącego kod od agenta weryfikującego to wzorzec, który sam zacząłem wprowadzać w code review, bo jeden model rzeczywiście łatwiej zauważa problem, którego drugi nie przewidział, na przykład wydajność na mobile, gdy cała ocena była robiona na desktopie. Największą wartością tego tekstu jest jednak przypomnienie, że delegowanie zadania i delegowanie osądu to dwie różne rzeczy, i w architekturze systemów agentowych to rozróżnienie będzie kosztować nas coraz więcej, jeśli je zignorujemy.

**Link:** [Practical Loop Engineering](https://addyo.substack.com/p/practical-loop-engineering)
