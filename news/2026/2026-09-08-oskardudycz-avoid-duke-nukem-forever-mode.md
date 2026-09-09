---
title: "Nie bądź jak Duke Nukem Forever: pułapka wiecznego dopracowywania własnego projektu"
excerpt: "Oskar Dudycz przyznaje, że sam wpadł w tę samą pułapkę, którą wyśmiewa u innych: 14 lat produkcji Duke Nukem Forever jako ostrzeżenie przed nieskończonym dokładaniem funkcji zamiast wypuszczania tego, co już działa."
publishedAt: "2026-09-08"
slug: "oskardudycz-avoid-duke-nukem-forever-mode"
hashtags: "#oskardudycz #architecture #engineering #productivity #eventsourcing #generated #pl"
source_pattern: "OskarDudycz"
---

## Duke Nukem Forever jako lustro dla własnego projektu

**TLDR:** Duke Nukem Forever powstawał 14 lat i 44 dni, zmieniając silnik gry cztery razy, zanim w końcu wyszedł jako komercyjna klapa. Oskar Dudycz przyznaje, że wpadł w dokładnie ten sam wzorzec przy rozwoju Emmett i Pongo, swoich bibliotek do Event Sourcingu, i tłumaczy, dlaczego regularne wypuszczanie alf i bet uratowało go przed powtórzeniem historii Duke'a.

**Summary:** Historia Duke Nukem Forever jest sama w sobie pouczająca niezależnie od kontekstu programistycznego: gra zapowiedziana na święta 1998 roku wyszła w czerwcu 2011, po tym jak studio zmieniło silnik z przestarzałego 2.5D na Quake 2, potem na Unreal Engine z dodanym trybem multiplayer, którego nikt pierwotnie nie planował, a na końcu na Doom 3, przy okazji tracąc większość zespołu i przechodząc przez pozew wydawcy. Do 2024 roku trzymała rekord Guinnessa na najdłuższy czas produkcji gry wideo. Dudycz przyznaje wprost, że wygłaszając rady o iteracyjnym dostarczaniu, sam złamał tę zasadę przy rozwoju Emmett, biblioteki do budowania aplikacji Event-Driven w Node.js, oraz Pongo, biblioteki traktującej PostgreSQL jak bazę dokumentową kompatybilną z MongoDB.

Zaczął od podejścia lean. Pierwsza wersja Emmett nie miała nawet implementacji event store'a, szybko dostał feedback od ludzi chcących jej używać, więc dorzucił storage z EventStoreDB, potem Pongo dla zabawy, potem Dumbo jako współdzielony pakiet do zarządzania połączeniami i zapytań SQL. To zadziałało, Pongo trafiło na główną stronę Hacker News, ludzie zaczęli używać Emmett na produkcji, mimo braku przychodów z projektu. Problem zaczął się półtora roku temu, gdy postanowił zrobić z tego wersję gotową do produkcji. Przepisał całe zarządzanie połączeniami, dodał wsparcie dla SQLite i Cloudflare D1, przy okazji korzystając z niezależnego sterownika sqlite3, który później stał się nieutrzymywany, zrobił sterowniki wtykowalne, dodał OpenTelemetry, przepisał całe asynchroniczne przetwarzanie z dodaną odpornością i batchowaniem, oraz dorzucił Workflows do koordynacji procesów biznesowych. Efekt: oficjalne wersje 0.43.0 Emmett i 0.17.0 Pongo wciąż nie są wydane, mimo że bety są funkcjonalnie znacznie bogatsze niż stabilne wersje.

Sam podkreśla jedną różnicę względem Duke Nukem Forever: nieprzerwaną pętlę feedbacku. Publikował alfy i bety wystarczająco często, że część ludzi zaczęła używać ich na produkcji, mimo że formalnie nie były to stabilne wydania, więc mimo opóźnienia projekt nie zamienił się w czarną skrzynkę bez kontaktu ze światem zewnętrznym. Wniosek, który wyciąga, dotyczy wprost narzędzi GenAI: łatwość generowania kolejnych opcji i pomysłów sprzyja analysis paralysis i temu, co nazywa "refucktoringiem", czyli ciągłym poprawianiu zamiast kończenia, dokładnie tak samo jak łatwość zmiany silnika gry sprzyjała kolejnym opóźnieniom Duke Nukem Forever.

**Key takeaways:**
- Duke Nukem Forever: 14 lat produkcji, cztery zmiany silnika gry, komercyjna klapa mimo sukcesu poprzedniczki sprzed lat.
- Autor przyznaje, że popełnił ten sam błąd przy Emmett i Pongo: półtora roku bez oficjalnego stabilnego wydania mimo funkcjonalnie gotowych bet.
- Nieprzerwana pętla feedbacku (częste alfy i bety używane przez część ludzi na produkcji) uratowała projekt przed całkowitym oderwaniem od rzeczywistości.
- Łatwość generowania kolejnych opcji dzięki narzędziom GenAI zwiększa ryzyko analysis paralysis i ciągłego poprawiania zamiast kończenia.

**Why do I care:** To trafne ostrzeżenie akurat teraz, gdy AI ułatwia dorzucenie "jeszcze jednej rzeczy" do projektu praktycznie bez kosztu wysiłku, bo koszt przesuwa się na czas do wydania, a nie na czas pisania kodu. Warto regularnie zadawać sobie pytanie, czy grupowanie zmian przed wydaniem faktycznie ułatwia migrację użytkownikom, czy tylko odsuwa moment konfrontacji z rzeczywistym feedbackiem, bo jak pokazuje przykład autora, nawet ktoś świadomy tej pułapki potrafi w nią wpaść, mimo dobrych intencji i realnych powodów każdej pojedynczej decyzji.

**Link:** [Avoid Duke Nukem Forever Mode](https://www.architecture-weekly.com/p/avoid-duke-nukem-forever-mode)
