---
title: "Tailwind Weekly #237: tooltipy w samym CSS, JPEG XL kontra AVIF i animowane komponenty dla shadcn"
excerpt: "CSS przejmuje pozycjonowanie tooltipów, Jake Archibald porównuje JPEG XL z AVIF na dzisiejszych enkoderach, a Eased dorzuca 70 darmowych animowanych komponentów do shadcn."
publishedAt: "2026-11-01"
slug: "tailwind-weekly-237-tooltipy-css-jpeg-xl-avif-eased"
hashtags: "#tailwindweekly #tailwindcss #css #performance #accessibility #animation #shadcn #react #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Tooltipy bez JavaScriptu: anchor positioning w praktyce

**TLDR:** Matt Smith pokazuje, jak anchor-name, position-area i position-try-fallbacks zastępują ręczne wyliczanie pozycji tooltipów w JavaScripcie. Z popoverem da się w ten sposób zbudować całe menu rozwijane, ale dostępność nadal wymaga osobnej uwagi.

**Summary:** Prawie każdy, kto budował tooltip, napisał kiedyś ten sam kod: pobranie prostokąta elementu wyzwalającego, ustawienie górnej i lewej współrzędnej, a potem łatanie wszystkiego, co się psuje przy przewijaniu, zmianie rozmiaru okna i przy krawędzi viewportu. Autor pokazuje, że przeglądarka robi to teraz sama. Wystarczy nadać elementowi nazwę kotwicy, a drugiemu elementowi, który ma za nim podążać, wskazać tę kotwicę i opisać miejsce słowami, na przykład "pod". Przeglądarka przelicza pozycję przy każdym przewinięciu i zmianie rozmiaru.

Najciekawsza jest część o zapasowych pozycjach. Gdy notka przy dolnej krawędzi strony wychodziłaby poza ekran, przeglądarka sama próbuje odwrócić ją na drugą stronę. Dochodzi do tego natywny popover, który daje renderowanie w warstwie wierzchniej i zamykanie po kliknięciu obok, oraz funkcja, która odczytuje szerokość kotwicy, więc rozwijane menu ma dokładnie szerokość przycisku. Razem to menu bez jednej linii JavaScriptu.

Autor uczciwie opisuje też pułapki. Nazwa kotwicy musi być unikalna dla każdej pary kotwica-cel, więc w siatce kart trzeba ją generować per instancja, bo inaczej wszystkie tooltipy przypną się do ostatniej zarejestrowanej karty. Pozycjonowanie rozwiązuje pytanie "gdzie", a nie "kiedy", więc o widoczności nadal decyduje :has(), popover albo odrobina skryptu. Safari i Chrome różnią się w przypadkach brzegowych, a domyślny margines popovera potrafi psuć pozycjonowanie, dopóki go nie wyzerujesz.

**Key takeaways:**
- Anchor positioning usuwa potrzebę liczenia pozycji w JavaScripcie, łącznie z odwracaniem przy krawędzi ekranu.
- Nazwę kotwicy trzeba generować osobno dla każdego komponentu w liście.
- Relacja kotwicy jest czysto wizualna i nie zastępuje aria-describedby.

**Why do I care:** Dla mnie to koniec jednej z tych bibliotek, które wciągamy do projektu tylko dlatego, że pozycjonowanie tooltipów było bolesne. W komponentach design systemu można to już wycinać, zostawiając fallback przez @supports dla starszych przeglądarek. Autor nie dotyka tylko jednego: jak to się zachowuje w czytnikach ekranu, gdy notka siedzi gdzie indziej w DOM. Tego nie rozwiąże żadna właściwość CSS, więc nie traktowałbym tego jako gotowego rozwiązania dostępności.

**Link:** [CSS does your tooltip positioning now - Matt Smith](https://allthingssmitty.com/2026/10/05/css-does-your-tooltip-positioning-now/)

## JPEG XL kontra AVIF na dzisiejszych enkoderach

**TLDR:** JPEG XL działa już we wszystkich głównych przeglądarkach, więc Jake Archibald zmierzył go z AVIF. Dla zdjęć, zrzutów ekranu i przezroczystości AVIF zwykle daje mniejsze pliki, a JPEG XL wygrywa głównie przy bezstratnej kompresji i ponownym pakowaniu istniejących JPEG-ów.

**Summary:** Dla zdjęć stratnych najlepsza wersja JPEG XL jest zazwyczaj o 15 do 25 procent większa niż odpowiadający jej AVIF przy domyślnym wysiłku enkodera, a przy maksymalnym różnica spada do 6 do 20 procent. Są wyjątki, więc przy obrazie, na którym naprawdę zależy ci na bajtach, warto spróbować obu. Przy zrzutach ekranu i ilustracjach różnica rośnie do 30 do 90 procent na korzyść AVIF, a przy obrazach z przezroczystością libjxl daje pliki większe o 31 do 44 procent.

Ważny wątek to wybór enkodera. Nowszy jixel zwykle produkuje mniejsze pliki niż libjxl, ale autor pokazuje przypadki, w których wygląda na to, że oszukuje metrykę i wizualnie wypada gorzej. Przezroczystość jixel koduje zawsze bezstratnie, więc pliki są dwa do trzech razy większe niż w AVIF. Wyższy wysiłek opłaca się w AVIF i jixel, ale nie w libjxl, który robi się dużo wolniejszy i prawie nic nie zyskuje.

JPEG XL ma swoje miejsca. Może odchudzić istniejące JPEG-i o 9 do 20 procent bez dalszej straty, jest zdecydowanym zwycięzcą w kompresji bezstratnej, a postępujące ładowanie jest przy wysokim wysiłku praktycznie darmowe. Brakuje mu map gain dla HDR w dekoderach przeglądarek. Autor sam domyślnie wybrałby AVIF 4:4:4 z możliwie wysokim wysiłkiem i dodaje, że AI chętnie dostarcza dezinformację na ten temat, więc warto testować na własnych obrazach.

**Key takeaways:**
- Do zdjęć, zrzutów i przezroczystości domyślnie AVIF, a JPEG XL tylko jako eksperyment.
- JPEG XL ma sens przy bezstratnej kompresji i bezstratnym odchudzaniu starych JPEG-ów.
- Wynik zależy od enkodera, więc nie ufaj jednej metryce.

**Why do I care:** Jeśli odpowiadasz za pipeline obrazów, ten tekst oszczędza ci tygodnia pytań w stylu "czy dodać JPEG XL". Odpowiedź na dziś brzmi: nie zamiast AVIF, tylko ewentualnie obok, po sprawdzeniu na własnym materiale. Autor mierzył na jednym MacBooku i na wybranym zestawie obrazów, więc liczby traktuję jako kierunek, a nie gwarancję. W moich projektach wolałbym zrobić własny test na realnych zdjęciach produktowych.

**Link:** [JPEG XL vs AVIF for web use-cases](https://jakearchibald.com/2026/jpeg-xl-vs-avif/)

## tailwind-variants 4.0 i nowości wokół shadcn

**TLDR:** tailwind-variants 4.0 ma własny silnik rozwiązywania konfliktów klas, więc tailwind-merge przestaje być potrzebny. W ekosystemie shadcn pojawiły się też animowane komponenty Eased, w tym darmowa paczka 70 sztuk na licencji MIT.

**Summary:** Nowa wersja tailwind-variants dostarcza własny silnik konfliktów klas, na którym działają tv, cn i twMerge. Eksportuje też zamienniki twMerge, twJoin i clsx, więc można zaaliasować oba pakiety do jednego. Autorzy deklarują, że gorące wywołania tv są 1,6 do 2 razy szybsze niż w wersji 3.3.1, a cn nawet do trzech razy. To są ich własne pomiary, bez opisanej metodyki w newsletterze.

Eased to biblioteka animowanych komponentów React dla shadcn, zbudowana na Tailwind CSS v4 i Motion. Komponenty instaluje się przez rejestr shadcn CLI, więc kod ląduje w projekcie. Każdy uwzględnia ograniczenie ruchu i tryb jasny oraz ciemny. Jest też serwer MCP dla narzędzi agentowych, a wersja Pro dodaje 34 bloki za jednorazowe 149 dolarów. Shadcn CLI 4.23 przesiadło się na MCP TypeScript SDK v2, co wymaga zmiany setRequestHandler na registerTool u tych, którzy osadzają shadcn/mcp.

**Key takeaways:**
- Aktualizacja do tailwind-variants 4.0 może pozwolić usunąć tailwind-merge z zależności.
- Animowane komponenty dla shadcn dostarczają kod do projektu, a nie czarną skrzynkę.
- Zmiana w shadcn mcp to breaking change dla osadzających.

**Why do I care:** Zamiana tailwind-merge na własny silnik to realna oszczędność w zależnościach w każdym projekcie z cn(). Zanim zmigrujesz, zmierz to na własnym kodzie, bo deklaracje o szybkości pochodzą od autorów. Biblioteki animacji biorę ostrożnie: dopóki nie widzę, jak radzą sobie z ograniczeniem ruchu na prawdziwych ekranach, to jest dla mnie pomysł na prototyp, a nie na produkcję.

**Link:** [GitHub - heroui-inc/tailwind-variants](https://github.com/heroui-inc/tailwind-variants)
