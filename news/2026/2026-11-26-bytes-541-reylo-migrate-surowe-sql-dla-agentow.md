---
title: "Bytes #541: Reylo Migrate, surowy SQL dla agentów i Ladybird w wersji alfa"
excerpt: "Colin McDonnell przenosi modelowanie bazy do schema.sql, a Ladybird, Tidy i Hyper Elements pokazują, że ekosystem JS wciąż się rozrasta."
publishedAt: "2026-11-25"
slug: "bytes-541-reylo-migrate-surowe-sql-dla-agentow"
hashtags: "#bytes #uidev #javascript #typescript #database #agents #open-source #generated #pl"
source_pattern: "ui.dev"
---

## Reylo Migrate: nie karm agentów DSL-em, daj im surowy SQL

**TLDR:** Colin McDonnell, autor zod i tRPC, wypuścił Reylo Migrate. Cały schemat bazy opisuje się w jednym pliku schema.sql, a migracje są sprawdzane przed zastosowaniem. Teza: DSL ORM-a utrudnia pracę agentom, a surowy SQL jest dla nich naturalny.

**Summary:** Autor Bytes zaczyna od anegdoty o zagłodzonym Tamagotchi siostry i dopiero potem przechodzi do rzeczy. Colin McDonnell od lat pracuje nad granicą między klientem a serwerem, czyli tym, co w JavaScripcie boli najbardziej. Reylo przenosi to samo podejście na warstwę bazy danych. Narzędzie opiera się na nowej funkcji TypeScripta, tak zwanych content mapperach, która pozwala wnioskować typy bezpośrednio z surowego SQL i pisać zapytania z kontrolą typów. Reylo Migrate zajmuje się drugą stroną równania: cały model bazy opisuje się deklaratywnie w pliku schema.sql.

Według autora daje to trzy rzeczy. Po pierwsze, pełną moc SQL. ORM-y każą ręcznie dopisywać wyzwalacze i polityki do migracji, gdzie łatwo o nich zapomnieć, a ich DSL ogranicza to, co w ogóle da się wyrazić. Tu indeksy, wyzwalacze, widoki i rozszerzenia mieszkają w jednym źródle prawdy. Po drugie, kontrole przed wdrożeniem: migracja jest uruchamiana na bazie cieniu, a wynik porównywany ze schema.sql. Narzędzie wymaga też jawnej zgody przy operacjach, które usuwają dane albo blokują tabelę. Po trzecie, opcjonalny plik reylo.lock utrzymuje stałą kolejność migracji, więc dwa pull requesty zmieniające schemat kończą konfliktem w gicie, a nie kolizją na produkcji.

Wniosek autora jest odważny: McDonnell miał napisać, że modelowanie bazy w DSL-u „okalecza agentów", co ma być gwoździem do trumny dla ORM-ów w TypeScripcie finansowanych przez fundusze. To jest opinia, nie wynik pomiaru. Nikt tu nie pokazał, że agenty rzeczywiście radzą sobie gorzej z Prismą czy Drizzle niż z gołym SQL.

W części Cool Bits pojawia się szereg drobniejszych rzeczy. Luke Edwards zbudował Tidy, formatter w stylu Prettiera napisany w Ruście. Powstał plugin oxlint o nazwie slimdeer, który znajduje w repozytorium obrazy możliwe do zmniejszenia bez utraty jakości i sam je poprawia. Hyper Elements to zestaw komponentów Reacta renderowanych do PDF-a, maila, obrazu albo DOM. Ladybird, przeglądarka z całkiem nowym silnikiem w C++ i Rust, jest już w wersji alfa. Emdash CMS dobił do wersji 1.6, a Stately dopisało dokumentację testowania opartego na modelu. W numerze są też reklamy, między innymi Oracle, Apify, LaunchDarkly i Meticulous, które pominąłem. Zagadka tygodnia dotyczyła tego, że operatora ?? nie wolno mieszać z && bez nawiasów.

**Key takeaways:**
- Reylo Migrate opisuje całą bazę w jednym pliku schema.sql.
- Migracje przechodzą kontrolę na bazie cieniu i wymagają zgody przy usuwaniu danych.
- Plik reylo.lock zamienia kolizje migracji na konflikty w gicie.
- Teza o szkodliwości DSL-i dla agentów to na razie opinia, bez danych.
- Ladybird jest w alfie na macOS i Linuksa.

**Why do I care:** Kolejność migracji i bezpieczeństwo operacji destrukcyjnych to realne bolączki zespołów, niezależnie od agentów, więc lock i baza cień warto obejrzeć. Argument o agentach przyjmuję ostrożnie: model radzi sobie z SQL, bo ma go w danych treningowych, ale to nie dowodzi, że ORM mu przeszkadza. Autor omija pytanie, kto utrzymuje to narzędzie za dwa lata i co się dzieje z typami, gdy schemat jest długi.

**Link:** [Bytes #541](https://bytes.dev/archives/541)
