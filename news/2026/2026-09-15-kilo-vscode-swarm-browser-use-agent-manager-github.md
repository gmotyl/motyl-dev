---
title: "Kilo dla VS Code dogaduje agenty ze sobą, otwiera przeglądarkę i wciąga status PR-a do edytora"
excerpt: "Trzy nowe funkcje w rozszerzeniu Kilo do VS Code: agenty wymieniają się wiadomościami przez współdzieloną tablicę, sterują prawdziwą przeglądarką bez konfiguracji, a Agent Manager pokazuje status pull requesta wprost w panelu."
publishedAt: "2026-09-15"
slug: "kilo-vscode-swarm-browser-use-agent-manager-github"
hashtags: "#kilo #ai #vscode #devtools #generated #pl"
source_pattern: "Kilo"
---

## Kilo Swarm daje agentom współdzieloną tablicę wiadomości

**TLDR:** Rozszerzenie Kilo dla VS Code dostało trzy nowe funkcje naraz, Swarm pozwala agentom pracującym równolegle wymieniać się wiadomościami w trakcie zadania, Browser Use pozwala agentowi sterować prawdziwą przeglądarką bez żadnej dodatkowej konfiguracji, a Agent Manager wciąga status pull requesta z GitHuba wprost do panelu edytora.

**Summary:** Przed Swarmem agenty pracujące równolegle nad powiązanymi fragmentami zadania nie miały jak przekazać sobie nawzajem, co odkryły, dopóki całe zadanie się nie skończyło. Po włączeniu w ustawieniach (sekcja Experimental) agenty dostają dwa narzędzia, `board_post` zapisuje wiadomość, `board_read` odczytuje, co jest na tablicy. Jeśli poprosicie Kilo o zbudowanie solidnego zestawu API, zadanie rozbija się na subtaski i rozdziela do subagentów, jeden może pracować nad wzorcem autoryzacji i opisać postęp na tablicy, drugi może przeczytać ten wpis, zanim napisze choć jeden test, zamiast samodzielnie odkrywać to samo od zera. Wiadomość na tablicy to dane koordynacyjne, nie sygnał sterujący, wiadomości HOLD i VETO są tylko doradcze i nie zatrzymują ani nie anulują działającego agenta, a każdy uczestnik widzi całą historię tablicy, więc adresowanie wiadomości do konkretnego agenta nie jest granicą prywatności. Wczesne wewnętrzne ewaluacje wskazują też na oszczędność tokenów, bo dzielenie się ustaleniami przez tablicę ograniczyło duplikowanie pracy, które i tak odpowiada za większość dodatkowego zużycia tokenów przy więcej niż jednym czy dwóch subagentach na tym samym zadaniu.

Browser Use włącza się jednym przełącznikiem w Settings, bez żadnej dodatkowej konfiguracji, i pozwala poprosić agenta, żeby otworzył localhost:3000, sprawdził czy stopka renderuje się poprawnie, albo przeszedł przez flow rejestracji, zwracając screenshot po każdym kroku, zanim poprosicie o kolejną akcję. To prostsze niż inne narzędzia przeglądarkowe, jak te w Cursorze, brak trwałej sesji między restartami edytora i brak generowania zestawu testów z nagranej sesji, za to nie trzeba niczego instalować ani konfigurować osobno, żeby sprawdzić, czy strona teraz wygląda dobrze. Agent Manager z kolei pokazuje na worktree badge ze statusem PR-a (Kilo wykrywa go przez `gh`, więc trzeba być zalogowanym do GitHub CLI), a kliknięcie otwiera pełny panel, gotowość do merge'a, checki z licznikiem pass/fail, recenzentów i nierozwiązane wątki komentarzy z akcją "przejdź do miejsca w kodzie". Przycisk "Fix with Kilo" wysyła wątek albo log z nieudanego checka wprost do aktualnego agenta jako kontekst, bez ręcznego kopiowania.

**Key takeaways:**
- Swarm daje agentom współdzieloną tablicę wiadomości (`board_post`/`board_read`), ale to tylko koordynacja, nie kontrola, HOLD i VETO nie zatrzymują działającego agenta.
- Browser Use włącza się jednym przełącznikiem i nie wymaga konfiguracji, kosztem braku trwałej sesji między restartami i braku generowania testów z nagranej sesji.
- Agent Manager pokazuje status PR-a (checki, recenzentów, nierozwiązane wątki) wprost w edytorze i pozwala wysłać feedback recenzenta do agenta jednym kliknięciem przez "Fix with Kilo".

**Why do I care:** Współdzielona tablica między subagentami rozwiązuje realny problem, każdy kto uruchamiał kilka agentów równolegle nad jednym zadaniem widział, jak duplikują sobie tę samą pracę odkrywczą. Ważniejsze niż sama funkcja jest zastrzeżenie, że to nie jest mechanizm kontroli, wiadomości HOLD czy VETO nic nie blokują, więc jeśli potrzebujecie twardego zatrzymania agenta, musicie to zbudować gdzie indziej, nie polegać na tablicy.

**Link:** [New in Kilo for VS Code: Swarm, Browser Use, and GitHub in Agent Manager](https://blog.kilo.ai/p/swarm)
