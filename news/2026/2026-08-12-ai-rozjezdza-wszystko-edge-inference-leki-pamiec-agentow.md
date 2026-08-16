---
title: "Sztuczna inteligencja rozjeżdża wszystko: od edge inference po odkrywanie leków"
excerpt: "Pięć tekstów z HackerNoon o pogoni za mikrosekundami na krawędzi, klasyfikacji danych w iOS, modernizacji legacy, pamięci agentów AI i geopolityce leków projektowanych przez modele."
publishedAt: "2026-08-12"
slug: "ai-rozjezdza-wszystko-edge-inference-leki-pamiec-agentow"
hashtags: "#hackernoon #tech #ai #edgeai #ios #biotech #generated #pl"
source_pattern: "HackerNoon"
---

## Pułapka opóźnień: dlaczego pogoń za sub-milisekundowym Edge AI rujnuje ROI produktu

**TLDR:** Autor przekonuje, że produktowe zespoły ścigające się o mikrosekundy w inferencji na krawędzi optymalizują metrykę, której użytkownik i tak nie odczuje, płacąc za to droższym sprzętem i gorszą marżą. Deterministyczna, przewidywalna wydajność ma być ważniejsza niż surowa szybkość.

**Summary:** Teza artykułu jest prosta i w gruncie rzeczy słuszna: człowiek nie odróżni odpowiedzi w 5 milisekund od odpowiedzi w 50, więc pompowanie budżetu inżynierskiego w zejście poniżej progu percepcji ma sens tylko w wąskiej grupie zastosowań, takich jak robotyka czasu rzeczywistego, unikanie kolizji czy handel wysokiej częstotliwości. Dla reszty produktów okno 20 do 100 milisekund wystarcza w zupełności, a każda dodatkowa mikrosekunda zdobyta kosztem droższego układu NPU czy zamrożenia się na jednym dostawcy sprzętu to pieniądze wyjęte z marży bez żadnej wartości dla klienta. Autor rozbija to na coś, co nazywa trzema karami produktowymi za przesadną szybkość: nieopłacalną ekonomikę jednostkową, opóźnione wejście na rynek i rozjazd między tym, co się optymalizuje, a tym, za co klient faktycznie płaci.

Ciekawszy wątek pojawia się przy temacie suwerenności operacyjnej. W sektorach regulowanych, takich jak obronność, ochrona zdrowia czy infrastruktura krytyczna, kryterium zakupowym nie jest liczba mikrosekund, tylko pełna kontrola nad danymi i ciągłość działania offline. To ma sens i pokrywa się z tym, co widać w praktyce: klienci korporacyjni coraz częściej odrzucają rozwiązania edge, które w rzeczywistości mają ukryty, stały pępek łączący je z chmurą publiczną. Rozdzielenie prawdziwego air-gappingu od marketingowego "edge, ale jednak w chmurze" to obserwacja, która broni się sama.

Problem w tym, że tekst nigdzie nie pokazuje, skąd biorą się te liczby. Nie ma tu ani jednego konkretnego produktu, ani jednego benchmarku, ani nazwy firmy, która faktycznie przepaliła budżet na gonienie za rekordami syntetycznymi. Cała argumentacja stoi na tabelkach porównawczych "słabe pozycjonowanie kontra mocne pozycjonowanie", czyli na czystej retoryce sprzedażowej, a nie na danych z realnych wdrożeń. Autor też milczy o przypadkach, w których mikrosekundy jednak się liczą i których jest więcej niż sugeruje, na przykład w interfejsach głosowych, w grach czy w AR, gdzie percepcyjny próg "wystarczająco szybko" jest dużo niżej niż 100 milisekund, a różnica między 20 a 80 milisekundami bywa odczuwalna jako szarpanie obrazu.

Brakuje mi też przyznania, że sama redukcja modelu przez kwantyzację czy destylację, którą autor poleca jako oczywiste remedium, ma swój koszt w postaci utraty jakości predykcji, a "95 procent możliwości za ułamek sprzętu" to liczba wzięta z powietrza, nie z żadnego cytowanego testu. Artykuł czyta się jak poradnik dla Product Managera, który nigdy nie musiał uzasadnić inżynierom, dlaczego kwantyzacja modelu obniżyła recall o kilka punktów procentowych.

**Key takeaways:**
- Powyżej progu percepcji (ok. 100 ms) dalsze skracanie opóźnienia rzadko przekłada się na realną wartość dla użytkownika czy wyższą retencję.
- Deterministyczna, powtarzalna wydajność (np. 50 ms w 99,99% przypadków) buduje lepsze doświadczenie niż rekordowe 5 ms z okazjonalnymi skokami do 500 ms.
- W sektorach regulowanych kryterium zakupu to suwerenność danych i działanie offline, a nie surowa szybkość.
- Prawdziwy air-gapping (zero telemetrii, zero zależności sieciowych) staje się realną przewagą konkurencyjną nad rozwiązaniami "cloud-washed".
- Right-sizing modeli i cache semantyczny obniżają koszt sprzętu bez utraty odczuwalnej responsywności, ale nie są darmowe pod względem jakości.

**Why do I care:** Jako ktoś, kto projektował niejedną architekturę na styku frontend-backend-edge, podpisuję się pod główną tezą, bo widziałem zespoły, które tygodniami walczyły o dziesiątki milisekund w miejscu, gdzie użytkownik i tak czekał na kliknięcie przycisku dłużej niż trwała cała inferencja. Ale ten tekst jest zbyt czysto teoretyczny, żeby traktować go jako coś więcej niż zestaw sloganów do prezentacji dla zarządu; brakuje mu chirurgicznej precyzji liczb, jakiej wymagałbym, zanim przekonałbym własny zespół do zmiany priorytetów roadmapy.

**Link:** [The Latency Trap: Why Pursuing Sub-Millisecond Edge AI Ruins Product ROI](https://hackernoon.com/the-latency-trap-why-pursuing-sub-millisecond-edge-ai-ruins-product-roi)

## iOS: najpierw sklasyfikuj dane, dopiero potem wybieraj bazę

**TLDR:** Zanim zespół iOS zacznie się spierać, czy wziąć SwiftData, Core Dane, czy GRDB, powinien rozłożyć dane aplikacji na kategorie: preferencje, sekrety, encje domenowe, pliki użytkownika, cache i metadane synchronizacji. Każda z nich ma inny cykl życia i inne wymagania, a błędny wybór ujawnia się dopiero, gdy produkt zaczyna wymagać synchronizacji albo gdy token przetrwa przywrócenie telefonu na inny sprzęt.

**Summary:** Autor buduje tę argumentację na przykładzie aplikacji do planowania podróży, w której na pierwszy rzut oka wszystko wygląda jak jedna baza danych z wycieczkami, a po rozbiciu wymagań okazuje się, że mamy sześć zupełnie różnych kategorii danych. Preferencje UI trafiają do UserDefaults, ale autor od razu zaznacza pułapkę: UserDefaults przechowuje dane w formie nieszyfrowanej i trafia do kopii zapasowych urządzenia, więc lista pięciu ostatnich wyszukiwań to jeszcze preferencja, a pełna historia wyszukiwań z sortowaniem i usuwaniem to już model domenowy, który powinien wylądować gdzie indziej.

Token dostępu i dane logowania idą do Keychain, i to tutaj artykuł robi coś, czego brakowało poprzedniemu tekstowi o Edge AI, czyli pokazuje konkretną decyzję z realną konsekwencją. Atrybut kSecAttrAccessible decyduje o tym, czy dany sekret przetrwa przywrócenie z backupu na innym urządzeniu, a błąd w tej konfiguracji nie objawia się żadnym ostrzeżeniem ani awarią, tylko cichym trzymaniem długożyjącego tokenu w formie, która przenosi się na obcy sprzęt. To dokładnie ten typ błędu, który wypływa po roku w produkcji, kiedy ktoś zgłasza incydent bezpieczeństwa, a nikt nie pamięta, że default nigdy nie był świadomą decyzją.

Duże załączniki, takie jak bilety PDF czy zdjęcia, autor konsekwentnie wyprowadza z bazy danych do systemu plików, z osobną warstwą metadanych. To rozwiązuje problem, który każdy programista bazodanowy zna z bólu: sześciomegabajtowe zdjęcie w tabeli, którą odpytuje każdy ekran aplikacji, spowalnia wszystko, nawet zapytania, które w ogóle tego zdjęcia nie potrzebują. Warto docenić, że artykuł nie kończy na "trzymaj pliki osobno", tylko idzie dalej, do ochrony plików przed odczytem, gdy telefon jest zablokowany, i do ostrzeżenia, że magazyn SQLite w trybie WAL to w rzeczywistości trzy pliki, więc ustawienie atrybutu ochrony na jednym z nich niczego nie gwarantuje.

Najbardziej dojrzały fragment dotyczy tego, co się dzieje, gdy baza się nie otwiera. Autor odrzuca odruch, który widziałem w niejednym kodzie produkcyjnym: złap wyjątek, utwórz pustą bazę, jedź dalej. To rozwiązanie wygląda na naprawę, a w rzeczywistości milcząco kasuje dane użytkownika i, co gorsza, gdy w grę wchodzi silnik synchronizacji, ta pusta baza zostanie odczytana jako zestaw usunięć do wypchnięcia na serwer. Polityka powinna być inna dla cache, który można bezkarnie skasować i odbudować, i inna dla danych domenowych, które trzeba pokazać jako błąd i zostawić w spokoju, zamiast udawać, że aplikacja działa normalnie.

**Key takeaways:**
- Klasyfikacja danych (preferencje, sekrety, encje domenowe, pliki, cache, metadane synchronizacji) powinna poprzedzać wybór frameworka bazodanowego, nie odwrotnie.
- Domyślna wartość kSecAttrAccessible w Keychain to decyzja bezpieczeństwa i produktu, którą trzeba podjąć świadomie, bo błąd nie generuje żadnego ostrzeżenia.
- Duże pliki należy trzymać w systemie plików z metadanymi w bazie, a nie jako pola binarne w tabelach, które odpytuje cała aplikacja.
- Ochrona plików (FileProtectionType) i magazynu danych to osobna decyzja od atrybutów Keychain, ale rządzi się tą samą zasadą świadomego wyboru.
- Gdy magazyn danych nie chce się otworzyć, cache można bezpiecznie usunąć i odbudować, ale dane domenowe użytkownika trzeba zachować i zgłosić błąd zamiast po cichu tworzyć pustą bazę.

**Why do I care:** To rzadki przypadek tekstu technicznego, który faktycznie prowadzi czytelnika przez konsekwencje decyzji, a nie tylko przez listę nazw frameworków, i mimo że dotyczy iOS, ten sam podział na warstwy (preferencje, sekrety, dane domenowe, pliki, cache, stan synchronizacji) przenosi się jeden do jednego na architekturę frontendową w przeglądarce, gdzie localStorage, IndexedDB i pamięć w service workerze pełnią dokładnie analogiczne role, a te same błędy z mieszaniem kategorii popełnia się tam równie chętnie.

**Link:** [iOS Data Storage: Classify Your Data Before You Choose a Database](https://hackernoon.com/ios-data-storage-classify-your-data-before-you-choose-a-database)

## Modernizacja legacy AlphaBASIC: gdy poradnik brzmi zbyt gładko, żeby był prawdziwy

**TLDR:** Artykuł opisuje konwersję starej aplikacji AlphaBASIC działającej na sprzęcie Alpha Micro do aplikacji webowej, proponując konteneryzację i wdrożenie fazowe jako receptę na ryzyko. Sam pomysł jest rozsądny, ale sposób jego udowodnienia budzi więcej podejrzeń niż zaufania.

**Summary:** Diagnoza problemu jest trafna i dobrze znana każdemu, kto pracował przy modernizacji legacy: sprzęt już się nie produkuje, programiści znający dany dialekt są rzadkością, a protokoły komunikacji z instytucjami rządowymi zmieniają się szybciej niż sam system. Autor słusznie zauważa, że emulacja sprzętu w kontenerze (na przykład przez QEMU) wprowadza opóźnienia i może nie odtworzyć precyzyjnego timingu przerwań sprzętowych, co bywa realnym źródłem awarii przy walidacji danych pod obciążeniem. Rekomendacja fazowego wdrożenia, w którym najpierw wystawia się nowy frontend webowy, a moduł zgłoszeń zostaje po staremu, dopóki integracja z API nie okrzepnie, brzmi jak zdroworozsądkowa strategia ograniczania ryzyka.

Tam, gdzie tekst zaczyna się rozjeżdżać, jest sekcja z sześcioma studiami przypadków. Każde z nich ma identyczną strukturę: mechanizm, ograniczenie środowiskowe, ryzyko awarii, rozwiązanie, reguła decyzyjna, i każde kończy się okrągłym procentem sukcesu, takim jak redukcja błędów o 95 procent, skrócenie czasu testów o 40 procent czy poprawa czasu odpowiedzi o 60 procent. Żadna z tych liczb nie ma źródła, żadna firma nie jest nazwana, żadna z sześciu branż (księgowość, produkcja, ochrona zdrowia, organizacja non-profit, handel detaliczny, edukacja) nie pasuje akurat do systemu AlphaBASIC do rozliczeń podatkowych, o którym mówi wstęp artykułu. To wygląda dokładnie tak, jak wyglądają teksty generowane pod kątem wypełnienia sekcji, a nie relacjonowania czegokolwiek, co się faktycznie wydarzyło.

Reguła "konwertuj, jeśli kod ma mniej niż 5000 linii i API rządowe wspiera zgłoszenia wsadowe, w przeciwnym razie przebuduj od zera z mikroserwisami" brzmi konkretnie, dopóki nie zapytasz, skąd wzięła się liczba 5000 albo dlaczego akurat próg 100 tysięcy dolarów kosztu inżynierii wstecznej dzieli te dwie ścieżki. Nie ma tu żadnego uzasadnienia, tylko arbitralna liczba podana z taką pewnością, jakby pochodziła z analizy setek projektów. Podobnie sekcja o bezpieczeństwie każe "zreverse-engineerować model bezpieczeństwa legacy i zmapować go na OAuth 2.0", co samo w sobie jest sensownym kierunkiem, ale bez ani jednego zdania o tym, jak wygląda ten proces w praktyce, kiedy dokumentacji nie ma, a autor oryginalnego kodu dawno odszedł na emeryturę.

Artykuł unika też najtrudniejszego pytania w całej tej historii: co się dzieje z klientami systemu w trakcie migracji, gdy urząd zmienia format zgłoszenia w połowie projektu konwersji, a stary i nowy system muszą przez pewien czas współistnieć, generując rozbieżne dane. To pytanie, które w prawdziwym projekcie modernizacyjnym decyduje o sukcesie albo katastrofie, tutaj w ogóle się nie pojawia.

**Key takeaways:**
- Diagnoza problemu (schyłkowy sprzęt, brak programistów, zmieniające się API rządowe) jest trafna i uniwersalna dla wielu projektów modernizacji legacy.
- Konteneryzacja legacy stosu i fazowe wdrożenie nowego frontendu przy zachowaniu starego modułu zgłoszeń to rozsądna strategia ograniczania ryzyka.
- Sekcja studiów przypadków nie zawiera weryfikowalnych źródeł, nazw firm ani spójności z opisanym systemem, co podważa wiarygodność podanych liczb.
- Progi decyzyjne (5000 linii kodu, 100 tysięcy dolarów) są podane bez żadnego uzasadnienia metodologicznego.
- Artykuł pomija kluczowy dla realnych projektów problem współistnienia starego i nowego systemu podczas zmiany formatu danych po stronie urzędu.

**Why do I care:** Prowadziłem wystarczająco dużo projektów modernizacji, żeby wiedzieć, że diabeł siedzi dokładnie w tych detalach, których ten tekst unika, czyli w migracji danych bez metadanych i w reakcji użytkowników przyzwyczajonych do starych skrótów klawiszowych, a nie w ogólnikowej regule o liczbie linii kodu; polecałbym ten artykuł jako listę pytań do zadania klientowi, a nie jako plan działania.

**Link:** [Modernizing Legacy AlphaBASIC Software: Web-Based Conversion for Continued Usability & Profitability](https://hackernoon.com/modernizing-legacy-alphabasic-software-web-based-conversion-for-continued-usability-and-profitability)

## AI odkryło lek, świat postanowił przestać się danymi dzielić

**TLDR:** Modele generatywne zaprojektowały cząsteczkę, która realnie działa w płucach pacjenta, a targetowana degradacja białek i przeciwciała bispecyficzne zastąpiły klasyczne inhibitory. Jednocześnie geopolityka, w tym amerykańska ustawa BIOSECURE, zaczyna dzielić świat na strefy, które nie mogą już swobodnie wymieniać danych klinicznych i genetycznych, mimo że właśnie ta wymiana napędza dalszy postęp.

**Summary:** Sedno tekstu opiera się na konkretnym przypadku klinicznym: rentosertib, cząsteczka wymierzona w enzym TNIK, w badaniu fazy IIa nad włóknieniem płuc dała statystycznie istotną poprawę pojemności życiowej płuc, a zarówno cel terapeutyczny, jak i sama cząsteczka wyszły z modeli Insilico Medicine, bez ludzkiej hipotezy na starcie. To pierwszy naprawdę czysty dowód kliniczny na to, że lek zaprojektowany od początku do końca przez maszynę działa w człowieku, i to jest fakt, a nie marketing, bo wynik pochodzi z zarejestrowanego badania klinicznego, a nie z prezentacji inwestorskiej.

Drugi wątek dotyczy zmiany samej strategii działania leków. Zamiast klasycznego blokowania miejsca aktywnego białka, PROTAC-i chwytają białko chorobotwórcze jedną "ręką", a enzym E3 ligazy drugą, doprowadzając do oznaczenia białka jako śmieci i jego zniszczenia przez proteasom, po czym cząsteczka się uwalnia i robi to samo jeszcze raz. Zatwierdzenie vepdegestrantu w maju 2026 roku na raka piersi z mutacją ESR1, czyli dokładnie ten scenariusz, w którym klasyczne inhibitory hormonalne przestają działać, bo receptor zmienia kształt, jest dowodem, że cała kategoria terapii jest nie tylko naukowo sensowna, ale też możliwa do zatwierdzenia przez regulatora.

Najbardziej frapujący fragment to historia ivonescimabu, przeciwciała bispecyficznego z Chin, które w chińskim badaniu klinicznym pokonało Keytrudę, sztandarowy lek Mercka, na wskaźniku przeżycia bez progresji choroby. Autor uczciwie pokazuje jednak asterysk: w badaniu globalnym wynik dotyczący całkowitego przeżycia wylądował na granicy istotności statystycznej, z wartością p równą 0,057, czyli tuż nad progiem 0,05 wymaganym do zatwierdzenia. To rozróżnienie między emfatycznym wynikiem chińskim a niejednoznacznym globalnym jest, zdaniem autora, powracającym pytaniem nad całą generacją leków pochodzących z Chin, i trudno się z tym nie zgodzić, biorąc pod uwagę precedens odrzucenia przez FDA danych tylko-chińskich dla innego leku w 2022 roku.

Geopolityczna część tekstu jest najbardziej wartościowa, bo pokazuje mechanizm, którego nie widać na pierwszy rzut oka: ustawa BIOSECURE reguluje produkcję i usługi, ale nie reguluje licencjonowania własności intelektualnej ani danych klinicznych. To oznacza, że wielomiliardowe umowy licencyjne na chińskie cząsteczki pozostają całkowicie legalne, a firma zachodnia po prostu musi przenieść produkcję i hosting danych klinicznych do zakładów zachodnich. Innymi słowy, ustawa nie zatrzymuje przepływu chińskiej chemii do zachodnich aptek, tylko przepływ chińskich fabryk, co samo w sobie jest fascynującą ilustracją tego, jak prawo pisane pod kątem bezpieczeństwa narodowego potrafi minąć się z realnym problemem, który miało rozwiązać.

Autor sam podważa nagłówek własnego tekstu, przyznając, że licząc programy pierwsze-w-swojej-klasie, Zachód wciąż prowadzi 127 do 21, a fundamentalne parametry takie jak PD-1, CAR-T czy sama architektura PROTAC pochodzą z Kioto, Izraela i uczelni takich jak Yale czy Caltech. Chiny zbudowały najlepszą na świecie warstwę translacyjną, czyli maszynerię przekształcającą zwalidowaną biologię w aktywo kliniczne szybciej i taniej niż gdziekolwiek indziej, co jest ogromnie wartościowe, ale to coś innego niż "reinvented drug discovery" z tytułu. Ten rozdźwięk między nagłówkiem a treścią to jedyna słabość tekstu, bo reszta materiału jest rzetelnie ponumerowana, z linkami do źródeł przy każdym twierdzeniu.

**Key takeaways:**
- Rentosertib to pierwszy lek, w którym zarówno cel terapeutyczny, jak i cząsteczka pochodzą od modeli AI, potwierdzony statystycznie istotnym wynikiem w badaniu klinicznym fazy IIa.
- PROTAC-i degradują białka chorobotwórcze zamiast je blokować, co omija mechanizm oporności typowy dla klasycznych inhibitorów; pierwsze zatwierdzenie FDA to vepdegestrant w raku piersi.
- Ivonescimab pokonał Keytrudę w badaniu chińskim, ale globalny wynik dotyczący przeżycia całkowitego balansuje na granicy istotności statystycznej (p=0,057).
- Ustawa BIOSECURE ogranicza produkcję i usługi powiązane z chińskimi firmami, ale nie licencjonowanie IP ani danych klinicznych, co tworzy realną lukę prawną.
- Mimo rosnącego udziału Chin w globalnym pipeline leków, fundamentalne odkrycia naukowe (PD-1, CAR-T, PROTAC) wciąż pochodzą głównie z Zachodu i Japonii.

**Why do I care:** Jako inżynier na co dzień pracujący z modelami AI w zupełnie innym kontekście, doceniam, że ten tekst nie sprowadza się do hurraoptymizmu, tylko pokazuje realny mechanizm, w którym systemy głodne danych trafiają na świat coraz chętniej stawiający granice na te dane, bo to dokładnie ten sam konflikt, z którym mierzą się wszystkie modele trenowane na danych firmowych, tylko tutaj stawką są lata życia pacjentów, a nie jakość rekomendacji produktowych.

**Link:** [AI Has Reinvented Drug Discovery. Now Come the Borders](https://hackernoon.com/ai-has-reinvented-drug-discovery-now-come-the-borders)

## Czyja to pamięć? Projektowanie wielopoziomowej pamięci agentów AI dla wielu najemców

**TLDR:** Druga część serii o pamięci agentów AI definiuje trzy warstwy pamięci (krótko-, średnio- i długoterminową) oraz hierarchiczny model dostępu oparty na sesji, agencie i użytkowniku, tak żeby jeden agent nie mógł przypadkiem odczytać wspomnień cudzego konta. Autor przekłada to na konkretną implementację w systemie orkiestracji na Kubernetesie.

**Summary:** Punktem wyjścia jest pytanie, które brzmi banalnie, dopóki nie spróbuje się je zaimplementować: czy Alicja rozmawiająca z tymi samymi agentami co Bob powinna mieć dostęp do wspomnień z jego interakcji. Autor rozbija pamięć na trzy warstwy: krótkoterminowe okno kontekstu ograniczone budżetem tokenów, aktualizowane przy każdej turze; średnioterminowe podsumowanie sesji, wersjonowane i aktualizowane podczas kompaktowania; oraz długoterminowe atomowe fakty wyciągane w tle i trafiające do bazy wektorowej przez Mem0. Decyzja, żeby podsumowania średnioterminowe zostały poza bazą wektorową, jest dobrze uzasadniona: Mem0 chce atomowych, osobno rewidowalnych faktów, a podsumowanie ma wartość właśnie w swojej narracyjnej ciągłości, więc mieszanie tych dwóch rzeczy w jednym magazynie zepsułoby obie funkcje naraz.

Najciekawszy fragment dotyczy modelu dostępu do odczytu. Autor rozróżnia zapis od odczytu: zapis jest zawsze złożony i niezmienny, bo każda wiadomość niesie ze sobą identyfikator użytkownika, tożsamość agenta i identyfikator sesji, natomiast odczyt rozwiązuje się do jednego konkretnego poziomu zgodnie z polityką. Te cztery poziomy, sesja, agent, użytkownik i cały magazyn, są uporządkowane hierarchicznie, a każdy magazyn pamięci ma własny sufit maxReadScope, powyżej którego żaden agent nie może się wspiąć, nawet jeśli bardzo by chciał. Tożsamość zawsze pochodzi z nagłówków żądania zweryfikowanych przez bramkę, nigdy z treści żądania ani z samego modelu, co jest dokładnie tym, czego brakuje w wielu prostszych implementacjach agentowych, gdzie kontrola dostępu bywa zaszyta w prompt systemowy, czyli w miejscu, które model może teoretycznie zignorować albo które można obejść przez odpowiednio sformułowane zapytanie.

Autor otwarcie przyznaje się do uproszczenia, wybierając model "jeden magazyn pamięci na grupę" zamiast budowania osobnej warstwy zarządzania grupami wewnątrz jednego magazynu. To oznacza więcej wdrożeń infrastruktury, ale też mniej kodu do audytowania, i co ważniejsze, sam magazyn staje się granicą izolacji na poziomie warstwy kontrolnej, a nie na poziomie logiki aplikacyjnej, gdzie jedna zapomniana klauzula WHERE potrafi zwrócić wiersze należące do innego najemcy. Przywołanie badań AgentPoison i MINJA, pokazujących, że zatrucie zaledwie 0,1 procent pamięci potrafi dać ponad 80 procent skuteczności ataku, i że atakujący nie potrzebuje nawet dostępu do zapisu, jeśli agent sam zapisuje swoją pamięć z rozmów z użytkownikiem, nadaje temu tekstowi wagę praktyczną, a nie tylko akademicką.

Ostatni element, prawo do bycia zapomnianym, pokazuje dojrzałość myślenia o tym projekcie: skoro te same informacje żyją równolegle w kilku warstwach (surowe wiadomości, podsumowania, fakty, embeddingi), usunięcie z jednej warstwy nic nie daje, więc operacja zapomnienia musi rozejść się jednym przejściem po wszystkich trzech warstwach naraz. Autor rozróżnia przy tym zniszczenie danych od supersedencji, gdzie fakt jest oznaczony jako nieaktualny, ale zachowany dla historii, co jest subtelnym, ale ważnym rozróżnieniem prawnym.

**Key takeaways:**
- Trzy warstwy pamięci (krótko-, średnio-, długoterminowa) mają różne cykle życia i różne magazyny, a mieszanie ich w jednym miejscu psuje właściwości obu.
- Zapis do pamięci jest zawsze złożony (agent, użytkownik, sesja), a odczyt rozwiązuje się do jednego z czterech hierarchicznych poziomów ograniczonych przez maxReadScope danego magazynu.
- Tożsamość do kontroli dostępu musi pochodzić z zweryfikowanych nagłówków żądania na poziomie bramki, nigdy z treści promptu ani z modelu.
- Model "jeden magazyn pamięci na grupę" przenosi izolację na poziom infrastruktury zamiast logiki aplikacyjnej, redukując ryzyko błędu w filtrowaniu zapytań.
- Zatrucie pamięci agenta (AgentPoison, MINJA) to udokumentowany atak o wysokiej skuteczności nawet przy minimalnym dostępie, co czyni z kontroli dostępu do pamięci realny problem bezpieczeństwa, a nie teoretyczny.

**Why do I care:** Buduję i integruję systemy agentowe na tyle często, żeby wiedzieć, że pytanie "czyja to pamięć" pojawia się w każdym projekcie wielodostępnym, a większość zespołów odpowiada na nie post factum, dopiero gdy ktoś zgłosi wyciek danych między kontami; ten artykuł jest jednym z niewielu, które proponują odpowiedź zanim problem się zmaterializuje, i cenię sobie zwłaszcza decyzję, żeby uprawnienia trzymać w warstwie kontrolnej, a nie w prompt engineeringu.

**Link:** [Whose Memory Is It? Building Multi-Tenant, Multi-Tier Memory for AI Agents (Part 2)](https://hackernoon.com/whose-memory-is-it-building-multi-tenant-multi-tier-memory-for-ai-agents-part-2)
