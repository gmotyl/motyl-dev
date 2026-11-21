---
title: "Latent Space: formalna weryfikacja kodu od &Truth, Harmonic, Axiom i Theorem"
excerpt: "Przegląd firm, które łączą modele językowe z dowodami sprawdzanymi w Lean, żeby zastąpić testowanie matematyczną pewnością co do kodu."
publishedAt: "2026-11-20"
slug: "latent-space-formalna-weryfikacja-andtruth-lean-veri-coding"
hashtags: "#latentspace #ai #llm #security #testing #agents #engineering #generated #pl"
source_pattern: "Latent Space"
---

## Formalna weryfikacja jako lekarstwo na slop

**TLDR:** Słowem roku w branży AI jest slop, czyli bezwartościowy kod z modeli. Firmy takie jak &Truth, Harmonic, Axiom i Theorem budują systemy dowodzące poprawności kodu w Lean, żeby zastąpić domysły zapewnieniem, że kod spełnia specyfikację.

**Summary:** Rozmówcą autora jest Clark Barrett, współzałożyciel i współszef &Truth, profesor Stanfordu i współtwórca cvc5, solvera SMT, który według niego jest wywoływany miliardy razy dziennie w pipeline'ach Amazona, między innymi do analizy specyfikacji i generowania testów w Kiro. Barrett wskazuje, że różnica między testowaniem a weryfikacją polega na tym, skąd wiadomo, że skończyliśmy. Testy, skanery i łatki znajdują mnóstwo błędów, ale nigdy nie ma pewności, że nie został jeszcze jeden.

&Truth buduje na Lean, otwartym języku i asystencie dowodzenia. Firma łączy AI z automatycznym wnioskowaniem, żeby budować dowody, które Lean sprawdza. Lean pełni rolę wyrafinowanego korektora matematyki: nie wymyśla dowodu, tylko potwierdza, że nie ma w nim błędu. Pierwsze narzędzie, &Atlas, to mapa kodu open source napisanego w C. Barrett wskazuje jako główny scenariusz przejście przez cały kod w C na świecie i sprawdzenie bezpieczeństwa pamięci, a tam, gdzie go brakuje, wskazanie konkretnego miejsca do naprawy.

Konkurencja podchodzi do tego różnie. Axiom wykorzystuje weryfikację formalną jako sygnał poprawności przy trenowaniu modeli matematycznych. Harmonic z Aristotle zakłada, że AI pisze dowody, a Lean sprawdza każdy krok. Theorem, we współpracy z Anthropic, opisuje weryfikację formalną w skali LLM. Anthropic podaje, że na 36 małych zadaniach Opus 5.5 osiągnął 50 procent rozwiązań, zużywając około 40 procent mniej tokenów niż Opus 5. Zdaniem Barretta programiści przejdą od vibe-codingu do veri-codingu, czyli spędzą więcej czasu na specyfikacji i jej przeglądzie niż na kodzie.

**Key takeaways:**
- Testy znajdują błędy, ale tylko dowód formalny mówi, że nie ma ich więcej w zakresie specyfikacji.
- Lean sprawdza dowody, a model je pisze, więc wynik nie zależy od tego, czy AI ma rację.
- Koszt weryfikacji w tokenach spada z każdą nową generacją modeli.

**Why do I care:** Dla frontendowca to na razie odległe, bo większość tych narzędzi celuje w C, kod systemowy i bezpieczeństwo pamięci. Wniosek o przesunięciu pracy w stronę pisania specyfikacji jest jednak realny i dotyczy każdego, kto deleguje kod agentom. Autor nie mówi, kto zweryfikuje samą specyfikację, a to jest słaby punkt: dowód potwierdza zgodność z wymaganiem, nie to, że wymaganie było dobre.

**Link:** [Formal verification systems and AI](https://www.latent.space/)
