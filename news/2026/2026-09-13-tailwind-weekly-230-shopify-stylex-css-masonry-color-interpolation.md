---
title: "Tailwind Weekly #230: Tailwind Labs wchodzi do Shopify, StyleX pożycza skalę Tailwinda, a masonry w CSS umie się animować"
excerpt: "Adam Wathan ogłasza koniec komercyjnej strony Tailwind Labs na rzecz Shopify, przy pełnym zachowaniu licencji MIT, a społeczność CSS w tym samym tygodniu odkrywa animowany masonry, interpolację kolorów i most między tokenami Tailwinda a StyleX."
publishedAt: "2026-09-13"
slug: "tailwind-weekly-230-shopify-stylex-css-masonry-color-interpolation"
hashtags: "#tailwindweekly #tailwindcss #css #stylex #shadcn #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Tailwind Labs dołącza do Shopify, framework zostaje na MIT

**TLDR:** Adam Wathan ogłosił, że Tailwind Labs dołącza do Shopify, żeby dać frameworkowi stabilny, długoterminowy dom. Tailwind CSS i pozostałe projekty open source zostają na licencji MIT bez zmian, zamyka się za to rejestracja nowych klientów do Tailwind Plus i ui.sh.

**Summary:** Wathan zaczyna od liczby, która sama w sobie robi wrażenie: dziewięć lat po starcie framework jest instalowany ponad 110 milionów razy tygodniowo i stoi za interfejsami ChatGPT, X, Cloudflare, Reddita i samego Shopify. Powodem połączenia nie jest jednak skala instalacji, tylko coś odwrotnego, chęć rozwijania Tailwinda w kontekście realnego produktu, z prawdziwymi ograniczeniami, zamiast dalszego utrzymywania biznesu szablonów i kursów wokół frameworka. Shopify było zresztą jedną z pierwszych dużych firm, która postawiła na Tailwinda na poważnie, i to na tyle wcześnie, że Wathan opisuje go dziś jako element load-bearing w ich stacku.

Najważniejsza deklaracja dla użytkowników frameworka brzmi krótko: nic się nie zmienia w samym Tailwind CSS ani w innych projektach open source, zespół dalej je prowadzi, a licencja MIT zostaje bez wyjątków. Zmienia się za to strona komercyjna. Tailwind Labs przestaje szukać nowych klientów na Tailwind Plus i ui.sh, obecni klienci zachowują dostęp do tego, co już kupili, ale rejestracja się zamyka. To dość rzadki przypadek, w którym firma rezygnuje z rozwijania płatnego produktu w momencie, gdy framework, na którym ten produkt stoi, jest u szczytu popularności.

**Key takeaways:**
- Tailwind CSS i pozostałe projekty open source zostają na MIT, zespół Tailwind Labs dalej je prowadzi, teraz z zapleczem Shopify.
- Rejestracja nowych klientów do Tailwind Plus i ui.sh się zamyka, istniejący klienci zachowują dostęp.
- Shopify było jedną z pierwszych dużych firm stawiających na Tailwinda na poważnie, framework instalowany jest ponad 110 milionów razy tygodniowo.

**Why do I care:** Dla zespołów, które oparły swój design system na Tailwindzie, to raczej dobra wiadomość niż powód do niepokoju, bo licencja i kierunek rozwoju open source zostają nietknięte, a stabilne finansowe zaplecze w postaci Shopify to więcej gwarancji długoterminowego utrzymania niż samodzielny biznes szablonów. Warto natomiast sprawdzić, czy wasza firma nie planowała dopiero wykupić Tailwind Plus, bo okno na nowe rejestracje się zamyka.

**Link:** [Tailwind Labs is joining Shopify](https://tailwindcss.com/blog/tailwind-is-joining-shopify)

## Animowany masonry w czystym CSS, bez JavaScriptu i bez floatów

**TLDR:** Chris Coyier pokazuje, jak odtworzyć efekt animacji znany z biblioteki Masonry.js, gdzie elementy płynnie przemieszczają się w nowe pozycje przy zmianie liczby kolumn, ale w oparciu o natywny CSS grid i anchor positioning zamiast JavaScriptu i floatów.

**Summary:** Punktem wyjścia jest `display: grid-lanes`, nowa właściwość odtwarzająca układ typu masonry (już w Safari, za flagą w Chrome i Firefoksie), znana ze starszej biblioteki Masonry.js Davida DeSandro. Ta biblioteka, obok Packery i Isotope, budowała ten sam, charakterystyczny, poszarpany układ kafelków przez floaty i JavaScript, ale miała jedną sztuczkę, której grid do tej pory nie miał: kiedy liczba elementów mieszczących się w rzędzie się zmieniała, całość animowała się do nowego układu zamiast po prostu przeskakiwać.

Demo od Bramusa, które zainspirowało ten tekst, odtwarza dokładnie ten efekt, ale na prawdziwym gridzie, korzystając z `repeat(auto-fill, ...)`. Sztuczka nie polega na animowaniu samych elementów gridu, tylko dziecka wewnątrz komórki, ustawionego tak, żeby pokrywało całą komórkę przez anchor positioning i wartość `inset: anchor(inside)`. Intuicyjnie `inset: 0` nie powinno mieć czego animować, bo wynik jest przecież ten sam, a mimo to `anchor(inside)` okazuje się na tyle dynamiczne, że przejście faktycznie się animuje, mimo że efekt końcowy wygląda identycznie jak zwykłe pokrycie komórki.

**Key takeaways:**
- `display: grid-lanes` to natywna wersja układu masonry, już w Safari, za flagą w Chrome i Firefoksie.
- Animacja przenoszenia elementów przy zmianie liczby kolumn działa przez dziecko komórki z `position-anchor` i `inset: anchor(inside)`, nie przez animowanie samego elementu gridu.
- Podejście zastępuje JavaScript i floaty ze starych bibliotek (Masonry.js, Packery, Isotope) czystym CSS.

**Why do I care:** To dobry przykład tego, jak anchor positioning otwiera drzwi do efektów, które wcześniej wymagały biblioteki i sporo JavaScriptu liczącego pozycje ręcznie. Warto to mieć na radarze, jeśli w projekcie wciąż siedzi stara zależność od Masonry.js czy Isotope tylko dla tego jednego efektu animacji przy zmianie liczby kolumn.

**Link:** [Masonry (with Animation) in CSS](https://blog.master.dev/masonry-with-animation-in-css/)

## Interpolacja kolorów w CSS, czyli dlaczego kierunek liczenia odcienia ma znaczenie

**TLDR:** Przewodnik po interpolacji kolorów w CSS tłumaczy, jak `color-mix()`, gradienty i animacje liczą kolory pośrednie między dwoma punktami, oraz czym różnią się cztery metody interpolacji odcienia: `shorter`, `longer`, `increasing` i `decreasing`.

**Summary:** Interpolacja kolorów odpowiada za znacznie więcej niż tylko gradienty, bo ta sama mechanika działa w `color-mix()`, `transition`, `animation` i `filter`. Składnia w rodzaju `color-mix(in oklch longer hue, red, blue)` mówi przeglądarce, w jakiej przestrzeni kolorów i którą trasą po kole barw ma liczyć wynik. Kluczowy podział to przestrzenie prostokątne (sRGB, Lab, XYZ), reprezentujące kolor jako punkt na trzech osiach, i przestrzenie biegunowe (HSL, LCH, OKLCH), gdzie kąt odpowiada za odcień, a sam fakt, że kąt jest cykliczny, otwiera więcej niż jeden sposób przejścia między dwoma barwami.

Autor tłumaczy to na przykładzie zegara: przejście od czerwieni (0 stopni) do błękitu (240 stopni) można policzyć krótszą drogą (120 stopni) albo dłuższą (240 stopni), stąd `shorter` i `longer`. `increasing` i `decreasing` wymuszają stały kierunek, zawsze zgodnie albo zawsze przeciwnie do ruchu wskazówek zegara, niezależnie od tego, która droga jest krótsza, co bywa przydatne, kiedy zależy nam na przewidywalnym, jednokierunkowym przejściu, na przykład w animowanym pasku ładowania przechodzącym przez całe spektrum barw.

W praktyce różnica widać najlepiej w `conic-gradient()` i animacjach `@keyframes` między dwoma kolorami zapisanymi w `oklch()`, gdzie zmiana metody interpolacji z domyślnej `shorter` na `longer` daje zupełnie inną, często bardziej nasyconą trasę przez koło barw, mimo że punkt startowy i końcowy się nie zmieniają.

**Key takeaways:**
- `color-mix()`, gradienty, `transition` i `animation` współdzielą ten sam mechanizm interpolacji kolorów.
- Przestrzenie biegunowe (HSL, LCH, OKLCH) mają cykliczny kąt odcienia, co daje więcej niż jedną trasę między dwoma kolorami.
- Cztery metody interpolacji odcienia to `shorter`, `longer`, `increasing` i `decreasing`, każda daje inny wynik dla tych samych dwóch kolorów.

**Why do I care:** To jeden z tych tematów, które łatwo pominąć, dopóki ktoś nie zapyta, czemu gradient w brandowych kolorach firmy przechodzi przez brzydki, szary odcień w połowie drogi. Odpowiedź zwykle leży właśnie w domyślnej metodzie interpolacji, a zmiana jednego słowa w `color-mix()` czy gradiencie potrafi naprawić problem bez dotykania samych wartości kolorów.

**Link:** [What You Need to Know About CSS Color Interpolation](https://css-tricks.com/what-you-need-to-know-about-css-color-interpolation/)

## tailwind-stylex: skala designu Tailwinda jako typowane stałe StyleX

**TLDR:** Aiden Bai wypuścił tailwind-stylex, pakiet eksportujący domyślne tokeny designu Tailwinda (kolory, spacing, promienie, typografię) jako typowane stałe gotowe do użycia bezpośrednio w `stylex.create`, bez własnej konfiguracji ani generowania.

**Summary:** Pakiet instaluje się razem z `@stylexjs/stylex`, a jedyna dodatkowa robota to wskazanie kompilatorowi StyleX, że ma przetwarzać `tailwind-stylex` jako zależność zewnętrzną, przez `externalPackages` w przypadku unplugin albo dopisanie ścieżki do tokenów w liście `include` przy wtyczce PostCSS. Potem importuje się gotowe stałe, `colors.stone100`, `radii.lg`, `spacing[4]`, i używa ich wprost, z pełnym typowaniem i podpowiadaniem w edytorze. Nazwy numeryczne, jak `fontSizes["2xl"]` czy `containers["7xl"]`, wymagają zapisu w nawiasie kwadratowym, co jest drobnym, ale zauważalnym detalem składniowym różniącym się od kropkowej notacji reszty tokenów.

Pakiet nie próbuje być niczym więcej niż mostem między dwoma systemami: dostajesz kolory, spacing, breakpointy, media queries, kontenery, proporcje, typografię, promienie, cienie, rozmycia i tokeny ruchu (easing, animacje, perspektywy), wszystko z licencją MIT i bez żadnego własnego runtime.

**Key takeaways:**
- tailwind-stylex eksportuje pełną domyślną skalę designu Tailwinda jako typowane stałe StyleX, gotowe do importu.
- Nazwy numeryczne w tokenach (np. `2xl`, `7xl`) wymagają zapisu w nawiasie kwadratowym, reszta korzysta ze zwykłej notacji kropkowej.
- Konfiguracja sprowadza się do jednej linii w `externalPackages` (unplugin) albo dopisania ścieżki tokenów do `include` (PostCSS plugin).

**Why do I care:** Zespoły, które rozważają albo już przechodzą z Tailwinda na StyleX z powodów wydajnościowych czy architektonicznych, zwykle najwięcej czasu tracą właśnie na odtwarzanie skali kolorów i odstępów w nowym narzędziu. tailwind-stylex usuwa dokładnie ten krok, więc warto go sprawdzić, zanim ktoś w zespole zacznie ręcznie przepisywać `theme.colors` z configu Tailwinda do osobnego pliku ze stałymi StyleX.

**Link:** [tailwind-stylex](https://github.com/aidenybai/tailwind-stylex)

## Kolejna fala bibliotek komponentów w stylu "kopiuj-wklej"

**TLDR:** Numer linkuje pięć stron z gotowymi komponentami UI w modelu spopularyzowanym przez shadcn/ui: Spectrum UI, kolekcję komponentów Chánh Đại, beUI, blocks.so oraz nowy zestaw OIDC UI od shadcn do budowania interfejsów konfiguracji OIDC.

**Summary:** Wspólnym mianownikiem tej piątki jest dystrybucja przez kopiowanie kodu do własnego repozytorium zamiast instalacji pakietu npm, dokładnie ten sam model, który shadcn/ui uczynił standardem w ostatnich dwóch latach. Spectrum UI i beUI stawiają na animowane komponenty i bloki dla Reacta i Next.js, blocks.so oferuje gotowe sekcje strony (hero, cennik, stopki) do składania w całe layouty, a kolekcja Chánh Đại to zbiór pojedynczych, dopracowanych komponentów. OIDC UI wyróżnia się węższym zakresem, bo skupia się wyłącznie na budowaniu interfejsów konfiguracji OpenID Connect, czyli formularzy i ekranów, które większość zespołów woli sklecić raz i nigdy więcej do nich nie wracać.

Rynek komponentów kopiuj-wklej robi się z każdym miesiącem gęstszy, a każda z tych bibliotek próbuje wygrać inną kombinacją zakresu i estetyki, nie fundamentalnie inną propozycją wartości. Ten model dystrybucji ma znany kompromis: wklejony kod przestaje dostawać aktualizacje z góry, więc poprawka dostępności czy bezpieczeństwa w oryginalnej bibliotece nie trafi automatycznie do komponentu, który od miesięcy żyje w czyimś repozytorium.

**Key takeaways:**
- Pięć nowych bibliotek komponentów UI w modelu kopiuj-wklej: Spectrum UI, Chánh Đại, beUI, blocks.so i OIDC UI od shadcn.
- OIDC UI wyróżnia się węższym zakresem, komponentami do budowania konfiguracji OpenID Connect, nie ogólnym zestawem UI.
- Model dystrybucji kopiuj-wklej oznacza brak automatycznych aktualizacji, poprawki z oryginalnej biblioteki trzeba nanosić ręcznie.

**Why do I care:** Zanim ktoś w zespole wklei komponent z którejś z tych stron, warto zapytać, kto za rok będzie pilnował aktualizacji, gdy oryginalna biblioteka wypuści poprawkę dostępności, której nikt już nie zobaczy, bo kod dawno żyje własnym życiem w projekcie. Dla prototypu to nieistotne, dla aplikacji produkcyjnej o dłuższym cyklu życia to dług techniczny odłożony na później.

**Link:** [Spectrum UI](https://ui.spectrumhq.in/) · [Components – Chánh Đại](https://chanhdai.com/components) · [beUI](https://beui.dev/) · [blocks.so](https://blocks.so/) · [OIDC UI](https://ui.shadcn.com/oidc)
