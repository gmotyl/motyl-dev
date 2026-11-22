---
title: "Tailwind Weekly #240: stylowanie UI SDK od Vercela, dziesięć zabezpieczeń przed AI slopem i toasty ze sprężynami"
excerpt: "Jak ostylować bezstylowe komponenty Vercel UI SDK w Tailwindzie 4, jak pilnować frontendu pisanego szybciej, niż ktokolwiek go czyta, oraz biblioteka toastów oparta na fizyce sprężyn."
publishedAt: "2026-11-21"
slug: "tailwind-weekly-240-ui-sdk-anti-ai-slop-ding-toasts"
hashtags: "#tailwindweekly #tailwindcss #css #react #typescript #testing #eslint #vercel #animation #accessibility #generated #pl"
source_pattern: "Tailwind Weekly"
---

## Stylowanie Vercel UI SDK za pomocą Tailwind CSS

**TLDR:** Vercel Labs wypuścił w becie UI SDK, czyli zestaw dostępnych komponentów bez żadnych stylów. Autor tekstu pokazuje, jak ostylować cztery z nich w Tailwindzie 4, wykorzystując atrybuty data i zmienne CSS.

**Summary:** UI SDK trafił do npm 12 listopada i działa w Reakcie, Vue, Svelte, Solid oraz jako Web Components. Całą logikę, czyli fokus, klawiaturę i ARIA, dostajesz gotową. Wygląd to już twoja sprawa. Pod spodem są trzy warstwy. Rdzeń z zachowaniami, prymitywy łączące te zachowania ze stanem i nazwanymi slotami, a na wierzchu adaptery do frameworków, które renderują każdy slot jako osobną część.

Stylowanie opiera się na trzech haczykach. Każda część ma atrybut data-slot z nazwą, stan jest wystawiony jako atrybuty typu otwarty, podświetlony czy wybrany, a wartości, których klasa nie wyrazi, lecą jako zmienne CSS. Tailwind 4 ma wariant na dowolny atrybut data, więc cała zabawa sprowadza się do zwykłych klas. Autor przechodzi przez Select, Popover, Rating i Color Picker, a każdy z nich pokazuje inną sztuczkę.

Najciekawsze są animacje wyjścia. Popup dostaje specjalne atrybuty tylko na czas przejścia, więc styl wyjścia trzeba przypiąć do atrybutu końca animacji, a nie do stanu zamknięty. Ten drugi opisuje stan, ale nie trzyma elementu w DOM, więc nic się nie animuje. Dzięki temu wyjście może trwać na przykład 100 milisekund, a wejście 200, i całość wydaje się szybsza. Popupy lądują też w top layer przeglądarki, więc z-index przestaje mieć znaczenie.

Mała pułapka, która zjadła autorowi trochę czasu. Maska CSS założona na fokusowalny element obcina także jego outline, więc po wciśnięciu Tab pierścień fokusu po prostu znika. Maskę trzeba dać na element wewnętrzny. To nie jest problem UI SDK, tylko każdej gwiazdkowej oceny robionej maską, ale dobrze to wiedzieć przed wdrożeniem.

Autor pisze też, że komponenty da się stylować samym CSS-em po data-slot, a w projekcie w stylu shadcn prościej zostać przy klasach narzędziowych. Jest tabelka migracji z Radix i Base UI. Z Base UI klasy w większości przenoszą się wprost, wyrzucasz Portal i Positioner. Z Radixa wymieniasz warianty na atrybutach stanu i keyframe'y na atrybuty początku i końca.

**Key takeaways:**
- Style przypinasz do data-slot, atrybutów stanu i zmiennych CSS, a nie do wygenerowanych identyfikatorów.
- Animację wyjścia ustawiasz na atrybucie końca przejścia, nie na stanie zamknięty.
- Maska na elemencie, który łapie fokus, ucina outline, więc maskuj element wewnętrzny.

**Why do I care:** Bezstylowe komponenty to dla mnie rozsądny kierunek, bo design system i tak zawsze kończy jako własny. Ale to beta, jednodniowa w chwili pisania tekstu, i autor sam przyznaje, że API może się zmienić. Wrzucanie tego do produkcji teraz to hazard, a testowanie na scratchowej aplikacji jest w sam raz. Nikt nie wspomina o koszcie utrzymania własnej warstwy stylów przy każdej zmianie atrybutów, a przy betach to realne ryzyko.

**Link:** [Style Vercel's UI SDK with Tailwind CSS](https://hextaui.com/blog/style-vercel-ui-sdk-tailwind)

## Dziesięć zabezpieczeń przed AI slopem we frontendzie

**TLDR:** Evil Martians opisują dziesięć kontroli, które pozwalają ufać kodowi generowanemu szybciej, niż da się go przeczytać. Od kontraktu OpenAPI, przez testy mutacyjne, po bramkę w CI, która nie pozwala niczego wmergować na skróty.

**Summary:** Punkt wyjścia jest trzeźwy. Jedna osoba z agentem napisze dziesięć tysięcy linii w tydzień, ale agent nie pamięta wczorajszych ustaleń, nie odpowiada za produkcję i za pół roku go nie będzie. Odpowiedzialność zostaje po stronie ludzi, a baza kodu rośnie kilka razy szybciej. Kontrole dzielą się na trzy grupy. Najpierw nie dopuścić do napisania nadmiarowego kodu, potem znaleźć to, co już powstało, na końcu zrobić z tego wszystkiego obowiązek.

Pierwsza rzecz to kontrakt. Klasyczny błąd modelu to pole, które nie istnieje. Model widzi użytkownika i pisze fullName, a backend zwraca imię i nazwisko osobno. Jeśli typ na froncie był zdefiniowany niezależnie od API, TypeScript to przepuści. Specyfikacja OpenAPI daje obu stronom jeden opis, a wygenerowane typy i schematy Zoda sprawiają, że takie pole się po prostu nie skompiluje. Dalej idzie ścisły TypeScript z kilkoma flagami wymuszającymi obsługę pustych tablic, a potem linter potraktowany jak filtr na konkretnego autora o znanych nawykach. Sonarjs łapie złożoność i duplikaty, osobna reguła wyłapuje zbędne efekty w Reakcie, a wtyczki do Vitesta i Playwrighta pilnują, żeby testy cokolwiek sprawdzały.

Dalej granice warstw. Model nie pamięta twojej architektury z sesji na sesję i ciągnie projekt w stronę średniej z GitHuba, jeden sensowny import po drugim. Reguły zależności, na przykład że serwis nie importuje komponentów, wraz z komunikatem błędu mówiącym, gdzie ta zależność powinna trafić, robią tu większą robotę niż plik z zasadami. Bo reguła w pliku konkuruje z milionem repozytoriów w wagach modelu i dostaje tylko jedną lekturę na sesję.

Najbardziej podobała mi się część o testach mutacyjnych. Pokrycie mówi, że linia się wykonała. Stryker psuje kod celowo i pokazuje mutanty, których żaden test nie zauważył. Autorzy wskazują typowe grzechy, jak sprawdzanie kształtu zamiast treści, snapshot z niezweryfikowanego wyniku albo test sprawdzający mocka. Ostrzegają przy tym, żeby nie ustawiać progu, bo wtedy agent zacznie zabijać mutanty zamiast testować zachowanie. Do tego Knip na martwy kod, własne skrypty na to, czego narzędzia ogólne nie widzą, jscpd na duplikaty, a całość w CI jako osobne wymagane zadania.

Uczciwie jest też o kosztach. Fałszywe alarmy, reguły, które się starzeją, kilka minut mutacji na każdy PR i onboarding, w którym nowa osoba dostaje setki reguł naraz. Rekomendowany rollout to ostrzeżenia na zmienionych plikach, potem awansowanie reguł jedna po drugiej, a bramka w CI dopiero na końcu. I wreszcie zdanie, które warto zapamiętać. Zielony przebieg nie znaczy, że ktokolwiek zrozumiał kod. Znaczy tylko, że nie znaleziono tego, czego szukano.

**Key takeaways:**
- Jeśli masz zacząć od jednej rzeczy, weź kontrakt API, bo usuwa całą klasę błędów przed ich napisaniem.
- Testy mutacyjne traktuj jako detektor, nie wskaźnik do wyśrubowania.
- Kontrola, którą można pominąć, nie jest kontrolą, więc wszystko musi blokować merge w CI.

**Why do I care:** To jest tekst dla każdego zespołu, który już dziś ma więcej wygenerowanego kodu, niż jest w stanie zreviewować. Zgadzam się z większością, ale zwracam uwagę na to, czego autorzy unikają. Cały ten zestaw kosztuje, i to nie tylko minuty w CI, tylko ludzką uwagę na utrzymanie reguł, skryptów i wyjątków. W trzyosobowym zespole szukającym product-market fit to może być przerost, co sami zresztą przyznają. A co do rzeczy, której żadna kontrola nie złapie, czyli złego abstrakcyjnego pomysłu, tu nadal rozstrzyga architekt, nie linter.

**Link:** [10 anti-AI slop moves for frontend projects going faster than humans can review](https://evilmartians.com/chronicles/ten-anti-ai-slop-moves-for-frontend-projects-going-faster-than-humans-can-review)

## Ding, czyli toasty ze sprężynami

**TLDR:** Ding to biblioteka powiadomień typu toast, w której ruch liczy solver sprężyn, więc przerwana animacja zachowuje pęd. Działa w Reakcie, Svelte 5, Vue 3 i czystym JavaScripcie, bez zależności i bez osobnego arkusza stylów.

**Summary:** Nowy toast nie pojawia się obok starego, tylko przekształca w miejscu poprzedni. Rozmiar, kształt i tekst poruszają się według fizyki sprężyny, więc jeśli przerwiesz animację w połowie, nie ma skoku do stanu końcowego. Błędy i inne toasty, które mają zostać, domyślnie trzymają swoje miejsce.

Pod względem praktycznym biblioteka jest bardzo wygodna. Style wstrzykuje z JavaScriptu, więc nie ma czego importować. Są motywy jasny, ciemny i systemowy, sześć pozycji, obsługa zapisu od prawej do lewej, a kolory i zaokrąglenia są zmiennymi CSS. W toaście zmieścisz opis, awatar, przyciski, pasek postępu, odliczanie i drobny tekst z boku. Szanuje prefers-reduced-motion, ma regiony live i zamykanie z klawiatury. Licencja MIT, dostępna też jako wpis w rejestrze shadcn.

Strona projektu od razu ustawia się jako alternatywa dla Sonnera, react-hot-toast i svelte-sonner. To ambitne, bo to są biblioteki z ogromną bazą użytkowników i latami szlifowania przypadków brzegowych.

**Key takeaways:**
- Animacje oparte na sprężynach zachowują pęd przy przerwaniu.
- Zero zależności, style wstrzykiwane z JavaScriptu, motywy sterowane zmiennymi CSS.
- Dostępność jest wbudowana, razem z szacunkiem dla ograniczonego ruchu.

**Why do I care:** Toasty to element, który każdy projekt ma i prawie nikt nie lubi. Ładna animacja jest miła, ale ja patrzyłbym najpierw na dostępność i zachowanie przy kilku powiadomieniach naraz, bo to tam toast-biblioteki zwykle się wykładają. Strona nie pokazuje żadnych liczb o rozmiarze paczki ani o wydajności solvera sprężyn, a to byłoby pierwsze, o co zapytałbym przed podmianą Sonnera. Jako zabawka do nowego projektu świetne, jako zamiennik w dużej aplikacji dopiero po testach z czytnikiem ekranu.

**Link:** [Ding: spring-physics toast notifications](https://ding.yusufcengiz.dev/)
