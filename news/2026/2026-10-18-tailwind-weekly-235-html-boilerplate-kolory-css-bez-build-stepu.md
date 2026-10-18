---
title: "Tailwind Weekly #235: szablon HTML na 2026, dwuwarstwowy system kolorów i 12 funkcji CSS bez build stepu"
excerpt: "Manuel Matuzović aktualizuje swój boilerplate HTML, poradnik o kolorach łączy prymitywy z semantyką, a Flavio Copes zbiera dwanaście funkcji CSS, które zastępują Sass i skrypty."
publishedAt: "2026-10-18"
slug: "tailwind-weekly-235-html-boilerplate-kolory-css-bez-build-stepu"
hashtags: "#tailwindweekly #tailwindcss #css #html #performance #accessibility #container-queries #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Mój boilerplate HTML w 2026 roku

**TLDR:** Manuel Matuzović pięć lat po pierwszej wersji przechodzi przez każdy element, którego używa w podstawowej strukturze dokumentu HTML. Dla każdego tagu mówi, czy jest wymagany, zalecany, czy tylko opcjonalny, i dlaczego.

**Summary:** Matuzović zaczyna od rzeczy oczywistych, czyli doctype, atrybutu lang na elemencie html, kodowania UTF-8 i viewportu. Przy viewporcie zauważa, że initial-scale równe jeden nie jest już potrzebne, bo było obejściem dla starych wersji iOS i Androida. Przyznaje jednak, że ludzie wciąż wskazują jakieś przypadki brzegowe, których nikt nie umie nazwać, więc dopisanie go nie zaszkodzi.

Ciekawsze są nowości. Pojawia się meta tag text-scale, który każe mobilnym przeglądarkom respektować rozmiar tekstu ustawiony w systemie. Autor ostrzega, żeby nie kopiować go na ślepo, bo potrafi rozwalić layout, i trzeba po prostu zwiększyć tekst w telefonie i sprawdzić stronę. Jest też link rel alternate z typem markdown, czyli wersja strony dla LLM-ów, która zmniejsza zużycie tokenów. Do tego rel me do weryfikacji na Mastodonie, fediverse creator do podpisu autora i link do publikacji w standardzie site.standard na protokole AT.

Sporo miejsca dostają favicony. Matuzović testował iOS 18 i zauważył, że po zdefiniowaniu ikony SVG przeglądarka przestaje wracać do favicon.ico z roota. Jeśli zależy ci na starszych Safari, musisz zadeklarować oba pliki. SVG ma za to zaletę, że można w nim osadzić CSS z prefers-color-scheme i dostać ikonę w trybie ciemnym. Theme-color działa tylko w Chromium na Androidzie, a Safari 26 zrezygnowało z niego na rzecz koloru tła body albo elementu przyklejonego na górze strony.

Na końcu autor wymienia tagi, które przydają się od czasu do czasu. Open Graph z alt dla obrazka jest obsługiwany bardzo nierówno. Bluesky i Slack go ignorują, Mastodon i Discord respektują. Typ article z datami publikacji i modyfikacji sprawia, że Slack pokazuje datę publikacji, a Signal datę modyfikacji. Wspomina też viewport-fit cover dla notcha, interactive-widget resizes-content dla klawiatury ekranowej i meta color-scheme.

**Key takeaways:**
- Dla viewportu wystarczy width równe device-width, ale initial-scale jeden nie szkodzi.
- Jeśli deklarujesz favicon SVG, zostaw też favicon.ico, inaczej starsze Safari nie pokaże nic.
- Meta text-scale trzeba przetestować na realnym urządzeniu, zanim trafi na produkcję.
- Wersja markdown strony to tani sposób na lepszą widoczność dla LLM-ów.

**Why do I care:** Mam kilka projektów, w których head dokumentu to kopia kopii sprzed lat i nikt nie wie, co w nim jest potrzebne. Ten wpis działa jak lista kontrolna do takiego przeglądu. Autor nie rozstrzyga rzeczy, których sam nie przetestował, i to jest w nim najuczciwsze. Brakuje tylko ostrzeżenia, że kopiowanie całości do każdego projektu to ten sam błąd, tylko nowszy. Połowa tych tagów to kwestia decyzji produktowej, a nie techniczna.

**Link:** [My HTML boilerplate in 2026 - Manuel Matuzović](https://matuzo.at/blog/2026/html-boilerplate)

## System kolorów, który chciałbym poznać wcześniej

**TLDR:** Autor pokazuje, że same prymitywy kolorów i same nazwy semantyczne mają swoje limity, a razem rozwiązują oba problemy. Prymitywy trzymają wartości HEX, a semantyki wskazują na prymitywy.

**Summary:** Punkt wyjścia jest prosty. HEX daje ponad szesnaście milionów wartości, więc każdy projekt potrzebuje palety. Pierwszy krok to zwykle prymitywy, na przykład skala Tailwinda z 22 rodzinami kolorów po 11 odcieni, co daje 242 nazwane opcje. Problem pojawia się po pół roku. Nazwa blue-600 nie mówi, czy to kolor przycisku, linku czy ikony, więc trzeba to odtwarzać z pamięci.

Drugie podejście to nazewnictwo semantyczne, na przykład button-background albo text-muted. Tu z kolei wychodzi inny kłopot. Wiele zmiennych ma tę samą wartość, bo przyciski, linki i CTA mają ten sam niebieski. Gdy klient prosi o lekką zmianę odcienia, musisz znaleźć i poprawić każdą zmienną osobno. Jedna przeoczona i kolory się rozjeżdżają.

Rozwiązaniem jest łączenie warstw. Prymitywy to jedyne miejsce, gdzie żyją wartości HEX. Semantyki to zmienne CSS, które nie mają koloru wprost, tylko przez var wskazują na prymityw. Zmiana blue-600 zmienia wszystko, co na niego wskazuje. Jeśli klient chce pomarańczowych przycisków, zmieniasz jedną linię, button-background wskazuje na orange-600, a linki i CTA zostają niebieskie.

**Key takeaways:**
- Prymitywy mówią, jakie kolory istnieją, semantyki mówią, gdzie ich używać.
- Każda warstwa osobno ma słabość, razem się uzupełniają.
- Globalna zmiana to edycja prymitywu, lokalna to zmiana wskazania w semantyce.

**Why do I care:** To jest dokładnie ten wzorzec, który design tokens robią w dużych systemach, tylko opisany dla kogoś, kto buduje strony w builderze. Dla mnie nic nowego, ale przydaje się jako link do wysłania juniorom. Autor pomija dwie rzeczy. Tryb ciemny, bo tam semantyka wskazuje na inny prymityw i cała wartość wzorca wychodzi na wierzch. I kontrast, bo sama semantyka nie gwarantuje, że para tekst i tło spełnia WCAG.

**Link:** [The Color System I Wish I Understood Sooner](https://theadminbar.com/semantics-and-primitives-color-system/)

## 12 funkcji CSS, których możesz użyć dziś bez build stepu

**TLDR:** Flavio Copes zbiera dwanaście funkcji CSS, które zastępują Sass, wtyczki PostCSS i skrypty JavaScript. Przy każdej podaje, jakie obejście znosi i jaki jest status Baseline według stanu na wrzesień 2026.

**Summary:** Lista zaczyna się od natywnego nestingu, który był głównym powodem instalowania Sassa. Autor zwraca uwagę na pułapki. Znak ampersand w CSS jest selektorem, a nie tekstem do sklejania, więc konstrukcja w stylu BEM z ampersandem i podkreśleniem nie zbuduje nazwy klasy. Przy liście selektorów w rodzicu zagnieżdżona reguła dostaje specyficzność identyfikatora, nawet gdy dopasowała się tylko klasa.

Kolejne pozycje to has, które daje wreszcie spojrzenie w górę drzewa, container queries z jednostkami cqi, subgrid, oklch i color-mix, aspect-ratio zamiast hacka z paddingiem, cascade layers, is i where, jednostki dvh, svh i lvh, logical properties oraz starting-style. Przy has autor przypomina, że reguła ma specyficzność najmocniejszego argumentu i że body:has z klasą każe przeglądarce sprawdzać regułę przy każdej zmianie w środku. Przy subgrid podkreśla, że bez grid-row span trzy karta nie nie ma do czego się podpiąć.

Jedyna pozycja, która nie jest Baseline, to animacje oparte na scrollu. Chrome ma je od 115, Safari 26 od września 2025, a Firefox tylko w Nightly za flagą. Autor radzi opakować je w @supports i szanować prefers-reduced-motion. Przy starting-style zauważa, że Firefox nie animuje jeszcze display, więc wejście działa, a wyjście przeskakuje.

Copes dodaje, że sama ta strona nadal ma build step, bo Tailwind generuje klasy, a Astro bundluje wynik. Ale reguły w pliku global.css są zwykłym CSS i każda z dwunastu funkcji zadziałałaby tam bez zmian w buildzie.

**Key takeaways:**
- Natywny nesting, has, container queries i subgrid są już Baseline Widely available.
- Scroll-driven animations to jedyna pozycja bez pełnego wsparcia, bo brakuje Firefoxa.
- Dvh zmienia się w trakcie scrolla, więc do layoutu lepszy jest svh.
- Przed użyciem funkcji sprawdź plakietkę Baseline na MDN i opakuj ryzykowne fragmenty w @supports.

**Why do I care:** Każdy zespół, który ma w repo Sassa tylko dla nestingu i prostych mixinów, może to usunąć. To jedna z tych migracji, które wyglądają na kosmetykę, a zmniejszają łańcuch zależności i czas builda. Ostrzegłbym tylko przed hurra-entuzjazmem wokół has. Na dużych drzewach DOM to funkcja, którą łatwo nadużyć i zapłacić wydajnością. Autor to zresztą sam zauważa, ale w jednym zdaniu.

**Link:** [12 CSS features you can use today with no build step](https://flaviocopes.com/modern-css-features/)

## Remocn, czyli film demo produktu robiony przez agenta

**TLDR:** Remocn to darmowa biblioteka z licencją MIT, ma 395 komponentów animacji, a agent AI składa z nich film demonstracyjny. Zamiast edytora wideo opisujesz produkt i oglądasz wynik w przeglądarce.

**Summary:** Strona obiecuje, że do demo produktu potrzebujesz agenta, na przykład Claude Code albo Cursora, i pustego folderu. Wklejasz jeden prompt, a agent konfiguruje projekt, instaluje skill remocn i otwiera podgląd. Zmiany zgłaszasz słowami i agent je wprowadza. Komponenty podzielone są na pięć rodzin, a typografia to jedna z nich.

Autorzy porównują to z alternatywami. Projektant to według nich około 600 dolarów i dwa tygodnie, After Effects to weekend nauki, a nagranie ekranu rzadko wygląda profesjonalnie. Kod kopiuje się do repo i zostaje tam bez runtime'u i konta.

**Key takeaways:**
- 395 komponentów na licencji MIT, bez runtime'u i konta.
- Agent składa film z gotowych elementów, a ty tylko reagujesz na efekt.
- Deklarowany czas pierwszego filmu to popołudnie, kolejnych poniżej godziny.

**Why do I care:** To głównie materiał marketingowy, więc wszystkie liczby kosztów pochodzą od samych autorów i nikt ich nie zmierzył. Warto spróbować, jeśli potrzebujesz krótkiego demo do README albo landing page. Nie wierzyłbym w obietnicę, że nie trzeba umieć kodować. Pracujesz przez agenta, więc kiedy coś pójdzie źle, i tak musisz czytać kod.

**Link:** [Remocn - Make a product demo video with your AI agent](https://remocn.dev/)
