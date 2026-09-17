---
title: "TanStack Start zamiast Next.js, pożyczone zaufanie do kodu AI i samodzielny Google Drive"
excerpt: "Lovable rezygnuje z Next.js na rzecz TanStack Start, a osobny esej pyta, czy zaufanie do kodu pisanego przez AI da się w ogóle pożyczyć."
publishedAt: "2026-09-17"
slug: "tanstack-start-lovable-ai-confidence-self-hosted-drive-python-2026"
hashtags: "#dailydev #frontend #react #nextjs #architecture #ai #testing #python #self-hosted #generated #pl"
source_pattern: "daily.dev"
---

## Dlaczego Lovable, Railway i inest porzucają Next.js na rzecz TanStack Start

**TLDR:** Kilka firm produkcyjnych, w tym Lovable i Railway, przeniosło swoje frontendy z Next.js na TanStack Start. Powód nie jest ideologiczny, tylko praktyczny: szybszy start dev servera, mniej pamięci i prostszy model mentalny bez granicy `use client`/`use server`.

**Summary:** Lovable opisał to na swoim blogu wprost liczbami. Dev server na TanStack Start startuje w 10 sekund i zajmuje 1,5 GB RAM, podczas gdy ten sam projekt na Next.js 16.2 z Turbopackiem na MacBooku M4 Max potrzebował 70 sekund i 8 GB. Next.js 16.3 obiecuje do 90 procent redukcji zużycia pamięci w dev serverze, więc ta przepaść może się zamknąć, ale w momencie migracji różnica była na tyle duża, że zdecydowała o wyborze frameworka.

Ciekawszy jest argument o granicy server/client. TanStack Start nie ma domyślnie React Server Components, więc zamiast dzielić komponenty na serwerowe i klienckie, dostajemy loadery na poziomie routingu i `createServerFn` do fetchowania oraz mutacji. To mniej magii, ale też mniej miejsca na pomyłkę, gdzie ktoś przypadkiem zaimportuje kod serwerowy do komponentu klienckiego i dowie się o tym dopiero na produkcji.

Trzeci argument, najbardziej znaczący dla dzisiejszych zespołów, dotyczy agentów kodujących. Next.js ma za sobą kilka dużych zmian API między wersjami 13, 14 i 15, więc modele językowe trenowane na starszym kodzie regularnie mieszają składnię z różnych generacji frameworka. TanStack Start jest młodszy i bardziej jednolity, więc agent rzadziej podsuwa martwy kod z poprzedniej epoki. Build produkcyjny Lovable, wcześniej najwolniejszy krok w CI przy ponad 12 minutach, skrócił się do 6-9 minut, choć przy większych aplikacjach zespół musiał ręcznie dostroić konfigurację bundlera, żeby to osiągnąć.

**Key takeaways:**
- TanStack Start bez RSC oznacza loadery i server functions zamiast podziału na komponenty serwerowe i klienckie
- Lovable zmierzył 10s/1,5GB vs 70s/8GB w starcie dev servera między TanStack Start a Next.js 16.2
- Build CI spadł z ponad 12 minut do 6-9 minut, kosztem ręcznej konfiguracji bundlera przy większej skali

**Why do I care:** Nie traktowałbym tego jako sygnału "Next.js umiera", bo baza użytkowników i ekosystem wciąż są nieporównywalne. Ale warto zapamiętać ten argument o agentach: jeśli framework ma za sobą kilka fal breaking changes, koszt utrzymania rośnie nie tylko przez ludzi, ale i przez asystentów kodujących, które gubią się w wersjach. Przy wyborze frameworka na nowy projekt zacząłbym dopisywać "spójność API w czasie" jako osobne kryterium obok wydajności i ekosystemu.

**Link:** [From Next.js To TanStack Start: Lovable Shows Why](https://daily.dev/posts/3wLIGsLJr)

## Zaufanie do kodu napisanego przez AI nie jest czymś, co można pożyczyć

**TLDR:** Autor wraca do wcześniejszego eksperymentu, w którym agent AI zaimplementował złożoną metrykę kodu w 15 minut, ale sam autor nie mógł zweryfikować jej poprawności przez kolejne godziny. Stąd pojęcie "pożyczonego zaufania": kod, testy i wyjaśnienia wyglądają wiarygodnie, ale żadne z nich nie jest niezależnym dowodem poprawności.

**Summary:** Punkt wyjścia jest prosty i niewygodny. Kiedy agent pisze implementację i do niej testy, oba artefakty pochodzą z tego samego źródła. Przechodzące testy pokazują tylko, że kod zgadza się sam ze sobą, a nie że zgadza się ze specyfikacją, którą ktoś miał w głowie. Autor nazywa to "praniem zaufania": na wejściu masz prawdopodobieństwo, na wyjściu dostajesz pozorną pewność, bez żadnego zewnętrznego dowodu po drodze.

Tekst opiera się na trzech zewnętrznych obserwacjach, od Alberta Brandoliniego, Zsófii Herendi i Andreasa Bullinga, patrząc na to zjawisko z poziomu organizacji, jednostki i pokolenia. Najbardziej niepokojący wątek dotyczy asymetrii wiekowej: ktoś, kto od lat pisze kod bez AI, ma wypracowaną intuicję, kiedy coś "pachnie" źle, i potrafi tę intuicję zastosować do oceny kodu wygenerowanego. Osoba wchodząca dziś do zawodu nigdy nie zbudowała tej intuicji, bo od początku pracuje z asystentem, więc nie ma punktu odniesienia, żeby złapać subtelny błąd.

Dalej pojawiają się trzy konkretne techniki budowania niezależnego zaufania. Pierwsza to brute-force oracle, czyli prosta, oczywiście poprawna implementacja referencyjna, z którą porównuje się wynik AI metodą testów różnicowych. Druga to relacje metamorficzne wyprowadzone ze specyfikacji, a nie z kodu, czyli reguły w stylu "jeśli wejście X daje wynik Y, to wejście 2X powinno dać wynik zbliżony do 2Y", niezależne od tego, jak dokładnie działa implementacja. Trzecia to mutation testing zestawu testów napisanych przez AI, żeby sprawdzić, czy te testy w ogóle wyłapują wstrzyknięte błędy, a nie tylko przechodzą.

Konkluzja jest ostra wobec popularnej dziś narracji, że TDD stało się przestarzałe, skoro AI pisze kod szybciej niż zdążysz napisać test. Autor twierdzi coś przeciwnego: TDD nigdy nie było głównie o łapaniu błędów, tylko o wymuszeniu zdefiniowania oczekiwanego zachowania, zanim rozwiązanie w ogóle powstanie. To właśnie ten moment tarcia, który przepływy pracy z AI starają się zoptymalizować i wyciąć, trzeba dziś świadomie zachować, żeby zaufanie było zarobione, a nie pożyczone.

**Key takeaways:**
- Testy napisane przez ten sam model, który napisał implementację, dowodzą tylko spójności ze sobą, nie poprawności
- Brute-force oracle, relacje metamorficzne i mutation testing to trzy niezależne sposoby weryfikacji kodu AI
- Asymetria dotyczy stażu: osoby bez wypracowanej wcześniej intuicji kodu tracą punkt odniesienia do oceny wyników AI

**Why do I care:** To jeden z niewielu tekstów o AI w kodzie, który nie kończy się banałem "trzeba review'ować kod". Konkretnie mówi, jak zbudować niezależny dowód poprawności, a nie kolejną warstwę zaufania do tego samego modelu. Dla architekta to sygnał, żeby w projektach z dużym udziałem AI świadomie wymuszać oracle i property-based testy tam, gdzie logika jest krytyczna, zamiast liczyć, że code review złapie to, czego sam recenzent nie potrafi ocenić bez wejścia w domenę.

**Link:** [Confidence is not transferable](https://daily.dev/posts/LsMgmjOVa)

## Personal Drive: samodzielny hosting zamiast Google Drive na Laravelu i React

**TLDR:** Personal Drive to open-source'owa alternatywa dla Google Drive i Dropboksa, którą stawiasz sama, oparta na Laravelu 11, React i Inertia.js z SQLite jako magazynem danych. Wersja 2 dorzuca dwuskładnikowe uwierzytelnianie, szyfrowane archiwa i wsparcie dla audiobooków z zapamiętywaniem pozycji odtwarzania.

**Summary:** Projekt trzyma się prostego stosu technologicznego, bez konieczności stawiania osobnej bazy danych czy S3 do startu, bo SQLite wystarcza jako magazyn. Wersja 2 dodaje 2FA przez TOTP, uploady chronione hasłem z klienckim szyfrowaniem AES-256 w archiwach zip, więc pliki są zaszyfrowane, zanim opuszczą przeglądarkę, a nie dopiero po stronie serwera. Do tego dochodzi obsługa audiobooków z zapamiętywaniem miejsca odtwarzania, skrót Ctrl+G do szybkiego przechodzenia między folderami, ulubione, wsparcie dla reverse proxy i opcjonalny tryb bez logowania dla instancji czysto prywatnych.

Od strony bezpieczeństwa autorzy dorzucili ochronę przed symlinkami i limitowanie prób logowania do 2FA, co akurat cieszy, bo self-hosted narzędzia do plików bywają pierwszym miejscem, gdzie ktoś odpuszcza sobie hardening. Instalacja działa przez Docker Compose albo przez prowadzony skrypt konfiguracyjny, a projekt ma pokaźny zestaw testów obejmujący zarówno PHP, jak i JS, plus testy dymne samej instalacji.

**Key takeaways:**
- Stos: Laravel 11 + React + Inertia.js + SQLite, bez wymogu zewnętrznej bazy na start
- Szyfrowanie AES-256 uploadów odbywa się po stronie klienta, zanim plik trafi na serwer
- Ochrona przed symlinkami i rate limiting na 2FA to niecodzienny poziom uwagi na bezpieczeństwo w projekcie hobbystycznym

**Why do I care:** Dla kogoś, kto chce trzymać własne pliki poza chmurą trzech wielkich dostawców, to sensowna pozycja do sprawdzenia, właśnie dzięki kombinacji SQLite jako magazynu i realnego nacisku na bezpieczeństwo, a nie tylko listy funkcji. Dla architekta frontendowego ciekawszy jest wybór Inertia.js jako kleju między Laravelem a React, bo to kolejny dowód, że nie każdy projekt potrzebuje osobnego API i SPA, żeby dobrze się skalować przy mniejszym zespole.

**Link:** [Self hosted google drive alternative](https://daily.dev/posts/FGyXsQqaN)

## Nauka Pythona od zera w 2026 wymaga czegoś więcej niż samego języka

**TLDR:** Roadmapa dla kogoś, kto zaczyna z Pythonem od zera, zakłada, że w 2026 sam język nie wystarczy do dobrze płatnej pracy. Autor proponuje łączyć podstawy programowania, umiejętności pracy z danymi i wiedzę o AI jako trzy filary, które razem podnoszą wartość rynkową.

**Summary:** Argument jest prosty: rynek juniorów w Pythonie jest przepełniony ludźmi, którzy znają tylko składnię, więc sama znajomość języka przestała być wyróżnikiem. Roadmapa sugeruje, żeby od początku traktować naukę Pythona jako wehikuł do czegoś szerszego, czyli pracy z danymi i podstaw AI, zamiast uczyć się języka w oderwaniu od kontekstu, w którym faktycznie się go używa.

**Key takeaways:**
- Sama znajomość składni Pythona nie wystarcza na rynku juniorów w 2026
- Autor łączy trzy ścieżki naraz: programowanie, dane, AI
- Roadmapa jest adresowana do osób zaczynających zupełnie od zera

**Why do I care:** Dla frontendowca to głównie ciekawostka o rynku, ale sam mechanizm jest uniwersalny i dotyczy też JavaScriptu: znajomość samego frameworka przestaje wystarczać, kiedy każdy junior ma dostęp do tych samych kursów i tych samych asystentów AI. Wyróżnikiem staje się kontekst, w którym umiesz tę wiedzę zastosować, a nie sama wiedza.

**Link:** [How I'd Learn Python From Scratch](https://daily.dev/posts/zcFTdgAq1)
