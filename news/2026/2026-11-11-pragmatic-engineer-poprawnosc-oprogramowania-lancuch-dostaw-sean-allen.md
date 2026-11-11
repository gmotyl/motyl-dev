---
title: "The Pragmatic Engineer: poprawność oprogramowania i bezpieczeństwo łańcucha dostaw z Seanem Allenem"
excerpt: "Rozmowa Gergely'ego Orosza z Seanem Allenem o tym, że poprawność to coś innego niż testowanie, a jakość nie jest bramką."
publishedAt: "2026-11-10"
slug: "pragmatic-engineer-poprawnosc-oprogramowania-lancuch-dostaw-sean-allen"
hashtags: "#pragmaticengineer #testing #architecture #security #engineering #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Poprawność oprogramowania i języki zbudowane wokół niej

**TLDR:** Sean Allen, wybitny inżynier w Antithesis i współtwórca języka Pony, przekonuje, że poprawność trzeba wbudować w system od początku, a nie dokładać testami na końcu. Rozmowa miała się obyć bez słowa "AI", co autor uznaje za wyzwanie.

**Summary:** Allen definiuje poprawność przez niezmienniki, czyli gwarancje, że program robi to, czego od niego oczekujemy. Dodaje, że wiele zespołów nie wie z góry, czego oczekuje, a poprawne oprogramowanie to takie, które robi swoje i nikogo nie budzi o drugiej w nocy. Wspomina początek kariery: Ada nie kompilowała jego programów, bo były niebezpieczne dla pamięci, a C kompilowało się zawsze i potem wykładało się segfaultami. Z tego wyciąga wniosek o wartości kompilatora, który odmawia.

Dalej dzieli języki na rodzinę ALGOL i rodzinę ML. W tej drugiej, z silnymi systemami typów, typ sumy w połączeniu z wyczerpującym dopasowaniem sprawia, że dodanie nowego wariantu natychmiast pokazuje każde miejsce w kodzie, które go nie obsługuje. Stąd jego teza, że nielegalne stany powinno się uniemożliwić na poziomie języka, zanim w ogóle zaczniemy testować. Ręczne testowanie nazywa najgorszą metodą zapewniania poprawności.

Najciekawszy fragment dotyczy tak zwanych obciążeń, czyli workloadów. Zamiast losowo wybierać operacje, definiuje się scenariusz, który wymusza interesujące stany. Klasyczny przykład to test banku: dziesięć kont po tysiąc, przelewy w transakcjach i drugi proces, który ciągle sumuje pieniądze w systemie. Jeśli izolacja działa, suma zawsze wynosi dziesięć tysięcy. Wprowadzenie awarii sieci i ubijanie węzłów wyciąga z dojrzałych baz błędy, których zwykłe testy nie widziały. Autor zapowiada jeszcze rozmowę o tym, że jakość nie jest bramką, że dług techniczny nie zawsze trzeba spłacać, że łańcuch dostaw jest trudny do obrony i że śmieciarka pamięci nie musi być wolna. Pobrany fragment urywa się przed tymi częściami, więc znamy je tylko ze spisu treści.

**Key takeaways:**
- Poprawność to niezmienniki, a nie liczba testów.
- Silne typy i wyczerpujące dopasowanie zamieniają zapomniane przypadki w błędy kompilacji.
- Workload z jasnym niezmiennikiem wykrywa błędy, których losowe testy nie znajdą.

**Why do I care:** Dla frontendowca najbardziej praktyczna jest myśl o niemożliwych stanach. Unie dyskryminowane w TypeScripcie z wyczerpującym sprawdzaniem robią dokładnie to samo dla stanu interfejsu. A ponieważ agenci piszą coraz więcej kodu, zdefiniowanie niezmienników staje się ważniejsze od liczby wygenerowanych testów. Zastrzeżenie: autor rozmowy sam zaznacza, że Antithesis jest sponsorem podcastu, choć ten materiał nie jest sponsorowany.

**Link:** [Software correctness & supply chain security, with Sean Allen](https://newsletter.pragmaticengineer.com/p/software-correctness)
