---
title: "Agentowa inżynieria w kodzie starszym niż wasz zespół"
excerpt: "Addy Osmani opisuje, jak bezpiecznie puszczać agenty AI na stary, brownfieldowy kod: strefy ryzyka, testy charakteryzujące, kompletne migracje i dlaczego harness ma znaczyć więcej niż instrukcje w promptach."
publishedAt: "2026-09-15"
slug: "brownfield-agentic-engineering-addy-osmani"
hashtags: "#addyosmani #ai #agents #legacycode #generated #pl"
source_pattern: "Addy Osmani"
---

## Jak bezpiecznie puszczać agenty na stary kod, którego repo już nie opisuje w pełni

**TLDR:** W kodzie, który istnieje dłużej niż zespół go utrzymujący, repozytorium przestaje być pełnym opisem tego, jak system naprawdę działa. Osmani proponuje dzielić kod na strefy ryzyka, spisywać tylko to, czego kod sam nie powie, i pilnować, żeby migracje kończyły się w całości, zanim uzna się je za skończone.

**Summary:** Punktem wyjścia jest podział kodu na strefy. Zielona to dobre testy, izolacja, nowoczesne konwencje, tu agent może pracować w ciasnej pętli bez nadzoru. Żółta to mieszana jakość, agent zmienia kod dopiero po napisaniu testów charakteryzujących. Czerwona to autoryzacja, billing, uprawnienia, płace, obszary, które rozumie mało osób, tam nie ma niesupervisowanych przepisań. Mapę stref rysuje człowiek, nie agent, bo zostawiony sam sobie agent zaczyna od najbardziej przerażającego pliku, po prostu dlatego że ma najciekawsze nazwy. Strefa przesuwa się w górę dopiero, gdy powstaną testy charakteryzujące i właściciel modułu przejrzy pierwsze zmiany agenta, a strefa dyktuje też czasownik, zielona to ciasna pętla, żółta to najpierw testy, czerwona to człowiek parujący przy każdym kroku albo brak pracy.

Testy charakteryzujące odgrywają tu centralną rolę, bo pinują dzisiejsze zachowanie modułu, brzydkie fragmenty włącznie, ponieważ w starym systemie ta brzydota bywa tym, na czym biznes realnie działa, a agent chętnie ją "naprawi" pod zieloną belką testów. Kiedy to agent pisze te testy, ta sama sesja nie powinna być jedynym ich autorem, bo dostaniecie zieloną belkę kodującą implementację, którą agent właśnie wymyślił, nie oryginalne zachowanie. Netflix użył tej samej idei przy przejściu na GraphQL na skalę produkcyjną, ruch cieniowany i replay na starej i nowej ścieżce, porównanie payloadów, promocja dopiero po zgodności, to ścieżka do wyboru, gdy powierzchnia klasy strony głównej nie ma uczciwego zestawu testów jednostkowych.

Migracje mają być kompletne, nie połowiczne. Wyszukiwarka zwracająca stare podejście w czterdziestu plikach, nowe w dwunastu i shim udający, że oba są aktualne, myli agenta sprzecznym precedensem. SWE Refactor Bench nazywa to zjawisko "ślepotą", na 520 przebiegów agentów tylko 28 przeszło audyt migracji, testy behawioralne i niezależną weryfikację. Przykłady z większych firm pokazują tę samą strukturę niezależnie od skali. Port Zig-to-Rust w Bun trwał około 50 workflow przez 11 dni na bazie 535 tysięcy linii kodu, z dwoma przeciwstawnymi recenzentami na każdą wygenerowaną jednostkę, ale najważniejsza była godzinowa praca nad przewodnikiem mapującym idiomy Ziga na Rust, zanim jakikolwiek agent zaczął pracować. Shopify przepisał konsumencką aplikację Shop z React Native na natywny Swift i Kotlin w dwanaście tygodni małym zespołem, z checkpointami wielkości ekranu bramkowanymi przez agenta. Asana rozliczyła wieloletni zaległy backlog Enzyme w dwa tygodnie kalendarzowe za około 12 tysięcy dolarów kosztu modeli i infrastruktury, co warto traktować jako koszt generowania zgłoszony przez firmę, nie kontrolowane badanie oszczędności.

**Key takeaways:**
- Trzy strefy ryzyka (zielona, żółta, czerwona) z regułą, że mapę rysuje człowiek, a strefa przesuwa się w górę dopiero po testach charakteryzujących i przeglądzie właściciela modułu.
- Testy charakteryzujące trzeba pinować przed pracą agenta, w osobnym przebiegu albo przez człowieka, inaczej agent "naprawi" brzydkie, ale celowe zachowanie i przepuści to przez własną, zieloną belkę testów.
- SWE Refactor Bench pokazuje, że połowiczne migracje mylą agenta sprzecznym precedensem, na 520 przebiegów tylko 28 przeszło pełny audyt migracji, dlatego migrację warto kończyć w całości, łącznie z usunięciem starej ścieżki, zamiast zostawiać oba wzorce żywe.

**Why do I care:** To jeden z niewielu tekstów o agentowym kodowaniu, który nie sprzedaje wizji "agent przepisze wam cały monolit w weekend", tylko rozkłada na konkretne mechanizmy, dlaczego to się czasem udaje, a czasem kończy się drogim sprzątaniem. Podział na strefy z jasną regułą, kto rysuje mapę i kiedy strefa się przesuwa, to coś, co da się wdrożyć w poniedziałek, bez czekania na kolejną generację modeli. Jeśli macie w zespole choćby jeden moduł, którego nikt nie chce dotykać, to dokładnie kandydat na czerwoną strefę, którą warto nazwać wprost, zanim zrobi to za was agent, otwierając najciekawszy plik jaki znajdzie.

**Link:** [Brownfield Agentic Engineering](https://addyo.substack.com/p/brownfield-agentic-engineering)
