---
title: "Refactoring: jak zaprojektować dobry serwer MCP"
excerpt: "Zadania zamiast endpointów, opisy narzędzi jak prompty, błędy podpowiadające następny krok i testy na kilku hostach."
publishedAt: "2026-10-15"
slug: "refactoring-jak-projektowac-dobry-serwer-mcp"
hashtags: "#refactoring #ai #agents #architecture #api #devtools #generated #pl"
source_pattern: "🌀 Refactoring"
---

## Jak zaprojektować dobry serwer MCP

**TLDR:** Luca Rossi i zespół Manufact przekonują, że serwer MCP to nie cienka nakładka na API. Narzędzia powinny odpowiadać zadaniom użytkownika, a opisy i błędy trzeba pisać dla agenta.

**Summary:** Najczęstszy błąd to zamiana każdego endpointu na narzędzie. Agent realizuje zadanie, na przykład "zgłoś błąd z reprodukcją i osobą przypisaną", więc zbyt drobne narzędzia oznaczają wieloskokowe pętle i zbyt grube kruche argumenty. Dobrym punktem wyjścia są narzędzia kończące zadanie w jednym lub dwóch wywołaniach. Notion początkowo mapował endpointy jeden do jednego, a w nowym serwerze usunął narzędzia do pojedynczych bloków i przyjmuje oraz zwraca całe strony jako Markdown. Block opisuje wewnętrzny serwer Linear z ponad trzydziestoma narzędziami, gdzie proste pytanie wymagało czterech do sześciu wywołań.

Agent czyta nazwy i opisy przy każdej turze, więc opis powinien zawierać ograniczenia, warunki wstępne i kiedy nie używać narzędzia, jak robi to Sentry w search_errors. Zmiany opisów trzeba recenzować i testować. Zapisy ryzykowne powinny być idempotentne, z kluczem idempotencji jak w Stripe i z adnotacjami narzędzi, takimi jak readOnlyHint i destructiveHint. Błędy mają mówić, co poszło nie tak i co spróbować, a najczęstsze błędy warto logować, bo wskazują wady schematu.

Po wdrożeniu dochodzi praca, której nie ma w zwykłym backendzie. Różni klienci, jak ChatGPT i Claude, zachowują się inaczej, więc potrzebne są złote prompty na kilku hostach. Protokół szybko się zmienia, a wersja z 2026-07-28 usuwa sesje i handshake initialize. Każdy katalog dystrybucji ma własny proces zgłoszenia. Samodzielny hosting pasuje do wewnętrznych serwerów, zarządzany do zdalnego MCP w wielu katalogach. Autor ujawnia partnerstwo z Manufact, więc rekomendacja ich platformy jest częściowo reklamą.

**Key takeaways:**
- Zacznij od kilku przepływów pracy, nie od listy endpointów.
- Opisy narzędzi traktuj jak prompty i przepuszczaj przez review.
- Testuj na co najmniej trzech hostach po każdej większej zmianie.

**Why do I care:** Dla każdego, kto dowozi integrację z agentami, to konkretna lista kontrolna. Warto pamiętać o koszcie utrzymania: to ruchomy cel, bo klienci i protokół zmieniają się częściej niż zwykłe API.

**Link:** [How to Design a Good MCP Server](https://refactoring.fm/p/how-to-design-a-good-mcp-server)
