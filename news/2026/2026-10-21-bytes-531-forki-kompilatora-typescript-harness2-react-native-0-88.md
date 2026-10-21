---
title: "Bytes #531: cztery forki kompilatora TypeScript, harness2 od Google i React Native 0.88"
excerpt: "Dlaczego wszyscy portują kompilator TypeScript, a do tego krótko o harness2, React Native 0.88, React Router 8.5 i TypeScript 7.1 Beta."
publishedAt: "2026-10-21"
slug: "bytes-531-forki-kompilatora-typescript-harness2-react-native-0-88"
hashtags: "#uidev #typescript #rust #react-native #react-router #agents #tsc #generated #pl"
source_pattern: "ui.dev"
---

## Wyprawa przez piekło kompilatora TypeScript

**TLDR:** Trzy miesiące po wydaniu TypeScript 7 w Go pojawiły się cztery nieoficjalne porty kompilatora. Każdy obiecuje szybsze sprawdzanie typów, a razem pokazują rozdrobnienie ekosystemu narzędzi.

**Summary:** Powód zamieszania jest techniczny. Port do Go dał natywny plik wykonywalny, ale narzędzia zależne od starego API w JavaScripcie nie mogą go już wywoływać bezpośrednio. Muszą rozmawiać z nim przez protokół klient-serwer. Dodaj do tego modę na Rusta i dużo darmowych tokenów, a forki same się namnażają.

Pierwszy to ts-rust, eksperymentalny port Theo, który według autorów sprawdza typy całego VS Code w 4,8 sekundy, wobec 9,6 sekundy wersji w Go. Bun dodał do swojego zestawu narzędzi własny port, który w benchmarkach Buna jest 3 do 6,4 raza szybszy i zużywa 2,2 do 4,9 raza mniej pamięci. Vercel Labs poszło w drugą stronę: kompilator wrócił do TypeScriptu i jest kompilowany do kodu natywnego przez scriptc, z wydajnością zbliżoną do wersji w Go. Zespół VoidZero w Cloudflare ogłosił tsrs, port w Rust, który ma się połączyć z portem Theo i trafić do zestawu Oxc.

Wszystkie liczby to wyniki własne autorów projektów, a newsletter pisze o tym z ironią, nazywając zjawisko "slop forkami".

**Key takeaways:**
- Natywny kompilator złamał bezpośrednie wywołania z JavaScriptu i rozbił ekosystem narzędzi.
- Powstały cztery porty: ts-rust, bun check, tsc-ts i tsrs.
- Benchmarki pochodzą od autorów, bez niezależnej weryfikacji.

**Why do I care:** Dla większości zespołów oficjalny tsc wystarczy, a forki zwiększają ryzyko niezgodności wyników sprawdzania typów. Poczekaj, aż któryś z nich wejdzie do głównego zestawu narzędzi, zanim wpiszesz go do CI.

**Link:** [Bytes #531 - A TypeScript Compiler Journey from Hell](https://bytes.dev/archives/531)

## Szybki przegląd: harness2, React Native 0.88, React Router 8.5

**TLDR:** Google Research otworzył harness2, React Native wydał wersję bez zmian łamiących, a React Router porzuca własne API przejść widoku.

**Summary:** Google Research udostępnił harness2, rekurencyjny harness agentowy dla "otwartego świata", w którym agenci mogą się samoocenić. React Native 0.88 dodaje zmienne fonty i obsługę zdarzeń zbliżoną do sieci, a autorzy newslettera zauważają, że to dopiero trzecie wydanie bez zmian łamiących. React Router 8.5 oznacza własne API przejść widoku jako przestarzałe na rzecz komponentu ViewTransition z Reacta. TypeScript 7.1 w wersji beta ma być 1,2 do 1,9 raza szybszy od 7.0 i zużywać o 15 do 50 procent mniej pamięci, według zespołu.

Z lektur: esej o dekoherencji i złożoności generowanej przez AI, tekst o tym, jak robić code review, które nie męczy, oraz opis drogi wiersza w MVCC bazy Turso, od bajtkodu wstawiającego do punktu kontrolnego, który go usuwa. Newsletter zawiera też trzy sponsorowane wzmianki, które pominąłem.

**Key takeaways:**
- React Router przechodzi na ViewTransition z Reacta.
- React Native 0.88 nie łamie kompatybilności.
- harness2 to otwartoźródłowy punkt odniesienia dla samoocenianych agentów.

**Why do I care:** Jeśli używasz przejść widoku w React Router, zaplanuj migrację na komponent z Reacta, zanim stare API zniknie. Reszta to dobre tło, nie powód do pilnych działań.

**Link:** [React Native 0.88](https://reactnative.dev/blog/2026/10/19/react-native-0.88)
