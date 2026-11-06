---
title: "daily.dev: system design w czterech chmurach, testy Swinga, OpenTelemetry JS 3.0 i skrypty zamiast markdownów dla agentów"
excerpt: "Interaktywna ściąga z system designu, testowanie aplikacji Java Swing bez nazw komponentów, OpenTelemetry JavaScript SDK 3.0 oraz argument, że agentowi trzeba dawać skrypty, a nie pliki z zaleceniami."
publishedAt: "2026-11-06"
slug: "dailydev-system-design-swing-opentelemetry-3-skrypty-dla-agentow"
hashtags: "#dailydev #frontend #system-design #testing #opentelemetry #observability #nodejs #agents #devtools #generated #pl"
source_pattern: "daily.dev"
---

## Wizualna ściąga z system designu dla AWS, Azure, GCP i open source

**TLDR:** Ktoś zbudował otwartą stronę, na której ten sam projekt architektury można oglądać z nazwami usług AWS, Google Cloud, Azure albo narzędzi open source. Jest 36 systemów, 36 komponentów i 27 pojęć.

**Summary:** Autor chciał jednego miejsca, w którym da się porównać, jak ten sam system wygląda w różnych chmurach. Strona pokazuje na przykład YouTube'a, Ubera czy BookMyShow jako diagram, po którym przechodzi się krok po kroku, żądanie po żądaniu. Przy każdym systemie są wymagania, API, szacunki pojemności, model danych, wąskie gardła i uwagi o skalowaniu. Przełączenie dostawcy zmienia tylko etykiety, bo szkielet architektury zostaje ten sam.

Ciekawsza dla mnie jest strona techniczna. Całość to statyczny eksport Next.js na Vercelu, diagramy układa React Flow razem z ELK, styl robi Tailwind, a Zod pilnuje, żeby pliki z treścią zgadzały się ze schematem. Dzięki temu dodanie nowego systemu to głównie pisanie danych, a nie kodu interfejsu. To rozsądny wzorzec dla każdej strony z dużą ilością ustrukturyzowanej treści.

Czego autor nie mówi? Ściąga z system designu uczy nazw, ale nie uczy kompromisów. Prawdziwa trudność to wiedzieć, dlaczego w danej firmie wybrano kolejkę, a nie strumień, i ile to kosztowało. Diagram tego nie pokaże.

**Key takeaways:**
- Ten sam diagram można przełączać między generycznym widokiem a czterema zestawami usług.
- Stos to Next.js ze statycznym eksportem, React Flow, ELK, Tailwind i Zod.
- Schemat Zod sprawia, że nowa treść to dane, nie kod UI.

**Why do I care:** Jeśli prowadzisz rozmowy rekrutacyjne albo uczysz juniorów, to dobre źródło słownictwa, bo pokazuje, że "kolejka wiadomości" w AWS to SQS, a w GCP Pub/Sub. Dla architekta wartość jest mniejsza. Wzorzec z Zod i danymi zamiast komponentów warto za to ukraść do własnej dokumentacji.

**Link:** [I Built a Visual System Design Reference](https://daily.dev/posts/tSPiXpXjo)

## Testowanie aplikacji Java Swing bez nazywania komponentów

**TLDR:** TestDriver opisuje kroki testu zwykłym językiem i dopasowuje je do zrzutów ekranu działającej aplikacji. Nie trzeba dopisywać nazw komponentów w kodzie.

**Summary:** Klasyczne podejście, na przykład AssertJ Swing, wyszukuje komponenty po unikalnej nazwie ustawionej w źródle. To znaczy, że każde pole, w które test ma kliknąć, trzeba najpierw nazwać i potem pilnować, żeby nazwy się nie rozjechały. TestDriver idzie w drugą stronę. Uruchamia prawdziwą zainstalowaną aplikację w świeżej maszynie wirtualnej i szuka elementów po opisie, na przykład "pole tekstowe z liczbą wątków". Steruje prawdziwą myszą i klawiaturą.

W przykładzie test pobiera Apache JMeter, klika prawym przyciskiem na plan testów, dodaje grupę wątków i sprawdza, czy liczba wątków zostaje po przejściu w inne miejsce i powrocie. Test jest zwykłym plikiem Vitest, więc działa w CI, a aplikacja chodzi w chmurowym sandboxie, bez lokalnego wyświetlacza.

Warto zapytać o stabilność. Test oparty o dopasowanie obrazu będzie wolniejszy od testu po nazwach i bardziej podatny na zmiany wyglądu. Autor tego nie omawia. Nie ma też słowa o koszcie uruchamiania maszyny wirtualnej przy każdym teście.

**Key takeaways:**
- Kroki testu to opisy w języku naturalnym dopasowywane do zrzutów ekranu.
- Aplikacja działa w świeżej maszynie wirtualnej z prawdziwymi zdarzeniami wejścia.
- Test to plik Vitest uruchamiany w CI.

**Why do I care:** Ja tego Swinga nie dotykam, ale ten sam pomysł dotyczy aplikacji Electron i starych desktopów w firmach, gdzie nikt nie dodał test ID. Dla zespołu z takim długiem to sposób, żeby w ogóle zacząć testować. Zanim to wdrożysz, zmierz, ile trwa jeden test.

**Link:** [How to Automate Testing of a Java Swing Application](https://daily.dev/posts/lLIMtR6Pc)

## OpenTelemetry JavaScript SDK 3.0

**TLDR:** SDK 3.0 wymaga Node.js 22.15 lub nowszego, ma poprawne eksporty ESM i CommonJS, a logi są już stabilne. Razem ze śladami i metrykami wszystkie trzy sygnały są stabilne w JavaScripcie.

**Summary:** Wersja 3.0 wychodzi razem z API 1.10.0. Najbardziej odczuwalna zmiana to nowe minimum, czyli Node.js od 22.15, więc Node 18 i 20 odpadają. Node 20 kończy życie w kwietniu 2026, więc to zgodne z kalendarzem, ale zespoły na starszych środowiskach muszą zaplanować aktualizację. Wszystkie paczki dostarczają teraz porządne eksporty ESM i CommonJS, co ma ułatwić życie użytkownikom bundlerów.

Usunięto kilka przestarzałych paczek, między innymi eksporter i propagator Jaegera oraz nakładki OpenTracing i OpenCensus. Paczka api-logs została wchłonięta przez główne API. Gałąź 2.x będzie wspierana przez rok od premiery.

Autor wpisu nie mówi, jak bolesna będzie migracja dla większych projektów. Rok wsparcia dla 2.x to rozsądny margines, ale tylko jeśli ktoś faktycznie go wykorzysta, a nie odłoży sprawę.

**Key takeaways:**
- Minimalna wersja Node.js to 22.15.
- Ślady, metryki i logi są stabilne w JavaScripcie.
- Jaeger oraz shimy OpenTracing i OpenCensus zniknęły.
- SDK 2.x ma rok wsparcia.

**Why do I care:** Jeśli masz backend w Node z OpenTelemetry, w tym kwartale trzeba sprawdzić wersję Node w produkcji. Stabilne logi oznaczają, że można wreszcie przestać trzymać osobne rozwiązanie do logowania obok śladów. Zacznij od repozytoriów, które jeszcze importują usunięte paczki.

**Link:** [Announcing the OpenTelemetry JavaScript SDK 3.0](https://daily.dev/posts/aB7CsCnA1)

## Nie pisz markdownów dla agenta, pisz skrypty

**TLDR:** Pliki z instrukcjami dla agenta to rekomendacje, nie ograniczenia. Skuteczniejsze jest zamienienie reguł w skrypty, które zwracają sukces albo porażkę.

**Summary:** Agent musi zinterpretować tekst z AGENTS.md czy CLAUDE.md, zważyć go z resztą kontekstu i zdecydować. Sformułowania typu "używaj istniejących konwencji logowania" albo "pisz małe funkcje" zostawiają miejsce na uzasadnianie odstępstw. Agent potrafi uznać, że sprzeczny kod oznacza przestarzałą dokumentację.

Autor proponuje zastąpić prozę skryptami, takimi jak lint, format, test czy cele w Makefile. W jego eksperymencie reguła "zdania do 20 słów" stała się skryptem ze stałą maksymalnej długości, uruchamianym hakiem Stop w Claude Code po każdej odpowiedzi. W dziesięciu odpowiedziach agenta skrypt wykrył dziewięć naruszeń i odesłał agenta do poprawki. Drugi przykład to poprawka w Ruby napisana bez zainstalowanego Rubiego. Pierwszy bieg CI padł, a winny okazał się test, nie kod, i agent nie musiał oceniać własnej pracy.

Wniosek autora jest taki, żeby każdy lokalny hak miał odpowiednik w wymaganym zadaniu CI i bramce przed merge, której agent nie może zmienić. To ostatnie zdanie jest najważniejsze, bo hak lokalny agent może po prostu wyłączyć.

Czego tu brakuje? Skrypt łapie tylko to, co da się zmierzyć. Reguły o architekturze i nazewnictwie nadal wymagają tekstu i człowieka. Eksperyment na dziesięciu odpowiedziach to też mała próba.

**Key takeaways:**
- Instrukcje w markdownie są interpretowane, więc mogą być ominięte.
- Reguły warto zamieniać na skrypty ze statusem wyjścia.
- Hak Stop pozwala wrócić agentowi do poprawki po każdej odpowiedzi.
- Prawdziwą gwarancją jest wymagany job CI.

**Why do I care:** To zgadza się z tym, co widzę w projektach. Plik z regułami rośnie, agent go ignoruje, a zespół dopisuje kolejne zdania. Lepiej przenieść trzy najczęściej łamane reguły do lintera i wymagać go w pipeline. Markdown zostaw na to, czego maszyna nie sprawdzi.

**Link:** [Don't Write Markdown Files for Your Coding Agent. Write Scripts.](https://daily.dev/posts/GIqM4P76d)
