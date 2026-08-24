---
title: "Kilo App na telefonie umie teraz zrecenzować i zmergować PR-a z GitHuba"
excerpt: "Aktualizacja aplikacji mobilnej Kilo dodaje pełną recenzję PR-ów GitHuba na telefonie, dyktowanie promptów głosem, wybór konkretnej instancji CLI do uruchomienia sesji i prawdziwy układ tabletowy na iPadzie."
publishedAt: "2026-08-24"
slug: "kilo-app-update-github-pr-review-voice-prompts"
hashtags: "#kilo #agents #github #mobile #devtools #dx #generated #pl"
source_pattern: "Kilo"
---

## Kilo App: recenzja PR-ów, dyktowanie promptów i wybór CLI z telefonu

**TLDR:** Nowa wersja aplikacji mobilnej Kilo (iOS build 149, Android build 150) dodaje pełną recenzję pull requestów GitHuba na telefonie z diffami i komentarzami liniowymi, dyktowanie promptów głosem, możliwość uruchomienia sesji na konkretnej podłączonej instancji CLI oraz prawdziwy układ tabletowy na iPadzie z diffami obok siebie.

**Summary:** Największa zmiana to pełna recenzja PR-a bez opuszczania telefonu: wklejasz albo dotykasz linku do PR-a z GitHuba i dostajesz przegląd, status, pełne diffy plików z podświetlaniem składni, komentarze liniowe zbierane w jedną recenzję, wątki dyskusji z odpowiedziami i reakcjami, oraz kontrolki merge, squash i rebase z auto-mergem. Do tej pory zatwierdzenie PR-a bez komentarzy było niemożliwe z aplikacji, więc najszybsza ścieżka, przeczytaj diff i zatwierdź, była właśnie tą jedną rzeczą, której nie dało się zrobić z telefonu. Teraz jest naprawiona, co brzmi jak drobiazg, dopóki nie przypomnisz sobie, ile razy czekałeś z zatwierdzeniem prostego PR-a do powrotu do laptopa.

Wejście głosowe trafiło zarówno do kompozytora czatu, jak i kompozytora agenta chmurowego: dotykasz mikrofonu, mówisz, co agent ma zrobić, i wysyłasz. Zasobnik „Active now” przypina żywe sesje na górze listy z odznakami NEEDS INPUT, na które można zareagować bezpośrednio, a dwie irytujące usterki zostały naprawione: zasobnik przestał się przetasowywać przy każdym odświeżeniu, a sesje przestały wisieć na NEEDS INPUT godzinami po tym, jak leżący pod spodem CLI już dawno padł. Trzy funkcje dostępne wcześniej tylko na webie trafiły do aplikacji: Code Reviewer dla GitHuba, GitLaba i Bitbucketa z wyborem modelu per repozytorium, Security Agent z dashboardem postawy bezpieczeństwa i ustawieniami polityk, oraz zarządzanie organizacją, członkami, zaproszeniami, rolami, limitami użycia i fakturami.

Zmiana układu na iPadzie jest może najbardziej wymowna: aplikacja przestała być rozciągniętym buildem telefonu, a diffy renderują się obok siebie tak, jak czytałbyś je na desktopie, podczas gdy telefony zachowują widok zunifikowany, bo to właściwa decyzja na wąskim ekranie. Do tego dochodzi seria mniejszych, ale konkretnych napraw: koszty sesji liczone są teraz spójnie między listą a widokiem szczegółów, tabele Markdown zostają otwarte, gdy agent streamuje odpowiedź, powrót do listy agentów zachowuje pozycję scrolla, sesje pokazują poprawne pochodzenie zamiast mylących etykiet, a wiadomości uzupełniające można kolejkować, gdy agent wciąż pracuje.

**Key takeaways:**
- Pełna recenzja PR-a z GitHuba na telefonie: diffy, komentarze liniowe, wątki, merge/squash/rebase z auto-mergem.
- Dyktowanie głosowe promptów w czacie i w kompozytorze agenta chmurowego.
- iPad dostał prawdziwy układ tabletowy z diffami side-by-side zamiast rozciągniętego widoku telefonu.
- Code Reviewer, Security Agent i zarządzanie organizacją przeniesione z weba do aplikacji mobilnej.

**Why do I care:** Jako ktoś, kto regularnie odkłada zatwierdzenie prostego PR-a do powrotu do laptopa, doceniam naprawę tej jednej luki: możliwość zatwierdzenia bez komentarza wprost z telefonu zamyka realną lukę w codziennym workflow, nie jest to funkcja na pokaz. Ciekawszy strategicznie jest wybór, na której podłączonej instancji CLI uruchomić sesję, bo to sygnał, że narzędzia agentowe zaczynają traktować telefon jako pilota do wielu równoległych środowisk pracy, a nie jako osobne, izolowane środowisko. Dla zespołów już używających agentów kodujących w CI albo lokalnie to naturalne rozszerzenie zasięgu kontroli, ale warto pilnować, żeby zatwierdzanie PR-ów z telefonu w biegu nie stało się wymówką do pomijania realnej uwagi przy code review, bo szybkość akceptacji i jakość recenzji to wciąż dwa różne cele.

**Link:** [Kilo App Update: review PRs, dictate prompts, and pick which CLI runs the job](https://blog.kilo.ai/p/kilo-app-update-review-prs-dictate)
