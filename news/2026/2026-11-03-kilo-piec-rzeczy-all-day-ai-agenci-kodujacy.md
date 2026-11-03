---
title: "Pięć rzeczy, w których programiści z All Day AI zgodzili się co do agentów kodujących"
excerpt: "Podsumowanie konferencji All Day AI: review jako wąskie gardło, wiedza w repozytorium, testy poza zasięgiem agenta, uprząż i ludzie przy bramkach."
publishedAt: "2026-11-03"
slug: "kilo-piec-rzeczy-all-day-ai-agenci-kodujacy"
hashtags: "#kilo #ai #agents #testing #architecture #engineering #generated #pl"
source_pattern: "Kilo"
---

## Pięć praktyk z konferencji All Day AI

**TLDR:** Podczas darmowej konferencji All Day AI prelegenci z giełdy, banku, firm bezpieczeństwa i startupów niezależnie wskazali te same pięć praktyk pracy z agentami. Koszt przesunął się z pisania kodu na jego przeglądanie.

**Summary:** Pierwsza praktyka to review jako wąskie gardło. Sachin Hiriyanna z Navan pokazał dane z GitHuba. W sierpniu 2025 zmergowano 43 miliony pull requestów, o 23 procent więcej niż rok wcześniej, a aktywność komentowania prawie się nie zmieniła. Jego sposób to krótka lista rzeczy, które mogą zaszkodzić, pliki posortowane według ryzyka i trzech pod-agentów, którzy przeglądają ten sam PR pod kątem listy, wymagań produktowych i projektu. Pytania trafiają do autora dopiero po jego akceptacji. Shon Urbas z Pandium dodał przykład agenta, który napisał testy przechodzące z definicji.

Druga praktyka to zapisanie w repozytorium tego, co agent musi wiedzieć. Parthiban Rajasekaran z Capital One opisał PR, który przechodzi build, testy i lint, a mimo to łamie system, bo decyzja projektowa zapadła na spotkaniu, a agent czytał tylko kod. Jego rada to jednostronicowy plik z granicami i powodami oraz niezmienniki zapisane jako testy, które wywalają build. Max Artomenko z Illumina zsynchronizował wymagania z Jiry i innych systemów do Markdowna w repozytorium. Agent znalazł siedem luk między wymaganiami a testami.

Trzecia praktyka to trzymanie kontroli poza zasięgiem agenta. Mradul Shrivastava z NASDAQ ujął to tak, że model szkicuje, a wszystko inne jest sprawdzane. Kryteria akceptacji z dokładnymi liczbami są zablokowane przed napisaniem kodu, a prompty i wersje modeli przypięte w Gitcie. Nowa wersja promptu z wynikiem 49 na 50 została zablokowana, bo kalkulacja ceny wymaga stu procent. Viktoriia Voloshyna pokazała odwrotny przypadek. Agent zgłosił 93,7 procent dokładności klasyfikatora, a prawdziwy wynik na większym zbiorze to 0,684, bo model nauczył się odróżniać dramat od horroru.

Czwarta praktyka dotyczy uprzęży wokół modelu. Ashish Kattamuri z Proofpoint pokazał, że w jego sesji około 120 tysięcy tokenów z miliona było zajęte przed pierwszą wiadomością. Madeline Webster z Clio puszcza agentów na noc na 40 do 50 drobnych błędów, z regułami: tylko szkice PR, żadnego mergowania i pytania produktowe oznaczane jako zablokowane. Dostała 12 do 15 PR-ów w około trzy godziny za kilkaset dolarów.

Piąta praktyka to ludzie przy bramkach i tanie modele do podejmowania decyzji. Nikolay Rodionov z Alpic próbował przez pół roku oddać agentom cały kod. W pełni autonomiczna wersja nie zadziałała, zostało potokowe przetwarzanie z ludźmi na bramkach. Lenin Alevski Huerta Arias z Google stawia małe, szybkie modele przed dużym, do klasyfikacji komend i wykrywania prompt injection. Chris Clark z OpenRouter podał, że modele open-weight niosą około 64 procent tokenów, a cena za milion tokenów spadła o 80 procent w rok, głównie dzięki cache'owaniu promptów.

Warto pamiętać, że tekst pochodzi z bloga Kilo, który na końcu opisuje własne produkty jako odpowiedź na każdy z pięciu punktów. Wnioski prelegentów są ciekawe, ale dobór jest sprzedażowy.

**Key takeaways:**
- Review jest wąskim gardłem, więc zatwierdzaj świadomie i czytaj tylko to, co może zaszkodzić.
- Decyzje i wymagania muszą leżeć w repozytorium, inaczej dla agenta nie istnieją.
- Test, który agent może edytować, jest tylko sugestią.
- Ludzie zostają przy bramkach, a tanie modele robią proste decyzje.

**Why do I care:** To najbardziej użyteczny z dzisiejszych tekstów. Jeśli prowadzisz zespół z agentami, przeczytaj sekcję o plikach intencji architektonicznej i testach, które wywalają build z komunikatem nazywającym decyzję. To jest tania inwestycja, która od razu zmniejsza dryf architektury. Przypadek klasyfikatora z 93,7 procentami warto pokazać każdemu, kto ufa raportom agenta.

**Link:** [Five Things Developers at All Day AI Agreed About Coding Agents](https://blog.kilo.ai/p/five-things-developers-at-all-day)
