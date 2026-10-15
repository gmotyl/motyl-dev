---
title: "Addy Osmani: weryfikacja agentowa, czyli testy jako pętla, w której agent sprawdza własną pracę"
excerpt: "Testy E2E, testy własności i testy różnicowe dają agentowi niezależny sposób sprawdzenia wyniku, o ile są szybkie i deterministyczne."
publishedAt: "2026-10-15"
slug: "addy-osmani-agentic-verification-testy-jako-petla-agenta"
hashtags: "#addyosmani #ai #agents #testing #engineering #productivity #generated #pl"
source_pattern: "Addy Osmani"
---

## Agentic Verification

**TLDR:** Jakość pracy agenta rośnie, gdy ma on niezależny sposób sprawdzenia wyniku. Addy Osmani wskazuje trzy rodzaje testów i wymaga, by były szybkie i deterministyczne.

**Summary:** Teza: agenci piszą dobry kod "w skali" dzięki weryfikacji, a sprawdzanie stało się tanie. Praca człowieka przesuwa się z czytania każdej linii na budowanie pętli, które agent uruchamia sam, a człowiek recenzuje dowody, nie tylko diffy. Gdy agent nie może zweryfikować wyniku, zgaduje, a zgadywanie sprawdza dopiero człowiek, co jest najwolniejszą pętlą.

Pierwszy typ to testy end-to-end, bo opisują prawdziwy przepływ użytkownika i trudno je oszukać. Pokazują też, co poszło źle, dzięki zrzutom i śladom, i definiują "gotowe": "spraw, żeby ten test przeszedł" to cel dla agenta. Mają koszty, bo są wolniejsze i bardziej podatne na niestabilność, więc warto mieć mały zestaw o wysokiej wartości. Drugi typ to testy własności, w których opisujemy regułę, a narzędzie, jak fast-check, Hypothesis czy proptest, generuje tysiące wejść i redukuje porażkę do minimalnego przypadku. Typowe własności to round-trip, niezmienniki, idempotencja i równoważność z prostą implementacją. Trzeci typ to testy różnicowe przy migracjach: stary system jest wyrocznią, a oba uruchamiane są na losowych lub odtworzonych wejściach, z listą zatwierdzonych zmian.

Autor podkreśla, że wolne lub niestabilne testy uczą agenta złych nawyków: ponowne uruchamianie zamiast naprawy i rzadkie uruchamianie. Dobry zestaw jest szybki, deterministyczny, ma odizolowane flaki i krótkie komunikaty. Dodaje praktyki, jak zapisanie kryteriów sukcesu przed kodowaniem, osobny agent recenzent i sprawdzanie, czy wygenerowany test odróżnia poprawną implementację od tylko wiarygodnej.

**Key takeaways:**
- Jeśli mógłbyś wybrać jeden test, wybierz E2E.
- Testy własności określają, czego nigdy nie wolno zrobić.
- Niestabilne testy w głównym zestawie szkodzą bardziej niż ich brak.

**Why do I care:** Wolę lepszą pętlę zwrotną niż nieco lepszy model, i autor ma rację. Brakuje mu jednak kosztu: utrzymanie szybkich, deterministycznych E2E w dużej aplikacji frontendowej to osobny projekt, a testy generowane przez agenta też trzeba sprawdzać.

**Link:** [Agentic Verification](https://addyo.substack.com/p/agentic-verification)
