---
title: "The AI Break: darmowy kalkulator zbierający leady zbudowany w Claude Code"
excerpt: "Tutorial o budowie studia kalkulatorów leadowych w Claude Code z siedmiu połączonych promptów."
publishedAt: "2026-10-28"
slug: "ai-break-kalkulator-leadow-claude-code"
hashtags: "#theaibreak #ai #agents #prompt-engineering #productivity #generated #pl"
source_pattern: "The AI Break"
---

## Darmowy kalkulator, który przynosi leady, zbudowany w Claude Code

**TLDR:** Zamiast PDF-a jako lead magnetu budujesz kalkulator, który mówi odwiedzającemu jego własną liczbę i zbiera adresy e-mail. Całość to siedem połączonych promptów w jednym projekcie Claude Code, mniej więcej godzina pracy.

**Summary:** Punkt wyjścia jest prosty. PDF się pobiera i zapomina, a kalkulator, który mówi komuś jego liczbę, jest używany, dodawany do zakładek i wysyłany koledze. Studio działa w jednym projekcie Claude Code i prowadzi przez etapy: brief, wybór pytania, specyfikację, budowę, test, zbieranie e-maili i publikację.

Pierwszy prompt tworzy plik CLAUDE.md z opisem biznesu, kupującego, oferty i marki. Zapisuje też twarde reguły, między innymi zakaz wymyślania liczb, żeby każda liczba na stronie pochodziła od odwiedzającego albo z jawnego, edytowalnego założenia. Liczby użytkownika nie opuszczają przeglądarki, a wysyłany jest tylko e-mail, który ktoś sam poda. Całość to jeden plik HTML bez frameworków i bez kroku budowania.

Drugi prompt proponuje pięć kalkulatorów różnych typów, czyli kosztu, straty, zwrotu i gotowości, i ocenia je w skali od 1 do 5. Trzeci etap zapisuje matematykę w pliku po zwykłym angielsku, z domyślnymi wartościami, minimami, maksimami i trzema przykładami do sprawdzenia na telefonie. Błąd w matematyce jest gorszy niż brak kalkulatora, więc łapie się go, zanim powstanie kod.

**Key takeaways:**
- Kalkulator wygrywa z PDF-em, bo daje wynik osobisty.
- Reguła "żadnych wymyślonych liczb" jest zapisana w pliku projektu raz.
- Specyfikację matematyki sprawdzasz, zanim cokolwiek zostanie zakodowane.
- Najlepsze pytania to te, które kupujący zadaje tuż przed zakupem.

**Why do I care:** Dla programisty to dobry przykład, jak zapisać ograniczenia w CLAUDE.md i rozbić pracę agenta na etapy. Sam tutorial jest jednak adresowany do właścicieli małych firm, a ja widzę tu lukę. Nic nie mówi o tym, kto weryfikuje wynik końcowy, gdy model "testuje własną matematykę", a samokontrola agenta bywa słaba.

**Link:** [Tutorial: Build a Free Calculator That Brings You Leads With Claude Code](https://theaibreak.substack.com/p/tutorial-build-a-free-calculator?publication_id=1842292&post_id=221788935&isFreemail=true&triedRedirect=true)
