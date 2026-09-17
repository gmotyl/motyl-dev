---
title: "Kiedy CSS umiało uruchamiać JavaScript, StyleX dla agentów i przewrót w Automattic"
excerpt: "Przegląd Frontend Focus: historyczne hacki CSS, StyleX jako język projektowany pod agentów kodujących, koniec CSS-Tricks i pucz w zarządzie Automattic."
publishedAt: "2026-09-17"
slug: "css-relics-stylex-agents-automattic-mullenweg-wcag3"
hashtags: "#frontendfocus #css #html #stylex #accessibility #ai #agents #generated #pl"
source_pattern: "Frontend Focus"
---

## Gdy CSS potrafiło uruchamiać JavaScript: archeologia hacków z ery Internet Explorera

**TLDR:** Przegląd najdziwniejszych zachowań CSS poza specyfikacją, od gwiazdkowego hacka dla IE7 po CSS Expressions, czyli oficjalny sposób na uruchamianie JavaScriptu wewnątrz deklaracji stylu w Internet Explorerze 5.

**Summary:** Najciekawszym eksponatem w tym muzeum jest `expression(eval(document.documentElement.scrollTop))`, formalnie nazywane "Dynamic Properties". Microsoft wprowadził je w Internet Explorerze 5, żeby załatać braki ówczesnego CSS, między innymi brak `position: fixed`. Problem w tym, że wyrażenia przeliczały się przy każdym renderze, resize'ie, scrollu, a nawet ruchu myszką nad stroną, więc ktoś mógł bez trudu napisać styl zależny od aktualnej godziny przez `Date()` i przeciążyć przeglądarkę pracą, której nikt się nie spodziewał.

Obok tego autor katalogu wymienia całą serię innych sztuczek: gwiazdkowy prefiks działający tylko w IE7 i starszych, podwójne znaczenie `!important` w postaci `!interesting` czy `!banana`, które IE7 traktowało identycznie jak prawdziwe `!important`, oraz `zoom: 1` jako sposób na nadanie elementowi "layoutu" w erze, gdy IE miał wewnętrzną flagę `hasLayout` decydującą, czy element w ogóle sam się renderuje. Do tego dochodzi HTML Components, funkcja pozwalająca podpiąć pod selektor CSS cały skrypt w JScripcie przez atrybut `behavior`, czyli prapoczątek czegoś, co dziś kojarzylibyśmy raczej z Web Components niż z arkuszem stylów.

Najsłynniejszy z opisanych trików to Box Model Hack Tanteka Çelika, wykorzystujący błąd parsera w IE5, który przy właściwości `voice-family` mylnie interpretował ciąg `"\"}\""` jako zamknięcie bloku CSS. Dzięki temu jedna reguła szerokości trafiała tylko do przeglądarek zgodnych ze specyfikacją, a druga, przed nią, tylko do błędnie parsujących IE5 i 5.5, co pozwalało naprawić różnice w liczeniu paddingu i marginesów w modelu pudełkowym bez pisania osobnych arkuszy stylów.

**Key takeaways:**
- CSS Expressions w IE5 pozwalały uruchamiać dowolny JavaScript wewnątrz wartości właściwości CSS, z realnym kosztem wydajnościowym
- `hasLayout` w starych IE wymuszało hacki typu `zoom: 1`, żeby elementy w ogóle poprawnie się renderowały
- Box Model Hack wykorzystywał błąd parsowania `voice-family`, żeby kierować różne reguły do różnych silników przeglądarek

**Why do I care:** To dobra lektura na dzień, w którym znów kłócimy się o "web platform fatigue", bo pokazuje, że frontend zawsze radził sobie z fragmentacją przeglądarek przez brzydkie, kruche obejścia, zanim dostał porządne narzędzia jak feature queries czy CSS anchor positioning. Warto to pamiętać, zanim ktoś nazwie dzisiejsze niuanse `:has()` czy kontenerowych zapytań "najgorszym momentem CSS w historii".

**Link:** [CSS Curiosities of the Past](https://vale.rocks/posts/css-relics)

## Pucz w zarządzie Automattic: Mullenweg odsunięty, po dwóch dniach twierdzi, że wrócił

**TLDR:** Zarząd Automattic głosował za odsunięciem Matta Mullenwega od funkcji CEO i tymczasowo powierzył stery CFO Markowi Daviesowi. Dwa dni później Mullenweg ogłosił na Slacku, że "jest z powrotem w kontroli nad firmą", choć zarząd tego oficjalnie nie potwierdził.

**Summary:** Mullenweg dowiedział się o głosowaniu 50 minut przed posiedzeniem zarządu i, jak twierdzi, nie dostał czasu na konsultację z niezależnym prawnikiem. W wiadomości na Slacku napisał, że CFO Mark Davies "spiskował" z trzema innymi członkami zarządu, żeby wysłać go na płatny urlop. Automattic potwierdził sprawę oficjalnym oświadczeniem, w którym zarząd wyraził "pełne zaufanie" do przywództwa Daviesa jako tymczasowego CEO. WordPress.org, formalnie osobny projekt open source, zapewnił, że sprawa nie dotyczy jego działania, a Mullenweg wciąż prowadzi sam projekt WordPressa niezależnie od stanowiska w spółce komercyjnej.

Sytuacja szybko zamieniła się w spektakl. Mullenweg zaczął publikować na X aluzje sugerujące, że firma hostingowa WP Engine i fundusz Silver Lake stoją za próbą "zniszczenia jego życia", w kontekście toczącego się od 2024 roku sporu prawnego o tantiemy za markę WordPress. Dwa dni po odsunięciu ogłosił na Slacku "jestem z powrotem w kontroli", usunął wszystkich adminów kanału, a konto Daviesa zostało dezaktywowane. Executive Director WordPress.org napisała na X, że jest "zadowolona z powrotu Mullenwega", ale sam zarząd nie potwierdził niczego oficjalnie, więc nie do końca wiadomo, czy to prawdziwy powrót władzy, czy Mullenweg po prostu ogłosił zwycięstwo, zanim faktycznie je odniósł.

**Key takeaways:**
- Zarząd Automattic zagłosował za odsunięciem Mullenwega bez uprzedzenia, powierzając stery CFO Markowi Daviesowi
- Mullenweg ogłosił na Slacku "powrót do kontroli" dwa dni później, bez oficjalnego potwierdzenia zarządu
- Sytuacja nakłada się na toczący się od 2024 roku spór prawny z WP Engine o tantiemy za markę WordPress

**Why do I care:** Dla każdego, kto buduje na WordPressie albo WooCommerce, to sygnał do obserwowania, nie do paniki, bo WordPress.org jako projekt open source formalnie stoi obok tej awantury korporacyjnej. Ale burzliwe zarządzanie Automattic w ostatnich latach, zwolnienia, procesy sądowe, teraz pucz w zarządzie, to dobry argument, żeby przy dużych wdrożeniach na tym ekosystemie mieć plan B niezależny od kondycji jednej spółki.

**Link:** [Automattic's board forces CEO Matt Mullenweg into leave of absence](https://techcrunch.com/2026/09/09/automattics-board-forces-ceo-matt-mullenweg-into-leave-of-absence/)

## Dlaczego CSS-Tricks ucichło: Geoff Graham mówi wprost, że nie może dłużej pracować za darmo

**TLDR:** Geoff Graham, od lat jedyna osoba prowadząca CSS-Tricks, ogłosił, że wstrzymuje publikacje na czas nieokreślony. Powód: nie stać go na dalszą pracę bez wynagrodzenia, a DigitalOcean, właściciel serwisu, nie ma nikogo wyznaczonego do przejęcia obowiązków.

**Summary:** Wpis jest krótki i osobisty. Graham pisze, że nie publikował nic od 31 sierpnia, co jest nietypowe dla serwisu przyzwyczajającego czytelników do 2-5 artykułów tygodniowo, i że kilku czytelników już to zauważyło i napisało do niego. Nie ujawnia szczegółów sporu z DigitalOcean, ale jasno mówi, że pauza nie wynika z jego wyboru, tylko z sytuacji, w której "dosłownie nie może pozwolić sobie na pracę za darmo przez kolejne miesiące".

**Key takeaways:**
- CSS-Tricks nie publikował nic od 31 sierpnia 2026, mimo zwykłej częstotliwości 2-5 artykułów tygodniowo
- Geoff Graham prowadzi serwis samodzielnie od lat, bez nikogo wyznaczonego przez DigitalOcean do zastępstwa
- Brak jasnego terminu wznowienia publikacji

**Why do I care:** CSS-Tricks było przez dekadę jednym z najbardziej wiarygodnych źródeł wiedzy o CSS dla całej branży, więc jego cichnięcie to strata, nawet jeśli firma-właściciel formalnie istnieje dalej. To też przypomnienie, jak kruche bywają instytucje branżowe, kiedy stoją na jednej osobie i budżecie korporacji, dla której to nie jest priorytet biznesowy.

**Link:** [Why CSS-Tricks Has Been Quiet Lately](https://geoffgraham.me/why-css-tricks-has-been-quiet/)

## Argumenty przeciwko JPEG XL w przeglądarkach, od inżyniera kompresji obrazu

**TLDR:** Autor, zawodowo zajmujący się kompresją wideo i obrazu, wyjaśnia, dlaczego mimo powrotu dyskusji o JPEG XL po pojawieniu się dekodera w Rust w Firefoksie i Chrome, format wciąż nie ma sensu jako dodatek do przeglądarek. AVIF jest szybszy w dekodowaniu, ma lepsze wsparcie dla progresywnego renderowania i realnie dominuje w kompresji stratnej.

**Summary:** Kluczowy argument dotyczy tego, gdzie JPEG XL faktycznie wygrywa, czyli w kompresji bezstratnej, która jest zaledwie około 12 procent lepsza od bezstratnego WebP i to na nierealistycznym zestawie testowym złożonym ze zdjęć 157-megapikselowych. Większość ruchu w sieci to kompresja stratna, a tam AVIF od dawna wygrywa dzięki lepszemu strojeniu perceptualnemu enkodera referencyjnego AV1 i trybom takim jak SVT-AV1.

Autor rozkłada też na czynniki pierwsze techniczne słabości JPEG XL: brak trybów predykcji kierunkowej (stąd gorsze zachowanie krawędzi obrazu), brak właściwego filtra deblokującego, kolorystyka XYB, która w praktyce wymaga agresywnej kwantyzacji kanału B kosztem wierności kolorów, oraz drogi mechanizm łatek zamiast czegoś w rodzaju Intra Block Copy z AV1. Najbardziej przekonujący argument dotyczy jednak czasu dekodowania: przy porównywalnym rozmiarze pliku WebP dekoduje się ponad 10 razy szybciej niż JPEG XL przez nowy dekoder w Rust, a specyfika formatu pozwala skonstruować obraz ważący niecałe 2 kilobajty, którego dekodowanie trwa ponad 17 sekund, bo silnik przy okazji liczy liczby pierwsze do 33599. To już nie jest teoretyczne ryzyko, tylko gotowy przepis na spowolnienie słabszych urządzeń kilkoma obrazkami na stronie.

**Key takeaways:**
- Przewaga JPEG XL nad WebP w kompresji bezstratnej to około 12% na nierealistycznym zestawie testowym, więc w praktyce marginalna
- AVIF dekoduje się szybciej niż JPEG XL nawet o rząd wielkości przy porównywalnym rozmiarze pliku
- Elastyczność formatu JPEG XL pozwala skonstruować obrazek ważący 2 KB, którego dekodowanie trwa kilkanaście sekund, co jest realnym wektorem spowolnienia strony

**Why do I care:** Dla kogoś odpowiadającego za wydajność frontendu to konkretny argument do zamknięcia dyskusji "czy dodać wsparcie dla JPEG XL", bo autor nie neguje jakości formatu, tylko pokazuje, że dla typowego ruchu webowego AVIF już wygrał tę bitwę. Ciekawe jest też ryzyko bezpieczeństwa, elastyczność formatu jako furtka do prymitywnego DoS-a przez pojedynczy obrazek, o czym warto pamiętać przy każdej dyskusji "czy nowy format image to zawsze czysty zysk".

**Link:** [The case against JPEG XL](https://giannirosato.com/blog/post/case-against-jxl/)

## Jak metryki aplikacji złapały błąd w estymatorze rozmiaru pliku napisanym przez AI

**TLDR:** Autor open source'owego narzędzia do konwersji wideo w przeglądarce użył Sentry Application Metrics, żeby zmierzyć dokładność swojego estymatora rozmiaru pliku wyjściowego. Okazało się, że pierwsza wersja, napisana przez agenta AI, myliła się nawet o 83 procent, bo błędnie uwzględniała rozdzielczość zamiast tylko bitrate i czasu trwania.

**Summary:** Historia zaczyna się od prostego pytania: skoro rozmiar pliku wideo to w teorii `bitrate razy czas trwania`, to dlaczego estymator w aplikacji się myli? Zamiast ręcznie testować kombinacje formatów i ustawień jakości, autor podpiął anonimowe metryki bezpośrednio do publicznego narzędzia konwersji, rejestrując tylko liczby, nigdy pliki, nazwy czy adresy URL, bo społeczność self-hosted nie lubi telemetrii, a zmieniać flow instalacji się nie chciało.

Dashboard z rozkładem stosunku rzeczywistego rozmiaru do estymowanego szybko pokazał winowajcę: stara "formuła sugerowana przez AI" dawała pliki od 30 do 83 procent większe niż obiecane, podczas gdy prosta formuła bitrate razy czas trwania mieściła się w granicach 5 procent błędu. Gdy autor wrócił do kodu napisanego przez agenta, znalazł linijkę mnożącą rozmiar źródłowy przez stosunek docelowej do źródłowej wysokości obrazu, mimo że rozdzielczość nie wchodzi w ogóle do wzoru na rozmiar pliku przy stałym bitrate. Podejrzewa, że dopytujące pytanie w stylu "a co jeśli zmienimy rozdzielczość" niechcący skierowało model w stronę bardziej "przemyślanej", ale błędnej odpowiedzi zamiast prostszej poprawnej.

Przy okazji ten sam dashboard, bez szukania na siłę, ujawnił dwa dodatkowe problemy: tryb kopiowania kontenera bez ponownego kodowania zawyżał estymację o 16 procent, a estymator GIF-ów systematycznie zawyżał wynik o około 9 procent. Autor podkreśla różnicę między metrykami, logami i trace'ami: metryki nadają się do liczb, które chcesz mierzyć zawsze i bez próbkowania, logi do stanu aplikacji do debugowania, a trace'y do śledzenia pojedynczej jednostki pracy w czasie, i miesza tych narzędzi nie warto.

**Key takeaways:**
- Estymator napisany przez AI mylił się nawet o 83%, bo błędnie uwzględniał rozdzielczość obrazu zamiast tylko bitrate i czasu trwania
- Anonimowe metryki (bez plików, nazw czy URL-i) wystarczyły do znalezienia błędu bez naruszania prywatności użytkowników self-hosted
- Dashboard przy okazji wykrył dwa dodatkowe problemy z estymacją (tryb kopiowania i GIF-y), których autor nie szukał celowo

**Why do I care:** To konkretny, mierzalny przykład na to, dlaczego kod od agenta trzeba weryfikować danymi produkcyjnymi, a nie tylko czytaniem diffa, bo błąd wyglądał sensownie na pierwszy rzut oka i przechodził ręczne testy autora. Dla zespołów wdrażających dużo kodu z AI to dobry wzorzec: tanie metryki zamiast pełnego tracingu wystarczą, żeby złapać systematyczne odchylenia, zanim użytkownicy zaczną się skarżyć.

**Link:** [Using Application Metrics to fix a broken size estimator](https://blog.sentry.io/metrics-caught-ai-size-estimate/)

## Przypisy na marginesie bez JavaScriptu dzięki CSS anchor positioning

**TLDR:** Autor opisuje, jak zbudować przypisy boczne (sidenotes) wyświetlane w marginesie strony, korzystając wyłącznie z CSS anchor positioning, bez JavaScriptu, z sensownym fallbackiem pod przypisem na wąskich ekranach i w starszych przeglądarkach.

**Summary:** W przeciwieństwie do klasycznego rozwiązania z Tufte CSS, które wymaga, żeby treść przypisu była wpleciona inline w miejscu odniesienia, ta technika pozwala umieścić element `<aside>` z przypisem od razu za akapitem, do którego się odnosi, więc czytniki tekstowe, czytniki ekranu i tryb czytnika w przeglądarce widzą go we właściwym miejscu dokumentu. Mechanizm opiera się na powiązaniu znacznika odniesienia i przypisu przez wspólną nazwę kotwicy w atrybucie `data-anchor`, odczytywaną funkcją `attr()` z jawnym typem `<custom-ident>`, a następnie wykorzystaną przez `anchor-name` i `position-anchor`.

Najciekawszy fragment dotyczy pozycjonowania pionowego kolejnych przypisów względem siebie. Funkcja `anchor()` pozwala ustawić górną krawędź przypisu względem dolnej krawędzi poprzedniego przypisu o tej samej nazwie kotwicy, z wartością zapasową, gdy taki poprzedni przypis nie istnieje, więc `max()` z dwóch możliwych pozycji automatycznie rozstrzyga, czy przypis powinien wyrównać się do znacznika odniesienia, czy zsunąć niżej, żeby nie nachodzić na poprzedni. Całość działa w warstwie `@supports`, więc na wąskich viewportach i starszych przeglądarkach przypis po prostu zostaje zwykłym blokiem pod akapitem, ostylowanym na wyciszony kolor tekstu.

**Key takeaways:**
- Przypisy jako `<aside>` za akapitem zamiast inline zachowują poprawną semantykę dla czytników tekstowych i ekranu
- `anchor()` z parametrem poprzedniej kotwicy i wartością zapasową pozwala automatycznie unikać kolizji kolejnych przypisów w marginesie
- Cała technika degraduje się do zwykłego bloku pod tekstem na wąskich ekranach i w przeglądarkach bez wsparcia dla CSS anchor positioning

**Why do I care:** To dobry, konkretny przykład na to, że CSS anchor positioning dojrzało do realnych zastosowań poza demo, a nie tylko do tooltipów i dropdownów, o których zwykle się o nim mówi. Dla kogoś budującego bloga technicznego czy dokumentację to gotowy wzorzec do skopiowania zamiast kolejnej biblioteki JS do przypisów.

**Link:** [Sidenotes with CSS anchor positioning](https://vincent.bernat.ch/en/blog/2026-css-sidenotes)

## WCAG 3 grozi zamianą w dokument, którego nikt nie będzie chciał spełniać w całości

**TLDR:** Ekspert dostępności krytykuje projekt WCAG 3 za wprowadzenie opcjonalnych "wymagań uzupełniających" i "zapewnień" na wzór poziomów AAA w WCAG 2, twierdząc, że to powtórka tego samego błędu: nikt nigdy nie dbał o AAA, więc nikt też nie będzie dbał o odznaki Brąz/Srebro/Złoto.

**Summary:** Dobra wiadomość jest taka, że WCAG 3 łączy dotychczasowe poziomy A i AA w jeden bazowy zestaw wymagań podstawowych, kończąc z niejasnym rozróżnieniem, które przez 15 lat i tak było w praktyce wymuszane prawem w całości. Zła wiadomość to reszta struktury: grupa robocza W3C dodała "wymagania uzupełniające" (kolejne, opcjonalne kryteria, podobne do AAA) oraz "zapewnienia", czyli obietnice wykonania konkretnych działań, jak przegląd pomocy wizualnych czy posiadanie przewodnika stylu dla wskaźnika fokusu.

Autor argumentuje, że mieszanie obowiązkowych wymagań podstawowych z nieobowiązkowymi w jednym dokumencie czyni go trudnym do skanowania i zrozumienia, a odznaka "WCAG 3 Brąz" nic realnie nie mówi użytkownikowi, bo dwie strony mogą spełniać zupełnie inny zestaw wymagań uzupełniających i nazywać się tak samo. Proponowanym rozwiązaniem są moduły: zamiast jednego rosnącego dokumentu, osobne pakiety wymagań, na przykład dla napisów czy języka łatwego do czytania, które organizacje mogłyby świadomie wybierać i deklarować wprost, w stylu licencji Creative Commons. To dałoby też politykom możliwość precyzyjnego wymuszania konkretnych modułów prawem, zamiast całego rozmytego poziomu.

**Key takeaways:**
- WCAG 3 łączy poziomy A i AA WCAG 2 w jeden bazowy zestaw wymagań podstawowych, co samo w sobie jest postępem
- Opcjonalne "wymagania uzupełniające" i "zapewnienia" ryzykują powtórzenie losu poziomu AAA, który w praktyce nikt nie realizował
- Autor proponuje modułową strukturę zamiast odznak Brąz/Srebro/Złoto, żeby zgodność była konkretna i możliwa do precyzyjnego wymuszenia prawem

**Why do I care:** Dla zespołów, które już dziś planują budżet pod zgodność z przyszłym WCAG 3, to sygnał, żeby nie czekać z zapartym tchem na "poziom Złoto" jako cel, tylko traktować bazowe wymagania podstawowe jako jedyny realny punkt odniesienia, dokładnie tak jak dziś nikt poważnie nie mierzy się z AAA. Krytyka dotyczy głównie procesu W3C, ale konsekwencje spadną na każdego, kto będzie musiał tłumaczyć klientowi, co faktycznie oznacza odznaka na stronie.

**Link:** [WCAG 3's road to hell is paved with supplemental requirements](https://yatil.net/blog/wcag-3-road-to-hell-paved-with-supplemental-requirements)

## StyleX: dlaczego język stylowania zaprojektowany pod restrykcje może być lepszy dla agentów niż dla ludzi

**TLDR:** Obszerny tutorial pokazuje, jak StyleX kompiluje obiekty stylów w JavaScripcie do zwykłego CSS w czasie builda, z tokenami, wariantami, motywami i stylami warunkowymi. Ciekawszy od samego tutorialu jest argument autora: StyleX może być bardziej trafnym wyborem właśnie wtedy, gdy większość UI piszą agenty kodujące, a nie ludzie.

**Summary:** StyleX wygląda jak CSS-in-JS w trakcie pisania, ale przeglądarka nigdy nie widzi JavaScriptu odpowiedzialnego za style, bo cała logika jest wyciągana statycznie podczas builda do atomowych klas CSS, gdzie każda deklaracja własności dostaje osobną, wielokrotnie używaną klasę. Dzięki temu arkusz stylów rośnie wolniej niż aplikacja, bo powtarzające się pary właściwość-wartość współdzielą tę samą wygenerowaną klasę zamiast duplikować się w kolejnych blokach komponentów. Meta twierdzi, że to napędza dziś Facebooka, Instagrama, WhatsAppa, Messengera i Threads, a Linear w 2026 roku przeniósł swoje aplikacje React ze styled-components na StyleX w ponad tysiącu pull requestów.

Najciekawszy wątek dotyczy tego, dlaczego akurat teraz StyleX ma sens. Autor zauważa, że Tailwind wygrywa z ludźmi dzięki krótkim, szybkim do wpisania klasom, ale to przewaga, która przestaje się liczyć, kiedy większość kodu UI pisze agent, a nie programista przy klawiaturze. StyleX narzuca za to znacznie mniejszą przestrzeń akceptowalnych wyborów: znane nazwy właściwości CSS, style zdefiniowane wyłącznie przez `stylex.create()`, kompozycję wyłącznie przez `stylex.props()`, wspólne wartości tylko przez tokeny, i żadnych selektorów sięgających do odległych elementów. Ta sama wartość odstępu w Tailwindzie czy zwykłym CSS może się zmaterializować jako `16px`, `1rem`, zmienna niestandardowa albo liczba skopiowana z sąsiedniego komponentu, wszystkie dające ten sam efekt wizualny, ale rozjeżdżające bazę kodu. StyleX po prostu odbiera agentowi większość tych opcji z góry, dzięki czemu recenzja kodu może się skupić na tym, czy interfejs jest poprawny, a nie na normalizowaniu kolejności klas czy przypadkowych wartości.

Koszt tej dyscypliny jest realny: konfiguracja bundlera zamiast zaimportowania jednego pliku CSS, dłuższa składnia niż `class="px-4"`, oraz cały ekosystem gotowych komponentów kopiuj-wklej zbudowany pod Tailwind, który trzeba by konwertować. Autor byłby ostrożny z migracją małego, działającego projektu tylko po to, żeby spróbować StyleX, ale poleciłby go dla nowej aplikacji z rosnącą biblioteką komponentów, zwłaszcza jeśli duża część kodu ma powstawać z udziałem agentów.

**Key takeaways:**
- StyleX kompiluje obiekty stylów JS do atomowego CSS w czasie builda, bez żadnego JS odpowiedzialnego za style w produkcji
- Linear przeniósł swoje aplikacje React ze styled-components na StyleX w ponad 1000 PR-ach w 2026 roku
- Ograniczona przestrzeń wyborów StyleX (tokeny, `stylex.create()`, brak selektorów odległych) ma być zaletą właśnie wtedy, gdy większość kodu UI piszą agenty, nie ludzie

**Why do I care:** To pierwszy tekst, jaki widziałem, który stawia sprawę odwrotnie niż zwykła narracja "Tailwind wygrywa, bo jest szybki do pisania", bo pyta, co się liczy, kiedy szybkość pisania przestaje być wąskim gardłem. Dla architekta frontendowego to konkretne kryterium do dodania przy wyborze systemu stylowania na nowy projekt: nie tylko ergonomia dla człowieka, ale też to, jak bardzo system zawęża przestrzeń błędów, które może popełnić agent piszący większość kodu.

**Link:** [A deep dive into StyleX](https://flaviocopes.com/stylex/)

## Przeglądarki otwierają się na agenty: Safari dostaje własny serwer MCP, a WebMCP walczy o status standardu

**TLDR:** Safari 27 wprowadza wbudowany serwer MCP, pozwalający agentom AI otwierać karty, czytać DOM, robić zrzuty ekranu i symulować kliknięcia bezpośrednio w przeglądarce. Równolegle OpenAI, Google, Cloudflare, Shopify, Netlify i Vercel promują WebMCP, wciąż jedynie wstępny szkic W3C, jako sposób na to, żeby strony same udostępniały agentom gotowe narzędzia zamiast zmuszać je do zgadywania interfejsu przez zrzuty ekranu.

**Summary:** Serwer MCP w Safari 27 to narzędzie deweloperskie, nie funkcja dla użytkowników końcowych: po włączeniu zdalnej automatyzacji w ustawieniach Safari, agent podłączony przez Claude Code czy Codex dostaje dostęp do konkretnych narzędzi, jak `evaluate_javascript`, `screenshot`, `list_network_requests` czy `page_interactions`, więc może realnie testować kompatybilność, dostępność i interakcje strony, zamiast polegać na zrzutach ekranu i zgadywaniu selektorów. To wyraźnie inna kategoria niż WebMCP, opisywane w drugim materiale jako coś, co witryny dobrowolnie eksponują na własnych stronach, żeby ułatwić agentom wykonywanie akcji w imieniu użytkownika, jak wypełnienie formularza czy dodanie produktu do koszyka, bez wysyłania dziesiątek zrzutów ekranu i zrzutów DOM do centrów danych.

WebMCP jest technicznie wciąż tylko szkicem grupy roboczej W3C, nie ścieżką standardową, a jego API zmienia się pod nogami implementerów: `provideContext()` i `clearContext()` zostały usunięte w marcu, samodzielne `unregisterTool()` ustąpiło miejsca `AbortSignal`, a całe API przeniosło się z `navigator` na `document`. Microsoft współautoryzował specyfikację, ale schował ją za flagą w Edge, co samo w sobie mówi sporo o tym, jak bardzo firma wierzy w ten kierunek. Autor zwraca uwagę na realny konflikt interesów: Amazon pozwał Perplexity w listopadzie 2025 roku za to, że użytkownicy robili zakupy przez agentową przeglądarkę Comet, wygrał wstępny zakaz, ale przegrał go w sierpniu 2026 roku w apelacji, a Dziewiąty Okręg Apelacyjny uznał, że skoro to użytkownik kieruje agentem, dostęp należy do użytkownika, nie do Perplexity. Shopify z kolei aktywnie wspiera agentowe zakupy razem z OpenAI, bo jego klientami są sprzedawcy, nie kupujący, więc ujednolicenie doświadczenia zakupowego przez jeden agentowy interfejs im nie zagraża tak, jak Amazonowi.

Na poziomie bezpieczeństwa WebMCP oferuje na razie tylko dwie adnotacje: `readOnlyHint`, oznaczającą narzędzia niezmieniające stanu, oraz `untrustedContentHint`, oznaczającą treść pochodzącą z niekontrolowanego źródła jak komentarze czy treści syndykowane. Metoda `requestUserInteraction()`, pozwalająca narzędziu zatrzymać się i zapytać człowieka w trakcie wykonania, wciąż istnieje tylko w interfejsie bez żadnego normatywnego algorytmu za nią, a zarządzanie zgodą użytkownika to wciąż otwarta dyskusja w grupie roboczej. Prompt injection pozostaje nierozwiązanym problemem: agent, który przeczytał coś niezaufanego, może dać się namówić do wywołania narzędzia, którego wywoływać nie powinien.

**Key takeaways:**
- Safari 27 ma wbudowany serwer MCP dla deweloperów, z narzędziami do inspekcji DOM, zrzutów ekranu i symulowania interakcji, podłączany przez Claude Code lub Codex
- WebMCP to wciąż tylko szkic W3C ze zmieniającym się API, promowany wspólnie przez OpenAI, Google i partnerów handlowych jak Shopify
- Bezpieczeństwo WebMCP opiera się na dwóch adnotacjach (`readOnlyHint`, `untrustedContentHint`), a prompt injection pozostaje otwartym problemem bez rozwiązania

**Why do I care:** Warto rozdzielić te dwie rzeczy: serwer MCP w Safari to dziś przede wszystkim wygodniejsze narzędzie deweloperskie do testowania, które można zacząć używać już teraz bez ryzyka, podczas gdy WebMCP na stronach produkcyjnych to zakład na przyszłość z realnym ryzykiem prompt injection i niedojrzałym API. Zanim ktoś doda WebMCP do własnej strony, warto zapytać, czy klienci już używają agentowych przeglądarek na tyle często, żeby uzasadnić utrzymywanie kolejnej powierzchni ataku, a nie robić tego tylko dlatego, że robi to Shopify.

**Link:** [Google and OpenAI Want Your Site to Talk to Agents](https://agenticweb.nearestnabors.com/p/webmcp-agentic-web-openai-google)
