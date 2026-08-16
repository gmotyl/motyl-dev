---
title: "SPA w czystym PHP, uprawnienia jako dane i wojna Tailwind kontra StyleX"
excerpt: "Pięć historii o tym, gdzie naprawdę powinna mieszkać logika: w PHP udającym nowoczesny frontend, w cenniku, w polityce uprawnień i w wyborze między Tailwindem a StyleX."
publishedAt: "2026-07-28"
slug: "spa-w-php-uprawnienia-jako-dane-tailwind-vs-stylex"
hashtags: "#dailydev #php #react #css #tailwind #architecture #backend #devtools #dx #generated #pl"
source_pattern: "daily.dev"
---

## Inertia.js server-side adapter dla czystego PHP

**TLDR:** Webkul napisał adapter Inertia.js, który działa na gołym PHP, bez Laravela, z opcjonalną integracją z WordPressem. Dzięki temu można budować interfejsy w React, które nawigują jak SPA, a całą logikę i routing trzymają po stronie serwera.

**Summary:** Inertia.js od dawna kojarzy się głównie z Laravelem i to skojarzenie jest tak silne, że wielu developerów zakłada, że poza ekosystemem Laravela ten protokół po prostu nie istnieje. Webkul pokazuje, że to nieprawda. Zbudowali adapter, który implementuje protokół Inertii w czystym PHP i potrafi obsłużyć zarówno pełne odwiedziny strony, jak i żądania XHR rozpoznawane po nagłówku X-Inertia. Do tego dochodzi obsługa 409 przy niezgodności wersji assetów (nagłówek X-Inertia-Location wymusza pełne przeładowanie) oraz częściowe przeładowania danych przez X-Inertia-Partial-Data, czyli dokładnie ten sam zestaw mechanizmów, który znają użytkownicy inertia-laravel. Największą ciekawostką jest sposób integracji z WordPressem: pakiet sprawdza w runtime, czy dostępne są funkcje takie jak wp_json_encode() czy status_header(), i jeśli tak, korzysta z nich, a jeśli nie, spada na standardowe odpowiedniki PHP. To rozwiązuje realny problem twórców wtyczek WordPress, którzy chcą mieć nowoczesny interfejs w React bez budowania osobnego REST API i bez rezygnowania z PHP jako źródła prawdy po stronie serwera. Można się zastanawiać, czy to nie jest tylko sprytne opakowanie tego, co dawno robi się przez fetch i JSON, ale różnica jest realna: Inertia daje spójny model nawigacji między stronami bez pisania własnego routera na froncie, a jednocześnie backend zachowuje pełną kontrolę nad autoryzacją i przepływem danych. To, czego artykuł nie porusza wprost, to koszt utrzymania takiego mostka przy większych aplikacjach z wieloma niezależnymi zespołami frontendowymi, gdzie kontrakt między stronami zaczyna żyć własnym życiem niezależnie od tego, czy jest jawnie typowany, czy nie.

**Key takeaways:**
- Adapter implementuje pełny protokół Inertii (visits, XHR, 409 przy niezgodności assetów, partial reloads) bez zależności od Laravela.
- Integracja z WordPressem działa przez feature detection, nie przez sztywną zależność od frameworka.
- Pozwala budować SPA-podobny frontend w React bez osobnego REST API, przy zachowaniu PHP jako źródła prawdy.

**Why do I care:** Jako ktoś, kto ogląda mnóstwo projektów z frontendem doklejonym do starszego backendu, doceniam to podejście bardziej niż kolejny framework do REST API. Jeśli macie legacy w PHP i presję na "nowoczesny UX", Inertia daje ścieżkę bez przepisywania wszystkiego na SPA plus API plus warstwę autoryzacji duplikowaną w dwóch miejscach. To jednak decyzja architektoniczna z konsekwencjami na lata, nie kosmetyczna zmiana biblioteki, więc warto ją podejmować świadomie, a nie dlatego, że ktoś na daily.dev napisał, że działa.

**Link:** [Inertia.js server-side adapter for PHP](https://webkul.com/blog/inertia-js-adapter-for-wordpress-and-php/)

## CodePen 2.0: pięć lat przebudowy jednego edytora

**TLDR:** CodePen wypuścił kompletnie przebudowany edytor, który łączy Classic Pen i Projects w jedno środowisko oparte na plikach, z jednym kliknięciem do wdrożenia na własną subdomenę i realnym systemem plików zamiast limitu trzech zakładek.

**Summary:** Przez lata CodePen żyło z trzech osobnych edytorów, które trzeba było utrzymywać równolegle, co samo w sobie brzmi jak podręcznikowy przykład długu technicznego rozłożonego na produkt, a nie tylko na kod. Wersja 2.0 konsoliduje to wszystko w jeden, rozszerzalny edytor plikowy, w którym stary limit trzech plików znika, a projekt może rosnąć do wielu stron i modułów importowanych przez ES modules. Do tego dochodzi deployment jednym kliknięciem na subdomenę *.codepen.app, z możliwością podpięcia własnej domeny, co przesuwa CodePen z roli "miejsca do wklejenia snippetu" w stronę lekkiego hostingu. Nowy kompilator, nazwany Blocks, ma automatycznie spinać ze sobą procesory typu Sass, TypeScript, Tailwind czy Vue przez Vite bez ręcznej konfiguracji, a do tego dochodzi historia wersji i realna współpraca w czasie rzeczywistym, czyli rzeczy, których w Classic Pen po prostu nie było. Zespół zadbał też o wsteczną kompatybilność ze starymi Penami i o dostępność dla czytników ekranu, co akurat rzadko pojawia się w komunikatach "przebudowaliśmy wszystko od zera", więc warto to odnotować na plus. Pytanie, które w materiałach o premierze ktoś skrzętnie omija, brzmi: co z modelem biznesowym przy darmowym hostingu na własnej subdomenie. Jednoklikowy deployment brzmi świetnie, dopóki nie zapytacie, kto płaci za ruch, gdy wasz mały demo-projekt nagle trafi na Hacker News.

**Key takeaways:**
- Trzy stare edytory (Classic Pen, Projects, dedykowany dla Vue) zamieniono na jeden, oparty na plikach.
- Deployment jednym kliknięciem na *.codepen.app plus wsparcie dla własnych domen zmienia CodePen w lekki hosting.
- Kompilator Blocks automatycznie łączy Sass, TypeScript, Tailwind i Vue przez Vite bez ręcznej konfiguracji.

**Why do I care:** Dla frontendowca CodePen od lat był narzędziem do szybkich demo i reprodukcji buga, nie do budowania czegokolwiek poważnego, a ta aktualizacja wygląda na próbę zmiany tej percepcji. Realny system plików i deployment mogą zrobić z niego sensowne miejsce na prototypy komponentów czy szybkie POC bez odpalania lokalnego środowiska, ale bym nie budował na tym niczego, co ma żyć dłużej niż tydzień, dopóki nie zobaczę, jak to się zachowuje przy większych, prawdziwych projektach zespołowych.

**Link:** [The Launch of CodePen 2.0](https://blog.codepen.io/2026/07/23/two-point-oh/)

## Wysyłaj politykę, nie kod

**TLDR:** Zamiast duplikować logikę autoryzacji osobno na froncie i backendzie, można wysyłać albo gotową decyzję jako dane, albo samą politykę do oceny po stronie klienta przez wspólny, mały ewaluator. Backend zostaje jedynym źródłem prawdy, a frontend przestaje zgadywać.

**Summary:** Klasyczny problem: funkcja canCancelOrder() istnieje jednocześnie w API i we froncie, obie sprawdzają status zamówienia, obie żyją własnym życiem i prędzej czy później zaczynają się rozjeżdżać. Autor trafnie punktuje, że nawet wspólny pakiet w monorepo nie chroni przed rozjazdem, bo wersje po obu stronach mogą się różnić przy nieudanym wdrożeniu jednej z części, a to jest dokładnie ten rodzaj buga, który wygląda niewinnie na code review i wybucha na produkcji przy pierwszym race condition między deployami. Proponowane rozwiązanie ma dwa poziomy. Pierwszy, prostszy, to "wysyłaj decyzję": backend liczy regułę i zwraca gotowy wynik, na przykład listę dozwolonych akcji i powody, dla których inne są zablokowane, a front tylko renderuje ten stan bez powtarzania logiki. Drugi, dla bardziej złożonych reguł, to serializacja samej polityki i jej ocena po stronie klienta przez wspólny, względnie stabilny ewaluator, przy czym stabilny jest kod ewaluatora, a nie logika biznesowa, którą się przez niego przepuszcza. Autor wspomina bibliotekę CASL jako przykład narzędzia zaprojektowanego pod ten wzorzec oraz JSON Schema jako format, który przenosi się między językami, a zarazem uczciwie przyznaje, że nie każda reguła da się tak łatwo zserializować, bo coś w rodzaju walidatora Zod jest kodem, nie danymi. To jest chyba najbardziej niedocenione zdanie w całym tekście, bo pokazuje granicę tego podejścia, którą łatwo przeoczyć w entuzjazmie do "wszystko jako dane".

**Key takeaways:**
- Duplikowanie logiki autoryzacji po obu stronach API to gwarancja rozjazdu prędzej czy później, niezależnie od tego, jak dobrze zsynchronizowane są wdrożenia.
- "Wysyłaj decyzję" (gotowy wynik jako dane) rozwiązuje prostsze przypadki bez zmiany architektury frontu.
- "Wysyłaj politykę" (serializowana reguła plus wspólny ewaluator) skaluje się na bardziej złożone reguły, ale nie każda logika da się zserializować.

**Why do I care:** To jeden z tych tekstów, które warto podesłać zespołowi zaraz po tym, jak ktoś po raz trzeci naprawia bug polegający na tym, że przycisk "anuluj" jest aktywny na froncie, mimo że backend i tak odrzuci żądanie. Wzorzec z listą dozwolonych akcji jest bliski HATEOAS i w praktyce działa dobrze przy panelach administracyjnych czy dashboardach z warunkową widocznością akcji. Problem w tym, że wdrożenie tego porządnie wymaga dyscypliny przy projektowaniu API, a nie każdy zespół ma na to czas w środku sprintu, więc realistycznie ten wzorzec ląduje w projektach dopiero po tym, jak coś już się rozjechało na produkcji, nie przed.

**Link:** [Ship the policy, not the code](https://www.jayfreestone.com/writing/share-the-policy-not-the-code/)

## Tailwind kontra StyleX: prawdziwa migracja, prawdziwe liczby

**TLDR:** Autor przepisał 20 produkcyjnych komponentów z Tailwinda na StyleX i zmierzył konkretne liczby: LOC, rozmiar CSS, czas builda. Wynik nie jest tym, czego można by się spodziewać po marketingu żadnej ze stron.

**Summary:** Zamiast kolejnego tekstu w stylu "StyleX kontra Tailwind, porównanie filozofii", dostajemy coś rzadszego: twarde dane z realnej migracji. Dwadzieścia komponentów, w tym przyciski, karty, modale, taby, tabele danych, pola formularzy i toasty, każdy z wariantami wizualnymi, stanami interaktywnymi i responsywnością. Wynik po stronie kodu jest bezlitosny dla StyleX: 1568 linii w Tailwindzie kontra 3143 linie w StyleX, czyli wzrost o ponad sto procent, głównie przez jawne mapy stylów i rozbudowane definicje dla responsywności. Za to rozmiar wyjściowego CSS wyszedł praktycznie identyczny, około 20,4 kB w obu przypadkach, a mediana czasu cold builda różniła się nieznacznie, 8,0 sekundy dla Tailwinda i 7,4 dla StyleX, czyli różnica bez praktycznego znaczenia. Tam, gdzie StyleX wygrywa wyraźnie, to typowanie: obiekty stylów są typowane, IDE podpowiada tokeny designu, a błędy w nazwach klas czy literówki w wartościach łapane są w czasie kompilacji, a nie dopiero wizualnie na produkcji. Autor kończy uczciwym wnioskiem, że Tailwind daje szybkość i ekosystem, a StyleX daje twardsze gwarancje, i że wybór zależy od priorytetów projektu, a nie od tego, która technologia jest "lepsza" w oderwaniu od kontekstu. To jest dokładnie ten rodzaj konkluzji, którego brakuje w większości wojen frameworkowych, bo nie próbuje sprzedać jednego zwycięzcy, tylko pokazuje kompromis wprost, liczbami, bez owijania w bawełnę.

**Key takeaways:**
- Migracja 20 komponentów z Tailwinda na StyleX zwiększyła liczbę linii kodu o ponad 100%, przy niemal identycznym rozmiarze wynikowego CSS.
- Różnica w czasie cold builda między technologiami jest w praktyce pomijalna (8,0 s vs 7,4 s).
- StyleX wygrywa na typowaniu i wykrywaniu błędów w czasie kompilacji, Tailwind na szybkości prototypowania i wielkości ekosystemu.

**Why do I care:** Uwielbiam, kiedy ktoś zamiast kolejnego "moim zdaniem" po prostu policzy liczby i pokaże je bez retuszu. Dla architekta oznacza to konkretną wskazówkę do rozmowy z zespołem: StyleX ma sens tam, gdzie macie już system designu i chcecie twardych gwarancji typów, a nie tam, gdzie liczy się tempo dowiezienia landing page'a. Nie dałbym się jednak zwieść jednej migracji jako uniwersalnej prawdzie, bo 20 komponentów jednego zespołu w jednym kontekście to wciąż próbka, nie prawo fizyki, i w innym projekcie te proporcje mogą wyglądać zupełnie inaczej.

**Link:** [Tailwind CSS vs. StyleX: A real migration with 20 components](https://blog.logrocket.com/tailwind-css-vs-stylex-a-real-migration-with-20-components/)

## Centralizacja logiki cenowej: przestańcie rozrzucać reguły biznesowe

**TLDR:** Sergio Lema opisuje, jak funkcja zaokrąglania na froncie, inna konwersja walut na backendzie i osobne wyliczenie w jobie fakturującym prowadzą do sytuacji, w której trzy miejsca w systemie liczą tę samą cenę na trzy różne sposoby. Rozwiązaniem jest jedno miejsce prawdy dla cen, nie kolejna warstwa abstrakcji.

**Summary:** To jest tekst, który każdy, kto kiedykolwiek dostał zgłoszenie "klient zapłacił inną kwotę niż widział na ekranie", przeczyta z bolesnym rozpoznaniem. Lema opisuje typowy scenariusz z e-commerce czy systemów billingowych: cena jednostkowa, rabat, VAT i dostawa liczone są w kilku miejscach niezależnie, bo każdy zespół dopisywał swoją logikę tam, gdzie akurat pracował, bez świadomości, że gdzieś indziej istnieje już podobna funkcja. Rounding strategy zastosowana inaczej przy płatności niż przy fakturze to nie teoria, to konkretny bug, który generuje różnicę o grosz, a potem tydzień pracy księgowości i supportu, żeby ustalić, skąd się wzięła. Autor proponuje coś, co brzmi banalnie proste, a w praktyce jest trudne do wdrożenia w istniejącym systemie: przenieść całą logikę cenową do jednego dedykowanego miejsca, traktowanego jak czarna skrzynka, do którego wchodzą wszystkie potrzebne dane z góry, a nie stopniowo dociągane przez kolejne zapytania czy serwisy w trakcie liczenia. Im więcej serwisów i repozytoriów dopisuje się do procesu liczenia ceny w locie, tym trudniej o spójność i tym łatwiej o niezauważalny błąd zaokrąglenia, który ujawni się dopiero przy audycie finansowym. Czego artykuł nie rozwija wystarczająco, to pytanie o to, jak taka centralna usługa cenowa ma reagować na wymagania regionalne, różne stawki VAT i promocje zależne od czasu, bo w praktyce to właśnie tam "jedno miejsce prawdy" zaczyna pękać pod naciskiem wyjątków, których dział sprzedaży zawsze znajdzie więcej niż zakładał zespół inżynierski.

**Key takeaways:**
- Rozproszona logika cenowa (frontend, backend, joby fakturujące) prowadzi do rozjazdów wynikających z różnych strategii zaokrąglania i kolejności operacji.
- Rozwiązaniem jest jedna dedykowana usługa cenowa traktowana jako czarna skrzynka, zasilana kompletem danych z góry.
- Im więcej serwisów dopisuje logikę cenową w trakcie procesu, tym trudniej o spójność i tym łatwiej o niewidoczny błąd finansowy.

**Why do I care:** Logika cenowa to jeden z tych obszarów, gdzie "działa" i "działa poprawnie" to dwie zupełnie różne rzeczy, a różnica ujawnia się dopiero na dużej skali transakcji. Jako architekt widziałem więcej niż jeden projekt, w którym nikt nie potrafił wskazać jednego miejsca odpowiedzialnego za cenę końcową, bo logika była rozsiana po sześciu serwisach przez pięć lat rozwoju. Rada Lemy jest słuszna, ale to jest refaktoryzacja na tygodnie, nie na sprint, i warto o tym uczciwie powiedzieć biznesowi zanim ktoś obieca to jako "szybką poprawkę techniczną".

**Link:** [Centralizing Pricing Logic: Stop Scattering Your Business Rules](https://sergiolema.dev/2026/07/27/centralizing-pricing-logic-stop-scattering-your-business-rules/)
