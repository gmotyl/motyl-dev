---
title: "Pragmatic Engineer: czego uczy włamanie do Railway, czyli atak ofensywnego modelu AI krok po kroku"
excerpt: "Railway opublikowało szczegółowy postmortem ataku z użyciem modelu AI bez zabezpieczeń, a Northflank, który próbował na tym zarobić, został zhakowany niemal tak samo."
publishedAt: "2026-11-20"
slug: "pragmatic-engineer-railway-hack-ofensywne-ai-northflank"
hashtags: "#pragmaticengineer #security #ai #devops #cloud #architecture #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Co wynika z włamania do Railway

**TLDR:** Atakujący używający modeli AI bez zabezpieczeń włamują się do firm infrastrukturalnych, żeby wykraść klucze do dostawców modeli. Railway opisało swój przypadek tak dokładnie, że jest to dziś najlepsze studium takiego ataku.

**Summary:** Gergely Orosz pisze, że w rozmowach z kilkoma CTO i założycielami firm infrastrukturalnych słyszał o tym samym wzorcu. Cel ataku to klucze do modeli, które da się potem sprzedawać ze zniżką, więc opłaca się inwestować w drogie modele ofensywne. Railway zostało zaatakowane dwa tygodnie temu i wyciekły sekrety klientów.

Atak miał cztery fazy. Pierwsza to nieudane próby 18 października z fałszywych kont. Druga to pobranie monorepo w pięciu krokach i jedenastu godzinach, od podatności w systemie budowania, przez kradzież poświadczeń builda, po klaster Temporal z historią buildów. Trzecia to dostęp SSH do chmury w dziesięć godzin, przez źle skonfigurowane powiązanie OpenID Connect w pipeline wdrożeniowym. Czwarta, w trzy godziny, to odczyt zaszyfrowanych zmiennych środowiskowych z produkcyjnej bazy i odszyfrowanie ich przez usługę zarządzania kluczami. Railway wykryło próby użycia poświadczeń na systemach wewnętrznych po ośmiu minutach i unieważniło te użyte do pobrania repo minutę po ich użyciu, więc było o krok od zatrzymania ataku.

Orosz wyciąga z tego kilka wniosków. Model potrafi wykorzystać skradziony kod w godziny, a człowiekowi zajęłoby to dni lub tygodnie. Sześć godzin po pobraniu repo atakujący miał plan dostępu do kluczy. Atakujący wrócił tej samej nocy, gdy Railway go wyrzuciło. Po stronie obrony dobrze zadziałało przechowywanie skrótów sekretów klientów, bo Railway mogło wysłać dostawcom modeli skróty kluczy do natychmiastowego unieważnienia, nie znając samych kluczy. Słabością było to, że modele OpenAI i Anthropic odmawiały pomocy w pracy z cyberbezpieczeństwem, także obronnej. Railway zamiast łatać stary system budowania przeniosło wszystkich na nowy, który był prawie gotowy.

Po incydencie każdy build dostaje własną jednorazową maszynę wirtualną, wewnętrzne sekrety mają drobnoziarnistą kontrolę dostępu, a dostęp do wrażliwych poświadczeń wymaga 2FA i biometrii. Zlikwidowano stare systemy i rozbudowano logowanie oraz alerty. Druga część tekstu dotyczy Northflank, który w dniu awarii Railway opublikował wpis "How to migrate off Railway". Dziewięć dni później sam został zhakowany niemal identycznie. Wykrycie zajęło mu dziewięć godzin, powiadomienie klientów jedenaście, i nie wysłał skrótów do dostawców AI. Szef Railway zaoferował im pomoc.

**Key takeaways:**
- Zakładaj, że atakujący ma pełny dostęp do twojego kodu.
- Buduj na izolowanych, jednorazowych maszynach, a nie na współdzielonych.
- Trzymaj skróty sekretów klientów, żeby móc je szybko unieważnić u dostawców.
- Reaguj w minuty, bo AI skraca czas między krokami ataku.

**Why do I care:** Ja czytam to jako lekcję dla każdego, kto ma pipeline CI z szerokimi poświadczeniami. Błędnie skonfigurowane OIDC i wspólne maszyny buildów to rzeczy, które mam na liście do przeglądu w własnych projektach. Zaskoczyło mnie, że obrona jest ograniczona przez to, że modele odmawiają pracy z bezpieczeństwem.

**Link:** [The Pulse: What can we learn from the Railway hack?](https://newsletter.pragmaticengineer.com/p/the-pulse-what-can-we-learn-from-132)
