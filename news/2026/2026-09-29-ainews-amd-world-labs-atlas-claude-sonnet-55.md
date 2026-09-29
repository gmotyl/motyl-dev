---
title: "AMD kupuje World Labs za 8,2 mld dolarów, a Claude Sonnet 5.5 ląduje dzień przed DevDay OpenAI"
excerpt: "AINews o przejęciu World Labs przez AMD i modelu Atlas rozwiązującym rekonstrukcję przestrzenną z rzadkich danych, oraz o premierze Claude Sonnet 5.5 — szybszego i tańszego niż Sonnet 5, wypuszczonego tydzień po Opus 5.5 i dzień przed DevDay OpenAI."
publishedAt: "2026-09-29"
slug: "ainews-amd-world-labs-atlas-claude-sonnet-55"
hashtags: "#AINews #ai #llm #agents #generated #pl"
source_pattern: "AINews"
---

## AMD kupuje World Labs za 8,2 mld dolarów, model Atlas rozwiązuje rzadką rekonstrukcję sceny

**TLDR:** AMD przejęło startup Fei-Fei Li, World Labs, za oficjalnie nieujawnioną, ale — dzięki statusowi spółki publicznej AMD — możliwą do wyliczenia kwotę 8,2 miliarda dolarów. Kluczowym aktywem jest model Atlas, który przewiduje nowy widok kamery z serii zdjęć 2D podobnie jak LLM przewiduje kolejny token, rozwiązując od dawna nierozwiązany problem rzadkiej rekonstrukcji w widzeniu komputerowym.

**Summary:** World Labs, założone przez Fei-Fei Li w 2024 roku, zbudowało zespół trenujący modele przestrzennej inteligencji AI dla obrazu, wideo i rekonstrukcji przestrzennej, a dzięki przejęciu startupu SceniX rozwija też symulacje dla robotyki. Sercem przejęcia jest model Atlas — pierwsza w swoim rodzaju architektura typu omni, trenowana od zera, która przewiduje nowy widok kamery na podstawie wejściowych obrazów 2D, tak jak duże modele językowe przewidują kolejny token w linii tekstu, i przy tym przebija wyniki modeli wyspecjalizowanych w tym zadaniu. W praktyce oznacza to rozwiązanie długo nierozwiązanego problemu rzadkiej rekonstrukcji sceny przez połączenie modeli generatywnych z geometrią wielowidokową, co ma bezpośrednie zastosowania od projektowania i inżynierii po naukę i robotykę — środowiska uczenia przez wzmacnianie dla robotów, generowanie scen do terapii i rozrywki, oraz rekonstrukcję rzeczywistych przestrzeni na potrzeby nieruchomości, projektowania i budownictwa.

Główną wiadomością tygodnia jest jednak premiera Claude Sonnet 5.5, drugiego modelu z rodziny Claude 5.5, wypuszczonego tydzień po Opus 5.5 i dzień przed DevDay OpenAI. Niezależne testy plasują go blisko Opus 5.5 na kilku rankingach, a Anthropic określa go jako wyraźny skok względem Sonnet 5, działający ponad 30% szybciej i tańszy nawet o 30% dla większości typowych zadań. Model jest pozycjonowany do dobrze zdefiniowanych, codziennych zadań jak naprawianie błędów i szybkie iterowanie nad funkcjami, a Anthropic opublikował też przewodnik pomagający wybrać między Sonnet a Opus 5.5, migrować z Sonnet 5 i dostrajać poziom wysiłku modelu. Sonnet 5.5 od razu zasila darmowy poziom na claude.ai, podczas gdy darmowy poziom ChatGPT wciąż korzysta z GPT-5.6 Luna, ocenianego jako wyraźnie mniej zdolny.

Warta odnotowania jest też zmiana dotycząca anty-destylacji: rozszerzone "zachowane rozumowanie" ma przeciwdziałać kopiowaniu modelu przez przełączanie kont — ślady rozumowania zostają przypisane do organizacji, która je wygenerowała, a jeśli sesja trafi na inne konto, Claude odczytuje ją ponownie i regeneruje rozumowanie od nowa zamiast po prostu je odtwarzać. Model trafił od razu w dniu premiery na Claude Platform i do Claude Code, z resetem limitu użycia ważnym do 22 października, a także do integracji zewnętrznych: GitHub Copilot w VS Code, Cursor, Factory, Devin Desktop/CLI, Cline oraz tryby Arena Agent/Battle dla WebDev, Text, Vision i Document.

**Key takeaways:**
- AMD przejęło World Labs za 8,2 mld dolarów, zdobywając model Atlas — pierwszą architekturę omni przewidującą nowy widok kamery z obrazów 2D, rozwiązującą problem rzadkiej rekonstrukcji sceny.
- Claude Sonnet 5.5 wyszedł tydzień po Opus 5.5 i dzień przed DevDay OpenAI, jest o ponad 30% szybszy i nawet o 30% tańszy niż Sonnet 5.
- Sonnet 5.5 od razu zasila darmowy poziom claude.ai, podczas gdy darmowy poziom ChatGPT wciąż działa na słabszym GPT-5.6 Luna.
- Rozszerzone "zachowane rozumowanie" ma utrudnić destylację modelu przez przełączanie kont — ślady rozumowania są przywiązane do organizacji, która je wygenerowała.

**Why do I care:** Timing premiery Sonnet 5.5 dzień przed DevDay OpenAI to nie przypadek, tylko czytelny sygnał, jak bardzo cykle wydawnicze topowych laboratoriów AI stały się elementem gry konkurencyjnej, a nie tylko harmonogramem inżynierskim — warto to uwzględniać, planując, kiedy testować nowe modele w swoim stacku, bo tydzień po dużej premierze zwykle przynosi kolejną odpowiedź konkurencji. Mechanizm anty-destylacyjny przez przypisanie śladów rozumowania do organizacji to z kolei ciekawy precedens: pokazuje, że laboratoria zaczynają traktować ślady rozumowania modelu jako własność intelektualną wartą ochrony, co może w przyszłości wpłynąć na to, jak bardzo swobodnie będzie można przenosić czy analizować historię sesji między kontami i narzędziami.

**Link:** [[AINews] AMD buys World Labs for $8.2B, as Atlas solves sparse reconstruction problem for robotics, design and more](https://www.latent.space/p/ainews-amd-buys-world-labs-for-82b?publication_id=1084089&post_id=217942537&isFreemail=true&triedRedirect=true)
