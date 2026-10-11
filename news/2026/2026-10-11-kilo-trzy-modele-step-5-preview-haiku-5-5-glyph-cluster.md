---
title: "Trzy modele warte wypróbowania w Kilo: Step 5 Preview, Haiku 5.5 i Glyph Cluster"
excerpt: "Kilo proponuje trzy konkretne zadania do przetestowania nowych modeli: śledzenie błędu, dopisywanie testów i planowanie migracji."
publishedAt: "2026-10-10"
slug: "kilo-trzy-modele-step-5-preview-haiku-5-5-glyph-cluster"
hashtags: "#kilo #ai #llm #agents #devtools #generated #pl"
source_pattern: "Kilo"
---

## Trzy modele do wypróbowania w tym tygodniu

**TLDR:** Kilo opisuje trzy modele i podaje dla każdego zadanie testowe. Step 5 Preview ma śledzić błędy przez wiele plików, Claude Haiku 5.5 dopisywać testy, a Glyph Cluster planować migrację.

**Summary:** Step 5 Preview od StepFun jest przeznaczony do pracy agentowej, czyli używania narzędzi i dochodzenia do rezultatu krok po kroku. Przyjmuje tekst, obraz i wideo, a okno kontekstu ma milion tokenów. Autor radzi zacząć od błędu, który przechodzi przez kilka plików, i zwrócić uwagę, czy model znajduje przyczynę i kończy poprawkę, a nie tylko przekonująco ją opisuje.

Haiku 5.5 jest zbudowany pod szybkość i koszt. Anthropic wymienia streszczanie, ekstrakcję, klasyfikację, routing i prace podagentów. Kilo proponuje dać mu małe, sprawdzalne zadanie, na przykład testy dla funkcji walidującej z przypadkami brzegowymi. Jeśli wyjdą dobre testy bez długiej wymiany zdań, to powód, żeby nie sięgać automatycznie po większy model.

Glyph Cluster to model ukryty, o którym pisze Vercel. Służy do przeglądu kodu, debugowania i porównywania wariantów. Przykładowe zadanie to plan migracji tras z Expressa na route handlers w Next.js, z uwzględnieniem uwierzytelniania, middleware i obsługi błędów. Są dwa zastrzeżenia. Model przyjmuje tylko tekst i nie obsługuje structured outputs, a Vercel zaznacza, że prompty i odpowiedzi mogą służyć do trenowania.

**Key takeaways:**
- Każdy model dostaje jedno zadanie z wyraźnym kryterium sukcesu.
- Haiku 5.5 warto sprawdzić na drobnych zadaniach, zanim sięgniesz po większy model.
- Glyph Cluster może wykorzystywać dane do treningu, więc czytaj warunki.

**Why do I care:** To post producenta narzędzia, więc kończy się zachętą do użycia Kilo, a nie wynikami. Nie ma tu żadnych porównań ani liczb, tylko prompty. Przy tym zaproponowane zadania są rozsądne jako własny mały benchmark: weź realne zadanie z backlogu, uruchom na trzech modelach i porównaj, ile poprawek musisz wnieść ręcznie. Uwaga o treningu na promptach ma znaczenie, jeśli wklejasz kod klienta.

**Link:** [Three models you should be trying in Kilo this week](https://blog.kilo.ai/p/three-models-you-should-be-trying)
