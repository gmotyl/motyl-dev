---
title: "GPT-5.6 Sol kontra Claude Fable 5: który model lepiej planuje systemy?"
excerpt: "Kilo przeprowadziło porównanie modeli GPT-5.6 Sol i Claude Fable 5 w zadaniu planowania trzech złożonych systemów backendowych — wyniki pokazują wyraźne różnice w stylu i jakości."
publishedAt: "2026-07-15"
slug: "gpt-56-sol-vs-claude-fable-5-planowanie-systemow"
hashtags: "#kilo #ai #llm #agents #architecture #engineering #generated #pl"
source_pattern: "Kilo"
---

## GPT-5.6 Sol vs Claude Fable 5: który model lepiej pisze plany?

**TLDR:** Kilo porównało GPT-5.6 Sol i Claude Fable 5 w zadaniu projektowania trzech złożonych systemów backendowych. GPT-5.6 Sol wygrał we wszystkich trzech przypadkach dzięki wbudowanej pętli audytowej, ale zajął mu na to trzy razy więcej czasu. Fable 5 pisał plany szybsze, bardziej konkretne i łatwiejsze w implementacji, ale zdarzały mu się wewnętrzne sprzeczności.

**Summary:** Kilo wraca z kolejnym porównaniem modeli językowych — tym razem testując GPT-5.6 Sol i Claude Fable 5 na zadaniach planowania architektonicznego. Kontekst ma tu znaczenie: w poprzednim teście Fable 5 wygrał z GPT-5.5, a teraz OpenAI wypuściło nowy flagowy model. Metodologia pozostaje ta sama: oba modele dostały identyczne prompty, uruchomione od zera, bez żadnego kodu, z jednym poleceniem — wygeneruj plik plan.md.

Trzy zadania projektowe, które przygotowało Kilo, są celowo trudne w miejscach, gdzie błędy architektoniczne najbardziej bolą. Platforma dostarczania webhooków obsługująca 10 milionów zdarzeń dziennie, system rozliczeń przetwarzający 500 milionów rekordów, i backend do zarządzania projektami z WebSocketami, uprawnieniami i wyszukiwaniem. To nie są szkolne przykłady — to systemy, gdzie gwarancje takie jak "zdarzenie nie zostanie utracone" albo "usunięty użytkownik traci dostęp natychmiast" muszą trzymać się na każdym poziomie.

GPT-5.6 Sol zaskoczył zachowaniem, którego nikt nie prosił. Po napisaniu planu model sam z siebie uruchamiał pod-agentów, zlecał im audyt poszczególnych części dokumentu, a następnie nanosił poprawki. Fable 5 napisał plan i zakończył pracę. Żaden prompt nie wspominał o pętli rewizyjnej, żaden nie nakazywał uruchamiania pod-agentów — to była domyślna strategia każdego z modeli. Efekt: Fable 5 kończył w niecałe 20 minut, GPT-5.6 Sol potrzebował średnio prawie 53 minuty, a w najbardziej złożonym zadaniu — ponad 82 minuty.

Na poziomie wyników liczbowych GPT-5.6 Sol wygrał wszystkie trzy rundy, uśredniając wynik 9,10 do 8,04 Fable'a 5. Jednak powód tego wyniku jest precyzyjny: Fable 5 pisał plany spójne sekcja po sekcji, ale gubił gwarancje między nimi. Plan webhookowy obiecywał, że żadne zaakceptowane zdarzenie nie zniknie, by kilka stron dalej uciąć fan-out na pierwszych 1000 subskrybentów bez informowania nadawcy. Plan billing obiecywał deduplikację opartą na tenant i event ID, ale schemat ClickHouse dodawał do klucza jeszcze dwa pola, które mogą zmieniać się między próbami. To jest dokładnie ten typ błędu, który billing system ma eliminować z definicji. GPT-5.6 Sol łapał te sprzeczności właśnie w swojej pętli audytowej i korygował je zanim oddał finalny dokument.

Z drugiej strony plany Fable 5 były znacznie bardziej użyteczne dla programistów. Konkretne biblioteki, struktury plików i folderów, gotowy SQL do bezpiecznego pobierania zadań przez współbieżnych workerów, milestony z rozmiarami i kryteriami akceptacji. GPT-5.6 Sol zaproponował 14 osobnych procesów do wdrożenia, checkpointy między regionami i drzewa Merkle do weryfikacji danych rozliczeniowych — co mogłoby mieć sens dla dojrzałej platformy płatności, ale nie dla wersji pierwszej. Koszty? GPT-5.6 Sol kosztował 13,57 dolarów łącznie za trzy zadania, Fable 5 — 12,02. Różnica wyniosła 13% przy trzy razy dłuższym czasie oczekiwania.

**Key takeaways:**
- GPT-5.6 Sol wygrał wszystkie trzy testy planowania dzięki wbudowanej pętli audytowej, którą uruchamiał bez zewnętrznego polecenia
- Fable 5 pisał plany szybciej i z bardziej konkretną, implementacyjną zawartością, ale miał skłonność do niespójności między sekcjami
- Główna różnica kosztowa to 13% przy znacznie większym nakładzie czasu po stronie GPT-5.6 Sol
- Można zmienić zachowanie obu modeli przez prompt: nakazać GPT-5.6 Sol pojedynczy przebieg, a Fable 5 — samodzielny audyt
- Dla planów: użyj GPT-5.6 Sol jeśli zależy Ci na spójności gwarancji; użyj Fable 5 jeśli potrzebujesz szybkiego, konkretnego planu gotowego do implementacji

**Why do I care:** To badanie trafia w coś, co od dawna mnie interesuje: jak bardzo zmienia się jakość wyjścia modelu w zależności od jego domyślnej strategii, a nie tylko "inteligencji" mierzonej benchmarkami. GPT-5.6 Sol nie wygrał dlatego, że jest "mądrzejszy" — wygrał dlatego, że z automatu weryfikował własną pracę. To jest architektoniczne podejście do planowania, nie tylko językowe. Dla mnie, jako osoby myślącej o systemach i ich konsekwencjach, ważniejsze pytanie niż "który model lepszy" brzmi: jak w swoich projektach organizujemy przegląd planów generowanych przez AI? Wynik Fable 5 pokazuje, że każda sekcja może wyglądać dobrze w izolacji, a błąd czai się w pęknięciach między nimi. To nie jest problem modelu — to problem procesu recenzji. I ten problem mamy też z planami pisanymi przez ludzi.

**Link:** [GPT-5.6 Sol vs Claude Fable 5: Which Model Writes Better Plans?](https://blog.kilo.ai/p/sol-vs-fable?publication_id=4363009&post_id=207024729&isFreemail=true&triedRedirect=true)
