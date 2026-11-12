---
title: "daily.dev: AWS Emulator od agentów, łatki Node.js 26.13.1 i CSS, który sam dobiera kolumny"
excerpt: "Lokalna kopia ponad 200 usług AWS zbudowana przez agentów, 17 poprawek bezpieczeństwa w Node.js, wtyczka chroniąca równoległe sesje Claude Code i layout galerii bez JavaScriptu."
publishedAt: "2026-11-12"
slug: "dailydev-aws-emulator-nodejs-26-13-1-claude-bulkhead-css-has"
hashtags: "#dailydev #aws #nodejs #security #css #agents #generated #pl"
source_pattern: "daily.dev"
---

## AWS Emulator, czyli lokalny AWS zbudowany przez agentów

**TLDR:** AWS wypuścił emulator ponad 200 usług i 400 modeli API, który działa lokalnie i offline. Zbudowały go agenci kodujące na podstawie modeli Smithy, a społeczność jest podzielona, czy to produkt, czy pokaz możliwości.

**Summary:** Emulator odwzorowuje ponad 200 usług AWS. Działa za darmo i bez konta w chmurze, jako serwer na Linuksie z pakietów RPM i Debian, w Dockerze na Windowsie i macOS, albo jako zależność deweloperska w Ruście dla izolowanych instancji testowych.

Proces powstania jest ciekawszy niż sam produkt. Agenci wzięli modele API w Smithy, napisali na ich podstawie testy zgodności, uruchomili je przeciwko prawdziwemu AWS, a potem budowali emulator, aż przechodził te same testy. Każda zmiana przechodzi jeszcze przez bramkę z adwersaryjnym przeglądem agentów od bezpieczeństwa.

Wątek dyskusji na daily.dev ma 125 komentarzy i mniej więcej równo dzieli się na pozytywne, mieszane i sceptyczne. Sceptycy pytają o wierność odwzorowania, dokumentację i listę otwartych problemów. Szczegóły praktyczne też bywają zaskakujące. Budowa ze źródeł wymaga 100 GB wolnego miejsca, a telemetria jest domyślnie włączona.

**Key takeaways:**
- Ponad 200 usług i 400 modeli API, offline i bez konta AWS.
- Zgodność sprawdzano testami uruchamianymi przeciwko prawdziwemu AWS.
- Telemetria jest domyślnie włączona, trzeba ją wyłączyć flagą, zmienną środowiskową lub konfiguracją.

**Why do I care:** Lokalne emulatory chmury to od lat źródło bólu, bo zawsze odstają od prawdziwego zachowania. Metoda testów sparowanych z prawdziwym AWS jest rozsądna, ale nikt nie powie ci, ile krawędzi nie pokrył żaden test. Zanim wpiszesz to do CI, sprawdź na własnych przypadkach, szczególnie IAM i zdarzenia asynchroniczne.

**Link:** [AWS Emulator: a local copy of 200+ AWS services, built by coding agents](https://daily.dev/posts/WVWEon8Fm)

## Node.js 26.13.1 łata 17 podatności

**TLDR:** To wydanie bezpieczeństwa dla linii LTS. Dziewięć z poprawionych CVE ma wysoką wagę, w tym zdalnie osiągalny crash serwera TLS.

**Summary:** Poprawki dotyczą modułów http2, tls, http, zlib i modelu uprawnień. Najpoważniejsze to crash serwera TLS wywoływany z zewnątrz oraz kilka błędów w obsłudze strumieni http2 i buforów. Średnia waga to przepełnienia bufora ALTSVC i ujawnianie danych uwierzytelniających proxy. Niska waga to wycieki do procesów potomnych w modelu uprawnień.

Wydanie podbija też zależności. llhttp trafia do wersji 9.4.4, undici do 8.12.4, sqlite do 3.54.1, a brotli do 1.2.1. Opis na daily.dev mówi o 19 CVE, a pytania i odpowiedzi pod nim o 17, więc liczbę warto sprawdzić w oficjalnym komunikacie.

**Key takeaways:**
- Wydanie bezpieczeństwa LTS z dziewięcioma podatnościami wysokiej wagi.
- Najbardziej narażone są serwery wystawione na ruch TLS i HTTP/2.
- Liczba CVE w źródłach się różni, 17 albo 19.

**Why do I care:** Jeśli twoje SSR działa na Node, to jest wystawiony serwer HTTP. Nie czekałbym z aktualizacją do kolejnego sprintu. Zespoły, które mają obraz bazowy przypięty do starego patcha, powinny to potraktować jak zwykłą pracę, a nie jak incydent.

**Link:** [Node.js 26.13.1 (LTS)](https://daily.dev/posts/cWTmIXk0p)

## claude-bulkhead i 507 komend, które mogły zepsuć inną sesję

**TLDR:** Autor przeanalizował dwa tygodnie logów Claude Code i znalazł 507 komend z ponad 101 tysięcy, które mogły rozwalić pracę innej równoległej sesji. Zrobił z tego wtyczkę z hookami.

**Summary:** Analiza objęła 1536 plików transkryptów, 204 sesje i 101 167 komend powłoki, ze szczytem 13 jednoczesnych sesji pierwszego listopada. Najgorszy przypadek to 25 wywołań git add -A w drzewie, w którym w ciągu dziesięciu minut pracowała inna sesja.

Wtyczka claude-bulkhead przechwytuje takie komendy przed wykonaniem. Blokuje na przykład pkill node, drugi npm run dev na zajętym porcie albo rm -rf na używanym worktree. Jest otwartoźródłowa, a tryb skanowania tylko do odczytu pozwala najpierw zobaczyć, ile twoich komend by zablokowała.

**Key takeaways:**
- 507 z 101 167 komend było ryzykownych dla innych sesji.
- Blokowanie działa przez hooki PreToolUse.
- Najpierw uruchom skan tylko do odczytu na własnych logach.

**Why do I care:** Autor jest też autorem wtyczki, więc liczby traktuj jako jego własną ilustrację problemu. Problem jednak jest prawdziwy. Gdy odpalamy kilka agentów w jednym repo, współdzielimy porty, procesy i indeks gita, a żadne narzędzie tego domyślnie nie pilnuje. Osobne worktree dla każdej sesji załatwia większość z tego taniej.

**Link:** [claude-bulkhead](https://daily.dev/posts/KkRMuCu6v)

## Niech CSS sam wybierze układ

**TLDR:** Komponent galerii może zmieniać liczbę kolumn zależnie od liczby elementów, bez JavaScriptu i bez propsów. Wystarczy :has() razem z :nth-child().

**Summary:** Technika sprawdza, ile dzieci ma kontener. Dla dwóch i czterech elementów daje dwie kolumny, dla sześciu trzy, a dla siedmiu i więcej cztery. Selektor w rodzaju gallery:has(:nth-child(5):last-child) trafia tylko w kontener z dokładnie pięcioma elementami. Wartość z fallbackiem pozwala nadpisać domyślną liczbę kolumn z zewnątrz.

Zyskujesz brak modyfikatorów klas i brak warunków w komponentach. Cena to czytelność, bo reguły oparte na liczbie dzieci szybko robią się kryptyczne.

**Key takeaways:**
- :has() z :nth-child() pozwala wykryć liczbę elementów.
- Domyślną liczbę kolumn da się nadpisać zmienną z fallbackiem.
- Przy wielu przypadkach zapis robi się trudny do utrzymania.

**Why do I care:** To dobry przykład, jak wiele logiki prezentacyjnej wyniosło się z Reacta do CSS. Ale jeśli liczba elementów zmienia znaczenie treści, a nie tylko wygląd, wolę jawny prop. Selektory nie powinny ukrywać decyzji produktowych.

**Link:** [Let CSS figure out the layout](https://daily.dev/posts/QItMozNL1)

## Qwen 4 Max Preview kontra Claude Opus 5.5

**TLDR:** Recenzent twierdzi, że Qwen 4 Max Preview dorównał Claude Opus 5.5 w każdym teście, który ukończył. Trzy testy w ogóle nie zwróciły odpowiedzi, a modelu nie kupisz jako zwykłego API.

**Summary:** W ukrytym zadaniu freelancerskim model dostał 12 na 12 punktów. Ale dostęp jest tylko przez miesięczne plany tokenowe za 6 do 43 dolarów, z zakazem automatyzacji, a podgląd wygasa 25 listopada. W teście wyszukiwania błędów aplikacja czatu nie przyjęła całej bazy 42 plików, bo zatrzymała ją zagadka z przesuwanymi klockami. Qwen nie ma więc wyniku, a Opus naprawił 15 z 16 podłożonych błędów za 2,24 dolara.

**Key takeaways:**
- Wyniki dotyczą tylko ukończonych testów, trzy próby zakończyły się brakiem odpowiedzi.
- Brak API pay-as-you-go i zakaz automatyzacji w planach.
- Podgląd kończy się 25 listopada.

**Why do I care:** Porównanie, którego nie da się powtórzyć w pipeline, jest dla mnie ciekawostką, nie przesłanką do wyboru modelu. Film nie mówi też nic o niezawodności na dłuższych sesjach. Przy takich materiałach pytam, czego autor nie mógł przetestować, a tu to akurat był cały test na dużej bazie kodu.

**Link:** [Qwen 4 Matched Claude - INSANE RESULTS](https://daily.dev/posts/gmtTDF3yF)
