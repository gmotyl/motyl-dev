---
title: "TRM Labs przebudowuje proces produktowy pod AI: pętla wewnętrzna to nie wszystko"
excerpt: "Refactoring opisuje, jak TRM Labs zamieniło dziewięcioetapowy proces produktowy zorganizowany wokół ról na sześć etapów zorganizowanych wokół efektów pracy, budując do tego własny harness o nazwie Cortex."
publishedAt: "2026-07-29"
slug: "trm-labs-cortex-proces-produktowy-ai"
hashtags: "#refactoring #ai #architecture #productmanagement #teams #leadership #engineering #processdesign #generated #pl"
---

## TRM Labs przebudowuje proces produktowy pod AI

**TLDR:** Newsletter Refactoring opisuje case study TRM Labs, firmy która zauważyła, że AI przyspieszyło samo pisanie kodu, ale nie przyspieszyło decydowania co robić, przeglądania pracy i wyciągania wniosków z produkcji. Zamiast więc mierzyć prędkość inżynierii, TRM przebudowało swój dziewięcioetapowy proces produktowy oparty na rolach w sześć etapów opartych na efektach, i owinęło to w wewnętrzne narzędzie o nazwie Cortex, które teraz open-sourcują.

**Summary:** Punktem wyjścia jest rozróżnienie na pętlę wewnętrzną i zewnętrzną. Pętla wewnętrzna to ta część, którą większość narzędzi AI faktycznie przyspieszyła: opisujesz funkcjonalność, agent pisze kod, po chwili masz coś działającego. Pętla zewnętrzna to cały reszta cyklu, czyli decydowanie co jest warte robienia, kształtowanie i przegląd rozwiązania, wydanie go i uczenie się z produkcji. Autor trafnie zauważa, że jeśli przyspieszasz tylko jedną z tych pętli, ograniczenie po prostu przenosi się gdzie indziej: agenci generują więcej pull requestów niż ludzie są w stanie sensownie zrecenzować, zespół potrafi budować szybciej niż podejmować decyzje co jest dobrą robotą, a szybsze wysyłanie złej rzeczy nadal jest marnotrawstwem. To jest chyba najbardziej uczciwy fragment tekstu, bo nazywa wprost coś, co wiele firm odkrywa boleśnie dopiero po fakcie.

Stary proces TRM miał dziewięć etapów zorganizowanych wokół ról: Product Owner przygotowywał spec, Technical Product Manager go tłumaczył, Technical Anchor odpowiadał za implementację, a artefakty wędrowały od jednej osoby do drugiej. Cały układ zakładał, że każdy artefakt musi powstać u jednego specjalisty i zostać przekazany dalej. AI podważa to założenie, bo PM może dziś sprawdzić wykonalność techniczną i skleić działający prototyp, a inżynier może wejść w kontekst klienta i naszkicować spec produktowy. Autor zaznacza przy tym, że same artefakty nie znikają, wręcz mogą zyskać na znaczeniu jako ślad decyzji, kiedy implementację robi agent. Zmienia się za to własność tych artefaktów, przestają być wyłączną domeną jednej roli.

Nowy model TRM to sześć efektów zgrupowanych w trzy pary: sense and decide, czyli zbieranie sygnałów i ocena czy problem jest warty rozwiązania; shape and make, czyli zamiana problemu w kierunek do zrecenzowania, a potem budowa; oraz communicate and learn, czyli wydanie zmiany, obserwacja jej wpływu i wciągnięcie wniosków do kolejnego cyklu. W praktyce PM-owie i EM-owie poszerzają zakres, bo mogą testować wykonalność bez czekania na moce inżynierskie, inżynierowie zbliżają się do problemu klienta, a specjaliści od designu czy bezpieczeństwa przestają być bramkarzami każdej pojedynczej decyzji i zamiast tego kodują swoją wiedzę w reguły, komponenty i polityki, które ułatwiają dobre decyzje wszystkim innym. To ostatnie jest moim zdaniem najciekawszą tezą całego tekstu: głęboka specjalizacja przestaje się opłacać przy zadaniach rutynowych, bo więcej wartości daje przełożenie tej wiedzy na platformę niż osobiste zatwierdzanie każdego PR-a.

Problem w tym, że artykuł urywa się dokładnie w momencie, gdy miał przejść do konkretów, czyli do samego Cortex jako harnessu z recenzowalnymi artefaktami, deterministycznymi bramkami i kontekstem repozytorium. To, co dostajemy, to zapowiedź i model mentalny, nie mechanizm. Nie wiemy, jak wygląda w praktyce deterministyczna bramka dla czegoś tak niedeterministycznego jak decyzja produktowa, ani jak TRM mierzy, że nowy proces faktycznie poprawił throughput, a nie tylko przeniósł wąskie gardło o jeden etap dalej. Brakuje też liczb: ile PR-ów dziennie generują agenci, ilu ludzi je recenzuje, jak długo trwało wdrożenie tego modelu w firmie regulowanej finansowo. Bez tego cała opowieść, choć spójna, jest bardziej manifestem niż studium przypadku.

**Key takeaways:**
- Przyspieszenie samego pisania kodu bez przyspieszenia decydowania, recenzowania i wyciągania wniosków tylko przesuwa wąskie gardło w inne miejsce procesu.
- Procesy zorganizowane wokół sztywnych ról tracą sens, gdy AI pozwala jednej osobie wykonać kawałki pracy z innej dziedziny.
- Artefakty typu spec, plan czy decision record zyskują na znaczeniu jako ślad decyzji, nawet jeśli implementację robi agent.
- Rola głębokich specjalistów przesuwa się z ręcznego zatwierdzania każdej decyzji w stronę kodowania swojej wiedzy w reguły i platformy.
- Case study nie pokazuje mechaniki samego narzędzia Cortex ani twardych danych o efektach, więc traktowałbym to jako inspirację do dyskusji, nie gotowy przepis.

**Why do I care:** Dla architekta czy lidera zespołu frontendowego to jest dokładnie ten problem, który już teraz widać przy pracy z agentami: łatwo wygenerować dziesięć propozycji zmian, dużo trudniej je wszystkie sensownie ocenić i wpiąć w spójną architekturę. Warto pilnować, żeby decyzje o tym co budować i dlaczego zostawały w formie czytelnych artefaktów, a nie tylko w historii czatu z agentem, bo inaczej za pół roku nikt nie odtworzy, czemu system wygląda tak jak wygląda. Pomysł, żeby specjaliści przekuwali swoją wiedzę w reguły i komponenty zamiast recenzować każdy PR osobno, pokrywa się zresztą z tym, jak dobrze zaprojektowany design system czy zestaw lintów działa od lat, tylko teraz stawka rośnie, bo tempo generowania kodu jest wielokrotnie wyższe.

**Link:** [A Case Study in AI Product Development](https://refactoring.fm/p/a-case-study-in-ai-product-development)
