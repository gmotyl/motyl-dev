---
title: "Mogłem zbudować własną przeglądarkę z AI. Zatrzymałem się po jednej trzeciej"
excerpt: "Budowanie stało się tanie, posiadanie nie: dlaczego autor porzucił przeglądarkę opartą na Helium po wygaszeniu Arc."
publishedAt: "2026-11-24"
slug: "wlasna-przegladarka-z-ai-budowac-latwo-utrzymywac-drogo"
hashtags: "#ai #agents #open-source #engineering #productivity #generated #pl"
source_pattern: "PawelJozefiak"
---

## Budowanie stało się tanie, posiadanie nie

**TLDR:** Autor zaczął budować własną przeglądarkę na bazie Helium, bo Arc zostaje wyłączony 22 grudnia. Po mniej więcej jednej trzeciej drogi uznał, że koszt utrzymania nie jest wart wysiłku.

**Summary:** Autor od początku używał Arc, a jego agent korzystał z niego, gdy zadania wymagały zalogowanych sesji. Po przejęciu The Browser Company przez Atlassian zespół skupił się na Dia, a Arc dostał datę końca: 22 grudnia przestaje działać na Macu i Windowsie, a konta zostaną wyłączone. Autor postanowił więc zrobić własną przeglądarkę z forka Chromium, dokładnie z otwartego, nastawionego na prywatność Helium, i nazwał ją Keystone. Zakładał około dwudziestu łatek: pionowe karty, pasek adresu w panelu bocznym, przestrzenie, pasek komend i gesty. Działa, ma własny serwer synchronizacji i się instaluje.

Problemy zaczęły się od zasobów. Budowa Chromium potrzebuje około 80 GB wolnego miejsca, a autor miał 18 na Mac Mini i 15 na MacBooku. Pierwsza kompilacja trwała 5 godzin i 42 minuty. Potem pojawiła się lista rosnących wymagań: wersja mobilna, zaufana synchronizacja kart i wszystko, co psuje się, gdy Helium przesuwa bazę. Chrome wydaje nową stabilną wersję co dwa tygodnie, więc każda oznacza ten sam cykl: pobranie bazy, ponowne nałożenie łatek, naprawa, wielogodzinna kompilacja i testy, a przy każdej pętli rosną koszty tokenów.

Wniosek autora brzmi: pytanie nie brzmi już, czy możesz, tylko czy powinieneś. Przywołuje Roberta Glassa i regułę, że utrzymanie pochłania 40 do 80 procent kosztu oprogramowania, a większość tego to nowe funkcje, nie naprawa błędów. AI obniżyło cenę pierwszej połowy, a druga spada na ciebie w trzech walutach: tokenach, mocy obliczeniowej i uwadze. Pierwsze dwie da się kupić, trzeciej nie. Przeglądarka jest szczególna, bo trzyma wszystkie loginy i sesje, a nawet twórcy Arc podali jako powód wyłączenia stałą pracę nad bezpieczeństwem rosnącą w erze AI.

Brakuje ostrożniejszego rachunku: autor nie liczy, ile realnie kosztowałby chmurowy build, ani nie rozważa przejścia na gotowe, utrzymywane rozwiązanie z wtyczkami zamiast forka.

**Key takeaways:**
- Utrzymanie to 40 do 80 procent kosztu oprogramowania, a AI nie zmienia tego tak, jak koszt budowy.
- Fork Chromium to subskrypcja bez końca: nowa wersja co dwa tygodnie.
- Przeglądarka trzyma wszystkie sesje, więc opóźnienie w łatkach bezpieczeństwa jest groźne.
- Uwaga jest zasobem, którego nie kupisz.

**Why do I care:** Dobra reguła dla zespołów: przed zbudowaniem czegoś własnego z agentem policz nie sprint budowy, tylko trzy lata utrzymania. Dla kodu, który ma kontakt z danymi uwierzytelniającymi, odpowiedź zwykle brzmi: nie.

**Link:** [I Could Build My Own Browser With AI. I Stopped a Third of the Way In.](https://thoughts.jock.pl)
