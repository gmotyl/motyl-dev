---
title: "Jak strukturuję CLAUDE.md po 1000+ sesjach"
excerpt: "Autor przez 10 miesięcy iterował nad swoim CLAUDE.md — od 3 linii do 471, z powrotem do 61. Oto co naprawdę działa."
publishedAt: "2026-04-23"
slug: "how-structure-claude-md-1000-sessions"
hashtags: "#ai #claude #prompt-engineering #developer-tools #workflow #generated #pl"
source_pattern: "Substac"
---

## Jak strukturuję CLAUDE.md po 1000+ sesjach

**TLDR:** Po 1000+ sesjach z Claude Code, autor przeszedł przez trzy rewizje swojego CLAUDE.md. Od 3 linii, przez 471 (błąd), do 61 linii które faktycznie działają. Kluczowe odkrycie: CLAUDE.md to nie prompt, to routing layer. Zasady działają lepiej niż reguły, a encyklopedia należy do reference docs, nie do głównego pliku.

**Summary:** Pierwszy CLAUDE.md autora miał trzy linie: "You are a helpful assistant. Be concise. Help with code." To było dziesięć miesięcy temu. Dzisiejszy ma 61 linii — w dół z 471. Agent używający tego pliku zbudował aplikacje, deployował do produkcji, pisał blog posty i prowadził autonomiczne overnight sessions bez nadzoru. Większość tych oryginalnych 471 linii istniała bo autor napisał złą wersję pierwszą. Większość cięć przyszła w tym tygodniu, gdy wreszcie zrozumiał do czego CLAUDE.md faktycznie służy. Pierwszy błąd: traktowanie CLAUDE.md jako prompt. Prompt to co piszesz gdy chcesz konkretny output. CLAUDE.md jest bliższy definicji roli — zasady engagement dla każdej sesji, każdego tasku, każdego edge case który możesz przewidzieć. Drugi błąd: traktowanie obu plików jako encyklopedii zamiast routing layers. Global file (~/.claude/CLAUDE.md) odpowiada na pytanie "kim agent jest", project file odpowiada "co agent tu robi". Trzeci błąd: 471-liniowy plik. Każda linia którą dodajesz to linia którą agent musi sparsować, zważyć, i potencjalnie skonfliktować z innymi liniami.

Po wszystkich iteracjach, global CLAUDE.md zawiera: Working With Me (kim jest autor, jak myśli, czego potrzebuje, ADHD, styl pracy, preferencje komunikacji), Decision Rules (cztery tiebreakers dla ambiguowych sytuacji: Action over asking, Concise over verbose, Automation over manual, Execute first refine later), Core Behaviors (non-negotiables: exhaust all options before asking, give real opinions not pros/cons, confirm before irreversible external actions, never mark work complete without running it), Self-Extension and Self-Fixing (jak agent rośnie, kiedy tworzyć nowe skills, kiedy logować errors), Auto-Learning (jak agent zapisuje preferencje).

Zasady które produkują consistent results po 1000+ sesjach: Principle beats rule — "Prefer reversible actions" działa lepiej niż lista zakazanych komend. Show don't tell — "Before claiming work is complete, run it and show me output" jest lepsze niż "be thorough." Explicit failure modes — powiedz agentowi co robić gdy coś pójdzie nie tak. Tiered autonomy — różne typy akcji mają różne reguły. Reading files: always autonomous. Editing files: autonomous for reversible. Pushing code: confirm. Deleting data: always confirm. Lean core, deep references — trzymaj CLAUDE.md do rzeczy które aplikują się w każdej sesji. Wszystko inne do named reference files.

**Key takeaways:**
- CLAUDE.md to routing layer, not encyclopedia
- 471 linii to problem, nie feature
- Zasady (principles) działają lepiej niż reguły (rules)
- Explicit failure modes > improvisowany error handling
- Tiered autonomy: read/edit/push/delete = różne poziomy zgody
- Reference docs ładuj kiedy potrzebujesz, nie na start każdej sesji

**Why do I care:** Jako ktoś kto używa AI assistants codziennie, widzę dokładnie ten pattern. Mój CLAUDE.md też urósł zbyt duży, zaczął być contradictive, i agent robił rzeczy które nie do końca chciałem. Odkrycie że CLAUDE.md powinien być routing layer, nie encyklopedia, jest game-changerem. Szczególnie podoba mi się koncepcja tiered autonomy — różne poziomy dla różnych akcji to właściwie to czego potrzebuję w mojej pracy. Kto chce żeby agent pytał o zgodę przed przeczytaniem pliku? Ale zdecydowanie chcę potwierdzenia przed force-push do git. Ta rozróżniona autonomia to jest to czego szukam. Druga rzecz: "principle beats rule" — to jest insight który rezonuje. Zamiast listy "nie rób X, nie rób Y", lepiej mieć zasadę "preferuj odwracalne akcje" i pozwolić agentowi generalizować. Finally, to że ta sama CLAUDE.md z tańszym modelem często przewyższa droższy model bez instructions — to jest argument żeby inwestować w instruction design zamiast w droższe modele.

**Link:** [How I Structure CLAUDE.md After 1000+ Sessions](https://thoughts.jock.pl/p/how-i-structure-claude-md-after-1000-sessions)