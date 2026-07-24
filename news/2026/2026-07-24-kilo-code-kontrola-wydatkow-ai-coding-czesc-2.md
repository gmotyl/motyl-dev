---
title: "Kilo Code dokłada narzędzia do kontrolowania wydatków na AI coding"
excerpt: "Kilo Code rozbudowuje panel kosztów o alerty wydatków, historię aktywności i podpowiedzi tańszych planów rozliczeniowych."
publishedAt: "2026-07-23"
slug: "kilo-code-kontrola-wydatkow-ai-coding-czesc-2"
hashtags: "#kilo #ai-coding #finops #devtools #vscode #generated #pl"
---

## TLDR
Kilo Code kontynuuje serię zmian mających pomóc zespołom ogarnąć wydatki na AI coding. W drugiej części tygodnia skupionego na kosztach pojawiły się zakładka z przeglądem wydatków, alerty o nietypowych skokach kosztów, nowa zakładka aktywności oraz automatyczne podpowiedzi tańszych planów rozliczeniowych.

## Kilo Code dokłada narzędzia do kontrolowania wydatków na AI coding
**TLDR:** Kilo Code opublikował drugą część zmian z tzw. focus week poświęconego kosztom. Dostają je wszyscy użytkownicy: nowy przegląd wydatków, alerty progowe na poziomie organizacji i użytkownika, zakładka aktywności oraz sugestie tańszych planów.

**Podsumowanie:** Tydzień wcześniej Kilo Code opisywał pierwszą turę funkcji oszczędnościowych, teraz doszła druga część tego samego wysiłku. Punktem wyjścia jest zakładka Overview, która pokazuje wydatki z modelu usage-based i subskrypcji na przestrzeni 7, 30 i 90 dni, a przy okazji wskazuje, które produkty albo które osoby w zespole najbardziej napędzają rachunek. To zwykły dashboard kosztowy, ale w narzędziu deweloperskim to wciąż rzadkość, więc samo jego pojawienie się ma znaczenie.

Drugą nowością są Spend Alerts. Progi wydatków dało się już wcześniej ustawiać w rozszerzeniu VS Code i w CLI, teraz to samo można zrobić na poziomie całej organizacji i pojedynczego użytkownika, a zakres objął też cloud agents i code reviewera. Progi są konfigurowalne w oknach kroczących 24 godzin, 7 i 30 dni, więc zespół może dostać ostrzeżenie zanim koszt urośnie do poziomu, który zaskakuje pod koniec miesiąca.

Do tego doszła zakładka Activity, zbierająca w jednym miejscu alerty, sugestie, recenzje i zmiany ustawień. Zamiast patrzeć na sam wynik liczbowy, który nagle wygląda inaczej niż wczoraj, można prześledzić, co konkretnie się wydarzyło i kiedy. Ostatnim elementem są Cost Suggestions, czyli powiadomienia mailowe i w aplikacji, które sugerują przejście na plan albo Kilo Pass, gdy pasuje on do faktycznego wzorca zużycia. Kilo Code podkreśla, że to nie jest generyczny upselling, tylko rekomendacja liczona na podstawie realnych danych z konta, bo oprócz planów i Kilo Pass dochodzą kolejne modele rozliczeń, w tym BYOK i pakiety subskrypcyjne.

**Kluczowe wnioski:**
- Zakładka Overview pokazuje wydatki usage-based i subskrypcyjne w oknach 7, 30 i 90 dni z podziałem na produkty i użytkowników.
- Spend Alerts działają teraz też na poziomie organizacji i obejmują cloud agents oraz code reviewera, z progami dla 24h, 7 i 30 dni.
- Zakładka Activity i Cost Suggestions dają kontekst zmian kosztów oraz spersonalizowane podpowiedzi tańszego planu rozliczeniowego.

**Dlaczego mnie to obchodzi:** Koszty narzędzi AI coding rosną w firmach szybciej niż ktokolwiek planował, a rachunki za usage-based inference potrafią być nieprzewidywalne z tygodnia na tydzień. Widziałem już zespoły, które odkrywały przekroczony budżet dopiero na fakturze, bo nikt nie miał realnego wglądu w to, kto i za co płaci. Dashboard kosztowy plus progowe alerty to dokładnie ten rodzaj FinOps, który powinien być standardem w każdym narzędziu rozliczanym per token czy per request, a nie dodatkiem po fakcie. Jedyne zastrzeżenie, jakie bym miał, to że sugestie tańszego planu od dostawcy zawsze warto zweryfikować niezależnie, bo interes dostawcy i interes zespołu płacącego rachunki nie zawsze idą w tę samą stronę, nawet jeśli mechanizm wygląda na oparty na danych.

**Link:** [More ways to control your AI coding spend](https://blog.kilo.ai/p/more-ways-to-control-ai-coding-spend?publication_id=4363009&post_id=207313373&isFreemail=true&triedRedirect=true)
