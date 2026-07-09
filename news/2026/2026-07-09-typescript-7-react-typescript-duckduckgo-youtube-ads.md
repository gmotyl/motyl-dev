---
title: "TypeScript 7.0, React z TypeScript i DuckDuckGo blokuje reklamy YouTube"
excerpt: "W tym odcinku: TypeScript 7.0 napisany w Go z 10-krotnym przyspieszeniem, kurs React z TypeScript od freeCodeCamp oraz DuckDuckGo, który teraz blokuje reklamy wideo na YouTube."
publishedAt: "2026-07-09"
slug: "typescript-7-react-typescript-duckduckgo-youtube-ads"
hashtags: "#dailydev #frontend #webdev #typescript #react #duckduckgo #generated #pl"
source_pattern: "daily.dev"
---

## Announcing TypeScript 7.0

**TLDR:** TypeScript 7.0 to natywny port kompilatora napisany w Go, który przynosi od 8 do 12 razy szybsze buildy. To nie jest zwykły release z nowymi flagami — to przepisanie całego toolsetu od podstaw z naciskiem na wydajność i wielowątkowość.

**Summary:**

TypeScript 7.0 to największa zmiana w historii projektu. Microsoft przepisał cały kompilator w Go, korzystając z natywnej prędkości kodu maszynowego, współdzielonej pamięci i wielowątkowości. Brzmi jak ekscepcja, ale liczby mówią same za siebie: build projektu VS Code skrócił się z 125 sekund do niespełna 11, Sentry z 140 do 16, Bluesky z 24 do 2,8 sekundy. To nie są optymalizacje na marginesie — to zmiana rzędu wielkości.

Co ważne, autorzy zrobili port "faithfully" — zachowując strukturę i logikę oryginalnego kodu TypeScript. Cel był jeden: żeby wyniki obu kompilatorów były identyczne. I w większości przypadków tak jest. Kod, który kompiluje się z TypeScript 6.0, powinien działać z 7.0 bez zmian, o ile nie korzystasz z już zdeprecjonowanych flagach.

Wielowątkowość jest tutaj przemyślana. TypeScript 7 uruchamia równolegle parsowanie, type-checking i emitowanie. Type-checking jest szczególnie interesującym przypadkiem, bo pliki mają zależności między sobą i nie można ich sprawdzać całkowicie niezależnie. Rozwiązanie: fixed pool workerów, każdy z własnym widokiem świata, dzielący identycznie te same pliki wejściowe. Można konfigurować liczbę workerów flagą `--checkers`, domyślnie 4. Na potężniejszych maszynach warto to podnieść.

Nowe `--watch` zostało przebudowane na bazie watchera z Parcel, przeportowanego z C++ do Go. To nie jest detal — poprzedni watcher miał problemy ze stabilnością cross-platform, a nowe rozwiązanie przynosi istotne oszczędności zasobów.

Jest kilka ważnych breaking changes. TypeScript 7.0 nie ma jeszcze API programistycznego — to będzie w 7.1. To oznacza, że narzędzia jak Volar (Vue, Svelte, Astro, MDX, Angular templates) jeszcze nie mogą z niego korzystać i muszą pozostać na 6.0. Microsoft dostarcza pakiet `@typescript/typescript6` z binarką `tsc6`, żeby można było mieć oba kompilatory równocześnie. To trochę niewygodne, ale przejściowe.

Zmiany w konfiguracji są realne. `strict` jest teraz domyślnie `true`. `module` domyślnie `esnext`. `rootDir` domyślnie `./`. Lista `types` domyślnie pusta. Dla nowych projektów to dobrze — sensowniejsze defaults. Dla istniejących projektów — trzeba będzie przejrzeć tsconfig.

**Key takeaways:**
- Build VS Code: 126s → 11s (11.9x szybciej), Sentry: 140s → 16s (8.9x)
- Domyślnie 4 równoległe type-checkery, konfigurowane przez `--checkers`
- Nowy `--watch` oparty o Parcel watcher (Go port)
- Brak API programistycznego do 7.1 — Vue/Svelte/Astro/Angular templates zostają na TS 6.0
- Pakiet `@typescript/typescript6` dla koegzystencji obu wersji
- Breaking: `strict: true`, `module: esnext`, `types: []` jako nowe domyślne wartości
- VS Code zobaczy błąd w 1.3s zamiast 17.5s od otwarcia edytora
- Slack: type-checking w CI z 7,5 min do 1,25 min; Microsoft News Services: oszczędność 400h miesięcznie w CI

**Why do I care:** Jako senior developer pracujący na dużych codebases, ten release to najbardziej praktyczna zmiana od lat. Nie chodzi tylko o szybkość — chodzi o to, że przy TypeScript 6 language server w dużych projektach był praktycznie bezużyteczny lokalnie i trzeba było polegać na CI. TypeScript 7 to zmiana, która sprawia, że type-checking znowu ma sens w codziennej pracy. Jedyne zastrzeżenie: jeśli Twój projekt używa Vue, Svelte lub Astro, to jeszcze nie czas na migrację — poczekaj na API w 7.1.

**Link:** [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)

---

## Level Up Your React Skills with TypeScript

**TLDR:** freeCodeCamp opublikował godzinny kurs wideo prowadzony przez Rachel Johnson, który pokazuje jak przepisać prawdziwy projekt React na w pełni typebezpieczny TypeScript. Kierowany do tych, którzy znają React, ale TypeScript traktują jako opcję, nie fundament.

**Summary:**

Kurs zaczyna się od odświeżenia podstaw TypeScript w izolacji, zanim przejdzie do Reacta. To dobry pomysł, bo większość problemów z TypeScript w React bierze się z niezrozumienia jak działa system typów, a nie z React API jako takim.

Główna część kursu skupia się na kilku konkretnych wzorcach. Typowanie `useState` — przejście od wnioskowania typów do jawnych adnotacji, żeby stan miał precyzyjnie określony kształt. Definiowanie propsów jako osobnych typów lub interfejsów dla każdego komponentu, co wymusza myślenie o kontrakcie między komponentami. Typowanie callbacków przekazywanych jako propsy — klasyczny wzorzec, który w JavaScript jest źródłem błędów i niejasności, a w TypeScript staje się samo-dokumentujący.

Refaktoryzacja istniejącego projektu to wartościowy wybór formatu. Widać wtedy nie tylko "jak zrobić X w TypeScript" ale też "jak myśleć o migracji" — które typy są proste do dodania, a gdzie trzeba przebudować strukturę danych.

Mam jedno zastrzeżenie wobec tego kursu: godzinne wideo freeCodeCamp to solidny punkt startowy, ale nie wyczerpuje tematu. Brakuje tu advanced patterns — conditional types, generics, discriminated unions, `satisfies` operator. Dla kogoś, kto naprawdę chce TypeScript w React opanować, to dopiero pierwszy krok. Czego kurs nie dotyka: komponentów wyższego rzędu z generics, typowania custom hooków, typowania context API. To nie zarzut wobec kursu — po prostu warto wiedzieć, co jest poza jego zakresem.

**Key takeaways:**
- Kurs dostępny na YouTube kanale freeCodeCamp.org, ok. 1 godzina
- Prowadzony przez Rachel Johnson
- Tematy: `useState` z jawnymi typami, typy propsów, function props jako callbacki
- Format: refaktoryzacja istniejącego projektu (nie projekt od zera)
- Dobry punkt wejścia dla React deweloperów bez TypeScript

**Why do I care:** Sam często widzę, jak juniorzy i midzi używają TypeScript w React na poziomie "dodaję typy żeby CI nie krzyczał". Ten kurs może pomóc zrozumieć, że typy to narzędzie projektowania API komponentów, nie tylko dokumentacja. Warto polecić komuś z zespołu kto dopiero zaczyna. Dla mnie osobiście nie ma tu nic nowego, ale jako materiał onboardingowy — solidny.

**Link:** [Level Up Your React Skills with TypeScript](https://www.freecodecamp.org/news/level-up-your-react-skills-with-typescript/)

---

## DuckDuckGo Browser Now Blocks YouTube Video Ads

**TLDR:** DuckDuckGo ogłosiło, że jego przeglądarka teraz blokuje reklamy wideo na YouTube, w tym te przed filmem i w trakcie odtwarzania. Funkcja jest domyślnie włączona na iOS, Mac i Windows; na Androidzie trzeba ją włączyć ręcznie.

**Summary:**

DuckDuckGo korzysta z list filtrów utrzymywanych przez społeczność uBlock Origin, uzupełnionych własnymi regułami kompatybilności. To ważna informacja techniczna: nie budują od zera własnego rozwiązania, tylko stają na barkach giganta. uBlock Origin to jeden z najbardziej dojrzałych i skutecznych adblockerów na rynku, więc wybór tych list ma sens.

Warto odróżnić tę funkcję od Duck Player — wbudowanego odtwarzacza YouTube w DuckDuckGo, który używa najbardziej restrykcyjnych ustawień prywatności YouTube i blokuje śledzenie oraz spersonalizowane reklamy. Nowe blokowanie reklam działa na standardowej stronie youtube.com, nie przez Duck Player. Można używać obu jednocześnie.

Pewne ograniczenia są uczciwie przyznane: YouTube regularnie zmienia sposób serwowania reklam, więc blokowanie może przejściowo przestać działać do czasu aktualizacji reguł. Mogą też pojawić się minimalnie dłuższe czasy buforowania. To nie jest wada DuckDuckGo specyficznie — każdy adblocker oparty o filter listy ma ten sam problem.

Kontekst rynkowy jest ciekawy. DuckDuckGo dołącza do Brave i Opery, które już mają wbudowane blokowanie reklam YouTube. To trochę meta-komentarz do całego ekosystemu: skoro trzy przeglądarki niezależnie budują tę funkcję, to wyraźnie widać gdzie leży popyt użytkowników. Z perspektywy twórców na YouTube ta sytuacja jest jednak mniej różowa — reklamy to ich główne źródło przychodu.

**Key takeaways:**
- Domyślnie włączone na iOS, Mac, Windows; ręcznie na Android (Settings > Ad Blocking)
- Oparte na filter listach uBlock Origin, uzupełnionych własnymi regułami
- Osobne od Duck Player — działa na standardowej youtube.com
- Możliwe tymczasowe przestoje przy zmianach YouTube w serwowaniu reklam
- DuckDuckGo dołącza do Brave i Opera z wbudowanym blokowaniem reklam YouTube

**Why do I care:** Jako developer spędzam dużo czasu na YouTube oglądając konferencje, tutoriale i screencasety techniczne. Rosnąca agresywność reklam YouTube jest irytująca, więc każde natywne rozwiązanie przeglądarki jest dla mnie interesujące. Nie zamierzam zmieniać przeglądarki dla tej funkcji, ale dobrze wiedzieć, że opcje poza rozszerzeniami istnieją. Warto też obserwować jak YouTube będzie reagować — wyścig zbrojeń z adblockerami trwa od lat i raczej nie skończy się w najbliższym czasie.

**Link:** [DuckDuckGo browser now blocks YouTube video ads](https://www.bleepingcomputer.com/news/software/duckduckgo-browser-now-blocks-youtube-video-ads/)

---
