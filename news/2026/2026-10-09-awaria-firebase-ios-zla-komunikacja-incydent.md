---
title: "Awaria Firebase, która wywróciła aplikacje na iOS, i fatalna komunikacja"
excerpt: "Zmiana konfiguracji po stronie backendu rozwaliła aplikacje na iOS z Firebase SDK, a status page przez cały czas świecił na zielono."
publishedAt: "2026-10-09"
slug: "awaria-firebase-ios-zla-komunikacja-incydent"
hashtags: "#pragmaticengineer #firebase #mobile #monitoring #engineering #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Globalna awaria Firebase i słaba obsługa incydentu

**TLDR:** Wieczorem 28 września usunięcie starej flagi konfiguracji spowodowało crash przy starcie wszystkich aplikacji na iOS z Firebase SDK i włączoną analityką. Google zareagowało po godzinie, a status page przez cały czas pokazywał, że wszystko działa.

**Summary:** O 17:38 czasu pacyficznego wyczyszczono przestarzałą flagę konfiguracyjną, a trzy minuty później wadliwy ładunek zaczął trafiać na serwery produkcyjne na całym świecie. SDK nie sprawdzało, czy nazwa flagi nie jest pusta, więc aplikacje przy pobraniu konfiguracji padały od razu po uruchomieniu. Programiści zakładali zgłoszenie na GitHubie, pod którym pojawiły się setki komentarzy, a zewnętrzny deweloper znalazł przyczynę, czyli wpis o zerowej długości, jeszcze zanim zespół Firebase potwierdził problem.

Zespół Firebase odpisał po godzinie i dziesięciu minutach, wycofanie zmiany zaczęło się po półtorej godziny, a skończyło po dwóch godzinach i jedenastu minutach. Przez cache aplikacje, które zapamiętały błędną odpowiedź, wywracały się jeszcze do sześciu godzin. Autor podkreśla, że to nietypowe dla firmy, która wymyśliła termin Site Reliability Engineer i napisała o tym książkę.

Najgorsza jest sprawa statusu. Dashboardy Firebase i Google Ads przez cały incydent były zielone, bo opierają się na metrykach po stronie serwera, a awaria była po stronie klienta. Postmortem opublikowano po czterech dniach i obiecano integrację informacji o awariach SDK z dashboardami. Autor zauważa, że ponad tydzień później postmortemu nie ma jeszcze na samej stronie statusu. Wspomina też, że Android nie wywrócił się, bo jego SDK jest lepiej utwardzone, i że przy dzisiejszych narzędziach porównanie obu implementacji powinno być łatwe. Brak takiego punktu w planie naprawczym to jego zdaniem zmarnowana okazja.

Jeden wątek jest wyjątkowo wymowny. Zmianę zrobił zespół Analytics, odpowiedzialność za crash ponosi zespół SDK, a awarię ukryto w panelu Google Ads. To klasyczne wysyłanie struktury organizacyjnej do produkcji.

**Key takeaways:**
- SDK nie walidowało pustej nazwy flagi, a zmianę po stronie backendu wypuszczono globalnie naraz.
- Aplikacje z zapamiętaną błędną odpowiedzią padały jeszcze do sześciu godzin po wycofaniu.
- Dashboard zależny od metryk serwerowych nie widzi awarii klienta.
- Podobny scenariusz zdarzył się w 2020 roku z SDK Facebooka.

**Why do I care:** Każdy, kto wkleja zewnętrzne SDK do aplikacji, powinien założyć, że może ono przyjść z konfiguracją, która je zabije. Zainicjuj SDK w sposób, który nie blokuje startu, i dodaj testy z uszkodzonymi ładunkami. A jeśli to ty prowadzisz status page, zapytaj, co on mierzy. Serwer zielony nie znaczy, że klient działa.

**Link:** [The Pulse: Firebase's global outage & poor response](https://newsletter.pragmaticengineer.com/p/the-pulse-firebases-global-outage-213)
