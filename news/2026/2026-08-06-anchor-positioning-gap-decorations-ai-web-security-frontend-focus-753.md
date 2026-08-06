---
title: "Anchor positioning kocha każdy, gap decorations już działają, a web coraz częściej udaje kogoś innego"
excerpt: "CSS dojrzewa szybciej niż wsparcie przeglądarek, Chrome zbroi się w AI po obu stronach barykady, a wydawcy zaczynają serwować botom zupełnie inną wersję strony. Przegląd najważniejszych tematów z tego numeru Frontend Focus."
publishedAt: "2026-08-06"
slug: "anchor-positioning-gap-decorations-ai-web-security-frontend-focus-753"
hashtags: "#frontendfocus #css #html #anchorpositioning #chrome #websecurity #generated #pl"
source_pattern: "Frontend Focus"
---

## Anchor Positioning wciąż jest waszą wymarzoną funkcją, której nie możecie użyć

**TLDR:** State of CSS 2026 potwierdza to, co już wszyscy czujemy: Anchor Positioning jest zarówno najbardziej lubianą, jak i najbardziej frustrującą nową funkcją CSS, bo wsparcie przeglądarek wciąż nie dogania entuzjazmu deweloperów.

**Summary:** Wyniki tegorocznej edycji State of CSS są momentami zabawne, bo pokazują, jak bardzo społeczność CSS rozjeżdża się z tym, co realnie można wdrożyć w produkcji. Anchor Positioning wygrało w kategorii najbardziej lubianej nowej funkcji i jednocześnie w kategorii funkcji, których ludzie najbardziej chcieliby używać, ale nie mogą przez problemy z kompatybilnością. To nie jest przypadek, to jest dokładnie ten sam mechanizm, który widzieliśmy przy container queries czy scroll-driven animations kilka lat temu, tylko teraz zapętlony w jednej ankiecie. Ciekawszy wątek dotyczy AI: mimo że reszta frontendu coraz chętniej oddaje kod modelom, CSS pozostaje twierdzą ręcznego pisania, bo według respondentów AI po prostu wciąż nie potrafi sensownie generować stylów. To akurat zgadza się z moim własnym doświadczeniem, modele radzą sobie świetnie z logiką i strukturą, a przy layoucie zaczynają zgadywać. Ankieta jest też mocnym przypomnieniem, że Interop, czyli coroczna zgoda przeglądarek na priorytetyzację konkretnych funkcji, ma realny wpływ na to, co deweloperzy w ogóle rozważają jako opcję.

**Key takeaways:**
- Anchor Positioning to jednocześnie najbardziej pożądana i najbardziej niedostępna funkcja CSS w 2026 roku.
- CSS opiera się trendowi generowania kodu przez AI bardziej niż inne warstwy frontendu.
- Interop wciąż jest realnym wyznacznikiem tego, które funkcje w końcu trafią do wszystkich silników.

**Why do I care:** Jako ktoś, kto planuje architekturę UI na lata do przodu, biorę takie ankiety jako sygnał priorytetów, nie jako zielone światło do wdrożenia. Fakt, że coś jest najbardziej wyczekiwaną funkcją, nie znaczy, że mogę ją postawić na produkcji bez fallbacku, ale znaczy, że warto już teraz projektować komponenty tak, żeby łatwo było je później podłączyć pod Anchor Positioning bez przepisywania całej logiki JS od zera.

**Link:** [State of CSS 2026](https://2026.stateofcss.com/en-US/)

## Anchor Positioning w praktyce: jak nie zepsuć tooltipa na krawędzi ekranu

**TLDR:** Josh Comeau rozkłada Anchor Positioning na czynniki pierwsze i pokazuje, że dwadzieścia procent tego API rozwiązuje osiemdziesiąt procent realnych problemów z tooltipami i dropdownami.

**Summary:** To jeden z tych artykułów, które warto zapisać sobie jako referencję, bo Comeau nie próbuje opisać całego API naraz, tylko skupia się na anchor-name, position-anchor i position-area, czyli minimalnym zestawie, który wystarcza do zbudowania tooltipa reagującego na brzegi viewportu. Najciekawszy fragment dotyczy position-try-fallbacks i flip-block, czyli mechanizmu, który sam decyduje, że tooltip powinien się przekręcić na drugą stronę elementu, gdy nie ma miejsca powyżej. To dokładnie ten kawałek logiki, który wcześniej pisaliśmy ręcznie w JS z pomocą getBoundingClientRect i który zawsze się psuł przy przewijaniu. Druga część artykułu, o anchored container queries pozwalających zmienić wygląd elementu w zależności od tego, który fallback został użyty, jest na razie ograniczona do Chromium, ale sam flip-block działa już wszędzie. Comeau szczerze przyznaje, że dla starszych przeglądarek nadal lepiej sięgnąć po bibliotekę JS, i to jest uczciwe podsumowanie stanu rzeczy.

**Key takeaways:**
- Minimalny zestaw właściwości anchor-name, position-anchor i position-area wystarcza do większości realnych przypadków.
- position-try-fallbacks i flip-block automatycznie przełączają pozycję elementu, gdy brakuje miejsca, bez ani jednej linii JS.
- Anchored container queries do stylowania na podstawie użytego fallbacku działają jak na razie tylko w Chromium.

**Why do I care:** Tooltipy i dropdowny to jeden z tych elementów UI, które w każdym projekcie kończą się jako osobna, wielokrotnie łatana biblioteka wewnętrzna. Jeśli flip-block faktycznie działa stabilnie we wszystkich głównych przeglądarkach, to jest to pierwszy moment, w którym mogę realnie rozważyć wycofanie jednej z tych zależności z popperem czy floating-ui w mniej krytycznych miejscach interfejsu.

**Link:** [Getting Started with Anchor Positioning](https://www.joshwcomeau.com/css/anchor-positioning/)

## Gap decorations dojrzały i zamieniły hacki z border w prawdziwą właściwość CSS

**TLDR:** CSS gap decorations trafiły do stabilnego Chrome i Edge, zamieniając stare sztuczki z pseudo-elementami na prawdziwe row-rule i column-rule, z dokładną kontrolą nad tym, gdzie i jak linie się przecinają.

**Summary:** Artykuł na CSS-Tricks jest napisany przez kogoś z zespołu Edge, który stał za standaryzacją tej funkcji, więc to rzadka okazja, żeby zobaczyć zmiany od strony osoby, która projektowała API, a nie tylko je opisuje z zewnątrz. Najważniejsza zmiana od wcześniejszych wersji to przemianowanie właściwości outset na inset, co brzmi kosmetycznie, ale realnie zmienia sposób myślenia o tym, jak linie wcinają się w obszar gapu. Dodano też osobne właściwości do kontrolowania końców i punktów przecięcia linii niezależnie, co pozwala na przykład zrobić eleganckie połączenie linii wierszy i kolumn w gridzie bez sztucznego doklejania elementów. Całość jest budowana jako rozszerzenie już istniejącego column-rule z layoutu wielokolumnowego, więc mentalnie nie trzeba uczyć się nowego modelu, tylko rozszerzyć znany. Autor od razu proponuje podejście progresywnego wzbogacania, czyli używać tego już teraz jako ozdobnika, który po prostu nie pojawi się w przeglądarkach bez wsparcia.

**Key takeaways:**
- Gap decorations rozszerzają istniejący column-rule na grid i flexbox, dodając też row-rule.
- Nowe właściwości typu rule-inset-cap i rule-overlap dają precyzyjną kontrolę nad końcami i przecięciami linii.
- Funkcja jest bezpieczna do użycia od razu jako progresywne wzbogacenie w Chrome i Edge.

**Why do I care:** Zawsze denerwowały mnie projekty, w których designer chce cienką linię między kartami w gridzie, a implementacja kończy się dodawaniem sztucznych divów albo box-shadow z ujemnym rozmyciem. Gap decorations to jeden z tych rzadkich przypadków, gdzie nowa funkcja CSS realnie usuwa kod, a nie tylko dodaje kolejną możliwość do zapamiętania.

**Link:** [Gap Decorations Are Now Available, Here's What's New](https://css-tricks.com/css-gap-decorations-now-available/)

## Chrome 151 wprowadza deklaratywne przechwytywanie kamery i mikrofonu

**TLDR:** Chrome 151 dodaje element usermedia jako deklaratywny sposób proszenia o dostęp do kamery i mikrofonu, wsparcie dla ręcznego przypisywania slotów w deklaratywnym shadow DOM oraz nowe metryki wydajności dla nawigacji w SPA.

**Summary:** Element usermedia jest naturalną kontynuacją tego, co zaczęło się od elementu geolocation, czyli próby przeniesienia zarządzania uprawnieniami z imperatywnego JavaScriptu do deklaratywnego HTML. Zamiast wołać getUserMedia i ręcznie obsługiwać cały cykl życia zgody, przeglądarka sama przechwytuje intencję użytkownika, pokazuje prompt i dostarcza obiekt MediaStream do aplikacji. To ma sens z perspektywy bezpieczeństwa, bo przeglądarka ma teraz bardziej ufny sygnał, że to faktycznie użytkownik chciał uruchomić kamerę, a nie skrypt trzeciej strony, który ukradkiem to zainicjował. Drugą wartą uwagi rzeczą jest atrybut shadowrootslotassignment, który pozwala budować deklaratywny shadow DOM z ręcznym przypisywaniem slotów bez ani jednej linii JS, co wcześniej wymagało trybu imperatywnego. Trzecia część, soft-navigation i interaction-contentful-paint, to rozszerzenie Performance Timeline pozwalające dokładniej mierzyć, co się dzieje przy zmianach trasy w SPA, gdzie klasyczne metryki jak LCP nie łapią kontekstu nawigacji sterowanej przez JS.

**Key takeaways:**
- Element usermedia zastępuje ręczne wywołania getUserMedia deklaratywnym, bardziej zaufanym mechanizmem zgody.
- shadowrootslotassignment na template pozwala na manualne przypisywanie slotów w deklaratywnym shadow DOM bez JS.
- Nowe typy wpisów w Performance Timeline mierzą interaction-driven latency w single-page applications.

**Why do I care:** Kapability elements, czyli cała ta rodzina deklaratywnych zamienników imperatywnych API do uprawnień, to trend, który warto śledzić, bo zmienia sposób, w jaki będziemy pisać integracje z hardware w przyszłości. Metryki soft-navigation są dla mnie ważniejsze praktycznie, bo w każdej większej aplikacji SPA, którą utrzymuję, klasyczne Core Web Vitals łapały tylko pierwszy load i były głuche na to, co dzieje się po pierwszej nawigacji klienckiej.

**Link:** [New in Chrome 151](https://developer.chrome.com/blog/new-in-chrome-151)

## Jednostka lh, czyli w końcu sensowny sposób na odstępy zależne od typografii

**TLDR:** Jednostka CSS lh, odpowiadająca obliczonej wartości line-height, rozwiązuje elegancko kilka klasycznych problemów typograficznych, od odstępów między paragrafami po wyrównanie obrazków do linii tekstu.

**Summary:** Ahmad Shadeed zbiera w jednym miejscu kilka zastosowań jednostki lh, które osobno można znaleźć rozsiane po różnych blogach, ale razem tworzą naprawdę przekonujący argument, żeby zacząć jej używać częściej. Najbardziej praktyczny przykład to margin-bottom ustawiony w lh zamiast w rem, dzięki czemu odstęp między paragrafami skaluje się razem z wysokością linii, a nie z arbitralną jednostką korzenia dokumentu. Drugi przykład, z liniami przypominającymi papier w linijkę renderowanymi jako powtarzający się gradient, pokazuje, jak łatwo takie triki się psują przy zmianie rozmiaru fontu, jeśli tło jest ustawione w pikselach czy rem, a naprawia się to samo, gdy background-size korzysta z lh. Najbardziej zaskakujący fragment to wyrównywanie wysokości obrazka do wielokrotności wysokości linii przy użyciu calc-size i round, co brzmi jak egzotyka, ale realnie rozwiązuje odwieczny problem obrazków floatowanych obok tekstu, które nigdy nie kończą się równo z ostatnią linią. Całość zamyka się przykładem z maskowaniem listy do pięciu linii, gdzie max-height w lh zamiast w pikselach automatycznie dopasowuje się do zmiany rozmiaru fontu użytkownika.

**Key takeaways:**
- margin w lh skaluje odstępy razem z line-height, zamiast trzymać je jako sztywną wartość w rem.
- Tła w stylu linii papieru trzeba liczyć w lh, inaczej rozjeżdżają się po zmianie rozmiaru fontu.
- Kombinacja calc-size i round pozwala wyrównać wysokość obrazka do pełnych linii tekstu.

**Why do I care:** Odstępy typograficzne są jednym z tych miejsc, gdzie projektanci i developerzy najczęściej się rozjeżdżają, bo design mówi w wielokrotnościach line-height, a kod ląduje w rem. Jednostka lh w praktyce zamyka tę różnicę języka między Figmą a CSS i to jest coś, co planuję wprowadzić w najbliższym systemie projektowym, zwłaszcza przy komponentach z dynamicznym rozmiarem fontu.

**Link:** [The CSS lh unit](https://ishadeed.com/article/lh-unit/)

## Element img ma sekretne życie i potrafi przelewać swoją zawartość poza siebie

**TLDR:** Element img jest jednocześnie kontenerem i swoją własną zawartością, co oznacza, że mimo braku dzieci w DOM potrafi realnie overflow'ować przez object-fit, object-position czy border-radius.

**Summary:** Ten artykuł jest świetnym przykładem tego, jak dobrze znany element HTML może nadal skrywać zaskakujące szczegóły, jeśli tylko ktoś zada sobie trud, żeby je opisać z odpowiedniego kąta. Kluczowa obserwacja jest taka, że img domyślnie ma overflow ustawiony na clip, ale ma co przycinać, bo zasób obrazkowy jest traktowany jako treść odseparowana od samego elementu kontenera, dokładnie tak jak w przypadku elementów typu replaced element, do których należy też na przykład iframe. Object-fit: cover jest najbardziej oczywistym przykładem tego mechanizmu, bo żeby zachować proporcje obrazka bez zniekształceń, przeglądarka musi przyciąć część zawartości wykraczającej poza kontener. Mniej znany jest fakt, że object-position może przesunąć treść obrazka poza jego granice bez wpływu na sam kontener, co autor wykorzystuje do zbudowania animowanego loadera z jednego elementu img i keyframes na object-position. Ostatnia część, o object-fit: none, pokazuje wartość, która nigdy nie skaluje zasobu do rozmiaru kontenera, więc jeśli kontener jest mniejszy niż intrinsic size obrazka, powstaje overflow, którym można świadomie żonglować w animacjach czy efektach hover.

**Key takeaways:**
- img jest elementem replaced, więc jego "treść" i "kontener" mają osobne wymiary, które mogą się rozjechać.
- object-fit: cover domyślnie przycina overflow, ale overflow: visible pozwala go pokazać i wykorzystać.
- Animowanie object-position przy object-fit: none daje ciekawe efekty bez dodatkowych elementów czy pseudo-elementów.

**Why do I care:** Lubię takie artykuły, bo pokazują, że nawet po kilkunastu latach pisania CSS wciąż można się zdziwić najbardziej podstawowym elementem HTML. Praktyczna wartość dla mnie leży w tych efektach hover i loaderach budowanych z jednego taga img bez dodatkowych divów, bo mniej znaczników to zawsze mniej miejsc, w których coś może się zepsuć w produkcji.

**Link:** [Something Nobody Told You About The Image Element](https://master.dev/blog/something-nobody-told-you-about-the-image-element-it-can-overflow/)

## Przyciski i linki to nie to samo, i HTML wciąż nie ma dobrego słownictwa na tę różnicę

**TLDR:** Autor propozycji Button Actions z projektu Triptych wyjaśnia, dlaczego mylenie przycisków z linkami jest anti-patternem, i pokazuje, jak nowe atrybuty action i method mogłyby to naprawić bez ani jednej linii JavaScriptu.

**Summary:** To jeden z tych tekstów, które porządkują coś, co większość z nas czuje intuicyjnie, ale rzadko umie precyzyjnie nazwać. Link reprezentuje miejsce docelowe, które można otworzyć w nowej karcie, skopiować, podglądnąć po najechaniu czy zapisać w zakładkach, a przycisk reprezentuje akcję wykonywaną w bieżącym kontekście, bez żadnej z tych funkcji. Autor rozbija popularny mit, że linki są od nawigacji, a przyciski od wszystkiego innego, pokazując, że przycisk logowania czy wyszukiwania też wykonuje nawigację, tylko w sposób, który nie ma sensu udostępniać, kopiować ani otwierać w nowej karcie. Najbardziej frustrującym punktem artykułu jest to, jak wiele znanych design systemów, w tym oficjalny US Web Design System, oferuje klasę zmieniającą link w coś wyglądającego jak przycisk, żeby obejść brak nawigacji na przyciskach w formularzach bez JS, co autor słusznie nazywa anti-patternem wspieranym przez same standardy. Propozycja Button Actions dodaje atrybuty action i method prosto do przycisku, więc zamiast fałszować semantykę linku, deweloperzy dostają natywny sposób na wywołanie GET czy DELETE bez formularza i bez skryptu.

**Key takeaways:**
- Link reprezentuje re-kontekstualizowalne miejsce docelowe, przycisk reprezentuje akcję w bieżącym kontekście.
- Stylowanie linku jak przycisku nie zmienia jego zachowania, więc łamie dostępność w trybie czytnika i menu kontekstowym.
- Propozycja Button Actions dodaje atrybuty action i method do przycisku, żeby wspierać GET i DELETE bez JS i bez formularza.

**Why do I care:** Ten artykuł powinien być obowiązkową lekturą dla każdego zespołu, który projektuje system komponentów, bo dziewięć na dziesięć razy widziałem "Cancel" albo "Delete" zaimplementowane jako link z rolą przycisku tylko dlatego, że tak było wygodniej w danym frameworku. To nie jest kosmetyka, to jest różnica między działającym i niedziałającym menu kontekstowym dla użytkownika, który nawet nie wie, że coś jest nie tak.

**Link:** [Buttons Vs Links](https://unplannedobsolescence.com/blog/buttons-vs-links/)

## Cheatsheets do flex, grid, anchor positioning i invoker commands od zespołu Polypane

**TLDR:** Zespół Polypane przygotował na CSS Day cztery estetyczne cheatsheety, do flexboxa, grida, anchor positioning i invoker commands, i udostępnił je bezpłatnie do pobrania w formie print-ready PDF.

**Summary:** To krótka, ale praktyczna notka, bo Polypane wybrało akurat te cztery tematy nieprzypadkowo, są to obszary CSS i HTML, w których nawet doświadczeni developerzy regularnie zapominają dokładną składnię i wracają do dokumentacji. Anchor positioning i invoker commands trafiły na listę jako świeże funkcje, przy których łatwo się pomylić, a flexbox i grid jako klasyki, które teoretycznie znamy na pamięć, a w praktyce co drugi tydzień sprawdzamy różnicę między justify-content i align-items. Cheatsheety są zaprojektowane jako fizyczne karty na biurko, z matowym wykończeniem i zaokrąglonymi rogami, ale wersja online odwzorowuje ten sam wygląd przy najechaniu kursorem, co jest sympatycznym detalem. Nie ma tu przełomowej treści merytorycznej, ale jako szybka ściągawka do trzymania pod ręką podczas codziennej pracy to naprawdę solidny, darmowy zasób.

**Key takeaways:**
- Cztery darmowe cheatsheety do pobrania: flexbox, grid, anchor positioning i invoker commands.
- Materiały są przygotowane w formacie A5, print-ready, z 3mm spadem.
- Zestaw skupia się na obszarach CSS, gdzie nawet doświadczeni developerzy najczęściej zaglądają do dokumentacji.

**Why do I care:** Zawsze doceniam dobrze zaprojektowane materiały referencyjne bardziej niż kolejny długi artykuł, bo w codziennej pracy nie potrzebuję wykładu, potrzebuję jednej strony, na którą rzucę okiem i wrócę do kodu. Wydrukowany cheatsheet na biurku to też dobry sposób na wdrażanie młodszych osób w zespole bez zalewania ich linkami do MDN.

**Link:** [Cheatsheets for flex, grid, anchor positioning and invoker commands](https://polypane.app/blog/cheatsheets-for-flex-grid-anchor-positioning-and-invoker-commands/)

## Nauczyliśmy się centrować divy, a potem przeglądarki dodały panele boczne

**TLDR:** Autor pokazuje, że nawet trywialne wyśrodkowanie diva w gridzie przestaje działać intuicyjnie, gdy przeglądarka ma otwarty panel boczny, i opisuje, jak próbował to naprawić za pomocą różnicy szerokości okna i webview.

**Summary:** To jeden z tych postów, które zaczynają się od żartu, a kończą realnym problemem inżynierskim. Klasyczne wyśrodkowanie z display grid i place-items center działa świetnie w izolacji, ale gdy przeglądarka ma otwarty pasek boczny, zajmujący realną przestrzeń wewnątrz okna, treść zostaje wyśrodkowana względem pozostałej przestrzeni, a nie względem całego okna, co dla użytkownika, który siedzi na środku ekranu, wygląda po prostu na przesunięte. Autor próbuje policzyć różnicę między window.innerWidth i window.outerWidth, żeby przesunąć kontener o połowę tej różnicy, co działa do momentu, kiedy otwiera DevTools i różnica zaczyna zawierać także szerokość panelu narzędzi dewelopera, bez możliwości odróżnienia, z której strony pochodzi. Rozwiązaniem okazuje się użycie danych ze zdarzenia pointer, które zna swoją pozycję jednocześnie względem ekranu i względem viewportu, co pozwala matematycznie zlokalizować webview wewnątrz okna przeglądarki, choć Firefox robi to prościej niż Chromium. Cała historia kończy się rozszerzeniem przeglądarkowym, które traktuje tę korektę jako opcję opt-in wybieraną przez użytkownika, a nie coś, co strona wymusza na każdym odwiedzającym, i to jest chyba najważniejsza konkluzja całego tekstu.

**Key takeaways:**
- Panele boczne przeglądarki zmieniają realną przestrzeń webview, przez co klasyczne centrowanie CSS przestaje odpowiadać centrowaniu względem całego okna.
- Zdarzenia pointer niosą jednocześnie koordynaty ekranowe i viewportowe, co pozwala matematycznie zlokalizować webview w oknie.
- Autor uznaje, że taka korekta powinna być decyzją użytkownika w rozszerzeniu, nie czymś wymuszonym przez stronę.

**Why do I care:** To dobre przypomnienie, że "wyśrodkowane" na sztywno zdefiniowanym viewporcie i "wyśrodkowane" z perspektywy człowieka patrzącego na ekran to dwie różne rzeczy, a różnica staje się widoczna dopiero, gdy przeglądarki zaczynają dodawać własne UI wewnątrz strony, jak panele boczne w Edge czy Arc. Sam nie rzuciłbym się poprawiać tego na produkcji, ale doceniam, że ktoś w ogóle zauważył problem i pokazał eleganckie obejście z użyciem zdarzeń pointer.

**Link:** [we finally learned to center a div, then browsers added sidebars](https://seg6.space/posts/center-div/)

## Bezpieczeństwo webu jest za trudne nawet dla ludzi, którzy się na nim znają

**TLDR:** Autor, doświadczony badacz bezpieczeństwa, prawie zgłosił legalny produkt Cloudflare jako phishing, bo strona łamała prawie każdą dobrą praktykę UX w komunikacji zgód i domen, co pokazuje, jak łatwo pomylić prawdziwą stronę z atakiem.

**Summary:** Historia zaczyna się niewinnie, od tweeta o nowym produkcie Cloudflare, ale szybko przechodzi w istny poradnik tego, jak nie budować flow zgody użytkownika. Strona logowania znajdowała się na domenie cloudflare.pay, zamiast pod cloudflare.com, co jest szczególnie podejrzane, bo domeny .pay są dostępne dla każdego za dwadzieścia dolarów, w przeciwieństwie do bardziej pilnowanych .bank. Do tego ekran zgody nie rozpoznawał własnej funkcji firmy, a zielony znaczek bezpieczeństwa wyglądał identycznie jak fałszywe ikony używane w atakach na Microsoft OAuth, co dodatkowo wzmacniało wrażenie phishingu. Najbardziej ironiczny fragment dotyczy próby zgłoszenia tego jako ataku przez wbudowanego agenta AI w czacie Cloudflare, który najpierw poprosił o pełny dostęp do konta zamiast dostępu tylko do odczytu, a na końcu i tak nie udało się zgłosić sprawy przez zepsuty formularz HackerOne. Autor kończy jasną listą dobrych praktyk: hostować nowe funkcje pod zaufaną domeną, pokazywać informacje bezpieczeństwa w widocznym miejscu i realnie testować własny proces zgłaszania oszustw, zamiast zakładać, że nikt tego nie sprawdzi.

**Key takeaways:**
- Legalna strona Cloudflare wyglądała bardziej podejrzanie niż wiele realnych ataków phishingowych, przez błędy w projekcie UX zgody.
- Domeny sTLD typu .pay są dostępne za symboliczną opłatę, więc sama domena nie jest dowodem legalności.
- Nawet firmy zajmujące się bezpieczeństwem potrzebują sprawnego, przetestowanego kanału zgłaszania podejrzanych stron.

**Why do I care:** Ten tekst jest dobrym memento dla każdego, kto projektuje flow OAuth czy ekrany zgody w swojej aplikacji, bo jeśli ekspert od bezpieczeństwa z wieloletnim stażem prawie zgłasza legalny produkt jako atak, to zwykły użytkownik nie ma żadnych szans. Sam biorę z tego jasną checklistę do code review każdego nowego flow autoryzacji: własna domena, widoczne informacje bezpieczeństwa, przetestowany kanał zgłoszeń.

**Link:** [Web Security is Too Hard](https://textslashplain.com/2026/08/04/security-is-hard-yall/)

## Devtoolsy muszą być open source, bo era agentów zmienia ekonomię personalizacji

**TLDR:** Autor argumentuje, że agenci AI radykalnie zmieniają koszt personalizacji własnych narzędzi programistycznych, ale ta zmiana działa tylko wtedy, gdy mamy dostęp do kodu źródłowego, co stawia zamknięte narzędzia typu Claude Code w gorszej pozycji względem otwartych alternatyw.

**Summary:** Kluczowa obserwacja artykułu jest prosta: kiedyś personalizacja własnego softu była nieopłacalna, bo każda linijka kosztowała czas, a utrzymanie forka przez rok było bolesne, więc większość inżynierów w ogóle nie pisała nic dla siebie. Agenci zmieniają ten rachunek na dwóch frontach jednocześnie, bo ułatwiają zarówno start personalizacji, jak i ciągłe utrzymanie zmian zsynchronizowanych z upstreamem przez cykliczny cron, który sam rebase'uje lokalne modyfikacje na nowe wydania. Autor opisuje własny przykład narzędzia do minimalizowania code review, gdzie model odfiltrowuje nudne fragmenty diffa typu importy czy nil-checki, żeby recenzent skupiał się tylko na architekturze i przypadkach brzegowych, i pokazuje, jak jedno proste polecenie do agenta wbudowało to narzędzie w jego edytor bez dotykania API rozszerzeń. Największy wniosek dla mnie brzmi tak: skoro agent może dowolnie modyfikować kod źródłowy programu, to całe systemy pluginów i pliki konfiguracyjne, które istniały tylko dlatego, że personalizacja przez człowieka była droga, tracą sens, bo można po prostu poprosić agenta o zmianę bezpośrednio w źródle. Stąd wniosek autora, że narzędzia zamknięte, jak Claude Code, stają w tej nowej rzeczywistości w gorszej pozycji, bo dają dostęp tylko do sztywnych hooków, a nie do samego kodu.

**Key takeaways:**
- Agenci AI drastycznie zmniejszają koszt personalizacji i utrzymania forków własnych narzędzi programistycznych.
- Cykliczny agent może samodzielnie rebase'ować lokalne zmiany na upstream, eliminując najbardziej bolesną część utrzymania forka.
- Zamknięte narzędzia developerskie tracą przewagę, bo systemy pluginów były opłacalne tylko przy wysokim koszcie personalizacji przez człowieka.

**Why do I care:** Ta teza wydaje mi się mocno przesadzona w praktycznym wymiarze, bo utrzymanie forka poważnego narzędzia to wciąż coś więcej niż nightly cron z promptem, zwłaszcza gdy upstream wprowadza breaking changes w architekturze, nie tylko w UI. Jednocześnie sama obserwacja, że koszt personalizacji drastycznie spadł, jest realna i już teraz wpływa na to, jak myślę o wyborze między rozszerzalnym, ale zamkniętym IDE, a otwartym, które mogę dostosować bez czekania na oficjalny plugin.

**Link:** [Devtools must be open source](https://blog.exe.dev/devtools-must-be-open-source)

## Ile ruchu naprawdę dostają strony MDN, teraz w formie interaktywnego eksploratora

**TLDR:** Bramus odkrył, że MDN publicznie udostępnia aktualne dane o oglądalności stron przez plik CSV, i przy pomocy Google AI Studio wygenerował do tego interaktywny wizualizator na CodePen.

**Summary:** To krótka, ale sympatyczna notka typu TIL, czyli "today I learned", pokazująca, że pod adresem popularities.mdn.mozilla.net kryje się otwarty plik CSV z aktualnymi danymi o tym, które strony dokumentacji MDN są najczęściej odwiedzane. Bramus, pracujący jako Chrome Developer Relations Engineer, zamiast pisać wizualizację od zera, poprosił Google AI Studio o wygenerowanie całego narzędzia i wdrożył je jako działający projekt na CodePen, co samo w sobie jest dobrym przykładem tego, jak dziś wygląda szybkie prototypowanie małych narzędzi wewnętrznych. Sam artykuł nie zawiera głębokiej analizy danych, to bardziej wskazówka dla innych, gdzie szukać takiego zbioru i jak łatwo teraz zamienić surowy CSV w coś eksplorowalnego bez tygodnia pracy nad dashboardem.

**Key takeaways:**
- MDN publikuje aktualne dane o oglądalności swoich stron w publicznie dostępnym pliku CSV.
- Cały wizualizator został wygenerowany przez AI Studio i wdrożony na CodePen bez ręcznego pisania kodu.
- To dobry przykład na to, jak nisko spadł koszt zrobienia szybkiego, jednorazowego narzędzia do eksploracji danych.

**Why do I care:** Ten link jest przede wszystkim inspiracją do tego, żeby częściej zaglądać do takich publicznie dostępnych zbiorów danych zamiast zakładać, że trzeba je samemu zbierać. Jeśli MDN udostępnia realne dane o popularności stron, to jest to złoto dla każdego, kto pisze dokumentację techniczną i chce wiedzieć, które strony faktycznie czytają ludzie, a nie tylko które linkuje najwięcej blogów.

**Link:** [MDN Traffic Browser](https://www.bram.us/2026/08/03/mdn-traffic-browser/)

## Chrome coraz mocniej stawia na AI po obu stronach wojny o bezpieczeństwo

**TLDR:** Zespół bezpieczeństwa Chrome opisuje, jak wykorzystuje modele językowe do znajdowania, triage'owania i naprawiania setek błędów bezpieczeństwa szybciej niż wcześniej, jednocześnie inwestując w migrację do Rust jako długoterminowe rozwiązanie problemu pamięci.

**Summary:** Ten wpis czyta się jak raport z frontu w wojnie, którą wszyscy przeczuwaliśmy, że nadchodzi: te same modele językowe, które ułatwiają atakującym znajdowanie podatności, są teraz systematycznie używane przez Chrome do znajdowania ich pierwej. Najbardziej konkretny przykład to sandbox escape, który przetrwał w kodzie przez ponad trzynaście lat, a został znaleziony dzięki agentowi opartemu na Gemini przeszukującemu cały codebase Chromium. Cały proces, od triage przez naprawę do wydania poprawki, jest teraz w dużej części zautomatyzowany wieloagentowym potokiem, gdzie jeden agent proponuje kandydatów na fix, drugi ocenia je jak recenzent kodu, a kolejny pisze testy pod wszystkie wsparte platformy, co w dwóch ostatnich milestone'ach dało więcej naprawionych błędów niż w poprzednich dwudziestu trzech razem wziętych. Równolegle Chrome inwestuje w dwuwarstwową strategię memory safety, hardening istniejącego C++ przez technologie jak MiraclePtr i systematyczną "spanifikację" wskaźników, oraz długoterminowe przechodzenie na Rust w najbardziej newralgicznych komponentach jak parsery czy kodeki obrazów. Cały artykuł jest zaskakująco transparentny co do skali problemu, bo Chrome ma ponad dwa tysiące trzysta zależności third-party, z czego półtora tysiąca trafia realnie do użytkowników.

**Key takeaways:**
- Wieloagentowy potok fix-critic-test w dwóch ostatnich milestone'ach naprawił więcej błędów bezpieczeństwa niż poprzednie dwadzieścia trzy wydania łącznie.
- Chrome prowadzi dwuwarstwową strategię memory safety: hardening C++ przez MiraclePtr i spanifikację, oraz długoterminowe przejście na Rust.
- Cel to browser stale łatany dynamicznie, bez wymuszania restartu, żeby zminimalizować okno na ataki typu N-day.

**Why do I care:** To dobra lekcja, że narracja "AI zwiększa liczbę podatności" i "AI zwiększa bezpieczeństwo" nie są ze sobą w konflikcie, po prostu obie strony tej równowagi przyspieszają jednocześnie, a wygrywa ten, kto szybciej zamyka pętlę od znalezienia do wydania poprawki. Dla mnie jako osoby odpowiedzialnej za utrzymanie zależności w projektach to również przypomnienie, że warto pisać własne SECURITY.md, bo najwyraźniej modele realnie z nich korzystają do lepszego zrozumienia granic zaufania w kodzie.

**Link:** [Stronger with every update](https://blog.google/security/chrome-stronger-with-every-update/)

## Unia Europejska wymusza etykietowanie treści generowanych przez AI

**TLDR:** Od sierpnia w Unii Europejskiej obowiązkowe stało się oznaczanie treści generowanych przez AI, w tym deepfake'ów i tekstów publikowanych bez ludzkiej redakcji, w ramach unijnego prawa o AI.

**Summary:** Nowe przepisy nakładają na firmy obowiązek jasnego informowania użytkowników, gdy rozmawiają z chatbotem, patrzą na obraz wygenerowany przez AI albo czytają tekst na tematy istotne społecznie, który nie przeszedł przez ludzką redakcję. Sposobem realizacji może być watermark albo inny znacznik ułatwiający automatyczne wykrycie treści syntetycznej, a firmy, które się nie dostosują, mają grozić wysokie kary finansowe. Szczególny nacisk położono na deepfake'i oraz na treści dotyczące emocji i biometrii, co ma sens w kontekście tego, jak łatwo dziś wygenerować przekonujący, spersonalizowany materiał dezinformacyjny na masową skalę. Ciekawy jest głos Google, które z jednej strony podpisało unijny kodeks postępowania w sprawie transparentności AI, a z drugiej otwarcie ostrzega, że nadmiar nakładających się etykiet i disclaimerów prawnych może przynieść efekt odwrotny do zamierzonego, czyli utrudnić ludziom zrozumienie, co właściwie widzą. Istniejące systemy AI mają czas do grudnia, żeby się dostosować, a twórczość artystyczna, satyryczna i fikcyjna jest wyłączona z obowiązku.

**Key takeaways:**
- Od sierpnia w UE obowiązkowe jest oznaczanie deepfake'ów i tekstów tworzonych przez AI bez ludzkiej redakcji.
- Firmy mogą realizować obowiązek przez watermarki i inne znaczniki umożliwiające automatyczną detekcję.
- Google ostrzega, że nadmiar nakładających się etykiet może utrudnić, nie ułatwić, zrozumienie treści przez odbiorców.

**Why do I care:** Jako osoba budująca produkty webowe muszę teraz traktować oznaczanie treści AI jako realny wymóg compliance, nie jako miły dodatek, zwłaszcza w projektach z generowanym contentem czy chatbotami skierowanymi na rynek europejski. Zgadzam się z obawą Google o nadmiar etykiet, bo widziałem już wystarczająco dużo banerów cookie, żeby wiedzieć, że nadmiar formalnego ostrzegania kończy się tym, że ludzie ignorują wszystkie ostrzeżenia, nie tylko te ważne.

**Link:** [AI-generated label becomes mandatory in the EU](https://www.euronews.com/my-europe/2026/08/02/ai-generated-label-becomes-mandatory-in-the-eu-for-companies)

## TIME serwuje botom AI zupełnie inną wersję strony, z reklamami wpiętymi wprost do treści

**TLDR:** Dziennikarz śledczy pokazuje, że TIME.com wykrywa boty crawlujące dla asystentów AI po User-Agent i podaje im wersję markdown z wtopionymi reklamami, które nigdy nie widzi żaden człowiek.

**Summary:** Eksperyment jest prosty i bezlitosny: ten sam artykuł, ten sam moment, zmieniany tylko nagłówek User-Agent. Jako Chrome, Safari czy Googlebot dostajesz identyczne trzysta trzy kilobajty pełnej strony HTML, ale jako ClaudeBot, PerplexityBot czy OAI-SearchBot dostajesz trzynaście kilobajtów markdownu, jedną dwudziestą trzecią rozmiaru, bez layoutu, gotowe do połknięcia przez model. GPTBot i ChatGPT-User w ogóle nie dostają dostępu, co jest ciekawe, bo pokazuje, że to nie jest blanketowa polityka wobec botów AI, tylko selektywna decyzja, kto dostaje który wariant. W nagłówkach odpowiedzi ukryty jest cały ekosystem ad-techu nazwany Mobian, z unikalnym UUID przy każdym zapytaniu i cache-control: no-store, co razem oznacza, że każde odczytanie strony przez bota jest liczone jako osobna impresja reklamowa, tylko że jednostką rozliczeniową nie jest widz, a tokeny wpychane do modelu. Najbardziej niepokojący fragment to sponsorowane treści typu FAQ o banku Ally czy Project Management Institute wklejone w markdown w miejscach, gdzie żaden człowiek nigdy ich nie zobaczy, napisane w stylu, który wygląda jak odpowiedź, jaką model wygenerowałby dla użytkownika pytającego, w jakim banku otworzyć konto.

**Key takeaways:**
- TIME.com serwuje selektywnie, bot po bocie, zupełnie inną wersję treści na podstawie nagłówka User-Agent.
- Ekosystem ad-techowy Mobian liczy każde odczytanie strony przez bota AI jako osobną impresję reklamową rozliczaną w tokenach.
- Sponsorowane treści FAQ trafiają do markdownu widocznego tylko dla modeli, całkowicie niewidoczne w HTML dla ludzkich czytelników.

**Why do I care:** To pierwszy tak konkretny dowód na to, że wydawcy zaczynają traktować boty AI jako odrębną, płatną publiczność, do której można kierować reklamy nigdy nie widziane przez człowieka, i szczerze wątpię, że TIME jest jedynym wydawcą, który to robi. Dla każdego z nas, kto buduje produkty korzystające z crawlowanych treści albo RAG na publicznych stronach, to sygnał, że treść, którą model dostaje, może być zupełnie inna od tego, co widzi realny użytkownik przeglądający tę samą stronę w przeglądarce, co samo w sobie jest problemem dla wiarygodności takich systemów.

**Link:** [TIME Is Serving AI Bots a Different Website, With Ads Built In](https://www.vincentschmalbach.com/time-serves-ai-bots-a-different-website/)
