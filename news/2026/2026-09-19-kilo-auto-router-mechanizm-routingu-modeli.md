---
title: "Jak działa Auto Router w Kilo: routing modeli AI oparty na benchmarkach"
excerpt: "Kilo opisuje mechanizm swojego Auto Routera, który automatycznie dobiera najtańszy model spełniający wymagania jakościowe zadania na podstawie własnych benchmarków Kilo Bench."
publishedAt: "2026-09-19"
slug: "kilo-auto-router-mechanizm-routingu-modeli"
hashtags: "#kilo #ai #llm #routing #devtools #generated #pl"
source_pattern: "Kilo"
---

## Jak działa Auto Router w Kilo: routing modeli AI oparty na benchmarkach

**TLDR:** Kilo opisało wewnętrzny mechanizm Auto Routera. Klasyfikator zadania i tabela wyników z benchmarków Kilo Bench trzymają dla każdej pary model plus typ zadania skuteczność i koszt, dzięki czemu system automatycznie wybiera najtańszy model spełniający próg jakości.

**Summary:** Kilo Gateway udostępnia ponad 500 modeli, a różnice cenowe między nimi są ogromne. Modele frontier, takie jak Fable, Astra czy Opus, są wielokrotnie droższe od starszych i open-weightowych alternatyw, które na wielu codziennych zadaniach radzą sobie niemal równie dobrze. Auto Router ma rozwiązać ten problem automatycznie, zamiast zostawiać decyzję deweloperowi zgadującemu, który model opłaca się użyć w danym tygodniu.

Fundamentem mechanizmu jest Kilo Bench, zestaw benchmarków z deterministycznym pass/fail, bez modelu-sędziego oceniającego odpowiedź na skali. Kilo uruchamia każde zadanie na wielu modelach, a wyniki trafiają do tabeli routingu. Dla każdej kombinacji model plus typ zadania Kilo zna wskaźnik skuteczności oraz średni koszt. Gdy zapytanie trafia do Auto Balanced, lekki klasyfikator najpierw określa typ zadania: generowanie kodu, planowanie architektury, migrację, użycie narzędzi i kilka innych kategorii. Klasyfikator jest celowo prosty i szybki, bo wolna klasyfikacja zaprzeczałaby idei automatycznego routingu. Kilo mierzy jego trafność osobno, bo błędna klasyfikacja kieruje zapytanie do zupełnie niewłaściwej tabeli wyników.

Po ustaleniu typu zadania router sięga do tabeli i wybiera model zgodnie z wybranym trybem. Auto Frontier zawsze bierze najsilniejszy dostępny model bez względu na cenę. Auto Free trzyma się najlepszych modeli dostępnych za darmo. Auto Efficient zestawia zapytanie z Kilo Bench i wybiera najtańszy model, który już udowodnił skuteczność w danym typie zadania. Domyślna pula modeli jest dobrana pod kątem stosunku jakości do ceny, ale organizacje mogą ją nadpisać własną, na przykład gdy mają kontrakt z konkretnym dostawcą inferencji albo wymogi compliance wykluczające pewnych vendorów. W takim wypadku router nie korzysta z ogólnych wyników platformy, tylko benchmarkuje modele z własnej puli tą samą metodą pass/fail i buduje dedykowaną tabelę.

Router nie jest przy tym rozwiązaniem wymuszonym. W każdej chwili można ręcznie wybrać model dla konkretnego zadania i całkowicie ominąć automatykę. Zostawiony w trybie auto mechanizm stosuje ten sam lookup do każdego zapytania, niezależnie od tego, czy jest ich jedno dziennie, czy kilka tysięcy.

**Key takeaways:**
- Auto Router opiera się na tabeli routingu zbudowanej z wyników Kilo Bench, gdzie dla każdej pary model plus typ zadania znana jest skuteczność i koszt.
- Klasyfikację typu zadania wykonuje lekki, szybki model, a jego trafność jest mierzona osobno od głównych benchmarków.
- Tryby Auto Frontier, Auto Free i Auto Efficient różnią się progiem kompromisu między jakością a ceną.
- Firmy mogą podmienić domyślną pulę modeli na własną, na przykład z powodu umów z dostawcami lub wymogów compliance, a router wtedy benchmarkuje ją od nowa.
- Ręczny wybór modelu zawsze pozostaje dostępny obok trybów automatycznych.

**Why do I care:** Z perspektywy architekta ciekawszy od samego routingu jest fakt, że Kilo w ogóle zdecydowało się na deterministyczny pass/fail zamiast modelu-sędziego. To rzadkie i uczciwe podejście do benchmarkowania LLM-ów, bo eliminuje subiektywność ocen, którą inne firmy chętnie chowają za ładnymi wykresami. Sam routing typu "najtańszy model, który przechodzi próg" to w gruncie rzeczy to, co każdy zespół robi ręcznie od miesięcy, GPT-4o do prostych rzeczy, Opus do trudnych, tylko zautomatyzowane i oparte na danych zamiast na intuicji. Realne pytanie dla adopcji w firmowym stacku dotyczy przejrzystości. Czy w razie regresji jakości dostaniemy wgląd w to, który model faktycznie obsłużył request, i czy tabelę routingu da się zablokować na czas krytycznego release'u, żeby ktoś nie obudził się z gorszym modelem pod maską bez ostrzeżenia.

**Link:** [The Router inside Kilo's Auto Router](https://blog.kilo.ai/p/the-router-inside?publication_id=4363009&post_id=216366511&isFreemail=true&triedRedirect=true)
