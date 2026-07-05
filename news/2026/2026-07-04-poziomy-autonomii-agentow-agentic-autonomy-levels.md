---
title: "Poziomy autonomii agentów: od asystenta do fabryki kodu"
excerpt: "Addy Osmani proponuje dwuwymiarową skalę do oceny dojrzałości pracy z agentami AI, odchodząc od prostego jednoosiowego modelu."
publishedAt: "2026-07-03"
slug: "poziomy-autonomii-agentow-agentic-autonomy-levels"
hashtags: "#AddyOsmani #agents #ai #architecture #engineering #generated #pl"
source_pattern: "Addy Osmani"
---

## Poziomy autonomii agentów: dwie osie, sześć poziomów, jeden cel

**TLDR:** Jednoosiowe skale mierzenia dojrzałości pracy z agentami AI są niewystarczające. Osmani proponuje dwie niezależne osie, agency i orchestration, które razem opisują sześć poziomów autonomii. Wdrażaj stopniowo, weryfikuj każdy krok, a nie ufaj agentowi tylko dlatego, że dostarcza ładne podsumowanie.

**Summary:** Rozmowa o agentach AI zmieniła się radykalnie w ciągu ostatnich miesięcy. Przestaliśmy mówić o promptowaniu, zaczęliśmy mówić o operowaniu: software factories, background sessions, subagents, orchestration, sandboxes. Claude Code, Codex i podobne narzędzia przeniosły te koncepcje z poziomu teorii do codziennej praktyki inżynierskiej. I tu pojawia się problem, bo większość frameworków myślenia o autonomii jest po prostu za prosta.

Osmani wskazuje na popularną skalę Steve'a Yegge'a z "Welcome to Gas Town" jako dobry punkt wyjścia, ale niewystarczający. Pojedyncza oś mówi ci, jak bardzo ufasz jednemu agentowi. Nie mówi ci nic o tym, jak radzisz sobie z koordynacją wielu agentów naraz. A właśnie to staje się kluczowe, gdy masz do dyspozycji fleet równoległych worktree'ów, każdy z własnym scope'em, każdy generujący zmiany, które ktoś musi zrecenzować i zmergować. To jest inny rodzaj umiejętności, ortogonalny do kwestii zaufania pojedynczemu agentowi.

Stąd pomysł na dwie osie. Pierwsza, agency, opisuje jak daleko puszczamy jednego agenta bez naszej ingerencji: od sugerowania akcji przez delegowanie bounded task aż po goal-driven autonomy, gdzie agent sam eksperymentuje, blokuje się, pyta, zmienia podejście i wraca z pełnym evidence. Druga oś, orchestration, opisuje skalę koordynacji: od jednego agenta w jednym wątku przez kilka izolowanych agentów aż po managed-by-exception, gdzie orchestrator sam buduje kolejkę pracy z issue trackera i eskaluje do człowieka tylko wtedy, gdy coś się nie udaje. Razem te dwie osie tworzą sześć poziomów, od Level 0 (agent sugeruje, ty decydujesz) przez Level 3 (goal-driven autonomy z mierzalnym warunkiem stopu) aż po Level 5, gdzie system działa jak fabryka i ty tylko definiujesz polityki sukcesu.

Interesujące są dane z badania Anthropic: w circa 400 tysiącach sesji z ponad 235 tysiącami użytkowników między październikiem 2025 a kwietniem 2026, ludzie podejmują około 70% decyzji planistycznych, ale Claude wykonuje około 80% działań. To zmienia perspektywę. Wysoka autonomia nie oznacza wyrzucenia człowieka z pętli, oznacza przesunięcie go z roli wykonawcy każdego kroku do roli osoby decydującej o kierunku. To subtelna, ale ważna różnica, bo błędnie interpretowana prowadzi do anty-wzorców, o których Osmani pisze wprost.

Trzy pytania, które Osmani proponuje zadawać każdemu systemowi agentowemu, są moim zdaniem najcenniejszą częścią całego tekstu: jak szybko dowiemy się, że agent robi coś nie tak, jak łatwo to cofnąć i co udowodniłoby, że robimy to dobrze? Jeśli odpowiedź na wszystkie trzy brzmi: nie szybko, z trudem, ufając podsumowaniu agenta, to nie masz wysokiej autonomii, masz iluzję kontroli.

**Key takeaways:**
- Jedna oś (zaufanie agentowi) to za mało: potrzebujesz też mierzyć skill koordynacji wielu agentów równocześnie, bo to osobna kompetencja.
- Level 3 (goal-driven autonomy) wymaga mierzalnego warunku stopu, "popraw UX" to nie jest cel dla agenta, "reduce load time below 1s" już tak.
- Anty-wzorce autonomii, takie jak summary substitution i permission laundering, są groźniejsze niż zbyt niska autonomia, bo dają fałszywe poczucie bezpieczeństwa.

**Why do I care:** Pracując z architekturą frontendową na co dzień, widzę, że większość zespołów zatrzymuje się na Level 1 lub 2 i to jest rozsądne, ale nieświadome. Nie mają frameworku, żeby powiedzieć: jesteśmy tu, chcemy być tam, oto co musimy zbudować, żeby to było bezpieczne. Osmani daje taki framework. Mam jedno zastrzeżenie: poziomy orchestration zakładają, że masz już bardzo dobre testy automatyczne i policy-driven review. Większość projektów, z którymi pracuję, tego nie ma. Dlatego Level 5 jako "fabryka kodu" to dla nich fantazja, nie plan. Zanim zaczniesz marzyć o managed-by-exception orchestration, upewnij się, że masz co weryfikować automatycznie. Bo bez tego "exception" będzie zdarzać się za każdym razem.

**Link:** [Agentic Autonomy Levels](https://addyo.substack.com/p/agentic-autonomy-levels)
