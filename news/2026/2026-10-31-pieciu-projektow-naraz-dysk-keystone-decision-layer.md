---
title: "Pięć projektów naraz i dysk, który skończył się szybciej niż pomysły"
excerpt: "Paweł Jóźwiak o małych narzędziach, warstwie decyzji dla agentów, własnej przeglądarce Keystone i o tym, że wąskim gardłem okazały się moc obliczeniowa i miejsce na dysku."
publishedAt: "2026-10-31"
slug: "pieciu-projektow-naraz-dysk-keystone-decision-layer"
hashtags: "#joozio #ai #agents #productivity #architecture #devtools #chromium #generated #pl"
source_pattern: "PawelJozefiak"
---

## Pięć projektów naraz, a skończył się dysk

**TLDR:** Autor prowadzi równolegle pięć projektów z agentami i odkrył, że po uwadze skończyły mu się też moc obliczeniowa i miejsce na dysku. Opisuje małe narzędzia, projekt warstwy decyzji dla agentów i własną przeglądarkę Keystone.

**Summary:** Poprzedni wpis dotyczył tego, że uwaga autora kończy się szybciej niż wykonanie jego agentów. Teraz pokazuje swój warsztat. Strona stale.jock.pl pokazuje dla 25 modeli z ośmiu laboratoriów dwa zegary, czas od premiery i czas od końca danych treningowych. Claude Opus 5.5 wyszedł we wrześniu, ale jego dane kończą się w czerwcu, a Gemini 4 Argon wyszedł w październiku z danymi do marca. Tu bierze się pewna siebie bzdura, gdy model odpowiada o czymś świeżym. Ciekawy jest też epizod z utrzymaniem. Cotygodniowa kontrola świeżości przeoczyła pięć nowych premier, bo parser znał tylko stare wzorce nazw, więc strona o nieaktualności sama była nieaktualna. Teraz kontrola zgłasza każdą nieznaną nazwę.

Dalej są entropy.jock.pl, interaktywna nauka entropii, oraz agentload.jock.pl, kalkulator, który z liczby wątków agentów, powrotów i minut na sprawdzenie liczy decyzje na dzień. Pięćdziesiąt wątków wracających po kilka razy daje kilkaset decyzji i większość dnia pracy na samych kontrolach. Najciekawszy jest Decision Layer, jeszcze niepokazany. Pomysł to schemat organizacyjny decyzji, a nie agentów. Projekty, pod nimi kierunki, pod nimi decyzje. Decyzja idzie jedną z pięciu dróg, od automatycznej, przez propozycję z prawem weta w ciągu dwunastu godzin, po test, pytanie z terminem i ramowanie kierunku. Wszystko nieodwracalne i dotykające pieniędzy, klientów albo publiczności to zawsze pytanie do autora. Autonomia rośnie po dwudziestu zaakceptowanych domyślnych decyzjach z rzędu, a jedno weto cofa o krok. Cisza jest zapisywana jako cisza, a nie jako zgoda.

Trzecia część to Keystone, przeglądarka na bazie Helium, bo The Browser Company wyłącza Arc na Macu i Windowsie 22 grudnia. Autor zmierzył Arc przed wyłączeniem i zamienił wymiary w 89 testów porównawczych. Wersja 0.1.0 jest już na jego MacBooku. A potem ściana. Każdy wątek agenta dostaje własną kopię repo, około 1,3 GB, a przez większość października dysk Maca Mini był zapełniony w 90 do 95 procent. Skrypt sprzątający usunął cache potrzebny działającemu serwerowi, który przez tydzień działał zepsuty. Build Chromium potrzebuje około 80 GB, a wolne miejsce wynosiło 18 i 15 GB. Zamiast kupować dysk za około 749 złotych albo wynajmować chmurowego Maca za około 200 euro miesięcznie, autor puszcza build na MacBooku nocami, od 22:00 do 8:30, z niskim priorytetem. Pierwszy pełny build trwał 5 godzin i 42 minuty.

**Key takeaways:**
- Strona o nieaktualności modeli sama się zestarzała, bo parser znał tylko stare nazwy.
- Warstwa decyzji dzieli decyzje na pięć dróg, a autonomię zdobywa się z historii akceptacji.
- Każdy równoległy wątek agenta kosztuje miejsce na dysku, około 1,3 GB na kopię repo.
- Przy dysku zapełnionym w 95 procent sprzątanie potrafi usunąć coś, czego ktoś jeszcze używa.

**Why do I care:** Pomysł modelu decyzji z zasadą, że milczenie to nie zgoda, jest wart przeniesienia do każdego zespołu, który daje agentom domyślne zatwierdzanie. Koszt równoległości jest też realny. Gdy każdy agent ma własną kopię repo, plan pojemności dysków i CI trzeba policzyć, zanim ktoś odpali pięćdziesiąt wątków. Autor wybiera dyscyplinę zamiast sprzętu i sam przyznaje, że to kupuje mu kilka miesięcy, więc warto zapytać go o to za miesiąc.

**Link:** [I'm Building Five Things at Once. My Disk Ran Out Before My Ideas Did.](https://thoughts.jock.pl/p/workbench-five-projects-compute-storage-2026)
