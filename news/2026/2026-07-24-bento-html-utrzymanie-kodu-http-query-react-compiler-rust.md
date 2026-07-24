---
title: "Bento w jednym pliku HTML, dekada utrzymania kodu i nowa metoda HTTP QUERY"
excerpt: "Przegląd czterech tematów z daily.dev: prezentacje w jednym pliku HTML, filozofia pisania kodu na dekady, nowa metoda HTTP QUERY oraz przepisanie React Compilera na Rust przez Metę."
publishedAt: "2026-07-24"
slug: "bento-html-utrzymanie-kodu-http-query-react-compiler-rust"
hashtags: "#dailydev #react #rust #api #frontend #generated #pl"
---

## TLDR
W tym wydaniu daily.dev cztery różne historie, które akurat dobrze się ze sobą kleją. Ktoś spakował cały program do prezentacji do jednego pliku HTML, inny developer opisuje, jak zmienia się kod, gdy piszesz go z myślą o dziesięciu latach utrzymania, a IETF w końcu doczekało się nowej metody HTTP po dwóch dekadach przestoju. Do tego Meta przepisała kompilator Reacta z TypeScriptu na Rust, co nie jest tylko ciekawostką technologiczną, tylko konkretną zmianą w tym, jak szybko będzie się kompilować kod frontendowy za rok czy dwa.

## Bento: cała prezentacja w jednym pliku HTML
**TLDR:** Bento to open source'owa alternatywa dla PowerPointa, która mieści edytor, viewer i prezenter w jednym pliku HTML o wadze około 560 KB, bez instalacji i bez konta.

**Podsumowanie:** Pomysł jest prosty do opisania i trudny do zrobienia porządnie: bierzesz cały program do tworzenia slajdów i zamykasz go w jednym pliku, który otwiera się w przeglądarce jak zwykła strona. Bento działa lokalnie, ma tryb offline i potrafi zapisywać zmiany bezpośrednio do tego samego pliku dzięki File System Access API, więc plik faktycznie przepisuje sam siebie po każdym zapisie. Do nawigacji między slajdami wykorzystano Reveal.js, całość napisano w TypeScripcie, a licencja to MIT, co oznacza, że można to śmiało forkować i modyfikować bez pytania nikogo o zgodę.

Ciekawszy jest fragment o współpracy na żywo. Zamiast typowego modelu z serwerem, który trzyma stan dokumentu, Bento korzysta z własnej implementacji CRDT z end-to-end encryption, więc kilka osób może edytować tę samą prezentację jednocześnie, a serwer pośredniczący w ogóle nie widzi treści. To rozwiązuje realny problem narzędzi typu Google Slides, gdzie współdzielenie oznacza oddanie treści dostawcy usługi. Dorzucono też wbudowane wykresy bez żadnych zależności zewnętrznych i animacje typu morph między slajdami, czyli rzeczy, które normalnie wymagają całego ekosystemu bibliotek.

Format dokumentu to zwykły JSON, co autorzy opisują jako przyjazne dla agentów AI. I faktycznie, mając płaski, czytelny format zamiast binarnego pliku pptx, dużo łatwiej wygenerować albo zmodyfikować prezentację automatycznie, na przykład promptem do modelu językowego. Projekt ma już rozszerzenia w planach, Docs i Sheets jako kolejne elementy pakietu Bento Suite, więc widać ambicję zrobienia czegoś więcej niż jednorazowy eksperyment na Hacker News.

**Kluczowe wnioski:**
- Cały program do prezentacji, dane i silnik współpracy mieszczą się w jednym pliku HTML, bez backendu i bez konta.
- Współpraca na żywo działa przez szyfrowany CRDT, serwer przekazujący dane nie widzi treści.
- Format dokumentu to czytelny JSON, co ułatwia generowanie i edycję prezentacji przez narzędzia AI.

**Dlaczego mnie to obchodzi:** Podoba mi się ten kierunek, bo odwraca trend ostatnich lat, w którym każde narzędzie biurowe zamienia się w usługę SaaS z kontem, subskrypcją i danymi zamkniętymi w czyjejś chmurze. Plik, który jest jednocześnie programem i danymi, to stary pomysł, ale w połączeniu z nowoczesnym CRDT i File System Access API robi się z tego coś praktycznego, a nie tylko demo na konferencję. Nie spodziewam się, że zastąpi to PowerPointa w korporacji, ale jako narzędzie do szybkiego dzielenia się slajdami z zespołem technicznym, bez zakładania kolejnego konta, widzę tu realną wartość.

**Link:** [An entire PowerPoint in one HTML file (edit+view+data+collab)](https://github.com/nyblnet/bento)

## Dlaczego piszę kod tak, jakbym miał go utrzymywać przez dziesięć lat
**TLDR:** Autor opisuje, jak zmienia się podejście do pisania kodu, gdy zakładasz, że będziesz je utrzymywać przez dekadę: mniej sprytnych sztuczek, więcej czytelności, nazewnictwa i dokumentacji.

**Podsumowanie:** Teza artykułu jest osadzona w bardzo konkretnym doświadczeniu, jakim jest wracanie do własnego kodu po miesiącach i niepoznawanie go. Autor przyznaje, że wielokrotnie łapał się na obwinianiu "poprzedniego developera" za niejasny kod, zanim zorientował się, że to on sam go napisał. Z tego bierze się cała reszta artykułu: skoro za jakiś czas staniesz się obcy własnemu kodowi, warto pisać z myślą o tej przyszłej, zmęczonej wersji siebie, która debuguje produkcję o drugiej w nocy.

Z tego założenia wynika kilka praktycznych konsekwencji, które akurat rzadko się słyszy razem. Czytelność traktowana jest jako cecha funkcjonalna, a nie miły dodatek, nazywanie zmiennych i funkcji zajmuje więcej czasu niż kiedyś, bo dobra nazwa eliminuje potrzebę komentarza. Komentarze mają tłumaczyć dlaczego coś istnieje, a nie co robi kolejna linijka, bo to drugie widać w kodzie. Architektura ma być nudna: autor otwarcie mówi, że przestał gonić za mikroserwisami, event sourcingiem czy CQRS dla samej satysfakcji, bo dobra architektura rzadko przyciąga uwagę, a zła zawsze.

Osobny wątek dotyczy długu technicznego i zależności. Dług nie jest z definicji zły, bo czasem pozwala szybciej dowieźć coś na czas, problem zaczyna się, gdy nikt nie planuje go spłacić. Podobnie z bibliotekami: każda dodana zależność to czyjaś decyzja, którą teraz musisz utrzymywać razem ze swoją, więc pytanie "czy da się to napisać samemu w pięćdziesiąt linijek zamiast ściągać pięćdziesiąt tysięcy" ma sens częściej, niż się wydaje. Testy w tym ujęciu nie spowalniają pracy, tylko dają pewność przy refaktoryzacji rozłożonej na lata, a nie tygodnie.

**Kluczowe wnioski:**
- Pisanie z myślą o dziesięciu latach zmienia konkretne decyzje: nazewnictwo, strukturę folderów, wybór architektury i to, co komentujesz.
- Dobra architektura ma być nudna i niewidoczna, a nie efektowna.
- Każda zależność i każdy skrót w kodzie to zobowiązanie, które ktoś kiedyś będzie musiał spłacić.

**Dlaczego mnie to obchodzi:** Ten artykuł nie odkrywa niczego nowego dla kogoś, kto pracował na starszym systemie dłużej niż rok, ale dobrze nazywa rzeczy, które większość z nas czuje intuicyjnie i rzadko wypowiada wprost. Sam wielokrotnie widziałem kod pisany pod deadline, który później latami blokował zespół przed prostymi zmianami, bo ktoś kiedyś wybrał sprytne rozwiązanie zamiast nudnego. Czytelność jako cecha funkcjonalna to zdanie, które warto powiesić nad biurkiem każdego, kto robi code review, bo w praktyce to właśnie tam zapada decyzja, czy dług techniczny zostanie spłacony, czy przekazany dalej.

**Link:** [Why I Build Software Like I'm Going to Maintain It for 10 Years](https://medium.com/@derek.mwale/why-i-build-software-like-im-going-to-maintain-it-for-10-years-564a77102bd9)

## Dlaczego HTTP potrzebowało nowej metody po trzydziestu latach: QUERY
**TLDR:** IETF opublikowało RFC 10008 wprowadzające metodę QUERY, która łączy body znane z POST z bezpiecznym i idempotentnym charakterem GET, rozwiązując problem złożonych zapytań, których nie da się sensownie zapisać w URL.

**Podsumowanie:** Artykuł zaczyna od podstaw, czyli od przypomnienia, że TCP przenosi bajty bez pojęcia, co one znaczą, a to HTTP dokłada intencję w postaci metody, zasobu, nagłówków i opcjonalnego body. Trzy metody, których używamy na co dzień, mają jasno określone role: GET pobiera dane i jest idempotentny, POST tworzy zasób i idempotentny nie jest, DELETE usuwa. Problem pojawia się, gdy trzeba wysłać złożone zapytanie z wieloma filtrami, bo GET nie ma body, a parametry w URL mają twardy limit długości, zwykle w okolicach ośmiu tysięcy znaków, i lądują w logach serwera, przeglądarki i load balancera w postaci jawnego tekstu.

Standardowym obejściem było wysyłanie takich zapytań przez POST na endpoint w rodzaju /products/search. Działa to technicznie, ale POST nie jest idempotentny, więc odpowiedzi z takich zapytań nie dają się cache'ować. Nawet jeśli tysiąc użytkowników szuka dokładnie tego samego z identycznymi filtrami, każde zapytanie i tak leci przez całą infrastrukturę aż do bazy danych i z powrotem, co przy dużej skali generuje realne koszty. Cała branża zgodziła się na ten kompromis, mimo że semantycznie zawsze był nieprawidłowy, bo POST oznacza tworzenie, a nie odczyt.

QUERY, opublikowane w czerwcu 2026 jako RFC 10008 przez zespół IETF HTTP Working Group, łączy oba światy: pozwala na body tak duże i złożone jak w POST, ale zachowuje intencję odczytu, bezpieczeństwo i idempotentność GET. To pierwsza naprawdę nowa metoda HTTP od czasu PATCH z 2010 roku, czyli od szesnastu lat. Konsekwencją jest to, że QUERY można cache'ować, przy czym klucz cache musi uwzględniać treść body, a nie tylko URL, co samo w sobie tworzy nowe pole do popełniania błędów przy źle znormalizowanym hashowaniu body. Wsparcie w przeglądarkach i CDN-ach dopiero raczkuje, a QUERY nie należy do metod bezpiecznych dla CORS, więc przeglądarki będą wysyłać preflight tak samo jak przy nietypowych nagłówkach w POST.

**Kluczowe wnioski:**
- GET nie ma body i ma limit długości URL, POST ma body, ale nie jest idempotentny ani cache'owalny, QUERY ma jedno i drugie naraz.
- RFC 10008 to pierwsza nowa metoda HTTP od PATCH w 2010 roku.
- Cache dla QUERY musi liczyć klucz na podstawie treści body, co wymaga poprawnej normalizacji po stronie CDN i serwerów cache.

**Dlaczego mnie to obchodzi:** Ja też pisałem endpointy w stylu POST /search dla skomplikowanych filtrów i zawsze czułem, że to obejście, a nie rozwiązanie. Cieszy mnie, że w końcu ktoś to formalnie nazwał i wprowadził do standardu, bo do tej pory każdy zespół wymyślał własną konwencję na ten sam problem. Realnie minie sporo czasu, zanim przeglądarki, proxy i frameworki backendowe dogonią RFC, więc na razie QUERY to raczej sygnał kierunku niż coś, co można wrzucić do produkcji bez sprawdzenia całego łańcucha infrastruktury, od CDN po bibliotekę HTTP klienta.

**Link:** [Why HTTP needed a new method after 30 years - meet QUERY](https://medium.com/@ishantagarwal/why-http-needed-a-new-method-after-30-years-meet-query-7ce979ffdae7)

## Meta przenosi React Compiler z TypeScriptu na Rust
**TLDR:** Meta scaliła do głównego repozytorium Reacta port React Compilera napisany w Rust, co daje od trzech do dziesięciu razy szybszą kompilację i eliminuje narzut wtyczki Babel przy integracji z Turbopackiem.

**Podsumowanie:** React Compiler, znany wcześniej jako React Forget, automatycznie memoizuje komponenty i hooki, więc programista nie musi ręcznie sięgać po useMemo i useCallback. Do tej pory kompilator działał jako wtyczka do Babela napisana w TypeScripcie, teraz zespół scalił do repozytorium Reacta eksperymentalny port tej samej logiki napisany w Rust. W samym pull requeście autorzy określają to jako pracę w toku, ale liczby, które temu towarzyszą, robią wrażenie: jako wtyczka typu drop-in dla Babela wersja Rust działa około trzy razy szybciej niż oryginał w TypeScripcie, a sama logika transformacji w izolacji potrafi być nawet dziesięć razy szybsza.

Najciekawszy efekt pojawia się tam, gdzie kompilator przestaje być wtyczką do Babela i zostaje wpięty bezpośrednio w Turbopacka, czyli bundler Vercela napisany w Rust. Wcześniej każdy build płacił narzut związany z uruchomieniem Babela jako osobnego kroku, po podłączeniu wersji Rust ten narzut znika. Inżynier Vercela zgłosił ponad 40 procent szybszej kompilacji na v0, czyli wewnętrznej dużej aplikacji Next.js tej firmy, a oficjalne konto Next.js podało zakres 20 do 50 procent szybszej kompilacji tras w swoich testowych aplikacjach, z eksperymentalnym wsparciem od wersji 16.3.

To, co robi z tego coś więcej niż zwykłą optymalizację wydajności, to sposób powstania portu. Zespół oparł się mocno na modelach językowych przy mechanicznym przepisywaniu kodu z TypeScriptu na Rust, a ludzie zajęli się architekturą i przeglądem zmian. Na Hacker News pojawiły się głosy ostrzegające, że "spłacanie długu poznawczego będzie brutalne dla zespołu, który przejmie to w utrzymanie", oraz pytania, czy kod wygenerowany w dużej mierze przez LLM daje solidną podstawę do dalszej iteracji, czy raczej tworzy projekt, którego nikt do końca nie rozumie. Jeden z komentujących zauważył trafnie, że sam fakt napisania czegoś w Rust nie oznacza, że to dobry kod w Rust, bo model równie dobrze może użyć RefCell, żeby zadowolić borrow checker, i przesunąć błąd z czasu kompilacji na czas działania programu.

**Kluczowe wnioski:**
- Port do Rust daje od 3 do 10 razy szybszą kompilację w izolacji, a po integracji z Turbopackiem od 20 do 50 procent szybsze buildy w realnych aplikacjach Next.js.
- Publiczne API kompilatora pozostaje bez zmian, więc dla większości projektów aktualizacja ma być bezobsługowa.
- Duża część przepisania powstała przy pomocy modeli językowych, co wywołało dyskusję o długoterminowej utrzymywalności takiego kodu.

**Dlaczego mnie to obchodzi:** Szybsza kompilacja to zawsze dobra wiadomość, ale bardziej interesuje mnie tu drugi wątek, czyli pytanie o to, kto będzie w stanie utrzymać kod kompilatora wygenerowany w dużej mierze przez model językowy, gdy za dwa lata trzeba będzie w nim czegoś szukać. Rust dobrze się broni jako cel takich portów, bo kompilator sam wyłapuje sporo błędów, ale komentarz o RefCell używanym tylko po to, żeby zadowolić borrow checker, pokazuje realne ryzyko: kod może przechodzić kompilację i wyglądać poprawnie, a i tak zawierać założenia, których nikt świadomie nie podjął. Warto to obserwować, bo React Compiler to nie jest boczny projekt, tylko coś, co trafi do bardzo dużej liczby aplikacji produkcyjnych.

**Link:** [Meta Ports React Compiler to Rust for Faster Builds and Tighter Toolchain Integration](https://www.infoq.com/news/2026/07/meta-react-compiler-rust)
