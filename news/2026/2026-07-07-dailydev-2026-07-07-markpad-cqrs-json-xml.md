---
title: "MarkPad, CQRS jako spektrum i JSON kontra XML — przegląd trendów z daily.dev"
excerpt: "Nowy edytor Markdown w Tauri, wyjaśnienie wzorca CQRS przez cztery poziomy złożoności, klasyczny spór JSON kontra XML oraz developer który kupuje gry na Steamie bez wydawania pieniędzy."
publishedAt: "2026-07-07"
slug: "dailydev-2026-07-07-markpad-cqrs-json-xml"
hashtags: "#dailydev #frontend #webdev #tauri #cqrs #architecture #json #xml #typescript #react #generated #pl"
source_pattern: "daily.dev"
---

## MarkPad — lekki edytor Markdown zbudowany w Tauri

**TLDR:** MarkPad to open-source'owy edytor Markdown na desktop, zbudowany z Tauri, React 19 i TypeScript. Działa lokalnie, bez chmury, z podglądem na żywo i bocznym panelem ostatnio otwartych plików.

**Summary:**

Projekt wychodzi naprzeciw prostemu problemowi: większość edytorów Markdown to albo ciężkie aplikacje oparte na Electron, albo narzędzia webowe wymagające konta w chmurze, albo gołe edytory bez żywego podglądu. MarkPad jest lekką alternatywą — natywna aplikacja desktopowa, która uruchamia się szybko, trzyma pliki lokalnie i pokazuje wyrenderowany Markdown w czasie rzeczywistym, obok edytora.

Technicznie stoi na Tauri 2, React 19, TypeScript, Vite, CodeMirror 6 i markdown-it. To zestaw, który już na starcie budzi szacunek — Tauri jako natywna powłoka systemowa zamiast Electron oznacza dramatycznie mniejszy binary i brak całego silnika Chromium w paczce. Projekt obsługuje Windows, Linux i macOS. Dodatkowy plus: przed wyświetleniem podglądu HTML przechodzi przez DOMPurify, więc bezpieczeństwo traktowane jest serio.

Funcjonalnie MarkPad oferuje tryb podzielonego ekranu, pasek narzędzi formatowania z obsługą skrótów klawiszowych, trzy tryby widoku, panel ostatnich plików z zachowaniem niezapisanych roboczych wersji po restarcie, wsparcie dla skojarzenia plików z systemem operacyjnym oraz opcjonalne automatyczne zapisywanie. Preferencje są trwałe między sesjami. Projekt jest na wczesnym etapie rozwoju, ale autor opisuje go jako już używalny na co dzień.

Warto zauważyć, że projekt jest "spec-driven" — każda znacząca funkcja zaczyna się od krótkiej specyfikacji w katalogu `specs/` zanim pojawi się implementacja. To podejście rzadko spotykane w małych projektach open-source i brzmi obiecująco, choć łatwo to powiedzieć na wczesnym etapie, gdy nie ma jeszcze technicznego długu do zarządzania.

**Key takeaways:**
- Tauri zamiast Electron — mniejszy rozmiar, natywna wydajność, lokalny storage
- React 19 + TypeScript + CodeMirror 6 + markdown-it jako stos technologiczny
- Lokalne przechowywanie plików, brak chmury, DOMPurify do sanityzacji podglądu
- Spec-driven development — każda funkcja zaczyna się od specyfikacji akceptacyjnej
- Licencja MIT, aktywnie poszukuje kontrybutorów

**Why do I care:** Jako senior frontend developer patrzę na ten projekt z mieszanymi uczuciami. Z jednej strony Tauri to właściwy wybór — budowanie czegoś takiego w Electron w 2026 roku byłoby trudne do obrony. Z drugiej strony, liczba podobnych edytorów Markdown na rynku jest ogromna i trudno powiedzieć, co dokładnie miałoby przyciągnąć użytkowników akurat do MarkPad. Projekt wygląda czysto architektonicznie i może być ciekawym materiałem do nauki Tauri dla kogoś, kto rozważa budowanie aplikacji desktopowych w tym ekosystemie.

**Link:** [GitHub - lezli01/markpad: Markdown editor with live preview](https://github.com/lezli01/markpad)

---

## CQRS Explained — wzorzec jako spektrum, nie przełącznik

**TLDR:** CQRS to nie decyzja binarna, lecz kontinuum czterech poziomów architektonicznych. Każdy kolejny poziom dodaje możliwości, ale też koszty — przede wszystkim spójność ostateczną i opóźnienie projekcji.

**Summary:**

To wideo wyjaśniające Command Query Responsibility Segregation (CQRS) od podstaw do zaawansowanych przypadków użycia. Zamiast przedstawiać wzorzec jako coś, co włącza się lub wyłącza, autor traktuje go jako spektrum — co jest podejściem znacznie bliższym temu, jak naprawdę wygląda jego stosowanie w praktyce.

Punktem startowym jest pojedynczy współdzielony model — prosty, ale ograniczony. Następne poziomy to replika do odczytu, zmaterializowane widoki (gdzie technicznie zaczyna się CQRS), i w końcu całkowicie oddzielne magazyny danych synchronizowane przez zdarzenia. Każdy krok daje nowe możliwości i niesie ze sobą konkretne koszty.

Kluczowe zagadnienia implementacyjne to wzorzec transactional outbox do zapobiegania utracie zdarzeń, idempotentne projektory do obsługi dostarczania "at-least-once" oraz kolejność zdarzeń per agregat. Film wyjaśnia też powszechnie mylone relacje między CQRS a event sourcingiem — to odrębne wzorce, choć event sourcing typowo wymaga CQRS do zapytań.

Ważny fragment, który warto podkreślić: eksperci tacy jak Fowler, Young i North przestrzegają przed stosowaniem CQRS na poziomie całego systemu. To powinien być celowy, taktyczny wzorzec stosowany tylko tam, gdzie ciśnienie odczytu i zapisu naprawdę się różni. Brzmi rozsądnie, ale wiele zespołów i tak stosuje go wszędzie, bo brzmi zaawansowanie.

Czego brakuje w tej narracji? Kosztów operacyjnych. Zarządzanie projekcjami, obsługa problemów z eventami, debugowanie niespójności między magazynami zapisu i odczytu — to są realne wyzwania produkcyjne, które krótki film z wyjaśnieniami może łatwo pominąć.

**Key takeaways:**
- CQRS to spektrum czterech poziomów, nie binarna decyzja architektoniczna
- Kluczowe wzorce implementacyjne: transactional outbox, idempotentne projektory, kolejność zdarzeń per agregat
- CQRS i event sourcing to odrębne wzorce — event sourcing wymaga CQRS, ale nie odwrotnie
- Fowler, Young i North zalecają stosowanie CQRS tylko tam, gdzie rzeczywiście różni się ciśnienie odczytu/zapisu
- Spójność ostateczna i opóźnienie projekcji to cena kolejnych poziomów

**Why do I care:** CQRS to jeden z tych wzorców, które są odpowiedzią na realny problem, ale rzadko stosuje się je tam, gdzie ten problem faktycznie istnieje. Widziałem za dużo projektów, gdzie CQRS wdrożono dla pryncypialności, a nie dla rozwiązania konkretnego wąskiego gardła. Film prezentujący go jako kontinuum, a nie absolutny wybór, to uczciwe podejście. Szkoda jednak, że większość takich materiałów skupia się na "jak zbudować", a nie "kiedy naprawdę potrzebujesz".

**Link:** [CQRS Explained: The Command Query Responsibility Segregation Levels](https://www.youtube.com/watch?v=fi6HbqmVJL0)

---

## Worse is Better — XML jest lepszy od JSON i nikt tego nie chce słyszeć

**TLDR:** Mark Seemann z bloga ploeh.dk argumentuje, że XML jest w większości aspektów lepszym formatem wymiany danych niż JSON, mimo że JSON wygrał kulturowo. To prowokacyjna, ale rzetelnie uzasadniona teza.

**Summary:**

Mark Seemann kontynuuje swoją serię "Worse is better", tym razem biorąc pod lupę spór JSON kontra XML. Podstawowa teza jest prosta: XML wygrał rozum, JSON wygrał popularność. Autor nie jest sentymentalny — od razu przyznaje, że SOAP, WS-* i XSLT były fatyczne, ale zaraz dodaje, że to nie wina XML-a. Te technologie byłyby równie ciężkie i niezdarne zdefiniowane w JSON. Przyczyna i skutek zostały pomieszane.

XML umożliwia stopniowe wzbogacanie dokumentów. Można zacząć od prostego pliku bez schematu, a gdy pojawi się potrzeba formalnej specyfikacji czytelnej maszynowo — dodać XSD. JSON Schema istnieje, ale to nieco ironiczne, że ktoś musiał ją wymyślić od nowa. XML przychodzi z dojrzałym ekosystemem: standaryzowanym językiem schematu obsługującym typy sumowe, wersjonowaniem dokumentów, XPath, strumieniowymi parserami. Autor pyta wprost: po co odkrywać koło na nowo?

Seemann szczerze przyznaje, gdzie JSON ma rację bytu. SPAs i BFF — tak, JSON to naturalny wybór. W kontekście plików konfiguracyjnych obydwa formaty są słabe, ale brak obsługi komentarzy w JSON to realna wada. Kwestia rozmiaru, często przytaczana jako główny argument za JSON, jest według autora przeceniana — różnica w rozmiarze zależy mocno od konkretnego schematu i często nie ma znaczenia wobec innych czynników jak opóźnienie sieci czy rozmiar bloku.

Co autor pomija lub unika? Kwestię ekosystemu narzędziowego w 2026 roku. Wsparcie XML w nowoczesnych frameworkach frontendowych, bibliotekach walidacji, generatorach typów TypeScript — to wszystko jest dramatycznie słabsze niż dla JSON. Pragmatyczny wybór JSON to nie tylko moda, ale odzwierciedlenie stanu narzędzi, z którymi pracujemy na co dzień. Seemann przyznaje, że pragmatycznie i tak wybierałby JSON w większości przypadków — co trochę podważa cały argument.

**Key takeaways:**
- XML ma dojrzały ekosystem standardów: XSD, XPath, streaming parsery, wersjonowanie
- Złożoność SOAP/WS-* nie wynika z XML-a — te standardy byłyby ciężkie w każdym formacie
- JSON Schema to reinwencja koła, które XML miał od dawna
- JSON ma sens w SPAs, BFF i środowiskach JavaScript-native
- Brak komentarzy w JSON to realna wada dla plików konfiguracyjnych
- Seemann sam przyznaje: pragmatycznie wybrałby JSON w większości współczesnych projektów

**Why do I care:** Ciekawy artykuł do przemyślenia, ale trochę akademicki w swoich wnioskach. W praktyce, ekosystem TypeScript jest zoptymalizowany pod JSON — generatory typów, walidatory jak Zod, klienci API, wszystko to buduje się wokół JSON z naturalną łatwością. XML wymaga zupełnie innego zestawu narzędzi, których znajomość zanika. Seemann ma rację technicznie w wielu punktach, ale ekosystem i momentum ekosystemu mają wagę, której czysta analiza techniczna nie uchwytuje.

**Link:** [Worse is better: JSON versus XML](https://blog.ploeh.dk/2026/07/06/worse-is-better-json-versus-xml)

---

## Developer zbudował Steam bez pieniędzy — dosłownie

**TLDR:** Developer Mike Wing stworzył Steam Sales Simulator — stronę, która pozwala "kupować" gry ze Steama bez wydawania pieniędzy. Dostaje te same powiadomienia i osiągnięcia, bez dostępu do samych gier.

**Summary:**

Mike Wing jest uzależniony od kupowania gier na Steamie. Nie od grania — od kupowania. To dość powszechny stan, szczególnie podczas Steam Summer Sale. Zamiast walczyć z nałogiem, zbudował Steam Sales Simulator — stronę internetową, która odtwarza cały rytuał zakupu gry bez wydawania prawdziwych pieniędzy.

Jak sam to opisuje: "Zrobiłem stronę, która daje mi ten sam zastrzyk dopaminy z kupowania gier bez wydawania prawdziwych pieniędzy." Oczywista wada jest taka, że kupionych gier nie można zagrać. "Gry bez gier", jak podsumował Wing. Projekt poszedł jednak dalej — dodał community marketplace, gdzie można sprzedawać przedmioty, których się nie posiada, za pieniądze, które nie istnieją. To jest albo głęboka satyra na ekonomię cyfrowych dóbr, albo po prostu zabawny weekend projekt. Być może obydwa naraz.

80 LEVEL opisuje to jako "creative developer" project, co jest łagodnym określeniem. W rzeczywistości to ciekawe ćwiczenie z inżynierii emocjonalnej — budowanie interfejsu, który wywołuje reakcje emocjonalne (radość z zakupu, poczucie posiadania) bez dostarczania wartości użytkowej. Że to działa, jest samo w sobie intrygującym komentarzem o tym, co tak naprawdę sprzedają platformy cyfrowe.

Warto odnotować, że przeglądarka może blokować dostęp do strony — Wing sam ostrzega, by postępować na własne ryzyko. Co to oznacza technicznie, artykuł nie precyzuje.

**Key takeaways:**
- Steam Sales Simulator pozwala kupować gry bez pieniędzy i bez możliwości grania
- Projekt zawiera community marketplace z wirtualnymi przedmiotami i walutą
- To osobliwe ćwiczenie z emocjonalnej inżynierii UX — zakup bez produktu
- Przeglądarka może blokować stronę, według ostrzeżenia autora
- Projekt jest komentarzem do psychologii zakupów cyfrowych i mechanizmów dopaminy

**Why do I care:** Z perspektywy frontend developera to interesujące case study — zbudować coś, co wywołuje realne emocjonalne reakcje bez żadnej "prawdziwej" wartości. Steam latami dopracowywało swoje mikrointerakcje sprzedażowe i fakt, że można je odtworzyć w wyizolowanym kontekście i nadal działają psychologicznie, mówi coś ważnego o sile wzorców projektowych. Nie jest to może przełomowe osiągnięcie inżynierskie, ale jest to rozbrajająco uczciwy projekt.

**Link:** [Developer Launched Site That Lets You Buy Steam Games Without Money](https://80.lv/articles/creative-developer-launched-steam-clone-that-allows-you-to-buy-games-without-money)
