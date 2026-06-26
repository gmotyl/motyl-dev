---
title: "Deno 2.9 i aplikacje desktopowe, AI SDK 7 z obsługą agentów, biblioteka cookie przechodzi na ESM"
excerpt: "W tym tygodniu: Deno wprowadza natywne aplikacje desktopowe do stosu webowego, Vercel wydaje AI SDK 7 z solidną infrastrukturą dla agentów, a jshttp/cookie v2 porzuca stare zależności."
publishedAt: "2026-06-26"
slug: "deno-2-9-desktop-apps-ai-sdk-7-agent-depth-cookie-esm"
hashtags: "#dailydev #javascript #typescript #deno #ai #agents #architecture #performance #frontend #react #pl"
source_pattern: "daily.dev"
---

## Deno 2.9: aplikacje desktopowe, dwukrotnie krótszy czas startu i kryptografia post-kwantowa

**TLDR:** Deno 2.9 wprowadza `deno desktop`, czyli możliwość budowania natywnych aplikacji desktopowych przy użyciu istniejącego stosu webowego i kompilowania ich do pojedynczego pliku binarnego. Czas zimnego startu spada z 34 ms do 17 ms, zużycie pamięci pod obciążeniem zmniejsza się o ponad dwie trzecie, a samo wydanie dodaje też algorytmy kryptografii post-kwantowej bezpośrednio do środowiska wykonawczego.

**Podsumowanie:** To, co od razu przykuło moją uwagę w Deno 2.9, to liczba dotycząca czasu startu. Przejście z 34 milisekund do 17 milisekund przy zimnym starcie to niemal dwukrotna poprawa, osiągnięta dzięki naprawdę ciekawej pracy inżynierskiej. Obejmuje ona leniwe ładowanie globalnych obiektów Node ze snapshota, ograniczenie bootstrapu Node tylko do workerów Node oraz budowę cache kodu V8 dla leniwie ładowanych modułów ES. To nie jest zwykłe tunelowanie, to przemyślenie na nowo, co i kiedy się ładuje.

Historia z pamięcią jest jeszcze bardziej dramatyczna. W Deno 2.8 rozmiar rezydentnego zestawu rósł wraz z obciążeniem, osiągając 197 MB przy strumieniowaniu odpowiedzi o rozmiarze 1 MiB. W wersji 2.9 utrzymuje się stabilnie na poziomie około 63 MB niezależnie od obciążenia. To trzykrotna poprawa szczytowego zużycia pamięci. Gdy uruchamia się wiele współbieżnych instancji serwera, tego rodzaju wynik potrafi realnie zmienić rachunek za infrastrukturę.

Główną funkcją jest jednak `deno desktop`. Założenie jest proste i, moim zdaniem, naprawdę dobre: wskazujesz na skrypt lub projekt oparty na frameworku webowym, a system kompiluje natywną aplikację desktopową do pojedynczego pliku binarnego do dystrybucji. Interfejs działa w webview, logika w Deno, a natywne API, takie jak `Deno.BrowserWindow`, `Deno.Tray` czy `Deno.Dock`, są dostępne bez żadnych dodatkowych zależności. W porównaniu z Electronem, który wymaga osobnych toolchainów, skomplikowanego pakowania i wysyłania binarki Chromium do każdego użytkownika, oferta Deno jest znacznie prostsza. Domyślny backend korzysta z wbudowanego w system operacyjny silnika WebView, dzięki czemu binarka pozostaje mała. Przy użyciu flagi `--backend cef` można przełączyć się na bundlowanego Chromium, gdy potrzebna jest gwarantowana spójność renderowania na różnych platformach.

Historia z kompilacją krzyżową też robi wrażenie. Można budować binaria dla Windows, macOS i Linux z jednego runnera CI na Linuksie, generując pliki `.dmg`, `.msi`, `.deb` i `.rpm` z tej samej maszyny. Instalatory są napisane w czystym Rust, więc nie potrzeba żadnego toolchaina specyficznego dla platformy.

Test runner w wersji 2.9 też znacząco dojrzał. Obsługuje teraz testy snapshotowe z wbudowaną metodą `t.assertSnapshot()`, inteligentny dobór testów oparty na grafie modułów (uruchamia tylko te dotknięte zmianami), testy parametryzowane przez `Deno.test.each`, progi pokrycia kodu, które mogą zakończyć build błędem, oraz równoległe shardowanie dla matrycowych runów CI. Jeśli sięgałeś po Vitest lub Jest tylko dla tych funkcji, teraz masz poważny argument, żeby zostać w ramach samego środowiska wykonawczego.

W obszarze bezpieczeństwa łańcucha dostaw wyróżniają się dwie nowe funkcje. Minimalny wiek zależności jest teraz domyślnie włączony z oknem 24 godzin, co oznacza, że świeżo opublikowany pakiet npm nie może od razu trafić do twojego drzewa zależności. Polityka zaufania `no-downgrade`, dostępna jako opcja, odmawia instalacji wersji pakietu, której dowody zaufania są słabsze niż w poprzednich wersjach, co wychwytuje wzorzec związany z przejęciem tokenów maintainera.

Warto też wspomnieć o dodatkach z zakresu kryptografii post-kwantowej. ML-KEM, ML-DSA i SLH-DSA są dostępne bezpośrednio przez standardowe Web Crypto API. To standardy NIST FIPS, a ich obecność w środowisku wykonawczym bez żadnej biblioteki zewnętrznej to istotny krok w kierunku zabezpieczenia TLS i procesów podpisywania na przyszłość.

**Kluczowe wnioski:**
- `deno desktop` kompiluje aplikacje oparte na stosie webowym do pojedynczych natywnych binariów z interfejsem w webview, natywnymi API systemu operacyjnego i kompilacją krzyżową z jednej maszyny.
- Czas zimnego startu spadł z 34 ms do 17 ms, a szczytowe zużycie pamięci pod obciążeniem zmniejszyło się nawet trzykrotnie w porównaniu z Deno 2.8.
- Test runner ma teraz wbudowane testy snapshotowe, inteligentny dobór testów, shardowanie i progi pokrycia kodu.
- Domyślne ustawienia bezpieczeństwa łańcucha dostaw zostały zaostrzone: pakiety npm młodsze niż 24 godziny są domyślnie blokowane.
- Kryptografia post-kwantowa (ML-KEM, ML-DSA, SLH-DSA) jest teraz dostępna natywnie przez Web Crypto API.

**Dlaczego mnie to interesuje:** Same liczby dotyczące wydajności sprawiają, że warto zaktualizować środowisko dla workloadów serwerowych. Ale `deno desktop` to coś, nad czym chcę poważnie pomyśleć. Przy wewnętrznych narzędziach, towarzyszach CLI z GUI czy aplikacjach skierowanych do deweloperów, gdzie nie chcesz dostarczać Electrona, propozycja jest realna. Historia z kompilacją krzyżową z CI to dokładnie brakujący element, który wcześniej odstraszał mnie od środowisk zbliżonych do desktopowych. Ulepszenia test runnera też są istotne, nie dlatego, że Vitest jest zły, ale dlatego, że mniej granic między narzędziami oznacza mniej powierzchni konfiguracyjnych do utrzymania.

**Link:** [Deno 2.9](https://deno.com/blog/v2.9)

---

## AI SDK 7: produkcyjna głębokość dla workflow agentów

**TLDR:** AI SDK od Vercel osiąga wersję 7 z głównym naciskiem na budowanie, uruchamianie i obserwowanie agentów produkcyjnych. Wydanie dodaje kontrolę nad rozumowaniem, kontekst narzędzi i środowiska wykonawczego, trwałe wykonywanie agentów przez WorkflowAgent, pełnoprawne timeouty, abstrakcje harness do uruchamiania Claude Code i Codex, oraz obsługę głosu w czasie rzeczywistym niezależną od dostawcy.

**Podsumowanie:** Przy ponad 16 milionach cotygodniowych pobrań AI SDK nie jest już niszowym projektem, a wersja 7 wygląda jak efekt pracy zespołu, który przeanalizował produkcyjne tryby awarii i budował bezpośrednio odpowiedzi na nie. Pięć obszarów zainteresowania to: tworzenie, uruchamianie, integracja, obserwacja i wyjście poza tekst, a każdy z nich odpowiada na realne potrzeby.

Po stronie tworzenia ustandaryzowana opcja `reasoning` dla `generateText` i `streamText` to niewielka zmiana API, ale realna poprawa ergonomii. Modele frontierowe obsługują konfigurowalne rozumowanie, ale każdy dostawca udostępnia je inaczej. Posiadanie jednej opcji mapowanej na natywne ustawienia dostawcy oznacza, że można zmieniać modele bez przepisywania konfiguracji rozumowania. Funkcja typowanego kontekstu narzędzi jest bardziej interesująca architektonicznie: można ograniczyć klucze API lub konfigurację do konkretnych narzędzi, zamiast przekazywać je przez szerszy kontekst agenta. Ma to znaczenie w miarę jak ekosystem zmierza w kierunku narzędzi zewnętrznych konsumowanych przez agenty, bo nie chcesz, żeby te narzędzia miały dostęp do niezwiązanych sekretów.

Interfejsy API do przesyłania plików i umiejętności rozwiązują realny problem nieefektywności. Jeśli workflow agenta wielokrotnie przetwarza ten sam PDF lub definicję umiejętności, przesłanie jej raz i przekazywanie lekkiej referencji jest po prostu lepsze niż wielokrotne wysyłanie tych samych danych przy każdym wywołaniu modelu. Dotyczy to szczególnie środowiska wykonawczego Claude opartego na kontenerach Anthropic, gdzie pliki umiejętności można teraz przesłać raz i odwoływać się do nich w kolejnych wywołaniach inferencji.

Historia z trwałością w `WorkflowAgent` to funkcja, o którą prosiłbym sześć miesięcy temu. Agenty działające przez wiele kroków, czekające na zatwierdzenie przez człowieka lub przekraczające granice deploymentu potrzebują trwałego wykonania, które przeżywa restarty procesów. WorkflowAgent daje ci to z przesyłaniem strumieniowym opartym na workflow, typowanym kontekstem środowiska wykonawczego, stabilną telemetrią i zachowaniem nieprawidłowych wywołań narzędzi. Ulepszenia callbacków obejmują bogatsze dane wykonania, takie jak numery kroków, poprzednie wyniki, czas trwania oraz sukces lub porażka, co ma znaczenie przy rozliczaniu i debugowaniu.

Timeouty w wersji 7 są teraz naprawdę granularne. Można ustawić całkowity czas, czas na krok, czas na chunk dla zatrzymania strumienia i czas na narzędzie, z indywidualnymi nadpisaniami per narzędzie. Ma to znaczenie, bo agenty zawodzą w sposób, którego prosty timeout HTTP nie wychwytuje: odpowiedź strumieniowa może się otworzyć i przestać przesyłać chunki, narzędzie może wisieć w nieskończoność, albo wielokrokowy run może przekroczyć budżet przed ukończeniem. Pokrycie wszystkich czterech trybów awarii z czystą propagacją `TimeoutError` to właśnie to, co odróżnia bibliotekę zbudowaną dla zabawek od tej zbudowanej dla produkcji.

Abstrakcja `HarnessAgent` jest interesująca z innego powodu. Pozwala uruchamiać uznane środowiska agentów, takie jak Claude Code, Codex czy Pi, przez jeden interfejs, konfigurując każde z sandboxem, niestandardowymi instrukcjami i umiejętnościami. Fakt, że `HarnessAgent` implementuje ten sam interfejs `Agent`, oznacza, że `useChat()` i nowy terminal UI działają bez dodatkowego okablowania. Chcę zachować pewien sceptycyzm wobec warstw abstrakcji nad harnesami agentów, bo każdy ma swoje niuanse, ale argument dotyczący przenośności jest przekonujący dla zespołów, które chcą zamieniać środowiska wykonawcze bez przepisywania integracji.

Odnowienie obserwowalności było długo oczekiwane. Rejestrowanie telemetrii raz przy starcie aplikacji przez `registerTelemetry(new OpenTelemetry())` to znacznie czystszy model niż okablowywanie callbacków cyklu życia w każdym wywołaniu `generateText`. Obsługa kanału śledzenia Node.js przez `node:diagnostics_channel` daje dostawcom obserwowalności standardową powierzchnię integracyjną, a statystyki wydajności na krok pozwalają odpowiadać na konkretne pytania: jak długo model czekał na wysłanie pierwszej odpowiedzi, jak szybko płynęły tokeny, które narzędzie było najwolniejsze.

**Kluczowe wnioski:**
- WorkflowAgent daje agentom trwałe, wznawiane wykonanie przeżywające restarty procesów, deploymenty i opóźnione zatwierdzenia przez człowieka.
- Typowany kontekst narzędzi ogranicza klucze API i konfigurację do pojedynczych narzędzi, co jest ważne dla bezpieczeństwa narzędzi zewnętrznych.
- Interfejsy API do przesyłania plików i umiejętności eliminują zbędny transfer danych w wielokrokowych workflow agentów.
- Pełnoprawne timeouty pokrywają cztery odrębne tryby awarii: całkowity, per krok, per chunk i per narzędzie.
- HarnessAgent pozwala uruchamiać Claude Code, Codex i inne uznane środowiska przez ujednolicony interfejs.
- Telemetria jest teraz rejestrowana raz przy starcie aplikacji, a nie per wywołanie.

**Dlaczego mnie to interesuje:** Historia z timeoutami to to, na co czekałem. Każdy, kto uruchamiał wielokrokowe agenty w produkcji, wie, że tryby awarii są inne niż przy prostym wywołaniu API, a generyczne timeouty HTTP nie pokrywają zatrzymań strumienia ani zamrożeń na poziomie narzędzi. Funkcja trwałości WorkflowAgent to druga rzecz, którą poważnie oceniłbym dla wszystkiego, co wymaga kroków zatwierdzania przez człowieka w pętli. Abstrakcja HarnessAgent jest dla mnie ostrożnie optymistyczna, ale chcę zobaczyć, jak radzi sobie z przypadkami brzegowymi, które każdy harness obsługuje inaczej, zanim potraktuję ją jako pełnoprawną granicę abstrakcji.

**Link:** [AI SDK 7 is now available](https://vercel.com/blog/ai-sdk-7)

---

## jshttp/cookie v2.0.0: tylko ESM, zmienione nazwy API i lepsza wydajność

**TLDR:** Pakiet `cookie` używany wszędzie w serwerach Node.js wydał wersję 2.0.0, porzucając CommonJS na rzecz wyłącznie ESM, zmieniając nazwy głównych API i dostarczając mierzalne ulepszenia wydajności operacji stringify i encode.

**Podsumowanie:** Biblioteka `jshttp/cookie` to jeden z tych pakietów, o których prawdopodobnie nie myślisz za wiele, dopóki się nie zmieni. Siedzi na dole stosu w prawie każdym frameworku serwera Node.js, parsując i serializując ciasteczka HTTP. Wersja 2.0.0 to wydanie z przełomowymi zmianami, a te zmiany są celowe i właściwe.

Przejście wyłącznie na ESM to najistotniejsza zmiana. Stare metody CommonJS `parse` i `stringify` znikają, zastąpione przez `parseCookie` i `stringifySetCookie`. Zmiana nazwy to realna przełomowa zmiana, a nie tylko zamiana systemu modułów, co oznacza, że automatyczne skrypty aktualizacyjne nie zadziałają tu po cichu. Trzeba zaktualizować miejsca wywołania. W Node.js 22 i nowszym `require()` działa natywnie z ESM, więc starsze codebazy na nowoczesnych środowiskach wykonawczych mają wyjście awaryjne. Cokolwiek na Node.js poniżej 22 po prostu nie jest wspierane.

Metoda `stringifySetCookie` przyjmuje teraz wyłącznie dane w trybie obiektowym, rezygnując ze starej ścieżki opartej na ciągach znaków. To mile widziane uproszczenie. Poprzednie API dopuszczało niejednoznaczne wzorce użycia, które ułatwiały tworzenie nieprawidłowych nagłówków ciasteczek. Ulepszenia wydajności stringify i encode to bonus, a poprawka dotycząca wiodących średników w ciasteczkach z pominiętymi wartościami usuwa subtelny błąd poprawności, który mógł generować nagłówki wyglądające na prawidłowe, ale takimi nie będące.

Czego brakuje w informacjach o wydaniu, to jakiegokolwiek uznania dla narzędzi migracyjnych lub ścieżki codemod. Jeśli utrzymujesz framework lub bibliotekę, która bezpośrednio zależy od `cookie`, wersja 2.0.0 to ręczna aktualizacja. Sprawdź też swoje pośrednie zależności: Express, Koa i wiele pakietów middleware opiera się na tym, a ekosystem musi nadążyć, zanim będziesz mógł przeprowadzić aktualizację od końca do końca.

**Kluczowe wnioski:**
- Pakiet jest teraz tylko ESM, wsparcie dla CommonJS zostało porzucone. Node.js 22+ może używać `require()` z ESM, ale starsze wersje Node nie są wspierane.
- `parse` zostaje zmienione na `parseCookie`, a `stringify` na `stringifySetCookie`.
- `stringifySetCookie` przyjmuje teraz wyłącznie dane w trybie obiektowym.
- Wydajność operacji stringify i encode została poprawiona.
- Naprawiono błąd wiodącego średnika w ciasteczkach z pominiętymi wartościami.

**Dlaczego mnie to interesuje:** Ta sprawa wymaga aktywnej uwagi, nie dlatego, że API jest skomplikowane, ale dlatego, że `cookie` jest tak powszechnie używany jako pośrednia zależność. Przed aktualizacją sprawdź, czy twój framework webowy lub middleware do sesji zależy od konkretnej wersji głównej. Jeśli utrzymujesz pakiet opakowujący funkcjonalność ciasteczek, wersja 2 to okazja, żeby przy okazji wyczyścić własną powierzchnię API. Migracja na ESM to właściwy kierunek dla ekosystemu, nawet jeśli tworzy krótkoterminowe tarcia.

**Link:** [Release v2.0.0 · jshttp/cookie](https://github.com/jshttp/cookie/releases/tag/v2.0.0)

---

## Tworzenie stron w Rust w 2026: problemy, o których nikt nie mówi

**TLDR:** Artykuł JetBrains odkrywa szczere wyzwania związane z budowaniem serwisów webowych w Rust w 2026 roku, omawiając aspekty ekosystemu, które nie pojawiają się w typowej narracji "Rust jest szybki". Post pojawił się jako trending na daily.dev w tym tygodniu.

**Podsumowanie:** Sam tytuł jest wart uwagi. Większość treści o Rust w 2026 nadal zaczyna od surowych liczb wydajnościowych i gwarancji bezpieczeństwa pamięci, które są prawdziwe, ale to nie pełny obraz. Artykuł JetBrains pozycjonuje się jako uczciwy odpowiednik tej narracji.

Problemy w tworzeniu stron w Rust, które rzadko są omawiane, obejmują dojrzałość ekosystemu dla konkretnych domen problemowych, stromą krzywą uczenia się wpływającą na tempo pracy zespołu nawet po osiągnięciu początkowej biegłości, czasy kompilacji nadal karzące duże grafy zależności oraz tarcia z asynchronicznym Rustem, gdy potrzebna jest precyzyjna kontrola nad zachowaniem executora. Fakt, że post był trending na daily.dev, sugeruje, że te obawy rezonują szeroko, nawet wśród deweloperów, którzy lubią Rust.

Ironia polega na tym, że historia Rusta w kontekście webowym w 2026 jest naprawdę silna. Frameworki takie jak Axum są gotowe do produkcji, ekosystem asynchroniczny znacznie się ustabilizował, a tooling poprawił. Ale artykuł słusznie sprzeciwia się przekonaniu, że wybór Rusta do serwisów webowych to prosty kompromis. Jeśli twój zespół nie ma jeszcze doświadczenia z Rustem, inwestycja w naukę jest realna i widać to przez pierwsze sześć miesięcy projektu. Historia z czasami kompilacji to też nadal realny koszt, zwłaszcza w środowiskach CI z zimnymi cache'ami.

Tekst, przypisywany JetBrains, ma też wewnętrzne napięcie: JetBrains ma wsparcie IDE dla Rusta do sprzedania. Krytykę ekosystemu należy czytać z tą perspektywą w głowie. Niemniej jednak poruszane problemy nie są wymyślone dla zachowania równowagi. Odzwierciedlają realne punkty tarcia, na które zespoły napotykają w praktyce.

**Kluczowe wnioski:**
- Tworzenie stron w Rust ma realne wyzwania poza nagłówkiem wydajnościowym, w tym luki w ekosystemie, koszty tempa pracy zespołu i tarcia z czasami kompilacji.
- Asynchroniczny Rust pozostaje złożony, gdy liczy się kontrola nad executorem.
- Krzywa uczenia się zespołu wpływa na harmonogramy projektów nawet po osiągnięciu początkowej biegłości w Rust.
- Perspektywa artykułu jest rzetelna, ale nie w pełni neutralna, biorąc pod uwagę komercyjne zainteresowanie JetBrains toolingiem Rust.

**Dlaczego mnie to interesuje:** Uważam, że najcenniejszą rzeczą, którą robi ten artykuł, jest danie zespołom pozwolenia na nazwanie kosztów. "Rust jest szybszy" to nie kompletny argument za jego adopcją w projekcie webowym. Jeśli twoim wąskim gardłem nie jest CPU ani pamięć, jeśli twój zespół nie ma zaplecza w Rust i jeśli szybkość iteracji jest ważniejsza niż marginalne wzrosty przepustowości, kompromis wygląda inaczej niż sugerują posty benchmarkowe. Znajomość pełnych kosztów z góry to sposób na podjęcie dobrej decyzji.

**Link:** [Rust Web Development 2026: The Problems Nobody Talks About](https://daily.dev/posts/3kIFxBVeb)

---

## Przestań budować rozproszone monolit: jak znaleźć prawdziwe granice biznesowe

**TLDR:** Artykuł architektoniczny Marcosa Lobo argumentuje, że większość architektur mikroserwisowych to po prostu zamaskowane rozproszone monolity, i pokazuje, jak identyfikować prawdziwe granice biznesowe przed podziałem serwisów. Post był trending na daily.dev w tym tygodniu.

**Podsumowanie:** "Rozproszony monolit" to jedno z tych pojęć, które padają na konferencjach architektonicznych, ale rzadko otrzymują precyzyjną definicję w praktyce. Wzorzec jest rozpoznawalny, gdy już wiesz, czego szukać: serwisy, które deployują się niezależnie, ale nie mogą działać niezależnie, współdzielone bazy danych przez granice serwisów, synchroniczne łańcuchy wywołań tworzące kaskadowe tryby awarii i deploymenty wymagające koordynacji między wieloma zespołami.

Pytanie, które stawia artykuł, brzmi: jak znaleźć prawdziwe granice biznesowe przed podziałem. Odpowiedź, dobrze przeprowadzona, zwykle opiera się na słownictwie domain-driven design: ograniczone konteksty, wszechobecny język i mapy kontekstów. Ale nawet te narzędzia wymagają pewnego poziomu dojrzałości organizacyjnej i nakładu czasu, którego nie każdy zespół ma. Bardziej praktyczne pytanie brzmi, jakie sygnały po fakcie mówią ci, że granica jest błędna. Gadatliwa komunikacja między serwisami, współdzielone modele danych i konieczność deployowania wielu serwisów, żeby dostarczyć jedną funkcję, to najwyraźniejsze znaki.

Czego artykuł prawdopodobnie nie mówi wystarczająco jasno, to że granica organizacyjna i techniczna powinny być wyrównane. Prawo Conwaya to nie tylko zgrabna obserwacja. Jeśli masz jeden zespół posiadający trzy serwisy ściśle sprzężone logiką biznesową, rozwiązaniem niekoniecznie jest podział zespołu lub inny podział serwisów. Czasem właściwą odpowiedzią jest połączenie serwisów z powrotem w spójny moduł z czystym publicznym API i zaakceptowanie, że cel "mikroserwisów" nie był odpowiedni dla tej domeny.

Artykuł prawdopodobnie też niedocenia kosztu zarządzania transakcjami rozproszonymi. Gdy operacja biznesowa musi przekraczać to, co narysowałeś jako osobne granice serwisów, patrzysz na spójność ostateczną, wzorce saga lub two-phase commit, z których każdy dodaje narzut operacyjny i poznawczy, którego pojedynczy serwis z granicą transakcyjną nie ma.

**Kluczowe wnioski:**
- Większość architektur mikroserwisowych z silnym sprzężeniem to rozproszone monolity, a nie prawdziwa dekompozycja serwisów.
- Prawdziwe granice biznesowe należy identyfikować przed podziałem, używając sygnałów takich jak niezależność deployowania, własność danych i wyrównanie zespołu.
- Gadatliwa komunikacja między serwisami i współdzielone modele danych to oznaki błędnego wyrównania granic.
- Prawo Conwaya jest realne: granice organizacyjne i techniczne powinny wzajemnie się wzmacniać.
- Transakcje rozproszone dodają narzut, który często przewyższa korzyści z podziału, gdy granice są błędne.

**Dlaczego mnie to interesuje:** To temat, na którym mi zależy właśnie dlatego, że błędy są kosztowne do naprawienia. Widziałem zespoły spędzające miesiące na migracji działającego monolitu do systemu rozproszonego, który stał się trudniejszy do rozumowania, wolniejszy w deploymencie i droższy w eksploatacji, a wszystko w pogoni za "architekturą mikroserwisową", która nie pasowała do rzeczywistej struktury domeny ani rozmiaru zespołu. Uczciwa rada brzmi: najpierw zrób właściwy model domeny, a granice serwisów niech z niego wynikają, a nie z diagramu deploymentu.

**Link:** [Stop Building Distributed Monoliths: How to Find Real Business Boundaries](https://daily.dev/posts/8jB22c0ll)
