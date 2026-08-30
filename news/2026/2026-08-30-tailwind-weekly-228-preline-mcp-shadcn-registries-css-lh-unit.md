---
title: "Tailwind Weekly #228: Preline dostaje MCP, shadcn otwiera prywatne rejestry, a CSS ma już swoją nieskończoność"
excerpt: "Preline 5.0 wchodzi z hostowanym serwerem MCP dla agentów kodujących, shadcn CLI otwiera się na prywatne rejestry firmowe, a społeczność CSS odkrywa, co można zrobić z jednostką lh i z calc(infinity * 1px)."
publishedAt: "2026-08-30"
slug: "tailwind-weekly-228-preline-mcp-shadcn-registries-css-lh-unit"
hashtags: "#tailwindweekly #tailwindcss #css #shadcn #frontend #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Preline 5.0 daje agentom kodującym własny serwer MCP

**TLDR:** Preline 5.0 wprowadza hostowany serwer MCP i prompty AI na poziomie pojedynczego bloku, dzięki czemu agent kodujący pobiera prawdziwy markup Preline zamiast zgadywać strukturę komponentu z pamięci.

**Summary:** To, co uderza w tym wydaniu, to nie same nowe komponenty, tylko sposób, w jaki Preline decyduje się je udostępniać. Zamiast liczyć na to, że agent kodujący "pamięta" strukturę konkretnego komponentu z treningu, Preline stawia serwer MCP, przez który agent może realnie odpytać `components_list` i `single_block`, żeby dostać aktualny, prawdziwy markup zamiast halucynacji na temat tego, jak wygląda dropdown w wersji 5.0. To jest dokładnie ten typ integracji, którego spodziewam się coraz częściej od bibliotek komponentów w najbliższym roku, bo różnica między "agent zna dokumentację" a "agent ma dostęp do dokumentacji w czasie rzeczywistym" robi się coraz bardziej widoczna przy każdej większej wersji.

Sam MCP i animowane ikony są zastrzeżone dla wersji Pro, co nie powinno dziwić, ale warto to zanotować, jeśli planujecie oprzeć swój workflow agentowy na darmowej wersji. Wersja open source też nie stoi w miejscu, bo przechodzi na Tailwind v4.3, więc nawet zespoły niekorzystające z MCP dostają realny powód do aktualizacji.

**Key takeaways:**
- Hostowany serwer MCP pozwala agentowi kodującemu pobrać prawdziwy markup komponentu zamiast zgadywać go z pamięci
- MCP i animowane ikony są funkcjami Pro, open source dostaje "tylko" aktualizację do Tailwind v4.3
- Sierpniowe wydanie dorzuca też komponent Questionnaire dla Base UI, React Aria i Radix

**Why do I care:** Jeśli wasz zespół już opiera część workflow na agentach kodujących, warto sprawdzić, czy biblioteki komponentów, których używacie, oferują podobny dostęp na żywo, bo to bezpośrednio przekłada się na to, ile razy dziennie musicie poprawiać wygenerowany markup ręcznie. To też sygnał, że warstwa "dokumentacja dla agenta" zaczyna być osobnym produktem, nie tylko stroną z przykładami dla człowieka.

**Link:** [Preline UI Changelog](https://preline.co/docs/changelog.html)

## Maizzle 6.1.2 śledzi graf importów szablonu, żeby CSS e-maili nie puchł

**TLDR:** Maizzle 6.1.2 zmienia sposób skanowania klas Tailwind tak, żeby podążał za grafem importów każdego szablonu, dzięki czemu nieużywane komponenty przestają wyciekać swoim CSS-em do finalnego e-maila.

**Summary:** To dość niszowa, ale konkretna poprawka dla każdego, kto generuje HTML-owe e-maile z Tailwindem. Wcześniej skanowanie klas działało szerzej niż powinno, więc komponent, którego dany szablon w ogóle nie importował, i tak potrafił dorzucić swoje style do wynikowego pliku, co w świecie e-maili, gdzie każdy kilobajt inline'owanego CSS ma znaczenie, jest realnym problemem, nie kosmetycznym detalem. Teraz Maizzle podąża za faktycznym grafem importów per szablon, więc CSS trafia tylko tam, gdzie komponent jest naprawdę używany.

Dla przypadków, w których struktura importów jest zbyt dynamiczna, żeby Maizzle mógł ją poprawnie prześledzić, zostaje furtka w postaci `css.scopedSources: false`, czyli powrót do starego, szerszego skanowania. Wydanie poprawia też ścieżki na Windowsie i wirtualne moduły Vite, co jest mniej efektowne, ale pewnie ucieszy kogoś, kto od tygodni walczył z buildem na firmowym laptopie z Windows.

**Key takeaways:**
- Skanowanie klas Tailwind teraz podąża za grafem importów szablonu, nie skanuje całego projektu naraz
- Flaga `css.scopedSources: false` zostaje jako wyjście awaryjne dla nietypowych struktur importów
- Poprawki dotyczą też ścieżek na Windowsie i wirtualnych modułów Vite

**Why do I care:** Jeśli generujecie e-maile transakcyjne czy marketingowe z Tailwindem, ta jedna zmiana może realnie zmniejszyć wagę wysyłanych wiadomości bez żadnej zmiany w waszym kodzie, wystarczy aktualizacja. Warto sprawdzić rozmiar wygenerowanego CSS przed i po, bo różnica bywa większa, niż się wydaje na pierwszy rzut oka.

**Link:** [Release v6.1.2 · maizzle/framework](https://github.com/maizzle/framework/releases/tag/v6.1.2)

## shadcn CLI otwiera się na prywatne rejestry firmowe

**TLDR:** shadcn CLI 4.19.0 dodaje wsparcie dla prywatnych rejestrów GitHub, więc firmowy zestaw komponentów można dociągnąć tą samą komendą co publiczne biblioteki, korzystając z istniejącego uwierzytelnienia gh auth login zamiast osobnego tokenu.

**Summary:** To jest zmiana, na którą część zespołów czekała dłużej niż się przyznaje. Do tej pory shadcn CLI świetnie radziło sobie z publicznymi rejestrami komponentów, ale firmowy, wewnętrzny zestaw komponentów trzeba było dociągać innymi metodami. Teraz, jeśli masz dostęp do odczytu repozytorium, `pnpm dlx shadcn@latest add acme/internal-toolkit/auth-kit` po prostu działa, a jeśli jesteś już zalogowany przez `gh auth login`, CLI korzysta z tych samych poświadczeń i nigdy nie widzi twojego tokenu bezpośrednio. Dla pipeline'ów CI zostaje możliwość przekazania `GH_TOKEN` wprost.

Sierpniowe wydanie dorzuca też komponent Questionnaire zgodny z Base UI, React Aria i Radix, co pokazuje, że shadcn coraz mocniej stawia na kompatybilność z wieloma warstwami prymitywów dostępności, nie tylko z jedną.

Równolegle sześć registries w ekosystemie shadcn wypuściło nowe komponenty w tym samym tygodniu: react-bits dorzucił efekty CRTWarp i GlowCursor, ncdai zrobił przycisk statusu do stanów ładowania i sukcesu przy akcjach asynchronicznych, beui dodał Expandable Control, Metallic Button i File Tree, Inspira UI pokazało HTML in Canvas, Zard UI wypuściło Hover Card i Typeset, a lucide-animated dorzucił animowaną ikonę palety.

**Key takeaways:**
- Prywatne rejestry GitHub działają teraz przez `shadcn add` tak samo jak publiczne, z użyciem istniejącego `gh auth login`
- CI może przekazać dostęp przez `GH_TOKEN` bez zmiany reszty configu
- Sześć niezależnych registries (react-bits, ncdai, beui, Inspira UI, Zard UI, lucide-animated) wypuściło nowe komponenty w tym samym tygodniu

**Why do I care:** Wsparcie dla prywatnych rejestrów usuwa jeden z częstszych powodów, dla których zespoły rezygnowały z modelu "kopiuj-wklej komponentu" na rzecz własnego pakietu npm, bo teraz firmowy design system może żyć w prywatnym repo i być dociąganym dokładnie tak samo jak publiczna biblioteka. To dobry moment, żeby sprawdzić, czy wasz wewnętrzny zestaw komponentów nie zyskałby na przejściu na ten format zamiast kolejnego prywatnego pakietu w monorepo.

**Link:** [shadcn/ui Changelog](https://ui.shadcn.com/docs/changelog)

## tailwind-stylex: skala designu Tailwinda jako typowane stałe StyleX

**TLDR:** Aiden Bai wypuścił tailwind-stylex 0.1.1, pakiet eksportujący domyślne tokeny designu Tailwinda jako typowane stałe StyleX, więc zespoły migrujące na StyleX nie muszą wymyślać własnej skali kolorów i odstępów od zera.

**Summary:** To mały, ale konkretny most między dwoma światami, które ostatnio coraz częściej się przecinają. StyleX zyskuje na popularności głównie w większych zespołach React szukających deterministycznego CSS-in-JS liczonego w buildzie, ale brakowało mu gotowej, sensownej skali designu, jaką ma Tailwind od pierwszego dnia. Tailwind-stylex rozwiązuje to wprost: importujesz `colors.stone100`, `radii.lg` czy `spacing[4]` i używasz ich bezpośrednio w `stylex.create`, z pełnym typowaniem. Nazwy numeryczne, jak `fontSizes["2xl"]`, wymagają nawiasu kwadratowego, co jest drobnym, ale zauważalnym detalem składniowym.

Dla zespołów, które przeszły albo planują przejść z Tailwinda na StyleX z powodów wydajnościowych czy architektonicznych (a takich case studies, jak migracja Lineara, było w tym roku sporo), to konkretna oszczędność czasu na etapie, który zwykle jest najbardziej żmudny, czyli odtwarzaniu skali designu w nowym narzędziu.

**Key takeaways:**
- tailwind-stylex eksportuje domyślne tokeny Tailwinda (kolory, spacing, promienie) jako typowane stałe StyleX
- Nazwy numeryczne jak `2xl` wymagają zapisu w nawiasie kwadratowym, np. `fontSizes["2xl"]`
- Przydatne głównie dla zespołów migrujących ze świata klas Tailwinda na StyleX bez utraty istniejącej skali designu

**Why do I care:** Jeśli rozważacie StyleX po lekturze case study Lineara, to jest dokładnie ten typ narzędzia, który obniża próg wejścia, bo nie każecie zespołowi projektowemu wymyślać nowej skali kolorów tylko dlatego, że zmieniliście silnik CSS-in-JS. Warto mieć to na radarze, zanim ktoś zacznie ręcznie przepisywać `theme.colors` z konfiguracji Tailwinda do osobnego pliku ze stałymi.

**Link:** [tailwind-stylex](https://github.com/aidenybai/tailwind-stylex)

## Nieskończoność w czystym CSS: calc(infinity * 1px) i jej praktyczne zastosowania

**TLDR:** Adam Argyle pokazuje, jak używać CSS-owej nieskończoności (`infinity` i `-infinity`) wewnątrz `calc()`, żeby zastąpić stare sztuczki w rodzaju `border-radius: 9999px` czymś, co faktycznie oznacza to, co mówi.

**Summary:** Każdy, kto choć raz napisał `border-radius: 9999px` albo `1e9px`, żeby wymusić idealną pigułkę, rozpozna problem, który ten artykuł rozwiązuje. CSS ma teraz prawdziwą nieskończoność, ale trzeba ją owinąć w `calc()` i przy wartościach z jednostką pomnożyć przez jedną jednostkę, stąd `border-radius: calc(infinity * 1px)`. To nie jest tylko kosmetyczna zmiana składni, to komunikuje intencję dużo jaśniej niż magiczna liczba, którą każdy nowy członek zespołu musi rozszyfrować z kontekstu.

Ten sam wzorzec działa przy `z-index`, gdzie `calc(infinity)` maksuje wartość do granicy liczby całkowitej obsługiwanej przez przeglądarkę, co znowu zastępuje popularne, ale arbitralne `z-index: 9999`. Ciekawszy jest przypadek animacji: mnożąc nieskończoność, można zamrozić animację na tyle długo, żeby zdążyć zbadać view transition w narzędziach deweloperskich, zanim zniknie. Autor od razu zaznacza jedno ograniczenie: sztuczka z nieskończonym `box-shadow` jako tłem nie działa, więc nie każde zastosowanie nieskończoności przenosi się jeden do jednego między właściwościami.

**Key takeaways:**
- `border-radius: calc(infinity * 1px)` zastępuje magiczne liczby typu `9999px` przy tworzeniu pigułek
- Ten sam wzorzec działa przy `z-index` do wymuszenia maksymalnej wartości obsługiwanej przez przeglądarkę
- Nieskończoność pomnożona przez czas animacji pozwala zamrozić ją na czas potrzebny do inspekcji w devtoolsach
- Sztuczka nie działa uniwersalnie, np. nieskończony `box-shadow` jako tło nie zadziała

**Why do I care:** To jeden z tych drobiazgów CSS, które warto wrzucić do wspólnego lintera albo snippetów zespołu, bo koszt wdrożenia jest zerowy, a czytelność kodu rośnie zauważalnie. Zamiana `9999px` na `calc(infinity * 1px)` w code review to jeden z tych komentarzy, które nikogo nie obrażają, a realnie poprawiają jakość bazy kodu.

**Link:** [CSS Infinity Use Cases](https://nerdy.dev/css-infinity-use-cases)

## Jednostka lh: odstępy w tekście, które same nadążają za typografią

**TLDR:** Ahmad Shadeed pokazuje, jak jednostka `lh`, czyli wysokość linii elementu wyrażona jako długość, pozwala budować odstępy między akapitami, tła w linie i wysokości ikon, które automatycznie skalują się razem z rozmiarem czcionki.

**Summary:** Problem, który ten artykuł rozwiązuje, jest znajomy każdemu, kto kiedykolwiek zmieniał rozmiar czcionki w komponencie i musiał ręcznie poprawiać wszystkie towarzyszące mu odstępy w pikselach czy remach. Jednostka `lh` eliminuje tę robotę u źródła: zamiana `margin-bottom: 1rem` na `1lh` sprawia, że odstęp między akapitami zawsze podąża za aktualną wysokością linii tekstu, niezależnie od tego, czy ktoś później zmieni rozmiar czcionki w rodzicu.

Shadeed pokazuje kilka mniej oczywistych zastosowań tego samego mechanizmu: tło imitujące papier w linie przez `background-size: 100% 1lh`, listę z limitem wysokości `max-height: 5lh`, która zawsze ucina się na pełnej linii tekstu zamiast w połowie wiersza, oraz ikony skalowane przez `0.8lh`, żeby rosły razem z etykietą przycisku, zamiast być ustawione na sztywno w pikselach. Jeden z demo łączy `round()` z `lh`, żeby przyciągnąć obraz w układzie float dokładnie do najbliższej linii tekstu.

Efekt uboczny lektury tego artykułu jest taki, że zwykłe `px` obok tekstu zaczyna wyglądać na przypadkowe, kiedy już zobaczysz, jak naturalnie `lh` synchronizuje się z typografią.

**Key takeaways:**
- `1lh` jako odstęp między akapitami skaluje się automatycznie razem z rozmiarem czcionki, bez ręcznego przeliczania
- `background-size: 100% 1lh` daje tło w linie dopasowane do faktycznej wysokości wiersza
- `max-height: 5lh` ucina listę zawsze na pełnej linii tekstu, nie w połowie wiersza
- Ikony skalowane przez `0.8lh` rosną razem z etykietą przycisku bez sztywnych wartości w pikselach

**Why do I care:** Dla każdego, kto projektuje komponenty z elastyczną typografią (a to dziś praktycznie każdy design system), `lh` to sposób na wyeliminowanie całej klasy drobnych bugów wizualnych powstających przy zmianie rozmiaru czcionki. Warto przetestować ją w najbliższym komponencie z tekstem o zmiennym rozmiarze, zamiast czekać, aż QA zgłosi kolejny "odstęp jest za mały przy większej czcionce".

**Link:** [The CSS lh unit](https://ishadeed.com/article/lh-unit/)

## Pięć właściwości CSS do lepszego typograficznego designu

**TLDR:** Preethi Sam zbiera pięć mniej znanych właściwości CSS do pracy z tekstem, od wypełniania liter obrazem po chowanie i pokazywanie fragmentów słowa przez `letter-spacing`, każda z gotowym demo na CodePen.

**Summary:** Zestaw jest praktyczny, bo każda z pięciu sztuczek rozwiązuje konkretny, powtarzalny problem, a nie jest tylko ciekawostką. `background-clip: text`, teraz dostępny też w skrócie `background`, w połączeniu z `color: transparent` wypełnia litery obrazem lub gradientem, co jest chyba najbardziej znanym trikiem z tej piątki. `vertical-align` porządkuje wyrównanie elementów inline względem linii tekstu, `align-content: center` centrowanie treści w boksie bez sztuczek z flexboxem, a `box-decoration-break: clone` pilnuje, żeby obramowanie i zaokrąglone rogi zachowały się poprawnie na tekście, który zawija się do kolejnej linii.

Dwie ostatnie są bardziej niszowe, ale przydatne w konkretnych sytuacjach: `letter-spacing` użyty kreatywnie potrafi schować, a potem odsłonić fragment słowa, a `text-combine-upright: all` pozwala wcisnąć kawałek poziomego tekstu (na przykład datę czy liczbę) do środka pionowego trybu pisania `writing-mode: vertical-lr`, co bywa przydatne przy układach w stylu japońskiej typografii.

**Key takeaways:**
- `background-clip: text` (teraz też w skrócie `background`) plus `color: transparent` wypełnia litery obrazem
- `box-decoration-break: clone` zachowuje obramowanie i zaokrąglenia na zawijającym się tekście
- `text-combine-upright: all` wciska poziomy tekst do środka pionowego trybu pisania

**Why do I care:** To dobra lista do zakładek na moment, kiedy projektant przyniesie mockup z "tym efektem tekstu", a wy będziecie zastanawiać się, czy potrzeba do tego canvasa czy SVG. Połowa z tych efektów, które kiedyś wymagały obrazka albo JS-a, dziś to jedna deklaracja CSS z rozsądnym wsparciem przeglądarek.

**Link:** [5 CSS Properties You Should Know for Better Text Designs](https://blog.master.dev/typographic-css-tricks/)

## TailMotion: system animacji, który mówi w składni Tailwinda

**TLDR:** TailMotion to biblioteka motion siedząca obok utility classes Tailwinda, sterowana atrybutami `data-state` i `aria-expanded`, z presetami osobowości animacji ustawianymi na poziomie rodzica i bez własnego runtime dla efektów scrollowych.

**Summary:** Autor newslettera przyznaje się wprost, że sam sklejał systemy animacji z sterty klas `animate-*`, i to jest dokładnie problem, który TailMotion adresuje. Zamiast traktować animację jako osobny byt obok Tailwinda, biblioteka instaluje się jako `tailmotion/css` i pozwala oznaczyć element klasą `tm-press`, a rodzicowi nadać "osobowość" animacji przez `tm-motion-calm`, `tm-motion-productive` albo `tm-motion-expressive`, którą dziedziczą wszyscy potomkowie. To ciekawe podejście do spójności animacji w większym produkcie, bo zamiast pilnować parametrów każdej animacji z osobna, ustawiasz jeden ton na poziomie sekcji czy strony.

Obsługa stanu przejść (`presence`) czyta `data-state` albo `aria-expanded` bez żadnego runtime JS, co oznacza, że natywne `dialog` i `popover` dostają realne animacje wyjścia, których zwykle brakuje przy pracy z tymi elementami wprost. Animacje odsłaniania przy scrollu korzystają z view timelines, a w przeglądarkach bez wsparcia treść po prostu zostaje widoczna zamiast znikać, co jest dobrym przykładem progressive enhancement zastosowanego bez dodatkowego kodu.

**Key takeaways:**
- `tm-motion-calm` / `tm-motion-productive` / `tm-motion-expressive` na rodzicu ustawiają spójny ton animacji dla wszystkich potomków
- Obsługa stanów czyta natywne `data-state` i `aria-expanded`, bez własnego runtime JS
- Animacje wyjścia działają na natywnym `dialog` i `popover`, co zwykle wymaga ręcznej roboty
- Scroll reveal korzysta z view timelines z bezpiecznym fallbackiem w nieobsługujących przeglądarkach

**Why do I care:** Jeśli wasz zespół frontendowy ma w kodzie kilka niezależnie wymyślonych sposobów animowania modali i list, TailMotion pokazuje alternatywę: jeden ton animacji ustawiony raz na poziomie layoutu zamiast pilnowania spójności ręcznie w każdym komponencie. Warto to sprawdzić zwłaszcza w projektach, gdzie natywne `dialog` i `popover` są już używane, ale nikt nie zajął się jeszcze ich animacjami wyjścia.

**Link:** [tailmotion.moumen.dev](https://tailmotion.moumen.dev/)
