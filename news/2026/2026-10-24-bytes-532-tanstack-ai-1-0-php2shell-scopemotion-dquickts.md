---
title: "Bytes #532: TanStack AI 1.0, luka PHP2Shell, scopeMotion i JavaScript w QuickJS z trwałym wykonaniem"
excerpt: "Numer Bytes po PHP2Shell: stabilne TanStack AI 1.0 z eksperymentalnym harnessem agentów, Patch the Planet od OpenAI, scopeMotion w Motion 14.5 i dquickts."
publishedAt: "2026-10-24"
slug: "bytes-532-tanstack-ai-1-0-php2shell-scopemotion-dquickts"
hashtags: "#uidev #javascript #typescript #ai #agents #tanstack #security #php #animation #generated #pl"
source_pattern: "ui.dev"
---

## PHP2Shell: Pouring One Out for PHP

**TLDR:** Redakcja Bytes poświęciła numer luce PHP2Shell, która pozwala zdalnie uruchomić polecenia na serwerze z podatnym PHP. Poprawione wersje to 8.5.12, 8.4.27, 8.3.36 i 8.2.35. Autorzy dodają, że Node.js też dostał groźną łatkę, w dekoderze Brotli.

**Summary:** Mechanizm jest sprytny. Atakujący wysyła do dowolnej strony żądanie multipart z ukrytym poleceniem i fałszywymi strukturami danych, a całość dopycha ogromną liczbą nagłówków i tysiącami pustych pól plików. PHP kończy mu się pamięć w trakcie parsowania, a złośliwy ładunek zostaje w pamięci. Podczas zamykania tego samego żądania kod sprzątający idzie po półzbudowanym stanie, podąża za wskaźnikiem podłożonym przez atakującego i wykonuje ładunek z uprawnieniami serwera.

Badacze z Wiz opisują to jako punkt zwrotny dla ery AI. Błędy siedziały w kodzie od ponad dekady, a zbudowanie działającego exploita wymagało łańcucha kilku usterek i dopasowania do układu pamięci każdego celu. Modele pierwszej linii skróciły tę pracę do godzin. Wiz podaje, że użył Gemini 4 Argon i GPT 5.6 Sol, a jeden badacz zrobił w tydzień to, co wcześniej zajęłoby zespołowi światowej klasy miesiące.

Bytes kończy tę część uwagą, że dzień rozrachunku dla programistów JavaScriptu też nadchodzi, bo Node.js właśnie dostał poprawkę o wysokiej wadze w dekoderze Brotli. Ton jest żartobliwy, ale wniosek poważny: łatek będzie więcej i będą przychodzić szybciej.

**Key takeaways:**
- Luka siedzi w samym PHP, więc dotyczy każdej aplikacji na podatnej wersji, nie tylko WordPressa.
- Reguły WAF Cloudflare blokują znane próby ataku, ale pełną naprawą jest aktualizacja.
- Ten sam tydzień przyniósł poważną łatkę Node.js.

**Why do I care:** To historia głównie dla backendu i ops, ale frontendowiec odpowiada za to, co stoi przed jego aplikacją, czyli za CMS, panel admina czy stary hosting. Autor Bytes traktuje to jak żart o planach produktowych na czwarty kwartał, a ja bym to potraktował jak realny koszt: czas na aktualizacje trzeba wpisać do planu, bo okno między ujawnieniem a masowym exploitem się kurczy.

**Link:** [PHP2Shell: AI uncovers critical RCE vulnerabilities affecting 70% of the Internet](https://www.wiz.io/blog/php2shell-php-rce)

## Patch the Planet od OpenAI i milion dolarów od Sentry

**TLDR:** OpenAI uruchomiło inicjatywę, w której agenci znajdują krytyczne luki, a opiekunowie pakietów dostają zgłoszenie przed ogłoszeniem publicznym. Sentry przekazało milion dolarów opiekunom open source.

**Summary:** Patch the Planet to koordynowane ujawnianie podatności. Zamiast leczyć raka, jak ujął to autor Bytes, agenci szukają dziur, a ich opiekunowie dostają czas na poprawkę, zanim wiedza trafi do wszystkich. Wiąże się to bezpośrednio z PHP2Shell, który przeszedł dokładnie taką ścieżkę: od zgłoszenia w sierpniu do publicznej łatki w październiku.

Sentry po raz kolejny dało milion dolarów opiekunom open source. Bytes przypomina przy okazji o Open Source Pledge, czyli inicjatywie zbierania funduszy od firm na ważne projekty.

**Key takeaways:**
- Koordynowane ujawnianie staje się procesem obsługiwanym przez agentów AI.
- Finansowanie opiekunów to wciąż rzecz dobrowolna.

**Why do I care:** Jeśli twój produkt stoi na dziesiątkach pakietów open source, a zwykle stoi, to ten model zgłoszeń przed ujawnieniem decyduje, czy dowiesz się o dziurze przed atakującym. Warto sprawdzić, czy ktoś u was w ogóle czyta listy bezpieczeństwa używanych zależności.

**Link:** [Patch the Planet: global response coordination as agents uncover critical vulnerabilities](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/)

## TanStack AI 1.0

**TLDR:** TanStack AI wypuściło pierwsze stabilne wydanie. Rdzeń API jest stabilny, a nowy harness agentów jest oficjalnie eksperymentalny.

**Summary:** Mniej niż rok temu TanStack AI to była jedna funkcja chat, cztery dostawcy i obietnica braku uzależnienia od jednego z nich. Dziś to zestaw do czatu, narzędzi, mediów, MCP, trwałości, piaskownic i agentów, z 23 adapterami dostawców i ośmioma frameworkami interfejsu. Przy projekcie pracowało ponad 140 osób, choć utrzymuje go trzech opiekunów.

Wersja 1.0 nie wprowadza nowych pojęć. Usunięto wszystkie interfejsy oznaczone wcześniej jako przestarzałe, a każdy zamiennik istniał już w serii 0.x. Najważniejsze zmiany łamiące to wymagany identyfikator wątku po obu stronach, zmiana nazw dwóch pól oraz koniec starego sposobu zatwierdzania narzędzi. Aktualizację ułatwia automatyczne przepisanie nazw i sprawdzenie typów, ale zapisanych rozmów, przebiegów i plików to nie dotyczy, więc przed wdrożeniem trzeba przejść osobną procedurę z przewodnika.

Nowość to pakiet harness, czyli otwarta sesja agenta, która przyjmuje kolejne wiadomości w trakcie pracy, uruchamia innych agentów i przetrwa restart, jeśli dostanie trwały magazyn. Autorzy przyznają uczciwie, że jest eksperymentalny, że uprawnienia nie są piaskownicą i że odzyskiwanie po restarcie ma jeszcze ograniczenia.

**Key takeaways:**
- Rdzeń TanStack AI jest stabilny, harness agentów jest eksperymentalny i zostaje na wersji 0.x.
- Wszystkie pakiety stabilne trzeba aktualizować jednocześnie.
- Migracja nie obejmuje zapisanych danych, trzeba to zrobić osobno.

**Why do I care:** Dla zespołów na React albo Vue to poważna alternatywa dla jednego dostawcy SDK, bo adapter wymienia się bez przepisywania aplikacji. Zastrzegam jednak, że to wciąż projekt trzech osób, więc przy decyzji o wdrożeniu produkcyjnym liczyłbym ryzyko ciągłości, nie tylko listę funkcji. Harness traktowałbym jako prototyp.

**Link:** [TanStack AI 1.0: Still Your AI, Still Your Way](https://tanstack.com/blog/tanstack-ai-1-0)

## Krótko: scopeMotion, dquickts, Reylo i leksykalny parser na GPU

**TLDR:** Motion 14.5 dodaje scopeMotion, Stencil Labs otwiera dquickts, a Shu Ding opisuje lekser działający na GPU.

**Summary:** Biblioteka dawniej znana jako Framer Motion dostała w wydaniu 14.5 funkcje scopeMotion i useScopeMotion. Pozwalają grupować animacje, łatwo je sprzątać, dopasowywać zapytania medialne, ustawiać domyślne przejścia i ograniczać zasięg do elementu.

Stencil Labs otworzyło dquickts, rozwidlenie silnika QuickJS, które natywnie uruchamia TypeScript i ma trwałe wykonanie. Działający kod można zawiesić, zapisać cały stos w migawce i wznowić w innym procesie. Colin McDonnell zbudował Reylo, czyli bibliotekę importującą pliki SQL do TypeScriptu z pełnym wnioskowaniem typów. Shu Ding opisał pomysły stojące za leksykiem GPU do podświetlania składni w przeglądarce, który jest wolniejszy od wyrażeń regularnych, ale ciekawy jako eksperyment.

**Key takeaways:**
- scopeMotion upraszcza sprzątanie animacji w komponentach.
- dquickts łączy QuickJS, TypeScript i wznawialne wykonanie.
- Reylo daje typy z plików SQL bez ORM.

**Why do I care:** Trwałe wykonanie w lekkim silniku JS ma sens dla agentów, które muszą przetrwać restart. Z kolei Reylo to dobry sygnał dla zespołów zmęczonych ciężkimi ORM. Sprawdziłbym go przy małym serwisie, zanim ktokolwiek ogłosi koniec ORM.

**Link:** [scopeMotion() | Group and clean up animations in JavaScript | Motion](https://motion.dev/docs/scope-motion)

**Link:** [GitHub - stencil-hq/dquickts](https://github.com/stencil-hq/dquickts)

**Link:** [Ideas Behind GPU Lexer - Shu Ding](https://shud.in/thoughts/ideas-behind-gpu-lexer)
