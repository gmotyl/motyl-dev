---
title: "Context engineering: jak zarządzać oknem kontekstowym LLM w praktyce"
excerpt: "Dex Horthy, twórca pojęcia context engineering i autor 12-Factor Agents, opowiada o tym, dlaczego rozmiar okna kontekstowego to nie wszystko i jak budować agentowe systemy AI bez utraty kontroli nad kodem."
publishedAt: "2026-07-16"
slug: "context-engineering-dex-horthy"
hashtags: "#pragmaticengineer #engineering #ai #llm #agentai #contextengineering #generated #pl"
source_pattern: "Pragmatic engineer"
---

## Context engineering z Dexem Horthym

**TLDR:** Dex Horthy, CEO HumanLayer i autor popularnego "12-Factor Agents", wyjaśnia, czym naprawdę jest context engineering, gdzie zaczyna się "strefa głupoty" modelu i dlaczego całkowite oddanie pisania kodu AI bez recenzji skończyło się dla jego zespołu katastrofą.

**Summary:** Dex Horthy zaczął budować agenty AI około sierpnia 2024 roku, gdy dominowały frameworki takie jak LangChain i CrewAI. Porozmawiał z blisko setką inżynierów AI, którzy faktycznie dostarczali rozwiązania za grube pieniądze w środowiskach enterprise, i odkrył, że większość z nich szybko porzucała gotowe frameworki na rzecz własnych pipeline'ów. Z tych rozmów powstał "12-Factor Agents" — zestaw zasad budowania niezawodnych aplikacji LLM, który szybko stał się lekturą obowiązkową w środowisku.

Context engineering to, najprościej mówiąc, sztuka decydowania, co trafia do okna kontekstowego modelu i w jakiej kolejności. Horthy ukuł ten termin jako alternatywę dla "prompt engineering", bo lepiej oddaje sedno problemu: nie chodzi tylko o to, jak napisać polecenie, ale o to, jakie informacje przekazać modelowi, żeby zadanie było w ogóle do rozwiązania. Tobi Lutke i Andrej Karpathy szybko poparli to sformułowanie, co pomogło mu się rozpowszechnić.

Kluczowy koncept to "strefa głupoty" — punkt, w którym model zaczyna zachowywać się nieprzewidywalnie, bo jego okno kontekstowe jest zbyt zapełnione. Dla modelu z oknem 1M tokenów Dex celuje w okolice 300-400K, dla mniejszych zatrzymuje się na 100K. Mechanizm uwagi jest kwadratowy, więc każdy kolejny token kosztuje coraz więcej zasobów obliczeniowych, a jakość decyzji modelu spada. Objawem wejścia w strefę głupoty może być na przykład usunięcie pliku .env.

Dex wyciągnął bolesną lekcję z własnego eksperymentu z lipca 2025 roku: pozwolił modelowi pisać kod bez żadnego przeglądu przez człowieka. Cztery miesiące później trzeba było wyrzucić cały system do kosza. Produkcja się psuła, a nawet Opus 4.1 nie był w stanie znaleźć przyczyny. Okazało się, że błędny klucz główny przenikał przez cały kod, a odkrycie tego zajęło dni wertowania spaghetti code'u. Ponowne wdrożenie się do bazy kodu, której nikt wcześniej nie czytał, zajęło trzy tygodnie. Dziś ten problem rozwinąłby się jeszcze szybciej, bo modele produkują kod znacznie szybciej niż rok temu.

Dex wskazuje też na problem strukturalny: modele prawdopodobnie są trenowane w sposób, który z czasem pogarsza jakość bazy kodu. Benchmarki takie jak SWE-bench nagradzają modele za odtworzenie konkretnych poprawek w znanych codebases jak Django, ale nie mogą ocenić złych decyzji architektonicznych, bo tych nie da się zweryfikować testem jednostkowym. Jego najlepszy pomysł na eval: kazać modelowi zbudować 20 kolejnych funkcjonalności bez wiedzy o tym, co będzie następne. Nikt tego jeszcze nie robi na poważnie.

Wśród technik praktycznych Dex poleca celowe kompaktowanie kontekstu: po zapełnieniu okna w "inteligentnej strefie" należy skompresować całą sesję do dokumentu Markdown i zacząć nową sesję z tym plikiem jako wejściem. W jego typowym workflow jedna sesja czyta kod i generuje dokument badawczy, kolejna tworzy na jego podstawie dokument projektowy, a następna planuje implementację. Człowiek wchodzi do pętli przy przeglądzie dokumentu projektowego i architektury, bo modele są na tym polu słabe.

**Key takeaways:**
- Okno kontekstowe ma "strefę głupoty" — im więcej tokenów, tym gorzej model podejmuje decyzje; dla modeli z 1M oknem Dex nie przekracza 300-400K.
- Wysyłanie kodu do produkcji bez żadnego review przez człowieka kończy się katastrofą; nawet 30-50% wzrost produktywności jest realny przy zachowaniu przeglądu kodu.
- Modele są autoregresywne: jeśli sesja wejdzie w "trajectory poisoning" (np. model zaczyna mówić "masz rację!" i dalej popełnia błędy), jedynym wyjściem jest nowa sesja.
- Celowe kompaktowanie kontekstu przez skrócenie długich sesji do pliku Markdown i rozpoczęcie nowej sesji to skuteczna technika zarządzania złożonymi projektami.
- Optymalizację kosztów LLM warto odkładać na etap skali; na początku zawsze używaj najmądrzejszego dostępnego modelu.

**Why do I care:** Ten odcinek trafia w sedno czegoś, z czym zmagam się na co dzień. "Context engineering" to termin, który powinien zastąpić "prompt engineering" w rozmowach o AI na poważnie. Koncepcja "strefy głupoty" wyjaśnia mnóstwo przypadków, kiedy model nagle zaczyna zachowywać się chaotycznie, a ja nie wiedziałem dlaczego. Dla mnie jako architekta najbardziej interesujące jest jednak to, że modele są trenowane na benchmarkach, które nie nagradzają dobrej architektury. To oznacza, że odpowiedzialność za decyzje strukturalne nadal spoczywa na inżynierach. AI może pisać kod, ale nie może (jeszcze) dbać o to, czy ten kod będzie czytelny za pół roku. To niezła wiadomość dla tych, którzy rozumieją różnicę między kodem, który działa, a kodem, który jest dobry.

**Link:** [Context engineering with Dex Horthy](https://newsletter.pragmaticengineer.com/p/context-engineering-with-dex-horthy)
