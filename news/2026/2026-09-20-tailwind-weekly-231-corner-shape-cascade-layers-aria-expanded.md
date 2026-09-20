---
title: "Tailwind Weekly #231: corner-shape, cascade layers i pułapki aria-expanded"
excerpt: "Trzy technologiczne smaczki z Tailwind Weekly #231: nowa właściwość CSS corner-shape, spór o kolejność warstw cascade layers przy pracy z Tailwindem oraz przewodnik po poprawnym stosowaniu aria-expanded."
publishedAt: "2026-09-19"
slug: "tailwind-weekly-231-corner-shape-cascade-layers-aria-expanded"
hashtags: "#tailwindweekly #tailwindcss #css #accessibility #aria #architecture #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Co tak naprawdę możemy zrobić z corner-shape?

**TLDR:** Nowa właściwość CSS corner-shape, dostępna na razie wyłącznie w Chrome 139 i nowszych, pozwala zastąpić klasyczne zaokrąglone rogi ścięciami, karbami i kształtami przypominającymi tak zwane squircle. Autor artykułu pokazuje na przykładach, jak jedną, dwiema liniami CSS zbudować ścięte przyciski, strzałkowate breadcrumby, dymki podpowiedzi czy nawet efekt ręcznie narysowanego zakreślacza na tekście.

**Summary:** Przez lata border-radius było jedynym narzędziem do zaokrąglania rogów, a jego historia sięga czasów, kiedy zaokrąglenia trzeba było symulować obrazkami sprite z Photoshopa. Dziś modne stały się ostre kąty i tak zwane squircle, czyli kształty pośrednie między kwadratem a kołem, i właśnie do tego służy nowa właściwość corner-shape. Działa ona zawsze w parze z border-radius lub jego szczegółowymi odpowiednikami dla poszczególnych rogów, a jej wartości takie jak bevel, scoop, notch czy squircle determinują, jak dokładnie zostanie poprowadzona linia między dwoma punktami na osiach danego rogu.

Autor pokazuje, że najprostszy przypadek to ścięty róg w stylu brutalistycznym, uzyskany przez połączenie corner-shape: bevel z odpowiednim promieniem. Ciekawiej robi się, gdy dla jednej osi podajemy inną wartość niż dla drugiej, bo to właśnie ta asymetria pozwala tworzyć ukośne sekcje, popularne w interfejsach o bardziej dynamicznym, niekwadratowym charakterze. Ten sam mechanizm, tyle że powtórzony po obu stronach, pozwala odtworzyć klasyczny kształt metki z ceną na sklepach internetowych, wcześniej wymagający obrazków albo skomplikowanych trików z pseudo-elementami.

Najbardziej praktyczny fragment dotyczy jednak breadcrumbów w kształcie strzałek oraz dymków podpowiedzi zbudowanych z wykorzystaniem popoverów i pozycjonowania względem kotwicy. Autor pokazuje też mniej oczywiste zastosowanie corner-shape: notch, które nie tyle tworzy efekt wizualny na krawędzi elementu, co pozwala precyzyjnie przycinać tło, jeśli chcemy odciąć jego fragment z jednej strony bez uciekania się do clip-path. Osobny akapit poświęcony jest efektowi ręcznie narysowanego zakreślacza na elemencie mark, uzyskanemu przez połączenie squircle i bevel z asymetrycznymi promieniami, co daje wrażenie nierównej, odręcznej linii zamiast sztywnego prostokąta.

Całość kończy się przestrogą, że część tych efektów, zwłaszcza notch, wygląda po prostu brzydko jako samodzielny element wizualny, ale bywa użyteczna technicznie. Autor przyznaje też wprost, że eksperymentował z wieloma wartościami metodą prób i błędów, co dobrze oddaje obecny etap dojrzałości tej właściwości: ciekawa, obiecująca, ale wciąż ograniczona do jednej przeglądarki i wymagająca sporo zabawy, zanim wyniki zaczną wyglądać intencjonalnie, a nie przypadkowo.

**Key takeaways:**
- corner-shape działa wyłącznie razem z border-radius i jego wariantami dla pojedynczych rogów, a obecnie wspiera go tylko Chrome 139+
- Wartości takie jak bevel, scoop, notch i squircle pozwalają zastąpić obrazki i skomplikowane triki CSS prostymi deklaracjami przy ściętych narożnikach, dymkach czy strzałkowatych elementach nawigacji
- Asymetryczne wartości promienia na osi poziomej i pionowej to klucz do uzyskania skosów, metek cenowych i nietypowych kształtów bez dodatkowego markupu

**Why do I care:** Jako architekt frontendu patrzę na corner-shape z umiarkowanym entuzjazmem: to typowy przykład właściwości CSS, która świetnie wygląda w demie na CodePenie, ale w produkcyjnym projekcie z wymaganiem wsparcia dla więcej niż jednej przeglądarki będzie musiała poczekać na progressive enhancement albo fallback. Warto ją znać już teraz, bo redukuje ilość hacków opartych na obrazkach, pseudo-elementach i clip-path, a to w dłuższej perspektywie oznacza mniej kruchego kodu do utrzymania w design systemie.

**Link:** [What Can We Actually Do With corner-shape?](https://css-tricks.com/what-can-we-actually-do-with-corner-shape/)

## Cascade Layers i Tailwind: droga ortodoksyjna kontra nieortodoksyjna

**TLDR:** Autor pokazuje, że Tailwind od kuchni korzysta z CSS Cascade Layers, i konfrontuje ze sobą dwa podejścia do organizacji stylów: zalecaną przez twórców frameworka kolejność, w której utility klasy Tailwinda mają najwyższy priorytet, oraz własne, nieortodoksyjne podejście, w którym to zwykłe CSS nadpisuje utility klasy.

**Summary:** Punktem wyjścia jest fakt, że Tailwind definiuje cztery nazwane warstwy cascade layers: theme, base, components i utilities, gdzie kolejność deklaracji warstw decyduje o priorytecie, niezależnie od specyficzności selektorów. Domyślne, rekomendowane przez twórców podejście polega na tym, żeby własne komponenty owijać w warstwę components, a Tailwindowe utility klasy traktować jako warstwę nadrzędną, którą nadpisuje się pojedyncze właściwości komponentu bezpośrednio w znaczniku HTML.

Autor przyznaje, że to sensowne rozwiązanie, ale po ponad roku eksperymentów z Tailwindem i czystym CSS doszedł do wniosku, że bardziej praktyczne jest odwrócenie priorytetów: pisanie własnego CSS w warstwie nienazwanej, czyli takiej, która z definicji ma najwyższy priorytet spośród wszystkich warstw wymienionych w deklaracji @layer. Dzięki temu własny CSS naturalnie nadpisuje utility klasy Tailwinda, a nie odwrotnie. Argumentacja jest praktyczna: mniej narzutu związanego z pamiętaniem, w jakiej warstwie coś zostało zadeklarowane, oraz możliwość realizowania w czystym CSS rzeczy trudnych albo niemożliwych do wyrażenia samymi utility klasami, jak zaawansowane theming czy animacje.

Kluczowy niuans, który autor podkreśla, to sposób traktowania Tailwinda w tym modelu: nie jako głównego źródła prawdy dla stylów komponentu, tylko jako szybkie narzędzie prototypowania, które z czasem, wraz ze wzrostem złożoności, przenosi się do zwykłego CSS, żeby uniknąć czytania znaczników HTML zaśmieconych dziesiątkami klas utility. Mimo odwróconej hierarchii wciąż można punktowo wymusić priorytet danej klasy Tailwinda przy pomocy modyfikatora !important, co autor uzasadnia jako legalny, wbudowany mechanizm CSS Layers, przydatny do szybkich, jednorazowych poprawek bez tworzenia nowego selektora.

Artykuł kończy się przypomnieniem, że utility klasy Tailwinda nie są prostym mapowaniem jeden do jednego na właściwość CSS, tylko czymś bliższym wygodnym mixinom Sass, co otwiera drogę do budowania bardziej złożonych narzędzi do layoutu, typografii i theming, wykraczających poza to, do czego Tailwind bywa sprowadzany w potocznej opinii.

**Key takeaways:**
- Tailwind definiuje własne cascade layers: theme, base, components i utilities, a kolejność ich deklaracji, nie specyficzność selektorów, decyduje o priorytecie stylów
- Można świadomie odwrócić zalecaną hierarchię i pisać komponentowe CSS w nienazwanej warstwie o najwyższym priorytecie, żeby to ono nadpisywało utility klasy, a nie odwrotnie
- Modyfikator !important w kontekście cascade layers to legalny sposób na punktowe wymuszenie priorytetu konkretnej klasy Tailwinda bez tworzenia nowego selektora

**Why do I care:** To dokładnie ten rodzaj decyzji architektonicznej, która wygląda na kosmetyczną, a w praktyce determinuje, jak bardzo zespół będzie cierpiał przy skalowaniu design systemu. Odwrócenie priorytetów cascade layers ma sens tam, gdzie Tailwind jest traktowany jako narzędzie prototypowania, a docelowy kod i tak ląduje w komponentach ze świadomie zarządzanym CSS, ale w zespołach, które trzymają się czystego, utility-first podejścia bez odstępstw, taka nieortodoksyjność wprowadzi więcej zamieszania niż korzyści. Warto to świadomie wybrać na starcie projektu, a nie odkrywać w środku sprintu, kiedy ktoś nie może zrozumieć, dlaczego jego klasa p-4 nagle nic nie robi.

**Link:** [Using CSS Cascade Layers With Tailwind Utilities](https://css-tricks.com/using-css-cascade-layers-with-tailwind-utilities/)

## Kiedy naprawdę potrzebujesz aria-expanded

**TLDR:** Artykuł systematyzuje, kiedy atrybut aria-expanded jest właściwym narzędziem, a kiedy technologie asystujące i tak dostaną wystarczającą informację z natywnych elementów HTML, takich jak details, summary czy dialog. Autorka dzieli komponenty na sekcje zwijane i interaktywne elementy zwijane, pokazując konkretne wzorce dla każdej z tych kategorii.

**Summary:** Punktem wyjścia jest doświadczenie z audytów dostępności, podczas których regularnie trzeba oceniać, czy dany element z atrybutem aria-expanded w ogóle go potrzebuje, czy może dałoby się go zastąpić natywnym elementem HTML. Autorka dzieli zwijane widżety na dwie kategorie: sekcje zwijane, do których należą disclosure widget i akordeon, oraz interaktywne elementy zwijane, obejmujące menu, nawigację, drzewa i combo boxy.

W przypadku prostego disclosure widget, jeśli jego jedyną funkcją jest pokazanie i ukrycie fragmentu treści, rekomendacją jest sięgnięcie po natywne elementy details i summary zamiast ręcznie budowanego przycisku z aria-expanded i obsługą klawiatury w JavaScript. Akordeon, czyli zestaw kilku takich widżetów, bywa bardziej problematyczny nie tylko technicznie, ale i z punktu widzenia doświadczenia użytkownika, bo tak zwany wyłączny akordeon, pozwalający otworzyć tylko jedną sekcję naraz, bywa krytykowany jako wzorzec nieprzyjazny dla użytkownika, wymuszający dodatkowe kliknięcia, żeby porównać treść dwóch sekcji.

Druga kategoria, interaktywne elementy zwijane, obejmuje nawigację z rozwijanymi podmenu, gdzie kluczowe jest odróżnienie, czy dany przycisk hamburgera otwiera pasek nawigacyjny, co wystarczy opisać samym aria-expanded, czy menu w rozumieniu ARIA, co dodatkowo wymaga aria-haspopup. Osobne akapity dotyczą drzew i tree gridów, gdzie oprócz aria-expanded w grę wchodzi cały zestaw dodatkowych atrybutów opisujących poziom zagnieżdżenia, pozycję i rozmiar zbioru, oraz combo boxów, w przypadku których autorka wprost sugeruje, że natywny element select, dziś swobodnie stylowalny, w większości przypadków eliminuje potrzebę budowania własnego komponentu od zera.

Ostatnia część artykułu odróżnia wzorce oparte na aria-expanded od wzorców pokrewnych, ale różnych, jak modale, interfejsy zakładkowe i tooltipy, które powinny korzystać raczej z aria-haspopup albo aria-modal. Tu również pojawia się mocny akcent na natywne rozwiązania: element dialog z natywnym wsparciem przeglądarek i nowe invoker commands pozwalają zbudować w pełni dostępny modal bez ani jednej linijki JavaScriptu, a Popover API w połączeniu z invoker commands otwiera podobną ścieżkę dla tooltipów.

**Key takeaways:**
- aria-expanded jest potrzebny tylko wtedy, gdy nie da się skorzystać z natywnego elementu HTML, takiego jak details, summary, select czy dialog, które same komunikują stan technologiom asystującym
- Wybór między aria-expanded a aria-haspopup przy przycisku hamburgera zależy od tego, czy otwiera on pasek nawigacyjny, czy pełnoprawne menu w rozumieniu roli ARIA
- Wzorce takie jak wyłączny akordeon bywają krytykowane jako nieprzyjazne dla użytkownika niezależnie od poprawności technicznej implementacji ARIA

**Why do I care:** Dla architekta frontendu to solidne przypomnienie, że dostępność zaczyna się od wyboru właściwego elementu HTML, a nie od doklejania atrybutów ARIA do diva z obsługą kliknięcia, czyli dokładnie tego wzorca, który później okazuje się źródłem większości problemów z klawiaturą i czytnikami ekranu. Zespoły, które inwestują czas w naukę, kiedy details, dialog czy natywny select wystarczą, oszczędzają sobie później kosztownych poprawek po audycie dostępności, a to zarówno kwestia jakości produktu, jak i coraz częściej wymóg prawny w wielu jurysdykcjach.

**Link:** [Use cases for aria-expanded](https://piccalil.li/blog/use-cases-for-aria-expanded/)
