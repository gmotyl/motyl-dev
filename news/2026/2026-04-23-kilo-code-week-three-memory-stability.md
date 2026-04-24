---
title: "Kilo Code — Tydzień 3: Pamięć, stabilność i Kilo Speed"
excerpt: "Kilo Code rozszerzenie dla VS Code w wersji 7.2.20 — naprawiono problemy z pamięcią na Windows, poprawiono stabilność sesji i dodano nowe funkcje."
publishedAt: "2026-04-23"
slug: "kilo-code-week-three-memory-stability"
hashtags: "#ai #vscode #kilo #developer-tools #generated #pl"
source_pattern: "Substac"
---

## Kilo Code — Tydzień 3: Pamięć, stabilność i Kilo Speed

**TLDR:** Trzeci tydzień po GA całkowicie przebudowanego rozszerzenia Kilo Code dla VS Code. Naprawiono najbardziej bolesne problemy: zużycie pamięci na Windows (spadek z wielu GB do正常使用) i stabilność sesji podczas długotrwałego użytkowania. W ciągu tygodnia wypchnięto 80+ PRów i zmergowano trzy kolejne upstream releases OpenCode.

**Summary:** Kilo Code to rozszerzenie do VS Code stworzone przez Kilo.ai, które oferuje agentic coding experience. Trzeci tydzień po oficjalnym release był poświęcony dwóm obszarom, które użytkownicy zgłaszali najczęściej: pamięci na Windows i stabilności sesji przy dłuższym używaniu. Oba obszary są teraz znacząco lepsze niż tydzień temu, choć żaden nie jest w 100% naprawiony. Problem z pamięcią na Windows był spowodowany tym, że Agent Manager pollował git status i diffy przez Kilo core subprocess, a na Windows kombinacja IPC round-trips, rozmiarów payloadów diff i zachowania allocatora oznaczała, że zwolniona pamięć nie była oddawana OS czysto. W v7.2.20 przebudowano tę ścieżkę: teraz git work w Agent Manager działa bezpośrednio w extension host, nie przez core process. Dodano również cap na to, ile pojedynczego diffa wczyta do pamięci, więc otwieranie bardzo dużego pliku nie powoduje już spiku którego allocator nie może odzyskać. Drugi główny problem — sesje przerywane w połowie — najczęściej występował gdy VS Code był zamykany podczas gdy prompt suggestion był nadal wyświetlany, co zostawiało sesję trwale oznaczoną jako busy. Teraz sesje poprawnie przechodzą w idle podczas oczekiwania na odpowiedź suggestion.

**Key takeaways:**
- Memory na Windows: Agent Manager git work przeniesiony z core do extension host
- Diff capping: duże pliki nie powodują już memory spikes
- Sesje nie utknają już przy zamykaniu VS Code podczas suggestion prompt
- Fork sessions z dowolnego user message — rób branch bez utraty oryginału
- KiloClaw chat panel bezpośrednio w edytorze
- Folder @-mentions — reference folder z @ i włącz top-level file contents jako kontekst
- Autocomplete prewarm — inline completions gotowe na pierwszym keystroke

**Why do I care:** Jako developer używający Cursor codziennie, obserwuję ten sam wzorzec: agentic coding tools mają tendencję do memory leaks i niestabilności przy dłuższym używaniu. Kilo Code pokazuje że te problemy są rozwiązywalne — wystarczy inwestycja w engineering time. Szczególnie podoba mi się direction: Kilo nie jest jednym toolem do wszystkiego, ale platformą z której można forkować sesje, switchować między trybami, i mieć real control nad tym jak agenci pracują. Dla teamów, to jest value proposition: możesz mieć wielu agentów working w parallel przez Agent Manager, albo pair programming mode gdy potrzebujesz closer supervision. Ciekawy jestem też wkładu community — @IamCoder18 dodał visibility-aware git polling, a @shssoichiro pracuje nad codebase indexing. To pokazuje że ecosystem wokół agentic coding tools się rozwija i developerzy chcą w tym uczestniczyć.

**Link:** [New VS Code Extension - Week Three](https://blog.kilo.ai/p/new-vs-code-week-three?publication_id=4363009&post_id=195223597&isFreemail=true&triedRedirect=true)