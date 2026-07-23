---
title: "Kilo Memory: pamięć projektowa dla agentów kodujących, wreszcie bez MCP"
excerpt: "Kilo wprowadza lokalną, projektową pamięć dla swoich agentów, która ma skończyć z ciągłym odkrywaniem od zera tego samego kontekstu repozytorium."
publishedAt: "2026-07-23"
slug: "kilo-memory-pamiec-projektowa-agentow"
hashtags: "#kilo #ai #agents #devtools #cli #generated #pl"
source_pattern: "Kilo"
---

## Kilo Memory: pamięć projektowa dla agentów kodujących, wreszcie bez MCP

**TLDR:** Kilo wprowadza lokalną, projektową pamięć dla swoich agentów, dzięki której sesje w CLI, VS Code i GitHub przestają zaczynać od zera przy każdym uruchomieniu. Pamięć jest przechowywana na dysku poza repozytorium, obejmuje digesty sesji, konfigurację projektu i poprawki użytkownika, a decyzję o tym co zapamiętać podejmuje osobny krok konsolidacji.

**Summary:** Historia otwierająca ten wpis jest znajomym doświadczeniem każdego, kto pracował z agentami dłużej niż jedno popołudnie. Inżynier Kilo spędza sesję na debugowaniu, w końcu znajduje przyczynę, sesja wygasa, a nowa natychmiast próbuje dokładnie tego rozwiązania, które już wcześniej odrzucił. To nie jest anegdota o pechu, to opis fundamentalnej wady architektury, w której każda sesja agenta jest tabula rasa. Agent musi na nowo odczytywać strukturę projektu, konfigurację testów, pipeline deploymentu, i nie wie, że preferujesz vitest nad jest albo że katalog packages/core ma cykliczną zależność, z którą ktoś od miesięcy prowizorycznie sobie radzi.

Ciekawe jest zdanie o czterech równoległych powierzchniach pracy: sesja CLI refaktoryzująca moduł, zakładka Agent Managera w VS Code odpalająca testy, inna sesja robiąca review PR, agent w GitHubie naprawiający bug w powiązanym serwisie. Wszystkie w tym samym repo, żadna nie dzieli kontekstu z pozostałymi. To dobrze pokazuje, że problem pamięci agentów nie jest kwestią jednej sesji, tylko koordynacji między wieloma równoległymi instancjami tego samego agenta pracującymi na tym samym kodzie. Mnożąc to przez cały zespół, dostajemy sytuację, w której znaczna część okna kontekstowego jest marnowana na samo zorientowanie się, co się właściwie dzieje.

Rozwiązaniem ma być Kilo Memory, lokalny, przypisany do projektu system pamięci. Każde repozytorium dostaje własny, izolowany magazyn pamięci (ścieżka oparta o hash ścieżki repo), a przechowywane są cztery kategorie: digesty ostatnich dziesięciu sesji, kontekst środowiska projektu, poprawki użytkownika w stylu „nie, nie używamy tej biblioteki” oraz jawne polecenia zapamiętania czy zapomnienia czegoś przez komendę /memory. Odzyskiwanie kontekstu działa na trzech poziomach: wstrzyknięcie przy starcie sesji, wykrywanie że bieżący prompt wygląda na powiązany z zapamiętaną wiedzą, oraz jawne wywołanie narzędzia kilo_memory_recall z trybami search, typed, digest i catalog.

Najciekawszą decyzją projektową jest krok konsolidacji, czyli filtr decydujący, co w ogóle warto zapisać. Większość rzeczy jest odrzucana. To ważne, bo naiwne zrzucanie wszystkiego do rosnącego bloba tekstu prowadzi dokładnie do tego samego problemu, który pamięć miała rozwiązać, czyli do zapychania kontekstu szumem zamiast sygnałem. Sama struktura magazynu (pliki pamięci, sesje, indeks wyszukiwania) jest prosta i deklaratywnie opisana, co dobrze wróży debugowaniu, gdy coś zacznie się psuć.

Autor porównuje Kilo Memory do Engrama (SQLite), Continuum (oparty o MCP), Kairo (skanuje repo raz i zapamiętuje architekturę) oraz mem0 (zarządzana usługa pamięci), po czym stwierdza, że wszystkie te rozwiązania wymagają osobnej konfiguracji i podłączenia przez MCP, podczas gdy Kilo Memory jest wbudowane. To argument marketingowo wygodny, ale trzeba go czytać ostrożnie: brak MCP oznacza też brak przenośności. Pamięć zbudowana wewnątrz jednego narzędzia nie przeniesie się, gdy zespół zmieni agenta albo zacznie używać kilku narzędzi równolegle, a to dziś jest raczej regułą niż wyjątkiem. Sam artykuł uczciwie przyznaje zresztą, że jakość konsolidacji dopiero dojrzewa, wsparcie wielojęzyczne jest niedopracowane, a testów adwersarialnych pod kątem fałszywych trafień, przestarzałych faktów i pominiętych trafień jeszcze nie przeprowadzono porządnie. To akurat solidna dawka szczerości jak na ogłoszenie nowej funkcji, ale warto zauważyć, że temat prompt injection zbywany jest jednym zdaniem, mimo że wstrzykiwanie zapamiętanego, niekontrolowanego tekstu prosto do kontekstu modelu to dokładnie ten wektor ataku, który w tej klasie narzędzi bywa najbardziej dotkliwy w praktyce, nie w teorii.

Osobna kwestia, którą tekst traktuje niemal na marginesie: pamięć nie jest wersjonowana ani współdzielona z zespołem przez Git, bo żyje poza repozytorium w globalnym katalogu danych Kilo. To rozwiązuje jeden problem (współdzielenie między worktree'ami tego samego użytkownika) kosztem drugiego, ważniejszego dla pracy zespołowej: wiedza „nie używamy tej biblioteki” albo „ta zmienna środowiskowa jest wymagana lokalnie” zostaje uwięziona na dysku jednej osoby. Jeśli to naprawdę ma być pamięć projektu, a nie pamięć użytkownika, brak mechanizmu współdzielenia jest dość poważnym ograniczeniem, które łatwo przeoczyć, czytając entuzjastyczny opis funkcji.

**Key takeaways:**
- Kilo Memory zapisuje digesty sesji, konfigurację środowiska projektu, poprawki użytkownika i jawne polecenia zapamiętania, filtrowane przez osobny krok konsolidacji.
- Odzyskiwanie kontekstu działa trójwarstwowo: wstrzyknięcie przy starcie, wykrywanie trafności promptu oraz jawne wywołanie narzędzia recall.
- Funkcja jest wbudowana bez potrzeby konfigurowania MCP, w odróżnieniu od Engrama, Continuum, Kairo czy mem0, ale kosztem przenośności między narzędziami.
- Pamięć żyje lokalnie poza repozytorium i nie jest wersjonowana w Git, więc nie da się jej łatwo współdzielić z resztą zespołu.
- Autorzy sami przyznają, że jakość konsolidacji, wsparcie wielojęzyczne i odporność na prompt injection są jeszcze niedopracowane, funkcja jest w pełni opcjonalna i można ją wyłączyć jednym przełącznikiem.

**Why do I care:** Z perspektywy kogoś, kto ustawia agentów kodujących w wielu równoległych sesjach na tym samym repozytorium, problem opisany na wstępie jest bolesny każdego dnia, więc sam kierunek jest słuszny. Jednak jako architekt patrzyłbym na to narzędzie z rezerwą do czasu, aż ktoś przetestuje je adwersarialnie, bo pamięć, która wstrzykuje niekontrolowany tekst do kontekstu modelu, to potencjalna furtka na prompt injection, a brak wersjonowania w Git oznacza, że taka pamięć nigdy nie stanie się częścią wspólnej dokumentacji zespołu, tylko prywatnym, nieaudytowalnym stanem na czyimś laptopie.

**Link:** [Introducing Kilo Memory: Project-Scoped Memory for Your Agents](https://blog.kilo.ai/p/introducing-kilo-memory?publication_id=4363009&post_id=207930678)
