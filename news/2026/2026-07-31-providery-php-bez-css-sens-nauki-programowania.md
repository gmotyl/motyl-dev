---
title: "Providery, PHP bez CSS i pytanie o sens nauki programowania"
excerpt: "Przegląd z daily.dev: czy programowania nadal warto się uczyć, jak UglyPHP kompiluje style prosto z PHP, przegląd 24 narzędzi AI do projektowania, trzeci dzień serii o NestJS oraz darmowa biblioteka animowanych komponentów Originkit."
publishedAt: 2026-07-31
slug: providery-php-bez-css-sens-nauki-programowania
hashtags: "#dailydev #frontend #webdev #nestjs #laravel #php #aidesigntools #generated #pl"
source_pattern: "daily.dev"
---

## Czy nadal warto uczyć się programować?

**TLDR:** Bobby Iliev, na co dzień zajmujący się DevOpsem i infrastrukturą, wraca do pytania, które w ostatnich miesiącach zadaje sobie chyba każdy junior i niejeden senior: czy w dobie asystentów kodujących uczenie się programowania ma jeszcze sens. Odpowiedź, jak można się domyślić, brzmi twierdząco, ale ciekawsze jest uzasadnienie niż sama teza.

**Summary:** Pytanie o sens nauki programowania wraca co jakiś czas jak bumerang, zwykle w rytm kolejnej fali paniki wywołanej premierą nowego modelu językowego. Iliev podchodzi do tego z pozycji kogoś, kto na co dzień zarządza infrastrukturą i automatyzacją, więc widzi obie strony barykady: narzędzia, które piszą kod za niego, oraz sytuacje, w których bez zrozumienia tego kodu nie da się bezpiecznie nic wdrożyć. Jego argumentacja idzie w stronę rozróżnienia między umiejętnością pisania linijek kodu a umiejętnością myślenia o systemach, ich awariach i konsekwencjach zmian. To rozróżnienie wydaje mi się trafne, bo asystent kodujący potrafi wygenerować całkiem sensowną funkcję, ale nie weźmie odpowiedzialności za to, że ta funkcja w piątek o 17 wywali produkcję.

Autor zwraca też uwagę na coś, co często umyka w dyskusjach na Twitterze: umiejętność programowania coraz rzadziej oznacza samo pisanie składni, a coraz częściej czytanie cudzego kodu, debugowanie i podejmowanie decyzji architektonicznych. Model językowy przyspiesza pierwszy etap, ale drugi i trzeci nadal wymagają kogoś, kto rozumie, co się dzieje pod maską. W tym sensie próg wejścia do zawodu może się obniżyć, ale próg do bycia dobrym inżynierem raczej rośnie, bo oczekiwania wobec ludzi przesuwają się w stronę rzeczy, których maszyna jeszcze nie robi dobrze.

Iliev nie ucieka też od niewygodnej części tej rozmowy, czyli tego, że rynek pracy dla juniorów faktycznie się skurczył i część zadań, które kiedyś były pierwszym stopniem kariery, dziś wykonuje agent AI w kilka sekund. Zamiast łagodzić ten fakt, sugeruje zmianę strategii nauki: mniej czasu na odtwarzanie tutoriali, więcej na budowanie rzeczy, które wymagają decyzji, kompromisów i radzenia sobie z niejednoznacznością.

**Key takeaways:**
- Pisanie kodu i rozumienie systemów to dwie różne umiejętności, i to ta druga zyskuje na wartości.
- Asystenci AI przyspieszają pierwszy etap pracy, ale odpowiedzialność za decyzje architektoniczne nadal spoczywa na człowieku.
- Rynek dla początkujących faktycznie się zmienił, więc warto uczyć się w sposób, który buduje zdolność podejmowania decyzji, a nie tylko odtwarzania wzorców.

**Why do I care:** Jako ktoś, kto rekrutuje i wdraża ludzi do zespołów frontendowych, widzę ten podział na własne oczy: kandydaci potrafiący sprawnie posługiwać się Copilotem czy Cursorem, ale gubiący się, gdy trzeba wyjaśnić, dlaczego dany kod działa albo dlaczego akurat przestał. To jest dokładnie ta kompetencja, której nie da się wygenerować promptem, i to ona decyduje dziś o awansie z juniora na mida szybciej niż liczba wypchniętych PR-ów.

**Link:** [Does it still make sense to learn how to code?](https://daily.dev/posts/3iDjeu0Y2)

## UglyPHP: typowany, bezruntime'owy silnik design systemu dla Laravela

**TLDR:** UglyPHP pozwala definiować style komponentów bezpośrednio w PHP, zamiast w plikach CSS czy Tailwindzie, i kompiluje je do deterministycznego, scopowanego CSS bez żadnego runtime'u po stronie przeglądarki. Dla ekosystemu Laravela to ciekawa alternatywa dla podejścia utility-first.

**Summary:** Pomysł na UglyPHP jest prosty do opisania, choć w praktyce dotyka sporego problemu w projektach Laravelowych: rozjazdu między logiką backendową pisaną w PHP a stylami żyjącymi w osobnym świecie CSS albo Tailwinda. Zamiast pisać klasy Tailwindowe w Blade, developer buduje obiekt stylu za pomocą płynnego API, łańcuchując metody odpowiadające właściwościom CSS, w tym stany takie jak hover. Każda taka definicja jest w pełni typowana, więc IDE i analiza statyczna łapią błąd w nazwie właściwości czy typie wartości, zanim trafi on na produkcję.

Kluczowa różnica względem typowych rozwiązań CSS-in-JS znanych z Reacta polega na tym, że tutaj nie ma żadnego runtime'u generującego style w przeglądarce. Cała kompilacja dzieje się po stronie PHP, a wynikiem jest statyczny, deterministyczny plik CSS ze stabilnymi, generowanymi na podstawie treści nazwami klas. Oznacza to brak narzutu wydajnościowego typowego dla bibliotek stylujących w locie i pełną kontrolę nad tym, co faktycznie trafia do przeglądarki użytkownika.

Projekt wymaga PHP w wersji co najmniej 8.3 oraz Laravela 12 lub 13, a jego service provider rejestruje się automatycznie, więc integracja z istniejącym projektem sprowadza się do instalacji przez Composera. Autorzy zadbali też o testy oparte na Pest i statyczną analizę PHPStanem, co sugeruje, że projekt, mimo żartobliwej nazwy, jest traktowany poważnie jako narzędzie produkcyjne, a nie eksperyment na weekend.

Hasło przewodnie projektu, "Write ugly, ship beautiful", dobrze oddaje filozofię: nieważne, jak brzydko wygląda deklaracja stylu w kodzie PHP, liczy się to, co ostatecznie renderuje się w przeglądarce. To podejście, które będzie się podobać zespołom preferującym silne typowanie i chcącym trzymać całą logikę aplikacji w jednym języku, kosztem pewnej ilości verbosity w porównaniu do klasycznego CSS.

**Key takeaways:**
- Style definiuje się jako typowane obiekty PHP, a nie klasy CSS czy pliki SCSS.
- Kompilacja jest w pełni statyczna, bez żadnego runtime'u w przeglądarce, co eliminuje narzut wydajnościowy.
- Wymaga PHP 8.3+ i Laravela 12/13, z automatyczną rejestracją service providera.
- Projekt ma testy w Pest i statyczną analizę w PHPStanie, co świadczy o dojrzałości podejścia.

**Why do I care:** Pracując głównie w ekosystemie JS/TS na co dzień, patrzę na takie projekty z ciekawością, bo pokazują, że problem "stylów rozjechanych od logiki" nie jest specyficzny dla Reacta czy Vue, tylko generyczny dla każdego frameworka z komponentami. Podoba mi się kierunek "typowane, statycznie kompilowane style", bo to dokładnie ten sam trend, który w świecie frontendu napędza rozwiązania w rodzaju vanilla-extract czy Panda CSS. Gdybym pracował w zespole Laravelowym, dałbym temu szansę właśnie ze względu na brak runtime'u, to jest argument, którego nie da się zignorować.

**Link:** [UglyPHP: typed, zero-runtime design-system engine for Laravel.](https://daily.dev/posts/BwhM6K3Vt)

## 24 najlepsze narzędzia AI do projektowania w 2026 roku

**TLDR:** Zestawienie testuje na żywo 24 narzędzia AI przydatne w pracy projektowej i deweloperskiej, dzieląc je na sześć kategorii, od generowania interfejsów po budowanie całych aplikacji. Zamiast wskazywać jednego zwycięzcę, autor argumentuje, że produktywne zespoły to te, które wiedzą, kiedy sięgnąć po które narzędzie.

**Summary:** Zamiast kolejnej listy narzędzi opisanych na podstawie dokumentacji, autor faktycznie przetestował każde z 24 narzędzi tymi samymi promptami w obrębie danej kategorii, co samo w sobie jest rzadkością w tego typu artykułach. Podział na sześć grup, obejmujących narzędzia do projektowania interfejsów z eksportem kodu, budowania całych aplikacji i stron, grafikę i treści wizualne, generatory obrazów, asystentów kodujących oraz narzędzia wspierające warsztat projektowy, sprawia, że zestawienie czyta się bardziej jak mapa możliwości niż ranking.

W kategorii projektowania interfejsów z eksportem kodu wyróżnione zostały narzędzia takie jak Flowstep, Google Stitch czy Figma Make, przy czym Flowstep chwalony jest za generowanie wielu ekranów naraz, edytowalne płótno i eksport gotowy do wklejenia w projekt React z TypeScriptem. W kategorii budowania aplikacji i stron pojawiają się dobrze już znane Lovable, Bolt.new, Replit, v0 i Framer, z Lovable wskazanym jako najlepszy do szybkiego prototypowania działających aplikacji. Osobne kategorie zajmują narzędzia stricte graficzne, jak Canva AI czy Adobe Firefly, generatory obrazów w rodzaju Leonardo AI czy Stable Diffusion, oraz asystenci kodujący, gdzie Cursor wskazany jest jako najbardziej dojrzały wybór.

Najciekawszy jest jednak wniosek końcowy: autor świadomie odrzuca ideę jednego uniwersalnego narzędzia, które załatwia wszystko. Zamiast tego proponuje myślenie o tych narzędziach jak o wyspecjalizowanych częściach warsztatu, gdzie kompetencją nie jest znajomość jak największej liczby produktów, tylko trafny wybór właściwego narzędzia do konkretnego zadania w danym momencie procesu projektowego.

**Key takeaways:**
- Zestawienie dzieli narzędzia AI na sześć kategorii zamiast tworzyć jeden ogólny ranking.
- Flowstep, Lovable i Cursor wypadają jako liderzy w swoich kategoriach po realnym przetestowaniu.
- Autor odrzuca ideę jednego najlepszego narzędzia na rzecz świadomego doboru narzędzia do zadania.

**Why do I care:** Ten trend widzę też u siebie w zespole: ludzie przestają szukać jednego "AI do wszystkiego" i zaczynają budować sobie zestaw narzędzi dopasowany do etapu pracy, od szybkiego prototypu w v0 po finalny kod pisany z pomocą Cursora. To dojrzalsze podejście niż fascynacja pojedynczym produktem sprzed roku czy dwóch, i moim zdaniem lepiej odzwierciedla to, jak faktycznie wygląda dziś praca projektanta współpracującego blisko z frontendem.

**Link:** [24 Best AI Design Tools for Designers and Developers in 2026](https://daily.dev/posts/AH2SMQeFy)

## Dzień 3/30: Providery robią robotę

**TLDR:** Trzecia część serii Ezile Mdodany o NestJS skupia się na providerach, czyli klasach wstrzykiwanych przez system dependency injection, i na tym, dlaczego to one, a nie kontrolery, powinny nosić ciężar logiki biznesowej aplikacji.

**Summary:** Seria "30 dni NestJS" konsekwentnie buduje mentalny model tego frameworka krok po kroku, zaczynając od pytania, po co w ogóle sięgać po NestJS zamiast gołego Express, przez naukę trzymania kontrolerów cienkimi, aż po ten odcinek poświęcony providerom. To naturalna kolejność, bo dopiero po zrozumieniu, że kontroler ma tylko odbierać żądanie i zwracać odpowiedź, sensowne staje się pytanie, gdzie w takim razie ma mieszkać cała reszta logiki.

Odpowiedzią NestJS są providery, czyli zwykłe klasy oznaczone dekoratorem, które framework potrafi wstrzyknąć tam, gdzie są potrzebne, zarządzając ich cyklem życia za nas. W praktyce oznacza to, że serwis odpowiedzialny za logikę biznesową nie musi wiedzieć, skąd dokładnie przychodzi żądanie ani jak zostanie zwrócona odpowiedź, bo te sprawy zostają po stronie kontrolera. Taki podział odpowiedzialności ułatwia testowanie, bo provider można przetestować w izolacji, podmieniając jego zależności na atrapy, bez odpalania całego serwera HTTP.

Odcinek najwyraźniej pokazuje też typowe błędy początkujących, czyli wrzucanie zapytań do bazy danych czy logiki walidacji bezpośrednio do kontrolera, co na krótką metę działa, ale szybko zamienia kontroler w nieczytelny stos odpowiedzialności. Przeniesienie tej logiki do providera, nawet jeśli na starcie wydaje się dodatkową warstwą pośrednią, zwraca się przy pierwszej próbie napisania testu jednostkowego albo przy pierwszej zmianie wymagań, gdy trzeba dodać drugie miejsce wywołania tej samej logiki.

To, co mi się podoba w takim podejściu do nauki frameworka, to rozkładanie go na małe, codzienne dawki zamiast jednego przytłaczającego kursu. Trzeci dzień z rzędu poświęcony fundamentom architektury, zamiast szybkiego przeskoku do bardziej efektownych tematów jak WebSockety czy mikroserwisy, pokazuje, że autorka rozumie, iż bez solidnych podstaw dependency injection cała reszta frameworka będzie sprawiać kłopoty.

**Key takeaways:**
- Providery w NestJS to klasy zarządzane przez system dependency injection, przeznaczone do przechowywania logiki biznesowej.
- Trzymanie logiki poza kontrolerem ułatwia testowanie jednostkowe przez podmianę zależności na atrapy.
- Seria uczy fundamentów architektury zanim przejdzie do bardziej zaawansowanych tematów, co ma sens dydaktyczny.

**Why do I care:** Dependency injection w stylu Angulara czy NestJS bywa krytykowany za nadmiar ceremonii w porównaniu z lekkimi frameworkami jak Express czy Fastify, ale w większych zespołach to właśnie ta ceremonia ratuje kod przed chaosem, gdy nad jednym serwisem pracuje pięciu różnych ludzi. Widziałem oba scenariusze: kontrolery rozdęte do kilkuset linijek z logiką bazodanową wklejoną wprost do handlera, i takie, gdzie provider robi jedną rzecz i da się go przetestować w trzy minuty. Druga opcja zawsze wygrywa w perspektywie kilku miesięcy utrzymania projektu.

**Link:** [Day 3/30 — Providers Do the Work](https://daily.dev/posts/SEDqBEOJT)

## Originkit: darmowa biblioteka animowanych komponentów dla nowoczesnych stron

**TLDR:** Originkit to darmowa biblioteka kilkudziesięciu animowanych komponentów UI, gotowych do wklejenia w projekt React, Next.js czy Framer, ze wsparciem dla CSS, Tailwinda albo CSS Modules, oraz integracją z asystentami AI przez protokół MCP.

**Summary:** Biblioteki komponentów UI to temat, który wraca w każdym newsletterze deweloperskim, ale Originkit wyróżnia się dwiema rzeczami: skupieniem wyłącznie na komponentach z wbudowaną animacją oraz brakiem bariery wejścia w postaci zaproszeń czy planów płatnych. Katalog obejmuje elementy interaktywne, galerie zdjęć, efekty tekstowe, animowane tła i przyciski, czyli dokładnie te drobne detale, które zwykle zajmują nieproporcjonalnie dużo czasu, gdy trzeba je dopracować ręcznie w czystym CSS czy bibliotece animacyjnej.

Sposób korzystania z biblioteki jest przemyślany pod trzy różne style pracy. Można po prostu skopiować kod komponentu bezpośrednio do swojego projektu, wybierając wariant dla Reacta, Next.js, Vite czy samego Framera, wraz z preferowanym podejściem do stylowania, czyli czystym CSS, Tailwindem albo CSS Modules. Można też używać komponentów bezpośrednio w Framerze bez pisania kodu, co ma sens dla zespołów mieszanych, gdzie designerzy pracują równolegle z developerami. Trzecia opcja, najbardziej charakterystyczna dla obecnego momentu w branży, to podłączenie biblioteki przez protokół MCP, dzięki czemu agent AI w edytorze kodu może samodzielnie przeglądać dostępne komponenty i wstawiać je do projektu na żądanie.

Przeglądanie katalogu nie wymaga żadnej rejestracji, natomiast pobranie faktycznego kodu źródłowego komponentu wymaga darmowego klucza API, co jest rozsądnym kompromisem między otwartością a możliwością śledzenia, jak biblioteka jest wykorzystywana. Sam fakt, że autorzy zdecydowali się zdjąć wcześniejszy wymóg zaproszenia i otworzyć bibliotekę dla wszystkich, sugeruje, że projekt urósł na tyle, by chcieć skalować się na szerszą społeczność, a nie zamykać się w niszy early adopterów.

Integracja z MCP jest tu moim zdaniem najciekawszym elementem całej układanki, bo pokazuje, w jakim kierunku zmierza dystrybucja komponentów UI: zamiast dokumentacji, którą trzeba przeczeszać ręcznie, agent kodujący dostaje bezpośredni dostęp do katalogu i sam decyduje, który komponent najlepiej pasuje do opisanego przez developera zadania.

**Key takeaways:**
- Originkit oferuje kilkadziesiąt darmowych, animowanych komponentów UI dla React, Next.js i Framera.
- Stylowanie można wybrać spośród czystego CSS, Tailwinda i CSS Modules.
- Przeglądanie katalogu jest w pełni otwarte, a pobranie kodu komponentu wymaga darmowego klucza API.
- Biblioteka integruje się z protokołem MCP, dzięki czemu agenci AI mogą samodzielnie wyszukiwać i wstawiać komponenty.

**Why do I care:** Integracja przez MCP to dla mnie sygnał, że biblioteki komponentów zaczynają traktować agentów kodujących jako pełnoprawnego konsumenta swojego API, na równi z developerem piszącym kod ręcznie. To ma sens biznesowy, bo im łatwiej agentowi znaleźć i wstawić gotowy komponent zamiast generować go od zera, tym większa szansa, że deweloper w ogóle sięgnie po tę bibliotekę zamiast poprosić model o wygenerowanie czegoś podobnego samodzielnie, zwykle gorszej jakości.

**Link:** [Originkit — Free Animated component library for modern websites](https://daily.dev/posts/1UBoJXPk1)
