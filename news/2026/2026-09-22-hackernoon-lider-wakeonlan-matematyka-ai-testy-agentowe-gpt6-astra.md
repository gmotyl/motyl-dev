---
title: "HackerNoon: jak liderzy mówią o swoim wkładzie, budzenie komputerów przez Tailscale, geometria kontra mity o AI, agentowe testy i lepsze prompty do GPT-6 Astra"
excerpt: "Pięć różnych tematów: język, jakim seniorzy powinni opisywać swój wkład, Wake-on-LAN przez Tailscale bez otwierania portów, geometryczne spojrzenie na pięć mitów o AI, agent generujący testy end-to-end z wymagań w prostym języku, oraz konkretne wskazówki, jak pisać prompty i skille dla GPT-6 Astra."
publishedAt: "2026-09-22"
slug: "hackernoon-lider-wakeonlan-matematyka-ai-testy-agentowe-gpt6-astra"
hashtags: "#HackerNoon #leadership #devops #ai #testing #prompt-engineering #generated #pl"
source_pattern: "HackerNoon"
---

## Jak mówić o swoim wkładzie, gdy jesteś liderem, a nie wykonawcą

**TLDR:** Im wyżej w hierarchii, tym trudniej opisać własny wkład, bo praca lidera przepływa przez zespół, a nie przez commity czy zadania z Jiry. Artykuł proponuje konkretną technikę: łączyć „my" z „ja" zamiast wybierać jedno z dwojga, wspierać się liczbami zamiast ogólników i mówić otwarcie zarówno o sukcesach, jak i porażkach.

**Summary:** Autor zaczyna od bolesnej obserwacji: jako indywidualny wykonawca łatwo wskazać, co się zbudowało, jaki bug naprawiło się samodzielnie, jaki projekt się dostarczyło. Jako lider ustalasz cele, ale to inni je realizują, definiujesz strategię, ale to inni ją wykonują, więc twój wkład rozmywa się w cudzej pracy, mimo że bez niego nic by się nie wydarzyło.

Pierwsza rada dotyczy języka: opisywanie wszystkiego przez „my" wygląda skromnie, ale de facto ukrywa twoje przywództwo i nie pozwala innym docenić twojej roli, natomiast opisywanie wszystkiego przez „ja" sprawia wrażenie zawłaszczania cudzej pracy i podkopuje morale zespołu. Rozwiązaniem jest łączenie obu, na przykład zamiast „udało nam się zrealizować cele Q1" powiedzieć coś w rodzaju: jestem dumny z zespołu za realizację celów Q1, a jednym z czynników, który to umożliwił, było jasne ustalenie celów na starcie i przypominanie o szerszym obrazie przy każdej decyzji, którą zespół podejmował samodzielnie.

Druga rada dotyczy myślenia strategicznego: senior leader nie musi znać wszystkich detali wykonawczych, ale musi umieć nazwać, dlaczego zamknął jeden projekt, żeby przesunąć zasoby na inny, albo dlaczego zrestrukturyzował zespół pod kątem przyszłych potrzeb. Te decyzje są niewidoczne, dopóki nie zostaną wprost nazwane.

Trzecia rada to liczby zamiast wrażeń: „poprawiliśmy retencję" znaczy dużo mniej niż „retencja spadła z 13% do 9% w tym kwartale dzięki nowemu programowi zaangażowania". Ostatnia rada dotyczy szczerości wobec porażek: dzielenie się błędami i wyciągniętymi z nich wnioskami buduje wiarygodność bardziej niż wybiórcze pokazywanie tylko sukcesów.

**Key takeaways:**
- Łącz „my" z „ja" zamiast wybierać jedno z dwojga, żeby jednocześnie docenić zespół i nazwać własny wkład w przywództwo
- Nazywaj wprost decyzje strategiczne, jak zamknięcie projektu czy restrukturyzację, bo inaczej pozostają niewidoczne mimo realnego wpływu
- Konkretne liczby budują wiarygodność dużo skuteczniej niż ogólne stwierdzenia o poprawie czegokolwiek

**Why do I care:** Ten tekst jest bardziej dla ról menedżerskich i tech lead niż dla kogoś piszącego kod na co dzień, ale warto go znać, bo prędzej czy później każdy senior developer trafia na rozmowę o awansie, gdzie trzeba opisać własny wpływ na coś większego niż pojedynczy pull request. Technika łączenia „my" z „ja" przydaje się też dużo wcześniej, przy okazji code review czy retrospekcji, gdzie łatwo wpaść w tę samą pułapkę fałszywej skromności albo przesadnego przypisywania sobie zasług.

**Link:** [A Guide on Articulating Your Contributions as a Senior Leader](https://hackernoon.com/a-guide-on-articulating-your-contributions-as-a-senior-leader)

## Budzenie uśpionych komputerów przez Tailscale, bez otwierania portów na świat

**TLDR:** Tailscale sam z siebie nie potrafi obudzić urządzenia, które jest wyłączone lub uśpione, bo działa na warstwie sieciowej (Layer 3), a Wake-on-LAN operuje niżej, na warstwie ramek (Layer 2). Artykuł pokazuje trzy podejścia, od komend terminalowych przez Raspberry Pi, przez webaplikację UpSnap, aż po konfigurację sidecar, która pozwala obudzić dowolne urządzenie wpisując po prostu jego nazwę w przeglądarce.

**Summary:** Wake-on-LAN wymaga wysłania pakietu z adresem MAC karty sieciowej bezpośrednio do lokalnej sieci, a Tailscale, mimo że tworzy wrażenie bycia w tej samej sieci co reszta urządzeń, działa jedną warstwą wyżej i fizycznie nie potrafi wysłać takiego pakietu przez tunel. Rozwiązaniem jest urządzenie pośredniczące, zawsze włączone i podłączone przez ethernet do tej samej sieci lokalnej co uśpiony komputer.

Najprostsza opcja to Raspberry Pi z zainstalowanym Tailscale i narzędziem `etherwake`, do którego można się dostać z dowolnego miejsca przez SSH i ręcznie wywołać komendę budzącą konkretne urządzenie po adresie MAC. To rozwiązanie działa, ale wymaga pamiętania komend terminalowych za każdym razem.

Wygodniejsza opcja to UpSnap, samodzielnie hostowana webaplikacja z panelem, którą można zainstalować na tym samym Raspberry Pi jako binarkę, kontener Dockera albo aplikację z menedżera kontenerów na NAS-ie typu Synology czy QNAP. UpSnap pamięta adresy IP urządzeń, potrafi je wyłączać, jeśli na to pozwalają, i skanuje sieć w poszukiwaniu urządzeń do obudzenia, więc odpada ręczne wpisywanie adresów MAC za każdym razem.

Najbardziej dopracowana opcja to skonfigurowanie UpSnap jako osobnego węzła w Tailnecie przez konfigurację sidecar, z użyciem Tailscale Serve do bezpiecznego udostępnienia portu bez numeru portu w adresie i bez ostrzeżeń przeglądarki o niezabezpieczonej stronie. Dzięki MagicDNS można nadać temu węzłowi łatwą nazwę, na przykład `upsnap`, i wpisywać ją bezpośrednio w pasku adresu z dowolnego urządzenia podłączonego do tego samego Tailneta.

**Key takeaways:**
- Tailscale działa na warstwie sieciowej i fizycznie nie może wysłać pakietu Wake-on-LAN, który wymaga warstwy ramek i lokalnej sieci ethernet
- Zawsze włączone urządzenie pośredniczące, jak Raspberry Pi z `etherwake`, jest wymagane niezależnie od wybranego podejścia
- Konfiguracja sidecar z Tailscale Serve i MagicDNS pozwala budzić urządzenia wpisując prostą nazwę w przeglądarce, bez portów i ostrzeżeń o niebezpiecznej stronie

**Why do I care:** Jeśli masz w domu albo w małym biurze serwer czy NAS, który wolałbyś trzymać uśpiony, dopóki faktycznie go nie potrzebujesz, to ten wzorzec sidecar z Tailscale Serve jest ładnym, powtarzalnym przepisem architektonicznym, nie tylko do Wake-on-LAN, ale do każdej wewnętrznej usługi, którą chcesz udostępnić sobie i zespołowi bez otwierania portów na świat.

**Link:** [Make a dedicated Wake-on-LAN server with Tailscale](https://hackernoon.com/make-a-dedicated-wake-on-lan-server-with-tailscale)

## Geometria kontra pięć popularnych mitów o AI

**TLDR:** Artykuł bierze pięć powszechnych przekonań o tym, jak działa i powinno rozwijać się AI, i konfrontuje je z narzędziami z geometrii i topologii: orbitami i przestrzeniami ilorazowymi, koneksją i holonomią, torsją, geometrią hiperboliczną oraz grupami symetrii jak SO(3). Teza autora jest prowokacyjna: problem współczesnego AI to nie za mała skala, tylko zbudowanie modeli w niewłaściwej przestrzeni matematycznej.

**Summary:** Pierwszy mit dotyczy tego, że więcej przykładów oznacza więcej wiedzy. Autor pokazuje na animacji, że 900 obróconych wariantów tego samego obiektu to w istocie tylko 12 unikalnych faktów, jeśli rotacja nie zmienia tożsamości obiektu, matematyczne pojęcie orbity i przestrzeni ilorazowej pozwala to skolapsować, a mimo to wiele systemów AI wciąż płaci za tę nadmiarowość dodatkowymi danymi i augmentacją, zamiast wbudować regułę niezmienniczości wprost w architekturę.

Drugi mit to przekonanie, że większe okno kontekstu oznacza lepszą pamięć. Autor używa analogii koneksji i transportu równoległego z geometrii różniczkowej: informacja może być technicznie widoczna w kontekście, ale to, co z nią po drodze zrobi model, jest osobną sprawą, tak jak ktoś może pamiętać zdanie „nie lubię pieczarek", a mimo to zamówić pizzę z pieczarkami po godzinie rozmowy o czymś innym. Ta różnica ma nazwę w matematyce: holonomia, ślad, jaki zostawia podróż przez kontekst, niezależnie od tego, czy dane zdanie wciąż jest technicznie widoczne.

Trzeci mit dotyczy niezmienności odpowiedzi względem kolejności promptu, autor łączy to z torsją, matematyczną miarą tego, jak transport lokalny nie domyka się tak, jak powinien. Czwarty mit to przekonanie, że więcej wymiarów oznacza lepszą reprezentację, tu wchodzi geometria hiperboliczna, która rośnie eksponencjalnie tak jak struktury drzewiaste, w przeciwieństwie do płaskiej przestrzeni euklidesowej rosnącej tylko wielomianowo, co czyni ją naturalnie lepszym dopasowaniem do hierarchicznych danych, jak drzewa kategorii czy zależności w kodzie.

Piąty mit dotyczy tego, że AI nie może wiedzieć czegoś, czego wcześniej nie widziało, tu w grę wchodzi grupa symetrii SO(3) opisująca rotacje w 3D, model nie musi widzieć każdego kąta obrotu obiektu osobno, wystarczy, że zna regułę transformacji, a resztę wariantów wyprowadzi z niej matematycznie, zamiast uczyć się ich pojedynczo z przykładów.

**Key takeaways:**
- Orbity i przestrzenie ilorazowe pozwalają traktować zbiór transformowanych wariantów jako jeden przypadek zamiast setek osobnych faktów do wyuczenia
- Holonomia opisuje realny ślad, jaki zostawia przejście przez długi kontekst, co różni się od samej widoczności informacji w oknie kontekstu
- Geometria hiperboliczna rośnie eksponencjalnie jak struktury drzewiaste, co czyni ją potencjalnie lepszym dopasowaniem do hierarchicznych danych niż płaska przestrzeń euklidesowa

**Why do I care:** To materiał bardziej dla osób zajmujących się badaniami nad architekturą modeli niż dla codziennej pracy frontendowej, ale warto go znać jako kontrapunkt do narracji „po prostu przeskaluj model", która dominuje w mediach. Jeśli pracujesz z embeddingami, wyszukiwaniem semantycznym czy podobieństwem wektorowym, świadomość, że geometria przestrzeni reprezentacji ma znaczenie, a nie tylko liczba wymiarów, może pomóc zadawać lepsze pytania dostawcom modeli i baz wektorowych.

**Link:** [The Mathematics That Breaks the Biggest Myths About AI](https://hackernoon.com/the-mathematics-that-breaks-the-biggest-myths-about-ai)

## Agent zamienia wymagania w prostym języku na gotowe przypadki testowe

**TLDR:** Agentowe tworzenie testów oznacza, że agent AI czyta wymagania, załączniki i istniejącą bibliotekę testów, a następnie proponuje strukturalne przypadki testowe powiązane z konkretnymi kryteriami akceptacji, z obowiązkową bramką przeglądu człowieka, zanim cokolwiek trafi do zestawu testów. Artykuł pokazuje pełny przykład na historyjce użytkownika o kodzie promocyjnym: 40 istniejących testów przeanalizowanych, 7 zaproponowanych do ponownego użycia, 6 nowych wygenerowanych, 1 odrzucony przy przeglądzie.

**Summary:** Autor zaczyna od bolączki znanej każdemu, kto pracował w zespole z osobnym QA: funkcje są gotowe, wymagania jasne, ale sprint i tak stoi, bo ktoś musi ręcznie przepisać historyjki z Jiry na kroki i oczekiwane rezultaty. To praca niezbyt trudna, ale wolna, powtarzalna i oderwana od tego, co właściwie przyciąga ludzi do inżynierii jakości.

Kluczowe rozróżnienie dotyczy architektury: pojedyncze wywołanie LLM za szablonem promptu to funkcja bezstanowa, wołasz i dostajesz odpowiedź. Prawdziwy agent to pętla: rozumuje o celu, wywołuje narzędzia, żeby zebrać informacje, obserwuje wyniki i koryguje plan, zanim wygeneruje finalny wynik, dokładnie ten wzorzec reasoning-and-acting sformalizowany przez pracę ReAct.

W przykładzie z artykułu historyjka brzmi: „jako powracający klient chcę zastosować kod promocyjny przy kasie, żeby zniżka odzwierciedliła się w sumie zamówienia", z pięcioma kryteriami akceptacji, w tym regułą kolejności (najpierw rabat, potem karta podarunkowa) oraz regułą zaokrąglania (na poziomie całego zamówienia, nie per produkt). Agent najpierw sprawdza istniejącą bibliotekę testów dla obszaru kasy, znajduje 40 powiązanych przypadków i proponuje 7 do ponownego użycia z zachowaniem ich historii regresji, zamiast tworzyć duplikaty, jak zrobiłoby to generyczne narzędzie bez dostępu do kontekstu projektu.

Sześć nowo wygenerowanych przypadków pokrywa realne luki, w tym zastosowanie kodu promocyjnego razem z kartą podarunkową z konkretną arytmetyką wyprowadzoną wprost z kryteriów akceptacji: 20% zniżki od 79,99 dolara to matematycznie 15,998, co przy zaokrąglaniu na poziomie zamówienia daje 16,00, a przy zaokrąglaniu per produkt dałoby inny wynik, 15,99. Jeden z wygenerowanych przypadków, dotyczący wygaśnięcia sesji, został odrzucony przy przeglądzie, bo żadne kryterium akceptacji nie mówiło, co ma się stać z rabatem po wygaśnięciu sesji, agent wywnioskował zachowanie sam, a potem przetestował własne założenie zamiast realnego wymagania. Autor podkreśla, że to właśnie najgroźniejszy typ błędu: nie niechlujny przypadek testowy, tylko taki, który wygląda świetnie i formalnie poprawnie, ale weryfikuje wymyśloną, a nie zapisaną regułę.

**Key takeaways:**
- Agent w pełnym znaczeniu to pętla rozumowania i działania z narzędziami, nie pojedyncze bezstanowe wywołanie modelu za szablonem promptu
- Niejasne kryteria akceptacji prowadzą do niejasnych kroków testowych, agent wtedy musi zgadywać regułę, a przegląd musi ją potwierdzić lub odrzucić
- Warto osobno śledzić wskaźnik odrzuceń (sygnał złego kontekstu wejściowego) i wskaźnik edycji (sygnał niejasnych kryteriów akceptacji) zamiast łączyć je w jedną metrykę

**Why do I care:** Jeśli twój zespół regularnie czeka na ręczne przepisanie historyjek na testy, ten artykuł daje konkretny, sprawdzalny wzorzec do oceny narzędzi agentowego testowania, zamiast marketingowego hasła „AI generuje testy": sprawdź, czy narzędzie czyta załączniki, czy proponuje reużycie przed generowaniem nowych przypadków, i czy każdy wygenerowany przypadek przechodzi przez bramkę przeglądu, zanim trafi do zestawu regresyjnego.

**Link:** [Agentic Test Creation: From Plain-Language Requirements to End-to-End Test Cases](https://hackernoon.com/agentic-test-creation-from-plain-language-requirements-to-end-to-end-test-cases)

## Jak pisać lepsze prompty i skille dla GPT-6 Astra w Codexie

**TLDR:** Poradnik OpenAI dotyczący promptów i skilli dla GPT-6 Astra podkreśla cztery zasady: nadaj każdemu rodzajowi instrukcji jasny cel (prompt zadania, plik SKILL.md, plik AGENTS.md), opisuj w promptcie skończony rezultat zamiast listy kroków, ogranicz skill do jednego, wąsko opisanego zadania, i ustaw jasne reguły zatwierdzania wokół konkretnych działań, nie wokół każdego kroku z osobna.

**Summary:** Punktem wyjścia jest przykład z życia: prośba „dodaj ten artykuł do mojej strony" zostawia otwarte mnóstwo decyzji, czy agent ma napisać szkic, zmienić lokalny projekt, sprawdzić stronę w przeglądarce, czy opublikować zmiany. Zapisany plik bywa technicznie poprawny, ale bezużyteczny jako gotowa aktualizacja strony, jeśli strona ma zepsute linki albo brakującą okładkę.

Pierwsza zasada dotyczy podziału odpowiedzialności między trzema rodzajami instrukcji: prompt zadania powinien opisywać wynik i dane wejściowe konkretnego żądania, plik SKILL.md powinien trzymać workflow, który powtarza się regularnie, a AGENTS.md powinien trzymać reguły pracy w danym projekcie, jak lokalizacja plików czy wymagane sprawdzenia. Rozdzielenie tego ułatwia aktualizacje: zmiana komendy budowania projektu wymaga edycji jednej reguły w AGENTS.md, zamiast poprawiania kopii tej samej informacji w kilku różnych skillach.

Druga zasada to pisanie promptu wokół skończonego rezultatu, a nie listy kroków. Przykład z artykułu pokazuje różnicę między niejasnym „dodaj mój artykuł do strony, zrób żeby dobrze wyglądał" a konkretnym opisem: użyj podanego tytułu, treści i linków bez zmian, zachowaj istniejący układ artykułu, uruchom wymagane przez projekt sprawdzenia, potwierdź że użyte komendy nie wdrażają zmian na produkcję, sprawdź wyrenderowaną stronę na szerokości desktopowej i mobilnej, jeśli dostępne są narzędzia przeglądarkowe, i zakończ listą zmienionych plików oraz wykonanych sprawdzeń. Brakujące informacje, jak data publikacji, powinny być zgłoszone jako luka, a nie wymyślone przez agenta.

Trzecia zasada dotyczy zakresu skilla: opis skilla powinien mieścić się w jednym zdaniu i jasno wykluczać sąsiednie zadania. Zbyt szeroki opis, w rodzaju „pomoc ze stronami, artykułami, treścią, designem i publikacją", sprawia, że skill dopasowuje się do próśb, z którymi nie ma nic wspólnego, jak naprawa menu nawigacyjnego. Warto też stosować progresywne ujawnianie: dodatkowe pliki referencyjne, jak zasady osadzania wideo czy styl tłumaczeń, wczytywane tylko wtedy, gdy zadanie faktycznie tego wymaga, zamiast trzymać wszystko w jednym rozrastającym się pliku głównym.

Ostatnia zasada dotyczy zatwierdzeń: reguła zbudowana wokół konkretnego działania i celu, na przykład „pokaż mi wynik przed publikacją na żywej stronie", działa lepiej niż „pytaj przed każdym krokiem", która przerywa nawet pracę niezbędną do przygotowania samego wyniku. Autor przypomina też, że napisana instrukcja nie zastąpi faktycznych uprawnień technicznych: jeśli piaskownica blokuje dostęp do sieci czy pliku, żaden prompt tego nie ominie, trzeba użyć właściwego mechanizmu zatwierdzania uprawnień.

**Key takeaways:**
- Prompt zadania, SKILL.md i AGENTS.md mają różne role: wynik i dane wejściowe, powtarzalny workflow, oraz stałe reguły projektu
- Wąski, jednozdaniowy opis skilla zapobiega dopasowywaniu się do niezwiązanych próśb i ułatwia agentowi wybór właściwego narzędzia
- Reguły zatwierdzania warto budować wokół konkretnych działań i celów, nie wokół każdego pojedynczego kroku pracy agenta

**Why do I care:** Jeśli już korzystasz z agentowych narzędzi kodujących na co dzień i frustruje cię, że agent robi za mało albo za dużo względem twoich oczekiwań, ten poradnik to konkretna checklista do audytu własnych promptów, skilli i AGENTS.md, zamiast kolejnej rundy zgadywania, dlaczego agent zatrzymał się w niewłaściwym miejscu albo opublikował coś, czego nie powinien.

**Link:** [GPT-6 Astra: How to Write Better Prompts and Skills](https://hackernoon.com/gpt-6-astra-how-to-write-better-prompts-and-skills)
