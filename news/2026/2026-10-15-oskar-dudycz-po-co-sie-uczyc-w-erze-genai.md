---
title: "Oskar Dudycz: po co się uczyć w erze GenAI i na czym polega problem granic spójności"
excerpt: "Rozmowa z Jakubem Pilimonem o tym, czemu szkolenie nie jest zbędne, mimo że można zapytać AI, oraz o transakcjach, współbieżności i zdarzeniach."
publishedAt: "2026-10-15"
slug: "oskar-dudycz-po-co-sie-uczyc-w-erze-genai"
hashtags: "#oskardudycz #architecture #ai #engineering #generated #pl"
source_pattern: "OskarDudycz"
---

## Po co się uczyć w erze GenAI?

**TLDR:** Oskar Dudycz i Jakub Pilimon odpowiadają, po co szkolenie, skoro można zapytać AI. Odpowiedź: dobre pytanie zadasz dopiero wtedy, gdy wiesz, że masz problem, a to dają praktyka i błędy.

**Summary:** Jakub przyznaje, że kto umie zadawać AI dobre pytania i wyciągać wnioski, szkolenia nie potrzebuje, tak jak kiedyś w czasach Stack Overflow. Problem w tym, że pytanie można zadać dopiero po rozpoznaniu problemu. Dawniej drogą była frustracja przy szukaniu, która utrwalała wiedzę. Dziś droga jest krótsza i często pozbawiona nauki. Szkolenie, które daje gotowe rozwiązania, bywa jak sernik: miłe, ale mało z niego zostaje. Dlatego warsztat opiera się na realnym, nietrywialnym problemie biznesowym i jest intensywny.

Problem spójności to współbieżny dostęp do danych, transakcje i ich granice: gdzie je postawić, ile danych w nich trzymać i dlaczego tyle. Nie da się mieć maksymalnej spójności i skalowalności jednocześnie. Trudność to przełożenie tego na język biznesu, bo pytanie "czy saldo może być chwilę nieaktualne" jest zrozumiałe, a "gdzie kończy się granica transakcji" nie. Pomocne pytania: co jeśli dwie osoby zrobią to samo naraz, jak świeże muszą być dane i kiedy jest tłok. W drugiej części Oskar traktuje zdarzenia jako kamienie milowe procesu biznesowego, co za Gregiem Youngiem oznacza myślenie o procesach zamiast tabel.

Tekst to w dużej mierze zaproszenie na warsztaty 29 i 30 października (po polsku) oraz na szkolenie o Event-Driven Architecture pod koniec listopada.

**Key takeaways:**
- Wiedza przychodzi z napotkanego problemu, nie z gotowej odpowiedzi.
- Granice transakcji warto tłumaczyć pytaniami o świeżość danych.
- Zdarzenia opisują proces, nie tabelę.

**Why do I care:** Argument "no pain, no gain" jest trafny, ale pochodzi od sprzedawców szkolenia. Dla senior developera użyteczniejsza jest lista pytań o współbieżność, którą można zadać zespołowi przy projektowaniu agregatów.

**Link:** [Why to learn in the GenAI era?](https://www.architecture-weekly.com/)
