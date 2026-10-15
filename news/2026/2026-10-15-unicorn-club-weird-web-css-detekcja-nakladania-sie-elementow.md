---
title: "Unicorn Club: dziwny web i wykrywanie nakładających się elementów samym CSS"
excerpt: "Eksperymenty Weird Web October oraz sztuczka Ishadeeda, która łączy anchor positioning, scroll-timeline i style queries, by ukryć element przy kolizji."
publishedAt: "2026-10-15"
slug: "unicorn-club-weird-web-css-detekcja-nakladania-sie-elementow"
hashtags: "#unicornclub #css #frontend #animation #webdev #generated #pl"
source_pattern: "Unicorn Club"
---

## Wykrywanie kolizji elementów w czystym CSS

**TLDR:** Ahmad Shadeed pokazuje, jak ukryć dekoracyjny element, gdy zbliża się do sekcji, bez JavaScriptu. Używa anchor positioning, scroll-timeline z timeline-scope i style container queries.

**Summary:** Problem wygląda prosto: dekoracja ma zniknąć, gdy jej prawa krawędź dotknie lewej krawędzi sekcji, a pozycja i rozmiar są płynne. Media query tu nie pomoże, bo nie wiemy, przy jakiej szerokości dojdzie do kolizji.

Rozwiązanie ma trzy kroki. Najpierw anchor positioning tworzy pomocniczy element "pomiarowy", rozpięty między prawą krawędzią dekoracji a lewą krawędzią sekcji, więc jego szerokość to dokładnie wolne miejsce. Potem do tego elementu trafia pseudoelement o stałej szerokości dwudziestu pikseli, a sam element dostaje przewijanie w poziomie. Gdy wolnego miejsca jest mniej niż dwadzieścia pikseli, element się przepełnia. Na końcu timeline-scope pozwala nasłuchiwać tego przepełnienia na poziomie body. Animacja trwa 1 ms, ma te same wartości na początku i na końcu i jedynie przełącza zmienną CSS. Style query na tej zmiennej zmienia przezroczystość dekoracji.

Autor przyznaje, że działa to tylko w przeglądarkach z obsługą scroll-driven animations i anchor positioning, więc traktuje to jako ulepszenie progresywne.

**Key takeaways:**
- Przepełnienie przewijanego kontenera służy jako detektor miejsca.
- timeline-scope przenosi sygnał do dowolnego elementu w sekcji.
- Zmienna przełączana "animacją" zasila style container query.

**Why do I care:** To sprytny, ale kruchy hack. Dobrze, że działa bez JS, lecz kod trudno będzie zrozumieć komuś, kto nie zna tych trzech funkcji. Użyłbym go dla czysto dekoracyjnych elementów, których brak niczego nie psuje.

**Link:** [Detect when elements overlap with CSS](https://ishadeed.com/article/css-detect-overlap/)

## Weird Web October 2026

**TLDR:** Potch codziennie publikuje mały, dziwny eksperyment w canvasie. Tematy to m.in. odsłanianie pikseli, race iskier i drzewa z L-systemów.

**Summary:** Seria zaczęła się od dnia "Reveal", gdzie piksele obrazu startują w losowych miejscach i suwakiem wędrują po krzywej Béziera na właściwe pozycje. Dalej są iskierki rysowane na płótnie, "fałszerstwa" obrazów malowane pociągnięciami wg krawędzi (autor liczy histogram gradientów), plastikowe karty z odbiciami, ręcznie kodowane SVG i jesienne drzewa generowane L-systemami. To zabawa formą, nie artykuł techniczny.

**Key takeaways:**
- Małe codzienne eksperymenty trenują warsztat bez presji produktu.
- Canvas, SVG i proste algorytmy wystarczą na efektowne zabawki.

**Why do I care:** Dla seniora wartość jest głównie inspiracyjna. Warto jednak pamiętać, że takie eksperymenty często odkrywają przypadki brzegowe API, które później przydają się w produkcji.

**Link:** [Weird Web October 2026](https://potch.me/2026/weird-web-october.html)
