---
title: "WebMCP przed GA, własny agent kontra API i Gemini 4 Neon na tle Opus 5.5"
excerpt: "Dwa tematy z daily.dev: WebMCP trafia do GA tylko w Chromium oraz teza, że użytkownicy chcą własnych agentów podpiętych do twojego produktu."
publishedAt: "2026-11-25"
slug: "daily-dev-webmcp-ga-wlasny-agent-vs-api-gemini-4-neon"
hashtags: "#dailydev #frontend #webdev #javascript #agents #ai #generated #pl"
source_pattern: "daily.dev"
---

## WebMCP zmierza do GA, ale zaproszono tylko Chromium

**TLDR:** WebMCP pozwala stronie wystawić agentom własne narzędzia zamiast zmuszać ich do sterowania przez zrzuty ekranu. Przed GA API dostaje zmiany łamiące zgodność, a wsparcie ma wyłącznie Chromium.

**Summary:** WebMCP to propozycja standardu, w którym strona sama rejestruje funkcje możliwe do wywołania przez agenta AI. Zamiast klikać po pikselach i zgadywać, gdzie jest przycisk koszyka, agent dostaje jawne narzędzie z opisem i schematem danych. Dyskusja pod wpisem jest w większości entuzjastyczna i dotyczy szczegółów wdrożenia: nieaktualnych referencji do narzędzi, wyrejestrowywania oraz potwierdzeń dla ryzykownych akcji, takich jak finalizacja zamówienia.

Przed GA zmieniono kilka rzeczy. Funkcja pobierająca narzędzia zwraca teraz prawdziwe obiekty, a wywołanie narzędzia wymaga obiektu pochodzącego z tej funkcji, nie ręcznie zbudowanego. Pole wskazujące okno zostało przemianowane na źródło i staje się puste, gdy dokument, który narzędzie zarejestrował, zniknie. Brakujące schematy wejścia i wyjścia oraz adnotacje zwracają teraz null zamiast undefined.

Najciekawsza jest poprawka bezpieczeństwa. Wcześniej narzędzie wyszukiwano po nazwie, więc gdyby strona między dwoma wywołaniami podmieniła narzędzie dodania do koszyka na nową wersję z innym schematem, agent po cichu uruchomiłby nowe narzędzie ze starymi argumentami. Teraz nieaktualna referencja kończy się błędem NotFoundError. To drobna zmiana, która eliminuje całą klasę błędów typu time-of-check do time-of-use.

Kłopot jest polityczny. WebMCP działa tylko w przeglądarkach opartych na Chromium, Mozilla zachowuje neutralność, a Apple jest przeciw, powołując się na prywatność i technologie wspomagające. Autor wpisu nie mówi, co się stanie, jeśli standard zostanie przy jednym silniku. Trzeba też pamiętać, że narzędzia wystawione agentowi to nowa powierzchnia ataku, a potwierdzenia dla płatności są zostawione implementatorom.

**Key takeaways:**
- Strona może wystawić agentom narzędzia z jawnym schematem zamiast ekranowego klikania.
- Przed GA zmieniły się typy zwracane i nazwy pól, więc integracje trzeba przejrzeć.
- Nieaktualne referencje do narzędzi kończą się teraz błędem zamiast cichego wykonania.
- Wsparcie to na razie tylko Chromium, Apple jest przeciw, Mozilla neutralna.

**Why do I care:** Jeśli budujesz frontend, który agenci mają obsługiwać, WebMCP jest sensowniejszy niż dopasowywanie selektorów do zrzutów. Ale nie projektowałbym na nim jedynej ścieżki, dopóki Safari i Firefox milczą. Traktuj to jako progresywne ulepszenie, a akcje z konsekwencjami finansowymi zawsze zabezpiecz po stronie serwera.

**Link:** [WebMCP is heading to GA, and only Chromium is invited](https://daily.dev/posts/UnSIgjybE)

## Nikt nie chce twojego agenta, chcą swojego podpiętego do twoich rzeczy

**TLDR:** Zespół porzucił własny produkt AI do zarządzania projektami, bo nikt go nie chciał. Wniosek: lepiej wystawić czyste API niż budować markowego agenta.

**Summary:** Wpis opisuje zespół, który skasował własny produkt agentowy po tym, jak okazało się, że użytkownicy go nie potrzebują. Wes Bos podsumował to zdaniem, że nikt nie chce używać twojego agenta, ludzie chcą używać twojej rzeczy ze swoim agentem. Kent C. Dodds powtórzył tę samą tezę: użytkownik chce, by jego agent miał dostęp do danych i akcji twojego produktu.

Pod spodem jest zmiana w tym, gdzie leży wartość. Jeśli ludzie mają już ulubionego agenta, wbudowany asystent w każdej aplikacji to kolejne okno, kolejny kontekst i kolejne uprawnienia do ogarnięcia. Dobrze opisane API, integracje i narzędzia są wtedy cenniejsze niż sam interfejs czatu.

Warto jednak zauważyć, czego tekst nie rozstrzyga. Wpis opiera się na jednym doświadczeniu i dwóch cytatach, a nie na danych o tym, jak użytkownicy faktycznie pracują. Pomija też koszt: wystawienie API, które agent może bezpiecznie wywoływać, wymaga uprawnień, limitów i audytu, a to potrafi być droższe niż prosty asystent. Ignoruje wreszcie produkty, w których agent daje przewagę dzięki wiedzy o domenie.

**Key takeaways:**
- Użytkownicy wolą własnych agentów od markowych asystentów w każdej aplikacji.
- Czyste API i integracje stają się główną powierzchnią produktu.
- Teza opiera się na pojedynczym przypadku i opiniach, nie na danych.

**Why do I care:** To zmienia priorytety architektoniczne. Zamiast kolejnego okienka czatu zainwestowałbym w stabilne, dobrze udokumentowane API i model uprawnień dla agentów. To też argument dla WebMCP z poprzedniego tematu.

**Link:** [Nobody wants your agent. They want theirs, plugged into your stuff](https://daily.dev/posts/dVZA7KLoi)

## Czy Gemini 4 Neon dorównuje Opus 5.5

**TLDR:** Wątek w daily.dev pyta, czy Gemini 4 Neon jest na poziomie Opus 5.5. W mailu jest tylko pytanie użytkownika, bez odpowiedzi.

**Summary:** Pozycja z listy to w praktyce pytanie z mediów społecznościowych: czy prawdą jest, że Neon dorównuje Opus 5.5, i co mówią ci, którzy go próbowali. Sama treść nie zawiera żadnych pomiarów. Wiarygodniejsze odpowiedzi dają osobne zestawienia benchmarków, a opinie bywają rozbieżne, bo wynik zależy od narzędzia, w którym model uruchamiamy, i od limitu kosztów.

**Key takeaways:**
- Wątek to pytanie bez danych, nie wynik testu.
- Porównania modeli trzeba opierać na benchmarkach z opisaną metodologią.

**Why do I care:** Zanim przełączysz model w projekcie na podstawie wpisu w mediach społecznościowych, uruchom własny zestaw zadań z repozytorium. Cudze wrażenia nie zastąpią testu na twoim kodzie.

**Link:** [Wait, what? Is Gemini 4 Neon on par with Opus 5.5?](https://daily.dev/posts/IaOMbLVn5)
