---
title: "Frontend Focus: Site Seeing, kolory systemowe, wizualne testy lokalnie i dostępny czat z LLM"
excerpt: "Responsywność to coś więcej niż zmiana rozmiaru okna, a kolory systemowe CSS wcale nie gwarantują kontrastu."
publishedAt: "2026-11-11"
slug: "frontend-focus-site-seeing-kolory-systemowe-testy-wizualne-dostepnosc-czatu"
hashtags: "#frontendfocus #css #html #accessibility #testing #playwright #svg #generated #pl"
source_pattern: "Frontend Focus"
---

## Site Seeing i kontekst użycia strony

**TLDR:** Ishadeed zbudował narzędzie, które pokazuje stronę w nietypowych kontekstach, na przykład z otwartymi devtoolsami, z pionowymi kartami przeglądarki albo w druku. Argument jest taki, że zmiana rozmiaru okna to za mało.

**Summary:** Prawdziwy użytkownik rzadko ogląda stronę w czystym oknie o idealnym rozmiarze. Ma otwarty panel narzędzi deweloperskich, pionowe karty zabierające szerokość, a czasem drukuje. Site Seeing pozwala wybrać taki tryb i zobaczyć efekt na własnej stronie. Autor pokazuje to na prostym projekcie testowym i prosi o opinie. Narzędzie jest dla projektantów, product managerów i deweloperów.

**Key takeaways:**
- Viewport to tylko jeden z wielu kontekstów.
- Devtools, pionowe karty i druk zmieniają dostępne wymiary.
- Warto sprawdzić własny layout w takich trybach.

**Why do I care:** Pytanie o drukowanie i dziwne szerokości zadaje się zwykle po wdrożeniu. Mam wrażenie, że zespoły sprawdzają trzy breakpointy i uważają temat za zamknięty. Narzędzie jest dobrym pretekstem, żeby wrócić do container queries tam, gdzie komponent nie wie, w jakim kontekście go osadzono.

**Link:** [Beyond the viewport: Introducing Site Seeing](https://ishadeed.com/article/beyond-the-viewport/)

## Paul Ford o tym, że sieć wystarczy

**TLDR:** Po premierze tinylittleoffice.com, pakietu biurowego trzymającego dane w adresie URL, Paul Ford zauważa, że przeglądarka jest bardzo potężnym środowiskiem aplikacji, a koszt dostępu do tej mocy spada z dnia na dzień.

**Summary:** Aplikację odwiedziły setki tysięcy ludzi, serwer na darmowym planie Cloudflare padł, a hosting po wykupieniu planu kosztował zero. Autor wkładał w nią mniej więcej dwa razy tyle wysiłku, co w długi newsletter. Przeglądarka ma Web Crypto, WebAssembly, WebGL i Web Audio, a każde z nich jest ogromne. Wcześniej projektowano je dla dużych zespołów, nie dla pojedynczych osób. Teraz agenci pomagają jednej osobie ogarnąć ich wszystkie, czego przykładem jest gra Battle Drones Simona Willisona, wieloosobowa i działająca offline.

Ford widzi z tego dwa skutki. Sklepy z aplikacjami tracą na atrakcyjności, bo pomysł można sprawdzić na serwerze webowym za zero dolarów. A programiści zaczynają być w sytuacji pisarzy, którym nikt nie chce płacić.

**Key takeaways:**
- Koszt budowy bogatych aplikacji webowych spada.
- Hosting statyczny na Cloudflare był praktycznie darmowy nawet przy setkach tysięcy odwiedzin.
- Autor przewiduje spadek wartości aplikacji w sklepach i presję na ceny pracy programistów.

**Why do I care:** Zgadzam się z tezą o przeglądarce, mniej z optymizmem. Aplikacja z danymi w URL jest świetna, dopóki nie potrzebujesz kont, synchronizacji i prawdziwej współpracy. Ford pomija, że trudna część produktu zaczyna się właśnie wtedy, gdy kończy się demo.

**Link:** [The Web Is More Than Enough, by Paul Ford](https://ftrain.com/aboard-the-web-is-more-than-enough)

## Kolory systemowe CSS muszą ze sobą współpracować

**TLDR:** Aaron Gustafson pokazuje, że pary kolorów systemowych, takie jak Highlight i HighlightText, bywają w niektórych przeglądarkach i systemach nieczytelne. Zbudował badanie, w którym możesz to sprawdzić.

**Summary:** Zaczęło się od przycisków niedostępnych w ciemnym motywie Chrome na Androidzie. Kontrast między HighlightText a Highlight wynosił 1,98:1 i nie spełniał żadnego z pięciu progów WCAG. Podobny problem zgłosił użytkownik w trybie wymuszonych kolorów Windows.

Nazwy kolorów opisują rolę, na przykład Canvas i CanvasText, ale konkretną wartość wybiera przeglądarka i system. Badanie System Color Study zbiera zapisane obserwacje dla trybów jasnego, ciemnego, wymuszonych kolorów i wyższego kontrastu, i oblicza kontrast każdej pary. Na końcu jest lista par, które przechodzą AA dla normalnego tekstu we wszystkich zarejestrowanych środowiskach. Autor prosi też producentów przeglądarek o poprawki i zachęca do dodawania własnych migawek.

**Key takeaways:**
- Nazwa koloru nie gwarantuje czytelnej pary.
- Problemy dotyczą Chrome, Edge, Firefoksa i Safari w różnych konfiguracjach.
- Badanie jest otwarte na nowe obserwacje, zwłaszcza z Linuksa.

**Why do I care:** Kolory systemowe wyglądają jak darmowa dostępność, a okazują się ukrytym ryzykiem. Jeśli budujesz bibliotekę komponentów na tych słowach kluczowych, przejrzyj tabelę par przed wydaniem. I dodaj do testów sprawdzenie w trybie wymuszonych kolorów.

**Link:** [System Colors Need to Work Together](https://www.aaron-gustafson.com/notebook/system-colors-need-to-work-together/)

## Lokalne testy regresji wizualnej z Playwright i Dockerem

**TLDR:** Mainmatter proponuje robić regresję wizualną lokalnie, tak by agent mógł sam czytać zrzuty i diffy, a koszty nie rosły razem z liczbą PR-ów.

**Summary:** Percy i Chromatic dają zatwierdzanie zmian po fakcie, ale pętla zwrotna jest wolna, a przy agentach koszt rośnie. Na przykładzie Actual Budget liczba PR-ów podwoiła się z około 70 do około 140, co daje 2,5 do 3 razy więcej zrzutów i koszt z około 490 do około 1600 dolarów w Chromatic, a w Percy z około 3300 do 8300. W Playwright ten sam ruch to około 19 do 47 dolarów minut CI.

Rozwiązanie to toHaveScreenshot z Playwright. Pierwsze uruchomienie zapisuje bazowy PNG, kolejne porównują i zapisują obraz oczekiwany, otrzymany i diff w folderze test-results. Agent czyta te pliki bezpośrednio. W przykładzie diff pokazał też niechciany efekt uboczny, bo agent przy zmianie koloru akcentu usunął efekt glitch w nagłówku.

Zgodność między systemami zapewnia kontener z oficjalnego obrazu Playwright, z platformą linux/amd64 i przypiętą wersją Playwright. Autor dodaje skill, który każe agentowi uruchamiać testy po każdej zmianie wizualnej i aktualizować zrzuty tylko wtedy, gdy zmiana pokrywa się z prośbą. Zastrzega, że rozwiązanie może nie być dla każdego, bo zrzuty puchną w historii gita, a utrzymanie własnego systemu kosztuje.

**Key takeaways:**
- Pętla lokalna jest szybsza i tańsza niż usługi SaaS przy dużej liczbie PR-ów.
- Docker usuwa różnice w renderowaniu między systemami.
- Aktualizacja zrzutów jest destrukcyjna, więc skill każe agentowi pytać, gdy nie ma pewności.

**Why do I care:** Liczby kosztów pochodzą z szacunków, a nie z faktur, więc traktuję je jako rząd wielkości. Za to historia z niechcianym usunięciem efektu to dokładnie powód, dla którego chcę takich testów w repozytorium z agentami. Główny koszt, o którym autor mówi mało, to utrzymanie fixture'ów i fontów, bo pierwszy zrzut już pokazał rozjazd przez czcionki systemowe macOS.

**Link:** [Local visual regression testing](https://mainmatter.com/blog/2026/11/03/local-visual-regression-testing/)

## Linked Parameters w SVG zbliżają się do wszystkich przeglądarek

**TLDR:** Specyfikacja Linked Parameters pozwoli stylować SVG z zewnątrz, także gdy jest użyty w img lub jako tło. Implementacje trwają w Firefoksie, Blink i WebKit.

**Summary:** Dziś, żeby sparametryzować SVG, wiele zespołów wkleja go do JSX i bundluje, co oznacza duże, niecache'owane fragmenty kodu. Linked Parameters mają to zmienić. Firefox Nightly ma już implementację rozpoczętą w marcu 2026, Chromium pracuje według explainera Microsoftu z czerwca 2026, a WebKit ma wiele scalonych PR-ów od 28 lipca i wzmiankę w Safari Technology Preview 254.

Autor opisuje historię od szkicu z 2009 roku i uważa, że cecha połączy sukces nowoczesnego CSS z SVG. Zastrzega, że wydajność SVG, zwłaszcza filtrów, wciąż jest słaba.

**Key takeaways:**
- Prace trwają w trzech głównych silnikach.
- Pozwoli to przekazywać zmienne CSS do pliku SVG bez bundlowania.
- Sprawa nie jest jeszcze w Interop, a pytania do specyfikacji zostały.

**Why do I care:** Dla systemów designu to ważna zmiana, bo ikony i dekoracje mogłyby być zwykłymi plikami z tematami. Nie planowałbym jeszcze na tym architektury, bo daty wsparcia we wszystkich przeglądarkach nie ma.

**Link:** [Groundbreaking Upgrade to SVG is Approaching: Linked Parameters Are Almost Here](https://blog.kizu.dev/link-parameters-soon/)

## Jak zrobić dostępny czat z LLM

**TLDR:** Eric Bailey w Smashing Magazine opisuje praktyczne zasady dostępności dla pełnoekranowych czatów z LLM, od regionów live po nawigację F6.

**Summary:** Problem zaczyna się tam, gdzie osoba z czytnikiem ekranu ma fokus w polu wprowadzania i nie wie, że pojawiła się odpowiedź. Rozwiązaniem jest jeden dedykowany region live na końcu DOM, a nie aria-live na każdej wiadomości. Ogłaszasz gotową odpowiedź, a nie strumień. Przy braku tekstu ładowania ogłaszasz po pięciu sekundach "Ładowanie" i powtarzasz co pięć sekund, a gotową odpowiedź od razu.

Przed każdą wiadomością warto dać ukryty wizualnie nagłówek w stylu "You said" i "Agent said", bo nagłówki to najczęstszy sposób nawigacji. Landmarki tylko dla dużych obszarów, nie dla wiadomości. Lista rozmów jako widget złożony, jedno zatrzymanie tabulatora i strzałki w środku. Wzorca feed autor odradza. Dodatkowo Ctrl+F6 do skakania między landmarkami, ustawienia granularności ogłoszeń, wyłączanie animacji i dźwięku, edytowalne skróty, a dla tabel i bloków kodu krótkie opisy w rodzaju "settings.json, 738 linii". ariaNotify jest na razie lepiej odłożyć.

**Key takeaways:**
- Jeden region live dla wszystkich komunikatów, ogłaszanie dopiero po zakończeniu strumienia.
- Ukryte nagłówki i niewiele landmarków ułatwiają nawigację.
- Preferencje użytkownika są częścią dostępności, nie dodatkiem.

**Why do I care:** Każdy zespół, który dokłada czat do produktu, kopiuje wzorzec z ChatGPT i dziedziczy jego problemy. Ten tekst to gotowa lista kontrolna do przeglądu. Jedno zastrzeżenie, część rad opiera się na badaniach inkluzywnych, które autor cytuje bez szczegółów, więc testy z prawdziwymi użytkownikami nadal są konieczne.

**Link:** [Making Immersive LLM Chat Experiences More Accessible](https://www.smashingmagazine.com/2026/11/making-immersive-llm-chat-experiences-more-accessible/)

## Reimplementacja :nth-child() w nowoczesnym CSS

**TLDR:** Temani Afif odtwarza selektor :nth-child() za pomocą if(), sibling-index() i mod(), po to by móc zmieniać jego argumenty zmiennymi.

**Summary:** Dla pojedynczego indeksu wystarczy warunek porównujący sibling-index() z zmienną. Dla zakresów używa się nierówności, a dla wielokrotności funkcji mod, z dodatkowym sprawdzeniem znaku, bo mod z ujemnymi liczbami daje fałszywe trafienia. Pełna forma An+B wymaga dodatkowej zmiennej i obsługi przypadku A równego zero, a autor zostawia analizę jako zadanie domowe.

**Key takeaways:**
- if() i sibling-index() pozwalają na dynamiczne selektory.
- Znak współczynnika A trzeba sprawdzać osobno.
- To ćwiczenie edukacyjne, nie zamiennik selektora.

**Why do I care:** Nie użyję tego w produkcji, bo wsparcie if() jest jeszcze młode, a kod dłuższy niż natywny selektor. Ale to najlepszy kurs nowych funkcji CSS, jaki widziałem w tym miesiącu.

**Link:** [Re-Implementing :nth-child() With Modern CSS](https://css-tricks.com/re-implementing-nth-child-with-modern-css/)
