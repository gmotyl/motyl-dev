---
title: "40 milionów wywołań ST_Distance zamiast 9 tysięcy: kwadratowy bug, którego nie naprawi żaden indeks"
excerpt: "Z HackerNoon: historia o telemetrii dronów, gdzie każdy indeks był na miejscu, a mimo to pipeline skalował się kwadratowo, przewodnik po stawianiu domowego serwera na Proxmoksie, esej o tym, jak chip iPhone'a trafił do Maca za 599 dolarów, rozmowa z liderem Web AI w Google o tym, czemu nikt nie lubi marketingu, oraz rada, żeby opis skilla dla agenta mieścił się w trzech zdaniach."
publishedAt: "2026-10-07"
slug: "hackernoon-telemetria-kwadratowa-proxmox-macbook-neo-web-ai-skille"
hashtags: "#hackernoon #database-performance #self-hosting #ai #architecture #generated #pl"
source_pattern: "HackerNoon"
---

## Dodałem każdy indeks, a mój pipeline telemetrii i tak był kwadratowy

**TLDR:** Autor opisuje, jak ingestowanie telemetrii z drona przy 10 Hz (9000 punktów na 15-minutowy lot) ujawniło funkcję przeliczającą całą trasę od zera przy każdym nowym punkcie, co dawało 40,5 miliona wywołań geodezyjnego `ST_Distance` zamiast potrzebnych 9 tysięcy. Właściwy indeks istniał, planner PostgreSQL wybierał go poprawnie, problem leżał w algorytmie, nie w zapytaniu.

**Summary:** Projekt FLYON, platforma webowa dla właścicieli dronów FPV, przyjmuje telemetrię z naziemnej stacji przez prosty most Pythona wysyłający pakiet co 100 milisekund, czyli 10 razy na sekundę, co jest zupełnie zwyczajną częstotliwością (SDK DJI potrafi dawać 5-10 Hz). Problem w tym, że autor testował system symulatorem wysyłającym jeden punkt na sekundę, więc 900 punktów na cały lot zamiast prawdziwych 9000. Wszystko działało świetnie przy 900 punktach. Każdy przychodzący punkt wywoływał funkcję `updateFlightStats`, przeliczającą od zera agregaty całego lotu: maksymalną wysokość, maksymalną prędkość i, co najdroższe, całkowity dystans jako sumę po oknie czasowym nad każdą parą kolejnych punktów, każda para wymagająca geodezyjnego obliczenia na elipsoidzie WGS84 przez `ST_Distance`.

Matematyka tego problemu jest bezlitosna: punkt pierwszy sumuje zero dystansów, punkt drugi sumuje jeden, punkt dziewięćtysięczny sumuje 8999, co w sumie daje 40 504 500 wywołań `ST_Distance` zamiast potrzebnych dziewięciu tysięcy. Autor zmierzył to zamiast zgadywać: ten sam zapytania, ten sam schemat, te same indeksy PostGIS, uruchomione przeciwko prawdziwej instancji PostgreSQL 16 z PostGIS 3.4. Wersja "jak napisana" rosła liniowo z każdym kolejnym punktem, od 2,9 ms przy 500. punkcie do 26,1 ms przy 8500. punkcie, dając w sumie 138,9 sekundy dla całego lotu. Wersja z przenoszonymi agregatami (incremental) trzymała płaskie 1,2-1,3 ms niezależnie od liczby punktów, kończąc w 11,2 sekundy łącznie.

Najciekawszy fragment dotyczy właśnie indeksu. Migracja tworzyła poprawny, złożony indeks `(flight_id, timestamp)`, dokładnie dopasowany do wzorca dostępu window function. Autor spodziewał się, że planner go użyje i sortowanie zniknie z planu zapytania. Tymczasem plan pokazywał bitmap index scan po kolumnie pojedynczej plus osobne sortowanie w pamięci. Po wymuszeniu użycia złożonego indeksu przez wyłączenie bitmap scan i sortowania, czas wykonania wyniósł niemal identyczne 62,8 ms wobec 61,0 ms bez niego: planner miał rację, autor się mylił. Po usunięciu samego liczenia dystansu i uruchomieniu identycznego skanu i okna nad tymi samymi 9000 wierszami, czas spadł do 1,6 ms. Odczytanie i uporządkowanie 9000 wierszy kosztuje 1,6 ms, policzenie 9000 dystansów sferoidalnych kosztuje 59 ms, czyli około 6,6 mikrosekundy na jedno wywołanie `ST_Distance`, co samo w sobie nie jest wolne. Problem w tym, że autor płacił tę cenę czterdzieści milionów razy zamiast dziewięciu tysięcy. Żaden indeks tego nie naprawia, bo indeks zmienia szybkość znajdowania wierszy, nie ma nic do powiedzenia na temat tego, ile razy się je przetwarza.

Naprawa okazała się być czystą arytmetyką, nie SQL-em: zamiast window function licząc sumę od zera, wystarczy pamiętać poprzedni punkt i dodawać do akumulatora w pamięci przy każdym nowym. Maksimum rosnącego zbioru to zwykłe `Math.max` względem bieżącej wartości, dystans to suma potrzebująca tylko swojego ostatniego składnika. Pięć zapytań na punkt zamienia się w jeden `UPDATE`, a 138,9 sekundy pracy bazy danych w 11,2 sekundy. Uczciwe zastrzeżenie autora: akumulator w pamięci to stan procesu, który umiera razem z procesem, więc trzeba świadomie wybrać między przeliczeniem lotu raz przy odzyskiwaniu sesji, albo trzymaniem akumulatora w Redisie, którego FLYON już używa.

Po drodze autor znalazł jeszcze trzy mniejsze problemy tego samego popołudnia. Ocache'ował coś, co i tak było szybkie: cache strefy niebezpiecznej z 5-minutowym TTL obsługiwał REST endpoint wywoływany raz na ładowanie strony, podczas gdy hot path sprawdzający strefy dziesięć razy na sekundę nigdy go nie dotykał, mimo że zapytanie przestrzenne na 25 poligonach i tak trzymało płaskie 0,4-0,55 ms niezależnie od długości lotu. Upload logów łamał się dokładnie przy 5957 punktach, bo protokół PostgreSQL koduje liczbę parametrów jako pole 16-bitowe, a przy 11 parametrach na punkt licznik zawija się po przekroczeniu 65535, dając mylące komunikaty błędów zamiast informacji o przekroczeniu limitu. Migracja o nazwie "add_performance_indexes.sql" nie robiła nic, bo siedem z dwunastu `CREATE INDEX IF NOT EXISTS` powtarzało nazwy indeksów z wcześniejszej migracji, a `IF NOT EXISTS` dopasowuje po nazwie, nie po definicji, więc cicho pomijało zmianę kierunku sortowania, raportując sukces mimo braku realnej zmiany.

**Key takeaways:**
- Funkcja przeliczająca agregaty lotu od zera przy każdym punkcie dawała 40,5 miliona wywołań `ST_Distance` zamiast potrzebnych 9 tysięcy
- Złożony indeks `(flight_id, timestamp)` był poprawny i używany przez planner, problem leżał w liczbie wykonywanych obliczeń, nie w dostępie do danych
- Zamiana window function na akumulator w pamięci (trzymający poprzedni punkt) zredukowała czas przetwarzania lotu z 138,9 do 11,2 sekundy
- Migracja z powtórzonymi nazwami indeksów cicho nie robiła nic, bo `IF NOT EXISTS` dopasowuje po nazwie, nie po definicji indeksu

**Why do I care:** To jeden z najbardziej konkretnych, mierzalnych przykładów na różnicę między wolnym zapytaniem a wolnym algorytmem, jaki widziałem ostatnio, i warto go mieć pod ręką jako materiał do code review: "mamy indeks" nie jest odpowiedzią na pytanie "czy to się przeskaluje", tylko na pytanie "czy szybko znajdziemy właściwe wiersze". Funkcje testowane raz na wywołanie w batchu, a potem reużywane w ścieżce wywoływanej dziesięć razy na sekundę, to pułapka, która nie objawia się żadnym błędem, tylko cichą, narastającą degradacją.

**Link:** [I Added Every Index, but My Telemetry Pipeline Was Still Quadratic](https://hackernoon.com/i-added-every-index-but-my-telemetry-pipeline-was-still-quadratic)

## Chip iPhone'a w Macu za 599 dolarów: czy mobile właśnie zjadło PC

**TLDR:** Długi esej zestawia dwa wydarzenia z 2026 roku: MacBooka Neo, pierwszego Maca na sprzedaż z procesorem telefonu (A18 Pro z iPhone'a 16 Pro) za 599 dolarów, oraz Googlebooka, pierwszego laptopa Google opartego na Androidzie zamiast ChromeOS. Autor argumentuje, że to nie zbieg okoliczności, tylko czterdziestoletnia konwergencja architektur telefonu i komputera dobiegająca końca.

**Summary:** MacBook Neo łamie zasadę obowiązującą we wszystkich wcześniejszych Macach z własnym krzemem: zamiast chipu z serii M, zaprojektowanego dla Maca, dostaje dokładnie ten sam A18 Pro, który zadebiutował w iPhonie 16 Pro, łącznie z binowanymi matrycami z wyłączonym jednym rdzeniem GPU, które nie nadawały się do telefonu. Mimo ośmiogigabajtowej, nierozszerzalnej pamięci i braku wentylatora, wynik na Geekbench 6 bije MacBooka Air z M1 i zbliża się do M4, choć wielordzeniowa wydajność zostaje wyraźnie w tyle za czterordzeniowym M4. Googlebook idzie w przeciwnym kierunku: zamiast nowego chipu, Google przenosi na laptopy Android, system operacyjny telefonu, zamiast ChromeOS, pod wewnętrzną nazwą kodową Aluminium, zachowując pełną przeglądarkę Chrome i terminal Linux na wierzchu.

Autor szczegółowo prowadzi przez techniczne powody tej konwergencji: architektura ARM z instrukcjami stałej długości pozwala na szerokie, tanie dekodowanie równoległe, czego x86 z instrukcjami zmiennej długości nigdy nie osiągnie bez dużego kosztu energetycznego. Pamięć ujednolicona (unified memory), standard narodzony w telefonach z braku miejsca na dwa osobne pule pamięci, okazuje się kluczowym włącznikiem dla lokalnych modeli AI, bo pozwala jednej puli pamięci obsługiwać jednocześnie CPU, GPU i NPU bez kosztownego kopiowania danych między systemem RAM a VRAM karty graficznej. Systemy operacyjne telefonów, projektowane z myślą o niedoborze baterii i surowym piaskownicowaniu, okazują się lepiej przygotowane na świat, w którym liczy się każdy milivat, niż systemy desktopowe projektowane z założeniem nieograniczonej mocy z gniazdka.

Ekonomicznie historia jest równie wyrazista: Apple robi już chipy A18 Pro milionami dla iPhone'ów, więc reużycie ich, łącznie z wybrakowanymi matrycami, pozwala sprzedawać Maca za 599 dolarów, poniżej ceny większości konkurencyjnych laptopów AI z Windows. Jednocześnie niedobór pamięci DRAM i NAND napędzany popytem na AI podnosi ceny komputerów średnio o 17%, a sam MacBook Neo nie uniknął podwyżki o 100 dolarów w czerwcu 2026 z powodu kosztu pamięci. Autor konkluduje, że tani, modułowy PC nie przegrywa w konkurencji, tylko zostaje wyceniony poza istnienie, zastępowany przez zintegrowane, zbudowane jak telefon laptopy premium.

**Key takeaways:**
- MacBook Neo to pierwszy Mac na sprzedaż z chipem zaprojektowanym dla telefonu (A18 Pro z iPhone'a 16 Pro), w cenie 599 dolarów przy premierze
- Googlebook przenosi na laptopy Android zamiast ChromeOS, zachowując pełną przeglądarkę Chrome i terminal Linux
- Pamięć ujednolicona, standard narodzony w telefonach, jest kluczowym włącznikiem dla uruchamiania lokalnych modeli AI bez kosztownego kopiowania danych między RAM a VRAM
- Niedobór pamięci DRAM i NAND napędzany AI podnosi średnią cenę PC o 17%, eliminując z rynku tani, modułowy segment

**Why do I care:** Dla architektów planujących strategię sprzętową dla zespołów (czy to laptopy deweloperskie, czy urządzenia dla klientów końcowych) to przypomnienie, że granica między "telefonem" a "komputerem" przestaje być użyteczną kategorią projektową, a decyzje o tym, gdzie uruchamiać lokalne modele AI, będą coraz bardziej zależeć od architektury pamięci ujednoliconej, nie od tego, czy urządzenie formalnie nazywa się laptopem czy telefonem.

**Link:** [Is Mobile Eating the PC? The MacBook Neo, the Googlebook, and the Laptop That Became a Phone](https://hackernoon.com/is-mobile-eating-the-pc-the-macbook-neo-the-googlebook-and-the-laptop-that-became-a-phone)

## Stawianie domowego serwera na Proxmoksie: wybór sprzętu i pierwsza instalacja

**TLDR:** Praktyczny przewodnik krok po kroku pokazuje, jak zacząć z self-hostingiem: od wyboru małego komputera x86 zamiast Raspberry Pi, przez flashowanie Proxmoksa na USB, podłączenie sieci przez switch Ubiquiti, aż po zdalną konfigurację przez Jet KVM i pierwsze uruchomienie hypervisora gotowego na kontenery z Immich, Plexem czy Jellyfin.

**Summary:** Autor zaczyna od uzasadnienia wyboru sprzętu: Raspberry Pi bywa wolne, ma ograniczenia we wpinaniu dysków (tylko przez USB, z pasmem współdzielonym z Ethernetem), więc poleca małe komputery x86 formatu small form factor od Della, z pełną kompatybilnością wsteczną i możliwością rozbudowy. Pierwszy krok instalacji to wgranie ISO Proxmoksa na USB przez balenaEtcher, potem podłączenie sprzętu do sieci przez switch zarządzany software'owo (autor poleca Ubiquiti za możliwość dzielenia sieci na VLAN-y), i opcjonalnie użycie urządzenia Jet KVM, emulującego klawiaturę, mysz i monitor wielkości Apple Watcha, żeby nie trzeba było fizycznie podłączać peryferiów do serwera.

Sama instalacja Proxmoksa jest prosta: licencja, wybór dysku, strefa czasowa, hasło roota, adres e-mail na alerty, oraz, co autor podkreśla jako ważny krok, ustawienie statycznego adresu IP. Po restarcie następuje konfiguracja przez SSH i skrypty Proxmox VE Helper-Scripts, w szczególności skrypt "post install", który wyłącza repozytorium enterprise (wymagające subskrypcji), wyłącza komunikat o subskrypcji, i pozwala odrzucić reboot do czasu, aż administrator jest na to gotowy. Dalsze kroki to ręczna aktualizacja przez `apt update` i `pveupgrade`, instalacja świeższego jądra przez interfejs webowy (akceptując ostrzeżenie o niezaufanym certyfikacie, bo jest samopodpisany), i finalny reboot.

Po uruchomieniu systemu autor pokazuje, jak odczytać podstawowe parametry sieciowe (adres bramy, serwer DNS) z panelu Ubiquiti, co w typowej konfiguracji oznacza, że sam firewall pełni też funkcję serwera DNS. Artykuł kończy się zachętą do dalszej eksploracji: Proxmox jako hypervisor pozwala podzielić jedną maszynę na wiele wirtualnych, każdą z osobnym kontenerem dla Immich (zdjęcia), Plexa czy Jellyfin (media), a Tailscale umożliwia bezpieczny dostęp do tych usług bez wystawiania ich bezpośrednio do internetu.

**Key takeaways:**
- Małe komputery x86 formatu small form factor (np. od Della) są lepszym wyborem na domowy serwer niż Raspberry Pi ze względu na przepustowość i kompatybilność
- Jet KVM emuluje klawiaturę, mysz i monitor, pozwalając skonfigurować serwer bez fizycznego podłączania peryferiów
- Skrypt Proxmox VE Helper-Scripts "post install" wyłącza repozytorium enterprise i komunikat o subskrypcji dla użytkowników bez płatnej licencji
- Po instalacji Proxmox dzieli jedną maszynę na wiele kontenerów (Immich, Plex, Jellyfin), a Tailscale zapewnia bezpieczny zdalny dostęp bez wystawiania usług do internetu

**Why do I care:** Dla każdego dewelopera rozważającego własny home lab zamiast kolejnej subskrypcji chmurowej, to gotowa, przetestowana ścieżka od zera do działającego hypervisora, bez konieczności metodą prób i błędów odkrywać, które kroki są faktycznie konieczne, a które to tylko legenda z forum.

**Link:** [The beginner's guide to self-hosting: Installing Proxmox and hardware choices](https://hackernoon.com/the-beginners-guide-to-self-hosting-installing-proxmox-and-hardware-choices)

## Lider Web AI w Google: "nikt nie lubi być marketingowany"

**TLDR:** Jason Mayes, Web AI Lead w Google odpowiedzialny za uruchamianie modeli AI lokalnie w przeglądarce (TensorFlow.js, MediaPipe), opisuje w wywiadzie, jak zbudował społeczność wokół tej technologii od zera do 2,5 miliarda pobrań rocznie, oraz dlaczego autentyczna pasja do rozwiązywanego problemu bije każdą kampanię marketingową.

**Summary:** Mayes definiuje swoją rolę jako sztukę uruchamiania modeli AI (od LLM-ów jak Gemma 4, po detekcję obiektów) niemal tak szybko jak natywnie, bezpośrednio w piaskownicy przeglądarki internetowej, dzięki technologiom WebGPU, Wasm i WebNN. To daje wyniki w czasie rzeczywistym, pełną prywatność (dane nigdy nie opuszczają urządzenia) i zerowy koszt inferencji, co ma szczególne znaczenie w branżach takich jak finanse, prawo, ochrona zdrowia czy administracja publiczna, gdzie te cechy są krytyczne.

Opisując rolę inżyniera DevRel, Mayes rozkłada ją na trzy części: 40% inżynierii i prototypowania, 35% marketingu w sensie opowiadania historii i edukacji, oraz 25% wpływu na kierunek produktu, podobnie do product managera, ale z perspektywą deweloperów zewnętrznych. Podkreśla, że dobry DevRel engineer powinien być zatrudniany do tego samego poziomu co zwykły inżynier oprogramowania, z dodatkowym wymogiem umiejętności prezentowania złożonych tematów w zrozumiały sposób, i że często to właśnie inżynierowie "awansują" do DevRel po tym, jak zaczynają być proszeni o więcej wystąpień na temat swojej pracy.

Historia budowy społeczności TensorFlow.js zaczyna się od zera w 2019 roku, kiedy produkt miał około miliona pobrań rocznie i stał w miejscu. Mayes budował rozpoznawalność przez prototypy odtwarzające dosłowne supermoce z filmów science fiction (teleportacja, niewidzialność), z czego część stała się viralowa, patent na cyfrową teleportację włącznie, serię "Show and tell" na YouTubie dla deweloperów chcących pochwalić się swoimi projektami, kurs na EdX obejmujący 16 godzin materiału, oraz ukucie terminu "Web AI" w 2022 roku jako wspólnej nazwy dla AI działającego po stronie klienta w przeciwieństwie do Cloud AI. Efekt: 2,5 miliarda pobrań rocznie w 2025 roku, wzrost 2500-krotny w kilka lat przy bardzo małym zespole.

Na pytanie o znane powiedzenie, że "deweloperzy są uczuleni na marketing", Mayes odpowiada, że faktycznie nikt nie lubi być marketingowany, ale rozwiązaniem nie jest rezygnacja z komunikacji, tylko autentyczna pasja: rozwiązywanie realnych problemów, które ma się samemu, i pokazywanie światu, jak się to zrobiło, zamiast odgórnie zaplanowanej kampanii. Jego zdaniem różnica między inżynierem robiącym to dla pensji a kimś z prawdziwą pasją do reprezentowanej technologii jest widoczna i to właśnie ci drudzy stają się w tej branży prawdziwymi gwiazdami.

**Key takeaways:**
- Web AI pozwala uruchamiać modele od LLM-ów po detekcję obiektów niemal natywnie w przeglądarce, dzięki WebGPU, Wasm i WebNN, z pełną prywatnością i zerowym kosztem inferencji
- TensorFlow.js i MediaPipe od Google osiągają 2,5 miliarda pobrań rocznie, wzrost 2500-krotny od 2019 roku
- Mayes rozkłada rolę DevRel na 40% inżynierii, 35% marketingu i storytellingu, 25% wpływu na kierunek produktu
- Termin "Web AI", ukuty przez Mayesa w 2022 roku, stał się dziś standardowym określeniem branżowym dla AI działającego po stronie klienta

**Why do I care:** Dla zespołów frontendowych rozważających lokalne uruchamianie modeli AI zamiast wywołań do chmurowego API, to konkretny punkt wyjścia do researchu: WebGPU, Wasm i WebNN są dziś na tyle dojrzałe, że warto sprawdzić, czy dany przypadek użycia (szczególnie przy wrażliwych danych w finansach, prawie czy ochronie zdrowia) nie da się rozwiązać bez wysyłania niczego poza przeglądarkę użytkownika.

**Link:** [“No One Likes to Be Marketed To,” Says Google Web AI Lead Jason Mayes](https://hackernoon.com/no-one-likes-to-be-marketed-to-says-google-web-ai-lead-jason-mayes)

## Opis skilla dla agenta zmieść się w trzech zdaniach, albo agent go nie znajdzie

**TLDR:** Krótka rada techniczna: opis skilla w pliku SKILL.md powinien składać się z dokładnie trzech zdań, kiedy go czytać, kiedy go użyć, i co dokładnie robi, bo to jedyny fragment, który agent przeczyta zanim zdecyduje, czy w ogóle otworzyć resztę pliku.

**Summary:** Autor punktuje częsty błąd przy pisaniu skilli dla agentów: opis jako jeden długi akapit wymieniający każdą funkcję, każdy parametr, każdy przypadek brzegowy, dokładnie tak, jak funkcja w kodzie rośnie, aż nikt nie pamięta już jej pierwotnego zadania. Agent skanujący setki dostępnych opisów skilli, żeby wybrać jeden, nie jest w stanie w locie stwierdzić, czy dany skill pasuje do sytuacji, jeśli opis tylko wylicza, co skill robi, zamiast jasno określać, kiedy sięgnąć po niego w pierwszej kolejności. Rezultat: agent pomija skill na rzecz innego z ostrzejszym wyzwalaczem, albo otwiera cały plik tylko po to, żeby to sprawdzić, co jest dokładnie tym kosztem kontekstu, któremu miało zapobiegać progresywne ujawnianie informacji (progressive disclosure).

Rozwiązanie jest formułowane jako konkretna, powtarzalna procedura: nazwać skill od momentu, w którym ktoś po niego sięga, nie od tematu, który obejmuje. Pierwsze zdanie opisu powtarza ten sam moment wyzwalający. Drugie zdanie nazywa dokładną sytuację, która wymaga tego skilla. Trzecie zdanie mówi, co skill robi, nic więcej. Autor pokazuje kontrastowy przykład: zły opis dla skilla do PDF-ów wylicza osiem osobnych funkcji jako osiem zdań, dobry opis mieści się w czterech krótkich zdaniach mówiących, kiedy go czytać (gdy zadanie dotyka istniejącego pliku PDF), do czego go użyć (merge, split, watermark, ekstrakcja), i że oszczędza ręcznego wywoływania biblioteki PDF za każdym razem.

Autor dodaje praktyczny test: sprawdzić na zimno, na agencie, który nigdy wcześniej nie widział tego skilla, czy sam otworzy plik na podstawie samego opisu. Trzy zdania to cel, nie twardy limit, czwarte zdanie jest w porządku, jeśli dokłada realne ograniczenie, a nie jest tylko spóźnionym zastrzeżeniem. Zastrzega też wyraźnie, że ta zasada dotyczy tylko pola opisu, nie treści samego pliku: ostry trigger na źle zorganizowanym pliku wciąż marnuje tokeny, gdy agent go już otworzy, i nie dokumentuje, co się dzieje, gdy skill zawiedzie w połowie wykonania.

**Key takeaways:**
- Opis skilla powinien mieć trzy zdania: kiedy go czytać, kiedy go użyć, co robi, nic więcej
- Nazwa skilla powinna odzwierciedlać moment, w którym ktoś po niego sięga, nie temat, który obejmuje
- Test weryfikujący: pokazać opis agentowi, który nigdy wcześniej nie widział tego skilla, i sprawdzić, czy sam otworzy plik
- Zasada dotyczy tylko pola opisu w SKILL.md, nie rozwiązuje problemów ze słabo zorganizowaną resztą pliku

**Why do I care:** Jeśli twój zespół buduje bibliotekę skilli czy narzędzi dla agentów kodujących (Claude Code, Cursor i podobne), to prosta, natychmiast wdrażalna zasada do code review: przy każdym nowym skillu zadaj pytanie, czy opis mieści się w trzech zdaniach, zanim w ogóle przejdziesz do oceny samej implementacji, bo skill, którego agent nie znajdzie, jest funkcjonalnie równoważny skillowi, który nie istnieje.

**Link:** [AI Coding Tip 035 - Split Every Skill Description Into Three Sentences](https://hackernoon.com/ai-coding-tip-035-split-every-skill-description-into-three-sentences)
