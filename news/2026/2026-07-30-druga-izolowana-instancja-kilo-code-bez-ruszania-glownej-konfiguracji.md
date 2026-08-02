---
title: "Druga, izolowana instancja Kilo Code: jak nie namieszać w głównej konfiguracji"
excerpt: "Kilo Code trzyma providerów i klucze w jednym globalnym miejscu, więc odizolowanie drugiej instancji wymaga przeniesienia dwóch katalogów naraz, a nie jednego."
publishedAt: "2026-07-30"
slug: "druga-izolowana-instancja-kilo-code-bez-ruszania-glownej-konfiguracji"
hashtags: "#kilo #ai #agents #devtools #dx #cli #vscode #konfiguracja #generated #pl"
source_pattern: "Kilo"
---

## Druga, izolowana instancja Kilo Code: jak nie namieszać w głównej konfiguracji

**TLDR:** Kilo Code, niezależnie czy uruchamiasz je z CLI, z rozszerzenia VS Code czy z JetBrains, czyta providerów i klucze z tego samego miejsca w katalogu domowym. Żeby uruchomić drugą, w pełni odizolowaną instancję, trzeba przenieść zarówno konfigurację, jak i dane uwierzytelniające, bo przeniesienie samej konfiguracji zostawia wspólne klucze.

**Summary:** Artykuł zaczyna od rzeczy, która brzmi jak drobiazg, a w praktyce psuje ludziom dzień: Kilo trzyma dwa oddzielne katalogi, jeden na konfigurację w `~/.config/kilo`, drugi na dane uwierzytelniające w `~/.local/share/kilo`. Ten drugi katalog honoruje zmienną `XDG_DATA_HOME`, ten pierwszy `XDG_CONFIG_HOME`, i jest jeszcze osobna zmienna `KILO_CONFIG_DIR`, która przenosi wyłącznie konfigurację. Autor od razu punktuje najczęstszy błąd: ktoś ustawia `KILO_CONFIG_DIR`, myśli że ma drugą instancję, a tak naprawdę druga instancja nadal czyta ten sam plik `auth.json` co pierwsza, bo dane uwierzytelniające w ogóle się nie przeniosły. To jest dokładnie ten typ pułapki, który wygląda na rozwiązane, dopóki ktoś nie wpisze tam klucza do konta klienta i nie odkryje po fakcie, że obie instancje dzielą dostęp.

Rozwiązanie jest proste na papierze: ustawić jednocześnie `XDG_CONFIG_HOME` i `XDG_DATA_HOME` na inne ścieżki, najlepiej owinąć to w alias w powłoce, i mieć dwa niezależne środowiska uruchamiane z dwóch terminali. Da się też skopiować istniejący `~/.config/kilo` i `~/.local/share/kilo` do nowej lokalizacji zamiast zaczynać od zera, choć autor słusznie zaznacza, że kopiowanie `auth.json` to kopiowanie żywych sekretów i trzeba traktować ten katalog dokładnie tak, jak traktuje się plik z hasłami, a nie jak zwykły backup konfiguracji.

Ciekawszy jest fragment o rozszerzeniu do VS Code, bo tam intuicja większości ludzi jest błędna. Osobna instalacja VS Code Insiders, nawet z własnym `--user-data-dir` i `--extensions-dir`, nie daje żadnej izolacji providerów, bo rozszerzenie uruchamia wbudowany runtime, który i tak czyta te same dwa pliki w katalogu domowym, niezależnie od flag samego edytora. Innymi słowy, VS Code myśli, że ma osobne środowisko, a Kilo w środku i tak sięga do wspólnego źródła prawdy. Jedyny sposób, żeby to zmienić, to uruchomić edytor z terminala, w którym zmienne środowiskowe są już wyeksportowane, bo start z Docka czy Spotlight po prostu nie przekaże tych zmiennych dalej i całość po cichu wróci do współdzielonej konfiguracji. Autor dorzuca też ostrzeżenie o zmiennej `KILO_SERVER_USERNAME`, która potrafi zablokować rozszerzenie w stanie wiecznego łączenia się z serwerem, jeśli ktoś ustawi ją niespójnie z tym, czego oczekuje spawnowany backend.

Dla większości zespołów bardziej praktyczne niż osobne konta jest konfiguracja per-projekt w pliku `.kilo/kilo.jsonc`, którą Kilo scala warstwowo z konfiguracją globalną, z konfiguracją zdalną i z konfiguracją zarządzaną przez organizację, przy czym ta ostatnia zawsze wygrywa. To pozwala trzymać w repozytorium spójne ustawienia modelu, uprawnień i reguł dla wszystkich w zespole, a klucze odwoływać przez zmienne środowiskowe zamiast wklejać je wprost do pliku, dzięki czemu sam plik konfiguracyjny jest bezpieczny do commitowania. Autor uczciwie przyznaje przy okazji, że skille projektowe w `.kilo/skills/` mają obecnie błąd, przez który globalna wersja wygrywa z lokalną wbrew dokumentacji, co akurat rzadko się widzi w materiałach promocyjnych produktu.

Ostatnia, najcięższa opcja to uruchomienie Kilo jako inny użytkownik systemu operacyjnego, co daje pełną izolację kosztem drugiej sesji desktopowej, dwóch edytorów i dwóch kompletów language serverów działających naraz. Autor kończy sekcją, która w gruncie rzeczy jest przeprosinami za brak funkcji: nie ma przełącznika kont wewnątrz jednej sesji, bo próba zbudowania jednego rozwiązania dla freelancera, pracownika korporacji i hobbysty psułaby doświadczenie każdemu z nich, więc na razie odpowiedzią są konta zespołowe dla firm i ręczna izolacja przez zmienne środowiskowe dla wszystkich innych.

**Key takeaways:**
- Przeniesienie samej konfiguracji nie izoluje kluczy, trzeba jednocześnie przenieść `XDG_CONFIG_HOME` i `XDG_DATA_HOME`, bo dane uwierzytelniające trzymane są osobno w `auth.json`.
- Osobna instalacja VS Code czy Insiders nie izoluje providerów Kilo, bo wbudowany runtime i tak czyta wspólne pliki w katalogu domowym niezależnie od flag edytora.
- Konfiguracja projektowa w `.kilo/kilo.jsonc` rozwiązuje problem różnego zachowania na repozytorium, ale nie przechowuje osobnych danych logowania, więc to rozdzielenie zachowania, a nie kont.
- Każda z opisanych metod izolacji zawodzi po cichu, a nie głośno, więc warto zawsze weryfikować faktyczne ścieżki komendą `kilo debug paths`.

**Why do I care:** Z perspektywy kogoś, kto ustawia narzędzia AI dla całego zespołu, ten artykuł jest bardziej wartościowy jako przyznanie się do długu produktowego niż jako poradnik. To, że jedyna droga do prawdziwej izolacji kont to zmienne środowiskowe, kopiowanie plików z sekretami albo osobny użytkownik systemowy, pokazuje, że Kilo zaprojektowano z założeniem jednego użytkownika i jednego konta, a wielokontowość doklejono później przez obejścia. Skoro autor sam mówi, że każda metoda zawodzi cicho, to jest to sygnał, żeby przed powierzeniem takiemu setupowi klucza produkcyjnego czy klienckiego zawsze zweryfikować ścieżki ręcznie, a nie ufać, że alias w shellu zadziała tak, jak się wydaje.

**Link:** [Run a second, isolated Kilo Code without touching your main setup](https://blog.kilo.ai/p/run-a-second-isolated-kilo-code-without?publication_id=4363009&post_id=208331571&isFreemail=true&triedRedirect=true)
