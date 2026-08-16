---
title: "Przeglądarka dla agentów, Solid na Vite i architektura nieufności"
excerpt: "Cloudflare buduje przeglądarkę, która nie musi wyglądać jak przeglądarka, SolidStart wraca na prostszy fundament, a Ryan Dahl daje Durable Objects wolność wyboru hostingu. Do tego mocny tekst o tym, jak zaprojektować system, w którym agentowi AI nie trzeba ufać ani trochę."
publishedAt: "2026-08-08"
slug: "kitesurf-solidstart-v2-cloudflare-os-architektura-nieufnosci"
hashtags: "#uidev #cloudflare #aiagenci #vite #durableobjects #generated #pl"
---

## Cloudflare zbudowało przeglądarkę, która nie jest dla ludzi

**TLDR:** Cloudflare ogłosiło Kitesurf, przeglądarkę renderującą strony w całości wewnątrz V8 isolates na Workers, zaprojektowaną od zera pod agentów AI, nie pod ludzi przed ekranem. Zamiast gonić za zgodnością z Chromium, zespół odciął zakładki, synchronizację i pikselową precyzję na rzecz mniejszego zużycia CPU i pamięci. Efekt to trzy do siedmiu razy mniejsze zużycie zasobów przy typowych zadaniach agentowych, kosztem nieco dłuższego czasu renderowania pojedynczej klatki.

**Summary:** Pytanie „czy zbudować własną przeglądarkę” wracało w Cloudflare od lat i za każdym razem kończyło się tym samym wnioskiem: to za drogie i za trudne, żeby uzasadnić własnym silnikiem konkurowanie z Chromium. Zmieniło się dopiero wtedy, gdy dojrzały prymitywy w ich Workers (dynamiczne workery, Durable Objects oparte na SQLite, RPC między workerami) zbiegły się w czasie z eksplozją zapotrzebowania na przeglądarki dla agentów. Chromium powstało z myślą o człowieku, który przewija stronę w sześćdziesięciu klatkach na sekundę i synchronizuje zakładki między telefonem a laptopem. Agentowi to wszystko jest kompletnie obojętne, on liczy tokeny, koszt i czas odpowiedzi.

Architektura Kitesurf rozbija przeglądarkę na kilka wyspecjalizowanych komponentów. Engine wystawia na zewnątrz Chrome DevTools Protocol, więc Puppeteer i Playwright działają bez żadnych zmian po stronie klienta. PageScript odpowiada za wykonanie skryptów strony w izolowanym workerze, do parsowania HTML i CSS wykorzystuje moduły Blitz i Stylo napisane w Rust, a dla obsługi eval, którego natywnie Workers nie wspierają, uruchamia dodatkowy silnik ECMAScript o nazwie Boa JS, napisany również w Rust i skompilowany do Wasm. Za wszelką komunikację z internetem odpowiada jeden, ściśle kontrolowany komponent SandboxOutbound, więc żadna inna część systemu nie dotyka sieci bezpośrednio. Na końcu PageRenderer zamienia obiekt dokumentu w bitmapę i zwraca ją przez wbudowany system RPC Workers, bez żadnego trzymanego stanu, co pozwala bezkarnie zabijać i odpalać go od nowa przy każdym problemie.

Ciekawy jest sposób, w jaki ten projekt w ogóle powstał. Zespół wyszedł od Web Platform Tests jako twardego kryterium poprawności i pozwolił agentom AI iterować nad implementacją właśnie w oparciu o te testy, a ludzie skupili się na architekturze i przeglądzie podejścia. To dość dobra ilustracja tego, jak wygląda produktywne użycie AI przy pisaniu skomplikowanego, niskopoziomowego kodu: nie chodzi o to, żeby agent zgadywał, co jest poprawne, tylko o to, żeby dać mu twardy, automatyczny sędzia w postaci setek tysięcy testów.

Liczby są konkretne. Kitesurf zużywa od trzech do siedmiu razy mniej pamięci i CPU niż Chromium przy screenshotach i ekstrakcji HTML, ale przegrywa czasem ściany, jest wolniejszy o mniej więcej siedemdziesiąt procent, bo zimny silnik renderujący napisany od zera nie ma szans z JIT-em, który widział daną stronę już wcześniej. Na razie Kitesurf nie odtworzy WebGL, wideo ani długiej sesji z ciasteczkami trzymanymi przez dziesięć minut, więc do wielu zastosowań i tak trzeba wrócić do zwykłego Chromium w Browser Run. Zespół planuje otworzyć kod źródłowy, kiedy projekt dojrzeje, co jest sensowną decyzją, bo to narzędzie infrastrukturalne, nie produkt konsumencki.

**Key takeaways:**
- Kitesurf działa w V8 isolates na Workers, nie w Chromium, i jest kompatybilny z CDP, więc Puppeteer i Playwright łączą się bez zmian
- Do parsowania i renderowania używa modułów Rust (Blitz, Stylo, Parley) skompilowanych do Wasm, a eval obsługuje osobny silnik JS napisany w Rust (Boa JS)
- Trzy do siedmiu razy mniejsze zużycie CPU i pamięci niż Chromium, kosztem około siedemdziesięciu procent dłuższego czasu renderowania pojedynczej klatki
- Brak obsługi WebGL, wideo i długich sesji na razie, dostępny za darmo w becie w ramach Browser Run, planowany open source

**Why do I care:** To pierwszy poważny sygnał, że infrastruktura webowa zaczyna się rozdwajać na tor dla ludzi i tor dla agentów, i to nie na poziomie frameworka, tylko silnika przeglądarki. Jeśli budujesz cokolwiek, co odpala headless browsera do scrapowania, generowania PDF-ów czy testów wizualnych na dużą skalę, rachunek za pamięć i CPU przy tysiącach równoległych sesji to realny koszt, a nie akademicka ciekawostka. Warto śledzić ten projekt nie dlatego, że zastąpi Chromium w twoim CI, tylko dlatego, że pokazuje wzorzec: gdy odbiorcą treści przestaje być człowiek, dużą część dotychczasowych założeń przeglądarki można bezpiecznie wyrzucić.

**Link:** [Introducing Kitesurf: The agent-first browser that runs in V8 isolates on Cloudflare Workers](https://blog.cloudflare.com/kitesurf/)

## SolidStart v2 jest stabilny i wreszcie prostszy w środku

**TLDR:** SolidStart v2 osiągnął stabilną wersję, porzucając własną warstwę Vinxi na rzecz natywnego Environment API z Vite 8. Migracja dla większości aplikacji ma być prosta, choć wymaga Node.js 24 i przeniesienia konfiguracji do vite.config.ts. Zespół deklaruje już gotowość na nadchodzące zmiany w Vite 9.

**Summary:** Kiedy dwa lata temu wychodził SolidStart v1, Vite nie miał jeszcze oficjalnego sposobu na obsługę wielu równoległych środowisk buildowania, klienta, serwera, funkcji serwerowych i tak dalej. Zespół Solida rozwiązał to sam, pisząc Vinxi jako warstwę koordynującą te środowiska, i przy okazji, przez Vinxi, podpiął się pod Nitro, żeby nie musieć samodzielnie utrzymywać adapterów pod każdą platformę hostingową. To był rozsądny kompromis na tamten moment, ale oznaczał utrzymywanie sporej ilości własnego kodu infrastrukturalnego obok właściwego frameworka.

Teraz, gdy Vite ma własne, oficjalne Environment API, ta prowizorka przestała być potrzebna. SolidStart v2 buduje się bezpośrednio na Vite 8, korzysta z jego nowego, opartego na Rolldown toolchaina i lepiej współpracuje z pluginami takimi jak Tailwind CSS v4. Deployment idzie teraz przez Nitro v3, które samo zostało przepisane jako plugin Vite korzystający z tego samego Environment API, więc cała ta warstwa w końcu mówi jednym językiem zamiast trzema.

Dla kogoś, kto ma już aplikację na SolidStart v1, migracja ma być w większości przypadków prostym przeniesieniem konfiguracji z app.config.ts do vite.config.ts, ale trzeba pamiętać o wymaganym Node.js 24 oraz o zmianach w importach pakietów i middleware. Ponad rok pracy i dwadzieścia pięć wersji alfa, beta i release candidate to niemało jak na framework, który z zewnątrz wygląda na niszowy, ale pokazuje, że ekipa Solida traktuje stabilność poważnie, zamiast wypuszczać duże przepisanie z marszu.

Ciekawszy jest kontekst na przyszłość: to jest fundament pod Solid v2, który ma przynieść nowy rdzeń reaktywności. Innymi słowy, ta migracja to nie efekt końcowy, tylko sprzątanie przed czymś większym.

**Key takeaways:**
- SolidStart v2 zastępuje Vinxi natywnym Environment API z Vite 8, upraszczając architekturę frameworka
- Migracja z v1 wymaga Node.js 24+ i przeniesienia configu z app.config.ts do vite.config.ts
- Deployment odbywa się teraz przez Nitro v3 jako plugin Vite (Cloudflare, Netlify i inne)
- Zespół deklaruje kompatybilność z planowanymi zmianami w Vite 9 już teraz

**Why do I care:** To jeden z tych rzadkich przypadków, gdy meta-framework robi krok w tył, żeby zrobić dwa kroki do przodu, zamiast dokładać kolejną warstwę abstrakcji na już istniejącą. Jeśli utrzymujesz produkcyjną aplikację na SolidStart v1, ta migracja realnie zmniejszy powierzchnię rzeczy, które mogą się zepsuć, bo znika cała prywatna warstwa koordynująca środowiska. Dla zespołów oceniających frameworki full-stack to też sygnał, że warto patrzeć nie tylko na DX na start, ale i na to, jak framework radzi sobie, gdy jego fundamenty (tutaj Vite) same przechodzą duże zmiany.

**Link:** [SolidStart v2 is now Stable](https://github.com/solidjs/solid-start/discussions/2281)

## Ryan Dahl daje Durable Objects wolność od Cloudflare

**TLDR:** celld to projekt Ryana Dahla, który uruchamia kod Workers i Durable Objects bez zmian, ale poza infrastrukturą Cloudflare, z danymi trzymanymi w twoim własnym buckecie S3. Przy dużej liczbie aktywnych obiektów koszt potrafi być o rzędy wielkości niższy niż w oryginalnym modelu rozliczeń Cloudflare. To nie krytyka Durable Objects, raczej hołd dla samego modelu programistycznego.

**Summary:** Durable Objects to jeden z tych pomysłów, które w teorii brzmią prosto (pojedynczy wątek, własny storage, adresowany po nazwie), a w praktyce dają bardzo wygodny prymityw do budowania systemów stanowych bez ręcznego wynajdywania koordynacji. celld bierze dokładnie ten model i przenosi go poza Cloudflare, na twoje własne maszyny, z danymi replikowanymi w formacie LTX (pochodzącym z Litestream Bena Johnsona) do dowolnego bucketa obiektowego, który sam wybierzesz.

Mechanizm własności komórki jest zaskakująco prosty: nie ma protokołu członkostwa ani wykrywania awarii, tylko rekord w buckecie, przejmowany atomowym zapisem typu compare-and-swap. Stracisz węzeł, inny węzeł przejmuje leasing i odtwarza stan komórki z bucketa w około dwudziestu sekundach, bez utraty potwierdzonych zapisów. Autorzy sami przyznają, że self-hosting nie jest automatycznie bardziej niezawodny, po prostu robi domenę awarii jawną i możliwą do zbadania przez ciebie, zamiast chować ją za stroną statusową dostawcy.

Liczby, które podają, robią wrażenie przy większej skali: sto tysięcy rezydentnych komórek w modelu Durable Objects to koszt rzędu czterystu piętnastu tysięcy dolarów miesięcznie, w celld to niecałe pięć tysięcy, bo płacisz za węzły, nie za komórkę. Warto pamiętać, że to porównanie samego kosztu infrastruktury bazowej, bez ruchu i zapisów aplikacji, więc różnica w praktyce będzie mniejsza, ale i tak pokazuje, jak bardzo model rozliczeń per-obiekt Cloudflare potrafi się rozjechać przy dużej skali rezydentnych obiektów.

Autorzy piszą wprost, że kochają Cloudflare i że sam projekt jest serwowany przez ich workera, więc to nie jest wojna z dostawcą, tylko przekonanie, że dobry prymityw zasługuje na to, żeby dało się go uruchomić gdziekolwiek.

**Key takeaways:**
- celld uruchamia niezmieniony kod Workers/Durable Objects, ale poza Cloudflare, z danymi w twoim własnym buckecie
- Własność komórki rozstrzyga atomowy compare-and-swap na buckecie, bez protokołu konsensusu
- Przy dużej liczbie rezydentnych komórek koszt infrastruktury bazowej potrafi być o rzędy wielkości niższy niż w rozliczeniu Cloudflare
- Projekt Ryana Dahla, twórcy Node.js i Deno, jako świadomy hołd dla modelu Durable Objects, nie jego krytyka

**Why do I care:** To dobry przykład tego, jak dojrzały prymityw architektoniczny w końcu odrywa się od jednego dostawcy, kiedy staje się na tyle wartościowy, że ktoś chce go zaimplementować od nowa. Jeśli budujesz coś na Durable Objects i martwi cię lock-in albo koszt przy skali, warto mieć celld na radarze jako opcję ucieczki, nawet jeśli nigdy z niej nie skorzystasz. Dla architekta to też przypomnienie, żeby przy wyborze usług chmurowych patrzeć osobno na model programistyczny (bardzo dobry tutaj) i na model biznesowy dostawcy (osobna sprawa, którą można renegocjować albo obejść).

**Link:** [celld — Durable Objects, self-hosted](https://celld.dev/)

## Architektura, w której agentowi AI nie ufa się ani trochę

**TLDR:** Długi, wnikliwy tekst analizujący Cloudflare OS, wewnętrzną platformę Cloudflare do budowania narzędzi na agentach AI, pokazuje spójną filozofię: skoro agent bywa pewny siebie i błędny jednocześnie, cały system trzeba zaprojektować tak, żeby jego pomyłki nie miały znaczenia. Zamiast starać się zrobić agenta godnym zaufania, autorzy sprawiają, że zaufanie w ogóle przestaje być potrzebne. To jeden z ciekawszych opisów architektury bezpieczeństwa pod AI, jaki czytałem w tym roku.

**Summary:** Punktem wyjścia tekstu jest fragment kodu Gatekeepera, komponentu, który trzyma dane uwierzytelniające i pośredniczy w każdej akcji ze skutkiem ubocznym. Instrukcja dla autora Gatekeepera mówi, żeby symulował akcje, które nie zostały jeszcze zatwierdzone, czyli okłamywał agenta, że merge się już wydarzył, zanim człowiek go zaakceptuje. Agent buduje na tym kłamstwie kolejne kroki, a dopiero później człowiek decyduje, czy cały ten pakiet działań wpuścić do rzeczywistości, czy wyrzucić do kosza razem z wszystkim, co na nim stanęło.

Za tym jednym mechanizmem stoi cała reszta systemu zbudowana wokół tej samej zasady. Każdy dokument czy aplikacja tworzona przez agenta dostaje własną, prywatną instancję w osobnym dynamicznym workerze, z własną bazą SQLite za Durable Object Facetem, bez dostępu do sieci na zewnątrz. To właściwie powrót pomysłu ze Sandstorma, wcześniejszego projektu jednego z twórców tej architektury, gdzie drobnoziarnista izolacja każdego dokumentu była słuszna, ale zbyt droga przy kontenerach. V8 isolates zrobiły to samo sto razy taniej, więc pomysł sprzed dekady w końcu ma sens ekonomiczny. Efekt jest taki, że błąd w kodzie wygenerowanym przez agenta przestaje być problemem bezpieczeństwa, bo nie ma do kogo wyciec w obrębie własnej piaskownicy.

Drugi filar to model uprawnień oparty na capability zamiast na tokenach. Agent nigdy nie widzi klucza do GitHuba, dostaje jedynie obiekt z metodami, które Gatekeeper wykona w jego imieniu, w granicach wcześniej nadanych uprawnień. To różnica między kluczem, który daje pełną władzę temu, kto go trzyma, a smyczą, którą można w każdej chwili skrócić albo odpiąć. Trzeci filar to rozdzielenie działania od zatwierdzania: agent czyta i buduje bez przerwy, jego zapisy są prowizoryczne aż do momentu, gdy człowiek zwolni cały pakiet naraz, zamiast klikać „zatwierdź” po każdym pojedynczym kroku, co w praktyce i tak kończy się włączeniem trybu automatycznej akceptacji wszystkiego.

Najbardziej subtelny mechanizm dotyczy nie akcji agenta, tylko tego, co agent wytwarza. Jeśli agent zbuduje dashboard z wrażliwej tabeli i ktoś go udostępni dalej, może się okazać, że udostępnił tym samym dane, do których odbiorca nie miał prawa. System śledzi więc, co dany komponent już przeczytał, i przy udostępnianiu pyta każdego dostawcę danych osobno, czy nowy odbiorca ma prawo to zobaczyć. Autor tekstu trafnie zauważa, że to jest dokładnie ten sam problem, który dwadzieścia lat temu próbowały rozwiązać akademickie systemy kontroli przepływu informacji i nigdy się komercyjnie nie przyjęły, bo ręczne etykietowanie danych było zbyt kosztowne. Przy agentach, które czytają tysiąc razy na godzinę, ręczne etykietowanie i tak nie wchodzi w grę, więc system musi to robić sam.

**Key takeaways:**
- Centralny mechanizm: akcje agenta są symulowane, dopóki człowiek nie zatwierdzi całego pakietu naraz, więc nic nieodwracalnego nie dzieje się bez nadzoru
- Każdy dokument czy aplikacja dostaje osobną, w pełni odizolowaną instancję (dynamiczny worker plus Durable Object Facet), więc błąd w kodzie agenta nie jest już problemem bezpieczeństwa
- Agent dostaje capability, nigdy realny klucz czy token, więc nie może rozszerzyć własnych uprawnień ani wycieknąć poświadczeń
- System śledzi, co agent już przeczytał, żeby blokować wtórne wycieki danych przez udostępnione artefakty typu dashboard

**Why do I care:** To materiał, który warto przeczytać niezależnie od tego, czy używasz Cloudflare, bo opisuje wzorzec, a nie produkt. Jeśli w firmie ktoś już podłącza agentów do GitHuba, Slacka czy bazy danych przez zwykły token wklejony w prompt, ten tekst jest gotowym argumentem, żeby zamiast tego zbudować warstwę pośredniczącą opartą na capability i rozdzielić czytanie od zatwierdzania. To też uczciwe postawienie sprawy: taka architektura kupuje bezpieczeństwo kosztem autonomii, człowiek zostaje wąskim gardłem z premedytacją, i to jest świadomy kompromis, nie efekt uboczny.

**Link:** [Cloudflare OS is an architecture of distrust](https://lord.technology/2026/08/05/cloudflare-os-is-an-architecture-of-distrust.html)

## Projektowanie w kodzie, gdy agent pisze za ciebie

**TLDR:** Szef designu w Cursorze opisuje, jak agenci AI zmienili dla niego proces projektowania grafik, plakatów i animacji: zamiast pisać kod ręcznie, prowadzi dialog z agentem, iterując pomysł krok po kroku aż do finalnego efektu. Bariera wejścia, którą kiedyś było samo nauczenie się programowania i zbudowanie narzędzi, praktycznie zniknęła. Ale autor sam przyznaje, że dobry pomysł wciąż zaczyna się od ręcznego szkicu i ludzkiego gustu.

**Summary:** Kod jako medium projektowe ma jedną przewagę nad plikiem w Figmie: jeśli pomysł da się opisać zestawem reguł, można wygenerować z niego dowolną liczbę wariantów, przekręcać parametry i systematycznie zbiegać do najlepszej wersji. Zamiast pojedynczego assetu projektujesz cały system, który potem skaluje się na wiele zastosowań. Problem był zawsze ten sam: zanim zacząłeś tworzyć, musiałeś najpierw nauczyć się programować, potem zbudować sobie framework pod ten konkretny projekt, a dopiero na końcu ręcznie edytować kod, żeby sprawdzić kolejny wariant pomysłu.

Autor opisuje krok po kroku, jak razem z agentem w Cursorze zbudował animowaną grafikę nagłówkową do posta o reinforcement learningu, inspirowaną systemem trybików. Zaczyna od pustego płótna i odniesienia do wcześniejszych skryptów, potem opisuje słowami, jak mają wyglądać koła zębate, poprawia proporcje, każe agentowi przyciąć nakładające się fragmenty, dopracowuje gęstość linii, a na końcu zamienia statyczny obrazek w płynnie zapętloną animację i optymalizuje rozmiar pliku. Cały ten proces to seria krótkich, konwersacyjnych poprawek, bardzo podobna do tego, jak programista pracuje dziś z agentem nad zwykłym kodem produkcyjnym, tylko że efektem końcowym jest grafika, nie funkcja.

To, co mnie w tym przekonuje, to fakt, że autor nie sprzedaje tezy „AI zaprojektuje za ciebie wszystko”. Wprost pisze, że nigdy nie udało mu się uzyskać dobrego rezultatu, każąc AI wymyślić koncepcję od zera, bez wcześniejszego ludzkiego szkicu i przemyślenia problemu. Agent skraca dystans między pomysłem a jego zobaczeniem na ekranie, ale nie zastępuje momentu, w którym ktoś siada z problemem i po prostu o nim myśli, zanim cokolwiek napisze czy narysuje.

Dla mniejszych zespołów bez dedykowanego motion designera czy ilustratora to realna zmiana reguł gry: rzeczy, które wcześniej wymagały zlecenia na zewnątrz albo tygodni nauki narzędzia, teraz da się zrobić samodzielnie w rozmowie z agentem, o ile ma się wyczucie, czego się chce.

**Key takeaways:**
- Kod jako medium projektowe pozwala parametryzować pomysł i szybko eksplorować wiele wariantów zamiast tworzyć pojedyncze assety ręcznie
- Agenci AI usuwają dawną barierę wejścia: naukę programowania i budowę własnego frameworka przed rozpoczęciem właściwej pracy twórczej
- Proces przypomina konwersacyjną iterację znaną z programowania z agentem, tylko efektem jest grafika, plakat czy animacja, nie funkcja w kodzie
- Autor przyznaje, że koncepcja od zera bez ludzkiego szkicu i gustu wciąż nie wychodzi dobrze, nawet z pomocą agenta

**Why do I care:** To bardziej temat dla ludzi zajmujących się designem i prototypowaniem niż dla mnie jako frontendowca na co dzień, ale warto to znać, bo pokazuje, dokąd zmierza granica między design tools a kodem. Jeśli w zespole macie designerów, którzy boją się kodu, ten artykuł jest dobrym argumentem, żeby dać im spróbować budować prototypy z agentem zamiast czekać w kolejce do developera. Z drugiej strony to też przypomnienie dla nas, programistów: jeśli agent potrafi to zrobić z designerem od zera, to samo dotyczy części naszej roboty, i lepiej zawczasu zastanowić się, gdzie leży nasza własna wartość dodana poza samym pisaniem kodu.

**Link:** [Designing with code](https://justinjay.wang/designing-with-code/)
