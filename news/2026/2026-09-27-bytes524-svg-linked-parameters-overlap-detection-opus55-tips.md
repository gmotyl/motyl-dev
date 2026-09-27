---
title: "Bytes #524: parametry CSS sterujące plikami SVG, wykrywanie kolizji elementów i ściągawka do Opus 5.5"
excerpt: "Bytes #524 pokazuje eksperymentalny mechanizm CSS Linked Parameters do stylowania SVG użytego jako obrazek, sposób na wykrycie nakładania się elementów samym CSS oraz oficjalny przewodnik po pracy z Opus 5.5."
publishedAt: "2026-09-25"
slug: "bytes524-svg-linked-parameters-overlap-detection-opus55-tips"
hashtags: "#uidev #css #frontend #ai #agents #architecture #generated #pl"
source_pattern: "ui.dev"
---

## Jeden plik SVG, dziewięć plakatów: CSS uczy się mówić do obrazków

**TLDR:** Firefox Nightly jako pierwsza przeglądarka eksperymentalnie wdraża CSS Linked Parameters, nową specyfikację pozwalającą przekazywać wartości CSS do pliku SVG użytego jako `<img>` albo tło. Vadim Makeev demonstruje to na przykładzie dziewięciu kolorowych wersji tego samego portretu Marilyn Monroe wygenerowanych z jednego pliku SVG.

**Summary:** Problem, który rozwiązuje ta specyfikacja, jest stary jak sam SVG w przeglądarce. Inline'owany `<svg>` da się pokolorować z poziomu strony przez `currentColor` i dziedziczone właściwości, ale ten sam plik użyty jako `<img>` albo tło staje się osobnym dokumentem, do którego CSS strony nie sięga. Firefox miał na to własny, niestandardowy hak, `-moz-context-properties`, ale nigdy nie trafił do specyfikacji ani do innych przeglądarek.

CSS Linked Parameters działa w dwie strony. Wewnątrz pliku SVG, w miejscu gdzie normalnie wpisałoby się kolor, pojawia się funkcja `env()` z nazwą parametru i wartością domyślną. Na stronie, w regule dla elementu, który ładuje ten plik, ustawia się wartość przez nową właściwość `link-parameters` i funkcję `param()`. Ten sam kształt co para `var()` i custom property, tylko przechodzący przez granicę dokumentu.

Najciekawszy jest przykład z plakatem: cztery ścieżki SVG odpowiadające czterem płytom sitodruku, każda z kolorem podanym jako osobny parametr. Ten sam plik, załadowany dziewięć razy z dziewięcioma różnymi zestawami parametrów, daje dziewięć różnych kolorystyk jednego portretu, a przeglądarka może przy tym współdzielić ten sam dokument w pamięci zamiast pobierać dziewięć osobnych plików. Progresywne wzmacnianie wychodzi tu praktycznie za darmo: skoro każdy `env()` ma wartość domyślną, przeglądarka bez wsparcia po prostu renderuje SVG w kolorach, które ktoś wybrał na etapie eksportu pliku.

Autor od razu studzi entuzjazm. Jedno silnikowe wsparcie, jeden kanał testowy, i to niepełne: przekazywanie parametru przez modyfikator w `url()` albo przez fragment adresu jeszcze nie działa, `<object>` i `<use>` w ogóle nie dostają parametrów. To narzędzie do zabawy, nie do wdrożenia w produkcji w najbliższych miesiącach.

**Key takeaways:**
- CSS Linked Parameters pozwala stylować SVG użyty jako `<img>` lub tło, czego nie dawał dotąd `currentColor`.
- SVG deklaruje `env(--nazwa, wartość-domyślna)`, a strona podaje wartość przez `link-parameters: param(--nazwa, wartość)`.
- Ten sam plik referencji może zostać załadowany wielokrotnie z różnymi parametrami, a przeglądarka może współdzielić jeden dokument w pamięci.
- Wsparcie ogranicza się na razie do Firefox Nightly i eksperymentalnej flagi w Safari Technology Preview.

**Why do I care:** Dziś systemy ikon i ilustracji rozwiązują ten sam problem brutalnie: albo trzymamy osobny plik na każdy wariant kolorystyczny, albo inline'ujemy SVG w każdym miejscu użycia, co psuje cache. Linked Parameters obiecuje trzeci wariant, jeden plik jako szablon, kolory dobierane przez CSS w miejscu użycia, bez inline'owania. To jeszcze nie coś, co warto wpisać do design systemu w tym kwartale, ale warto mieć to na radarze, bo rozwiązuje realny problem, a nie kolejną wygodę składniową.

**Link:** [One SVG, nine posters: CSS linked parameters — Vadim Makeev](https://pepelsbey.dev/articles/svg-link-params/)

## Wykrywanie kolizji elementów samym CSS, bez JavaScriptu

**TLDR:** Ahmad Shadeed rozwiązuje pozornie niemożliwy problem: jak w czystym CSS wykryć, że dekoracyjny element zaczyna nachodzić na sąsiednią sekcję, i schować go dokładnie w tym momencie. Łączy anchor positioning, scroll-driven animations i `timeline-scope` w jeden mechanizm, który nie potrzebuje ani linijki JavaScriptu.

**Summary:** Punktem wyjścia jest layout, w którym dekoracyjny element ma płynną pozycję albo rozmiar zależny od viewportu, a obok niego stoi sekcja z treścią. Zadanie brzmi: zmierz odległość między nimi i schowaj dekorację, gdy spadnie poniżej progu. To zadanie dynamiczne, nie coś, co da się zamknąć w media query.

Pierwszy krok to anchor positioning: element pomiarowy przypięty jednym brzegiem do dekoracji, a drugim do sekcji, więc jego szerokość zawsze odpowiada aktualnej przestrzeni między nimi. Drugi krok to trik z przepełnieniem: wewnątrz elementu pomiarowego siedzi pseudo-element o stałej szerokości, a sam element ma `overflow-x: auto`. Gdy przestrzeń robi się mniejsza niż ta stała szerokość, element pomiarowy zaczyna się przepełniać i staje się przewijalny, co jest sygnałem wykrywalnym przez CSS.

Tu wchodzi `timeline-scope`. Scroll-driven animations normalnie łączą element wywołujący przewijanie z elementem animowanym w obrębie tego samego rodzica, ale `timeline-scope` pozwala podnieść tę oś przewijania wyżej w drzewie, żeby dowolny element w kontenerze mógł się do niej podpiąć. Zamiast animować coś wizualnie, Shadeed używa tego mechanizmu do przełączenia jednej zmiennej CSS z `0` na `1` w momencie przepełnienia, z animacją trwającą jedną milisekundę, więc w praktyce to przełącznik, nie animacja.

Ostatni element układanki to style container queries: sekcja z dekoracją nasłuchuje wartości tej zmiennej i, gdy wynosi `1`, ustawia `opacity: 0` na dekoracyjnym elemencie. Całość działa wyłącznie w przeglądarkach wspierających jednocześnie anchor positioning i scroll-driven animations, więc to rozwiązanie progresywne, nie coś do polegania na nim jako jedynej ścieżki.

**Key takeaways:**
- Anchor positioning tworzy niewidoczny element mierzący odległość między dwoma innymi elementami na stronie.
- Pseudo-element o stałej szerokości wewnątrz elementu pomiarowego zaczyna go przepełniać, gdy przestrzeń robi się zbyt mała.
- `timeline-scope` podnosi zasięg osi przewijania wyżej w drzewie DOM, więc dowolny element w kontenerze może reagować na przepełnienie.
- Style container queries reagują na zmianę zmiennej CSS i chowają dekoracyjny element w momencie kolizji.

**Why do I care:** To dokładnie ten rodzaj problemu, który jeszcze rok temu kończył się w komentarzu code review słowami "to trzeba zrobić w JS-ie". Łańcuch anchor positioning plus scroll-driven animations plus container queries jest długi i eksperymentalny, ale pokazuje kierunek: coraz więcej logiki layoutu, która kiedyś wymagała ResizeObserver i słuchacza scrolla, da się wyrazić deklaratywnie. Warto trzymać to jako wzorzec do naśladowania przy okazji, a nie coś do wdrożenia jutro w produkcyjnym kodzie bez fallbacku.

**Link:** [Detect when elements overlap with CSS](https://ishadeed.com/article/css-detect-overlap/)

## Ściągawka do Opus 5.5: mniej próśb o myślenie, więcej jasnych kryteriów końca zadania

**TLDR:** Anthropic opublikował przewodnik po pracy z Opus 5.5 w Claude i Claude Code, skupiony na tym, co realnie zmieniło się względem Opus 5: model sam decyduje, jak długo myśleć nad odpowiedzią, dłużej pracuje bez nadzoru i jaśniej raportuje, co po drodze zrobił.

**Summary:** Pierwsza rada brzmi niepozornie, ale zmienia sposób pisania promptów: zamiast dzielić zadanie na malutkie kroki, warto podać całość razem z definicją "zrobione", na przykład "wszystkie testy przechodzą" albo "każdy endpoint korzysta z nowego klienta", i zostawić modelowi decyzję, kiedy się zatrzymać i zapytać. Opus 5.5 lepiej niż poprzednik trzyma się długich, wieloetapowych zadań, więc jasny cel działa jak warunek zakończenia pętli, nie jak dodatkowa uprzejmość.

Druga rada to usunięcie z promptów i z plików CLAUDE.md fraz w rodzaju "pomyśl dokładnie" albo "przemyśl to krok po kroku". Opus 5.5 zawsze myśli przed odpowiedzią i sam reguluje, ile tego myślenia potrzebuje na dany problem, więc taka instrukcja tylko wydłuża czas do pierwszej odpowiedzi bez wpływu na jakość.

Dla pracy w Claude Code przewodnik zaleca zapisanie w CLAUDE.md konkretnej reguły, kiedy agent ma się zatrzymać i zapytać, a kiedy ma kontynuować bez przerywania: na przykład stop tylko przed czymś nieodwracalnym, jak force-push albo kasowanie danych, a poza tym niech pracuje dalej i dopisuje status do tej samej wiadomości co kolejny krok. Przy dużych audytach albo migracjach dobrze sprawdza się prośba o rozdzielenie pracy między subagentów, z których każdy dostaje osobny fragment kodu, a wynik każdego trzeba zweryfikować, zanim trafi do zbiorczego podsumowania.

Osobny wątek dotyczy sprawdzania rezultatu: gdy długi przebieg się kończy, warto najpierw przeczytać, na co model czeka, a dopiero potem resztę podsumowania, oraz poprosić Opus 5.5 o przegląd diffa przed człowiekiem, bo według wczesnych testerów model na najniższym poziomie wysiłku łapie więcej błędów niż Opus 5 na najwyższym, przy mniejszej liczbie fałszywych alarmów.

**Key takeaways:**
- Formułuj całe zadanie razem z definicją "zrobione" zamiast rozbijać je na malutkie kroki, bo Opus 5.5 lepiej trzyma się długich, wieloetapowych prac.
- Usuń z promptów i z CLAUDE.md instrukcje w stylu "pomyśl dokładnie", bo Opus 5.5 zawsze myśli przed odpowiedzią i sam reguluje ile.
- Zapisz w CLAUDE.md regułę, kiedy agent ma się zatrzymać i zapytać, a kiedy kontynuować bez przerywania pracy.
- Przy dużych audytach i migracjach warto rozdzielić pracę między subagentów i zweryfikować wynik każdego z osobna, zanim trafi do podsumowania.

**Why do I care:** Część tych rad to nic innego jak dobre praktyki code review przeniesione na pracę z agentem: jasne kryterium ukończenia, jawna reguła kiedy eskalować, weryfikacja dowodu zamiast wiary na słowo. Zespoły, które już mają w repo plik CLAUDE.md, powinny go zaktualizować pod te konkretne wskazówki, bo różnica między "action-oriented" a "chatty" agentem często sprowadza się właśnie do tego, czy ktoś w ogóle napisał, kiedy ma się zatrzymać.

**Link:** [Getting the most out of Opus 5.5 in Claude and Claude Code](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/)
