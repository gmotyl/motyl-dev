---
title: "daily.dev: apetyt energetyczny AI kontra bitcoin, agentowy edytor animacji Motion Studio i własna tabela w React z MobX"
excerpt: "Zużycie prądu przez AI właśnie dogoniło bitcoin i, w przeciwieństwie do niego, nie ma sufitu, do tego agentowy edytor animacji webowych Motion Studio oraz przepis na sortowalną, stronicowaną tabelę w React bez biblioteki, opartą na MobX."
publishedAt: "2026-09-22"
slug: "dailydev-ai-energia-bitcoin-motion-studio-mobx-tabela"
hashtags: "#dailydev #ai #react #vite #performance #architecture #generated #pl"
source_pattern: "daily.dev"
---

## Bitcoin przestał być energetycznym straszakiem, AI dopiero się rozpędza

**TLDR:** Zużycie prądu przez sieć bitcoin ustabilizowało się od lat na poziomie około 138 TWh rocznie dzięki wbudowanemu mechanizmowi trudności kopania, który ogranicza opłacalne wydatki górników. AI dopiero zrównało się z tym poziomem, ale Międzynarodowa Agencja Energii prognozuje, że do 2030 roku może pochłaniać 330-470 TWh, czyli dwa do trzech razy więcej niż bitcoin, bo nic nie ogranicza tego wzrostu odgórnie.

**Summary:** Przez lata bitcoin był ulubionym celem krytyki za zużycie energii, a AI rosło w cieniu tej narracji. Tekst odwraca ten obraz liczbami: sieć bitcoin zużywa około 0,5% globalnej energii elektrycznej i ta wartość praktycznie się nie zmienia, bo mechanizm dostosowania trudności kopania automatycznie ogranicza, ile mocy obliczeniowej opłaca się wrzucić w sieć przy danej cenie bitcoina. AI nie ma takiego regulatora. Rosnący popyt na trenowanie i inferencję modeli napędza budowę kolejnych centrów danych bez naturalnego sufitu, stąd prognoza IEA mówiąca o dwu- do trzykrotnym przebiciu poziomu bitcoina już za cztery lata.

Drugi wątek dotyczy źródeł energii. Górnicy bitcoina, zgodnie z danymi przywołanymi w artykule, korzystają w 43-65% z energii odnawialnej, bo ich model biznesowy każe im gonić za najtańszym prądem, gdziekolwiek jest on uwięziony w sieci, na przykład nadwyżki z farm wiatrowych, których nie da się przesłać dalej. Centra danych ogólnie mają w miksie energetycznym tylko około 27% OZE, bo lokalizują się bliżej klientów i infrastruktury sieciowej, a nie tam, gdzie akurat jest tania zielona energia.

Ciekawy jest też wątek ekonomiczny: po połowieniu nagrody za blok w kwietniu 2024 roku i wzroście hashrate'u do rekordowego poziomu w październiku 2025, opłacalność kopania spadła na tyle, że część górników zaczęła wynajmować swoją najcenniejszą infrastrukturę, czyli podłączoną do sieci energetycznej ziemię, firmom AI zamiast dalej kopać. Autor nazywa to „wielką dezercją" i wiąże z około dwudziestoprocentowym spadkiem globalnego hashrate'u od szczytu.

**Key takeaways:**
- Zużycie energii przez bitcoin jest samoograniczające się dzięki mechanizmowi trudności kopania i od lat oscyluje wokół 138 TWh rocznie
- AI dopiero dogoniło bitcoin energetycznie, ale IEA prognozuje 330-470 TWh do 2030 roku, bo popyt na moc obliczeniową nie ma wbudowanego regulatora
- Po spadku opłacalności kopania po halvingu z 2024 roku część górników zaczęła wynajmować infrastrukturę energetyczną firmom AI zamiast dalej kopać bitcoin

**Why do I care:** To temat bardziej dla osób śledzących politykę energetyczną i infrastrukturę niż dla kogoś piszącego frontend na co dzień, ale warto znać te liczby, bo pytania o koszt energetyczny AI coraz częściej trafiają do zespołów produktowych przy okazji rozmów o zrównoważonym rozwoju czy raportowaniu ESG. Jeśli twoja firma buduje cokolwiek na dużą skalę z wykorzystaniem modeli AI, to argument o rosnącym zapotrzebowaniu energetycznym prędzej czy później pojawi się w rozmowie z klientem enterprise albo inwestorem.

**Link:** [Remember when bitcoin was killing the planet?](https://daily.dev/posts/iVdmOe9cs)

## Kamera internetowa jako źródło żywego komentarza od modelu wizyjnego

**TLDR:** Mały, pozbawiony frameworka projekt Node.js pozwala skierować kamerę internetową na dowolną scenę i otrzymywać na żywo komentarz od modelu wizyjno-językowego uruchamianego przez Nebius Token Factory, z modelem DeepSeek-V4.1-Flash przypiętym po stronie serwera.

**Summary:** Projekt jest inspirowany wcześniejszym `ngxson/smolvlm-realtime-webcam`, ale zamiast lokalnego, małego modelu korzysta z hostowanego modelu wizyjnego przez Nebius Token Factory. Wymaga tylko Node 22.9 lub nowszego oraz klucza API, bez żadnego kroku budowania. Architektura opiera się na małym serwerze proxy, który trzyma klucz API z dala od przeglądarki, co jest standardowym, ale wciąż wartym powtórzenia wzorcem przy integracji front-endu z płatnymi API modeli.

README poświęca sporo miejsca praktycznemu strojeniu wydajności, co czyni ten projekt bardziej wartościowym niż zwykły przykład integracji. Wyłączenie trybu rozumowania modelu oszczędza budżet tokenów, który inaczej model spala na ukryte myślenie zamiast na sam opis obrazu. Utrzymywanie „ciepłego" połączenia HTTP/2 zapobiega opóźnieniom związanym z uzgadnianiem TCP i TLS przy każdej klatce, co przy strumieniu w czasie rzeczywistym ma bezpośrednie przełożenie na odczuwalne opóźnienie.

Autor obala też intuicyjne założenia: obniżenie szczegółowości obrazu, rozdzielczości czy wartości `max_tokens` niekoniecznie przyspiesza działanie, bo wąskim gardłem bywa coś innego niż rozmiar danych wejściowych. To dobra lekcja dla każdego, kto optymalizuje pod kątem kosztu i opóźnienia integracji z modelami wizyjnymi, zamiast zgadywać na podstawie intuicji.

**Key takeaways:**
- Projekt streamuje obraz z kamery do hostowanego modelu wizyjnego przez Nebius Token Factory, bez własnego frameworka i bez kroku budowania
- Wyłączenie trybu rozumowania modelu i utrzymywanie ciepłego połączenia HTTP/2 to konkretne dźwignie na opóźnienie, nie tylko na koszt
- Obniżanie rozdzielczości, szczegółowości obrazu czy `max_tokens` nie zawsze przyspiesza odpowiedź, warto mierzyć zamiast zakładać

**Why do I care:** Integracje z modelami wizyjnymi w czasie rzeczywistym stają się coraz częstszym wymaganiem produktowym, od moderacji treści po asystentów wideo, a większość zespołów frontendowych ma niewielkie doświadczenie w strojeniu takich pipeline'ów pod kątem opóźnienia. Ten projekt jest dobrym punktem odniesienia, bo pokazuje konkretne, sprawdzone optymalizacje zamiast ogólników, i można go potraktować jako checklistę przy własnej integracji.

**Link:** [GitHub - Arindam200/nebius-realtime-webcam](https://daily.dev/posts/G1Bw1F4Av)

## Motion Studio: edytor animacji, który sam pisze kod za ciebie

**TLDR:** Motion wypuściło Motion Studio, wizualny i agentowy edytor animacji webowych z osią czasu podpinaną na żywo do serwera deweloperskiego Vite, Webpacka lub Next.js, oraz Ultramotion, szybkiego agenta do edycji animacji opartego na modelach Jev i Luna.

**Summary:** Motion Studio pozwala przeciągać, zmieniać rozmiar i dostrajać klatki kluczowe bezpośrednio na żywym podglądzie strony, zamiast edytować definicje animacji w kodzie na ślepo. To wizualny edytor podpięty jako wtyczka do serwera deweloperskiego, więc zmiany widać natychmiast, tak jak w DevToolsach przeglądarki, tylko z pełną kontrolą nad krzywymi i sprężynami animacji Motion.

Ciekawszym elementem jest Ultramotion, agent edycyjny, który nie generuje kodu, tylko modyfikuje bezpośrednio prosty model danych animacji. Domyślnie korzysta z modelu o nazwie Jev do większości edycji, a w razie potrzeby przełącza się na model Luna dla żądań, z którymi Jev sobie jeszcze nie radzi. Taka architektura ma sens: edycja animacji to seria małych, dobrze zdefiniowanych decyzji, więc szybki, wąski model wystarcza do większości przypadków, a cięższy model wchodzi do gry tylko tam, gdzie potrzeba.

Gdy animacja jest gotowa, przycisk Apply generuje prompt dla dowolnego agenta kodującego, albo, przy subskrypcji Cursor, Claude czy Codex, łączy się bezpośrednio z Motion Studio i aktualizuje kod automatycznie. Instalacja i podgląd lokalny są darmowe, ale agentowe edycje i zapis zmian do kodu źródłowego wymagają płatnej subskrypcji. Narzędzie obsługuje na razie JavaScript, React, Vue, vgpu i Three.js, z CSS, WAAPI i animacjami scrollowymi zapowiedzianymi na później.

**Key takeaways:**
- Motion Studio to wizualny edytor animacji podpięty na żywo do serwera deweloperskiego Vite, Webpacka lub Next.js
- Ultramotion edytuje animacje przez modyfikację modelu danych, a nie generowanie kodu, korzystając domyślnie z szybkiego modelu Jev z fallbackiem do modelu Luna
- Zapis zmian do kodu źródłowego wymaga płatnej subskrypcji i połączenia z agentem typu Cursor, Claude lub Codex

**Why do I care:** Oddzielenie warstwy edycji animacji od warstwy kodu to wzorzec, który widać coraz częściej w narzędziach deweloperskich, od CMS-ów wizualnych po edytory layoutu. Jeśli twój zespół spędza dużo czasu na dopieszczaniu mikrointerakcji, warto śledzić, czy taki workflow rzeczywiście skraca iterację, czy tylko przenosi tarcie z edytora kodu do kolejnej płatnej subskrypcji SaaS.

**Link:** [Introducing Motion Studio](https://daily.dev/posts/rRKYMBbll)

## Własna tabela w React zamiast kolejnej biblioteki

**TLDR:** Praktyczny przewodnik pokazuje, jak zbudować w pełni własny komponent tabeli w React, obsługujący stronicowanie i sortowanie po stronie serwera, wykorzystując MobX do zarządzania stanem zamiast gotowej biblioteki tabel.

**Summary:** Punktem wyjścia jest bazowy komponent `Table` oraz `PaginationStore` zbudowany przy pomocy `makeAutoObservable` z MobX, który trzyma bieżącą stronę, liczbę stron oraz kolumnę i kierunek sortowania jako obserwowalne pola. Komponent `Pagination` czyta te wartości ze store'a i włącza lub wyłącza przyciski nawigacji, a nagłówki kolumn wywołują metodę store'a przy kliknięciu, co automatycznie odpala ponowne pobranie danych dzięki reaktywności MobX.

Całość spina przykładowy komponent `UserList`, który pobiera z API dane już posortowane i stronicowane po stronie serwera, zamiast ładować cały zbiór danych do przeglądarki i filtrować lokalnie. To świadomy wybór architektoniczny: przy większych zbiorach danych trzymanie wszystkiego w pamięci klienta i renderowanie tysięcy wierszy naraz szybko robi się kosztowne, podczas gdy backend zwracający tylko jedną stronę i całkowitą liczbę stron pozwala renderować stałą, niewielką liczbę wierszy niezależnie od rozmiaru całego zbioru.

Autor zapowiada kolejną część serii poświęconą filtrowaniu i wyszukiwaniu z podpowiedziami, co sugeruje, że to pierwszy krok w budowie pełnego, reużywalnego zestawu komponentów tabelarycznych bez zależności od zewnętrznej biblioteki.

**Key takeaways:**
- `PaginationStore` na MobX z `makeAutoObservable` trzyma stan strony i sortowania, a reaktywność automatycznie odpala refetch przy zmianie
- Stronicowanie i sortowanie po stronie serwera trzyma zużycie pamięci przeglądarki i czas odpowiedzi pod kontrolą niezależnie od rozmiaru pełnego zbioru danych
- Budowa własnego komponentu tabeli zamiast sięgania po bibliotekę ma sens, gdy potrzeby są proste, ale wymaga świadomego zaplanowania warstwy stanu

**Why do I care:** Pokusa sięgnięcia po ciężką bibliotekę tabel przy prostym wymaganiu „stronicowanie plus sortowanie" jest częsta, a koszt takiej decyzji ujawnia się dopiero przy próbie dostosowania biblioteki do nietypowego przypadku brzegowego. Ten przykład jest dobrym przypomnieniem, że MobX albo dowolna inna biblioteka do zarządzania stanem świetnie się sprawdza jako fundament pod własny, dopasowany komponent, zwłaszcza gdy wiadomo z góry, że wymagania nie urosną do pełnego, konfigurowalnego data grida.

**Link:** [Building a Paginated, Sortable Table in React with MobX](https://daily.dev/posts/86V3AjHsW)
