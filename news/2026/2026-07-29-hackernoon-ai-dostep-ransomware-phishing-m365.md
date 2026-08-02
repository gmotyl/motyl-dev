---
title: "HackerNoon: wojna o dostęp do AI, ransomware na poziomie plików i phishing na Microsoft 365"
excerpt: "Przegląd technicznych i geopolitycznych wątków z HackerNoon: obrona przed ransomware budowana na fanotify i append-only archiwach, spór o to, kto naprawdę wygra wyścig AI, kampania phishingowa Kratos oraz uczciwy przewodnik po Spring Security z JWT."
publishedAt: "2026-07-29"
slug: "hackernoon-ai-dostep-ransomware-phishing-m365"
hashtags: "#hackernoon #security #ransomware #ai #llm #geopolityka #phishing #java #architecture #generated #pl"
---

## Obrona przed ransomware na poziomie systemu plików

**TLDR:** Autor przekonuje, że klasyczna obrona przed ransomware skupiona na harmonogramie backupów atakuje problem za późno. Proponuje połączenie monitoringu dostępu do plików na poziomie jądra (fanotify) z archiwizacją append-only opartą na formacie zstd, która usuwa zimne dane z enumerowalnego systemu plików.

**Summary:** Punkt wyjścia jest prosty i trudno się z nim nie zgodzić: notatka z żądaniem okupu to koniec historii, nie jej początek. Zanim się pojawi, atakujący zwykle siedzi w systemie od dwóch, trzech tygodni, mapując dane i szukając backupów do zdegradowania. Problem w tym, że większość organizacji traktuje obronę przed ransomware jako zagadnienie harmonogramu, czyli jak często robić snapshoty i jak szybko można wrócić do ostatniego dobrego stanu. To podejście milcząco zakłada, że szyfrowanie to zdarzenie natychmiastowe, a nie proces rozłożony w czasie, w którym atakujący ma mnóstwo okazji, żeby po cichu wyłączyć albo skorumpować infrastrukturę backupową, zanim ktokolwiek zauważy problem.

Pierwszym filarem propozycji jest fanotify, mechanizm jądra Linuksa pierwotnie zaprojektowany pod kątem antywirusów i DLP, który pozwala procesowi w przestrzeni użytkownika subskrybować zdarzenia na całym mounta, z opcją przechwycenia operacji przed jej wykonaniem. To istotna różnica względem inotify czy skanowania logów, bo źródłem prawdy jest samo jądro, a nie proces, który atakujący może próbować oszukać albo ominąć. Autor pokazuje minimalny listener i tłumaczy, że to, co się z niego dostaje, to nie log do analizy po fakcie, tylko żywy strumień zdarzeń z kontekstem: który proces, który plik, odczyt czy zapis, jak szybko. Nagły wysyp operacji otwórz-i-nadpisz w katalogach, których dany proces nigdy wcześniej nie dotykał, to sygnał, na który można zareagować w sekundy, a nie coś, o czym dowiadujesz się dopiero z zablokowanego ekranu użytkownika.

Drugi filar jest bardziej strukturalny i moim zdaniem ciekawszy, bo zmienia samo pojęcie powierzchni ataku. Ransomware masowo szyfrujący dane działa, bo większość plików w organizacji, w tym te, których nikt nie dotykał od miesięcy, leży jako zwyczajne pliki na zwyczajnych mountach, w pełni enumerowalne i zapisywalne przez cokolwiek, co ma odpowiednie uprawnienia. NAS ani bucket w chmurze niczego tu nie zmieniają, bo z perspektywy malware to wciąż tylko kolejne ścieżki do przejścia pętlą. Pomysł, żeby zimne dane pakować do niewielkiej liczby dużych archiwów append-only, z lekkim wpisem katalogowym na żywym systemie plików zamiast pełnego pliku, jest sensowny właśnie dlatego, że eliminuje cel do zaszyfrowania, a nie tylko utrudnia do niego dostęp. Format ramkowy zstd, z niezależnymi ramkami, własnym checksumem każdej z nich i natywnym wsparciem dla dopisywania bez re-enkodowania wcześniejszych danych, okazuje się tu bardziej trafnym wyborem inżynierskim niż zwykłym szczegółem kompresji.

Czego autor nie mówi wprost, to że to podejście wymaga poważnej zmiany architektonicznej i operacyjnej, nie jest to łatka, którą wdraża się w popołudnie. Przejście z modelu plikowego na model katalog-plus-archiwum dotyka wszystkiego, co odczytuje dane, od backupów po narzędzia audytowe i integracje. Artykuł kończy się linkiem do HuskHoard, open source'owego systemu realizującego dokładnie ten wzorzec, co trochę zdradza, że to również forma promocji własnego projektu, ale sama argumentacja techniczna broni się niezależnie od tego, kto ją publikuje.

**Key takeaways:**
- Backup jako jedyna linia obrony traktuje atak jak zdarzenie natychmiastowe, ignorując tygodnie rekonesansu, w trakcie których atakujący szuka i degraduje infrastrukturę backupową
- fanotify daje widoczność na poziomie jądra dla całego mounta, z możliwością przechwycenia operacji przed jej wykonaniem, co odróżnia go od inotify czy log scrapingu
- Pakowanie zimnych danych w append-only archiwa zstd usuwa je z enumerowalnego systemu plików, więc ransomware nie ma czego wyliczać i szyfrować plik po pliku
- Połączenie obu mechanizmów zmienia RPO z harmonogramu na strumień zdarzeń, a blast radius zawęża się do danych wciąż leżących na gorącej warstwie

**Why do I care:** Dla architekta systemów to przypomnienie, że warstwa danych bywa równie ważnym elementem modelu zagrożeń co warstwa aplikacji, a decyzje o tym, jak dane są przechowywane, mają bezpośredni wpływ na to, co w ogóle jest możliwe do zaatakowania. Jeśli projektujesz systemy z długoterminowym przechowywaniem danych, warto rozważyć podobne rozdzielenie na dane gorące i zimne już na etapie architektury, zamiast doklejać to później jako osobny projekt bezpieczeństwa.

**Link:** [Rethinking Ransomware Defense at the Filesystem Layer](https://hackernoon.com/rethinking-ransomware-defense-at-the-filesystem-layer)

## Kolejna wojna o AI toczy się o dostęp, nie o modele

**TLDR:** Autor twierdzi, że pytanie „kto zbuduje najmądrniejszy model” traci na znaczeniu wobec pytania „kto dostanie do niego dostęp”, bo inteligencja stała się infrastrukturą fizyczną, a nie tylko oprogramowaniem. Kontrola eksportu chipów i ograniczenia dostępu do modeli to według niego dwie strony tej samej strategicznej monety.

**Summary:** Teza jest atrakcyjna retorycznie: skoro każdy prompt zużywa realne GPU, prąd i chłodzenie, to inteligencja przestaje być czymś, co da się skopiować za darmo, jak dawniej oprogramowanie, i staje się zasobem rozdzielanym tak samo jak elektryczność czy ropa. Analogia z poprzednimi rewolucjami przemysłowymi jest chwytliwa, ale też trochę zbyt wygodna. Autor przeskakuje od obserwacji, że kontrola eksportu chipów istnieje, do wniosku, że świat zmierza ku rozdrobnionym ekosystemom AI, nie pokazując właściwie żadnego mechanizmu pośredniego poza analogią historyczną. To rodzaj argumentacji, która brzmi przekonująco w eseju, ale rozjeżdża się przy pierwszym pytaniu o konkrety: ile dokładnie compute potrzeba, żeby stać się niezależnym ekosystemem, i czy Europa albo Indie faktycznie mają szansę zbudować coś więcej niż fasadową suwerenność.

Najciekawszy fragment to ten o dystrybucji jako właściwym polu bitwy, bo faktycznie stawia dobre pytanie: kto ma priorytet, gdy popyt na frontier AI rośnie szybciej niż zdolność budowania compute. Wojsko, infrastruktura krytyczna, badania naukowe, czy po prostu ten, kto zapłaci najwięcej? Autor przyznaje, że nie ma jednej odpowiedzi, i to akurat uczciwe, bo faktycznie nikt dziś nie wie, jak rządy rozwiążą ten konflikt priorytetów, gdy zacznie realnie boleć.

Brakuje mi w tym tekście chłodniejszego spojrzenia na to, że część tej narracji napędzają sami gracze rynkowi, którym zależy, żeby traktowano ich produkt jako zasób strategiczny, bo to uzasadnia zarówno subsydia rządowe, jak i wyższe ceny. Kiedy autor pisze, że rządy „zrozumiały coś, czego reszta z nas dopiero zaczyna rozumieć”, to brzmi trochę jak echo komunikatów prasowych tych samych firm, które najbardziej zyskują na takim postrzeganiu compute jako dobra rzadkiego. Nie znaczy to, że teza jest fałszywa, ograniczenia eksportowe na chipy realnie istnieją i mają realne konsekwencje, ale warto czytać to z pewnym dystansem do tego, komu taka narracja akurat jest na rękę.

**Key takeaways:**
- Kontrola eksportu chipów przez USA i potencjalne ograniczenia Chin na dostęp do modeli to według autora dwa symptomy tego samego zjawiska: traktowania AI jako infrastruktury strategicznej
- Realnym wąskim gardłem nie jest pomysłowość, tylko fizyczna infrastruktura: GPU, fabryki, energia, sieci
- Pytanie o priorytety dystrybucji compute (wojsko, nauka, biznes, obywatele) nie ma dziś jednej odpowiedzi i prawdopodobnie będzie się różnić między krajami
- Możliwy scenariusz to kilka równoległych, niekompatybilnych ekosystemów AI zamiast jednej globalnej warstwy inteligencji

**Why do I care:** To temat czysto biznesowo-geopolityczny, bez bezpośredniego przełożenia na architekturę systemów czy codzienną pracę zespołu, ale warto go śledzić z jednego powodu praktycznego: jeśli dostęp do najlepszych modeli faktycznie stanie się reglamentowany regionalnie, to decyzje o tym, z jakiego dostawcy LLM korzysta twoja firma, mogą w pewnym momencie przestać być czysto techniczne i zacząć zależeć od jurysdykcji.

**Link:** [The Next AI War Will Be Fought Over Access, Not Models](https://hackernoon.com/the-next-ai-war-will-be-fought-over-access-not-models)

## Kratos: phishing-as-a-service atakujący Microsoft 365

**TLDR:** ANY.RUN opisuje Kratos, dojrzały zestaw phishingowy sprzedawany w modelu subskrypcyjnym, który podszywa się pod logowanie Microsoft 365 i doprowadził do atrybucji 1484 wcześniej nieprzypisanych detonacji w ich sandboxie. Artykuł daje konkretne odciski palców (pliki barr.svg i lg.svg), endpointy eksfiltracji i reguły scoringowe do SIEM.

**Summary:** To, co odróżnia ten tekst od typowego ogłoszenia o nowym malware, to metoda dojścia do wniosków. Zespół zaczął od 156 sesji już otagowanych jako Kratos, zauważył, że niemal każda ładuje ten sam komplet plików z katalogu assets, i sprawdził, jak konsekwentnie dwa konkretne pliki, barr.svg i lg.svg, występują razem. Wynik, 1397 wspólnych wystąpień wobec pojedynczych przypadków rozłącznych, dał im pojedynczy odcisk palca z 90 procentami recall i praktycznie zerowym fałszywym alarmem. To ładny przykład threat huntingu opartego na artefaktach statycznych zamiast na domenach, które i tak są jednorazowe i szybko wypalają się jako IOC.

Kampania jest rozłożona w czasie i ewoluuje: trzy generacje strony phishingowej, każda z własnym kodem eksfiltracji, od prostego mini.php po zaciemniony main.js z jQuery 4.0 beta w wersji trzeciej. Operatorzy mają własny panel administracyjny z automatycznym wdrażaniem domen, wyborem między backendem PHP a reverse proxy Node.js z ochroną anty-bot, integracją z Telegramem do odbierania skradzionych danych i dwuskładnikowym uwierzytelnianiem chronionym własnym panelem. To pokazuje, jak bardzo phishing stał się produktem SaaS z pełnym cyklem życia, a nie jednorazowym exploitem.

Warto jednak zauważyć, że tekst jest w praktyce materiałem promocyjnym firmy ANY.RUN, kończącym się sekcją o produkcie i odniesieniem do własnej platformy TI Lookup, co nie jest niczym złym samo w sobie, ale warto o tym pamiętać czytając liczby jako neutralne dane badawcze. Sama technika detekcji, czyli łączenie hashów zasobów statycznych z endpointami eksfiltracji i scoringiem kumulatywnym zamiast prostego dopasowania binarnego, jest solidna i da się ją zaadaptować niezależnie od tego, jakiego dostawcy sandboxa się używa.

Rekomendacje dla zespołów bezpieczeństwa są konkretne i praktyczne: osobne playbooki dla zwykłego credential harvestingu i dla podejrzenia ataku typu adversary-in-the-middle, gdzie sam reset hasła nie wystarczy, bo atakujący może już mieć aktywną sesję. To rozróżnienie często ginie w standardowych procedurach reagowania na incydenty, a tutaj jest wyraźnie wypunktowane jako osobna decyzja operacyjna.

**Key takeaways:**
- Odcisk palca oparty na współwystępowaniu plików barr.svg i lg.svg dał 90 procent recall przy praktycznie zerowym fałszywym alarmie
- Kratos przeszedł trzy generacje, każda z innym kodem eksfiltracji, ale wspólną infrastrukturą operatorską i tymi samymi domenami
- Panel operatora pozwala wdrożyć domenę phishingową w kilka kliknięć, wybrać ochronę anty-bot i kanał odbioru danych (Telegram albo e-mail)
- Reset hasła wystarcza dla zwykłego credential harvestingu, ale przy podejrzeniu przejęcia sesji trzeba unieważnić aktywne sesje i tokeny odświeżające

**Why do I care:** Dla każdego, kto zarządza dostępem do Microsoft 365 albo projektuje integracje SSO w swojej organizacji, to konkretna lista rzeczy do sprawdzenia w SIEM, a nie abstrakcyjne ostrzeżenie. Warto też potraktować to jako przypomnienie, że MFA samo w sobie nie chroni przed atakami typu adversary-in-the-middle, jeśli proces reagowania na incydent kończy się na resecie hasła.

**Link:** [Kratos PhaaS Targets US and EU](https://hackernoon.com/kratos-phaas-targets-us-and-eu-how-to-reduce-microsoft-365-account-takeover-risk)

## Jak wycisnąć więcej z AI za mniej pieniędzy

**TLDR:** Autor opisuje, jak laboratoria AI przechodzą od szeroko dostępnych, dotowanych planów subskrypcyjnych do bardziej restrykcyjnego, mierzonego rozliczania użycia modeli, i na tej podstawie promuje własną metodę oszczędzania na LLM-ach opartą na badaniu blisko 240 tysięcy symulowanych użytkowników. Kluczowe nawyki, które opisuje, to dobór modelu do zadania i ograniczanie liczby retry.

**Summary:** Diagnoza rynkowa jest trafna i łatwo ją zweryfikować z własnego doświadczenia: rok temu nawet tani plan API dawał sporo przestrzeni na eksperymenty, dziś laboratoria zbliżające się do IPO muszą pokazywać rentowność, więc subsydiowanie użytkowników się kończy. Anthropic ograniczył dostęp do najnowszego modelu Fable po krótkim oknie promocyjnym, co wywołało wśród części builderów desperackie maratony pracy, żeby zdążyć przed przejściem na płatność za użycie. To dobra ilustracja tego, jak bardzo przyzwyczailiśmy się traktować dostęp do najsilniejszych modeli jako coś oczywistego, zamiast jako zasób, który akurat teraz jest tani.

Ciekawszy jest fragment o badaniu Anthropic pokazującym, że wartość ekonomiczna pracy wykonywanej przez użytkowników Claude Code rosła między październikiem 2025 a kwietniem 2026, a największy skok nastąpił po wydaniu Opus 4.5, nie po jeszcze potężniejszych modelach. To sugeruje coś, co wielu zespołów intuicyjnie wie, ale rzadko wyciąga z tego wnioski: nie trzeba zawsze sięgać po najdroższy flagowy model, żeby uzyskać wysokiej jakości efekt, a rosnąca konkurencyjność modeli open source jak Kimi K3 tylko to potwierdza.

Gorzej wypada część, w której autor przechodzi od analizy rynkowej do promocji własnego, darmowego systemu LLM Whisperer Method, z pięciominutową oceną i dziewięćdziesięciodniowymi kursami dostarczanymi przez agentów. Sama treść, czyli dobór modelu do zadania i redukcja liczby retry, jest sensowna, ale niespecjalnie odkrywcza, każdy, kto pracował z LLM-ami przez dłuższy czas, dojdzie do podobnych wniosków metodą prób i błędów. Artykuł trochę zbyt gładko przeskakuje od twardych danych badawczych do lejka sprzedażowego własnego produktu, co osłabia siłę argumentu, mimo że sama diagnoza problemu jest uczciwa.

**Key takeaways:**
- Laboratoria AI odchodzą od szerokiego dotowania użytkowników w stronę mierzonego, droższego rozliczania flagowych modeli
- Badanie Anthropic pokazuje, że największy wzrost wartości pracy w Claude Code nastąpił po Opus 4.5, nie po jeszcze mocniejszych modelach, co podważa automatyczny odruch sięgania po najdroższy dostępny model
- Ograniczanie liczby retry to jeden z realnych dźwigni oszczędności, bo retry nie tylko kosztują tokeny, ale bywają mniej skuteczne niż pierwsza próba
- Rozwiązania typu pre-indeksowanie kodu (codegraph) potrafią ograniczyć zużycie tokenów nawet o 90 procent, ale efekt może być krótkotrwały bez zmiany nawyków

**Why do I care:** Dla zespołu, który płaci realne pieniądze za API do LLM-ów, to praktyczna zachęta, żeby zamiast domyślnie sięgać po najdroższy model do każdego zadania, zbudować sobie proste zasady doboru modelu i monitorować, ile kosztują retry w codziennych workflow'ach agentowych. To akurat jest coś, co da się wdrożyć w zespole bez czekania na cudzy płatny kurs.

**Link:** [How to Get More AI for Less Money](https://hackernoon.com/how-to-get-more-ai-for-less-money)

## Spring Security i bezstanowe JWT w praktyce

**TLDR:** Solidny, praktyczny przewodnik po zabezpieczaniu API w Spring Boot za pomocą Spring Security i JWT, obejmujący poprawne hashowanie haseł BCryptem, własny filtr JWT oparty na OncePerRequestFilter i konfigurację bezstanowej sesji. Bez marketingowego szumu, po prostu solidny warsztat inżynierski.

**Summary:** Autor zaczyna od słusznej obserwacji, że uwierzytelnianie psuje się w nowoczesnych aplikacjach nie dlatego, że frameworki są słabe, tylko dlatego, że wymaga świadomych decyzji projektowych, a nie tylko dodania zależności. Rozróżnienie między szyfrowaniem a hashowaniem haseł, które wielu deweloperów wciąż myli, jest wyłożone bez zbędnego owijania w bawełnę: hasła nigdy nie powinny być szyfrowalne odwracalnie, bo kompromitacja klucza oznacza wyciek wszystkich danych uwierzytelniających naraz, podczas gdy hashowanie z solą i celowo kosztownym obliczeniowo algorytmem jak BCrypt daje odporność na ataki brute force.

Najbardziej wartościowa część dla kogoś, kto faktycznie implementuje to w produkcji, to sekcja o filtrze JWT, bo autor wprost mówi rzecz, którą większość samouczków przemilcza: Spring Security nie waliduje tokenów JWT automatycznie. Trzeba samodzielnie wyciągnąć token z nagłówka, zweryfikować podpis, wyciągnąć użytkownika i wypełnić kontekst bezpieczeństwa, zanim kontroler w ogóle zacznie działać, i to musi się dziać w filtrze wykonywanym raz na żądanie. To jest dokładnie ten fragment, który w praktyce psuje wdrożenia JWT najczęściej, bo deweloperzy zakładają, że sama obecność zależności bibliotecznej załatwia walidację.

Konfiguracja bezpieczeństwa jest minimalna i czytelna: wyłączenie CSRF tylko dlatego, że API jest bezstanowe, jawne wyłączenie tworzenia sesji, filtr JWT dodany przed standardowym filtrem uwierzytelniania username-password, jasny podział na endpointy publiczne i chronione. To jest dokładnie tyle konfiguracji, ile potrzeba, bez nadmiarowego kopiowania boilerplate'u z dziesięciu różnych źródeł, co często widuje się w projektach, gdzie ktoś sklejał konfigurację Spring Security z kilku poradników naraz.

Jedyny minus tego tekstu to sekret JWT wpisany na sztywno w kodzie jako string w klasie serwisowej, co autor pokazuje jako przykład edukacyjny, ale nie komentuje wyraźnie, że w prawdziwym projekcie ten sekret musi iść do zmiennej środowiskowej albo menedżera sekretów, a nie do repozytorium. Dla kogoś, kto kopiuje kod z tutoriala żywcem do swojego projektu, to jest dokładnie ten szczegół, który później kończy się jako incydent bezpieczeństwa.

**Key takeaways:**
- Hasła muszą być hashowane, nigdy szyfrowane odwracalnie, bo klucz szyfrujący w rękach atakującego oznacza pełny wyciek danych logowania
- Spring Security nie waliduje JWT automatycznie, trzeba zbudować własny filtr oparty na OncePerRequestFilter uruchamiany przed standardowym filtrem uwierzytelniania
- Bezstanowa konfiguracja wymaga jawnego wyłączenia tworzenia sesji i przemyślanego wyłączenia CSRF, a nie kopiowania ustawień z niezwiązanego projektu
- Sekret podpisujący JWT z przykładu edukacyjnego nigdy nie powinien trafić do repozytorium w realnym projekcie

**Why do I care:** To materiał wprost do wykorzystania przy code review backendów w Javie albo przy onboardingu nowych osób do zespołu pracującego ze Spring Security, bo pokazuje dokładnie te miejsca, w których większość wdrożeń JWT się psuje: brak własnej walidacji tokenu i sekrety wpisane na sztywno. Warto go traktować jako checklistę, a nie gotowy kod do wklejenia bez zmian.

**Link:** [Securing the Distributed Ecosystem: A Deep Dive into Spring Security and Stateless JWT](https://hackernoon.com/securing-the-distributed-ecosystem-a-deep-dive-into-spring-security-and-stateless-jwt)
