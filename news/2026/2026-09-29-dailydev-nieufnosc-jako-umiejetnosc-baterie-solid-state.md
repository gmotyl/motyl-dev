---
title: "Nieufność ważniejsza niż prompt, i baterie solid-state wciąż pięć lat od teraz"
excerpt: "Dwa tematy z daily.dev: dlaczego umiejętność nieufności wobec kodu z AI liczy się bardziej niż lepszy prompt, oraz dlaczego przystępne cenowo baterie solid-state do aut wciąż są odległym marzeniem."
publishedAt: "2026-09-29"
slug: "dailydev-nieufnosc-jako-umiejetnosc-baterie-solid-state"
hashtags: "#dailydev #ai #llm #testing #code-review #prompt-engineering #ev #performance #generated #pl"
source_pattern: "daily.dev"
---

## Wszyscy uczą się lepiej promptować. To nie ta umiejętność

**TLDR:** Autor przekonuje, że pogoń za coraz lepszym promptowaniem to ślepa uliczka, bo lepszy prompt sprawia tylko, że wygenerowany kod wygląda bardziej przekonująco, a nie że jest bardziej poprawny. Umiejętnością, która faktycznie się opłaca, jest wyuczona nieufność wobec własnego kodu.

**Summary:** Punktem wyjścia jest obserwacja, że w ostatnim roku każdy nagle uczy się prompt engineeringu, jakby to była nowa umiejętność stulecia. Autor odwraca to twierdzenie na głowę. Jego zdaniem lepszy prompt poprawia tylko to, jak przekonująco wygląda odpowiedź modelu, a nie to, czy jest ona poprawna. To dwa zupełnie rozłączne wymiary, a poprawność i tak rozstrzyga się dopiero w momencie code review, nie w momencie zadawania pytania. Czystszy, bardziej autorytatywnie wyglądający kod jest w praktyce trudniejszy do zakwestionowania, więc naprawdę błędne odpowiedzi stają się trudniejsze do wyłapania, a nie łatwiejsze.

Ilustracją jest osobista historia autora o błędzie typu "potwierdzenie przed zapisem". System wygenerowany przez agenta AI potwierdzał zapis żądania jeszcze zanim wiersz w bazie faktycznie został zapisany, więc ponowna próba trafiająca w złym momencie blokowała użytkownika bez żadnego śladu, że akcja w ogóle się wydarzyła. Diff wyglądał czysto, przechodził testy, a mimo to trafił na produkcję i zablokował realnego klienta. Wyłapać to mógł tylko wyuczony odruch nieufności wobec wzorca "potwierdź przed zapisem", a nie żaden, nawet najlepszy, prompt.

Autor rozprawia się też z pomysłem, żeby drugi model AI pełnił rolę recenzenta kodu wygenerowanego przez pierwszy. Dwa modele wytrenowane do tego, by brzmieć wiarygodnie, mają skłonność do wzajemnej zgody, co daje złudzenie niezależnej weryfikacji zamiast realnej kontroli. Bardziej niezawodny wzorzec rozdziela role na trzy części: deterministyczny skrypt, który twardo pilnuje nazwanych niezmienników takich jak liczba wierszy, poprawność wycofania transakcji czy stan danych na dysku, model pełniący funkcję sceptyka, który tylko przedstawia dowody bez wydawania werdyktu, oraz człowieka podejmującego ostateczną decyzję o scaleniu zmian.

**Key takeaways:**
- Lepszy prompt poprawia wiarygodność i gładkość wyglądu kodu, nie jego poprawność — to dwa rozłączne wymiary.
- Błędy typu "potwierdzenie przed zapisem" są podstępne, bo przechodzą testy i wyglądają czysto, mimo że psują stan danych.
- Drugi model AI jako recenzent pierwszego nie daje niezależnej weryfikacji — oba dzielą te same ślepe punkty.
- Skuteczniejszy podział ról to deterministyczny skrypt pilnujący twardych niezmienników, model jako sceptyk zgłaszający dowody, i człowiek podejmujący ostateczną decyzję.

**Why do I care:** Ten tekst trafia w sedno tego, co od miesięcy powtarzam zespołom pracującym z agentami kodującymi — inwestowanie czasu w coraz sprytniejsze prompty ma sens tylko do pewnego momentu, a potem realną dźwignią staje się architektura weryfikacji wokół agenta, nie sam prompt. W praktyce oznacza to budowanie twardych bramek na poziomie testów kontraktowych i inwariantów biznesowych, zamiast liczenia na to, że model sam się skoryguje albo że drugi model to sprawdzi. Dla architektów to konkretna wskazówka projektowa: rozdzielcie generowanie od weryfikacji tak samo mocno, jak rozdzielacie warstwy w systemie.

**Link:** [Everyone's learning to prompt better. That's the wrong skill.](https://daily.dev/posts/rrFPegQZT)

## Hyundai: baterie solid-state są pięć lat od teraz, i wciąż za drogie potem

**TLDR:** Nowy szef R&D Hyundaia spodziewa się aut z ogniwami solid-state w małych seriach za pięć lat, ale nie wierzy, że koszty surowców spadną na tyle szybko, by trafiły do zwykłych samochodów. LG celuje raczej w litowo-jonowe ogniwa bogate w mangan, a europejski zakład ProLogium rusza mimo upadku Northvolt.

**Summary:** Manfred Harrer, świeżo powołany szef działu badań i rozwoju Hyundaia, spodziewa się niewielkich serii aut z ogniwami solid-state w perspektywie pięciu lat, traktowanych jako modele wizerunkowe, a nie masowy produkt. Zastrzega jednak, że koszty surowców nie spadną w tym czasie na tyle, by taka technologia trafiła do zwykłych, przystępnych cenowo samochodów. Hyundai rozwija ogniwa równolegle wewnętrznie i z partnerem Solid Power, żeby mieć nad technologią pełną kontrolę zamiast ją licencjonować.

Prezes LG Energy Solution na Amerykę Północną ocenia sprawę jeszcze ostrożniej, umieszczając baterie solid-state do aut elektrycznych jakieś dziesięć lat od teraz, czyli około pięciu lat później niż prognoza Hyundaia dla modeli wizerunkowych, tłumacząc to tym, że duże ogniwa formatowe są dla producentów najtrudniejszym elementem układanki. LG stawia w międzyczasie na litowo-jonowe ogniwa bogate w mangan rozwijane z General Motors, celując w zasięg ponad 400 mil do 2028 roku.

Jednocześnie tajwańska firma ProLogium wbiła już łopatę pod francuską, dotowaną fabrykę w Dunkierce, mającą docelowo osiągnąć 4 GWh rocznej mocy produkcyjnej ogniw solid-state z ceramiki litowej. To o tyle znaczące, że wcześniejszy europejski zakład na baterie, Northvolt, upadł mimo 15 miliardów dolarów finansowania. Żaden producent aut nie wysłał jeszcze na rynek produkcyjnego samochodu z bateriami solid-state — na razie istnieją jedynie egzemplarze demonstracyjne, między innymi w Mercedesie i Ducati.

**Key takeaways:**
- Hyundai spodziewa się aut wizerunkowych z bateriami solid-state za pięć lat, ale nie wierzy w spadek kosztów surowców na tyle, by trafiły do zwykłych aut.
- LG ocenia baterie solid-state do aut elektrycznych na około dekadę od teraz i stawia w międzyczasie na litowo-jonowe ogniwa bogate w mangan z GM.
- ProLogium buduje we Francji fabrykę ogniw solid-state o docelowej mocy 4 GWh, mimo że wcześniejszy europejski zakład Northvolt upadł po 15 miliardach dolarów finansowania.
- Żaden producent nie wysłał jeszcze na rynek produkcyjnego auta z bateriami solid-state — istnieją tylko egzemplarze demonstracyjne.

**Why do I care:** To głównie news branżowy i biznesowy, nie coś, co zmienia pracę frontend developera czy architekta z dnia na dzień. Wart odnotowania jest za to wzorzec, który się tu powtarza — obietnice technologii przełomowej regularnie przesuwają się o kolejne pięć lat, a jednocześnie realne postępy dzieją się w mniej efektownych, przejściowych rozwiązaniach jak baterie bogate w mangan. To dobra analogia do niejednej "rewolucyjnej" technologii w naszej branży, którą warto mieć z tyłu głowy przy ocenie hype'u wokół nowych narzędzi.

**Link:** [Hyundai says solid-state cars are five years away, and still too expensive after that](https://daily.dev/posts/3HWNGVNnS)
