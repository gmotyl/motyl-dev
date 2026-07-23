---
title: "CSS Subgrid, losowe confetti i dostępność w miejscach, gdzie nikt się jej nie spodziewał"
excerpt: "Przegląd tygodnia we frontendzie: subgrid do układania tabel wynikowych, walka Figmy o dostępność kanwy, nowości w Astro, eksperymenty z CSS random() i Temporal oraz przypomnienie, czym naprawdę jest aria-expanded."
publishedAt: "2026-07-23"
slug: "css-subgrid-random-i-dostepnosc-w-nietypowych-miejscach"
hashtags: "#frontendfocus #css #html #accessibility #css-grid #performance #devops #wordpress-security #generated #pl"
source_pattern: "Frontend Focus"
---

## Rebuilding FIFA Standings Layout with CSS Subgrid

**TLDR:** Autor rozkłada na czynniki pierwsze tabelę wyników mundialu ze strony FIFA i pokazuje, jak ten sam efekt wizualny osiągnąć czystszym CSS, używając grid i subgrid zamiast duplikowania elementów w DOM. Cała sztuczka polega na tym, że każda runda dziedziczy siatkę rodzica i dopiero wtedy pozycjonuje swój początek i koniec.

**Summary:** FIFA zbudowała swoją tabelę rund tak, że każda kolumna, nawet te logicznie powiązane jak dwie połówki tej samej rundy, siedzi w osobnym elemencie DOM. To klasyczny przypadek, w którym znacznik ma odwzorować wygląd, a nie strukturę danych, i autor słusznie nazywa to hackiem. Jego alternatywa jest bardziej elegancka: jeden nadrzędny grid definiuje kolumny i wiersze, a każda runda dostaje subgrid, dzięki czemu jej elementy start i end mogą wylądować dokładnie tam, gdzie trzeba, bez owijania ich w dodatkowe kontenery.

Mechanika jest pokazana krok po kroku i naprawdę dobrze tłumaczy, dlaczego subgrid to coś więcej niż ciekawostka. Zamiast ręcznie liczyć numery linii siatki przy każdej zmianie liczby kolumn, autor używa wartości ujemnych typu grid-column: -2, co samo w sobie jest dobrą praktyką niezależnie od tego, czy budujecie drabinkę turniejową, czy zwykły responsywny layout. Warta uwagi jest też sekcja o wyśrodkowaniu meczów w obrębie rund za pomocą flex: 1 na kontenerach start i end, bo pokazuje typowy problem: align-items: center samo w sobie nie wystarcza, gdy elementy w różnych rundach mają różną liczbę meczów.

Trzeba jednak przyznać, że artykuł jest bardzo skoncentrowany na mechanice grida, a pomija rzeczy, które w prawdziwym produkcie bolałyby najbardziej. Nie ma słowa o łącznikach graficznych między rundami, autor sam to przyznaje i zostawia na przyszłość. Nie ma też ani zdania o dostępności takiej tabeli dla czytników ekranu, a przecież to właśnie hierarchiczne, wielopoziomowe tabele wyników są miejscem, gdzie kolejność odczytu i semantyka list bywają najbardziej pogmatwane. Sam pomysł, że subgrid jest "poprawniejszy semantycznie" od podejścia FIFA, też można podważyć: obie wersje używają wyłącznie divów, więc realna różnica dotyczy utrzymywalności CSS, a nie dostępności czy semantyki jako takiej. Artykuł kończy się zresztą reklamą własnego kursu, co warto mieć z tyłu głowy, czytając entuzjastyczny ton całości.

**Key takeaways:**
- Subgrid pozwala zagnieżdżonemu elementowi dziedziczyć siatkę rodzica zamiast definiować własną, co eliminuje potrzebę duplikowania markupu pod design
- Wartości ujemne w grid-column/grid-row (np. -2, -1) są odporniejsze na zmiany liczby kolumn niż twarde numery linii
- Do wyrównania elementów o różnej liczbie dzieci w obrębie wspólnej siatki lepiej sprawdza się flex: 1 na kontenerach niż samo align-items
- Container queries dobrze uzupełniają subgrid przy przechodzeniu z układu wielokolumnowego na jednokolumnowy

**Why do I care:** To czysto frontendowa, techniczna sprawa, przydatna każdemu, kto układa drabinki turniejowe, osie czasu albo tabele porównawcze, gdzie elementy z różnych "wierszy logicznych" muszą się wyrównywać w tej samej kolumnie fizycznej. Subgrid od dawna jest baseline, więc to nie jest już nisza, tylko realna alternatywa dla starych sztuczek z zagnieżdżonymi wrapperami.

**Link:** [Rebuilding FIFA Standings Layout with CSS Subgrid](https://ishadeed.com/article/fifa-layout/)

## Building Accessibility Into a Canvas-Based Product | Figma Blog

**TLDR:** Figma opisuje, jak zbudowała własne drzewo dostępności i "Mirror DOM", żeby czytniki ekranu mogły w ogóle nawigować po plikach renderowanych na kanwie zamiast w HTML-u. To case study pokazujący cenę architektonicznej decyzji sprzed lat: rezygnacji z DOM-u na rzecz renderowania jak w grze wideo.

**Summary:** Figma renderuje swój canvas mniej więcej tak jak silnik gry, żeby zapewnić nieskończony zoom i współpracę w czasie rzeczywistym, ale w zamian traci darmową dostępność, którą przeglądarka daje za darmo każdemu zwykłemu div i button. Rozwiązaniem jest wewnętrzne drzewo dostępności, budowane niezależnie od drzewa scenegraph, oraz komponent React, który odtwarza z niego syntetyczny DOM widoczny wyłącznie dla technologii wspomagających. To bardzo solidna inżynieria: aktualizacje są chirurgiczne, a nie pełnym przebudowywaniem drzewa przy każdej edycji, co ma sens przy plikach z tysiącami warstw.

Ciekawszy technicznie jest fragment o synchronizacji fokusu i selekcji. W typowej przeglądarce Tab przesuwa fokus zgodnie z układem wizualnym, ale w Figmie klawisz Tab zmieniał tylko zaznaczenie na kanwie bez ruszania systemowego fokusu klawiatury, więc dla czytnika ekranu cała kanwa wyglądała jak jeden wielki, nieużyteczny cel nawigacji. Dwukierunkowa synchronizacja między zaznaczeniem a fokusem to rozwiązanie eleganckie, choć w gruncie rzeczy jest łataniem architektonicznej dziury, którą sami sobie wykopali, wybierając renderowanie poza DOM-em.

Trzeba jednak zapytać o to, czego artykuł unika. Nie ma tu ani jednej liczby o koszcie wydajnościowym utrzymywania dwóch równoległych reprezentacji dokumentu, syntetycznego DOM-u i scenegraph, przy plikach naprawdę dużych, z dziesiątkami tysięcy warstw. Nie ma też informacji, jak długo to całe podejście jest rozwijane względem tego, ile jeszcze zostało, artykuł kończy się enigmatycznym "accessibility work is never really finished", co brzmi ładnie, ale niewiele mówi. Timeline pokazuje, że zaczęli w 2022 roku od widoku prototypów i dopiero w 2024-2025 doszli do edycji, więc to inwestycja licząca się w latach, a nie w sprintach, i marketing owija to w narrację postępu, zamiast przyznać wprost, jak kosztowna to była decyzja architektoniczna sprzed lat.

**Key takeaways:**
- Renderowanie poza DOM-em (canvas, WebGL) oznacza utratę darmowej dostępności przeglądarki i konieczność ręcznego odtworzenia drzewa dostępności
- Warto rozdzielać wewnętrzne drzewo dostępności od drzewa renderowania, żeby robić chirurgiczne, a nie pełne aktualizacje przy edycjach
- Fokus systemowy i logiczne zaznaczenie w aplikacji to dwie różne rzeczy, które trzeba świadomie zsynchronizować dla czytników ekranu
- Live regions ARIA z mechanizmem "coalescing" pozwalają ogłaszać zmiany bez zalewania użytkownika powtarzającymi się komunikatami

**Why do I care:** Bardzo relevantne dla każdego, kto buduje aplikację niekorzystającą z natywnego DOM-u, edytory graficzne, tablice whiteboardowe, gry w przeglądarce. To rzadki, konkretny przykład tego, ile pracy architektonicznej kosztuje dostępność, gdy zrezygnuje się z niej na starcie projektu.

**Link:** [Building Accessibility Into a Canvas-Based Product](https://www.figma.com/blog/building-accessibility-into-a-canvas-based-product/)

## Firefox Containers Preview | The Mozilla Blog

**TLDR:** Mozilla wbudowuje w Firefox 153 natywną wersję funkcji znanej od prawie dekady z rozszerzenia Multi-Account Containers, pozwalającej trzymać różne konta i śledzenie reklamowe w osobnych, izolowanych kontenerach w tym samym oknie przeglądarki.

**Summary:** Sama koncepcja nie jest nowa, to przeniesienie sprawdzonego rozszerzenia do rdzenia przeglądarki, z obietnicą łatwiejszego dostępu, lepszej integracji z ustawieniami i "dalszego inwestowania" w funkcję jako obywatela pierwszej klasy. Post jest napisany typowym językiem ogłoszeń produktowych, pełnym zwrotów w stylu "przynosimy moc rozszerzenia w samo serce Firefoksa", co brzmi bardziej jak notatka marketingowa niż techniczne wyjaśnienie, jak to działa pod maską.

Realnie ciekawsze jest to, czego artykuł nie mówi wprost. Zaznacza, że nie wszystkie funkcje dodatku są jeszcze dostępne w wersji natywnej i że można używać obu równolegle, co w praktyce oznacza okres, w którym część użytkowników będzie miała dwa, nakładające się na siebie systemy kontenerów w tej samej przeglądarce. To prosta recepta na zamieszanie, a artykuł nie wspomina, jak długo ten stan przejściowy potrwa ani jak Mozilla planuje migrację ustawień z dodatku do natywnej funkcji.

Nie pada też ani słowo o kontekście biznesowym, czyli o tym, że to ruch wizerunkowy w czasie, gdy udział rynkowy Firefoksa systematycznie spada, a konkurenci budują własne opowieści o prywatności. Trudno ocenić, czy to realnie odwróci ten trend, czy zostanie zauważone głównie przez tych, którzy i tak już znali dodatek.

**Key takeaways:**
- Funkcja izoluje ciasteczka i śledzenie reklamowe pomiędzy kontenerami w obrębie jednego okna przeglądarki
- To wersja preview, część funkcji dodatku Multi-Account Containers wciąż nie jest dostępna natywnie
- Dodatek i natywna funkcja mogą działać równolegle bez konieczności odinstalowywania

**Why do I care:** Głównie historia produktowa, nie architektoniczna. Dla programistów praktyczny plus jest skromny: izolacja ciasteczek ułatwia lokalne testowanie aplikacji wielotenantowych albo logowania na różne konta bez trybu incognito, ale to efekt uboczny, nie główny powód, dla którego warto o tym czytać.

**Link:** [Firefox Containers Preview](https://blog.mozilla.org/en/firefox/firefox-containers-preview/)

## Astro 7.1

**TLDR:** Kolejny, inkrementalny release Astro dodaje precyzyjniejsze dyrektywy CSP, funkcję format() do kontrolowania URL-i paginacji, flagę --ignore-lock do uruchamiania wielu serwerów deweloperskich naraz, opcję deferRender obniżającą zużycie pamięci dla dużych kolekcji treści oraz eksperymentalne dzielenie danych kolekcji na fragmenty.

**Summary:** To release bez fajerwerków, ale konkretny. Nowe dyrektywy CSP, script-src-elem, script-src-attr, style-src-elem i style-src-attr, pozwalają wreszcie zaakceptować inline style jako "unsafe" bez rezygnowania z bezpieczeństwa dla zewnętrznych plików CSS, czyli rozwiązują realny, wąski problem konfiguracyjny, który wcześniej wymuszał kompromisy na całej stronie. Podobnie funkcja format() na paginate() naprawia coś, co przez lata było źródłem drobnych, ale irytujących niezgodności między wygenerowanymi URL-ami a rzeczywistym sposobem hostowania statycznych plików.

Jest tu jednak ciekawy paradoks wart nazwania wprost. Astro 7 wprowadziło plik blokady, żeby agenci AI kodujący projekt nie uruchamiali przypadkiem kilku serwerów deweloperskich naraz. W praktyce ta blokada uderzyła też w zwykłych ludzi, którzy świadomie chcieli uruchomić drugi serwer z bardziej gadatliwym logowaniem, i teraz trzeba dodawać osobną flagę --ignore-lock, żeby obejść własne zabezpieczenie zespołu. To dobry przykład tego, jak zabezpieczenie zaprojektowane pod jeden scenariusz (nieświadome AI) psuje istniejący, legalny workflow ludzi, i trzeba było łatać własną łatkę.

Eksperymentalne chunkowanie danych kolekcji na fragmenty po 10 MB jest sensowną odpowiedzią na realny problem (jeden gigantyczny plik data-store.json bijący w limity niektórych platform), ale artykuł nie tłumaczy, skąd akurat wartość 10 MB, brzmi to jak liczba wybrana arbitralnie, a nie wyliczona z konkretnych ograniczeń platform, które autorzy mieli na myśli.

**Key takeaways:**
- Nowe dyrektywy CSP (script-src-elem/attr, style-src-elem/attr) pozwalają różnicować politykę dla inline i zewnętrznych zasobów zamiast traktować je jednakowo
- format() na paginate() rozwiązuje niezgodność między wygenerowanymi URL-ami a rzeczywistym sposobem deploya (np. pliki .html)
- --ignore-lock odblokowuje uruchamianie wielu serwerów dev naraz, obchodząc mechanizm wprowadzony pierwotnie przeciw agentom AI
- deferRender i eksperymentalne collectionStorage: chunked adresują zużycie pamięci przy dużych kolekcjach treści

**Why do I care:** Solidne usprawnienia DX i architektoniczne dla zespołów już na Astro, szczególnie przy dużych serwisach treściowych. Nic, co zmienia sposób myślenia o frameworku, ale warto zaktualizować, jeśli któryś z tych problemów (CSP, pamięć, kolejność URL-i paginacji) był u was realnym bólem.

**Link:** [Astro 7.1](https://astro.build/blog/astro-710/)

## Hackers are exploiting recently patched WordPress bugs, putting millions of websites at risk

**TLDR:** Firmy cyberbezpieczeństwa raportują aktywne wykorzystywanie dwóch krytycznych luk załatanych właśnie w WordPressie, wersje 6.9.0 do 6.9.4 oraz 7.0.0 do 7.0.1 są podatne, a szacunki liczby zagrożonych witryn sięgają nawet 90 milionów.

**Summary:** Tekst dobrze pokazuje mechanikę ataku (dwie luki połączone dają pełną zdalną kontrolę nad witryną, luka nazwana WP2Shell) i słusznie chwali WordPressa za wymuszone aktualizacje oraz Cloudflare za blokowanie ataków na podatne strony. Problem w tym, że kluczowa liczba, czyli skala zagrożenia, jest metodologicznie krucha. Ktoś sprawdził próbkę 3500 witryn, wyszło mniej niż 15 procent podatnych, i tę proporcję ekstrapolowano na całą populację ponad 400 milionów witryn WordPressa, żeby dostać efektowne 90 milionów. To duży skok wnioskowania z małej próbki na globalną liczbę, i sam artykuł zresztą zaznacza, że statystyki WordPressa "prawdopodobnie nie odzwierciedlają" witryn już załatanych, czyli sam autor przyznaje, że liczba jest niepewna, ale i tak trafia do nagłówka.

Brakuje tu też konkretów technicznych, których czytelnik chciałby się dowiedzieć: nie ma numerów CVE, nie ma opisu klasy podatności (czy to RCE przez upload pliku, deserializację, czy coś innego), WP2Shell jest tylko nazwą marketingową nadaną przez firmę, która ją znalazła, bez wyjaśnienia mechanizmu. To sprawia, że tekst jest bardziej alarmem biznesowym niż materiałem, z którego programista wyniesie coś do wdrożenia.

**Key takeaways:**
- Dwie krytyczne luki w WordPressie (6.9.0-6.9.4, 7.0.0-7.0.1) połączone dają pełne przejęcie witryny
- WordPress wymusił automatyczne aktualizacje tam, gdzie to możliwe, co ograniczyło realną skalę problemu
- Szacunki liczby zagrożonych witryn są ekstrapolacją z małej próbki i warto traktować je z rezerwą
- Automattic potwierdził, że witryny hostowane przez nich (WordPress.com, Pressable, WPVIP) były chronione jeszcze przed publikacją poprawki

**Why do I care:** To głównie historia biznesowo-bezpieczeństwowa, nie architektoniczna, ale ważna dla każdego, kto doradza klientom w kwestii wyboru CMS-a albo utrzymuje instalacje WordPressa. Dobre przypomnienie, że self-hosted CMS niesie ciągły koszt utrzymania i łatania, którego statyczne albo w pełni zarządzane platformy w dużej mierze unikają.

**Link:** [Hackers are exploiting recently patched WordPress bugs](https://techcrunch.com/2026/07/20/hackers-are-exploiting-recently-patched-wordpress-bugs-putting-millions-of-websites-at-risk/)

## Time-based background colour transitions with Temporal and CSS color-mix

**TLDR:** Autorka opisuje, jak przebudowała motywy na swojej stronie tak, żeby kolory tła płynnie zmieniały się w zależności od pory dnia, łącząc eksperymentalne Temporal.PlainTime z CSS color-mix i animowalnymi custom properties, plus ręcznie napisany polyfill dla Safari.

**Summary:** To rzemieślniczy, dobrze udokumentowany tekst, w którym najciekawsza jest część techniczna, a nie efekt końcowy. Temporal.PlainTime naprawdę upraszcza porównywanie czasu bez daty i strefy, funkcja compare() i until() zdejmują z programisty ręczne żonglowanie epoch timestampami, a "midnight problem" (ujemny czas do wschodu słońca, gdy jest już po północy) jest opisany konkretnie, z kodem, zamiast zbyć go ogólnikiem.

Najbardziej praktyczna jest sekcja o rejestrowaniu custom properties przez window.CSS.registerProperty zamiast w CSS przez @property, właśnie po to, żeby uniknąć błysku niewłaściwego koloru przed uruchomieniem JS-a. To rozwiązuje realny problem FOUC na stronach statycznych bez renderowania po stronie serwera, i jest to detal, którego wiele tutoriali o animowalnych custom properties w ogóle nie porusza.

Trzeba jednak nazwać rzecz wprost: to wciąż eksperyment na osobistym blogu, nie wzorzec produkcyjny. Temporal nie jest jeszcze wszędzie dostępny natywnie, stąd konieczność własnego polyfilla zamiast sprawdzonej biblioteki, a napisanie własnego shima do porównywania dat to decyzja uzasadniona dla lekkiej strony bez bundlera, ale ryzykowna, gdyby ktoś skopiował ten wzorzec 1:1 do większej aplikacji bez testów pokrycia przypadków brzegowych, które autorka akurat dobrze przetestowała u siebie.

**Key takeaways:**
- Temporal.PlainTime i jego metody compare/until/subtract eliminują ręczne liczenie na epoch timestampach dla porównań czasu bez daty
- color-mix(in oklch, ...) pozwala płynnie mieszać dwa kolory według procentu, co dobrze nadaje się do przejść dnia/nocy
- Rejestrowanie custom properties przez JS (CSS.registerProperty) zamiast w CSS (@property) pozwala uniknąć błysku złego koloru przy starcie
- @supports (not (-webkit-text-size-adjust:none)) and (font: -apple-system-body) to sprawdzony sposób celowania wyłącznie w Safari na macOS

**Why do I care: ** Warto znać ten wzorzec, bo Temporal realnie zastąpi Date w przyszłości, a technika animowania custom properties przez color-mix jest przydatna dużo szerzej niż tylko do efektu dzień/noc, np. w motywach jasny/ciemny albo dynamicznym brandingu.

**Link:** [Time-based background colour transitions with Temporal and CSS color-mix](https://localghost.dev/blog/time-based-background-colour-transitions-with-temporal-and-css-color-mix/)

## Return of CSS Outline

**TLDR:** Krótki tekst przypomina, że usuwanie outline: 0 z elementów fokusowalnych to wciąż powszechny błąd w 2026 roku, mimo że :focus-visible od 2022 roku jest baseline i rozwiązuje dokładnie problem, dla którego kiedyś ludzie wyłączali outline.

**Summary:** Argument jest słuszny i ważny: bez widocznego outline'u użytkownicy klawiatury i osoby słabowidzące tracą jedyny sygnał, gdzie aktualnie jest fokus. Autor trafnie punktuje historię tego problemu, sięgającą co najmniej do 2008 roku, kiedy popularne resety CSS zerowały outline z komentarzem "zdefiniuj to później", co oczywiście nigdy się nie działo w wielu projektach.

Problem w tym, że sam tekst niewiele wnosi ponad ten dobrze znany argument. To głównie zbiór linków do starszych artykułów (część z 2014, 2022 roku) bez nowej analizy czy danych, anegdota o "jednym znanym reset CSS" nie ma nawet linku ani nazwy, więc trudno ją zweryfikować. Artykuł nie zadaje sobie trudu wyjaśnienia, dlaczego mimo tylu lat edukacji ten błąd wciąż się powtarza, np. presja design systemów, w których projektanci w Figmie po prostu nie projektują stanu fokusu, albo brak testów dostępności w CI, które wyłapałyby brak outline'u automatycznie. Wezwanie na koniec, żeby zgłaszać issue na GitHubie, jest sympatyczne, ale to rozwiązanie jednostkowe, nieskalowalne na tysiące witryn z tym problemem.

**Key takeaways:**
- :focus-visible jest baseline od 2022 roku i pozwala pokazywać outline tylko wtedy, gdy heurystyka przeglądarki uzna to za potrzebne
- Historyczne resety CSS zerujące outline bez przywracania go to wciąż częsta przyczyna braku widocznego fokusu
- Warto testować własną nawigację klawiaturą, zanim ktoś inny to zrobi za was i zgłosi problem

**Why do I care:** Szybkie przypomnienie do checklisty dostępności, ale bez nowej treści technicznej. Wartościowe jako link do wysłania komuś w zespole, kto akurat wyzerował outline w CSS reset.

**Link:** [Return of CSS Outline](https://www.morganwebdev.org/posts/outline-back/)

## Under my radar: the highlight API, text-indent and font-family: math | utilitybend

**TLDR:** Autorka przypomina o trzech funkcjach CSS, które osiągnęły baseline bez większego rozgłosu: Custom Highlight API do podświetlania tekstu bez manipulacji DOM-em, nowe słowa kluczowe text-indent (hanging, each-line) do edytorskich układów tekstu oraz font-family: math do natywnego renderowania MathML.

**Summary:** Najmocniejsza część dotyczy Custom Highlight API i tego, co dzieje się pod maską przeglądarki. Zamiast owijać dopasowany tekst w span-y (klasyczne, powolne podejście z reflow layoutu), przeglądarka pomija fazę layoutu w ogóle, bo geometria tekstu jest już policzona, i podczas malowania po prostu sprawdza, czy dany zakres znaków jest zarejestrowany w rejestrze podświetleń. To naprawdę dobre, konkretne wyjaśnienie techniczne, rzadkie w tego typu wpisach.

Sekcja o text-indent: hanging i each-line jest przyjemna i pokazuje realny problem (wcięcia wiszące w bibliografiach, wcięcia dla każdej linii w poezji), który wcześniej wymagał kombinowania z ujemnym text-indent i paddingiem. Trzecia część, o font-family: math i MathML, jest ciekawa, ale autorka sama przyznaje, że nie jest ekspertką w typografii matematycznej, więc twierdzenie, że czytniki ekranu poprawnie odczytają strukturę równania na głos, nie jest poparte żadnym nagraniem testu ani konkretnym przykładem z realnym czytnikiem ekranu, zostaje na poziomie deklaracji.

Trzeba też zauważyć, że te trzy funkcje nie mają ze sobą wiele wspólnego poza tym, że wszystkie "przeszły pod radarem". To fajny format na bloga, ale sprawia, że artykuł czyta się bardziej jak zbiór trzech osobnych notatek niż spójna całość, i to jest uczciwy sposób opisania tego, czym ten tekst faktycznie jest.

**Key takeaways:**
- ::highlight() z Custom Highlight API pomija fazę layoutu i pozwala podświetlać tekst bez mutacji DOM-u ani reflow
- text-indent: hanging tworzy wcięcie wiszące (pierwsza linia bez wcięcia, kolejne z wcięciem) bez hacków z paddingiem i ujemnym wcięciem
- text-indent: each-line stosuje wcięcie do każdej linii po wymuszonym złamaniu, przydatne przy poezji czy dialogach
- font-family: math włącza natywne czcionki matematyczne (STIX, Latin Modern Math) dla elementów MathML

**Why do I care:** Custom Highlight API to realnie przydatna rzecz przy budowaniu funkcji wyszukiwania w treści albo podświetlania wyników bez brudzenia DOM-u, warto mieć to w zanadrzu zamiast odtwarzać stare, powolne podejście ze span-ami.

**Link:** [Under my radar: the highlight API, text-indent and font-family: math](https://utilitybend.com/blog/under-my-radar-highlight-text-indent-and-font-family-math)

## Masonry (with Animation) in CSS

**TLDR:** Krótki wpis pokazuje demo Bramusa, w którym siatka masonry zbudowana natywnym CSS Grid animuje przeskoki elementów przy zmianie liczby kolumn, wykorzystując anchor positioning zamiast starej sztuczki z JavaScriptem i floatami z biblioteki Masonry.js.

**Summary:** Sztuczka jest naprawdę pomysłowa: to nie same komórki grida się animują, tylko dziecko wewnątrz komórki, ustawione position: absolute z inset: anchor(inside), które śledzi pozycję rodzica przez anchor positioning. Kiedy grid przelicza układ na nowo (dzięki repeat(auto-fill, ...)), ten wewnętrzny element płynnie przechodzi do nowej pozycji, mimo że efekt końcowy wygląda tak samo, jakby po prostu ustawić inset: 0.

Problem w tym, że autor reaguje na to entuzjazmem ("mind-blowing", "magiczne") bez ani słowa o tym, dla kogo ta technika w ogóle jest dziś użyteczna. display: grid-lanes (natywny masonry) jest dostępny tylko w Safari i pod flagą w Chrome i Firefoksie, a anchor positioning też ma nierówne wsparcie między przeglądarkami. To sprawia, że cały wpis jest właściwie pokazem możliwości na przyszłość, a nie czymś do wdrożenia dziś, i szkoda, że nie ma nawet zdania o strategii fallbacku dla przeglądarek, które tego jeszcze nie obsługują, bo to właśnie ta część odróżnia ciekawostkę od realnej rekomendacji.

**Key takeaways:**
- Naturalny masonry w CSS to display: grid-lanes, obecnie dostępny w Safari i za flagą w Chrome/Firefox
- Anchor positioning (inset: anchor(inside)) pozwala animować pozycję elementu śledzącego inny element bez JS
- Klucz do animacji leży w animowaniu dziecka pokrywającego komórkę grida, nie samej komórki
- Brak wzmianki o strategii fallback czyni tę technikę na razie ciekawostką, nie gotowym wzorcem produkcyjnym

**Why do I care:** Warto zapamiętać na później, ale nie ma co jeszcze wdrażać w produkcji. Dobra rzecz do obserwowania razem z rozwojem wsparcia dla masonry i anchor positioning w przeglądarkach.

**Link:** [Masonry (with Animation) in CSS](https://master.dev/blog/masonry-with-animation-in-css/)

## Animating <details> Element with Only CSS

**TLDR:** Krótki, konkretny przepis na animowanie otwierania i zamykania natywnego elementu details wyłącznie CSS-em, przez details::details-content, block-size, calc-size() i transition-behavior: allow-discrete, bez ani linijki JavaScriptu.

**Summary:** To dokładnie ten typ wpisu, który powinien istnieć częściej: pytanie na górze, odpowiedź od razu pod nim, wyjaśnienie linia po linii dla tych, którzy chcą zrozumieć mechanikę. Sedno działania polega na animowaniu dwóch właściwości naraz, block-size (wysokość) i content-visibility, gdzie ta druga czeka, aż pierwsza skończy animację, dzięki czemu treść nie znika i nie pojawia się skokowo. calc-size(auto, size) rozwiązuje odwieczny problem animowania do wysokości auto, który wcześniej wymagał JS-a mierzącego scrollHeight albo hacków z max-height.

Jedyna rzecz, którą warto zakwestionować, to sposób, w jaki autor zbywa brak wsparcia w Firefoksie: "jestem użytkownikiem Firefoksa i jest mi to ok", co jest uczciwą deklaracją własnych priorytetów, ale nie odpowiada na pytanie, czy projekt z istotnym udziałem użytkowników Firefoksa powinien w ogóle sięgać po ten wzorzec już teraz, czy poczekać. Progressive enhancement jako argument broni się tylko wtedy, gdy różnica między wersją animowaną a nieanimowaną faktycznie nie wpływa na użyteczność, co w tym konkretnym przypadku akurat jest prawdą, details i tak działa, po prostu bez animacji.

**Key takeaways:**
- details::details-content pozwala celować w treść elementu details osobno od jego stanu otwarcia
- transition-behavior: allow-discrete umożliwia animowanie właściwości dyskretnych, jak content-visibility
- calc-size(auto, size) rozwiązuje problem animowania do wysokości auto bez JS-a mierzącego wysokość treści
- Można też animować własny znacznik (marker) rozwijania przez ::before z rotate zamiast domyślnego trójkącika

**Why do I care:** Bezpośrednio przydatny wzorzec dla akordeonów, FAQ i wszelkich rozwijanych sekcji opartych o natywny details, mniej JS-a do utrzymania i mniejszy bundle niż z biblioteką animacji.

**Link:** [Animating <details> Element with Only CSS](https://austingil.com/animating-details-element-with-only-css/)

## Regressive JPEGs

**TLDR:** Zabawny, mocno techniczny wpis pokazujący, jak wewnętrzna struktura skanów progresywnego JPEG-a (od niskiej do pełnej rozdzielczości) pozwala skleić kilka obrazów w jeden plik, który podczas wolnego ładowania odtwarza się jak prymitywne "wideo".

**Summary:** Autor rozkłada format JPEG na czynniki pierwsze: skany DC-only kontra AC, tabele Huffmana, podpróbkowanie chrominancji YCbCr, i pokazuje, że konkatenacja kilku obrazów z pominięciem markerów start/end pozwala uzyskać plik, który podczas transferu przez wolne łącze przełącza się między kolejnymi "klatkami". Problem w tym, że większość dekoderów poddaje się po dziewięciu skanach (prawdopodobnie zabezpieczenie przed czymś w rodzaju zip bomby), co ogranicza liczbę klatek, dopóki autor nie wpada na to, żeby używać obrazów z jednym skanem typu DC-only, co pozwala upakować już około 90 klatek w Chrome.

To, co odróżnia ten tekst od wielu "patrzcie, co zbudowałem", to szczerość co do braku zastosowania: autor wprost pisze, że poza rickrollami i trollowaniem nie ma to praktycznego zastosowania, bo w pliku nie ma żadnej informacji o czasie, więc odtwarzanie zależy wyłącznie od opóźnień sieciowych. Nie ma tu nic do podważenia merytorycznie, bo autor sam realistycznie ocenia wartość swojego eksperymentu, co samo w sobie jest rzadkością.

**Key takeaways:**
- Progresywny JPEG dzieli dane na skany, od niskiej rozdzielczości (DC) do pełnej precyzji (AC)
- Konkatenacja obrazów o tej samej rozdzielczości z usuniętymi markerami SOI/EOI tworzy plik przełączający się między "klatkami" podczas ładowania
- Większość dekoderów przerywa renderowanie po ograniczonej liczbie skanów, co limituje liczbę możliwych "klatek"
- Obrazy zawierające tylko skan DC (bez AC) pozwalają upakować znacznie więcej "klatek" w jednym pliku

**Why do I care:** Głównie wartość edukacyjno-rozrywkowa, ale dobra okazja, żeby lepiej zrozumieć wewnętrzną strukturę JPEG-a, co bywa przydatne przy myśleniu o strategiach progresywnego ładowania obrazów w realnych aplikacjach.

**Link:** [Regressive JPEGs](https://maurycyz.com/projects/bad_jpeg/)

## How to Host a Static Site on AWS for the Price of a Domain

**TLDR:** Praktyczny przewodnik po hostowaniu małej statycznej strony (piekarni popup) na AWS za pomocą CDK: S3 na pliki, CloudFront jako CDN i HTTPS, Route 53 na DNS, ACM na certyfikat, oraz GitHub Actions do automatycznego deploya, za około dwa dolary miesięcznie plus koszt domeny.

**Summary:** Stos jest opisany porządnie i krok po kroku, z realnym kodem CDK w Pythonie, a nie tylko diagramem koncepcyjnym. Szczególnie warta pochwały jest sekcja o dedykowanym użytkowniku IAM do deployów, którego polityka jest zawężona dokładnie do dwóch uprawnień: zapisu do jednego konkretnego bucketu i unieważniania cache jednej konkretnej dystrybucji CloudFront. To rzadkie w tutorialach, które zwykle wklejają klucze admina do sekretów CI, i tutaj autorka jasno tłumaczy, dlaczego to źle: wyciek takich kluczy oznaczałby przejęcie plików piekarni, a nie całego konta AWS.

Problem pojawia się w podsumowaniu, gdzie autorka twierdzi, że to "tylko kilkadziesiąt linii CDK, jedno kliknięcie walidacji i użytkownik z dwoma uprawnieniami", i przeciwstawia to sięganiu po Vercel czy Heroku jako "dużemu przedsięwzięciu, którego się unika". To porównanie jest nieuczciwe, bo pomija realny koszt: ona już umie pisać CDK z pracy zawodowej. Dla kogoś bez tego zaplecza krzywa uczenia się AWS CDK, Route 53, ACM i CloudFront łącznie jest zdecydowanie bardziej stroma niż wdrożenie tej samej strony na Vercel, Netlify czy Cloudflare Pages za darmo, z automatycznym HTTPS, CDN-em i deployem bez pisania jednej linijki infrastruktury jako kodu. Artykuł nigdy nie liczy całkowitego kosztu posiadania włącznie z czasem inżynierskim, tylko cenę infrastruktury, co jest porównaniem niepełnym.

**Key takeaways:**
- Stos S3 + CloudFront + Route 53 + ACM pozwala hostować statyczną stronę za grosze, ale wymaga wcześniejszej znajomości AWS
- Certyfikat ACM dla CloudFront musi znajdować się w regionie us-east-1 niezależnie od tego, gdzie leżą inne zasoby
- Rejestracja domeny w Route 53 warto trzymać poza kodem infrastruktury, żeby cdk destroy nigdy jej przypadkiem nie skasował
- Zawężony użytkownik IAM do deployów (tylko zapis do bucketu i unieważnianie cache) ogranicza skutki ewentualnego wycieku kluczy

**Why do I care:** Dobra referencja architektoniczna dla zespołów rozważających self-hosting statycznych stron zamiast platform zarządzanych, a praktyka zawężonego użytkownika IAM do deployów to nawyk wart wdrożenia niezależnie od wybranej platformy.

**Link:** [How to Host a Static Site on AWS for the Price of a Domain](https://spin.atomicobject.com/host-static-site-aws/)

## Throwing Confetti with CSS Random

**TLDR:** Bardzo dogłębny tekst techniczny wyjaśniający, jak działa nowa funkcja CSS random() (koncept "random cache name"), i budujący na tej podstawie w pełni progresywnie wzbogacony efekt konfetti, z warstwami cascade, feature queries i obsługą prefers-reduced-motion.

**Summary:** To najlepiej zrobiony tekst w tym zestawieniu. Autor tłumaczy sedno mechanizmu random(): funkcja nie rzuca nową kostką za każdym odczytem, tylko jest kluczowana przez nazwę zbudowaną z elementu, właściwości i dokumentu, dzięki czemu dwie wartości o tej samej nazwie zawsze zgadzają się ze sobą, nawet po przeliczeniu layoutu przy zmianie rozmiaru okna. To rozwiązuje realny problem: bez tego confetti skakałoby losowo przy każdym resize, co byłoby bezsensowne wizualnie.

Najbardziej wartościowa część dotyczy pułapek, w które autor sam wpadł: custom property z random() w środku jest ewaluowana ponownie przy każdym odczycie przez var(), więc jedna właściwość czytana dwukrotnie (np. rozmiar używany w dwóch miejscach) bez jawnej nazwy da dwie różne wartości. Podobnie błąd w random() wewnątrz custom property nie odrzuca deklaracji przy parsowaniu jak zwykłe, nieznane CSS, tylko psuje się dopiero przy substytucji przez var(), więc trzeba to świadomie owinąć w @supports testujące dokładnie tę składnię, z której się korzysta, a nie samą obecność funkcji.

Jedyna rzecz, którą warto nazwać wprost, bo sam artykuł tego nie robi: to wciąż funkcja niebędąca baseline, Firefox nie ma jej wcale, a Safari i Chrome różnią się w obsłudze niektórych słów kluczowych. Inwestowanie aż tyle przemyślanej architektury CSS (warstwy cascade, feature queries, ochrona fallbacku) w funkcję na tak wczesnym etapie to swego rodzaju zakład, że warto się tego nauczyć teraz zamiast poczekać rok na szersze wsparcie, i artykuł nigdy nie stawia tego pytania wprost, mimo że sam jest najlepszym dowodem na to, jak dużo trzeba dziś wiedzieć, żeby bezpiecznie użyć tej jednej funkcji.

**Key takeaways:**
- random() jest kluczowane nazwą zbudowaną z elementu, właściwości i dokumentu, nie losowane od nowa przy każdym odczycie
- Custom property z random() w środku jest ewaluowana ponownie przy każdym odczycie przez var(), warto nadawać jawną nazwę (dashed-ident), gdy właściwość jest czytana w kilku miejscach
- Błąd składniowy w random() wewnątrz custom property psuje się dopiero przy substytucji, nie przy parsowaniu, dlatego fallback trzeba chronić przez @supports testujące dokładną składnię
- Cascade layers (@layer) rozwiązują konflikt specyficzności między fallbackiem (nth-child) a ulepszeniem (@supports) skuteczniej niż podwójne warunki @supports i @supports not
- prefers-reduced-motion powinno wyłączać animację całkowicie, a nie tylko ją spowalniać, żeby uniknąć wywoływania mdłości u wrażliwych użytkowników

**Why do I care:** Bardzo relevantne dla każdego budującego generatywne albo losowe elementy UI (stany ładowania, dekoracje, efekty cząsteczkowe) bez JS-a, a przy okazji to świetne studium dyscypliny progressive enhancement, przenoszalne dużo dalej niż samo confetti.

**Link:** [Throwing Confetti with CSS Random](https://schalkneethling.com/posts/throwing-confetti-with-css-random/)

## Use cases for aria-expanded

**TLDR:** Przegląd tego, które wzorce UI faktycznie wymagają aria-expanded (disclosure widget, akordeon, fly-out menu, hamburger, tree view, combobox) a które potrzebują czegoś innego (dialog to aria-modal, tooltip i taby to aria-haspopup), z naciskiem na natywne elementy HTML jak details, dialog i Popover API jako zamienniki bez JS.

**Summary:** To użyteczny materiał referencyjny, bo aria-expanded jest jednym z tych atrybutów, które programiści dodają "na wszelki wypadek" do każdego rozwijanego czegokolwiek, nie zastanawiając się, czy to w ogóle właściwy wzorzec. Autorka dzieli świat na sekcje zwijalne (disclosure widget, akordeon) i interaktywne elementy zwijalne (menu, nawigacja, tree view, combobox), i konsekwentnie w każdej sekcji wskazuje natywną alternatywę HTML tam, gdzie istnieje, zamiast każdorazowo polecać budowanie od zera z ARIA.

Najmocniejszy fragment dotyczy dialogu i tooltipa, gdzie autorka pokazuje, jak invoker commands (command, commandfor) razem z natywnym dialog i Popover API pozwalają zbudować modal albo tooltip bez ani linijki JavaScriptu, tylko atrybutami HTML. To bardzo praktyczna wskazówka, bo redukuje zarówno ilość kodu do utrzymania, jak i ryzyko błędnie zaimplementowanej pułapki fokusu w customowym modalu.

Trzeba jednak zauważyć pewną niespójność: autorka słusznie powtarza za APG, że wzorce z przewodnika WAI-ARIA "nie nadają się do produkcji", tylko ilustrują użycie ról, ale własne przykłady w artykule też są dość minimalne i nigdzie nie ma wzmianki, że zostały przetestowane z realnym czytnikiem ekranu, poza ogólnym zapewnieniem o poprawności. To ten sam grzech, o który autorka oskarża APG, tylko w mniejszej skali, i uczciwie byłoby to przyznać wprost zamiast zostawiać domyślnie.

**Key takeaways:**
- aria-expanded pasuje do disclosure widget, akordeonu, fly-out menu, hamburgera prowadzącego do nawigacji, tree view i combobox
- Dialog powinien używać aria-modal (a najlepiej natywnego elementu dialog), nie aria-expanded
- Tooltip i zakładki lepiej opisuje aria-haspopup niż aria-expanded
- Natywny dialog z invoker commands (command/commandfor) i Popover API pozwalają zbudować modal i tooltip bez JavaScriptu
- Natywny select ma wbudowaną obsługę klawiatury i dostępność, więc budowanie własnego combobox warto zostawić na sytuacje, gdzie select faktycznie nie wystarcza

**Why do I care:** Bardzo przydatne dla każdego budującego interaktywne komponenty (akordeony, menu, combobox), bo porządkuje często mylony atrybut ARIA i konsekwentnie pcha w stronę natywnych elementów HTML, co realnie zmniejsza dług utrzymaniowy w JS.

**Link:** [Use cases for aria-expanded](https://piccalil.li/blog/use-cases-for-aria-expanded/)
