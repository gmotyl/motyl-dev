---
title: "Context rot to problem harnessu, nie modelu"
excerpt: "Paul Iusztin pokazuje, że okno kontekstu agenta psuje się przez architekturę harnessu, a nie przez ograniczenia samego modelu."
publishedAt: "2026-09-25"
slug: "context-rot-problem-harnessu-nie-modelu"
hashtags: "#decodingai #ai #ml #agents #llm #architecture #engineering #generated #pl"
source_pattern: "Decoding AI"
---

## Context rot to problem harnessu, nie modelu

**TLDR:** Paul Iusztin opublikował nowe wideo o czterech elementach harnessu, które decydują o tym, czy kontekst agenta zostaje czytelny, czy zamienia się w szum. Jego teza brzmi: kiedy agent gubi wątek po dłuższej sesji, winny zwykle nie jest model, tylko sposób, w jaki budujemy wokół niego pamięć, ładowanie danych i mechanizm przycinania kontekstu.

**Summary:**

W codziennej pracy nad agentami łatwo pominąć jedno rozróżnienie. Model dostaje dokładnie taki kontekst, jaki mu podstawimy, więc jeśli po pewnym czasie zaczyna halucynować albo gubić ustalenia sprzed kilku kroków, problem prawie zawsze leży po stronie harnessu, czyli całej infrastruktury wokół wywołania modelu. Iusztin buduje na tym cztery pytania, które mają pomóc zaprojektować harness tak, żeby kontekst zostawał sygnałem, a nie balastem.

Pierwsze pytanie dotyczy pamięci między sesjami. Agent, który za każdym uruchomieniem zaczyna od zera, marnuje pracę, ale agent, który pamięta wszystko bezkrytycznie, szybko zatyka sobie okno kontekstu nieistotnymi szczegółami z poprzednich zadań. Trzeba więc świadomie zdecydować, co przechodzi do trwałej pamięci, a co ginie razem z sesją, w której powstało.

Drugie pytanie odwraca typowe podejście do budowania promptów. Zamiast z góry ładować wszystko, co może się przydać, harness powinien trzymać dane poza kontekstem, dopóki agent faktycznie ich nie potrzebuje. To podejście leniwego ładowania kontekstu, znane z systemów RAG i narzędziowych wywołań, tutaj staje się zasadą projektową dla całej architektury agenta, nie tylko dla pojedynczego zapytania.

Trzecie pytanie szuka najtańszej pętli sprzężenia zwrotnego, czyli miejsca, w którym najszybciej i najtaniej można sprawdzić, czy dany fragment kontekstu w ogóle pomaga agentowi podejmować lepsze decyzje. Bez takiej pętli zespół dokłada kolejne heurystyki do promptu na wyczucie, a koszt eksperymentu rośnie z każdą iteracją.

Czwarte pytanie zamyka cykl i pyta, jak przycinać okno kontekstu, zanim zdąży się zepsuć. Kontekst, który rośnie bez kontroli, prędzej czy później zaczyna zawierać sprzeczne albo nieaktualne informacje, a wtedy model dostaje gorszy sygnał niż na starcie sesji. Odpowiedzią jest mechanizm kompresji i czyszczenia, uruchamiany zanim ilość danych przewali się w jakość odpowiedzi.

**Key takeaways:**
- Context rot wynika zwykle z projektu harnessu, nie z ograniczeń modelu.
- Warto świadomie wybierać, co agent zapamiętuje między sesjami, zamiast zapamiętywać wszystko albo nic.
- Dane powinny trafiać do kontekstu dopiero w momencie, gdy agent ich realnie potrzebuje.
- Potrzebna jest tania, szybka pętla sprzężenia zwrotnego do testowania decyzji o zawartości kontekstu.
- Okno kontekstu wymaga regularnego przycinania, zanim nagromadzone dane zaczną szkodzić jakości odpowiedzi.

**Why do I care:** Dla mnie to praktyczny checklist do code review architektury agentowej, nie kolejna dyskusja o tym, który model jest mądrzejszy. Jeśli budujesz agenta produkcyjnego, te cztery pytania warto zadać sobie przy każdym większym projekcie: co zapisujemy na trwałe, kiedy ładujemy dane, gdzie testujemy zmiany w kontekście i kto odpowiada za jego przycinanie. To są decyzje architektoniczne, więc powinny trafić do tego samego procesu review co reszta systemu, a nie zostać ukryte w treści promptu, którego nikt później nie czyta.

**Link:** [4 harness components that keep your agent context high-signal](https://www.youtube.com/watch?v=dx77BRFZ0_M)
