---
title: "Loop engineering - czy faktycznie przestajemy pisać prompty?"
excerpt: "Pragmatic Engineer bada rosnący trend 'loop engineeringu', gdzie programiści projektują pętle automatyzujące agentów AI zamiast ręcznie pisać każdy prompt."
publishedAt: "2026-07-15"
slug: "loop-engineering-projektowanie-petli-ai"
hashtags: "#pragmaticengineer #ai #agents #engineering #workflow #prompt-engineering #productivity #generated #pl"
source_pattern: "Pragmatic engineer"
---

## What is "loop engineering?"

**TLDR:** "Loop engineering" to podejście, w którym zamiast pisać prompty do agenta AI, projektujemy pętle, które same zarządzają agentami i decydują, kiedy praca jest skończona. Artykuł analizuje skąd ten trend się wziął, jak dojrzał przez ostatni rok oraz czy jest tak przełomowy, jak głoszą jego zwolennicy.

**Summary:** Wszystko zaczęło się rok temu od tekstu software engineera Geoffreya Huntleya o technice nazwanej "Ralph" - od Ralpha Wigguma z Simpsonów, tego naiwnie pomocnego bohatera. Huntley opisał prostą pętlę w Bash, która wielokrotnie przekazywała ten sam prompt do Claude Code, aż do osiągnięcia zdefiniowanego celu. Idea była prosta: zamiast ręcznie uruchamiać agenta dla każdego kroku, pozwolić mu działać w kółko, persystując wyniki na dysku w skompresowanej formie, a każdy nowy przebieg startuje z czystym oknem kontekstu. To wprost odpowiedź na ograniczenia okien kontekstowych liczonych wtedy w okolicach 200 tysięcy tokenów.

Technika "Ralph" nabrała rozpędu pod koniec 2024 roku, kiedy modele stały się wystarczająco dobre, żeby ambitniejsze projekty przestały być fantastyką. Matt Pocock zbudował na jej podstawie tutorial o "wysyłaniu działającego kodu, kiedy śpisz". Kluczowy element jego podejścia to utrzymywanie żyjącego "master PRD" - dokumentu z planem projektu, który agent sam aktualizuje po każdym ukończonym zadaniu, i z którego wybiera kolejne zadanie do zrobienia.

Mniej więcej pół roku po tym, jak metoda Ralph zaczęła zyskiwać popularność, OpenAI wypuściło funkcję "Goals" w Codex - gotową infrastrukturę do robienia dokładnie tego samego. Zamiast pisać prostą pętlę Bash, wystarczy teraz napisać jeden komend. Trzy dni później zrobił to Hermes Agent, a jeszcze dwa tygodnie później Claude Code. W maju 2025 komenda /goal trafiła do wszystkich głównych narzędzi do AI codingu jednocześnie. Zabawny fakt: Hermes wprost w dokumentacji pisze, że to ich interpretacja "Ralph loop" zainspirowana implementacją OpenAI.

Geza Wylde z Pragmatic Engineer zapytał programistów, jak faktycznie używają pętli w swojej pracy. Z około 210 odpowiedzi wyłaniają się dwa dominujące wzorce: triggery reagujące na zdarzenia oraz cron joby uruchamiające agentów według harmonogramu. Ivan Pantić opisuje flow, gdzie błąd w Sentry automatycznie uruchamia agenta, który sprawdza, czy nie ma już otwartego PR, jeśli nie - tworzy go i pinguje deweloperów. Paul D'Ambra z PostHog puszcza pętlę, która wyciąga niestabilne testy z kolejki, próbuje je lokalnie, i jeśli faktycznie są niestabilne, otwiera PR z naprawą. To przyniosło mu 13 PR-ów stabilizujących testy w ciągu jednej sesji.

Artykuł nie unika krytyki. Kilku programistów po wypróbowaniu pętli porzuciło je z rozczarowaniem. Agenci dryfują, tracą kontekst, kręcą się w kółko bez realnego postępu. Ktoś celnie zauważa, że firmy płacące po cenach API szybko trafiają na "tokenmaxxing" - pętle generują gigantyczne koszty tokenów bez proporcjonalnych korzyści. Max Kanat-Alexander stawia tezę, że cały "Ralph loop" był tymczasowym hackiem na ograniczenia narzędzi, które te narzędzia już wbudowały w siebie. I jest w tym sporo racji. Artykuł kończy się przemyśleniem, że dla większości deweloperów głębsza znajomość okien kontekstowych - czyli "context engineering" - może być bardziej wartościowa niż obsesja na punkcie projektowania pętli.

**Key takeaways:**
- Technika "Ralph loop" - prosta pętla Bash wielokrotnie uruchamiająca agenta z tym samym plikiem prompt - powstała rok temu i stała się wzorcem dla dzisiejszych komend /goal w Codex, Claude Code i Hermes.
- Komendy /goal i /loop w głównych narzędziach AI codingu to nic innego jak gotowa infrastruktura do tego, co programiści wcześniej musieli sami sklejać z Basha i plików markdown.
- Najczęstsze realne zastosowania loop engineeringu to triggery na zdarzenia (błędy w Sentry, nowe tickety) i cron joby - czyli w istocie stara dobra automatyzacja, tyle że z agentem zamiast prostego skryptu.
- Dryfowanie agentów i koszty tokenów to realne problemy, które sprawiają, że nie każda pętla faktycznie przynosi wartość.
- Context engineering - umiejętność zarządzania tym, co trafia do okna kontekstowego agenta - to według artykułu ważniejsza kompetencja dla większości deweloperów niż loop engineering.

**Why do I care:** Z perspektywy architekta i konsultanta frontendowego, ten artykuł dobrze odzwierciedla to, co widzę u klientów: duże podekscytowanie pętlami AI, po którym często przychodzi frustracja, bo agent "gdzieś się zapodział" albo rachunek za tokeny okazał się szokujący. Uważam, że najcenniejsza obserwacja artykułu to ta dotycząca context engineeringu - zanim zaczniesz projektować autonomiczne pętle, musisz rozumieć, jak działają okna kontekstowe i co do nich trafia. Triggery i cron joby z agentem to sensowne zastosowanie, ale to w gruncie rzeczy dobrze znana automatyzacja procesów w nowym opakowaniu. Nie ekscytowałbym się tym jako rewolucją. To ewolucja.

**Link:** [What is "loop engineering?"](https://newsletter.pragmaticengineer.com/p/what-is-loop-engineering?publication_id=458709&post_id=207043776&isFreemail=true&triedRedirect=true)
