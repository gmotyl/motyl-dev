---
title: "Tailwind Weekly #232: animowane ramki border-image, oszczędne keyframes i pułapka full-bleed"
excerpt: "Trzy techniczne smaczki z Tailwind Weekly #232: animowanie border-image gradientem, redukcja przerośniętej animacji keyframes ze 141 do 28 linii oraz naprawa full-bleed layoutu psutego przez pasek przewijania."
publishedAt: "2026-09-26"
slug: "tailwind-weekly-232-border-image-orbital-keyframes-full-bleed"
hashtags: "#tailwindweekly #css #frontend #performance #animation #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Animowana ramka z gradientu, czyli border-image w akcji

**TLDR:** Autor pokazuje, jak animować `border-image`, mało docenianą właściwość CSS, żeby uzyskać efekt rysującej się na obwodzie karty ramki. Klucz leży w rejestracji własnych custom properties przez `@property`, bo bez tego przeglądarka nie potrafi płynnie interpolować gradientu.

**Summary:** Punktem wyjścia jest ograniczenie, o którym łatwo zapomnieć: `border-image` nie zakrzywia się razem z zaokrąglonymi rogami elementu, więc do efektu obwódki opływającej cały brzeg trzeba podejść inaczej niż przez `border-radius`. Zaletą jest za to wydajność: jeden gradient automatycznie powtarza się na wszystkich krawędziach, a `border-image-slice` pozwala wyciąć z niego dokładnie taki fragment, jaki ma się wyświetlić.

Bazowy przykład używa liniowego gradientu, w którym czerwony i przezroczysty kolor zaczynają się w tym samym miejscu, więc granica między nimi tworzy ostrą krawędź przesuwaną wzdłuż obwodu. Problem pojawia się przy animacji: przeglądarka domyślnie nie umie przejść płynnie między dwoma pozycjami procentowymi w gradiencie, bo to nie jest właściwość, którą się zwyczajnie interpoluje. Rozwiązaniem jest zarejestrowanie własnej zmiennej przez `@property` z typem `<percentage>`, co pozwala animować ją tak, jak każdą inną liczbową właściwość CSS, i przenieść tę wartość do gradientu przez `var()`.

Drugi wariant zamienia gradient liniowy na stożkowy i dorzuca `border-image-repeat: round`, żeby wycięte kawałki gradientu równo wypełniały cały obwód bez przycinania na styku. Tu animowane są już dwie zarejestrowane właściwości naraz: kąt gradientu i głębokość cięcia `border-image-slice`, a `transition-property` jawnie wskazuje obie z nich, co pomaga przeglądarce zoptymalizować renderowanie.

**Key takeaways:**
- `border-image` nie zakrzywia się wraz z `border-radius`, więc efekt obwódki na całym obwodzie karty wymaga innego podejścia niż zaokrąglone rogi.
- Płynna animacja gradientu w `border-image-source` wymaga zarejestrowania custom property przez `@property` z odpowiednim typem, bo bez tego przeglądarka nie interpoluje wartości.
- `border-image-repeat: round` razem z animowanym `border-image-slice` daje efekt kręcącej się, stożkowej obwódki bez przycinania na łączeniach.

**Why do I care:** To rzadki przykład animacji, którą da się w całości zamknąć w CSS bez SVG, canvasu czy biblioteki animacyjnej, a przy tym tania w renderowaniu, bo dotyczy tylko warstwy border. Warto mieć ten wzorzec pod ręką przy stanach ładowania, podświetlaniu aktywnej karty czy subtelnych mikrointerakcjach, zamiast automatycznie sięgać po dodatkowy div z pseudoelementem i maską.

**Link:** [Animating CSS border-image | CSS-Tricks](https://css-tricks.com/animating-css-border-image/)

## 141 linii keyframes skurczone do 28: lekcja optymalizacji animacji CSS

**TLDR:** John Rhea przenosi na nowy portfolio animację księżyca orbitującego wokół planety, sprzed kilku lat, i po drodze odkrywa, że oryginalny kod powtarzał ten sam pięcioetapowy cykl pięć razy zamiast raz. Po usunięciu powtórzeń i rozdzieleniu `translate` i `scale` na osobne właściwości animacja skurczyła się ze 141 do 28 linii i wygląda płynniej niż wcześniej.

**Summary:** Historia zaczyna się od cichego błędu wizualnego: na telefonie planeta w animacji delikatnie drgała w pionie, mimo że autor nic w niej nie zmieniał poza jednostkami. Podejrzanym był stary keyframes z 2019 roku, sześćdziesięciosekundowy i liczący 141 linii, przez co ktokolwiek próbujący go zrozumieć musiał przewinąć długo, zanim dostrzegł wzorzec.

Ten wzorzec był prosty, tylko dobrze ukryty: klatki od 0% do 20% powtarzały się identycznie jeszcze cztery razy, aż do 100%, prawdopodobnie dlatego, że ktoś kiedyś skopiował jeden cykl pięciokrotnie zamiast po prostu skrócić czas trwania animacji. Usunięcie duplikatów i skrócenie czasu z 60 do 12 sekund od razu zredukowało kod do 36 linii, bez żadnej zmiany w tym, co widać na ekranie.

Kolejny krok to przeliczenie procentów klatek z nieczytelnego 5%, 10%, 15%, 20% na okrągłe 0%, 25%, 50%, 75%, 100%, oraz zaokrąglenie wartości `translate` z dokładnością do dziesięciomilionowej części piksela do jednego miejsca po przecinku, bo taka precyzja nigdy nie była komukolwiek potrzebna. Największa zmiana strukturalna dotyczyła jednak rozdzielenia `transform: translate() scale()` na osobne właściwości `translate` i `scale`. W starym zapisie obie transformacje żyły w jednej właściwości, więc pominięcie jednej z nich w danej klatce resetowało ją do wartości domyślnej, co zmuszało autora do zgadywania punktów pośrednich. Po rozdzieleniu można było zostawić `translate` nietkniętym w klatkach 25% i 75%, pozwalając przeglądarce samodzielnie interpolować pozycję, podczas gdy `scale` zmieniał się niezależnie, co dało płynniejsze przejście niż ręcznie liczone wartości pośrednie.

**Key takeaways:**
- Powtarzający się identyczny fragment keyframes to sygnał, że czas trwania animacji można skrócić, zamiast kopiować ten sam cykl wielokrotnie.
- Precyzja rzędu dziesięciomilionowych części piksela w wartościach `transform` nie ma znaczenia wizualnego i tylko utrudnia czytanie kodu.
- Osobne właściwości `translate` i `scale` pozwalają pominąć jedną z nich w wybranej klatce, zostawiając przeglądarce interpolację, czego nie dawał wspólny zapis przez `transform`.

**Why do I care:** To dobra checklist do code review każdej animacji CSS napisanej "na szybko": czy klatki się powtarzają, czy precyzja liczb ma jakikolwiek sens wizualny, i czy transformacje można rozdzielić, żeby przeglądarka robiła więcej pracy interpolacyjnej za nas. Rozdzielenie `translate`/`scale`/`rotate` na osobne właściwości to w ogóle niedoceniana zmiana w CSS, bo eliminuje całą klasę hacków z dodatkowymi divami-wrapperami, które istniały tylko po to, żeby animować pozycję i skalę niezależnie od siebie.

**Link:** [Orbital Mechanics (or How I Optimized a CSS Keyframes Animation) | CSS-Tricks](https://css-tricks.com/orbital-mechanics-or-how-i-optimized-a-css-keyframes-animation/)

## Full-bleed layout ma ukrytą pułapkę: pasek przewijania

**TLDR:** Klasyczny trik na sekcję rozciągniętą na całą szerokość ekranu, `width: 100vw` z ujemnym marginesem, psuje się na Windows, bo jednostka `vw` liczy się względem szerokości viewportu razem z paskiem przewijania. Autor pokazuje, jak naprawić to jednostkami kontenerowymi, i co zrobić, gdy sekcja full-bleed siedzi zagnieżdżona w węższym kontenerze.

**Summary:** Klasyczna technika Andy'ego Bella ustawia element na `width: 100vw` z marginesem `calc(50% - 50vw)`, żeby wyrwać go z ograniczeń rodzica i rozciągnąć na cały ekran. Problem w tym, że `100vw` na systemach z widocznym paskiem przewijania, czyli praktycznie zawsze na Windows, bywa szersze niż faktycznie widoczny obszar strony, więc kilka pikseli po każdej stronie zostaje ucięte. Na macOS z domyślnymi, nakładającymi się paskami przewijania błąd jest niemal niewidoczny, co tłumaczy, dlaczego tak długo pozostawał niezauważony w wielu projektach.

Najprostsza łata to ukrycie poziomego przewijania na `<body>` przez `overflow-x: hidden`, albo zarezerwowanie miejsca na pasek z góry przez `scrollbar-gutter: stable`, choć to drugie potrafi wyglądać dziwnie na stronach bez pionowego przewijania. Nowocześniejsze podejście zamienia jednostki viewportu na jednostki kontenerowe: `<body>` staje się kontenerem przez właściwość `container`, a `100vw` zamienia się w `100cqi`, czyli sto procent rozmiaru najbliższego kontenera zamiast całego viewportu.

Haczyk pojawia się, gdy sekcja full-bleed jest zagnieżdżona głębiej, wewnątrz węższego kontenera niż `<body>`. Wtedy `cqi` liczyłoby się względem tego węższego rodzica, a nie względem całej szerokości strony, i cała sztuczka by się posypała. Autor rozwiązuje to rejestrując przez `@property` zmienną `--body-size`, ustawianą raz na poziomie kontenera odpowiadającego szerokości `<body>`, i dziedziczoną w dół, dzięki czemu każdy głębiej zagnieżdżony element full-bleed odwołuje się do tej samej, poprawnej wartości zamiast do swojego bezpośredniego rodzica.

Na końcu autor przyznaje, że to wciąż obejście, i wskazuje, czego CSS właściwie brakuje: sposobu na odwołanie się do konkretnego, nazwanego kontenera przy użyciu jednostek kontenerowych, coś w rodzaju `cqi(body)`. Dopóki taka składnia nie istnieje, `@property` z ręcznie przekazywaną zmienną zostaje najbardziej niezawodnym rozwiązaniem dla zagnieżdżonych sekcji full-bleed.

**Key takeaways:**
- `100vw` bywa szersze niż faktycznie widoczna szerokość strony na systemach z widocznym paskiem przewijania, co ucina kilka pikseli po bokach sekcji full-bleed.
- `scrollbar-gutter: stable` albo `overflow-x: hidden`/`clip` na `<body>` to najprostsze łaty, ale nie rozwiązują problemu dla zagnieżdżonych kontenerów.
- Zamiana `100vw` na `100cqi` względem kontenera `<body>` naprawia problem, ale tylko dla elementów full-bleed bezpośrednio wewnątrz tego kontenera.
- `@property` pozwala przekazać poprawną szerokość w dół przez zagnieżdżone kontenery, gdy sekcja full-bleed nie jest bezpośrednim dzieckiem `<body>`.

**Why do I care:** To dokładnie ten rodzaj błędu, który przechodzi przez code review bez zająknięcia, bo na Macu deweloperów wszystko wygląda idealnie, a wypływa dopiero na zrzucie ekranu od klienta na Windows. Jeśli design system ma choć jeden komponent full-bleed używany w różnych głębokościach zagnieżdżenia, ten artykuł to konkretna checklist do testowania: włącz w macOS zawsze widoczne paski przewijania, sprawdź na Windows, i rozważ jednostki kontenerowe zamiast `vw` wszędzie, gdzie liczy się precyzja co do piksela.

**Link:** [Fixing full-bleed CSS](https://dbushell.com/2026/07/03/fixing-full-bleed-css/)
