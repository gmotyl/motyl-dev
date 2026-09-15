---
title: "Kilo puściło agenty sprzątać własny kod co noc i połączyło 39 z 39 PR-ów"
excerpt: "Zespół Kilo uruchomił pięć cyklicznych zadań agentowych, które szukają duplikacji kodu, martwych testów, martwego kodu i osieroconych zależności, a każde PR musi być pojedynczą, konkretną zmianą."
publishedAt: "2026-09-15"
slug: "kilo-nocne-agenty-sprzatanie-kodu-janitor-jobs"
hashtags: "#kilo #ai #agents #devtools #generated #pl"
source_pattern: "Kilo"
---

## Kilo puściło agenty sprzątać własny kod co noc

**TLDR:** Kilo uruchomiło pięć cyklicznych zadań agentowych (cztery codzienne, jedno tygodniowe), z których każde szuka jednego konkretnego typu problemu w repozytorium i otwiera pojedynczy PR z etykietą janitor. Po tygodniu takie joby otworzyły 39 PR-ów, wszystkie zostały zmergowane.

**Summary:** Każdy job to prompt Cloud Agenta uruchamiany na cronie, który klonuje repo, szuka jednego rodzaju problemu i otwiera PR. Jedyna reguła od początku, żeby nie wysyłać dwudziestu poprawek naraz, tylko wybrać tę jedną zmianę, co do której agent jest najbardziej pewny. Pięć jobów pokrywa deduplikację logiki zaimplementowanej dwa razy, usuwanie testów, które niczego nie testują (klasyczny przykład to test sprawdzający, że mock zwraca to, co mu kazano zwrócić), usuwanie martwego kodu bez żadnych referencji, znajdowanie osieroconych zależności zadeklarowanych w manifeście, których nikt nie importuje, oraz cotygodniowy fixer niestabilnych testów w CI.

Automerge po zatwierdzeniu oznacza, że jedyne co trzeba zrobić, to kliknąć przycisk, a recenzję robią agenty deweloperów dyżurnych, nie ludzie czytający linijka po linijce. Kolejny krok w planach to dedykowany reviewer, uruchamiany co drugi dzień, przeglądający otwarte janitor PR-y i zatwierdzający te oczywiście bezpieczne, a resztę odsyłający do człowieka, dokładnie tak, jak autor już robi to prywatnie na własnych projektach. Najciekawszy fragment dotyczy tego, czego jeszcze nie zrobili, monitorowania błędów z Sentry. Klucze klienckie Sentry są półpubliczne, więc każdy może wysłać fałszywy błąd, a "błąd", który agent czyta i na który reaguje, może być zamaskowaną instrukcją do wycieku tokena. Rozwiązaniem, nad którym pracują, jest krok sędziowski, przepuszczający zadanie przez jeden z modeli-sędziów Enkrypt, zanim agent cokolwiek zrobi.

**Key takeaways:**
- Pięć cyklicznych jobów agentowych (dedupe, martwe testy, martwy kod, osierocone zależności, flaky CI) otworzyło 39 PR-ów w tydzień, wszystkie zmergowane.
- Reguła "jedna, najpewniejsza zmiana na PR" zamiast dużej paczki poprawek to kluczowy mechanizm zaufania w tym systemie.
- Najtańsze modele (DeepSeek, GLM Flash) starczają do wąskich, codziennych zadań, ale wszystko co czyta niezaufany input (jak alerty z Sentry) wymaga modelu frontierowego, bo trudniej nim manipulować.

**Why do I care:** To konkretny, sprawdzony w praktyce wzorzec na automatyzację tego typu prac porządkowych, które w większości zespołów i tak nigdy nie trafiają na sprint, bo zawsze jest coś ważniejszego. Reguła jednej, najpewniejszej zmiany na PR jest tu kluczowa, bo to ona sprawia, że automerge w ogóle jest bezpieczny, bez niej system szybko zamieniłby się w spam PR-ów, których nikt nie czyta. Warto to podkraść zanim ktoś w waszym zespole spróbuje zrobić to samo bez tej dyscypliny.

**Link:** [I let agents clean up the Kilo codebase every night.](https://blog.kilo.ai/p/i-let-agents-clean-up-the-kilo-codebase)
