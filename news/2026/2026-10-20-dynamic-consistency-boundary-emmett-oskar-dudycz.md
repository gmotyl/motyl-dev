---
title: "Dlaczego Oskar Dudycz nie dodaje Dynamic Consistency Boundary do Emmetta"
excerpt: "Oskar Dudycz tłumaczy, czemu DCB nie jest dla niego bezpiecznym wyborem domyślnym i co woli zrobić w Emmett zamiast tego."
publishedAt: "2026-10-20"
slug: "dynamic-consistency-boundary-emmett-oskar-dudycz"
hashtags: "#oskardudycz #architecture #event-sourcing #database #postgresql #cqrs #generated #pl"
source_pattern: "OskarDudycz"
---

## Przemyślenia o Dynamic Consistency Boundary

**TLDR:** Autor nie jest przeciwny DCB, ale nie widzi go jako bezpiecznego wyboru domyślnego i nie planuje go w Emmett. Woli najpierw dodać wielostrumieniowe zapisy transakcyjne, workflowy i archiwizację strumieni.

**Summary:** DCB zaproponowali Sara Pellegrini i Milan Savic z Axon trzy lata temu. Przykład to zapisy studentów na kursy. Kurs ma limit miejsc, a student limit kursów. Decyzja potrzebuje informacji z obu strumieni, a bez transakcji obejmującej dwa strumienie zapis do jednego i asynchroniczna aktualizacja drugiego wymagają kompensacji. DCB rezygnuje z pytania, do którego strumienia należy decyzja. Zdarzenia dostają tagi, komenda wybiera zdarzenia po typach i tagach, a zapis ma warunek, że nic pasującego do zapytania nie pojawiło się po odczytanej pozycji.

Autor uważa, że oryginalny pomysł bez tagów, z dowolnym zapytaniem, był lepszy, ale rozbił się o rzeczywistość. Żeby zagwarantować spójność, magazyn musiałby wykonywać zapytanie atomowo przy każdym zapisie. Tagi są kompromisem, bo trzeba je znać w chwili zapisu, a to upodabnia je do identyfikatorów strumieni. Jeśli dwa tagi dają to samo co dwa strumienie z transakcją, zostaje tylko węższy zakres konfliktów po typach zdarzeń. Autor nie widział w praktyce na tyle częstych konfliktów, żeby to miało znaczenie, a częste konflikty uważa za zapach projektowy.

Drugi blok argumentów dotyczy modelowania. Strumienie procesów, na przykład wspólne wymeldowanie grupy gości w hotelu, zapisują kolejność obserwacji, co pomaga w wyścigach między modułami. DCB nie pomoże, gdy moduły mają osobne bazy. Długie strumienie lepiej skracać przez zamykanie okresów niż ratować snapshotami. Trzeci blok to implementacja. Bezpieczny zapis na PostgreSQL wymaga serializacji, blokady tabeli albo blokad doradczych, a subskrypcje, wersjonowanie zdarzeń, zmiana zapytań i przetagowanie tworzą problemy drugiego dnia. Przetagowanie na żywo oznacza zapytania, które nie widzą starych zdarzeń, bez żadnego ostrzeżenia. Autor widzi sens DCB jako kroku w migracji z logu audytowego, o ile nikt nie buduje własnego magazynu.

**Key takeaways:**
- DCB zastępuje wybór strumienia zapytaniem po typach i tagach.
- Zapis z warunkiem zapytania trudno wykonać wydajnie i atomowo.
- Autor stawia najpierw na zapisy wielostrumieniowe, workflowy i archiwizację.

**Why do I care:** To rzadki tekst, w którym autor narzędzia mówi, czego nie zbuduje, i uzasadnia to konkretnie. Dla mnie najcenniejszy jest wątek o drugim dniu produkcji, bo większość prezentacji o nowych wzorcach kończy się przy pierwszym zapisie. Jeśli rozważasz DCB, sprawdź najpierw, kto zaktualizuje zapytania, kiedy dojdzie nowy typ zdarzenia.

**Link:** [Thoughts on Dynamic Consistency Boundary](https://www.architecture-weekly.com/p/thoughts-on-dynamic-consistency-boundary)
