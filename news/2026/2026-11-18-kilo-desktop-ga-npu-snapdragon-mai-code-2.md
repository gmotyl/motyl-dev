---
title: "Kilo: Desktop w wersji GA, lokalne modele na NPU Snapdragona i MAI Code 2"
excerpt: "Kilo Desktop jest już ogólnie dostępny, działa z lokalnymi modelami na NPU Snapdragona X2 Elite, a modele MAI Code 2 trafią do Kilo w prywatnym podglądzie."
publishedAt: "2026-11-17"
slug: "kilo-desktop-ga-npu-snapdragon-mai-code-2"
hashtags: "#kilo #ai #agents #devtools #llm #dx #productivity #generated #pl"
source_pattern: "Kilo"
---

## Kilo Desktop jest ogólnie dostępny

**TLDR:** Kilo Desktop wyszedł z bety. To jedna aplikacja do uruchamiania wielu agentów naraz na wielu repozytoriach, z wbudowanym przeglądem diffów i notebookami.

**Summary:** Teza twórców jest taka, że wąskim gardłem przestało być pisanie kodu, a stało się nim śledzenie tego, co robią agenci. Każde zadanie ma własną sesję ze statusem: pracuje, wymaga zgody, wymaga danych albo nieprzeczytane. Tablica workspace'u działa jak kanban dla agentów. Sesje można odpalać w osobnych git worktree, więc agenci nie walczą o ten sam plik, a workspace obejmuje kilka folderów naraz, na przykład frontend, API i wspólne pakiety.

Tryb Plan czyta projekt i zwraca plan bez dotykania kodu, po zatwierdzeniu Code dzieli go na podzadania dla subagentów. Każda tura czatu jest punktem kontrolnym, więc można cofnąć rozmowę razem ze zmianami w plikach. Jednym kliknięciem można zatwierdzić, wypchnąć i otworzyć pull request z opisem generowanym z diffa. Dostępne jest ponad 500 modeli, router Auto Efficient wybiera najtańszy model sprawdzony na danym typie zadań, a lokalny serwer uruchamia modele GGUF za endpointem zgodnym z OpenAI. Są też agenci edytujący notebooki Jupyter, zarządzanie środowiskami conda i kontrola administratora nad modelami, dostawcami i skillami.

Drugi wpis opisuje lokalne AI na laptopach Snapdragon X2 Elite. NPU Hexagon ma ponad 80 TOPS, a Microsoft Foundry Local serwuje na nim modele takie jak Qwen2.5 Coder 7B czy DeepSeek R1 Distill, przez API zgodne z OpenAI. Kilo Desktop podłącza się do niego jako własny dostawca, a prompty i kod zostają na maszynie. Mniejsze modele sprawdzają się przy wąskich zadaniach: jedna funkcja, jeden test, jeden błąd.

Trzeci wpis zapowiada MAI Code 2 i MAI Code 2 Flash od Microsoftu, pokazane na Ignite, z Kilo jako partnerem startowym. Pierwszy jest do długich zadań obejmujących całe repozytorium, drugi do szybkich edycji i pracy subagentów. Na razie to prywatny podgląd przez Microsoft Foundry.

**Key takeaways:**
- Równoległe sesje w osobnych worktree rozwiązują konflikty między agentami.
- Lokalny model na NPU zostawia kod na laptopie.
- Router modeli wybiera najtańszy model, który poradzi sobie z zadaniem.
- MAI Code 2 jest na razie tylko w prywatnym podglądzie.

**Why do I care:** Zarządzanie agentami jako kolejką zadań ze statusami to realny kierunek pracy zespołów. Pamiętajcie, że to materiał producenta, więc nie ma w nim ani jednego porównania z konkurencją ani liczb o jakości modeli na NPU. Siedmiomiliardowy model lokalnie to zabawka do wąskich zadań, nie zamiennik dużego modelu.

**Link:** [Kilo Desktop Is Generally Available](https://blog.kilo.ai/p/kilo-desktop-is-generally-available)
